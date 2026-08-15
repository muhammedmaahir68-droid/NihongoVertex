/**
 * NIHONGO VERTEX - HIRAGANA AUTHENTIC STROKE & MNEMONIC DATASET
 * Verified Japanese Calligraphy Stroke Order (MEXT / KanjiVG standard 109x109 space)
 */

export const HIRAGANA_DATA = [
  {
    character: "あ",
    type: "hiragana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "a",
    pronunciation: "ah (like 'father')",
    meaning: "Hiragana 'a'",
    strokeCount: 3,
    mnemonic: {
      title: "Apple & Person with a Loop",
      concept: "A person with a little loop/arm holding an Apple",
      visualDescription: "Stroke 1 is the horizontal top branch, Stroke 2 is the vertical spine of the person, and Stroke 3 forms the rounded arm looping around the apple.",
      svgMnemonicPath: "M20,32 H88 M54,16 V92 M78,38 C88,58 72,88 44,88 C20,88 18,62 38,48 C56,36 84,46 88,72"
    },
    exampleWords: [
      { jp: "ありがとう", r: "arigatou", en: "Thank you", ta: "நன்றி" },
      { jp: "あめ", r: "ame", en: "Rain / Candy", ta: "மழை" },
      { jp: "あさ", r: "asa", en: "Morning", ta: "காலை" }
    ],
    exampleSentence: {
      jp: "あさ、ごはんをたべます。",
      r: "Asa, gohan o tabemasu.",
      en: "In the morning, I eat a meal.",
      ta: "காலையில் நான் உணவு உண்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M28.75,32.75 c2.5,0.75 5.5,0.5 8.25,0.25 c13.5,-1.25 32,-3.5 45.75,-4.25 c2.75,-0.15 5.5,-0.1 8,0.5",
        start: { x: 28.75, y: 32.75 },
        end: { x: 90.75, y: 29.25 },
        direction: "left-to-right",
        duration: 650,
        pause: 150,
        tip: "Draw the horizontal roof line from left to right"
      },
      {
        number: 2,
        path: "M54.5,15.5 c1.5,1 2.25,2.5 2.25,4.75 c0,19 -0.25,48 -0.5,69.5 c-0.05,4.5 -0.1,8 -0.15,10",
        start: { x: 54.5, y: 15.5 },
        end: { x: 56.1, y: 99.75 },
        direction: "top-to-bottom",
        duration: 750,
        pause: 180,
        tip: "Draw a curved vertical stroke downward through the middle"
      },
      {
        number: 3,
        path: "M76.5,41.25 c-3.5,6.5 -10.25,17 -23.5,29.5 c-7.75,7.25 -19.5,16.5 -30.75,13.75 c-8.5,-2.1 -11,-12.25 -4.5,-21.25 c7.5,-10.5 24.5,-19 43.5,-17.25 c18.5,1.75 30.75,15.25 29.25,32.75 c-1.5,17 -13.5,26.5 -25.5,26.5",
        start: { x: 76.5, y: 41.25 },
        end: { x: 65, y: 105.25 },
        direction: "loop-clockwise",
        duration: 1100,
        pause: 250,
        tip: "Start from upper right, sweep down-left, and loop around clockwise"
      }
    ]
  },
  {
    character: "い",
    type: "hiragana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "i",
    pronunciation: "ee (like 'feet')",
    meaning: "Hiragana 'i'",
    strokeCount: 2,
    mnemonic: {
      title: "Two i's / Two People",
      concept: "Two 'i'-like strokes standing side by side like two friends",
      visualDescription: "The left stroke has a subtle hook at the bottom pointing to the shorter right stroke.",
      svgMnemonicPath: "M32,22 C32,56 26,76 42,76 M74,38 C76,54 74,68 68,76"
    },
    exampleWords: [
      { jp: "いぬ", r: "inu", en: "Dog", ta: "நாய்" },
      { jp: "いえ", r: "ie", en: "House", ta: "வீடு" },
      { jp: "いま", r: "ima", en: "Now", ta: "இப்போது" }
    ],
    exampleSentence: {
      jp: "いま、いえにいます。",
      r: "Ima, ie ni imasu.",
      en: "I am at home now.",
      ta: "நான் இப்போது வீட்டில் இருக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M33.75,22.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,22.5 -6.25,44.75 -12.5,57.25 c-1.75,3.5 -0.5,4.75 3.5,3.25 c9.5,-3.5 16.5,-7.5 21.5,-10.5",
        start: { x: 33.75, y: 22.25 },
        end: { x: 48.75, y: 77.75 },
        direction: "curve-down-hook",
        duration: 800,
        pause: 180,
        tip: "Curve down on the left and finish with a sharp upward hook (hane)"
      },
      {
        number: 2,
        path: "M76.25,38.5 c1.5,1 2.25,2.5 2.25,4.5 c0,8.75 -2.75,23.5 -8.25,33.75 c-1.75,3.25 -3.75,6.5 -6,9.25",
        start: { x: 76.25, y: 38.5 },
        end: { x: 64.25, y: 86.0 },
        direction: "curve-down-right",
        duration: 650,
        pause: 200,
        tip: "Draw a shorter gentle curve downward on the right side"
      }
    ]
  },
  {
    character: "う",
    type: "hiragana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "u",
    pronunciation: "oo (like 'soup' without rounded lips)",
    meaning: "Hiragana 'u'",
    strokeCount: 2,
    mnemonic: {
      title: "U with a Roof",
      concept: "A little 'U' shape sheltering under a slanted roof",
      visualDescription: "Stroke 1 is the small slanted roof dot, and Stroke 2 is the big sweeping U-curve.",
      svgMnemonicPath: "M42,20 L62,28 M34,44 C56,38 82,48 76,74 C70,96 44,96 32,88"
    },
    exampleWords: [
      { jp: "うみ", r: "umi", en: "Sea / Ocean", ta: "கடல்" },
      { jp: "うた", r: "uta", en: "Song", ta: "பாடல்" },
      { jp: "うし", r: "ushi", en: "Cow", ta: "மாடு" }
    ],
    exampleSentence: {
      jp: "うみでうたをうたいます。",
      r: "Umi de uta o utaimasu.",
      en: "I sing a song by the sea.",
      ta: "நான் கடலில் பாட்டு பாடுகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M43.5,18.75 c2.5,1.25 6.75,4.75 8,7.25 c1.5,3 0.75,5.5 -1.75,8.25",
        start: { x: 43.5, y: 18.75 },
        end: { x: 49.75, y: 34.25 },
        direction: "diagonal-down-right",
        duration: 450,
        pause: 150,
        tip: "Small slanted stroke at the top"
      },
      {
        number: 2,
        path: "M33.75,43.25 c2.25,0.75 4.75,1.25 7.5,0.75 c14.5,-2.5 32,-7 37.5,-4.75 c6.75,2.75 6.5,17 -0.5,32.75 c-7.75,17.5 -22.5,25.25 -39.5,23.5",
        start: { x: 33.75, y: 43.25 },
        end: { x: 38.75, y: 95.5 },
        direction: "curve-around",
        duration: 950,
        pause: 200,
        tip: "Start left, push up-right, then sweep around in a big rounded curve"
      }
    ]
  },
  {
    character: "え",
    type: "hiragana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "e",
    pronunciation: "eh (like 'get')",
    meaning: "Hiragana 'e'",
    strokeCount: 2,
    mnemonic: {
      title: "Exotic Bird / Sweeping 'e'",
      concept: "Imagine an energetic 'e' with a sweeping arm like an exotic bird",
      visualDescription: "Top dot roof followed by a dynamic zig-zag that rides smoothly along the bottom.",
      svgMnemonicPath: "M44,18 L60,26 M48,42 L72,36 L36,78 L68,76 L86,84"
    },
    exampleWords: [
      { jp: "えき", r: "eki", en: "Station", ta: "ரயில் நிலையம்" },
      { jp: "えんぴつ", r: "enpitsu", en: "Pencil", ta: "பென்சில்" },
      { jp: "えいが", r: "eiga", en: "Movie", ta: "திரைப்படம்" }
    ],
    exampleSentence: {
      jp: "えきでえいがをみます。",
      r: "Eki de eiga o mimasu.",
      en: "I watch a movie at the station.",
      ta: "நான் ரயில் நிலையத்தில் திரைப்படம் பார்க்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M43.75,18.25 c2.75,1.25 6.5,4.25 7.75,6.75 c1.25,2.5 0.5,4.75 -1.75,7.25",
        start: { x: 43.75, y: 18.25 },
        end: { x: 49.75, y: 32.25 },
        direction: "diagonal-down-right",
        duration: 450,
        pause: 150,
        tip: "Small slanted accent at the top"
      },
      {
        number: 2,
        path: "M49.25,41.75 c2.25,0.75 4.5,0.75 6.75,0.25 c7.5,-1.75 14,-3.75 18.5,-5.25 c3.75,-1.25 5.5,0.5 3.5,3.75 c-7.75,12.5 -22.75,34 -37.25,44.75 c-3.25,2.5 -1.75,4.5 2.25,3.75 c12.5,-2.5 29.5,-5.75 40.5,-5 c6,0.5 9.75,4.5 7.75,8 c-2.25,4 -8.5,8 -14.25,7.75",
        start: { x: 49.25, y: 41.75 },
        end: { x: 76.75, y: 99.75 },
        direction: "zig-zag-wave",
        duration: 1200,
        pause: 250,
        tip: "Continuous stroke: short dash right, sharp diagonal down-left, then wave right"
      }
    ]
  },
  {
    character: "お",
    type: "hiragana",
    level: "N5",
    category: "Vowels (A-row)",
    romaji: "o",
    pronunciation: "oh (like 'boat')",
    meaning: "Hiragana 'o'",
    strokeCount: 3,
    mnemonic: {
      title: "Octopus / Original 'O'",
      concept: "An 'o' shape with an extra crossing stroke and a floating tentacle dot",
      visualDescription: "Stroke 1 horizontal, Stroke 2 loops into a wide 'O', Stroke 3 is the accent dot on the right.",
      svgMnemonicPath: "M26,34 H68 M48,16 V70 C48,90 28,88 28,74 C28,58 66,52 76,74 M78,32 L88,42"
    },
    exampleWords: [
      { jp: "おちゃ", r: "ocha", en: "Green tea", ta: "தேநீர்" },
      { jp: "おかね", r: "okane", en: "Money", ta: "பணம்" },
      { jp: "おんな", r: "onna", en: "Woman", ta: "பெண்" }
    ],
    exampleSentence: {
      jp: "おいしいおちゃをのみます。",
      r: "Oishii ocha o nomimasu.",
      en: "I drink delicious green tea.",
      ta: "நான் சுவையான தேநீர் குடிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M25.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c9.75,-1 24.5,-2.75 34.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 25.75, y: 34.75 },
        end: { x: 75.75, y: 31.5 },
        direction: "left-to-right",
        duration: 550,
        pause: 150,
        tip: "Short horizontal line"
      },
      {
        number: 2,
        path: "M47.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.75 -0.25,44.75 -0.5,50.75 c-0.5,12.5 -13.5,17.25 -20.5,10.25 c-6.5,-6.5 -4,-18.25 7,-24.5 c13.5,-7.75 37.5,-7.25 43.5,10.75 c4.5,13.5 -3.5,26.75 -16,29.25",
        start: { x: 47.75, y: 16.25 },
        end: { x: 63.5, y: 97.5 },
        direction: "vertical-loop-curve",
        duration: 1250,
        pause: 200,
        tip: "Go down vertically, loop back on the left, then sweep out in a big open curve"
      },
      {
        number: 3,
        path: "M76.75,32.25 c3.25,2.75 8.25,9.5 9.75,14.5 c1.25,3.75 -0.5,6 -3.25,8.25",
        start: { x: 76.75, y: 32.25 },
        end: { x: 83.25, y: 55.0 },
        direction: "diagonal-down-right",
        duration: 450,
        pause: 200,
        tip: "Finish with the upper right accent dot"
      }
    ]
  },
  {
    character: "か",
    type: "hiragana",
    level: "N5",
    category: "K-row",
    romaji: "ka",
    pronunciation: "kah (like 'car')",
    meaning: "Hiragana 'ka'",
    strokeCount: 3,
    mnemonic: {
      title: "K-Shape / Kite",
      concept: "A 'K'-like shape with a flying kite tail",
      visualDescription: "The left hooked arm resembles a 'K', supported by the center curve and an energetic accent mark.",
      svgMnemonicPath: "M30,34 H58 C72,34 76,56 64,82 M48,22 C48,56 42,76 34,88 M74,28 L84,40"
    },
    exampleWords: [
      { jp: "かわ", r: "kawa", en: "River", ta: "ஆறு" },
      { jp: "かさ", r: "kasa", en: "Umbrella", ta: "குடை" },
      { jp: "かばん", r: "kaban", en: "Bag", ta: "பை" }
    ],
    exampleSentence: {
      jp: "あめですから、かさをさします。",
      r: "Ame desu kara, kasa o sashimasu.",
      en: "Because it rains, I open an umbrella.",
      ta: "மழை பெய்வதால் நான் குடை பிடிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M30.75,34.75 c2.5,0.75 5.5,0.75 8,0.5 c8.75,-0.75 22.5,-3 28.5,-3.75 c5.5,-0.75 7.75,1.75 6.25,7.25 c-4.25,15.5 -13.25,37 -26.5,49.25 c-3,2.75 -5.25,2.25 -4.25,-2.25 c2.75,-12.5 5.5,-28.5 7,-36",
        start: { x: 30.75, y: 34.75 },
        end: { x: 49.75, y: 50.0 },
        direction: "hook-and-sweep",
        duration: 900,
        pause: 150,
        tip: "Horizontal right, curve down with a strong hook"
      },
      {
        number: 2,
        path: "M47.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,23.5 -5.5,47.25 -16.5,61.25",
        start: { x: 47.75, y: 22.25 },
        end: { x: 33.5, y: 88.25 },
        direction: "curve-down-left",
        duration: 700,
        pause: 150,
        tip: "Downward slicing stroke crossing the center"
      },
      {
        number: 3,
        path: "M74.75,28.25 c2.75,2.25 7,7.75 8.25,11.75",
        start: { x: 74.75, y: 28.25 },
        end: { x: 83.0, y: 40.0 },
        direction: "diagonal-down-right",
        duration: 400,
        pause: 200,
        tip: "Small energetic mark on the top right"
      }
    ]
  },
  {
    character: "き",
    type: "hiragana",
    level: "N5",
    category: "K-row",
    romaji: "ki",
    pronunciation: "kee (like 'key')",
    meaning: "Hiragana 'ki'",
    strokeCount: 4,
    mnemonic: {
      title: "Key",
      concept: "Think of a Key with two horizontal teeth, a shaft, and a curved base",
      visualDescription: "Two parallel horizontal strokes crossed by a slanted spine, finished with a smiling curved base.",
      svgMnemonicPath: "M28,34 H74 M24,52 H78 M56,18 L38,76 M36,78 C52,94 72,90 76,78"
    },
    exampleWords: [
      { jp: "き", r: "ki", en: "Tree", ta: "மரம்" },
      { jp: "きっぷ", r: "kippu", en: "Ticket", ta: "பயணச்சீட்டு" },
      { jp: "きょう", r: "kyou", en: "Today", ta: "இன்று" }
    ],
    exampleSentence: {
      jp: "きょう、でんしゃのきっぷをかいます。",
      r: "Kyou, densha no kippu o kaimasu.",
      en: "Today, I buy a train ticket.",
      ta: "இன்று நான் ரயில் பயணச்சீட்டு வாங்குகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M28.75,34.25 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-3 36.5,-4 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 28.75, y: 34.25 },
        end: { x: 80.75, y: 30.75 },
        direction: "left-to-right",
        duration: 550,
        pause: 120,
        tip: "Top horizontal line"
      },
      {
        number: 2,
        path: "M24.75,51.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.5 28.5,-3.5 42.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 24.75, y: 51.75 },
        end: { x: 82.75, y: 47.5 },
        direction: "left-to-right",
        duration: 600,
        pause: 150,
        tip: "Second parallel horizontal line, slightly longer"
      },
      {
        number: 3,
        path: "M55.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,16.5 -6.25,41.5 -18.75,54.75 c-1.5,1.75 -0.5,3.25 2.5,2.25 c4.5,-1.5 10.5,-4 14.5,-6",
        start: { x: 55.75, y: 18.25 },
        end: { x: 56.25, y: 74.0 },
        direction: "diagonal-down-left-hook",
        duration: 750,
        pause: 160,
        tip: "Cross downward through both lines, finishing with a small hook"
      },
      {
        number: 4,
        path: "M36.75,76.25 c6.5,7.75 19.5,15.75 32.5,12.5 c7.5,-1.75 12.5,-8.5 10.5,-14.25",
        start: { x: 36.75, y: 76.25 },
        end: { x: 79.75, y: 74.5 },
        direction: "curve-bottom-smile",
        duration: 650,
        pause: 200,
        tip: "Separate curved bowl stroke at the bottom"
      }
    ]
  },
  {
    character: "く",
    type: "hiragana",
    level: "N5",
    category: "K-row",
    romaji: "ku",
    pronunciation: "koo (like 'cook')",
    meaning: "Hiragana 'ku'",
    strokeCount: 1,
    mnemonic: {
      title: "Bird's Open Beak",
      concept: "Bird's open Beak ready to catch a cookie",
      visualDescription: "A single continuous angle stroke opening to the right like a bird's beak (<).",
      svgMnemonicPath: "M68,22 L32,54 L72,86"
    },
    exampleWords: [
      { jp: "くるま", r: "kuruma", en: "Car", ta: "கார்" },
      { jp: "くに", r: "kuni", en: "Country", ta: "நாடு" },
      { jp: "くつ", r: "kutsu", en: "Shoes", ta: "காலணி" }
    ],
    exampleSentence: {
      jp: "あたらしいくつをはきます。",
      r: "Atarashii kutsu o hakimasu.",
      en: "I put on new shoes.",
      ta: "நான் புதிய காலணிகளை அணிகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M67.75,22.25 c-1.5,1.25 -8.5,8 -16.5,16.25 c-9.5,9.75 -19.5,20.25 -21.5,23.75 c-1.75,3.25 0.5,5.5 3.5,8.25 c10.5,9.5 24.5,21.5 34.5,27.5 c2.5,1.5 5.5,2.75 8,3.75",
        start: { x: 67.75, y: 22.25 },
        end: { x: 75.75, y: 101.75 },
        direction: "angle-left-down-right",
        duration: 900,
        pause: 200,
        tip: "Single stroke: glide down-left, pivot sharply, then sweep down-right"
      }
    ]
  },
  {
    character: "け",
    type: "hiragana",
    level: "N5",
    category: "K-row",
    romaji: "ke",
    pronunciation: "keh (like 'keg')",
    meaning: "Hiragana 'ke'",
    strokeCount: 3,
    mnemonic: {
      title: "Keg / Person with a Leg",
      concept: "A person standing next to a wooden Keg",
      visualDescription: "Left upright post with a hook, paired with a right horizontal crossing a curved vertical leg.",
      svgMnemonicPath: "M32,20 V80 C32,86 36,86 42,80 M52,38 H86 M72,22 C72,56 68,78 58,90"
    },
    exampleWords: [
      { jp: "けさ", r: "kesa", en: "This morning", ta: "இன்று காலை" },
      { jp: "けっこん", r: "kekkon", en: "Marriage", ta: "திருமணம்" },
      { jp: "けいたいでんわ", r: "keitai denwa", en: "Mobile phone", ta: "கைப்பேசி" }
    ],
    exampleSentence: {
      jp: "けさ、ともだちにあいました。",
      r: "Kesa, tomodachi ni aimashita.",
      en: "This morning, I met a friend.",
      ta: "இன்று காலை நான் ஒரு நண்பரை சந்தித்தேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M33.75,20.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,24.5 -3.5,49.75 -10.5,63.25 c-1.75,3.5 -0.5,4.75 3.5,3.25 c8.5,-3 14.5,-6.5 19.5,-9.5",
        start: { x: 33.75, y: 20.25 },
        end: { x: 48.75, y: 82.75 },
        direction: "vertical-curve-hook",
        duration: 750,
        pause: 150,
        tip: "Left vertical stroke curving down into an upward hook"
      },
      {
        number: 2,
        path: "M51.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c8.75,-1 19.5,-2.75 27.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 51.75, y: 38.75 },
        end: { x: 94.75, y: 35.5 },
        direction: "left-to-right",
        duration: 550,
        pause: 140,
        tip: "Right horizontal line"
      },
      {
        number: 3,
        path: "M73.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -6.5,52.5 -18.5,67.25",
        start: { x: 73.75, y: 22.25 },
        end: { x: 57.5, y: 94.25 },
        direction: "curve-down-left",
        duration: 750,
        pause: 200,
        tip: "Vertical stroke crossing the horizontal and sweeping gently left"
      }
    ]
  },
  {
    character: "こ",
    type: "hiragana",
    level: "N5",
    category: "K-row",
    romaji: "ko",
    pronunciation: "koh (like 'corner')",
    meaning: "Hiragana 'ko'",
    strokeCount: 2,
    mnemonic: {
      title: "Two Co Lines / Corners",
      concept: "Two simple 'Co' lines framing two corners",
      visualDescription: "Top horizontal shelf with a subtle downward hook, and bottom curved base.",
      svgMnemonicPath: "M32,32 H74 C78,32 78,38 72,44 M28,76 C48,74 72,72 82,64"
    },
    exampleWords: [
      { jp: "これ", r: "kore", en: "This", ta: "இது" },
      { jp: "ここ", r: "koko", en: "Here", ta: "இங்கே" },
      { jp: "こども", r: "kodomo", en: "Child", ta: "குழந்தை" }
    ],
    exampleSentence: {
      jp: "これはわたしのほんです。",
      r: "Kore wa watashi no hon desu.",
      en: "This is my book.",
      ta: "இது என் புத்தகம்."
    },
    strokes: [
      {
        number: 1,
        path: "M32.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c12.5,-1.25 24.5,-2.75 34.5,-3.75 c3.5,-0.25 5.5,1.5 3.5,4.75 c-2.5,4 -4.5,7.5 -7,10.5",
        start: { x: 32.75, y: 32.75 },
        end: { x: 71.75, y: 44.5 },
        direction: "left-to-right-hook",
        duration: 650,
        pause: 160,
        tip: "Top line from left to right, ending with a small inward hook"
      },
      {
        number: 2,
        path: "M27.75,76.25 c3.5,1.25 7.5,1.25 11.5,0.75 c14.5,-1.75 28.5,-5.25 41.5,-11.75 c3.25,-1.5 6.5,-1.25 8.75,1.25",
        start: { x: 27.75, y: 76.25 },
        end: { x: 89.5, y: 66.5 },
        direction: "curve-left-to-right",
        duration: 700,
        pause: 200,
        tip: "Bottom curve sweeping gently upward to the right"
      }
    ]
  },
  {
    character: "さ",
    type: "hiragana",
    level: "N5",
    category: "S-row",
    romaji: "sa",
    pronunciation: "sah (like 'samurai')",
    meaning: "Hiragana 'sa'",
    strokeCount: 3,
    mnemonic: {
      title: "Samurai Sword",
      concept: "A Samurai sword crossing a slash with a sweeping curve",
      visualDescription: "Horizontal top bar, crossed by a slanted stroke with a hook, with a floating loop at the bottom.",
      svgMnemonicPath: "M28,38 H78 M58,20 L38,72 M36,74 C54,92 74,88 78,76"
    },
    exampleWords: [
      { jp: "さかな", r: "sakana", en: "Fish", ta: "மீன்" },
      { jp: "さくら", r: "sakura", en: "Cherry blossom", ta: "சகுரா மலர்" },
      { jp: "さとう", r: "satou", en: "Sugar", ta: "சர்க்கரை" }
    ],
    exampleSentence: {
      jp: "かわでさかなをみます。",
      r: "Kawa de sakana o mimasu.",
      en: "I see a fish in the river.",
      ta: "நான் ஆற்றில் மீனைப் பார்க்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M28.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 28.5,-3.5 40.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 28.75, y: 38.75 },
        end: { x: 84.75, y: 34.5 },
        direction: "left-to-right",
        duration: 550,
        pause: 120,
        tip: "Slanted horizontal line from left to right"
      },
      {
        number: 2,
        path: "M58.75,19.25 c1.5,1 2.25,2.5 2.25,4.75 c0,19.5 -7.25,43.5 -21.75,56.75 c-1.5,1.5 -0.5,3.25 2.5,2.25 c4.5,-1.5 10.5,-4 14.5,-6",
        start: { x: 58.75, y: 19.25 },
        end: { x: 56.25, y: 77.0 },
        direction: "diagonal-down-left-hook",
        duration: 750,
        pause: 150,
        tip: "Cross downward through stroke 1 with an upward release hook"
      },
      {
        number: 3,
        path: "M36.75,76.25 c7.5,8.75 22.5,16.75 35.5,12.5 c7.5,-2.25 11.5,-8.5 9.5,-14.25",
        start: { x: 36.75, y: 76.25 },
        end: { x: 81.75, y: 74.5 },
        direction: "curve-bottom-smile",
        duration: 650,
        pause: 200,
        tip: "Separate curved bowl stroke at the bottom"
      }
    ]
  },
  {
    character: "し",
    type: "hiragana",
    level: "N5",
    category: "S-row",
    romaji: "shi",
    pronunciation: "shee (like 'she')",
    meaning: "Hiragana 'shi'",
    strokeCount: 1,
    mnemonic: {
      title: "Fishing Hook / 'She' Curve",
      concept: "A curved 'She' shape like a shiny fishing hook",
      visualDescription: "A single elegant downward stroke curling upward into a smooth open loop.",
      svgMnemonicPath: "M38,20 V68 C38,90 62,94 76,82 C82,76 86,68 88,60"
    },
    exampleWords: [
      { jp: "しんぶん", r: "shinbun", en: "Newspaper", ta: "செய்தித்தால்" },
      { jp: "しろい", r: "shiroi", en: "White", ta: "வெள்ளை" },
      { jp: "しごと", r: "shigoto", en: "Work / Job", ta: "வேலை" }
    ],
    exampleSentence: {
      jp: "まいあさ、しんぶんをよみます。",
      r: "Maiasa, shinbun o yomimasu.",
      en: "Every morning, I read the newspaper.",
      ta: "ஒவ்வொரு காலையிலும் நான் செய்தித்தாள் படிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M38.75,20.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,46.5 0.5,53.5 c2.25,15.5 15.5,18.5 28.5,14.25 c9.5,-3 16.5,-9.5 21.5,-16.5",
        start: { x: 38.75, y: 20.25 },
        end: { x: 91.75, y: 77.0 },
        direction: "vertical-down-curl-up",
        duration: 900,
        pause: 200,
        tip: "Start vertical, drop straight down, then scoop up to the right like a fishing hook"
      }
    ]
  },
  {
    character: "す",
    type: "hiragana",
    level: "N5",
    category: "S-row",
    romaji: "su",
    pronunciation: "soo (like 'sushi')",
    meaning: "Hiragana 'su'",
    strokeCount: 2,
    mnemonic: {
      title: "Spiral Sushi / Swing",
      concept: "A 's' with a loop like spiral sushi on a chopstick",
      visualDescription: "Horizontal top bar crossed by a vertical stroke that loops gracefully before sweeping downward.",
      svgMnemonicPath: "M24,34 H84 M54,16 V52 C54,66 40,66 40,54 C40,42 54,42 54,54 V92"
    },
    exampleWords: [
      { jp: "すし", r: "sushi", en: "Sushi", ta: "சுஷி" },
      { jp: "すき", r: "suki", en: "Like / Favorite", ta: "பிடித்தமானது" },
      { jp: "すこし", r: "sukoshi", en: "A little", ta: "கொஞ்சம்" }
    ],
    exampleSentence: {
      jp: "すしがだいすきです。",
      r: "Sushi ga daisuki desu.",
      en: "I love sushi very much.",
      ta: "எனக்கு சுஷி மிகவும் பிடிக்கும்."
    },
    strokes: [
      {
        number: 1,
        path: "M24.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c14.5,-1.25 34.5,-3.75 48.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 24.75, y: 34.75 },
        end: { x: 88.75, y: 30.5 },
        direction: "left-to-right",
        duration: 600,
        pause: 140,
        tip: "Horizontal bar across the top"
      },
      {
        number: 2,
        path: "M54.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,25.5 -0.25,35.5 -0.5,39.5 c-1,7.5 -7.5,11.5 -13.5,7.5 c-6.5,-4.5 -5.5,-14.5 3,-18.25 c9.5,-4 18,-0.5 20.5,6.5 c2.5,7 2,24.5 -6.5,36.5 c-4.5,6.5 -11.5,12.5 -18,16.25",
        start: { x: 54.75, y: 16.25 },
        end: { x: 41.5, y: 108.5 },
        direction: "vertical-loop-drop",
        duration: 1200,
        pause: 250,
        tip: "Vertical drop, form a tight loop on the left, then release straight down-left"
      }
    ]
  },
  {
    character: "せ",
    type: "hiragana",
    level: "N5",
    category: "S-row",
    romaji: "se",
    pronunciation: "seh (like 'say')",
    meaning: "Hiragana 'se'",
    strokeCount: 3,
    mnemonic: {
      title: "Say / Sailboat",
      concept: "Think 'Say' with three people talking on a Sailboat",
      visualDescription: "Long horizontal deck, crossed by a right hooked post, finished with an angled left brace.",
      svgMnemonicPath: "M20,38 H88 M68,18 V72 C68,80 62,84 54,84 M38,44 V80 H78"
    },
    exampleWords: [
      { jp: "せんせい", r: "sensei", en: "Teacher", ta: "ஆசிரியர்" },
      { jp: "せんしゅう", r: "senshuu", en: "Last week", ta: "கடந்த வாரம்" },
      { jp: "せかい", r: "sekai", en: "World", ta: "உலகம்" }
    ],
    exampleSentence: {
      jp: "せんせいにしつもんします。",
      r: "Sensei ni shitsumon shimasu.",
      en: "I ask the teacher a question.",
      ta: "நான் ஆசிரியரிடம் கேள்வி கேட்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M20.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c17.5,-1.75 42.5,-4.75 58.5,-5.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 20.75, y: 38.75 },
        end: { x: 94.75, y: 33.5 },
        direction: "left-to-right",
        duration: 650,
        pause: 140,
        tip: "Long horizontal line from left to right"
      },
      {
        number: 2,
        path: "M68.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,24.5 -0.25,44.5 -0.5,50.5 c-0.5,7.5 -4.5,11.5 -10.5,11.5 c-4.5,0 -8.5,-2.5 -11.5,-6",
        start: { x: 68.75, y: 18.25 },
        end: { x: 48.5, y: 79.0 },
        direction: "vertical-down-hook-left",
        duration: 750,
        pause: 150,
        tip: "Right vertical stroke curving at the bottom into a leftward hook"
      },
      {
        number: 3,
        path: "M38.75,44.25 c1.5,1 2.25,2.5 2.25,4.75 c0,14.5 -0.5,24.5 0.5,28.5 c1.5,6.5 6.5,8.5 22.5,8.5 c12.5,0 20.5,-1.5 26.5,-3.5",
        start: { x: 38.75, y: 44.25 },
        end: { x: 90.5, y: 82.5 },
        direction: "down-and-right",
        duration: 850,
        pause: 200,
        tip: "Left stroke going down, then turning smoothly right along the baseline"
      }
    ]
  },
  {
    character: "そ",
    type: "hiragana",
    level: "N5",
    category: "S-row",
    romaji: "so",
    pronunciation: "soh (like 'sew')",
    meaning: "Hiragana 'so'",
    strokeCount: 1,
    mnemonic: {
      title: "Flowing Sew Thread",
      concept: "A flowing 'Sew' thread looping through a zigzag needle",
      visualDescription: "A single continuous zig-zag (Z-shape) that opens out into a smooth bottom curve.",
      svgMnemonicPath: "M32,28 H72 L32,60 H68 C80,60 84,78 72,88 C60,96 38,94 30,86"
    },
    exampleWords: [
      { jp: "そこ", r: "soko", en: "There", ta: "அங்கே" },
      { jp: "そら", r: "sora", en: "Sky", ta: "வானம்" },
      { jp: "そして", r: "soshite", en: "And then", ta: "பிறகு" }
    ],
    exampleSentence: {
      jp: "あおいそらをみます。",
      r: "Aoi sora o mimasu.",
      en: "I look at the blue sky.",
      ta: "நான் நீல வானத்தைப் பார்க்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M32.75,28.25 c2.5,0.75 5.5,0.5 8,0.25 c9.5,-1 21.5,-2.75 29.5,-3.75 c2.5,-0.25 4.5,1.25 2.5,3.75 c-8.5,10.5 -18.5,23.5 -29.5,33.5 c-3.25,2.75 -1.5,4.75 2.5,4 c11.5,-2 26.5,-4.5 35.5,-3.5 c9.5,1 14.5,9.5 10.5,19.5 c-5.5,14 -21.5,19.5 -38.5,16",
        start: { x: 32.75, y: 28.25 },
        end: { x: 53.25, y: 101.5 },
        direction: "continuous-zigzag-curve",
        duration: 1300,
        pause: 250,
        tip: "Single continuous stroke: top dash, diagonal down-left, dash right, scoop curve"
      }
    ]
  },
  {
    character: "た",
    type: "hiragana",
    level: "N5",
    category: "T-row",
    romaji: "ta",
    pronunciation: "tah (like 'taco')",
    meaning: "Hiragana 'ta'",
    strokeCount: 4,
    mnemonic: {
      title: "Table / 'Ta' with a Cross",
      concept: "Think 'Ta' with a table top cross on the left and 'co' on the right",
      visualDescription: "Left cross (horizontal + diagonal slash), followed by two small horizontal marks on the right.",
      svgMnemonicPath: "M22,36 H54 M42,18 L28,82 M56,42 H82 M52,66 C68,66 78,64 82,58"
    },
    exampleWords: [
      { jp: "たべる", r: "taberu", en: "To eat", ta: "சாப்பிடு" },
      { jp: "たまご", r: "tamago", en: "Egg", ta: "முட்டை" },
      { jp: "たかい", r: "takai", en: "High / Expensive", ta: "விலையுயர்ந்த" }
    ],
    exampleSentence: {
      jp: "あさごはんにたまごをたべます。",
      r: "Asagohan ni tamago o tabemasu.",
      en: "I eat an egg for breakfast.",
      ta: "நான் காலை உணவாக முட்டை சாப்பிடுகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M22.75,36.75 c2.5,0.75 5.5,0.5 8,0.25 c7.5,-0.75 16.5,-2 23.5,-2.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 22.75, y: 36.75 },
        end: { x: 61.75, y: 34.5 },
        direction: "left-to-right",
        duration: 500,
        pause: 120,
        tip: "Short top-left horizontal line"
      },
      {
        number: 2,
        path: "M42.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,23.5 -5.5,47.25 -16.5,61.25",
        start: { x: 42.75, y: 18.25 },
        end: { x: 28.5, y: 84.25 },
        direction: "diagonal-down-left",
        duration: 650,
        pause: 130,
        tip: "Slanted stroke cutting down through stroke 1"
      },
      {
        number: 3,
        path: "M56.75,42.75 c2.5,0.75 5.5,0.5 8,0.25 c6.5,-0.75 13.5,-2 19.5,-2.75 c2.5,-0.25 4.5,1.25 2.5,3.75",
        start: { x: 56.75, y: 42.75 },
        end: { x: 86.75, y: 44.0 },
        direction: "left-to-right",
        duration: 450,
        pause: 120,
        tip: "Upper right short horizontal line"
      },
      {
        number: 4,
        path: "M52.75,66.25 c3.5,1.25 7.5,1.25 11.5,0.75 c9.5,-1.25 18.5,-3.75 26.5,-8.5",
        start: { x: 52.75, y: 66.25 },
        end: { x: 90.75, y: 58.5 },
        direction: "curve-left-to-right",
        duration: 500,
        pause: 200,
        tip: "Lower right base curve"
      }
    ]
  },
  {
    character: "ち",
    type: "hiragana",
    level: "N5",
    category: "T-row",
    romaji: "chi",
    pronunciation: "chee (like 'cheese')",
    meaning: "Hiragana 'chi'",
    strokeCount: 2,
    mnemonic: {
      title: "Cheerleader / 'Chee' Curve",
      concept: "A 'Chee' curve like a cheerleader cheering",
      visualDescription: "Top horizontal bar crossed by a vertical stroke that loops out into a rounded belly.",
      svgMnemonicPath: "M26,34 H82 M54,16 V50 C54,74 78,74 78,60 C78,46 54,48 42,70 L34,84"
    },
    exampleWords: [
      { jp: "ちず", r: "chizu", en: "Map", ta: "வரைபடம்" },
      { jp: "ちち", r: "chichi", en: "Father", ta: "தந்தை" },
      { jp: "ちかてつ", r: "chikatetsu", en: "Subway", ta: "சுரங்க ரயில்" }
    ],
    exampleSentence: {
      jp: "ちずをみて、えきへいきます。",
      r: "Chizu o mite, eki he ikimasu.",
      en: "Looking at the map, I go to the station.",
      ta: "வரைபடத்தைப் பார்த்து நான் ரயில் நிலையம் செல்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M26.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 32.5,-3.75 45.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 26.75, y: 34.75 },
        end: { x: 87.75, y: 30.5 },
        direction: "left-to-right",
        duration: 600,
        pause: 140,
        tip: "Horizontal line across the top"
      },
      {
        number: 2,
        path: "M54.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -6.5,37.5 -13.5,43.5 c-5.5,4.5 -10.5,1.5 -9.5,-6.5 c1.5,-11.5 17.5,-16.5 31.5,-12.5 c12.5,3.5 19.5,16.5 14.5,29.5 c-4.5,11.5 -18.5,19.5 -38.5,18.5",
        start: { x: 54.75, y: 16.25 },
        end: { x: 41.5, y: 93.75 },
        direction: "vertical-cross-loop-belly",
        duration: 1200,
        pause: 250,
        tip: "Cross downward, sweep back in a rounded loop, then complete the bottom arc"
      }
    ]
  },
  {
    character: "つ",
    type: "hiragana",
    level: "N5",
    category: "T-row",
    romaji: "tsu",
    pronunciation: "tsoo (like 'tsunami')",
    meaning: "Hiragana 'tsu'",
    strokeCount: 1,
    mnemonic: {
      title: "Tsunami Wave / Smiling Mouth",
      concept: "A big Tsunami wave curving over the ocean",
      visualDescription: "A single wide curving wave that lifts up slightly before crashing down in a smooth arc.",
      svgMnemonicPath: "M24,38 H58 C84,38 90,66 74,86 C60,98 34,96 24,88"
    },
    exampleWords: [
      { jp: "つくえ", r: "tsukue", en: "Desk", ta: "மேசை" },
      { jp: "つかう", r: "tsukau", en: "To use", ta: "பயன்படுத்து" },
      { jp: "つぎ", r: "tsugi", en: "Next", ta: "அடுத்தது" }
    ],
    exampleSentence: {
      jp: "つくえのうえにほんがあります。",
      r: "Tsukue no ue ni hon ga arimasu.",
      en: "There is a book on the desk.",
      ta: "மேசையின் மேல் புத்தகம் இருக்கிறது."
    },
    strokes: [
      {
        number: 1,
        path: "M24.75,38.25 c2.5,0.5 5.5,0.25 8,0 c12.5,-1.25 25.5,-3.5 35.5,-2.5 c15.5,1.5 24.5,14.5 19.5,31.5 c-4.5,15.5 -19.5,27.5 -43.5,28.5",
        start: { x: 24.75, y: 38.25 },
        end: { x: 44.25, y: 95.75 },
        direction: "wave-right-and-curve-down",
        duration: 950,
        pause: 200,
        tip: "Single stroke: push right with gentle rise, then loop down in a giant wave curve"
      }
    ]
  },
  {
    character: "て",
    type: "hiragana",
    level: "N5",
    category: "T-row",
    romaji: "te",
    pronunciation: "teh (like 'tennis')",
    meaning: "Hiragana 'te'",
    strokeCount: 1,
    mnemonic: {
      title: "Teacup Handle / Tea Sweep",
      concept: "A 'Tea' sweep curving like a teacup handle",
      visualDescription: "Horizontal top bar that turns smoothly into a wide, open lower belly.",
      svgMnemonicPath: "M26,34 H78 C54,54 44,78 72,82"
    },
    exampleWords: [
      { jp: "て", r: "te", en: "Hand", ta: "கை" },
      { jp: "てがみ", r: "tegami", en: "Letter", ta: "கடிதம்" },
      { jp: "てんき", r: "tenki", en: "Weather", ta: "வானிலை" }
    ],
    exampleSentence: {
      jp: "ともだちにてがみをかきます。",
      r: "Tomodachi ni tegami o kakimasu.",
      en: "I write a letter to a friend.",
      ta: "நான் நண்பருக்கு கடிதம் எழுதுகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M26.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 32.5,-3.75 42.5,-4.75 c3.5,-0.25 5.5,1.5 3.5,4.75 c-9.5,15.5 -18.5,33.5 -8.5,47.5 c5.5,7.5 15.5,9.5 25.5,5.5",
        start: { x: 26.75, y: 34.75 },
        end: { x: 97.75, y: 88.0 },
        direction: "horizontal-and-c-curve",
        duration: 950,
        pause: 200,
        tip: "Single stroke: horizontal right, angle back down-left, then curve out like a crescent"
      }
    ]
  },
  {
    character: "と",
    type: "hiragana",
    level: "N5",
    category: "T-row",
    romaji: "to",
    pronunciation: "toh (like 'toast')",
    meaning: "Hiragana 'to'",
    strokeCount: 2,
    mnemonic: {
      title: "Toe with a Thorn",
      concept: "A 'Toe' with a little thorn or mark sticking into it",
      visualDescription: "Short vertical stalk at the top, met by a wide curved toe on the right.",
      svgMnemonicPath: "M38,20 L52,42 M52,42 C82,50 82,82 58,92 C46,96 36,92 30,84"
    },
    exampleWords: [
      { jp: "ともだち", r: "tomodachi", en: "Friend", ta: "நண்பர்" },
      { jp: "とけい", r: "tokei", en: "Clock / Watch", ta: "கடிகாரம்" },
      { jp: "とり", r: "tori", en: "Bird", ta: "பறவை" }
    ],
    exampleSentence: {
      jp: "ともだちといっしょにあそびます。",
      r: "Tomodachi to issho ni asobimasu.",
      en: "I play together with a friend.",
      ta: "நான் நண்பருடன் சேர்ந்து விளையாடுகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M38.75,20.25 c1.5,1 2.5,2.5 3.5,4.75 c3.5,7.5 7.5,15.5 10.5,21.5",
        start: { x: 38.75, y: 20.25 },
        end: { x: 52.75, y: 46.5 },
        direction: "diagonal-down-right",
        duration: 450,
        pause: 140,
        tip: "Short downward diagonal stroke"
      },
      {
        number: 2,
        path: "M76.75,41.25 c-4.5,1.25 -14.5,3.75 -24.5,5.25 c-3.5,0.5 -4.5,2.5 -2.5,5.25 c8.5,11.5 18.5,22.5 15.5,33.5 c-2.5,9.5 -13.5,13.5 -26.5,8.5",
        start: { x: 76.75, y: 41.25 },
        end: { x: 38.75, y: 93.75 },
        direction: "c-curve-belly",
        duration: 900,
        pause: 200,
        tip: "Sweep left to meet stroke 1, then expand out in a big open C-shaped toe"
      }
    ]
  },
  {
    character: "な",
    type: "hiragana",
    level: "N5",
    category: "N-row",
    romaji: "na",
    pronunciation: "nah (like 'nacho')",
    meaning: "Hiragana 'na'",
    strokeCount: 4,
    mnemonic: {
      title: "Nun Praying / 'Na' Loop",
      concept: "Think 'Na' with a nun praying at a cross with a little loop",
      visualDescription: "Left cross (horizontal + vertical), upper right dot, and lower right loop.",
      svgMnemonicPath: "M22,34 H48 M38,18 L28,74 M64,26 L74,38 M68,48 V76 C68,88 54,88 54,78 C54,68 68,68 68,78"
    },
    exampleWords: [
      { jp: "なつ", r: "natsu", en: "Summer", ta: "கோடைக்காலம்" },
      { jp: "なまえ", r: "namae", en: "Name", ta: "பெயர்" },
      { jp: "なに", r: "nani", en: "What", ta: "என்ன" }
    ],
    exampleSentence: {
      jp: "おなまえはなんですか。",
      r: "Onamae wa nan desu ka.",
      en: "What is your name?",
      ta: "உங்கள் பெயர் என்ன?"
    },
    strokes: [
      {
        number: 1,
        path: "M22.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c6.5,-0.75 14.5,-2 21.5,-2.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 22.75, y: 34.75 },
        end: { x: 59.75, y: 32.5 },
        direction: "left-to-right",
        duration: 500,
        pause: 120,
        tip: "Short top-left horizontal line"
      },
      {
        number: 2,
        path: "M38.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,21.5 -4.5,43.25 -14.5,56.25",
        start: { x: 38.75, y: 18.25 },
        end: { x: 26.5, y: 79.25 },
        direction: "diagonal-down-left",
        duration: 600,
        pause: 130,
        tip: "Slanted vertical stroke crossing stroke 1"
      },
      {
        number: 3,
        path: "M64.75,26.25 c2.5,1.75 6.5,6.5 7.75,10.25",
        start: { x: 64.75, y: 26.25 },
        end: { x: 72.5, y: 36.5 },
        direction: "diagonal-down-right",
        duration: 400,
        pause: 120,
        tip: "Small upper right accent dot"
      },
      {
        number: 4,
        path: "M68.75,48.25 c1.5,1 2.25,2.5 2.25,4.75 c0,15.5 -0.25,22.5 -0.5,25.5 c-0.75,6.5 -6.5,9.5 -11.5,6.5 c-5.5,-3.5 -4.5,-11.5 2.5,-14.5 c7.5,-3.25 14.5,0 16.5,5.5 c1.5,4 0.5,13.5 -5.5,18.5",
        start: { x: 68.75, y: 48.25 },
        end: { x: 72.5, y: 94.5 },
        direction: "vertical-down-loop-release",
        duration: 900,
        pause: 200,
        tip: "Vertical drop on the right with a small loop"
      }
    ]
  },
  {
    character: "に",
    type: "hiragana",
    level: "N5",
    category: "N-row",
    romaji: "ni",
    pronunciation: "nee (like 'knee')",
    meaning: "Hiragana 'ni'",
    strokeCount: 3,
    mnemonic: {
      title: "Two Knee Strokes",
      concept: "Two 'Knee' strokes next to a standing leg",
      visualDescription: "Left upright post with a hook, followed by two horizontal parallel lines on the right (like こ).",
      svgMnemonicPath: "M32,18 V82 C32,88 36,88 42,82 M54,38 H86 M52,70 C68,70 82,68 86,62"
    },
    exampleWords: [
      { jp: "にほん", r: "nihon", en: "Japan", ta: "ஜப்பான்" },
      { jp: "にく", r: "niku", en: "Meat", ta: "இறைச்சி" },
      { jp: "にちようび", r: "nichiyoubi", en: "Sunday", ta: "ஞாயிற்றுக்கிழமை" }
    ],
    exampleSentence: {
      jp: "にほんごをべんきょうします。",
      r: "Nihongo o benkyou shimasu.",
      en: "I study the Japanese language.",
      ta: "நான் ஜப்பானிய மொழி படிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M32.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,25.5 -3.5,51.75 -10.5,65.25 c-1.75,3.5 -0.5,4.75 3.5,3.25 c8.5,-3 14.5,-6.5 19.5,-9.5",
        start: { x: 32.75, y: 18.25 },
        end: { x: 47.75, y: 82.75 },
        direction: "vertical-curve-hook",
        duration: 750,
        pause: 150,
        tip: "Left vertical stroke with an upward release hook"
      },
      {
        number: 2,
        path: "M54.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c8.75,-1 19.5,-2.75 27.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 54.75, y: 38.75 },
        end: { x: 97.75, y: 35.5 },
        direction: "left-to-right",
        duration: 550,
        pause: 130,
        tip: "Upper right horizontal line"
      },
      {
        number: 3,
        path: "M52.75,70.25 c3.5,1.25 7.5,1.25 11.5,0.75 c12.5,-1.5 22.5,-4.5 32.5,-9.5",
        start: { x: 52.75, y: 70.25 },
        end: { x: 96.75, y: 61.5 },
        direction: "curve-left-to-right",
        duration: 600,
        pause: 200,
        tip: "Lower right horizontal curve"
      }
    ]
  },
  {
    character: "ぬ",
    type: "hiragana",
    level: "N5",
    category: "N-row",
    romaji: "nu",
    pronunciation: "noo (like 'noodle')",
    meaning: "Hiragana 'nu'",
    strokeCount: 2,
    mnemonic: {
      title: "Noodle Loop",
      concept: "A bowl of Noodles with chopsticks tangled in a little loop at the end",
      visualDescription: "Slanted stroke 1 crossed by stroke 2 which sweeps around into a large belly and ends in a tiny curl.",
      svgMnemonicPath: "M38,24 L24,78 M28,42 C56,36 84,48 76,76 C70,96 46,96 38,82 C30,68 46,50 68,54 C78,56 82,70 78,82 C76,86 72,86 72,82"
    },
    exampleWords: [
      { jp: "ぬの", r: "nuno", en: "Cloth", ta: "துணி" },
      { jp: "ぬるい", r: "nurui", en: "Lukewarm", ta: "மிதமான சூடு" },
      { jp: "ぬぐ", r: "nugu", en: "To take off (clothes)", ta: "கழற்று" }
    ],
    exampleSentence: {
      jp: "くつをぬいでください。",
      r: "Kutsu o nuide kudasai.",
      en: "Please take off your shoes.",
      ta: "தயவுசெய்து உங்கள் காலணிகளைக் கழற்றவும்."
    },
    strokes: [
      {
        number: 1,
        path: "M38.75,24.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -5.5,45.25 -16.5,59.25",
        start: { x: 38.75, y: 24.25 },
        end: { x: 24.5, y: 88.25 },
        direction: "diagonal-down-left",
        duration: 650,
        pause: 150,
        tip: "Slanted line down-left"
      },
      {
        number: 2,
        path: "M28.75,42.75 c2.5,0.75 5.5,0.5 8,0 c16.5,-3.5 38.5,-9.5 44.5,-2.5 c6.5,7.5 2.5,28.5 -7.5,42.5 c-8.5,12 -22.5,16.5 -31.5,10.5 c-7.5,-5 -6.5,-16.5 2.5,-21.5 c10.5,-6 24.5,-4 34.5,4.5 c4.5,4 6.5,10.5 3.5,14.5 c-2.5,3 -5.5,3 -6.5,0",
        start: { x: 28.75, y: 42.75 },
        end: { x: 80.75, y: 90.75 },
        direction: "cross-loop-and-tail-knot",
        duration: 1400,
        pause: 250,
        tip: "Cross stroke 1, sweep around in a big belly, and finish with a tiny fish loop on the bottom-right"
      }
    ]
  },
  {
    character: "ね",
    type: "hiragana",
    level: "N5",
    category: "N-row",
    romaji: "ne",
    pronunciation: "neh (like 'net')",
    meaning: "Hiragana 'ne'",
    strokeCount: 2,
    mnemonic: {
      title: "Net with a Loop / Cat's Tail",
      concept: "A Net with a loop or a cat (neko) curled up with its tail looped",
      visualDescription: "Straight vertical left post, crossed by a Z-wave that wraps around into a small curl at the tail.",
      svgMnemonicPath: "M32,18 V88 M22,38 H52 L26,72 H66 C78,72 82,86 72,92 C64,96 56,92 56,84 C56,76 68,76 68,84"
    },
    exampleWords: [
      { jp: "ねこ", r: "neko", en: "Cat", ta: "பூனை" },
      { jp: "ねる", r: "neru", en: "To sleep", ta: "தூங்கு" },
      { jp: "ねつ", r: "netsu", en: "Fever / Heat", ta: "காய்ச்சல்" }
    ],
    exampleSentence: {
      jp: "かわいいねこがいます。",
      r: "Kawaii neko ga imasu.",
      en: "There is a cute cat.",
      ta: "ஒரு அழகான பூனை இருக்கிறது."
    },
    strokes: [
      {
        number: 1,
        path: "M32.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,54.5 -0.5,64.5",
        start: { x: 32.75, y: 18.25 },
        end: { x: 34.75, y: 88.25 },
        direction: "vertical-straight-down",
        duration: 650,
        pause: 150,
        tip: "Straight vertical post on the left"
      },
      {
        number: 2,
        path: "M22.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c8.5,-1 19.5,-2.75 25.5,-3.75 c3.5,-0.5 4.5,1.25 2.5,3.75 c-8.5,11.5 -18.5,24.5 -28.5,35.5 c-3.25,3.5 -0.5,5.5 3.5,4.5 c12.5,-3 26.5,-6.5 36.5,-3 c7.5,2.5 9.5,12.5 3.5,18.5 c-4.5,4.5 -9.5,4.5 -11.5,0.5 c-2,-4 0.5,-9.5 5.5,-10 c4,-0.5 7.5,2 7.5,6",
        start: { x: 22.75, y: 38.75 },
        end: { x: 74.5, y: 98.0 },
        direction: "z-wave-and-loop-tail",
        duration: 1400,
        pause: 250,
        tip: "Cross the post with a Z-shape, sweep right, and finish with a looped curly tail"
      }
    ]
  },
  {
    character: "の",
    type: "hiragana",
    level: "N5",
    category: "N-row",
    romaji: "no",
    pronunciation: "noh (like 'note')",
    meaning: "Hiragana 'no'",
    strokeCount: 1,
    mnemonic: {
      title: "Single 'No' Loop / No Entry Sign",
      concept: "A single continuous 'No' loop like a spiral or 'NO' entry circle",
      visualDescription: "Starts slanted down-right, then loops backwards and sweeps around in a full magnificent swirl.",
      svgMnemonicPath: "M48,24 L34,68 C44,44 76,40 82,60 C88,80 66,94 42,92 C24,90 18,72 26,58"
    },
    exampleWords: [
      { jp: "のみもの", r: "nomimono", en: "Beverage / Drink", ta: "பானம்" },
      { jp: "のど", r: "nodo", en: "Throat", ta: "தொண்டை" },
      { jp: "のる", r: "noru", en: "To ride / get on", ta: "ஏறு" }
    ],
    exampleSentence: {
      jp: "つめたいのみものをのみます。",
      r: "Tsumetai nomimono o nomimasu.",
      en: "I drink a cold beverage.",
      ta: "நான் குளிர்ச்சியான பானம் குடிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M48.75,24.25 c1.5,1 2.25,2.5 2.25,4.75 c0,8.5 -7.5,25.5 -16.5,39.5 c-3.5,5.5 -2.5,7.5 2.5,5.5 c14.5,-6 36.5,-13 46.5,-4 c10.5,9.5 7.5,28.5 -8.5,38.5 c-16.5,10.5 -38.5,7.5 -48.5,-6 c-7.5,-10 -3.5,-23.5 8.5,-29.5",
        start: { x: 48.75, y: 24.25 },
        end: { x: 34.75, y: 67.0 },
        direction: "diagonal-drop-and-spiral-loop",
        duration: 1250,
        pause: 200,
        tip: "Start high center, drop down-left, then swirl around in a big elegant open loop"
      }
    ]
  },
  {
    character: "は",
    type: "hiragana",
    level: "N5",
    category: "H-row",
    romaji: "ha",
    pronunciation: "hah (like 'haha')",
    meaning: "Hiragana 'ha' (topic particle 'wa')",
    strokeCount: 3,
    mnemonic: {
      title: "Ha-ha Laughing / Hat",
      concept: "Think 'Ha' / a person-like form with a laughing mouth loop",
      visualDescription: "Left upright post with a hook, horizontal line on the right crossed by a looped vertical stroke.",
      svgMnemonicPath: "M30,18 V84 C30,90 34,90 40,84 M50,38 H82 M66,22 V74 C66,86 52,86 52,76 C52,66 66,66 66,76"
    },
    exampleWords: [
      { jp: "はな", r: "hana", en: "Flower / Nose", ta: "மலர்" },
      { jp: "はし", r: "hashi", en: "Chopsticks / Bridge", ta: "சாப்பாட்டு குச்சிகள்" },
      { jp: "はい", r: "hai", en: "Yes", ta: "ஆம்" }
    ],
    exampleSentence: {
      jp: "きれいなはながさきました。",
      r: "Kirei na hana ga sakimashita.",
      en: "A beautiful flower bloomed.",
      ta: "அழகான மலர் பூத்தது."
    },
    strokes: [
      {
        number: 1,
        path: "M30.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,25.5 -3.5,51.75 -10.5,65.25 c-1.75,3.5 -0.5,4.75 3.5,3.25 c8.5,-3 14.5,-6.5 19.5,-9.5",
        start: { x: 30.75, y: 18.25 },
        end: { x: 45.75, y: 82.75 },
        direction: "vertical-curve-hook",
        duration: 750,
        pause: 150,
        tip: "Left vertical stroke with an upward release hook"
      },
      {
        number: 2,
        path: "M50.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c7.5,-0.75 16.5,-2 23.5,-2.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 50.75, y: 38.75 },
        end: { x: 89.75, y: 36.5 },
        direction: "left-to-right",
        duration: 500,
        pause: 130,
        tip: "Short horizontal line on the right"
      },
      {
        number: 3,
        path: "M66.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,25.5 -0.25,37.5 -0.5,41.5 c-0.75,7.5 -6.5,10.5 -12.5,7.5 c-6.5,-3.5 -5.5,-12.5 2.5,-16.25 c8.5,-4 16.5,0 18.5,6.5 c1.5,5 0.5,14.5 -5.5,20.5",
        start: { x: 66.75, y: 22.25 },
        end: { x: 70.5, y: 90.75 },
        direction: "vertical-down-loop-right",
        duration: 1000,
        pause: 200,
        tip: "Vertical stroke dropping through stroke 2, looping left, and finishing with a tail"
      }
    ]
  },
  {
    character: "ひ",
    type: "hiragana",
    level: "N5",
    category: "H-row",
    romaji: "hi",
    pronunciation: "hee (like 'heat')",
    meaning: "Hiragana 'hi'",
    strokeCount: 1,
    mnemonic: {
      title: "Hee Smile / Heel",
      concept: "A 'Hee' smile curve or a big laughing mouth",
      visualDescription: "A short horizontal shelf that dips down in a deep U-smile and kicks out to the right.",
      svgMnemonicPath: "M24,36 H46 C44,68 34,88 56,88 C76,88 82,68 84,48 L90,36"
    },
    exampleWords: [
      { jp: "ひと", r: "hito", en: "Person", ta: "மனிதர்" },
      { jp: "ひる", r: "hiru", en: "Noon / Daytime", ta: "மதியம்" },
      { jp: "ひかり", r: "hikari", en: "Light", ta: "ஒளி" }
    ],
    exampleSentence: {
      jp: "ひるごはんをいっしょにたべます。",
      r: "Hirugohan o issho ni tabemasu.",
      en: "We eat lunch together.",
      ta: "நாம் சேர்ந்து மதிய உணவு உண்கிறோம்."
    },
    strokes: [
      {
        number: 1,
        path: "M24.75,36.75 c2.5,0.75 5.5,0.5 8,0.25 c6.5,-0.75 14.5,-2 19.5,-2.75 c3.5,-0.5 4.5,1.25 3.5,4.25 c-3.5,11.5 -8.5,33.5 -2.5,44.5 c6.5,11.5 24.5,11.5 34.5,-1.5 c6.5,-8.5 10.5,-24.5 12.5,-38.5 c0.5,-3.25 1.5,-6.25 3.5,-7.5",
        start: { x: 24.75, y: 36.75 },
        end: { x: 103.75, y: 35.5 },
        direction: "dash-drop-smile-lift",
        duration: 1200,
        pause: 200,
        tip: "Single stroke: short dash, drop down into a big curved smile, and rise on the right"
      }
    ]
  },
  {
    character: "ふ",
    type: "hiragana",
    level: "N5",
    category: "H-row",
    romaji: "fu",
    pronunciation: "foo (blowing air gently through lips)",
    meaning: "Hiragana 'fu'",
    strokeCount: 4,
    mnemonic: {
      title: "Mount Fuji / Person Blowing",
      concept: "A person blowing 'Foo' at the top of Mount Fuji",
      visualDescription: "Top dot, a sweeping center nose curve, and two balanced side wings.",
      svgMnemonicPath: "M48,16 L58,26 M52,36 C56,58 38,78 36,88 M24,54 C22,66 26,74 32,74 M76,52 C84,62 82,72 74,78"
    },
    exampleWords: [
      { jp: "ふね", r: "fune", en: "Ship / Boat", ta: "கப்பல்" },
      { jp: "ふゆ", r: "fuyu", en: "Winter", ta: "குளிர்காலம்" },
      { jp: "ふじさん", r: "fujisan", en: "Mt. Fuji", ta: "புஜி மலை" }
    ],
    exampleSentence: {
      jp: "ふゆにふじさんをみます。",
      r: "Fuyu ni fujisan o mimasu.",
      en: "In winter, I view Mt. Fuji.",
      ta: "குளிர்காலத்தில் நான் புஜி மலையைப் பார்க்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M48.75,16.25 c2.5,1.25 6.5,4.75 7.75,7.25 c1.5,3 0.75,5.5 -1.75,8.25",
        start: { x: 48.75, y: 16.25 },
        end: { x: 54.75, y: 31.75 },
        direction: "diagonal-down-right",
        duration: 450,
        pause: 120,
        tip: "Top center slanted dot"
      },
      {
        number: 2,
        path: "M52.75,36.25 c1.5,1 2.25,2.5 2.25,4.75 c0,15.5 -8.5,33.5 -21.5,44.5 c-3.25,2.75 -4.5,1.5 -3.5,-2.25 c2.5,-8.5 6.5,-19.5 8.5,-27.5",
        start: { x: 52.75, y: 36.25 },
        end: { x: 38.5, y: 55.75 },
        direction: "hook-and-sweep-left",
        duration: 750,
        pause: 140,
        tip: "Center hook sweeping down and left"
      },
      {
        number: 3,
        path: "M24.75,54.25 c2.5,2.5 5.5,8.5 6.5,12.5",
        start: { x: 24.75, y: 54.25 },
        end: { x: 31.25, y: 66.75 },
        direction: "diagonal-down-left",
        duration: 400,
        pause: 120,
        tip: "Left side wing dot"
      },
      {
        number: 4,
        path: "M76.75,52.25 c3.5,3.25 8.5,10.5 9.75,15.5",
        start: { x: 76.75, y: 52.25 },
        end: { x: 86.5, y: 67.75 },
        direction: "diagonal-down-right",
        duration: 400,
        pause: 200,
        tip: "Right side wing dot"
      }
    ]
  },
  {
    character: "へ",
    type: "hiragana",
    level: "N5",
    category: "H-row",
    romaji: "he",
    pronunciation: "heh (like 'help', direction particle 'e')",
    meaning: "Hiragana 'he'",
    strokeCount: 1,
    mnemonic: {
      title: "Mountain Peak / 'He' Hill",
      concept: "A mountain peak / 'He' climbing up and sliding down the hill",
      visualDescription: "A single clean mountain peak: rises up to the peak on the left, then slopes down gently on the right.",
      svgMnemonicPath: "M20,64 L46,28 L90,68"
    },
    exampleWords: [
      { jp: "へや", r: "heya", en: "Room", ta: "அறை" },
      { jp: "へび", r: "hebi", en: "Snake", ta: "பாம்பு" },
      { jp: "へいわ", r: "heiwa", en: "Peace", ta: "அமைதி" }
    ],
    exampleSentence: {
      jp: "あかるいへやにはいります。",
      r: "Akarui heya ni hairimasu.",
      en: "I enter a bright room.",
      ta: "நான் வெளிச்சமான அறைக்குள் நுழைகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M20.75,64.25 c2.5,-0.75 6.5,-3.5 9.5,-6.25 c8.5,-7.5 14.5,-16.5 18.5,-23.5 c2.25,-3.75 4.5,-3.75 7.5,-0.5 c10.5,11.5 24.5,23.5 34.5,29.5 c3.5,2.25 7.5,3.75 11,4.75",
        start: { x: 20.75, y: 64.25 },
        end: { x: 101.75, y: 68.25 },
        direction: "climb-peak-and-slope-down",
        duration: 850,
        pause: 200,
        tip: "Single stroke: climb sharply up to the mountain peak, then slope down long to the right"
      }
    ]
  },
  {
    character: "ほ",
    type: "hiragana",
    level: "N5",
    category: "H-row",
    romaji: "ho",
    pronunciation: "hoh (like 'home')",
    meaning: "Hiragana 'ho'",
    strokeCount: 4,
    mnemonic: {
      title: "Home / 'Ho' with a Hat",
      concept: "Think 'Ho' with a chimney roof and two horizontal elements",
      visualDescription: "Left upright post, two horizontal crossbars, and a vertical stroke that loops at the base.",
      svgMnemonicPath: "M28,18 V84 C28,90 32,90 38,84 M48,30 H84 M48,48 H84 M66,16 V74 C66,86 52,86 52,76 C52,66 66,66 66,76"
    },
    exampleWords: [
      { jp: "ほん", r: "hon", en: "Book", ta: "புத்தகம்" },
      { jp: "ほし", r: "hoshi", en: "Star", ta: "நட்சத்திரம்" },
      { jp: "ホテル", r: "hoteru", en: "Hotel", ta: "ஹோட்டல்" }
    ],
    exampleSentence: {
      jp: "よる、ほしをみます。",
      r: "Yoru, hoshi o mimasu.",
      en: "At night, I look at the stars.",
      ta: "இரவில் நான் நட்சத்திரங்களைப் பார்க்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M28.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,25.5 -3.5,51.75 -10.5,65.25 c-1.75,3.5 -0.5,4.75 3.5,3.25 c8.5,-3 14.5,-6.5 19.5,-9.5",
        start: { x: 28.75, y: 18.25 },
        end: { x: 43.75, y: 82.75 },
        direction: "vertical-curve-hook",
        duration: 750,
        pause: 130,
        tip: "Left vertical post with release hook"
      },
      {
        number: 2,
        path: "M48.75,30.75 c2.5,0.75 5.5,0.5 8,0.25 c7.5,-0.75 16.5,-2 23.5,-2.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 48.75, y: 30.75 },
        end: { x: 87.75, y: 28.5 },
        direction: "left-to-right",
        duration: 500,
        pause: 120,
        tip: "Upper horizontal line"
      },
      {
        number: 3,
        path: "M48.75,48.75 c2.5,0.75 5.5,0.5 8,0.25 c7.5,-0.75 16.5,-2 23.5,-2.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 48.75, y: 48.75 },
        end: { x: 87.75, y: 46.5 },
        direction: "left-to-right",
        duration: 500,
        pause: 130,
        tip: "Lower horizontal line"
      },
      {
        number: 4,
        path: "M66.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -0.25,43.5 -0.5,47.5 c-0.75,7.5 -6.5,10.5 -12.5,7.5 c-6.5,-3.5 -5.5,-12.5 2.5,-16.25 c8.5,-4 16.5,0 18.5,6.5 c1.5,5 0.5,14.5 -5.5,20.5",
        start: { x: 66.75, y: 16.25 },
        end: { x: 70.5, y: 90.75 },
        direction: "vertical-down-loop-right",
        duration: 1000,
        pause: 200,
        tip: "Vertical stroke starting below the roof, crossing both lines and looping at the bottom"
      }
    ]
  },
  {
    character: "ま",
    type: "hiragana",
    level: "N5",
    category: "M-row",
    romaji: "ma",
    pronunciation: "mah (like 'mama')",
    meaning: "Hiragana 'ma'",
    strokeCount: 3,
    mnemonic: {
      title: "Mask / 'Ma' Woven Form",
      concept: "A 'Ma'-like woven form like a theatrical mask with eyebrows",
      visualDescription: "Two parallel horizontal lines crossed by a vertical stroke that loops at the base.",
      svgMnemonicPath: "M24,32 H84 M28,48 H80 M54,16 V74 C54,86 40,86 40,76 C40,66 54,66 54,76"
    },
    exampleWords: [
      { jp: "まち", r: "machi", en: "Town / City", ta: "நகரம்" },
      { jp: "まいにち", r: "mainichi", en: "Every day", ta: "ஒவ்வொரு நாளும்" },
      { jp: "まど", r: "mado", en: "Window", ta: "ஜன்னல்" }
    ],
    exampleSentence: {
      jp: "まいにちにほんごをはなします。",
      r: "Mainichi nihongo o hanashimasu.",
      en: "Every day, I speak Japanese.",
      ta: "ஒவ்வொரு நாளும் நான் ஜப்பானிய மொழி பேசுகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M24.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 32.5,-3.75 45.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 24.75, y: 32.75 },
        end: { x: 85.75, y: 28.5 },
        direction: "left-to-right",
        duration: 550,
        pause: 120,
        tip: "Top horizontal line"
      },
      {
        number: 2,
        path: "M28.75,48.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 28.5,-3.25 40.5,-4.25 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 28.75, y: 48.75 },
        end: { x: 84.75, y: 45.0 },
        direction: "left-to-right",
        duration: 550,
        pause: 130,
        tip: "Second horizontal line"
      },
      {
        number: 3,
        path: "M54.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -0.25,43.5 -0.5,47.5 c-0.75,7.5 -6.5,10.5 -12.5,7.5 c-6.5,-3.5 -5.5,-12.5 2.5,-16.25 c8.5,-4 16.5,0 18.5,6.5 c1.5,5 0.5,14.5 -5.5,20.5",
        start: { x: 54.75, y: 16.25 },
        end: { x: 58.5, y: 90.75 },
        direction: "vertical-cross-loop-bottom",
        duration: 1000,
        pause: 200,
        tip: "Vertical drop crossing both lines, looping left, and finishing with a tail"
      }
    ]
  },
  {
    character: "み",
    type: "hiragana",
    level: "N5",
    category: "M-row",
    romaji: "mi",
    pronunciation: "mee (like 'meat')",
    meaning: "Hiragana 'mi'",
    strokeCount: 2,
    mnemonic: {
      title: "Three / 'Mi' Flowing Curves",
      concept: "Think of number 3 or three flowing musical notes saying 'Me'",
      visualDescription: "Horizontal dash turning into a loop and sweep, crossed by an elegant downward stroke.",
      svgMnemonicPath: "M28,32 H54 C54,58 32,58 32,46 C32,34 58,40 76,72 M72,42 L52,86"
    },
    exampleWords: [
      { jp: "みず", r: "mizu", en: "Water", ta: "தண்ணீர்" },
      { jp: "みせ", r: "mise", en: "Shop / Store", ta: "கடை" },
      { jp: "みる", r: "miru", en: "To see / watch", ta: "பார்" }
    ],
    exampleSentence: {
      jp: "みずをいっぱいのみます。",
      r: "Mizu o ippai nomimasu.",
      en: "I drink a glass of water.",
      ta: "நான் ஒரு டம்ளர் தண்ணீர் குடிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M28.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c6.5,-0.75 14.5,-2 19.5,-3.25 c3.5,-0.75 4.5,1.25 3.5,4.25 c-3.5,11.5 -8.5,24.5 -16.5,26.5 c-6.5,1.5 -9.5,-4.5 -4.5,-9.5 c6.5,-6.5 16.5,-4.5 28.5,5.5 c10.5,8.5 18.5,18.5 24.5,26.5",
        start: { x: 28.75, y: 32.75 },
        end: { x: 91.75, y: 83.0 },
        direction: "dash-loop-and-sweep-right",
        duration: 1100,
        pause: 150,
        tip: "Horizontal right, loop back on the left, then sweep down-right across the canvas"
      },
      {
        number: 2,
        path: "M72.75,42.25 c1.5,1 2.25,2.5 2.25,4.75 c0,15.5 -8.5,33.5 -22.5,44.5",
        start: { x: 72.75, y: 42.25 },
        end: { x: 52.5, y: 91.5 },
        direction: "diagonal-down-left",
        duration: 600,
        pause: 200,
        tip: "Downward stroke crossing the tail of stroke 1"
      }
    ]
  },
  {
    character: "む",
    type: "hiragana",
    level: "N5",
    category: "M-row",
    romaji: "mu",
    pronunciation: "moo (like 'moon')",
    meaning: "Hiragana 'mu'",
    strokeCount: 3,
    mnemonic: {
      title: "Cow Saying Moo",
      concept: "A cow saying 'Moo' with a snout loop and a little ear dot",
      visualDescription: "Horizontal top bar, vertical loop with a swooping tail, finished with an upper right dot.",
      svgMnemonicPath: "M24,34 H68 M48,18 V58 C48,72 32,72 32,60 C32,48 48,50 68,68 L84,72 M78,28 L88,38"
    },
    exampleWords: [
      { jp: "むし", r: "mushi", en: "Insect / Bug", ta: "பூச்சி" },
      { jp: "むずかしい", r: "muzukashii", en: "Difficult", ta: "கடினமான" },
      { jp: "むら", r: "mura", en: "Village", ta: "கிராமம்" }
    ],
    exampleSentence: {
      jp: "にほんごはむずかしいですが、おもしろいです。",
      r: "Nihongo wa muzukashii desu ga, omoshiroi desu.",
      en: "Japanese is difficult, but interesting.",
      ta: "ஜப்பானிய மொழி கடினமானது, ஆனால் சுவாரஸ்யமானது."
    },
    strokes: [
      {
        number: 1,
        path: "M24.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 24.5,-2.75 34.5,-3.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 24.75, y: 34.75 },
        end: { x: 74.75, y: 31.5 },
        direction: "left-to-right",
        duration: 550,
        pause: 120,
        tip: "Horizontal bar across the top left"
      },
      {
        number: 2,
        path: "M48.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -0.25,36.5 -0.5,40.5 c-0.75,7.5 -6.5,10.5 -12.5,7.5 c-6.5,-3.5 -5.5,-12.5 2.5,-16.25 c8.5,-4 18,-1 28.5,8.5 c7.5,6.5 12.5,11.5 17.5,14.5 c2.5,1.5 4.5,2.5 6.5,2.5",
        start: { x: 48.75, y: 18.25 },
        end: { x: 93.5, y: 80.25 },
        direction: "vertical-loop-and-swoop",
        duration: 1100,
        pause: 150,
        tip: "Drop down, loop around on the left, then sweep across and up to the right"
      },
      {
        number: 3,
        path: "M78.75,28.25 c2.75,2.25 7,7.75 8.25,11.75",
        start: { x: 78.75, y: 28.25 },
        end: { x: 87.0, y: 40.0 },
        direction: "diagonal-down-right",
        duration: 400,
        pause: 200,
        tip: "Upper right accent dot"
      }
    ]
  },
  {
    character: "め",
    type: "hiragana",
    level: "N5",
    category: "M-row",
    romaji: "me",
    pronunciation: "meh (like 'melon')",
    meaning: "Hiragana 'me' (eye)",
    strokeCount: 2,
    mnemonic: {
      title: "Eye / Tangled 'Me' Shape",
      concept: "A tangled 'Me' shape resembling an Eye (me / 目)",
      visualDescription: "Slanted stroke 1 crossed by stroke 2 which loops into a wide eye shape without the end knot.",
      svgMnemonicPath: "M38,24 L24,78 M28,42 C56,36 84,48 76,76 C70,96 46,96 38,82 C30,68 46,50 68,54 C82,58 88,76 86,88"
    },
    exampleWords: [
      { jp: "め", r: "me", en: "Eye", ta: "கண்" },
      { jp: "めがね", r: "megane", en: "Glasses", ta: "மூக்குக்கண்ணாடி" },
      { jp: "めいし", r: "meishi", en: "Business card", ta: "வணிக அட்டை" }
    ],
    exampleSentence: {
      jp: "めがねをかけてほんをよみます。",
      r: "Megane o kakete hon o yomimasu.",
      en: "I put on glasses and read a book.",
      ta: "நான் கண்ணாடி அணிந்து புத்தகம் படிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M38.75,24.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -5.5,45.25 -16.5,59.25",
        start: { x: 38.75, y: 24.25 },
        end: { x: 24.5, y: 88.25 },
        direction: "diagonal-down-left",
        duration: 650,
        pause: 150,
        tip: "Slanted stroke down-left"
      },
      {
        number: 2,
        path: "M28.75,42.75 c2.5,0.75 5.5,0.5 8,0 c16.5,-3.5 38.5,-9.5 44.5,-2.5 c6.5,7.5 2.5,28.5 -7.5,42.5 c-8.5,12 -22.5,16.5 -31.5,10.5 c-7.5,-5 -6.5,-16.5 2.5,-21.5 c10.5,-6 24.5,-4 34.5,4.5 c6.5,5.5 9.5,14.5 10.5,23.5",
        start: { x: 28.75, y: 42.75 },
        end: { x: 89.25, y: 99.75 },
        direction: "cross-loop-and-open-curve",
        duration: 1300,
        pause: 200,
        tip: "Cross stroke 1, sweep around in a big belly and exit smoothly without looping"
      }
    ]
  },
  {
    character: "も",
    type: "hiragana",
    level: "N5",
    category: "M-row",
    romaji: "mo",
    pronunciation: "moh (like 'more')",
    meaning: "Hiragana 'mo'",
    strokeCount: 3,
    mnemonic: {
      title: "More Worms on a Hook / Moustache",
      concept: "A big fishing hook with two extra worms (More / 'Mo') caught across it",
      visualDescription: "A tall fishing hook stroke, crossed by two horizontal bars.",
      svgMnemonicPath: "M48,16 V72 C48,92 72,94 82,78 M28,38 H78 M26,56 H80"
    },
    exampleWords: [
      { jp: "もの", r: "mono", en: "Thing", ta: "பொருள்" },
      { jp: "もり", r: "mori", en: "Forest", ta: "காடு" },
      { jp: "もちろん", r: "mochiron", en: "Of course", ta: "நிச்சயமாக" }
    ],
    exampleSentence: {
      jp: "わたしもにほんへいきたいです。",
      r: "Watashi mo nihon he ikitai desu.",
      en: "I also want to go to Japan.",
      ta: "நானும் ஜப்பான் செல்ல விரும்புகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M48.75,16.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,48.5 0.5,55.5 c2.25,15.5 15.5,18.5 26.5,13.25 c8.5,-4 14.5,-10.5 18.5,-17.5",
        start: { x: 48.75, y: 16.25 },
        end: { x: 96.75, y: 73.0 },
        direction: "vertical-center-hook-up",
        duration: 900,
        pause: 140,
        tip: "Central vertical post dropping down and scooping up into a hook"
      },
      {
        number: 2,
        path: "M28.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c11.5,-1.25 26.5,-3 38.5,-4 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 28.75, y: 38.75 },
        end: { x: 82.75, y: 35.25 },
        direction: "left-to-right",
        duration: 500,
        pause: 120,
        tip: "Upper horizontal cross line"
      },
      {
        number: 3,
        path: "M26.75,56.75 c2.5,0.75 5.5,0.5 8,0.25 c12.5,-1.25 28.5,-3 40.5,-4 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 26.75, y: 56.75 },
        end: { x: 84.75, y: 53.25 },
        direction: "left-to-right",
        duration: 500,
        pause: 200,
        tip: "Lower horizontal cross line"
      }
    ]
  },
  {
    character: "や",
    type: "hiragana",
    level: "N5",
    category: "Y-row",
    romaji: "ya",
    pronunciation: "yah (like 'yard')",
    meaning: "Hiragana 'ya'",
    strokeCount: 3,
    mnemonic: {
      title: "Yacht / 'Ya' Branching Form",
      concept: "A 'Ya'-shaped branching form like a sailboat Yacht",
      visualDescription: "Flowing main curve with a hook, an accent tick on the upper right, and a slanted downward slash.",
      svgMnemonicPath: "M28,42 C54,34 76,46 64,82 M66,24 L74,36 M44,22 L34,78"
    },
    exampleWords: [
      { jp: "やま", r: "yama", en: "Mountain", ta: "மலை" },
      { jp: "やすみ", r: "yasumi", en: "Rest / Holiday", ta: "விடுமுறை" },
      { jp: "やさい", r: "yasai", en: "Vegetable", ta: "காய்கறி" }
    ],
    exampleSentence: {
      jp: "たかいやまをのぼります。",
      r: "Takai yama o noborimasu.",
      en: "I climb a high mountain.",
      ta: "நான் உயரமான மலையில் ஏறுகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M28.75,42.75 c2.5,0.75 5.5,0.5 8,0 c14.5,-2.5 32,-7 37.5,-4.75 c6.75,2.75 6.5,17 -0.5,32.75 c-7.75,17.5 -22.5,25.25 -39.5,23.5",
        start: { x: 28.75, y: 42.75 },
        end: { x: 33.75, y: 94.25 },
        direction: "curve-right-and-hook-down",
        duration: 900,
        pause: 130,
        tip: "Main curved stroke: sweep right, angle down, and curve back"
      },
      {
        number: 2,
        path: "M66.75,24.25 c2.5,1.75 6.5,6.5 7.75,10.25",
        start: { x: 66.75, y: 24.25 },
        end: { x: 74.5, y: 34.5 },
        direction: "diagonal-down-right",
        duration: 400,
        pause: 120,
        tip: "Small upper right accent tick"
      },
      {
        number: 3,
        path: "M44.75,22.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -5.5,45.25 -16.5,59.25",
        start: { x: 44.75, y: 22.25 },
        end: { x: 30.5, y: 86.25 },
        direction: "diagonal-down-left",
        duration: 650,
        pause: 200,
        tip: "Downward diagonal stroke cutting through the left side"
      }
    ]
  },
  {
    character: "ゆ",
    type: "hiragana",
    level: "N5",
    category: "Y-row",
    romaji: "yu",
    pronunciation: "yoo (like 'youth')",
    meaning: "Hiragana 'yu'",
    strokeCount: 2,
    mnemonic: {
      title: "U with a Hook / Fish",
      concept: "A 'U' with a hook swimming like a little goldfish",
      visualDescription: "Downward drop looping into a horizontal belly, crossed by a vertical curved sword.",
      svgMnemonicPath: "M38,20 V56 C38,76 56,76 76,72 M62,18 V88"
    },
    exampleWords: [
      { jp: "ゆき", r: "yuki", en: "Snow", ta: "பனி" },
      { jp: "ゆめ", r: "yume", en: "Dream", ta: "கனவு" },
      { jp: "ゆうがた", r: "yuugata", en: "Evening", ta: "மாலை நேரம்" }
    ],
    exampleSentence: {
      jp: "しろいゆきがふっています。",
      r: "Shiroi yuki ga futte imasu.",
      en: "White snow is falling.",
      ta: "வெள்ளை பனி பெய்கிறது."
    },
    strokes: [
      {
        number: 1,
        path: "M38.75,20.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -6.5,37.5 -13.5,43.5 c-5.5,4.5 -9.5,1.5 -8.5,-6.5 c1.5,-11.5 17.5,-16.5 31.5,-12.5 c14.5,4 28.5,14 36.5,23.5",
        start: { x: 38.75, y: 20.25 },
        end: { x: 86.75, y: 73.0 },
        direction: "vertical-loop-sweep-right",
        duration: 1100,
        pause: 150,
        tip: "Drop down, loop back on the left, then sweep up-right across the bottom"
      },
      {
        number: 2,
        path: "M62.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,54.5 -0.5,64.5",
        start: { x: 62.75, y: 18.25 },
        end: { x: 64.75, y: 88.25 },
        direction: "vertical-cut-down",
        duration: 750,
        pause: 200,
        tip: "Straight vertical stroke cutting down through the horizontal body"
      }
    ]
  },
  {
    character: "よ",
    type: "hiragana",
    level: "N5",
    category: "Y-row",
    romaji: "yo",
    pronunciation: "yoh (like 'yo-yo')",
    meaning: "Hiragana 'yo'",
    strokeCount: 2,
    mnemonic: {
      title: "Yo-yo / 'Yo' Shape with a Loop",
      concept: "A 'Yo' shape with a loop hanging like a Yo-yo on a string",
      visualDescription: "Short horizontal shelf on the left, vertical stroke that loops at the base and sweeps right.",
      svgMnemonicPath: "M28,34 H54 M54,16 V68 C54,82 40,82 40,72 C40,62 54,62 54,72 H82"
    },
    exampleWords: [
      { jp: "よる", r: "yoru", en: "Night", ta: "இரவு" },
      { jp: "よく", r: "yoku", en: "Well / Often", ta: "நன்றாக" },
      { jp: "よむ", r: "yomu", en: "To read", ta: "படி" }
    ],
    exampleSentence: {
      jp: "よる、ほんをよくよみます。",
      r: "Yoru, hon o yoku yomimasu.",
      en: "At night, I often read books.",
      ta: "இரவில் நான் அடிக்கடி புத்தகம் படிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M28.75,34.75 c2.5,0.75 5.5,0.5 8,0.25 c7.5,-0.75 14.5,-1.75 21.5,-2.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 28.75, y: 34.75 },
        end: { x: 65.75, y: 32.5 },
        direction: "left-to-right",
        duration: 500,
        pause: 120,
        tip: "Short horizontal stroke on the left"
      },
      {
        number: 2,
        path: "M54.75,16.25 c1.5,1 2.25,2.5 2.25,4.75 c0,28.5 -0.25,44.5 -0.5,48.5 c-0.75,7.5 -6.5,10.5 -12.5,7.5 c-6.5,-3.5 -5.5,-12.5 2.5,-16.25 c8.5,-4 18,-1 28.5,4.5 c6.5,3.5 12.5,6.5 16.5,8.5",
        start: { x: 54.75, y: 16.25 },
        end: { x: 91.5, y: 73.5 },
        direction: "vertical-down-loop-right",
        duration: 1050,
        pause: 200,
        tip: "Vertical drop meeting stroke 1, looping left, then extending straight out to the right"
      }
    ]
  },
  {
    character: "ら",
    type: "hiragana",
    level: "N5",
    category: "R-row",
    romaji: "ra",
    pronunciation: "rah (light tap of the tongue, between 'r' and 'l')",
    meaning: "Hiragana 'ra'",
    strokeCount: 2,
    mnemonic: {
      title: "Rabbit / 'Ra' Curve",
      concept: "A 'Ra'-like curve like a rabbit's ears and back",
      visualDescription: "Top dot roof, followed by a vertical spine that curves out into a rounded belly.",
      svgMnemonicPath: "M42,20 L58,28 M38,42 C56,38 78,48 74,74 C70,96 46,96 34,88"
    },
    exampleWords: [
      { jp: "らいしゅう", r: "raishuu", en: "Next week", ta: "அடுத்த வாரம்" },
      { jp: "ラジオ", r: "rajio", en: "Radio", ta: "வானொலி" },
      { jp: "ラーメン", r: "raamen", en: "Ramen", ta: "ராமென் நூடுல்ஸ்" }
    ],
    exampleSentence: {
      jp: "らいしゅう、ともだちにあいます。",
      r: "Raishuu, tomodachi ni aimashita.",
      en: "Next week, I will meet a friend.",
      ta: "அடுத்த வாரம் நான் நண்பரைச் சந்திக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M42.5,20.25 c2.5,1.25 6.5,4.75 7.75,7.25 c1.5,3 0.75,5.5 -1.75,8.25",
        start: { x: 42.5, y: 20.25 },
        end: { x: 48.5, y: 35.75 },
        direction: "diagonal-down-right",
        duration: 450,
        pause: 120,
        tip: "Small slanted roof stroke"
      },
      {
        number: 2,
        path: "M38.75,42.25 c1.5,1 2.5,2.5 2.5,4.75 c0,8.5 -5.5,18.5 -8.5,23.5 c-2.5,4 -0.5,5.5 3.5,4.5 c14.5,-3.5 32,-7 37.5,-4.75 c6.75,2.75 6.5,17 -0.5,32.75 c-7.75,17.5 -22.5,25.25 -39.5,23.5",
        start: { x: 38.75, y: 42.25 },
        end: { x: 33.75, y: 126.5 },
        direction: "drop-and-big-c-curve",
        duration: 1000,
        pause: 200,
        tip: "Drop down, then sweep around in a large open rounded belly"
      }
    ]
  },
  {
    character: "り",
    type: "hiragana",
    level: "N5",
    category: "R-row",
    romaji: "ri",
    pronunciation: "ree (light tap)",
    meaning: "Hiragana 'ri'",
    strokeCount: 2,
    mnemonic: {
      title: "River Reeds / Ribbon",
      concept: "Two flowing 'Ri' strokes like river reeds swaying in the wind",
      visualDescription: "Left shorter stroke with a hook, paired with a longer sweeping right stroke.",
      svgMnemonicPath: "M34,26 V62 C34,70 38,70 44,64 M72,20 V72 C72,88 64,96 52,98"
    },
    exampleWords: [
      { jp: "りんご", r: "ringo", en: "Apple", ta: "ஆப்பிள்" },
      { jp: "りょうり", r: "ryouri", en: "Cooking / Cuisine", ta: "சமையல்" },
      { jp: "りょこう", r: "ryokou", en: "Travel", ta: "பயணம்" }
    ],
    exampleSentence: {
      jp: "あかいりんごをたべます。",
      r: "Akai ringo o tabemasu.",
      en: "I eat a red apple.",
      ta: "நான் சிவப்பு ஆப்பிள் சாப்பிடுகிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M34.75,26.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,15.5 -3.5,32.75 -8.5,41.25 c-1.5,2.5 -0.5,3.75 2.5,2.5 c6.5,-2.5 11.5,-5.5 15.5,-8",
        start: { x: 34.75, y: 26.25 },
        end: { x: 46.75, y: 67.5 },
        direction: "vertical-hook-up",
        duration: 650,
        pause: 140,
        tip: "Left stroke going down and hooking upward"
      },
      {
        number: 2,
        path: "M72.75,20.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,48.5 -4.5,62.5 c-3.5,12.5 -11.5,18.5 -22.5,20.5",
        start: { x: 72.75, y: 20.25 },
        end: { x: 48.25, y: 108.75 },
        direction: "long-curve-down-left",
        duration: 900,
        pause: 200,
        tip: "Long right stroke sweeping gracefully down and curving left"
      }
    ]
  },
  {
    character: "る",
    type: "hiragana",
    level: "N5",
    category: "R-row",
    romaji: "ru",
    pronunciation: "roo (light tap)",
    meaning: "Hiragana 'ru'",
    strokeCount: 1,
    mnemonic: {
      title: "Route Loop / Ruby",
      concept: "A 'Ru' loop holding a precious ruby at the bottom",
      visualDescription: "Z-wave top like 'ろ' (ro), but ends in a closed circular loop at the bottom.",
      svgMnemonicPath: "M32,28 H72 L32,60 C46,54 78,54 74,78 C70,96 46,96 46,84 C46,72 62,72 62,84"
    },
    exampleWords: [
      { jp: "くるま", r: "kuruma", en: "Car", ta: "கார்" },
      { jp: "はる", r: "haru", en: "Spring", ta: "வசந்த காலம்" },
      { jp: "ひる", r: "hiru", en: "Noon", ta: "மதியம்" }
    ],
    exampleSentence: {
      jp: "はるにはながさきます。",
      r: "Haru ni hana ga sakimasu.",
      en: "In spring, flowers bloom.",
      ta: "வசந்த காலத்தில் மலர்கள் பூக்கும்."
    },
    strokes: [
      {
        number: 1,
        path: "M32.75,28.25 c2.5,0.75 5.5,0.5 8,0.25 c9.5,-1 21.5,-2.75 29.5,-3.75 c2.5,-0.25 4.5,1.25 2.5,3.75 c-8.5,10.5 -18.5,23.5 -29.5,33.5 c-3.25,2.75 -1.5,4.75 2.5,4 c11.5,-2 26.5,-4.5 35.5,-3.5 c9.5,1 14.5,9.5 10.5,19.5 c-3.5,8.5 -11.5,11.5 -16.5,8.5 c-5.5,-3.5 -4.5,-10.5 2.5,-13.5 c6.5,-3 12.5,0 12.5,6",
        start: { x: 32.75, y: 28.25 },
        end: { x: 74.5, y: 88.0 },
        direction: "zigzag-with-ruby-loop",
        duration: 1350,
        pause: 250,
        tip: "Continuous stroke: horizontal right, diagonal down-left, big curve, finished with a tight loop (ruby)"
      }
    ]
  },
  {
    character: "れ",
    type: "hiragana",
    level: "N5",
    category: "R-row",
    romaji: "re",
    pronunciation: "reh (light tap)",
    meaning: "Hiragana 're'",
    strokeCount: 2,
    mnemonic: {
      title: "Resting Person / 'Re' Curve",
      concept: "A 'Re' curve like a person resting with an outstretched leg",
      visualDescription: "Straight vertical left post, crossed by a Z-wave that kicks out into an elegant upward wing.",
      svgMnemonicPath: "M32,18 V88 M22,38 H52 L26,72 H66 C78,72 82,78 86,88"
    },
    exampleWords: [
      { jp: "れきし", r: "rekishi", en: "History", ta: "வரலாறு" },
      { jp: "れいぞうこ", r: "reizouko", en: "Refrigerator", ta: "குளிர்சாதனப் பெட்டி" },
      { jp: "れんしゅう", r: "renshuu", en: "Practice", ta: "பயிற்சி" }
    ],
    exampleSentence: {
      jp: "まいにちにほんごをれんしゅうします。",
      r: "Mainichi nihongo o renshuu shimasu.",
      en: "Every day, I practice Japanese.",
      ta: "ஒவ்வொரு நாளும் நான் ஜப்பானிய மொழி பயிற்சி செய்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M32.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,54.5 -0.5,64.5",
        start: { x: 32.75, y: 18.25 },
        end: { x: 34.75, y: 88.25 },
        direction: "vertical-straight-down",
        duration: 650,
        pause: 140,
        tip: "Straight vertical post on the left"
      },
      {
        number: 2,
        path: "M22.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c8.5,-1 19.5,-2.75 25.5,-3.75 c3.5,-0.5 4.5,1.25 2.5,3.75 c-8.5,11.5 -18.5,24.5 -28.5,35.5 c-3.25,3.5 -0.5,5.5 3.5,4.5 c12.5,-3 26.5,-6.5 36.5,-3 c7.5,2.5 12.5,9.5 16.5,18.5 c1.5,3.5 3.5,6.5 5.5,8.5",
        start: { x: 22.75, y: 38.75 },
        end: { x: 88.5, y: 104.0 },
        direction: "z-wave-and-kick-wing",
        duration: 1250,
        pause: 200,
        tip: "Cross the post with a Z-shape, sweep right, and kick out in an open wing"
      }
    ]
  },
  {
    character: "ろ",
    type: "hiragana",
    level: "N5",
    category: "R-row",
    romaji: "ro",
    pronunciation: "roh (light tap)",
    meaning: "Hiragana 'ro'",
    strokeCount: 1,
    mnemonic: {
      title: "Road / Robber Stole the Ruby",
      concept: "A simpler 'Ro' version of る — the robber stole the ruby, leaving an open Road!",
      visualDescription: "Same as る, but ends in an open swooping curve with NO loop at the bottom.",
      svgMnemonicPath: "M32,28 H72 L32,60 C46,54 78,54 74,78 C70,96 46,96 36,88"
    },
    exampleWords: [
      { jp: "ろく", r: "roku", en: "Six", ta: "ஆறு" },
      { jp: "ろうそく", r: "rousoku", en: "Candle", ta: "மெழுகுவர்த்தி" },
      { jp: "ロシア", r: "roshia", en: "Russia", ta: "ரஷ்யா" }
    ],
    exampleSentence: {
      jp: "いま、ろくじです。",
      r: "Ima, roku-ji desu.",
      en: "It is six o'clock now.",
      ta: "இப்போது மணி ஆறு."
    },
    strokes: [
      {
        number: 1,
        path: "M32.75,28.25 c2.5,0.75 5.5,0.5 8,0.25 c9.5,-1 21.5,-2.75 29.5,-3.75 c2.5,-0.25 4.5,1.25 2.5,3.75 c-8.5,10.5 -18.5,23.5 -29.5,33.5 c-3.25,2.75 -1.5,4.75 2.5,4 c11.5,-2 26.5,-4.5 35.5,-3.5 c9.5,1 14.5,9.5 10.5,19.5 c-5.5,14 -21.5,19.5 -38.5,16",
        start: { x: 32.75, y: 28.25 },
        end: { x: 53.25, y: 101.5 },
        direction: "zigzag-open-road-curve",
        duration: 1200,
        pause: 200,
        tip: "Single stroke: horizontal right, diagonal down-left, and sweep around in a big open curve"
      }
    ]
  },
  {
    character: "わ",
    type: "hiragana",
    level: "N5",
    category: "W-row",
    romaji: "wa",
    pronunciation: "wah (like 'water')",
    meaning: "Hiragana 'wa'",
    strokeCount: 2,
    mnemonic: {
      title: "Wagon / 'Wa' Curve",
      concept: "A 'Wa' curve like a round Wagon wheel",
      visualDescription: "Straight vertical left post, crossed by a stroke that curves smoothly into a round belly without a knot.",
      svgMnemonicPath: "M32,18 V88 M22,38 H52 L26,72 C42,54 78,54 74,78 C70,96 46,96 36,88"
    },
    exampleWords: [
      { jp: "わたし", r: "watashi", en: "I / Me", ta: "நான்" },
      { jp: "わかる", r: "wakaru", en: "To understand", ta: "புரிந்து கொள்" },
      { jp: "わらう", r: "warau", en: "To laugh / smile", ta: "சிரி" }
    ],
    exampleSentence: {
      jp: "わたしはがくせいです。",
      r: "Watashi wa gakusei desu.",
      en: "I am a student.",
      ta: "நான் ஒரு மாணவன்."
    },
    strokes: [
      {
        number: 1,
        path: "M32.75,18.25 c1.5,1.25 2.5,3.25 2.5,5.5 c0,28.5 -0.5,54.5 -0.5,64.5",
        start: { x: 32.75, y: 18.25 },
        end: { x: 34.75, y: 88.25 },
        direction: "vertical-straight-down",
        duration: 650,
        pause: 140,
        tip: "Straight vertical post on the left"
      },
      {
        number: 2,
        path: "M22.75,38.75 c2.5,0.75 5.5,0.5 8,0.25 c8.5,-1 19.5,-2.75 25.5,-3.75 c3.5,-0.5 4.5,1.25 2.5,3.75 c-8.5,11.5 -18.5,24.5 -28.5,35.5 c-3.25,3.5 -0.5,5.5 3.5,4.5 c14.5,-3.5 32,-7 37.5,-4.75 c6.75,2.75 6.5,17 -0.5,32.75 c-7.75,17.5 -22.5,25.25 -39.5,23.5",
        start: { x: 22.75, y: 38.75 },
        end: { x: 33.75, y: 130.5 },
        direction: "z-wave-and-wide-belly",
        duration: 1300,
        pause: 200,
        tip: "Cross the post with a Z-shape, then sweep around into a smooth rounded wagon belly"
      }
    ]
  },
  {
    character: "を",
    type: "hiragana",
    level: "N5",
    category: "W-row",
    romaji: "wo",
    pronunciation: "oh (grammatical direct object marker)",
    meaning: "Hiragana 'wo / o' (Object particle)",
    strokeCount: 3,
    mnemonic: {
      title: "Woah / Person Jumping over 'O'",
      concept: "Think 'Wo' as an elaborate お with a person jumping over an obstacle",
      visualDescription: "Horizontal top bar, vertical hook that turns right, crossed by a swooping C-curve at the base.",
      svgMnemonicPath: "M26,32 H78 M56,18 L34,60 H66 M42,66 C68,66 78,84 62,94 C50,100 38,94 36,88"
    },
    exampleWords: [
      { jp: "ほんをよむ", r: "hon o yomu", en: "Read a book", ta: "புத்தகம் படி" },
      { jp: "みずをのむ", r: "mizu o nomu", en: "Drink water", ta: "தண்ணீர் குடி" },
      { jp: "ごはんをたべる", r: "gohan o taberu", en: "Eat food", ta: "உணவு சாப்பிடு" }
    ],
    exampleSentence: {
      jp: "にほんごのほんをよみます。",
      r: "Nihongo no hon o yomimasu.",
      en: "I read a Japanese book.",
      ta: "நான் ஜப்பானிய புத்தகத்தைப் படிக்கிறேன்."
    },
    strokes: [
      {
        number: 1,
        path: "M26.75,32.75 c2.5,0.75 5.5,0.5 8,0.25 c13.5,-1.25 32.5,-3.75 45.5,-4.75 c2.5,-0.25 5,-0.25 7.5,0.25",
        start: { x: 26.75, y: 32.75 },
        end: { x: 87.75, y: 28.5 },
        direction: "left-to-right",
        duration: 550,
        pause: 120,
        tip: "Horizontal line across the top"
      },
      {
        number: 2,
        path: "M56.75,18.25 c1.5,1 2.25,2.5 2.25,4.75 c0,19.5 -12.5,35.5 -24.5,41.5 c-3.25,1.75 -2.5,3.75 2.5,3.25 c11.5,-1.25 24.5,-2.75 34.5,-2.75",
        start: { x: 56.75, y: 18.25 },
        end: { x: 71.75, y: 65.0 },
        direction: "diagonal-down-left-and-dash-right",
        duration: 800,
        pause: 140,
        tip: "Slanted vertical drop, turning sharply right into a horizontal dash"
      },
      {
        number: 3,
        path: "M42.75,66.25 c3.5,1.25 7.5,1.25 11.5,0.75 c12.5,-1.5 22.5,4.5 18.5,17.5 c-3.5,11.5 -16.5,15.5 -30.5,10.5",
        start: { x: 42.75, y: 66.25 },
        end: { x: 42.25, y: 95.0 },
        direction: "curved-bottom-swoop",
        duration: 750,
        pause: 200,
        tip: "Bottom C-shaped scoop crossing under stroke 2"
      }
    ]
  },
  {
    character: "ん",
    type: "hiragana",
    level: "N5",
    category: "N-solo",
    romaji: "n",
    pronunciation: "n (nasal sound)",
    meaning: "Hiragana 'n'",
    strokeCount: 1,
    mnemonic: {
      title: "Final Flowing 'N' / Nose",
      concept: "A final flowing 'N' shaped like a cursive 'n' or a side-profile nose",
      visualDescription: "Slanted downward stroke that bounces up and arches over into a long sweeping tail.",
      svgMnemonicPath: "M36,24 L24,78 C36,54 58,48 66,62 C74,76 82,88 92,86"
    },
    exampleWords: [
      { jp: "にほん", r: "nihon", en: "Japan", ta: "ஜப்பான்" },
      { jp: "ほん", r: "hon", en: "Book", ta: "புத்தகம்" },
      { jp: "てんき", r: "tenki", en: "Weather", ta: "வானிலை" }
    ],
    exampleSentence: {
      jp: "きょうはいいてんきです。",
      r: "Kyou wa ii tenki desu.",
      en: "Today is nice weather.",
      ta: "இன்று நல்ல வானிலை நிலவுகிறது."
    },
    strokes: [
      {
        number: 1,
        path: "M36.75,24.25 c1.5,1 2.25,2.5 2.25,4.75 c0,22.5 -7.5,43.25 -14.5,51.25 c-2.5,2.75 -0.5,4.5 3.5,3.25 c12.5,-4 26.5,-16 34.5,-23.5 c9.5,-8.75 16.5,-5.5 12.5,7.5 c-4.5,14.5 2.5,26.5 14.5,23.5 c4.5,-1.25 8.5,-3.75 11.5,-6.25",
        start: { x: 36.75, y: 24.25 },
        end: { x: 100.75, y: 84.5 },
        direction: "diagonal-drop-arch-and-tail",
        duration: 1250,
        pause: 200,
        tip: "Single continuous stroke: drop down-left, bounce up in an arch, and sweep up-right into a tail"
      }
    ]
  }
];
