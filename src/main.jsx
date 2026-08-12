import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Import existing modules
import { JapaneseWritingSpeakingLab, VisualMemoryLesson, AIExamPlanner } from "./AppModules.jsx";

// Import new modular components
import Syllabus from "./components/Syllabus";
import KanaExplorer from "./components/KanaExplorer";
import KanjiDictionary from "./components/KanjiDictionary";
import QuizEngine from "./components/QuizEngine";
import ProgressDashboard from "./components/ProgressDashboard";

const kanaList = [
  { char: "あ", romaji: "a" }, { char: "い", romaji: "i" }, { char: "う", romaji: "u" }, 
  { char: "え", romaji: "e" }, { char: "お", romaji: "o" }, { char: "か", romaji: "ka" }, 
  { char: "き", romaji: "ki" }, { char: "く", romaji: "ku" }, { char: "け", romaji: "ke" }, 
  { char: "こ", romaji: "ko" }
];

function App() {
  const [level, setLevel] = useState("N5");
  const [tab, setTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "🏠 Dashboard" },
    { id: "syllabus", label: "🗺️ Syllabus & Roadmap" },
    { id: "kana", label: "✍️ Kana Lab" },
    { id: "kanji", label: "⛩️ Kanji Dictionary" },
    { id: "quiz", label: "🧠 Quiz Center" },
    { id: "progress", label: "📈 My Progress" },
    { id: "planner", label: "🤖 AI Planner" },
    { id: "visual", label: "🧠 Visual Memory" },
    { id: "writing", label: "✏️ Writing & Speaking" }
  ];

  return (
    <main className="app-shell" style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "25px", minHeight: "100vh", padding: "20px" }}>
      {/* Sidebar Navigation */}
      <aside className="sidebar" style={{ background: "rgba(12, 20, 40, 0.75)", border: "1px solid #233457", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "20px", height: "calc(100vh - 40px)", sticky: "top", position: "sticky", top: "20px" }}>
        <div className="brand" style={{ fontSize: "20px", fontWeight: "900", color: "#536dff", display: "flex", alignItems: "center", gap: "8px" }}>
          🇯🇵 NIHONGO VERTEX
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span style={{ fontSize: "11px", textTransform: "uppercase", color: "#687697", fontWeight: "bold", paddingLeft: "8px", marginBottom: "6px" }}>JLPT Level</span>
          <div className="level-picker" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px" }}>
            {["N5", "N4", "N3", "N2", "N1"].map((x) => (
              <button
                key={x}
                className={level === x ? "active" : ""}
                onClick={() => setLevel(x)}
                style={{
                  padding: "6px 0",
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  background: level === x ? "#536dff" : "#121c34",
                  border: "1px solid #2b3b61"
                }}
              >
                {x}
              </button>
            ))}
          </div>
        </div>

        <hr style={{ border: "0", borderTop: "1px solid #233457", width: "100%", margin: "5px 0" }} />

        <nav className="nav-menu" style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1, overflowY: "auto" }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={tab === t.id ? "active-nav" : "nav-btn"}
              onClick={() => setTab(t.id)}
              style={{
                textAlign: "left",
                padding: "10px 14px",
                fontSize: "13.5px",
                borderRadius: "10px",
                background: tab === t.id ? "rgba(83, 109, 255, 0.15)" : "transparent",
                color: tab === t.id ? "#9db0ff" : "#eef2ff",
                border: tab === t.id ? "1px solid rgba(83, 109, 255, 0.3)" : "1px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <section className="main-content" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {tab === "dashboard" && (
          <>
            <header className="hero" style={{ padding: "40px 30px" }}>
              <div className="brand" style={{ fontSize: "14px" }}>JAPANESE MASTERY PLATFORM</div>
              <h1 style={{ fontSize: "38px", margin: "8px 0 12px 0" }}>Level {level} Command Center</h1>
              <p style={{ margin: "0", fontSize: "15px" }}>
                Step into a structured JLPT curriculum powered by AI roadmap planners, comprehensive vocabulary tests, grammar exercises, and stroke training.
              </p>
            </header>

            <div className="panel">
              <h2 style={{ fontSize: "20px", marginBottom: "18px" }}>Explore Modules</h2>
              <div className="cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "15px" }}>
                <article onClick={() => setTab("syllabus")} style={{ cursor: "pointer" }}>
                  <b style={{ fontSize: "16px", display: "block", marginBottom: "6px" }}>🗺️ Syllabus & Roadmap</b>
                  <p style={{ margin: "0", fontSize: "12.5px" }}>Track level milestones, claim certificates, and follow paths.</p>
                </article>

                <article onClick={() => setTab("kana")} style={{ cursor: "pointer" }}>
                  <b style={{ fontSize: "16px", display: "block", marginBottom: "6px" }}>✍️ Kana Lab (104/104)</b>
                  <p style={{ margin: "0", fontSize: "12.5px" }}>Learn Hiragana & Katakana with tracing, voices, and mnemonics.</p>
                </article>

                <article onClick={() => setTab("kanji")} style={{ cursor: "pointer" }}>
                  <b style={{ fontSize: "16px", display: "block", marginBottom: "6px" }}>⛩️ Kanji Dictionary</b>
                  <p style={{ margin: "0", fontSize: "12.5px" }}>Browse N5-N1 characters with stroke-counts and on/kun readings.</p>
                </article>

                <article onClick={() => setTab("quiz")} style={{ cursor: "pointer" }}>
                  <b style={{ fontSize: "16px", display: "block", marginBottom: "6px" }}>🧠 Quiz Center</b>
                  <p style={{ margin: "0", fontSize: "12.5px" }}>Timed practice checks for vocabulary, grammar, and kanji.</p>
                </article>

                <article onClick={() => setTab("progress")} style={{ cursor: "pointer" }}>
                  <b style={{ fontSize: "16px", display: "block", marginBottom: "6px" }}>📈 Progress Dashboard</b>
                  <p style={{ margin: "0", fontSize: "12.5px" }}>View streaks, statistics cards, and complete scores history.</p>
                </article>

                <article onClick={() => setTab("planner")} style={{ cursor: "pointer" }}>
                  <b style={{ fontSize: "16px", display: "block", marginBottom: "6px" }}>🤖 AI Exam Planner</b>
                  <p style={{ margin: "0", fontSize: "12.5px" }}>Design personal schedules and review strategies.</p>
                </article>
              </div>
            </div>
          </>
        )}

        {tab === "syllabus" && <Syllabus level={level} onSelectTab={setTab} />}
        {tab === "kana" && <KanaExplorer level={level} />}
        {tab === "kanji" && <KanjiDictionary level={level} />}
        {tab === "quiz" && <QuizEngine level={level} />}
        {tab === "progress" && <ProgressDashboard level={level} onSelectTab={setTab} />}
        
        {tab === "planner" && <AIExamPlanner level={level} />}
        {tab === "visual" && (
          <VisualMemoryLesson
            lesson={{
              title: `${level} Visual Memory Lesson`,
              character: "あ",
              japanese: "あ",
              romaji: "a",
              meaning: "a sound",
              memoryObject: "apple",
              emoji: "🍎",
              memoryTip: "Connect the shape to an apple, hear the sound, draw it, then recall it.",
              pattern: "あ → 🍎 → a → write → recall"
            }}
          />
        )}
        {tab === "writing" && <JapaneseWritingSpeakingLab title={`${level} Kana & Kanji Lab`} characters={kanaList} />}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
