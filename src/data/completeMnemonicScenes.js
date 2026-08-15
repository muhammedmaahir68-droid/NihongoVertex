import { HIRAGANA_107, KATAKANA_107 } from './characters/expandedKana.js';
import { KANJI_DATA } from './characters/kanji.js';
import { BASIC_HIRAGANA_SCENES } from './basicHiraganaMnemonicScenes.js';

const KATA_BASE_ART = {
  'ア': { object: 'Antenna', description: 'antenna', paths: ['M48 88 V24', 'M48 24 L25 10', 'M48 24 L71 10'], feature: 'M48 24 L25 10', transform: 'M48 24 C44 30 40 36 36 42' },
  'イ': { object: 'I-shaped person', description: 'person', paths: ['M38 28 C32 22 25 27 27 35 C29 43 38 45 43 39', 'M35 43 V82', 'M65 30 V82'], feature: 'M35 43 V82', transform: 'M35 43 C41 48 47 54 53 60' },
  'ウ': { object: 'umbrella', description: 'umbrella', paths: ['M20 52 Q54 18 88 52', 'M54 28 V82', 'M54 82 Q66 90 73 78'], feature: 'M20 52 Q54 18 88 52', transform: 'M54 28 C50 34 46 40 42 46' },
  'エ': { object: 'elevator', description: 'elevator', paths: ['M28 20 H80 V86 H28 Z', 'M40 40 H68', 'M54 20 V10'], feature: 'M54 20 V10', transform: 'M54 20 C50 27 46 34 42 41' },
  'オ': { object: 'ocean hook', description: 'ocean hook', paths: ['M30 70 Q52 25 76 55', 'M76 55 L91 43', 'M45 28 V82'], feature: 'M76 55 L91 43', transform: 'M76 55 C70 51 64 47 58 43' },
  'カ': { object: 'katana', description: 'katana', paths: ['M20 84 L84 20', 'M28 72 L40 84', 'M68 28 L80 40'], feature: 'M20 84 L84 20', transform: 'M84 20 C75 25 66 30 57 35' },
  'キ': { object: 'key', description: 'key', paths: ['M28 50 A12 12 0 1 1 28 74 A12 12 0 1 1 28 50', 'M40 62 H84', 'M68 62 V72', 'M78 62 V69'], feature: 'M40 62 H84', transform: 'M40 62 C45 55 50 48 55 41' },
  'ク': { object: 'open beak', description: 'beak', paths: ['M28 62 Q52 30 76 45', 'M76 45 L96 54 L76 63', 'M44 49 Q57 39 68 47'], feature: 'M76 45 L96 54 L76 63', transform: 'M76 45 C69 40 63 35 57 30' },
  'ケ': { object: 'extra leg', description: 'extra leg', paths: ['M30 24 V82', 'M30 45 H78', 'M55 45 V82', 'M78 45 V82'], feature: 'M30 45 H78', transform: 'M78 45 C70 42 62 39 54 36' },
  'コ': { object: 'corner', description: 'corner', paths: ['M28 28 H82 V76 H42', 'M42 76 H82', 'M28 52 H58'], feature: 'M28 28 H82 V76', transform: 'M82 76 C73 72 64 68 55 64' },
  'サ': { object: 'samurai', description: 'samurai', paths: ['M24 78 L78 24', 'M28 68 L40 80', 'M68 30 L82 44'], feature: 'M24 78 L78 24', transform: 'M78 24 C69 29 60 33 51 37' },
  'シ': { object: 'three drops', description: 'three drops', paths: ['M31 30 L45 43', 'M45 30 L59 43', 'M59 30 L73 43'], feature: 'M59 30 L73 43', transform: 'M73 43 C66 42 59 41 52 40' },
  'ス': { object: 'slide', description: 'slide', paths: ['M26 25 H82', 'M54 25 V58', 'M54 58 Q35 73 75 86'], feature: 'M54 58 Q35 73 75 86', transform: 'M75 86 C67 80 59 74 51 68' },
  'セ': { object: 'crossing lines', description: 'crossing lines', paths: ['M27 28 H82', 'M54 18 V84', 'M30 56 H80'], feature: 'M54 18 V84', transform: 'M54 18 C49 25 44 32 39 39' },
  'ソ': { object: 'soaring bird', description: 'soaring bird', paths: ['M24 72 Q54 25 84 52', 'M84 52 L95 40', 'M54 44 Q65 32 77 39'], feature: 'M84 52 L95 40', transform: 'M84 52 C76 47 68 42 60 37' },
  'タ': { object: 'taco', description: 'taco', paths: ['M27 30 Q54 16 81 30', 'M27 30 V76 Q54 90 81 76 V30', 'M40 47 Q54 58 68 47'], feature: 'M40 47 Q54 58 68 47', transform: 'M54 58 C50 51 46 44 42 37' },
  'チ': { object: 'cheese', description: 'cheese', paths: ['M23 66 L78 80 L86 34 L31 24 Z', 'M31 24 L54 46 L86 34', 'M50 55 A5 5 0 1 1 50 65'], feature: 'M31 24 L54 46 L86 34', transform: 'M54 46 C48 42 42 38 36 34' },
  'ツ': { object: 'tsunami', description: 'tsunami', paths: ['M20 58 Q34 30 48 58 T76 58 T100 58', 'M20 72 Q34 44 48 72 T76 72 T100 72'], feature: 'M20 58 Q34 30 48 58 T76 58', transform: 'M48 58 C54 51 60 44 66 38' },
  'テ': { object: 'tennis racket', description: 'tennis racket', paths: ['M54 22 A20 20 0 1 1 54 62 A20 20 0 1 1 54 22', 'M54 62 V88', 'M31 34 H77'], feature: 'M54 62 V88', transform: 'M54 62 C49 56 44 50 39 44' },
  'ト': { object: 'toe', description: 'toe', paths: ['M28 64 Q48 40 71 45 Q83 48 82 59 Q80 69 66 70 H32', 'M73 45 A3 3 0 1 1 73 51'], feature: 'M73 45 A3 3 0 1 1 73 51', transform: 'M73 48 C67 44 61 40 55 36' },
  'ナ': { object: 'nail', description: 'nail', paths: ['M45 22 Q53 16 61 22 L70 67 Q53 83 36 67 Z', 'M36 67 H70'], feature: 'M45 22 Q53 16 61 22', transform: 'M53 19 C48 26 44 33 40 40' },
  'ニ': { object: 'two lines', description: 'two lines', paths: ['M28 30 H80', 'M22 78 H86'], feature: 'M22 78 H86', transform: 'M86 78 C76 72 66 66 56 60' },
  'ヌ': { object: 'chopsticks', description: 'chopsticks', paths: ['M26 26 L80 78', 'M80 26 L26 78', 'M42 44 L64 66'], feature: 'M26 26 L80 78', transform: 'M80 78 C70 70 60 62 50 54' },
  'ネ': { object: 'net', description: 'net', paths: ['M24 28 H84 V82 H24 Z', 'M39 28 V82', 'M54 28 V82', 'M69 28 V82', 'M24 48 H84', 'M24 65 H84'], feature: 'M24 28 H84', transform: 'M84 28 C76 34 68 40 60 46' },
  'ノ': { object: 'slash', description: 'slash', paths: ['M82 22 L28 86'], feature: 'M82 22 L28 86', transform: 'M82 22 C72 29 62 36 52 43' },
  'ハ': { object: 'hat', description: 'hat', paths: ['M30 62 Q54 25 78 62', 'M23 65 H85', 'M40 45 H68'], feature: 'M23 65 H85', transform: 'M85 65 C77 59 69 53 61 47' },
  'ヒ': { object: 'heel', description: 'heel', paths: ['M42 25 V62 L70 70', 'M42 25 H55', 'M28 73 Q35 68 42 68'], feature: 'M42 25 V62 L70 70', transform: 'M70 70 C62 64 54 58 46 52' },
  'フ': { object: 'funnel', description: 'funnel', paths: ['M24 25 H84', 'M38 25 Q54 48 70 25', 'M54 48 V84'], feature: 'M38 25 Q54 48 70 25', transform: 'M54 48 C49 55 44 62 39 69' },
  'ヘ': { object: 'mountain', description: 'mountain', paths: ['M18 74 Q34 36 50 52 Q65 22 90 74'], feature: 'M18 74 Q34 36 50 52', transform: 'M50 52 C45 48 40 44 35 40' },
  'ホ': { object: 'home', description: 'home', paths: ['M22 48 L54 22 L86 48 V84 H22 Z', 'M47 84 V62 H61 V84', 'M40 44 H68'], feature: 'M22 48 L54 22 L86 48', transform: 'M54 22 C49 28 44 34 39 40' },
  'マ': { object: 'marker', description: 'marker', paths: ['M28 24 H80 V84 H28 Z', 'M40 38 H68', 'M40 52 H68', 'M40 66 H60'], feature: 'M40 38 H68', transform: 'M68 38 C62 34 56 30 50 26' },
  'ミ': { object: 'three lines', description: 'three lines', paths: ['M28 28 H80', 'M24 52 H76', 'M20 78 H84'], feature: 'M20 78 H84', transform: 'M84 78 C74 70 64 62 54 54' },
  'ム': { object: 'moose', description: 'moose', paths: ['M28 58 Q54 32 80 58', 'M38 46 L28 30', 'M70 46 L80 30', 'M54 58 V84'], feature: 'M38 46 L28 30', transform: 'M28 30 C34 35 40 40 46 45' },
  'メ': { object: 'crossing me', description: 'crossing me', paths: ['M26 28 L82 80', 'M82 28 L26 80'], feature: 'M82 28 L26 80', transform: 'M26 80 C34 72 42 64 50 56' },
  'モ': { object: 'more lines', description: 'more lines', paths: ['M28 28 H80', 'M28 48 H80', 'M22 74 H86', 'M54 48 V86'], feature: 'M22 74 H86', transform: 'M86 74 C77 67 68 60 59 53' },
  'ヤ': { object: 'yacht', description: 'yacht', paths: ['M54 20 V62', 'M54 22 L78 55 H54', 'M24 66 H84 Q70 82 54 82 Q38 82 24 66'], feature: 'M54 20 V62', transform: 'M54 20 C49 27 44 34 39 41' },
  'ユ': { object: 'container', description: 'container', paths: ['M25 35 H83', 'M83 35 V70 Q54 82 25 70 V35', 'M25 70 H83'], feature: 'M83 35 V70 Q54 82 25 70', transform: 'M25 70 C32 63 39 56 46 49' },
  'ヨ': { object: 'shelves', description: 'shelves', paths: ['M28 28 H82', 'M28 52 H82', 'M28 78 H82', 'M53 28 V78'], feature: 'M28 78 H82', transform: 'M82 78 C73 70 64 62 55 54' },
  'ラ': { object: 'radio', description: 'radio', paths: ['M24 34 H84 V78 H24 Z', 'M34 48 H74', 'M54 34 V20', 'M47 20 H61'], feature: 'M54 34 V20', transform: 'M54 20 C48 27 42 34 36 41' },
  'リ': { object: 'vertical strokes', description: 'vertical strokes', paths: ['M38 26 V82', 'M68 26 V82'], feature: 'M68 26 V82', transform: 'M68 26 C62 34 56 42 50 50' },
  'ル': { object: 'hook', description: 'hook', paths: ['M32 25 V65 Q32 80 48 80 Q72 80 76 52', 'M76 52 L88 62'], feature: 'M76 52 L88 62', transform: 'M76 52 C69 47 62 42 55 37' },
  'レ': { object: 'receiver', description: 'receiver', paths: ['M28 28 L78 28', 'M54 28 V80', 'M54 80 L80 64'], feature: 'M54 80 L80 64', transform: 'M80 64 C72 58 64 52 56 46' },
  'ロ': { object: 'room', description: 'room', paths: ['M28 28 H82 V82 H28 Z', 'M40 40 H70 V70 H40 Z'], feature: 'M28 28 H82 V82', transform: 'M82 82 C73 75 64 68 55 61' },
  'ワ': { object: 'wave', description: 'wave', paths: ['M20 56 Q34 28 48 56 T76 56 T98 56', 'M26 76 Q54 62 82 76'], feature: 'M20 56 Q34 28 48 56 T76 56', transform: 'M48 56 C54 49 60 42 66 35' },
  'ヲ': { object: 'extended wo', description: 'extended wo', paths: ['M24 28 H84', 'M54 28 V76', 'M32 76 H78', 'M44 52 H68'], feature: 'M32 76 H78', transform: 'M78 76 C69 69 60 62 51 55' },
  'ン': { object: 'n slash', description: 'n slash', paths: ['M82 22 L28 84', 'M40 30 L56 46'], feature: 'M82 22 L28 84', transform: 'M82 22 C72 29 62 36 52 43' },
};

const EXT_ART = {
  'ゐ': {object:'old ink ribbon',description:'flowing historical ribbon',paths:['M28 32 Q54 18 80 32','M28 56 Q54 70 80 56','M54 18 V84'],feature:'M28 32 Q54 18 80 32',transform:'M80 32 C72 38 64 44 56 50'},
  'ゑ': {object:'old scroll',description:'curled historical scroll',paths:['M28 25 H78 Q86 25 86 33 V75 Q86 84 78 84 H28','M28 25 Q40 38 28 50 Q40 62 28 75'],feature:'M28 25 Q40 38 28 50',transform:'M28 50 C34 55 40 60 46 65'},
  'ゔ': {object:'vibration bell',description:'bell with voiced vibration marks',paths:['M30 68 Q54 28 78 68','M22 72 H86','M47 72 V84 H61 V72','M78 20 L84 26','M88 18 L94 24'],feature:'M78 20 L84 26',transform:'M84 26 C76 32 68 38 60 44'},
  'ヰ': {object:'old signboard',description:'historical signboard',paths:['M28 25 H82 V82 H28 Z','M40 25 V82','M62 25 V82','M28 52 H82'],feature:'M28 52 H82',transform:'M82 52 C74 46 66 40 58 34'},
  'ヱ': {object:'old scrollboard',description:'historical scrollboard',paths:['M26 28 H84','M26 28 V78 H84','M84 28 V78','M38 48 H70'],feature:'M38 48 H70',transform:'M70 48 C64 43 58 38 52 33'},
  'ヴ': {object:'voiced umbrella',description:'umbrella with voiced marks',paths:['M20 54 Q54 20 88 54','M54 28 V82','M54 82 Q66 90 73 78','M78 20 L84 26','M88 18 L94 24'],feature:'M78 20 L84 26',transform:'M84 26 C76 32 68 38 60 44'}
};
const variantMark = (type) => type === 'handakuon' || type === 'yoon-handakuon' ? '゜' : type?.includes('dakuon') ? '゛' : '';
const smallMark = (ch) => /[ゃゅょャュョ]/u.test(ch) ? ch.slice(-1) : '';

function makeKanaScene(c, art, baseScene = null) {
  const mark = variantMark(c.type);
  const small = smallMark(c.character);
  const basePaths = art?.paths || baseScene?.objectPaths || [];
  const feature = art?.feature || baseScene?.featurePaths?.[0] || basePaths[0];
  const transform = art?.transform || baseScene?.transformationPaths?.[0] || 'M54 54 C60 50 66 46 72 42';
  const extra = [];
  if (mark) extra.push(mark === '゜' ? 'M82 18 C91 10 99 18 91 26 C83 34 75 26 82 18 Z' : 'M82 18 L88 24 M90 20 L96 26');
  if (small) extra.push('M82 82 C87 77 92 72 97 67');
  const strokes = (c.strokes || []).map((s,i)=>({ ...s, number:i+1 }));
  return { character:c.character, pronunciation:c.romaji, mnemonicObject:art?.object || c.mnemonic?.title || c.baseChar || c.character, objectDescription:art?.description || c.mnemonic?.concept || '', objectPaths:[...basePaths,...extra], featurePaths:[feature], transformationPaths:[transform], characterPaths:strokes.map(s=>s.path), strokePaths:strokes, animationSteps:[{phase:'object',label:'Draw the mnemonic object',duration:900},{phase:'feature',label:'Highlight the meaningful feature',duration:750},{phase:'transform',label:'Carry the same line into the kana',duration:1050},{phase:'stroke-order',label:'Complete authentic character formation',duration:Math.max(900,strokes.length*430)}], timing:{object:900,feature:750,transform:1050,strokeGap:105}, status:strokes.length?'complete':'artwork_complete_stroke_pending', strokeVerified:Boolean(strokes.length), sceneKind:c.type || 'seion', baseChar:c.baseChar || c.character, mark, small};
}

const HIRA_BASE_BY_CHAR = new Map(Object.values(BASIC_HIRAGANA_SCENES).map(s=>[s.character,s]));
export const HIRAGANA_MNEMONIC_SCENES = Object.fromEntries(HIRAGANA_107.map(c=>{ const base=HIRA_BASE_BY_CHAR.get(c.baseChar||c.character); const art=EXT_ART[c.character]||null; return [c.character, makeKanaScene(c, art, base)]; }));
export const KATAKANA_MNEMONIC_SCENES = Object.fromEntries(KATAKANA_107.map(c=>[c.character, makeKanaScene(c, KATA_BASE_ART[c.baseChar || c.character] || EXT_ART[c.character], null)]));

// Kanji scenes reuse the project's semantic mnemonic object data, but now use the same four-stage object → feature → ink → stroke pipeline.
const KANJI_FEATURES = {
  line:'M24 54 C42 54 66 54 86 54', lines:'M24 38 H84 M24 70 H84', cross:'M25 54 H83 M54 25 V83', box:'M26 26 H82 V82 H26 Z', person:'M54 35 C46 42 39 50 32 58 M54 35 C62 42 69 50 76 58', tree:'M54 28 V82 M54 48 L32 34 M54 50 L76 34', sun:'M54 54 C42 44 42 64 54 54 C66 44 66 64 54 54', moon:'M70 28 C45 34 43 68 67 80', water:'M25 62 Q40 42 54 62 T83 62', mountain:'M20 78 L54 26 L88 78', fire:'M54 82 C38 68 44 52 54 42 C50 30 60 24 64 18 C64 34 80 42 76 60', eye:'M22 54 Q54 26 86 54 Q54 82 22 54', hand:'M38 78 V36 M48 78 V30 M58 78 V36 M68 78 V42', ear:'M60 24 C38 20 30 42 38 62', foot:'M38 28 C38 55 48 66 76 72', car:'M22 62 H84 M32 62 V45 H72 V62', book:'M22 28 Q38 22 54 32 V82 Q38 72 22 78 Z M54 32 Q70 22 86 28 V78 Q70 72 54 82 Z', field:'M24 32 H84 V78 H24 Z M24 48 H84 M54 32 V78', flower:'M54 52 C40 42 46 28 54 40 C62 28 68 42 54 52', river:'M36 20 Q24 42 36 58 T36 92 M54 20 Q42 42 54 58 T54 92 M72 20 Q60 42 72 58 T72 92', bamboo:'M38 84 V22 M70 84 V22 M32 42 H44 M64 56 H76', coin:'M54 54 A28 28 0 1 1 53.9 54', mouth:'M25 54 Q54 30 83 54 Q54 78 25 54', child:'M54 34 C46 42 40 50 34 58 M54 34 C62 42 68 50 74 58', woman:'M54 34 C45 43 38 52 32 61 M54 34 C63 43 70 52 76 61', man:'M54 32 L54 72 M36 48 L72 48 M54 72 L40 88 M54 72 L68 88'
};
const kanjiObjectPath = (m) => KANJI_FEATURES[m?.objectType] || KANJI_FEATURES[m?.objectDescription?.includes('horizontal')?'line':'person'];
export const KANJI_MNEMONIC_SCENES = Object.fromEntries(KANJI_DATA.map(c=>{ const m=c.mnemonic||{}; const feature=kanjiObjectPath(m); const transform=`${feature} M54 54 C62 50 70 46 78 42`; const strokes=(c.strokes||[]).map((s,i)=>({...s,number:i+1})); return [c.character,{character:c.character,pronunciation:c.readingsHiragana?.onyomi?.[0]||c.onyomi?.[0],mnemonicObject:m.title||c.meaning,objectDescription:m.objectDescription||m.concept||c.meaning,objectPaths:[feature],featurePaths:[feature],transformationPaths:[transform],characterPaths:strokes.map(s=>s.path),strokePaths:strokes,animationSteps:[{phase:'object',label:'Draw the pictorial mnemonic',duration:1000},{phase:'feature',label:'Highlight the semantic component',duration:800},{phase:'transform',label:'Carry the same visual line into the Kanji',duration:1200},{phase:'stroke-order',label:'Form the Kanji stroke by stroke',duration:Math.max(1200,strokes.length*430)}],timing:{object:1000,feature:800,transform:1200,strokeGap:110},status:c.isVerifiedStrokeOrder?'complete':'artwork_complete_stroke_pending',strokeVerified:Boolean(c.isVerifiedStrokeOrder),sceneKind:'kanji',meaning:c.meaning,objectType:m.objectType}]; }));

export const ALL_MNEMONIC_SCENES = {...HIRAGANA_MNEMONIC_SCENES,...KATAKANA_MNEMONIC_SCENES,...KANJI_MNEMONIC_SCENES};
export const getMnemonicScene = (character) => ALL_MNEMONIC_SCENES[character] || null;
export const mnemonicCoverage = () => ({hiragana:Object.keys(HIRAGANA_MNEMONIC_SCENES).length,katakana:Object.keys(KATAKANA_MNEMONIC_SCENES).length,kanji:Object.keys(KANJI_MNEMONIC_SCENES).length,total:Object.keys(ALL_MNEMONIC_SCENES).length});
