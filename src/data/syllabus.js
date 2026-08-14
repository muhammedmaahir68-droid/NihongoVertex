export const syllabusData = {
  N5: {
    title: "JLPT N5 Syllabus: Basic Foundations",
    description: "Start your Japanese journey here. Learn basic writing systems (Hiragana, Katakana, including Dakuon, Handakuon, Yōon, and Small Kana), 80 essential Kanji, and 25 lessons of grammar/vocab.",
    milestones: [
      {
        id: "n5_m1",
        title: "Kana Mastery",
        description: "Read and write all Hiragana and Katakana characters, including dakuon, handakuon, yōon, and small kana.",
        type: "kana",
        requiredCount: 300
      },
      {
        id: "n5_m2",
        title: "N5 Basic Kanji",
        description: "Master all 80 elementary Kanji (numbers, days, directions, basic verbs).",
        type: "kanji",
        requiredCount: 80
      },
      {
        id: "n5_m3",
        title: "Greetings & Pointers",
        description: "Complete Lessons 1 to 8 covering は, の, も particles and basic pointers (これ, それ, あれ).",
        type: "lessons",
        lessons: [1, 2, 3, 4, 5, 6, 7, 8]
      },
      {
        id: "n5_m4",
        title: "Basic Actions & Existence",
        description: "Complete Lessons 9 to 15 covering verbs, locations, and existence patterns (あります / います).",
        type: "lessons",
        lessons: [9, 10, 11, 12, 13, 14, 15]
      },
      {
        id: "n5_m5",
        title: "Elementary Speech Patterns",
        description: "Complete Lessons 16 to 25 covering past tense, casual forms, wants (たいです), and polite requests.",
        type: "lessons",
        lessons: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
      }
    ]
  },
  N4: {
    title: "JLPT N4 Syllabus: Lower Intermediate",
    description: "Build intermediate skills. Master complex grammar structures, casual speech, passive/causative verbs, and 80 core N4 Kanji.",
    milestones: [
      {
        id: "n4_m1",
        title: "N4 Core Kanji",
        description: "Learn 80 daily-life Kanji related to travel, communication, weather, and thinking.",
        type: "kanji",
        requiredCount: 80
      },
      {
        id: "n4_m2",
        title: "Potential & Ability",
        description: "Complete Lessons 26 to 33 covering potential verbs, ability, and habits (～ながら).",
        type: "lessons",
        lessons: [26, 27, 28, 29, 30, 31, 32, 33]
      },
      {
        id: "n4_m3",
        title: "Conditions & Passive",
        description: "Complete Lessons 34 to 41 covering conditions (～ば), intentions (～ようと), and passive experiences.",
        type: "lessons",
        lessons: [34, 35, 36, 37, 38, 39, 40, 41]
      },
      {
        id: "n4_m4",
        title: "Honorifics & Consolidation",
        description: "Complete Lessons 42 to 50 covering appearance (～そう), honorifics, and humble speech.",
        type: "lessons",
        lessons: [42, 43, 44, 45, 46, 47, 48, 49, 50]
      }
    ]
  },
  N3: {
    title: "JLPT N3 Syllabus: Bridge to Fluency",
    description: "The bridge between classroom study and real-world Japanese. Learn 100 key Kanji, natural conversational constructs, and reading comprehension.",
    milestones: [
      {
        id: "n3_m1",
        title: "N3 Kanji Bridge",
        description: "Master 100 key newspaper and business Kanji characters.",
        type: "kanji",
        requiredCount: 100
      },
      {
        id: "n3_m2",
        title: "Intermediate Conjunctions",
        description: "Complete Lessons 51 to 55 covering natural conversational conjunctions and change of state.",
        type: "lessons",
        lessons: [51, 52, 53, 54, 55]
      },
      {
        id: "n3_m3",
        title: "Conjectures & Probability",
        description: "Complete Lessons 56 to 60 covering expectations, probability, and passive-causative patterns.",
        type: "lessons",
        lessons: [56, 57, 58, 59, 60]
      },
      {
        id: "n3_m4",
        title: "Reading & Keigo Focus",
        description: "Complete Lessons 61 to 65 covering formal notices, reading comprehension, and business speech.",
        type: "lessons",
        lessons: [61, 62, 63, 64, 65]
      }
    ]
  },
  N2: {
    title: "JLPT N2 Syllabus: Business Ready",
    description: "Prepare to work or study in Japan. Master 100 advanced Kanji, formal prose, business writing rules, and fast-paced listening.",
    milestones: [
      {
        id: "n2_m1",
        title: "N2 Business Kanji",
        description: "Master 100 kanji essential for advanced reports, society, news, and administration.",
        type: "kanji",
        requiredCount: 100
      },
      {
        id: "n2_m2",
        title: "Formal Written Patterns",
        description: "Complete Lessons 66 to 70 covering advanced formal written patterns and essays.",
        type: "lessons",
        lessons: [66, 67, 68, 69, 70]
      },
      {
        id: "n2_m3",
        title: "Office Dialogues & Stance",
        description: "Complete Lessons 71 to 75 covering natural speed workplace dialogues, news tracking, and opinion columns.",
        type: "lessons",
        lessons: [71, 72, 73, 74, 75]
      }
    ]
  },
  N1: {
    title: "JLPT N1 Syllabus: Master & Native level",
    description: "Full professional and academic fluency. Read complex editorial literature, research articles, and understand sophisticated social/philosophical nuances.",
    milestones: [
      {
        id: "n1_m1",
        title: "N1 Advanced Literary Kanji",
        description: "Complete database of over 100 advanced/literary Kanji.",
        type: "kanji",
        requiredCount: 100
      },
      {
        id: "n1_m2",
        title: "Archaic Roots & Rhetoric",
        description: "Complete Lessons 76 to 80 covering high-level rhetoric, rare grammar constructs, and formal notice templates.",
        type: "lessons",
        lessons: [76, 77, 78, 79, 80]
      },
      {
        id: "n1_m3",
        title: "Academic & Editorial Prose",
        description: "Complete Lessons 81 to 85 covering abstract philosophical writings, editorial columns, and multi-speaker debate streams.",
        type: "lessons",
        lessons: [81, 82, 83, 84, 85]
      }
    ]
  }
};
