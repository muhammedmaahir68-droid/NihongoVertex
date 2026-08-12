export const syllabusData = {
  N5: {
    title: "JLPT N5 Syllabus: Basic Foundations",
    description: "Start your Japanese journey here. Learn basic writing systems (Hiragana, Katakana), 80 essential Kanji, and 25 lessons of grammar/vocab.",
    milestones: [
      {
        id: "n5_m1",
        title: "Kana Mastery",
        description: "Read and write all 104 Hiragana and 104 Katakana characters, including dakuon, handakuon, and yōon.",
        type: "kana",
        requiredCount: 208
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
        title: "Everyday Greetings & Topic Markers",
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
    description: "Build intermediate skills. Master complex grammar structures, casual speech, passive/causative verbs, and 170 Kanji.",
    milestones: [
      {
        id: "n4_m1",
        title: "N4 Core Kanji",
        description: "Learn 170 daily-life Kanji related to travel, communication, weather, and thinking.",
        type: "kanji",
        requiredCount: 16
      },
      {
        id: "n4_m2",
        title: "Potential & Conditional Clauses",
        description: "Master verb conjugations for ability (potential form) and conditions (たら, ば, と).",
        type: "grammar",
        description_long: "Understand how to express what you can do and describe logical sequences."
      },
      {
        id: "n4_m3",
        title: "Honorific & Humble Basics",
        description: "Introduction to Keigo (polite Japanese speech patterns used in service and corporate settings).",
        type: "grammar",
        description_long: "Learn basic structure of Sonkeigo and Kenjougo."
      }
    ]
  },
  N3: {
    title: "JLPT N3 Syllabus: Bridge to Fluency",
    description: "The bridge between classroom study and real-world Japanese. Learn ~370 Kanji, natural conversational constructs, and reading comprehension.",
    milestones: [
      {
        id: "n3_m1",
        title: "N3 Kanji Bridge",
        description: "Master 370 key newspaper and business Kanji characters.",
        type: "kanji",
        requiredCount: 12
      },
      {
        id: "n3_m2",
        title: "Nuanced Expressive Grammar",
        description: "Learn grammar expressions that show conjecture, expectations, regrets, and probability.",
        type: "grammar"
      },
      {
        id: "n3_m3",
        title: "Natural Paragraph Reading",
        description: "Comfortably read short articles, announcements, and medium-length stories with native flow.",
        type: "reading"
      }
    ]
  },
  N2: {
    title: "JLPT N2 Syllabus: Business Ready",
    description: "Prepare to work or study in Japan. Master ~380 advanced Kanji, formal prose, business writing rules, and fast-paced listening.",
    milestones: [
      {
        id: "n2_m1",
        title: "N2 Business Kanji",
        description: "Master 380 kanji essential for advanced reports, society, news, and administration.",
        type: "kanji",
        requiredCount: 10
      },
      {
        id: "n2_m2",
        title: "Formal Prose & Essays",
        description: "Study formal written grammar constructs used in news, novels, and professional reviews.",
        type: "grammar"
      },
      {
        id: "n2_m3",
        title: "Fluent Conversation Tracking",
        description: "Understand fast-paced discussions, natural speed interviews, and office dialogue.",
        type: "listening"
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
        description: "Complete database of over 600 advanced/literary Kanji.",
        type: "kanji",
        requiredCount: 10
      },
      {
        id: "n1_m2",
        title: "Classical & High-Level Rhetoric",
        description: "Learn rare grammar expressions, archaic roots, and high-register rhetoric used in intellectual publications.",
        type: "grammar"
      },
      {
        id: "n1_m3",
        title: "Academic Reading & Speech Comprehension",
        description: "Read abstract academic reports, philosophical columns, and track complex debate streams.",
        type: "advanced"
      }
    ]
  }
};
