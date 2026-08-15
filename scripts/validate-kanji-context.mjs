import { KANJI_DATA } from '../src/data/characters/kanji.js';
import { KANJI_CONTEXT } from '../src/data/characters/kanjiContext.js';

const chars = new Set(KANJI_DATA.map(k => k.character));
const contextChars = new Set(Object.keys(KANJI_CONTEXT));
const missing = [...chars].filter(c => !contextChars.has(c));
const extra = [...contextChars].filter(c => !chars.has(c));

console.log(`Kanji records: ${chars.size}`);
console.log(`Context records: ${contextChars.size}`);
console.log(`Missing context: ${missing.length ? missing.join(' ') : 'none'}`);
console.log(`Extra context: ${extra.length ? extra.join(' ') : 'none'}`);

if (chars.size !== 107 || contextChars.size !== 107 || missing.length || extra.length) process.exit(1);
console.log('PASS: all 107 Kanji have names, places, foreign-language notes, and pictorial context.');
