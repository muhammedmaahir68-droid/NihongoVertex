/**
 * NIHONGO VERTEX - COMPLETE KATAKANA AUTHENTIC STROKE & MNEMONIC DATASET
 * Shape Association + Hiragana Relationship + Verified 109x109 KanjiVG Stroke Paths
 */

export const KATAKANA_DATA = [
  {
    character: "ア",
    type: "katakana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "a",
    pronunciation: "ah (like 'father')",
    meaning: "Katakana 'a'",
    strokeCount: 2,
    hiraRelation: "Derived from the top of 阿 / relates to Hiragana あ",
    mnemonic: {
      title: "Antenna",
      concept: "A rooftop Antenna catching radio waves (A for Antenna)",
      story: "Look at the angular TV antenna (ア) on the roof. It has an angled horizontal arm and a sweeping mast wire.",
      svgMnemonicPath: "M28,32 H76 L60,54 M60,54 C58,74 46,90 28,98"
    },
    exampleWords: [
      { jp: "アイス", r: "aisu", en: "Ice cream", ta: "ஐஸ்கிரீம்" },
      { jp: "アメリカ", r: "amerika", en: "America", ta: "அமெரிக்கா" }
    ],
    exampleSentence: { jp: "アイスクリームをたべます。", r: "Aisukuriimu o tabemasu.", en: "I eat ice cream.", ta: "நான் ஐஸ்கிரீம் சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 32,-3.5 41.75,-4.75 c3.75,-0.5 5.5,1.25 3.5,4.75 c-6.5,10.5 -13.5,20.5 -19.5,27.5", start: {x:28.75, y:32.75}, end: {x:62.5, y:60.5}, direction: "horizontal-right-angle-down-left", duration: 750, pause: 150 },
      { number: 2, path: "M59.75,54.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,18.5 -10.5,33.5 -34.5,41.25", start: {x:59.75, y:54.25}, end: {x:27.75, y:101.0}, direction: "long-curve-down-left", duration: 850, pause: 200 }
    ]
  },
  {
    character: "イ",
    type: "katakana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "i",
    pronunciation: "ee (like 'feet')",
    meaning: "Katakana 'i'",
    strokeCount: 2,
    hiraRelation: "Derived from the left of 伊 / relates to Hiragana い",
    mnemonic: {
      title: "I-shaped Person",
      concept: "An 'I'-shaped person standing upright with good posture",
      story: "A person standing tall like a capital 'I', with a leaning head and straight spine.",
      svgMnemonicPath: "M62,18 L32,60 M46,42 V92"
    },
    exampleWords: [
      { jp: "イギリス", r: "igirisu", en: "UK / England", ta: "இங்கிலாந்து" },
      { jp: "インド", r: "indo", en: "India", ta: "இந்தியா" }
    ],
    exampleSentence: { jp: "インドからきました。", r: "Indo kara kimashita.", en: "I came from India.", ta: "நான் இந்தியாவில் இருந்து வந்தேன்." },
    strokes: [
      { number: 1, path: "M62.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,18.5 -12.5,35.5 -31.5,44.75", start: {x:62.75, y:18.25}, end: {x:33.5, y:67.75}, direction: "diagonal-down-left", duration: 650, pause: 150 },
      { number: 2, path: "M46.75,42.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,22.5 -0.5,42.5 -0.5,52.5", start: {x:46.75, y:42.25}, end: {x:48.75, y:100.25}, direction: "vertical-straight-down", duration: 750, pause: 200 }
    ]
  },
  {
    character: "ウ",
    type: "katakana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "u",
    pronunciation: "oo (like 'soup')",
    meaning: "Katakana 'u'",
    strokeCount: 3,
    hiraRelation: "Derived from the top crown of 宇 / identical top to Hiragana う",
    mnemonic: {
      title: "Umbrella",
      concept: "The protective top handle and canopy of an Umbrella",
      story: "Open up your Umbrella (ウ) to stay dry! Top center tip, left drop, and protective roof canopy.",
      svgMnemonicPath: "M54,16 V30 M32,38 V56 M32,42 H76 L64,74 C58,88 44,96 32,98"
    },
    exampleWords: [
      { jp: "ウエブ", r: "webu", en: "Web", ta: "இணையம்" },
      { jp: "ウイスキー", r: "uisukii", en: "Whisky", ta: "விஸ்கி" }
    ],
    exampleSentence: { jp: "ウエブをチェックします。", r: "Webu o chekku shimasu.", en: "I check the web.", ta: "நான் இணையத்தைச் சரிபார்க்கிறேன்." },
    strokes: [
      { number: 1, path: "M54.25,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,4.5 -0.25,9.5 -0.5,13.5", start: {x:54.25, y:16.25}, end: {x:56.0, y:34.5}, direction: "vertical-short-down", duration: 400, pause: 120 },
      { number: 2, path: "M32.75,38.25 c1.5,1 2.25,2.5 2.25,4.75 c0,6.5 -0.5,13.5 -1.5,18.5", start: {x:32.75, y:38.25}, end: {x:33.5, y:61.5}, direction: "vertical-left-drop", duration: 450, pause: 130 },
      { number: 3, path: "M33.75,42.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 32.5,-3.75 41.5,-4.75 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,14.5 -22.5,37.5 -48.5,48.25", start: {x:33.75, y:42.75}, end: {x:38.25, y:91.25}, direction: "roof-right-and-sweep-down-left", duration: 1000, pause: 200 }
    ]
  },
  {
    character: "エ",
    type: "katakana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "e",
    pronunciation: "eh (like 'get')",
    meaning: "Katakana 'e'",
    strokeCount: 3,
    hiraRelation: "Derived from the kanji 江 / relates to Hiragana え",
    mnemonic: {
      title: "Elevator",
      concept: "An Elevator shaft with floor above, central cable, and basement platform",
      story: "The Elevator (エ) moves between the top floor beam and the ground floor beam.",
      svgMnemonicPath: "M28,26 H80 M54,28 V76 M22,78 H88"
    },
    exampleWords: [
      { jp: "エレベーター", r: "erebeetaa", en: "Elevator", ta: "மின்தூக்கி" },
      { jp: "エアコン", r: "eakon", en: "Air conditioner", ta: "குளிர்சாதனம்" }
    ],
    exampleSentence: {
      jp: "エレベーターにのります。",
      r: "Erebeetaa ni norimasu.",
      en: "I get on the elevator.",
      ta: "நான் மின்தூக்கியில் ஏறுகிறேன்."
    },
    strokes: [
      { number: 1, path: "M28.75,26.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 28.5,-3 40.5,-4 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:28.75, y:26.75}, end: {x:84.75, y:23.25}, direction: "left-to-right", duration: 550, pause: 120 },
      { number: 2, path: "M54.25,28.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,18.5 -0.25,35.5 -0.5,43.5", start: {x:54.25, y:28.25}, end: {x:56.25, y:77.25}, direction: "vertical-straight-down", duration: 650, pause: 130 },
      { number: 3, path: "M22.75,78.75 c3.5,0.75 7.5,0.5 11,0.25 c18.5,-1.5 38.5,-3.75 54.5,-4.75 c3.5,-0.25 7,-0.25 10.5,0.25", start: {x:22.75, y:78.75}, end: {x:98.75, y:74.5}, direction: "left-to-right", duration: 700, pause: 200 }
    ]
  },
  {
    character: "オ",
    type: "katakana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "o",
    pronunciation: "oh (like 'boat')",
    meaning: "Katakana 'o'",
    strokeCount: 3,
    hiraRelation: "Derived from the left of 於 / relates to Hiragana お",
    mnemonic: {
      title: "Ocean Hook",
      concept: "An Ocean fishing crane hooking a heavy catch on the left",
      story: "A crane over the Ocean (オ) with horizontal boom, vertical cable hook, and diagonal support strut.",
      svgMnemonicPath: "M24,32 H86 M56,16 V78 C56,86 50,88 42,84 M54,42 L28,78"
    },
    exampleWords: [
      { jp: "オレンジ", r: "orenji", en: "Orange", ta: "ஆரஞ்சு" },
      { jp: "オンライン", r: "onrain", en: "Online", ta: "இணையம்" }
    ],
    exampleSentence: { jp: "オレンジをたべます。", r: "Orenji o tabemasu.", en: "I eat an orange.", ta: "நான் ஆரஞ்சு சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M24.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 34.5,-3.75 48.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:24.75, y:32.75}, end: {x:88.75, y:28.5}, direction: "left-to-right", duration: 600, pause: 120 },
      { number: 2, path: "M56.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -0.25,51.5 -0.5,57.5 c-0.5,7.5 -4.5,10.5 -10.5,10.5 c-4.5,0 -8.5,-2.5 -11.5,-6", start: {x:56.75, y:16.25}, end: {x:36.5, y:83.0}, direction: "vertical-down-hook-left", duration: 850, pause: 140 },
      { number: 3, path: "M54.75,42.25 c1.5,1 2.25,2.5 2.25,4.75 c0,18.5 -12.5,33.5 -28.5,41.25", start: {x:54.75, y:42.25}, end: {x:28.5, y:88.25}, direction: "diagonal-down-left", duration: 650, pause: 200 }
    ]
  },
  {
    character: "カ",
    type: "katakana",
    level: "N5",
    category: "K-row",
    romaji: "ka",
    pronunciation: "kah (like 'car')",
    meaning: "Katakana 'ka'",
    strokeCount: 2,
    hiraRelation: "Identical to Hiragana か (minus the flying dot mark)",
    mnemonic: {
      title: "Katana",
      concept: "A sharp samurai Katana blade slicing with power",
      story: "A swift Katana (カ) sword slash: horizontal strike curving down with a cutting cross-slash.",
      svgMnemonicPath: "M28,34 H68 C76,34 76,46 68,76 M52,20 C52,56 46,78 34,88"
    },
    exampleWords: [
      { jp: "カメラ", r: "kamera", en: "Camera", ta: "கேமரா" },
      { jp: "カフェ", r: "kafe", en: "Cafe", ta: "காபி கடை" }
    ],
    exampleSentence: { jp: "カフェでコーヒーをのみます。", r: "Kafe de koohii o nomimasu.", en: "I drink coffee at a cafe.", ta: "நான் காபி கடையில் காபி குடிக்கிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,34.75 c2.5,0.75 5.5,0.75 8,0.5 c8.75,-0.75 24.5,-3 32.5,-3.75 c5.5,-0.75 7.75,1.75 6.25,7.25 c-4.25,15.5 -13.25,37 -26.5,49.25", start: {x:28.75, y:34.75}, end: {x:48.75, y:88.0}, direction: "horizontal-and-hook-curve", duration: 850, pause: 150 },
      { number: 2, path: "M52.75,20.25 c1.5,1 2.25,2.5 2.25,4.75 c0,24.5 -6.5,49.25 -20.5,63.25", start: {x:52.75, y:20.25}, end: {x:34.5, y:88.25}, direction: "diagonal-down-left", duration: 700, pause: 200 }
    ]
  },
  {
    character: "キ",
    type: "katakana",
    level: "N5",
    category: "K-row",
    romaji: "ki",
    pronunciation: "kee (like 'key')",
    meaning: "Katakana 'ki'",
    strokeCount: 3,
    hiraRelation: "Identical to Hiragana き (minus the detached bottom smile curve)",
    mnemonic: {
      title: "Key",
      concept: "A golden Key with two teeth bars and a clean diagonal shaft",
      story: "The top half of a Key (キ). Two horizontal teeth crossed by a sharp diagonal key shaft.",
      svgMnemonicPath: "M28,34 H78 M24,52 H82 M58,18 L34,88"
    },
    exampleWords: [
      { jp: "キッチン", r: "kicchin", en: "Kitchen", ta: "சமையலறை" },
      { jp: "キャンプ", r: "kyanpu", en: "Camp", ta: "முகாம்" }
    ],
    exampleSentence: { jp: "キャンプにいきます。", r: "Kyanpu ni ikimasu.", en: "I go camping.", ta: "நான் முகாமிற்கு செல்கிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,34.25 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 26.5,-3 38.5,-4 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:28.75, y:34.25}, end: {x:82.75, y:30.75}, direction: "left-to-right", duration: 550, pause: 120 },
      { number: 2, path: "M24.75,51.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.5 30.5,-3.5 44.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:24.75, y:51.75}, end: {x:84.75, y:47.5}, direction: "left-to-right", duration: 600, pause: 140 },
      { number: 3, path: "M58.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -9.25,48.5 -26.75,65.25", start: {x:58.75, y:18.25}, end: {x:34.25, y:88.25}, direction: "diagonal-down-left", duration: 800, pause: 200 }
    ]
  },
  {
    character: "ク",
    type: "katakana",
    level: "N5",
    category: "K-row",
    romaji: "ku",
    pronunciation: "koo (like 'cook')",
    meaning: "Katakana 'ku'",
    strokeCount: 2,
    hiraRelation: "Derived from the left of 久 / relates to Hiragana く",
    mnemonic: {
      title: "Coo / Open Beak",
      concept: "A bird cooing with its open beak pointing to the right",
      story: "A pigeon saying 'Coo' (ク) with an upper beak crest and a sharp open beak angle.",
      svgMnemonicPath: "M48,16 L28,44 M32,36 H74 L46,88"
    },
    exampleWords: [
      { jp: "クラス", r: "kurasu", en: "Class", ta: "வகுப்பு" },
      { jp: "クッキー", r: "kukkii", en: "Cookie", ta: "குக்கீ" }
    ],
    exampleSentence: { jp: "クッキーをたべます。", r: "Kukkii o tabemasu.", en: "I eat a cookie.", ta: "நான் குக்கீ சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M48.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,8.5 -8.5,20.5 -19.5,27.5", start: {x:48.75, y:16.25}, end: {x:31.5, y:48.5}, direction: "diagonal-down-left", duration: 500, pause: 120 },
      { number: 2, path: "M34.75,36.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-3 33.5,-4.25 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,14.5 -22.5,37.5 -44.5,50.75", start: {x:34.75, y:36.75}, end: {x:35.25, y:88.25}, direction: "horizontal-right-and-sweep-down-left", duration: 950, pause: 200 }
    ]
  },
  {
    character: "ケ",
    type: "katakana",
    level: "N5",
    category: "K-row",
    romaji: "ke",
    pronunciation: "keh (like 'keg')",
    meaning: "Katakana 'ke'",
    strokeCount: 3,
    hiraRelation: "Derived from the right component of 介 / relates to Hiragana け",
    mnemonic: {
      title: "K with an Extra Leg",
      concept: "A letter 'K' with a sturdy extra leg kicking out to the right",
      story: "A capital K (ケ) doing martial arts with an outstretched leg.",
      svgMnemonicPath: "M48,16 L28,44 M34,36 H86 M56,38 C56,66 48,84 32,96 M58,54 L84,86"
    },
    exampleWords: [
      { jp: "ケーキ", r: "keeki", en: "Cake", ta: "கேக்" },
      { jp: "ケータイ", r: "keetai", en: "Mobile phone", ta: "கைப்பேசி" }
    ],
    exampleSentence: { jp: "おいしいケーキをたべます。", r: "Oishii keeki o tabemasu.", en: "I eat delicious cake.", ta: "நான் சுவையான கேக் சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M48.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,8.5 -8.5,20.5 -19.5,27.5", start: {x:48.75, y:16.25}, end: {x:31.5, y:48.5}, direction: "diagonal-down-left", duration: 500, pause: 120 },
      { number: 2, path: "M34.75,36.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 32.5,-3.75 44.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:34.75, y:36.75}, end: {x:94.75, y:32.5}, direction: "left-to-right", duration: 600, pause: 120 },
      { number: 3, path: "M56.75,38.25 c1.5,1.25 2.25,2.5 2.25,4.75 c0,22.5 -10.5,39.5 -30.5,49.25", start: {x:56.75, y:38.25}, end: {x:28.5, y:92.25}, direction: "curve-down-left", duration: 750, pause: 200 }
    ]
  },
  {
    character: "コ",
    type: "katakana",
    level: "N5",
    category: "K-row",
    romaji: "ko",
    pronunciation: "koh (like 'corner')",
    meaning: "Katakana 'ko'",
    strokeCount: 2,
    hiraRelation: "Top and bottom frames of 己 / relates to Hiragana こ",
    mnemonic: {
      title: "Corner / Co",
      concept: "Two sharp 90-degree Corners framing a square box",
      story: "A sharp top Corner (コ) that connects to a solid bottom ledge.",
      svgMnemonicPath: "M28,28 H78 V78 M28,78 H78"
    },
    exampleWords: [
      { jp: "コーヒー", r: "koohii", en: "Coffee", ta: "காபி" },
      { jp: "コート", r: "kooto", en: "Coat", ta: "மேலங்கி" }
    ],
    exampleSentence: { jp: "あついコーヒーをのみます。", r: "Atsui koohii o nomimasu.", en: "I drink hot coffee.", ta: "நான் சூடான காபி குடிக்கிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,28.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 32.5,-3.5 42.5,-4.75 c3.5,-0.5 5.5,1.5 5.5,4.75 c0,18.5 -0.25,37.5 -0.25,49.5", start: {x:28.75, y:28.75}, end: {x:84.75, y:78.5}, direction: "right-and-down-angle", duration: 800, pause: 140 },
      { number: 2, path: "M28.75,78.75 c3.5,0.75 7.5,0.5 11,0.25 c16.5,-1.5 32.5,-3.25 45.5,-4.25", start: {x:28.75, y:78.75}, end: {x:85.25, y:75.0}, direction: "left-to-right-base", duration: 600, pause: 200 }
    ]
  },
  {
    character: "サ",
    type: "katakana",
    level: "N5",
    category: "S-row",
    romaji: "sa",
    pronunciation: "sah (like 'samurai')",
    meaning: "Katakana 'sa'",
    strokeCount: 3,
    hiraRelation: "Derived from the top of 散 / relates to Hiragana さ",
    mnemonic: {
      title: "Sa-murai",
      concept: "A Samurai's helmet crest with two crossed antenna pins",
      story: "A Samurai (サ) standing firm with crossed swords over a straight line.",
      svgMnemonicPath: "M22,34 H86 M38,20 V56 M68,20 C68,52 64,74 52,88"
    },
    exampleWords: [
      { jp: "サラダ", r: "sarada", en: "Salad", ta: "சாலட்" },
      { jp: "サッカー", r: "sakkaa", en: "Soccer", ta: "கால்பந்து" }
    ],
    exampleSentence: { jp: "サッカーをします。", r: "Sakkaa o shimasu.", en: "I play soccer.", ta: "நான் கால்பந்து விளையாடுகிறேன்." },
    strokes: [
      { number: 1, path: "M22.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c16.5,-1.5 38.5,-4 52.5,-5 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:22.75, y:34.75}, end: {x:90.75, y:30.25}, direction: "left-to-right", duration: 600, pause: 120 },
      { number: 2, path: "M38.75,20.25 c1.5,1 2.25,2.5 2.25,4.75 c0,8.5 -0.5,18.5 -0.5,24.5", start: {x:38.75, y:20.25}, end: {x:40.5, y:49.5}, direction: "vertical-short-down", duration: 450, pause: 120 },
      { number: 3, path: "M68.75,20.25 c1.5,1 2.25,2.5 2.25,4.75 c0,24.5 -5.5,48.5 -18.5,63.25", start: {x:68.75, y:20.25}, end: {x:52.5, y:88.25}, direction: "curve-down-left", duration: 750, pause: 200 }
    ]
  },
  {
    character: "シ",
    type: "katakana",
    level: "N5",
    category: "S-row",
    romaji: "shi",
    pronunciation: "shee (like 'ship')",
    meaning: "Katakana 'shi'",
    strokeCount: 3,
    hiraRelation: "Derived from the three water drops of 之 / relates to Hiragana し",
    mnemonic: {
      title: "Three Drops Looking Like Shi",
      concept: "She has three sparkling water drops splashed UPWARD onto her face",
      story: "Three water drops splashing UP from bottom-left: dot 1, dot 2, and swoosh UP (シ - shi).",
      svgMnemonicPath: "M32,24 L44,28 M28,48 L42,54 M24,84 C44,72 68,54 84,32"
    },
    exampleWords: [
      { jp: "シャツ", r: "shatsu", en: "Shirt", ta: "சட்டை" },
      { jp: "シャワー", r: "shawaa", en: "Shower", ta: "குளியல்" }
    ],
    exampleSentence: { jp: "シャワーをあびます。", r: "Shawaa o abimasu.", en: "I take a shower.", ta: "நான் குளிக்கிறேன்." },
    strokes: [
      { number: 1, path: "M32.75,24.25 c2.5,1.25 6.5,4.75 7.75,7.25", start: {x:32.75, y:24.25}, end: {x:40.5, y:31.5}, direction: "diagonal-down-right", duration: 400, pause: 120 },
      { number: 2, path: "M28.75,48.25 c2.5,1.25 6.5,4.75 7.75,7.25", start: {x:28.75, y:48.25}, end: {x:36.5, y:55.5}, direction: "diagonal-down-right", duration: 400, pause: 130 },
      { number: 3, path: "M24.75,84.25 c2.5,0.75 4.5,-0.5 7,-2.75 c14.5,-12.5 32.5,-32.5 48.5,-47.5 c2.5,-2.25 5.5,-2.5 8,-0.75", start: {x:24.75, y:84.25}, end: {x:88.25, y:33.25}, direction: "sweep-up-right", duration: 900, pause: 200 }
    ]
  },
  {
    character: "ス",
    type: "katakana",
    level: "N5",
    category: "S-row",
    romaji: "su",
    pronunciation: "soo (like 'sushi')",
    meaning: "Katakana 'su'",
    strokeCount: 2,
    hiraRelation: "Derived from the top of 須 / relates to Hiragana す",
    mnemonic: {
      title: "Slide",
      concept: "A playground Slide that you climb up and whoosh down",
      story: "Climb up the ladder, slide across the bar, and whoosh down the long slide ramp (ス)!",
      svgMnemonicPath: "M28,32 H74 L44,78 M56,58 L82,88"
    },
    exampleWords: [
      { jp: "スポーツ", r: "supootsu", en: "Sports", ta: "விளையாட்டு" },
      { jp: "スーパー", r: "suupaa", en: "Supermarket", ta: "பல்பொருள் அங்காடி" }
    ],
    exampleSentence: { jp: "スーパーで買い物をします。", r: "Suupaa de kaimono o shimasu.", en: "I shop at the supermarket.", ta: "நான் பல்பொருள் அங்காடியில் பொருட்கள் வாங்குகிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 28.5,-3.5 38.5,-4.75 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,14.5 -22.5,37.5 -44.5,50.75", start: {x:28.75, y:32.75}, end: {x:34.25, y:83.75}, direction: "horizontal-right-and-sweep-down-left", duration: 950, pause: 140 },
      { number: 2, path: "M56.75,54.25 c3.5,2.5 12.5,14.5 18.5,22.5 c2.25,3 4.5,5.5 7.5,7.25", start: {x:56.75, y:54.25}, end: {x:82.75, y:84.0}, direction: "diagonal-down-right", duration: 600, pause: 200 }
    ]
  },
  {
    character: "セ",
    type: "katakana",
    level: "N5",
    category: "S-row",
    romaji: "se",
    pronunciation: "seh (like 'set')",
    meaning: "Katakana 'se'",
    strokeCount: 2,
    hiraRelation: "Derived from the top of 世 / identical geometry to Hiragana せ",
    mnemonic: {
      title: "Set of Crossing Lines",
      concept: "A Set of crossing angular lines framing a stool",
      story: "A neat Set (セ) of shelves formed by an L-hook and a central supportive brace.",
      svgMnemonicPath: "M24,34 H78 V74 H44 M56,18 V84"
    },
    exampleWords: [
      { jp: "セーター", r: "seetaa", en: "Sweater", ta: "ஸ்வெட்டர்" },
      { jp: "セット", r: "setto", en: "Set", ta: "தொகுப்பு" }
    ],
    exampleSentence: { jp: "あたたかいセーターをきます。", r: "Atatakai seetaa o kimasu.", en: "I wear a warm sweater.", ta: "நான் சூடான ஸ்வெட்டர் அணிகிறேன்." },
    strokes: [
      { number: 1, path: "M24.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 32.5,-3.75 42.5,-4.75 c3.5,-0.25 5.5,1.5 5.5,4.75 c0,15.5 -0.25,32.5 -0.5,36.5 c-0.5,5.5 -3.5,7.5 -8.5,7.5 c-4.5,0 -16.5,-0.75 -24.5,-1.5", start: {x:24.75, y:34.75}, end: {x:46.75, y:77.5}, direction: "horizontal-right-down-and-left", duration: 1000, pause: 140 },
      { number: 2, path: "M54.75,16.25 c1.5,1.25 2.25,2.5 2.25,4.75 c0,24.5 -0.5,48.5 -0.5,68.5", start: {x:54.75, y:16.25}, end: {x:56.5, y:90.0}, direction: "vertical-straight-down", duration: 750, pause: 200 }
    ]
  },
  {
    character: "ソ",
    type: "katakana",
    level: "N5",
    category: "S-row",
    romaji: "so",
    pronunciation: "soh (like 'sew')",
    meaning: "Katakana 'so'",
    strokeCount: 2,
    hiraRelation: "Derived from the top of 曽 / relates to Hiragana そ",
    mnemonic: {
      title: "Soaring Bird",
      concept: "A bird Soaring down from the sky (compare with ン: ソ strokes DOWN from top-right)",
      story: "A bird Soaring (ソ) down from the clouds: top left dot, then slash DOWNWARD from top-right.",
      svgMnemonicPath: "M36,28 L50,38 M76,22 L36,88"
    },
    exampleWords: [
      { jp: "ソファ", r: "sofa", en: "Sofa", ta: "சோபா" },
      { jp: "ソフト", r: "sofuto", en: "Soft / Software", ta: "மென்பொருள்" }
    ],
    exampleSentence: { jp: "ソファでやすみます。", r: "Sofa de yasumimasu.", en: "I rest on the sofa.", ta: "நான் சோபாவில் ஓய்வெடுக்கிறேன்." },
    strokes: [
      { number: 1, path: "M36.75,28.25 c2.5,1.25 6.5,4.75 7.75,7.25", start: {x:36.75, y:28.25}, end: {x:44.5, y:35.5}, direction: "diagonal-down-right", duration: 400, pause: 120 },
      { number: 2, path: "M76.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -18.5,49.25 -44.5,59.25", start: {x:76.75, y:22.25}, end: {x:34.5, y:86.25}, direction: "diagonal-down-left-slash", duration: 850, pause: 200 }
    ]
  },
  {
    character: "タ",
    type: "katakana",
    level: "N5",
    category: "T-row",
    romaji: "ta",
    pronunciation: "tah (like 'taco')",
    meaning: "Katakana 'ta'",
    strokeCount: 3,
    hiraRelation: "Derived from 多 / relates to Hiragana た",
    mnemonic: {
      title: "Tangled Lines / Taco",
      concept: "Tangled Lines forming a tasty crunchy Taco",
      story: "A tasty Taco (タ) with a folded corn shell and spicy filling inside.",
      svgMnemonicPath: "M48,16 L28,48 M34,36 H74 L48,88 M42,54 L72,74"
    },
    exampleWords: [
      { jp: "タクシー", r: "takushii", en: "Taxi", ta: "டாக்ஸி" },
      { jp: "タオル", r: "taoru", en: "Towel", ta: "துண்டு" }
    ],
    exampleSentence: { jp: "タクシーをよびます。", r: "Takushii o yobimasu.", en: "I call a taxi.", ta: "நான் டாக்ஸி அழைக்கிறேன்." },
    strokes: [
      { number: 1, path: "M48.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,8.5 -8.5,20.5 -19.5,27.5", start: {x:48.75, y:16.25}, end: {x:31.5, y:48.5}, direction: "diagonal-down-left", duration: 500, pause: 120 },
      { number: 2, path: "M34.75,36.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-3 33.5,-4.25 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,14.5 -22.5,37.5 -44.5,50.75", start: {x:34.75, y:36.75}, end: {x:35.25, y:88.25}, direction: "horizontal-right-and-sweep-down-left", duration: 950, pause: 140 },
      { number: 3, path: "M42.75,54.25 c2.5,1.25 7.5,6.5 16.5,13.5 c3.5,2.75 7.5,5.5 11.5,7.75", start: {x:42.75, y:54.25}, end: {x:70.75, y:75.5}, direction: "diagonal-down-right", duration: 600, pause: 200 }
    ]
  },
  {
    character: "チ",
    type: "katakana",
    level: "N5",
    category: "T-row",
    romaji: "chi",
    pronunciation: "chee (like 'cheese')",
    meaning: "Katakana 'chi'",
    strokeCount: 3,
    hiraRelation: "Derived from 千 / relates to Hiragana ち",
    mnemonic: {
      title: "Cheese",
      concept: "A block of Cheese with a slicing knife through the middle",
      story: "A chef slicing a wedge of Cheese (チ) with a downward cross-cut.",
      svgMnemonicPath: "M68,18 L32,32 M24,52 H84 M54,32 C54,64 46,82 28,94"
    },
    exampleWords: [
      { jp: "チーズ", r: "chiizu", en: "Cheese", ta: "சீஸ்" },
      { jp: "チーム", r: "chiimu", en: "Team", ta: "அணி" }
    ],
    exampleSentence: { jp: "チーズバーガーをたべます。", r: "Chiizubaagaa o tabemasu.", en: "I eat a cheeseburger.", ta: "நான் சீஸ் பர்கர் சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M68.75,18.25 c0.5,1 0.75,2.25 0.25,3.75 c-4.5,7.5 -14.5,13.5 -29.5,17.5", start: {x:68.75, y:18.25}, end: {x:39.5, y:39.5}, direction: "slanted-dash-left", duration: 500, pause: 120 },
      { number: 2, path: "M24.75,52.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 34.5,-3.5 48.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:24.75, y:52.75}, end: {x:88.75, y:48.5}, direction: "left-to-right", duration: 600, pause: 120 },
      { number: 3, path: "M54.75,34.25 c1.5,1.25 2.25,2.5 2.25,4.75 c0,22.5 -10.5,41.5 -28.5,51.25", start: {x:54.75, y:34.25}, end: {x:28.5, y:90.25}, direction: "curve-down-left", duration: 750, pause: 200 }
    ]
  },
  {
    character: "ツ",
    type: "katakana",
    level: "N5",
    category: "T-row",
    romaji: "tsu",
    pronunciation: "tsoo (like 'tsunami')",
    meaning: "Katakana 'tsu'",
    strokeCount: 3,
    hiraRelation: "Derived from 川 / relates to Hiragana つ",
    mnemonic: {
      title: "Tsunami Waves",
      concept: "Tsunami waves crashing DOWNWARD from the sky (strokes drop from top)",
      story: "A giant Tsunami wave (ツ) crashing down: drop 1, drop 2, and giant tidal wave crashing DOWN-left.",
      svgMnemonicPath: "M34,22 L38,36 M54,20 L58,34 M84,24 L36,88"
    },
    exampleWords: [
      { jp: "ツアー", r: "tsuaa", en: "Tour", ta: "சுற்றுலா" },
      { jp: "スーツ", r: "suutsu", en: "Suit", ta: "கோட் சூட்" }
    ],
    exampleSentence: { jp: "とうきょうのツアーにいきます。", r: "Toukyou no tsuaa ni ikimasu.", en: "I go on a tour of Tokyo.", ta: "நான் டோக்கியோ சுற்றுலா செல்கிறேன்." },
    strokes: [
      { number: 1, path: "M34.75,22.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,3.5 -0.5,8.5 -1.5,12.5", start: {x:34.75, y:22.25}, end: {x:35.75, y:40.25}, direction: "vertical-down-dot", duration: 400, pause: 120 },
      { number: 2, path: "M54.75,20.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,3.5 -0.5,8.5 -1.5,12.5", start: {x:54.75, y:20.25}, end: {x:55.75, y:38.25}, direction: "vertical-down-dot", duration: 400, pause: 130 },
      { number: 3, path: "M84.75,24.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -18.5,49.25 -48.5,59.25", start: {x:84.75, y:24.25}, end: {x:38.5, y:88.25}, direction: "diagonal-down-left", duration: 900, pause: 200 }
    ]
  },
  {
    character: "テ",
    type: "katakana",
    level: "N5",
    category: "T-row",
    romaji: "te",
    pronunciation: "teh (like 'tennis')",
    meaning: "Katakana 'te'",
    strokeCount: 3,
    hiraRelation: "Derived from 天 / relates to Hiragana て",
    mnemonic: {
      title: "T-shape / Tennis Racket",
      concept: "A capital 'T' shape with a tennis handle reaching out",
      story: "A Tennis racket (テ) with two string crossbars and a curved power grip.",
      svgMnemonicPath: "M32,28 H76 M22,48 H88 M56,48 C56,72 46,88 28,98"
    },
    exampleWords: [
      { jp: "テスト", r: "tesuto", en: "Test", ta: "தேர்வு" },
      { jp: "テニス", r: "tenisu", en: "Tennis", ta: "டென்னிஸ்" }
    ],
    exampleSentence: { jp: "テニスをれんしゅうします。", r: "Tenisu o renshuu shimasu.", en: "I practice tennis.", ta: "நான் டென்னிஸ் பயிற்சி செய்கிறேன்." },
    strokes: [
      { number: 1, path: "M32.75,28.25 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-2.75 34.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:32.75, y:28.25}, end: {x:82.75, y:25.0}, direction: "left-to-right", duration: 550, pause: 120 },
      { number: 2, path: "M22.75,48.75 c2.5,0.75 5.5,0.5 8,0.25 c16.5,-1.5 38.5,-3.5 54.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:22.75, y:48.75}, end: {x:92.75, y:44.5}, direction: "left-to-right", duration: 650, pause: 130 },
      { number: 3, path: "M56.75,48.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,22.5 -10.5,37.5 -30.5,44.75", start: {x:56.75, y:48.25}, end: {x:28.75, y:98.5}, direction: "curve-down-left", duration: 800, pause: 200 }
    ]
  },
  {
    character: "ト",
    type: "katakana",
    level: "N5",
    category: "T-row",
    romaji: "to",
    pronunciation: "toh (like 'toast')",
    meaning: "Katakana 'to'",
    strokeCount: 2,
    hiraRelation: "Derived from 止 / relates to Hiragana と",
    mnemonic: {
      title: "Toe",
      concept: "A big Toe with a little side toe sticking out",
      story: "Look down at your big Toe (ト) standing straight with a little side sprout.",
      svgMnemonicPath: "M38,18 V92 M40,46 L76,64"
    },
    exampleWords: [
      { jp: "トイレ", r: "toire", en: "Toilet", ta: "கழிப்பறை" },
      { jp: "トマト", r: "tomato", en: "Tomato", ta: "தக்காளி" }
    ],
    exampleSentence: { jp: "トマトをたべます。", r: "Tomato o tabemasu.", en: "I eat a tomato.", ta: "நான் தக்காளி சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M38.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,54.5 -0.5,64.5", start: {x:38.75, y:18.25}, end: {x:40.75, y:88.25}, direction: "vertical-straight-down", duration: 700, pause: 140 },
      { number: 2, path: "M40.75,46.25 c2.5,1.25 9.5,5.5 18.5,10.25 c4.5,2.5 10.5,5.5 16.5,7.75", start: {x:40.75, y:46.25}, end: {x:75.75, y:64.25}, direction: "diagonal-down-right", duration: 550, pause: 200 }
    ]
  },
  {
    character: "ナ",
    type: "katakana",
    level: "N5",
    category: "N-row",
    romaji: "na",
    pronunciation: "nah (like 'nacho')",
    meaning: "Katakana 'na'",
    strokeCount: 2,
    hiraRelation: "Identical to top-left of Hiragana な",
    mnemonic: {
      title: "Nail",
      concept: "A metal Nail being hammered into a plank of wood",
      story: "Drive the strong Nail (ナ) straight into the wooden board.",
      svgMnemonicPath: "M24,36 H86 M54,18 C54,54 44,78 28,92"
    },
    exampleWords: [
      { jp: "ナイフ", r: "naifu", en: "Knife", ta: "கத்தி" },
      { jp: "ナンバー", r: "nanbaa", en: "Number", ta: "எண்" }
    ],
    exampleSentence: { jp: "ナンバーワンをめざします。", r: "Nanbaa wan o mezashimasu.", en: "I aim to be number one.", ta: "நான் முதலிடத்தை இலக்காகக் கொண்டுள்ளேன்." },
    strokes: [
      { number: 1, path: "M24.75,36.75 c2.5,0.75 5.5,0.5 8,0.25 c16.5,-1.5 38.5,-3.75 54.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:24.75, y:36.75}, end: {x:94.75, y:32.5}, direction: "left-to-right", duration: 600, pause: 140 },
      { number: 2, path: "M54.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -10.5,52.5 -28.5,68.25", start: {x:54.75, y:18.25}, end: {x:28.5, y:91.25}, direction: "curve-down-left", duration: 850, pause: 200 }
    ]
  },
  {
    character: "ニ",
    type: "katakana",
    level: "N5",
    category: "N-row",
    romaji: "ni",
    pronunciation: "nee (like 'knee')",
    meaning: "Katakana 'ni'",
    strokeCount: 2,
    hiraRelation: "Identical to right part of Hiragana に / kanji 二 (two)",
    mnemonic: {
      title: "Two Lines",
      concept: "Two horizontal parallel lines (just like the kanji 二 for number Two / 'Ni')",
      story: "Count One, Two (ニ) lines sitting horizontally.",
      svgMnemonicPath: "M32,34 H78 M22,70 H88"
    },
    exampleWords: [
      { jp: "ニュース", r: "nyuusu", en: "News", ta: "செய்தி" },
      { jp: "ニューヨーク", r: "nyuuyooku", en: "New York", ta: "நியூயார்க்" }
    ],
    exampleSentence: { jp: "テレビでニュースをみます。", r: "Terebi de nyuusu o mimasu.", en: "I watch the news on TV.", ta: "நான் தொலைக்காட்சியில் செய்தி பார்க்கிறேன்." },
    strokes: [
      { number: 1, path: "M32.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-2.75 34.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:32.75, y:34.75}, end: {x:82.75, y:31.5}, direction: "left-to-right", duration: 550, pause: 130 },
      { number: 2, path: "M22.75,70.25 c3.5,0.75 7.5,0.5 11,0.25 c18.5,-1.5 38.5,-3.5 54.5,-4.5 c3.5,-0.25 7,-0.25 10.5,0.25", start: {x:22.75, y:70.25}, end: {x:98.75, y:66.25}, direction: "left-to-right", duration: 650, pause: 200 }
    ]
  },
  {
    character: "ヌ",
    type: "katakana",
    level: "N5",
    category: "N-row",
    romaji: "nu",
    pronunciation: "noo (like 'noodle')",
    meaning: "Katakana 'nu'",
    strokeCount: 2,
    hiraRelation: "Derived from the right of 奴 / relates to Hiragana ぬ",
    mnemonic: {
      title: "Nu-style Crossing / Chopsticks",
      concept: "Two Chopsticks crossing over a bowl of noodles in a 'Nu' shape",
      story: "A sharp angle chopstick crossed by an appetizing noodle strand (ヌ).",
      svgMnemonicPath: "M32,32 H76 L48,72 M42,48 L76,82"
    },
    exampleWords: [
      { jp: "ヌードル", r: "nuudoru", en: "Noodle", ta: "நூடுல்ஸ்" },
      { jp: "カヌー", r: "kanuu", en: "Canoe", ta: "படகில் பயணம்" }
    ],
    exampleSentence: { jp: "おいしいヌードルをたべます。", r: "Oishii nuudoru o tabemasu.", en: "I eat delicious noodles.", ta: "நான் சுவையான நூடுல்ஸ் சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M32.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-3 33.5,-4.25 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,14.5 -22.5,37.5 -44.5,50.75", start: {x:32.75, y:32.75}, end: {x:33.25, y:84.25}, direction: "horizontal-and-sweep-down-left", duration: 900, pause: 140 },
      { number: 2, path: "M42.75,48.25 c3.5,2.5 14.5,18.5 22.5,28.5 c2.5,3.25 5.5,5.5 8.5,7.25", start: {x:42.75, y:48.25}, end: {x:76.75, y:87.0}, direction: "diagonal-down-right", duration: 650, pause: 200 }
    ]
  },
  {
    character: "ネ",
    type: "katakana",
    level: "N5",
    category: "N-row",
    romaji: "ne",
    pronunciation: "neh (like 'net')",
    meaning: "Katakana 'ne'",
    strokeCount: 4,
    hiraRelation: "Derived from the altar radical 礻 of 禰 / relates to Hiragana ね",
    mnemonic: {
      title: "Net",
      concept: "A fisherman's Net hanging from a pole",
      story: "Top net peg, vertical support post, and side net mesh (ネ).",
      svgMnemonicPath: "M48,16 L58,26 M28,38 H68 L42,74 M46,42 V92 M56,58 L82,86"
    },
    exampleWords: [
      { jp: "ネクタイ", r: "nekutai", en: "Necktie", ta: "கழுத்துப்பட்டி" },
      { jp: "ネット", r: "netto", en: "Internet / Net", ta: "இணையம்" }
    ],
    exampleSentence: { jp: "あおいネクタイをしめます。", r: "Aoi nekutai o shimemasu.", en: "I wear a blue necktie.", ta: "நான் நீல நிற நெக்டை அணிகிறேன்." },
    strokes: [
      { number: 1, path: "M48.75,16.25 c2.5,1.25 6.5,4.75 7.75,7.25", start: {x:48.75, y:16.25}, end: {x:56.5, y:23.5}, direction: "diagonal-down-right", duration: 400, pause: 100 },
      { number: 2, path: "M28.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c8.5,-1 18.5,-2.5 24.5,-3.5 c3.5,-0.5 4.5,1.25 2.5,3.75 c-6.5,8.5 -14.5,19.5 -23.5,28.5", start: {x:28.75, y:38.75}, end: {x:40.25, y:67.75}, direction: "horizontal-and-sweep-down-left", duration: 750, pause: 120 },
      { number: 3, path: "M46.75,42.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,22.5 -0.5,42.5 -0.5,52.5", start: {x:46.75, y:42.25}, end: {x:48.75, y:100.25}, direction: "vertical-straight-down", duration: 700, pause: 120 },
      { number: 4, path: "M56.75,56.25 c3.5,2.5 12.5,14.5 18.5,22.5 c2.25,3 4.5,5.5 7.5,7.25", start: {x:56.75, y:56.25}, end: {x:82.75, y:86.0}, direction: "diagonal-down-right", duration: 550, pause: 200 }
    ]
  },
  {
    character: "ノ",
    type: "katakana",
    level: "N5",
    category: "N-row",
    romaji: "no",
    pronunciation: "noh (like 'note')",
    meaning: "Katakana 'no'",
    strokeCount: 1,
    hiraRelation: "Derived from the first slash of 乃 / relates to Hiragana の",
    mnemonic: {
      title: "Single Slash",
      concept: "A single elegant calligraphy Slash",
      story: "A single smooth slash (ノ) sliding down from top-right to bottom-left.",
      svgMnemonicPath: "M72,22 C68,48 54,74 28,94"
    },
    exampleWords: [
      { jp: "ノート", r: "nooto", en: "Notebook", ta: "குறிப்பேடு" },
      { jp: "ノック", r: "nokku", en: "Knock", ta: "தட்டு" }
    ],
    exampleSentence: { jp: "あたらしいノートをかいます。", r: "Atarashii nooto o kaimasu.", en: "I buy a new notebook.", ta: "நான் புதிய குறிப்பேடு வாங்குகிறேன்." },
    strokes: [
      { number: 1, path: "M72.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -16.5,52.5 -44.5,67.25", start: {x:72.75, y:22.25}, end: {x:30.5, y:94.25}, direction: "curve-down-left-slash", duration: 800, pause: 200 }
    ]
  },
  {
    character: "ハ",
    type: "katakana",
    level: "N5",
    category: "H-row",
    romaji: "ha",
    pronunciation: "hah (like 'hat')",
    meaning: "Katakana 'ha'",
    strokeCount: 2,
    hiraRelation: "Derived from 八 (eight) / relates to Hiragana は",
    mnemonic: {
      title: "Half-open Angle / Hat",
      concept: "A Half-open angle shaped like a pointy straw Hat",
      story: "Two balancing strokes spreading open like a conical Hat (ハ).",
      svgMnemonicPath: "M42,28 L24,78 M66,28 L84,78"
    },
    exampleWords: [
      { jp: "ハンバーガー", r: "hanbaagaa", en: "Hamburger", ta: "பர்கர்" },
      { jp: "パン", r: "pan", en: "Bread", ta: "ரொட்டி" }
    ],
    exampleSentence: { jp: "ハンバーガーをたべます。", r: "Hanbaagaa o tabemasu.", en: "I eat a hamburger.", ta: "நான் பர்கர் சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M42.75,28.25 c1.5,1 2.25,2.5 2.25,4.75 c0,18.5 -8.5,35.5 -20.5,45.25", start: {x:42.75, y:28.25}, end: {x:24.5, y:78.25}, direction: "diagonal-down-left", duration: 650, pause: 150 },
      { number: 2, path: "M66.75,28.25 c2.5,1.25 7.5,6.5 12.5,15.5 c4.5,8.5 7.5,18.5 9.5,26.5", start: {x:66.75, y:28.25}, end: {x:88.75, y:70.25}, direction: "diagonal-down-right", duration: 650, pause: 200 }
    ]
  },
  {
    character: "ヒ",
    type: "katakana",
    level: "N5",
    category: "H-row",
    romaji: "hi",
    pronunciation: "hee (like 'heat')",
    meaning: "Katakana 'hi'",
    strokeCount: 2,
    hiraRelation: "Derived from 比 / relates to Hiragana ひ",
    mnemonic: {
      title: "Heel",
      concept: "A high Heel shoe with a flat sole and vertical heel post",
      story: "A lady walking in a fashionable high Heel (ヒ) shoe.",
      svgMnemonicPath: "M28,34 H72 M38,20 V76 H84"
    },
    exampleWords: [
      { jp: "ヒーター", r: "hiitaa", en: "Heater", ta: "ஹீட்டர்" },
      { jp: "ヒーロー", r: "hiiroo", en: "Hero", ta: "ஹீரோ" }
    ],
    exampleSentence: { jp: "ふゆにヒーターをつけます。", r: "Fuyu ni hiitaa o tsukemasu.", en: "I turn on the heater in winter.", ta: "குளிர்காலத்தில் நான் ஹீட்டரை இயக்குகிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-2.75 34.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:28.75, y:34.75}, end: {x:78.75, y:31.5}, direction: "left-to-right", duration: 550, pause: 140 },
      { number: 2, path: "M38.75,20.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,46.5 0.5,51.5 c1.5,6.5 5.5,8.5 20.5,8.5 c12.5,0 18.5,-1.5 24.5,-3.5", start: {x:38.75, y:20.25}, end: {x:86.5, y:82.0}, direction: "vertical-down-and-right", duration: 900, pause: 200 }
    ]
  },
  {
    character: "フ",
    type: "katakana",
    level: "N5",
    category: "H-row",
    romaji: "fu",
    pronunciation: "foo (like 'food')",
    meaning: "Katakana 'fu'",
    strokeCount: 1,
    hiraRelation: "Derived from 不 / relates to Hiragana ふ",
    mnemonic: {
      title: "Funnel / Flag",
      concept: "A wide kitchen Funnel pouring liquids down",
      story: "Pour through the kitchen Funnel (フ): across the top and down the spout.",
      svgMnemonicPath: "M28,32 H76 L44,84"
    },
    exampleWords: [
      { jp: "フォーク", r: "fooku", en: "Fork", ta: "முட்கரண்டி" },
      { jp: "フランス", r: "furansu", en: "France", ta: "பிரான்ஸ்" }
    ],
    exampleSentence: { jp: "フォークでパスタをたべます。", r: "Fooku de pasuta o tabemasu.", en: "I eat pasta with a fork.", ta: "நான் முட்கரண்டியால் பாஸ்தா சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 28.5,-3.5 38.5,-4.75 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,16.5 -20.5,38.5 -40.5,49.25", start: {x:28.75, y:32.75}, end: {x:38.25, y:82.75}, direction: "horizontal-right-and-sweep-down-left", duration: 850, pause: 200 }
    ]
  },
  {
    character: "ヘ",
    type: "katakana",
    level: "N5",
    category: "H-row",
    romaji: "he",
    pronunciation: "heh (like 'help')",
    meaning: "Katakana 'he'",
    strokeCount: 1,
    hiraRelation: "Identical shape to Hiragana へ (derived from 部)",
    mnemonic: {
      title: "Mountain Peak",
      concept: "A clean Mountain Peak with a sharp climb and long descent",
      story: "Identical to Hiragana へ: climb up to the mountain peak and slide down.",
      svgMnemonicPath: "M20,64 L46,28 L90,68"
    },
    exampleWords: [
      { jp: "ヘリコプター", r: "herikoputaa", en: "Helicopter", ta: "ஹெலிகாப்டர்" },
      { jp: "ヘルメット", r: "herumetto", en: "Helmet", ta: "தலைக்கவசம்" }
    ],
    exampleSentence: { jp: "ヘルメットをかぶります。", r: "Herumetto o kaburimasu.", en: "I wear a helmet.", ta: "நான் ஹெல்மெட் அணிகிறேன்." },
    strokes: [
      { number: 1, path: "M20.75,64.25 c2.5,-0.75 6.5,-3.5 9.5,-6.25 c8.5,-7.5 14.5,-16.5 18.5,-23.5 c2.25,-3.75 4.5,-3.75 7.5,-0.5 c10.5,11.5 24.5,23.5 34.5,29.5 c3.5,2.25 7.5,3.75 11,4.75", start: {x:20.75, y:64.25}, end: {x:101.75, y:68.25}, direction: "climb-peak-and-slope-down", duration: 850, pause: 200 }
    ]
  },
  {
    character: "ホ",
    type: "katakana",
    level: "N5",
    category: "H-row",
    romaji: "ho",
    pronunciation: "hoh (like 'home')",
    meaning: "Katakana 'ho'",
    strokeCount: 4,
    hiraRelation: "Derived from 保 / relates to Hiragana ほ",
    mnemonic: {
      title: "Home",
      concept: "A cozy Home with a cross roof and two chimney posts",
      story: "Build a Home (ホ) with a roof cross and two balanced support posts.",
      svgMnemonicPath: "M24,34 H86 M54,16 V90 M36,54 L24,78 M72,54 L84,78"
    },
    exampleWords: [
      { jp: "ホテル", r: "hoteru", en: "Hotel", ta: "ஹோட்டல்" },
      { jp: "ホーム", r: "hoomu", en: "Train platform", ta: "ரயில் மேடை" }
    ],
    exampleSentence: { jp: "ホテルにとまります。", r: "Hoteru ni tomarimasu.", en: "I stay at a hotel.", ta: "நான் ஒரு ஹோட்டலில் தங்குகிறேன்." },
    strokes: [
      { number: 1, path: "M24.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 34.5,-3.75 48.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:24.75, y:34.75}, end: {x:88.75, y:30.5}, direction: "left-to-right", duration: 600, pause: 120 },
      { number: 2, path: "M54.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -0.25,60.5 -0.5,68.5", start: {x:54.75, y:16.25}, end: {x:56.5, y:90.0}, direction: "vertical-straight-down", duration: 750, pause: 120 },
      { number: 3, path: "M36.75,54.25 c1.5,1 2.25,2.5 2.25,4.75 c0,8.5 -5.5,18.5 -14.5,25.5", start: {x:36.75, y:54.25}, end: {x:24.5, y:84.5}, direction: "diagonal-down-left", duration: 500, pause: 100 },
      { number: 4, path: "M72.75,54.25 c2.5,1.25 6.5,6.5 9.5,12.5 c2.25,4.5 4.5,9.5 5.5,14.5", start: {x:72.75, y:54.25}, end: {x:87.75, y:81.25}, direction: "diagonal-down-right", duration: 500, pause: 200 }
    ]
  },
  {
    character: "マ",
    type: "katakana",
    level: "N5",
    category: "M-row",
    romaji: "ma",
    pronunciation: "mah (like 'mama')",
    meaning: "Katakana 'ma'",
    strokeCount: 2,
    hiraRelation: "Derived from 末 / relates to Hiragana ま",
    mnemonic: {
      title: "Marker / Mask",
      concept: "A bold Marker highlighting an angle on paper",
      story: "Draw with a thick Marker (マ): horizontal angle down-left, and a little dot mark inside.",
      svgMnemonicPath: "M28,32 H76 L48,68 M52,66 L78,86"
    },
    exampleWords: [
      { jp: "マフラー", r: "mafuraa", en: "Muffler / Scarf", ta: "கழுத்துத் துணி" },
      { jp: "マンション", r: "manshon", en: "Apartment", ta: "அடுக்குமாடி" }
    ],
    exampleSentence: { jp: "あかいマフラーをまきます。", r: "Akai mafuraa o makimasu.", en: "I wrap a red scarf.", ta: "நான் சிவப்பு மஃப்லரை சுற்றுகிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c12.5,-1.25 26.5,-3 34.5,-4.25 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,12.5 -18.5,24.5 -26.5,32.5", start: {x:28.75, y:32.75}, end: {x:48.25, y:66.0}, direction: "horizontal-and-sweep-down-left", duration: 850, pause: 140 },
      { number: 2, path: "M52.75,66.25 c3.5,2.5 12.5,12.5 18.5,18.5 c2.25,2.25 4.5,4.5 7.5,5.75", start: {x:52.75, y:66.25}, end: {x:78.75, y:90.5}, direction: "diagonal-down-right", duration: 550, pause: 200 }
    ]
  },
  {
    character: "ミ",
    type: "katakana",
    level: "N5",
    category: "M-row",
    romaji: "mi",
    pronunciation: "mee (like 'meat')",
    meaning: "Katakana 'mi'",
    strokeCount: 3,
    hiraRelation: "Derived from 三 (three) / relates to Hiragana み",
    mnemonic: {
      title: "Three Lines",
      concept: "Three parallel slanted Lines (just like number 3 = 三 / 'Mi')",
      story: "Three Lines (ミ) cascading down like water flowing over steps.",
      svgMnemonicPath: "M38,24 L68,34 M32,50 L64,60 M26,76 L68,88"
    },
    exampleWords: [
      { jp: "ミルク", r: "miruku", en: "Milk", ta: "பால்" },
      { jp: "ミシン", r: "mishin", en: "Sewing machine", ta: "தையல் இயந்திரம்" }
    ],
    exampleSentence: { jp: "あさ、ミルクをのみます。", r: "Asa, miruku o nomimasu.", en: "I drink milk in the morning.", ta: "காலையில் பால் குடிக்கிறேன்." },
    strokes: [
      { number: 1, path: "M38.75,24.25 c2.5,0.75 6.5,1.75 9.5,2.25 c6.5,1 13.5,3.25 19.5,5.5", start: {x:38.75, y:24.25}, end: {x:67.75, y:32.0}, direction: "slanted-stroke-right", duration: 450, pause: 100 },
      { number: 2, path: "M32.75,50.25 c2.5,0.75 6.5,1.75 9.5,2.25 c7.5,1.25 15.5,3.75 22.5,6", start: {x:32.75, y:50.25}, end: {x:64.75, y:58.5}, direction: "slanted-stroke-right", duration: 450, pause: 100 },
      { number: 3, path: "M26.75,76.25 c3.5,1 8.5,2.25 12.5,2.75 c10.5,1.5 21.5,4.75 29.5,7.5", start: {x:26.75, y:76.25}, end: {x:68.75, y:86.5}, direction: "slanted-stroke-right", duration: 550, pause: 200 }
    ]
  },
  {
    character: "ム",
    type: "katakana",
    level: "N5",
    category: "M-row",
    romaji: "mu",
    pronunciation: "moo (like 'moon')",
    meaning: "Katakana 'mu'",
    strokeCount: 2,
    hiraRelation: "Derived from 牟 / relates to Hiragana む",
    mnemonic: {
      title: "Moo / Moose Triangle",
      concept: "A triangular Moose head saying 'Moo'",
      story: "A triangular Moose horn (ム) with a sharp downward angle and bottom dot mark.",
      svgMnemonicPath: "M54,18 L28,68 H74 M58,68 L82,88"
    },
    exampleWords: [
      { jp: "ムービー", r: "muubii", en: "Movie", ta: "திரைப்படம்" },
      { jp: "ガム", r: "gamu", en: "Chewing gum", ta: "சூயிங்கம்" }
    ],
    exampleSentence: { jp: "おもしろいムービーをみます。", r: "Omoshiroi muubii o mimasu.", en: "I watch an interesting movie.", ta: "நான் ஒரு சுவாரஸ்யமான திரைப்படம் பார்க்கிறேன்." },
    strokes: [
      { number: 1, path: "M54.75,18.25 c0.5,1 0.75,2.25 0.25,3.75 c-4.5,14.5 -14.5,35.5 -26.5,45.25 c-1.5,1.25 -0.5,2.5 1.5,2.25 c12.5,-1.5 28.5,-3.5 44.5,-4.75", start: {x:54.75, y:18.25}, end: {x:74.5, y:64.75}, direction: "diagonal-down-left-and-dash-right", duration: 850, pause: 140 },
      { number: 2, path: "M58.75,68.25 c3.5,2.5 12.5,12.5 18.5,18.5 c2.25,2.25 4.5,4.5 7.5,5.75", start: {x:58.75, y:68.25}, end: {x:84.75, y:92.5}, direction: "diagonal-down-right", duration: 550, pause: 200 }
    ]
  },
  {
    character: "メ",
    type: "katakana",
    level: "N5",
    category: "M-row",
    romaji: "me",
    pronunciation: "meh (like 'melon')",
    meaning: "Katakana 'me'",
    strokeCount: 2,
    hiraRelation: "Derived from 女 / relates to Hiragana め",
    mnemonic: {
      title: "Crossing Me",
      concept: "Two Crossing swords marking an 'X' (X marks the spot!)",
      story: "Two swords Crossing (メ) in an exciting duel.",
      svgMnemonicPath: "M68,18 L28,78 M38,36 L78,84"
    },
    exampleWords: [
      { jp: "メニュー", r: "menyuu", en: "Menu", ta: "பட்டியல்" },
      { jp: "メール", r: "meeru", en: "Email", ta: "மின்னஞ்சல்" }
    ],
    exampleSentence: { jp: "メニューをみせてください。", r: "Menyuu o misete kudasai.", en: "Please show me the menu.", ta: "தயவுசெய்து எனக்கு மெனுவைக் காட்டுங்கள்." },
    strokes: [
      { number: 1, path: "M68.75,18.25 c0.5,1 0.75,2.25 0.25,3.75 c-6.5,18.5 -18.5,42.5 -38.5,55.5", start: {x:68.75, y:18.25}, end: {x:30.5, y:77.5}, direction: "diagonal-down-left", duration: 750, pause: 140 },
      { number: 2, path: "M38.75,36.25 c3.5,2.5 18.5,26.5 28.5,37.5 c3.25,3.5 6.5,6.5 10.5,8.75", start: {x:38.75, y:36.25}, end: {x:77.75, y:82.5}, direction: "diagonal-down-right", duration: 700, pause: 200 }
    ]
  },
  {
    character: "モ",
    type: "katakana",
    level: "N5",
    category: "M-row",
    romaji: "mo",
    pronunciation: "moh (like 'more')",
    meaning: "Katakana 'mo'",
    strokeCount: 3,
    hiraRelation: "Identical structure to Hiragana も (derived from 毛)",
    mnemonic: {
      title: "More Lines",
      concept: "Two horizontal lines with an angled hook (More and more lines!)",
      story: "Just like Hiragana も: two horizontal bars and an angled right leg (モ).",
      svgMnemonicPath: "M28,32 H78 M24,52 H84 M46,18 V76 H86"
    },
    exampleWords: [
      { jp: "モデル", r: "moderu", en: "Model", ta: "மாடல்" },
      { jp: "モーター", r: "mootaa", en: "Motor", ta: "மோட்டார்" }
    ],
    exampleSentence: { jp: "新しいモデルをかいます。", r: "Atarashii moderu o kaimasu.", en: "I buy a new model.", ta: "நான் ஒரு புதிய மாடலை வாங்குகிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-2.75 34.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:28.75, y:32.75}, end: {x:78.75, y:29.5}, direction: "left-to-right", duration: 550, pause: 120 },
      { number: 2, path: "M24.75,52.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 34.5,-3.5 48.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:24.75, y:52.75}, end: {x:88.75, y:48.5}, direction: "left-to-right", duration: 600, pause: 120 },
      { number: 3, path: "M46.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,46.5 0.5,51.5 c1.5,6.5 5.5,8.5 20.5,8.5 c12.5,0 18.5,-1.5 24.5,-3.5", start: {x:46.75, y:18.25}, end: {x:94.5, y:80.0}, direction: "vertical-down-and-right", duration: 900, pause: 200 }
    ]
  },
  {
    character: "ヤ",
    type: "katakana",
    level: "N5",
    category: "Y-row",
    romaji: "ya",
    pronunciation: "yah (like 'yard')",
    meaning: "Katakana 'ya'",
    strokeCount: 2,
    hiraRelation: "Derived from 也 / identical structure to Hiragana や",
    mnemonic: {
      title: "Yacht",
      concept: "A Yacht sail with an angular boom and mast",
      story: "A fast sailing Yacht (ヤ) catching the ocean breeze.",
      svgMnemonicPath: "M28,34 H74 L48,68 M44,20 L32,88"
    },
    exampleWords: [
      { jp: "ヤング", r: "yangu", en: "Young", ta: "இளைஞர்" },
      { jp: "ダイヤ", r: "daiya", en: "Diamond / Timetable", ta: "வைரம்" }
    ],
    exampleSentence: { jp: "きれいなダイヤのゆびわです。", r: "Kirei na daiya no yubiwa desu.", en: "It is a beautiful diamond ring.", ta: "இது ஒரு அழகான வைர மோதிரம்." },
    strokes: [
      { number: 1, path: "M28.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c12.5,-1.25 26.5,-3 34.5,-4.25 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,12.5 -18.5,24.5 -26.5,32.5", start: {x:28.75, y:34.75}, end: {x:48.25, y:68.0}, direction: "horizontal-and-sweep-down-left", duration: 850, pause: 140 },
      { number: 2, path: "M44.75,20.25 c1.5,1 2.25,2.5 2.25,4.75 c0,24.5 -4.5,48.25 -12.5,63.25", start: {x:44.75, y:20.25}, end: {x:34.5, y:88.25}, direction: "diagonal-down-left", duration: 750, pause: 200 }
    ]
  },
  {
    character: "ユ",
    type: "katakana",
    level: "N5",
    category: "Y-row",
    romaji: "yu",
    pronunciation: "yoo (like 'youth')",
    meaning: "Katakana 'yu'",
    strokeCount: 2,
    hiraRelation: "Derived from 由 / relates to Hiragana ゆ",
    mnemonic: {
      title: "U-shaped Container",
      concept: "A sturdy 'U'-shaped container or box holding treasures",
      story: "A handy U-shaped storage container (ユ) with a strong bottom shelf.",
      svgMnemonicPath: "M32,28 H78 V58 H32 M32,58 V84 H86"
    },
    exampleWords: [
      { jp: "ユニフォーム", r: "yunifoomu", en: "Uniform", ta: "சீருடை" },
      { jp: "ユーモア", r: "yuumoa", en: "Humor", ta: "நகைச்சுவை" }
    ],
    exampleSentence: { jp: "あたらしいユニフォームをきます。", r: "Atarashii yunifoomu o kimasu.", en: "I wear a new uniform.", ta: "நான் புதிய சீருடை அணிகிறேன்." },
    strokes: [
      { number: 1, path: "M32.75,28.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 28.5,-3 38.5,-4 c3.5,-0.25 5.5,1.5 5.5,4.5 c0,12.5 -0.25,22.5 -0.25,28.5 c0,2.5 -1.5,4.5 -3.5,4.25 c-12.5,-1 -28.5,-2.5 -48.25,-3.75", start: {x:32.75, y:28.75}, end: {x:32.75, y:58.5}, direction: "horizontal-down-and-left", duration: 950, pause: 140 },
      { number: 2, path: "M32.75,58.75 c1.5,1.25 2.5,3.25 2.5,5.5 c0,14.5 -0.5,22.5 0.5,25.5 c1.5,4.5 5.5,6.5 22.5,6.5 c14.5,0 22.5,-1.5 28.5,-3.5", start: {x:32.75, y:58.75}, end: {x:86.5, y:92.5}, direction: "vertical-down-and-right", duration: 850, pause: 200 }
    ]
  },
  {
    character: "ヨ",
    type: "katakana",
    level: "N5",
    category: "Y-row",
    romaji: "yo",
    pronunciation: "yoh (like 'yo-yo')",
    meaning: "Katakana 'yo'",
    strokeCount: 3,
    hiraRelation: "Derived from 与 / relates to Hiragana よ",
    mnemonic: {
      title: "Three Horizontal Shelves",
      concept: "A bookshelf with Three horizontal Shelves like a capital 'E' turned backward",
      story: "Organize books on three horizontal shelves (ヨ): top shelf, middle shelf, and bottom base.",
      svgMnemonicPath: "M28,28 H78 V84 H28 M28,56 H72"
    },
    exampleWords: [
      { jp: "ヨーロッパ", r: "yooroppa", en: "Europe", ta: "ஐரோப்பா" },
      { jp: "ヨーグルト", r: "yooguruto", en: "Yogurt", ta: "தயிர்" }
    ],
    exampleSentence: { jp: "あさ、ヨーグルトをたべます。", r: "Asa, yooguruto o tabemasu.", en: "I eat yogurt in the morning.", ta: "காலையில் தயிர் சாப்பிடுகிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,28.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 32.5,-3.5 42.5,-4.75 c3.5,-0.5 5.5,1.5 5.5,4.75 c0,22.5 -0.25,48.5 -0.25,55.5", start: {x:28.75, y:28.75}, end: {x:84.75, y:84.5}, direction: "horizontal-and-down-post", duration: 850, pause: 130 },
      { number: 2, path: "M28.75,56.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-2.75 34.5,-3.75", start: {x:28.75, y:56.75}, end: {x:71.25, y:53.25}, direction: "left-to-right-middle", duration: 500, pause: 120 },
      { number: 3, path: "M28.75,84.75 c3.5,0.75 7.5,0.5 11,0.25 c16.5,-1.5 32.5,-3.25 45.5,-4.25", start: {x:28.75, y:84.75}, end: {x:85.25, y:81.0}, direction: "left-to-right-bottom", duration: 600, pause: 200 }
    ]
  },
  {
    character: "ラ",
    type: "katakana",
    level: "N5",
    category: "R-row",
    romaji: "ra",
    pronunciation: "rah (light tap)",
    meaning: "Katakana 'ra'",
    strokeCount: 2,
    hiraRelation: "Derived from 良 / relates to Hiragana ら",
    mnemonic: {
      title: "Radio",
      concept: "A vintage Radio with an antenna bar on top",
      story: "Turn on the Radio (ラ) with the top power switch and angular speaker grill.",
      svgMnemonicPath: "M34,26 H74 M32,46 H76 C76,72 62,88 42,98"
    },
    exampleWords: [
      { jp: "ラジオ", r: "rajio", en: "Radio", ta: "வானொலி" },
      { jp: "ラーメン", r: "raamen", en: "Ramen", ta: "ராமென்" }
    ],
    exampleSentence: { jp: "ラジオをききます。", r: "Rajio o kikimasu.", en: "I listen to the radio.", ta: "நான் வானொலி கேட்கிறேன்." },
    strokes: [
      { number: 1, path: "M34.75,26.25 c2.5,0.75 5.5,0.5 8,0.25 c10.5,-1.25 21.5,-2.75 31.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:34.75, y:26.25}, end: {x:81.75, y:23.0}, direction: "left-to-right", duration: 500, pause: 130 },
      { number: 2, path: "M32.75,46.75 c2.5,0.75 5.5,0.5 8,0.25 c12.5,-1.25 25.5,-3 34.5,-4.25 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,18.5 -20.5,38.5 -40.5,49.25", start: {x:32.75, y:46.75}, end: {x:38.25, y:96.75}, direction: "horizontal-right-and-curve-down-left", duration: 950, pause: 200 }
    ]
  },
  {
    character: "リ",
    type: "katakana",
    level: "N5",
    category: "R-row",
    romaji: "ri",
    pronunciation: "ree (light tap)",
    meaning: "Katakana 'ri'",
    strokeCount: 2,
    hiraRelation: "Identical to Hiragana り (derived from 利)",
    mnemonic: {
      title: "Two Vertical Strokes",
      concept: "Two vertical river strokes standing side by side",
      story: "Just like Hiragana り: short left reed, tall swaying right reed (リ).",
      svgMnemonicPath: "M36,28 V64 M72,20 V72 C72,88 64,96 52,98"
    },
    exampleWords: [
      { jp: "リーダー", r: "riidaa", en: "Leader", ta: "தலைவர்" },
      { jp: "リモコン", r: "rimokon", en: "Remote control", ta: "ரிமோட்" }
    ],
    exampleSentence: { jp: "クラスのリーダーです。", r: "Kurasu no riidaa desu.", en: "I am the class leader.", ta: "நான் வகுப்பின் தலைவர்." },
    strokes: [
      { number: 1, path: "M36.75,28.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,12.5 -0.5,24.5 -0.5,32.5", start: {x:36.75, y:28.25}, end: {x:38.75, y:66.25}, direction: "vertical-straight-down", duration: 550, pause: 140 },
      { number: 2, path: "M72.75,20.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,48.5 -4.5,62.5 c-3.5,12.5 -11.5,18.5 -22.5,20.5", start: {x:72.75, y:20.25}, end: {x:48.25, y:108.75}, direction: "long-curve-down-left", duration: 900, pause: 200 }
    ]
  },
  {
    character: "ル",
    type: "katakana",
    level: "N5",
    category: "R-row",
    romaji: "ru",
    pronunciation: "roo (light tap)",
    meaning: "Katakana 'ru'",
    strokeCount: 2,
    hiraRelation: "Derived from 流 / relates to Hiragana る",
    mnemonic: {
      title: "Ru-shaped Hook",
      concept: "Two running legs with a sporty hook on the right foot",
      story: "Two athletes running a race (ル): left runner sweeps left, right runner hooks upward.",
      svgMnemonicPath: "M42,22 L24,78 M64,20 V74 C64,88 78,88 88,78"
    },
    exampleWords: [
      { jp: "ルール", r: "ruuru", en: "Rule", ta: "விதி" },
      { jp: "ホテル", r: "hoteru", en: "Hotel", ta: "ஹோட்டல்" }
    ],
    exampleSentence: { jp: "ルールをまもります。", r: "Ruuru o mamorimasu.", en: "I follow the rules.", ta: "நான் விதிகளைப் பின்பற்றுகிறேன்." },
    strokes: [
      { number: 1, path: "M42.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,18.5 -8.5,38.5 -22.5,51.25", start: {x:42.75, y:22.25}, end: {x:22.5, y:78.25}, direction: "diagonal-down-left", duration: 650, pause: 140 },
      { number: 2, path: "M64.75,20.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,46.5 0.5,51.5 c1.5,7.5 8.5,9.5 16.5,7.5 c4.5,-1 8.5,-3.5 11.5,-7.5", start: {x:64.75, y:20.25}, end: {x:95.75, y:76.75}, direction: "vertical-and-hook-up", duration: 900, pause: 200 }
    ]
  },
  {
    character: "レ",
    type: "katakana",
    level: "N5",
    category: "R-row",
    romaji: "re",
    pronunciation: "reh (light tap)",
    meaning: "Katakana 're'",
    strokeCount: 1,
    hiraRelation: "Derived from 礼 / relates to Hiragana れ",
    mnemonic: {
      title: "Re-ceiver",
      concept: "A telephone Re-ceiver resting on its cradle with an upbeat checkmark",
      story: "Pick up the telephone Re-ceiver (レ): drop down and hook up to answer.",
      svgMnemonicPath: "M38,20 V76 L86,84"
    },
    exampleWords: [
      { jp: "レストラン", r: "resutoran", en: "Restaurant", ta: "உணவகம்" },
      { jp: "レモン", r: "remon", en: "Lemon", ta: "எலுமிச்சை" }
    ],
    exampleSentence: { jp: "レストランでばんごはんをたべます。", r: "Resutoran de bangohan o tabemasu.", en: "I eat dinner at a restaurant.", ta: "நான் உணவகத்தில் இரவு உணவு உண்கிறேன்." },
    strokes: [
      { number: 1, path: "M38.75,20.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,46.5 0.5,51.5 c1.5,5.5 6.5,7.5 24.5,7.5 c12.5,0 18.5,-1.5 24.5,-3.5", start: {x:38.75, y:20.25}, end: {x:90.75, y:81.0}, direction: "vertical-down-and-right", duration: 850, pause: 200 }
    ]
  },
  {
    character: "ロ",
    type: "katakana",
    level: "N5",
    category: "R-row",
    romaji: "ro",
    pronunciation: "roh (light tap)",
    meaning: "Katakana 'ro'",
    strokeCount: 3,
    hiraRelation: "Derived from 呂 / identical to kanji 口 (mouth/opening)",
    mnemonic: {
      title: "Room",
      concept: "A square Room with four strong walls",
      story: "A square Room (ロ) with a left wall, top-right roof wall, and floor base.",
      svgMnemonicPath: "M28,26 V82 M28,28 H80 V80 M28,80 H80"
    },
    exampleWords: [
      { jp: "ロボット", r: "robotto", en: "Robot", ta: "ரோபோ" },
      { jp: "ロッカー", r: "rokkaa", en: "Locker", ta: "லாக்கர்" }
    ],
    exampleSentence: { jp: "ロッカーにかばんをいれます。", r: "Rokkaa ni kaban o iremasu.", en: "I put my bag in the locker.", ta: "நான் பையை லாக்கரில் வைக்கிறேன்." },
    strokes: [
      { number: 1, path: "M28.75,26.25 c0.75,1 1.25,2.5 1.25,4.25 c0,18.5 -0.25,38.5 -0.5,53.5", start: {x:28.75, y:26.25}, end: {x:29.5, y:84.0}, direction: "vertical-left-post", duration: 550, pause: 120 },
      { number: 2, path: "M30.75,28.75 c4.5,-0.75 39.5,-4.25 45.5,-5 c3.25,-0.5 4.5,1.5 4.5,4 c0,18.5 -0.25,36.5 -0.5,53.5", start: {x:30.75, y:28.75}, end: {x:80.25, y:81.25}, direction: "horizontal-and-down", duration: 750, pause: 120 },
      { number: 3, path: "M30.75,81.25 c6.5,-0.75 36.5,-3.25 48.5,-3.75", start: {x:30.75, y:81.25}, end: {x:79.25, y:77.5}, direction: "left-to-right-bottom", duration: 500, pause: 200 }
    ]
  },
  {
    character: "ワ",
    type: "katakana",
    level: "N5",
    category: "W-row",
    romaji: "wa",
    pronunciation: "wah (like 'water')",
    meaning: "Katakana 'wa'",
    strokeCount: 2,
    hiraRelation: "Derived from 和 / relates to Hiragana わ",
    mnemonic: {
      title: "Wave / Wine glass",
      concept: "An ocean Wave rolling over a post",
      story: "A rolling ocean Wave (ワ): left pillar and sweeping roof angle.",
      svgMnemonicPath: "M32,38 V58 M32,42 H76 C76,68 64,86 42,98"
    },
    exampleWords: [
      { jp: "ワイン", r: "wain", en: "Wine", ta: "ஒயின்" },
      { jp: "ワイシャツ", r: "waishatsu", en: "Dress shirt", ta: "சட்டை" }
    ],
    exampleSentence: { jp: "あかいワインをのみます。", r: "Akai wain o nomimasu.", en: "I drink red wine.", ta: "நான் சிவப்பு ஒயின் குடிக்கிறேன்." },
    strokes: [
      { number: 1, path: "M32.75,38.25 c1.5,1 2.25,2.5 2.25,4.75 c0,6.5 -0.5,13.5 -1.5,18.5", start: {x:32.75, y:38.25}, end: {x:33.5, y:61.5}, direction: "vertical-left-drop", duration: 450, pause: 130 },
      { number: 2, path: "M33.75,42.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 32.5,-3.75 41.5,-4.75 c3.75,-0.5 5.5,1.25 3.5,4.75 c-8.5,18.5 -20.5,38.5 -40.5,49.25", start: {x:33.75, y:42.75}, end: {x:38.25, y:92.25}, direction: "horizontal-right-and-sweep-down-left", duration: 950, pause: 200 }
    ]
  },
  {
    character: "ヲ",
    type: "katakana",
    level: "N5",
    category: "W-row",
    romaji: "wo",
    pronunciation: "oh (grammatical object marker)",
    meaning: "Katakana 'wo / o'",
    strokeCount: 3,
    hiraRelation: "Derived from 乎 / relates to Hiragana を",
    mnemonic: {
      title: "Extended Wo",
      concept: "An extended 'Wo' with two horizontal bars and a diagonal slide",
      story: "Two horizontal ledges with an energetic diagonal ramp (ヲ).",
      svgMnemonicPath: "M28,28 H74 M28,48 H68 L42,88"
    },
    exampleWords: [
      { jp: "ヲ", r: "wo / o", en: "Object particle (Katakana)", ta: "செயப்படுபொருள் குறியீடு" }
    ],
    exampleSentence: { jp: "パンヲタベル (rare style)", r: "Pan o taberu", en: "Eat bread", ta: "ரொட்டி சாப்பிடு" },
    strokes: [
      { number: 1, path: "M28.75,28.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-2.75 34.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25", start: {x:28.75, y:28.75}, end: {x:78.75, y:25.5}, direction: "left-to-right", duration: 550, pause: 120 },
      { number: 2, path: "M28.75,48.75 c2.5,0.75 5.5,0.5 8,0.25 c12.5,-1.25 24.5,-2.75 32.5,-3.75", start: {x:28.75, y:48.75}, end: {x:69.25, y:45.25}, direction: "left-to-right", duration: 500, pause: 120 },
      { number: 3, path: "M66.75,28.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -14.5,42.5 -34.5,53.25", start: {x:66.75, y:28.25}, end: {x:34.5, y:86.25}, direction: "diagonal-down-left", duration: 800, pause: 200 }
    ]
  },
  {
    character: "ン",
    type: "katakana",
    level: "N5",
    category: "N-solo",
    romaji: "n",
    pronunciation: "n (nasal sound)",
    meaning: "Katakana 'n'",
    strokeCount: 2,
    hiraRelation: "Derived from 尓 / relates to Hiragana ん",
    mnemonic: {
      title: "N Slash",
      concept: "A dot and an upward N Slash sweeping into the sky (compare with ソ: ン sweeps UP from bottom-left)",
      story: "A rocket dot, followed by a powerful slash shooting UPWARD to the stars (ン - n).",
      svgMnemonicPath: "M32,32 L44,42 M26,82 C46,68 68,48 86,28"
    },
    exampleWords: [
      { jp: "パン", r: "pan", en: "Bread", ta: "ரொட்டி" },
      { jp: "ペン", r: "pen", en: "Pen", ta: "பேனா" }
    ],
    exampleSentence: { jp: "ペンでノートに書きます。", r: "Pen de nooto ni kakimasu.", en: "I write in the notebook with a pen.", ta: "நான் பேனாவால் குறிப்பேட்டில் எழுதுகிறேன்." },
    strokes: [
      { number: 1, path: "M32.75,32.25 c2.5,1.25 6.5,4.75 7.75,7.25", start: {x:32.75, y:32.25}, end: {x:40.5, y:39.5}, direction: "diagonal-down-right", duration: 400, pause: 130 },
      { number: 2, path: "M26.75,82.25 c2.5,0.75 4.5,-0.5 7,-2.75 c16.5,-14.5 35.5,-35.5 52.5,-51.5 c2.5,-2.25 5.5,-2.5 8,-0.75", start: {x:26.75, y:82.25}, end: {x:94.25, y:27.25}, direction: "sweep-up-right", duration: 900, pause: 200 }
    ]
  }
];
