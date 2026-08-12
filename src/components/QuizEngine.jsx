import React, { useState, useEffect, useRef } from "react";
import { AlertCircle, CheckCircle, XCircle, Award, Clock, ArrowRight, RotateCcw, Flame } from "lucide-react";
import { quizBank } from "../data/quizBank";
import { Storage } from "../lib/storage";

export default function QuizEngine({ level }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("start"); // 'start' | 'quiz' | 'result'
  
  // Timer state
  const [timer, setTimer] = useState(0);
  const timerIntervalRef = useRef(null);

  // Stats
  const [quizHistory, setQuizHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  const levelQuestions = quizBank[level] || [];

  useEffect(() => {
    loadHistoryAndStreak();
  }, [level]);

  const loadHistoryAndStreak = async () => {
    const history = await Storage.getQuizScores();
    setQuizHistory(history.filter(h => h.level === level));
    setStreak(Storage.getStreak());
  };

  const startQuiz = () => {
    if (levelQuestions.length === 0) return;
    
    // Select up to 10 random questions
    const shuffled = [...levelQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));
    
    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimer(0);
    setGameState("quiz");

    // Start timer
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const selectOption = (opt) => {
    if (isAnswered) return;
    setSelectedOption(opt);
  };

  const submitAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const currentQ = questions[currentIndex];
    const correct = currentQ.answer === selectedOption;
    if (correct) {
      setScore((s) => s + 1);
    }
    
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      endQuiz();
    }
  };

  const endQuiz = async () => {
    clearInterval(timerIntervalRef.current);
    setGameState("result");

    // Save score to local storage & DB
    await Storage.saveQuizScore(level, "Mixed Review", score, questions.length);
    
    // Streak increment if perfect score
    if (score === questions.length) {
      Storage.incrementStreak();
    }

    // Refresh history
    loadHistoryAndStreak();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="quiz-engine-container">
      {gameState === "start" && (
        <div className="panel quiz-start-screen" style={{ textAlign: "center", padding: "40px 20px" }}>
          <Award size={54} color="#536dff" style={{ margin: "0 auto 15px auto" }} />
          <h2>🧠 JLPT {level} Quiz Center</h2>
          <p style={{ color: "#aab6d0", maxWidth: "600px", margin: "10px auto 25px auto", fontSize: "14px", lineHeight: "1.6" }}>
            Test your knowledge of Japanese hiragana, katakana, kanji, vocabulary, and grammar rules for the {level} syllabus.
          </p>

          {levelQuestions.length > 0 ? (
            <button onClick={startQuiz} style={{ fontSize: "16px", padding: "12px 28px", fontWeight: "bold" }}>
              Start 10-Question Practice Quiz
            </button>
          ) : (
            <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.1)", color: "#ef4444", borderRadius: "10px", border: "1px solid rgba(239, 68, 68, 0.2)", display: "inline-block" }}>
              ⚠️ No questions available for JLPT {level} in the quiz bank yet.
            </div>
          )}

          {/* Quiz History */}
          {quizHistory.length > 0 && (
            <div style={{ marginTop: "40px", textAlign: "left", maxWidth: "600px", margin: "40px auto 0 auto" }}>
              <h4 style={{ marginBottom: "12px" }}>Recent Quiz Results ({level})</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {quizHistory.slice(0, 5).map((h) => (
                  <div
                    key={h.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "rgba(18, 28, 52, 0.5)",
                      border: "1px solid #233457",
                      fontSize: "13px"
                    }}
                  >
                    <span>{h.quizType}</span>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <span style={{ fontWeight: "bold", color: h.percentage >= 80 ? "#10b981" : h.percentage >= 50 ? "#eab308" : "#ef4444" }}>
                        {h.score} / {h.total} ({h.percentage}%)
                      </span>
                      <span style={{ color: "#687697", fontSize: "11px" }}>
                        {new Date(h.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === "quiz" && questions.length > 0 && (
        <div className="panel quiz-play-screen">
          {/* Header info */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "14px", color: "#aab6d0" }}>
              Question <strong>{currentIndex + 1}</strong> of {questions.length}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#536dff", fontWeight: "bold" }}>
              <Clock size={16} /> {formatTime(timer)}
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ width: "100%", height: "4px", background: "#0b1223", borderRadius: "2px", marginBottom: "30px", overflow: "hidden" }}>
            <div style={{ width: `${((currentIndex + 1) / questions.length) * 100}%`, height: "100%", background: "#536dff", borderRadius: "2px", transition: "width 0.3s ease" }} />
          </div>

          {/* Question Text */}
          <div className="question-card" style={{ background: "#111b33", border: "1px solid #233457", padding: "30px 20px", borderRadius: "18px", textAlign: "center", marginBottom: "25px" }}>
            <span style={{ textTransform: "uppercase", background: "#223563", color: "#9db0ff", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold" }}>
              {questions[currentIndex].type}
            </span>
            <h3 style={{ fontSize: "20px", marginTop: "12px", color: "#fff", lineHeight: "1.5" }}>
              {questions[currentIndex].question}
            </h3>
          </div>

          {/* Options Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {questions[currentIndex].options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrectOpt = questions[currentIndex].answer === opt;
              
              let optStyle = {
                padding: "16px",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: "500",
                cursor: isAnswered ? "default" : "pointer",
                transition: "all 0.2s ease",
                textAlign: "left",
                background: "#121c34",
                border: "1px solid #2b3b61",
                color: "#fff"
              };

              if (isAnswered) {
                if (isCorrectOpt) {
                  optStyle.background = "rgba(16, 185, 129, 0.15)";
                  optStyle.border = "1px solid #10b981";
                  optStyle.color = "#34d399";
                } else if (isSelected) {
                  optStyle.background = "rgba(239, 68, 68, 0.15)";
                  optStyle.border = "1px solid #ef4444";
                  optStyle.color = "#f87171";
                } else {
                  optStyle.opacity = 0.5;
                }
              } else if (isSelected) {
                optStyle.background = "rgba(83, 109, 255, 0.15)";
                optStyle.border = "1px solid #536dff";
              }

              return (
                <button
                  key={opt}
                  onClick={() => selectOption(opt)}
                  style={optStyle}
                  disabled={isAnswered}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Action Bottom */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
            {!isAnswered ? (
              <button
                onClick={submitAnswer}
                disabled={selectedOption === null}
                style={{
                  padding: "10px 24px",
                  background: selectedOption === null ? "#1a2540" : "#536dff",
                  border: selectedOption === null ? "1px solid #283758" : "1px solid #536dff",
                  color: selectedOption === null ? "#687697" : "#fff",
                  opacity: selectedOption === null ? 0.6 : 1
                }}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                style={{
                  padding: "10px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                {currentIndex + 1 < questions.length ? "Next Question" : "View Results"} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {gameState === "result" && (
        <div className="panel quiz-result-screen" style={{ textAlign: "center", padding: "40px 20px" }}>
          <Award size={54} color="#eab308" style={{ margin: "0 auto 15px auto" }} />
          <h2>Quiz Completed!</h2>
          <p style={{ color: "#aab6d0", marginBottom: "25px" }}>Great job finishing the JLPT {level} practice session.</p>

          <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "30px" }}>
            <div style={{ padding: "15px 25px", background: "rgba(18, 28, 52, 0.6)", border: "1px solid #233457", borderRadius: "14px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#eab308" }}>
                {Math.round((score / questions.length) * 100)}%
              </div>
              <span style={{ fontSize: "12px", color: "#687697", textTransform: "uppercase" }}>Score</span>
            </div>

            <div style={{ padding: "15px 25px", background: "rgba(18, 28, 52, 0.6)", border: "1px solid #233457", borderRadius: "14px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#fff" }}>
                {score} / {questions.length}
              </div>
              <span style={{ fontSize: "12px", color: "#687697", textTransform: "uppercase" }}>Correct</span>
            </div>

            <div style={{ padding: "15px 25px", background: "rgba(18, 28, 52, 0.6)", border: "1px solid #233457", borderRadius: "14px" }}>
              <div style={{ fontSize: "28px", fontWeight: "bold", color: "#536dff" }}>
                {formatTime(timer)}
              </div>
              <span style={{ fontSize: "12px", color: "#687697", textTransform: "uppercase" }}>Time Spent</span>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
            <button onClick={startQuiz} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <RotateCcw size={16} /> Try Again
            </button>
            <button onClick={() => setGameState("start")} style={{ background: "#223563", borderColor: "#2b3b61" }}>
              Back to Center
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
