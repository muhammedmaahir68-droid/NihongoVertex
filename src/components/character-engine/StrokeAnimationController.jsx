import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Hash, Eye, Sparkles, PenLine, Volume2 } from "lucide-react";
import CharacterSVG from "./CharacterSVG.jsx";
import MnemonicViewer from "./MnemonicViewer.jsx";
import MnemonicFormationSVG from "./MnemonicFormationSVG.jsx";
import TraceCanvas from "./TraceCanvas.jsx";

/**
 * NIHONGO VERTEX - MASTER STROKE ANIMATION CONTROLLER
 * Coordinates 10 animation modes, progressive rendering, speed regulation (0.5x-2x),
 * step-by-step navigation, trace mode, and mnemonic transformation sequences.
 */

export default function StrokeAnimationController({
  characterData,
  onCompleteCharacter,
  onSpeak,
  className = ""
}) {
  // Navigation & playback state
  const [activeMode, setActiveMode] = useState("demo"); // "demo" | "step" | "trace" | "mnemonic"
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speed, setSpeed] = useState(1.0); // 0.5 | 1.0 | 1.5 | 2.0
  const [showStrokeNumbers, setShowStrokeNumbers] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  const strokes = characterData?.strokes || [];
  const totalStrokes = strokes.length;
  const hasVerifiedStrokeOrder = characterData?.type !== "kanji" || characterData?.isVerifiedStrokeOrder === true;
  const animRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Keep ref in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Reset when character changes
  useEffect(() => {
    stopAnimation();
    setCurrentStrokeIndex(0);
    setAnimationProgress(0);
    setIsCompleted(false);
    // Start auto demonstration on change
    startAutoDemonstration();
    return () => stopAnimation();
  }, [characterData?.character]);

  function stopAnimation() {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  }

  function startAutoDemonstration() {
    stopAnimation();
    setCurrentStrokeIndex(0);
    setAnimationProgress(0);
    setIsCompleted(false);
    setIsPlaying(true);
    isPlayingRef.current = true;

    animateStroke(0);
  }

  function animateStroke(strokeIdx) {
    if (strokeIdx >= totalStrokes) {
      setIsCompleted(true);
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (onCompleteCharacter) {
        onCompleteCharacter(characterData);
      }
      return;
    }

    setCurrentStrokeIndex(strokeIdx);
    setAnimationProgress(0);

    const stroke = strokes[strokeIdx];
    const baseDuration = (stroke?.duration || 700) / speed;
    const pauseDuration = (stroke?.pause || 180) / speed;

    const startTime = performance.now();

    function frame(now) {
      if (!isPlayingRef.current) return;
      const elapsed = now - startTime;
      const prog = Math.min(1, elapsed / baseDuration);
      setAnimationProgress(prog);

      if (prog < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        // Pause between strokes
        setTimeout(() => {
          if (!isPlayingRef.current) return;
          animateStroke(strokeIdx + 1);
        }, pauseDuration);
      }
    }

    animRef.current = requestAnimationFrame(frame);
  }

  function togglePlayPause() {
    if (isPlaying) {
      stopAnimation();
    } else {
      if (isCompleted || currentStrokeIndex >= totalStrokes - 1) {
        startAutoDemonstration();
      } else {
        setIsPlaying(true);
        isPlayingRef.current = true;
        animateStroke(currentStrokeIndex);
      }
    }
  }

  function prevStroke() {
    stopAnimation();
    setIsCompleted(false);
    setCurrentStrokeIndex(i => Math.max(0, i - 1));
    setAnimationProgress(1);
  }

  function nextStroke() {
    stopAnimation();
    if (currentStrokeIndex < totalStrokes - 1) {
      setCurrentStrokeIndex(i => i + 1);
      setAnimationProgress(1);
    } else {
      setIsCompleted(true);
    }
  }

  function replay() {
    startAutoDemonstration();
  }

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
        <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => {
              setActiveMode("demo");
              startAutoDemonstration();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === "demo"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            ▶ Demonstration
          </button>
          <button
            onClick={() => {
              setActiveMode("step");
              stopAnimation();
              setAnimationProgress(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === "step"
                ? "bg-white text-stone-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            👣 Step-by-Step
          </button>
          <button
            onClick={() => {
              setActiveMode("trace");
              stopAnimation();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === "trace"
                ? "bg-red-700 text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            ✍️ Trace & Practice
          </button>
          <button
            onClick={() => {
              setActiveMode("blind");
              stopAnimation();
              onSpeak?.(characterData?.character);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === "blind"
                ? "bg-stone-900 text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Hear & Write
          </button>
          <button
            onClick={() => {
              setActiveMode("mnemonic");
              stopAnimation();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === "mnemonic"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            💡 Remember It
          </button>
        </div>

        {/* Speed Regulators */}
        {activeMode === "demo" && (
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
            <span className="text-[11px] font-bold text-stone-400 px-1.5">Speed:</span>
            {[0.5, 1.0, 1.5, 2.0].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded-md font-semibold text-[11px] transition-colors ${
                  speed === s ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-200/60"
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ACTIVE MODE DISPLAY */}
      {activeMode === "trace" ? (
        <TraceCanvas
          characterData={characterData}
          onSpeak={onSpeak}
          size={320}
        />
      ) : activeMode === "blind" ? (
        <TraceCanvas
          characterData={characterData}
          onSpeak={onSpeak}
          size={320}
          blindMode={true}
        />
      ) : activeMode === "mnemonic" ? (
        <MnemonicViewer
          characterData={characterData}
          onPlayStrokeAnimation={() => {
            setActiveMode("demo");
            startAutoDemonstration();
          }}
          onSpeak={onSpeak}
        />
      ) : !hasVerifiedStrokeOrder ? (
        <div className="space-y-3">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            This Kanji has mnemonic formation artwork, but not verified stroke-order paths. The outline will not be shown as official handwriting.
          </div>
          <MnemonicFormationSVG characterData={characterData} autoPlay={true} />
        </div>
      ) : (
        /* STANDARD & STEP ANIMATION VIEW */
        <div className="space-y-4">
          {/* Main SVG Viewport */}
          <div className="flex justify-center">
            <CharacterSVG
              characterData={characterData}
              currentStrokeIndex={currentStrokeIndex}
              animationProgress={animationProgress}
              isAnimating={isPlaying}
              isCompleted={isCompleted}
              showGrid={showGrid}
              showStrokeNumbers={showStrokeNumbers}
              showStartIndicator={!isCompleted}
              size={320}
            />
          </div>

          {/* Stroke Progress Status Bar */}
          <div className="flex items-center justify-between px-2 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-800">
                Stroke {isCompleted ? totalStrokes : currentStrokeIndex + 1} / {totalStrokes}
              </span>
              {strokes[currentStrokeIndex]?.tip && (
                <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded-md text-[11px] font-medium hidden sm:inline">
                  📌 {strokes[currentStrokeIndex].tip}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowStrokeNumbers(s => !s)}
                className={`p-1.5 rounded-lg border text-[11px] font-medium inline-flex items-center gap-1 ${
                  showStrokeNumbers
                    ? "border-red-300 bg-red-50 text-red-700"
                    : "border-stone-200 text-stone-500"
                }`}
                title="Toggle stroke numbers"
              >
                <Hash size={13} /> {showStrokeNumbers ? "Numbers ON" : "Numbers OFF"}
              </button>
            </div>
          </div>

          {/* Playback Control Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-stone-50 border border-stone-200/80 rounded-2xl p-3 shadow-xs">
            <button
              onClick={prevStroke}
              disabled={currentStrokeIndex === 0 && !isCompleted}
              className="px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-30 text-stone-700 text-xs font-semibold inline-flex items-center gap-1"
            >
              <ChevronLeft size={15} /> Prev Stroke
            </button>

            <button
              onClick={togglePlayPause}
              className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-xs font-bold shadow-sm inline-flex items-center gap-2 transition-colors"
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              {isPlaying ? "Pause" : isCompleted ? "Replay Animation" : "Play Stroke"}
            </button>

            <button
              onClick={nextStroke}
              disabled={isCompleted}
              className="px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-30 text-stone-700 text-xs font-semibold inline-flex items-center gap-1"
            >
              Next Stroke <ChevronRight size={15} />
            </button>

            <button
              onClick={replay}
              className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
              title="Restart from Stroke 1"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
