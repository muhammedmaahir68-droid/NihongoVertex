import React, { useState, useEffect } from "react";
import { Award, Flame, RefreshCw, CheckCircle2, Circle, TrendingUp, BarChart2, Star } from "lucide-react";
import { Storage } from "../lib/storage";
import { syllabusData } from "../data/syllabus";

export default function ProgressDashboard({ level, onSelectTab }) {
  const [progress, setProgress] = useState({});
  const [quizScores, setQuizScores] = useState([]);
  const [streak, setStreak] = useState(0);
  const [milestones, setMilestones] = useState([]);
  const [stats, setStats] = useState({ kanaPct: 0, kanjiPct: 0, lessonPct: 0 });

  useEffect(() => {
    loadAllData();
  }, [level]);

  const loadAllData = async () => {
    const userProgress = await Storage.getProgress();
    const scores = await Storage.getQuizScores();
    const userStreak = Storage.getStreak();
    const completedMilestones = Storage.getCompletedMilestones();

    setProgress(userProgress);
    setQuizScores(scores.filter((s) => s.level === level));
    setStreak(userStreak);
    setMilestones(completedMilestones);

    // Calculate level metrics
    // 1. Kana completed (total 208 for N5)
    const completedKana = Object.keys(userProgress).filter(
      (key) => key.startsWith(`${level}_kana_`) && userProgress[key]?.status === "completed"
    ).length;
    const kanaPct = level === "N5" ? Math.min(Math.round((completedKana / 208) * 100), 100) : 100; // Only N5 has kana tracking

    // 2. Kanji completed
    const completedKanji = Object.keys(userProgress).filter(
      (key) => key.startsWith(`${level}_kanji_`) && userProgress[key]?.status === "completed"
    ).length;
    const levelKanjiCount = level === "N5" ? 80 : level === "N4" ? 16 : level === "N3" ? 12 : 10;
    const kanjiPct = Math.min(Math.round((completedKanji / levelKanjiCount) * 100), 100);

    // 3. Lessons completed
    const completedLessons = Object.keys(userProgress).filter(
      (key) => key.startsWith(`${level}_lessons_`) && userProgress[key]?.status === "completed"
    ).length;
    const totalLessons = level === "N5" ? 25 : 10;
    const lessonPct = Math.min(Math.round((completedLessons / totalLessons) * 100), 100);

    setStats({ kanaPct, kanjiPct, lessonPct });
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset all your progress, scores, and milestones? This action cannot be undone.")) {
      localStorage.clear();
      await loadAllData();
      alert("Progress successfully reset!");
    }
  };

  return (
    <div className="progress-dashboard-container" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>📊 {level} Learning Progress Dashboard</h2>

      {/* Grid of Key stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
        {/* Streak card */}
        <div className="panel" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
          <div style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", padding: "12px", borderRadius: "12px" }}>
            <Flame size={28} />
          </div>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>{streak} Days</div>
            <span style={{ fontSize: "12px", color: "#aab6d0" }}>Daily Study Streak</span>
          </div>
        </div>

        {/* Badges card */}
        <div className="panel" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
          <div style={{ background: "rgba(234, 179, 8, 0.1)", color: "#eab308", padding: "12px", borderRadius: "12px" }}>
            <Award size={28} />
          </div>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>{milestones.length} Badges</div>
            <span style={{ fontSize: "12px", color: "#aab6d0" }}>Milestones Completed</span>
          </div>
        </div>

        {/* Avg quiz score */}
        <div className="panel" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
          <div style={{ background: "rgba(52, 211, 153, 0.1)", color: "#34d399", padding: "12px", borderRadius: "12px" }}>
            <TrendingUp size={28} />
          </div>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              {quizScores.length > 0
                ? `${Math.round(quizScores.reduce((acc, curr) => acc + curr.percentage, 0) / quizScores.length)}%`
                : "N/A"}
            </div>
            <span style={{ fontSize: "12px", color: "#aab6d0" }}>Average Quiz Score</span>
          </div>
        </div>
      </div>

      {/* Progress metrics bars */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div className="panel" style={{ padding: "20px" }}>
          <h3 style={{ margin: "0 0 15px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart2 size={18} color="#536dff" /> Syllabus Progress Metrics
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {level === "N5" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                  <span>Kana Recognition (Hiragana & Katakana)</span>
                  <span style={{ fontWeight: "bold" }}>{stats.kanaPct}%</span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "#0b1223", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${stats.kanaPct}%`, height: "100%", background: "#536dff", borderRadius: "4px" }} />
                </div>
              </div>
            )}

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                <span>Kanji Mastered ({level})</span>
                <span style={{ fontWeight: "bold" }}>{stats.kanjiPct}%</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "#0b1223", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${stats.kanjiPct}%`, height: "100%", background: "#10b981", borderRadius: "4px" }} />
              </div>
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                <span>Curriculum Grammar Lessons</span>
                <span style={{ fontWeight: "bold" }}>{stats.lessonPct}%</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "#0b1223", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${stats.lessonPct}%`, height: "100%", background: "#eab308", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Achievement list */}
        <div className="panel" style={{ padding: "20px" }}>
          <h3 style={{ margin: "0 0 15px 0", display: "flex", alignItems: "center", gap: "8px" }}>
            <Award size={18} color="#eab308" /> Milestone Badge Collection
          </h3>

          {milestones.length === 0 ? (
            <div style={{ textAlign: "center", padding: "30px", color: "#687697", fontSize: "13px" }}>
              Unlock milestones to claim badge certificates!
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {milestones.map((mId) => {
                const milestone = syllabusData[level]?.milestones.find((m) => m.id === mId);
                if (!milestone) return null;
                return (
                  <div
                    key={mId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "10px",
                      background: "rgba(234, 179, 8, 0.06)",
                      border: "1px solid rgba(234, 179, 8, 0.2)"
                    }}
                  >
                    <Star size={16} color="#eab308" fill="#eab308" />
                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>{milestone.title}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Danger reset settings block */}
      <div className="panel" style={{ padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
        <div>
          <h4 style={{ margin: "0 0 4px 0", color: "#f87171" }}>Reset Progress Data</h4>
          <p style={{ margin: "0", fontSize: "12px", color: "#aab6d0" }}>
            Clears all locally saved streak, milestones, completed characters, and quiz logs.
          </p>
        </div>
        <button
          onClick={handleReset}
          style={{
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid #ef4444",
            color: "#f87171",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <RefreshCw size={14} /> Reset Data
        </button>
      </div>
    </div>
  );
}
