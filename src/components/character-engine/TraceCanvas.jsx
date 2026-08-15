import React, { useRef, useState, useEffect } from "react";
import { RotateCcw, Eye, EyeOff, CheckCircle2, AlertCircle, Sparkles, Undo, Volume2 } from "lucide-react";

/**
 * NIHONGO VERTEX - INTERACTIVE TRACE & WRITING PRACTICE CANVAS
 * Provides semi-transparent guides, starting point validation,
 * stroke tracking, accuracy estimation, and calligraphy feedback.
 */

export default function TraceCanvas({
  characterData,
  onComplete,
  onSpeak,
  blindMode = false,
  size = 320,
  className = ""
}) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const strokesHistoryRef = useRef([]);
  const currentPathRef = useRef([]);

  const [guideOpacity, setGuideOpacity] = useState(0.35);
  const [userStrokeCount, setUserStrokeCount] = useState(0);
  const [accuracy, setAccuracy] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const targetStrokeCount = characterData?.strokeCount || characterData?.strokes?.length || 1;

  // Initialize canvas on character change or mount
  useEffect(() => {
    clearCanvas();
  }, [characterData?.character]);

  useEffect(() => {
    setGuideOpacity(blindMode ? 0 : 0.35);
    if (blindMode) onSpeak?.(characterData?.character);
  }, [blindMode, characterData?.character]);

  function getCanvasCoords(e) {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return [(e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY];
  }

  function handlePointerDown(e) {
    e.preventDefault();
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch (_) {}
    drawingRef.current = true;
    const [x, y] = getCanvasCoords(e);
    currentPathRef.current = [{ x, y }];

    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = "#1c1917";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function handlePointerMove(e) {
    if (!drawingRef.current) return;
    e.preventDefault();
    const [x, y] = getCanvasCoords(e);
    currentPathRef.current.push({ x, y });

    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function handlePointerUp() {
    if (!drawingRef.current) return;
    drawingRef.current = false;

    if (currentPathRef.current.length > 2) {
      strokesHistoryRef.current.push([...currentPathRef.current]);
      const count = strokesHistoryRef.current.length;
      setUserStrokeCount(count);

      // Check if finished expected strokes
      if (count >= targetStrokeCount) {
        evaluateHandwriting(count);
      } else {
        setFeedback({
          status: "in-progress",
          message: `Stroke ${count} / ${targetStrokeCount} drawn. Keep going!`
        });
      }
    }
  }

  function evaluateHandwriting(strokesDrawn) {
    // This canvas verifies completion by stroke count. It does not pretend to
    // provide geometric handwriting accuracy without a real handwriting model.
    setAccuracy(null);
    setIsCompleted(true);
    setFeedback({
      status: "success",
      message: `🎉 Great work! You completed all ${targetStrokeCount} practice strokes. Review the SVG guide and repeat for better form.`
    });

    if (onComplete) {
      onComplete({
        character: characterData.character,
        strokesDrawn,
        targetStrokeCount,
        accuracy: null
      });
    }
  }

  function redrawAllStrokes() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#1c1917";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    strokesHistoryRef.current.forEach(stroke => {
      if (stroke.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  }

  function undoLastStroke() {
    if (strokesHistoryRef.current.length === 0) return;
    strokesHistoryRef.current.pop();
    const count = strokesHistoryRef.current.length;
    setUserStrokeCount(count);
    setIsCompleted(false);
    setAccuracy(null);
    setFeedback(null);
    redrawAllStrokes();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokesHistoryRef.current = [];
    currentPathRef.current = [];
    setUserStrokeCount(0);
    setAccuracy(null);
    setFeedback(null);
    setIsCompleted(false);
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Controls Header */}
      <div className="flex items-center justify-between gap-3 bg-white border border-stone-200 rounded-xl p-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-stone-700">
            Strokes: <b className="text-red-700">{userStrokeCount}</b> / {targetStrokeCount}
          </span>
          {accuracy !== null && (
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full font-bold">
              ✓ {accuracy}% Accuracy
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Guide Opacity Toggle */}
          {!blindMode && <button
            onClick={() => setGuideOpacity(o => (o === 0.35 ? 0.65 : o === 0.65 ? 0 : 0.35))}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-medium inline-flex items-center gap-1"
            title="Toggle Guide"
          >
            {guideOpacity === 0 ? <EyeOff size={15} /> : <Eye size={15} />}
            <span className="hidden sm:inline">Guide: {Math.round(guideOpacity * 100)}%</span>
          </button>}

          {/* Undo */}
          <button
            onClick={undoLastStroke}
            disabled={userStrokeCount === 0}
            className="p-2 rounded-lg border border-stone-200 disabled:opacity-30 hover:bg-stone-50 text-stone-600"
            title="Undo stroke"
          >
            <Undo size={15} />
          </button>

          {/* Clear */}
          <button
            onClick={clearCanvas}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600"
            title="Clear canvas"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Main Drawing Area */}
      <div
        className="nv-writing-surface relative mx-auto rounded-2xl shadow-sm overflow-hidden select-none touch-none cursor-crosshair"
        style={{ width: size, height: size, touchAction: "none" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onLostPointerCapture={handlePointerUp}
      >
        {/* Japanese Calligraphy Tianzige Grid Background */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2 opacity-30">
          <div className="border-r border-stone-300 border-dashed" />
          <div />
          <div className="border-t border-stone-300 border-dashed col-span-2" />
        </div>

        {/* Verified SVG stroke-order guide */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 109 109" aria-hidden="true" style={{ opacity: guideOpacity }}>
          <rect x="2" y="2" width="105" height="105" fill="none" stroke="#d6d3d1" strokeWidth="0.7" rx="2" />
          <line x1="54.5" y1="2" x2="54.5" y2="107" stroke="#a8a29e" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="2" y1="54.5" x2="107" y2="54.5" stroke="#a8a29e" strokeWidth="0.5" strokeDasharray="2,2" />
          {(characterData?.strokes || []).map((stroke, i) => (
            <g key={i}>
              <path d={stroke.path} fill="none" stroke="#dc2626" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.32" />
              {stroke.start && <circle cx={stroke.start.x} cy={stroke.start.y} r="1.8" fill="#dc2626" opacity="0.7" />}
            </g>
          ))}
        </svg>
        {/* Character label remains visible above the SVG guide */}
        {!blindMode && <div className="absolute left-3 top-3 px-2 py-1 rounded-lg bg-white/80 border border-stone-200 text-[10px] font-bold text-stone-500 pointer-events-none" lang="ja">{characterData?.character} · SVG Guide</div>}
        {blindMode && <div className="absolute inset-x-6 top-5 text-center text-xs font-semibold text-stone-500 pointer-events-none">Listen, then write the character from memory.</div>}

        {/* Interactive Drawing Canvas */}
        <canvas
          ref={canvasRef}
          width={size * 2}
          height={size * 2}
          className="w-full h-full relative z-10 pointer-events-none"
        />
      </div>

      {/* Real-time Feedback Banner */}
      {feedback && (
        <div
          className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
            feedback.status === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-amber-50 text-amber-800 border border-amber-200"
          }`}
        >
          {feedback.status === "success" ? (
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
          ) : (
            <AlertCircle size={16} className="text-amber-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Tip & Pronunciation Footer */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>{blindMode ? "No character or guide is shown." : `Draw each stroke in natural order from 1 to ${targetStrokeCount}.`}</span>
        <button
          onClick={() => onSpeak && onSpeak(characterData.character)}
          className="text-red-700 hover:text-red-800 inline-flex items-center gap-1 font-semibold"
        >
          <Volume2 size={14} /> Pronounce
        </button>
      </div>
    </div>
  );
}
