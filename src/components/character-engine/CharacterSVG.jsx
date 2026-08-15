import React, { useLayoutEffect, useRef, useState } from "react";

/**
 * NIHONGO VERTEX - CORE SVG STROKE RENDERING ENGINE
 * Consumes verified Japanese stroke paths (109x109 KanjiVG standard)
 * Supports progressive dashoffset reveals, start points (●), directional indicators,
 * stroke number badges, calligraphy grid, and completion glow.
 */

export function CalligraphyGrid({ size = 320, showGrid = true }) {
  if (!showGrid) return null;
  return (
    <g className="calligraphy-grid" pointerEvents="none" opacity="0.35">
      {/* Outer boundary */}
      <rect x="2" y="2" width="105" height="105" fill="none" stroke="#d6d3d1" strokeWidth="0.8" rx="3" />
      {/* Horizontal & Vertical center dashed lines (Tianzige 田 grid) */}
      <line x1="2" y1="54.5" x2="107" y2="54.5" stroke="#a8a29e" strokeWidth="0.6" strokeDasharray="2,2" />
      <line x1="54.5" y1="2" x2="54.5" y2="107" stroke="#a8a29e" strokeWidth="0.6" strokeDasharray="2,2" />
      {/* Diagonal dashed guide lines (Mizige 米 grid) */}
      <line x1="2" y1="2" x2="107" y2="107" stroke="#e7e5e4" strokeWidth="0.4" strokeDasharray="3,3" />
      <line x1="107" y1="2" x2="2" y2="107" stroke="#e7e5e4" strokeWidth="0.4" strokeDasharray="3,3" />
    </g>
  );
}

export function StrokePath({
  stroke,
  index,
  isDrawn,
  isAnimating,
  animationProgress = 1,
  strokeColor = "#1c1917",
  strokeWidth = 4.8,
  ghost = false
}) {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(160);

  // Use the browser's exact SVG path length. A fixed dash length made longer
  // characters reveal in jumps and looked like a scribble.
  useLayoutEffect(() => {
    try {
      const length = pathRef.current?.getTotalLength?.();
      if (Number.isFinite(length) && length > 0) setPathLength(length);
    } catch (_) {}
  }, [stroke.path]);

  let dashoffset = 0;
  if (ghost) {
    dashoffset = 0;
  } else if (isDrawn) {
    dashoffset = 0;
  } else if (isAnimating) {
    dashoffset = pathLength * (1 - Math.min(1, Math.max(0, animationProgress)));
  } else {
    dashoffset = pathLength;
  }

  return (
    <path
      ref={pathRef}
      d={stroke.path}
      fill="none"
      stroke={ghost ? "#e7e5e4" : isAnimating ? "#dc2626" : strokeColor}
      strokeWidth={ghost ? strokeWidth * 1.15 : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={ghost ? "none" : `${pathLength}`}
      strokeDashoffset={ghost ? 0 : dashoffset}
      style={{
        transition: isAnimating ? "none" : "stroke-dashoffset 0.15s ease-out, stroke 0.3s ease",
        opacity: ghost ? 0.45 : isDrawn || isAnimating ? 1 : 0
      }}
    />
  );
}

export function StartPointIndicator({ start, direction, isVisible = true }) {
  if (!isVisible || !start) return null;

  return (
    <g className="start-indicator animate-pulse" pointerEvents="none">
      {/* Outer ripple */}
      <circle cx={start.x} cy={start.y} r="5.5" fill="#ef4444" opacity="0.35">
        <animate attributeName="r" values="3.5;7.5;3.5" dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.4s" repeatCount="indefinite" />
      </circle>
      {/* Central bold start dot (●) */}
      <circle cx={start.x} cy={start.y} r="3.2" fill="#dc2626" stroke="#ffffff" strokeWidth="1" />
      {/* Start label */}
      <text x={start.x + 4.5} y={start.y - 4} fontSize="6" fontWeight="bold" fill="#dc2626">
        ● START
      </text>
    </g>
  );
}

export function StrokeNumberBadge({ number, start, isVisible = true, isCompleted = false }) {
  if (!isVisible || !start) return null;

  return (
    <g className="stroke-number-badge" pointerEvents="none">
      <circle
        cx={start.x - 4}
        cy={start.y - 4}
        r="4.2"
        fill={isCompleted ? "#15803d" : "#dc2626"}
        stroke="#ffffff"
        strokeWidth="0.8"
      />
      <text
        x={start.x - 4}
        y={start.y - 1.8}
        textAnchor="middle"
        fontSize="5.2"
        fontWeight="bold"
        fill="#ffffff"
      >
        {number}
      </text>
    </g>
  );
}

export default function CharacterSVG({
  characterData,
  currentStrokeIndex = 0,
  animationProgress = 1,
  isAnimating = false,
  isCompleted = false,
  showGrid = true,
  showStrokeNumbers = true,
  showStartIndicator = true,
  showGhost = false,
  size = 320,
  className = ""
}) {
  if (!characterData || !characterData.strokes) {
    return (
      <div className="flex items-center justify-center bg-stone-100 rounded-2xl p-8 text-stone-400">
        No character stroke data available
      </div>
    );
  }

  const strokes = characterData.strokes || [];
  const currentStroke = strokes[currentStrokeIndex] || strokes[0];

  return (
    <div
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Completion Aura Glow */}
      {isCompleted && (
        <div className="absolute inset-4 rounded-3xl bg-gradient-to-r from-red-500/15 via-amber-400/20 to-red-500/15 blur-xl pointer-events-none transition-opacity duration-700 animate-pulse" />
      )}

      <svg
        viewBox="0 0 109 109"
        className="w-full h-full drop-shadow-sm overflow-visible bg-stone-50/70 border border-stone-200 rounded-2xl"
      >
        {/* Japanese Calligraphy Grid */}
        <CalligraphyGrid showGrid={showGrid} />

        {/* Ghost guide path for trace/learning mode */}
        {showGhost &&
          strokes.map((stroke, idx) => (
            <StrokePath key={`ghost-${idx}`} stroke={stroke} index={idx} ghost={true} />
          ))}

        {/* Real progressive strokes */}
        {strokes.map((stroke, idx) => {
          const isDrawn = idx < currentStrokeIndex || (idx === currentStrokeIndex && isCompleted);
          const isCurrentAnimating = idx === currentStrokeIndex && isAnimating && !isCompleted;

          return (
            <StrokePath
              key={`stroke-${idx}`}
              stroke={stroke}
              index={idx}
              isDrawn={isDrawn}
              isAnimating={isCurrentAnimating}
              animationProgress={isCurrentAnimating ? animationProgress : 1}
              strokeColor="#1c1917"
            />
          );
        })}

        {/* Starting Point Indicator (●) on current active stroke */}
        {!isCompleted && showStartIndicator && currentStroke && (
          <StartPointIndicator
            start={currentStroke.start}
            direction={currentStroke.direction}
            isVisible={!isCompleted}
          />
        )}

        {/* Number badges for all strokes */}
        {showStrokeNumbers &&
          strokes.map((stroke, idx) => {
            const isFinished = idx < currentStrokeIndex || isCompleted;
            const isCurrent = idx === currentStrokeIndex;
            return (
              <StrokeNumberBadge
                key={`badge-${idx}`}
                number={stroke.number || idx + 1}
                start={stroke.start}
                isVisible={isFinished || isCurrent}
                isCompleted={isFinished}
              />
            );
          })}
      </svg>
    </div>
  );
}
