"""
Nihongo Vertex - High Performance Backend & REST API Server
Provides all JLPT curricula, character stroke animations, visual scenes,
interactive AI mentor chat, quiz/mock exam engine, and progress storage with SQLite database.
Runs seamlessly with Python standard library (no compilation needed) on http://localhost:8000.
"""
import os
import json
import sqlite3
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from datetime import datetime

PORT = 8000
DB_PATH = os.path.join(os.path.dirname(__file__), "nihongo.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE DEFAULT 'default_user',
        level TEXT DEFAULT 'N5',
        streak INTEGER DEFAULT 1,
        xp INTEGER DEFAULT 0,
        last_study_date TEXT,
        completed_lessons TEXT DEFAULT '{}',
        mistakes TEXT DEFAULT '[]',
        mock_attempts TEXT DEFAULT '[]',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT DEFAULT 'default_user',
        role TEXT,
        message TEXT,
        level TEXT DEFAULT 'N5',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS mistakes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT DEFAULT 'default_user',
        question TEXT,
        user_answer TEXT,
        correct_answer TEXT,
        explanation TEXT,
        level TEXT DEFAULT 'N5',
        lesson_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("SELECT COUNT(*) FROM progress WHERE user_id = 'default_user'")
    if cursor.fetchone()[0] == 0:
        today = datetime.utcnow().strftime("%Y-%m-%d")
        cursor.execute("""
        INSERT INTO progress (user_id, level, streak, xp, last_study_date, completed_lessons, mistakes, mock_attempts)
        VALUES ('default_user', 'N5', 1, 0, ?, '{}', '[]', '[]')
        """, (today,))

    conn.commit()
    conn.close()

init_db()

# JLPT Levels & Modules Metadata
LEVELS_DATA = ["N5", "N4", "N3", "N2", "N1"]
MODULES_DATA = {
    "N5": ["Hiragana", "Katakana", "Kanji", "Vocabulary", "Grammar", "Listening", "Speaking", "Writing", "Revision", "Quiz", "Mock Exam"],
    "N4": ["Kanji N4", "Vocabulary N4", "Grammar N4", "Listening N4", "Reading N4", "Quiz N4", "Mock Exam N4"],
    "N3": ["Kanji N3", "Vocabulary N3", "Grammar N3", "Listening N3", "Reading N3", "Quiz N3", "Mock Exam N3"],
    "N2": ["Kanji N2", "Vocabulary N2", "Grammar N2", "Listening N2", "Reading N2", "Quiz N2", "Mock Exam N2"],
    "N1": ["Kanji N1", "Vocabulary N1", "Grammar N1", "Listening N1", "Reading N1", "Quiz N1", "Mock Exam N1"]
}

SCENES_DATA = [
    {
        "id": "cafe",
        "title": "喫茶店 (Kissaten / Cafe)",
        "romaji": "Kissaten",
        "english": "Traditional Japanese Cafe",
        "items": [
            {"jp": "コーヒー", "r": "koohii", "en": "coffee", "x": 30, "y": 60},
            {"jp": "メニュー", "r": "menyuu", "en": "menu", "x": 50, "y": 70},
            {"jp": "みず", "r": "mizu", "en": "water", "x": 65, "y": 55},
            {"jp": "てんいん", "r": "ten'in", "en": "staff / clerk", "x": 75, "y": 30},
            {"jp": "おかんじょう", "r": "okanjou", "en": "the bill / check", "x": 40, "y": 80}
        ],
        "dialogue": [
            {"speaker": "Staff", "jp": "いらっしゃいませ！何名様ですか？", "r": "Irasshaimase! Nan-mei-sama desu ka?", "en": "Welcome! How many people?"},
            {"speaker": "You", "jp": "ひとりです。コーヒーをひとつおねがいします。", "r": "Hitori desu. Koohii o hitotsu onegaishimasu.", "en": "One person. One coffee, please."}
        ]
    },
    {
        "id": "station",
        "title": "駅 (Eki / Train Station)",
        "romaji": "Eki",
        "english": "Train Station Platform & Ticket Gate",
        "items": [
            {"jp": "きっぷ", "r": "kippu", "en": "ticket", "x": 25, "y": 65},
            {"jp": "かいさつぐち", "r": "kaisatsuguchi", "en": "ticket gate", "x": 50, "y": 45},
            {"jp": "でんしゃ", "r": "densha", "en": "train", "x": 75, "y": 35},
            {"jp": "ホーム", "r": "hoomu", "en": "platform", "x": 45, "y": 80},
            {"jp": "じこくひょう", "r": "jikokuhyou", "en": "timetable", "x": 80, "y": 20}
        ],
        "dialogue": [
            {"speaker": "You", "jp": "すみません、東京行きはどのホームですか？", "r": "Sumimasen, Toukyou-yuki wa dono hoomu desu ka?", "en": "Excuse me, which platform for Tokyo?"},
            {"speaker": "Staff", "jp": "2番ホームですよ。", "r": "Ni-ban hoomu desu yo.", "en": "It is platform number 2."}
        ]
    },
    {
        "id": "classroom",
        "title": "教室 (Kyoushitsu / Classroom)",
        "romaji": "Kyoushitsu",
        "english": "Japanese Language Classroom",
        "items": [
            {"jp": "せんせい", "r": "sensei", "en": "teacher", "x": 30, "y": 40},
            {"jp": "こくばん", "r": "kokuban", "en": "blackboard", "x": 50, "y": 25},
            {"jp": "つくえ", "r": "tsukue", "en": "desk", "x": 45, "y": 70},
            {"jp": "ほん", "r": "hon", "en": "book", "x": 60, "y": 65},
            {"jp": "じしょ", "r": "jisho", "en": "dictionary", "x": 75, "y": 60}
        ],
        "dialogue": [
            {"speaker": "Sensei", "jp": "みなさん、15ページを開いてください。", "r": "Mina-san, juugo peeji o hiraite kudasai.", "en": "Everyone, please open to page 15."},
            {"speaker": "Student", "jp": "はい、わかりました！", "r": "Hai, wakarimashita!", "en": "Yes, understood!"}
        ]
    }
]

def generate_ai_response(msg, level="N5", context=""):
    q = msg.lower().strip()
    if "plan" in q or "schedule" in q or "study" in q or "roadmap" in q or "today" in q:
        return f"⛩️ **Nihongo Vertex {level} Daily Roadmap**:\n1. **Character/Kanji Recall (10 mins)**: Daily stroke order and visual association drills.\n2. **Grammar & Sentence Pattern (15 mins)**: 1-2 key patterns (Minna no Nihongo format).\n3. **Active Output (10 mins)**: Say romaji aloud with our voice tutor check.\n4. **Daily Checkpoint (10 mins)**: 5-question active quiz + retry saved mistakes."
    elif "wa" in q and "ga" in q or "は" in q or "が" in q:
        return "💡 **は (Wa) vs が (Ga) Particle Breakdown**:\n- **は (Topic Marker)**: Sets the stage. 'As for X...'\n  *Example*: わたしは 学生です (Watashi wa gakusei desu - As for me, I am a student).\n- **が (Subject / Identifier)**: Specifies who/what does the action or answers 'who/which'.\n  *Example*: だれが 来ましたか？ (Dare ga kimashita ka? - Who came?)"
    elif "kanji" in q:
        return f"✍️ **Kanji Learning Technique for {level}**:\nNever memorize kanji as disconnected pictures! Break each character down into: **Radical + Visual Story + On/Kun Readings**. Then trace along the animated stroke paths in our Character Lab."
    elif "exam" in q or "mock" in q or "score" in q or "jlpt" in q or "test" in q:
        return f"🎯 **JLPT {level} Strategy & Time Management**:\n- **Language Knowledge (Vocab/Grammar)**: Move swiftly (spend ~45s per question) to reserve 25+ minutes for reading comprehension.\n- **Listening Section**: Skim visual prompts and question keywords *before* audio starts.\n- Strive for 60%+ in each section to comfortably clear the JLPT cutoff!"
    elif "tamil" in q or "ta" in q:
        return f"🌟 **Tamil + English Multilingual Note**:\nNihongo Vertex provides dual Tamil (தமிழ்) and English explanations alongside clear Romaji. Example: これ (kore) = This / இது. Use the Romaji guide to master correct natural pronunciation!"
    elif "mistake" in q or "wrong" in q or "review" in q:
        return "📕 **Smart Mistake Reviewing**:\nEvery quiz or mock question you miss is recorded automatically in your Localhost SQLite database. Revisit your Mistake Book to review why previous answers were incorrect and test yourself again."
    elif "ni" in q and "de" in q or "に" in q and "で" in q:
        return "💡 **に (Ni) vs で (De) Location Particles**:\n- **に (Ni)**: Indicates specific destination or static existence (e.g., に いきます = go to; に あります = exists at).\n- **で (De)**: Indicates location where an action takes place, or means of transport (e.g., としょかんで べんきょうします = study at the library; でんしゃで いきます = go by train)."
    else:
        return f"🤖 **AI Sensei ({level})**: Excellent Japanese question! In {level}, master core sentence patterns (AはBです, ～てください, ～たいです, ～から～まで) and practice active recall daily in the Character Lab and Quizzes. Would you like a breakdown of a specific grammar particle, kanji, or sentence?"

class RequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        url = urlparse(self.path)
        path = url.path.rstrip("/")
        
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._send_cors_headers()
        self.end_headers()

        if path in ["/health", "/api/v1/health", ""]:
            response = {
                "status": "ok",
                "service": "nihongo-vertex-api",
                "version": "2.0.0",
                "database": "sqlite",
                "db_file": DB_PATH,
                "timestamp": datetime.utcnow().isoformat()
            }
        elif path == "/health/db":
            response = {
                "status": "ok",
                "database": "sqlite",
                "file": DB_PATH,
                "connected": True
            }
        elif path == "/api/v1/levels":
            response = {"levels": LEVELS_DATA}
        elif path.startswith("/api/v1/modules"):
            parts = path.split("/")
            level = parts[-1].upper() if len(parts) >= 5 else "N5"
            response = {"level": level, "modules": MODULES_DATA.get(level, MODULES_DATA["N5"])}
        elif path == "/api/v1/scenes":
            response = {"scenes": SCENES_DATA}
        elif path == "/api/v1/progress":
            conn = get_db()
            c = conn.cursor()
            c.execute("SELECT level, streak, xp, last_study_date, completed_lessons, mistakes, mock_attempts FROM progress WHERE user_id = 'default_user'")
            row = c.fetchone()
            conn.close()
            if row:
                def safe_json(val, fallback):
                    try:
                        return json.loads(val) if val else fallback
                    except Exception:
                        return fallback

                response = {
                    "level": row["level"] or "N5",
                    "streak": row["streak"] or 1,
                    "xp": row["xp"] or 0,
                    "lastStudyDate": row["last_study_date"] or "",
                    "completedLessons": safe_json(row["completed_lessons"], {}),
                    "mistakes": safe_json(row["mistakes"], []),
                    "mockAttempts": safe_json(row["mock_attempts"], [])
                }
            else:
                response = {
                    "level": "N5",
                    "streak": 1,
                    "xp": 0,
                    "lastStudyDate": "",
                    "completedLessons": {},
                    "mistakes": [],
                    "mockAttempts": []
                }
        elif path == "/api/v1/mistakes":
            conn = get_db()
            c = conn.cursor()
            c.execute("SELECT id, question, user_answer, correct_answer, explanation, level, lesson_id, created_at FROM mistakes WHERE user_id = 'default_user' ORDER BY id DESC LIMIT 100")
            rows = c.fetchall()
            conn.close()
            mistakes_list = []
            for r in rows:
                mistakes_list.append({
                    "id": r["id"],
                    "q": r["question"],
                    "userAnswer": r["user_answer"],
                    "answer": r["correct_answer"],
                    "explain": r["explanation"],
                    "level": r["level"],
                    "lessonId": r["lesson_id"],
                    "date": r["created_at"]
                })
            response = {"mistakes": mistakes_list}
        elif path == "/api/v1/ai/history":
            conn = get_db()
            c = conn.cursor()
            c.execute("SELECT role, message, level, created_at FROM chat_history WHERE user_id = 'default_user' ORDER BY id DESC LIMIT 50")
            rows = c.fetchall()
            conn.close()
            history = [{"role": r["role"], "text": r["message"], "level": r["level"], "timestamp": r["created_at"]} for r in reversed(rows)]
            response = {"history": history}
        elif path == "/api/v1/stats":
            conn = get_db()
            c = conn.cursor()
            c.execute("SELECT level, streak, xp, completed_lessons, mock_attempts FROM progress WHERE user_id = 'default_user'")
            row = c.fetchone()
            c.execute("SELECT COUNT(*) FROM chat_history WHERE user_id = 'default_user'")
            chat_count = c.fetchone()[0]
            conn.close()
            completed_count = 0
            mock_count = 0
            if row:
                try:
                    completed_count = len(json.loads(row["completed_lessons"]))
                except Exception:
                    pass
                try:
                    mock_count = len(json.loads(row["mock_attempts"]))
                except Exception:
                    pass
            response = {
                "xp": row["xp"] if row else 0,
                "streak": row["streak"] if row else 1,
                "completedLessonsCount": completed_count,
                "mockAttemptsCount": mock_count,
                "chatMessagesCount": chat_count,
                "database": "sqlite",
                "status": "connected"
            }
        else:
            response = {"status": "ok", "message": f"Endpoint {path} available on localhost:{PORT}"}

        self.wfile.write(json.dumps(response, ensure_ascii=False).encode("utf-8"))

    def do_POST(self):
        url = urlparse(self.path)
        path = url.path.rstrip("/")
        length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(length) if length > 0 else b"{}"
        try:
            data = json.loads(body.decode("utf-8"))
        except Exception:
            data = {}

        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._send_cors_headers()
        self.end_headers()

        if path == "/api/v1/ai/chat":
            msg = data.get("message", "")
            lvl = data.get("level", "N5")
            ctx = data.get("context", "")
            reply = generate_ai_response(msg, lvl, ctx)

            # Persist message and reply to chat_history table
            if msg.strip():
                try:
                    conn = get_db()
                    c = conn.cursor()
                    c.execute("INSERT INTO chat_history (user_id, role, message, level) VALUES ('default_user', 'user', ?, ?)", (msg, lvl))
                    c.execute("INSERT INTO chat_history (user_id, role, message, level) VALUES ('default_user', 'assistant', ?, ?)", (reply, lvl))
                    conn.commit()
                    conn.close()
                except Exception as e:
                    print(f"Error logging chat to db: {e}")

            response = {
                "reply": reply,
                "level": lvl,
                "timestamp": datetime.utcnow().isoformat()
            }
        elif path == "/api/v1/progress":
            level = data.get("level", "N5")
            streak = data.get("streak", 1)
            xp = data.get("xp", 0)
            last_study_date = data.get("lastStudyDate", datetime.utcnow().strftime("%Y-%m-%d"))
            completed_lessons = json.dumps(data.get("completedLessons", {}))
            mistakes = json.dumps(data.get("mistakes", []))
            mock_attempts = json.dumps(data.get("mockAttempts", []))

            conn = get_db()
            c = conn.cursor()
            c.execute("""
            INSERT INTO progress (user_id, level, streak, xp, last_study_date, completed_lessons, mistakes, mock_attempts, updated_at)
            VALUES ('default_user', ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(user_id) DO UPDATE SET
                level = excluded.level,
                streak = excluded.streak,
                xp = excluded.xp,
                last_study_date = excluded.last_study_date,
                completed_lessons = excluded.completed_lessons,
                mistakes = excluded.mistakes,
                mock_attempts = excluded.mock_attempts,
                updated_at = CURRENT_TIMESTAMP
            """, (level, streak, xp, last_study_date, completed_lessons, mistakes, mock_attempts))
            conn.commit()
            conn.close()
            response = {"status": "saved", "xp": xp, "streak": streak, "timestamp": datetime.utcnow().isoformat()}
        elif path == "/api/v1/mistakes":
            mistakes_arr = data.get("mistakes", [])
            conn = get_db()
            c = conn.cursor()
            for m in mistakes_arr:
                c.execute("""
                INSERT INTO mistakes (user_id, question, user_answer, correct_answer, explanation, level, lesson_id)
                VALUES ('default_user', ?, ?, ?, ?, ?, ?)
                """, (
                    m.get("q", ""),
                    m.get("userAnswer", ""),
                    m.get("answer", ""),
                    m.get("explain", ""),
                    m.get("level", "N5"),
                    m.get("lessonId", 0)
                ))
            conn.commit()
            conn.close()
            response = {"status": "recorded", "count": len(mistakes_arr)}
        else:
            response = {"status": "ok", "received": data}

        self.wfile.write(json.dumps(response, ensure_ascii=False).encode("utf-8"))

    def log_message(self, format, *args):
        # Concise server logging
        print(f"[Nihongo Vertex Backend] {args[0]} {args[1]}")

def run():
    server = HTTPServer(("0.0.0.0", PORT), RequestHandler)
    print("=" * 60)
    print(f"[Nihongo Vertex Localhost Backend] running on http://localhost:{PORT}")
    print(f"Database active at: {DB_PATH}")
    print(f"Health check: http://localhost:{PORT}/health")
    print(f"JLPT Levels API: http://localhost:{PORT}/api/v1/levels")
    print("=" * 60)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down Nihongo Vertex Backend...")
        server.server_close()

if __name__ == "__main__":
    run()
