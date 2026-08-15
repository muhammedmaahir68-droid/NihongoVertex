import { JLPT_CURRICULUM } from "./curriculum.js";

const staticQuizBank = {
  N5: [
    {
      id: "n5_q1",
      type: "kana",
      question: "Which romaji represents 'あ'?",
      options: ["i", "u", "a", "o"],
      answer: "a",
    },
    {
      id: "n5_q2",
      type: "kana",
      question: "Which Hiragana character represents 'ka'?",
      options: ["さ", "か", "た", "き"],
      answer: "か",
    },
    {
      id: "n5_q3",
      type: "vocab",
      question: "What is the meaning of 'ほん' (hon)? / 'ほん' என்பதன் பொருள் என்ன?",
      options: ["Water / தண்ணீர்", "Desk / மேசை", "Teacher / ஆசிரியர்", "Book / புத்தகம்"],
      answer: "Book / புத்தகம்",
    },
    {
      id: "n5_q4",
      type: "vocab",
      question: "Which Japanese word means 'umbrella' (குடை)?",
      options: ["かさ (kasa)", "つくえ (tsukue)", "ほん (hon)", "せんせい (sensei)"],
      answer: "かさ (kasa)",
    },
    {
      id: "n5_q5",
      type: "grammar",
      question: "Complete the sentence: 'これは ほん ______。' (This is a book / இது ஒரு புத்தகம்.)",
      options: ["です", "か", "は", "に"],
      answer: "です",
    },
    {
      id: "n5_q6",
      type: "grammar",
      question: "Which particle indicates possession? (e.g. 'My umbrella' / உடைமை குறியீடு)",
      options: ["は (wa)", "を (o)", "の (no)", "が (ga)"],
      answer: "の (no)",
    },
    {
      id: "n5_q7",
      type: "kanji",
      question: "What is the meaning of the Kanji '水'?",
      options: ["Fire", "Water", "Soil", "Tree"],
      answer: "Water",
    },
    {
      id: "n5_q8",
      type: "kanji",
      question: "What is the reading of the Kanji '三'?",
      options: ["Ichi", "Ni", "San", "Yon"],
      answer: "San",
    },
    {
      id: "n5_q9",
      type: "vocab",
      question: "What is the meaning of 'せんせい' (sensei)?",
      options: ["Doctor", "Teacher", "Student", "Engineer"],
      answer: "Teacher",
    },
    {
      id: "n5_q10",
      type: "grammar",
      question: "Complete the sentence: 'がっこう ______ いきます。' (I go to school / பள்ளிக்குச் செல்கிறேன்.)",
      options: ["を (o)", "へ (e)", "が (ga)", "は (wa)"],
      answer: "へ (e)",
    }
  ],
  N4: [
    {
      id: "n4_q1",
      type: "vocab",
      question: "What does '私' (watashi/watakushi) mean?",
      options: ["You", "I / Me", "He", "She"],
      answer: "I / Me",
    },
    {
      id: "n4_q2",
      type: "kanji",
      question: "Which Kanji represents 'sky / empty' (sora / kuu)?",
      options: ["空", "港", "海", "室"],
      answer: "空",
    },
    {
      id: "n4_q3",
      type: "grammar",
      question: "Complete the conditional form: 'あめが ______ たら、いきません。' (If it rains...)",
      options: ["ふり", "ふる", "ふっ", "ふら"],
      answer: "ふっ",
    },
    {
      id: "n4_q4",
      type: "vocab",
      question: "What is the meaning of 'こうくうびん' (koukuubin)?",
      options: ["Sea mail", "Airmail", "Special delivery", "Registered mail"],
      answer: "Airmail",
    }
  ],
  N3: [
    {
      id: "n3_q1",
      type: "kanji",
      question: "What is the meaning of '法律' (houritsu)?",
      options: ["Politics", "Method", "Constitution", "Law"],
      answer: "Law",
    },
    {
      id: "n3_q2",
      type: "grammar",
      question: "Which structure means 'looks like / seems like'?",
      options: ["〜そうだ", "〜はずだ", "〜わけだ", "〜ばかりだ"],
      answer: "〜そうだ",
    },
    {
      id: "n3_q3",
      type: "vocab",
      question: "What does '準備' (junbi) mean?",
      options: ["Equipment", "Preparation", "Solution", "Instruction"],
      answer: "Preparation",
    }
  ],
  N2: [
    {
      id: "n2_q1",
      type: "kanji",
      question: "What is the correct reading of '総理大臣' (prime minister)?",
      options: ["そうりだいじん", "そりだいしん", "そうりいたいじん", "ぞうりだいじん"],
      answer: "そうりだいじん",
    },
    {
      id: "n2_q2",
      type: "grammar",
      question: "What does the expression '〜にともなって' mean?",
      options: ["Instead of", "Along with / As a result of", "In contrast to", "Regardless of"],
      answer: "Along with / As a result of",
    }
  ],
  N1: [
    {
      id: "n1_q1",
      type: "kanji",
      question: "What is the meaning of the Kanji '鬱' (utsu)?",
      options: ["Sociable", "Haughty", "Gloom / Depression", "Ferment"],
      answer: "Gloom / Depression",
    },
    {
      id: "n1_q2",
      type: "vocab",
      question: "Choose the meaning of '懇切丁寧' (konsetsu-teinei):",
      options: ["Extremely kind and polite", "Careless and messy", "Arrogant and rude", "Doubtful and suspicious"],
      answer: "Extremely kind and polite",
    }
  ]
};

// Helper function to generate dynamic questions from Minna No Nihongo curriculum modules (Lessons 1-25 and above)
export function getLevelQuizBank(level = "N5") {
  const staticSet = staticQuizBank[level] || staticQuizBank.N5;
  const levelCurriculum = JLPT_CURRICULUM[level];
  if (!levelCurriculum || !levelCurriculum.modules) return staticSet;

  const dynamicQuestions = [];
  levelCurriculum.modules.forEach((mod, idx) => {
    if (mod.grammar && mod.grammar.length > 0) {
      const mainGrammar = mod.grammar[0];
      dynamicQuestions.push({
        id: `dyn_${level}_g_${idx}`,
        type: "grammar",
        question: `Lesson ${idx+1} [${mod.title} / ${mod.ta}]: Identify the main pattern for "${mainGrammar}"`,
        options: [mainGrammar, "～てから", "～たら", "～ば"],
        answer: mainGrammar
      });
    }
  });

  return [...staticSet, ...dynamicQuestions];
}

export const quizBank = staticQuizBank;

