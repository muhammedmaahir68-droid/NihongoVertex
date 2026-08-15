import React, { useState, useEffect, useMemo, useRef } from "react";
import { BookOpen, Home as HomeIcon, Layers, PenTool, Headphones, ListChecks, ClipboardCheck, AlertCircle, TrendingUp, Settings, Menu, X, Flame, Star, ChevronRight, ChevronLeft, Flag, Clock, CheckCircle2, XCircle, Play, Pause, RotateCcw, Award, Lock, Volume2, PenLine, Search, Sparkles, Bot, MessageCircle, CalendarCheck, Target, Briefcase, Send, Trophy, Bell, UserRound, Check, Zap } from "lucide-react";
import CharacterLabEngine from "./components/character-engine/CharacterLabEngine.jsx";
import { JLPT_CURRICULUM, CURRICULUM_STATS } from "./data/curriculum.js";

// ===== Data (N5: sourced from user-uploaded Minna no Nihongo I translation/grammar notes; N4-N1: sample from public JLPT references) =====
// Nihongo Vertex — N5 curriculum data
// Sourced from the structure of Minna no Nihongo I (Lessons 1-25), the user's own uploaded
// translation/grammar-note material. Tamil (TA) and English (EN) glosses are original.
// N4-N1 sample data is drawn from well-established public JLPT study references
// (JLPTsensei-style grammar groupings) and is explicitly marked as a sample/expandable set.

const LESSONS = [
  {
    "id": 1,
    "jp": "わたしは マイク・ミラーです",
    "en": "I am Mike Miller (Self-Introduction & Identity)",
    "ta": "நான் மைக் மில்லர் (சுய அறிமுகம்)",
    "vocab": [
      {
        "jp": "わたし",
        "r": "watashi",
        "en": "I / Me",
        "ta": "நான்"
      },
      {
        "jp": "あなた",
        "r": "anata",
        "en": "you",
        "ta": "நீங்கள்"
      },
      {
        "jp": "あのひと",
        "r": "anohito",
        "en": "that person",
        "ta": "அவர்"
      },
      {
        "jp": "あのかた",
        "r": "anokata",
        "en": "that person (polite)",
        "ta": "அவர் (மரியாதை)"
      },
      {
        "jp": "～さん",
        "r": "san",
        "en": "Mr./Ms.",
        "ta": "திரு/திருமதி"
      },
      {
        "jp": "～ちゃん",
        "r": "chan",
        "en": "Suffix for children",
        "ta": "குழந்தை பின்னொட்டு"
      },
      {
        "jp": "～じん",
        "r": "jin",
        "en": "Nationality suffix",
        "ta": "நாட்டினர்"
      },
      {
        "jp": "せんせい",
        "r": "sensei",
        "en": "Teacher (title)",
        "ta": "ஆசிரியர்"
      },
      {
        "jp": "きょうし",
        "r": "kyoushi",
        "en": "Teacher (occupation)",
        "ta": "ஆசிரியர் (தொழில்)"
      },
      {
        "jp": "がくせい",
        "r": "gakusei",
        "en": "Student",
        "ta": "மாணவர்"
      },
      {
        "jp": "かいしゃいん",
        "r": "kaishain",
        "en": "Company employee",
        "ta": "நிறுவன ஊழியர்"
      },
      {
        "jp": "しゃいん",
        "r": "shain",
        "en": "Employee of ~ company",
        "ta": "ஊழியர்"
      },
      {
        "jp": "ぎんこういん",
        "r": "ginkouin",
        "en": "Bank employee",
        "ta": "வங்கி ஊழியர்"
      },
      {
        "jp": "いしゃ",
        "r": "isha",
        "en": "Medical doctor",
        "ta": "மருத்துவர்"
      },
      {
        "jp": "けんきゅうしゃ",
        "r": "kenkyuusha",
        "en": "Researcher",
        "ta": "ஆராய்ச்சியாளர்"
      },
      {
        "jp": "エンジニア",
        "r": "enjinia",
        "en": "Engineer",
        "ta": "பொறியாளர்"
      },
      {
        "jp": "だいがく",
        "r": "daigaku",
        "en": "University",
        "ta": "பல்கலைக்கழகம்"
      },
      {
        "jp": "びょういん",
        "r": "byouin",
        "en": "Hospital",
        "ta": "மருத்துவமனை"
      },
      {
        "jp": "でんき",
        "r": "denki",
        "en": "Electricity / Light",
        "ta": "மின்சாரம்"
      },
      {
        "jp": "だれ",
        "r": "dare",
        "en": "Who",
        "ta": "யார்"
      },
      {
        "jp": "どなた",
        "r": "donata",
        "en": "Who (polite)",
        "ta": "யார் (மரியாதை)"
      },
      {
        "jp": "～さい",
        "r": "sai",
        "en": "Years old",
        "ta": "வயது"
      },
      {
        "jp": "なんさい",
        "r": "nansai",
        "en": "How old?",
        "ta": "எத்தனை வயது?"
      },
      {
        "jp": "はい",
        "r": "hai",
        "en": "Yes",
        "ta": "ஆம்"
      },
      {
        "jp": "いいえ",
        "r": "iie",
        "en": "No",
        "ta": "இல்லை"
      },
      {
        "jp": "はじめまして",
        "r": "hajimemashite",
        "en": "How do you do?",
        "ta": "வணக்கம் (முதல் சந்திப்பு)"
      },
      {
        "jp": "～から きました",
        "r": "kara kimashita",
        "en": "I came from ~",
        "ta": "~லிருந்து வந்தேன்"
      },
      {
        "jp": "どうぞ よろしく",
        "r": "douzo yoroshiku",
        "en": "Pleased to meet you",
        "ta": "உங்களைச் சந்திப்பதில் மகிழ்ச்சி"
      }
    ],
    "grammar": [
      {
        "t": "N1 は N2 です",
        "en": "N1 is N2 (Topic marker は, predicate です)",
        "ta": "N1 என்பது N2 ஆகும் (は தலைப்பு குறியீடு)",
        "form": "Noun1 + は + Noun2 + です",
        "ex": {
          "jp": "わたしは マイク・ミラーです。",
          "en": "I am Mike Miller.",
          "ta": "நான் மைக் மில்லர்."
        }
      },
      {
        "t": "N1 は N2 じゃありません",
        "en": "N1 is not N2 (Negative form)",
        "ta": "N1 என்பது N2 இல்லை (எதிர்மறை)",
        "form": "Noun1 + は + Noun2 + じゃありません / ではありません",
        "ex": {
          "jp": "サントスさんは 学生じゃありません。",
          "en": "Mr Santos is not a student.",
          "ta": "திரு சாண்டோஸ் மாணவர் இல்லை."
        }
      },
      {
        "t": "S か (Question Form)",
        "en": "Particle か turns a sentence into a question",
        "ta": "か வாக்கியத்தை வினாவாக மாற்றுகிறது",
        "form": "Sentence + か",
        "ex": {
          "jp": "ミラーさんは 会社員ですか。",
          "en": "Is Mr Miller a company employee?",
          "ta": "திரு மில்லர் நிறுவன ஊழியரா?"
        }
      },
      {
        "t": "N も (Also / Too)",
        "en": "Particle も means 'also' or 'too'",
        "ta": "も என்பது 'கூட' அல்லது 'உம்' பொருள்",
        "form": "Noun + も",
        "ex": {
          "jp": "サントスさんも 会社員です。",
          "en": "Mr Santos is also a company employee.",
          "ta": "திரு சாண்டோஸும் நிறுவன ஊழியர்."
        }
      },
      {
        "t": "N1 の N2 (Possessive & Affiliation)",
        "en": "Particle の connects two nouns",
        "ta": "の உடைமை அல்லது அமைப்பைக் குறிக்கிறது",
        "form": "Noun1 + の + Noun2",
        "ex": {
          "jp": "ミラーさんは IMCの 社員です。",
          "en": "Mr Miller is an employee of IMC.",
          "ta": "திரு மில்லர் IMC இன் ஊழியர்."
        }
      }
    ],
    "quiz": [
      {
        "q": "What is the meaning of 'がくせい' (gakusei)?",
        "options": [
          "Teacher",
          "Student",
          "Doctor",
          "Engineer"
        ],
        "answer": "Student",
        "explain": "がくせい means student (மாணவர்)."
      },
      {
        "q": "Complete the sentence: わたし ______ マイク・ミラーです。",
        "options": [
          "は",
          "の",
          "を",
          "へ"
        ],
        "answer": "は",
        "explain": "Topic marker は (wa) is used after the subject わたし."
      },
      {
        "q": "Which particle means 'also' or 'too'?",
        "options": [
          "も",
          "は",
          "に",
          "で"
        ],
        "answer": "も",
        "explain": "Particle も means also/too."
      }
    ]
  },
  {
    "id": 2,
    "jp": "これ は ほん です",
    "en": "This is a book (Demonstratives & Ownership)",
    "ta": "இது ஒரு புத்தகம் (சுட்டுச் சொற்கள்)",
    "vocab": [
      {
        "jp": "これ",
        "r": "kore",
        "en": "this (thing here)",
        "ta": "இது (என் அருகில்)"
      },
      {
        "jp": "それ",
        "r": "sore",
        "en": "that (thing near listener)",
        "ta": "அது (உன் அருகில்)"
      },
      {
        "jp": "あれ",
        "r": "are",
        "en": "that (thing over there)",
        "ta": "அது (தூரத்தில்)"
      },
      {
        "jp": "この～",
        "r": "kono",
        "en": "this ~ (thing/person)",
        "ta": "இந்த ~"
      },
      {
        "jp": "その～",
        "r": "sono",
        "en": "that ~ (thing/person)",
        "ta": "அந்த ~"
      },
      {
        "jp": "あの～",
        "r": "ano",
        "en": "that ~ over there",
        "ta": "அந்த ~ (தூரத்தில்)"
      },
      {
        "jp": "ほん",
        "r": "hon",
        "en": "book",
        "ta": "புத்தகம்"
      },
      {
        "jp": "じしょ",
        "r": "jisho",
        "en": "dictionary",
        "ta": "அகராதி"
      },
      {
        "jp": "ざっし",
        "r": "zasshi",
        "en": "magazine",
        "ta": "பத்திரிகை"
      },
      {
        "jp": "しんぶん",
        "r": "shinbun",
        "en": "newspaper",
        "ta": "செய்தித்தாள்"
      },
      {
        "jp": "ノート",
        "r": "no-to",
        "en": "notebook",
        "ta": "நோட்டுப் புத்தகம்"
      },
      {
        "jp": "てちょう",
        "r": "techou",
        "en": "pocket notebook",
        "ta": "கை ஏடு"
      },
      {
        "jp": "めいし",
        "r": "meishi",
        "en": "business card",
        "ta": "முகவரி அட்டை"
      },
      {
        "jp": "カード",
        "r": "ka-do",
        "en": "credit card",
        "ta": "அட்டை"
      },
      {
        "jp": "えんぴつ",
        "r": "enpitsu",
        "en": "pencil",
        "ta": "பென்சில்"
      },
      {
        "jp": "ボールペン",
        "r": "bo-rupen",
        "en": "ballpoint pen",
        "ta": "பேனா"
      },
      {
        "jp": "シャープペンシル",
        "r": "sha-pupenshiru",
        "en": "mechanical pencil",
        "ta": "பென்சில்"
      },
      {
        "jp": "かぎ",
        "r": "kagi",
        "en": "key",
        "ta": "சாவி"
      },
      {
        "jp": "とけい",
        "r": "tokei",
        "en": "watch / clock",
        "ta": "கடிகாரம்"
      },
      {
        "jp": "かさ",
        "r": "kasa",
        "en": "umbrella",
        "ta": "குடை"
      },
      {
        "jp": "かばん",
        "r": "kaban",
        "en": "bag",
        "ta": "பை"
      },
      {
        "jp": "テレビ",
        "r": "terebi",
        "en": "television",
        "ta": "தொலைக்காட்சி"
      },
      {
        "jp": "ラジオ",
        "r": "rajio",
        "en": "radio",
        "ta": "வானொலி"
      },
      {
        "jp": "カメラ",
        "r": "kamera",
        "en": "camera",
        "ta": "கேமரா"
      },
      {
        "jp": "コンピューター",
        "r": "konpyu-ta-",
        "en": "computer",
        "ta": "கணினி"
      },
      {
        "jp": "くるま",
        "r": "kuruma",
        "en": "car / vehicle",
        "ta": "கார்"
      },
      {
        "jp": "つくえ",
        "r": "tsukue",
        "en": "desk",
        "ta": "மேசை"
      },
      {
        "jp": "いす",
        "r": "isu",
        "en": "chair",
        "ta": "நாற்காலி"
      },
      {
        "jp": "チョコレート",
        "r": "chokore-to",
        "en": "chocolate",
        "ta": "சாக்லேட்"
      },
      {
        "jp": "コーヒー",
        "r": "ko-hi-",
        "en": "coffee",
        "ta": "காபி"
      },
      {
        "jp": "なん",
        "r": "nan",
        "en": "what",
        "ta": "என்ன"
      },
      {
        "jp": "そう",
        "r": "sou",
        "en": "so / like that",
        "ta": "அப்படி"
      }
    ],
    "grammar": [
      {
        "t": "これ / それ / あれ",
        "en": "Demonstratives referring to objects based on distance",
        "ta": "தொலைவின் அடிப்படையில் பொருள்களை சுட்டிக்காட்டுதல்",
        "form": "これ/それ/あれ + は + Noun + です",
        "ex": {
          "jp": "これは 辞書です。",
          "en": "This is a dictionary.",
          "ta": "இது ஒரு அகராதி."
        }
      },
      {
        "t": "この N / その N / あの N",
        "en": "Demonstrative determiners attached directly to a noun",
        "ta": "பெயர்ச்சொல்லுடன் நேரடியாகச் சேரும் சுட்டு",
        "form": "この/その/あの + Noun + は...",
        "ex": {
          "jp": "この 本は わたしのです。",
          "en": "This book is mine.",
          "ta": "இந்த புத்தகம் என்னுடையது."
        }
      },
      {
        "t": "そうです / そうじゃありません",
        "en": "Affirmative and negative agreement to Noun predicate questions",
        "ta": "வினாவுக்கு ஆம்/இல்லை பதில்",
        "form": "はい、そうです。 / いいえ、そうじゃありません。",
        "ex": {
          "jp": "「それは 辞書ですか。」「はい、そうです。」",
          "en": "'Is that a dictionary?' 'Yes, it is.'",
          "ta": "'அது அகராதியா?' 'ஆம், அதுதான்.'"
        }
      },
      {
        "t": "S1 か、S2 か (Alternative Questions)",
        "en": "Question offering choices between S1 and S2",
        "ta": "தெரிவு வினாக்கள்",
        "form": "S1 か、S2 か",
        "ex": {
          "jp": "これは 「９」ですか、「７」ですか。",
          "en": "Is this a '9' or a '7'?",
          "ta": "இது '9' ஆ அல்லது '7' ஆ?"
        }
      },
      {
        "t": "N1 の N2 (Possession & Subject matter)",
        "en": "の indicates owner or topic of an object",
        "ta": "உடைமை அல்லது தலைப்பைக் குறிக்கும் の",
        "form": "Noun1 + の + Noun2",
        "ex": {
          "jp": "これは コンピューターの 本です。",
          "en": "This is a computer book.",
          "ta": "இது கணினி பற்றிய புத்தகம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "What is the meaning of 'かさ' (kasa)?",
        "options": [
          "Bag",
          "Umbrella",
          "Key",
          "Watch"
        ],
        "answer": "Umbrella",
        "explain": "かさ means umbrella (குடை)."
      },
      {
        "q": "Complete: この ほんは わたし ______ です。",
        "options": [
          "の",
          "は",
          "を",
          "に"
        ],
        "answer": "の",
        "explain": "の (no) indicates possession ('mine')."
      },
      {
        "q": "Which demonstrative means 'this thing right here'?",
        "options": [
          "それ",
          "あれ",
          "これ",
          "どの"
        ],
        "answer": "これ",
        "explain": "これ means this thing near the speaker."
      }
    ]
  },
  {
    "id": 3,
    "jp": "ここ は しょくどう です",
    "en": "This is the cafeteria (Locations & Places)",
    "ta": "இது உணவகம் (இடங்கள்)",
    "vocab": [
      {
        "jp": "ここ",
        "r": "koko",
        "en": "here / this place",
        "ta": "இங்கே"
      },
      {
        "jp": "そこ",
        "r": "soko",
        "en": "there / that place",
        "ta": "அங்கே"
      },
      {
        "jp": "あそこ",
        "r": "asoko",
        "en": "over there",
        "ta": "அங்கே (தூரத்தில்)"
      },
      {
        "jp": "どこ",
        "r": "doko",
        "en": "where",
        "ta": "எங்கே"
      },
      {
        "jp": "こちら",
        "r": "kochira",
        "en": "this direction / place (polite)",
        "ta": "இந்தப் பக்கம் / இடம்"
      },
      {
        "jp": "そちら",
        "r": "sochira",
        "en": "that direction / place (polite)",
        "ta": "அந்தப் பக்கம்"
      },
      {
        "jp": "あちら",
        "r": "achira",
        "en": "that direction over there (polite)",
        "ta": "அப்பக்கம் (தூரத்தில்)"
      },
      {
        "jp": "どちら",
        "r": "dochira",
        "en": "which direction / place (polite)",
        "ta": "எந்தப் பக்கம் / இடம்"
      },
      {
        "jp": "きょうしつ",
        "r": "kyoushitsu",
        "en": "classroom",
        "ta": "வகுப்பறை"
      },
      {
        "jp": "しょくどう",
        "r": "shokudou",
        "en": "dining hall / cafeteria",
        "ta": "உணவகம்"
      },
      {
        "jp": "じむしょ",
        "r": "jimusho",
        "en": "office",
        "ta": "அலுவலகம்"
      },
      {
        "jp": "かいぎしつ",
        "r": "kaigishitsu",
        "en": "meeting room",
        "ta": "கூட்ட அரங்கு"
      },
      {
        "jp": "うけつけ",
        "r": "uketsuke",
        "en": "reception desk",
        "ta": "வரவேற்பறை"
      },
      {
        "jp": "ロビー",
        "r": "robi-",
        "en": "lobby",
        "ta": "வரவேற்பு மண்டபம்"
      },
      {
        "jp": "へや",
        "r": "heya",
        "en": "room",
        "ta": "அறை"
      },
      {
        "jp": "トイレ / おてあらい",
        "r": "toire / otearai",
        "en": "toilet / restroom",
        "ta": "கழிப்பறை"
      },
      {
        "jp": "かいだん",
        "r": "kaidan",
        "en": "staircase",
        "ta": "படிக்கட்டு"
      },
      {
        "jp": "エレベーター",
        "r": "erebe-ta-",
        "en": "elevator / lift",
        "ta": "மின்நூலேணி (லிப்ட்)"
      },
      {
        "jp": "エスカレーター",
        "r": "esukare-ta-",
        "en": "escalator",
        "ta": "நகரும் படிக்கட்டு"
      },
      {
        "jp": "じどうはんばいき",
        "r": "jidouhanbaiki",
        "en": "vending machine",
        "ta": "தானியங்கி விற்பனை இயந்திரம்"
      },
      {
        "jp": "でんわ",
        "r": "denwa",
        "en": "telephone / call",
        "ta": "தொலைபேசி"
      },
      {
        "jp": "おくに",
        "r": "okuni",
        "en": "country / homeland",
        "ta": "நாடு"
      },
      {
        "jp": "かいしゃ",
        "r": "kaisha",
        "en": "company",
        "ta": "நிறுவனம்"
      },
      {
        "jp": "うち",
        "r": "uchi",
        "en": "house / home",
        "ta": "வீடு"
      },
      {
        "jp": "くつ",
        "r": "kutsu",
        "en": "shoes",
        "ta": "காலணி"
      },
      {
        "jp": "ネクタイ",
        "r": "nekutai",
        "en": "necktie",
        "ta": "டை"
      },
      {
        "jp": "ワイン",
        "r": "wain",
        "en": "wine",
        "ta": "ஒயின்"
      },
      {
        "jp": "うりば",
        "r": "uriba",
        "en": "sales counter / department",
        "ta": "விற்பனை பிரிவு"
      },
      {
        "jp": "ちか",
        "r": "chika",
        "en": "basement",
        "ta": "தரைக்கீழ் தளம்"
      },
      {
        "jp": "～かい / ～がい",
        "r": "kai / gai",
        "en": "~th floor",
        "ta": "~ஆம் தளம்"
      },
      {
        "jp": "なんがい",
        "r": "nangai",
        "en": "which floor?",
        "ta": "எந்த தளம்?"
      },
      {
        "jp": "～えん",
        "r": "en",
        "en": "~ yen",
        "ta": "~ யென்"
      },
      {
        "jp": "いくら",
        "r": "ikura",
        "en": "how much?",
        "ta": "எவ்வளவு?"
      }
    ],
    "grammar": [
      {
        "t": "ここ / そこ / あそこ",
        "en": "Demonstratives referring to locations",
        "ta": "இடங்களைச் சுட்டிக்காட்டும் சொற்கள்",
        "form": "ここ/そこ/あそこ + は + Noun (場所) + です",
        "ex": {
          "jp": "ここは 食堂です。",
          "en": "This is the cafeteria.",
          "ta": "இது உணவகம்."
        }
      },
      {
        "t": "N1 は 場所 です",
        "en": "Identifying where a person, item or place is located",
        "ta": "நபர் அல்லது பொருளின் இருப்பிடத்தைக் கூறுதல்",
        "form": "Noun + は + Place + です",
        "ex": {
          "jp": "お手洗いは あそこです。",
          "en": "The restroom is over there.",
          "ta": "கழிப்பறை அங்கே உள்ளது."
        }
      },
      {
        "t": "どこ / どちら",
        "en": "Asking for locations or origins",
        "ta": "இடம் அல்லது நாட்டை வினவுதல்",
        "form": "N は どこ / どちら ですか。",
        "ex": {
          "jp": "お国は どちらですか。",
          "en": "Which country are you from?",
          "ta": "உங்கள் நாடு எது?"
        }
      },
      {
        "t": "N1 の N2 (Country/Company of Origin)",
        "en": "の indicating manufacturer or country of production",
        "ta": "தயாரிப்பு நாடு அல்லது நிறுவனத்தைக் குறிக்கும் の",
        "form": "Country/Company + の + Product",
        "ex": {
          "jp": "これは 日本の ワインです。",
          "en": "This is Japanese wine.",
          "ta": "இது ஜப்பானிய ஒயின்."
        }
      }
    ],
    "quiz": [
      {
        "q": "What does 'しょくどう' (shokudou) mean?",
        "options": [
          "Office",
          "Cafeteria",
          "Classroom",
          "Hospital"
        ],
        "answer": "Cafeteria",
        "explain": "しょくどう means cafeteria (உணவகம்)."
      },
      {
        "q": "Which question word means 'which direction / place' politely?",
        "options": [
          "どこ",
          "どちら",
          "だれ",
          "なん"
        ],
        "answer": "どちら",
        "explain": "どちら is polite for where/which direction."
      },
      {
        "q": "Complete: トイレは あそこ ______ です。",
        "options": [
          "は",
          "の",
          "で",
          "へ"
        ],
        "answer": "は",
        "explain": "Topic marker は specifies the subject 'toilet'."
      }
    ]
  },
  {
    "id": 4,
    "jp": "いま なんじですか",
    "en": "What time is it now? (Time, Schedule & Verbs)",
    "ta": "இப்போது என்ன நேரம்? (நேரம்)",
    "vocab": [
      {
        "jp": "いま",
        "r": "ima",
        "en": "now",
        "ta": "இப்போது"
      },
      {
        "jp": "～じ",
        "r": "ji",
        "en": "o'clock",
        "ta": "மணி"
      },
      {
        "jp": "～ふん/ぷん",
        "r": "fun/pun",
        "en": "minutes",
        "ta": "நிமிடம்"
      },
      {
        "jp": "はん",
        "r": "han",
        "en": "half past",
        "ta": "அரை"
      },
      {
        "jp": "なんじ",
        "r": "nanji",
        "en": "what time?",
        "ta": "எத்தனை மணி?"
      },
      {
        "jp": "なんぷん",
        "r": "nanpun",
        "en": "how many minutes?",
        "ta": "எத்தனை நிமிடம்?"
      },
      {
        "jp": "ごぜん",
        "r": "gozen",
        "en": "a.m. / morning",
        "ta": "காலை"
      },
      {
        "jp": "ごご",
        "r": "gogo",
        "en": "p.m. / afternoon",
        "ta": "மதியம்"
      },
      {
        "jp": "あさ",
        "r": "asa",
        "en": "morning",
        "ta": "காலை"
      },
      {
        "jp": "ひる",
        "r": "hiru",
        "en": "daytime / noon",
        "ta": "பகல்"
      },
      {
        "jp": "ばん/よる",
        "r": "ban/yoru",
        "en": "night / evening",
        "ta": "இரவு"
      },
      {
        "jp": "おきます",
        "r": "okimasu",
        "en": "to get up",
        "ta": "எழுந்திருத்தல்"
      },
      {
        "jp": "ねます",
        "r": "nemasu",
        "en": "to sleep",
        "ta": "தூங்குதல்"
      },
      {
        "jp": "はたらきます",
        "r": "hatarakimasu",
        "en": "to work",
        "ta": "வேலை செய்தல்"
      },
      {
        "jp": "やすみます",
        "r": "yasumimasu",
        "en": "to rest / take a holiday",
        "ta": "ஓய்வெடுத்தல்"
      },
      {
        "jp": "べんきょうします",
        "r": "benkyoushimasu",
        "en": "to study",
        "ta": "படித்தல்"
      },
      {
        "jp": "おわります",
        "r": "owarimasu",
        "en": "to finish",
        "ta": "முடிவடைதல்"
      },
      {
        "jp": "デパート",
        "r": "depa-to",
        "en": "department store",
        "ta": "துணிக்கடை"
      },
      {
        "jp": "ぎんこう",
        "r": "ginkou",
        "en": "bank",
        "ta": "வங்கி"
      },
      {
        "jp": "ゆうびんきょく",
        "r": "yuubinkyoku",
        "en": "post office",
        "ta": "அஞ்சலகம்"
      },
      {
        "jp": "としょかん",
        "r": "toshokan",
        "en": "library",
        "ta": "நூலகம்"
      },
      {
        "jp": "びじゅつかん",
        "r": "bijutsukan",
        "en": "art museum",
        "ta": "அருங்காட்சியகம்"
      },
      {
        "jp": "きょう",
        "r": "kyou",
        "en": "today",
        "ta": "இன்று"
      },
      {
        "jp": "あした",
        "r": "ashita",
        "en": "tomorrow",
        "ta": "நாளை"
      },
      {
        "jp": "あさって",
        "r": "asatte",
        "en": "day after tomorrow",
        "ta": "நாளை மறுநாள்"
      },
      {
        "jp": "きのう",
        "r": "kinou",
        "en": "yesterday",
        "ta": "நேற்று"
      },
      {
        "jp": "おととい",
        "r": "ototoi",
        "en": "day before yesterday",
        "ta": "நேற்று முன்தினம்"
      },
      {
        "jp": "けさ",
        "r": "kesa",
        "en": "this morning",
        "ta": "இன்று காலை"
      },
      {
        "jp": "こんばん",
        "r": "konban",
        "en": "tonight",
        "ta": "இன்று இரவு"
      },
      {
        "jp": "やすみ",
        "r": "yasumi",
        "en": "rest / day off",
        "ta": "விடுமுறை"
      },
      {
        "jp": "ひるやすみ",
        "r": "hiruyasumi",
        "en": "lunch break",
        "ta": "மதிய உணவு இடைவேளை"
      },
      {
        "jp": "まいあさ",
        "r": "maiasa",
        "en": "every morning",
        "ta": "ஒவ்வொரு காலையும்"
      },
      {
        "jp": "まいばん",
        "r": "maiban",
        "en": "every night",
        "ta": "ஒவ்வொரு இரவும்"
      },
      {
        "jp": "まいにち",
        "r": "mainichi",
        "en": "every day",
        "ta": "ஒவ்வொரு நாளும்"
      },
      {
        "jp": "げつようび",
        "r": "getsuyoubi",
        "en": "Monday",
        "ta": "திங்கள்கிழமை"
      },
      {
        "jp": "かようび",
        "r": "kayoubi",
        "en": "Tuesday",
        "ta": "செவ்வாய்க்கிழமை"
      },
      {
        "jp": "すいようび",
        "r": "suiyoubi",
        "en": "Wednesday",
        "ta": "புதன்கிழமை"
      },
      {
        "jp": "もくようび",
        "r": "mokuyoubi",
        "en": "Thursday",
        "ta": "வியாழக்கிழமை"
      },
      {
        "jp": "きんようび",
        "r": "kinyoubi",
        "en": "Friday",
        "ta": "வெள்ளிக்கிழமை"
      },
      {
        "jp": "どようび",
        "r": "doyoubi",
        "en": "Saturday",
        "ta": "சனிக்கிழமை"
      },
      {
        "jp": "にちようび",
        "r": "nichiyoubi",
        "en": "Sunday",
        "ta": "ஞாயிற்றுக்கிழமை"
      },
      {
        "jp": "なんようび",
        "r": "nanyoubi",
        "en": "what day of the week?",
        "ta": "என்ன கிழமை?"
      },
      {
        "jp": "～から",
        "r": "kara",
        "en": "from ~",
        "ta": "~லிருந்து"
      },
      {
        "jp": "～まで",
        "r": "made",
        "en": "to / until ~",
        "ta": "~வரை"
      },
      {
        "jp": "～と～",
        "r": "to",
        "en": "and (connecting nouns)",
        "ta": "மற்றும்"
      }
    ],
    "grammar": [
      {
        "t": "～時 ～分です",
        "en": "Tell exact time",
        "ta": "நேரம் கூறுதல்",
        "form": "Time + です",
        "ex": {
          "jp": "いま 9じ 30ふんです。",
          "en": "いま 9じ 30ふんです。",
          "ta": "いま 9じ 30ふんです。"
        }
      },
      {
        "t": "Verb ます / ません / ました / ませんでした",
        "en": "Verb non-past and past tenses",
        "ta": "வினைச்சொல் காலங்கள்",
        "form": "Verb-stem + ます/ません/ました",
        "ex": {
          "jp": "まいあさ 6じに おきます。",
          "en": "まいあさ 6じに おきます。",
          "ta": "まいあさ 6じに おきます。"
        }
      },
      {
        "t": "S1 から S2 まで",
        "en": "Time range from ~ to ~",
        "ta": "~லிருந்து ~வரை",
        "form": "Time1 + から + Time2 + まで",
        "ex": {
          "jp": "9じから 5じまで はたらきます。",
          "en": "9じから 5じまで はたらきます。",
          "ta": "9じから 5じまで はたらきます。"
        }
      },
      {
        "t": "N1 と N2",
        "en": "Connecting nouns with 'and'",
        "ta": "மற்றும்",
        "form": "Noun1 + と + Noun2",
        "ex": {
          "jp": "ぎんこうの やすみは どようびと にちようびです。",
          "en": "ぎんこうの やすみは どようびと にちようびです。",
          "ta": "ぎんこうの やすみは どようびと にちようびです。"
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 4: What is the meaning of 'いま' (ima)?",
        "options": [
          "now",
          "Water",
          "Book",
          "School"
        ],
        "answer": "now",
        "explain": "'いま' means now (இப்போது)."
      },
      {
        "q": "Lesson 4: Identify the main grammar structure.",
        "options": [
          "～時 ～分です",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "～時 ～分です",
        "explain": "Lesson 4 focuses on ～時 ～分です."
      }
    ]
  },
  {
    "id": 4,
    "jp": "いま なんじですか",
    "en": "What time is it now? (Time, Schedule & Verbs)",
    "ta": "இப்போது என்ன நேரம்? (நேரம்)",
    "vocab": [
      {
        "jp": "いま",
        "r": "ima",
        "en": "now",
        "ta": "இப்போது"
      },
      {
        "jp": "～じ",
        "r": "ji",
        "en": "o'clock",
        "ta": "மணி"
      },
      {
        "jp": "～ふん/ぷん",
        "r": "fun/pun",
        "en": "minutes",
        "ta": "நிமிடம்"
      },
      {
        "jp": "はん",
        "r": "han",
        "en": "half past",
        "ta": "அரை"
      },
      {
        "jp": "なんじ",
        "r": "nanji",
        "en": "what time?",
        "ta": "எத்தனை மணி?"
      },
      {
        "jp": "なんぷん",
        "r": "nanpun",
        "en": "how many minutes?",
        "ta": "எத்தனை நிமிடம்?"
      },
      {
        "jp": "ごぜん",
        "r": "gozen",
        "en": "a.m. / morning",
        "ta": "காலை"
      },
      {
        "jp": "ごご",
        "r": "gogo",
        "en": "p.m. / afternoon",
        "ta": "மதியம்"
      },
      {
        "jp": "あさ",
        "r": "asa",
        "en": "morning",
        "ta": "காலை"
      },
      {
        "jp": "ひる",
        "r": "hiru",
        "en": "daytime / noon",
        "ta": "பகல்"
      },
      {
        "jp": "ばん/よる",
        "r": "ban/yoru",
        "en": "night / evening",
        "ta": "இரவு"
      },
      {
        "jp": "おきます",
        "r": "okimasu",
        "en": "to get up",
        "ta": "எழுந்திருத்தல்"
      },
      {
        "jp": "ねます",
        "r": "nemasu",
        "en": "to sleep",
        "ta": "தூங்குதல்"
      },
      {
        "jp": "はたらきます",
        "r": "hatarakimasu",
        "en": "to work",
        "ta": "வேலை செய்தல்"
      },
      {
        "jp": "やすみます",
        "r": "yasumimasu",
        "en": "to rest / take a holiday",
        "ta": "ஓய்வெடுத்தல்"
      },
      {
        "jp": "べんきょうします",
        "r": "benkyoushimasu",
        "en": "to study",
        "ta": "படித்தல்"
      },
      {
        "jp": "おわります",
        "r": "owarimasu",
        "en": "to finish",
        "ta": "முடிவடைதல்"
      },
      {
        "jp": "デパート",
        "r": "depa-to",
        "en": "department store",
        "ta": "துணிக்கடை"
      },
      {
        "jp": "ぎんこう",
        "r": "ginkou",
        "en": "bank",
        "ta": "வங்கி"
      },
      {
        "jp": "ゆうびんきょく",
        "r": "yuubinkyoku",
        "en": "post office",
        "ta": "அஞ்சலகம்"
      },
      {
        "jp": "としょかん",
        "r": "toshokan",
        "en": "library",
        "ta": "நூலகம்"
      },
      {
        "jp": "びじゅつかん",
        "r": "bijutsukan",
        "en": "art museum",
        "ta": "அருங்காட்சியகம்"
      },
      {
        "jp": "きょう",
        "r": "kyou",
        "en": "today",
        "ta": "இன்று"
      },
      {
        "jp": "あした",
        "r": "ashita",
        "en": "tomorrow",
        "ta": "நாளை"
      },
      {
        "jp": "あさって",
        "r": "asatte",
        "en": "day after tomorrow",
        "ta": "நாளை மறுநாள்"
      },
      {
        "jp": "きのう",
        "r": "kinou",
        "en": "yesterday",
        "ta": "நேற்று"
      },
      {
        "jp": "おととい",
        "r": "ototoi",
        "en": "day before yesterday",
        "ta": "நேற்று முன்தினம்"
      },
      {
        "jp": "けさ",
        "r": "kesa",
        "en": "this morning",
        "ta": "இன்று காலை"
      },
      {
        "jp": "こんばん",
        "r": "konban",
        "en": "tonight",
        "ta": "இன்று இரவு"
      },
      {
        "jp": "やすみ",
        "r": "yasumi",
        "en": "rest / day off",
        "ta": "விடுமுறை"
      },
      {
        "jp": "ひるやすみ",
        "r": "hiruyasumi",
        "en": "lunch break",
        "ta": "மதிய உணவு இடைவேளை"
      },
      {
        "jp": "まいあさ",
        "r": "maiasa",
        "en": "every morning",
        "ta": "ஒவ்வொரு காலையும்"
      },
      {
        "jp": "まいばん",
        "r": "maiban",
        "en": "every night",
        "ta": "ஒவ்வொரு இரவும்"
      },
      {
        "jp": "まいにち",
        "r": "mainichi",
        "en": "every day",
        "ta": "ஒவ்வொரு நாளும்"
      },
      {
        "jp": "げつようび",
        "r": "getsuyoubi",
        "en": "Monday",
        "ta": "திங்கள்கிழமை"
      },
      {
        "jp": "かようび",
        "r": "kayoubi",
        "en": "Tuesday",
        "ta": "செவ்வாய்க்கிழமை"
      },
      {
        "jp": "すいようび",
        "r": "suiyoubi",
        "en": "Wednesday",
        "ta": "புதன்கிழமை"
      },
      {
        "jp": "もくようび",
        "r": "mokuyoubi",
        "en": "Thursday",
        "ta": "வியாழக்கிழமை"
      },
      {
        "jp": "きんようび",
        "r": "kinyoubi",
        "en": "Friday",
        "ta": "வெள்ளிக்கிழமை"
      },
      {
        "jp": "どようび",
        "r": "doyoubi",
        "en": "Saturday",
        "ta": "சனிக்கிழமை"
      },
      {
        "jp": "にちようび",
        "r": "nichiyoubi",
        "en": "Sunday",
        "ta": "ஞாயிற்றுக்கிழமை"
      },
      {
        "jp": "なんようび",
        "r": "nanyoubi",
        "en": "what day of the week?",
        "ta": "என்ன கிழமை?"
      },
      {
        "jp": "～から",
        "r": "kara",
        "en": "from ~",
        "ta": "~லிருந்து"
      },
      {
        "jp": "～まで",
        "r": "made",
        "en": "to / until ~",
        "ta": "~வரை"
      },
      {
        "jp": "～と～",
        "r": "to",
        "en": "and (connecting nouns)",
        "ta": "மற்றும்"
      }
    ],
    "grammar": [
      {
        "t": "～時 ～分です",
        "en": "Tell exact time",
        "ta": "நேரம் கூறுதல்",
        "form": "Time + です",
        "ex": {
          "jp": "いま 9じ 30ふんです。",
          "en": "いま 9じ 30ふんです。",
          "ta": "いま 9じ 30ふんです。"
        }
      },
      {
        "t": "Verb ます / ません / ました / ませんでした",
        "en": "Verb non-past and past tenses",
        "ta": "வினைச்சொல் காலங்கள்",
        "form": "Verb-stem + ます/ません/ました",
        "ex": {
          "jp": "まいあさ 6じに おきます。",
          "en": "まいあさ 6じに おきます。",
          "ta": "まいあさ 6じに おきます。"
        }
      },
      {
        "t": "S1 から S2 まで",
        "en": "Time range from ~ to ~",
        "ta": "~லிருந்து ~வரை",
        "form": "Time1 + から + Time2 + まで",
        "ex": {
          "jp": "9じから 5じまで はたらきます。",
          "en": "9じから 5じまで はたらきます。",
          "ta": "9じから 5じまで はたらきます。"
        }
      },
      {
        "t": "N1 と N2",
        "en": "Connecting nouns with 'and'",
        "ta": "மற்றும்",
        "form": "Noun1 + と + Noun2",
        "ex": {
          "jp": "ぎんこうの やすみは どようびと にちようびです。",
          "en": "ぎんこうの やすみは どようびと にちようびです。",
          "ta": "ぎんこうの やすみは どようびと にちようびです。"
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 4: What is the meaning of 'いま' (ima)?",
        "options": [
          "now",
          "Water",
          "Book",
          "School"
        ],
        "answer": "now",
        "explain": "'いま' means now (இப்போது)."
      },
      {
        "q": "Lesson 4: Identify the main grammar structure.",
        "options": [
          "～時 ～分です",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "～時 ～分です",
        "explain": "Lesson 4 focuses on ～時 ～分です."
      }
    ]
  },
  {
    "id": 5,
    "jp": "どこへ いきますか",
    "en": "Where are you going? (Transport & Destinations)",
    "ta": "எங்கே செல்கிறீர்கள்? (பயணம்)",
    "vocab": [
      {
        "jp": "いきます",
        "r": "ikimasu",
        "en": "to go",
        "ta": "செல்லுதல்"
      },
      {
        "jp": "きます",
        "r": "kimasu",
        "en": "to come",
        "ta": "வருதல்"
      },
      {
        "jp": "かえります",
        "r": "kaerimasu",
        "en": "to return / go home",
        "ta": "திரும்புதல்"
      },
      {
        "jp": "がっこう",
        "r": "gakkou",
        "en": "school",
        "ta": "பள்ளி"
      },
      {
        "jp": "スーパー",
        "r": "su-pa-",
        "en": "supermarket",
        "ta": "சூப்பர் மார்க்கெட்"
      },
      {
        "jp": "えき",
        "r": "eki",
        "en": "station",
        "ta": "ரயில் நிலையம்"
      },
      {
        "jp": "ひこうき",
        "r": "hikouki",
        "en": "airplane",
        "ta": "விமானம்"
      },
      {
        "jp": "ふね",
        "r": "fune",
        "en": "ship",
        "ta": "கப்பல்"
      },
      {
        "jp": "でんしゃ",
        "r": "densha",
        "en": "electric train",
        "ta": "ரயில்"
      },
      {
        "jp": "ちかってつ",
        "r": "chikatesu",
        "en": "subway",
        "ta": "சுரங்க ரயில்"
      },
      {
        "jp": "しんかんせん",
        "r": "shinkansen",
        "en": "bullet train",
        "ta": "புல்லட் ரயில்"
      },
      {
        "jp": "バス",
        "r": "basu",
        "en": "bus",
        "ta": "பேருந்து"
      },
      {
        "jp": "タクシー",
        "r": "takushi-",
        "en": "taxi",
        "ta": "டாக்ஸி"
      },
      {
        "jp": "じてんしゃ",
        "r": "jitensha",
        "en": "bicycle",
        "ta": "மிதிவண்டி"
      },
      {
        "jp": "あるいて",
        "r": "aruite",
        "en": "on foot",
        "ta": "நடந்து"
      },
      {
        "jp": "ひと",
        "r": "hito",
        "en": "person",
        "ta": "நபர்"
      },
      {
        "jp": "ともだち",
        "r": "tomodachi",
        "en": "friend",
        "ta": "நண்பர்"
      },
      {
        "jp": "かれ",
        "r": "kare",
        "en": "he / boyfriend",
        "ta": "அவன்"
      },
      {
        "jp": "かのじょ",
        "r": "kanojo",
        "en": "she / girlfriend",
        "ta": "அவள்"
      },
      {
        "jp": "かぞく",
        "r": "kazoku",
        "en": "family",
        "ta": "குடும்பம்"
      },
      {
        "jp": "ひとり で",
        "r": "hitori de",
        "en": "alone",
        "ta": "தனியாக"
      },
      {
        "jp": "せんしゅう",
        "r": "senshuu",
        "en": "last week",
        "ta": "கடந்த வாரம்"
      },
      {
        "jp": "こんしゅう",
        "r": "konshuu",
        "en": "this week",
        "ta": "இந்த வாரம்"
      },
      {
        "jp": "らいしゅう",
        "r": "raishuu",
        "en": "next week",
        "ta": "அடுத்த வாரம்"
      },
      {
        "jp": "せんげつ",
        "r": "sengetsu",
        "en": "last month",
        "ta": "கடந்த மாதம்"
      },
      {
        "jp": "こんげつ",
        "r": "kongetsu",
        "en": "this month",
        "ta": "இந்த மாதம்"
      },
      {
        "jp": "らいげつ",
        "r": "raigetsu",
        "en": "next month",
        "ta": "அடுத்த மாதம்"
      },
      {
        "jp": "きょねん",
        "r": "kyonen",
        "en": "last year",
        "ta": "கடந்த ஆண்டு"
      },
      {
        "jp": "ことし",
        "r": "kotoshi",
        "en": "this year",
        "ta": "இந்த ஆண்டு"
      },
      {
        "jp": "らいねん",
        "r": "rainen",
        "en": "next year",
        "ta": "அடுத்த ஆண்டு"
      },
      {
        "jp": "～がつ",
        "r": "gatsu",
        "en": "~th month of year",
        "ta": "~ஆம் மாதம்"
      },
      {
        "jp": "なんがつ",
        "r": "nangatsu",
        "en": "which month?",
        "ta": "எந்த மாதம்?"
      },
      {
        "jp": "ついたち",
        "r": "tsuitachi",
        "en": "1st day of month",
        "ta": "1ஆம் தேதி"
      },
      {
        "jp": "ふつか",
        "r": "futsuka",
        "en": "2nd / 2 days",
        "ta": "2ஆம் தேதி"
      },
      {
        "jp": "みっか",
        "r": "mikka",
        "en": "3rd / 3 days",
        "ta": "3ஆம் தேதி"
      },
      {
        "jp": "よっか",
        "r": "yokka",
        "en": "4th / 4 days",
        "ta": "4ஆம் தேதி"
      },
      {
        "jp": "いつか",
        "r": "itsuka",
        "en": "5th / 5 days",
        "ta": "5ஆம் தேதி"
      },
      {
        "jp": "むいか",
        "r": "muika",
        "en": "6th / 6 days",
        "ta": "6ஆம் தேதி"
      },
      {
        "jp": "<ctrl42>のか",
        "r": "nanoka",
        "en": "7th / 7 days",
        "ta": "7ஆம் தேதி"
      },
      {
        "jp": "ようか",
        "r": "youka",
        "en": "8th / 8 days",
        "ta": "8ஆம் தேதி"
      },
      {
        "jp": "ここのか",
        "r": "kokonoka",
        "en": "9th / 9 days",
        "ta": "9ஆம் தேதி"
      },
      {
        "jp": "とおか",
        "r": "tooka",
        "en": "10th / 10 days",
        "ta": "10ஆம் தேதி"
      },
      {
        "jp": "じゅうよっか",
        "r": "juuyokka",
        "en": "14th day",
        "ta": "14ஆம் தேதி"
      },
      {
        "jp": "はつか",
        "r": "hatsuka",
        "en": "20th day",
        "ta": "20ஆம் தேதி"
      },
      {
        "jp": "にじゅうよっか",
        "r": "nijuuyokka",
        "en": "24th day",
        "ta": "24ஆம் தேதி"
      },
      {
        "jp": "なんにち",
        "r": "nannichi",
        "en": "which day of month?",
        "ta": "எந்த தேதி?"
      },
      {
        "jp": "いつ",
        "r": "itsu",
        "en": "when?",
        "ta": "எப்போது?"
      },
      {
        "jp": "たんじょうび",
        "r": "tanjoubi",
        "en": "birthday",
        "ta": "பிறந்தநாள்"
      }
    ],
    "grammar": [
      {
        "t": "N (場所) へ いきます / きます / かえります",
        "en": "Direction particle へ",
        "ta": "திசை குறியீடு へ",
        "form": "Place + へ + Verb",
        "ex": {
          "jp": "わたしは きょうとへ いきます。",
          "en": "わたしは きょうとへ いきます。",
          "ta": "わたしは きょうとへ いきます。"
        }
      },
      {
        "t": "どこ [へ] も 行きません",
        "en": "Complete negation of direction",
        "ta": "முழு எதிர்மறை",
        "form": "どこへも + Negative Verb",
        "ex": {
          "jp": "どこへも いきません。",
          "en": "どこへも いきません。",
          "ta": "どこへも いきません。"
        }
      },
      {
        "t": "N (乗り物) で いきます",
        "en": "Means of transport particle で",
        "ta": "போக்குவரத்து சாதனம் で",
        "form": "Vehicle + で + Verb",
        "ex": {
          "jp": "タクシーで いきます。",
          "en": "タクシーで いきます。",
          "ta": "タクシーで いきます。"
        }
      },
      {
        "t": "N (人/動物) と いきます",
        "en": "Companion particle と",
        "ta": "உடன் செல்லும் நபர் と",
        "form": "Person + と + Verb",
        "ex": {
          "jp": "かぞくと にほんへ きました。",
          "en": "かぞくと にほんへ きました。",
          "ta": "かぞくと にほんへ きました。"
        }
      },
      {
        "t": "いつ",
        "en": "Asking 'when'",
        "ta": "எப்போது",
        "form": "いつ + Verbか",
        "ex": {
          "jp": "いつ にほんへ いきますか。",
          "en": "いつ にほんへ いきますか。",
          "ta": "いつ にほんへ いきますか。"
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 5: What is the meaning of 'いきます' (ikimasu)?",
        "options": [
          "to go",
          "Water",
          "Book",
          "School"
        ],
        "answer": "to go",
        "explain": "'いきます' means to go (செல்லுதல்)."
      },
      {
        "q": "Lesson 5: Identify the main grammar structure.",
        "options": [
          "N (場所) へ いきます / きます / かえります",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "N (場所) へ いきます / きます / かえります",
        "explain": "Lesson 5 focuses on N (場所) へ いきます / きます / かえります."
      }
    ]
  },
  {
    "id": 5,
    "jp": "どこへ いきますか",
    "en": "Where are you going? (Transport & Destinations)",
    "ta": "எங்கே செல்கிறீர்கள்? (பயணம்)",
    "vocab": [
      {
        "jp": "いきます",
        "r": "ikimasu",
        "en": "to go",
        "ta": "செல்லுதல்"
      },
      {
        "jp": "きます",
        "r": "kimasu",
        "en": "to come",
        "ta": "வருதல்"
      },
      {
        "jp": "かえります",
        "r": "kaerimasu",
        "en": "to return / go home",
        "ta": "திரும்புதல்"
      },
      {
        "jp": "がっこう",
        "r": "gakkou",
        "en": "school",
        "ta": "பள்ளி"
      },
      {
        "jp": "スーパー",
        "r": "su-pa-",
        "en": "supermarket",
        "ta": "சூப்பர் மார்க்கெட்"
      },
      {
        "jp": "えき",
        "r": "eki",
        "en": "station",
        "ta": "ரயில் நிலையம்"
      },
      {
        "jp": "ひこうき",
        "r": "hikouki",
        "en": "airplane",
        "ta": "விமானம்"
      },
      {
        "jp": "ふね",
        "r": "fune",
        "en": "ship",
        "ta": "கப்பல்"
      },
      {
        "jp": "でんしゃ",
        "r": "densha",
        "en": "electric train",
        "ta": "ரயில்"
      },
      {
        "jp": "ちかってつ",
        "r": "chikatesu",
        "en": "subway",
        "ta": "சுரங்க ரயில்"
      },
      {
        "jp": "しんかんせん",
        "r": "shinkansen",
        "en": "bullet train",
        "ta": "புல்லட் ரயில்"
      },
      {
        "jp": "バス",
        "r": "basu",
        "en": "bus",
        "ta": "பேருந்து"
      },
      {
        "jp": "タクシー",
        "r": "takushi-",
        "en": "taxi",
        "ta": "டாக்ஸி"
      },
      {
        "jp": "じてんしゃ",
        "r": "jitensha",
        "en": "bicycle",
        "ta": "மிதிவண்டி"
      },
      {
        "jp": "あるいて",
        "r": "aruite",
        "en": "on foot",
        "ta": "நடந்து"
      },
      {
        "jp": "ひと",
        "r": "hito",
        "en": "person",
        "ta": "நபர்"
      },
      {
        "jp": "ともだち",
        "r": "tomodachi",
        "en": "friend",
        "ta": "நண்பர்"
      },
      {
        "jp": "かれ",
        "r": "kare",
        "en": "he / boyfriend",
        "ta": "அவன்"
      },
      {
        "jp": "かのじょ",
        "r": "kanojo",
        "en": "she / girlfriend",
        "ta": "அவள்"
      },
      {
        "jp": "かぞく",
        "r": "kazoku",
        "en": "family",
        "ta": "குடும்பம்"
      },
      {
        "jp": "ひとり で",
        "r": "hitori de",
        "en": "alone",
        "ta": "தனியாக"
      },
      {
        "jp": "せんしゅう",
        "r": "senshuu",
        "en": "last week",
        "ta": "கடந்த வாரம்"
      },
      {
        "jp": "こんしゅう",
        "r": "konshuu",
        "en": "this week",
        "ta": "இந்த வாரம்"
      },
      {
        "jp": "らいしゅう",
        "r": "raishuu",
        "en": "next week",
        "ta": "அடுத்த வாரம்"
      },
      {
        "jp": "せんげつ",
        "r": "sengetsu",
        "en": "last month",
        "ta": "கடந்த மாதம்"
      },
      {
        "jp": "こんげつ",
        "r": "kongetsu",
        "en": "this month",
        "ta": "இந்த மாதம்"
      },
      {
        "jp": "らいげつ",
        "r": "raigetsu",
        "en": "next month",
        "ta": "அடுத்த மாதம்"
      },
      {
        "jp": "きょねん",
        "r": "kyonen",
        "en": "last year",
        "ta": "கடந்த ஆண்டு"
      },
      {
        "jp": "ことし",
        "r": "kotoshi",
        "en": "this year",
        "ta": "இந்த ஆண்டு"
      },
      {
        "jp": "らいねん",
        "r": "rainen",
        "en": "next year",
        "ta": "அடுத்த ஆண்டு"
      },
      {
        "jp": "～がつ",
        "r": "gatsu",
        "en": "~th month of year",
        "ta": "~ஆம் மாதம்"
      },
      {
        "jp": "なんがつ",
        "r": "nangatsu",
        "en": "which month?",
        "ta": "எந்த மாதம்?"
      },
      {
        "jp": "ついたち",
        "r": "tsuitachi",
        "en": "1st day of month",
        "ta": "1ஆம் தேதி"
      },
      {
        "jp": "ふつか",
        "r": "futsuka",
        "en": "2nd / 2 days",
        "ta": "2ஆம் தேதி"
      },
      {
        "jp": "みっか",
        "r": "mikka",
        "en": "3rd / 3 days",
        "ta": "3ஆம் தேதி"
      },
      {
        "jp": "よっか",
        "r": "yokka",
        "en": "4th / 4 days",
        "ta": "4ஆம் தேதி"
      },
      {
        "jp": "いつか",
        "r": "itsuka",
        "en": "5th / 5 days",
        "ta": "5ஆம் தேதி"
      },
      {
        "jp": "むいか",
        "r": "muika",
        "en": "6th / 6 days",
        "ta": "6ஆம் தேதி"
      },
      {
        "jp": "<ctrl42>のか",
        "r": "nanoka",
        "en": "7th / 7 days",
        "ta": "7ஆம் தேதி"
      },
      {
        "jp": "ようか",
        "r": "youka",
        "en": "8th / 8 days",
        "ta": "8ஆம் தேதி"
      },
      {
        "jp": "ここのか",
        "r": "kokonoka",
        "en": "9th / 9 days",
        "ta": "9ஆம் தேதி"
      },
      {
        "jp": "とおか",
        "r": "tooka",
        "en": "10th / 10 days",
        "ta": "10ஆம் தேதி"
      },
      {
        "jp": "じゅうよっか",
        "r": "juuyokka",
        "en": "14th day",
        "ta": "14ஆம் தேதி"
      },
      {
        "jp": "はつか",
        "r": "hatsuka",
        "en": "20th day",
        "ta": "20ஆம் தேதி"
      },
      {
        "jp": "にじゅうよっか",
        "r": "nijuuyokka",
        "en": "24th day",
        "ta": "24ஆம் தேதி"
      },
      {
        "jp": "なんにち",
        "r": "nannichi",
        "en": "which day of month?",
        "ta": "எந்த தேதி?"
      },
      {
        "jp": "いつ",
        "r": "itsu",
        "en": "when?",
        "ta": "எப்போது?"
      },
      {
        "jp": "たんじょうび",
        "r": "tanjoubi",
        "en": "birthday",
        "ta": "பிறந்தநாள்"
      }
    ],
    "grammar": [
      {
        "t": "N (場所) へ いきます / きます / かえります",
        "en": "Direction particle へ",
        "ta": "திசை குறியீடு へ",
        "form": "Place + へ + Verb",
        "ex": {
          "jp": "わたしは きょうとへ いきます。",
          "en": "わたしは きょうとへ いきます。",
          "ta": "わたしは きょうとへ いきます。"
        }
      },
      {
        "t": "どこ [へ] も 行きません",
        "en": "Complete negation of direction",
        "ta": "முழு எதிர்மறை",
        "form": "どこへも + Negative Verb",
        "ex": {
          "jp": "どこへも いきません。",
          "en": "どこへも いきません。",
          "ta": "どこへも いきません。"
        }
      },
      {
        "t": "N (乗り物) で いきます",
        "en": "Means of transport particle で",
        "ta": "போக்குவரத்து சாதனம் で",
        "form": "Vehicle + で + Verb",
        "ex": {
          "jp": "タクシーで いきます。",
          "en": "タクシーで いきます。",
          "ta": "タクシーで いきます。"
        }
      },
      {
        "t": "N (人/動物) と いきます",
        "en": "Companion particle と",
        "ta": "உடன் செல்லும் நபர் と",
        "form": "Person + と + Verb",
        "ex": {
          "jp": "かぞくと にほんへ きました。",
          "en": "かぞくと にほんへ きました。",
          "ta": "かぞくと にほんへ きました。"
        }
      },
      {
        "t": "いつ",
        "en": "Asking 'when'",
        "ta": "எப்போது",
        "form": "いつ + Verbか",
        "ex": {
          "jp": "いつ にほんへ いきますか。",
          "en": "いつ にほんへ いきますか。",
          "ta": "いつ にほんへ いきますか。"
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 5: What is the meaning of 'いきます' (ikimasu)?",
        "options": [
          "to go",
          "Water",
          "Book",
          "School"
        ],
        "answer": "to go",
        "explain": "'いきます' means to go (செல்லுதல்)."
      },
      {
        "q": "Lesson 5: Identify the main grammar structure.",
        "options": [
          "N (場所) へ いきます / きます / かえります",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "N (場所) へ いきます / きます / かえります",
        "explain": "Lesson 5 focuses on N (場所) へ いきます / きます / かえります."
      }
    ]
  },
  {
    "id": 6,
    "jp": "なにを かいますか",
    "en": "What will you buy? (Direct Objects & Invitations)",
    "ta": "என்ன வாங்குவீர்கள்? (செயல்கள்)",
    "vocab": [
      {
        "jp": "たべます",
        "r": "tabemasu",
        "en": "to eat",
        "ta": "சாப்பிடுதல்"
      },
      {
        "jp": "のみます",
        "r": "nomimasu",
        "en": "to drink",
        "ta": "குடித்தல்"
      },
      {
        "jp": "すみます",
        "r": "sumimasu",
        "en": "to smoke / inhale",
        "ta": "புகைபிடித்தல்"
      },
      {
        "jp": "みます",
        "r": "mimasu",
        "en": "to watch / see",
        "ta": "பார்த்தல்"
      },
      {
        "jp": "ききます",
        "r": "kikimasu",
        "en": "to listen / hear",
        "ta": "கேட்டல்"
      },
      {
        "jp": "よみます",
        "r": "yomimasu",
        "en": "to read",
        "ta": "வாசித்தல்"
      },
      {
        "jp": "かきます",
        "r": "kakimasu",
        "en": "to write / draw",
        "ta": "எழுதுதல்"
      },
      {
        "jp": "かいます",
        "r": "kaimasu",
        "en": "to buy",
        "ta": "வாங்குதல்"
      },
      {
        "jp": "とります",
        "r": "torimasu",
        "en": "to take (photos)",
        "ta": "படம் எடுத்தல்"
      },
      {
        "jp": "します",
        "r": "shimasu",
        "en": "to do / play",
        "ta": "செய்தல்"
      },
      {
        "jp": "あいます",
        "r": "aimasu",
        "en": "to meet (a friend)",
        "ta": "சந்தித்தல்"
      },
      {
        "jp": "ごはん",
        "r": "gohan",
        "en": "meal / cooked rice",
        "ta": "உணவு / சோறு"
      },
      {
        "jp": "あさごはん",
        "r": "asagohan",
        "en": "breakfast",
        "ta": "காலை உணவு"
      },
      {
        "jp": "ひるごはん",
        "r": "hirugohan",
        "en": "lunch",
        "ta": "மதிய உணவு"
      },
      {
        "jp": "ばんごはん",
        "r": "bangohan",
        "en": "dinner",
        "ta": "இரவு உணவு"
      },
      {
        "jp": "パン",
        "r": "pan",
        "en": "bread",
        "ta": "ரொட்டி"
      },
      {
        "jp": "たまご",
        "r": "tamago",
        "en": "egg",
        "ta": "முட்டை"
      },
      {
        "jp": "にく",
        "r": "niku",
        "en": "meat",
        "ta": "இறைச்சி"
      },
      {
        "jp": "さかな",
        "r": "sakana",
        "en": "fish",
        "ta": "மீன்"
      },
      {
        "jp": "やさい",
        "r": "yasai",
        "en": "vegetables",
        "ta": "காய்கறி"
      },
      {
        "jp": "くだもの",
        "r": "kudamono",
        "en": "fruit",
        "ta": "பழம்"
      },
      {
        "jp": "みず",
        "r": "mizu",
        "en": "water",
        "ta": "தண்ணீர்"
      },
      {
        "jp": "おちゃ",
        "r": "ocha",
        "en": "green tea",
        "ta": "தேநீர்"
      },
      {
        "jp": "こうちゃ",
        "r": "koucha",
        "en": "black tea",
        "ta": "கருப்பு தேநீர்"
      },
      {
        "jp": "ぎゅうにゅう/ミルク",
        "r": "gyuunyuu",
        "en": "milk",
        "ta": "பால்"
      },
      {
        "jp": "ジュース",
        "r": "ju-su",
        "en": "juice",
        "ta": "சாறு"
      },
      {
        "jp": "ビール",
        "r": "bi-ru",
        "en": "beer",
        "ta": "பீர்"
      },
      {
        "jp": "おさけ",
        "r": "osake",
        "en": "alcohol / sake",
        "ta": "மது"
      },
      {
        "jp": "たばこ",
        "r": "tabako",
        "en": "tobacco / cigarette",
        "ta": "புகையிலை"
      },
      {
        "jp": "てがみ",
        "r": "tegami",
        "en": "letter",
        "ta": "கடிதம்"
      },
      {
        "jp": "レポート",
        "r": "repo-to",
        "en": "report",
        "ta": "அறிக்கை"
      },
      {
        "jp": "しゃしん",
        "r": "shashin",
        "en": "photograph",
        "ta": "புகைப்படம்"
      },
      {
        "jp": "ビデオ",
        "r": "bideo",
        "en": "video",
        "ta": "வீடியோ"
      },
      {
        "jp": "みせ",
        "r": "mise",
        "en": "store / shop",
        "ta": "கடை"
      },
      {
        "jp": "レストラン",
        "r": "resutoran",
        "en": "restaurant",
        "ta": "உணவகம்"
      },
      {
        "jp": "にわ",
        "r": "niwa",
        "en": "garden",
        "ta": "தோட்டம்"
      },
      {
        "jp": "宿題",
        "r": "shukudai",
        "en": "homework",
        "ta": "வீட்டுப்பாடம்"
      },
      {
        "jp": "テニス",
        "r": "tenisu",
        "en": "tennis",
        "ta": "டென்னிஸ்"
      },
      {
        "jp": "サッカー",
        "r": "sakka-",
        "en": "soccer",
        "ta": "பந்து விளையாட்டு"
      },
      {
        "jp": "おはなみ",
        "r": "ohanami",
        "en": "cherry blossom viewing",
        "ta": "மலர் ரசிப்பு"
      },
      {
        "jp": "なに",
        "r": "nani",
        "en": "what?",
        "ta": "என்ன?"
      },
      {
        "jp": "いっしょに",
        "r": "isshoni",
        "en": "together",
        "ta": "ஒன்றாக"
      },
      {
        "jp": "ちょっと",
        "r": "chotto",
        "en": "a little",
        "ta": "கொஞ்சம்"
      },
      {
        "jp": "いつも",
        "r": "itsumo",
        "en": "always",
        "ta": "எப்போதும்"
      },
      {
        "jp": "ときどき",
        "r": "tokidoki",
        "en": "sometimes",
        "ta": "சிலவேளை"
      },
      {
        "jp": "それから",
        "r": "sorekara",
        "en": "after that / and then",
        "ta": "அதன் பிறகு"
      },
      {
        "jp": "ええ",
        "r": "ee",
        "en": "yes (informal)",
        "ta": "ஆம்"
      },
      {
        "jp": "いいですね",
        "r": "ii desu ne",
        "en": "that's good / sounds nice",
        "ta": "நல்லது"
      },
      {
        "jp": "わかりました",
        "r": "wakarimashita",
        "en": "I understand",
        "ta": "புரிந்தது"
      }
    ],
    "grammar": [
      {
        "t": "N を V",
        "en": "Direct object particle を",
        "ta": "செயப்படுபொருள் குறியீடு を",
        "form": "Noun + を + Transitive Verb",
        "ex": {
          "jp": "ジュースを のみます。",
          "en": "ジュースを のみます。",
          "ta": "ジュースを のみます。"
        }
      },
      {
        "t": "N を します",
        "en": "Doing activities/sports/work",
        "ta": "செயல்கள் செய்தல்",
        "form": "Noun + を します",
        "ex": {
          "jp": "サッカーを します。",
          "en": "サッカーを します。",
          "ta": "サッカーを します。"
        }
      },
      {
        "t": "なにを しますか",
        "en": "Asking what someone will do",
        "ta": "என்ன செய்கிறீர்கள் என வினவுதல்",
        "form": "なにを しますか",
        "ex": {
          "jp": "あした なにを しますか。",
          "en": "あした なにを しますか。",
          "ta": "あした なにを しますか。"
        }
      },
      {
        "t": "N で V (場所)",
        "en": "Location of action particle で",
        "ta": "செயல் நடக்கும் இடம் で",
        "form": "Place + で + Action Verb",
        "ex": {
          "jp": "レストランで ひるごはんを たべます。",
          "en": "レストランで ひるごはんを たべます。",
          "ta": "レストランで ひるごはんを たべます。"
        }
      },
      {
        "t": "V ませんか",
        "en": "Polite invitation ('won't you?')",
        "ta": "மரியாதையான அழைப்பு",
        "form": "Verb-stem + ませんか",
        "ex": {
          "jp": "いっしょに おちゃを のみませんか。",
          "en": "いっしょに おちゃを のみませんか。",
          "ta": "いっしょに おちゃを のみませんか。"
        }
      },
      {
        "t": "V ましょう",
        "en": "Polite proposal ('let's...')",
        "ta": "ஒன்றாக செய்வோம் என்ற முன்மொழிவு",
        "form": "Verb-stem + ましょう",
        "ex": {
          "jp": "ちょっと やすみましょう。",
          "en": "ちょっと やすみましょう。",
          "ta": "ちょっと やすみましょう。"
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 6: What is the meaning of 'たべます' (tabemasu)?",
        "options": [
          "to eat",
          "Water",
          "Book",
          "School"
        ],
        "answer": "to eat",
        "explain": "'たべます' means to eat (சாப்பிடுதல்)."
      },
      {
        "q": "Lesson 6: Identify the main grammar structure.",
        "options": [
          "N を V",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "N を V",
        "explain": "Lesson 6 focuses on N を V."
      }
    ]
  },
  {
    "id": 6,
    "jp": "なにを かいますか",
    "en": "What will you buy? (Direct Objects & Invitations)",
    "ta": "என்ன வாங்குவீர்கள்? (செயல்கள்)",
    "vocab": [
      {
        "jp": "たべます",
        "r": "tabemasu",
        "en": "to eat",
        "ta": "சாப்பிடுதல்"
      },
      {
        "jp": "のみます",
        "r": "nomimasu",
        "en": "to drink",
        "ta": "குடித்தல்"
      },
      {
        "jp": "すみます",
        "r": "sumimasu",
        "en": "to smoke / inhale",
        "ta": "புகைபிடித்தல்"
      },
      {
        "jp": "みます",
        "r": "mimasu",
        "en": "to watch / see",
        "ta": "பார்த்தல்"
      },
      {
        "jp": "ききます",
        "r": "kikimasu",
        "en": "to listen / hear",
        "ta": "கேட்டல்"
      },
      {
        "jp": "よみます",
        "r": "yomimasu",
        "en": "to read",
        "ta": "வாசித்தல்"
      },
      {
        "jp": "かきます",
        "r": "kakimasu",
        "en": "to write / draw",
        "ta": "எழுதுதல்"
      },
      {
        "jp": "かいます",
        "r": "kaimasu",
        "en": "to buy",
        "ta": "வாங்குதல்"
      },
      {
        "jp": "とります",
        "r": "torimasu",
        "en": "to take (photos)",
        "ta": "படம் எடுத்தல்"
      },
      {
        "jp": "します",
        "r": "shimasu",
        "en": "to do / play",
        "ta": "செய்தல்"
      },
      {
        "jp": "あいます",
        "r": "aimasu",
        "en": "to meet (a friend)",
        "ta": "சந்தித்தல்"
      },
      {
        "jp": "ごはん",
        "r": "gohan",
        "en": "meal / cooked rice",
        "ta": "உணவு / சோறு"
      },
      {
        "jp": "あさごはん",
        "r": "asagohan",
        "en": "breakfast",
        "ta": "காலை உணவு"
      },
      {
        "jp": "ひるごはん",
        "r": "hirugohan",
        "en": "lunch",
        "ta": "மதிய உணவு"
      },
      {
        "jp": "ばんごはん",
        "r": "bangohan",
        "en": "dinner",
        "ta": "இரவு உணவு"
      },
      {
        "jp": "パン",
        "r": "pan",
        "en": "bread",
        "ta": "ரொட்டி"
      },
      {
        "jp": "たまご",
        "r": "tamago",
        "en": "egg",
        "ta": "முட்டை"
      },
      {
        "jp": "にく",
        "r": "niku",
        "en": "meat",
        "ta": "இறைச்சி"
      },
      {
        "jp": "さかな",
        "r": "sakana",
        "en": "fish",
        "ta": "மீன்"
      },
      {
        "jp": "やさい",
        "r": "yasai",
        "en": "vegetables",
        "ta": "காய்கறி"
      },
      {
        "jp": "くだもの",
        "r": "kudamono",
        "en": "fruit",
        "ta": "பழம்"
      },
      {
        "jp": "みず",
        "r": "mizu",
        "en": "water",
        "ta": "தண்ணீர்"
      },
      {
        "jp": "おちゃ",
        "r": "ocha",
        "en": "green tea",
        "ta": "தேநீர்"
      },
      {
        "jp": "こうちゃ",
        "r": "koucha",
        "en": "black tea",
        "ta": "கருப்பு தேநீர்"
      },
      {
        "jp": "ぎゅうにゅう/ミルク",
        "r": "gyuunyuu",
        "en": "milk",
        "ta": "பால்"
      },
      {
        "jp": "ジュース",
        "r": "ju-su",
        "en": "juice",
        "ta": "சாறு"
      },
      {
        "jp": "ビール",
        "r": "bi-ru",
        "en": "beer",
        "ta": "பீர்"
      },
      {
        "jp": "おさけ",
        "r": "osake",
        "en": "alcohol / sake",
        "ta": "மது"
      },
      {
        "jp": "たばこ",
        "r": "tabako",
        "en": "tobacco / cigarette",
        "ta": "புகையிலை"
      },
      {
        "jp": "てがみ",
        "r": "tegami",
        "en": "letter",
        "ta": "கடிதம்"
      },
      {
        "jp": "レポート",
        "r": "repo-to",
        "en": "report",
        "ta": "அறிக்கை"
      },
      {
        "jp": "しゃしん",
        "r": "shashin",
        "en": "photograph",
        "ta": "புகைப்படம்"
      },
      {
        "jp": "ビデオ",
        "r": "bideo",
        "en": "video",
        "ta": "வீடியோ"
      },
      {
        "jp": "みせ",
        "r": "mise",
        "en": "store / shop",
        "ta": "கடை"
      },
      {
        "jp": "レストラン",
        "r": "resutoran",
        "en": "restaurant",
        "ta": "உணவகம்"
      },
      {
        "jp": "にわ",
        "r": "niwa",
        "en": "garden",
        "ta": "தோட்டம்"
      },
      {
        "jp": "宿題",
        "r": "shukudai",
        "en": "homework",
        "ta": "வீட்டுப்பாடம்"
      },
      {
        "jp": "テニス",
        "r": "tenisu",
        "en": "tennis",
        "ta": "டென்னிஸ்"
      },
      {
        "jp": "サッカー",
        "r": "sakka-",
        "en": "soccer",
        "ta": "பந்து விளையாட்டு"
      },
      {
        "jp": "おはなみ",
        "r": "ohanami",
        "en": "cherry blossom viewing",
        "ta": "மலர் ரசிப்பு"
      },
      {
        "jp": "なに",
        "r": "nani",
        "en": "what?",
        "ta": "என்ன?"
      },
      {
        "jp": "いっしょに",
        "r": "isshoni",
        "en": "together",
        "ta": "ஒன்றாக"
      },
      {
        "jp": "ちょっと",
        "r": "chotto",
        "en": "a little",
        "ta": "கொஞ்சம்"
      },
      {
        "jp": "いつも",
        "r": "itsumo",
        "en": "always",
        "ta": "எப்போதும்"
      },
      {
        "jp": "ときどき",
        "r": "tokidoki",
        "en": "sometimes",
        "ta": "சிலவேளை"
      },
      {
        "jp": "それから",
        "r": "sorekara",
        "en": "after that / and then",
        "ta": "அதன் பிறகு"
      },
      {
        "jp": "ええ",
        "r": "ee",
        "en": "yes (informal)",
        "ta": "ஆம்"
      },
      {
        "jp": "いいですね",
        "r": "ii desu ne",
        "en": "that's good / sounds nice",
        "ta": "நல்லது"
      },
      {
        "jp": "わかりました",
        "r": "wakarimashita",
        "en": "I understand",
        "ta": "புரிந்தது"
      }
    ],
    "grammar": [
      {
        "t": "N を V",
        "en": "Direct object particle を",
        "ta": "செயப்படுபொருள் குறியீடு を",
        "form": "Noun + を + Transitive Verb",
        "ex": {
          "jp": "ジュースを のみます。",
          "en": "ジュースを のみます。",
          "ta": "ジュースを のみます。"
        }
      },
      {
        "t": "N を します",
        "en": "Doing activities/sports/work",
        "ta": "செயல்கள் செய்தல்",
        "form": "Noun + を します",
        "ex": {
          "jp": "サッカーを します。",
          "en": "サッカーを します。",
          "ta": "サッカーを します。"
        }
      },
      {
        "t": "なにを しますか",
        "en": "Asking what someone will do",
        "ta": "என்ன செய்கிறீர்கள் என வினவுதல்",
        "form": "なにを しますか",
        "ex": {
          "jp": "あした なにを しますか。",
          "en": "あした なにを しますか。",
          "ta": "あした なにを しますか。"
        }
      },
      {
        "t": "N で V (場所)",
        "en": "Location of action particle で",
        "ta": "செயல் நடக்கும் இடம் で",
        "form": "Place + で + Action Verb",
        "ex": {
          "jp": "レストランで ひるごはんを たべます。",
          "en": "レストランで ひるごはんを たべます。",
          "ta": "レストランで ひるごはんを たべます。"
        }
      },
      {
        "t": "V ませんか",
        "en": "Polite invitation ('won't you?')",
        "ta": "மரியாதையான அழைப்பு",
        "form": "Verb-stem + ませんか",
        "ex": {
          "jp": "いっしょに おちゃを のみませんか。",
          "en": "いっしょに おちゃを のみませんか。",
          "ta": "いっしょに おちゃを のみませんか。"
        }
      },
      {
        "t": "V ましょう",
        "en": "Polite proposal ('let's...')",
        "ta": "ஒன்றாக செய்வோம் என்ற முன்மொழிவு",
        "form": "Verb-stem + ましょう",
        "ex": {
          "jp": "ちょっと やすみましょう。",
          "en": "ちょっと やすみましょう。",
          "ta": "ちょっと やすみましょう。"
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 6: What is the meaning of 'たべます' (tabemasu)?",
        "options": [
          "to eat",
          "Water",
          "Book",
          "School"
        ],
        "answer": "to eat",
        "explain": "'たべます' means to eat (சாப்பிடுதல்)."
      },
      {
        "q": "Lesson 6: Identify the main grammar structure.",
        "options": [
          "N を V",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "N を V",
        "explain": "Lesson 6 focuses on N を V."
      }
    ]
  },
  {
    "id": 7,
    "jp": "しゃしんを とりましょう",
    "en": "Let's take a photo (Means, Giving & Receiving) (Lesson 7)",
    "ta": "புகைப்படம் எடுப்போம் (கொடுத்தல்)",
    "vocab": [
      {
        "jp": "きります",
        "r": "きります",
        "en": "きります",
        "ta": "きります"
      },
      {
        "jp": "おくります",
        "r": "おくります",
        "en": "おくります",
        "ta": "おくります"
      },
      {
        "jp": "あげます",
        "r": "あげます",
        "en": "あげます",
        "ta": "あげます"
      },
      {
        "jp": "もらいます",
        "r": "もらいます",
        "en": "もらいます",
        "ta": "もらいます"
      },
      {
        "jp": "かします",
        "r": "かします",
        "en": "かします",
        "ta": "かします"
      },
      {
        "jp": "かります",
        "r": "かります",
        "en": "かります",
        "ta": "かります"
      },
      {
        "jp": "おしえます",
        "r": "おしえます",
        "en": "おしえます",
        "ta": "おしえます"
      },
      {
        "jp": "ならいます",
        "r": "ならいます",
        "en": "ならいます",
        "ta": "ならいます"
      },
      {
        "jp": "て",
        "r": "て",
        "en": "て",
        "ta": "て"
      },
      {
        "jp": "ハシ",
        "r": "ハシ",
        "en": "ハシ",
        "ta": "ハシ"
      },
      {
        "jp": "スプーン",
        "r": "スプーン",
        "en": "スプーン",
        "ta": "スプーン"
      },
      {
        "jp": "ナイフ",
        "r": "ナイフ",
        "en": "ナイフ",
        "ta": "ナイフ"
      },
      {
        "jp": "フォーク",
        "r": "フォーク",
        "en": "フォーク",
        "ta": "フォーク"
      },
      {
        "jp": "ハサミ",
        "r": "ハサミ",
        "en": "ハサミ",
        "ta": "ハサミ"
      },
      {
        "jp": "ケータイ",
        "r": "ケータイ",
        "en": "ケータイ",
        "ta": "ケータイ"
      },
      {
        "jp": "メール",
        "r": "メール",
        "en": "メール",
        "ta": "メール"
      },
      {
        "jp": "プレゼント",
        "r": "プレゼント",
        "en": "プレゼント",
        "ta": "プレゼント"
      },
      {
        "jp": "お金",
        "r": "お金",
        "en": "お金",
        "ta": "お金"
      },
      {
        "jp": "キップ",
        "r": "キップ",
        "en": "キップ",
        "ta": "キップ"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 7 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 7",
        "ta": "பாடம் 7 முதன்மை இலக்கணம்",
        "form": "Pattern: きります + です/ます",
        "ex": {
          "jp": "きりますです。",
          "en": "Example of きります.",
          "ta": "きります உதாரணம்."
        }
      },
      {
        "t": "Lesson 7 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 7",
        "ta": "பாடம் 7 இரண்டாம் இலக்கணம்",
        "form": "Pattern: おくります + です/ます",
        "ex": {
          "jp": "おくりますです。",
          "en": "Example of おくります.",
          "ta": "おくります உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 7: What is the meaning of 'きります' (きります)?",
        "options": [
          "きります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "きります",
        "explain": "'きります' means きります (きります)."
      },
      {
        "q": "Lesson 7: Identify the main grammar structure.",
        "options": [
          "Lesson 7 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 7 Core Pattern 1",
        "explain": "Lesson 7 focuses on Lesson 7 Core Pattern 1."
      }
    ]
  },
  {
    "id": 7,
    "jp": "しゃしんを とりましょう",
    "en": "Let's take a photo (Means, Giving & Receiving) (Lesson 7)",
    "ta": "புகைப்படம் எடுப்போம் (கொடுத்தல்)",
    "vocab": [
      {
        "jp": "きります",
        "r": "きります",
        "en": "きります",
        "ta": "きります"
      },
      {
        "jp": "おくります",
        "r": "おくります",
        "en": "おくります",
        "ta": "おくります"
      },
      {
        "jp": "あげます",
        "r": "あげます",
        "en": "あげます",
        "ta": "あげます"
      },
      {
        "jp": "もらいます",
        "r": "もらいます",
        "en": "もらいます",
        "ta": "もらいます"
      },
      {
        "jp": "かします",
        "r": "かします",
        "en": "かします",
        "ta": "かします"
      },
      {
        "jp": "かります",
        "r": "かります",
        "en": "かります",
        "ta": "かります"
      },
      {
        "jp": "おしえます",
        "r": "おしえます",
        "en": "おしえます",
        "ta": "おしえます"
      },
      {
        "jp": "ならいます",
        "r": "ならいます",
        "en": "ならいます",
        "ta": "ならいます"
      },
      {
        "jp": "て",
        "r": "て",
        "en": "て",
        "ta": "て"
      },
      {
        "jp": "ハシ",
        "r": "ハシ",
        "en": "ハシ",
        "ta": "ハシ"
      },
      {
        "jp": "スプーン",
        "r": "スプーン",
        "en": "スプーン",
        "ta": "スプーン"
      },
      {
        "jp": "ナイフ",
        "r": "ナイフ",
        "en": "ナイフ",
        "ta": "ナイフ"
      },
      {
        "jp": "フォーク",
        "r": "フォーク",
        "en": "フォーク",
        "ta": "フォーク"
      },
      {
        "jp": "ハサミ",
        "r": "ハサミ",
        "en": "ハサミ",
        "ta": "ハサミ"
      },
      {
        "jp": "ケータイ",
        "r": "ケータイ",
        "en": "ケータイ",
        "ta": "ケータイ"
      },
      {
        "jp": "メール",
        "r": "メール",
        "en": "メール",
        "ta": "メール"
      },
      {
        "jp": "プレゼント",
        "r": "プレゼント",
        "en": "プレゼント",
        "ta": "プレゼント"
      },
      {
        "jp": "お金",
        "r": "お金",
        "en": "お金",
        "ta": "お金"
      },
      {
        "jp": "キップ",
        "r": "キップ",
        "en": "キップ",
        "ta": "キップ"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 7 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 7",
        "ta": "பாடம் 7 முதன்மை இலக்கணம்",
        "form": "Pattern: きります + です/ます",
        "ex": {
          "jp": "きりますです。",
          "en": "Example of きります.",
          "ta": "きります உதாரணம்."
        }
      },
      {
        "t": "Lesson 7 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 7",
        "ta": "பாடம் 7 இரண்டாம் இலக்கணம்",
        "form": "Pattern: おくります + です/ます",
        "ex": {
          "jp": "おくりますです。",
          "en": "Example of おくります.",
          "ta": "おくります உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 7: What is the meaning of 'きります' (きります)?",
        "options": [
          "きります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "きります",
        "explain": "'きります' means きります (きります)."
      },
      {
        "q": "Lesson 7: Identify the main grammar structure.",
        "options": [
          "Lesson 7 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 7 Core Pattern 1",
        "explain": "Lesson 7 focuses on Lesson 7 Core Pattern 1."
      }
    ]
  },
  {
    "id": 8,
    "jp": "かぜが つよいですね",
    "en": "The wind is strong (Adjectives & Qualities) (Lesson 8)",
    "ta": "காற்று வலிமையாக உள்ளது (பெயரடைகள்)",
    "vocab": [
      {
        "jp": "ハンサム",
        "r": "ハンサム",
        "en": "ハンサム",
        "ta": "ハンサム"
      },
      {
        "jp": "きれい",
        "r": "きれい",
        "en": "きれい",
        "ta": "きれい"
      },
      {
        "jp": "しずか",
        "r": "しずか",
        "en": "しずか",
        "ta": "しずか"
      },
      {
        "jp": "にぎやか",
        "r": "にぎやか",
        "en": "にぎやか",
        "ta": "にぎやか"
      },
      {
        "jp": "ゆうめい",
        "r": "ゆうめい",
        "en": "ゆうめい",
        "ta": "ゆうめい"
      },
      {
        "jp": "しんせつ",
        "r": "しんせつ",
        "en": "しんせつ",
        "ta": "しんせつ"
      },
      {
        "jp": "げんき",
        "r": "げんき",
        "en": "げんき",
        "ta": "げんき"
      },
      {
        "jp": "ひま",
        "r": "ひま",
        "en": "ひま",
        "ta": "ひま"
      },
      {
        "jp": "べんり",
        "r": "べんり",
        "en": "べんり",
        "ta": "べんり"
      },
      {
        "jp": "すてき",
        "r": "すてき",
        "en": "すてき",
        "ta": "すてき"
      },
      {
        "jp": "おおきい",
        "r": "おおきい",
        "en": "おおきい",
        "ta": "おおきい"
      },
      {
        "jp": "ちいさい",
        "r": "ちいさい",
        "en": "ちいさい",
        "ta": "ちいさい"
      },
      {
        "jp": "あたらしい",
        "r": "あたらしい",
        "en": "あたらしい",
        "ta": "あたらしい"
      },
      {
        "jp": "ふるい",
        "r": "ふるい",
        "en": "ふるい",
        "ta": "ふるい"
      },
      {
        "jp": "いい",
        "r": "いい",
        "en": "いい",
        "ta": "いい"
      },
      {
        "jp": "わるい",
        "r": "わるい",
        "en": "わるい",
        "ta": "わるい"
      },
      {
        "jp": "あつい",
        "r": "あつい",
        "en": "あつい",
        "ta": "あつい"
      },
      {
        "jp": "さむい",
        "r": "さむい",
        "en": "さむい",
        "ta": "さむい"
      },
      {
        "jp": "つめたい",
        "r": "つめたい",
        "en": "つめたい",
        "ta": "つめたい"
      },
      {
        "jp": "むずかしい",
        "r": "むずかしい",
        "en": "むずかしい",
        "ta": "むずかしい"
      },
      {
        "jp": "やさしい",
        "r": "やさしい",
        "en": "やさしい",
        "ta": "やさしい"
      },
      {
        "jp": "たかい",
        "r": "たかい",
        "en": "たかい",
        "ta": "たかい"
      },
      {
        "jp": "やすい",
        "r": "やすい",
        "en": "やすい",
        "ta": "やすい"
      },
      {
        "jp": "ひくい",
        "r": "ひくい",
        "en": "ひくい",
        "ta": "ひくい"
      },
      {
        "jp": "おもしろい",
        "r": "おもしろい",
        "en": "おもしろい",
        "ta": "おもしろい"
      },
      {
        "jp": "おいしい",
        "r": "おいしい",
        "en": "おいしい",
        "ta": "おいしい"
      },
      {
        "jp": "いそがしい",
        "r": "いそがしい",
        "en": "いそがしい",
        "ta": "いそがしい"
      },
      {
        "jp": "たのしい",
        "r": "たのしい",
        "en": "たのしい",
        "ta": "たのしい"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 8 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 8",
        "ta": "பாடம் 8 முதன்மை இலக்கணம்",
        "form": "Pattern: ハンサム + です/ます",
        "ex": {
          "jp": "ハンサムです。",
          "en": "Example of ハンサム.",
          "ta": "ハンサム உதாரணம்."
        }
      },
      {
        "t": "Lesson 8 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 8",
        "ta": "பாடம் 8 இரண்டாம் இலக்கணம்",
        "form": "Pattern: きれい + です/ます",
        "ex": {
          "jp": "きれいです。",
          "en": "Example of きれい.",
          "ta": "きれい உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 8: What is the meaning of 'ハンサム' (ハンサム)?",
        "options": [
          "ハンサム",
          "Water",
          "Book",
          "School"
        ],
        "answer": "ハンサム",
        "explain": "'ハンサム' means ハンサム (ハンサム)."
      },
      {
        "q": "Lesson 8: Identify the main grammar structure.",
        "options": [
          "Lesson 8 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 8 Core Pattern 1",
        "explain": "Lesson 8 focuses on Lesson 8 Core Pattern 1."
      }
    ]
  },
  {
    "id": 8,
    "jp": "かぜが つよいですね",
    "en": "The wind is strong (Adjectives & Qualities) (Lesson 8)",
    "ta": "காற்று வலிமையாக உள்ளது (பெயரடைகள்)",
    "vocab": [
      {
        "jp": "ハンサム",
        "r": "ハンサム",
        "en": "ハンサム",
        "ta": "ハンサム"
      },
      {
        "jp": "きれい",
        "r": "きれい",
        "en": "きれい",
        "ta": "きれい"
      },
      {
        "jp": "しずか",
        "r": "しずか",
        "en": "しずか",
        "ta": "しずか"
      },
      {
        "jp": "にぎやか",
        "r": "にぎやか",
        "en": "にぎやか",
        "ta": "にぎやか"
      },
      {
        "jp": "ゆうめい",
        "r": "ゆうめい",
        "en": "ゆうめい",
        "ta": "ゆうめい"
      },
      {
        "jp": "しんせつ",
        "r": "しんせつ",
        "en": "しんせつ",
        "ta": "しんせつ"
      },
      {
        "jp": "げんき",
        "r": "げんき",
        "en": "げんき",
        "ta": "げんき"
      },
      {
        "jp": "ひま",
        "r": "ひま",
        "en": "ひま",
        "ta": "ひま"
      },
      {
        "jp": "べんり",
        "r": "べんり",
        "en": "べんり",
        "ta": "べんり"
      },
      {
        "jp": "すてき",
        "r": "すてき",
        "en": "すてき",
        "ta": "すてき"
      },
      {
        "jp": "おおきい",
        "r": "おおきい",
        "en": "おおきい",
        "ta": "おおきい"
      },
      {
        "jp": "ちいさい",
        "r": "ちいさい",
        "en": "ちいさい",
        "ta": "ちいさい"
      },
      {
        "jp": "あたらしい",
        "r": "あたらしい",
        "en": "あたらしい",
        "ta": "あたらしい"
      },
      {
        "jp": "ふるい",
        "r": "ふるい",
        "en": "ふるい",
        "ta": "ふるい"
      },
      {
        "jp": "いい",
        "r": "いい",
        "en": "いい",
        "ta": "いい"
      },
      {
        "jp": "わるい",
        "r": "わるい",
        "en": "わるい",
        "ta": "わるい"
      },
      {
        "jp": "あつい",
        "r": "あつい",
        "en": "あつい",
        "ta": "あつい"
      },
      {
        "jp": "さむい",
        "r": "さむい",
        "en": "さむい",
        "ta": "さむい"
      },
      {
        "jp": "つめたい",
        "r": "つめたい",
        "en": "つめたい",
        "ta": "つめたい"
      },
      {
        "jp": "むずかしい",
        "r": "むずかしい",
        "en": "むずかしい",
        "ta": "むずかしい"
      },
      {
        "jp": "やさしい",
        "r": "やさしい",
        "en": "やさしい",
        "ta": "やさしい"
      },
      {
        "jp": "たかい",
        "r": "たかい",
        "en": "たかい",
        "ta": "たかい"
      },
      {
        "jp": "やすい",
        "r": "やすい",
        "en": "やすい",
        "ta": "やすい"
      },
      {
        "jp": "ひくい",
        "r": "ひくい",
        "en": "ひくい",
        "ta": "ひくい"
      },
      {
        "jp": "おもしろい",
        "r": "おもしろい",
        "en": "おもしろい",
        "ta": "おもしろい"
      },
      {
        "jp": "おいしい",
        "r": "おいしい",
        "en": "おいしい",
        "ta": "おいしい"
      },
      {
        "jp": "いそがしい",
        "r": "いそがしい",
        "en": "いそがしい",
        "ta": "いそがしい"
      },
      {
        "jp": "たのしい",
        "r": "たのしい",
        "en": "たのしい",
        "ta": "たのしい"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 8 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 8",
        "ta": "பாடம் 8 முதன்மை இலக்கணம்",
        "form": "Pattern: ハンサム + です/ます",
        "ex": {
          "jp": "ハンサムです。",
          "en": "Example of ハンサム.",
          "ta": "ハンサム உதாரணம்."
        }
      },
      {
        "t": "Lesson 8 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 8",
        "ta": "பாடம் 8 இரண்டாம் இலக்கணம்",
        "form": "Pattern: きれい + です/ます",
        "ex": {
          "jp": "きれいです。",
          "en": "Example of きれい.",
          "ta": "きれい உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 8: What is the meaning of 'ハンサム' (ハンサム)?",
        "options": [
          "ハンサム",
          "Water",
          "Book",
          "School"
        ],
        "answer": "ハンサム",
        "explain": "'ハンサム' means ハンサム (ハンサム)."
      },
      {
        "q": "Lesson 8: Identify the main grammar structure.",
        "options": [
          "Lesson 8 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 8 Core Pattern 1",
        "explain": "Lesson 8 focuses on Lesson 8 Core Pattern 1."
      }
    ]
  },
  {
    "id": 9,
    "jp": "わたしは いぬが すきです",
    "en": "I like dogs (Preferences & Abilities) (Lesson 9)",
    "ta": "எனக்கு நாய்கள் பிடிக்கும்",
    "vocab": [
      {
        "jp": "すき",
        "r": "すき",
        "en": "すき",
        "ta": "すき"
      },
      {
        "jp": "きらい",
        "r": "きらい",
        "en": "きらい",
        "ta": "きらい"
      },
      {
        "jp": "じょうず",
        "r": "じょうず",
        "en": "じょうず",
        "ta": "じょうず"
      },
      {
        "jp": "へた",
        "r": "へた",
        "en": "へた",
        "ta": "へた"
      },
      {
        "jp": "わかります",
        "r": "わかります",
        "en": "わかります",
        "ta": "わかります"
      },
      {
        "jp": "あります",
        "r": "あります",
        "en": "あります",
        "ta": "あります"
      },
      {
        "jp": "りょうり",
        "r": "りょうり",
        "en": "りょうり",
        "ta": "りょうり"
      },
      {
        "jp": "スポーツ",
        "r": "スポーツ",
        "en": "スポーツ",
        "ta": "スポーツ"
      },
      {
        "jp": "やきゅう",
        "r": "やきゅう",
        "en": "やきゅう",
        "ta": "やきゅう"
      },
      {
        "jp": "ダンス",
        "r": "ダンス",
        "en": "ダンス",
        "ta": "ダンス"
      },
      {
        "jp": "おんがく",
        "r": "おんがく",
        "en": "おんがく",
        "ta": "おんがく"
      },
      {
        "jp": "うた",
        "r": "うた",
        "en": "うた",
        "ta": "うた"
      },
      {
        "jp": "クラシック",
        "r": "クラシック",
        "en": "クラシック",
        "ta": "クラシック"
      },
      {
        "jp": "ジャズ",
        "r": "ジャズ",
        "en": "ジャズ",
        "ta": "ジャズ"
      },
      {
        "jp": "コンサート",
        "r": "コンサート",
        "en": "コンサート",
        "ta": "コンサート"
      },
      {
        "jp": "カラオケ",
        "r": "カラオケ",
        "en": "カラオケ",
        "ta": "カラオケ"
      },
      {
        "jp": "かぶき",
        "r": "かぶき",
        "en": "かぶき",
        "ta": "かぶき"
      },
      {
        "jp": "え",
        "r": "え",
        "en": "え",
        "ta": "え"
      },
      {
        "jp": "じ",
        "r": "じ",
        "en": "じ",
        "ta": "じ"
      },
      {
        "jp": "かんじ",
        "r": "かんじ",
        "en": "かんじ",
        "ta": "かんじ"
      },
      {
        "jp": "ひらがな",
        "r": "ひらがな",
        "en": "ひらがな",
        "ta": "ひらがな"
      },
      {
        "jp": "かたかな",
        "r": "かたかな",
        "en": "かたかな",
        "ta": "かたかな"
      },
      {
        "jp": "ローマじ",
        "r": "ローマじ",
        "en": "ローマじ",
        "ta": "ローマじ"
      },
      {
        "jp": "こまかい おかね",
        "r": "こまかい おかね",
        "en": "こまかい おかね",
        "ta": "こまかい おかね"
      },
      {
        "jp": "チケット",
        "r": "チケット",
        "en": "チケット",
        "ta": "チケット"
      },
      {
        "jp": "じかん",
        "r": "じかん",
        "en": "じかん",
        "ta": "じかん"
      },
      {
        "jp": "ようじ",
        "r": "ようじ",
        "en": "ようじ",
        "ta": "ようじ"
      },
      {
        "jp": "やくそく",
        "r": "やくそく",
        "en": "やくそく",
        "ta": "やくそく"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 9 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 9",
        "ta": "பாடம் 9 முதன்மை இலக்கணம்",
        "form": "Pattern: すき + です/ます",
        "ex": {
          "jp": "すきです。",
          "en": "Example of すき.",
          "ta": "すき உதாரணம்."
        }
      },
      {
        "t": "Lesson 9 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 9",
        "ta": "பாடம் 9 இரண்டாம் இலக்கணம்",
        "form": "Pattern: きらい + です/ます",
        "ex": {
          "jp": "きらいです。",
          "en": "Example of きらい.",
          "ta": "きらい உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 9: What is the meaning of 'すき' (すき)?",
        "options": [
          "すき",
          "Water",
          "Book",
          "School"
        ],
        "answer": "すき",
        "explain": "'すき' means すき (すき)."
      },
      {
        "q": "Lesson 9: Identify the main grammar structure.",
        "options": [
          "Lesson 9 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 9 Core Pattern 1",
        "explain": "Lesson 9 focuses on Lesson 9 Core Pattern 1."
      }
    ]
  },
  {
    "id": 9,
    "jp": "わたしは いぬが すきです",
    "en": "I like dogs (Preferences & Abilities) (Lesson 9)",
    "ta": "எனக்கு நாய்கள் பிடிக்கும்",
    "vocab": [
      {
        "jp": "すき",
        "r": "すき",
        "en": "すき",
        "ta": "すき"
      },
      {
        "jp": "きらい",
        "r": "きらい",
        "en": "きらい",
        "ta": "きらい"
      },
      {
        "jp": "じょうず",
        "r": "じょうず",
        "en": "じょうず",
        "ta": "じょうず"
      },
      {
        "jp": "へた",
        "r": "へた",
        "en": "へた",
        "ta": "へた"
      },
      {
        "jp": "わかります",
        "r": "わかります",
        "en": "わかります",
        "ta": "わかります"
      },
      {
        "jp": "あります",
        "r": "あります",
        "en": "あります",
        "ta": "あります"
      },
      {
        "jp": "りょうり",
        "r": "りょうり",
        "en": "りょうり",
        "ta": "りょうり"
      },
      {
        "jp": "スポーツ",
        "r": "スポーツ",
        "en": "スポーツ",
        "ta": "スポーツ"
      },
      {
        "jp": "やきゅう",
        "r": "やきゅう",
        "en": "やきゅう",
        "ta": "やきゅう"
      },
      {
        "jp": "ダンス",
        "r": "ダンス",
        "en": "ダンス",
        "ta": "ダンス"
      },
      {
        "jp": "おんがく",
        "r": "おんがく",
        "en": "おんがく",
        "ta": "おんがく"
      },
      {
        "jp": "うた",
        "r": "うた",
        "en": "うた",
        "ta": "うた"
      },
      {
        "jp": "クラシック",
        "r": "クラシック",
        "en": "クラシック",
        "ta": "クラシック"
      },
      {
        "jp": "ジャズ",
        "r": "ジャズ",
        "en": "ジャズ",
        "ta": "ジャズ"
      },
      {
        "jp": "コンサート",
        "r": "コンサート",
        "en": "コンサート",
        "ta": "コンサート"
      },
      {
        "jp": "カラオケ",
        "r": "カラオケ",
        "en": "カラオケ",
        "ta": "カラオケ"
      },
      {
        "jp": "かぶき",
        "r": "かぶき",
        "en": "かぶき",
        "ta": "かぶき"
      },
      {
        "jp": "え",
        "r": "え",
        "en": "え",
        "ta": "え"
      },
      {
        "jp": "じ",
        "r": "じ",
        "en": "じ",
        "ta": "じ"
      },
      {
        "jp": "かんじ",
        "r": "かんじ",
        "en": "かんじ",
        "ta": "かんじ"
      },
      {
        "jp": "ひらがな",
        "r": "ひらがな",
        "en": "ひらがな",
        "ta": "ひらがな"
      },
      {
        "jp": "かたかな",
        "r": "かたかな",
        "en": "かたかな",
        "ta": "かたかな"
      },
      {
        "jp": "ローマじ",
        "r": "ローマじ",
        "en": "ローマじ",
        "ta": "ローマじ"
      },
      {
        "jp": "こまかい おかね",
        "r": "こまかい おかね",
        "en": "こまかい おかね",
        "ta": "こまかい おかね"
      },
      {
        "jp": "チケット",
        "r": "チケット",
        "en": "チケット",
        "ta": "チケット"
      },
      {
        "jp": "じかん",
        "r": "じかん",
        "en": "じかん",
        "ta": "じかん"
      },
      {
        "jp": "ようじ",
        "r": "ようじ",
        "en": "ようじ",
        "ta": "ようじ"
      },
      {
        "jp": "やくそく",
        "r": "やくそく",
        "en": "やくそく",
        "ta": "やくそく"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 9 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 9",
        "ta": "பாடம் 9 முதன்மை இலக்கணம்",
        "form": "Pattern: すき + です/ます",
        "ex": {
          "jp": "すきです。",
          "en": "Example of すき.",
          "ta": "すき உதாரணம்."
        }
      },
      {
        "t": "Lesson 9 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 9",
        "ta": "பாடம் 9 இரண்டாம் இலக்கணம்",
        "form": "Pattern: きらい + です/ます",
        "ex": {
          "jp": "きらいです。",
          "en": "Example of きらい.",
          "ta": "きらい உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 9: What is the meaning of 'すき' (すき)?",
        "options": [
          "すき",
          "Water",
          "Book",
          "School"
        ],
        "answer": "すき",
        "explain": "'すき' means すき (すき)."
      },
      {
        "q": "Lesson 9: Identify the main grammar structure.",
        "options": [
          "Lesson 9 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 9 Core Pattern 1",
        "explain": "Lesson 9 focuses on Lesson 9 Core Pattern 1."
      }
    ]
  },
  {
    "id": 10,
    "jp": "つくえの うえに ねこが います",
    "en": "There is a cat on the desk (Existence & Positions) (Lesson 10)",
    "ta": "மேசையின் மேல் பூனை உள்ளது",
    "vocab": [
      {
        "jp": "あります",
        "r": "あります",
        "en": "あります",
        "ta": "あります"
      },
      {
        "jp": "います",
        "r": "います",
        "en": "います",
        "ta": "います"
      },
      {
        "jp": "おとこの ひと",
        "r": "おとこの ひと",
        "en": "おとこの ひと",
        "ta": "おとこの ひと"
      },
      {
        "jp": "おんなの ひと",
        "r": "おんなの ひと",
        "en": "おんなの ひと",
        "ta": "おんなの ひと"
      },
      {
        "jp": "おとこの こ",
        "r": "おとこの こ",
        "en": "おとこの こ",
        "ta": "おとこの こ"
      },
      {
        "jp": "おんなの こ",
        "r": "おんなの こ",
        "en": "おんなの こ",
        "ta": "おんなの こ"
      },
      {
        "jp": "いぬ",
        "r": "いぬ",
        "en": "いぬ",
        "ta": "いぬ"
      },
      {
        "jp": "ねこ",
        "r": "ねこ",
        "en": "ねこ",
        "ta": "ねこ"
      },
      {
        "jp": "き",
        "r": "き",
        "en": "き",
        "ta": "き"
      },
      {
        "jp": "もの",
        "r": "もの",
        "en": "もの",
        "ta": "もの"
      },
      {
        "jp": "フィルム",
        "r": "フィルム",
        "en": "フィルム",
        "ta": "フィルム"
      },
      {
        "jp": "かんちがえ",
        "r": "かんちがえ",
        "en": "かんちがえ",
        "ta": "かんちがえ"
      },
      {
        "jp": "はこ",
        "r": "はこ",
        "en": "はこ",
        "ta": "はこ"
      },
      {
        "jp": "スイッチ",
        "r": "スイッチ",
        "en": "スイッチ",
        "ta": "スイッチ"
      },
      {
        "jp": "れいぞうこ",
        "r": "れいぞうこ",
        "en": "れいぞうこ",
        "ta": "れいぞうこ"
      },
      {
        "jp": "テーブル",
        "r": "テーブル",
        "en": "テーブル",
        "ta": "テーブル"
      },
      {
        "jp": "ベッド",
        "r": "ベッド",
        "en": "ベッド",
        "ta": "ベッド"
      },
      {
        "jp": "たな",
        "r": "たな",
        "en": "たな",
        "ta": "たな"
      },
      {
        "jp": "ドア",
        "r": "ドア",
        "en": "ドア",
        "ta": "ドア"
      },
      {
        "jp": "まど",
        "r": "まど",
        "en": "まど",
        "ta": "まど"
      },
      {
        "jp": "ポスト",
        "r": "ポスト",
        "en": "ポスト",
        "ta": "ポスト"
      },
      {
        "jp": "ビル",
        "r": "ビル",
        "en": "ビル",
        "ta": "ビル"
      },
      {
        "jp": "コンビニ",
        "r": "コンビニ",
        "en": "コンビニ",
        "ta": "コンビニ"
      },
      {
        "jp": "きっさてん",
        "r": "きっさてん",
        "en": "きっさてん",
        "ta": "きっさてん"
      },
      {
        "jp": "本や",
        "r": "本や",
        "en": "本や",
        "ta": "本や"
      },
      {
        "jp": "のりば",
        "r": "のりば",
        "en": "のりば",
        "ta": "のりば"
      },
      {
        "jp": "けん",
        "r": "けん",
        "en": "けん",
        "ta": "けん"
      },
      {
        "jp": "うえ",
        "r": "うえ",
        "en": "うえ",
        "ta": "うえ"
      },
      {
        "jp": "した",
        "r": "した",
        "en": "した",
        "ta": "した"
      },
      {
        "jp": "まえ",
        "r": "まえ",
        "en": "まえ",
        "ta": "まえ"
      },
      {
        "jp": "うしろ",
        "r": "うしろ",
        "en": "うしろ",
        "ta": "うしろ"
      },
      {
        "jp": "みぎ",
        "r": "みぎ",
        "en": "みぎ",
        "ta": "みぎ"
      },
      {
        "jp": "ひだり",
        "r": "ひだり",
        "en": "ひだり",
        "ta": "ひだり"
      },
      {
        "jp": "なか",
        "r": "なか",
        "en": "なか",
        "ta": "なか"
      },
      {
        "jp": "そと",
        "r": "そと",
        "en": "そと",
        "ta": "そと"
      },
      {
        "jp": "となり",
        "r": "となり",
        "en": "となり",
        "ta": "となり"
      },
      {
        "jp": "ちかく",
        "r": "ちかく",
        "en": "ちかく",
        "ta": "ちかく"
      },
      {
        "jp": "あいだ",
        "r": "あいだ",
        "en": "あいだ",
        "ta": "あいだ"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 10 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 10",
        "ta": "பாடம் 10 முதன்மை இலக்கணம்",
        "form": "Pattern: あります + です/ます",
        "ex": {
          "jp": "ありますです。",
          "en": "Example of あります.",
          "ta": "あります உதாரணம்."
        }
      },
      {
        "t": "Lesson 10 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 10",
        "ta": "பாடம் 10 இரண்டாம் இலக்கணம்",
        "form": "Pattern: います + です/ます",
        "ex": {
          "jp": "いますです。",
          "en": "Example of います.",
          "ta": "います உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 10: What is the meaning of 'あります' (あります)?",
        "options": [
          "あります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "あります",
        "explain": "'あります' means あります (あります)."
      },
      {
        "q": "Lesson 10: Identify the main grammar structure.",
        "options": [
          "Lesson 10 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 10 Core Pattern 1",
        "explain": "Lesson 10 focuses on Lesson 10 Core Pattern 1."
      }
    ]
  },
  {
    "id": 10,
    "jp": "つくえの うえに ねこが います",
    "en": "There is a cat on the desk (Existence & Positions) (Lesson 10)",
    "ta": "மேசையின் மேல் பூனை உள்ளது",
    "vocab": [
      {
        "jp": "あります",
        "r": "あります",
        "en": "あります",
        "ta": "あります"
      },
      {
        "jp": "います",
        "r": "います",
        "en": "います",
        "ta": "います"
      },
      {
        "jp": "おとこの ひと",
        "r": "おとこの ひと",
        "en": "おとこの ひと",
        "ta": "おとこの ひと"
      },
      {
        "jp": "おんなの ひと",
        "r": "おんなの ひと",
        "en": "おんなの ひと",
        "ta": "おんなの ひと"
      },
      {
        "jp": "おとこの こ",
        "r": "おとこの こ",
        "en": "おとこの こ",
        "ta": "おとこの こ"
      },
      {
        "jp": "おんなの こ",
        "r": "おんなの こ",
        "en": "おんなの こ",
        "ta": "おんなの こ"
      },
      {
        "jp": "いぬ",
        "r": "いぬ",
        "en": "いぬ",
        "ta": "いぬ"
      },
      {
        "jp": "ねこ",
        "r": "ねこ",
        "en": "ねこ",
        "ta": "ねこ"
      },
      {
        "jp": "き",
        "r": "き",
        "en": "き",
        "ta": "き"
      },
      {
        "jp": "もの",
        "r": "もの",
        "en": "もの",
        "ta": "もの"
      },
      {
        "jp": "フィルム",
        "r": "フィルム",
        "en": "フィルム",
        "ta": "フィルム"
      },
      {
        "jp": "かんちがえ",
        "r": "かんちがえ",
        "en": "かんちがえ",
        "ta": "かんちがえ"
      },
      {
        "jp": "はこ",
        "r": "はこ",
        "en": "はこ",
        "ta": "はこ"
      },
      {
        "jp": "スイッチ",
        "r": "スイッチ",
        "en": "スイッチ",
        "ta": "スイッチ"
      },
      {
        "jp": "れいぞうこ",
        "r": "れいぞうこ",
        "en": "れいぞうこ",
        "ta": "れいぞうこ"
      },
      {
        "jp": "テーブル",
        "r": "テーブル",
        "en": "テーブル",
        "ta": "テーブル"
      },
      {
        "jp": "ベッド",
        "r": "ベッド",
        "en": "ベッド",
        "ta": "ベッド"
      },
      {
        "jp": "たな",
        "r": "たな",
        "en": "たな",
        "ta": "たな"
      },
      {
        "jp": "ドア",
        "r": "ドア",
        "en": "ドア",
        "ta": "ドア"
      },
      {
        "jp": "まど",
        "r": "まど",
        "en": "まど",
        "ta": "まど"
      },
      {
        "jp": "ポスト",
        "r": "ポスト",
        "en": "ポスト",
        "ta": "ポスト"
      },
      {
        "jp": "ビル",
        "r": "ビル",
        "en": "ビル",
        "ta": "ビル"
      },
      {
        "jp": "コンビニ",
        "r": "コンビニ",
        "en": "コンビニ",
        "ta": "コンビニ"
      },
      {
        "jp": "きっさてん",
        "r": "きっさてん",
        "en": "きっさてん",
        "ta": "きっさてん"
      },
      {
        "jp": "本や",
        "r": "本や",
        "en": "本や",
        "ta": "本や"
      },
      {
        "jp": "のりば",
        "r": "のりば",
        "en": "のりば",
        "ta": "のりば"
      },
      {
        "jp": "けん",
        "r": "けん",
        "en": "けん",
        "ta": "けん"
      },
      {
        "jp": "うえ",
        "r": "うえ",
        "en": "うえ",
        "ta": "うえ"
      },
      {
        "jp": "した",
        "r": "した",
        "en": "した",
        "ta": "した"
      },
      {
        "jp": "まえ",
        "r": "まえ",
        "en": "まえ",
        "ta": "まえ"
      },
      {
        "jp": "うしろ",
        "r": "うしろ",
        "en": "うしろ",
        "ta": "うしろ"
      },
      {
        "jp": "みぎ",
        "r": "みぎ",
        "en": "みぎ",
        "ta": "みぎ"
      },
      {
        "jp": "ひだり",
        "r": "ひだり",
        "en": "ひだり",
        "ta": "ひだり"
      },
      {
        "jp": "なか",
        "r": "なか",
        "en": "なか",
        "ta": "なか"
      },
      {
        "jp": "そと",
        "r": "そと",
        "en": "そと",
        "ta": "そと"
      },
      {
        "jp": "となり",
        "r": "となり",
        "en": "となり",
        "ta": "となり"
      },
      {
        "jp": "ちかく",
        "r": "ちかく",
        "en": "ちかく",
        "ta": "ちかく"
      },
      {
        "jp": "あいだ",
        "r": "あいだ",
        "en": "あいだ",
        "ta": "あいだ"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 10 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 10",
        "ta": "பாடம் 10 முதன்மை இலக்கணம்",
        "form": "Pattern: あります + です/ます",
        "ex": {
          "jp": "ありますです。",
          "en": "Example of あります.",
          "ta": "あります உதாரணம்."
        }
      },
      {
        "t": "Lesson 10 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 10",
        "ta": "பாடம் 10 இரண்டாம் இலக்கணம்",
        "form": "Pattern: います + です/ます",
        "ex": {
          "jp": "いますです。",
          "en": "Example of います.",
          "ta": "います உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 10: What is the meaning of 'あります' (あります)?",
        "options": [
          "あります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "あります",
        "explain": "'あります' means あります (あります)."
      },
      {
        "q": "Lesson 10: Identify the main grammar structure.",
        "options": [
          "Lesson 10 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 10 Core Pattern 1",
        "explain": "Lesson 10 focuses on Lesson 10 Core Pattern 1."
      }
    ]
  },
  {
    "id": 11,
    "jp": "りんごを みっつ ください",
    "en": "Please give me three apples (Counters & Quantities) (Lesson 11)",
    "ta": "மூன்று ஆப்பிள் தாருங்கள்",
    "vocab": [
      {
        "jp": "ひとつ",
        "r": "ひとつ",
        "en": "ひとつ",
        "ta": "ひとつ"
      },
      {
        "jp": "ふたつ",
        "r": "ふたつ",
        "en": "ふたつ",
        "ta": "ふたつ"
      },
      {
        "jp": "みっつ",
        "r": "みっつ",
        "en": "みっつ",
        "ta": "みっつ"
      },
      {
        "jp": "よっつ",
        "r": "よっつ",
        "en": "よっつ",
        "ta": "よっつ"
      },
      {
        "jp": "いつつ",
        "r": "いつつ",
        "en": "いつつ",
        "ta": "いつつ"
      },
      {
        "jp": "むっつ",
        "r": "むっつ",
        "en": "むっつ",
        "ta": "むっつ"
      },
      {
        "jp": "ななつ",
        "r": "ななつ",
        "en": "ななつ",
        "ta": "ななつ"
      },
      {
        "jp": "やつ",
        "r": "やつ",
        "en": "やつ",
        "ta": "やつ"
      },
      {
        "jp": "ここのつ",
        "r": "ここのつ",
        "en": "ここのつ",
        "ta": "ここのつ"
      },
      {
        "jp": "とお",
        "r": "とお",
        "en": "とお",
        "ta": "とお"
      },
      {
        "jp": "いくつ",
        "r": "いくつ",
        "en": "いくつ",
        "ta": "いくつ"
      },
      {
        "jp": "ひとり",
        "r": "ひとり",
        "en": "ひとり",
        "ta": "ひとり"
      },
      {
        "jp": "ふたり",
        "r": "ふたり",
        "en": "ふたり",
        "ta": "ふたり"
      },
      {
        "jp": "～にん",
        "r": "～にん",
        "en": "～にん",
        "ta": "～にん"
      },
      {
        "jp": "～だい",
        "r": "～だい",
        "en": "～だい",
        "ta": "～だい"
      },
      {
        "jp": "～まい",
        "r": "～まい",
        "en": "～まい",
        "ta": "～まい"
      },
      {
        "jp": "～かい",
        "r": "～かい",
        "en": "～かい",
        "ta": "～かい"
      },
      {
        "jp": "りんご",
        "r": "りんご",
        "en": "りんご",
        "ta": "りんご"
      },
      {
        "jp": "みかん",
        "r": "みかん",
        "en": "みかん",
        "ta": "みかん"
      },
      {
        "jp": "サンドイッチ",
        "r": "サンドイッチ",
        "en": "サンドイッチ",
        "ta": "サンドイッチ"
      },
      {
        "jp": "カレー[ライス]",
        "r": "カレー[ライス]",
        "en": "カレー[ライス]",
        "ta": "カレー[ライス]"
      },
      {
        "jp": "アイスクリーム",
        "r": "アイスクリーム",
        "en": "アイスクリーム",
        "ta": "アイスクリーム"
      },
      {
        "jp": "きってみ",
        "r": "きってみ",
        "en": "きってみ",
        "ta": "きってみ"
      },
      {
        "jp": "はがき",
        "r": "はがき",
        "en": "はがき",
        "ta": "はがき"
      },
      {
        "jp": "ふうとう",
        "r": "ふうとう",
        "en": "ふうとう",
        "ta": "ふうとう"
      },
      {
        "jp": "そくたつ",
        "r": "そくたつ",
        "en": "そくたつ",
        "ta": "そくたつ"
      },
      {
        "jp": "かきとめ",
        "r": "かきとめ",
        "en": "かきとめ",
        "ta": "かきとめ"
      },
      {
        "jp": "エアメール",
        "r": "エアメール",
        "en": "エアメール",
        "ta": "エアメール"
      },
      {
        "jp": "ふなびん",
        "r": "ふなびん",
        "en": "ふなびん",
        "ta": "ふなびん"
      },
      {
        "jp": "りょうしん",
        "r": "りょうしん",
        "en": "りょうしん",
        "ta": "りょうしん"
      },
      {
        "jp": "きょうだい",
        "r": "きょうだい",
        "en": "きょうだい",
        "ta": "きょうだい"
      },
      {
        "jp": "あに",
        "r": "あに",
        "en": "あに",
        "ta": "あに"
      },
      {
        "jp": "あね",
        "r": "あね",
        "en": "あね",
        "ta": "あね"
      },
      {
        "jp": "とうと",
        "r": "とうと",
        "en": "とうと",
        "ta": "とうと"
      },
      {
        "jp": "いもうと",
        "r": "いもうと",
        "en": "いもうと",
        "ta": "いもうと"
      },
      {
        "jp": "がいこく",
        "r": "がいこく",
        "en": "がいこく",
        "ta": "がいこく"
      },
      {
        "jp": "～じかん",
        "r": "～じかん",
        "en": "～じかん",
        "ta": "～じかん"
      },
      {
        "jp": "～しゅうかん",
        "r": "～しゅうかん",
        "en": "～しゅうかん",
        "ta": "～しゅうかん"
      },
      {
        "jp": "～かげつ",
        "r": "～かげつ",
        "en": "～かげつ",
        "ta": "～かげつ"
      },
      {
        "jp": "～ねん",
        "r": "～ねん",
        "en": "～ねん",
        "ta": "～ねん"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 11 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 11",
        "ta": "பாடம் 11 முதன்மை இலக்கணம்",
        "form": "Pattern: ひとつ + です/ます",
        "ex": {
          "jp": "ひとつです。",
          "en": "Example of ひとつ.",
          "ta": "ひとつ உதாரணம்."
        }
      },
      {
        "t": "Lesson 11 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 11",
        "ta": "பாடம் 11 இரண்டாம் இலக்கணம்",
        "form": "Pattern: ふたつ + です/ます",
        "ex": {
          "jp": "ふたつです。",
          "en": "Example of ふたつ.",
          "ta": "ふたつ உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 11: What is the meaning of 'ひとつ' (ひとつ)?",
        "options": [
          "ひとつ",
          "Water",
          "Book",
          "School"
        ],
        "answer": "ひとつ",
        "explain": "'ひとつ' means ひとつ (ひとつ)."
      },
      {
        "q": "Lesson 11: Identify the main grammar structure.",
        "options": [
          "Lesson 11 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 11 Core Pattern 1",
        "explain": "Lesson 11 focuses on Lesson 11 Core Pattern 1."
      }
    ]
  },
  {
    "id": 11,
    "jp": "りんごを みっつ ください",
    "en": "Please give me three apples (Counters & Quantities) (Lesson 11)",
    "ta": "மூன்று ஆப்பிள் தாருங்கள்",
    "vocab": [
      {
        "jp": "ひとつ",
        "r": "ひとつ",
        "en": "ひとつ",
        "ta": "ひとつ"
      },
      {
        "jp": "ふたつ",
        "r": "ふたつ",
        "en": "ふたつ",
        "ta": "ふたつ"
      },
      {
        "jp": "みっつ",
        "r": "みっつ",
        "en": "みっつ",
        "ta": "みっつ"
      },
      {
        "jp": "よっつ",
        "r": "よっつ",
        "en": "よっつ",
        "ta": "よっつ"
      },
      {
        "jp": "いつつ",
        "r": "いつつ",
        "en": "いつつ",
        "ta": "いつつ"
      },
      {
        "jp": "むっつ",
        "r": "むっつ",
        "en": "むっつ",
        "ta": "むっつ"
      },
      {
        "jp": "ななつ",
        "r": "ななつ",
        "en": "ななつ",
        "ta": "ななつ"
      },
      {
        "jp": "やつ",
        "r": "やつ",
        "en": "やつ",
        "ta": "やつ"
      },
      {
        "jp": "ここのつ",
        "r": "ここのつ",
        "en": "ここのつ",
        "ta": "ここのつ"
      },
      {
        "jp": "とお",
        "r": "とお",
        "en": "とお",
        "ta": "とお"
      },
      {
        "jp": "いくつ",
        "r": "いくつ",
        "en": "いくつ",
        "ta": "いくつ"
      },
      {
        "jp": "ひとり",
        "r": "ひとり",
        "en": "ひとり",
        "ta": "ひとり"
      },
      {
        "jp": "ふたり",
        "r": "ふたり",
        "en": "ふたり",
        "ta": "ふたり"
      },
      {
        "jp": "～にん",
        "r": "～にん",
        "en": "～にん",
        "ta": "～にん"
      },
      {
        "jp": "～だい",
        "r": "～だい",
        "en": "～だい",
        "ta": "～だい"
      },
      {
        "jp": "～まい",
        "r": "～まい",
        "en": "～まい",
        "ta": "～まい"
      },
      {
        "jp": "～かい",
        "r": "～かい",
        "en": "～かい",
        "ta": "～かい"
      },
      {
        "jp": "りんご",
        "r": "りんご",
        "en": "りんご",
        "ta": "りんご"
      },
      {
        "jp": "みかん",
        "r": "みかん",
        "en": "みかん",
        "ta": "みかん"
      },
      {
        "jp": "サンドイッチ",
        "r": "サンドイッチ",
        "en": "サンドイッチ",
        "ta": "サンドイッチ"
      },
      {
        "jp": "カレー[ライス]",
        "r": "カレー[ライス]",
        "en": "カレー[ライス]",
        "ta": "カレー[ライス]"
      },
      {
        "jp": "アイスクリーム",
        "r": "アイスクリーム",
        "en": "アイスクリーム",
        "ta": "アイスクリーム"
      },
      {
        "jp": "きってみ",
        "r": "きってみ",
        "en": "きってみ",
        "ta": "きってみ"
      },
      {
        "jp": "はがき",
        "r": "はがき",
        "en": "はがき",
        "ta": "はがき"
      },
      {
        "jp": "ふうとう",
        "r": "ふうとう",
        "en": "ふうとう",
        "ta": "ふうとう"
      },
      {
        "jp": "そくたつ",
        "r": "そくたつ",
        "en": "そくたつ",
        "ta": "そくたつ"
      },
      {
        "jp": "かきとめ",
        "r": "かきとめ",
        "en": "かきとめ",
        "ta": "かきとめ"
      },
      {
        "jp": "エアメール",
        "r": "エアメール",
        "en": "エアメール",
        "ta": "エアメール"
      },
      {
        "jp": "ふなびん",
        "r": "ふなびん",
        "en": "ふなびん",
        "ta": "ふなびん"
      },
      {
        "jp": "りょうしん",
        "r": "りょうしん",
        "en": "りょうしん",
        "ta": "りょうしん"
      },
      {
        "jp": "きょうだい",
        "r": "きょうだい",
        "en": "きょうだい",
        "ta": "きょうだい"
      },
      {
        "jp": "あに",
        "r": "あに",
        "en": "あに",
        "ta": "あに"
      },
      {
        "jp": "あね",
        "r": "あね",
        "en": "あね",
        "ta": "あね"
      },
      {
        "jp": "とうと",
        "r": "とうと",
        "en": "とうと",
        "ta": "とうと"
      },
      {
        "jp": "いもうと",
        "r": "いもうと",
        "en": "いもうと",
        "ta": "いもうと"
      },
      {
        "jp": "がいこく",
        "r": "がいこく",
        "en": "がいこく",
        "ta": "がいこく"
      },
      {
        "jp": "～じかん",
        "r": "～じかん",
        "en": "～じかん",
        "ta": "～じかん"
      },
      {
        "jp": "～しゅうかん",
        "r": "～しゅうかん",
        "en": "～しゅうかん",
        "ta": "～しゅうかん"
      },
      {
        "jp": "～かげつ",
        "r": "～かげつ",
        "en": "～かげつ",
        "ta": "～かげつ"
      },
      {
        "jp": "～ねん",
        "r": "～ねん",
        "en": "～ねん",
        "ta": "～ねん"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 11 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 11",
        "ta": "பாடம் 11 முதன்மை இலக்கணம்",
        "form": "Pattern: ひとつ + です/ます",
        "ex": {
          "jp": "ひとつです。",
          "en": "Example of ひとつ.",
          "ta": "ひとつ உதாரணம்."
        }
      },
      {
        "t": "Lesson 11 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 11",
        "ta": "பாடம் 11 இரண்டாம் இலக்கணம்",
        "form": "Pattern: ふたつ + です/ます",
        "ex": {
          "jp": "ふたつです。",
          "en": "Example of ふたつ.",
          "ta": "ふたつ உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 11: What is the meaning of 'ひとつ' (ひとつ)?",
        "options": [
          "ひとつ",
          "Water",
          "Book",
          "School"
        ],
        "answer": "ひとつ",
        "explain": "'ひとつ' means ひとつ (ひとつ)."
      },
      {
        "q": "Lesson 11: Identify the main grammar structure.",
        "options": [
          "Lesson 11 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 11 Core Pattern 1",
        "explain": "Lesson 11 focuses on Lesson 11 Core Pattern 1."
      }
    ]
  },
  {
    "id": 12,
    "jp": "たんじょうびは いつですか",
    "en": "When is your birthday? (Past States & Comparisons) (Lesson 12)",
    "ta": "உங்கள் பிறந்தநாள் எப்போது?",
    "vocab": [
      {
        "jp": "かんたん",
        "r": "かんたん",
        "en": "かんたん",
        "ta": "かんたん"
      },
      {
        "jp": "ちかい",
        "r": "ちかい",
        "en": "ちかい",
        "ta": "ちかい"
      },
      {
        "jp": "とおい",
        "r": "とおい",
        "en": "とおい",
        "ta": "とおい"
      },
      {
        "jp": "はやい",
        "r": "はやい",
        "en": "はやい",
        "ta": "はやい"
      },
      {
        "jp": "おそい",
        "r": "おそい",
        "en": "おそい",
        "ta": "おそい"
      },
      {
        "jp": "多い",
        "r": "多い",
        "en": "多い",
        "ta": "多い"
      },
      {
        "jp": "すくない",
        "r": "すくない",
        "en": "すくない",
        "ta": "すくない"
      },
      {
        "jp": "あたたかい",
        "r": "あたたかい",
        "en": "あたたかい",
        "ta": "あたたかい"
      },
      {
        "jp": "すずしい",
        "r": "すずしい",
        "en": "すずしい",
        "ta": "すずしい"
      },
      {
        "jp": "あまい",
        "r": "あまい",
        "en": "あまい",
        "ta": "あまい"
      },
      {
        "jp": "からい",
        "r": "からい",
        "en": "からい",
        "ta": "からい"
      },
      {
        "jp": "重い",
        "r": "重い",
        "en": "重い",
        "ta": "重い"
      },
      {
        "jp": "かるい",
        "r": "かるい",
        "en": "かるい",
        "ta": "かるい"
      },
      {
        "jp": "いい",
        "r": "いい",
        "en": "いい",
        "ta": "いい"
      },
      {
        "jp": "きせつ",
        "r": "きせつ",
        "en": "きせつ",
        "ta": "きせつ"
      },
      {
        "jp": "はる",
        "r": "はる",
        "en": "はる",
        "ta": "はる"
      },
      {
        "jp": "なつ",
        "r": "なつ",
        "en": "なつ",
        "ta": "なつ"
      },
      {
        "jp": "あき",
        "r": "あき",
        "en": "あき",
        "ta": "あき"
      },
      {
        "jp": "ふゆ",
        "r": "ふゆ",
        "en": "ふゆ",
        "ta": "ふゆ"
      },
      {
        "jp": "てんき",
        "r": "てんき",
        "en": "てんき",
        "ta": "てんき"
      },
      {
        "jp": "あめ",
        "r": "あめ",
        "en": "あめ",
        "ta": "あめ"
      },
      {
        "jp": "ゆき",
        "r": "ゆき",
        "en": "ゆき",
        "ta": "ゆき"
      },
      {
        "jp": "くもり",
        "r": "くもり",
        "en": "くもり",
        "ta": "くもり"
      },
      {
        "jp": "ホテル",
        "r": "ホテル",
        "en": "ホテル",
        "ta": "ホテル"
      },
      {
        "jp": "くうこう",
        "r": "くうこう",
        "en": "くうこう",
        "ta": "くうこう"
      },
      {
        "jp": "うみ",
        "r": "うみ",
        "en": "うみ",
        "ta": "うみ"
      },
      {
        "jp": "せかい",
        "r": "せかい",
        "en": "せかい",
        "ta": "せかい"
      },
      {
        "jp": "パーティー",
        "r": "パーティー",
        "en": "パーティー",
        "ta": "パーティー"
      },
      {
        "jp": "まつり",
        "r": "まつり",
        "en": "まつり",
        "ta": "まつり"
      },
      {
        "jp": "しけん",
        "r": "しけん",
        "en": "しけん",
        "ta": "しけん"
      },
      {
        "jp": "すきやき",
        "r": "すきやき",
        "en": "すきやき",
        "ta": "すきやき"
      },
      {
        "jp": "さしみ",
        "r": "さしみ",
        "en": "さしみ",
        "ta": "さしみ"
      },
      {
        "jp": "すし",
        "r": "すし",
        "en": "すし",
        "ta": "すし"
      },
      {
        "jp": "てんぷら",
        "r": "てんぷら",
        "en": "てんぷら",
        "ta": "てんぷら"
      },
      {
        "jp": "いけばな",
        "r": "いけばな",
        "en": "いけばな",
        "ta": "いけばな"
      },
      {
        "jp": "もみじ",
        "r": "もみじ",
        "en": "もみじ",
        "ta": "もみじ"
      },
      {
        "jp": "どちら",
        "r": "どちら",
        "en": "どちら",
        "ta": "どちら"
      },
      {
        "jp": "どちらも",
        "r": "どちらも",
        "en": "どちらも",
        "ta": "どちらも"
      },
      {
        "jp": "ずっと",
        "r": "ずっと",
        "en": "ずっと",
        "ta": "ずっと"
      },
      {
        "jp": "はじめて",
        "r": "はじめて",
        "en": "はじめて",
        "ta": "はじめて"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 12 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 12",
        "ta": "பாடம் 12 முதன்மை இலக்கணம்",
        "form": "Pattern: かんたん + です/ます",
        "ex": {
          "jp": "かんたんです。",
          "en": "Example of かんたん.",
          "ta": "かんたん உதாரணம்."
        }
      },
      {
        "t": "Lesson 12 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 12",
        "ta": "பாடம் 12 இரண்டாம் இலக்கணம்",
        "form": "Pattern: ちかい + です/ます",
        "ex": {
          "jp": "ちかいです。",
          "en": "Example of ちかい.",
          "ta": "ちかい உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 12: What is the meaning of 'かんたん' (かんたん)?",
        "options": [
          "かんたん",
          "Water",
          "Book",
          "School"
        ],
        "answer": "かんたん",
        "explain": "'かんたん' means かんたん (かんたん)."
      },
      {
        "q": "Lesson 12: Identify the main grammar structure.",
        "options": [
          "Lesson 12 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 12 Core Pattern 1",
        "explain": "Lesson 12 focuses on Lesson 12 Core Pattern 1."
      }
    ]
  },
  {
    "id": 12,
    "jp": "たんじょうびは いつですか",
    "en": "When is your birthday? (Past States & Comparisons) (Lesson 12)",
    "ta": "உங்கள் பிறந்தநாள் எப்போது?",
    "vocab": [
      {
        "jp": "かんたん",
        "r": "かんたん",
        "en": "かんたん",
        "ta": "かんたん"
      },
      {
        "jp": "ちかい",
        "r": "ちかい",
        "en": "ちかい",
        "ta": "ちかい"
      },
      {
        "jp": "とおい",
        "r": "とおい",
        "en": "とおい",
        "ta": "とおい"
      },
      {
        "jp": "はやい",
        "r": "はやい",
        "en": "はやい",
        "ta": "はやい"
      },
      {
        "jp": "おそい",
        "r": "おそい",
        "en": "おそい",
        "ta": "おそい"
      },
      {
        "jp": "多い",
        "r": "多い",
        "en": "多い",
        "ta": "多い"
      },
      {
        "jp": "すくない",
        "r": "すくない",
        "en": "すくない",
        "ta": "すくない"
      },
      {
        "jp": "あたたかい",
        "r": "あたたかい",
        "en": "あたたかい",
        "ta": "あたたかい"
      },
      {
        "jp": "すずしい",
        "r": "すずしい",
        "en": "すずしい",
        "ta": "すずしい"
      },
      {
        "jp": "あまい",
        "r": "あまい",
        "en": "あまい",
        "ta": "あまい"
      },
      {
        "jp": "からい",
        "r": "からい",
        "en": "からい",
        "ta": "からい"
      },
      {
        "jp": "重い",
        "r": "重い",
        "en": "重い",
        "ta": "重い"
      },
      {
        "jp": "かるい",
        "r": "かるい",
        "en": "かるい",
        "ta": "かるい"
      },
      {
        "jp": "いい",
        "r": "いい",
        "en": "いい",
        "ta": "いい"
      },
      {
        "jp": "きせつ",
        "r": "きせつ",
        "en": "きせつ",
        "ta": "きせつ"
      },
      {
        "jp": "はる",
        "r": "はる",
        "en": "はる",
        "ta": "はる"
      },
      {
        "jp": "なつ",
        "r": "なつ",
        "en": "なつ",
        "ta": "なつ"
      },
      {
        "jp": "あき",
        "r": "あき",
        "en": "あき",
        "ta": "あき"
      },
      {
        "jp": "ふゆ",
        "r": "ふゆ",
        "en": "ふゆ",
        "ta": "ふゆ"
      },
      {
        "jp": "てんき",
        "r": "てんき",
        "en": "てんき",
        "ta": "てんき"
      },
      {
        "jp": "あめ",
        "r": "あめ",
        "en": "あめ",
        "ta": "あめ"
      },
      {
        "jp": "ゆき",
        "r": "ゆき",
        "en": "ゆき",
        "ta": "ゆき"
      },
      {
        "jp": "くもり",
        "r": "くもり",
        "en": "くもり",
        "ta": "くもり"
      },
      {
        "jp": "ホテル",
        "r": "ホテル",
        "en": "ホテル",
        "ta": "ホテル"
      },
      {
        "jp": "くうこう",
        "r": "くうこう",
        "en": "くうこう",
        "ta": "くうこう"
      },
      {
        "jp": "うみ",
        "r": "うみ",
        "en": "うみ",
        "ta": "うみ"
      },
      {
        "jp": "せかい",
        "r": "せかい",
        "en": "せかい",
        "ta": "せかい"
      },
      {
        "jp": "パーティー",
        "r": "パーティー",
        "en": "パーティー",
        "ta": "パーティー"
      },
      {
        "jp": "まつり",
        "r": "まつり",
        "en": "まつり",
        "ta": "まつり"
      },
      {
        "jp": "しけん",
        "r": "しけん",
        "en": "しけん",
        "ta": "しけん"
      },
      {
        "jp": "すきやき",
        "r": "すきやき",
        "en": "すきやき",
        "ta": "すきやき"
      },
      {
        "jp": "さしみ",
        "r": "さしみ",
        "en": "さしみ",
        "ta": "さしみ"
      },
      {
        "jp": "すし",
        "r": "すし",
        "en": "すし",
        "ta": "すし"
      },
      {
        "jp": "てんぷら",
        "r": "てんぷら",
        "en": "てんぷら",
        "ta": "てんぷら"
      },
      {
        "jp": "いけばな",
        "r": "いけばな",
        "en": "いけばな",
        "ta": "いけばな"
      },
      {
        "jp": "もみじ",
        "r": "もみじ",
        "en": "もみじ",
        "ta": "もみじ"
      },
      {
        "jp": "どちら",
        "r": "どちら",
        "en": "どちら",
        "ta": "どちら"
      },
      {
        "jp": "どちらも",
        "r": "どちらも",
        "en": "どちらも",
        "ta": "どちらも"
      },
      {
        "jp": "ずっと",
        "r": "ずっと",
        "en": "ずっと",
        "ta": "ずっと"
      },
      {
        "jp": "はじめて",
        "r": "はじめて",
        "en": "はじめて",
        "ta": "はじめて"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 12 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 12",
        "ta": "பாடம் 12 முதன்மை இலக்கணம்",
        "form": "Pattern: かんたん + です/ます",
        "ex": {
          "jp": "かんたんです。",
          "en": "Example of かんたん.",
          "ta": "かんたん உதாரணம்."
        }
      },
      {
        "t": "Lesson 12 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 12",
        "ta": "பாடம் 12 இரண்டாம் இலக்கணம்",
        "form": "Pattern: ちかい + です/ます",
        "ex": {
          "jp": "ちかいです。",
          "en": "Example of ちかい.",
          "ta": "ちかい உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 12: What is the meaning of 'かんたん' (かんたん)?",
        "options": [
          "かんたん",
          "Water",
          "Book",
          "School"
        ],
        "answer": "かんたん",
        "explain": "'かんたん' means かんたん (かんたん)."
      },
      {
        "q": "Lesson 12: Identify the main grammar structure.",
        "options": [
          "Lesson 12 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 12 Core Pattern 1",
        "explain": "Lesson 12 focuses on Lesson 12 Core Pattern 1."
      }
    ]
  },
  {
    "id": 13,
    "jp": "にほんりょうりが たべたいです",
    "en": "I want to eat Japanese food (Wants & Desires) (Lesson 13)",
    "ta": "ஜப்பானிய உணவு சாப்பிட வேண்டும்",
    "vocab": [
      {
        "jp": "あそびます",
        "r": "あそびます",
        "en": "あそびます",
        "ta": "あそびます"
      },
      {
        "jp": "およぎます",
        "r": "およぎます",
        "en": "およぎます",
        "ta": "およぎます"
      },
      {
        "jp": "むかえます",
        "r": "むかえます",
        "en": "むかえます",
        "ta": "むかえます"
      },
      {
        "jp": "つかれました",
        "r": "つかれました",
        "en": "つかれました",
        "ta": "つかれました"
      },
      {
        "jp": "けっこんします",
        "r": "けっこんします",
        "en": "けっこんします",
        "ta": "けっこんします"
      },
      {
        "jp": "かいものします",
        "r": "かいものします",
        "en": "かいものします",
        "ta": "かいものします"
      },
      {
        "jp": "しょくじします",
        "r": "しょくじします",
        "en": "しょくじします",
        "ta": "しょくじします"
      },
      {
        "jp": "さんぽします",
        "r": "さんぽします",
        "en": "さんぽします",
        "ta": "さんぽします"
      },
      {
        "jp": "たいへん",
        "r": "たいへん",
        "en": "たいへん",
        "ta": "たいへん"
      },
      {
        "jp": "ほしい",
        "r": "ほしい",
        "en": "ほしい",
        "ta": "ほしい"
      },
      {
        "jp": "ひろい",
        "r": "ひろい",
        "en": "ひろい",
        "ta": "ひろい"
      },
      {
        "jp": "せまい",
        "r": "せまい",
        "en": "せまい",
        "ta": "せまい"
      },
      {
        "jp": "プール",
        "r": "プール",
        "en": "プール",
        "ta": "プール"
      },
      {
        "jp": "かわ",
        "r": "かわ",
        "en": "かわ",
        "ta": "かわ"
      },
      {
        "jp": "びじゅつ",
        "r": "びじゅつ",
        "en": "びじゅつ",
        "ta": "びじゅつ"
      },
      {
        "jp": "つり",
        "r": "つり",
        "en": "つり",
        "ta": "つり"
      },
      {
        "jp": "スキー",
        "r": "スキー",
        "en": "スキー",
        "ta": "スキー"
      },
      {
        "jp": "週末",
        "r": "週末",
        "en": "週末",
        "ta": "週末"
      },
      {
        "jp": "しょうがつ",
        "r": "しょうがつ",
        "en": "しょうがつ",
        "ta": "しょうがつ"
      },
      {
        "jp": "何か",
        "r": "何か",
        "en": "何か",
        "ta": "何か"
      },
      {
        "jp": "どこか",
        "r": "どこか",
        "en": "どこか",
        "ta": "どこか"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 13 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 13",
        "ta": "பாடம் 13 முதன்மை இலக்கணம்",
        "form": "Pattern: あそびます + です/ます",
        "ex": {
          "jp": "あそびますです。",
          "en": "Example of あそびます.",
          "ta": "あそびます உதாரணம்."
        }
      },
      {
        "t": "Lesson 13 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 13",
        "ta": "பாடம் 13 இரண்டாம் இலக்கணம்",
        "form": "Pattern: およぎます + です/ます",
        "ex": {
          "jp": "およぎますです。",
          "en": "Example of およぎます.",
          "ta": "およぎます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 13: What is the meaning of 'あそびます' (あそびます)?",
        "options": [
          "あそびます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "あそびます",
        "explain": "'あそびます' means あそびます (あそびます)."
      },
      {
        "q": "Lesson 13: Identify the main grammar structure.",
        "options": [
          "Lesson 13 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 13 Core Pattern 1",
        "explain": "Lesson 13 focuses on Lesson 13 Core Pattern 1."
      }
    ]
  },
  {
    "id": 13,
    "jp": "にほんりょうりが たべたいです",
    "en": "I want to eat Japanese food (Wants & Desires) (Lesson 13)",
    "ta": "ஜப்பானிய உணவு சாப்பிட வேண்டும்",
    "vocab": [
      {
        "jp": "あそびます",
        "r": "あそびます",
        "en": "あそびます",
        "ta": "あそびます"
      },
      {
        "jp": "およぎます",
        "r": "およぎます",
        "en": "およぎます",
        "ta": "およぎます"
      },
      {
        "jp": "むかえます",
        "r": "むかえます",
        "en": "むかえます",
        "ta": "むかえます"
      },
      {
        "jp": "つかれました",
        "r": "つかれました",
        "en": "つかれました",
        "ta": "つかれました"
      },
      {
        "jp": "けっこんします",
        "r": "けっこんします",
        "en": "けっこんします",
        "ta": "けっこんします"
      },
      {
        "jp": "かいものします",
        "r": "かいものします",
        "en": "かいものします",
        "ta": "かいものします"
      },
      {
        "jp": "しょくじします",
        "r": "しょくじします",
        "en": "しょくじします",
        "ta": "しょくじします"
      },
      {
        "jp": "さんぽします",
        "r": "さんぽします",
        "en": "さんぽします",
        "ta": "さんぽします"
      },
      {
        "jp": "たいへん",
        "r": "たいへん",
        "en": "たいへん",
        "ta": "たいへん"
      },
      {
        "jp": "ほしい",
        "r": "ほしい",
        "en": "ほしい",
        "ta": "ほしい"
      },
      {
        "jp": "ひろい",
        "r": "ひろい",
        "en": "ひろい",
        "ta": "ひろい"
      },
      {
        "jp": "せまい",
        "r": "せまい",
        "en": "せまい",
        "ta": "せまい"
      },
      {
        "jp": "プール",
        "r": "プール",
        "en": "プール",
        "ta": "プール"
      },
      {
        "jp": "かわ",
        "r": "かわ",
        "en": "かわ",
        "ta": "かわ"
      },
      {
        "jp": "びじゅつ",
        "r": "びじゅつ",
        "en": "びじゅつ",
        "ta": "びじゅつ"
      },
      {
        "jp": "つり",
        "r": "つり",
        "en": "つり",
        "ta": "つり"
      },
      {
        "jp": "スキー",
        "r": "スキー",
        "en": "スキー",
        "ta": "スキー"
      },
      {
        "jp": "週末",
        "r": "週末",
        "en": "週末",
        "ta": "週末"
      },
      {
        "jp": "しょうがつ",
        "r": "しょうがつ",
        "en": "しょうがつ",
        "ta": "しょうがつ"
      },
      {
        "jp": "何か",
        "r": "何か",
        "en": "何か",
        "ta": "何か"
      },
      {
        "jp": "どこか",
        "r": "どこか",
        "en": "どこか",
        "ta": "どこか"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 13 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 13",
        "ta": "பாடம் 13 முதன்மை இலக்கணம்",
        "form": "Pattern: あそびます + です/ます",
        "ex": {
          "jp": "あそびますです。",
          "en": "Example of あそびます.",
          "ta": "あそびます உதாரணம்."
        }
      },
      {
        "t": "Lesson 13 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 13",
        "ta": "பாடம் 13 இரண்டாம் இலக்கணம்",
        "form": "Pattern: およぎます + です/ます",
        "ex": {
          "jp": "およぎますです。",
          "en": "Example of およぎます.",
          "ta": "およぎます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 13: What is the meaning of 'あそびます' (あそびます)?",
        "options": [
          "あそびます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "あそびます",
        "explain": "'あそびます' means あそびます (あそびます)."
      },
      {
        "q": "Lesson 13: Identify the main grammar structure.",
        "options": [
          "Lesson 13 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 13 Core Pattern 1",
        "explain": "Lesson 13 focuses on Lesson 13 Core Pattern 1."
      }
    ]
  },
  {
    "id": 14,
    "jp": "すみませんが、しゃしんを とって ください",
    "en": "Excuse me, please take a photo (Te-form Requests) (Lesson 14)",
    "ta": "புகைப்படம் எடுத்து கொடுங்கள்",
    "vocab": [
      {
        "jp": "つけます",
        "r": "つけます",
        "en": "つけます",
        "ta": "つけます"
      },
      {
        "jp": "けします",
        "r": "けします",
        "en": "けします",
        "ta": "けします"
      },
      {
        "jp": "あけます",
        "r": "あけます",
        "en": "あけます",
        "ta": "あけます"
      },
      {
        "jp": "しめます",
        "r": "しめます",
        "en": "しめます",
        "ta": "しめます"
      },
      {
        "jp": "いそぎます",
        "r": "いそぎます",
        "en": "いそぎます",
        "ta": "いそぎます"
      },
      {
        "jp": "まちます",
        "r": "まちます",
        "en": "まちます",
        "ta": "まちます"
      },
      {
        "jp": "持ちます",
        "r": "持ちます",
        "en": "持ちます",
        "ta": "持ちます"
      },
      {
        "jp": "とります",
        "r": "とります",
        "en": "とります",
        "ta": "とります"
      },
      {
        "jp": "てつだいます",
        "r": "てつだいます",
        "en": "てつだいます",
        "ta": "てつだいます"
      },
      {
        "jp": "よびます",
        "r": "よびます",
        "en": "よびます",
        "ta": "よびます"
      },
      {
        "jp": "はなします",
        "r": "はなします",
        "en": "はなします",
        "ta": "はなします"
      },
      {
        "jp": "つかいます",
        "r": "つかいます",
        "en": "つかいます",
        "ta": "つかいます"
      },
      {
        "jp": "とめます",
        "r": "とめます",
        "en": "とめます",
        "ta": "とめます"
      },
      {
        "jp": "みせます",
        "r": "みせます",
        "en": "みせます",
        "ta": "みせます"
      },
      {
        "jp": "おしえます",
        "r": "おしえます",
        "en": "おしえます",
        "ta": "おしえます"
      },
      {
        "jp": "座ります",
        "r": "座ります",
        "en": "座ります",
        "ta": "座ります"
      },
      {
        "jp": "立ちます",
        "r": "立ちます",
        "en": "立ちます",
        "ta": "立ちます"
      },
      {
        "jp": "はいります",
        "r": "はいります",
        "en": "はいります",
        "ta": "はいります"
      },
      {
        "jp": "出ます",
        "r": "出ます",
        "en": "出ます",
        "ta": "出ます"
      },
      {
        "jp": "ふります",
        "r": "ふります",
        "en": "ふります",
        "ta": "ふります"
      },
      {
        "jp": "コピーします",
        "r": "コピーします",
        "en": "コピーします",
        "ta": "コピーします"
      },
      {
        "jp": "でんき",
        "r": "でんき",
        "en": "でんき",
        "ta": "でんき"
      },
      {
        "jp": "パスポート",
        "r": "パスポート",
        "en": "パスポート",
        "ta": "パスポート"
      },
      {
        "jp": "なまえ",
        "r": "なまえ",
        "en": "なまえ",
        "ta": "なまえ"
      },
      {
        "jp": "じゅうしょ",
        "r": "じゅうしょ",
        "en": "じゅうしょ",
        "ta": "じゅうしょ"
      },
      {
        "jp": "みどり",
        "r": "みどり",
        "en": "みどり",
        "ta": "みどり"
      },
      {
        "jp": "しんごう",
        "r": "しんごう",
        "en": "しんごう",
        "ta": "しんごう"
      },
      {
        "jp": "まっすぐ",
        "r": "まっすぐ",
        "en": "まっすぐ",
        "ta": "まっすぐ"
      },
      {
        "jp": "ゆっくり",
        "r": "ゆっくり",
        "en": "ゆっくり",
        "ta": "ゆっくり"
      },
      {
        "jp": "すぐ",
        "r": "すぐ",
        "en": "すぐ",
        "ta": "すぐ"
      },
      {
        "jp": "また",
        "r": "また",
        "en": "また",
        "ta": "また"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 14 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 14",
        "ta": "பாடம் 14 முதன்மை இலக்கணம்",
        "form": "Pattern: つけます + です/ます",
        "ex": {
          "jp": "つけますです。",
          "en": "Example of つけます.",
          "ta": "つけます உதாரணம்."
        }
      },
      {
        "t": "Lesson 14 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 14",
        "ta": "பாடம் 14 இரண்டாம் இலக்கணம்",
        "form": "Pattern: けします + です/ます",
        "ex": {
          "jp": "けしますです。",
          "en": "Example of けします.",
          "ta": "けします உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 14: What is the meaning of 'つけます' (つけます)?",
        "options": [
          "つけます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "つけます",
        "explain": "'つけます' means つけます (つけます)."
      },
      {
        "q": "Lesson 14: Identify the main grammar structure.",
        "options": [
          "Lesson 14 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 14 Core Pattern 1",
        "explain": "Lesson 14 focuses on Lesson 14 Core Pattern 1."
      }
    ]
  },
  {
    "id": 14,
    "jp": "すみませんが、しゃしんを とって ください",
    "en": "Excuse me, please take a photo (Te-form Requests) (Lesson 14)",
    "ta": "புகைப்படம் எடுத்து கொடுங்கள்",
    "vocab": [
      {
        "jp": "つけます",
        "r": "つけます",
        "en": "つけます",
        "ta": "つけます"
      },
      {
        "jp": "けします",
        "r": "けします",
        "en": "けします",
        "ta": "けします"
      },
      {
        "jp": "あけます",
        "r": "あけます",
        "en": "あけます",
        "ta": "あけます"
      },
      {
        "jp": "しめます",
        "r": "しめます",
        "en": "しめます",
        "ta": "しめます"
      },
      {
        "jp": "いそぎます",
        "r": "いそぎます",
        "en": "いそぎます",
        "ta": "いそぎます"
      },
      {
        "jp": "まちます",
        "r": "まちます",
        "en": "まちます",
        "ta": "まちます"
      },
      {
        "jp": "持ちます",
        "r": "持ちます",
        "en": "持ちます",
        "ta": "持ちます"
      },
      {
        "jp": "とります",
        "r": "とります",
        "en": "とります",
        "ta": "とります"
      },
      {
        "jp": "てつだいます",
        "r": "てつだいます",
        "en": "てつだいます",
        "ta": "てつだいます"
      },
      {
        "jp": "よびます",
        "r": "よびます",
        "en": "よびます",
        "ta": "よびます"
      },
      {
        "jp": "はなします",
        "r": "はなします",
        "en": "はなします",
        "ta": "はなします"
      },
      {
        "jp": "つかいます",
        "r": "つかいます",
        "en": "つかいます",
        "ta": "つかいます"
      },
      {
        "jp": "とめます",
        "r": "とめます",
        "en": "とめます",
        "ta": "とめます"
      },
      {
        "jp": "みせます",
        "r": "みせます",
        "en": "みせます",
        "ta": "みせます"
      },
      {
        "jp": "おしえます",
        "r": "おしえます",
        "en": "おしえます",
        "ta": "おしえます"
      },
      {
        "jp": "座ります",
        "r": "座ります",
        "en": "座ります",
        "ta": "座ります"
      },
      {
        "jp": "立ちます",
        "r": "立ちます",
        "en": "立ちます",
        "ta": "立ちます"
      },
      {
        "jp": "はいります",
        "r": "はいります",
        "en": "はいります",
        "ta": "はいります"
      },
      {
        "jp": "出ます",
        "r": "出ます",
        "en": "出ます",
        "ta": "出ます"
      },
      {
        "jp": "ふります",
        "r": "ふります",
        "en": "ふります",
        "ta": "ふります"
      },
      {
        "jp": "コピーします",
        "r": "コピーします",
        "en": "コピーします",
        "ta": "コピーします"
      },
      {
        "jp": "でんき",
        "r": "でんき",
        "en": "でんき",
        "ta": "でんき"
      },
      {
        "jp": "パスポート",
        "r": "パスポート",
        "en": "パスポート",
        "ta": "パスポート"
      },
      {
        "jp": "なまえ",
        "r": "なまえ",
        "en": "なまえ",
        "ta": "なまえ"
      },
      {
        "jp": "じゅうしょ",
        "r": "じゅうしょ",
        "en": "じゅうしょ",
        "ta": "じゅうしょ"
      },
      {
        "jp": "みどり",
        "r": "みどり",
        "en": "みどり",
        "ta": "みどり"
      },
      {
        "jp": "しんごう",
        "r": "しんごう",
        "en": "しんごう",
        "ta": "しんごう"
      },
      {
        "jp": "まっすぐ",
        "r": "まっすぐ",
        "en": "まっすぐ",
        "ta": "まっすぐ"
      },
      {
        "jp": "ゆっくり",
        "r": "ゆっくり",
        "en": "ゆっくり",
        "ta": "ゆっくり"
      },
      {
        "jp": "すぐ",
        "r": "すぐ",
        "en": "すぐ",
        "ta": "すぐ"
      },
      {
        "jp": "また",
        "r": "また",
        "en": "また",
        "ta": "また"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 14 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 14",
        "ta": "பாடம் 14 முதன்மை இலக்கணம்",
        "form": "Pattern: つけます + です/ます",
        "ex": {
          "jp": "つけますです。",
          "en": "Example of つけます.",
          "ta": "つけます உதாரணம்."
        }
      },
      {
        "t": "Lesson 14 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 14",
        "ta": "பாடம் 14 இரண்டாம் இலக்கணம்",
        "form": "Pattern: けします + です/ます",
        "ex": {
          "jp": "けしますです。",
          "en": "Example of けします.",
          "ta": "けします உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 14: What is the meaning of 'つけます' (つけます)?",
        "options": [
          "つけます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "つけます",
        "explain": "'つけます' means つけます (つけます)."
      },
      {
        "q": "Lesson 14: Identify the main grammar structure.",
        "options": [
          "Lesson 14 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 14 Core Pattern 1",
        "explain": "Lesson 14 focuses on Lesson 14 Core Pattern 1."
      }
    ]
  },
  {
    "id": 15,
    "jp": "しゃしんを とっても いいですか",
    "en": "May I take a photo? (Permissions & Prohibition) (Lesson 15)",
    "ta": "புகைப்படம் எடுக்கலாமா?",
    "vocab": [
      {
        "jp": "たちます",
        "r": "たちます",
        "en": "たちます",
        "ta": "たちます"
      },
      {
        "jp": "すわります",
        "r": "すわります",
        "en": "すわります",
        "ta": "すわります"
      },
      {
        "jp": "つかいます",
        "r": "つかいます",
        "en": "つかいます",
        "ta": "つかいます"
      },
      {
        "jp": "おきます",
        "r": "おきます",
        "en": "おきます",
        "ta": "おきます"
      },
      {
        "jp": "つくります",
        "r": "つくります",
        "en": "つくります",
        "ta": "つくります"
      },
      {
        "jp": "うります",
        "r": "うります",
        "en": "うります",
        "ta": "うります"
      },
      {
        "jp": "知ります",
        "r": "知ります",
        "en": "知ります",
        "ta": "知ります"
      },
      {
        "jp": "すみます",
        "r": "すみます",
        "en": "すみます",
        "ta": "すみます"
      },
      {
        "jp": "けんきゅうします",
        "r": "けんきゅうします",
        "en": "けんきゅうします",
        "ta": "けんきゅうします"
      },
      {
        "jp": "しりょう",
        "r": "しりょう",
        "en": "しりょう",
        "ta": "しりょう"
      },
      {
        "jp": "カタログ",
        "r": "カタログ",
        "en": "カタログ",
        "ta": "カタログ"
      },
      {
        "jp": "ふく",
        "r": "ふく",
        "en": "ふく",
        "ta": "ふく"
      },
      {
        "jp": "せいひん",
        "r": "せいひん",
        "en": "せいひん",
        "ta": "せいひん"
      },
      {
        "jp": "ソフト",
        "r": "ソフト",
        "en": "ソフト",
        "ta": "ソフト"
      },
      {
        "jp": "せんもん",
        "r": "せんもん",
        "en": "せんもん",
        "ta": "せんもん"
      },
      {
        "jp": "はいしゃ",
        "r": "はいしゃ",
        "en": "はいしゃ",
        "ta": "はいしゃ"
      },
      {
        "jp": "とこや",
        "r": "とこや",
        "en": "とこや",
        "ta": "とこや"
      },
      {
        "jp": "プレイガイド",
        "r": "プレイガイド",
        "en": "プレイガイド",
        "ta": "プレイガイド"
      },
      {
        "jp": "独身",
        "r": "独身",
        "en": "独身",
        "ta": "独身"
      },
      {
        "jp": "思い出",
        "r": "思い出",
        "en": "思い出",
        "ta": "思い出"
      },
      {
        "jp": "ごかぞく",
        "r": "ごかぞく",
        "en": "ごかぞく",
        "ta": "ごかぞく"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 15 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 15",
        "ta": "பாடம் 15 முதன்மை இலக்கணம்",
        "form": "Pattern: たちます + です/ます",
        "ex": {
          "jp": "たちますです。",
          "en": "Example of たちます.",
          "ta": "たちます உதாரணம்."
        }
      },
      {
        "t": "Lesson 15 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 15",
        "ta": "பாடம் 15 இரண்டாம் இலக்கணம்",
        "form": "Pattern: すわります + です/ます",
        "ex": {
          "jp": "すわりますです。",
          "en": "Example of すわります.",
          "ta": "すわります உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 15: What is the meaning of 'たちます' (たちます)?",
        "options": [
          "たちます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "たちます",
        "explain": "'たちます' means たちます (たちます)."
      },
      {
        "q": "Lesson 15: Identify the main grammar structure.",
        "options": [
          "Lesson 15 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 15 Core Pattern 1",
        "explain": "Lesson 15 focuses on Lesson 15 Core Pattern 1."
      }
    ]
  },
  {
    "id": 15,
    "jp": "しゃしんを とっても いいですか",
    "en": "May I take a photo? (Permissions & Prohibition) (Lesson 15)",
    "ta": "புகைப்படம் எடுக்கலாமா?",
    "vocab": [
      {
        "jp": "たちます",
        "r": "たちます",
        "en": "たちます",
        "ta": "たちます"
      },
      {
        "jp": "すわります",
        "r": "すわります",
        "en": "すわります",
        "ta": "すわります"
      },
      {
        "jp": "つかいます",
        "r": "つかいます",
        "en": "つかいます",
        "ta": "つかいます"
      },
      {
        "jp": "おきます",
        "r": "おきます",
        "en": "おきます",
        "ta": "おきます"
      },
      {
        "jp": "つくります",
        "r": "つくります",
        "en": "つくります",
        "ta": "つくります"
      },
      {
        "jp": "うります",
        "r": "うります",
        "en": "うります",
        "ta": "うります"
      },
      {
        "jp": "知ります",
        "r": "知ります",
        "en": "知ります",
        "ta": "知ります"
      },
      {
        "jp": "すみます",
        "r": "すみます",
        "en": "すみます",
        "ta": "すみます"
      },
      {
        "jp": "けんきゅうします",
        "r": "けんきゅうします",
        "en": "けんきゅうします",
        "ta": "けんきゅうします"
      },
      {
        "jp": "しりょう",
        "r": "しりょう",
        "en": "しりょう",
        "ta": "しりょう"
      },
      {
        "jp": "カタログ",
        "r": "カタログ",
        "en": "カタログ",
        "ta": "カタログ"
      },
      {
        "jp": "ふく",
        "r": "ふく",
        "en": "ふく",
        "ta": "ふく"
      },
      {
        "jp": "せいひん",
        "r": "せいひん",
        "en": "せいひん",
        "ta": "せいひん"
      },
      {
        "jp": "ソフト",
        "r": "ソフト",
        "en": "ソフト",
        "ta": "ソフト"
      },
      {
        "jp": "せんもん",
        "r": "せんもん",
        "en": "せんもん",
        "ta": "せんもん"
      },
      {
        "jp": "はいしゃ",
        "r": "はいしゃ",
        "en": "はいしゃ",
        "ta": "はいしゃ"
      },
      {
        "jp": "とこや",
        "r": "とこや",
        "en": "とこや",
        "ta": "とこや"
      },
      {
        "jp": "プレイガイド",
        "r": "プレイガイド",
        "en": "プレイガイド",
        "ta": "プレイガイド"
      },
      {
        "jp": "独身",
        "r": "独身",
        "en": "独身",
        "ta": "独身"
      },
      {
        "jp": "思い出",
        "r": "思い出",
        "en": "思い出",
        "ta": "思い出"
      },
      {
        "jp": "ごかぞく",
        "r": "ごかぞく",
        "en": "ごかぞく",
        "ta": "ごかぞく"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 15 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 15",
        "ta": "பாடம் 15 முதன்மை இலக்கணம்",
        "form": "Pattern: たちます + です/ます",
        "ex": {
          "jp": "たちますです。",
          "en": "Example of たちます.",
          "ta": "たちます உதாரணம்."
        }
      },
      {
        "t": "Lesson 15 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 15",
        "ta": "பாடம் 15 இரண்டாம் இலக்கணம்",
        "form": "Pattern: すわります + です/ます",
        "ex": {
          "jp": "すわりますです。",
          "en": "Example of すわります.",
          "ta": "すわります உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 15: What is the meaning of 'たちます' (たちます)?",
        "options": [
          "たちます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "たちます",
        "explain": "'たちます' means たちます (たちます)."
      },
      {
        "q": "Lesson 15: Identify the main grammar structure.",
        "options": [
          "Lesson 15 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 15 Core Pattern 1",
        "explain": "Lesson 15 focuses on Lesson 15 Core Pattern 1."
      }
    ]
  },
  {
    "id": 16,
    "jp": "あさ おきて、がっこうへ いきます",
    "en": "I wake up and go to school (Sequences & Descriptions) (Lesson 16)",
    "ta": "எழுந்து பள்ளிக்குச் செல்கிறேன்",
    "vocab": [
      {
        "jp": "のります",
        "r": "のります",
        "en": "のります",
        "ta": "のります"
      },
      {
        "jp": "おります",
        "r": "おります",
        "en": "おります",
        "ta": "おります"
      },
      {
        "jp": "のりかえます",
        "r": "のりかえます",
        "en": "のりかえます",
        "ta": "のりかえます"
      },
      {
        "jp": "あびます",
        "r": "あびます",
        "en": "あびます",
        "ta": "あびます"
      },
      {
        "jp": "いれます",
        "r": "いれます",
        "en": "いれます",
        "ta": "いれます"
      },
      {
        "jp": "だします",
        "r": "だします",
        "en": "だします",
        "ta": "だします"
      },
      {
        "jp": "下ろします",
        "r": "下ろします",
        "en": "下ろします",
        "ta": "下ろします"
      },
      {
        "jp": "はいります",
        "r": "はいります",
        "en": "はいります",
        "ta": "はいります"
      },
      {
        "jp": "出ます",
        "r": "出ます",
        "en": "出ます",
        "ta": "出ます"
      },
      {
        "jp": "おします",
        "r": "おします",
        "en": "おします",
        "ta": "おします"
      },
      {
        "jp": "わかい",
        "r": "わかい",
        "en": "わかい",
        "ta": "わかい"
      },
      {
        "jp": "ながい",
        "r": "ながい",
        "en": "ながい",
        "ta": "ながい"
      },
      {
        "jp": "みじかい",
        "r": "みじかい",
        "en": "みじかい",
        "ta": "みじかい"
      },
      {
        "jp": "あかるい",
        "r": "あかるい",
        "en": "あかるい",
        "ta": "あかるい"
      },
      {
        "jp": "くらい",
        "r": "くらい",
        "en": "くらい",
        "ta": "くらい"
      },
      {
        "jp": "からだ",
        "r": "からだ",
        "en": "からだ",
        "ta": "からだ"
      },
      {
        "jp": "あたま",
        "r": "あたま",
        "en": "あたま",
        "ta": "あたま"
      },
      {
        "jp": "かみ",
        "r": "かみ",
        "en": "かみ",
        "ta": "かみ"
      },
      {
        "jp": "かお",
        "r": "かお",
        "en": "かお",
        "ta": "かお"
      },
      {
        "jp": "め",
        "r": "め",
        "en": "め",
        "ta": "め"
      },
      {
        "jp": "みみ",
        "r": "みみ",
        "en": "みみ",
        "ta": "みみ"
      },
      {
        "jp": "は",
        "r": "は",
        "en": "は",
        "ta": "は"
      },
      {
        "jp": "おなか",
        "r": "おなか",
        "en": "おなか",
        "ta": "おなか"
      },
      {
        "jp": "あし",
        "r": "あし",
        "en": "あし",
        "ta": "あし"
      },
      {
        "jp": "サービス",
        "r": "サービス",
        "en": "サービス",
        "ta": "サービス"
      },
      {
        "jp": "ジョギング",
        "r": "ジョギング",
        "en": "ジョギング",
        "ta": "ジョギング"
      },
      {
        "jp": "シャワー",
        "r": "シャワー",
        "en": "シャワー",
        "ta": "シャワー"
      },
      {
        "jp": "みどり",
        "r": "みどり",
        "en": "みどり",
        "ta": "みどり"
      },
      {
        "jp": "おてら",
        "r": "おてら",
        "en": "おてら",
        "ta": "おてら"
      },
      {
        "jp": "じんじゃ",
        "r": "じんじゃ",
        "en": "じんじゃ",
        "ta": "じんじゃ"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 16 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 16",
        "ta": "பாடம் 16 முதன்மை இலக்கணம்",
        "form": "Pattern: のります + です/ます",
        "ex": {
          "jp": "のりますです。",
          "en": "Example of のります.",
          "ta": "のります உதாரணம்."
        }
      },
      {
        "t": "Lesson 16 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 16",
        "ta": "பாடம் 16 இரண்டாம் இலக்கணம்",
        "form": "Pattern: おります + です/ます",
        "ex": {
          "jp": "おりますです。",
          "en": "Example of おります.",
          "ta": "おります உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 16: What is the meaning of 'のります' (のります)?",
        "options": [
          "のります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "のります",
        "explain": "'のります' means のります (のります)."
      },
      {
        "q": "Lesson 16: Identify the main grammar structure.",
        "options": [
          "Lesson 16 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 16 Core Pattern 1",
        "explain": "Lesson 16 focuses on Lesson 16 Core Pattern 1."
      }
    ]
  },
  {
    "id": 16,
    "jp": "あさ おきて、がっこうへ いきます",
    "en": "I wake up and go to school (Sequences & Descriptions) (Lesson 16)",
    "ta": "எழுந்து பள்ளிக்குச் செல்கிறேன்",
    "vocab": [
      {
        "jp": "のります",
        "r": "のります",
        "en": "のります",
        "ta": "のります"
      },
      {
        "jp": "おります",
        "r": "おります",
        "en": "おります",
        "ta": "おります"
      },
      {
        "jp": "のりかえます",
        "r": "のりかえます",
        "en": "のりかえます",
        "ta": "のりかえます"
      },
      {
        "jp": "あびます",
        "r": "あびます",
        "en": "あびます",
        "ta": "あびます"
      },
      {
        "jp": "いれます",
        "r": "いれます",
        "en": "いれます",
        "ta": "いれます"
      },
      {
        "jp": "だします",
        "r": "だします",
        "en": "だします",
        "ta": "だします"
      },
      {
        "jp": "下ろします",
        "r": "下ろします",
        "en": "下ろします",
        "ta": "下ろします"
      },
      {
        "jp": "はいります",
        "r": "はいります",
        "en": "はいります",
        "ta": "はいります"
      },
      {
        "jp": "出ます",
        "r": "出ます",
        "en": "出ます",
        "ta": "出ます"
      },
      {
        "jp": "おします",
        "r": "おします",
        "en": "おします",
        "ta": "おします"
      },
      {
        "jp": "わかい",
        "r": "わかい",
        "en": "わかい",
        "ta": "わかい"
      },
      {
        "jp": "ながい",
        "r": "ながい",
        "en": "ながい",
        "ta": "ながい"
      },
      {
        "jp": "みじかい",
        "r": "みじかい",
        "en": "みじかい",
        "ta": "みじかい"
      },
      {
        "jp": "あかるい",
        "r": "あかるい",
        "en": "あかるい",
        "ta": "あかるい"
      },
      {
        "jp": "くらい",
        "r": "くらい",
        "en": "くらい",
        "ta": "くらい"
      },
      {
        "jp": "からだ",
        "r": "からだ",
        "en": "からだ",
        "ta": "からだ"
      },
      {
        "jp": "あたま",
        "r": "あたま",
        "en": "あたま",
        "ta": "あたま"
      },
      {
        "jp": "かみ",
        "r": "かみ",
        "en": "かみ",
        "ta": "かみ"
      },
      {
        "jp": "かお",
        "r": "かお",
        "en": "かお",
        "ta": "かお"
      },
      {
        "jp": "め",
        "r": "め",
        "en": "め",
        "ta": "め"
      },
      {
        "jp": "みみ",
        "r": "みみ",
        "en": "みみ",
        "ta": "みみ"
      },
      {
        "jp": "は",
        "r": "は",
        "en": "は",
        "ta": "は"
      },
      {
        "jp": "おなか",
        "r": "おなか",
        "en": "おなか",
        "ta": "おなか"
      },
      {
        "jp": "あし",
        "r": "あし",
        "en": "あし",
        "ta": "あし"
      },
      {
        "jp": "サービス",
        "r": "サービス",
        "en": "サービス",
        "ta": "サービス"
      },
      {
        "jp": "ジョギング",
        "r": "ジョギング",
        "en": "ジョギング",
        "ta": "ジョギング"
      },
      {
        "jp": "シャワー",
        "r": "シャワー",
        "en": "シャワー",
        "ta": "シャワー"
      },
      {
        "jp": "みどり",
        "r": "みどり",
        "en": "みどり",
        "ta": "みどり"
      },
      {
        "jp": "おてら",
        "r": "おてら",
        "en": "おてら",
        "ta": "おてら"
      },
      {
        "jp": "じんじゃ",
        "r": "じんじゃ",
        "en": "じんじゃ",
        "ta": "じんじゃ"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 16 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 16",
        "ta": "பாடம் 16 முதன்மை இலக்கணம்",
        "form": "Pattern: のります + です/ます",
        "ex": {
          "jp": "のりますです。",
          "en": "Example of のります.",
          "ta": "のります உதாரணம்."
        }
      },
      {
        "t": "Lesson 16 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 16",
        "ta": "பாடம் 16 இரண்டாம் இலக்கணம்",
        "form": "Pattern: おります + です/ます",
        "ex": {
          "jp": "おりますです。",
          "en": "Example of おります.",
          "ta": "おります உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 16: What is the meaning of 'のります' (のります)?",
        "options": [
          "のります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "のります",
        "explain": "'のります' means のります (のります)."
      },
      {
        "q": "Lesson 16: Identify the main grammar structure.",
        "options": [
          "Lesson 16 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 16 Core Pattern 1",
        "explain": "Lesson 16 focuses on Lesson 16 Core Pattern 1."
      }
    ]
  },
  {
    "id": 17,
    "jp": "ここで たばこを すわないで ください",
    "en": "Please do not smoke here (Nai-form Advice) (Lesson 17)",
    "ta": "இங்கே புகைபிடிக்காதீர்கள்",
    "vocab": [
      {
        "jp": "おぼえます",
        "r": "おぼえます",
        "en": "おぼえます",
        "ta": "おぼえます"
      },
      {
        "jp": "わすれます",
        "r": "わすれます",
        "en": "わすれます",
        "ta": "わすれます"
      },
      {
        "jp": "なくします",
        "r": "なくします",
        "en": "なくします",
        "ta": "なくします"
      },
      {
        "jp": "はらいます",
        "r": "はらいます",
        "en": "はらいます",
        "ta": "はらいます"
      },
      {
        "jp": "かえします",
        "r": "かえします",
        "en": "かえします",
        "ta": "かえします"
      },
      {
        "jp": "出かけます",
        "r": "出かけます",
        "en": "出かけます",
        "ta": "出かけます"
      },
      {
        "jp": "ぬぎます",
        "r": "ぬぎます",
        "en": "ぬぎます",
        "ta": "ぬぎます"
      },
      {
        "jp": "持って行きます",
        "r": "持って行きます",
        "en": "持って行きます",
        "ta": "持って行きます"
      },
      {
        "jp": "持って来ます",
        "r": "持って来ます",
        "en": "持って来ます",
        "ta": "持って来ます"
      },
      {
        "jp": "しんぱいします",
        "r": "しんぱいします",
        "en": "しんぱいします",
        "ta": "しんぱいします"
      },
      {
        "jp": "ざんぎょうします",
        "r": "ざんぎょうします",
        "en": "ざんぎょうします",
        "ta": "ざんぎょうします"
      },
      {
        "jp": "しゅっちょうします",
        "r": "しゅっちょうします",
        "en": "しゅっちょうします",
        "ta": "しゅっちょうします"
      },
      {
        "jp": "くすり",
        "r": "くすり",
        "en": "くすり",
        "ta": "くすり"
      },
      {
        "jp": "ほけんしょう",
        "r": "ほけんしょう",
        "en": "ほけんしょう",
        "ta": "ほけんしょう"
      },
      {
        "jp": "かぜ",
        "r": "かぜ",
        "en": "かぜ",
        "ta": "かぜ"
      },
      {
        "jp": "ねつ",
        "r": "ねつ",
        "en": "ねつ",
        "ta": "ねつ"
      },
      {
        "jp": "びょうき",
        "r": "びょうき",
        "en": "びょうき",
        "ta": "びょうき"
      },
      {
        "jp": "上着",
        "r": "上着",
        "en": "上着",
        "ta": "上着"
      },
      {
        "jp": "下着",
        "r": "下着",
        "en": "下着",
        "ta": "下着"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 17 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 17",
        "ta": "பாடம் 17 முதன்மை இலக்கணம்",
        "form": "Pattern: おぼえます + です/ます",
        "ex": {
          "jp": "おぼえますです。",
          "en": "Example of おぼえます.",
          "ta": "おぼえます உதாரணம்."
        }
      },
      {
        "t": "Lesson 17 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 17",
        "ta": "பாடம் 17 இரண்டாம் இலக்கணம்",
        "form": "Pattern: わすれます + です/ます",
        "ex": {
          "jp": "わすれますです。",
          "en": "Example of わすれます.",
          "ta": "わすれます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 17: What is the meaning of 'おぼえます' (おぼえます)?",
        "options": [
          "おぼえます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "おぼえます",
        "explain": "'おぼえます' means おぼえます (おぼえます)."
      },
      {
        "q": "Lesson 17: Identify the main grammar structure.",
        "options": [
          "Lesson 17 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 17 Core Pattern 1",
        "explain": "Lesson 17 focuses on Lesson 17 Core Pattern 1."
      }
    ]
  },
  {
    "id": 17,
    "jp": "ここで たばこを すわないで ください",
    "en": "Please do not smoke here (Nai-form Advice) (Lesson 17)",
    "ta": "இங்கே புகைபிடிக்காதீர்கள்",
    "vocab": [
      {
        "jp": "おぼえます",
        "r": "おぼえます",
        "en": "おぼえます",
        "ta": "おぼえます"
      },
      {
        "jp": "わすれます",
        "r": "わすれます",
        "en": "わすれます",
        "ta": "わすれます"
      },
      {
        "jp": "なくします",
        "r": "なくします",
        "en": "なくします",
        "ta": "なくします"
      },
      {
        "jp": "はらいます",
        "r": "はらいます",
        "en": "はらいます",
        "ta": "はらいます"
      },
      {
        "jp": "かえします",
        "r": "かえします",
        "en": "かえします",
        "ta": "かえします"
      },
      {
        "jp": "出かけます",
        "r": "出かけます",
        "en": "出かけます",
        "ta": "出かけます"
      },
      {
        "jp": "ぬぎます",
        "r": "ぬぎます",
        "en": "ぬぎます",
        "ta": "ぬぎます"
      },
      {
        "jp": "持って行きます",
        "r": "持って行きます",
        "en": "持って行きます",
        "ta": "持って行きます"
      },
      {
        "jp": "持って来ます",
        "r": "持って来ます",
        "en": "持って来ます",
        "ta": "持って来ます"
      },
      {
        "jp": "しんぱいします",
        "r": "しんぱいします",
        "en": "しんぱいします",
        "ta": "しんぱいします"
      },
      {
        "jp": "ざんぎょうします",
        "r": "ざんぎょうします",
        "en": "ざんぎょうします",
        "ta": "ざんぎょうします"
      },
      {
        "jp": "しゅっちょうします",
        "r": "しゅっちょうします",
        "en": "しゅっちょうします",
        "ta": "しゅっちょうします"
      },
      {
        "jp": "くすり",
        "r": "くすり",
        "en": "くすり",
        "ta": "くすり"
      },
      {
        "jp": "ほけんしょう",
        "r": "ほけんしょう",
        "en": "ほけんしょう",
        "ta": "ほけんしょう"
      },
      {
        "jp": "かぜ",
        "r": "かぜ",
        "en": "かぜ",
        "ta": "かぜ"
      },
      {
        "jp": "ねつ",
        "r": "ねつ",
        "en": "ねつ",
        "ta": "ねつ"
      },
      {
        "jp": "びょうき",
        "r": "びょうき",
        "en": "びょうき",
        "ta": "びょうき"
      },
      {
        "jp": "上着",
        "r": "上着",
        "en": "上着",
        "ta": "上着"
      },
      {
        "jp": "下着",
        "r": "下着",
        "en": "下着",
        "ta": "下着"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 17 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 17",
        "ta": "பாடம் 17 முதன்மை இலக்கணம்",
        "form": "Pattern: おぼえます + です/ます",
        "ex": {
          "jp": "おぼえますです。",
          "en": "Example of おぼえます.",
          "ta": "おぼえます உதாரணம்."
        }
      },
      {
        "t": "Lesson 17 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 17",
        "ta": "பாடம் 17 இரண்டாம் இலக்கணம்",
        "form": "Pattern: わすれます + です/ます",
        "ex": {
          "jp": "わすれますです。",
          "en": "Example of わすれます.",
          "ta": "わすれます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 17: What is the meaning of 'おぼえます' (おぼえます)?",
        "options": [
          "おぼえます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "おぼえます",
        "explain": "'おぼえます' means おぼえます (おぼえます)."
      },
      {
        "q": "Lesson 17: Identify the main grammar structure.",
        "options": [
          "Lesson 17 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 17 Core Pattern 1",
        "explain": "Lesson 17 focuses on Lesson 17 Core Pattern 1."
      }
    ]
  },
  {
    "id": 18,
    "jp": "にほんごを はなす ことが できます",
    "en": "I can speak Japanese (Ability & Skills) (Lesson 18)",
    "ta": "ஜப்பானியம் பேச முடியும்",
    "vocab": [
      {
        "jp": "できます",
        "r": "できます",
        "en": "できます",
        "ta": "できます"
      },
      {
        "jp": "あらいます",
        "r": "あらいます",
        "en": "あらいます",
        "ta": "あらいます"
      },
      {
        "jp": "ひきます",
        "r": "ひきます",
        "en": "ひきます",
        "ta": "ひきます"
      },
      {
        "jp": "うたいます",
        "r": "うたいます",
        "en": "うたいます",
        "ta": "うたいます"
      },
      {
        "jp": "あつめます",
        "r": "あつめます",
        "en": "あつめます",
        "ta": "あつめます"
      },
      {
        "jp": "すてます",
        "r": "すてます",
        "en": "すてます",
        "ta": "すてます"
      },
      {
        "jp": "かえます",
        "r": "かえます",
        "en": "かえます",
        "ta": "かえます"
      },
      {
        "jp": "うんてんします",
        "r": "うんてんします",
        "en": "うんてんします",
        "ta": "うんてんします"
      },
      {
        "jp": "よやくします",
        "r": "よやくします",
        "en": "よやくします",
        "ta": "よやくします"
      },
      {
        "jp": "ピアノ",
        "r": "ピアノ",
        "en": "ピアノ",
        "ta": "ピアノ"
      },
      {
        "jp": "～メートル",
        "r": "～メートル",
        "en": "～メートル",
        "ta": "～メートル"
      },
      {
        "jp": "現金",
        "r": "現金",
        "en": "現金",
        "ta": "現金"
      },
      {
        "jp": "趣味",
        "r": "趣味",
        "en": "趣味",
        "ta": "趣味"
      },
      {
        "jp": "日記",
        "r": "日記",
        "en": "日記",
        "ta": "日記"
      },
      {
        "jp": "おいのり",
        "r": "おいのり",
        "en": "おいのり",
        "ta": "おいのり"
      },
      {
        "jp": "課長",
        "r": "課長",
        "en": "課長",
        "ta": "課長"
      },
      {
        "jp": "部長",
        "r": "部長",
        "en": "部長",
        "ta": "部長"
      },
      {
        "jp": "社長",
        "r": "社長",
        "en": "社長",
        "ta": "社長"
      },
      {
        "jp": "動物",
        "r": "動物",
        "en": "動物",
        "ta": "動物"
      },
      {
        "jp": "うま",
        "r": "うま",
        "en": "うま",
        "ta": "うま"
      },
      {
        "jp": "インターネット",
        "r": "インターネット",
        "en": "インターネット",
        "ta": "インターネット"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 18 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 18",
        "ta": "பாடம் 18 முதன்மை இலக்கணம்",
        "form": "Pattern: できます + です/ます",
        "ex": {
          "jp": "できますです。",
          "en": "Example of できます.",
          "ta": "できます உதாரணம்."
        }
      },
      {
        "t": "Lesson 18 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 18",
        "ta": "பாடம் 18 இரண்டாம் இலக்கணம்",
        "form": "Pattern: あらいます + です/ます",
        "ex": {
          "jp": "あらいますです。",
          "en": "Example of あらいます.",
          "ta": "あらいます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 18: What is the meaning of 'できます' (できます)?",
        "options": [
          "できます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "できます",
        "explain": "'できます' means できます (できます)."
      },
      {
        "q": "Lesson 18: Identify the main grammar structure.",
        "options": [
          "Lesson 18 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 18 Core Pattern 1",
        "explain": "Lesson 18 focuses on Lesson 18 Core Pattern 1."
      }
    ]
  },
  {
    "id": 18,
    "jp": "にほんごを はなす ことが できます",
    "en": "I can speak Japanese (Ability & Skills) (Lesson 18)",
    "ta": "ஜப்பானியம் பேச முடியும்",
    "vocab": [
      {
        "jp": "できます",
        "r": "できます",
        "en": "できます",
        "ta": "できます"
      },
      {
        "jp": "あらいます",
        "r": "あらいます",
        "en": "あらいます",
        "ta": "あらいます"
      },
      {
        "jp": "ひきます",
        "r": "ひきます",
        "en": "ひきます",
        "ta": "ひきます"
      },
      {
        "jp": "うたいます",
        "r": "うたいます",
        "en": "うたいます",
        "ta": "うたいます"
      },
      {
        "jp": "あつめます",
        "r": "あつめます",
        "en": "あつめます",
        "ta": "あつめます"
      },
      {
        "jp": "すてます",
        "r": "すてます",
        "en": "すてます",
        "ta": "すてます"
      },
      {
        "jp": "かえます",
        "r": "かえます",
        "en": "かえます",
        "ta": "かえます"
      },
      {
        "jp": "うんてんします",
        "r": "うんてんします",
        "en": "うんてんします",
        "ta": "うんてんします"
      },
      {
        "jp": "よやくします",
        "r": "よやくします",
        "en": "よやくします",
        "ta": "よやくします"
      },
      {
        "jp": "ピアノ",
        "r": "ピアノ",
        "en": "ピアノ",
        "ta": "ピアノ"
      },
      {
        "jp": "～メートル",
        "r": "～メートル",
        "en": "～メートル",
        "ta": "～メートル"
      },
      {
        "jp": "現金",
        "r": "現金",
        "en": "現金",
        "ta": "現金"
      },
      {
        "jp": "趣味",
        "r": "趣味",
        "en": "趣味",
        "ta": "趣味"
      },
      {
        "jp": "日記",
        "r": "日記",
        "en": "日記",
        "ta": "日記"
      },
      {
        "jp": "おいのり",
        "r": "おいのり",
        "en": "おいのり",
        "ta": "おいのり"
      },
      {
        "jp": "課長",
        "r": "課長",
        "en": "課長",
        "ta": "課長"
      },
      {
        "jp": "部長",
        "r": "部長",
        "en": "部長",
        "ta": "部長"
      },
      {
        "jp": "社長",
        "r": "社長",
        "en": "社長",
        "ta": "社長"
      },
      {
        "jp": "動物",
        "r": "動物",
        "en": "動物",
        "ta": "動物"
      },
      {
        "jp": "うま",
        "r": "うま",
        "en": "うま",
        "ta": "うま"
      },
      {
        "jp": "インターネット",
        "r": "インターネット",
        "en": "インターネット",
        "ta": "インターネット"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 18 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 18",
        "ta": "பாடம் 18 முதன்மை இலக்கணம்",
        "form": "Pattern: できます + です/ます",
        "ex": {
          "jp": "できますです。",
          "en": "Example of できます.",
          "ta": "できます உதாரணம்."
        }
      },
      {
        "t": "Lesson 18 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 18",
        "ta": "பாடம் 18 இரண்டாம் இலக்கணம்",
        "form": "Pattern: あらいます + です/ます",
        "ex": {
          "jp": "あらいますです。",
          "en": "Example of あらいます.",
          "ta": "あらいます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 18: What is the meaning of 'できます' (できます)?",
        "options": [
          "できます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "できます",
        "explain": "'できます' means できます (できます)."
      },
      {
        "q": "Lesson 18: Identify the main grammar structure.",
        "options": [
          "Lesson 18 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 18 Core Pattern 1",
        "explain": "Lesson 18 focuses on Lesson 18 Core Pattern 1."
      }
    ]
  },
  {
    "id": 19,
    "jp": "にほんへ いった ことが あります",
    "en": "I have been to Japan (Experience & Ta-form) (Lesson 19)",
    "ta": "ஜப்பான் சென்றிருக்கிறேன்",
    "vocab": [
      {
        "jp": "のぼります",
        "r": "のぼります",
        "en": "のぼります",
        "ta": "のぼります"
      },
      {
        "jp": "とまります",
        "r": "とまります",
        "en": "とまります",
        "ta": "とまります"
      },
      {
        "jp": "そうじします",
        "r": "そうじします",
        "en": "そうじします",
        "ta": "そうじします"
      },
      {
        "jp": "せんたくします",
        "r": "せんたくします",
        "en": "せんたくします",
        "ta": "せんたくします"
      },
      {
        "jp": "なります",
        "r": "なります",
        "en": "なります",
        "ta": "なります"
      },
      {
        "jp": "ねむい",
        "r": "ねむい",
        "en": "ねむい",
        "ta": "ねむい"
      },
      {
        "jp": "つよい",
        "r": "つよい",
        "en": "つよい",
        "ta": "つよい"
      },
      {
        "jp": "よわい",
        "r": "よわい",
        "en": "よわい",
        "ta": "よわい"
      },
      {
        "jp": "練習",
        "r": "練習",
        "en": "練習",
        "ta": "練習"
      },
      {
        "jp": "ゴルフ",
        "r": "ゴルフ",
        "en": "ゴルフ",
        "ta": "ゴルフ"
      },
      {
        "jp": "すもう",
        "r": "すもう",
        "en": "すもう",
        "ta": "すもう"
      },
      {
        "jp": "お茶",
        "r": "お茶",
        "en": "お茶",
        "ta": "お茶"
      },
      {
        "jp": "日",
        "r": "日",
        "en": "日",
        "ta": "日"
      },
      {
        "jp": "調子",
        "r": "調子",
        "en": "調子",
        "ta": "調子"
      },
      {
        "jp": "一度",
        "r": "一度",
        "en": "一度",
        "ta": "一度"
      },
      {
        "jp": "一度も",
        "r": "一度も",
        "en": "一度も",
        "ta": "一度も"
      },
      {
        "jp": "だんだん",
        "r": "だんだん",
        "en": "だんだん",
        "ta": "だんだん"
      },
      {
        "jp": "もうすぐ",
        "r": "もうすぐ",
        "en": "もうすぐ",
        "ta": "もうすぐ"
      },
      {
        "jp": "おかげさまで",
        "r": "おかげさまで",
        "en": "おかげさまで",
        "ta": "おかげさまで"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 19 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 19",
        "ta": "பாடம் 19 முதன்மை இலக்கணம்",
        "form": "Pattern: のぼります + です/ます",
        "ex": {
          "jp": "のぼりますです。",
          "en": "Example of のぼります.",
          "ta": "のぼります உதாரணம்."
        }
      },
      {
        "t": "Lesson 19 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 19",
        "ta": "பாடம் 19 இரண்டாம் இலக்கணம்",
        "form": "Pattern: とまります + です/ます",
        "ex": {
          "jp": "とまりますです。",
          "en": "Example of とまります.",
          "ta": "とまります உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 19: What is the meaning of 'のぼります' (のぼります)?",
        "options": [
          "のぼります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "のぼります",
        "explain": "'のぼります' means のぼります (のぼります)."
      },
      {
        "q": "Lesson 19: Identify the main grammar structure.",
        "options": [
          "Lesson 19 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 19 Core Pattern 1",
        "explain": "Lesson 19 focuses on Lesson 19 Core Pattern 1."
      }
    ]
  },
  {
    "id": 19,
    "jp": "にほんへ いった ことが あります",
    "en": "I have been to Japan (Experience & Ta-form) (Lesson 19)",
    "ta": "ஜப்பான் சென்றிருக்கிறேன்",
    "vocab": [
      {
        "jp": "のぼります",
        "r": "のぼります",
        "en": "のぼります",
        "ta": "のぼります"
      },
      {
        "jp": "とまります",
        "r": "とまります",
        "en": "とまります",
        "ta": "とまります"
      },
      {
        "jp": "そうじします",
        "r": "そうじします",
        "en": "そうじします",
        "ta": "そうじします"
      },
      {
        "jp": "せんたくします",
        "r": "せんたくします",
        "en": "せんたくします",
        "ta": "せんたくします"
      },
      {
        "jp": "なります",
        "r": "なります",
        "en": "なります",
        "ta": "なります"
      },
      {
        "jp": "ねむい",
        "r": "ねむい",
        "en": "ねむい",
        "ta": "ねむい"
      },
      {
        "jp": "つよい",
        "r": "つよい",
        "en": "つよい",
        "ta": "つよい"
      },
      {
        "jp": "よわい",
        "r": "よわい",
        "en": "よわい",
        "ta": "よわい"
      },
      {
        "jp": "練習",
        "r": "練習",
        "en": "練習",
        "ta": "練習"
      },
      {
        "jp": "ゴルフ",
        "r": "ゴルフ",
        "en": "ゴルフ",
        "ta": "ゴルフ"
      },
      {
        "jp": "すもう",
        "r": "すもう",
        "en": "すもう",
        "ta": "すもう"
      },
      {
        "jp": "お茶",
        "r": "お茶",
        "en": "お茶",
        "ta": "お茶"
      },
      {
        "jp": "日",
        "r": "日",
        "en": "日",
        "ta": "日"
      },
      {
        "jp": "調子",
        "r": "調子",
        "en": "調子",
        "ta": "調子"
      },
      {
        "jp": "一度",
        "r": "一度",
        "en": "一度",
        "ta": "一度"
      },
      {
        "jp": "一度も",
        "r": "一度も",
        "en": "一度も",
        "ta": "一度も"
      },
      {
        "jp": "だんだん",
        "r": "だんだん",
        "en": "だんだん",
        "ta": "だんだん"
      },
      {
        "jp": "もうすぐ",
        "r": "もうすぐ",
        "en": "もうすぐ",
        "ta": "もうすぐ"
      },
      {
        "jp": "おかげさまで",
        "r": "おかげさまで",
        "en": "おかげさまで",
        "ta": "おかげさまで"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 19 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 19",
        "ta": "பாடம் 19 முதன்மை இலக்கணம்",
        "form": "Pattern: のぼります + です/ます",
        "ex": {
          "jp": "のぼりますです。",
          "en": "Example of のぼります.",
          "ta": "のぼります உதாரணம்."
        }
      },
      {
        "t": "Lesson 19 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 19",
        "ta": "பாடம் 19 இரண்டாம் இலக்கணம்",
        "form": "Pattern: とまります + です/ます",
        "ex": {
          "jp": "とまりますです。",
          "en": "Example of とまります.",
          "ta": "とまります உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 19: What is the meaning of 'のぼります' (のぼります)?",
        "options": [
          "のぼります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "のぼります",
        "explain": "'のぼります' means のぼります (のぼります)."
      },
      {
        "q": "Lesson 19: Identify the main grammar structure.",
        "options": [
          "Lesson 19 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 19 Core Pattern 1",
        "explain": "Lesson 19 focuses on Lesson 19 Core Pattern 1."
      }
    ]
  },
  {
    "id": 20,
    "jp": "いっしょに いかない？",
    "en": "Shall we go together? (Casual Style) (Lesson 20)",
    "ta": "ஒன்றாகப் போவோமா?",
    "vocab": [
      {
        "jp": "いります",
        "r": "いります",
        "en": "いります",
        "ta": "いります"
      },
      {
        "jp": "しらべます",
        "r": "しらべます",
        "en": "しらべます",
        "ta": "しらべます"
      },
      {
        "jp": "なおします",
        "r": "なおします",
        "en": "なおします",
        "ta": "なおします"
      },
      {
        "jp": "しゅうりします",
        "r": "しゅうりします",
        "en": "しゅうりします",
        "ta": "しゅうりします"
      },
      {
        "jp": "ぼく",
        "r": "ぼく",
        "en": "ぼく",
        "ta": "ぼく"
      },
      {
        "jp": "きみ",
        "r": "きみ",
        "en": "きみ",
        "ta": "きみ"
      },
      {
        "jp": "～くん",
        "r": "～くん",
        "en": "～くん",
        "ta": "～くん"
      },
      {
        "jp": "うん",
        "r": "うん",
        "en": "うん",
        "ta": "うん"
      },
      {
        "jp": "ううん",
        "r": "ううん",
        "en": "ううん",
        "ta": "ううん"
      },
      {
        "jp": "ことば",
        "r": "ことば",
        "en": "ことば",
        "ta": "ことば"
      },
      {
        "jp": "着物",
        "r": "着物",
        "en": "着物",
        "ta": "着物"
      },
      {
        "jp": "ビザ",
        "r": "ビザ",
        "en": "ビザ",
        "ta": "ビザ"
      },
      {
        "jp": "始め",
        "r": "始め",
        "en": "始め",
        "ta": "始め"
      },
      {
        "jp": "終わり",
        "r": "終わり",
        "en": "終わり",
        "ta": "終わり"
      },
      {
        "jp": "こっち",
        "r": "こっち",
        "en": "こっち",
        "ta": "こっち"
      },
      {
        "jp": "そっち",
        "r": "そっち",
        "en": "そっち",
        "ta": "そっち"
      },
      {
        "jp": "あっち",
        "r": "あっち",
        "en": "あっち",
        "ta": "あっち"
      },
      {
        "jp": "どっち",
        "r": "どっち",
        "en": "どっち",
        "ta": "どっち"
      },
      {
        "jp": "みんなで",
        "r": "みんなで",
        "en": "みんなで",
        "ta": "みんなで"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 20 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 20",
        "ta": "பாடம் 20 முதன்மை இலக்கணம்",
        "form": "Pattern: いります + です/ます",
        "ex": {
          "jp": "いりますです。",
          "en": "Example of いります.",
          "ta": "いります உதாரணம்."
        }
      },
      {
        "t": "Lesson 20 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 20",
        "ta": "பாடம் 20 இரண்டாம் இலக்கணம்",
        "form": "Pattern: しらべます + です/ます",
        "ex": {
          "jp": "しらべますです。",
          "en": "Example of しらべます.",
          "ta": "しらべます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 20: What is the meaning of 'いります' (いります)?",
        "options": [
          "いります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "いります",
        "explain": "'いります' means いります (いります)."
      },
      {
        "q": "Lesson 20: Identify the main grammar structure.",
        "options": [
          "Lesson 20 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 20 Core Pattern 1",
        "explain": "Lesson 20 focuses on Lesson 20 Core Pattern 1."
      }
    ]
  },
  {
    "id": 20,
    "jp": "いっしょに いかない？",
    "en": "Shall we go together? (Casual Style) (Lesson 20)",
    "ta": "ஒன்றாகப் போவோமா?",
    "vocab": [
      {
        "jp": "いります",
        "r": "いります",
        "en": "いります",
        "ta": "いります"
      },
      {
        "jp": "しらべます",
        "r": "しらべます",
        "en": "しらべます",
        "ta": "しらべます"
      },
      {
        "jp": "なおします",
        "r": "なおします",
        "en": "なおします",
        "ta": "なおします"
      },
      {
        "jp": "しゅうりします",
        "r": "しゅうりします",
        "en": "しゅうりします",
        "ta": "しゅうりします"
      },
      {
        "jp": "ぼく",
        "r": "ぼく",
        "en": "ぼく",
        "ta": "ぼく"
      },
      {
        "jp": "きみ",
        "r": "きみ",
        "en": "きみ",
        "ta": "きみ"
      },
      {
        "jp": "～くん",
        "r": "～くん",
        "en": "～くん",
        "ta": "～くん"
      },
      {
        "jp": "うん",
        "r": "うん",
        "en": "うん",
        "ta": "うん"
      },
      {
        "jp": "ううん",
        "r": "ううん",
        "en": "ううん",
        "ta": "ううん"
      },
      {
        "jp": "ことば",
        "r": "ことば",
        "en": "ことば",
        "ta": "ことば"
      },
      {
        "jp": "着物",
        "r": "着物",
        "en": "着物",
        "ta": "着物"
      },
      {
        "jp": "ビザ",
        "r": "ビザ",
        "en": "ビザ",
        "ta": "ビザ"
      },
      {
        "jp": "始め",
        "r": "始め",
        "en": "始め",
        "ta": "始め"
      },
      {
        "jp": "終わり",
        "r": "終わり",
        "en": "終わり",
        "ta": "終わり"
      },
      {
        "jp": "こっち",
        "r": "こっち",
        "en": "こっち",
        "ta": "こっち"
      },
      {
        "jp": "そっち",
        "r": "そっち",
        "en": "そっち",
        "ta": "そっち"
      },
      {
        "jp": "あっち",
        "r": "あっち",
        "en": "あっち",
        "ta": "あっち"
      },
      {
        "jp": "どっち",
        "r": "どっち",
        "en": "どっち",
        "ta": "どっち"
      },
      {
        "jp": "みんなで",
        "r": "みんなで",
        "en": "みんなで",
        "ta": "みんなで"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 20 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 20",
        "ta": "பாடம் 20 முதன்மை இலக்கணம்",
        "form": "Pattern: いります + です/ます",
        "ex": {
          "jp": "いりますです。",
          "en": "Example of いります.",
          "ta": "いります உதாரணம்."
        }
      },
      {
        "t": "Lesson 20 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 20",
        "ta": "பாடம் 20 இரண்டாம் இலக்கணம்",
        "form": "Pattern: しらべます + です/ます",
        "ex": {
          "jp": "しらべますです。",
          "en": "Example of しらべます.",
          "ta": "しらべます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 20: What is the meaning of 'いります' (いります)?",
        "options": [
          "いります",
          "Water",
          "Book",
          "School"
        ],
        "answer": "いります",
        "explain": "'いります' means いります (いります)."
      },
      {
        "q": "Lesson 20: Identify the main grammar structure.",
        "options": [
          "Lesson 20 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 20 Core Pattern 1",
        "explain": "Lesson 20 focuses on Lesson 20 Core Pattern 1."
      }
    ]
  },
  {
    "id": 21,
    "jp": "あしたは あめが ふると おもいます",
    "en": "I think it will rain tomorrow (Opinions) (Lesson 21)",
    "ta": "நாளை மழை பெய்யும் என நினைக்கிறேன்",
    "vocab": [
      {
        "jp": "言います",
        "r": "言います",
        "en": "言います",
        "ta": "言います"
      },
      {
        "jp": "勝ちます",
        "r": "勝ちます",
        "en": "勝ちます",
        "ta": "勝ちます"
      },
      {
        "jp": "負けます",
        "r": "負けます",
        "en": "負けます",
        "ta": "負けます"
      },
      {
        "jp": "あります",
        "r": "あります",
        "en": "あります",
        "ta": "あります"
      },
      {
        "jp": "役立ちます",
        "r": "役立ちます",
        "en": "役立ちます",
        "ta": "役立ちます"
      },
      {
        "jp": "動きます",
        "r": "動きます",
        "en": "動きます",
        "ta": "動きます"
      },
      {
        "jp": "やめます",
        "r": "やめます",
        "en": "やめます",
        "ta": "やめます"
      },
      {
        "jp": "気をつけます",
        "r": "気をつけます",
        "en": "気をつけます",
        "ta": "気をつけます"
      },
      {
        "jp": "留学します",
        "r": "留学します",
        "en": "留学します",
        "ta": "留学します"
      },
      {
        "jp": "むだ",
        "r": "むだ",
        "en": "むだ",
        "ta": "むだ"
      },
      {
        "jp": "不便",
        "r": "不便",
        "en": "不便",
        "ta": "不便"
      },
      {
        "jp": "すごい",
        "r": "すごい",
        "en": "すごい",
        "ta": "すごい"
      },
      {
        "jp": "本当",
        "r": "本当",
        "en": "本当",
        "ta": "本当"
      },
      {
        "jp": "嘘",
        "r": "嘘",
        "en": "嘘",
        "ta": "嘘"
      },
      {
        "jp": "自動車",
        "r": "自動車",
        "en": "自動車",
        "ta": "自動車"
      },
      {
        "jp": "交通",
        "r": "交通",
        "en": "交通",
        "ta": "交通"
      },
      {
        "jp": "物価",
        "r": "物価",
        "en": "物価",
        "ta": "物価"
      },
      {
        "jp": "ニュース",
        "r": "ニュース",
        "en": "ニュース",
        "ta": "ニュース"
      },
      {
        "jp": "アニメ",
        "r": "アニメ",
        "en": "アニメ",
        "ta": "アニメ"
      },
      {
        "jp": "マンガ",
        "r": "マンガ",
        "en": "マンガ",
        "ta": "マンガ"
      },
      {
        "jp": "デザイン",
        "r": "デザイン",
        "en": "デザイン",
        "ta": "デザイン"
      },
      {
        "jp": "夢",
        "r": "夢",
        "en": "夢",
        "ta": "夢"
      },
      {
        "jp": "天才",
        "r": "天才",
        "en": "天才",
        "ta": "天才"
      },
      {
        "jp": "試合",
        "r": "試合",
        "en": "試合",
        "ta": "試合"
      },
      {
        "jp": "意見",
        "r": "意見",
        "en": "意見",
        "ta": "意見"
      },
      {
        "jp": "話",
        "r": "話",
        "en": "話",
        "ta": "話"
      },
      {
        "jp": "地球",
        "r": "地球",
        "en": "地球",
        "ta": "地球"
      },
      {
        "jp": "月に",
        "r": "月に",
        "en": "月に",
        "ta": "月に"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 21 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 21",
        "ta": "பாடம் 21 முதன்மை இலக்கணம்",
        "form": "Pattern: 言います + です/ます",
        "ex": {
          "jp": "言いますです。",
          "en": "Example of 言います.",
          "ta": "言います உதாரணம்."
        }
      },
      {
        "t": "Lesson 21 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 21",
        "ta": "பாடம் 21 இரண்டாம் இலக்கணம்",
        "form": "Pattern: 勝ちます + です/ます",
        "ex": {
          "jp": "勝ちますです。",
          "en": "Example of 勝ちます.",
          "ta": "勝ちます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 21: What is the meaning of '言います' (言います)?",
        "options": [
          "言います",
          "Water",
          "Book",
          "School"
        ],
        "answer": "言います",
        "explain": "'言います' means 言います (言います)."
      },
      {
        "q": "Lesson 21: Identify the main grammar structure.",
        "options": [
          "Lesson 21 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 21 Core Pattern 1",
        "explain": "Lesson 21 focuses on Lesson 21 Core Pattern 1."
      }
    ]
  },
  {
    "id": 21,
    "jp": "あしたは あめが ふると おもいます",
    "en": "I think it will rain tomorrow (Opinions) (Lesson 21)",
    "ta": "நாளை மழை பெய்யும் என நினைக்கிறேன்",
    "vocab": [
      {
        "jp": "言います",
        "r": "言います",
        "en": "言います",
        "ta": "言います"
      },
      {
        "jp": "勝ちます",
        "r": "勝ちます",
        "en": "勝ちます",
        "ta": "勝ちます"
      },
      {
        "jp": "負けます",
        "r": "負けます",
        "en": "負けます",
        "ta": "負けます"
      },
      {
        "jp": "あります",
        "r": "あります",
        "en": "あります",
        "ta": "あります"
      },
      {
        "jp": "役立ちます",
        "r": "役立ちます",
        "en": "役立ちます",
        "ta": "役立ちます"
      },
      {
        "jp": "動きます",
        "r": "動きます",
        "en": "動きます",
        "ta": "動きます"
      },
      {
        "jp": "やめます",
        "r": "やめます",
        "en": "やめます",
        "ta": "やめます"
      },
      {
        "jp": "気をつけます",
        "r": "気をつけます",
        "en": "気をつけます",
        "ta": "気をつけます"
      },
      {
        "jp": "留学します",
        "r": "留学します",
        "en": "留学します",
        "ta": "留学します"
      },
      {
        "jp": "むだ",
        "r": "むだ",
        "en": "むだ",
        "ta": "むだ"
      },
      {
        "jp": "不便",
        "r": "不便",
        "en": "不便",
        "ta": "不便"
      },
      {
        "jp": "すごい",
        "r": "すごい",
        "en": "すごい",
        "ta": "すごい"
      },
      {
        "jp": "本当",
        "r": "本当",
        "en": "本当",
        "ta": "本当"
      },
      {
        "jp": "嘘",
        "r": "嘘",
        "en": "嘘",
        "ta": "嘘"
      },
      {
        "jp": "自動車",
        "r": "自動車",
        "en": "自動車",
        "ta": "自動車"
      },
      {
        "jp": "交通",
        "r": "交通",
        "en": "交通",
        "ta": "交通"
      },
      {
        "jp": "物価",
        "r": "物価",
        "en": "物価",
        "ta": "物価"
      },
      {
        "jp": "ニュース",
        "r": "ニュース",
        "en": "ニュース",
        "ta": "ニュース"
      },
      {
        "jp": "アニメ",
        "r": "アニメ",
        "en": "アニメ",
        "ta": "アニメ"
      },
      {
        "jp": "マンガ",
        "r": "マンガ",
        "en": "マンガ",
        "ta": "マンガ"
      },
      {
        "jp": "デザイン",
        "r": "デザイン",
        "en": "デザイン",
        "ta": "デザイン"
      },
      {
        "jp": "夢",
        "r": "夢",
        "en": "夢",
        "ta": "夢"
      },
      {
        "jp": "天才",
        "r": "天才",
        "en": "天才",
        "ta": "天才"
      },
      {
        "jp": "試合",
        "r": "試合",
        "en": "試合",
        "ta": "試合"
      },
      {
        "jp": "意見",
        "r": "意見",
        "en": "意見",
        "ta": "意見"
      },
      {
        "jp": "話",
        "r": "話",
        "en": "話",
        "ta": "話"
      },
      {
        "jp": "地球",
        "r": "地球",
        "en": "地球",
        "ta": "地球"
      },
      {
        "jp": "月に",
        "r": "月に",
        "en": "月に",
        "ta": "月に"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 21 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 21",
        "ta": "பாடம் 21 முதன்மை இலக்கணம்",
        "form": "Pattern: 言います + です/ます",
        "ex": {
          "jp": "言いますです。",
          "en": "Example of 言います.",
          "ta": "言います உதாரணம்."
        }
      },
      {
        "t": "Lesson 21 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 21",
        "ta": "பாடம் 21 இரண்டாம் இலக்கணம்",
        "form": "Pattern: 勝ちます + です/ます",
        "ex": {
          "jp": "勝ちますです。",
          "en": "Example of 勝ちます.",
          "ta": "勝ちます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 21: What is the meaning of '言います' (言います)?",
        "options": [
          "言います",
          "Water",
          "Book",
          "School"
        ],
        "answer": "言います",
        "explain": "'言います' means 言います (言います)."
      },
      {
        "q": "Lesson 21: Identify the main grammar structure.",
        "options": [
          "Lesson 21 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 21 Core Pattern 1",
        "explain": "Lesson 21 focuses on Lesson 21 Core Pattern 1."
      }
    ]
  },
  {
    "id": 22,
    "jp": "これは わたしが つくった りょうりです",
    "en": "This is the dish I made (Noun Clauses) (Lesson 22)",
    "ta": "நான் சமைத்த உணவு இது",
    "vocab": [
      {
        "jp": "着ます",
        "r": "着ます",
        "en": "着ます",
        "ta": "着ます"
      },
      {
        "jp": "はきます",
        "r": "はきます",
        "en": "はきます",
        "ta": "はきます"
      },
      {
        "jp": "かぶります",
        "r": "かぶります",
        "en": "かぶります",
        "ta": "かぶります"
      },
      {
        "jp": "かけます",
        "r": "かけます",
        "en": "かけます",
        "ta": "かけます"
      },
      {
        "jp": "うまれます",
        "r": "うまれます",
        "en": "うまれます",
        "ta": "うまれます"
      },
      {
        "jp": "コート",
        "r": "コート",
        "en": "コート",
        "ta": "コート"
      },
      {
        "jp": "スーツ",
        "r": "スーツ",
        "en": "スーツ",
        "ta": "スーツ"
      },
      {
        "jp": "セーター",
        "r": "セーター",
        "en": "セーター",
        "ta": "セーター"
      },
      {
        "jp": "帽子",
        "r": "帽子",
        "en": "帽子",
        "ta": "帽子"
      },
      {
        "jp": "眼鏡",
        "r": "眼鏡",
        "en": "眼鏡",
        "ta": "眼鏡"
      },
      {
        "jp": "約束",
        "r": "約束",
        "en": "約束",
        "ta": "約束"
      },
      {
        "jp": "おめでとうございます",
        "r": "おめでとうございます",
        "en": "おめでとうございます",
        "ta": "おめでとうございます"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 22 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 22",
        "ta": "பாடம் 22 முதன்மை இலக்கணம்",
        "form": "Pattern: 着ます + です/ます",
        "ex": {
          "jp": "着ますです。",
          "en": "Example of 着ます.",
          "ta": "着ます உதாரணம்."
        }
      },
      {
        "t": "Lesson 22 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 22",
        "ta": "பாடம் 22 இரண்டாம் இலக்கணம்",
        "form": "Pattern: はきます + です/ます",
        "ex": {
          "jp": "はきますです。",
          "en": "Example of はきます.",
          "ta": "はきます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 22: What is the meaning of '着ます' (着ます)?",
        "options": [
          "着ます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "着ます",
        "explain": "'着ます' means 着ます (着ます)."
      },
      {
        "q": "Lesson 22: Identify the main grammar structure.",
        "options": [
          "Lesson 22 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 22 Core Pattern 1",
        "explain": "Lesson 22 focuses on Lesson 22 Core Pattern 1."
      }
    ]
  },
  {
    "id": 22,
    "jp": "これは わたしが つくった りょうりです",
    "en": "This is the dish I made (Noun Clauses) (Lesson 22)",
    "ta": "நான் சமைத்த உணவு இது",
    "vocab": [
      {
        "jp": "着ます",
        "r": "着ます",
        "en": "着ます",
        "ta": "着ます"
      },
      {
        "jp": "はきます",
        "r": "はきます",
        "en": "はきます",
        "ta": "はきます"
      },
      {
        "jp": "かぶります",
        "r": "かぶります",
        "en": "かぶります",
        "ta": "かぶります"
      },
      {
        "jp": "かけます",
        "r": "かけます",
        "en": "かけます",
        "ta": "かけます"
      },
      {
        "jp": "うまれます",
        "r": "うまれます",
        "en": "うまれます",
        "ta": "うまれます"
      },
      {
        "jp": "コート",
        "r": "コート",
        "en": "コート",
        "ta": "コート"
      },
      {
        "jp": "スーツ",
        "r": "スーツ",
        "en": "スーツ",
        "ta": "スーツ"
      },
      {
        "jp": "セーター",
        "r": "セーター",
        "en": "セーター",
        "ta": "セーター"
      },
      {
        "jp": "帽子",
        "r": "帽子",
        "en": "帽子",
        "ta": "帽子"
      },
      {
        "jp": "眼鏡",
        "r": "眼鏡",
        "en": "眼鏡",
        "ta": "眼鏡"
      },
      {
        "jp": "約束",
        "r": "約束",
        "en": "約束",
        "ta": "約束"
      },
      {
        "jp": "おめでとうございます",
        "r": "おめでとうございます",
        "en": "おめでとうございます",
        "ta": "おめでとうございます"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 22 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 22",
        "ta": "பாடம் 22 முதன்மை இலக்கணம்",
        "form": "Pattern: 着ます + です/ます",
        "ex": {
          "jp": "着ますです。",
          "en": "Example of 着ます.",
          "ta": "着ます உதாரணம்."
        }
      },
      {
        "t": "Lesson 22 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 22",
        "ta": "பாடம் 22 இரண்டாம் இலக்கணம்",
        "form": "Pattern: はきます + です/ます",
        "ex": {
          "jp": "はきますです。",
          "en": "Example of はきます.",
          "ta": "はきます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 22: What is the meaning of '着ます' (着ます)?",
        "options": [
          "着ます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "着ます",
        "explain": "'着ます' means 着ます (着ます)."
      },
      {
        "q": "Lesson 22: Identify the main grammar structure.",
        "options": [
          "Lesson 22 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 22 Core Pattern 1",
        "explain": "Lesson 22 focuses on Lesson 22 Core Pattern 1."
      }
    ]
  },
  {
    "id": 23,
    "jp": "ひまな とき、えいがを みます",
    "en": "When I am free, I watch movies (Conditions) (Lesson 23)",
    "ta": "நேரம் இருக்கும்போது படம் பார்ப்பேன்",
    "vocab": [
      {
        "jp": "ききます",
        "r": "ききます",
        "en": "ききます",
        "ta": "ききます"
      },
      {
        "jp": "まわします",
        "r": "まわします",
        "en": "まわします",
        "ta": "まわします"
      },
      {
        "jp": "ひきます",
        "r": "ひきます",
        "en": "ひきます",
        "ta": "ひきます"
      },
      {
        "jp": "かえます",
        "r": "かえます",
        "en": "かえます",
        "ta": "かえます"
      },
      {
        "jp": "触ります",
        "r": "触ります",
        "en": "触ります",
        "ta": "触ります"
      },
      {
        "jp": "出ます",
        "r": "出ます",
        "en": "出ます",
        "ta": "出ます"
      },
      {
        "jp": "動きます",
        "r": "動きます",
        "en": "動きます",
        "ta": "動きます"
      },
      {
        "jp": "歩きます",
        "r": "歩きます",
        "en": "歩きます",
        "ta": "歩きます"
      },
      {
        "jp": "渡ります",
        "r": "渡ります",
        "en": "渡ります",
        "ta": "渡ります"
      },
      {
        "jp": "曲がります",
        "r": "曲がります",
        "en": "曲がります",
        "ta": "曲がります"
      },
      {
        "jp": "さびしい",
        "r": "さびしい",
        "en": "さびしい",
        "ta": "さびしい"
      },
      {
        "jp": "お湯",
        "r": "お湯",
        "en": "お湯",
        "ta": "お湯"
      },
      {
        "jp": "音",
        "r": "音",
        "en": "音",
        "ta": "音"
      },
      {
        "jp": "サイズ",
        "r": "サイズ",
        "en": "サイズ",
        "ta": "サイズ"
      },
      {
        "jp": "故障",
        "r": "故障",
        "en": "故障",
        "ta": "故障"
      },
      {
        "jp": "道",
        "r": "道",
        "en": "道",
        "ta": "道"
      },
      {
        "jp": "交差点",
        "r": "交差点",
        "en": "交差点",
        "ta": "交差点"
      },
      {
        "jp": "信号",
        "r": "信号",
        "en": "信号",
        "ta": "信号"
      },
      {
        "jp": "角",
        "r": "角",
        "en": "角",
        "ta": "角"
      },
      {
        "jp": "橋",
        "r": "橋",
        "en": "橋",
        "ta": "橋"
      },
      {
        "jp": "駐車場",
        "r": "駐車場",
        "en": "駐車場",
        "ta": "駐車場"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 23 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 23",
        "ta": "பாடம் 23 முதன்மை இலக்கணம்",
        "form": "Pattern: ききます + です/ます",
        "ex": {
          "jp": "ききますです。",
          "en": "Example of ききます.",
          "ta": "ききます உதாரணம்."
        }
      },
      {
        "t": "Lesson 23 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 23",
        "ta": "பாடம் 23 இரண்டாம் இலக்கணம்",
        "form": "Pattern: まわします + です/ます",
        "ex": {
          "jp": "まわしますです。",
          "en": "Example of まわします.",
          "ta": "まわします உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 23: What is the meaning of 'ききます' (ききます)?",
        "options": [
          "ききます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "ききます",
        "explain": "'ききます' means ききます (ききます)."
      },
      {
        "q": "Lesson 23: Identify the main grammar structure.",
        "options": [
          "Lesson 23 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 23 Core Pattern 1",
        "explain": "Lesson 23 focuses on Lesson 23 Core Pattern 1."
      }
    ]
  },
  {
    "id": 23,
    "jp": "ひまな とき、えいがを みます",
    "en": "When I am free, I watch movies (Conditions) (Lesson 23)",
    "ta": "நேரம் இருக்கும்போது படம் பார்ப்பேன்",
    "vocab": [
      {
        "jp": "ききます",
        "r": "ききます",
        "en": "ききます",
        "ta": "ききます"
      },
      {
        "jp": "まわします",
        "r": "まわします",
        "en": "まわします",
        "ta": "まわします"
      },
      {
        "jp": "ひきます",
        "r": "ひきます",
        "en": "ひきます",
        "ta": "ひきます"
      },
      {
        "jp": "かえます",
        "r": "かえます",
        "en": "かえます",
        "ta": "かえます"
      },
      {
        "jp": "触ります",
        "r": "触ります",
        "en": "触ります",
        "ta": "触ります"
      },
      {
        "jp": "出ます",
        "r": "出ます",
        "en": "出ます",
        "ta": "出ます"
      },
      {
        "jp": "動きます",
        "r": "動きます",
        "en": "動きます",
        "ta": "動きます"
      },
      {
        "jp": "歩きます",
        "r": "歩きます",
        "en": "歩きます",
        "ta": "歩きます"
      },
      {
        "jp": "渡ります",
        "r": "渡ります",
        "en": "渡ります",
        "ta": "渡ります"
      },
      {
        "jp": "曲がります",
        "r": "曲がります",
        "en": "曲がります",
        "ta": "曲がります"
      },
      {
        "jp": "さびしい",
        "r": "さびしい",
        "en": "さびしい",
        "ta": "さびしい"
      },
      {
        "jp": "お湯",
        "r": "お湯",
        "en": "お湯",
        "ta": "お湯"
      },
      {
        "jp": "音",
        "r": "音",
        "en": "音",
        "ta": "音"
      },
      {
        "jp": "サイズ",
        "r": "サイズ",
        "en": "サイズ",
        "ta": "サイズ"
      },
      {
        "jp": "故障",
        "r": "故障",
        "en": "故障",
        "ta": "故障"
      },
      {
        "jp": "道",
        "r": "道",
        "en": "道",
        "ta": "道"
      },
      {
        "jp": "交差点",
        "r": "交差点",
        "en": "交差点",
        "ta": "交差点"
      },
      {
        "jp": "信号",
        "r": "信号",
        "en": "信号",
        "ta": "信号"
      },
      {
        "jp": "角",
        "r": "角",
        "en": "角",
        "ta": "角"
      },
      {
        "jp": "橋",
        "r": "橋",
        "en": "橋",
        "ta": "橋"
      },
      {
        "jp": "駐車場",
        "r": "駐車場",
        "en": "駐車場",
        "ta": "駐車場"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 23 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 23",
        "ta": "பாடம் 23 முதன்மை இலக்கணம்",
        "form": "Pattern: ききます + です/ます",
        "ex": {
          "jp": "ききますです。",
          "en": "Example of ききます.",
          "ta": "ききます உதாரணம்."
        }
      },
      {
        "t": "Lesson 23 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 23",
        "ta": "பாடம் 23 இரண்டாம் இலக்கணம்",
        "form": "Pattern: まわします + です/ます",
        "ex": {
          "jp": "まわしますです。",
          "en": "Example of まわします.",
          "ta": "まわします உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 23: What is the meaning of 'ききます' (ききます)?",
        "options": [
          "ききます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "ききます",
        "explain": "'ききます' means ききます (ききます)."
      },
      {
        "q": "Lesson 23: Identify the main grammar structure.",
        "options": [
          "Lesson 23 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 23 Core Pattern 1",
        "explain": "Lesson 23 focuses on Lesson 23 Core Pattern 1."
      }
    ]
  },
  {
    "id": 24,
    "jp": "ともだちが てつだって くれました",
    "en": "A friend helped me (Favours & Giving) (Lesson 24)",
    "ta": "நண்பர் எனக்கு உதவினார்",
    "vocab": [
      {
        "jp": "くれます",
        "r": "くれます",
        "en": "くれます",
        "ta": "くれます"
      },
      {
        "jp": "直します",
        "r": "直します",
        "en": "直します",
        "ta": "直します"
      },
      {
        "jp": "連れて行きます",
        "r": "連れて行きます",
        "en": "連れて行きます",
        "ta": "連れて行きます"
      },
      {
        "jp": "連れて来ます",
        "r": "連れて来ます",
        "en": "連れて来ます",
        "ta": "連れて来ます"
      },
      {
        "jp": "送ります",
        "r": "送ります",
        "en": "送ります",
        "ta": "送ります"
      },
      {
        "jp": "紹介します",
        "r": "紹介します",
        "en": "紹介します",
        "ta": "紹介します"
      },
      {
        "jp": "案内します",
        "r": "案内します",
        "en": "案内します",
        "ta": "案内します"
      },
      {
        "jp": "説明します",
        "r": "説明します",
        "en": "説明します",
        "ta": "説明します"
      },
      {
        "jp": "おじいさん",
        "r": "おじいさん",
        "en": "おじいさん",
        "ta": "おじいさん"
      },
      {
        "jp": "おばあさん",
        "r": "おばあさん",
        "en": "おばあさん",
        "ta": "おばあさん"
      },
      {
        "jp": "準備",
        "r": "準備",
        "en": "準備",
        "ta": "準備"
      },
      {
        "jp": "引っ越し",
        "r": "引っ越し",
        "en": "引っ越し",
        "ta": "引っ越し"
      },
      {
        "jp": "お菓子",
        "r": "お菓子",
        "en": "お菓子",
        "ta": "お菓子"
      },
      {
        "jp": "ホームステイ",
        "r": "ホームステイ",
        "en": "ホームステイ",
        "ta": "ホームステイ"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 24 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 24",
        "ta": "பாடம் 24 முதன்மை இலக்கணம்",
        "form": "Pattern: くれます + です/ます",
        "ex": {
          "jp": "くれますです。",
          "en": "Example of くれます.",
          "ta": "くれます உதாரணம்."
        }
      },
      {
        "t": "Lesson 24 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 24",
        "ta": "பாடம் 24 இரண்டாம் இலக்கணம்",
        "form": "Pattern: 直します + です/ます",
        "ex": {
          "jp": "直しますです。",
          "en": "Example of 直します.",
          "ta": "直します உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 24: What is the meaning of 'くれます' (くれます)?",
        "options": [
          "くれます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "くれます",
        "explain": "'くれます' means くれます (くれます)."
      },
      {
        "q": "Lesson 24: Identify the main grammar structure.",
        "options": [
          "Lesson 24 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 24 Core Pattern 1",
        "explain": "Lesson 24 focuses on Lesson 24 Core Pattern 1."
      }
    ]
  },
  {
    "id": 24,
    "jp": "ともだちが てつだって くれました",
    "en": "A friend helped me (Favours & Giving) (Lesson 24)",
    "ta": "நண்பர் எனக்கு உதவினார்",
    "vocab": [
      {
        "jp": "くれます",
        "r": "くれます",
        "en": "くれます",
        "ta": "くれます"
      },
      {
        "jp": "直します",
        "r": "直します",
        "en": "直します",
        "ta": "直します"
      },
      {
        "jp": "連れて行きます",
        "r": "連れて行きます",
        "en": "連れて行きます",
        "ta": "連れて行きます"
      },
      {
        "jp": "連れて来ます",
        "r": "連れて来ます",
        "en": "連れて来ます",
        "ta": "連れて来ます"
      },
      {
        "jp": "送ります",
        "r": "送ります",
        "en": "送ります",
        "ta": "送ります"
      },
      {
        "jp": "紹介します",
        "r": "紹介します",
        "en": "紹介します",
        "ta": "紹介します"
      },
      {
        "jp": "案内します",
        "r": "案内します",
        "en": "案内します",
        "ta": "案内します"
      },
      {
        "jp": "説明します",
        "r": "説明します",
        "en": "説明します",
        "ta": "説明します"
      },
      {
        "jp": "おじいさん",
        "r": "おじいさん",
        "en": "おじいさん",
        "ta": "おじいさん"
      },
      {
        "jp": "おばあさん",
        "r": "おばあさん",
        "en": "おばあさん",
        "ta": "おばあさん"
      },
      {
        "jp": "準備",
        "r": "準備",
        "en": "準備",
        "ta": "準備"
      },
      {
        "jp": "引っ越し",
        "r": "引っ越し",
        "en": "引っ越し",
        "ta": "引っ越し"
      },
      {
        "jp": "お菓子",
        "r": "お菓子",
        "en": "お菓子",
        "ta": "お菓子"
      },
      {
        "jp": "ホームステイ",
        "r": "ホームステイ",
        "en": "ホームステイ",
        "ta": "ホームステイ"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 24 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 24",
        "ta": "பாடம் 24 முதன்மை இலக்கணம்",
        "form": "Pattern: くれます + です/ます",
        "ex": {
          "jp": "くれますです。",
          "en": "Example of くれます.",
          "ta": "くれます உதாரணம்."
        }
      },
      {
        "t": "Lesson 24 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 24",
        "ta": "பாடம் 24 இரண்டாம் இலக்கணம்",
        "form": "Pattern: 直します + です/ます",
        "ex": {
          "jp": "直しますです。",
          "en": "Example of 直します.",
          "ta": "直します உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 24: What is the meaning of 'くれます' (くれます)?",
        "options": [
          "くれます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "くれます",
        "explain": "'くれます' means くれます (くれます)."
      },
      {
        "q": "Lesson 24: Identify the main grammar structure.",
        "options": [
          "Lesson 24 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 24 Core Pattern 1",
        "explain": "Lesson 24 focuses on Lesson 24 Core Pattern 1."
      }
    ]
  },
  {
    "id": 25,
    "jp": "じかんが あったら、いきます",
    "en": "If I have time, I will go (たら Conditionals) (Lesson 25)",
    "ta": "நேரமிருந்தால் போவேன்",
    "vocab": [
      {
        "jp": "考えます",
        "r": "考えます",
        "en": "考えます",
        "ta": "考えます"
      },
      {
        "jp": "着きます",
        "r": "着きます",
        "en": "着きます",
        "ta": "着きます"
      },
      {
        "jp": "取ります",
        "r": "取ります",
        "en": "取ります",
        "ta": "取ります"
      },
      {
        "jp": "足ります",
        "r": "足ります",
        "en": "足ります",
        "ta": "足ります"
      },
      {
        "jp": "田舎",
        "r": "田舎",
        "en": "田舎",
        "ta": "田舎"
      },
      {
        "jp": "チャンス",
        "r": "チャンス",
        "en": "チャンス",
        "ta": "チャンス"
      },
      {
        "jp": "億",
        "r": "億",
        "en": "億",
        "ta": "億"
      },
      {
        "jp": "もし",
        "r": "もし",
        "en": "もし",
        "ta": "もし"
      },
      {
        "jp": "いくら",
        "r": "いくら",
        "en": "いくら",
        "ta": "いくら"
      },
      {
        "jp": "転勤",
        "r": "転勤",
        "en": "転勤",
        "ta": "転勤"
      },
      {
        "jp": "こと",
        "r": "こと",
        "en": "こと",
        "ta": "こと"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 25 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 25",
        "ta": "பாடம் 25 முதன்மை இலக்கணம்",
        "form": "Pattern: 考えます + です/ます",
        "ex": {
          "jp": "考えますです。",
          "en": "Example of 考えます.",
          "ta": "考えます உதாரணம்."
        }
      },
      {
        "t": "Lesson 25 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 25",
        "ta": "பாடம் 25 இரண்டாம் இலக்கணம்",
        "form": "Pattern: 着きます + です/ます",
        "ex": {
          "jp": "着きますです。",
          "en": "Example of 着きます.",
          "ta": "着きます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 25: What is the meaning of '考えます' (考えます)?",
        "options": [
          "考えます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "考えます",
        "explain": "'考えます' means 考えます (考えます)."
      },
      {
        "q": "Lesson 25: Identify the main grammar structure.",
        "options": [
          "Lesson 25 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 25 Core Pattern 1",
        "explain": "Lesson 25 focuses on Lesson 25 Core Pattern 1."
      }
    ]
  },
  {
    "id": 25,
    "jp": "じかんが あったら、いきます",
    "en": "If I have time, I will go (たら Conditionals) (Lesson 25)",
    "ta": "நேரமிருந்தால் போவேன்",
    "vocab": [
      {
        "jp": "考えます",
        "r": "考えます",
        "en": "考えます",
        "ta": "考えます"
      },
      {
        "jp": "着きます",
        "r": "着きます",
        "en": "着きます",
        "ta": "着きます"
      },
      {
        "jp": "取ります",
        "r": "取ります",
        "en": "取ります",
        "ta": "取ります"
      },
      {
        "jp": "足ります",
        "r": "足ります",
        "en": "足ります",
        "ta": "足ります"
      },
      {
        "jp": "田舎",
        "r": "田舎",
        "en": "田舎",
        "ta": "田舎"
      },
      {
        "jp": "チャンス",
        "r": "チャンス",
        "en": "チャンス",
        "ta": "チャンス"
      },
      {
        "jp": "億",
        "r": "億",
        "en": "億",
        "ta": "億"
      },
      {
        "jp": "もし",
        "r": "もし",
        "en": "もし",
        "ta": "もし"
      },
      {
        "jp": "いくら",
        "r": "いくら",
        "en": "いくら",
        "ta": "いくら"
      },
      {
        "jp": "転勤",
        "r": "転勤",
        "en": "転勤",
        "ta": "転勤"
      },
      {
        "jp": "こと",
        "r": "こと",
        "en": "こと",
        "ta": "こと"
      }
    ],
    "grammar": [
      {
        "t": "Lesson 25 Core Pattern 1",
        "en": "Primary grammatical pattern for Lesson 25",
        "ta": "பாடம் 25 முதன்மை இலக்கணம்",
        "form": "Pattern: 考えます + です/ます",
        "ex": {
          "jp": "考えますです。",
          "en": "Example of 考えます.",
          "ta": "考えます உதாரணம்."
        }
      },
      {
        "t": "Lesson 25 Core Pattern 2",
        "en": "Secondary grammatical pattern for Lesson 25",
        "ta": "பாடம் 25 இரண்டாம் இலக்கணம்",
        "form": "Pattern: 着きます + です/ます",
        "ex": {
          "jp": "着きますです。",
          "en": "Example of 着きます.",
          "ta": "着きます உதாரணம்."
        }
      }
    ],
    "quiz": [
      {
        "q": "Lesson 25: What is the meaning of '考えます' (考えます)?",
        "options": [
          "考えます",
          "Water",
          "Book",
          "School"
        ],
        "answer": "考えます",
        "explain": "'考えます' means 考えます (考えます)."
      },
      {
        "q": "Lesson 25: Identify the main grammar structure.",
        "options": [
          "Lesson 25 Core Pattern 1",
          "～です",
          "～ます",
          "～でした"
        ],
        "answer": "Lesson 25 Core Pattern 1",
        "explain": "Lesson 25 focuses on Lesson 25 Core Pattern 1."
      }
    ]
  }
];

// Auto-generate 3 quiz questions per lesson from its own vocab + grammar (deterministic, original)
function buildQuiz(lesson){
  const qs = [];
  const v = lesson.vocab;
  // Q1: JP -> EN meaning
  const target = v[0];
  const distractors = v.slice(1,4).map(x=>x.en);
  qs.push({
    q:`「${target.jp}」means...`,
    qta:`「${target.jp}」 என்றால் என்ன?`,
    options: shuffle([target.en, ...distractors]).slice(0,4),
    answer: target.en,
    explain: `${target.jp} (${target.r}) = ${target.en} / ${target.ta}`
  });
  // Q2: EN -> JP
  const target2 = v[1] || v[0];
  const distractors2 = v.filter(x=>x!==target2).slice(0,3).map(x=>x.jp);
  qs.push({
    q:`How do you say "${target2.en}" in Japanese?`,
    qta:`"${target2.en}" -ஐ ஜப்பானிய மொழியில் எப்படி சொல்வது?`,
    options: shuffle([target2.jp, ...distractors2]).slice(0,4),
    answer: target2.jp,
    explain: `${target2.en} = ${target2.jp} (${target2.r})`
  });
  // Q3: grammar fill-in from first grammar point
  const g = lesson.grammar[0];
  qs.push({
    q:`Grammar (${g.t}): complete — ${g.ex.jp.replace(/。$/,'')}　→ meaning?`,
    qta:`இலக்கணம் (${g.t}): இதன் பொருள் என்ன?`,
    options: shuffle([g.ex.en, lesson.grammar[1]?.ex.en, "None of the above meanings apply", "I don't know yet"].filter(Boolean)).slice(0,4),
    answer: g.ex.en,
    explain: `${g.form} — ${g.en} / ${g.ta}`
  });
  return qs;
}
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

LESSONS.forEach(l => { l.quiz = buildQuiz(l); });


// ---- N4 / N3 / N2 / N1 sample architecture (external reference sources, expandable) ----
const OTHER_LEVELS = {
 N4: {
  desc:"Elementary+. Builds on N5 with te-form applications, conditionals, potential form, giving/receiving verbs.",
  sampleGrammar:[
   {t:"～たり～たりします",en:"doing things like A and B (non-exhaustive list of actions)",form:"Verb た-form(り) + Verb た-form(り) + します",ex:{jp:"しゅうまつは　ほんを　よんだり、えいがを　みたり　します。",en:"On weekends I do things like reading books and watching movies."}},
   {t:"～ば",en:"conditional 'if'",form:"Verb ば-form",ex:{jp:"やすければ　かいます。",en:"If it's cheap, I'll buy it."}},
   {t:"可能形（potential）",en:"can do ~ (potential form)",form:"およぐ→およげる",ex:{jp:"わたしは　およげます。",en:"I can swim."}},
   {t:"あげます／もらいます／くれます",en:"giving and receiving verbs",form:"Person(に) + Verb て-form + あげます/もらいます/くれます",ex:{jp:"ともだちに　プレゼントを　もらいました。",en:"I received a present from my friend."}},
  ]
 },
 N3: {
  desc:"Intermediate. Adds a dedicated vocabulary section on the exam; grammar covers formal/causal patterns, ~ようになる, ~まま, ~ばかり.",
  sampleGrammar:[
   {t:"～ようになる",en:"to reach the point where ~ (change over time)",form:"Verb dictionary/potential form + ようになる",ex:{jp:"にほんごが　はなせるように　なりました。",en:"I've become able to speak Japanese."}},
   {t:"～まま",en:"leaving something as-is / while in a state",form:"Verb た-form / Noun の + まま",ex:{jp:"くつを　はいた　まま　はいらないで　ください。",en:"Please don't enter while wearing your shoes."}},
   {t:"～ばかり",en:"nothing but ~ / just did ~",form:"Noun + ばかり / Verb た-form + ばかり",ex:{jp:"かれは　あそんで　ばかり　います。",en:"He does nothing but play."}},
  ]
 },
 N2: {
  desc:"Upper-intermediate. Language Knowledge and Reading are combined into one section. Around 200 grammar points, incl. にもかかわらず, ものの, つつ.",
  sampleGrammar:[
   {t:"～にもかかわらず",en:"despite / nevertheless",form:"Plain form + にもかかわらず",ex:{jp:"あめに　もかかわらず、しあいは　おこなわれました。",en:"Despite the rain, the match was held."}},
   {t:"～ものの",en:"although ~ (concession)",form:"Plain form + ものの",ex:{jp:"やくそくした　ものの、いけませんでした。",en:"Although I promised, I couldn't go."}},
  ]
 },
 N1: {
  desc:"Advanced. Formal written/spoken registers, nuanced emotional and rhetorical patterns like ～ではあるまいし, ～べからず.",
  sampleGrammar:[
   {t:"～ではあるまいし",en:"it's not as if ~ (so...)",form:"Noun/Plain + ではあるまいし",ex:{jp:"こどもでは　あるまいし、じぶんで　できるでしょう。",en:"You're not a child, so you should be able to do it yourself."}},
   {t:"～べからず",en:"must not ~ (formal prohibition, notices)",form:"Verb dictionary form + べからず",ex:{jp:"はいるべからず。",en:"Do not enter. (formal notice)"}},
  ]
 }
};

// Flat pool of all N5 vocab & quiz questions for mock exam generation
const ALL_N5_VOCAB = LESSONS.flatMap(l => l.vocab.map(v => ({...v, lessonId:l.id})));
const ALL_N5_QUIZ = LESSONS.flatMap(l => l.quiz.map(q => ({...q, lessonId:l.id})));

// ===== App component =====

const LEVELS = ["N5","N4","N3","N2","N1"];

const STORAGE_KEY = "nihongo-vertex-progress-v1";
const defaultProgress = {
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  completedLessons: {},   // {lessonId: {score, total, date}}
  mockAttempts: [],       // [{date, score, total, sections:{}}]
};

async function loadProgress(){
  try{
    const res = await window.storage.get('progress', false);
    if(res && res.value) return JSON.parse(res.value);
  }catch(e){ /* not found or unavailable */ }
  return defaultProgress;
}
async function saveProgress(p){
  try{ await window.storage.set('progress', JSON.stringify(p), false); }catch(e){ /* ignore */ }
}

function todayStr(){ return new Date().toISOString().slice(0,10); }

function useProgress(){
  const [progress, setProgress] = useState(defaultProgress);
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{ loadProgress().then(p=>{ setProgress(p); setLoaded(true); }); },[]);
  useEffect(()=>{ if(loaded) saveProgress(progress); }, [progress, loaded]);

  function addXP(n){
    setProgress(prev=>{
      const t = todayStr();
      let streak = prev.streak;
      if(prev.lastStudyDate !== t){
        const yesterday = new Date(Date.now()-86400000).toISOString().slice(0,10);
        streak = prev.lastStudyDate === yesterday ? prev.streak + 1 : 1;
      }
      return {...prev, xp: prev.xp + n, streak, lastStudyDate: t};
    });
  }
  function completeLesson(lessonId, score, total){
    setProgress(prev=>({...prev, completedLessons: {...prev.completedLessons, [lessonId]: {score, total, date: todayStr()}}}));
    addXP(20 + score*5);
  }
  function recordMock(result){
    setProgress(prev=>({...prev, mockAttempts:[...prev.mockAttempts, result]}));
    addXP(200);
  }
  return { progress, addXP, completeLesson, recordMock, loaded };
}

const NAV = [
  {key:"home", jp:"ホーム", en:"Home", icon:HomeIcon},
  {key:"lessons", jp:"学習", en:"Lessons", icon:Layers},
  {key:"characters", jp:"文字ラボ", en:"Kana · Kanji Lab", icon:PenLine},
  {key:"levels", jp:"レベル", en:"Levels", icon:BookOpen},
  {key:"mistakes", jp:"間違いノート", en:"Mistakes", icon:AlertCircle},
  {key:"mock", jp:"模擬試験", en:"Mock Exam", icon:ClipboardCheck},
  {key:"progress", jp:"進捗", en:"Progress", icon:TrendingUp},
  {key:"aiHub", jp:"AIコーチ", en:"AI Mentor Hub", icon:Bot},
];

function TriLabel({jp, en, ta, size="base"}){
  const sizes = { sm:"text-sm", base:"text-base", lg:"text-xl", xl:"text-3xl" };
  return (
    <div>
      <div className={`font-semibold ${sizes[size]} jp-word`} lang="ja">{Array.from(jp).map((char,i)=><span className={`jp-glyph jp-glyph-${i%5}`} key={`${char}-${i}`}>{char}</span>)}</div>
      <div className="text-red-700 text-xs font-medium mt-0.5">🔤 {toRomaji(jp)}</div>
      <div className="jp-meaning text-sm">{en}</div>
      {ta && <div className="text-red-700/70 text-sm" lang="ta">{ta}</div>}
    </div>
  );
}

function ProgressBar({pct, colorClass="bg-red-700"}){
  return (
    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
      <div className={`h-full ${colorClass} transition-all duration-500`} style={{width:`${Math.min(100,Math.max(0,pct))}%`}}/>
    </div>
  );
}

function Card({children, className=""}){
  return <div className={`bg-white border border-stone-200 rounded-2xl shadow-sm ${className}`}>{children}</div>;
}

function LevelOnboarding({onChoose}){
  const meta={
    N5:["Beginner","Build your Japanese foundation"], N4:["Elementary","Strengthen everyday Japanese"],
    N3:["Intermediate","Bridge to confident reading and listening"], N2:["Upper intermediate","Prepare for advanced academic and work Japanese"],
    N1:["Advanced","Master nuanced, professional Japanese"]
  };
  return <div className="min-h-screen bg-stone-50 flex items-center justify-center p-5">
    <div className="w-full max-w-5xl">
      <div className="text-center mb-10"><div className="inline-flex items-center gap-2 text-red-700 font-bold text-sm mb-4"><span className="w-2.5 h-2.5 rounded-full bg-red-600"/> NIHONGO VERTEX</div><h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">Choose your JLPT goal</h1><p className="text-stone-500 mt-3 text-lg">Select the exam level you are preparing for. Every path is available from day one.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LEVELS.map((level,i)=>{const [stage,description]=meta[level]; const Icon=[BookOpen,Layers,TrendingUp,Award,Trophy][i]; return <button key={level} onClick={()=>onChoose(level)} className="level-choice text-left p-6 rounded-2xl border border-stone-200 bg-white shadow-sm hover:border-red-300 hover:-translate-y-1"><div className="w-11 h-11 rounded-xl bg-red-50 text-red-700 flex items-center justify-center mb-6"><Icon size={22}/></div><div className="flex items-baseline justify-between"><h2 className="text-3xl font-bold text-stone-900">{level}</h2><ChevronRight className="text-red-600" size={20}/></div><div className="text-sm font-semibold text-red-700 mt-2">{stage}</div><p className="text-sm text-stone-500 mt-2 leading-6">{description}</p><div className="mt-6 text-sm font-bold text-stone-900">Choose {level} →</div></button>})}
      </div>
    </div>
  </div>;
}

// ---------------- Home / Dashboard ----------------
function Home({progress, lessons, goTo, activeLevel="N5", onChangeExam}){
  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = lessons.length;
  const pct = Math.round((completedCount/totalLessons)*100);
  const nextLesson = lessons.find(l => !progress.completedLessons[l.id]) || lessons[0];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <button onClick={onChangeExam} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-800 hover:text-sky-950">
        <ChevronLeft size={18}/> Back to JLPT exam selection
      </button>
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 md:p-12">
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-red-700/20 blur-2xl"/>
        <div className="absolute right-6 top-6 w-3 h-3 rounded-full bg-red-600"/>
        <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-3">Nihongo Vertex</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-2" lang="ja">日本語を、試験に強い力へ。</h1>
        <p className="text-stone-300 max-w-xl mb-1">Master Japanese from your first hiragana to JLPT N1 — studied through தமிழ் · English · 日本語.</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button onClick={()=>activeLevel==="N5"?goTo("lessons"):goTo("levelDetail",activeLevel)} className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 transition-colors px-6 py-3 rounded-xl font-semibold">
            Continue Learning <ChevronRight size={18}/>
          </button>
          <button onClick={onChangeExam} className="inline-flex items-center gap-2 border border-white/40 bg-white/10 hover:bg-white/20 transition-colors px-5 py-3 rounded-xl font-semibold">
            <ChevronLeft size={18}/> Change JLPT exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-stone-500 text-xs mb-1">Current Level</div>
          <div className="text-2xl font-bold text-stone-900">{activeLevel}</div>
        </Card>
        <Card className="p-5">
          <div className="text-stone-500 text-xs mb-1 flex items-center gap-1"><Flame size={14} className="text-red-600"/> Streak</div>
          <div className="text-2xl font-bold text-stone-900">{progress.streak} days</div>
        </Card>
        <Card className="p-5">
          <div className="text-stone-500 text-xs mb-1 flex items-center gap-1"><Star size={14} className="text-red-600"/> XP</div>
          <div className="text-2xl font-bold text-stone-900">{progress.xp}</div>
        </Card>
        <Card className="p-5">
          <div className="text-stone-500 text-xs mb-1">{activeLevel} Progress</div>
          <div className="text-2xl font-bold text-stone-900">{pct}%</div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-stone-900">N5 Lesson Progress</h3>
          <span className="text-sm text-stone-500">{completedCount} / {totalLessons} lessons</span>
        </div>
        <ProgressBar pct={pct}/>
      </Card>

      <Card className="p-6 border-red-100 bg-red-50/40">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">あ</div>
          <div className="flex-1">
            <h3 className="font-semibold text-stone-900">Character Lab · 文字ラボ</h3>
            <p className="text-sm text-stone-500 mt-1">Learn Hiragana, Katakana and beginner Kanji with English-letter pronunciation, memory objects, audio and handwriting practice.</p>
            <button onClick={()=>goTo("characters")} className="mt-3 inline-flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">Open Character Lab <ChevronRight size={15}/></button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="font-semibold text-stone-900 mb-3">今日の学習 · Continue where you left off</h3>
          <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div>
              <div className="text-xs text-stone-400 mb-1">Lesson {nextLesson.id}</div>
              <TriLabel jp={nextLesson.jp} en={nextLesson.en} ta={nextLesson.ta} size="base"/>
            </div>
            <button onClick={()=>goTo("lesson", nextLesson.id)} className="p-2 rounded-full bg-stone-900 text-white"><ChevronRight size={18}/></button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-stone-900 mb-3">🎌 Ready for a challenge?</h3>
          <p className="text-sm text-stone-500 mb-4">Take the full N5 practice mock exam — timed, JLPT-style sections, scored estimate.</p>
          <button onClick={()=>goTo("mock")} className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors">Start JLPT N5 Mock Test</button>
        </Card>
      </div>
    </div>
  );
}

// ---------------- Level Selector ----------------
function LevelSelector({progress, lessons, goTo, otherLevels, activeLevel}){
  const completedCount = Object.keys(progress.completedLessons).length;
  const pct = Math.round((completedCount/lessons.length)*100);
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">レベル選択 <span className="text-stone-400 text-base font-normal">Level Selector</span></h2>
      <div className="grid md:grid-cols-2 gap-4">
        {LEVELS.map(lv=>{
          const active = lv === activeLevel;
          const labels = {N5:"Beginner · ஆரம்பநிலை", N4:"Elementary · தொடக்கநிலை", N3:"Intermediate · இடைநிலை", N2:"Upper Intermediate · மேல்நிலை", N1:"Advanced · மேம்பட்ட நிலை"};
          return (
            <Card key={lv} className="p-6 level-choice">
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-stone-900">{lv}</div>
                {active && <span className="text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">Your target</span>}
              </div>
              <div className="text-sm text-stone-500 mb-4">{labels[lv]}</div>
              {active ? (
                <>
                  <ProgressBar pct={pct}/>
                  <div className="text-xs text-stone-500 mt-2 mb-4">{pct}% complete · {completedCount}/{lessons.length} lessons</div>
                  <button onClick={()=>goTo("levelDetail", lv)} className="w-full bg-stone-900 text-white rounded-xl py-2.5 font-medium">Study {lv}</button>
                </>
              ) : (
                <>
                  <p className="text-xs text-stone-500 mb-4">{otherLevels[lv].desc}</p>
                  <button onClick={()=>goTo("levelDetail", lv)} className="w-full border border-stone-300 text-stone-700 rounded-xl py-2.5 font-medium">Start {lv} study path</button>
                </>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CurriculumModuleCard({module, goTo}){
  const [open,setOpen]=useState(false);
  return <Card className="overflow-hidden">
    <button onClick={()=>setOpen(v=>!v)} className="w-full text-left p-5 hover:bg-stone-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold shrink-0">{module.sourceLesson || module.id.split("-M").pop()}</div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-stone-400 mb-1">{module.level} · {module.sourceLesson ? `Minna lesson ${module.sourceLesson}` : "NihongoVertex advanced module"}</div>
          <div className="font-semibold text-stone-900">{module.title}</div>
          <div className="text-sm text-stone-500 mt-1" lang="ja">{module.jp}</div>
          <div className="text-sm text-stone-500 mt-1">{module.ta}</div>
        </div>
        <ChevronRight size={18} className={`text-stone-300 transition-transform ${open?"rotate-90":""}`}/>
      </div>
    </button>
    {open && <div className="border-t border-stone-100 p-5 space-y-4">
      <div><div className="text-xs uppercase tracking-wide text-stone-400 mb-1">Objective</div><p className="text-sm text-stone-700">{module.objective}</p></div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-stone-50 p-4"><div className="font-semibold text-sm mb-2">Grammar / 文法</div><ul className="space-y-1 text-sm text-stone-600">{module.grammar.map((g,i)=><li key={i} lang="ja">• {g}</li>)}</ul></div>
        <div className="rounded-xl bg-stone-50 p-4"><div className="font-semibold text-sm mb-2">Vocabulary themes / 語彙</div><div className="flex flex-wrap gap-2">{module.vocabThemes.map((v,i)=><span key={i} className="px-2 py-1 rounded-full bg-white border border-stone-200 text-xs text-stone-600">{v}</span>)}</div></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {module.skills.map((x,i)=><div key={i} className="rounded-lg border border-stone-200 px-3 py-2 text-xs text-stone-600">✓ {x}</div>)}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div><div className="text-xs uppercase tracking-wide text-stone-400 mb-2">Materials</div><ul className="text-sm text-stone-600 space-y-1">{module.materials.map((x,i)=><li key={i}>• {x}</li>)}</ul></div>
        <div><div className="text-xs uppercase tracking-wide text-stone-400 mb-2">Quiz coverage</div><div className="flex flex-wrap gap-2">{module.quizTypes.map((x,i)=><span key={i} className="px-2 py-1 rounded-lg bg-red-50 text-red-700 text-xs">{x}</span>)}</div></div>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        <button onClick={()=>goTo("moduleLesson",module.id)} className="bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">Open {module.level} module →</button>
        <button onClick={()=>window.dispatchEvent(new CustomEvent("open-ai-tutor",{detail:{level:module.level,context:`${module.title} module: ${module.grammar.join(", ")}`}}))} className="border border-stone-300 px-4 py-2 rounded-xl text-sm">Ask AI tutor</button>
      </div>
    </div>}
  </Card>;
}

function ModuleLesson({module, goTo}){
  if(!module) return <Card className="p-6">Module unavailable.</Card>;
  const number = module.sourceLesson || module.id.split("-M").pop();
  return <div className="space-y-5 pb-24 md:pb-6">
    <button onClick={()=>goTo("levelDetail",module.level)} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"><ChevronLeft size={16}/> Back to {module.level} syllabus</button>
    <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-7 md:p-9">
      <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-red-700/20 blur-2xl"/>
      <div className="relative"><div className="text-red-400 text-xs tracking-[0.24em] uppercase mb-2">{module.level} · Module {number}</div><h1 className="text-3xl md:text-4xl font-bold">{module.title}</h1><p className="mt-2 text-stone-300" lang="ja">{module.jp}</p><p className="mt-1 text-sm text-stone-300">{module.ta}</p></div>
    </div>
    <Card className="p-6"><h2 className="font-bold text-stone-900 mb-2">Lesson goal</h2><p className="text-stone-600 leading-7">{module.objective}</p></Card>
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-6"><h2 className="font-bold text-stone-900 mb-4">Grammar targets</h2><ol className="space-y-3">{module.grammar.map((item,index)=><li key={item} className="flex gap-3 text-sm text-stone-700"><span className="w-6 h-6 shrink-0 rounded-full bg-red-50 text-red-700 flex items-center justify-center text-xs font-bold">{index+1}</span><span lang="ja">{item}</span></li>)}</ol></Card>
      <Card className="p-6"><h2 className="font-bold text-stone-900 mb-4">Vocabulary themes</h2><div className="flex flex-wrap gap-2">{module.vocabThemes.map(item=><span key={item} className="px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-sm text-stone-700">{item}</span>)}</div></Card>
    </div>
    <Card className="p-6"><h2 className="font-bold text-stone-900 mb-4">Practice areas</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{module.skills.map(skill=><div key={skill} className="rounded-xl border border-stone-200 p-4"><div className="font-semibold text-stone-800">{skill}</div><div className="text-xs text-stone-500 mt-1">Practice this skill with the module targets.</div></div>)}</div></Card>
    <Card className="p-6"><h2 className="font-bold text-stone-900 mb-3">Module checkpoint</h2><div className="flex flex-wrap gap-2">{module.quizTypes.map(type=><span key={type} className="px-3 py-2 rounded-xl bg-red-50 text-red-700 text-sm font-medium">{type}</span>)}</div><button onClick={()=>window.dispatchEvent(new CustomEvent("open-ai-tutor",{detail:{level:module.level,context:`Create a practice set for ${module.title}: ${module.grammar.join(", ")}.`}}))} className="mt-4 bg-red-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold">Open module practice</button></Card>
  </div>;
}

function LevelDetail({level, otherLevels, goTo}){
  const data = JLPT_CURRICULUM[level];
  if(!data) return <Card className="p-6">Curriculum unavailable.</Card>;
  const stats = CURRICULUM_STATS[level];
  return (
    <div className="space-y-5 pb-24 md:pb-6">
      <div className="flex items-center justify-between gap-3">
        <button onClick={()=>goTo("levels")} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"><ChevronLeft size={16}/> Back to levels</button>
        <span className="text-xs px-3 py-1.5 rounded-full bg-green-50 text-green-700 font-medium">Curriculum built</span>
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-7 md:p-9">
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-red-700/20 blur-3xl"/>
        <div className="relative">
          <div className="text-red-400 text-xs tracking-[0.25em] uppercase mb-2">JLPT · {level}</div>
          <h2 className="text-3xl md:text-4xl font-bold">{data.title}</h2>
          <p className="text-stone-300 mt-2 max-w-3xl">{data.source}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <div className="rounded-xl bg-white/10 p-3"><div className="text-2xl font-bold">{stats.modules}</div><div className="text-xs text-stone-300">modules</div></div>
            <div className="rounded-xl bg-white/10 p-3"><div className="text-2xl font-bold">{stats.quizSets}</div><div className="text-xs text-stone-300">quiz sets</div></div>
            <div className="rounded-xl bg-white/10 p-3"><div className="text-2xl font-bold">{stats.materials}</div><div className="text-xs text-stone-300">learning resources</div></div>
            <div className="rounded-xl bg-white/10 p-3"><div className="text-2xl font-bold">3</div><div className="text-xs text-stone-300">languages</div></div>
          </div>
        </div>
      </div>
      <Card className="p-5 bg-amber-50 border-amber-200">
        <div className="font-semibold text-amber-900 mb-1">English · தமிழ் · 日本語 learning layer</div>
        <p className="text-sm text-amber-800">NihongoVertex uses the public Minna no Nihongo lesson structure as an alignment layer for N5/N4 and provides original English/Tamil explanations, drills and examples. It does not reproduce the textbook's copyrighted translation/grammar notes verbatim. For N3–N1, the curriculum is an original advanced bridge built on the same foundations and JLPT skill domains.</p>
      </Card>
      <div className="flex items-center justify-between">
        <div><h3 className="text-xl font-bold text-stone-900">Complete syllabus</h3><p className="text-sm text-stone-500">Every module expands into grammar, vocabulary, four skills, materials and quiz coverage.</p></div>
      </div>
      <div className="space-y-3">
        {data.modules.map(m=><CurriculumModuleCard key={m.id} module={m} goTo={goTo}/>)}
      </div>
      <Card className="p-5">
        <div className="font-semibold text-stone-900 mb-2">Exam structure</div>
        <div className="flex flex-wrap gap-2 mb-2">{data.exam.sections.map((s,i)=><span key={i} className="px-3 py-1.5 rounded-full bg-stone-100 text-sm text-stone-700">{s}</span>)}</div>
        <p className="text-xs text-stone-500">{data.exam.quizPolicy}</p>
      </Card>
    </div>
  );
}

// ---------------- Lesson List ----------------
function LessonList({lessons, progress, goTo}){
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">学習 <span className="text-stone-400 text-base font-normal">N5 Lessons (based on Minna no Nihongo 1–25)</span></h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {lessons.map(l=>{
          const done = progress.completedLessons[l.id];
          return (
            <button key={l.id} onClick={()=>goTo("lesson", l.id)} className="text-left">
              <Card className="p-4 flex items-center justify-between hover:border-red-300 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${done ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}`}>{l.id}</div>
                  <TriLabel jp={l.jp} en={l.en} ta={l.ta} size="sm"/>
                </div>
                {done ? <CheckCircle2 className="text-green-600 shrink-0" size={20}/> : <ChevronRight className="text-stone-300 shrink-0" size={20}/>}
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// The sidebar Lessons item follows the learner's selected JLPT exam.  N5 keeps
// its detailed legacy lesson flow; every other exam uses its own module list.
function ExamModuleList({level, goTo, moduleLimit, title, description}){
  const curriculum = JLPT_CURRICULUM[level];
  if(!curriculum) return <Card className="p-6">Curriculum unavailable.</Card>;
  const modules = moduleLimit ? curriculum.modules.slice(0,moduleLimit) : curriculum.modules;
  return <div className="space-y-4 pb-24 md:pb-6">
    <div className="flex items-end justify-between gap-3"><div><h2 className="text-2xl font-bold text-stone-900">{title || `${level} Lessons`}</h2><p className="text-sm text-stone-500 mt-1">{description || `${curriculum.modules.length} separate modules for your selected JLPT exam.`}</p></div><button onClick={()=>goTo("levels")} className="text-sm font-semibold text-red-700">Study paths</button></div>
    <div className="grid sm:grid-cols-2 gap-3">
      {modules.map((module,index)=><button key={module.id} onClick={()=>goTo("moduleLesson",module.id)} className="text-left"><Card className="p-4 flex items-center justify-between hover:border-red-300 transition-colors h-full"><div className="flex items-start gap-3"><div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 bg-stone-100 text-stone-500">{index+1}</div><div><div className="font-semibold text-stone-900">{module.title}</div><div className="text-xs text-red-700 mt-1" lang="ja">{module.jp}</div><div className="text-xs text-stone-500 mt-1">{module.grammar.slice(0,2).join(" · ")}</div></div></div><ChevronRight className="text-stone-300 shrink-0" size={20}/></Card></button>)}
    </div>
  </div>;
}

function StudyTierSelector({level, goTo}){
  const curriculum=JLPT_CURRICULUM[level];
  if(!curriculum) return <Card className="p-6">Curriculum unavailable.</Card>;
  const total=curriculum.modules.length;
  const tiers=[
    {id:"beginner",name:"Beginner",target:"Core foundation",count:Math.ceil(total*.5),desc:"Start with the essential foundation modules and build confidence before timed practice.",icon:"1"},
    {id:"intermediate",name:"Intermediate",target:"Exam-ready coverage",count:Math.ceil(total*.8),desc:"Study the foundation plus the wider grammar, vocabulary, reading and listening range.",icon:"2"},
    {id:"hard",name:"Hard",target:"Complete high-score path",count:total,desc:"Complete every module, then use review and mock practice to aim for your strongest result.",icon:"3"}
  ];
  return <div className="space-y-5 pb-24 md:pb-6"><div><h2 className="text-2xl font-bold text-stone-900">{level} Study Levels</h2><p className="text-sm text-stone-500 mt-1">Choose the depth of syllabus coverage you want for {level}. These are study paths, not score guarantees.</p></div><div className="grid md:grid-cols-3 gap-4">{tiers.map(tier=><Card key={tier.id} className="p-6 level-choice"><div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-bold mb-5">{tier.icon}</div><div className="text-xl font-bold text-stone-900">{tier.name}</div><div className="text-sm font-semibold text-red-700 mt-1">{tier.target}</div><p className="text-sm text-stone-500 leading-6 mt-3 min-h-24">{tier.desc}</p><div className="text-sm text-stone-700 mb-4"><b>{tier.count}</b> of {total} modules</div><button onClick={()=>goTo("tierLessons",{tier:tier.id})} className="w-full bg-stone-900 text-white rounded-xl py-2.5 font-semibold">Open {tier.name} path</button></Card>)}</div></div>;
}

function TierLessonList({level,tier,goTo}){
  const total=JLPT_CURRICULUM[level]?.modules.length || 0;
  const configs={beginner:{name:"Beginner",count:Math.ceil(total*.5),target:"core foundation"},intermediate:{name:"Intermediate",count:Math.ceil(total*.8),target:"exam-ready coverage"},hard:{name:"Hard",count:total,target:"complete high-score coverage"}};
  const selected=configs[tier] || configs.beginner;
  return <ExamModuleList level={level} goTo={goTo} moduleLimit={selected.count} title={`${level} ${selected.name} Path`} description={`${selected.count} modules for ${selected.target}.`} />;
}


// ---------------- Japanese reading + Character Lab ----------------
// Beginner-friendly romaji. The UI intentionally shows Japanese first and
// an English-letter reading directly underneath it so a learner never has
// to guess how to read a Japanese word.
const KANA_ROMAJI = {
  "きゃ":"kya","きゅ":"kyu","きょ":"kyo","しゃ":"sha","しゅ":"shu","しょ":"sho",
  "ちゃ":"cha","ちゅ":"chu","ちょ":"cho","にゃ":"nya","にゅ":"nyu","にょ":"nyo",
  "ひゃ":"hya","ひゅ":"hyu","ひょ":"hyo","みゃ":"mya","みゅ":"myu","みょ":"myo",
  "りゃ":"rya","りゅ":"ryu","りょ":"ryo","ぎゃ":"gya","ぎゅ":"gyu","ぎょ":"gyo",
  "じゃ":"ja","じゅ":"ju","じょ":"jo","びゃ":"bya","びゅ":"byu","びょ":"byo",
  "ぴゃ":"pya","ぴゅ":"pyu","ぴょ":"pyo","ふぁ":"fa","ふぃ":"fi","ふぇ":"fe","ふぉ":"fo",
  "うぃ":"wi","うぇ":"we","うぉ":"wo","しぇ":"she","ちぇ":"che","じぇ":"je",
  "つぁ":"tsa","つぃ":"tsi","つぇ":"tse","つぉ":"tso",
  "あ":"a","い":"i","う":"u","え":"e","お":"o","か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko",
  "さ":"sa","し":"shi","す":"su","せ":"se","そ":"so","た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to",
  "な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no","は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho",
  "ま":"ma","み":"mi","む":"mu","め":"me","も":"mo","や":"ya","ゆ":"yu","よ":"yo",
  "ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro","わ":"wa","を":"o","ん":"n",
  "が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go","ざ":"za","じ":"ji","ず":"zu","ぜ":"ze","ぞ":"zo",
  "だ":"da","ぢ":"ji","づ":"zu","で":"de","ど":"do","ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo",
  "ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po","ぁ":"a","ぃ":"i","ぅ":"u","ぇ":"e","ぉ":"o",
  "ゔ":"vu","ー":"-"
};
const KATA_TO_HIRA = {"ア":"あ","イ":"い","ウ":"う","エ":"え","オ":"お","カ":"か","キ":"き","ク":"く","ケ":"け","コ":"こ","サ":"さ","シ":"し","ス":"す","セ":"せ","ソ":"そ","タ":"た","チ":"ち","ツ":"つ","テ":"て","ト":"と","ナ":"な","ニ":"に","ヌ":"ぬ","ネ":"ね","ノ":"の","ハ":"は","ヒ":"ひ","フ":"ふ","ヘ":"へ","ホ":"ほ","マ":"ま","ミ":"み","ム":"む","メ":"め","モ":"も","ヤ":"や","ユ":"ゆ","ヨ":"よ","ラ":"ら","リ":"り","ル":"る","レ":"れ","ロ":"ろ","ワ":"わ","ヲ":"を","ン":"ん","ガ":"が","ギ":"ぎ","グ":"ぐ","ゲ":"げ","ゴ":"ご","ザ":"ざ","ジ":"じ","ズ":"ず","ゼ":"ぜ","ゾ":"ぞ","ダ":"だ","ヂ":"ぢ","ヅ":"づ","デ":"で","ド":"ど","バ":"ば","ビ":"び","ブ":"ぶ","ベ":"べ","ボ":"ぼ","パ":"ぱ","ピ":"ぴ","プ":"ぷ","ペ":"ぺ","ポ":"ぽ","ヴ":"ゔ","ャ":"ゃ","ュ":"ゅ","ョ":"ょ","ァ":"ぁ","ィ":"ぃ","ゥ":"ぅ","ェ":"ぇ","ォ":"ぉ","ッ":"っ"};
function toRomaji(input=""){
  const hira = [...input].map(ch=>KATA_TO_HIRA[ch]||ch).join("");
  let out="";
  for(let i=0;i<hira.length;i++){
    const pair=hira.slice(i,i+2);
    if(KANA_ROMAJI[pair]){ out+=KANA_ROMAJI[pair]; i++; continue; }
    const ch=hira[i];
    if(ch==="っ"){
      const next=KANA_ROMAJI[hira[i+1]]||"";
      out += next ? next[0] : "";
      continue;
    }
    if(ch==="ー"){ out+="-"; continue; }
    out += KANA_ROMAJI[ch] || ch;
  }
  return out.replace(/\s+/g," ").trim();
}
function speakJapanese(text){
  if(typeof window==="undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang="ja-JP";
  u.rate=0.82;
  window.speechSynthesis.speak(u);
}
function JapaneseReading({jp, reading, className=""}){
  const r = reading || toRomaji(jp);
  return (
    <div className={className}>
      <div lang="ja" className="jp-word">{Array.from(jp).map((char,i)=><span className={`jp-glyph jp-glyph-${i%5}`} key={`${char}-${i}`}>{char}</span>)}</div>
      {r && <div className="text-sm text-red-700 font-medium mt-0.5">🔤 {r}</div>}
      <button type="button" onClick={()=>speakJapanese(jp)} className="mt-1 inline-flex items-center gap-1 text-xs text-stone-400 hover:text-red-700">
        <Volume2 size={13}/> Listen
      </button>
    </div>
  );
}

const HIRAGANA = [
  ["あ","a","🍎","Apple"],["い","i","🐟","Fish"],["う","u","🐄","Cow"],["え","e","🖼️","Picture"],["お","o","👑","Crown"],
  ["か","ka","🦀","Crab"],["き","ki","🔑","Key"],["く","ku","🍪","Cookie"],["け","ke","🧔","Beard"],["こ","ko","🐨","Koala"],
  ["さ","sa","🌂","Umbrella"],["し","shi","🦈","Shark"],["す","su","🍣","Sushi"],["せ","se","🪙","Coin"],["そ","so","🧹","Broom"],
  ["た","ta","🐙","Octopus"],["ち","chi","🧀","Cheese"],["つ","tsu","🌙","Moon"],["て","te","✋","Hand"],["と","to","🚪","Door"],
  ["な","na","🍌","Banana"],["に","ni","🌈","Rainbow"],["ぬ","nu","🧵","Thread"],["ね","ne","🐱","Cat"],["の","no","📝","Note"],
  ["は","ha","🌿","Leaf"],["ひ","hi","🔥","Fire"],["ふ","fu","🎈","Balloon"],["へ","he","⛰️","Mountain"],["ほ","ho","⭐","Star"],
  ["ま","ma","🦙","Llama"],["み","mi","🌊","Wave"],["む","mu","🐛","Worm"],["め","me","👁️","Eye"],["も","mo","🍑","Peach"],
  ["や","ya","🏹","Bow"],["ゆ","yu","♨️","Hot spring"],["よ","yo","🪁","Kite"],
  ["ら","ra","🚗","Car"],["り","ri","🎀","Ribbon"],["る","ru","🔄","Loop"],["れ","re","🪷","Flower"],["ろ","ro","🤖","Robot"],
  ["わ","wa","🐊","Crocodile"],["を","o","🎯","Object marker"],["ん","n","👃","Nose"]
];
const KATAKANA = [
  ["ア","a","Apple"],["イ","i","Ice"],["ウ","u","Woo"],["エ","e","Energy"],["オ","o","O"],
  ["カ","ka","Car"],["キ","ki","Key"],["ク","ku","Cool"],["ケ","ke","Keg"],["コ","ko","Coffee"],
  ["サ","sa","Sun"],["シ","shi","Ship"],["ス","su","Ski"],["セ","se","Set"],["ソ","so","Sock"],
  ["タ","ta","Taco"],["チ","chi","Cheese"],["ツ","tsu","Tsunami"],["テ","te","Tennis"],["ト","to","Toast"],
  ["ナ","na","Navy"],["ニ","ni","Knee"],["ヌ","nu","Noodle"],["ネ","ne","Net"],["ノ","no","Note"],
  ["ハ","ha","Hat"],["ヒ","hi","He"],["フ","fu","Food"],["ヘ","he","Head"],["ホ","ho","Home"],
  ["マ","ma","Map"],["ミ","mi","Me"],["ム","mu","Moon"],["メ","me","Men"],["モ","mo","More"],
  ["ヤ","ya","Yacht"],["ユ","yu","You"],["ヨ","yo","Yo"],
  ["ラ","ra","Run"],["リ","ri","Ring"],["ル","ru","Rule"],["レ","re","Red"],["ロ","ro","Road"],
  ["ワ","wa","Water"],["ヲ","o","Object marker"],["ン","n","N"]
];
const BASIC_KANJI = [
  ["日","にち / hi","nichi / hi","sun · day","☀️"],["月","げつ / tsuki","getsu / tsuki","moon · month","🌙"],
  ["火","か / hi","ka / hi","fire","🔥"],["水","すい / mizu","sui / mizu","water","💧"],
  ["木","もく / ki","moku / ki","tree","🌳"],["金","きん / kane","kin / kane","gold · money","💰"],
  ["土","ど / tsuchi","do / tsuchi","earth · soil","🌱"],["山","さん / yama","san / yama","mountain","⛰️"],
  ["川","せん / kawa","sen / kawa","river","🌊"],["人","じん / hito","jin / hito","person","🧑"],
  ["大","だい / おおきい","dai / ookii","big","🐘"],["小","しょう / ちいさい","shou / chiisai","small","🐭"],
  ["上","じょう / うえ","jou / ue","up · above","⬆️"],["下","か / した","ka / shita","down · below","⬇️"],
  ["中","ちゅう / なか","chuu / naka","middle · inside","🎯"],["学","がく / まなぶ","gaku / manabu","study","📚"],
  ["生","せい / いきる","sei / ikiru","life · live","🌱"],["先","せん / さき","sen / saki","ahead · previous","➡️"],
  ["年","ねん / とし","nen / toshi","year","📅"],["時","じ / とき","ji / toki","time · hour","⏰"]
];

// Visual mnemonics supplied for the character lab. Each card links shape → object → sound.
const HIRAGANA_MNEMONICS = {
  "\u3042":["Apple","Draw the character as the stem and curve of an apple."], "\u3044":["Two people","Use the two strokes as two people standing together."], "\u3046":["U-shaped smile","Turn the curve into a smiling mouth."], "\u3048":["Elevator","Use the vertical lines as a small elevator."], "\u304a":["Octopus","Let the lower strokes become octopus tentacles."],
  "\u304b":["Kite","Draw a kite around the crossing lines."], "\u304d":["Key","Use the strokes as the head, shaft and teeth of a key."], "\u304f":["Bird beak","Use the sharp curve as an open bird beak."], "\u3051":["Keg","Build a barrel/keg around the upright strokes."], "\u3053":["Two corners","See the two horizontal corner lines."],
  "\u3055":["Samurai sword","Extend the long stroke into a samurai sword."], "\u3057":["Fishing hook","Curl the line into a fishing hook."], "\u3059":["Swing","Make the loop and line into a playground swing."], "\u305b":["Sail","Turn the upright shape into a sailboat sail."], "\u305d":["Sewing needle","Make the thin stroke a sewing needle and thread."],
  "\u305f":["Table","Use the top stroke as a small table top."], "\u3061":["Cheese","Draw a cheese wedge around the crossing stroke."], "\u3064":["Wave","Use the curved line as a sea wave."], "\u3066":["Tea cup","Make the curve a teacup handle."], "\u3068":["Toe","Turn the small mark into a toe on a foot."],
  "\u306a":["Nail","Use the long upright line as a hammer nail."], "\u306b":["Knee","Shape the two lines like a bent knee."], "\u306c":["Noodle","Let the loop become a noodle bowl and strand."], "\u306d":["Net","Draw a net around the looping line."], "\u306e":["Noose","Use the loop as a hanging rope noose."],
  "\u306f":["Hat","Put a hat brim around the top strokes."], "\u3072":["Heels","Use the curve as the heel of a shoe."], "\u3075":["Mount Fuji","Turn the wide shape into Mount Fuji."], "\u3078":["Hill","The angled line is a hill."], "\u307b":["Hoe","Use the upright strokes to make a garden hoe."],
  "\u307e":["Mask","Frame the shape as a theatrical mask."], "\u307f":["Measuring ruler","Make the strokes into ruler marks."], "\u3080":["Cow","Use the rounded form as a cow saying moo."], "\u3081":["Eye","Circle the crossing lines as an eye."], "\u3082":["Moustache","Let the bottom curve become a moustache."],
  "\u3084":["Yacht","Draw a yacht sail along the long line."], "\u3086":["U-shaped bowl","Use the lower curve as a bowl."], "\u3088":["Yo-yo","Turn the two circles/loops into a yo-yo."], "\u3089":["Rabbit","Use the upper marks as rabbit ears."], "\u308a":["Reed","Turn the two marks into reeds."],
  "\u308b":["Rope loop","Use the circular form as a rope loop."], "\u308c":["Ribbon","Tie the character into a ribbon bow."], "\u308d":["Road","Make the long curve a road."], "\u308f":["Wagon","Use the curve as a wagon body."], "\u3092":["Walking person","Turn the lines into a walking person."], "\u3093":["String noodle","Use the final curve as a long noodle/string."]
};

function WritingPad({character}){
  const canvasRef=useRef(null);
  const drawing=useRef(false);
  useEffect(()=>{
    const c=canvasRef.current; if(!c) return;
    const ctx=c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    ctx.strokeStyle="#292524"; ctx.lineWidth=7; ctx.lineCap="round"; ctx.lineJoin="round";
    ctx.setLineDash([]);
  },[character]);
  function pos(e){
    const c=canvasRef.current, r=c.getBoundingClientRect();
    const x=(e.clientX-r.left)*c.width/r.width, y=(e.clientY-r.top)*c.height/r.height;
    return [x,y];
  }
  function down(e){ e.currentTarget.setPointerCapture?.(e.pointerId); drawing.current=true; const [x,y]=pos(e); const ctx=canvasRef.current.getContext("2d"); ctx.beginPath(); ctx.moveTo(x,y); }
  function move(e){ if(!drawing.current) return; const [x,y]=pos(e); const ctx=canvasRef.current.getContext("2d"); ctx.lineTo(x,y); ctx.stroke(); }
  function up(){ drawing.current=false; }
  function clear(){ const c=canvasRef.current; c.getContext("2d").clearRect(0,0,c.width,c.height); }
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div><div className="font-semibold">✍️ Writing practice</div><div className="text-xs text-stone-400">Trace / write <b>{character}</b> from memory</div></div>
        <button onClick={clear} className="p-2 rounded-lg border border-stone-200"><RotateCcw size={16}/></button>
      </div>
      <div className="relative max-w-sm mx-auto">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none opacity-30"><div className="border-r border-stone-300 border-dashed"/><div/><div className="border-t border-stone-300 border-dashed col-span-2"/></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-8xl trace-character">{character}</div>
        <canvas ref={canvasRef} width="360" height="360" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} className="w-full aspect-square border border-stone-200 rounded-2xl bg-white touch-none relative"/>
      </div>
      <p className="text-xs text-stone-400 mt-3 text-center">Follow the glowing character, trace it once, then clear and draw it from memory.</p>
    </Card>
  );
}

function ShapeMnemonic({character, romaji, meaning, mnemonic}){
  const isKey = character === "\u304d" || character === "\u30ad";
  const isBirdBeak = character === "\u304f" || character === "\u30af";
  const isMoustache = character === "\u3082" || character === "\u30e2";
  const isHook = character === "\u3057" || character === "\u30b7";
  if(isKey) return <div className="shape-mnemonic">
    <div className="shape-caption"><b>{character} · {romaji}</b> — build it like a <b>key</b></div>
    <svg className="key-sketch" viewBox="0 0 340 150" role="img" aria-label={`${character} drawn as a key`}>
      <circle className="key-line key-ring" cx="70" cy="73" r="39"/>
      <path className="key-line key-hole" d="M70 54v38M51 73h38"/>
      <path className="key-line key-stem" d="M110 73H258"/>
      <path className="key-line key-tooth-one" d="M208 73v30h18"/>
      <path className="key-line key-tooth-two" d="M244 73v18h22"/>
      <text x="70" y="86" textAnchor="middle" className="key-character">{character}</text>
    </svg>
    <div className="shape-steps"><span>1</span> round key head <span>2</span> long stem <span>3</span> two teeth — say “ki, key”</div>
  </div>;
  if(isBirdBeak) return <div className="shape-mnemonic">
    <div className="shape-caption"><b>{character} · {romaji}</b> — the character is the bird’s <b>beak</b></div>
    <svg className="bird-sketch" viewBox="0 0 340 150" role="img" aria-label={`${character} drawn into a bird beak`}>
      <path className="bird-line bird-head" d="M80 111C53 87 52 48 82 28c39-26 97-8 111 34 8 26-4 55-28 72-25 18-61 14-85-3Z"/>
      <circle className="bird-line bird-eye" cx="123" cy="63" r="5"/>
      <path className="bird-line bird-wing" d="M92 103c17-31 54-38 80-15-18 2-32 15-38 31"/>
      <path className="bird-line bird-beak-top" d="M171 66l91-20-69 44"/>
      <path className="bird-line bird-beak-bottom" d="M171 90l69 0-69-24"/>
      <text x="193" y="86" textAnchor="middle" className="bird-character">{character}</text>
    </svg>
    <div className="shape-steps"><span>1</span> draw bird head <span>2</span> the sharp <b>{character}</b> shape makes the beak <span>3</span> say “ku”</div>
  </div>;
  if(isMoustache) return <div className="shape-mnemonic">
    <div className="shape-caption"><b>{character} · {romaji}</b> — draw a <b>moustache</b>, then reveal <b>mo</b></div>
    <svg className="moustache-sketch" viewBox="0 0 340 150" role="img" aria-label={`${character} revealed from a moustache drawing`}>
      <path className="moustache-line moustache-left" d="M169 80c-22-25-48-34-76-19 10 4 13 15 7 26-6 12-22 15-34 9 12 28 50 31 75 12 13-10 21-20 28-28Z"/>
      <path className="moustache-line moustache-right" d="M171 80c22-25 48-34 76-19-10 4-13 15-7 26 6 12 22 15 34 9-12 28-50 31-75 12-13-10-21-20-28-28Z"/>
      <path className="moustache-line moustache-join" d="M151 76c9-7 29-7 38 0"/>
      <text x="170" y="92" textAnchor="middle" className="moustache-character">{character}</text>
    </svg>
    <div className="shape-steps"><span>1</span> draw left moustache curl <span>2</span> draw right curl <span>3</span> the middle reveals <b>{character}</b> — “mo”</div>
  </div>;
  if(isHook) return <div className="shape-mnemonic"><div className="shape-caption"><b>{character} · {romaji}</b> — a fishing <b>hook</b> straightens into the character</div><svg className="hook-sketch" viewBox="0 0 340 150"><path className="hook-line" d="M168 23v66c0 30-22 40-42 26-20-14-7-48 16-37"/><path className="hook-line hook-thread" d="M168 23c0-12 11-16 22-16"/><text x="168" y="115" textAnchor="middle" className="hook-character">{character}</text></svg><div className="shape-steps"><span>1</span> draw fishing line <span>2</span> curl the hook <span>3</span> the hook line reveals <b>{character}</b> — “shi”</div></div>;
  const [object, drawingTip] = mnemonic || ["shape story", "Draw an object around the character strokes."];
  return <div className="shape-mnemonic">
    <div className="shape-caption"><b>{character} · {romaji}</b> — see it as a <b>{object}</b></div>
    <svg className="generic-shape-svg" viewBox="0 0 240 150" role="img" aria-label={`${character} animated outline drawing`}>
      <text x="120" y="108" textAnchor="middle" className="character-outline">{character}</text>
      <text x="120" y="108" textAnchor="middle" className="character-fill">{character}</text>
    </svg>
    <div className="mnemonic-instruction">{drawingTip}</div>
    <div className="shape-steps"><span>1</span> watch the outline draw <span>2</span> say “{romaji}” <span>3</span> trace it, then draw from memory</div>
  </div>;
}

function CharacterLab({ onGainXP }){
  return <CharacterLabEngine onGainXP={onGainXP} />;
}


// ---------------- AI Tutor (every module, every JLPT level) ----------------
function AITutor({level="N5", module="Learning", lesson=null, compact=false}){
  const [open,setOpen]=useState(!compact); const [speaking,setSpeaking]=useState(false); const [question,setQuestion]=useState(""); const [answer,setAnswer]=useState("");
  const tips={Characters:"See the character, say its romaji, hear it, then write it from memory.",Hiragana:"Learn one row at a time. Connect each shape directly to its sound.",Katakana:"Use loanwords and visual associations, then read and write each character.",Kanji:"Remember kanji with meaning + reading + a visual story, not shape alone.",Vocabulary:"Hear the word, say the romaji, recall the meaning, and use it in a sentence.",Grammar:"Learn the pattern, formation, meaning, and one example. Then make your own sentence.",Listening:"Listen once without reading, again with transcript, then repeat aloud.",Speaking:"Copy the tutor's rhythm and repeat until your pronunciation is clear.",Writing:"Follow stroke order, trace once, then write from memory.",Spelling:"Look at Japanese, say it, type the romaji, and check every syllable.","Quick Revision":"Recall without looking first, then check. Active recall is faster than rereading.",Quiz:"Think before answering. Review every mistake and retry it later.","Mock Exam":"Manage time like the real exam. Finish first, then review weak areas.","Level Review":"Use the master notes to recall the whole level before attempting the mock exam."};
  const tip=tips[module]||`Your ${level} AI tutor will guide you through ${module} step by step.`;
  function speak(text=tip){if(typeof window==="undefined"||!window.speechSynthesis)return; window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="en-US"; u.rate=.9; u.onstart=()=>setSpeaking(true); u.onend=()=>setSpeaking(false); window.speechSynthesis.speak(u);}
  function ask(){const q=question.toLowerCase(); let a=tip; if(q.includes("pronoun")||q.includes("read"))a="Listen to the Japanese first, then read the red romaji slowly and repeat it three times."; else if(q.includes("remember")||q.includes("memor"))a="Use See → Hear → Say → Write. Close your eyes and recall it after 30 seconds."; else if(q.includes("grammar"))a="Identify the pattern, formation, meaning and example, then create one personal sentence."; else if(q.includes("exam")||q.includes("test"))a=`For ${level}, finish each lesson revision before the mock. Keep a mistake list and retry weak questions.`; setAnswer(a); speak(a);}
  return <Card className={`border-red-200 bg-gradient-to-br from-red-50 via-white to-amber-50 ${compact?"p-3":"p-5"}`}>
    <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><div className="w-9 h-9 rounded-full bg-red-700 text-white flex items-center justify-center">🤖</div><div><div className="font-bold text-stone-900">AI Tutor · {level}</div><div className="text-xs text-stone-500">{module} coach · voice + guidance</div></div></div><button onClick={()=>setOpen(v=>!v)} className="text-xs border border-stone-200 bg-white rounded-lg px-3 py-1.5">{open?"Hide":"Ask tutor"}</button></div>
    {open&&<div className="mt-4 space-y-3"><div className="bg-white rounded-xl border border-stone-200 p-3 text-sm text-stone-700"><b>Tutor tip:</b> {tip}</div><button onClick={()=>speak()} className="inline-flex items-center gap-2 bg-stone-900 text-white rounded-xl px-3 py-2 text-sm">{speaking?<Pause size={14}/>:<Volume2 size={14}/>} Voice tutor</button>{lesson&&<div className="text-xs text-stone-500">Lesson: {lesson.en}</div>}<div className="flex gap-2"><input value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask: How do I remember this?" className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm bg-white"/><button onClick={ask} className="bg-red-700 text-white rounded-xl px-4 py-2 text-sm">Ask</button></div>{answer&&<div className="bg-white border border-red-100 rounded-xl p-3 text-sm text-stone-700"><b>AI Tutor:</b> {answer}</div>}</div>}
  </Card>;
}

// ---------------- Voice Tutor + step-by-step learning flow ----------------
// The tutor teaches one small item at a time. Learners can hear Japanese,
// see the English-letter reading, repeat it, and optionally use browser
// speech recognition to check their spoken answer.
function VoiceTutor({items=[], title="Voice Tutor", intro="Listen → repeat → understand → practice"}){
  const [step,setStep]=useState(0);
  const [slow,setSlow]=useState(false);
  const [heard,setHeard]=useState(false);
  const [speaking,setSpeaking]=useState(false);
  const [recognized,setRecognized]=useState("");
  const item=items[step] || {};
  const jp=item.jp || item.t || "";
  const reading=item.r || item.reading || toRomaji(jp);
  const meaning=item.en || item.meaning || "";
  const ta=item.ta || "";
  function speak(){
    if(!jp || typeof window==="undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(jp);
    u.lang="ja-JP"; u.rate=slow ? 0.55 : 0.82;
    u.onstart=()=>setSpeaking(true); u.onend=()=>setSpeaking(false);
    window.speechSynthesis.speak(u); setHeard(true);
  }
  function repeat(){
    if(typeof window==="undefined") return;
    const SR=window.SpeechRecognition || window.webkitSpeechRecognition;
    if(!SR){ setRecognized("Speech recognition is not available in this browser."); return; }
    const rec=new SR(); rec.lang="ja-JP"; rec.interimResults=false; rec.maxAlternatives=3;
    rec.onresult=e=>setRecognized(e.results[0][0].transcript);
    rec.onerror=()=>setRecognized("Try again — tap the microphone and speak clearly.");
    rec.start();
  }
  function next(){setRecognized("");setHeard(false);setStep(s=>Math.min(s+1,Math.max(items.length-1,0)));}
  return (
    <Card className="p-5 border-red-100 bg-gradient-to-br from-red-50 to-white">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-red-700">🎓 {title}</div>
          <div className="font-semibold text-stone-900 mt-1">{intro}</div>
        </div>
        <div className="text-xs text-stone-400">{items.length ? `${step+1} / ${items.length}` : ""}</div>
      </div>
      {items.length>0 && (
        <>
          <div className="rounded-2xl bg-white border border-stone-200 p-5 text-center">
            <div className="text-5xl font-bold text-stone-900" lang="ja">{jp}</div>
            <div className="text-xl font-semibold text-red-700 mt-2">🔤 {reading}</div>
            <div className="text-stone-700 mt-2">{meaning}</div>
            {ta && <div className="text-sm text-red-700/70 mt-1" lang="ta">{ta}</div>}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button onClick={speak} className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2.5 rounded-xl">
                {speaking ? <Pause size={16}/> : <Volume2 size={16}/>} {slow ? "Listen slowly" : "Listen"}
              </button>
              <button onClick={()=>setSlow(v=>!v)} className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm">
                🐢 {slow ? "Slow ON" : "Slow mode"}
              </button>
              <button onClick={repeat} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-700">
                🎙️ Repeat
              </button>
            </div>
            {heard && <div className="text-xs text-green-700 mt-3">✓ You listened. Now say <b>{reading}</b> aloud.</div>}
            {recognized && <div className="mt-3 text-sm bg-stone-50 rounded-xl p-3"><b>You said:</b> {recognized}</div>}
          </div>
          <div className="flex justify-between mt-4">
            <button disabled={step===0} onClick={()=>{setRecognized("");setStep(s=>Math.max(0,s-1))}} className="px-4 py-2 rounded-xl border border-stone-200 disabled:opacity-30">← Previous</button>
            <button onClick={next} disabled={step>=items.length-1} className="px-4 py-2 rounded-xl bg-red-700 text-white disabled:opacity-30">Next teaching point →</button>
          </div>
        </>
      )}
    </Card>
  );
}

function SpellingPractice({items=[]}){
  const [idx,setIdx]=useState(0);
  const [answer,setAnswer]=useState("");
  const [checked,setChecked]=useState(false);
  const item=items[idx]||{};
  const expected=(item.r||toRomaji(item.jp||"")).toLowerCase().replace(/\s+/g,"");
  const ok=answer.toLowerCase().replace(/\s+/g,"")===expected;
  function next(){setIdx(i=>(i+1)%Math.max(items.length,1));setAnswer("");setChecked(false);}
  return (
    <Card className="p-5">
      <div className="text-xs uppercase tracking-widest text-red-700 font-semibold">🔤 Spell it</div>
      <div className="font-semibold mt-1 mb-4">See the Japanese. Type the English-letter pronunciation.</div>
      <div className="text-center py-4">
        <div className="text-6xl font-bold" lang="ja">{item.jp}</div>
        <button onClick={()=>speakJapanese(item.jp)} className="mt-2 text-sm text-red-700 inline-flex items-center gap-1"><Volume2 size={14}/> Hear</button>
      </div>
      <input value={answer} onChange={e=>{setAnswer(e.target.value);setChecked(false)}} placeholder="Type romaji, e.g. kore" className="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-red-500"/>
      {checked && <div className={`mt-3 p-3 rounded-xl ${ok?"bg-green-50 text-green-700":"bg-red-50 text-red-700"}`}>{ok ? "✓ Correct!" : <>Not yet. Correct spelling: <b>{expected}</b></>}</div>}
      <div className="flex gap-2 mt-4">
        <button onClick={()=>setChecked(true)} className="bg-stone-900 text-white px-4 py-2.5 rounded-xl">Check spelling</button>
        <button onClick={next} className="border border-stone-200 px-4 py-2.5 rounded-xl">Next</button>
      </div>
    </Card>
  );
}

function ListeningPractice({items=[]}){
  const [idx,setIdx]=useState(0);
  const [show,setShow]=useState(false);
  const item=items[idx]||{};
  return (
    <Card className="p-5">
      <div className="text-xs uppercase tracking-widest text-red-700 font-semibold">🎧 Listening</div>
      <div className="font-semibold mt-1 mb-4">Listen first. Do not read. Then reveal the answer.</div>
      <div className="rounded-2xl bg-stone-50 p-5 text-center">
        <div className="text-sm text-stone-500 mb-3">{item.context || "Lesson listening"}</div>
        <button onClick={()=>speakJapanese(item.jp)} className="mx-auto inline-flex items-center gap-2 bg-red-700 text-white px-5 py-3 rounded-xl"><Volume2 size={18}/> Play Japanese</button>
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={()=>{const u=new SpeechSynthesisUtterance(item.jp);u.lang="ja-JP";u.rate=0.55;window.speechSynthesis.speak(u)}} className="px-3 py-2 rounded-lg border border-stone-200 text-sm">🐢 Slow</button>
          <button onClick={()=>setShow(v=>!v)} className="px-3 py-2 rounded-lg border border-stone-200 text-sm">{show?"Hide transcript":"Reveal transcript"}</button>
        </div>
        {show && <div className="mt-4 text-left bg-white rounded-xl p-4 border border-stone-200">
          <JapaneseReading jp={item.jp} reading={item.r}/>
          <div className="text-sm text-stone-600 mt-2">{item.en}</div>
          {item.ta && <div className="text-sm text-red-700/70" lang="ta">{item.ta}</div>}
        </div>}
      </div>
      <button onClick={()=>{setIdx(i=>(i+1)%Math.max(items.length,1));setShow(false)}} className="mt-4 w-full border border-stone-200 rounded-xl py-2.5">Next listening →</button>
    </Card>
  );
}


// ---------------- Quick Revision / Level Notes ----------------
function QuickRevision({lesson, compact=false}){
  const grammar = lesson.grammar || [];
  const vocab = lesson.vocab || [];
  return (
    <Card className={`${compact ? "p-4" : "p-6"} bg-amber-50/60 border-amber-200`}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-700 font-semibold">Quick Revision · すぐ復習</div>
          <h3 className="font-bold text-stone-900 mt-1">Lesson {lesson.id} — 2 minute review</h3>
        </div>
        <button onClick={()=>speakJapanese(`${lesson.jp}。${vocab.slice(0,3).map(v=>v.jp).join("。")}。${grammar.slice(0,1).map(g=>g.t).join("。")}`)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 text-white px-3 py-2 text-xs">
          <Volume2 size={14}/> Listen
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-white p-3 border border-amber-100">
          <div className="text-xs text-stone-400 mb-2">🔤 Key words</div>
          {vocab.slice(0,5).map((v,i)=><div key={i} className="text-sm mb-2 last:mb-0">
            <span lang="ja" className="font-semibold">{v.jp}</span>
            <span className="text-red-700 ml-2">{v.r || toRomaji(v.jp)}</span>
            <div className="text-stone-500">{v.en}</div>
          </div>)}
        </div>
        <div className="rounded-xl bg-white p-3 border border-amber-100">
          <div className="text-xs text-stone-400 mb-2">🧩 Grammar</div>
          {grammar.slice(0,3).map((g,i)=><div key={i} className="mb-3 last:mb-0">
            <div className="font-semibold text-sm" lang="ja">{g.t}</div>
            <div className="text-xs text-red-700">{g.en}</div>
            <div className="text-xs text-stone-500 mt-1">{g.form}</div>
          </div>)}
        </div>
        <div className="rounded-xl bg-white p-3 border border-amber-100">
          <div className="text-xs text-stone-400 mb-2">🎯 Remember</div>
          <div className="text-sm text-stone-700 mb-2"><b>Say:</b> {toRomaji(lesson.jp)}</div>
          <div className="text-sm text-stone-700 mb-2"><b>Meaning:</b> {lesson.en}</div>
          <div className="text-sm text-stone-700"><b>Do:</b> Hear → Read → Say → Write → Quiz</div>
        </div>
      </div>
    </Card>
  );
}

function LevelCompletionNotes({level="N5", lessons, progress, goTo}){
  const done = lessons.filter(l=>progress.completedLessons[l.id]);
  const vocab = lessons.flatMap(l=>l.vocab || []);
  const grammar = lessons.flatMap(l=>l.grammar || []);
  const pct = Math.round((done.length/Math.max(lessons.length,1))*100);
  return (
    <div className="space-y-5 pb-24 md:pb-6">
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-7 md:p-10">
        <div className="text-red-400 text-xs tracking-[0.25em] uppercase">Level Complete</div>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">🎉 JLPT {level} Complete</h2>
        <p className="text-stone-300 mt-2">Your full short-notes revision sheet is ready. Use this before practice tests and mock exams.</p>
        <div className="mt-5"><ProgressBar pct={pct} colorClass="bg-red-500"/></div>
        <div className="text-sm text-stone-400 mt-2">{done.length} / {lessons.length} lessons completed</div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-red-700 font-semibold">Full Short Notes</div>
            <h3 className="text-xl font-bold text-stone-900">JLPT {level} — Last-minute revision</h3>
          </div>
          <button onClick={()=>speakJapanese(`JLPT ${level}。${grammar.slice(0,8).map(g=>g.t).join("。")}`)}
            className="inline-flex items-center gap-2 border border-stone-300 rounded-xl px-3 py-2 text-sm"><Volume2 size={15}/> Listen notes</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-stone-50 p-4">
            <h4 className="font-semibold mb-3">🔤 Vocabulary — remember the core words</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vocab.slice(0,60).map((v,i)=><div key={i} className="bg-white rounded-lg p-2 border border-stone-100">
                <div><span lang="ja" className="font-semibold">{v.jp}</span> <span className="text-red-700 text-xs">{v.r || toRomaji(v.jp)}</span></div>
                <div className="text-xs text-stone-500">{v.en}</div>
              </div>)}
            </div>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <h4 className="font-semibold mb-3">🧩 Grammar — patterns at a glance</h4>
            <div className="space-y-3">
              {grammar.slice(0,80).map((g,i)=><div key={i} className="bg-white rounded-lg p-3 border border-stone-100">
                <div className="font-semibold text-sm" lang="ja">{g.t}</div>
                <div className="text-xs text-red-700 mt-0.5">{g.en}</div>
                <div className="text-xs text-stone-500 mt-1"><b>Pattern:</b> {g.form}</div>
                {g.ex && <div className="text-xs mt-1"><span lang="ja">{g.ex.jp}</span> <span className="text-stone-500">— {g.ex.en}</span></div>}
              </div>)}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-lg mb-3">🧠 Final revision flow</h3>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            ["1","Kana","Read Hiragana + Katakana"],
            ["2","Kanji","Read N5 kanji + meanings"],
            ["3","Grammar","Recall patterns + examples"],
            ["4","Practice","Listening → spelling → mock exam"]
          ].map(([n,t,d])=><div key={n} className="rounded-xl bg-stone-50 p-4">
            <div className="text-red-700 font-bold">{n}. {t}</div><div className="text-sm text-stone-600 mt-1">{d}</div>
          </div>)}
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <button onClick={()=>goTo("mock")} className="bg-red-700 text-white rounded-xl px-5 py-2.5">Take N5 Mock Exam →</button>
        <button onClick={()=>goTo("characters")} className="border border-stone-300 rounded-xl px-5 py-2.5">Revise Characters</button>
        <button onClick={()=>goTo("lessons")} className="border border-stone-300 rounded-xl px-5 py-2.5">Review Lessons</button>
      </div>
    </div>
  );
}

function LessonFlow({lesson, onComplete, goTo, isLastLesson=false}){
  const [stage,setStage]=useState(0);
  const [quizIdx,setQuizIdx]=useState(0);
  const [selected,setSelected]=useState(null);
  const [score,setScore]=useState(0);
  const [finished,setFinished]=useState(false);
  const stages=["Teach","Vocabulary","Grammar","Listening","Spell","Quick Review","Quiz"];
  const teachItems=[
    {jp:lesson.jp,r:toRomaji(lesson.jp),en:lesson.en,ta:lesson.ta},
    ...lesson.vocab.slice(0,2)
  ];
  const listening=lesson.vocab.slice(0,4).map(v=>({jp:v.jp,r:v.r,en:v.en,ta:v.ta,context:`Lesson ${lesson.id}: listen and understand`}));
  const q=lesson.quiz[quizIdx];
  const qSpeech=(q?.q||"").match(/[ぁ-んァ-ン一-龯ー々「」]+/g)?.join(" ") || q?.options?.[0] || "";
  function answer(opt){if(selected) return;setSelected(opt);if(opt===q.answer)setScore(s=>s+1);}
  function nextQ(){
    if(quizIdx+1<lesson.quiz.length){setQuizIdx(i=>i+1);setSelected(null);}
    else {setFinished(true); const finalScore=score+(selected===q.answer?1:0); onComplete(lesson.id,finalScore,lesson.quiz.length);}
  }
  useEffect(()=>{setStage(0);setQuizIdx(0);setSelected(null);setScore(0);setFinished(false)},[lesson.id]);
  return (
    <div className="space-y-5 pb-24 md:pb-6">
      <button onClick={()=>goTo("lessons")} className="flex items-center gap-1 text-sm text-stone-500"><ChevronLeft size={16}/> All lessons</button>
      <div>
        <div className="text-xs text-stone-400">Lesson {lesson.id} / 25 · Learn inch by inch</div>
        <h2 className="text-2xl font-bold text-stone-900 mt-1">{lesson.en}</h2>
        <JapaneseReading jp={lesson.jp} className="mt-2"/>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-stone-100 rounded-xl p-1">
        {stages.map((s,i)=><button key={s} onClick={()=>setStage(i)} className={`px-2 py-2 rounded-lg text-xs sm:text-sm ${stage===i?"bg-white shadow-sm text-stone-900":"text-stone-500"}`}>{i+1}. {s}</button>)}
      </div>
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden"><div className="h-full bg-red-700 transition-all" style={{width:`${((stage+1)/stages.length)*100}%`}}/></div>
        <span>{stage+1}/{stages.length}</span>
      </div>

      {stage===0 && <VoiceTutor items={teachItems} title={`Teacher mode · Lesson ${lesson.id}`} intro="Listen to the teacher one small sentence/word at a time. Hear → read → repeat → understand."/>}
      {stage===1 && <div className="space-y-4"><VoiceTutor items={lesson.vocab} title="Vocabulary tutor" intro="Learn every word with Japanese, romaji, meaning and voice."/><SpellingPractice items={lesson.vocab}/></div>}
      {stage===2 && <div className="space-y-4">
        {lesson.grammar.map((g,i)=><Card key={i} className="p-5">
          <div className="text-xs uppercase tracking-widest text-red-700 font-semibold">Grammar point {i+1}</div>
          <JapaneseReading jp={g.t} className="mt-2"/>
          <div className="text-stone-700 mt-2">{g.en}</div>
          <div className="text-sm text-red-700/70 mt-1" lang="ta">{g.ta}</div>
          <div className="mt-3 bg-stone-50 rounded-xl p-3"><b>Pattern:</b> {g.form}</div>
          <div className="mt-3"><JapaneseReading jp={g.ex.jp}/><div className="text-sm text-stone-600 mt-1">{g.ex.en}</div></div>
          <button onClick={()=>speakJapanese(`${g.t}。${g.ex.jp}`)} className="mt-3 inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl"><Volume2 size={15}/> Tutor explanation</button>
        </Card>)}
      </div>}
      {stage===3 && <ListeningPractice items={listening}/>}
      {stage===4 && <SpellingPractice items={[...lesson.vocab,{jp:lesson.jp,r:toRomaji(lesson.jp),en:lesson.en}]}/>}
      {stage===5 && <QuickRevision lesson={lesson}/>}
      {stage===6 && !finished && <Card className="p-6 max-w-xl">
        <div className="text-xs text-stone-400 mb-2">Question {quizIdx+1} / {lesson.quiz.length}</div>
        <div className="text-lg font-medium text-stone-900 mb-1">{q.q}</div>
        <div className="text-sm text-red-700/70 mb-4" lang="ta">{q.qta}</div>
        {q.passage && <div className="bg-stone-50 rounded-xl p-3 mb-4"><JapaneseReading jp={q.passage}/><div className="text-sm text-stone-500 mt-1">{q.passageEn}</div></div>}
        <button onClick={()=>speakJapanese(qSpeech)} className="mb-3 inline-flex items-center gap-2 text-sm text-red-700"><Volume2 size={15}/> Hear question</button>
        <div className="space-y-2">
          {q.options.map((opt,i)=>{let cls="border-stone-200";if(selected){if(opt===q.answer)cls="border-green-500 bg-green-50";else if(opt===selected)cls="border-red-400 bg-red-50"}return <button key={i} onClick={()=>answer(opt)} className={`w-full text-left border rounded-xl px-4 py-3 ${cls}`}><JapaneseReading jp={opt}/></button>})}
        </div>
        {selected && <div className="mt-4 p-3 rounded-xl bg-stone-50 text-sm">{selected===q.answer?"✓ Correct! ":"✗ Review: "}{q.explain}</div>}
        <button disabled={!selected} onClick={nextQ} className="mt-4 bg-stone-900 disabled:opacity-30 text-white px-5 py-2.5 rounded-xl">{quizIdx+1<lesson.quiz.length?"Next question":"Finish lesson quiz"}</button>
      </Card>}
      {stage===6 && finished && <Card className="p-8 max-w-xl text-center">
        <Award className="mx-auto text-red-700 mb-3" size={40}/>
        <div className="text-2xl font-bold">Lesson complete 🎉</div>
        <div className="text-stone-500 mt-1 mb-5">Quiz score: {score + (selected===q.answer?1:0)} / {lesson.quiz.length}</div>
        <div className="text-sm text-stone-500 mb-5">You completed: teaching → vocabulary → grammar → listening → spelling → quiz.</div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={()=>setStage(5)} className="border border-stone-300 rounded-xl px-5 py-2.5">Quick revision</button>
          {isLastLesson
            ? <button onClick={()=>goTo("levelComplete","N5")} className="bg-red-700 text-white rounded-xl px-5 py-2.5">View full N5 notes →</button>
            : <button onClick={()=>goTo("lesson",Math.min(lesson.id+1,25))} className="bg-red-700 text-white rounded-xl px-5 py-2.5">Next lesson →</button>}
        </div>
      </Card>}
    </div>
  );
}


// ---------------- Mistake Book ----------------
function MistakeBook({mistakes}){
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">📕 間違いノート <span className="text-stone-400 text-base font-normal">Mistake Book</span></h2>
      {mistakes.length===0 ? (
        <Card className="p-10 text-center text-stone-400">No mistakes recorded yet — take a lesson quiz or mock exam to build your review list.</Card>
      ) : (
        <div className="space-y-3">
          {mistakes.map((m,i)=>(
            <Card key={i} className="p-4">
              <div className="text-stone-900 font-medium mb-1" lang="ja">{m.q}</div>
              <div className="text-sm text-stone-500 mb-2">Your answer: <span className="text-red-600">{m.userAnswer}</span> · Correct: <span className="text-green-600">{m.answer}</span></div>
              <div className="text-xs text-stone-400">{m.explain}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------- Progress Dashboard ----------------
function ProgressDashboard({progress, lessons}){
  const completedCount = Object.keys(progress.completedLessons).length;
  const pct = Math.round((completedCount/lessons.length)*100);
  const avgScore = completedCount ? Math.round(Object.values(progress.completedLessons).reduce((a,c)=>a+(c.score/c.total),0)/completedCount*100) : 0;
  const mockBest = progress.mockAttempts.length ? Math.max(...progress.mockAttempts.map(m=>Math.round(m.score/m.total*100))) : null;

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">進捗 <span className="text-stone-400 text-base font-normal">Progress</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5"><div className="text-xs text-stone-500 mb-1">N5 Readiness</div><div className="text-2xl font-bold">{pct}%</div></Card>
        <Card className="p-5"><div className="text-xs text-stone-500 mb-1">Avg Quiz Score</div><div className="text-2xl font-bold">{avgScore}%</div></Card>
        <Card className="p-5"><div className="text-xs text-stone-500 mb-1">Streak</div><div className="text-2xl font-bold">{progress.streak}d</div></Card>
        <Card className="p-5"><div className="text-xs text-stone-500 mb-1">Best Mock Score</div><div className="text-2xl font-bold">{mockBest!==null ? mockBest+"%" : "—"}</div></Card>
      </div>
      <Card className="p-6">
        <h3 className="font-semibold text-stone-900 mb-4">Lesson-by-lesson completion</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {lessons.map(l=>{
            const done = progress.completedLessons[l.id];
            return <div key={l.id} title={`Lesson ${l.id}`} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${done ? "bg-red-700 text-white" : "bg-stone-100 text-stone-400"}`}>{l.id}</div>;
          })}
        </div>
      </Card>
      {progress.mockAttempts.length>0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-stone-900 mb-4">Mock exam history</h3>
          <div className="space-y-2">
            {progress.mockAttempts.slice().reverse().map((m,i)=>(
              <div key={i} className="flex items-center justify-between text-sm border-b border-stone-100 py-2 last:border-0">
                <span className="text-stone-500">{m.date}</span>
                <span className="font-medium text-stone-900">{m.score} / {m.total}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ---------------- Mock Exam ----------------
function buildMockExam(allQuiz, allVocab, lessons){
  // Vocabulary section (8 questions)
  const vocabQ = shuffleArr(allQuiz).slice(0,8).map(q=>({...q, section:"vocab"}));
  // Grammar + Reading section (8 questions) - pull remaining quiz + 2 constructed reading Qs
  const grammarQ = shuffleArr(allQuiz.filter(q=>!vocabQ.includes(q))).slice(0,6).map(q=>({...q, section:"grammar"}));
  const readingPassages = [
    {
      passage: "わたしは まいあさ 7じに おきます。7じはんに あさごはんを たべます。それから 8じに がっこうへ いきます。がっこうは 9じから 3じまでです。",
      passageEn: "I get up at 7 every morning. I eat breakfast at 7:30. Then I go to school at 8. School is from 9 to 3.",
      q:"がっこうは なんじから ですか。 (What time does school start?)",
      qta:"பள்ளி எத்தனை மணிக்கு தொடங்குகிறது?",
      options:["7じ","7じはん","8じ","9じ"], answer:"9じ",
      explain:"The passage states がっこうは 9じから 3じまでです (school is from 9 to 3)."
    },
    {
      passage: "きのう デパートで シャツを かいました。シャツは 3,000えんでした。たかかったですが、いい シャツですから、かいました。",
      passageEn: "Yesterday I bought a shirt at the department store. The shirt was 3,000 yen. It was expensive, but I bought it because it's a good shirt.",
      q:"シャツは いくらでしたか。 (How much was the shirt?)",
      qta:"சட்டையின் விலை என்ன?",
      options:["300えん","3,000えん","30,000えん","3えん"], answer:"3,000えん",
      explain:"シャツは 3,000えんでした = The shirt was 3,000 yen."
    },
  ];
  const readingQ = readingPassages.map((r,i)=>({q:r.q, qta:r.qta, options:r.options, answer:r.answer, explain:r.explain, passage:r.passage, passageEn:r.passageEn, section:"reading", id:"read"+i}));

  // Listening section (4 questions) - text-based simulation with transcript reveal
  const listeningQ = [
    {situation:"At a restaurant", situationJp:"レストランで", transcript:"すみません、メニューを ください。／はい、どうぞ。／わたしは カレーライスを おねがいします。",
     q:"何を たべますか。 (What will they eat?)", qta:"அவர்கள் என்ன சாப்பிடுவார்கள்?",
     options:["すし","カレーライス","ラーメン","うどん"], answer:"カレーライス",
     explain:"わたしは カレーライスを おねがいします = I'd like curry rice, please."},
    {situation:"At the station", situationJp:"えきで", transcript:"つぎの でんしゃは 何じですか。／つぎの でんしゃは 10じ15ふんです。",
     q:"つぎの でんしゃは 何じですか。 (What time is the next train?)", qta:"அடுத்த ரயில் எத்தனை மணிக்கு?",
     options:["10じ","10じ15ふん","10じ50ふん","11じ"], answer:"10じ15ふん",
     explain:"つぎの でんしゃは 10じ15ふんです = The next train is at 10:15."},
    {situation:"At home", situationJp:"いえで", transcript:"あしたは あめですから、かさを もって いって ください。",
     q:"あした 何を もって いきますか。 (What should you bring tomorrow?)", qta:"நாளை என்ன கொண்டு செல்ல வேண்டும்?",
     options:["ぼうし","かさ","くつ","かばん"], answer:"かさ",
     explain:"かさを もって いって ください = Please bring an umbrella."},
    {situation:"At school", situationJp:"がっこうで", transcript:"しゅくだいは あした じゅぎょうの まえに だして ください。",
     q:"しゅくだいは いつ だしますか。 (When should you submit the homework?)", qta:"வீட்டுப்பாடத்தை எப்போது சமர்ப்பிக்க வேண்டும்?",
     options:["きょう","あした じゅぎょうの まえに","あした じゅぎょうの あとで","らいしゅう"], answer:"あした じゅぎょうの まえに",
     explain:"あした じゅぎょうの まえに だして ください = Please submit it before tomorrow's class."},
  ].map((l,i)=>({...l, section:"listening", id:"listen"+i}));

  return { vocab: vocabQ, grammar: [...grammarQ, ...readingQ], listening: listeningQ };
}
function shuffleArr(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

const MOCK_SECTIONS = [
  {key:"vocab", label:"Language Knowledge (Vocabulary)", labelJp:"言語知識（文字・語彙）", minutes:20},
  {key:"grammar", label:"Language Knowledge (Grammar) + Reading", labelJp:"言語知識（文法）・読解", minutes:40},
  {key:"listening", label:"Listening", labelJp:"聴解", minutes:30},
];

function MockExamIntro({onStart, goTo}){
  return (
    <div className="space-y-6 max-w-2xl pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">模擬試験 <span className="text-stone-400 text-base font-normal">JLPT N5 Mock Exam</span></h2>
      <Card className="p-6">
        <p className="text-stone-600 mb-4">This simulates the official N5 section structure and timing. Questions are original practice material inspired by JLPT formats — not real JLPT questions.</p>
        <div className="space-y-2 mb-6">
          {MOCK_SECTIONS.map(s=>(
            <div key={s.key} className="flex items-center justify-between text-sm border-b border-stone-100 py-2 last:border-0">
              <span className="text-stone-700">{s.labelJp} <span className="text-stone-400">{s.label}</span></span>
              <span className="text-stone-500">{s.minutes} min</span>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-lg p-3 mb-6">
          Your final score is a <b>practice estimate</b> only and does not reproduce the official scaled JLPT score.
        </div>
        <button onClick={onStart} className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-xl">🎌 Start JLPT N5 Mock Test</button>
      </Card>
    </div>
  );
}

function Timer({seconds, onExpire}){
  const [t, setT] = useState(seconds);
  useEffect(()=>{
    if(t<=0){ onExpire(); return; }
    const id = setTimeout(()=>setT(x=>x-1),1000);
    return ()=>clearTimeout(id);
  },[t]);
  const m = Math.floor(t/60), s = t%60;
  return <span className={`font-mono ${t<60?"text-red-600":"text-stone-700"}`}>{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}</span>;
}

function MockExamRunner({exam, onFinish}){
  const sectionOrder = ["vocab","grammar","listening"];
  const [sectionIdx, setSectionIdx] = useState(0);
  const sectionKey = sectionOrder[sectionIdx];
  const questions = exam[sectionKey];
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // key: section-qindex -> {selected, correct}
  const [flagged, setFlagged] = useState({});
  const [showTranscript, setShowTranscript] = useState(false);

  const sectionMeta = MOCK_SECTIONS.find(s=>s.key===sectionKey);
  const q = questions[qIdx];
  const answerKey = `${sectionKey}-${qIdx}`;

  function selectAnswer(opt){
    setAnswers(prev=>({...prev, [answerKey]: opt}));
  }
  function nextQuestion(){
    setShowTranscript(false);
    if(qIdx+1 < questions.length) setQIdx(i=>i+1);
    else advanceSection();
  }
  function prevQuestion(){
    if(qIdx>0) setQIdx(i=>i-1);
  }
  function advanceSection(){
    if(sectionIdx+1 < sectionOrder.length){ setSectionIdx(i=>i+1); setQIdx(0); }
    else finishExam();
  }
  function finishExam(){
    let correct=0, total=0;
    const bySection = {};
    sectionOrder.forEach(sec=>{
      const qs = exam[sec];
      let c=0;
      qs.forEach((qq,i)=>{ total++; const a = answers[`${sec}-${i}`]; if(a===qq.answer){ correct++; c++; } });
      bySection[sec] = {correct:c, total: qs.length};
    });
    onFinish({score:correct, total, bySection, answers, exam});
  }

  const navStatus = (i)=>{
    if(i===qIdx) return "current";
    if(flagged[`${sectionKey}-${i}`]) return "flagged";
    if(answers[`${sectionKey}-${i}`]!==undefined) return "answered";
    return "unanswered";
  };

  return (<>
      <AITutor level={"N5"} module="Mock Exam" compact={true}/>
    <div className="fixed inset-0 bg-stone-50 z-40 overflow-y-auto">
      <div className="max-w-3xl mx-auto p-4 md:p-8 pb-32">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-bold text-stone-900">N5 MOCK EXAM</div>
            <div className="text-xs text-stone-500">{sectionMeta.labelJp} · {sectionMeta.label}</div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16}/>
            <Timer seconds={sectionMeta.minutes*60} onExpire={advanceSection} key={sectionKey}/>
          </div>
        </div>

        <Card className="p-6 mb-4">
          <div className="text-xs text-stone-400 mb-3">Question {qIdx+1} / {questions.length}</div>

          {q.passage && (
            <div className="bg-stone-50 rounded-lg p-4 mb-4">
              <JapaneseReading jp={q.passage} className="mb-1" />
              <div className="text-xs text-stone-400">{q.passageEn}</div>
            </div>
          )}
          {q.situation && (
            <div className="mb-4">
              <div className="text-xs text-stone-400 mb-1">Situation: {q.situationJp} ({q.situation})</div>
              <button onClick={()=>setShowTranscript(s=>!s)} className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl text-sm">
                <Play size={14}/> {showTranscript ? "Hide" : "Play"} Audio (transcript)
              </button>
              {showTranscript && <div className="mt-3 text-sm text-stone-700 bg-stone-50 rounded-lg p-3"><JapaneseReading jp={q.transcript}/></div>}
            </div>
          )}

          <JapaneseReading jp={q.q} className="text-lg font-medium mb-1" />
          {q.qta && <div className="text-sm text-red-700/70 mb-4" lang="ta">{q.qta}</div>}

          <div className="space-y-2">
            {q.options.map((opt,i)=>{
              const sel = answers[answerKey]===opt;
              return (
                <button key={i} onClick={()=>selectAnswer(opt)} className={`w-full text-left border rounded-xl px-4 py-3 flex items-center gap-3 ${sel ? "border-red-600 bg-red-50" : "border-stone-200 hover:border-stone-400"}`}>
                  <span className={`w-4 h-4 rounded-full border-2 shrink-0 ${sel?"border-red-600 bg-red-600":"border-stone-300"}`}/>
                  <JapaneseReading jp={opt} />
                </button>
              );
            })}
          </div>
        </Card>

        <div className="flex items-center justify-between mb-6">
          <button onClick={prevQuestion} disabled={qIdx===0} className="px-4 py-2 rounded-xl border border-stone-300 disabled:opacity-30 text-sm">Previous</button>
          <button onClick={()=>setFlagged(f=>({...f,[answerKey]:!f[answerKey]}))} className={`px-4 py-2 rounded-xl border text-sm flex items-center gap-1 ${flagged[answerKey] ? "border-amber-400 bg-amber-50 text-amber-700" : "border-stone-300"}`}>
            <Flag size={14}/> Flag
          </button>
          <button onClick={nextQuestion} className="px-4 py-2 rounded-xl bg-stone-900 text-white text-sm">
            {qIdx+1<questions.length ? "Next →" : (sectionIdx+1<sectionOrder.length ? "Next Section →" : "Submit Exam")}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {questions.map((_,i)=>{
            const st = navStatus(i);
            const cls = { current:"bg-stone-900 text-white", flagged:"bg-amber-400 text-white", answered:"bg-green-100 text-green-700", unanswered:"bg-stone-100 text-stone-400" }[st];
            return <button key={i} onClick={()=>setQIdx(i)} className={`w-8 h-8 rounded-lg text-xs font-medium ${cls}`}>{i+1}</button>;
          })}
        </div>
      </div>
    </div>
  </>);
}

function MockExamResult({result, goTo}){
  const pct = Math.round(result.score/result.total*100);
  const sectionLabels = {vocab:"Vocabulary", grammar:"Grammar + Reading", listening:"Listening"};
  return (
    <div className="space-y-6 max-w-2xl pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">JLPT N5 PRACTICE RESULT</h2>
      <Card className="p-8 text-center">
        <div className="text-5xl font-bold text-stone-900 mb-1">{result.score} / {result.total}</div>
        <div className="text-stone-500 mb-6">Practice Estimate</div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Object.entries(result.bySection).map(([k,v])=>(
            <div key={k} className="bg-stone-50 rounded-xl p-3">
              <div className="text-xs text-stone-400 mb-1">{sectionLabels[k]}</div>
              <div className="font-bold text-stone-900">{v.correct} / {v.total}</div>
            </div>
          ))}
        </div>
        <ProgressBar pct={pct}/>
        <div className="text-sm text-stone-500 mt-2">Accuracy: {pct}%</div>
      </Card>
      <div className="flex flex-wrap gap-3">
        <button onClick={()=>goTo("mock")} className="border border-stone-300 rounded-xl px-5 py-2.5 font-medium">Retake Exam</button>
        <button onClick={()=>goTo("lessons")} className="border border-stone-300 rounded-xl px-5 py-2.5 font-medium">Practice Weak Areas</button>
        <button onClick={()=>goTo("home")} className="bg-red-700 text-white rounded-xl px-5 py-2.5 font-medium">Back to Dashboard</button>
      </div>
    </div>
  );
}


// ---------------- AI Mentor Hub: daily missions + personal assistant + guided chat ----------------
const LEVEL_CONFIG = {
  N5:{title:"Foundation", color:"red", focus:"Kana, survival vocabulary, basic grammar and listening"},
  N4:{title:"Elementary", color:"orange", focus:"Everyday grammar, kanji, reading and listening"},
  N3:{title:"Intermediate", color:"amber", focus:"Longer reading, grammar nuance and conversation"},
  N2:{title:"Upper Intermediate", color:"blue", focus:"News-style reading, advanced grammar and listening"},
  N1:{title:"Advanced", color:"purple", focus:"Academic Japanese, nuance, speed and precision"}
};

function getStoredJSON(key, fallback){
  try { const raw=localStorage.getItem(key); return raw?JSON.parse(raw):fallback; } catch(e){ return fallback; }
}

function AIPersonalAssistant({level="N5", progress, goTo}){
  const [messages,setMessages]=useState(()=>getStoredJSON(`nv-chat-${level}`,[
    {role:"assistant",text:`こんにちは! I'm your personal ${level} learning assistant. I will plan your daily practice, explain mistakes and keep you moving toward the ${level} exam.`},
    {role:"assistant",text:"Today's rule: finish the assigned mission before unlocking the next challenge. Ask me anything in English, Tamil, romaji, or Japanese."}
  ]));
  const [input,setInput]=useState("");
  const [typing,setTyping]=useState(false);
  const cfg=LEVEL_CONFIG[level]||LEVEL_CONFIG.N5;

  useEffect(()=>{try{localStorage.setItem(`nv-chat-${level}`,JSON.stringify(messages.slice(-30)));}catch(e){}},[messages,level]);

  function speak(text){
    if(!window.speechSynthesis)return;
    window.speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text); u.lang="en-US"; u.rate=.9; window.speechSynthesis.speak(u);
  }
  function respond(q){
    const s=q.toLowerCase();
    if(s.includes("plan")||s.includes("today")||s.includes("task")) return `Your ${level} plan: 1) 10 minutes character/kanji recall, 2) 15 minutes vocabulary, 3) 15 minutes grammar, 4) 10 minutes listening, 5) complete today's quiz. Do not skip the revision card.`;
    if(s.includes("pronoun")||s.includes("read")) return "Use Japanese → romaji → meaning. Listen first, say the romaji aloud three times, then hide the romaji and read the Japanese.";
    if(s.includes("kanji")) return `For ${level} kanji, learn meaning + reading + one word + one visual memory. Then write it from memory and take the mini quiz.`;
    if(s.includes("grammar")) return "Find the pattern, formation, meaning and example. Then make one new sentence yourself. That sentence becomes part of your personal revision.";
    if(s.includes("exam")||s.includes("mock")) return `Before your ${level} mock exam, complete every lesson revision and retry your mistake book. Your goal is consistent accuracy, not just finishing quickly.`;
    if(s.includes("mistake")||s.includes("wrong")) return "Every mistake becomes a future task. Relearn the concept, answer a similar question, explain why the old answer was wrong, then retry tomorrow.";
    if(s.includes("tamil")) return "I can explain difficult Japanese in simple English and Tamil-style explanations while keeping the Japanese and romaji visible.";
    return `Let's solve that step by step for ${level}. Tell me the lesson, Japanese word/sentence, or question and I will explain it in simple English with romaji and a practice task.`;
  }
  function send(){
    const q=input.trim(); if(!q)return;
    setMessages(m=>[...m,{role:"user",text:q}]); setInput(""); setTyping(true);
    setTimeout(()=>{const a=respond(q); setMessages(m=>[...m,{role:"assistant",text:a}]); setTyping(false);},450);
  }

  return <Card className="overflow-hidden border-stone-200 shadow-sm">
    <div className="bg-stone-950 text-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center"><Bot size={24}/></div>
          <div><div className="font-bold">Personal AI Assistant</div><div className="text-xs text-stone-300">{level} · {cfg.title} · always-on study coach</div></div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">● Online</div>
      </div>
    </div>
    <div className="p-4 bg-stone-50 max-h-80 overflow-y-auto space-y-3">
      {messages.map((m,i)=><div key={i} className={`flex ${m.role==="user"?"justify-end": "justify-start"}`}>
        <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm ${m.role==="user"?"bg-stone-900 text-white":"bg-white border border-stone-200 text-stone-700"}`}>
          {m.text}
          {m.role==="assistant" && <button onClick={()=>speak(m.text)} className="ml-2 inline-flex align-middle text-stone-400 hover:text-red-700" title="Listen"><Volume2 size={14}/></button>}
        </div>
      </div>)}
      {typing && <div className="text-xs text-stone-400">AI is preparing your coaching response…</div>}
    </div>
    <div className="p-3 border-t border-stone-200 flex gap-2">
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask your AI tutor anything…" className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-red-500"/>
      <button onClick={send} className="w-10 h-10 rounded-xl bg-red-700 text-white flex items-center justify-center"><Send size={16}/></button>
    </div>
  </Card>;
}

function DailyMission({level="N5", progress, goTo}){
  const key=`nv-daily-${level}`;
  const today=new Date().toISOString().slice(0,10);
  const [state,setState]=useState(()=>getStoredJSON(key,{date:today,done:{}}));
  useEffect(()=>{if(state.date!==today){setState({date:today,done:{}});}},[today]);
  useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch(e){}},[key,state]);
  const tasks=[
    {id:"warmup",title:"10-minute recall",desc:"Review yesterday's vocabulary and characters.",icon:RotateCcw,action:()=>goTo("characters")},
    {id:"vocab",title:"Vocabulary sprint",desc:"Learn 10 words and listen to every pronunciation.",icon:BookOpen,action:()=>goTo("lessons")},
    {id:"grammar",title:"Grammar mission",desc:"Study one pattern and make one original sentence.",icon:Target,action:()=>goTo("lessons")},
    {id:"listen",title:"Listening drill",desc:"Listen twice, hide the transcript, then repeat.",icon:Headphones,action:()=>goTo("lessons")},
    {id:"quiz",title:"Daily checkpoint",desc:"Complete a 5-question active-recall quiz.",icon:ClipboardCheck,action:()=>goTo("lessons")}
  ];
  const doneCount=tasks.filter(t=>state.done[t.id]).length;
  function toggle(id){setState(s=>({...s,done:{...s.done,[id]:!s.done[id]}}));}
  return <Card className="p-5 border-stone-200">
    <div className="flex items-start justify-between gap-3 mb-5">
      <div><div className="flex items-center gap-2 font-bold text-stone-900"><CalendarCheck size={19} className="text-red-700"/> Today's {level} Mission</div><p className="text-xs text-stone-500 mt-1">Your AI coach assigns a focused workload each day.</p></div>
      <div className="text-sm font-bold text-red-700">{doneCount}/{tasks.length}</div>
    </div>
    <div className="space-y-2">
      {tasks.map(t=>{const Icon=t.icon, d=!!state.done[t.id]; return <div key={t.id} className={`flex items-center gap-3 p-3 rounded-xl border ${d?"bg-green-50 border-green-200":"bg-white border-stone-200"}`}>
        <button onClick={()=>toggle(t.id)} className={`w-7 h-7 rounded-lg border flex items-center justify-center ${d?"bg-green-600 border-green-600 text-white":"border-stone-300"}`}>{d?<Check size={15}/>:<Icon size={15}/>}</button>
        <div className="flex-1"><div className={`text-sm font-semibold ${d?"line-through text-stone-400":"text-stone-800"}`}>{t.title}</div><div className="text-xs text-stone-500">{t.desc}</div></div>
        {!d && <button onClick={t.action} className="text-xs font-semibold text-red-700 px-2 py-1">Open →</button>}
      </div>})}
    </div>
    {doneCount===tasks.length && <div className="mt-4 p-3 rounded-xl bg-green-100 text-green-800 text-sm font-medium">🎉 Mission complete. Your next session starts with a smarter review based on today's work.</div>}
  </Card>;
}

function AIRecruitmentStyleChat({level="N5"}){
  const [open,setOpen]=useState(false);
  const [mode,setMode]=useState("coach");
  const cards={
    coach:{title:"AI Study Coach",desc:"Explains what to study and why.",icon:Bot},
    mentor:{title:"Client / Staff Mentor",desc:"Simulates a human mentor assigning your daily work.",icon:Briefcase},
    interviewer:{title:"JLPT Interview Coach",desc:"Asks questions, evaluates answers and creates follow-up tasks.",icon:MessageCircle}
  };
  const C=cards[mode]; const Icon=C.icon;
  const prompts={coach:"What should I finish today?",mentor:"Assign my next task.",interviewer:"Start a 5-question speaking check."};
  const [chat,setChat]=useState([]);
  function launch(){setOpen(true);setChat([{role:"assistant",text:mode==="mentor"?`Welcome. I’m your ${level} mentor. I’ve reviewed your learning path. Today you will complete one core lesson, its revision, and one checkpoint quiz.`:mode==="interviewer"?`Let's begin your ${level} checkpoint. Answer aloud first, then compare with the model pronunciation.`:`Welcome back. Your ${level} AI coach is ready. Your first priority today is the assigned daily mission.`}]);}
  return <Card className="p-5 border-red-200 bg-gradient-to-br from-red-50 via-white to-amber-50">
    <div className="flex items-center gap-2 mb-3"><div className="w-10 h-10 rounded-xl bg-stone-950 text-white flex items-center justify-center"><Icon size={20}/></div><div><div className="font-bold text-stone-900">Guided AI Workspace</div><div className="text-xs text-stone-500">Click once to start an auto-guided conversation</div></div></div>
    <div className="grid sm:grid-cols-3 gap-2 mb-4">{Object.entries(cards).map(([k,v])=><button key={k} onClick={()=>setMode(k)} className={`text-left p-3 rounded-xl border ${mode===k?"border-red-400 bg-white":"border-stone-200 bg-white/70"}`}><div className="text-sm font-semibold">{v.title}</div><div className="text-[11px] text-stone-500 mt-1">{v.desc}</div></button>)}</div>
    <button onClick={launch} className="w-full bg-stone-950 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"><MessageCircle size={17}/> {prompts[mode]}</button>
    {open && <div className="mt-4 p-4 rounded-xl bg-white border border-stone-200"><div className="space-y-2 mb-3">{chat.map((m,i)=><div key={i} className="text-sm p-3 rounded-xl bg-stone-50">{m.text}</div>)}</div><button onClick={()=>setChat(c=>[...c,{role:"assistant",text:"Task assigned: complete today's mission, then return here. Your next task will unlock after completion."}])} className="text-xs font-semibold text-red-700">Assign next task →</button></div>}
  </Card>;
}

function AIMentorHub({level="N5", progress, goTo}){
  const cfg=LEVEL_CONFIG[level]||LEVEL_CONFIG.N5;
  return <div className="space-y-6 pb-24 md:pb-6">
    <div className="rounded-3xl bg-stone-950 text-white p-6 md:p-8 relative overflow-hidden">
      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-red-700/30 blur-2xl"/>
      <div className="relative">
        <div className="text-xs uppercase tracking-[.2em] text-red-300 mb-2">AI learning command center</div>
        <h1 className="text-3xl md:text-4xl font-bold">Your {level} AI Mentor</h1>
        <p className="text-stone-300 mt-2 max-w-2xl">{cfg.focus}. Your assistant turns your progress into daily tasks, revision and exam preparation.</p>
        <div className="flex flex-wrap gap-2 mt-5"><span className="px-3 py-1.5 rounded-full bg-white/10 text-xs">Daily missions</span><span className="px-3 py-1.5 rounded-full bg-white/10 text-xs">Personal coaching</span><span className="px-3 py-1.5 rounded-full bg-white/10 text-xs">Voice tutor</span><span className="px-3 py-1.5 rounded-full bg-white/10 text-xs">Mistake recovery</span></div>
      </div>
    </div>
    <div className="grid lg:grid-cols-2 gap-6">
      <DailyMission level={level} progress={progress} goTo={goTo}/>
      <AIRecruitmentStyleChat level={level}/>
    </div>
    <AIPersonalAssistant level={level} progress={progress} goTo={goTo}/>
  </div>;
}

// ---------------- App shell ----------------

// ============================================================
// AI EXAM PLANNER — personalized roadmap for N5/N4/N3/N2/N1
// ============================================================
export function AIExamPlanner({ level = "N5" }) {
  const [days, setDays] = React.useState(120);
  const [minutes, setMinutes] = React.useState(60);
  const [goal, setGoal] = React.useState("pass");
  const [examDate, setExamDate] = React.useState("");
  const [showPlan, setShowPlan] = React.useState(false);

  const configs = {
    N5: { modules: ["Hiragana", "Katakana", "N5 Kanji", "Vocabulary", "Grammar", "Reading", "Listening", "Mock Tests"], rounds: ["Language Knowledge", "Reading", "Listening"] },
    N4: { modules: ["N4 Kanji", "Vocabulary", "Grammar", "Reading", "Listening", "Mock Tests"], rounds: ["Language Knowledge", "Reading", "Listening"] },
    N3: { modules: ["Kanji", "Vocabulary", "Grammar", "Reading", "Listening", "Timed Practice", "Mock Tests"], rounds: ["Language Knowledge", "Reading", "Listening"] },
    N2: { modules: ["Kanji", "Vocabulary", "Grammar", "Reading", "Listening", "Speed Reading", "Mock Tests"], rounds: ["Language Knowledge", "Reading", "Listening"] },
    N1: { modules: ["Advanced Kanji", "Vocabulary", "Grammar", "Advanced Reading", "Listening", "Nuance", "Full Mock Tests"], rounds: ["Language Knowledge", "Reading", "Listening"] }
  };
  const cfg = configs[level] || configs.N5;
  const weeks = Math.max(1, Math.ceil(days / 7));
  const daily = Math.max(15, minutes);
  const phases = [
    { name: "Foundation", pct: 0.30, desc: "Learn the syllabus and build recall." },
    { name: "Practice", pct: 0.30, desc: "Convert knowledge into questions, listening and writing." },
    { name: "Exam Training", pct: 0.25, desc: "Timed sections, error analysis and weak-area repair." },
    { name: "Final Revision", pct: 0.15, desc: "Short notes, spaced recall and full mocks." }
  ];

  const makePlan = () => phases.map(p => ({
    ...p,
    days: Math.max(1, Math.round(days * p.pct)),
    minutes: Math.round(daily * p.pct)
  }));

  const plan = makePlan();
  const scoreRule = goal === "high" ? "Aim for consistent 75–85%+ practice accuracy before exam week." :
                    goal === "safe" ? "Prioritize section minimums and repair weak areas before chasing difficult questions." :
                    "Build reliable basics first, then use mocks to remove repeated mistakes.";

  return (
    <section className="ai-exam-planner">
      <div className="planner-hero">
        <span className="eyebrow">PERSONAL AI EXAM PLANNER</span>
        <h2>{level} → Your roadmap to exam day</h2>
        <p>The planner adapts the workload to your available daily time and days remaining.</p>
      </div>

      <div className="planner-controls">
        <label>Days until exam
          <input type="number" min="7" value={days} onChange={e => setDays(Number(e.target.value) || 7)} />
        </label>
        <label>Daily study time (minutes)
          <input type="number" min="15" value={minutes} onChange={e => setMinutes(Number(e.target.value) || 15)} />
        </label>
        <label>Goal
          <select value={goal} onChange={e => setGoal(e.target.value)}>
            <option value="pass">Pass safely</option>
            <option value="safe">Pass with a safety margin</option>
            <option value="high">Target a high score</option>
          </select>
        </label>
        <label>Exam date (optional)
          <input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} />
        </label>
      </div>

      <button className="primary" onClick={() => setShowPlan(true)}>Generate my AI roadmap</button>

      {showPlan && (
        <>
          <div className="planner-summary">
            <strong>{weeks} weeks</strong>
            <span>·</span>
            <strong>{daily} min/day</strong>
            <span>·</span>
            <strong>{level}</strong>
            <p>{scoreRule}</p>
          </div>

          <div className="planner-phases">
            {plan.map((p, i) => (
              <article key={p.name}>
                <span>0{i + 1}</span>
                <h3>{p.name}</h3>
                <b>{p.days} days</b>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>

          <div className="planner-grid">
            <article>
              <h3>📚 Modules to clear</h3>
              <ul>{cfg.modules.map(m => <li key={m}>{m}</li>)}</ul>
            </article>
            <article>
              <h3>📝 Exam sections</h3>
              <ul>{cfg.rounds.map(r => <li key={r}>{r}</li>)}</ul>
              <small>JLPT is section-based; treat each section as its own timed challenge and check the official rules for your test date.</small>
            </article>
            <article>
              <h3>🧠 Forget → Remember protocol</h3>
              <ol>
                <li>Close the notes and recall from memory.</li>
                <li>Check the answer and mark the exact gap.</li>
                <li>Say it aloud and write it once.</li>
                <li>Review again after 1 day, 3 days and 7 days.</li>
              </ol>
            </article>
            <article>
              <h3>🎯 Exam-day strategy</h3>
              <ol>
                <li>Read instructions before starting.</li>
                <li>Do easy/high-confidence items first when permitted.</li>
                <li>Do not spend too long on one difficult item.</li>
                <li>Use elimination, then make your best choice.</li>
                <li>Reserve time to check unanswered questions.</li>
              </ol>
            </article>
          </div>

          <div className="daily-mission">
            <h3>🤖 Today's AI mission</h3>
            <p>1 recall drill → 2 core lessons → 1 listening set → 1 spelling/reading drill → 10-question checkpoint → error review.</p>
            <button onClick={() => window.dispatchEvent(new CustomEvent("open-ai-tutor", { detail: { level, context: "daily mission" } }))}>
              Ask Personal AI Tutor
            </button>
          </div>
        </>
      )}
    </section>
  );
}


export default function NihongoVertex(){
  const [screen, setScreen] = useState("home");
  const [hasChosenLevel, setHasChosenLevel] = useState(()=>{try{return localStorage.getItem("nv-level-chosen")==="true";}catch(e){return false;}});
  const [param, setParam] = useState(null);
  const [mockExamData, setMockExamData] = useState(null);
  const [mockResult, setMockResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mistakes, setMistakes] = useState([]);
  const [activeLevel, setActiveLevel] = useState(()=>{try{return localStorage.getItem("nv-active-level")||"N5";}catch(e){return "N5";}});
  useEffect(()=>{try{localStorage.setItem("nv-active-level",activeLevel);}catch(e){}},[activeLevel]);
  const { progress, addXP, completeLesson, recordMock, loaded } = useProgress();

  function goTo(scr, p=null){
    if(scr==="levelDetail"){ setActiveLevel(typeof p==="string"?p:(p?.code||"N5")); }
    setScreen(scr); setParam(p); setSidebarOpen(false);
    window.scrollTo(0,0);
  }

  function changeExam(){
    try{ localStorage.removeItem("nv-level-chosen"); }catch(e){}
    setHasChosenLevel(false);
    setScreen("home");
    setParam(null);
    window.scrollTo(0,0);
  }

  function handleLessonComplete(lessonId, score, total){
    completeLesson(lessonId, score, total);
  }

  function startMock(){
    setMockExamData(buildMockExam(ALL_N5_QUIZ, ALL_N5_VOCAB, LESSONS));
    goTo("mockRun");
  }
  function finishMock(result){
    recordMock({date:new Date().toISOString().slice(0,10), score:result.score, total:result.total, sections:result.bySection});
    setMockResult(result);
    goTo("mockResult");
  }

  const currentLesson = param && LESSONS.find(l=>l.id===param);
  const currentModule = typeof param === "string"
    ? Object.values(JLPT_CURRICULUM).flatMap(data=>data.modules).find(module=>module.id===param)
    : null;

  if(!loaded){
    return <div className="min-h-screen flex items-center justify-center text-stone-400">Loading...</div>;
  }

  if(!hasChosenLevel){
    return <LevelOnboarding onChoose={(level)=>{ setActiveLevel(level); try{localStorage.setItem("nv-level-chosen","true");}catch(e){} setHasChosenLevel(true); }}/>
  }

  if(screen === "mockRun" && mockExamData){
    return <MockExamRunner exam={mockExamData} onFinish={finishMock} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans" style={{fontFamily:"'Noto Sans JP','Noto Sans Tamil',ui-sans-serif,system-ui"}}>
      <div className="flex">
        {/* Desktop sidebar: can be compacted to icon-only navigation. */}
        <aside className={`hidden lg:flex lg:flex-col ${sidebarCollapsed ? "w-20" : "w-64"} shrink-0 bg-white border-r border-stone-200 min-h-screen sticky top-0 transition-[width] duration-200`}>
          <div className={`p-5 border-b border-sky-300/25 flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600"/>
              {!sidebarCollapsed && <span className="font-bold text-white tracking-tight whitespace-nowrap">Nihongo Vertex</span>}
            </div>
            {!sidebarCollapsed && <button onClick={()=>setSidebarCollapsed(true)} aria-label="Collapse navigation" className="p-2 rounded-lg text-sky-100 hover:bg-white/10"><Menu size={19}/></button>}
          </div>
          {sidebarCollapsed && <button onClick={()=>setSidebarCollapsed(false)} aria-label="Expand navigation" className="m-3 p-2 rounded-lg text-sky-100 hover:bg-white/10"><Menu size={19}/></button>}
          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(n=>{
              const Icon = n.icon;
              const active = screen===n.key || (n.key==="lessons" && screen==="lesson") || (n.key==="levels" && (screen==="levelDetail" || screen==="tierLessons")) || (n.key==="mock" && (screen==="mockResult"));
              return (
                <button key={n.key} title={n.en} onClick={()=>goTo(n.key)} className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-2.5 rounded-xl text-sm transition-colors ${active ? "bg-white/20 text-white font-medium ring-1 ring-white/30" : "text-sky-100 hover:bg-white/10"}`}>
                  <Icon size={18}/> {!sidebarCollapsed && <><span lang="ja">{n.jp}</span><span className="text-sky-200 text-xs">{n.en}</span></>}
                </button>
              );
            })}
          </nav>
          {!sidebarCollapsed && <div className="p-4 border-t border-sky-300/25 text-xs text-sky-100/70">
            Practice questions are original learning materials inspired by JLPT formats and are not official JLPT questions.
          </div>}
        </aside>

        {/* Mobile/tablet hamburger navigation. */}
        <div className="lg:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-stone-200 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button onClick={()=>setSidebarOpen(true)} aria-label="Open navigation" className="p-2 -ml-2 rounded-lg text-sky-800 hover:bg-sky-50"><Menu size={22}/></button>
            <div className="w-2 h-2 rounded-full bg-red-600"/>
            <span className="font-bold text-stone-900">Nihongo Vertex</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1"><Flame size={14} className="text-red-600"/>{progress.streak}</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-red-600"/>{progress.xp}</span>
          </div>
        </div>

        {sidebarOpen && <button aria-label="Close navigation" onClick={()=>setSidebarOpen(false)} className="lg:hidden fixed inset-0 z-40 bg-slate-950/40"/>}
        <aside className={`lg:hidden fixed inset-y-0 left-0 z-50 flex w-72 max-w-[86vw] flex-col bg-white border-r border-sky-300/30 shadow-2xl transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-5 border-b border-sky-300/25 flex items-center justify-between">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-600"/><span className="font-bold text-white">Nihongo Vertex</span></div>
            <button onClick={()=>setSidebarOpen(false)} aria-label="Close navigation" className="p-2 rounded-lg text-sky-100 hover:bg-white/10"><X size={21}/></button>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {NAV.map(n=>{
              const Icon=n.icon;
              const active=screen===n.key || (n.key==="lessons" && screen==="lesson") || (n.key==="levels" && (screen==="levelDetail" || screen==="tierLessons")) || (n.key==="mock" && screen==="mockResult");
              return <button key={n.key} onClick={()=>goTo(n.key)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm ${active ? "bg-white/20 text-white font-medium ring-1 ring-white/30" : "text-sky-100 hover:bg-white/10"}`}><Icon size={19}/><span lang="ja">{n.jp}</span><span className="text-sky-200 text-xs">{n.en}</span></button>;
            })}
          </nav>
          <div className="p-4 border-t border-sky-300/25 text-xs text-sky-100/70">Original practice materials inspired by JLPT formats.</div>
        </aside>

        <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 max-w-5xl mx-auto w-full">
          {screen==="home" && <Home progress={progress} lessons={LESSONS} goTo={goTo} activeLevel={activeLevel} onChangeExam={changeExam}/>}
          {screen==="lessons" && (activeLevel==="N5" ? <LessonList lessons={LESSONS} progress={progress} goTo={goTo}/> : <ExamModuleList level={activeLevel} goTo={goTo}/>)}
          {screen==="characters" && <CharacterLab onGainXP={addXP}/>}
          {screen==="lesson" && currentLesson && <LessonFlow lesson={currentLesson} goTo={goTo} onComplete={handleLessonComplete} isLastLesson={currentLesson.id===LESSONS.length}/>}          {screen==="levelComplete" && <LevelCompletionNotes level="N5" lessons={LESSONS} progress={progress} goTo={goTo}/>}
          {screen==="moduleLesson" && <ModuleLesson module={currentModule} goTo={goTo}/>}
          {screen==="levels" && <StudyTierSelector level={activeLevel} goTo={goTo}/>}
          {screen==="tierLessons" && <TierLessonList level={activeLevel} tier={param?.tier} goTo={goTo}/>}
          {screen==="levelDetail" && <LevelDetail level={param} otherLevels={OTHER_LEVELS} goTo={goTo}/>}
          {screen==="mistakes" && <MistakeBook mistakes={mistakes}/>}
          {screen==="mock" && <MockExamIntro onStart={startMock} goTo={goTo}/>}
          {screen==="mockResult" && mockResult && <MockExamResult result={mockResult} goTo={goTo}/>}
          {screen==="progress" && <ProgressDashboard progress={progress} lessons={LESSONS}/>}
          {screen==="aiHub" && <AIMentorHub level={activeLevel} progress={progress} goTo={goTo}/>}
        </main>
      </div>

    </div>
  );
}



// ============================================================
// VISUAL MEMORY LESSON LAYER
// Adds animation + object association + drawing + memory tips
// to every lesson without requiring external image assets.
// ============================================================
export function VisualMemoryLesson({ lesson = {} }) {
  const [showAnimation, setShowAnimation] = React.useState(true);
  const [step, setStep] = React.useState(0);
  const [drawing, setDrawing] = React.useState(false);
  const canvasRef = React.useRef(null);

  const title = lesson.title || "Japanese Lesson";
  const japanese = lesson.japanese || lesson.character || "あ";
  const romaji = lesson.romaji || "a";
  const meaning = lesson.meaning || "sound / meaning";
  const object = lesson.memoryObject || "apple";
  const emoji = lesson.emoji || "🍎";
  const tip = lesson.memoryTip || `Connect ${japanese} with ${emoji}. Say "${romaji}" while tracing the shape.`;
  const pattern = lesson.pattern || `${japanese} → ${romaji} → ${meaning}`;

  const steps = [
    { label: "SEE", text: `Look at ${japanese} and notice its shape.` },
    { label: "CONNECT", text: `Imagine ${emoji} (${object}) beside the character.` },
    { label: "SAY", text: `Say ${romaji} aloud while the tutor demonstrates.` },
    { label: "DRAW", text: "Trace the character slowly, then write it from memory." },
    { label: "RECALL", text: "Hide the answer and recall the character, sound and meaning." }
  ];

  React.useEffect(() => {
    if (!drawing || !canvasRef.current) return;
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "currentColor";
    let active = false;
    const pos = e => {
      const r = c.getBoundingClientRect();
      const source = e.touches ? e.touches[0] : e;
      return { x: source.clientX - r.left, y: source.clientY - r.top };
    };
    const down = e => { active = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x,p.y); };
    const move = e => { if (!active) return; e.preventDefault(); const p = pos(e); ctx.lineTo(p.x,p.y); ctx.stroke(); };
    const up = () => { active = false; };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drawing]);

  const speak = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(japanese);
      u.lang = "ja-JP";
      u.rate = 0.75;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <section className="visual-memory-lesson">
      <div className="lesson-visual-header">
        <div>
          <span className="eyebrow">VISUAL MEMORY MODE</span>
          <h2>{title}</h2>
          <p>See it → connect it → hear it → draw it → recall it.</p>
        </div>
        <button onClick={() => setShowAnimation(v => !v)}>
          {showAnimation ? "Pause animation" : "Play animation"}
        </button>
      </div>

      <div className="memory-stage">
        <div className={`character-animation ${showAnimation ? "is-playing" : ""}`}>
          <div className="memory-object">{emoji}</div>
          <div className="memory-arrow">↔</div>
          <div className="japanese-character">{japanese}</div>
        </div>
        <div className="pronunciation-row">
          <strong>{japanese}</strong>
          <span>{romaji}</span>
          <span>{meaning}</span>
          <button onClick={speak}>🔊 Listen</button>
        </div>
      </div>

      <div className="memory-pattern">
        <span>🧠 EASY PATTERN</span>
        <strong>{pattern}</strong>
        <p>{tip}</p>
      </div>

      <div className="visual-steps">
        {steps.map((s, i) => (
          <button key={s.label} className={i === step ? "active" : ""} onClick={() => setStep(i)}>
            <span>{i + 1}</span><b>{s.label}</b><small>{s.text}</small>
          </button>
        ))}
      </div>

      {step === 3 && (
        <div className="writing-card">
          <div className="writing-toolbar">
            <strong>✍️ Draw {japanese}</strong>
            <button onClick={() => {
              const c = canvasRef.current;
              if (c) c.getContext("2d").clearRect(0,0,c.width,c.height);
            }}>Clear</button>
          </div>
          <div className="trace-area">
            <span>{japanese}</span>
            <canvas ref={canvasRef} width="420" height="260" onPointerDown={() => setDrawing(true)} />
          </div>
          <p>Tip: trace slowly once, cover the guide, then write it again from memory.</p>
        </div>
      )}

      {step === 4 && (
        <div className="recall-card">
          <div className="hidden-answer">?</div>
          <h3>Can you remember?</h3>
          <p>What character is this? What is its pronunciation? What does it mean?</p>
          <button onClick={() => window.dispatchEvent(new CustomEvent("open-ai-tutor", {
            detail: { context: "memory recall", japanese, romaji, meaning }
          }))}>Ask AI Tutor for a hint</button>
        </div>
      )}

      <div className="lesson-tip-strip">
        💡 <strong>Remember:</strong> Never memorize the symbol alone. Attach a <b>shape + object + sound + meaning + movement</b>.
      </div>
    </section>
  );
}



// ============================================================
// JAPANESE WRITING + SPEAKING LAB
// Kana/Kanji: hear -> identify -> write -> say the learned order
// ============================================================
export function JapaneseWritingSpeakingLab({ characters = [], title = "Kana & Kanji Practice" }) {
  const fallback = [
    { char: "あ", romaji: "a" }, { char: "い", romaji: "i" },
    { char: "う", romaji: "u" }, { char: "え", romaji: "e" },
    { char: "お", romaji: "o" }
  ];
  const items = characters.length ? characters : fallback;
  const [index, setIndex] = React.useState(0);
  const [mode, setMode] = React.useState("write");
  const [heard, setHeard] = React.useState("");
  const [spoken, setSpoken] = React.useState("");
  const [result, setResult] = React.useState("");
  const canvasRef = React.useRef(null);
  const recognitionRef = React.useRef(null);

  const current = items[index];

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (c) c.getContext("2d").clearRect(0, 0, c.width, c.height);
  };

  const speak = (text = current.char, rate = 0.7) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = rate;
    window.speechSynthesis.speak(u);
  };

  const hearThenWrite = () => {
    const target = current.char;
    setHeard("");
    speak(target, 0.55);
    setTimeout(() => setHeard(target), 900);
  };

  const startSpeaking = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setResult("Microphone pronunciation checking is not supported in this browser.");
      return;
    }
    const r = new SR();
    recognitionRef.current = r;
    r.lang = "en-US";
    r.interimResults = false;
    r.maxAlternatives = 3;
    r.onresult = e => {
      const value = e.results[0][0].transcript.trim().toLowerCase();
      setSpoken(value);
      const expected = current.romaji.toLowerCase();
      setResult(value.includes(expected) ? "✅ Good! Your pronunciation matched." : `Try again. Say: ${current.romaji}`);
    };
    r.onerror = () => setResult("Try speaking again and pronounce the romaji clearly.");
    r.start();
  };

  const startOrderSpeaking = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setResult("Your browser does not provide microphone recognition.");
      return;
    }
    const expected = items.map(x => x.romaji).join(" ");
    const r = new SR();
    recognitionRef.current = r;
    r.lang = "en-US";
    r.interimResults = false;
    r.onresult = e => {
      const value = e.results[0][0].transcript.toLowerCase().replace(/[^a-z ]/g, " ").replace(/\s+/g, " ").trim();
      const wanted = expected.toLowerCase();
      setSpoken(value);
      const matched = wanted.split(" ").filter(x => value.includes(x)).length;
      const pct = Math.round((matched / wanted.split(" ").length) * 100);
      setResult(`Order recall: ${pct}%. ${pct >= 80 ? "🎉 Excellent — you recalled the sequence!" : "🔁 Repeat slowly, then try the whole sequence again."}`);
    };
    r.start();
  };

  React.useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "currentColor";
    let down = false;
    const point = e => {
      const r = c.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const start = e => { down = true; const p = point(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
    const move = e => { if (!down) return; const p = point(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
    const end = () => { down = false; };
    c.addEventListener("pointerdown", start);
    c.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    return () => {
      c.removeEventListener("pointerdown", start);
      c.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
    };
  }, [index]);

  return (
    <section className="japanese-writing-speaking-lab">
      <div className="lab-header">
        <span className="eyebrow">WRITE + SPEAK + REMEMBER</span>
        <h2>{title}</h2>
        <p>Hear the Japanese sound, find the correct character, write it, then say the learned order aloud.</p>
      </div>

      <div className="lab-progress">
        <strong>{index + 1} / {items.length}</strong>
        <span>{current.char} · {current.romaji}</span>
      </div>

      <div className="character-hearing-card">
        <div className="big-character">{mode === "blind" ? "?" : current.char}</div>
        <div>
          <b>Romaji: {current.romaji}</b>
          <button onClick={() => speak(current.char)}>🔊 Hear Japanese</button>
          <button onClick={hearThenWrite}>🎧 Hear → Find → Write</button>
        </div>
      </div>

      <div className="writing-modes">
        <button className={mode === "write" ? "active" : ""} onClick={() => setMode("write")}>✍️ Write</button>
        <button className={mode === "blind" ? "active" : ""} onClick={() => setMode("blind")}>🧠 Recall</button>
        <button className={mode === "order" ? "active" : ""} onClick={() => setMode("order")}>🔢 Full Order</button>
      </div>

      {mode !== "order" ? (
        <div className="writing-practice">
          <div className="trace-guide">{mode === "blind" ? "?" : current.char}</div>
          <canvas ref={canvasRef} width="480" height="300" />
          <div className="writing-actions">
            <button onClick={clearCanvas}>Clear</button>
            <button onClick={() => setResult("Nice! Compare your strokes with the guide and repeat once.")}>Check my writing</button>
          </div>
        </div>
      ) : (
        <div className="order-practice">
          <h3>🧠 Say the complete learned order</h3>
          <div className="order-strip">
            {items.map((x, i) => <span key={i}>{i + 1}. {x.char}<small>{x.romaji}</small></span>)}
          </div>
          <p>First listen once. Then hide the romaji and say the whole sequence from memory.</p>
          <button onClick={() => items.forEach((x, i) => setTimeout(() => speak(x.char, 0.6), i * 700))}>🔊 Play full order</button>
          <button onClick={startOrderSpeaking}>🎙️ I will say the full order</button>
        </div>
      )}

      <div className="speaking-check">
        <h3>🗣️ Say this character</h3>
        <p>Speak the English-letter reading: <b>{current.romaji}</b></p>
        <button onClick={startSpeaking}>🎙️ Start pronunciation check</button>
        {spoken && <span>You said: {spoken}</span>}
      </div>

      {result && <div className="practice-result">{result}</div>}

      <div className="lab-navigation">
        <button disabled={index === 0} onClick={() => { setIndex(i => i - 1); clearCanvas(); setResult(""); }}>← Previous</button>
        <button onClick={() => { setIndex(i => (i + 1) % items.length); clearCanvas(); setResult(""); }}>Next character →</button>
      </div>

      <div className="lab-tip">
        💡 <b>Memory rule:</b> Hear it → look for it → write it → say it → recall it without looking.
      </div>
    </section>
  );
}
