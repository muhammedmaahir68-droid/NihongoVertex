import { HIRAGANA_DATA } from './characters/hiragana.js';

// Bespoke line-art for the 46 modern Hiragana mnemonics.  The artwork is intentionally
// stored as data so the renderer can preserve the visual identity of every scene.
const ART = {
  'あ': { object:'apple', description:'apple with a stem and a small leaf', paths:['M34 45 C20 36 14 55 24 71 C33 84 51 82 60 68 C70 52 61 38 48 41 C42 43 39 47 34 45Z','M46 40 C45 29 50 20 60 16','M56 24 C66 18 75 23 78 31'], feature:'M46 40 C45 29 50 20 60 16', transform:'M46 40 C43 38 40 36 37 34 C34 32 31 31 29 33'},
  'い': { object:'two people', description:'two people standing side by side', paths:['M39 31 C34 25 28 30 29 37 C30 43 36 45 41 41 C46 38 45 33 39 31Z','M67 31 C62 26 56 30 57 37 C58 43 64 45 69 41 C74 38 73 33 67 31Z','M27 72 C31 58 38 51 45 54 C49 56 51 63 53 72','M52 72 C56 61 62 52 69 54 C76 57 79 64 81 72'], feature:'M27 72 C31 58 38 51 45 54 C49 56 51 63 53 72', transform:'M45 54 C42 48 39 42 36 35 C34 31 33 28 34 25'},
  'う': { object:'duck', description:'duck head and open beak', paths:['M29 62 C27 45 38 32 54 31 C69 30 80 39 80 54 C80 68 68 78 53 78 C40 78 31 72 29 62Z','M77 45 L99 52 L77 59','M72 37 C73 32 80 30 83 34','M36 67 Q24 77 16 71'], feature:'M77 45 L99 52 L77 59', transform:'M77 45 C70 42 64 39 58 36 C53 33 49 31 46 29'},
  'え': { object:'elevator', description:'elevator cabin with doors and arrow', paths:['M29 20 H79 V86 H29 Z','M39 36 H69 V72 H39 Z','M54 20 V10','M48 16 L54 10 L60 16'], feature:'M54 20 V10', transform:'M54 20 C52 25 50 29 47 34 C45 37 44 39 43 42'},
  'お': { object:'octopus', description:'octopus with head, eyes and tentacles', paths:['M31 51 C31 31 43 21 56 21 C69 21 81 32 81 51 C81 62 71 69 56 69 C41 69 31 62 31 51Z','M46 42 A2.5 2.5 0 1 0 46 47 A2.5 2.5 0 1 0 46 42','M64 42 A2.5 2.5 0 1 0 64 47 A2.5 2.5 0 1 0 64 42','M34 64 Q25 77 20 82','M44 68 Q38 82 40 88','M55 69 Q52 82 55 90','M66 68 Q67 82 72 87','M76 63 Q84 75 91 76'], feature:'M55 69 Q52 82 55 90', transform:'M55 69 C48 61 41 54 34 47 C30 43 28 40 27 37'},
  'か': { object:'kite', description:'kite frame with crossing spars and string', paths:['M53 17 L84 48 L53 79 L22 48 Z','M53 17 V79','M22 48 H84','M84 48 Q94 62 85 74 Q79 82 89 90'], feature:'M84 48 Q94 62 85 74 Q79 82 89 90', transform:'M84 48 C77 45 69 42 62 39 C57 37 53 35 49 34'},
  'き': { object:'key', description:'key ring, shaft and teeth', paths:['M31 48 A11 11 0 1 1 31 70 A11 11 0 1 1 31 48','M42 59 H78 L86 51','M66 59 V70','M76 59 V67','M42 59 C53 56 62 50 72 42'], feature:'M42 59 H78 L86 51', transform:'M42 59 C38 52 34 46 31 40 C29 36 28 33 28 30'},
  'く': { object:'bird beak', description:'bird head ending in a pointed open beak', paths:['M29 60 Q50 26 77 44 Q66 62 38 73 Z','M77 44 L99 53 L77 62','M44 49 Q57 39 68 47'], feature:'M77 44 L99 53 L77 62', transform:'M77 44 C72 40 66 36 61 32 C56 28 52 25 49 22'},
  'け': { object:'keg', description:'wooden keg with hoops and top rim', paths:['M28 31 A25 8 0 0 1 78 31','M28 31 V70 Q53 84 78 70 V31','M28 49 Q53 59 78 49','M28 70 Q53 82 78 70'], feature:'M28 49 Q53 59 78 49', transform:'M53 59 C50 53 47 47 44 40 C42 36 41 32 42 28'},
  'こ': { object:'two corners', description:'two angular corners joined like a folded path', paths:['M27 28 H80 V50 H51 V77 H24','M63 63 H84 V83 H63'], feature:'M27 28 H80 V50', transform:'M80 50 C73 49 66 48 59 47 C54 46 50 45 47 44'},
  'さ': { object:'samurai sword', description:'katana blade, guard and handle', paths:['M24 78 L78 24','M28 68 L40 80','M69 30 L82 43','M52 50 L61 59'], feature:'M24 78 L78 24', transform:'M78 24 C69 28 60 31 52 34 C45 36 39 38 34 39'},
  'し': { object:'fishing hook', description:'curved fishing hook with a sharp tip', paths:['M31 24 Q53 20 69 33 Q80 43 73 56 Q67 67 54 63 Q42 59 48 48','M73 56 L88 74'], feature:'M73 56 L88 74', transform:'M73 56 C67 54 61 51 55 48 C50 45 46 42 43 39'},
  'す': { object:'swing', description:'playground swing with seat and ropes', paths:['M30 20 V58','M75 20 V58','M30 58 Q53 83 75 58','M45 55 Q53 48 61 55 L61 72 Q53 80 45 72Z'], feature:'M30 58 Q53 83 75 58', transform:'M53 83 C50 75 47 67 43 59 C40 52 38 46 38 41'},
  'せ': { object:'sailboat', description:'sailboat with mast, sails and hull', paths:['M52 20 V65','M52 22 L79 55 H52 Z','M52 35 L31 57 H52 Z','M26 66 Q53 76 82 66'], feature:'M52 20 V65', transform:'M52 20 C48 25 44 30 40 35 C36 40 33 44 31 48'},
  'そ': { object:'sewing needle', description:'needle eye, long shaft and thread', paths:['M30 65 A6 6 0 1 1 30 77 A6 6 0 1 1 30 65','M34 61 L82 20','M73 27 L84 18','M38 70 Q57 83 79 79'], feature:'M34 61 L82 20', transform:'M82 20 C72 23 62 27 53 31 C46 34 40 36 35 37'},
  'た': { object:'table', description:'table top with four supporting legs', paths:['M23 30 H83 V43 H23 Z','M31 43 V80','M75 43 V80','M53 43 V73'], feature:'M23 30 H83 V43', transform:'M53 43 C48 48 43 53 38 58 C34 62 31 66 29 70'},
  'ち': { object:'cheese', description:'wedge of cheese with holes', paths:['M23 66 L76 78 L84 35 L31 25 Z','M31 25 L53 46 L84 35','M48 54 A5 5 0 1 1 48 64 A5 5 0 1 1 48 54','M68 65 A4 4 0 1 1 68 73 A4 4 0 1 1 68 65'], feature:'M31 25 L53 46 L84 35', transform:'M53 46 C48 43 43 40 38 37 C34 35 31 33 28 32'},
  'つ': { object:'wave', description:'cresting wave with a long curling line', paths:['M19 58 Q32 31 45 58 T71 58 T96 58','M19 70 Q32 43 45 70 T71 70 T96 70'], feature:'M19 58 Q32 31 45 58 T71 58 T96 58', transform:'M45 58 C48 51 52 45 57 40 C62 35 67 32 72 31'},
  'て': { object:'tea cup', description:'tea cup, handle and rising steam', paths:['M30 35 H73 V65 Q52 78 30 65 Z','M73 42 Q88 39 88 51 Q88 62 73 59','M42 25 Q37 17 43 12','M54 25 Q49 17 55 12'], feature:'M73 42 Q88 39 88 51 Q88 62 73 59', transform:'M73 42 C68 39 63 37 58 35 C52 33 48 31 44 29'},
  'と': { object:'toe', description:'large toe with a small nail', paths:['M28 64 Q48 40 71 45 Q83 48 82 59 Q80 69 66 70 H32 Q24 70 28 64 Z','M73 45 A3 3 0 1 1 73 51 A3 3 0 1 1 73 45'], feature:'M73 45 A3 3 0 1 1 73 51 A3 3 0 1 1 73 45', transform:'M73 48 C68 45 63 42 58 39 C53 36 49 33 46 30'},
  'な': { object:'nail', description:'metal nail with head and long shaft', paths:['M45 22 Q53 16 61 22 L70 67 Q53 83 36 67 Z','M36 67 H70','M45 28 H61'], feature:'M45 22 Q53 16 61 22', transform:'M53 19 C50 25 47 31 44 37 C41 43 39 48 37 53'},
  'に': { object:'knee', description:'bent leg with a rounded knee joint', paths:['M31 25 V55 Q31 72 47 72 H72','M48 72 A7 7 0 1 1 48 86 A7 7 0 1 1 48 72'], feature:'M31 25 V55 Q31 72 47 72', transform:'M47 72 C44 66 41 60 39 54 C36 47 34 40 33 33'},
  'ぬ': { object:'noodle', description:'long noodle curling into a loop', paths:['M24 26 Q77 16 74 46 Q72 66 42 54 Q22 46 34 71 Q45 90 77 75','M62 31 Q69 39 63 47'], feature:'M24 26 Q77 16 74 46 Q72 66 42 54', transform:'M74 46 C68 43 62 40 56 37 C50 34 44 31 38 29'},
  'ね': { object:'net', description:'fishing net with mesh and a loose corner', paths:['M25 25 L82 25 L75 80 L32 80 Z','M38 26 L36 79','M51 26 L49 79','M64 26 L62 79','M28 40 H80','M30 56 H78','M31 68 H76'], feature:'M25 25 L82 25', transform:'M53 25 C49 31 45 37 41 43 C38 47 35 51 32 54'},
  'の': { object:'loop', description:'single continuous loop like a no-entry loop', paths:['M26 52 C26 23 79 20 79 52 C79 82 31 85 31 57 C31 40 55 34 65 48'], feature:'M26 52 C26 23 79 20 79 52', transform:'M79 52 C70 49 61 46 52 43 C45 41 39 39 34 38'},
  'は': { object:'hat', description:'hat crown and wide brim', paths:['M31 51 Q36 25 53 25 Q70 25 75 51','M23 51 H83 Q75 62 53 62 Q31 62 23 51Z','M45 26 Q53 20 61 26'], feature:'M23 51 H83 Q75 62 53 62 Q31 62 23 51Z', transform:'M53 62 C49 56 45 50 41 44 C37 38 34 33 33 29'},
  'ひ': { object:'heel', description:'shoe heel and curved foot shape', paths:['M42 25 V62 L69 70 Q80 75 71 82 H38 Q28 82 28 73 V55','M42 25 H55','M28 73 Q35 68 42 68'], feature:'M42 25 V62 L69 70', transform:'M69 70 C63 65 57 60 51 55 C45 50 40 46 36 42'},
  'ふ': { object:'mountain', description:'mountain peak with a smaller ridge', paths:['M20 78 L50 25 L80 78 Z','M39 59 L50 43 L61 59','M33 67 L50 53 L68 67'], feature:'M20 78 L50 25 L80 78 Z', transform:'M50 25 C47 31 44 37 41 43 C38 49 35 54 33 58'},
  'へ': { object:'hill', description:'two rolling hills forming a sharp valley', paths:['M18 74 Q34 36 50 52 Q65 22 90 74','M30 69 Q43 55 55 63','M67 58 Q76 64 84 73'], feature:'M18 74 Q34 36 50 52 Q65 22 90 74', transform:'M50 52 C46 49 42 46 38 43 C34 40 30 37 27 35'},
  'ほ': { object:'hoe', description:'garden hoe with a long handle and curved blade', paths:['M62 23 V75','M35 68 Q55 57 78 68','M43 61 Q55 55 67 61'], feature:'M62 23 V75', transform:'M62 23 C57 29 52 35 47 41 C42 47 38 52 35 57'},
  'ま': { object:'mask', description:'face mask with eyes and a curved mouth', paths:['M28 30 Q53 18 78 30 V60 Q53 83 28 60Z','M42 49 A4 4 0 1 1 42 57 A4 4 0 1 1 42 49','M64 49 A4 4 0 1 1 64 57 A4 4 0 1 1 64 49','M45 64 Q53 69 61 64'], feature:'M45 64 Q53 69 61 64', transform:'M53 69 C49 62 45 55 41 48 C37 41 34 35 32 30'},
  'み': { object:'ruler', description:'graduated ruler with repeated tick marks', paths:['M32 18 H77 V88 H32 Z','M62 30 H77','M62 40 H77','M62 50 H77','M62 60 H77','M62 70 H77'], feature:'M62 30 H77', transform:'M62 30 C57 36 52 42 47 48 C43 53 39 58 36 63'},
  'む': { object:'cow', description:'cow head and body with horns', paths:['M22 55 A30 20 0 1 0 82 55 A30 20 0 1 0 22 55','M76 42 A15 15 0 1 0 76 72 A15 15 0 1 0 76 42','M85 31 L91 22','M69 31 L63 22','M80 40 A2 2 0 1 1 80 44 A2 2 0 1 1 80 40','M73 52 Q78 58 83 52'], feature:'M69 31 L63 22', transform:'M63 22 C58 27 53 32 48 37 C43 42 39 46 36 50'},
  'め': { object:'eye', description:'eye outline with a central iris', paths:['M20 50 Q53 20 86 50 Q53 80 20 50Z','M53 40 A10 10 0 1 1 53 60 A10 10 0 1 1 53 40','M30 50 Q53 63 76 50'], feature:'M53 40 A10 10 0 1 1 53 60 A10 10 0 1 1 53 40', transform:'M53 40 C48 34 43 29 38 25 C34 22 31 20 28 20'},
  'も': { object:'moustache', description:'sweeping moustache with two mirrored curls', paths:['M53 50 Q43 37 28 43 Q18 49 30 57 Q42 64 53 54 Q64 64 76 57 Q88 49 78 43 Q63 37 53 50Z','M53 50 Q53 44 58 39'], feature:'M53 50 Q43 37 28 43', transform:'M28 43 C33 39 38 35 43 31 C47 28 50 25 52 22'},
  'や': { object:'yacht', description:'small yacht with mast and hull', paths:['M52 20 V63','M52 22 L77 55 H52 Z','M24 66 H82 Q70 82 52 82 Q34 82 24 66Z','M35 66 L52 63'], feature:'M52 20 V63', transform:'M52 20 C48 27 44 34 40 41 C37 46 34 50 31 53'},
  'ゆ': { object:'bowl', description:'rounded bowl with an open rim', paths:['M25 42 Q53 54 81 42 L74 70 Q53 84 32 70Z','M25 42 Q53 32 81 42','M40 58 Q53 66 66 58'], feature:'M25 42 Q53 32 81 42', transform:'M53 32 C48 38 43 44 38 50 C34 54 31 58 29 61'},
  'よ': { object:'yo-yo', description:'yo-yo body hanging from a string', paths:['M53 38 A20 20 0 1 1 53 78 A20 20 0 1 1 53 38','M53 38 V18','M53 18 Q69 12 75 24','M43 58 H63'], feature:'M53 38 V18', transform:'M53 18 C48 24 43 30 38 36 C34 41 31 45 29 49'},
  'ら': { object:'rabbit', description:'rabbit head with long ears', paths:['M53 58 A22 22 0 1 1 53 102 A22 22 0 1 1 53 58','M39 42 Q29 18 40 16 Q50 18 47 42','M67 42 Q76 18 67 16 Q57 18 60 42','M46 57 A2 2 0 1 1 46 61 A2 2 0 1 1 46 57','M61 57 A2 2 0 1 1 61 61 A2 2 0 1 1 61 57'], feature:'M39 42 Q29 18 40 16 Q50 18 47 42', transform:'M40 16 C44 21 48 26 52 31 C56 36 59 41 61 46'},
  'り': { object:'reed', description:'three tall reeds moving in a breeze', paths:['M37 83 Q40 48 35 22','M54 83 Q56 49 52 18','M69 83 Q73 50 70 25','M34 25 Q45 18 55 25','M52 21 Q63 14 72 21'], feature:'M37 83 Q40 48 35 22', transform:'M35 22 C39 28 43 34 47 40 C50 45 52 50 53 55'},
  'る': { object:'rope', description:'coiled rope with a hooked end', paths:['M30 25 Q72 15 77 48 Q80 75 48 72 Q26 70 34 52 Q40 39 55 45','M55 45 Q64 50 62 58'], feature:'M30 25 Q72 15 77 48', transform:'M77 48 C70 44 63 41 56 38 C49 35 43 32 38 30'},
  'れ': { object:'ribbon', description:'ribbon bow with a long flowing strip', paths:['M24 30 Q53 18 82 30 L68 80 L53 64 L38 80Z','M53 30 V64','M34 39 Q53 48 72 39'], feature:'M53 30 V64', transform:'M53 30 C49 36 45 42 41 48 C38 53 35 58 33 62'},
  'ろ': { object:'road', description:'winding road with a dashed center line', paths:['M40 18 Q52 39 47 58 Q42 74 60 91','M54 20 Q64 39 59 56','M49 38 L53 42','M49 54 L53 58','M52 71 L57 75'], feature:'M40 18 Q52 39 47 58', transform:'M47 58 C51 53 55 48 59 43 C63 38 67 34 71 31'},
  'わ': { object:'wagon', description:'small wagon with wheels and a handle', paths:['M28 38 H78 V66 H28 Z','M40 72 A8 8 0 1 1 40 88 A8 8 0 1 1 40 72','M68 72 A8 8 0 1 1 68 88 A8 8 0 1 1 68 72','M28 38 L19 29'], feature:'M28 38 L19 29', transform:'M28 38 C33 34 38 30 43 26 C47 23 50 21 53 20'},
  'を': { object:'jumping person', description:'person leaping over a curved hoop', paths:['M53 27 A10 10 0 1 1 53 47 A10 10 0 1 1 53 27','M53 47 V68','M34 54 L53 50 L72 54','M53 68 L39 85','M53 68 L68 85','M26 78 Q53 61 80 78'], feature:'M53 47 V68', transform:'M53 47 C49 42 45 38 41 34 C38 31 35 29 32 28'},
  'ん': { object:'nose', description:'side-profile nose with a rounded tip', paths:['M55 21 Q49 43 45 59 Q41 70 53 73 Q66 75 70 66','M68 67 A3 3 0 1 1 68 73 A3 3 0 1 1 68 67'], feature:'M55 21 Q49 43 45 59 Q41 70 53 73', transform:'M55 21 C52 27 49 33 46 39 C43 45 41 51 40 56'}
};

const byChar = new Map(HIRAGANA_DATA.map(c => [c.character, c]));

export const BASIC_HIRAGANA_SCENES = Object.fromEntries(
  HIRAGANA_DATA.map((c) => {
    const art = ART[c.character];
    if (!art) throw new Error(`Missing bespoke artwork for ${c.character}`);
    return [c.character, {
      character: c.character,
      pronunciation: c.romaji,
      mnemonicObject: art.object,
      objectDescription: art.description,
      objectPaths: art.paths,
      featurePaths: [art.feature],
      transformationPaths: [art.transform],
      characterPaths: c.strokes.map(s => s.path),
      strokePaths: c.strokes.map(s => ({ number:s.number, path:s.path, start:s.start, end:s.end, duration:s.duration, pause:s.pause })),
      animationSteps: [
        { phase:'object', label:'Recognize the object', duration:900 },
        { phase:'feature', label:'Follow the key feature', duration:700 },
        { phase:'transform', label:'Watch the same line become the first stroke', duration:1000 },
        { phase:'stroke-order', label:'Write the character in Japanese stroke order', duration:Math.max(900, c.strokes.reduce((n,s)=>n+(s.duration||500)+(s.pause||0),0)) }
      ],
      timing: { object:900, feature:700, transform:1000, strokeGap:110 },
      status: c.strokes?.length === c.strokeCount ? 'complete' : 'artwork_complete_stroke_pending',
      strokeVerified: true,
      source: 'Existing project stroke dataset (MEXT / KanjiVG standard, as documented in hiragana.js)'
    }];
  })
);

export const BASIC_HIRAGANA_REQUIRED = HIRAGANA_DATA.map(c => c.character);
export const getBasicHiraganaScene = (character) => BASIC_HIRAGANA_SCENES[character] || null;
export const basicHiraganaCoverage = () => Object.values(BASIC_HIRAGANA_SCENES);
