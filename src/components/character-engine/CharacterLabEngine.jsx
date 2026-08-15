import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Volume2,
  Sparkles,
  BookOpen,
  Check,
  ChevronRight,
  ChevronLeft,
  PenLine,
  HelpCircle,
  Trophy,
  Award,
  Layers,
  RotateCcw,
  Zap,
  Globe
} from "lucide-react";
import StrokeAnimationController from "./StrokeAnimationController.jsx";
import {
  HIRAGANA_DATA,
  KATAKANA_DATA,
  KANJI_DATA,
  DAKUON_DATA,
  HIRAGANA_107,
  KATAKANA_107,
  KANA_107_COUNTS,
  KANA_CATEGORIES,
  getCharactersByScript,
  searchCharacters
} from "../../data/characters/index.js";
import { saveProgressApi, fetchProgress } from "../../api.js";

/**
 * NIHONGO VERTEX - MASTER CHARACTER LAB & SVG ANIMATION ENGINE
 * Complete interactive suite for Hiragana, Katakana, Dakuon, and Kanji.
 */

export default function CharacterLabEngine({ onGainXP, className = "" }) {
  const [script, setScript] = useState("hiragana"); // hiragana | katakana | variants | kanji
  const [kanaCategory, setKanaCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  // Active dataset
  const currentList = useMemo(() => {
    return getCharactersByScript(script);
  }, [script]);

  // Filtered dataset for search
  const categoryFilteredList = useMemo(() => {
    if (script === "kanji" || kanaCategory === "all") return currentList;
    const cat = KANA_CATEGORIES.find(x => x.key === kanaCategory);
    return cat ? currentList.filter(cat.filter) : currentList;
  }, [currentList, kanaCategory, script]);

  const displayList = useMemo(() => {
    if (!searchQuery.trim()) return categoryFilteredList;
    const q = searchQuery.toLowerCase().trim();
    return categoryFilteredList.filter(
      c =>
        c.character.includes(q) ||
        (c.romaji || "").toLowerCase().includes(q) ||
        (c.meaning || "").toLowerCase().includes(q) ||
        (c.category || "").toLowerCase().includes(q)
    );
  }, [categoryFilteredList, searchQuery]);

  const activeChar = categoryFilteredList[selectedIndex] || categoryFilteredList[0] || HIRAGANA_107[0];

  // Natural speech synthesis
  function speak(text = activeChar?.character) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  }

  function handleNextCharacter() {
    if (!categoryFilteredList.length) return;
    setSelectedIndex(idx => (idx + 1) % categoryFilteredList.length);
    setQuizMode(false);
    setQuizAnswer(null);
  }

  function handlePrevCharacter() {
    if (!categoryFilteredList.length) return;
    setSelectedIndex(idx => (idx - 1 + categoryFilteredList.length) % categoryFilteredList.length);
    setQuizMode(false);
    setQuizAnswer(null);
  }

  function handleSelectCharacter(item) {
    const idx = categoryFilteredList.findIndex(c => c.character === item.character);
    if (idx !== -1) {
      setSelectedIndex(idx);
      setSearchQuery("");
      setQuizMode(false);
      setQuizAnswer(null);
    }
  }

  function handleCompleteCharacter() {
    if (onGainXP) {
      onGainXP(15);
    }
    // Also sync with localhost backend
    saveProgressApi({ xp: 15 }).catch(() => {});
  }

  // Generate 3 randomized options for rapid recall quiz
  const quizOptions = useMemo(() => {
    if (!activeChar) return [];
    const others = currentList.filter(c => c.character !== activeChar.character);
    const shuffled = [...others].sort(() => 0.5 - Math.random()).slice(0, 2);
    const pool = [activeChar, ...shuffled].sort(() => 0.5 - Math.random());
    return pool;
  }, [activeChar, currentList]);

  return (
    <div className={`space-y-6 pb-24 md:pb-8 ${className}`}>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-red-700 mb-1">
            <Sparkles size={14} /> Japanese SVG Stroke Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Kana & Kanji Stroke Lab · 文字ラボ
          </h1>
          <p className="text-sm text-stone-500 mt-1 max-w-xl leading-relaxed">
            Authentic Japanese calligraphy stroke-order animations, start-point guidance, visual mnemonic transformations, and handwriting practice.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => speak(activeChar.character)}
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-sm transition-all"
          >
            <Volume2 size={16} /> Listen ({activeChar.romaji})
          </button>
        </div>
      </div>

      {/* Script Selection Bar */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "hiragana", label: "Hiragana ひらがな", badge: "107" },
          { key: "katakana", label: "Katakana カタカナ", badge: "107" },
          { key: "variants", label: "Dakuon · Handakuon · Yōon", badge: "61" },
          { key: "kanji", label: "Kanji 漢字", badge: `${KANJI_DATA.length}` }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => {
              setScript(tab.key);
              setSelectedIndex(0);
              setSearchQuery("");
              setKanaCategory("all");
              setQuizMode(false);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all inline-flex items-center gap-2 ${
              script === tab.key
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                script === tab.key ? "bg-white/20 text-white" : "bg-stone-100 text-stone-500"
              }`}
            >
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {script !== "kanji" && (
        <div className="space-y-2">
        <div className="flex flex-wrap gap-2 bg-white border border-stone-200 rounded-2xl p-3">
          <button onClick={() => { setKanaCategory("all"); setSelectedIndex(0); }} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${kanaCategory === "all" ? "bg-red-700 text-white" : "bg-stone-100 text-stone-600"}`}>All 107</button>
          {KANA_CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => { setKanaCategory(cat.key); setSelectedIndex(0); }} className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${kanaCategory === cat.key ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600"}`}>{cat.label}</button>
          ))}
        </div>
        <div className="px-1 text-[11px] text-stone-500">107 curriculum entries = 46 Seion + 20 Dakuon + 5 Handakuon + 21 Yōon Seion + 9 Yōon Dakuon + 3 Yōon Handakuon + 3 extended/archaic forms. The 3 extended forms are included to meet the requested 107-count; the core modern set is 104.</div>
        </div>
      )}

      {/* Character Quick-Selector Grid & Search */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4 bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2">
          <Search size={16} className="text-stone-400 shrink-0" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={`Search ${script} by letter, romaji, meaning, or radical...`}
            className="w-full bg-transparent text-sm outline-none text-stone-900 placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-stone-400 hover:text-stone-600 font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2 max-h-48 overflow-y-auto pr-1">
          {displayList.map(item => {
            const isSelected = item.character === activeChar.character;
            return (
              <button
                key={item.character}
                onClick={() => handleSelectCharacter(item)}
                className={`p-2 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? "border-red-600 bg-red-50/80 shadow-xs ring-2 ring-red-500/20 scale-105"
                    : "border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50"
                }`}
              >
                <div className="text-2xl font-bold text-stone-900" lang="ja">
                  {item.character}
                </div>
                <div className="text-[10px] font-semibold text-red-700 truncate mt-0.5">
                  {item.romaji || (item.onyomi ? item.onyomi[0] : "")}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN WORKSPACE - MATCHING USER DESIGN SPECIFICATION */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Animation Canvas & Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 shadow-xs space-y-6">
          {/* Header Info */}
          <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-stone-900" lang="ja">
                  {activeChar.character}
                </span>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-red-700">
                    {activeChar.romaji ? activeChar.romaji.toUpperCase() : activeChar.meaning}
                  </div>
                  <div className="text-xs text-stone-400 font-medium">
                    {activeChar.category} · {activeChar.strokeCount} Strokes
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevCharacter}
                className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700"
                title="Previous character"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextCharacter}
                className="p-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700"
                title="Next character"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* SVG Character Animation Engine */}
          <StrokeAnimationController
            characterData={activeChar}
            onCompleteCharacter={handleCompleteCharacter}
            onSpeak={speak}
          />
        </div>

        {/* Right Column: Character Details, Mnemonic Story & Vocabulary (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Kanji Specific Component Equation Card */}
          {activeChar.type === "kanji" && (
            <div className="bg-gradient-to-br from-amber-500/10 via-white to-red-500/10 border border-amber-200/80 rounded-3xl p-5 shadow-xs">
              <div className="text-[11px] uppercase tracking-widest font-bold text-amber-800 mb-1">
                🧩 Kanji Decomposition
              </div>
              <div className="text-2xl font-bold text-stone-900 mb-2 flex items-center gap-2 flex-wrap">
                {activeChar.components?.map((c, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-white border border-stone-200 px-2 py-0.5 rounded-lg text-sm font-semibold">
                    <span>{c.emoji}</span>
                    <span lang="ja">{c.char}</span>
                    <span className="text-stone-400 font-normal">({c.meaning})</span>
                  </span>
                ))}
              </div>
              <div className="text-xs text-stone-600 leading-relaxed bg-white/80 p-3 rounded-xl border border-stone-200/60">
                <b>Radical:</b> {activeChar.radical} ({activeChar.radicalMeaning})
                <br />
                <b>Mnemonic:</b> {activeChar.mnemonic?.story}
              </div>

              {/* Onyomi & Kunyomi */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <div className="text-stone-400 font-medium">Onyomi (音読み)</div>
                  <div className="font-bold text-red-700 text-sm mt-0.5">
                    {activeChar.readingsHiragana?.onyomi?.join("、 ") || activeChar.onyomi?.map(x => x.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0)-0x60))).join("、 ") || "—"}
                  </div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-stone-200">
                  <div className="text-stone-400 font-medium">Kunyomi (訓読み)</div>
                  <div className="font-bold text-stone-800 text-sm mt-0.5">
                    {activeChar.readingsHiragana?.kunyomi?.join("、 ") || activeChar.kunyomi?.map(x => x.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0)-0x60))).join("、 ") || "—"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Kanji Names, Places, Foreign-Language & Pictorial Context */}
          {activeChar.type === "kanji" && activeChar.context && (
            <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900 uppercase tracking-wider">
                <Globe size={14} className="text-red-700" /> Kanji in the Real World
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-red-50 border border-red-100 p-3">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-red-800 mb-2">👤 Names / 人名</div>
                  <div className="space-y-1">
                    {(activeChar.context.names || []).map((x, i) => <div key={i} className="text-sm font-semibold text-stone-800" lang="ja">{x}</div>)}
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-3">
                  <div className="text-[11px] uppercase tracking-wider font-bold text-amber-800 mb-2">📍 Places / 地名</div>
                  <div className="space-y-1">
                    {(activeChar.context.places || []).map((x, i) => <div key={i} className="text-sm font-semibold text-stone-800" lang="ja">{x}</div>)}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-stone-50 border border-stone-200 p-3">
                <div className="text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-2">🌍 Foreign-language connection</div>
                <div className="space-y-2">
                  {(activeChar.context.foreign || []).map((x, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                      <span className="font-bold text-stone-900">{x.language}</span>
                      <span className="text-stone-600">{x.word}</span>
                      <span className="font-bold text-red-700" lang="ja">→ {x.japanese}</span>
                      <span className="w-full text-stone-500">{x.note}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-[11px] text-stone-500">
                  Note: modern foreign loanwords are normally written in Katakana. This section shows the foreign-language equivalent and how a learner will usually encounter it in Japanese; it does not claim the loanword itself is written with this Kanji.
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-sky-50 via-white to-emerald-50 border border-sky-100 p-3">
                <div className="text-[11px] uppercase tracking-wider font-bold text-sky-800 mb-2">🖼️ Pictorial Memory</div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-4xl">
                    {activeChar.context.picture?.object === "tree" ? "🌳" :
                     activeChar.context.picture?.object === "mountain" ? "⛰️" :
                     activeChar.context.picture?.object === "sun" ? "☀️" :
                     activeChar.context.picture?.object === "moon" ? "🌙" :
                     activeChar.context.picture?.object === "fire" ? "🔥" :
                     activeChar.context.picture?.object === "water drop" ? "💧" :
                     activeChar.context.picture?.object === "flower" ? "🌸" :
                     activeChar.context.picture?.object === "book" ? "📖" :
                     activeChar.context.picture?.object === "eye looking" ? "👁️" :
                     activeChar.context.picture?.object === "ear" ? "👂" :
                     activeChar.context.picture?.object === "hand" ? "✋" :
                     activeChar.context.picture?.object === "foot" ? "🦶" :
                     activeChar.context.picture?.object === "car" ? "🚗" :
                     activeChar.context.picture?.object === "child" ? "🧒" :
                     activeChar.context.picture?.object === "woman" ? "👩" :
                     activeChar.context.picture?.object === "man" ? "👨" :
                     activeChar.context.picture?.object === "crown" ? "👑" :
                     activeChar.context.picture?.object === "shell" ? "🐚" :
                     activeChar.context.picture?.object === "stone" ? "🪨" :
                     activeChar.context.picture?.object === "coin" ? "🪙" :
                     activeChar.context.picture?.object === "school" ? "🏫" :
                     activeChar.context.picture?.object === "shop" ? "🏪" :
                     activeChar.context.picture?.object === "safe home" ? "🏠" :
                     activeChar.context.picture?.object === "clock" ? "🕐" :
                     activeChar.context.picture?.object === "calendar" ? "📅" :
                     activeChar.context.picture?.object === "name tag" ? "🏷️" :
                     activeChar.context.picture?.object === "speech bubble" ? "💬" :
                     activeChar.context.picture?.object === "thought cloud" ? "💭" :
                     activeChar.context.picture?.object === "letter card" ? "🔤" :
                     activeChar.context.picture?.object === "document" ? "📄" : "🔹"}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900" lang="ja">{activeChar.character} → {activeChar.context.picture?.object}</div>
                    <div className="text-xs text-stone-600 mt-1">Feature: {activeChar.context.picture?.feature}</div>
                    <div className="text-xs text-stone-500 mt-1">This visual cue feeds the mnemonic → SVG formation animation.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Kana Specific Mnemonic Card */}
          {activeChar.type !== "kanji" && activeChar.mnemonic && (
            <div className="bg-gradient-to-br from-red-50 via-white to-amber-50 border border-red-100 rounded-3xl p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider mb-2">
                <Sparkles size={14} /> {activeChar.mnemonic.title || "Visual Memory Hook"}
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {activeChar.mnemonic.concept || activeChar.mnemonic.story}
              </p>
              {activeChar.hiraRelation && (
                <div className="mt-3 text-xs text-amber-900 bg-amber-50 border border-amber-200/70 p-2.5 rounded-xl font-medium">
                  🔗 {activeChar.hiraRelation}
                </div>
              )}
            </div>
          )}

          {/* Example Vocabulary Card */}
          {activeChar.exampleWords && activeChar.exampleWords.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                <span>📚 Example Vocabulary</span>
                <span className="text-stone-400">{activeChar.exampleWords.length} words</span>
              </div>

              <div className="space-y-2">
                {activeChar.exampleWords.map((word, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-2xl bg-stone-50/80 border border-stone-100 hover:border-red-200 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-stone-900 text-base" lang="ja">
                        {word.jp}
                      </div>
                      <div className="text-xs font-semibold text-red-700 mt-0.5">
                        🔤 {word.r}
                      </div>
                      <div className="text-xs text-stone-500 mt-0.5">
                        {word.en} {word.ta && `· ${word.ta}`}
                      </div>
                    </div>
                    <button
                      onClick={() => speak(word.jp)}
                      className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-red-300 text-stone-600 hover:text-red-700 transition-colors"
                      title="Listen word"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Example Sentence */}
              {activeChar.exampleSentence && (
                <div className="mt-3 p-3.5 rounded-2xl bg-red-50/40 border border-red-100 text-xs">
                  <div className="font-semibold text-red-900" lang="ja">
                    {activeChar.exampleSentence.jp}
                  </div>
                  <div className="text-red-700/80 font-medium mt-0.5">
                    {activeChar.exampleSentence.r}
                  </div>
                  <div className="text-stone-600 mt-1">
                    {activeChar.exampleSentence.en}
                  </div>
                  {activeChar.exampleSentence.ta && (
                    <div className="text-stone-500 mt-0.5" lang="ta">
                      {activeChar.exampleSentence.ta}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Rapid Recall Quiz Module */}
          <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-stone-900">
                <Zap size={16} className="text-amber-500" /> Rapid Recall Quiz
              </div>
              <button
                onClick={() => {
                  setQuizMode(m => !m);
                  setQuizAnswer(null);
                }}
                className="text-xs text-red-700 font-semibold"
              >
                {quizMode ? "Hide Quiz" : "Test Recall →"}
              </button>
            </div>

            {quizMode ? (
              <div className="space-y-3">
                <div className="text-xs text-stone-600">
                  Which is the correct pronunciation / meaning for{" "}
                  <b className="text-stone-900 text-base" lang="ja">
                    {activeChar.character}
                  </b>
                  ?
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {quizOptions.map((opt, idx) => {
                    const isCorrect = opt.character === activeChar.character;
                    const isSelected = quizAnswer === opt.character;
                    let btnClass = "border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800";
                    if (quizAnswer) {
                      if (isCorrect) btnClass = "border-green-500 bg-green-50 text-green-800 font-bold";
                      else if (isSelected) btnClass = "border-red-400 bg-red-50 text-red-700";
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (quizAnswer) return;
                          setQuizAnswer(opt.character);
                          if (isCorrect) {
                            setQuizScore(s => s + 1);
                            if (onGainXP) onGainXP(10);
                          }
                        }}
                        className={`p-3 rounded-2xl border text-xs font-semibold transition-all ${btnClass}`}
                      >
                        <div>{opt.romaji || opt.meaning}</div>
                        {opt.type === "kanji" && (
                          <div className="text-[10px] text-stone-400 truncate font-normal">
                            {opt.meaning}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {quizAnswer && (
                  <div
                    className={`p-2.5 rounded-xl text-xs font-medium text-center ${
                      quizAnswer === activeChar.character
                        ? "bg-green-100 text-green-800"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {quizAnswer === activeChar.character
                      ? "🎉 Correct! +10 XP earned"
                      : `Keep practicing! Answer is: ${activeChar.romaji || activeChar.meaning}`}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-stone-500">
                Can you remember the pronunciation and stroke order without looking? Test your instant recall.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
