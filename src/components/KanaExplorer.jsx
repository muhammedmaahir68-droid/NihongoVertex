import React, { useState, useEffect, useRef } from "react";
import { Volume2, CheckCircle2, Bookmark, BookmarkCheck, PenLine, RefreshCw, Star } from "lucide-react";
import { hiraganaData } from "../data/hiragana";
import { katakanaData } from "../data/katakana";
import { Storage } from "../lib/storage";

export default function KanaExplorer({ level }) {
  const [scriptType, setScriptType] = useState("hiragana"); // 'hiragana' | 'katakana'
  const [filterType, setFilterType] = useState("basic"); // 'basic' | 'dakuon' | 'handakuon' | 'yoon'
  const [selectedChar, setSelectedChar] = useState(null);
  const [learnedList, setLearnedList] = useState({});
  const [streak, setStreak] = useState(0);

  // Drawing Canvas references
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const dataset = scriptType === "hiragana" ? hiraganaData : katakanaData;
  const filteredChars = dataset.filter((c) => c.type === filterType);

  useEffect(() => {
    loadProgress();
    setStreak(Storage.getStreak());
  }, [scriptType, level]);

  const loadProgress = async () => {
    const progress = await Storage.getProgress();
    setLearnedList(progress);
  };

  const speakCharacter = (char) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(char);
      utterance.lang = "ja-JP";
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleLearned = async (charObj) => {
    const itemKey = `${scriptType}_${charObj.romaji}`;
    const currentStatus = learnedList[`${level}_kana_${itemKey}`]?.status;
    const nextStatus = currentStatus === "completed" ? "started" : "completed";
    
    const updated = await Storage.updateProgress(level, "kana", itemKey, nextStatus);
    setLearnedList(updated);
    
    if (nextStatus === "completed") {
      const newStreak = Storage.incrementStreak();
      setStreak(newStreak);
    }
  };

  // Canvas drawing logic
  useEffect(() => {
    if (selectedChar && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [selectedChar]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#536dff";
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="kana-explorer-container">
      <div className="flex-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>📝 Japanese Kana Lab</h2>
        {streak > 0 && (
          <span className="streak-badge" style={{ background: "rgba(255, 107, 107, 0.15)", color: "#ff6b6b", border: "1px solid rgba(255, 107, 107, 0.3)", padding: "6px 12px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold" }}>
            🔥 {streak} Day Streak!
          </span>
        )}
      </div>

      {/* Script & Category selectors */}
      <div className="tab-control-group" style={{ display: "flex", gap: "12px", marginBottom: "15px" }}>
        <button className={scriptType === "hiragana" ? "active" : ""} onClick={() => { setScriptType("hiragana"); setSelectedChar(null); }}>
          Hiragana (ひらがな)
        </button>
        <button className={scriptType === "katakana" ? "active" : ""} onClick={() => { setScriptType("katakana"); setSelectedChar(null); }}>
          Katakana (カタカナ)
        </button>
      </div>

      <div className="sub-tab-group" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "25px" }}>
        {[
          { id: "basic", label: "Basic (Gojūon)" },
          { id: "dakuon", label: "Voiced (Dakuon)" },
          { id: "handakuon", label: "Half-voiced" },
          { id: "yoon", label: "Combo (Yōon)" },
          { id: "small", label: "Small" },
          ...(scriptType === "katakana" ? [{ id: "extended", label: "Extended" }] : [])
        ].map((f) => (
          <button
            key={f.id}
            className={filterType === f.id ? "active-sub" : "sub-btn"}
            onClick={() => { setFilterType(f.id); setSelectedChar(null); }}
            style={{
              padding: "6px 12px",
              fontSize: "13px",
              borderRadius: "8px",
              background: filterType === f.id ? "#3b4fca" : "#1a2540",
              border: filterType === f.id ? "1px solid #536dff" : "1px solid #283758",
              color: "#eef2ff",
              cursor: "pointer"
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid and Detail view */}
      <div style={{ display: "grid", gridTemplateColumns: selectedChar ? "1fr 360px" : "1fr", gap: "20px" }}>
        <div className="kana-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(75px, 1fr))", gap: "10px" }}>
          {filteredChars.map((charObj) => {
            const isCompleted = learnedList[`${level}_kana_${scriptType}_${charObj.romaji}`]?.status === "completed";
            return (
              <div
                key={charObj.char}
                onClick={() => setSelectedChar(charObj)}
                className={`kana-card ${selectedChar?.char === charObj.char ? "selected" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "15px 10px",
                  borderRadius: "14px",
                  background: selectedChar?.char === charObj.char ? "rgba(83, 109, 255, 0.25)" : "rgba(18, 28, 52, 0.6)",
                  border: selectedChar?.char === charObj.char ? "2px solid #536dff" : "1px solid #2a3c63",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative"
                }}
              >
                {isCompleted && (
                  <div style={{ position: "absolute", top: "5px", right: "5px", color: "#10b981" }}>
                    <CheckCircle2 size={13} fill="currentColor" color="#0c1428" />
                  </div>
                )}
                <span style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "4px" }}>{charObj.char}</span>
                <span style={{ fontSize: "12px", color: "#aab6d0", textTransform: "uppercase", letterSpacing: "1px" }}>{charObj.romaji}</span>
              </div>
            );
          })}
        </div>

        {selectedChar && (
          <div className="panel select-char-detail" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span className="pill" style={{ background: "#223563", color: "#9db0ff", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", textTransform: "uppercase", fontWeight: "bold" }}>
                  {selectedChar.type}
                </span>
                <h3 style={{ margin: "8px 0 2px 0", fontSize: "20px" }}>Pronunciation: /{selectedChar.romaji}/</h3>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => speakCharacter(selectedChar.char)} style={{ padding: "6px", borderRadius: "8px" }} title="Listen">
                  <Volume2 size={16} />
                </button>
                <button
                  onClick={() => toggleLearned(selectedChar)}
                  style={{
                    padding: "6px",
                    borderRadius: "8px",
                    background: learnedList[`${level}_kana_${scriptType}_${selectedChar.romaji}`]?.status === "completed" ? "rgba(16, 185, 129, 0.2)" : "#121c34",
                    border: learnedList[`${level}_kana_${scriptType}_${selectedChar.romaji}`]?.status === "completed" ? "1px solid #10b981" : "1px solid #2b3b61",
                    color: learnedList[`${level}_kana_${scriptType}_${selectedChar.romaji}`]?.status === "completed" ? "#10b981" : "#fff"
                  }}
                  title="Mark Completed"
                >
                  <CheckCircle2 size={16} />
                </button>
              </div>
            </div>

            <div className="char-display" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "120px", background: "#0b1223", borderRadius: "14px", border: "1px solid #233457" }}>
              <span className="japanese-character" style={{ fontSize: "70px", fontWeight: "bold" }}>{selectedChar.char}</span>
            </div>

            {selectedChar.mnemonic && (
              <div className="mnemonic-tip" style={{ padding: "12px", background: "rgba(83, 109, 255, 0.08)", borderLeft: "4px solid #536dff", borderRadius: "0 8px 8px 0", fontSize: "13px" }}>
                <strong>Memory Mnemonic:</strong>
                <p style={{ margin: "4px 0 0 0", color: "#aab6d0" }}>{selectedChar.mnemonic}</p>
              </div>
            )}

            <div className="writing-practice">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", fontWeight: "bold" }}>✍️ Tracing Practice:</span>
                <button onClick={clearCanvas} style={{ padding: "4px 8px", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <RefreshCw size={11} /> Clear
                </button>
              </div>
              <div className="canvas-wrapper" style={{ position: "relative", width: "100%", height: "180px", background: "#080d1b", border: "1px dashed #3a496e", borderRadius: "10px", overflow: "hidden" }}>
                <div className="trace-guide" style={{ position: "absolute", inset: "0", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "110px", color: "rgba(104, 118, 151, 0.08)", pointerEvents: "none", userSelect: "none" }}>
                  {selectedChar.char}
                </div>
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ cursor: "crosshair", width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
