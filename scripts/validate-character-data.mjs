import { HIRAGANA_107, KATAKANA_107, KANJI_DATA, KANA_107_COUNTS } from '../src/data/characters/index.js';

const assert = (ok, message) => { if (!ok) throw new Error(message); };
assert(HIRAGANA_107.length === 107, `Hiragana: ${HIRAGANA_107.length}`);
assert(KATAKANA_107.length === 107, `Katakana: ${KATAKANA_107.length}`);
for (const [label, list] of [['Hiragana', HIRAGANA_107], ['Katakana', KATAKANA_107]]) {
  const duplicates = list.map(x => x.character).filter((x, i, a) => a.indexOf(x) !== i);
  assert(!duplicates.length, `${label} duplicate: ${duplicates.join(', ')}`);
  assert(list.every(x => x.romaji && x.strokes?.length), `${label} contains an entry without romaji/strokes`);
}
console.log(JSON.stringify({ kana: KANA_107_COUNTS, hiragana: HIRAGANA_107.length, katakana: KATAKANA_107.length, kanji: KANJI_DATA.length }, null, 2));
