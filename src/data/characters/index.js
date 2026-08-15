/**
 * NIHONGO VERTEX - MASTER CHARACTER REGISTRY
 * Unified database and lookup helpers for Hiragana, Katakana, Dakuon, Yōon & 107 Kanji
 */

import { HIRAGANA_DATA } from "./hiragana.js";
import { KATAKANA_DATA } from "./katakana.js";
import { KANJI_DATA } from "./kanji.js";
import { getKanjiContext } from "./kanjiContext.js";
import { DAKUON_DATA } from "./dakuonYoon.js";
import { HIRAGANA_107, KATAKANA_107, KANA_107_COUNTS } from "./expandedKana.js";

export { HIRAGANA_DATA, KATAKANA_DATA, KANJI_DATA, DAKUON_DATA, HIRAGANA_107, KATAKANA_107, KANA_107_COUNTS };

const KANA_VARIANTS_107 = [...HIRAGANA_107.filter(c => c.type !== "hiragana"), ...KATAKANA_107.filter(c => c.type !== "katakana")];

export const ALL_CHARACTERS = [
  ...HIRAGANA_107,
  ...KATAKANA_107,
  ...KANJI_DATA,
  ...DAKUON_DATA
];

const CHAR_MAP = new Map();
ALL_CHARACTERS.forEach(c => {
  CHAR_MAP.set(c.character, c);
});

// Japanese readings are shown in hiragana in the learner UI.
function kataToHira(value = "") {
  return value.replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

KANJI_DATA.forEach(c => {
  c.readingsHiragana = {
    onyomi: (c.onyomi || []).map(kataToHira),
    kunyomi: (c.kunyomi || []).map(kataToHira)
  };
});

// Keep the core character records together with their supplementary real-world
// context.  The Character Lab uses this list for the Kanji tab.
const KANJI_DATA_ENRICHED = KANJI_DATA.map(character => ({
  ...character,
  context: getKanjiContext(character.character)
}));

/**
 * Retrieve character metadata by character string (e.g. 'あ', 'ア', '明')
 */
export function getCharacter(char) {
  return CHAR_MAP.get(char) || null;
}

/**
 * Get characters filtered by script type
 */
export function getCharactersByScript(script) {
  switch (script) {
    case "hiragana": return HIRAGANA_107;
    case "katakana": return KATAKANA_107;
    case "variants": return KANA_VARIANTS_107;
    case "kanji": return KANJI_DATA_ENRICHED;
    case "dakuon": return DAKUON_DATA;
    default: return HIRAGANA_107;
  }
}

export const KANA_CATEGORIES = [
  { key: "seion", label: "Seion", filter: c => c.category?.includes("Seion") || c.category?.includes("Basic") },
  { key: "dakuon", label: "Dakuon", filter: c => c.type === "dakuon" },
  { key: "handakuon", label: "Handakuon", filter: c => c.type === "handakuon" },
  { key: "yoon-seion", label: "Yōon Seion", filter: c => c.type === "yoon-seion" },
  { key: "yoon-dakuon", label: "Yōon Dakuon", filter: c => c.type === "yoon-dakuon" },
  { key: "yoon-handakuon", label: "Yōon Handakuon", filter: c => c.type === "yoon-handakuon" },
  { key: "extended", label: "Extended", filter: c => c.type === "extended" }
];

/**
 * Search characters across character, romaji, English meaning, category, and Tamil
 */
export function searchCharacters(query = "") {
  const q = query.toLowerCase().trim();
  if (!q) return ALL_CHARACTERS;
  return ALL_CHARACTERS.filter(c => {
    const char = (c.character || "").toLowerCase();
    const romaji = (c.romaji || "").toLowerCase();
    const meaning = (c.meaning || "").toLowerCase();
    const cat = (c.category || "").toLowerCase();
    const on = (c.onyomi || []).join(" ").toLowerCase();
    const kun = (c.kunyomi || []).join(" ").toLowerCase();
    return char.includes(q) || romaji.includes(q) || meaning.includes(q) || cat.includes(q) || on.includes(q) || kun.includes(q);
  });
}
