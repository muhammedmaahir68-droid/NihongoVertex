import { kanjiData } from "./kanji";
import { hiraganaData } from "./hiragana";
import { katakanaData } from "./katakana";

// Helper to shuffle array
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Helper to get unique random options
function getOptions(correct, pool, count = 3) {
  const filtered = pool.filter(p => p !== correct && p !== null && p !== undefined && p !== "");
  const shuffled = shuffle(filtered);
  const selected = shuffled.slice(0, count);
  return shuffle([...selected, correct]);
}

// Static/pre-built questions for each level (to preserve specific formats)
const staticQuizzes = {
  N5: [
    {
      id: "n5_q_static_1",
      type: "grammar",
      question: "Complete the sentence: 'これは ほん ______。' (This is a book.)",
      options: ["です", "か", "は", "に"],
      answer: "です"
    },
    {
      id: "n5_q_static_2",
      type: "grammar",
      question: "Which particle indicates ownership/possession? (e.g. 'My umbrella')",
      options: ["は (wa)", "を (o)", "の (no)", "が (ga)"],
      answer: "の (no)"
    },
    {
      id: "n5_q_static_3",
      type: "grammar",
      question: "Complete the sentence: 'がっこう ______ いきます。' (I go to school.)",
      options: ["を (o)", "へ (e)", "が (ga)", "は (wa)"],
      answer: "へ (e)"
    },
    {
      id: "n5_q_static_4",
      type: "grammar",
      question: "Complete the sentence: 'あさ 7じ ______ おきます。' (I get up at 7 in the morning.)",
      options: ["に", "で", "を", "へ"],
      answer: "に"
    },
    {
      id: "n5_q_static_5",
      type: "grammar",
      question: "Complete the sentence: 'タクシー ______ いきました。' (I went by taxi.)",
      options: ["で", "に", "を", "と"],
      answer: "で"
    }
  ],
  N4: [
    {
      id: "n4_q_static_1",
      type: "grammar",
      question: "Complete the conditional form: 'あめが ______ たら、いきません。' (If it rains, I won't go.)",
      options: ["ふり", "ふる", "ふっ", "ふら"],
      answer: "ふっ"
    },
    {
      id: "n4_q_static_2",
      type: "grammar",
      question: "Complete the sentence: 'テレビを ______ ながら、ごはんを たべます。' (I eat rice while watching TV.)",
      options: ["み", "みる", "みて", "みます"],
      answer: "み"
    },
    {
      id: "n4_q_static_3",
      type: "grammar",
      question: "Complete the sentence: 'にほんごが ______ ように なりました。' (I became able to speak Japanese.)",
      options: ["はなせる", "はなす", "はなして", "はなします"],
      answer: "はなせる"
    },
    {
      id: "n4_q_static_4",
      type: "grammar",
      question: "Complete the sentence: 'ここに しゃしんを ______ ください。' (Please take a picture here.)",
      options: ["とって", "とる", "とります", "とらない"],
      answer: "とって"
    }
  ],
  N3: [
    {
      id: "n3_q_static_1",
      type: "grammar",
      question: "Choose the correct connector meaning 'based on / according to': 'ニュース ______、あしたは 大雨だそうです。'",
      options: ["によれば", "にくらべて", "にたいして", "について"],
      answer: "によれば"
    },
    {
      id: "n3_q_static_2",
      type: "grammar",
      question: "Which structure means 'looks like / seems like'?",
      options: ["〜そうだ", "〜はずだ", "〜わけだ", "〜ばかりだ"],
      answer: "〜そうだ"
    },
    {
      id: "n3_q_static_3",
      type: "grammar",
      question: "Complete the sentence: '彼は 遊んで ______ います。' (He does nothing but play.)",
      options: ["ばかり", "だけ", "ほど", "くらい"],
      answer: "ばかり"
    }
  ],
  N2: [
    {
      id: "n2_q_static_1",
      type: "grammar",
      question: "What does the expression '〜にともなって' mean?",
      options: ["Instead of", "Along with / As a result of", "In contrast to", "Regardless of"],
      answer: "Along with / As a result of"
    },
    {
      id: "n2_q_static_2",
      type: "grammar",
      question: "Complete the sentence: '雨が 降っている ______、試合は 行われます。' (Despite the rain, the match will be held.)",
      options: ["にもかかわらず", "につれて", "に際して", "からといって"],
      answer: "にもかかわらず"
    }
  ],
  N1: [
    {
      id: "n1_q_static_1",
      type: "grammar",
      question: "Complete the sentence: '子供では ______、自分のことは 自分でするべきだ。' (It's not as if you're a child, you should take care of yourself.)",
      options: ["あるまいし", "あっては", "あればこそ", "あろうとも"],
      answer: "あるまいし"
    },
    {
      id: "n1_q_static_2",
      type: "grammar",
      question: "Complete the sentence: 'ここに入る ______。' (Do not enter / Must not enter - formal notice)",
      options: ["べからず", "まじき", "かねない", "ざるを得ない"],
      answer: "べからず"
    }
  ]
};

// Hardcoded Vocabulary Databases per level to enable dynamic vocabulary MCQs
const vocabDatabase = {
  N5: [
    { jp: "ともだち", en: "Friend" },
    { jp: "くるま", en: "Car" },
    { jp: "つくえ", en: "Desk" },
    { jp: "かさ", en: "Umbrella" },
    { jp: "ほん", en: "Book" },
    { jp: "せんせい", en: "Teacher" },
    { jp: "しょくどう", en: "Cafeteria" },
    { jp: "だいがく", en: "University" },
    { jp: "でんしゃ", en: "Train" },
    { jp: "みず", en: "Water" },
    { jp: "がくせい", en: "Student" },
    { jp: "しゃしん", en: "Photograph" },
    { jp: "あさごはん", en: "Breakfast" },
    { jp: "おんがく", en: "Music" },
    { jp: "かばん", en: "Bag / Briefcase" },
    { jp: "いしゃ", en: "Doctor" },
    { jp: "えき", jp_kanji: "駅", en: "Station" },
    { jp: "きょうしつ", jp_kanji: "教室", en: "Classroom" },
    { jp: "じしょ", jp_kanji: "辞書", en: "Dictionary" },
    { jp: "としょかん", jp_kanji: "図書館", en: "Library" }
  ],
  N4: [
    { jp: "こうくうびん", en: "Airmail" },
    { jp: "しけん", en: "Exam" },
    { jp: "じゅんび", en: "Preparation" },
    { jp: "こうじょう", en: "Factory" },
    { jp: "あんない", en: "Guidance / Guide" },
    { jp: "うんてん", en: "Driving" },
    { jp: "やくそく", en: "Promise / Appointment" },
    { jp: "ようじ", en: "Errand / Business" },
    { jp: "しゅくだい", en: "Homework" },
    { jp: "かいぎ", en: "Meeting / Conference" },
    { jp: "にゅうがく", en: "School admission" },
    { jp: "そつぎょう", en: "Graduation" },
    { jp: "てんきよほう", en: "Weather forecast" },
    { jp: "きびしい", en: "Strict / Severe" },
    { jp: "しんぱい", en: "Worry / Anxiety" }
  ],
  N3: [
    { jp: "法律", r: "ほうりつ", en: "Law" },
    { jp: "準備", r: "じゅんび", en: "Preparation" },
    { jp: "環境", r: "かんきょう", en: "Environment" },
    { jp: "経済", r: "けいざい", en: "Economy" },
    { jp: "科学", r: "かがく", en: "Science" },
    { jp: "歴史", r: "れきし", en: "History" },
    { jp: "技術", r: "ぎじゅつ", en: "Technology / Skill" },
    { jp: "協力", r: "きょうりょく", en: "Cooperation" },
    { jp: "関係", r: "かんけい", en: "Relationship / Connection" },
    { jp: "賛成", r: "さんせい", en: "Approval / Agreement" },
    { jp: "反対", r: "はんたい", en: "Opposition" },
    { jp: "解決", r: "かいけつ", en: "Solution / Resolution" },
    { jp: "結果", r: "けっか", en: "Result" },
    { jp: "調査", r: "ちょうさ", en: "Investigation / Survey" }
  ],
  N2: [
    { jp: "総理大臣", r: "そうりだいじん", en: "Prime Minister" },
    { jp: "翻訳", r: "ほんやく", en: "Translation" },
    { jp: "経営", r: "けいえい", en: "Management / Administration" },
    { jp: "価値", r: "かち", en: "Value / Worth" },
    { jp: "権利", r: "けんり", en: "Right / Privilege" },
    { jp: "義務", r: "ぎむ", en: "Duty / Obligation" },
    { jp: "効果", r: "こうか", en: "Effect / Effectiveness" },
    { jp: "主張", r: "しゅちょう", en: "Assertion / Claim" },
    { jp: "深刻", r: "しんこく", en: "Serious / Grave" },
    { jp: "普及", r: "ふきゅう", en: "Diffusion / Spread" },
    { jp: "発展", r: "はってん", en: "Development / Growth" },
    { jp: "摩擦", r: "まさつ", en: "Friction / Conflict" }
  ],
  N1: [
    { jp: "懇切丁寧", r: "こんせつていねい", en: "Extremely kind and polite" },
    { jp: "試行錯誤", r: "しこうさくご", en: "Trial and error" },
    { jp: "臨機応変", r: "りんきおうへん", en: "Adapting to circumstances" },
    { jp: "威厳", r: "いげん", en: "Dignity / Majesty" },
    { jp: "葛藤", r: "かっとう", en: "Conflict / Complications" },
    { jp: "懸念", r: "けねん", en: "Concern / Anxiety" },
    { jp: "錯覚", r: "さっかく", en: "Illusion / Hallucination" },
    { jp: "妥協", r: "だきょう", en: "Compromise" },
    { jp: "把握", r: "はおく", en: "Grasp / Understanding" },
    { jp: "憤慨", r: "ふんがい", en: "Indignation / Resentment" }
  ]
};

// Main generator function
function generateQuestionsForLevel(level) {
  const questions = [...(staticQuizzes[level] || [])];

  // 1. Generate Kanji questions from kanjiData
  const levelKanji = kanjiData.filter(k => k.level === level);
  const allMeaningsPool = kanjiData.map(k => k.meanings);
  const allKunyomiPool = kanjiData.map(k => k.kunyomi).filter(x => x && x !== "ー" && x !== "-");
  const allOnyomiPool = kanjiData.map(k => k.onyomi).filter(x => x && x !== "ー" && x !== "-");

  levelKanji.forEach((kanji, idx) => {
    // Meaning question
    questions.push({
      id: `${level.toLowerCase()}_gen_kanji_m_${idx}`,
      type: "kanji",
      question: `What is the meaning of the Kanji '${kanji.char}'?`,
      options: getOptions(kanji.meanings, allMeaningsPool),
      answer: kanji.meanings
    });

    // Kunyomi reading question (if valid)
    if (kanji.kunyomi && kanji.kunyomi !== "ー" && kanji.kunyomi !== "-") {
      questions.push({
        id: `${level.toLowerCase()}_gen_kanji_k_${idx}`,
        type: "kanji",
        question: `What is the Kunyomi reading of the Kanji '${kanji.char}'?`,
        options: getOptions(kanji.kunyomi, allKunyomiPool),
        answer: kanji.kunyomi
      });
    }

    // Onyomi reading question (if valid)
    if (kanji.onyomi && kanji.onyomi !== "ー" && kanji.onyomi !== "-") {
      questions.push({
        id: `${level.toLowerCase()}_gen_kanji_o_${idx}`,
        type: "kanji",
        question: `What is the Onyomi reading of the Kanji '${kanji.char}'?`,
        options: getOptions(kanji.onyomi, allOnyomiPool),
        answer: kanji.onyomi
      });
    }
  });

  // 2. Generate Vocabulary questions
  const vocabList = vocabDatabase[level] || [];
  const allVocabMeanings = vocabList.map(v => v.en);
  const allVocabWords = vocabList.map(v => v.jp);

  vocabList.forEach((vocab, idx) => {
    // Vocab definition
    questions.push({
      id: `${level.toLowerCase()}_gen_vocab_d_${idx}`,
      type: "vocab",
      question: `What is the meaning of '${vocab.jp}' (${vocab.r || vocab.jp})?`,
      options: getOptions(vocab.en, allVocabMeanings),
      answer: vocab.en
    });

    // Vocab reverse translation
    questions.push({
      id: `${level.toLowerCase()}_gen_vocab_r_${idx}`,
      type: "vocab",
      question: `Which Japanese word means '${vocab.en}'?`,
      options: getOptions(vocab.jp, allVocabWords),
      answer: vocab.jp
    });
  });

  // 3. Generate Kana questions (only for N5)
  if (level === "N5") {
    // Hiragana identification
    const allHiraganaRomaji = hiraganaData.map(h => h.romaji);
    const allHiraganaChars = hiraganaData.map(h => h.char);

    hiraganaData.slice(0, 30).forEach((h, idx) => {
      questions.push({
        id: `n5_gen_h_rom_${idx}`,
        type: "kana",
        question: `Which romaji represents the Hiragana character '${h.char}'?`,
        options: getOptions(h.romaji, allHiraganaRomaji),
        answer: h.romaji
      });

      questions.push({
        id: `n5_gen_h_char_${idx}`,
        type: "kana",
        question: `Which Hiragana character represents '${h.romaji}'?`,
        options: getOptions(h.char, allHiraganaChars),
        answer: h.char
      });
    });

    // Katakana identification
    const allKatakanaRomaji = katakanaData.map(k => k.romaji);
    const allKatakanaChars = katakanaData.map(k => k.char);

    katakanaData.slice(0, 30).forEach((k, idx) => {
      questions.push({
        id: `n5_gen_k_rom_${idx}`,
        type: "kana",
        question: `Which romaji represents the Katakana character '${k.char}'?`,
        options: getOptions(k.romaji, allKatakanaRomaji),
        answer: k.romaji
      });

      questions.push({
        id: `n5_gen_k_char_${idx}`,
        type: "kana",
        question: `Which Katakana character represents '${k.romaji}'?`,
        options: getOptions(k.char, allKatakanaChars),
        answer: k.char
      });
    });
  }

  // Shuffle and return the complete generated pool
  return shuffle(questions);
}

// Export quizBank with getters for N5-N1 so accessing quizBank[level] dynamically triggers fresh questions
export const quizBank = {
  get N5() {
    return generateQuestionsForLevel("N5");
  },
  get N4() {
    return generateQuestionsForLevel("N4");
  },
  get N3() {
    return generateQuestionsForLevel("N3");
  },
  get N2() {
    return generateQuestionsForLevel("N2");
  },
  get N1() {
    return generateQuestionsForLevel("N1");
  }
};
