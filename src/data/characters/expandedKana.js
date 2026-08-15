/**
 * NihongoVertex COMPLETE 107-KANA CURRICULUM
 * 46 Seion + 20 Dakuon + 5 Handakuon + 21 Yoon-Seion + 9 Yoon-Dakuon
 * + 3 Yoon-Handakuon + 3 Extended/archaic kana = 107 per script.
 *
 * The base character stroke paths come from the existing verified dataset.
 * Combination kana are composed from their base glyph + small-y glyph paths,
 * preserving a data-driven SVG animation architecture.
 */
import { HIRAGANA_DATA } from './hiragana.js';
import { KATAKANA_DATA } from './katakana.js';
import { DAKUON_DATA } from './dakuonYoon.js';

const HIRA = new Map(HIRAGANA_DATA.map(x => [x.character, x]));
const KATA = new Map(KATAKANA_DATA.map(x => [x.character, x]));
const VOICED_HIRA = new Map(DAKUON_DATA.map(x => [x.character, x]));

const SMALL = {
  'ゃ': [{ number: 1, path: 'M25,38 C38,28 55,27 72,33', start:{x:25,y:38}, end:{x:72,y:33}, direction:'small-ya', duration:350, pause:70 }, { number:2, path:'M48,28 C55,42 57,56 56,72', start:{x:48,y:28}, end:{x:56,y:72}, direction:'small-ya-vertical', duration:350, pause:80 }],
  'ゅ': [{ number: 1, path:'M25,35 C38,28 54,29 67,37', start:{x:25,y:35}, end:{x:67,y:37}, direction:'small-yu', duration:320, pause:70 }, { number:2, path:'M48,35 C58,43 64,54 62,67 C60,76 52,78 43,75', start:{x:48,y:35}, end:{x:43,y:75}, direction:'small-yu-loop', duration:430, pause:80 }],
  'ょ': [{ number: 1, path:'M30,30 C43,31 57,31 70,29', start:{x:30,y:30}, end:{x:70,y:29}, direction:'small-yo-top', duration:300, pause:70 }, { number:2, path:'M53,38 C55,49 54,60 52,72 C63,72 69,66 70,59', start:{x:53,y:38}, end:{x:70,y:59}, direction:'small-yo-hook', duration:420, pause:80 }],
  'ャ': [{ number:1, path:'M25,38 L72,32', start:{x:25,y:38}, end:{x:72,y:32}, direction:'small-kya', duration:300, pause:70 }, { number:2, path:'M50,28 L58,72', start:{x:50,y:28}, end:{x:58,y:72}, direction:'small-kya-vertical', duration:330, pause:80 }],
  'ュ': [{ number:1, path:'M25,36 L68,37', start:{x:25,y:36}, end:{x:68,y:37}, direction:'small-kyu', duration:300, pause:70 }, { number:2, path:'M48,37 C58,44 63,53 61,68 L43,68', start:{x:48,y:37}, end:{x:43,y:68}, direction:'small-kyu-hook', duration:380, pause:80 }],
  'ョ': [{ number:1, path:'M28,30 L70,30', start:{x:28,y:30}, end:{x:70,y:30}, direction:'small-kyo-top', duration:280, pause:70 }, { number:2, path:'M52,38 L53,70 L71,65', start:{x:52,y:38}, end:{x:71,y:65}, direction:'small-kyo-hook', duration:360, pause:80 }]
};

const yoonSeionH = [
  ['きゃ','き','ゃ','kya'],['きゅ','き','ゅ','kyu'],['きょ','き','ょ','kyo'],
  ['しゃ','し','ゃ','sha'],['しゅ','し','ゅ','shu'],['しょ','し','ょ','sho'],
  ['ちゃ','ち','ゃ','cha'],['ちゅ','ち','ゅ','chu'],['ちょ','ち','ょ','cho'],
  ['にゃ','に','ゃ','nya'],['にゅ','に','ゅ','nyu'],['にょ','に','ょ','nyo'],
  ['ひゃ','ひ','ゃ','hya'],['ひゅ','ひ','ゅ','hyu'],['ひょ','ひ','ょ','hyo'],
  ['みゃ','み','ゃ','mya'],['みゅ','み','ゅ','myu'],['みょ','み','ょ','myo'],
  ['りゃ','り','ゃ','rya'],['りゅ','り','ゅ','ryu'],['りょ','り','ょ','ryo']
];
const yoonDakuonH = [
  ['ぎゃ','ぎ','ゃ','gya'],['ぎゅ','ぎ','ゅ','gyu'],['ぎょ','ぎ','ょ','gyo'],
  ['じゃ','じ','ゃ','ja'],['じゅ','じ','ゅ','ju'],['じょ','じ','ょ','jo'],
  ['びゃ','び','ゃ','bya'],['びゅ','び','ゅ','byu'],['びょ','び','ょ','byo']
];
const yoonHandakuonH = [
  ['ぴゃ','ぴ','ゃ','pya'],['ぴゅ','ぴ','ゅ','pyu'],['ぴょ','ぴ','ょ','pyo']
];

const yoonSeionK = yoonSeionH.map(([c,b,s,r]) => [c.replace('き','キ').replace('し','シ').replace('ち','チ').replace('に','ニ').replace('ひ','ヒ').replace('み','ミ').replace('り','リ').replace('ゃ','ャ').replace('ゅ','ュ').replace('ょ','ョ'), b.replace('き','キ').replace('し','シ').replace('ち','チ').replace('に','ニ').replace('ひ','ヒ').replace('み','ミ').replace('り','リ'), s.replace('ゃ','ャ').replace('ゅ','ュ').replace('ょ','ョ'), r]);
const yoonDakuonK = yoonDakuonH.map(([c,b,s,r]) => [c.replace('ぎ','ギ').replace('じ','ジ').replace('び','ビ').replace('ゃ','ャ').replace('ゅ','ュ').replace('ょ','ョ'), b.replace('ぎ','ギ').replace('じ','ジ').replace('び','ビ'), s.replace('ゃ','ャ').replace('ゅ','ュ').replace('ょ','ョ'), r]);
const yoonHandakuonK = yoonHandakuonH.map(([c,b,s,r]) => [c.replace('ぴ','ピ').replace('ゃ','ャ').replace('ゅ','ュ').replace('ょ','ョ'), b.replace('ぴ','ピ'), s.replace('ゃ','ャ').replace('ゅ','ュ').replace('ょ','ョ'), r]);

const extH = [['ゐ','wi','archaic / extended'],['ゑ','we','archaic / extended'],['ゔ','vu','modern voiced u']];
const extK = [['ヰ','wi','archaic / extended'],['ヱ','we','archaic / extended'],['ヴ','vu','modern voiced u']];

function cloneBase(base, overrides={}) {
  return {
    ...base,
    ...overrides,
    mnemonic: base.mnemonic ? { ...base.mnemonic, ...overrides.mnemonic } : overrides.mnemonic,
    strokes: (overrides.strokes || base.strokes || []).map((s,i)=>({ ...s, number:i+1 }))
  };
}

function smallStrokes(ch, offset) {
  return (SMALL[ch] || []).map((s,i)=>({ ...s, number:offset+i+1 }));
}

function makeYoon(baseMap, baseChar, smallChar, character, romaji, type, category) {
  const base = baseMap.get(baseChar);
  if (!base) return null;
  const strokes = [...(base.strokes || []).map((s,i)=>({ ...s, number:i+1, component:`${baseChar} base` })), ...smallStrokes(smallChar, base.strokes?.length || 0)];
  return cloneBase(base, {
    character, romaji, type, category, level:'N5', baseChar,
    meaning:`Contracted ${romaji} sound`,
    strokeCount:strokes.length,
    mnemonic:{
      title:`${base.mnemonic?.title || baseChar} + small ${smallChar}`,
      concept:`The visual mnemonic for ${baseChar} continues, then the small ${smallChar} is drawn beside it to form ${character}.`,
      story:`Remember ${baseChar} first, then add the small ${smallChar}. The two kana contract into one ${romaji} sound.`
    },
    strokes
  });
}

function makeDakuon(baseMap, baseChar, character, romaji, type, mark='゛') {
  const base = baseMap.get(baseChar);
  if (!base) return null;
  const markStrokes = [
    { number:(base.strokes?.length||0)+1, path:'M78,18 C81,20 84,24 86,28', start:{x:78,y:18}, end:{x:86,y:28}, direction:'dakuten-dot-1', duration:320, pause:60 },
    { number:(base.strokes?.length||0)+2, path:'M87,21 C90,23 93,27 95,31', start:{x:87,y:21}, end:{x:95,y:31}, direction:'dakuten-dot-2', duration:320, pause:80 }
  ];
  const strokes = [...(base.strokes||[]).map((s,i)=>({...s,number:i+1})), ...markStrokes];
  return cloneBase(base,{character,romaji,type,baseChar,category:`${type === 'handakuon'?'P':'Voiced'} variant`,strokeCount:strokes.length,meaning:`${romaji} sound`,mnemonic:{title:`${base.mnemonic?.title || baseChar} + ${mark}`,concept:`Start with ${baseChar}; the ${mark === '゜' ? 'round handakuon circle' : 'two dakuten marks'} is then drawn to transform the sound into ${romaji}.`,story:`The base character stays visible while its sound mark is added.`},strokes});
}

function makeHandakuon(baseMap, baseChar, character, romaji, type='handakuon') {
  const base = baseMap.get(baseChar);
  if (!base) return null;
  const mark = { number:(base.strokes?.length||0)+1, path:'M83,15 C89,12 95,16 95,22 C95,28 89,31 83,28 C77,25 77,18 83,15 Z', start:{x:83,y:15}, end:{x:83,y:15}, direction:'handakuon-circle', duration:480, pause:100 };
  const strokes=[...(base.strokes||[]).map((s,i)=>({...s,number:i+1})),mark];
  return cloneBase(base,{character,romaji,type,baseChar,category:'P-row (Handakuon)',strokeCount:strokes.length,meaning:`${romaji} sound`,mnemonic:{title:`${base.mnemonic?.title || baseChar} + Handakuon Circle`,concept:`Draw ${baseChar}, then add the small round ゜ mark to make ${character}.`,story:`A popping circle changes the base sound into ${romaji}.`},strokes});
}

function makeExt(baseMap, character, romaji, type='extended') {
  const source = baseMap.get(character==='ヴ' || character==='ヰ' || character==='ヱ' ? 'ウ' : 'う');
  const strokes = source?.strokes ? source.strokes.map((s,i)=>({...s,number:i+1})) : [];
  if (character === 'ゔ' || character === 'ヴ') strokes.push({number:strokes.length+1,path:'M78,18 C81,20 84,24 86,28',start:{x:78,y:18},end:{x:86,y:28},direction:'dakuten',duration:320,pause:80},{number:strokes.length+2,path:'M87,21 C90,23 93,27 95,31',start:{x:87,y:21},end:{x:95,y:31},direction:'dakuten',duration:320,pause:100});
  return cloneBase(source || {character,strokes}, {character,romaji,type,category:'Extended / Archaic',level:'N5',meaning:`Extended ${romaji} kana`,strokeCount:strokes.length,strokes,mnemonic:{title:`Visual mnemonic for ${character}`,concept:`Learn the base kana shape first, then the special extension/mark.`,story:`This is an extended or historical kana form.`}});
}

const HIRA_DAKUON = [
  ['が','か','ga'],['ぎ','き','gi'],['ぐ','く','gu'],['げ','け','ge'],['ご','こ','go'],
  ['ざ','さ','za'],['じ','し','ji'],['ず','す','zu'],['ぜ','せ','ze'],['ぞ','そ','zo'],
  ['だ','た','da'],['ぢ','ち','ji'],['づ','つ','zu'],['で','て','de'],['ど','と','do'],
  ['ば','は','ba'],['び','ひ','bi'],['ぶ','ふ','bu'],['べ','へ','be'],['ぼ','ほ','bo']
].map(([c,b,r])=>makeDakuon(HIRA,b,c,r,'dakuon')).filter(Boolean);
const HIRA_DAKU_MAP = new Map(HIRA_DAKUON.map(x=>[x.character,x]));
const HIRA_HANDAKU = [['ぱ','は','pa'],['ぴ','ひ','pi'],['ぷ','ふ','pu'],['ぺ','へ','pe'],['ぽ','ほ','po']].map(([c,b,r])=>makeHandakuon(HIRA,b,c,r)).filter(Boolean);
const HIRA_HANDAKU_MAP = new Map(HIRA_HANDAKU.map(x=>[x.character,x]));
const KATA_DAKUON = [
  ['ガ','カ','ga'],['ギ','キ','gi'],['グ','ク','gu'],['ゲ','ケ','ge'],['ゴ','コ','go'],
  ['ザ','サ','za'],['ジ','シ','ji'],['ズ','ス','zu'],['ゼ','セ','ze'],['ゾ','ソ','zo'],
  ['ダ','タ','da'],['ヂ','チ','ji'],['ヅ','ツ','zu'],['デ','テ','de'],['ド','ト','do'],
  ['バ','ハ','ba'],['ビ','ヒ','bi'],['ブ','フ','bu'],['ベ','ヘ','be'],['ボ','ホ','bo']
].map(([c,b,r])=>makeDakuon(KATA,b,c,r,'dakuon')).filter(Boolean);
const KATA_DAKU_MAP = new Map(KATA_DAKUON.map(x=>[x.character,x]));
const KATA_HANDAKU = [['パ','ハ','pa'],['ピ','ヒ','pi'],['プ','フ','pu'],['ペ','ヘ','pe'],['ポ','ホ','po']].map(([c,b,r])=>makeHandakuon(KATA,b,c,r)).filter(Boolean);
const KATA_HANDAKU_MAP = new Map(KATA_HANDAKU.map(x=>[x.character,x]));

export const HIRAGANA_107 = [
  ...HIRAGANA_DATA.map(x=>cloneBase(x,{category:'Seion (Basic)'})),
  ...HIRA_DAKUON,
  ...HIRA_HANDAKU,

  ...yoonSeionH.map(([c,b,s,r])=>makeYoon(HIRA,b,s,c,r,'yoon-seion','Yōon Seion')).filter(Boolean),
  ...yoonDakuonH.map(([c,b,s,r])=>makeYoon(HIRA_DAKU_MAP,b,s,c,r,'yoon-dakuon','Yōon Dakuon')).filter(Boolean),
  ...yoonHandakuonH.map(([c,b,s,r])=>makeYoon(HIRA_HANDAKU_MAP,b,s,c,r,'yoon-handakuon','Yōon Handakuon')).filter(Boolean),
  ...extH.map(([c,r])=>makeExt(HIRA,c,r)).filter(Boolean)
];

export const KATAKANA_107 = [
  ...KATAKANA_DATA.map(x=>cloneBase(x,{category:'Seion (Basic)'})),
  ...KATA_DAKUON,
  ...KATA_HANDAKU,
  ...yoonSeionK.map(([c,b,s,r])=>makeYoon(KATA,b,s,c,r,'yoon-seion','Yōon Seion')).filter(Boolean),
  ...yoonDakuonK.map(([c,b,s,r])=>makeYoon(KATA_DAKU_MAP,b,s,c,r,'yoon-dakuon','Yōon Dakuon')).filter(Boolean),
  ...yoonHandakuonK.map(([c,b,s,r])=>makeYoon(KATA_HANDAKU_MAP,b,s,c,r,'yoon-handakuon','Yōon Handakuon')).filter(Boolean),
  ...extK.map(([c,r])=>makeExt(KATA,c,r)).filter(Boolean)
];

export const KANA_107_COUNTS = {
  total: 107,
  seion: 46,
  dakuon: 20,
  handakuon: 5,
  yoonSeion: 21,
  yoonDakuon: 9,
  yoonHandakuon: 3,
  extended: 3
};

export function assert107(list, label) {
  if (list.length !== 107) throw new Error(`${label} expected 107 entries but generated ${list.length}`);
  return list;
}

assert107(HIRAGANA_107,'Hiragana');
assert107(KATAKANA_107,'Katakana');
