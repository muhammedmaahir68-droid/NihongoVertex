/**
 * NIHONGO VERTEX - DAKUON, HANDAKUON & YŌON DATASET
 * Voiced, semi-voiced, and contracted combination kana with verified stroke additions.
 */

export const DAKUON_DATA = [
  {
    character: "が",
    type: "dakuon",
    baseChar: "か",
    level: "N5",
    category: "G-row (Voiced)",
    romaji: "ga",
    pronunciation: "gah (voiced 'k')",
    meaning: "Voiced 'ga' (subject marker)",
    strokeCount: 5,
    mnemonic: {
      title: "Kite with Two Sparkles (Dakuon)",
      concept: "Hiragana か with two little dakuten quotation dots giving it a buzzing 'G' voice!",
      story: "The kite (か) catching two buzzing sparkles of electricity (゛) transforming 'ka' into 'ga'."
    },
    exampleWords: [
      { jp: "がくせい", r: "gakusei", en: "Student", ta: "மாணவர்" },
      { jp: "がっこう", r: "gakkou", en: "School", ta: "பள்ளி" }
    ],
    exampleSentence: { jp: "わたしはがくせいです。", r: "Watashi wa gakusei desu.", en: "I am a student.", ta: "நான் ஒரு மாணவன்." },
    strokes: [
      { number: 1, path: "M28.75,34.75 c2.5,0.75 5.5,0.75 8,0.5 c8.75,-0.75 22.5,-3 28.5,-3.75 c5.5,-0.75 7.75,1.75 6.25,7.25 c-4.25,15.5 -13.25,37 -26.5,49.25", start: {x:28.75, y:34.75}, end: {x:46.75, y:88.0}, direction: "hook-and-sweep", duration: 800, pause: 120 },
      { number: 2, path: "M45.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,23.5 -5.5,47.25 -16.5,61.25", start: {x:45.75, y:22.25}, end: {x:31.5, y:88.25}, direction: "curve-down-left", duration: 650, pause: 120 },
      { number: 3, path: "M68.75,28.25 c2.75,2.25 7,7.75 8.25,11.75", start: {x:68.75, y:28.25}, end: {x:77.0, y:40.0}, direction: "diagonal-down-right", duration: 400, pause: 120 },
      { number: 4, path: "M76.75,16.25 c2.5,1.25 5.5,4.75 6.75,7.25", start: {x:76.75, y:16.25}, end: {x:83.5, y:23.5}, direction: "dakuten-dot-1", duration: 350, pause: 100 },
      { number: 5, path: "M84.75,21.25 c2.5,1.25 5.5,4.75 6.75,7.25", start: {x:84.75, y:21.25}, end: {x:91.5, y:28.5}, direction: "dakuten-dot-2", duration: 350, pause: 200 }
    ]
  },
  {
    character: "ざ",
    type: "dakuon",
    baseChar: "さ",
    level: "N5",
    category: "Z-row (Voiced)",
    romaji: "za",
    pronunciation: "zah (voiced 's')",
    meaning: "Voiced 'za'",
    strokeCount: 5,
    mnemonic: {
      title: "Samurai Sword with Two Energy Sparks",
      concept: "Hiragana さ buzzing with two energetic dakuon marks",
      story: "The samurai sword (さ) glowing with two electrical sparks transforming 'sa' into 'za'."
    },
    exampleWords: [
      { jp: "ざっし", r: "zasshi", en: "Magazine", ta: "பத்திரிகை" },
      { jp: "ざんねん", r: "zannen", en: "Unfortunate / Pity", ta: "துரதிர்ஷ்டவசமானது" }
    ],
    exampleSentence: { jp: "おもしろいざっしをよみます。", r: "Omoshiroi zasshi o yomimasu.", en: "I read an interesting magazine.", ta: "நான் ஒரு சுவாரஸ்யமான பத்திரிகையைப் படிக்கிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 28.5,-3.5 40.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:28.75, y:38.75}, end: {x:84.75, y:34.5}, direction: "left-to-right", duration: 550, pause: 120 },
      { number: 2, path: "M58.75,19.25 c1.5,1 2.25,2.5 2.25,4.75 c0,19.5 -7.25,43.5 -21.75,56.75 c-1.5,1.5 -0.5,3.25 2.5,2.25 c4.5,-1.5 10.5,-4 14.5,-6", start: {x:58.75, y:19.25}, end: {x:56.25, y:77.0}, direction: "diagonal-down-left-hook", duration: 750, pause: 120 },
      { number: 3, path: "M36.75,76.25 c7.5,8.75 22.5,16.75 35.5,12.5 c7.5,-2.25 11.5,-8.5 9.5,-14.25", start: {x:36.75, y:76.25}, end: {x:81.75, y:74.5}, direction: "curve-bottom-smile", duration: 650, pause: 120 },
      { number: 4, path: "M78.75,16.25 c2.5,1.25 5.5,4.75 6.75,7.25", start: {x:78.75, y:16.25}, end: {x:85.5, y:23.5}, direction: "dakuten-dot-1", duration: 350, pause: 100 },
      { number: 5, path: "M86.75,21.25 c2.5,1.25 5.5,4.75 6.75,7.25", start: {x:86.75, y:21.25}, end: {x:93.5, y:28.5}, direction: "dakuten-dot-2", duration: 350, pause: 200 }
    ]
  },
  {
    character: "だ",
    type: "dakuon",
    baseChar: "た",
    level: "N5",
    category: "D-row (Voiced)",
    romaji: "da",
    pronunciation: "dah (voiced 't')",
    meaning: "Voiced 'da'",
    strokeCount: 6,
    mnemonic: {
      title: "Table with Two Vibrations",
      concept: "Hiragana た with two sound marks transforming 'ta' into 'da'",
      story: "Tap the table (た) twice to create a booming 'Da' sound!"
    },
    exampleWords: [
      { jp: "だいがく", r: "daigaku", en: "University", ta: "பல்கலைக்கழகம்" },
      { jp: "だれ", r: "dare", en: "Who", ta: "யார்" }
    ],
    exampleSentence: { jp: "だいがくへいきます。", r: "Daigaku he ikimasu.", en: "I go to university.", ta: "நான் பல்கலைக்கழகத்திற்குச் செல்கிறேன்." },
    strokes: [
      { number: 1, path: "M22.75,36.75 c2.5,0.75 5.5,0.5 8,0.25 c7.5,-0.75 16.5,-2 23.5,-2.75", start: {x:22.75, y:36.75}, end: {x:61.75, y:34.5}, direction: "left-to-right", duration: 500, pause: 100 },
      { number: 2, path: "M42.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,23.5 -5.5,47.25 -16.5,61.25", start: {x:42.75, y:18.25}, end: {x:28.5, y:84.25}, direction: "diagonal-down-left", duration: 650, pause: 100 },
      { number: 3, path: "M56.75,42.75 c2.5,0.75 5.5,0.5 8,0.25 c6.5,-0.75 13.5,-2 19.5,-2.75", start: {x:56.75, y:42.75}, end: {x:86.75, y:44.0}, direction: "left-to-right", duration: 450, pause: 100 },
      { number: 4, path: "M52.75,66.25 c3.5,1.25 7.5,1.25 11.5,0.75 c9.5,-1.25 18.5,-3.75 26.5,-8.5", start: {x:52.75, y:66.25}, end: {x:90.75, y:58.5}, direction: "curve-left-to-right", duration: 500, pause: 120 },
      { number: 5, path: "M76.75,16.25 c2.5,1.25 5.5,4.75 6.75,7.25", start: {x:76.75, y:16.25}, end: {x:83.5, y:23.5}, direction: "dakuten-dot-1", duration: 350, pause: 100 },
      { number: 6, path: "M84.75,21.25 c2.5,1.25 5.5,4.75 6.75,7.25", start: {x:84.75, y:21.25}, end: {x:91.5, y:28.5}, direction: "dakuten-dot-2", duration: 350, pause: 200 }
    ]
  },
  {
    character: "ば",
    type: "dakuon",
    baseChar: "は",
    level: "N5",
    category: "B-row (Voiced)",
    romaji: "ba",
    pronunciation: "bah (voiced 'h')",
    meaning: "Voiced 'ba'",
    strokeCount: 5,
    mnemonic: {
      title: "Laughing Mouth with Two Dots",
      concept: "Hiragana は with two dakuon marks turning 'ha' into 'ba'",
      story: "The laughing mouth (は) bursts into a loud 'Ba-ba!' laugh with two bursting bubbles."
    },
    exampleWords: [
      { jp: "バス", r: "basu", en: "Bus", ta: "பேருந்து" },
      { jp: "ばんごはん", r: "bangohan", en: "Dinner", ta: "இரவு உணவு" }
    ],
    exampleSentence: { jp: "バスでかいしゃへいきます。", r: "Basu de kaisha he ikimasu.", en: "I go to the company by bus.", ta: "நான் பேருந்தில் அலுவலகம் செல்கிறேன்." },
    strokes: [
      { number: 1, path: "M30.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,25.5 -3.5,51.75 -10.5,65.25", start: {x:30.75, y:18.25}, end: {x:45.75, y:82.75}, direction: "vertical-curve-hook", duration: 750, pause: 100 },
      { number: 2, path: "M50.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c7.5,-0.75 16.5,-2 23.5,-2.75", start: {x:50.75, y:38.75}, end: {x:89.75, y:36.5}, direction: "left-to-right", duration: 500, pause: 100 },
      { number: 3, path: "M66.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,25.5 -0.25,37.5 -0.5,41.5 c-0.75,7.5 -6.5,10.5 -12.5,7.5 c-6.5,-3.5 -5.5,-12.5 2.5,-16.25 c8.5,-4 16.5,0 18.5,6.5 c1.5,5 0.5,14.5 -5.5,20.5", start: {x:66.75, y:22.25}, end: {x:70.5, y:90.75}, direction: "vertical-down-loop", duration: 1000, pause: 120 },
      { number: 4, path: "M78.75,16.25 c2.5,1.25 5.5,4.75 6.75,7.25", start: {x:78.75, y:16.25}, end: {x:85.5, y:23.5}, direction: "dakuten-dot-1", duration: 350, pause: 100 },
      { number: 5, path: "M86.75,21.25 c2.5,1.25 5.5,4.75 6.75,7.25", start: {x:86.75, y:21.25}, end: {x:93.5, y:28.5}, direction: "dakuten-dot-2", duration: 350, pause: 200 }
    ]
  },
  {
    character: "ぱ",
    type: "handakuon",
    baseChar: "は",
    level: "N5",
    category: "P-row (Semi-voiced)",
    romaji: "pa",
    pronunciation: "pah (popping 'p')",
    meaning: "Semi-voiced 'pa'",
    strokeCount: 4,
    mnemonic: {
      title: "Popping Bubble (Handakuon)",
      concept: "Hiragana は with a tiny circular handakuon bubble (゜) turning 'ha' into 'pa'",
      story: "Pop! A round bubble (゜) floating over 'ha' creates a crisp 'Pa' pop sound."
    },
    exampleWords: [
      { jp: "パン", r: "pan", en: "Bread", ta: "ரொட்டி" },
      { jp: "パーティ", r: "paatii", en: "Party", ta: "விருந்து" }
    ],
    exampleSentence: { jp: "たのしいパーティにいきます。", r: "Tanoshii paatii ni ikimasu.", en: "I go to a fun party.", ta: "நான் ஒரு வேடிக்கையான விருந்துக்கு செல்கிறேன்." },
    strokes: [
      { number: 1, path: "M30.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,25.5 -3.5,51.75 -10.5,65.25", start: {x:30.75, y:18.25}, end: {x:45.75, y:82.75}, direction: "vertical-curve-hook", duration: 750, pause: 100 },
      { number: 2, path: "M50.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c7.5,-0.75 16.5,-2 23.5,-2.75", start: {x:50.75, y:38.75}, end: {x:89.75, y:36.5}, direction: "left-to-right", duration: 500, pause: 100 },
      { number: 3, path: "M66.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,25.5 -0.25,37.5 -0.5,41.5 c-0.75,7.5 -6.5,10.5 -12.5,7.5 c-6.5,-3.5 -5.5,-12.5 2.5,-16.25 c8.5,-4 16.5,0 18.5,6.5 c1.5,5 0.5,14.5 -5.5,20.5", start: {x:66.75, y:22.25}, end: {x:70.5, y:90.75}, direction: "vertical-down-loop", duration: 1000, pause: 120 },
      { number: 4, path: "M82.75,16.25 c3.5,-0.5 7.5,1.5 7.5,5.5 c0,4 -4,6 -7.5,5.5 c-3.5,-0.5 -7.5,-1.5 -7.5,-5.5 c0,-4 4,-6 7.5,-5.5 Z", start: {x:82.75, y:16.25}, end: {x:82.75, y:16.25}, direction: "circle-handakuon-bubble", duration: 500, pause: 200 }
    ]
  }
];
