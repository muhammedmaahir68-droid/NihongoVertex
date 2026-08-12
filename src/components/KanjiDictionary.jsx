import React, { useState, useEffect } from "react";
import { Search, CheckCircle2, Bookmark, Info } from "lucide-react";
import { kanjiData } from "../data/kanji";
import { Storage } from "../lib/storage";

export default function KanjiDictionary({ level }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [strokeFilter, setStrokeFilter] = useState("all");
  const [learnedList, setLearnedList] = useState({});

  useEffect(() => {
    loadProgress();
    setSelectedKanji(null);
  }, [level]);

  const loadProgress = async () => {
    const progress = await Storage.getProgress();
    setLearnedList(progress);
  };

  const currentKanji = kanjiData.filter((k) => k.level === level);

  const filteredKanji = currentKanji.filter((k) => {
    const matchesSearch = 
      k.char.includes(searchQuery) ||
      k.meanings.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.kunyomi.includes(searchQuery) ||
      k.onyomi.includes(searchQuery);

    const matchesStrokes =
      strokeFilter === "all" ||
      (strokeFilter === "1-5" && k.strokes <= 5) ||
      (strokeFilter === "6-10" && k.strokes >= 6 && k.strokes <= 10) ||
      (strokeFilter === "11+" && k.strokes >= 11);

    return matchesSearch && matchesStrokes;
  });

  const toggleLearned = async (kanjiObj) => {
    const itemKey = kanjiObj.char;
    const currentStatus = learnedList[`${level}_kanji_${itemKey}`]?.status;
    const nextStatus = currentStatus === "completed" ? "started" : "completed";
    
    const updated = await Storage.updateProgress(level, "kanji", itemKey, nextStatus);
    setLearnedList(updated);
  };

  return (
    <div className="kanji-dictionary-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>⛩️ JLPT {level} Kanji Dictionary</h2>
        <span style={{ fontSize: "14px", background: "rgba(83, 109, 255, 0.1)", color: "#9db0ff", padding: "6px 12px", borderRadius: "10px", border: "1px solid rgba(83, 109, 255, 0.2)" }}>
          Total Database: {currentKanji.length} Kanji
        </span>
      </div>

      {/* Filter panel */}
      <div className="filter-panel" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", marginBottom: "20px" }}>
        <div style={{ position: "relative" }}>
          <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#687697" }} />
          <input
            type="text"
            placeholder="Search by Kanji, English meaning, Onyomi, Kunyomi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 10px 10px 40px",
              borderRadius: "12px",
              background: "#0c1428",
              border: "1px solid #2b3b61",
              color: "#fff",
              fontSize: "14px"
            }}
          />
        </div>

        <select
          value={strokeFilter}
          onChange={(e) => setStrokeFilter(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "12px",
            background: "#0c1428",
            color: "#fff",
            border: "1px solid #2b3b61",
            cursor: "pointer"
          }}
        >
          <option value="all">All Strokes</option>
          <option value="1-5">1 - 5 Strokes</option>
          <option value="6-10">6 - 10 Strokes</option>
          <option value="11+">11+ Strokes</option>
        </select>
      </div>

      {/* Main Grid View */}
      <div style={{ display: "grid", gridTemplateColumns: selectedKanji ? "1fr 340px" : "1fr", gap: "20px" }}>
        <div className="kanji-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "10px", maxHeight: "500px", overflowY: "auto", paddingRight: "5px" }}>
          {filteredKanji.map((kanjiObj) => {
            const isCompleted = learnedList[`${level}_kanji_${kanjiObj.char}`]?.status === "completed";
            return (
              <div
                key={kanjiObj.char}
                onClick={() => setSelectedKanji(kanjiObj)}
                className={`kanji-card ${selectedKanji?.char === kanjiObj.char ? "selected" : ""}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 6px",
                  borderRadius: "14px",
                  background: selectedKanji?.char === kanjiObj.char ? "rgba(83, 109, 255, 0.25)" : "rgba(18, 28, 52, 0.6)",
                  border: selectedKanji?.char === kanjiObj.char ? "2px solid #536dff" : "1px solid #2a3c63",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  position: "relative"
                }}
              >
                {isCompleted && (
                  <div style={{ position: "absolute", top: "4px", right: "4px", color: "#10b981" }}>
                    <CheckCircle2 size={12} fill="currentColor" color="#0c1428" />
                  </div>
                )}
                <span style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "4px" }}>{kanjiObj.char}</span>
                <span style={{ fontSize: "11px", color: "#aab6d0", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
                  {kanjiObj.meanings}
                </span>
              </div>
            );
          })}
          {filteredKanji.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px", color: "#687697" }}>
              No Kanji match your search filters.
            </div>
          )}
        </div>

        {selectedKanji && (
          <div className="panel kanji-detail-sidebar" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span className="pill" style={{ background: "#223563", color: "#9db0ff", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", textTransform: "uppercase", fontWeight: "bold" }}>
                  Strokes: {selectedKanji.strokes}
                </span>
                <h3 style={{ margin: "8px 0 2px 0", fontSize: "20px" }}>Kanji details</h3>
              </div>
              <button
                onClick={() => toggleLearned(selectedKanji)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  background: learnedList[`${level}_kanji_${selectedKanji.char}`]?.status === "completed" ? "rgba(16, 185, 129, 0.2)" : "#121c34",
                  border: learnedList[`${level}_kanji_${selectedKanji.char}`]?.status === "completed" ? "1px solid #10b981" : "1px solid #2b3b61",
                  color: learnedList[`${level}_kanji_${selectedKanji.char}`]?.status === "completed" ? "#10b981" : "#fff"
                }}
              >
                <CheckCircle2 size={15} /> {learnedList[`${level}_kanji_${selectedKanji.char}`]?.status === "completed" ? "Learned" : "Learn"}
              </button>
            </div>

            <div className="char-display" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "110px", background: "#0b1223", borderRadius: "14px", border: "1px solid #233457" }}>
              <span style={{ fontSize: "64px", fontWeight: "bold" }}>{selectedKanji.char}</span>
            </div>

            <div className="kanji-info-strip" style={{ display: "grid", gap: "10px", background: "#111b33", padding: "14px", borderRadius: "12px" }}>
              <div>
                <strong style={{ color: "#9db0ff", fontSize: "12px", textTransform: "uppercase" }}>English Meaning</strong>
                <div style={{ fontSize: "16px", fontWeight: "bold", textTransform: "capitalize", marginTop: "2px" }}>{selectedKanji.meanings}</div>
              </div>
              <hr style={{ border: "0", borderTop: "1px solid #233457", margin: "2px 0" }} />
              <div>
                <strong style={{ color: "#ff84b5", fontSize: "12px", textTransform: "uppercase" }}>Kun'yomi (Japanese)</strong>
                <div style={{ fontSize: "15px", marginTop: "2px" }}>{selectedKanji.kunyomi}</div>
              </div>
              <hr style={{ border: "0", borderTop: "1px solid #233457", margin: "2px 0" }} />
              <div>
                <strong style={{ color: "#34d399", fontSize: "12px", textTransform: "uppercase" }}>On'yomi (Chinese)</strong>
                <div style={{ fontSize: "15px", marginTop: "2px" }}>{selectedKanji.onyomi}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
