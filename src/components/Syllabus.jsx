import React, { useState, useEffect } from "react";
import { Award, CheckCircle2, Lock, ListTodo, BookOpen, Star, HelpCircle } from "lucide-react";
import { syllabusData } from "../data/syllabus";
import { Storage } from "../lib/storage";

export default function Syllabus({ level, onSelectTab }) {
  const [progress, setProgress] = useState({});
  const [completedMilestones, setCompletedMilestones] = useState([]);
  
  const currentSyllabus = syllabusData[level] || { title: `JLPT ${level}`, description: "Coming soon...", milestones: [] };

  useEffect(() => {
    loadProgress();
  }, [level]);

  const loadProgress = async () => {
    const userProgress = await Storage.getProgress();
    setProgress(userProgress);
    
    const milestones = Storage.getCompletedMilestones();
    setCompletedMilestones(milestones);
  };

  // Helper to determine completion progress of a milestone
  const calculateMilestoneProgress = (milestone) => {
    if (milestone.type === "kana") {
      // Find all completed kana in progress
      const completedKana = Object.keys(progress).filter(
        (key) => key.startsWith(`${level}_kana_`) && progress[key]?.status === "completed"
      ).length;
      const total = milestone.requiredCount;
      const pct = Math.min(Math.round((completedKana / total) * 100), 100);
      return { completed: completedKana, total, percentage: pct, isDone: pct === 100 };
    }
    
    if (milestone.type === "kanji") {
      const completedKanji = Object.keys(progress).filter(
        (key) => key.startsWith(`${level}_kanji_`) && progress[key]?.status === "completed"
      ).length;
      const total = milestone.requiredCount;
      const pct = Math.min(Math.round((completedKanji / total) * 100), 100);
      return { completed: completedKanji, total, percentage: pct, isDone: pct === 100 };
    }

    if (milestone.type === "lessons") {
      // Count completed lessons matching the milestone lessons array
      const completedLessons = milestone.lessons.filter((lNum) => {
        return progress[`${level}_lessons_${lNum}`]?.status === "completed";
      }).length;
      const total = milestone.lessons.length;
      const pct = Math.min(Math.round((completedLessons / total) * 100), 100);
      return { completed: completedLessons, total, percentage: pct, isDone: pct === 100 };
    }

    // Default or general milestones
    return { completed: 0, total: 1, percentage: 0, isDone: false };
  };

  // Handle manual claim or auto claim of milestones
  const claimMilestone = (milestoneId) => {
    const updated = Storage.completeMilestone(milestoneId);
    setCompletedMilestones(updated);
  };

  return (
    <div className="syllabus-container">
      <div className="hero" style={{ background: "radial-gradient(circle at top right, rgba(83, 109, 255, 0.15), rgba(12, 20, 40, 0.8))", border: "1px solid #2b3b61", borderRadius: "20px", padding: "30px", marginBottom: "25px" }}>
        <h1 style={{ fontSize: "28px", color: "#fff", marginBottom: "8px" }}>{currentSyllabus.title}</h1>
        <p style={{ color: "#aab6d0", maxWidth: "800px", fontSize: "15px", lineHeight: "1.6", margin: 0 }}>
          {currentSyllabus.description}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>
        {/* Milestones list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", margin: "0 0 4px 0" }}>
            <ListTodo size={18} color="#536dff" /> Learning Roadmap & Milestones
          </h3>

          {currentSyllabus.milestones.map((m, idx) => {
            const stats = calculateMilestoneProgress(m);
            const isMilestoneClaimed = completedMilestones.includes(m.id);
            
            // Auto claim if milestone criteria met
            if (stats.isDone && !isMilestoneClaimed) {
              claimMilestone(m.id);
            }

            return (
              <div
                key={m.id}
                className="panel milestone-card"
                style={{
                  position: "relative",
                  background: isMilestoneClaimed ? "rgba(16, 185, 129, 0.05)" : "rgba(12, 20, 40, 0.5)",
                  border: isMilestoneClaimed ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid #233457",
                  padding: "20px",
                  borderRadius: "16px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <span style={{ fontSize: "11px", textTransform: "uppercase", background: isMilestoneClaimed ? "rgba(16, 185, 129, 0.2)" : "#1c2c4b", color: isMilestoneClaimed ? "#34d399" : "#9db0ff", padding: "4px 8px", borderRadius: "6px", fontWeight: "bold" }}>
                      Milestone {idx + 1} • {m.type}
                    </span>
                    <h4 style={{ fontSize: "18px", margin: "8px 0 4px 0", color: "#fff" }}>{m.title}</h4>
                    <p style={{ fontSize: "13px", color: "#aab6d0", margin: 0 }}>{m.description}</p>
                  </div>

                  {isMilestoneClaimed ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981", fontSize: "13px", fontWeight: "bold" }}>
                      <CheckCircle2 size={16} /> Completed
                    </span>
                  ) : (
                    <span style={{ color: "#687697", fontSize: "13px" }}>
                      In Progress
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {m.type !== "grammar" && m.type !== "reading" && m.type !== "listening" && m.type !== "advanced" && (
                  <div style={{ marginTop: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#aab6d0", marginBottom: "6px" }}>
                      <span>Progress: {stats.completed} / {stats.total}</span>
                      <span>{stats.percentage}%</span>
                    </div>
                    <div style={{ width: "100%", height: "8px", background: "#0b1223", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${stats.percentage}%`, height: "100%", background: isMilestoneClaimed ? "#10b981" : "#536dff", borderRadius: "4px", transition: "width 0.4s ease" }} />
                    </div>
                  </div>
                )}

                {/* Direct Action buttons */}
                <div style={{ marginTop: "15px", display: "flex", gap: "8px" }}>
                  {m.type === "kana" && (
                    <button onClick={() => onSelectTab("writing")} style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Practice Kana
                    </button>
                  )}
                  {m.type === "kanji" && (
                    <button onClick={() => onSelectTab("visual")} style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Practice Kanji
                    </button>
                  )}
                  {m.type === "lessons" && (
                    <button onClick={() => onSelectTab("dashboard")} style={{ padding: "6px 12px", fontSize: "12px" }}>
                      Go to Dashboard
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Badges Sidebar */}
        <div>
          <div className="panel badges-panel" style={{ textAlign: "center", padding: "20px" }}>
            <Award size={48} color="#eab308" style={{ margin: "0 auto 10px auto" }} />
            <h3 style={{ fontSize: "18px", margin: "0 0 6px 0" }}>Achievement Badges</h3>
            <p style={{ fontSize: "12px", color: "#aab6d0", marginBottom: "20px" }}>
              Unlock special certificate-style badges as you fulfill milestones for JLPT {level}.
            </p>

            <div style={{ display: "grid", gap: "12px" }}>
              {currentSyllabus.milestones.map((m, idx) => {
                const isClaimed = completedMilestones.includes(m.id);
                return (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px",
                      borderRadius: "12px",
                      background: isClaimed ? "rgba(234, 179, 8, 0.08)" : "rgba(18, 28, 52, 0.4)",
                      border: isClaimed ? "1px solid rgba(234, 179, 8, 0.3)" : "1px solid #233457",
                      opacity: isClaimed ? 1 : 0.6
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: isClaimed ? "#eab308" : "#233457",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isClaimed ? "#000" : "#687697",
                        fontWeight: "bold",
                        fontSize: "14px"
                      }}
                    >
                      {isClaimed ? "⭐" : idx + 1}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: "13px", fontWeight: "bold", color: isClaimed ? "#fff" : "#aab6d0" }}>{m.title}</div>
                      <div style={{ fontSize: "11px", color: isClaimed ? "#eab308" : "#687697" }}>
                        {isClaimed ? "Unlocked Badge" : "Locked"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
