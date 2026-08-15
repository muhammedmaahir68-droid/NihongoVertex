import React, { useState, useEffect, useMemo, useRef } from "react";
import { BookOpen, Home as HomeIcon, Layers, PenTool, Headphones, ListChecks, ClipboardCheck, AlertCircle, TrendingUp, Settings, Menu, X, Flame, Star, ChevronRight, ChevronLeft, Flag, Clock, CheckCircle2, XCircle, Play, Pause, RotateCcw, Award, Lock, Volume2, PenLine, Search, Sparkles, Bot, MessageCircle, CalendarCheck, Target, Briefcase, Send, Trophy, Bell, UserRound, Check, Zap } from "lucide-react";

// ===== Data (N5: sourced from user-uploaded Minna no Nihongo I translation/grammar notes; N4-N1: sample from public JLPT references) =====
// Nihongo Vertex ΓÇö N5 curriculum data
// Sourced from the structure of Minna no Nihongo I (Lessons 1-25), the user's own uploaded
// translation/grammar-note material. Tamil (TA) and English (EN) glosses are original.
// N4-N1 sample data is drawn from well-established public JLPT study references
// (JLPTsensei-style grammar groupings) and is explicitly marked as a sample/expandable set.

const LESSONS = [
{id:1,jp:"πüôπéîπü»πÇÇπü¬πéôπüºπüÖπüï",en:"What is this?",ta:"α«çα«ñα»ü α«Äα«⌐α»ìα«⌐?",
 vocab:[
  {jp:"πüôπéî",r:"kore",en:"this (thing)",ta:"α«çα«ñα»ü"},
  {jp:"πü¥πéî",r:"sore",en:"that (thing, near you)",ta:"α«àα«ñα»ü (α«ëα«⌐α»ì α«àα«░α»üα«òα«┐α«▓α»ì)"},
  {jp:"πüéπéî",r:"are",en:"that (thing, over there)",ta:"α«àα«ñα»ü (α«ñα»éα«░α«ñα»ìα«ñα«┐α«▓α»ì)"},
  {jp:"πü¬πéô∩╝Åπü¬πü½",r:"nan/nani",en:"what",ta:"α«Äα«⌐α»ìα«⌐"},
  {jp:"πü╗πéô",r:"hon",en:"book",ta:"α«¬α»üα«ñα»ìα«ñα«òα««α»ì"},
  {jp:"πü¢πéôπü¢πüä",r:"sensei",en:"teacher",ta:"α«åα«Üα«┐α«░α«┐α«»α«░α»ì"},
 ],
 grammar:[
  {t:"Aπü»BπüºπüÖ",en:"A is B (topic marker πü»)",ta:"A α«Äα«⌐α»ìα«¬α«ñα»ü B α«åα«òα»üα««α»ì (πü» α«Äα«⌐α»ìα«¬α«ñα»ü α«ñα«▓α»êα«¬α»ìα«¬α»ü α«òα»üα«▒α«┐α«»α»Çα«ƒα»ü)",
   form:"Noun + πü» + Noun + πüºπüÖ",
   ex:{jp:"πüôπéîπü»πÇÇπü╗πéôπüºπüÖπÇé",en:"This is a book.",ta:"α«çα«ñα»ü α«Æα«░α»ü α«¬α»üα«ñα»ìα«ñα«òα««α»ì."}},
  {t:"∩╜₧πüï∩╝êquestion)",en:"πüï turns a sentence into a question",ta:"πüï α«Äα«⌐α»ìα«¬α«ñα»ü α«╡α«┐α«⌐α«╛ α«òα»üα«▒α«┐α«»α»Çα«ƒα»ü",
   form:"ΓÇªπüºπüÖ + πüï",
   ex:{jp:"πüôπéîπü»πÇÇπü╗πéôπüºπüÖπüïπÇé",en:"Is this a book?",ta:"α«çα«ñα»ü α«¬α»üα«ñα»ìα«ñα«òα««α«╛?"}},
 ]},
{id:2,jp:"πü¥πéîπü»πÇÇπéÅπüƒπüùπü«πÇÇπüïπüòπüºπüÖ",en:"That is my umbrella",ta:"α«àα«ñα»ü α«Äα«⌐α»ì α«òα»üα«ƒα»ê",
 vocab:[
  {jp:"πüôπü«∩╝Åπü¥πü«∩╝Åπüéπü«",r:"kono/sono/ano",en:"this/that/that (+ noun)",ta:"α«çα«¿α»ìα«ñ/α«àα«¿α»ìα«ñ/α«àα«¿α»ìα«ñ (α«¬α»åα«»α«░α»ìα«Üα»ìα«Üα»èα«▓α»ìα«▓α»üα«ƒα«⌐α»ì)"},
  {jp:"πüôπüô∩╝Åπü¥πüô∩╝Åπüéπü¥πüô",r:"koko/soko/asoko",en:"here/there/over there",ta:"α«çα«Öα»ìα«òα»ç/α«àα«Öα»ìα«òα»ç/α«àα«Öα»ìα«òα»ç α«ñα»éα«░α«ñα»ìα«ñα«┐α«▓α»ì"},
  {jp:"πüïπüò",r:"kasa",en:"umbrella",ta:"α«òα»üα«ƒα»ê"},
  {jp:"πüñπüÅπüê",r:"tsukue",en:"desk",ta:"α««α»çα«Üα»ê"},
  {jp:"πü«",r:"no",en:"possession particle (~'s)",ta:"α«ëα«ƒα»êα««α»ê α«òα»üα«▒α«┐α«»α»Çα«ƒα»ü"},
 ],
 grammar:[
  {t:"Aπü«B",en:"possession / attribute: A's B",ta:"α«ëα«ƒα»êα««α»ê: A α«çα«⌐α»ì B",
   form:"Noun + πü« + Noun",
   ex:{jp:"πüôπéîπü»πÇÇπéÅπüƒπüùπü«πÇÇπüïπüòπüºπüÖπÇé",en:"This is my umbrella.",ta:"α«çα«ñα»ü α«Äα«⌐α»ì α«òα»üα«ƒα»ê."}},
  {t:"πüôπü«∩╝Åπü¥πü«∩╝Åπüéπü« + Noun",en:"this/that + noun (must be followed by a noun)",ta:"α«çα«¿α»ìα«ñ/α«àα«¿α»ìα«ñ + α«¬α»åα«»α«░α»ìα«Üα»ìα«Üα»èα«▓α»ì",
   form:"πüôπü«/πü¥πü«/πüéπü« + Noun",
   ex:{jp:"πü¥πü«πÇÇπü╗πéôπü»πÇÇπéÅπüƒπüùπü«πüºπüÖπÇé",en:"That book is mine.",ta:"α«àα«¿α»ìα«ñα«¬α»ì α«¬α»üα«ñα»ìα«ñα«òα««α»ì α«Äα«⌐α»ìα«⌐α»üα«ƒα»êα«»α«ñα»ü."}},
 ]},
{id:3,jp:"πüôπüôπü»πÇÇπüùπéçπüÅπü⌐πüåπüºπüÖ",en:"This is the cafeteria",ta:"α«çα«ñα»ü α«ëα«úα«╡α«òα««α»ì",
 vocab:[
  {jp:"πüùπéçπüÅπü⌐πüå",r:"shokudou",en:"cafeteria",ta:"α«ëα«úα«╡α«òα««α»ì"},
  {jp:"πüáπüäπüîπüÅ",r:"daigaku",en:"university",ta:"α«¬α«▓α»ìα«òα«▓α»êα«òα»ìα«òα«┤α«òα««α»ì"},
  {jp:"πüäπü╛",r:"ima",en:"now",ta:"α«çα«¬α»ìα«¬α»ïα«ñα»ü"},
  {jp:"πüìπü╛πüÖ",r:"kimasu",en:"to come",ta:"α«╡α«░α»üα«ñα«▓α»ì"},
  {jp:"πüäπüìπü╛πüÖ",r:"ikimasu",en:"to go",ta:"α«Üα»åα«▓α»ìα«▓α»üα«ñα«▓α»ì"},
 ],
 grammar:[
  {t:"σá┤µëÇπü» Noun πüºπüÖ",en:"place + πü» + noun (identifying a place)",ta:"α«çα«ƒα««α»ì + πü» + α«¬α»åα«»α«░α»ìα«Üα»ìα«Üα»èα«▓α»ì",
   form:"Place + πü» + Noun + πüºπüÖ",
   ex:{jp:"πüôπüôπü»πÇÇπüáπüäπüîπüÅπüºπüÖπÇé",en:"This is the university.",ta:"α«çα«ñα»ü α«¬α«▓α»ìα«òα«▓α»êα«òα»ìα«òα«┤α«òα««α»ì."}},
  {t:"∩╜₧πü╕πÇÇπüäπüìπü╛πüÖ∩╝Åπüìπü╛πüÖ",en:"πü╕ marks direction of movement",ta:"πü╕ α«ñα«┐α«Üα»êα«»α»êα«òα»ì α«òα»üα«▒α«┐α«òα»ìα«òα«┐α«▒α«ñα»ü",
   form:"Place + πü╕ + πüäπüìπü╛πüÖ/πüìπü╛πüÖ",
   ex:{jp:"πüîπüúπüôπüåπü╕πÇÇπüäπüìπü╛πüÖπÇé",en:"I go to school.",ta:"α«¿α«╛α«⌐α»ì α«¬α«│α»ìα«│α«┐α«òα»ìα«òα»üα«Üα»ì α«Üα»åα«▓α»ìα«òα«┐α«▒α»çα«⌐α»ì."}},
 ]},
{id:4,jp:"πüäπü╛πÇÇπü¬πéôπüÿπüºπüÖπüï",en:"What time is it now?",ta:"α«çα«¬α»ìα«¬α»ïα«ñα»ü α«Äα«⌐α»ìα«⌐ α«¿α»çα«░α««α»ì?",
 vocab:[
  {jp:"πüÿ",r:"ji",en:"o'clock",ta:"α««α«úα«┐"},
  {jp:"πü»πéô",r:"han",en:"half (past)",ta:"α«àα«░α»ê"},
  {jp:"πüèπüìπü╛πüÖ",r:"okimasu",en:"to get up",ta:"α«Äα«┤α»üα«¿α»ìα«ñα«┐α«░α»üα«ñα»ìα«ñα«▓α»ì"},
  {jp:"πü¡πü╛πüÖ",r:"nemasu",en:"to sleep",ta:"α«ñα»éα«Öα»ìα«òα»üα«ñα«▓α»ì"},
  {jp:"πü»πüƒπéëπüìπü╛πüÖ",r:"hatarakimasu",en:"to work",ta:"α«╡α»çα«▓α»ê α«Üα»åα«»α»ìα«ñα«▓α»ì"},
 ],
 grammar:[
  {t:"∩╜₧πüïπéë∩╜₧πü╛πüº",en:"from ~ to ~ (time/place range)",ta:"~ α««α»üα«ñα«▓α»ì ~ α«╡α«░α»ê",
   form:"A + πüïπéë + B + πü╛πüº",
   ex:{jp:"9πüÿπüïπéëπÇÇ5πüÿπü╛πüºπÇÇπü»πüƒπéëπüìπü╛πüÖπÇé",en:"I work from 9 to 5.",ta:"α«¿α«╛α«⌐α»ì 9 α««α«úα«┐ α««α»üα«ñα«▓α»ì 5 α««α«úα«┐ α«╡α«░α»ê α«╡α»çα«▓α»ê α«Üα»åα«»α»ìα«òα«┐α«▒α»çα«⌐α»ì."}},
 ]},
{id:5,jp:"πé¿πâ¼πâÖπâ╝πé┐πâ╝πü»πÇÇπü⌐πüôπüºπüÖπüï",en:"Where is the elevator?",ta:"α«▓α«┐α«¬α»ìα«ƒα»ì α«Äα«Öα»ìα«òα»ç?",
 vocab:[
  {jp:"πü⌐πüô",r:"doko",en:"where",ta:"α«Äα«Öα»ìα«òα»ç"},
  {jp:"πüäπüìπü╛πüÖ",r:"ikimasu",en:"to go",ta:"α«Üα»åα«▓α»ìα«▓α»üα«ñα«▓α»ì"},
  {jp:"πüºπéôπüùπéâ",r:"densha",en:"train",ta:"α«░α«»α«┐α«▓α»ì"},
  {jp:"πâÉπé╣",r:"basu",en:"bus",ta:"α«¬α»çα«░α»üα«¿α»ìα«ñα»ü"},
  {jp:"πé┐πé»πé╖πâ╝",r:"takushi-",en:"taxi",ta:"α«ƒα«╛α«òα»ìα«╕α«┐"},
 ],
 grammar:[
  {t:"∩╜₧πüº∩╝êΣ╣ùπéèτë⌐∩╝ë",en:"πüº marks the means of transport",ta:"πüº α«¬α»ïα«òα»ìα«òα»üα«╡α«░α«ñα»ìα«ñα»ü α«Üα«╛α«ñα«⌐α«ñα»ìα«ñα»êα«òα»ì α«òα»üα«▒α«┐α«òα»ìα«òα«┐α«▒α«ñα»ü",
   form:"Vehicle + πüº + πüäπüìπü╛πüÖ",
   ex:{jp:"πâÉπé╣πüºπÇÇπüáπüäπüîπüÅπü╕πÇÇπüäπüìπü╛πüÖπÇé",en:"I go to university by bus.",ta:"α«¿α«╛α«⌐α»ì α«¬α»çα«░α»üα«¿α»ìα«ñα«┐α«▓α»ì α«¬α«▓α»ìα«òα«▓α»êα«òα»ìα«òα«┤α«òα««α»ì α«Üα»åα«▓α»ìα«òα«┐α«▒α»çα«⌐α»ì."}},
  {t:"∩╜₧πü¿∩╝êwith∩╝ë",en:"πü¿ marks 'together with'",ta:"πü¿ α«ëα«ƒα«⌐α»ì α«Äα«⌐α»ìα«¬α«ñα»êα«òα»ì α«òα»üα«▒α«┐α«òα»ìα«òα«┐α«▒α«ñα»ü",
   form:"Person + πü¿ + πüäπüìπü╛πüÖ",
   ex:{jp:"πü¿πééπüáπüíπü¿πÇÇπüäπüìπü╛πüÖπÇé",en:"I go with a friend.",ta:"α«¿α«╛α«⌐α»ì α«¿α«úα»ìα«¬α«░α»üα«ƒα«⌐α»ì α«Üα»åα«▓α»ìα«òα«┐α«▒α»çα«⌐α»ì."}},
 ]},
{id:6,jp:"πü¬πü½πéÆπÇÇπüïπüäπü╛πüÖπüï",en:"What will you buy?",ta:"α«¿α»Çα«Öα»ìα«òα«│α»ì α«Äα«⌐α»ìα«⌐ α«╡α«╛α«Öα»ìα«òα»üα«╡α»Çα«░α»ìα«òα«│α»ì?",
 vocab:[
  {jp:"πüïπüäπü╛πüÖ",r:"kaimasu",en:"to buy",ta:"α«╡α«╛α«Öα»ìα«òα»üα«ñα«▓α»ì"},
  {jp:"πüƒπü╣πü╛πüÖ",r:"tabemasu",en:"to eat",ta:"α«Üα«╛α«¬α»ìα«¬α«┐α«ƒα»üα«ñα«▓α»ì"},
  {jp:"πü«πü┐πü╛πüÖ",r:"nomimasu",en:"to drink",ta:"α«òα»üα«ƒα«┐α«ñα»ìα«ñα«▓α»ì"},
  {jp:"πâæπâ│",r:"pan",en:"bread",ta:"α«░α»èα«ƒα»ìα«ƒα«┐"},
  {jp:"πü┐πüÜ",r:"mizu",en:"water",ta:"α«ñα«úα»ìα«úα»Çα«░α»ì"},
 ],
 grammar:[
  {t:"∩╜₧πéÆ∩╝êobject marker)",en:"πéÆ marks the direct object of a verb",ta:"πéÆ α«Üα»åα«»α«¬α»ìα«¬α«ƒα»üα«¬α»èα«░α»üα«│α»êα«òα»ì α«òα»üα«▒α«┐α«òα»ìα«òα«┐α«▒α«ñα»ü",
   form:"Noun + πéÆ + Verb",
   ex:{jp:"πâæπâ│πéÆπÇÇπüƒπü╣πü╛πüÖπÇé",en:"I eat bread.",ta:"α«¿α«╛α«⌐α»ì α«░α»èα«ƒα»ìα«ƒα«┐ α«Üα«╛α«¬α»ìα«¬α«┐α«ƒα»üα«òα«┐α«▒α»çα«⌐α»ì."}},
  {t:"∩╜₧πéä∩╜₧∩╝êπü¬πü⌐∩╝ë",en:"listing a few examples among others",ta:"α«Üα«┐α«▓ α«ëα«ñα«╛α«░α«úα«Öα»ìα«òα«│α»êα«¬α»ì α«¬α«ƒα»ìα«ƒα«┐α«»α«▓α«┐α«ƒα»üα«ñα«▓α»ì",
   form:"A + πéä + B",
   ex:{jp:"πâæπâ│πéäπÇÇπü┐πüÜπéÆπÇÇπüïπüäπü╛πüÖπÇé",en:"I buy bread, water, etc.",ta:"α«¿α«╛α«⌐α»ì α«░α»èα«ƒα»ìα«ƒα«┐, α«ñα«úα»ìα«úα»Çα«░α»ì α«¬α»ïα«⌐α»ìα«▒α«╡α»ê α«╡α«╛α«Öα»ìα«òα»üα«òα«┐α«▒α»çα«⌐α»ì."}},
 ]},
{id:7,jp:"πüùπéâπüùπéôπéÆπÇÇπü¿πéèπü╛πüùπéçπüå",en:"Let's take a photo",ta:"α«¬α»üα«òα»êα«¬α»ìα«¬α«ƒα««α»ì α«Äα«ƒα»üα«¬α»ìα«¬α»ïα««α»ì",
 vocab:[
  {jp:"πü¿πéèπü╛πüÖ",r:"torimasu",en:"to take (photo)",ta:"α«Äα«ƒα»üα«ñα»ìα«ñα«▓α»ì"},
  {jp:"πüïπüùπü╛πüÖ",r:"kashimasu",en:"to lend",ta:"α«òα«ƒα«⌐α»ì α«òα»èα«ƒα»üα«ñα»ìα«ñα«▓α»ì"},
  {jp:"πüïπéèπü╛πüÖ",r:"karimasu",en:"to borrow",ta:"α«òα«ƒα«⌐α»ì α«╡α«╛α«Öα»ìα«òα»üα«ñα«▓α»ì"},
  {jp:"πüèπüùπüêπü╛πüÖ",r:"oshiemasu",en:"to teach",ta:"α«òα«▒α»ìα«¬α«┐α«ñα»ìα«ñα«▓α»ì"},
  {jp:"πü¬πéëπüäπü╛πüÖ",r:"naraimasu",en:"to learn",ta:"α«òα«▒α»ìα«▒α«▓α»ì"},
 ],
 grammar:[
  {t:"∩╜₧πü╛πüùπéçπüå",en:"let's do ~ (invitation)",ta:"~ α«Üα»åα«»α»ìα«╡α»ïα««α»ì (α«àα«┤α»êα«¬α»ìα«¬α»ü)",
   form:"Verb stem + πü╛πüùπéçπüå",
   ex:{jp:"πüäπüúπüùπéçπü½πÇÇπüƒπü╣πü╛πüùπéçπüåπÇé",en:"Let's eat together.",ta:"α«Æα«⌐α»ìα«▒α«╛α«ò α«Üα«╛α«¬α»ìα«¬α«┐α«ƒα»üα«╡α»ïα««α»ì."}},
  {t:"∩╜₧πü½∩╝êperson - to/from∩╝ë",en:"πü½ marks the person given to/received from",ta:"πü½ α«¿α«¬α«░α»üα«òα»ìα«òα»ü/α«¿α«¬α«░α«┐α«ƒα««α«┐α«░α»üα«¿α»ìα«ñα»ü α«Äα«⌐α»ìα«¬α«ñα»êα«òα»ì α«òα»üα«▒α«┐α«òα»ìα«òα«┐α«▒α«ñα»ü",
   form:"Person + πü½ + πüïπüùπü╛πüÖ/πüïπéèπü╛πüÖ",
   ex:{jp:"πü¿πééπüáπüíπü½πÇÇπü╗πéôπéÆπÇÇπüïπéèπü╛πüÖπÇé",en:"I borrow a book from my friend.",ta:"α«¿α«╛α«⌐α»ì α«¿α«úα»ìα«¬α«░α«┐α«ƒα««α»ì α«çα«░α»üα«¿α»ìα«ñα»ü α«¬α»üα«ñα»ìα«ñα«òα««α»ì α«òα«ƒα«⌐α»ì α«╡α«╛α«Öα»ìα«òα»üα«òα«┐α«▒α»çα«⌐α»ì."}},
 ]},
{id:8,jp:"πüïπü£πüîπÇÇπüñπéêπüäπüºπüÖπü¡",en:"The wind is strong, isn't it",ta:"α«òα«╛α«▒α»ìα«▒α»ü α«╡α«▓α«┐α««α»êα«»α«╛α«ò α«ëα«│α»ìα«│α«ñα»ü, α«çα«▓α»ìα«▓α»êα«»α«╛",
 vocab:[
  {jp:"πüèπüèπüìπüä",r:"ookii",en:"big",ta:"α«¬α»åα«░α«┐α«»α«ñα»ü"},
  {jp:"πüíπüäπüòπüä",r:"chiisai",en:"small",ta:"α«Üα«┐α«▒α«┐α«»α«ñα»ü"},
  {jp:"πüéπüƒπéëπüùπüä",r:"atarashii",en:"new",ta:"α«¬α»üα«ñα«┐α«»α«ñα»ü"},
  {jp:"πü╡πéïπüä",r:"furui",en:"old (things)",ta:"α«¬α«┤α»êα«»α«ñα»ü"},
  {jp:"πüäπüä",r:"ii",en:"good",ta:"α«¿α«▓α»ìα«▓α«ñα»ü"},
 ],
 grammar:[
  {t:"πüä-adjective + Noun",en:"πüä-adjectives modify nouns directly",ta:"πüä-α«òα»üα«úα«╡α«┐α«⌐α»êα«»α«ƒα»êα«òα«│α»ì α«¿α»çα«░α«ƒα«┐α«»α«╛α«ò α«¬α»åα«»α«░α»ìα«Üα»ìα«Üα»èα«▓α»ìα«▓α»ê α««α«╛α«▒α»ìα«▒α«┐α«»α««α»êα«òα»ìα«òα»üα««α»ì",
   form:"πüä-adj + Noun",
   ex:{jp:"πüèπüèπüìπüäπÇÇπüäπüêπüºπüÖπÇé",en:"It's a big house.",ta:"α«çα«ñα»ü α«Æα«░α»ü α«¬α»åα«░α«┐α«» α«╡α»Çα«ƒα»ü."}},
  {t:"∩╜₧πü¡",en:"πü¡ seeks agreement ('isn't it')",ta:"πü¡ α«Æα«¬α»ìα«¬α»üα«ñα«▓α»ê α«¿α«╛α«ƒα»üα«òα«┐α«▒α«ñα»ü",
   form:"Sentence + πü¡",
   ex:{jp:"πüìπéçπüåπü»πÇÇπüéπüñπüäπüºπüÖπü¡πÇé",en:"It's hot today, isn't it.",ta:"α«çα«⌐α»ìα«▒α»ü α«╡α»åα«¬α»ìα«¬α««α«╛α«ò α«ëα«│α»ìα«│α«ñα»ü, α«çα«▓α»ìα«▓α»êα«»α«╛."}},
 ]},
{id:9,jp:"πéÅπüƒπüùπü»πÇÇπüäπü¼πüîπÇÇπüÖπüìπüºπüÖ",en:"I like dogs",ta:"α«Äα«⌐α«òα»ìα«òα»ü α«¿α«╛α«»α»ìα«òα«│α»ì α«¬α«┐α«ƒα«┐α«òα»ìα«òα»üα««α»ì",
 vocab:[
  {jp:"πüÖπüìπüºπüÖ",r:"suki desu",en:"to like",ta:"α«¬α«┐α«ƒα«┐α«òα»ìα«òα»üα««α»ì"},
  {jp:"πüìπéëπüäπüºπüÖ",r:"kirai desu",en:"to dislike",ta:"α«¬α«┐α«ƒα«┐α«òα»ìα«òα«╛α«ñα»ü"},
  {jp:"πüÿπéçπüåπüÜπüºπüÖ",r:"jouzu desu",en:"good at",ta:"α«ñα«┐α«▒α««α»êα«»α«╛α«⌐α«╡α«░α»ì"},
  {jp:"πü╕πüƒπüºπüÖ",r:"heta desu",en:"poor at",ta:"α«ñα«┐α«▒α««α»êα«»α«▒α»ìα«▒α«╡α«░α»ì"},
  {jp:"πéèπéçπüåπéè",r:"ryouri",en:"cooking",ta:"α«Üα««α»êα«»α«▓α»ì"},
 ],
 grammar:[
  {t:"∩╜₧πüîπÇÇπüÖπüì∩╝Åπüìπéëπüä∩╝ÅπüÿπéçπüåπüÜ",en:"πüî marks the object of feeling/ability adjectives",ta:"α«ëα«úα«░α»ìα«╡α»ü/α«ñα«┐α«▒α««α»ê α«¬α»åα«»α«░α«ƒα»êα«òα«│α»üα«ƒα«⌐α»ì πüî α«¬α«»α«⌐α»ìα«¬α«ƒα»üα«ñα»ìα«ñα«¬α»ìα«¬α«ƒα»üα«òα«┐α«▒α«ñα»ü",
   form:"Noun + πüî + πüÖπüìπüºπüÖ",
   ex:{jp:"πéÅπüƒπüùπü»πÇÇπéèπéçπüåπéèπüîπÇÇπüÿπéçπüåπüÜπüºπüÖπÇé",en:"I am good at cooking.",ta:"α«¿α«╛α«⌐α»ì α«Üα««α»êα«»α«▓α«┐α«▓α»ì α«ñα«┐α«▒α««α»êα«»α«╛α«⌐α«╡α«⌐α»ì."}},
 ]},
{id:10,jp:"πüñπüÅπüêπü«πÇÇπüåπüêπü½πÇÇπü¡πüôπüîπÇÇπüäπü╛πüÖ",en:"There is a cat on the desk",ta:"α««α»çα«Üα»êα«»α«┐α«⌐α»ì α««α»çα«▓α»ì α«Æα«░α»ü α«¬α»éα«⌐α»ê α«çα«░α»üα«òα»ìα«òα«┐α«▒α«ñα»ü",
 vocab:[
  {jp:"πüäπü╛πüÖ",r:"imasu",en:"there is (living things)",ta:"α«çα«░α»üα«òα»ìα«òα«┐α«▒α«ñα»ü (α«ëα«»α«┐α«░α«┐α«⌐α«Öα»ìα«òα«│α»ì)"},
  {jp:"πüéπéèπü╛πüÖ",r:"arimasu",en:"there is (non-living things)",ta:"α«çα«░α»üα«òα»ìα«òα«┐α«▒α«ñα»ü (α«ëα«»α«┐α«░α«▒α»ìα«▒α«╡α»ê)"},
  {jp:"πüåπüê",r:"ue",en:"on top of / above",ta:"α««α»çα«▓α»ç"},
  {jp:"πüùπüƒ",r:"shita",en:"under / below",ta:"α«òα»Çα«┤α»ç"},
  {jp:"πü¬πüï",r:"naka",en:"inside",ta:"α«ëα«│α»ìα«│α»ç"},
 ],
 grammar:[
  {t:"σá┤µëÇπü½πÇÇNoun πüîπÇÇπüäπü╛πüÖ∩╝Åπüéπéèπü╛πüÖ",en:"existence sentence pattern",ta:"α«çα«░α»üα«¬α»ìα«¬α«ñα»êα«òα»ì α«òα»üα«▒α«┐α«òα»ìα«òα»üα««α»ì α«╡α«╛α«òα»ìα«òα«┐α«» α«àα««α»êα«¬α»ìα«¬α»ü",
   form:"Place + πü½ + Noun + πüî + πüäπü╛πüÖ/πüéπéèπü╛πüÖ",
   ex:{jp:"πüñπüÅπüêπü«πÇÇπüåπüêπü½πÇÇπü╗πéôπüîπÇÇπüéπéèπü╛πüÖπÇé",en:"There is a book on the desk.",ta:"α««α»çα«Üα»êα«»α«┐α«⌐α»ì α««α»çα«▓α»ì α«¬α»üα«ñα»ìα«ñα«òα««α»ì α«çα«░α»üα«òα»ìα«òα«┐α«▒α«ñα»ü."}},
 ]},
{id:11,jp:"πéèπéôπüöπéÆπÇÇπü┐πüúπüñπÇÇπüÅπüáπüòπüä",en:"Please give me three apples",ta:"α«ñα«»α«╡α»üα«Üα»åα«»α»ìα«ñα»ü α««α»éα«⌐α»ìα«▒α»ü α«åα«¬α»ìα«¬α«┐α«│α»ì α«ñα«╛α«░α»üα«Öα»ìα«òα«│α»ì",
 vocab:[
  {jp:"πü▓πü¿πüñ∩╝Åπü╡πüƒπüñ∩╝Åπü┐πüúπüñ",r:"hitotsu/futatsu/mittsu",en:"one/two/three (items)",ta:"α«Æα«⌐α»ìα«▒α»ü/α«çα«░α«úα»ìα«ƒα»ü/α««α»éα«⌐α»ìα«▒α»ü (α«¬α»èα«░α»üα«ƒα»ìα«òα«│α»ì)"},
  {jp:"∩╜₧πüêπéô",r:"~en",en:"~ yen",ta:"~ α«»α»åα«⌐α»ì"},
  {jp:"πü£πéôπü╢πüº",r:"zenbu de",en:"in total",ta:"α««α»èα«ñα»ìα«ñα««α«╛α«ò"},
  {jp:"πüÅπüáπüòπüä",r:"kudasai",en:"please give me",ta:"α«ñα«»α«╡α»üα«Üα»åα«»α»ìα«ñα»ü α«òα»èα«ƒα»üα«Öα»ìα«òα«│α»ì"},
  {jp:"πéèπéôπüö",r:"ringo",en:"apple",ta:"α«åα«¬α»ìα«¬α«┐α«│α»ì"},
 ],
 grammar:[
  {t:"µò░ΘçÅ + πüÅπüáπüòπüä",en:"quantity + πüÅπüáπüòπüä (please give X of these)",ta:"α«àα«│α«╡α»ü + πüÅπüáπüòπüä (α«ñα«»α«╡α»üα«Üα»åα«»α»ìα«ñα»ü α«çα«╡α»ìα«╡α«│α«╡α»ü α«ñα«╛α«░α»üα«Öα»ìα«òα«│α»ì)",
   form:"Noun + πéÆ + Number + πüÅπüáπüòπüä",
   ex:{jp:"πü┐πüïπéôπéÆπÇÇπü╡πüƒπüñπÇÇπüÅπüáπüòπüäπÇé",en:"Please give me two mandarins.",ta:"α«ñα«»α«╡α»üα«Üα»åα«»α»ìα«ñα»ü α«çα«░α«úα»ìα«ƒα»ü α«åα«░α«₧α»ìα«Üα»ü α«ñα«╛α«░α»üα«Öα»ìα«òα«│α»ì."}},
 ]},
{id:12,jp:"πüƒπéôπüÿπéçπüåπü│πü»πÇÇπüäπüñπüºπüÖπüï",en:"When is your birthday?",ta:"α«ëα«Öα»ìα«òα«│α»ì α«¬α«┐α«▒α«¿α»ìα«ñα«¿α«╛α«│α»ì α«Äα«¬α»ìα«¬α»ïα«ñα»ü?",
 vocab:[
  {jp:"πüäπüñ",r:"itsu",en:"when",ta:"α«Äα«¬α»ìα«¬α»ïα«ñα»ü"},
  {jp:"πüƒπéôπüÿπéçπüåπü│",r:"tanjoubi",en:"birthday",ta:"α«¬α«┐α«▒α«¿α»ìα«ñα«¿α«╛α«│α»ì"},
  {jp:"πüìπéçπü¡πéô",r:"kyonen",en:"last year",ta:"α«òα«ƒα«¿α»ìα«ñ α«╡α«░α»üα«ƒα««α»ì"},
  {jp:"πéëπüäπü¡πéô",r:"rainen",en:"next year",ta:"α«àα«ƒα»üα«ñα»ìα«ñ α«╡α«░α»üα«ƒα««α»ì"},
  {jp:"πüƒπüïπüä",r:"takai",en:"expensive / tall",ta:"α«╡α«┐α«▓α»ê α«ëα«»α«░α»ìα«¿α»ìα«ñ / α«ëα«»α«░α««α«╛α«⌐"},
 ],
 grammar:[
  {t:"πüä-adj past/negative",en:"πüä-adjective conjugation: past & negative",ta:"πüä-α«òα»üα«úα«╡α«┐α«⌐α»êα«»α«ƒα»ê: α«òα«ƒα«¿α»ìα«ñ α«òα«╛α«▓α««α»ì & α««α«▒α»üα«¬α»ìα«¬α»ü",
   form:"~πüä ΓåÆ ~πüïπüúπüƒπüºπüÖ∩╝Å∩╜₧πüÅπü¬πüäπüºπüÖ",
   ex:{jp:"πüìπü«πüåπü»πÇÇπüòπéÇπüïπüúπüƒπüºπüÖπÇé",en:"It was cold yesterday.",ta:"α«¿α»çα«▒α»ìα«▒α»ü α«òα»üα«│α«┐α«░α«╛α«ò α«çα«░α»üα«¿α»ìα«ñα«ñα»ü."}},
 ]},
{id:13,jp:"πü½πü╗πéôπéèπéçπüåπéèπüîπÇÇπüƒπü╣πüƒπüäπüºπüÖ",en:"I want to eat Japanese food",ta:"α«Äα«⌐α«òα»ìα«òα»ü α«£α«¬α»ìα«¬α«╛α«⌐α«┐α«» α«ëα«úα«╡α»ü α«Üα«╛α«¬α»ìα«¬α«┐α«ƒ α«╡α»çα«úα»ìα«ƒα»üα««α»ì",
 vocab:[
  {jp:"∩╜₧πüƒπüäπüºπüÖ",r:"~tai desu",en:"want to do ~",ta:"~ α«Üα»åα«»α»ìα«» α«╡α»çα«úα»ìα«ƒα»üα««α»ì"},
  {jp:"πüèπéôπü¢πéô",r:"onsen",en:"hot spring",ta:"α«Üα»éα«ƒα«╛α«⌐ α«¿α»Çα«░α»éα«▒α»ìα«▒α»ü"},
  {jp:"πüåπü┐",r:"umi",en:"sea",ta:"α«òα«ƒα«▓α»ì"},
  {jp:"πéäπü╛",r:"yama",en:"mountain",ta:"α««α«▓α»ê"},
  {jp:"πéèπéçπüôπüå",r:"ryokou",en:"travel/trip",ta:"α«¬α«»α«úα««α»ì"},
 ],
 grammar:[
  {t:"Verb stem + πüƒπüäπüºπüÖ",en:"expressing a desire to do something",ta:"α«Åα«ñα»çα«⌐α»üα««α»ì α«Üα»åα«»α»ìα«» α«╡α»çα«úα»ìα«ƒα»üα««α»ì α«Äα«⌐α»ìα«▒ α«åα«Üα»êα«»α»ê α«╡α»åα«│α«┐α«¬α»ìα«¬α«ƒα»üα«ñα»ìα«ñα»üα«ñα«▓α»ì",
   form:"Verb stem + πüƒπüäπüºπüÖ",
   ex:{jp:"πü½πü╗πéôπü╕πÇÇπüäπüìπüƒπüäπüºπüÖπÇé",en:"I want to go to Japan.",ta:"α«Äα«⌐α«òα»ìα«òα»ü α«£α«¬α»ìα«¬α«╛α«⌐α»ì α«Üα»åα«▓α»ìα«▓ α«╡α»çα«úα»ìα«ƒα»üα««α»ì."}},
  {t:"∩╜₧πü╛πü¢πéôπüï",en:"won't you ~? (invitation)",ta:"~ α«Üα»åα«»α»ìα«» α««α«╛α«ƒα»ìα«ƒα»Çα«░α»ìα«òα«│α«╛? (α«àα«┤α»êα«¬α»ìα«¬α»ü)",
   form:"Verb stem + πü╛πü¢πéôπüï",
   ex:{jp:"πüäπüúπüùπéçπü½πÇÇπüäπüìπü╛πü¢πéôπüïπÇé",en:"Won't you go together with me?",ta:"α«Äα«⌐α»ìα«⌐α»üα«ƒα«⌐α»ì α«╡α«░α»üα«òα«┐α«▒α»Çα«░α»ìα«òα«│α«╛?"}},
 ]},
{id:14,jp:"πüÖπü┐πü╛πü¢πéôπüîπÇüπüùπéâπüùπéôπéÆπÇÇπü¿πüúπüªπÇÇπüÅπüáπüòπüä",en:"Excuse me, please take a photo",ta:"α««α«⌐α»ìα«⌐α«┐α«òα»ìα«òα«╡α»üα««α»ì, α«¬α»üα«òα»êα«¬α»ìα«¬α«ƒα««α»ì α«Äα«ƒα»üα«ñα»ìα«ñα»üα«òα»ì α«òα»èα«ƒα»üα«Öα»ìα«òα«│α»ì",
 vocab:[
  {jp:"πü╛πüúπüª",r:"matte",en:"wait (πüª-form)",ta:"α«òα«╛α«ñα»ìα«ñα«┐α«░α»üα«Öα»ìα«òα«│α»ì"},
  {jp:"πü┐πüª",r:"mite",en:"look (πüª-form)",ta:"α«¬α«╛α«░α»üα«Öα»ìα«òα«│α»ì"},
  {jp:"πüìπüäπüª",r:"kiite",en:"listen (πüª-form)",ta:"α«òα»çα«│α»üα«Öα»ìα«òα«│α»ì"},
  {jp:"πü»πü¬πüùπüª",r:"hanashite",en:"speak (πüª-form)",ta:"α«¬α»çα«Üα»üα«Öα»ìα«òα«│α»ì"},
  {jp:"πüÖπü┐πü╛πü¢πéô",r:"sumimasen",en:"excuse me / sorry",ta:"α««α«⌐α»ìα«⌐α«┐α«òα»ìα«òα«╡α»üα««α»ì"},
 ],
 grammar:[
  {t:"∩╜₧πüªπÇÇπüÅπüáπüòπüä",en:"please do ~ (request)",ta:"α«ñα«»α«╡α»üα«Üα»åα«»α»ìα«ñα»ü ~ α«Üα»åα«»α»ìα«»α»üα«Öα»ìα«òα«│α»ì (α«òα»ïα«░α«┐α«òα»ìα«òα»ê)",
   form:"Verb πüª-form + πüÅπüáπüòπüä",
   ex:{jp:"πüôπüôπü½πÇÇπü¬πü╛πüêπéÆπÇÇπüïπüäπüªπÇÇπüÅπüáπüòπüäπÇé",en:"Please write your name here.",ta:"α«çα«Öα»ìα«òα»ç α«ëα«Öα»ìα«òα«│α»ì α«¬α»åα«»α«░α»ê α«Äα«┤α»üα«ñα»üα«Öα»ìα«òα«│α»ì."}},
 ]},
{id:15,jp:"πüäπü╛πÇüπüºπéôπéÅπéÆπÇÇπüùπüªπÇÇπüäπü╛πüÖ",en:"I am on the phone right now",ta:"α«¿α«╛α«⌐α»ì α«çα«¬α»ìα«¬α»ïα«ñα»ü α«ñα»èα«▓α»êα«¬α»çα«Üα«┐α«»α«┐α«▓α»ì α«¬α»çα«Üα«┐α«òα»ìα«òα»èα«úα»ìα«ƒα«┐α«░α»üα«òα»ìα«òα«┐α«▒α»çα«⌐α»ì",
 vocab:[
  {jp:"∩╜₧πüªπÇÇπüäπü╛πüÖ",r:"~te imasu",en:"is doing ~ (ongoing action)",ta:"~ α«Üα»åα«»α»ìα«ñα»ü α«òα»èα«úα»ìα«ƒα«┐α«░α»üα«òα»ìα«òα«┐α«▒α»çα«⌐α»ì"},
  {jp:"πüÖπéôπüºπÇÇπüäπü╛πüÖ",r:"sunde imasu",en:"lives (state)",ta:"α«╡α«Üα«┐α«òα»ìα«òα«┐α«▒α«╛α«░α»ì"},
  {jp:"πüæπüúπüôπéôπüùπüªπÇÇπüäπü╛πüÖ",r:"kekkon shite imasu",en:"is married",ta:"α«ñα«┐α«░α»üα««α«úα««α«╛α«⌐α«╡α«░α»ì"},
  {jp:"πüñπü¿πéüπüªπÇÇπüäπü╛πüÖ",r:"tsutomete imasu",en:"works for (a company)",ta:"α«¬α«úα«┐α«¬α»üα«░α«┐α«òα«┐α«▒α«╛α«░α»ì"},
  {jp:"πüºπéôπéÅ",r:"denwa",en:"telephone",ta:"α«ñα»èα«▓α»êα«¬α»çα«Üα«┐"},
 ],
 grammar:[
  {t:"∩╜₧πüªπÇÇπüäπü╛πüÖ∩╝êσïòΣ╜£πü«ΘÇ▓Φíî∩╝ë",en:"ongoing action: is ~ing",ta:"α«¿α«ƒα«¿α»ìα«ñα»üα«òα»èα«úα»ìα«ƒα«┐α«░α»üα«òα»ìα«òα»üα««α»ì α«Üα»åα«»α«▓α»ì",
   form:"Verb πüª-form + πüäπü╛πüÖ",
   ex:{jp:"πüéπéüπüîπÇÇπü╡πüúπüªπÇÇπüäπü╛πüÖπÇé",en:"It is raining.",ta:"α««α«┤α»ê α«¬α»åα«»α»ìα«ñα»ü α«òα»èα«úα»ìα«ƒα«┐α«░α»üα«òα»ìα«òα«┐α«▒α«ñα»ü."}},
  {t:"∩╜₧πüªπÇÇπüäπü╛πüÖ∩╝êτè╢µàï∩╝ë",en:"ongoing state: lives/works/is married",ta:"α«ñα»èα«ƒα«░α»ìα«Üα»ìα«Üα«┐α«»α«╛α«⌐ α«¿α«┐α«▓α»ê",
   form:"Verb πüª-form + πüäπü╛πüÖ",
   ex:{jp:"πü¿πüåπüìπéçπüåπü½πÇÇπüÖπéôπüºπÇÇπüäπü╛πüÖπÇé",en:"I live in Tokyo.",ta:"α«¿α«╛α«⌐α»ì α«ƒα»ïα«òα»ìα«òα«┐α«»α»ïα«╡α«┐α«▓α»ì α«╡α«Üα«┐α«òα»ìα«òα«┐α«▒α»çα«⌐α»ì."}},
 ]},
{id:16,jp:"πüùπéàπüÅπüáπüäπéÆπÇÇπüùπü¬πüæπéîπü░πÇÇπü¬πéèπü╛πü¢πéô",en:"I must do my homework",ta:"α«¿α«╛α«⌐α»ì α«╡α»Çα«ƒα»ìα«ƒα»üα«¬α»ìα«¬α«╛α«ƒα««α»ì α«Üα»åα«»α»ìα«» α«╡α»çα«úα»ìα«ƒα»üα««α»ì",
 vocab:[
  {jp:"πüùπéàπüÅπüáπüä",r:"shukudai",en:"homework",ta:"α«╡α»Çα«ƒα»ìα«ƒα»üα«¬α»ìα«¬α«╛α«ƒα««α»ì"},
  {jp:"πéäπüÖπü┐πü╛πüÖ",r:"yasumimasu",en:"to rest/take a day off",ta:"α«ôα«»α»ìα«╡α»åα«ƒα»üα«ñα»ìα«ñα«▓α»ì"},
  {jp:"πüñπüïπüäπü╛πüÖ",r:"tsukaimasu",en:"to use",ta:"α«¬α«»α«⌐α»ìα«¬α«ƒα»üα«ñα»ìα«ñα»üα«ñα«▓α»ì"},
  {jp:"πüéπéïπüìπü╛πüÖ",r:"arukimasu",en:"to walk",ta:"α«¿α«ƒα«ñα»ìα«ñα«▓α»ì"},
  {jp:"πâæπé╣πâ¥πâ╝πâê",r:"pasupo-to",en:"passport",ta:"α«òα«ƒα«╡α»üα«Üα»ìα«Üα»Çα«ƒα»ìα«ƒα»ü"},
 ],
 grammar:[
  {t:"∩╜₧πü¬πüæπéîπü░πÇÇπü¬πéèπü╛πü¢πéô",en:"must do ~ (obligation)",ta:"~ α«Üα»åα«»α»ìα«»α«╡α»çα«úα»ìα«ƒα»üα««α»ì (α«òα«ƒα««α»ê)",
   form:"Verb πü¬πüä-form (-πü¬πüäΓåÆ-πü¬πüæπéîπü░) + πü¬πéèπü╛πü¢πéô",
   ex:{jp:"πüéπüùπüƒπÇÇπü»πéäπüÅπÇÇπüèπüìπü¬πüæπéîπü░πÇÇπü¬πéèπü╛πü¢πéôπÇé",en:"I must get up early tomorrow.",ta:"α«¿α«╛α«│α»ê α«¿α«╛α«⌐α»ì α«àα«ñα«┐α«òα«╛α«▓α»êα«»α«┐α«▓α»ì α«Äα«┤α«╡α»çα«úα»ìα«ƒα»üα««α»ì."}},
  {t:"∩╜₧πü¬πüÅπüªπééπÇÇπüäπüäπüºπüÖ",en:"don't have to do ~",ta:"~ α«Üα»åα«»α»ìα«» α«╡α»çα«úα»ìα«ƒα«┐α«»α«ñα«┐α«▓α»ìα«▓α»ê",
   form:"Verb πü¬πüä-form + πü¬πüÅπüªπéé πüäπüäπüºπüÖ",
   ex:{jp:"πüìπéçπüåπü»πÇÇπüôπü¬πüÅπüªπééπÇÇπüäπüäπüºπüÖπÇé",en:"You don't have to come today.",ta:"α«çα«⌐α»ìα«▒α»ü α«╡α«░ α«╡α»çα«úα»ìα«ƒα«┐α«»α«ñα«┐α«▓α»ìα«▓α»ê."}},
 ]},
{id:17,jp:"πâöπéóπâÄπüîπÇÇπü▓πüæπü╛πüÖ",en:"I can play the piano",ta:"α«Äα«⌐α«òα»ìα«òα»ü α«¬α«┐α«»α«╛α«⌐α»ï α«╡α«╛α«Üα«┐α«òα»ìα«òα«ñα»ì α«ñα»åα«░α«┐α«»α»üα««α»ì",
 vocab:[
  {jp:"πü▓πüæπü╛πüÖ",r:"hikemasu",en:"can play (piano)",ta:"α«╡α«╛α«Üα«┐α«òα»ìα«ò α««α»üα«ƒα«┐α«»α»üα««α»ì"},
  {jp:"πüèπéêπüÆπü╛πüÖ",r:"oyogemasu",en:"can swim",ta:"α«¿α»Çα«¿α»ìα«ñ α««α»üα«ƒα«┐α«»α»üα««α»ì"},
  {jp:"πüåπéôπüªπéô",r:"unten",en:"driving",ta:"α«ôα«ƒα»ìα«ƒα»üα«ñα«▓α»ì"},
  {jp:"πüùπéàπü┐",r:"shumi",en:"hobby",ta:"α«¬α»èα«┤α»üα«ñα»üα«¬α»ïα«òα»ìα«òα»ü"},
  {jp:"πüÿπéàπüå",r:"jiyuu",en:"free (time)",ta:"α«ôα«»α»ìα«╡α»ü α«¿α»çα«░α««α»ì"},
 ],
 grammar:[
  {t:"Φ╛₧µ¢╕σ╜ó∩╝êDictionary form)",en:"the plain/dictionary form of verbs",ta:"α«╡α«┐α«⌐α»êα«Üα»ìα«Üα»èα«▓α»ìα«▓α«┐α«⌐α»ì α«àα«òα«░α«╛α«ñα«┐ α«╡α«ƒα«┐α«╡α««α»ì",
   form:"πü╛πüÖ-form ΓåÆ dictionary form",
   ex:{jp:"πüƒπü╣πü╛πüÖ ΓåÆ πüƒπü╣πéï",en:"eat (polite) ΓåÆ eat (plain)",ta:"α«Üα«╛α«¬α»ìα«¬α«┐α«ƒα»üα«ñα«▓α»ì (α«¬α«úα«┐α«╡α«╛α«⌐) ΓåÆ α«Üα«╛α«¬α»ìα«¬α«┐α«ƒα»üα«ñα«▓α»ì (α«Äα«│α«┐α«»)"}},
  {t:"Φ╛₧µ¢╕σ╜ó∩╝ïπüôπü¿πüîπÇÇπüºπüìπü╛πüÖ",en:"can do ~ (ability/possibility)",ta:"~ α«Üα»åα«»α»ìα«» α««α»üα«ƒα«┐α«»α»üα««α»ì (α«ñα«┐α«▒α««α»ê)",
   form:"Verb dictionary form + πüôπü¿πüî πüºπüìπü╛πüÖ",
   ex:{jp:"πéÅπüƒπüùπü»πÇÇπüåπéôπüªπéôπüîπÇÇπüºπüìπü╛πüÖπÇé",en:"I can drive.",ta:"α«Äα«⌐α«òα»ìα«òα»ü α«ôα«ƒα»ìα«ƒ α««α»üα«ƒα«┐α«»α»üα««α»ì."}},
 ]},
{id:18,jp:"πüÿπüùπéçπéÆπÇÇπééπüúπüªπÇÇπüìπüªπÇÇπüÅπüáπüòπüä",en:"Please bring a dictionary",ta:"α«ñα«»α«╡α»üα«Üα»åα«»α»ìα«ñα»ü α«àα«òα«░α«╛α«ñα«┐ α«òα»èα«úα»ìα«ƒα»ü α«╡α«╛α«░α»üα«Öα»ìα«òα«│α»ì",
 vocab:[
  {jp:"πüÿπüùπéç",r:"jisho",en:"dictionary",ta:"α«àα«òα«░α«╛α«ñα«┐"},
  {jp:"πü╛πüêπü½",r:"mae ni",en:"before ~ing",ta:"~ α««α»üα«⌐α»ìα«¬α»ü"},
  {jp:"πüéπü¿πüº",r:"ato de",en:"after ~ing",ta:"~ α«¬α«┐α«⌐α»ìα«¬α»ü"},
  {jp:"πüæπüäπüïπüÅ",r:"keikaku",en:"plan",ta:"α«ñα«┐α«ƒα»ìα«ƒα««α»ì"},
  {jp:"πéäπüÅπü¥πüÅ",r:"yakusoku",en:"promise/appointment",ta:"α«╡α«╛α«òα»ìα«òα»üα«▒α»üα«ñα«┐"},
 ],
 grammar:[
  {t:"Φ╛₧µ¢╕σ╜ó∩╝ïπü╛πüêπü½",en:"before doing ~",ta:"~ α«Üα»åα«»α»ìα«╡α«ñα«▒α»ìα«òα»ü α««α»üα«⌐α»ì",
   form:"Verb dictionary form + πü╛πüêπü½",
   ex:{jp:"πü¡πéïπÇÇπü╛πüêπü½πÇÇπü╗πéôπéÆπÇÇπéêπü┐πü╛πüÖπÇé",en:"I read a book before sleeping.",ta:"α«ñα»éα«Öα»ìα«òα»üα«╡α«ñα«▒α»ìα«òα»ü α««α»üα«⌐α»ì α«¿α«╛α«⌐α»ì α«¬α»üα«ñα»ìα«ñα«òα««α»ì α«¬α«ƒα«┐α«òα»ìα«òα«┐α«▒α»çα«⌐α»ì."}},
 ]},
{id:19,jp:"πüùπéâπüùπéôπéÆπÇÇπü¿πéëπü¬πüäπüºπÇÇπüÅπüáπüòπüä",en:"Please don't take photos",ta:"α«ñα«»α«╡α»üα«Üα»åα«»α»ìα«ñα»ü α«¬α»üα«òα»êα«¬α»ìα«¬α«ƒα««α»ì α«Äα«ƒα»üα«òα»ìα«òα«╛α«ñα»Çα«░α»ìα«òα«│α»ì",
 vocab:[
  {jp:"πü¬πüäσ╜ó",r:"nai-kei",en:"negative (nai) form",ta:"α««α«▒α»üα«¬α»ìα«¬α»ü α«╡α«ƒα«┐α«╡α««α»ì"},
  {jp:"πüùπéôπü▒πüäπüùπü╛πüÖ",r:"shinpai shimasu",en:"to worry",ta:"α«òα«╡α«▓α»êα«¬α»ìα«¬α«ƒα»üα«ñα«▓α»ì"},
  {jp:"πüìπüæπéô",r:"kiken",en:"dangerous",ta:"α«åα«¬α«ñα»ìα«ñα«╛α«⌐α«ñα»ü"},
  {jp:"πüíπéàπüåπüä",r:"chuui",en:"caution",ta:"α«Äα«Üα»ìα«Üα«░α«┐α«òα»ìα«òα»ê"},
  {jp:"πü│πéçπüåπüäπéô",r:"byouin",en:"hospital",ta:"α««α«░α»üα«ñα»ìα«ñα»üα«╡α««α«⌐α»ê"},
 ],
 grammar:[
  {t:"∩╜₧πü¬πüäπüºπÇÇπüÅπüáπüòπüä",en:"please don't do ~",ta:"α«ñα«»α«╡α»üα«Üα»åα«»α»ìα«ñα»ü ~ α«Üα»åα«»α»ìα«»α«╛α«ñα»Çα«░α»ìα«òα«│α»ì",
   form:"Verb πü¬πüä-form + πü¬πüäπüº πüÅπüáπüòπüä",
   ex:{jp:"πüôπüôπü½πÇÇπüÅπéïπü╛πéÆπÇÇπü¿πéüπü¬πüäπüºπÇÇπüÅπüáπüòπüäπÇé",en:"Please don't park the car here.",ta:"α«çα«Öα»ìα«òα»ç α«òα«╛α«░α»ê α«¿α«┐α«▒α»üα«ñα»ìα«ñα«╛α«ñα»Çα«░α»ìα«òα«│α»ì."}},
 ]},
{id:20,jp:"πéëπüäπüùπéàπüåπÇÇπüùπüæπéôπüîπÇÇπüéπéïπü¿πÇÇπüèπééπüäπü╛πüÖ",en:"I think there is a test next week",ta:"α«àα«ƒα»üα«ñα»ìα«ñ α«╡α«╛α«░α««α»ì α«ñα»çα«░α»ìα«╡α»ü α«çα«░α»üα«òα»ìα«òα»üα««α»ì α«Äα«⌐α»ìα«▒α»ü α«¿α«┐α«⌐α»êα«òα»ìα«òα«┐α«▒α»çα«⌐α»ì",
 vocab:[
  {jp:"∩╜₧πü¿πÇÇπüèπééπüäπü╛πüÖ",r:"~to omoimasu",en:"I think that ~",ta:"~ α«Äα«⌐α»ìα«▒α»ü α«¿α«┐α«⌐α»êα«òα»ìα«òα«┐α«▒α»çα«⌐α»ì"},
  {jp:"∩╜₧πü¿πÇÇπüäπüäπü╛πüÖ",r:"~to iimasu",en:"says that ~",ta:"~ α«Äα«⌐α»ìα«▒α»ü α«Üα»èα«▓α»ìα«òα«┐α«▒α«╛α«░α»ì"},
  {jp:"πüùπüæπéô",r:"shiken",en:"exam",ta:"α«ñα»çα«░α»ìα«╡α»ü"},
  {jp:"πü½πéàπüåπüîπüÅπüùπüì",r:"nyuugakushiki",en:"entrance ceremony",ta:"α«¿α»üα«┤α»êα«╡α»ü α«╡α«┐α«┤α«╛"},
  {jp:"πüƒπü╢πéô",r:"tabun",en:"probably",ta:"α«Æα«░α»üα«╡α»çα«│α»ê"},
 ],
 grammar:[
  {t:"µÖ«ΘÇÜσ╜ó∩╝ïπü¿πÇÇπüèπééπüäπü╛πüÖ",en:"I think that ~ (plain form + πü¿ πüèπééπüäπü╛πüÖ)",ta:"α«¿α«╛α«⌐α»ì ~ α«Äα«⌐α»ìα«▒α»ü α«¿α«┐α«⌐α»êα«òα»ìα«òα«┐α«▒α»çα«⌐α»ì",
   form:"Plain form + πü¿ πüèπééπüäπü╛πüÖ",
   ex:{jp:"πüéπüùπüƒπÇÇπüéπéüπüîπÇÇπü╡πéïπü¿πÇÇπüèπééπüäπü╛πüÖπÇé",en:"I think it will rain tomorrow.",ta:"α«¿α«╛α«│α»ê α««α«┤α»ê α«¬α»åα«»α»ìα«»α»üα««α»ì α«Äα«⌐α»ìα«▒α»ü α«¿α«┐α«⌐α»êα«òα»ìα«òα«┐α«▒α»çα«⌐α»ì."}},
 ]},
{id:21,jp:"πüïπüäπüÄπüùπüñπü½πÇÇπüáπéîπüïπÇÇπüäπü╛πüÖπüï",en:"Is anyone in the meeting room?",ta:"α«òα»éα«ƒα»ìα«ƒ α«àα«▒α»êα«»α«┐α«▓α»ì α«»α«╛α«░α«╛α«╡α«ñα»ü α«çα«░α»üα«òα»ìα«òα«┐α«▒α«╛α«░α»ìα«òα«│α«╛?",
 vocab:[
  {jp:"πüáπéîπüï",r:"dareka",en:"someone",ta:"α«»α«╛α«░α«╛α«╡α«ñα»ü"},
  {jp:"πü¬πü½πüï",r:"nanika",en:"something",ta:"α«Åα«ñα«╛α«╡α«ñα»ü"},
  {jp:"πüïπüäπüÄ",r:"kaigi",en:"meeting",ta:"α«òα»éα«ƒα»ìα«ƒα««α»ì"},
  {jp:"πüìπéôπüêπéô",r:"kin\u2019en",en:"no smoking",ta:"α«¬α»üα«òα»êα«¬α«┐α«ƒα«┐α«òα»ìα«ò α«òα»éα«ƒα«╛α«ñα»ü"},
  {jp:"πéôπüºπüÖ",r:"n desu",en:"explanatory 'you see...'",ta:"α«╡α«┐α«│α«òα»ìα«ò α«╡α«ƒα«┐α«╡α««α»ì"},
 ],
 grammar:[
  {t:"µÖ«ΘÇÜσ╜ó∩╝ïπéôπüºπüÖ",en:"explanatory tone: giving a reason/context",ta:"α«òα«╛α«░α«úα«ñα»ìα«ñα»ê α«╡α«┐α«│α«òα»ìα«òα»üα««α»ì α«ñα»èα«⌐α«┐",
   form:"Plain form + πéôπüºπüÖ",
   ex:{jp:"πü⌐πüåπüùπüªπÇÇπüèπüÅπéîπüƒπéôπüºπüÖπüïπÇé",en:"Why were you late? (seeking explanation)",ta:"α«Åα«⌐α»ì α«ñα«╛α««α«ñα««α«╛α«⌐α»Çα«░α»ìα«òα«│α»ì?"}},
 ]},
{id:22,jp:"πéÇπéèπéÆπÇÇπüùπü¬πüäπÇÇπü╗πüåπüîπÇÇπüäπüäπüºπüÖπéê",en:"You'd better not overdo it",ta:"α«àα«ñα«┐α«òα««α«╛α«ò α««α»üα«»α«▒α»ìα«Üα«┐ α«Üα»åα«»α»ìα«»α«╛α«ñα»Çα«░α»ìα«òα«│α»ì",
 vocab:[
  {jp:"πéÇπéè",r:"muri",en:"overdoing / unreasonable",ta:"α«àα«ñα»Çα«ñα««α«╛α«⌐ α««α»üα«»α«▒α»ìα«Üα«┐"},
  {jp:"πü╗πüåπüîπÇÇπüäπüä",r:"hou ga ii",en:"had better ~",ta:"~ α«Üα»åα«»α»ìα«╡α«ñα»ü α«¿α«▓α»ìα«▓α«ñα»ü"},
  {jp:"πüïπü£",r:"kaze",en:"a cold (illness)",ta:"α«Üα«│α«┐α«òα»ìα«òα«╛α«»α»ìα«Üα»ìα«Üα«▓α»ì"},
  {jp:"πüÅπüÖπéè",r:"kusuri",en:"medicine",ta:"α««α«░α»üα«¿α»ìα«ñα»ü"},
  {jp:"πü¡πüñ",r:"netsu",en:"fever",ta:"α«òα«╛α«»α»ìα«Üα»ìα«Üα«▓α»ì"},
 ],
 grammar:[
  {t:"∩╜₧πüƒπÇÇπü╗πüåπüîπÇÇπüäπüäπüºπüÖ",en:"you'd better do ~ (advice)",ta:"~ α«Üα»åα«»α»ìα«╡α«ñα»ü α«¿α«▓α»ìα«▓α«ñα»ü (α«àα«▒α«┐α«╡α»üα«░α»ê)",
   form:"Verb πüƒ-form + πü╗πüåπüî πüäπüäπüºπüÖ",
   ex:{jp:"πü»πéäπüÅπÇÇπü¡πüƒπÇÇπü╗πüåπüîπÇÇπüäπüäπüºπüÖπÇé",en:"You'd better sleep early.",ta:"α«╡α«┐α«░α»êα«╡α«┐α«▓α»ì α«ñα»éα«Öα»ìα«òα»üα«╡α«ñα»ü α«¿α«▓α»ìα«▓α«ñα»ü."}},
  {t:"∩╜₧πü¬πüäπÇÇπü╗πüåπüîπÇÇπüäπüäπüºπüÖ",en:"you'd better not do ~",ta:"~ α«Üα»åα«»α»ìα«»α«╛α««α«▓α»ì α«çα«░α»üα«¬α»ìα«¬α«ñα»ü α«¿α«▓α»ìα«▓α«ñα»ü",
   form:"Verb πü¬πüä-form + πü╗πüåπüî πüäπüäπüºπüÖ",
   ex:{jp:"πüèπüòπüæπéÆπÇÇπü«πü╛πü¬πüäπÇÇπü╗πüåπüîπÇÇπüäπüäπüºπüÖπÇé",en:"You'd better not drink alcohol.",ta:"α««α«ñα»ü α«àα«░α»üα«¿α»ìα«ñα«╛α««α«▓α»ì α«çα«░α»üα«¬α»ìα«¬α«ñα»ü α«¿α«▓α»ìα«▓α«ñα»ü."}},
 ]},
{id:23,jp:"πü┐πüÄπü╕πÇÇπü╛πüîπéïπü¿πÇüπüÄπéôπüôπüåπüîπÇÇπüéπéèπü╛πüÖ",en:"If you turn right, there is a bank",ta:"α«╡α«▓α«ñα»ü α«¬α«òα»ìα«òα««α»ì α«ñα«┐α«░α»üα««α»ìα«¬α«┐α«⌐α«╛α«▓α»ì α«╡α«Öα»ìα«òα«┐ α«çα«░α»üα«òα»ìα«òα«┐α«▒α«ñα»ü",
 vocab:[
  {jp:"πü╛πüîπéèπü╛πüÖ",r:"magarimasu",en:"to turn",ta:"α«ñα«┐α«░α»üα««α»ìα«¬α»üα«ñα«▓α»ì"},
  {jp:"πü┐πüÄ∩╝Åπü▓πüáπéè",r:"migi/hidari",en:"right/left",ta:"α«╡α«▓α«ñα»ü/α«çα«ƒα«ñα»ü"},
  {jp:"πüùπéôπüöπüå",r:"shingou",en:"traffic light",ta:"α«¬α»ïα«òα»ìα«òα»üα«╡α«░α«ñα»ìα«ñα»ü α«╡α«┐α«│α«òα»ìα«òα»ü"},
  {jp:"πüÄπéôπüôπüå",r:"ginkou",en:"bank",ta:"α«╡α«Öα»ìα«òα«┐"},
  {jp:"πü╛πüúπüÖπüÉ",r:"massugu",en:"straight",ta:"α«¿α»çα«░α«╛α«ò"},
 ],
 grammar:[
  {t:"µÖ«ΘÇÜσ╜ó∩╝êΦ╛₧µ¢╕σ╜ó∩╝ë∩╝ïπü¿",en:"conditional: whenever/if ~, then ~ (natural consequence)",ta:"α«¿α«┐α«¬α«¿α»ìα«ñα«⌐α»ê: α«Äα«¬α»ìα«¬α»ïα«ñα»üα««α»ì ~ α«Äα«⌐α»ìα«▒α«╛α«▓α»ì ~",
   form:"Plain non-past + πü¿πÇüresult",
   ex:{jp:"πü»πéïπü½πÇÇπü¬πéïπü¿πÇüπüòπüÅπéëπüîπÇÇπüòπüìπü╛πüÖπÇé",en:"When spring comes, cherry blossoms bloom.",ta:"α«╡α«Üα«¿α»ìα«ñ α«òα«╛α«▓α««α»ì α«╡α«¿α»ìα«ñα«╛α«▓α»ì α«Üα»åα«░α»ìα«░α«┐ α««α«▓α«░α»ìα«òα«│α»ì α««α«▓α«░α»üα««α»ì."}},
 ]},
{id:24,jp:"πü⌐πéìπü╝πüåπü½πÇÇπüòπüäπü╡πéÆπÇÇπü¿πéëπéîπü╛πüùπüƒ",en:"My wallet was stolen by a thief",ta:"α«Äα«⌐α»ì α«¬α«úα«¬α»ìα«¬α»ê α«ñα«┐α«░α»üα«ƒα«⌐α«╛α«▓α»ì α«ñα«┐α«░α»üα«ƒα«¬α»ìα«¬α«ƒα»ìα«ƒα«ñα»ü",
 vocab:[
  {jp:"πü⌐πéìπü╝πüå",r:"dorobou",en:"thief",ta:"α«ñα«┐α«░α»üα«ƒα«⌐α»ì"},
  {jp:"πü¿πéèπü╛πüÖ",r:"torimasu",en:"to take/steal",ta:"α«Äα«ƒα»üα«ñα»ìα«ñα«▓α»ì / α«ñα«┐α«░α»üα«ƒα»üα«ñα«▓α»ì"},
  {jp:"πüòπüäπü╡",r:"saifu",en:"wallet",ta:"α«¬α«úα«¬α»ìα«¬α»ê"},
  {jp:"πüåπü╛πéîπü╛πüÖ",r:"umaremasu",en:"to be born",ta:"α«¬α«┐α«▒α«ñα»ìα«ñα«▓α»ì"},
  {jp:"πüùπüïπéëπéîπü╛πüÖ",r:"shikararemasu",en:"to be scolded",ta:"α«òα«úα»ìα«ƒα«┐α«òα»ìα«òα«¬α»ìα«¬α«ƒα»üα«ñα«▓α»ì"},
 ],
 grammar:[
  {t:"σÅùΦ║½σ╜ó∩╝êpassive∩╝ë",en:"passive voice: to be done to",ta:"α«Üα»åα«»α«¬α»ìα«¬α«╛α«ƒα»ìα«ƒα»ü α«╡α«┐α«⌐α»ê",
   form:"Verb -(r)areru",
   ex:{jp:"πéÅπüƒπüùπü»πÇÇπüéπéüπü½πÇÇπü╡πéëπéîπü╛πüùπüƒπÇé",en:"I got rained on.",ta:"α«¿α«╛α«⌐α»ì α««α«┤α»êα«»α«┐α«▓α»ì α«¿α«⌐α»êα«¿α»ìα«ñα»çα«⌐α»ì."}},
 ]},
{id:25,jp:"πü½πééπüñπü»πÇÇπééπüåπÇÇπüèπüÅπüúπüªπÇÇπüùπü╛πüäπü╛πüùπüƒ",en:"I've already sent the luggage",ta:"α«¿α«╛α«⌐α»ì α«Åα«▒α»ìα«òα«⌐α«╡α»ç α«¬α»èα«░α»üα«ƒα»ìα«òα«│α»ê α«àα«⌐α»üα«¬α»ìα«¬α«┐α«╡α«┐α«ƒα»ìα«ƒα»çα«⌐α»ì",
 vocab:[
  {jp:"∩╜₧πüªπÇÇπüùπü╛πüäπü╛πüÖ",r:"~te shimaimasu",en:"to finish/end up doing ~",ta:"α««α»üα«ƒα«┐α«ñα»ìα«ñα»üα«╡α«┐α«ƒα»üα«ñα«▓α»ì / α«Üα»åα«»α»ìα«ñα»üα«╡α«┐α«ƒα»üα«ñα«▓α»ì"},
  {jp:"∩╜₧πüªπÇÇπüèπüìπü╛πüÖ",r:"~te okimasu",en:"to do ~ in advance",ta:"α««α»üα«⌐α»ìα«òα»éα«ƒα»ìα«ƒα«┐α«»α»ç α«Üα»åα«»α»ìα«ñα»ü α«╡α»êα«ñα»ìα«ñα«▓α»ì"},
  {jp:"πü½πééπüñ",r:"nimotsu",en:"luggage",ta:"α«Üα«╛α««α«╛α«⌐α»ìα«òα«│α»ì"},
  {jp:"πüèπüÅπéèπü╛πüÖ",r:"okurimasu",en:"to send",ta:"α«àα«⌐α»üα«¬α»ìα«¬α»üα«ñα«▓α»ì"},
  {jp:"πüÿπéàπéôπü│",r:"junbi",en:"preparation",ta:"α«ñα«»α«╛α«░α«┐α«¬α»ìα«¬α»ü"},
 ],
 grammar:[
  {t:"∩╜₧πüªπÇÇπüèπüìπü╛πüÖ",en:"to do something in advance / for later",ta:"α««α»üα«⌐α»ìα«òα»éα«ƒα»ìα«ƒα«┐α«»α»ç α«Æα«⌐α»ìα«▒α»ê α«Üα»åα«»α»ìα«ñα»ü α«╡α»êα«ñα»ìα«ñα«▓α»ì",
   form:"Verb πüª-form + πüèπüìπü╛πüÖ",
   ex:{jp:"πâôπâ╝πâ½πéÆπÇÇπü▓πéäπüùπüªπÇÇπüèπüìπü╛πüÖπÇé",en:"I'll chill the beer in advance.",ta:"α«¿α«╛α«⌐α»ì α««α»üα«⌐α»ìα«òα»éα«ƒα»ìα«ƒα«┐α«»α»ç α«¬α»Çα«░α»ê α«òα»üα«│α«┐α«░α»ìα«╡α«┐α«¬α»ìα«¬α»çα«⌐α»ì."}},
  {t:"∩╜₧πüªπÇÇπüùπü╛πüäπü╛πüÖ",en:"to complete something (often with regret/finality)",ta:"α«Åα«ñα»ï α«Æα«⌐α»ìα«▒α»ê α««α»üα«┤α»üα««α»êα«»α«╛α«ò α«Üα»åα«»α»ìα«ñα»üα«╡α«┐α«ƒα»üα«ñα«▓α»ì",
   form:"Verb πüª-form + πüùπü╛πüäπü╛πüÖ",
   ex:{jp:"πüùπéàπüÅπüáπüäπéÆπÇÇπéÅπüÖπéîπüªπÇÇπüùπü╛πüäπü╛πüùπüƒπÇé",en:"I ended up forgetting my homework.",ta:"α«¿α«╛α«⌐α»ì α«╡α»Çα«ƒα»ìα«ƒα»üα«¬α»ìα«¬α«╛α«ƒα«ñα»ìα«ñα»ê α««α«▒α«¿α»ìα«ñα»üα«╡α«┐α«ƒα»ìα«ƒα»çα«⌐α»ì."}},
 ]},
];

// Auto-generate 3 quiz questions per lesson from its own vocab + grammar (deterministic, original)
function buildQuiz(lesson){
  const qs = [];
  const v = lesson.vocab;
  // Q1: JP -> EN meaning
  const target = v[0];
  const distractors = v.slice(1,4).map(x=>x.en);
  qs.push({
    q:`πÇî${target.jp}πÇìmeans...`,
    qta:`πÇî${target.jp}πÇì α«Äα«⌐α»ìα«▒α«╛α«▓α»ì α«Äα«⌐α»ìα«⌐?`,
    options: shuffle([target.en, ...distractors]).slice(0,4),
    answer: target.en,
    explain: `${target.jp} (${target.r}) = ${target.en} / ${target.ta}`
  });
  // Q2: EN -> JP
  const target2 = v[1] || v[0];
  const distractors2 = v.filter(x=>x!==target2).slice(0,3).map(x=>x.jp);
  qs.push({
    q:`How do you say "${target2.en}" in Japanese?`,
    qta:`"${target2.en}" -α«É α«£α«¬α»ìα«¬α«╛α«⌐α«┐α«» α««α»èα«┤α«┐α«»α«┐α«▓α»ì α«Äα«¬α»ìα«¬α«ƒα«┐ α«Üα»èα«▓α»ìα«╡α«ñα»ü?`,
    options: shuffle([target2.jp, ...distractors2]).slice(0,4),
    answer: target2.jp,
    explain: `${target2.en} = ${target2.jp} (${target2.r})`
  });
  // Q3: grammar fill-in from first grammar point
  const g = lesson.grammar[0];
  qs.push({
    q:`Grammar (${g.t}): complete ΓÇö ${g.ex.jp.replace(/πÇé$/,'')}πÇÇΓåÆ meaning?`,
    qta:`α«çα«▓α«òα»ìα«òα«úα««α»ì (${g.t}): α«çα«ñα«⌐α»ì α«¬α»èα«░α»üα«│α»ì α«Äα«⌐α»ìα«⌐?`,
    options: shuffle([g.ex.en, lesson.grammar[1]?.ex.en, "None of the above meanings apply", "I don't know yet"].filter(Boolean)).slice(0,4),
    answer: g.ex.en,
    explain: `${g.form} ΓÇö ${g.en} / ${g.ta}`
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
   {t:"∩╜₧πüƒπéè∩╜₧πüƒπéèπüùπü╛πüÖ",en:"doing things like A and B (non-exhaustive list of actions)",form:"Verb πüƒ-form(πéè) + Verb πüƒ-form(πéè) + πüùπü╛πüÖ",ex:{jp:"πüùπéàπüåπü╛πüñπü»πÇÇπü╗πéôπéÆπÇÇπéêπéôπüáπéèπÇüπüêπüäπüîπéÆπÇÇπü┐πüƒπéèπÇÇπüùπü╛πüÖπÇé",en:"On weekends I do things like reading books and watching movies."}},
   {t:"∩╜₧πü░",en:"conditional 'if'",form:"Verb πü░-form",ex:{jp:"πéäπüÖπüæπéîπü░πÇÇπüïπüäπü╛πüÖπÇé",en:"If it's cheap, I'll buy it."}},
   {t:"σÅ»Φâ╜σ╜ó∩╝êpotential∩╝ë",en:"can do ~ (potential form)",form:"πüèπéêπüÉΓåÆπüèπéêπüÆπéï",ex:{jp:"πéÅπüƒπüùπü»πÇÇπüèπéêπüÆπü╛πüÖπÇé",en:"I can swim."}},
   {t:"πüéπüÆπü╛πüÖ∩╝Åπééπéëπüäπü╛πüÖ∩╝ÅπüÅπéîπü╛πüÖ",en:"giving and receiving verbs",form:"Person(πü½) + Verb πüª-form + πüéπüÆπü╛πüÖ/πééπéëπüäπü╛πüÖ/πüÅπéîπü╛πüÖ",ex:{jp:"πü¿πééπüáπüíπü½πÇÇπâùπâ¼πé╝πâ│πâêπéÆπÇÇπééπéëπüäπü╛πüùπüƒπÇé",en:"I received a present from my friend."}},
  ]
 },
 N3: {
  desc:"Intermediate. Adds a dedicated vocabulary section on the exam; grammar covers formal/causal patterns, ~πéêπüåπü½πü¬πéï, ~πü╛πü╛, ~πü░πüïπéè.",
  sampleGrammar:[
   {t:"∩╜₧πéêπüåπü½πü¬πéï",en:"to reach the point where ~ (change over time)",form:"Verb dictionary/potential form + πéêπüåπü½πü¬πéï",ex:{jp:"πü½πü╗πéôπüöπüîπÇÇπü»πü¬πü¢πéïπéêπüåπü½πÇÇπü¬πéèπü╛πüùπüƒπÇé",en:"I've become able to speak Japanese."}},
   {t:"∩╜₧πü╛πü╛",en:"leaving something as-is / while in a state",form:"Verb πüƒ-form / Noun πü« + πü╛πü╛",ex:{jp:"πüÅπüñπéÆπÇÇπü»πüäπüƒπÇÇπü╛πü╛πÇÇπü»πüäπéëπü¬πüäπüºπÇÇπüÅπüáπüòπüäπÇé",en:"Please don't enter while wearing your shoes."}},
   {t:"∩╜₧πü░πüïπéè",en:"nothing but ~ / just did ~",form:"Noun + πü░πüïπéè / Verb πüƒ-form + πü░πüïπéè",ex:{jp:"πüïπéîπü»πÇÇπüéπü¥πéôπüºπÇÇπü░πüïπéèπÇÇπüäπü╛πüÖπÇé",en:"He does nothing but play."}},
  ]
 },
 N2: {
  desc:"Upper-intermediate. Language Knowledge and Reading are combined into one section. Around 200 grammar points, incl. πü½πééπüïπüïπéÅπéëπüÜ, πééπü«πü«, πüñπüñ.",
  sampleGrammar:[
   {t:"∩╜₧πü½πééπüïπüïπéÅπéëπüÜ",en:"despite / nevertheless",form:"Plain form + πü½πééπüïπüïπéÅπéëπüÜ",ex:{jp:"πüéπéüπü½πÇÇπééπüïπüïπéÅπéëπüÜπÇüπüùπüéπüäπü»πÇÇπüèπüôπü¬πéÅπéîπü╛πüùπüƒπÇé",en:"Despite the rain, the match was held."}},
   {t:"∩╜₧πééπü«πü«",en:"although ~ (concession)",form:"Plain form + πééπü«πü«",ex:{jp:"πéäπüÅπü¥πüÅπüùπüƒπÇÇπééπü«πü«πÇüπüäπüæπü╛πü¢πéôπüºπüùπüƒπÇé",en:"Although I promised, I couldn't go."}},
  ]
 },
 N1: {
  desc:"Advanced. Formal written/spoken registers, nuanced emotional and rhetorical patterns like ∩╜₧πüºπü»πüéπéïπü╛πüäπüù, ∩╜₧πü╣πüïπéëπüÜ.",
  sampleGrammar:[
   {t:"∩╜₧πüºπü»πüéπéïπü╛πüäπüù",en:"it's not as if ~ (so...)",form:"Noun/Plain + πüºπü»πüéπéïπü╛πüäπüù",ex:{jp:"πüôπü⌐πééπüºπü»πÇÇπüéπéïπü╛πüäπüùπÇüπüÿπü╢πéôπüºπÇÇπüºπüìπéïπüºπüùπéçπüåπÇé",en:"You're not a child, so you should be able to do it yourself."}},
   {t:"∩╜₧πü╣πüïπéëπüÜ",en:"must not ~ (formal prohibition, notices)",form:"Verb dictionary form + πü╣πüïπéëπüÜ",ex:{jp:"πü»πüäπéïπü╣πüïπéëπüÜπÇé",en:"Do not enter. (formal notice)"}},
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
  {key:"home", jp:"πâ¢πâ╝πâá", en:"Home", icon:HomeIcon},
  {key:"lessons", jp:"σ¡ªτ┐Æ", en:"Lessons", icon:Layers},
  {key:"characters", jp:"µûçσ¡ùπâ⌐πâ£", en:"Kana ┬╖ Kanji Lab", icon:PenLine},
  {key:"levels", jp:"πâ¼πâÖπâ½", en:"Levels", icon:BookOpen},
  {key:"mistakes", jp:"ΘûôΘüòπüäπâÄπâ╝πâê", en:"Mistakes", icon:AlertCircle},
  {key:"mock", jp:"µ¿íµô¼Φ⌐ªΘ¿ô", en:"Mock Exam", icon:ClipboardCheck},
  {key:"progress", jp:"ΘÇ▓µìù", en:"Progress", icon:TrendingUp},
  {key:"aiHub", jp:"AIπé│πâ╝πâü", en:"AI Mentor Hub", icon:Bot},
];

function TriLabel({jp, en, ta, size="base"}){
  const sizes = { sm:"text-sm", base:"text-base", lg:"text-xl", xl:"text-3xl" };
  return (
    <div>
      <div className={`font-semibold text-stone-900 ${sizes[size]}`} lang="ja">{jp}</div>
      <div className="text-red-700 text-xs font-medium mt-0.5">≡ƒöñ {toRomaji(jp)}</div>
      <div className="text-stone-500 text-sm">{en}</div>
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

// ---------------- Home / Dashboard ----------------
function Home({progress, lessons, goTo}){
  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = lessons.length;
  const pct = Math.round((completedCount/totalLessons)*100);
  const nextLesson = lessons.find(l => !progress.completedLessons[l.id]) || lessons[0];

  return (<>
      <AITutor level={"N5"} module="Dashboard" compact={true}/>
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 md:p-12">
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-red-700/20 blur-2xl"/>
        <div className="absolute right-6 top-6 w-3 h-3 rounded-full bg-red-600"/>
        <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-3">Nihongo Vertex</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-2" lang="ja">µùÑµ£¼Φ¬₧πéÆπÇüΦ⌐ªΘ¿ôπü½σ╝╖πüäσè¢πü╕πÇé</h1>
        <p className="text-stone-300 max-w-xl mb-1">Master Japanese from your first hiragana to JLPT N1 ΓÇö studied through α«ñα««α«┐α«┤α»ì ┬╖ English ┬╖ µùÑµ£¼Φ¬₧.</p>
        <button onClick={()=>goTo("lessons")} className="mt-6 inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 transition-colors px-6 py-3 rounded-xl font-semibold">
          Continue Learning <ChevronRight size={18}/>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="text-stone-500 text-xs mb-1">Current Level</div>
          <div className="text-2xl font-bold text-stone-900">N5</div>
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
          <div className="text-stone-500 text-xs mb-1">N5 Progress</div>
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
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">πüé</div>
          <div className="flex-1">
            <h3 className="font-semibold text-stone-900">Character Lab ┬╖ µûçσ¡ùπâ⌐πâ£</h3>
            <p className="text-sm text-stone-500 mt-1">Learn Hiragana, Katakana and beginner Kanji with English-letter pronunciation, memory objects, audio and handwriting practice.</p>
            <button onClick={()=>goTo("characters")} className="mt-3 inline-flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold">Open Character Lab <ChevronRight size={15}/></button>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="font-semibold text-stone-900 mb-3">Σ╗èµùÑπü«σ¡ªτ┐Æ ┬╖ Continue where you left off</h3>
          <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-100">
            <div>
              <div className="text-xs text-stone-400 mb-1">Lesson {nextLesson.id}</div>
              <TriLabel jp={nextLesson.jp} en={nextLesson.en} ta={nextLesson.ta} size="base"/>
            </div>
            <button onClick={()=>goTo("lesson", nextLesson.id)} className="p-2 rounded-full bg-stone-900 text-white"><ChevronRight size={18}/></button>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-stone-900 mb-3">≡ƒÄî Ready for a challenge?</h3>
          <p className="text-sm text-stone-500 mb-4">Take the full N5 practice mock exam ΓÇö timed, JLPT-style sections, scored estimate.</p>
          <button onClick={()=>goTo("mock")} className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors">Start JLPT N5 Mock Test</button>
        </Card>
      </div>
    </div>
  </>);
}

// ---------------- Level Selector ----------------
function LevelSelector({progress, lessons, goTo, otherLevels}){
  const completedCount = Object.keys(progress.completedLessons).length;
  const pct = Math.round((completedCount/lessons.length)*100);
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">πâ¼πâÖπâ½Θü╕µè₧ <span className="text-stone-400 text-base font-normal">Level Selector</span></h2>
      <div className="grid md:grid-cols-2 gap-4">
        {LEVELS.map(lv=>{
          const active = lv === "N5";
          const labels = {N5:"Beginner ┬╖ α«åα«░α««α»ìα«¬α«¿α«┐α«▓α»ê", N4:"Elementary ┬╖ α«ñα»èα«ƒα«òα»ìα«òα«¿α«┐α«▓α»ê", N3:"Intermediate ┬╖ α«çα«ƒα»êα«¿α«┐α«▓α»ê", N2:"Upper Intermediate ┬╖ α««α»çα«▓α»ìα«¿α«┐α«▓α»ê", N1:"Advanced ┬╖ α««α»çα««α»ìα«¬α«ƒα»ìα«ƒ α«¿α«┐α«▓α»ê"};
          return (
            <Card key={lv} className={`p-6 ${!active && "opacity-80"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-stone-900">{lv}</div>
                {!active && <Lock size={16} className="text-stone-400"/>}
              </div>
              <div className="text-sm text-stone-500 mb-4">{labels[lv]}</div>
              {active ? (
                <>
                  <ProgressBar pct={pct}/>
                  <div className="text-xs text-stone-500 mt-2 mb-4">{pct}% complete ┬╖ {completedCount}/{lessons.length} lessons</div>
                  <button onClick={()=>goTo("lessons")} className="w-full bg-stone-900 text-white rounded-xl py-2.5 font-medium">Study N5</button>
                </>
              ) : (
                <>
                  <p className="text-xs text-stone-500 mb-4">{otherLevels[lv].desc}</p>
                  <button onClick={()=>goTo("levelDetail", lv)} className="w-full border border-stone-300 text-stone-700 rounded-xl py-2.5 font-medium">Preview sample grammar</button>
                </>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function LevelDetail({level, otherLevels, goTo}){
  const data = otherLevels[level];
  return (<>
      <AITutor level={level} module="Grammar" compact={false}/>
    <div className="space-y-4 pb-24 md:pb-6">
      <button onClick={()=>goTo("levels")} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"><ChevronLeft size={16}/> Back to levels</button>
      <h2 className="text-2xl font-bold text-stone-900">{level} <span className="text-stone-400 text-base font-normal">Sample syllabus (external reference)</span></h2>
      <Card className="p-5 bg-amber-50 border-amber-200 text-amber-800 text-sm">
        This {level} content is a sample set curated from public JLPT study references, not from your uploaded Minna no Nihongo notes. Full {level} lesson tracks (like N5) can be expanded next.
      </Card>
      <p className="text-stone-600">{data.desc}</p>
      <div className="space-y-3">
        {data.sampleGrammar.map((g,i)=>(
          <Card key={i} className="p-5">
            <JapaneseReading jp={g.t} className="mb-1" />
            <div className="text-sm text-stone-500 mb-2">{g.en}</div>
            <div className="text-xs text-stone-400 mb-2">Formation: {g.form}</div>
            <div className="bg-stone-50 rounded-lg p-3">
              <JapaneseReading jp={g.ex.jp} className="mb-1" />
              <div className="text-sm text-stone-500">{g.ex.en}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </>);
}

// ---------------- Lesson List ----------------
function LessonList({lessons, progress, goTo}){
  return (<>
      <AITutor level={"N5"} module="Vocabulary" compact={true}/>
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">σ¡ªτ┐Æ <span className="text-stone-400 text-base font-normal">N5 Lessons (based on Minna no Nihongo 1ΓÇô25)</span></h2>
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
  </>);
}


// ---------------- Japanese reading + Character Lab ----------------
// Beginner-friendly romaji. The UI intentionally shows Japanese first and
// an English-letter reading directly underneath it so a learner never has
// to guess how to read a Japanese word.
const KANA_ROMAJI = {
  "πüìπéâ":"kya","πüìπéà":"kyu","πüìπéç":"kyo","πüùπéâ":"sha","πüùπéà":"shu","πüùπéç":"sho",
  "πüíπéâ":"cha","πüíπéà":"chu","πüíπéç":"cho","πü½πéâ":"nya","πü½πéà":"nyu","πü½πéç":"nyo",
  "πü▓πéâ":"hya","πü▓πéà":"hyu","πü▓πéç":"hyo","πü┐πéâ":"mya","πü┐πéà":"myu","πü┐πéç":"myo",
  "πéèπéâ":"rya","πéèπéà":"ryu","πéèπéç":"ryo","πüÄπéâ":"gya","πüÄπéà":"gyu","πüÄπéç":"gyo",
  "πüÿπéâ":"ja","πüÿπéà":"ju","πüÿπéç":"jo","πü│πéâ":"bya","πü│πéà":"byu","πü│πéç":"byo",
  "πü┤πéâ":"pya","πü┤πéà":"pyu","πü┤πéç":"pyo","πü╡πüü":"fa","πü╡πüâ":"fi","πü╡πüç":"fe","πü╡πüë":"fo",
  "πüåπüâ":"wi","πüåπüç":"we","πüåπüë":"wo","πüùπüç":"she","πüíπüç":"che","πüÿπüç":"je",
  "πüñπüü":"tsa","πüñπüâ":"tsi","πüñπüç":"tse","πüñπüë":"tso",
  "πüé":"a","πüä":"i","πüå":"u","πüê":"e","πüè":"o","πüï":"ka","πüì":"ki","πüÅ":"ku","πüæ":"ke","πüô":"ko",
  "πüò":"sa","πüù":"shi","πüÖ":"su","πü¢":"se","πü¥":"so","πüƒ":"ta","πüí":"chi","πüñ":"tsu","πüª":"te","πü¿":"to",
  "πü¬":"na","πü½":"ni","πü¼":"nu","πü¡":"ne","πü«":"no","πü»":"ha","πü▓":"hi","πü╡":"fu","πü╕":"he","πü╗":"ho",
  "πü╛":"ma","πü┐":"mi","πéÇ":"mu","πéü":"me","πéé":"mo","πéä":"ya","πéå":"yu","πéê":"yo",
  "πéë":"ra","πéè":"ri","πéï":"ru","πéî":"re","πéì":"ro","πéÅ":"wa","πéÆ":"o","πéô":"n",
  "πüî":"ga","πüÄ":"gi","πüÉ":"gu","πüÆ":"ge","πüö":"go","πüû":"za","πüÿ":"ji","πüÜ":"zu","πü£":"ze","πü₧":"zo",
  "πüá":"da","πüó":"ji","πüÑ":"zu","πüº":"de","πü⌐":"do","πü░":"ba","πü│":"bi","πü╢":"bu","πü╣":"be","πü╝":"bo",
  "πü▒":"pa","πü┤":"pi","πü╖":"pu","πü║":"pe","πü╜":"po","πüü":"a","πüâ":"i","πüà":"u","πüç":"e","πüë":"o",
  "πéö":"vu","πâ╝":"-"
};
const KATA_TO_HIRA = {"πéó":"πüé","πéñ":"πüä","πéª":"πüå","πé¿":"πüê","πé¬":"πüè","πé½":"πüï","πé¡":"πüì","πé»":"πüÅ","πé▒":"πüæ","πé│":"πüô","πé╡":"πüò","πé╖":"πüù","πé╣":"πüÖ","πé╗":"πü¢","πé╜":"πü¥","πé┐":"πüƒ","πâü":"πüí","πâä":"πüñ","πâå":"πüª","πâê":"πü¿","πâè":"πü¬","πâï":"πü½","πâî":"πü¼","πâì":"πü¡","πâÄ":"πü«","πâÅ":"πü»","πâÆ":"πü▓","πâò":"πü╡","πâÿ":"πü╕","πâ¢":"πü╗","πâ₧":"πü╛","πâƒ":"πü┐","πâá":"πéÇ","πâí":"πéü","πâó":"πéé","πâñ":"πéä","πâª":"πéå","πâ¿":"πéê","πâ⌐":"πéë","πâ¬":"πéè","πâ½":"πéï","πâ¼":"πéî","πâ¡":"πéì","πâ»":"πéÅ","πâ▓":"πéÆ","πâ│":"πéô","πé¼":"πüî","πé«":"πüÄ","πé░":"πüÉ","πé▓":"πüÆ","πé┤":"πüö","πé╢":"πüû","πé╕":"πüÿ","πé║":"πüÜ","πé╝":"πü£","πé╛":"πü₧","πâÇ":"πüá","πâé":"πüó","πâà":"πüÑ","πâç":"πüº","πâë":"πü⌐","πâÉ":"πü░","πâô":"πü│","πâû":"πü╢","πâÖ":"πü╣","πâ£":"πü╝","πâæ":"πü▒","πâö":"πü┤","πâù":"πü╖","πâÜ":"πü║","πâ¥":"πü╜","πâ┤":"πéö","πâú":"πéâ","πâÑ":"πéà","πâº":"πéç","πéí":"πüü","πéú":"πüâ","πéÑ":"πüà","πéº":"πüç","πé⌐":"πüë","πââ":"πüú"};
function toRomaji(input=""){
  const hira = [...input].map(ch=>KATA_TO_HIRA[ch]||ch).join("");
  let out="";
  for(let i=0;i<hira.length;i++){
    const pair=hira.slice(i,i+2);
    if(KANA_ROMAJI[pair]){ out+=KANA_ROMAJI[pair]; i++; continue; }
    const ch=hira[i];
    if(ch==="πüú"){
      const next=KANA_ROMAJI[hira[i+1]]||"";
      out += next ? next[0] : "";
      continue;
    }
    if(ch==="πâ╝"){ out+="-"; continue; }
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
      <div lang="ja" className="text-stone-900">{jp}</div>
      {r && <div className="text-sm text-red-700 font-medium mt-0.5">≡ƒöñ {r}</div>}
      <button type="button" onClick={()=>speakJapanese(jp)} className="mt-1 inline-flex items-center gap-1 text-xs text-stone-400 hover:text-red-700">
        <Volume2 size={13}/> Listen
      </button>
    </div>
  );
}

const HIRAGANA = [
  ["πüé","a","≡ƒìÄ","Apple"],["πüä","i","≡ƒÉƒ","Fish"],["πüå","u","≡ƒÉä","Cow"],["πüê","e","≡ƒû╝∩╕Å","Picture"],["πüè","o","≡ƒææ","Crown"],
  ["πüï","ka","≡ƒªÇ","Crab"],["πüì","ki","≡ƒöæ","Key"],["πüÅ","ku","≡ƒì¬","Cookie"],["πüæ","ke","≡ƒºö","Beard"],["πüô","ko","≡ƒÉ¿","Koala"],
  ["πüò","sa","≡ƒîé","Umbrella"],["πüù","shi","≡ƒªê","Shark"],["πüÖ","su","≡ƒìú","Sushi"],["πü¢","se","≡ƒ¬Ö","Coin"],["πü¥","so","≡ƒº╣","Broom"],
  ["πüƒ","ta","≡ƒÉÖ","Octopus"],["πüí","chi","≡ƒºÇ","Cheese"],["πüñ","tsu","≡ƒîÖ","Moon"],["πüª","te","Γ£ï","Hand"],["πü¿","to","≡ƒÜ¬","Door"],
  ["πü¬","na","≡ƒìî","Banana"],["πü½","ni","≡ƒîê","Rainbow"],["πü¼","nu","≡ƒº╡","Thread"],["πü¡","ne","≡ƒÉ▒","Cat"],["πü«","no","≡ƒô¥","Note"],
  ["πü»","ha","≡ƒî┐","Leaf"],["πü▓","hi","≡ƒöÑ","Fire"],["πü╡","fu","≡ƒÄê","Balloon"],["πü╕","he","Γ¢░∩╕Å","Mountain"],["πü╗","ho","Γ¡É","Star"],
  ["πü╛","ma","≡ƒªÖ","Llama"],["πü┐","mi","≡ƒîè","Wave"],["πéÇ","mu","≡ƒÉ¢","Worm"],["πéü","me","≡ƒæü∩╕Å","Eye"],["πéé","mo","≡ƒìæ","Peach"],
  ["πéä","ya","≡ƒÅ╣","Bow"],["πéå","yu","ΓÖ¿∩╕Å","Hot spring"],["πéê","yo","≡ƒ¬ü","Kite"],
  ["πéë","ra","≡ƒÜù","Car"],["πéè","ri","≡ƒÄÇ","Ribbon"],["πéï","ru","≡ƒöä","Loop"],["πéî","re","≡ƒ¬╖","Flower"],["πéì","ro","≡ƒñû","Robot"],
  ["πéÅ","wa","≡ƒÉè","Crocodile"],["πéÆ","o","≡ƒÄ»","Object marker"],["πéô","n","≡ƒæâ","Nose"]
];
const KATAKANA = [
  ["πéó","a","Apple"],["πéñ","i","Ice"],["πéª","u","Woo"],["πé¿","e","Energy"],["πé¬","o","O"],
  ["πé½","ka","Car"],["πé¡","ki","Key"],["πé»","ku","Cool"],["πé▒","ke","Keg"],["πé│","ko","Coffee"],
  ["πé╡","sa","Sun"],["πé╖","shi","Ship"],["πé╣","su","Ski"],["πé╗","se","Set"],["πé╜","so","Sock"],
  ["πé┐","ta","Taco"],["πâü","chi","Cheese"],["πâä","tsu","Tsunami"],["πâå","te","Tennis"],["πâê","to","Toast"],
  ["πâè","na","Navy"],["πâï","ni","Knee"],["πâî","nu","Noodle"],["πâì","ne","Net"],["πâÄ","no","Note"],
  ["πâÅ","ha","Hat"],["πâÆ","hi","He"],["πâò","fu","Food"],["πâÿ","he","Head"],["πâ¢","ho","Home"],
  ["πâ₧","ma","Map"],["πâƒ","mi","Me"],["πâá","mu","Moon"],["πâí","me","Men"],["πâó","mo","More"],
  ["πâñ","ya","Yacht"],["πâª","yu","You"],["πâ¿","yo","Yo"],
  ["πâ⌐","ra","Run"],["πâ¬","ri","Ring"],["πâ½","ru","Rule"],["πâ¼","re","Red"],["πâ¡","ro","Road"],
  ["πâ»","wa","Water"],["πâ▓","o","Object marker"],["πâ│","n","N"]
];
const BASIC_KANJI = [
  ["µùÑ","πü½πüí / hi","nichi / hi","sun ┬╖ day","ΓÿÇ∩╕Å"],["µ£ê","πüÆπüñ / tsuki","getsu / tsuki","moon ┬╖ month","≡ƒîÖ"],
  ["τü½","πüï / hi","ka / hi","fire","≡ƒöÑ"],["µ░┤","πüÖπüä / mizu","sui / mizu","water","≡ƒÆº"],
  ["µ£¿","πééπüÅ / ki","moku / ki","tree","≡ƒî│"],["Θçæ","πüìπéô / kane","kin / kane","gold ┬╖ money","≡ƒÆ░"],
  ["σ£ƒ","πü⌐ / tsuchi","do / tsuchi","earth ┬╖ soil","≡ƒî▒"],["σ▒▒","πüòπéô / yama","san / yama","mountain","Γ¢░∩╕Å"],
  ["σ╖¥","πü¢πéô / kawa","sen / kawa","river","≡ƒîè"],["Σ║║","πüÿπéô / hito","jin / hito","person","≡ƒºæ"],
  ["σñº","πüáπüä / πüèπüèπüìπüä","dai / ookii","big","≡ƒÉÿ"],["σ░Å","πüùπéçπüå / πüíπüäπüòπüä","shou / chiisai","small","≡ƒÉ¡"],
  ["Σ╕è","πüÿπéçπüå / πüåπüê","jou / ue","up ┬╖ above","Γ¼å∩╕Å"],["Σ╕ï","πüï / πüùπüƒ","ka / shita","down ┬╖ below","Γ¼ç∩╕Å"],
  ["Σ╕¡","πüíπéàπüå / πü¬πüï","chuu / naka","middle ┬╖ inside","≡ƒÄ»"],["σ¡ª","πüîπüÅ / πü╛πü¬πü╢","gaku / manabu","study","≡ƒôÜ"],
  ["τöƒ","πü¢πüä / πüäπüìπéï","sei / ikiru","life ┬╖ live","≡ƒî▒"],["σàê","πü¢πéô / πüòπüì","sen / saki","ahead ┬╖ previous","Γ₧í∩╕Å"],
  ["σ╣┤","πü¡πéô / πü¿πüù","nen / toshi","year","≡ƒôà"],["µÖé","πüÿ / πü¿πüì","ji / toki","time ┬╖ hour","ΓÅ░"]
];

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
        <div><div className="font-semibold">Γ£ì∩╕Å Writing practice</div><div className="text-xs text-stone-400">Trace / write <b>{character}</b> from memory</div></div>
        <button onClick={clear} className="p-2 rounded-lg border border-stone-200"><RotateCcw size={16}/></button>
      </div>
      <div className="relative max-w-sm mx-auto">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none opacity-30"><div className="border-r border-stone-300 border-dashed"/><div/><div className="border-t border-stone-300 border-dashed col-span-2"/></div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-8xl text-stone-200">{character}</div>
        <canvas ref={canvasRef} width="360" height="360" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} className="w-full aspect-square border border-stone-200 rounded-2xl bg-white touch-none relative"/>
      </div>
      <p className="text-xs text-stone-400 mt-3 text-center">Write over the faint character, then clear and try from memory.</p>
    </Card>
  );
}

function CharacterLab(){
  const [script,setScript]=useState("hiragana");
  const [idx,setIdx]=useState(0);
  const [mode,setMode]=useState("learn");
  const [query,setQuery]=useState("");
  const list=script==="hiragana"?HIRAGANA:script==="katakana"?KATAKANA:BASIC_KANJI;
  const item=list[idx]||list[0];
  const char=item[0], reading=item[1].split(" / ")[0], romaji=script==="kanji"?item[2]:item[1];
  const filtered=list.filter(x=>(x[0]+" "+x[1]+" "+x[2]+" "+(x[3]||"")).toLowerCase().includes(query.toLowerCase()));
  function chooseChar(c){ const i=list.findIndex(x=>x[0]===c); if(i>=0){setIdx(i); setQuery("");} }
  return (<>
      <AITutor level={"N5"} module="Characters" compact={false}/>
    <div className="space-y-5 pb-24 md:pb-6">
      <div>
        <div className="text-xs text-red-700 font-semibold tracking-widest uppercase">Character Lab</div>
        <h2 className="text-2xl font-bold text-stone-900">πü▓πéëπüîπü¬ ┬╖ πé½πé┐πé½πâè ┬╖ µ╝óσ¡ù</h2>
        <p className="text-stone-500">Japanese + English-letter pronunciation + sound + memory object + writing practice.</p>
      </div>
      <Card className="p-4 bg-red-50 border-red-100">
        <div className="font-semibold text-stone-900 mb-1">≡ƒºá Never guess the reading</div>
        <p className="text-sm text-stone-600">Every character card gives you <b>Japanese ΓåÆ Romaji ΓåÆ English meaning ΓåÆ sound</b>. Use the object/emoji as a memory hook, then write it.</p>
      </Card>
      <div className="flex flex-wrap gap-2">
        {[["hiragana","Hiragana πü▓πéëπüîπü¬"],["katakana","Katakana πé½πé┐πé½πâè"],["kanji","Kanji µ╝óσ¡ù"]].map(([k,l])=>
          <button key={k} onClick={()=>{setScript(k);setIdx(0);setMode("learn")}} className={`px-4 py-2 rounded-xl text-sm font-semibold ${script===k?"bg-stone-900 text-white":"bg-stone-100 text-stone-600"}`}>{l}</button>
        )}
        <button onClick={()=>setMode("practice")} className={`px-4 py-2 rounded-xl text-sm font-semibold ${mode==="practice"?"bg-red-700 text-white":"bg-stone-100 text-stone-600"}`}>Γ£ì∩╕Å Writing mode</button>
      </div>
      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Search size={16} className="text-stone-400"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a Japanese letter / romaji / meaning..." className="flex-1 outline-none bg-stone-50 rounded-lg px-3 py-2 text-sm"/>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-52 overflow-auto">
          {(query?filtered:list).map((x,i)=>{
            const actual=list.findIndex(y=>y[0]===x[0]);
            return <button key={x[0]} onClick={()=>{setIdx(actual);setQuery("")}} className={`p-2 rounded-xl border ${actual===idx?"border-red-600 bg-red-50":"border-stone-200 bg-white"}`}>
              <div className="text-2xl font-bold">{x[0]}</div><div className="text-[10px] text-red-700">{script==="kanji"?x[2]:x[1]}</div>
            </button>
          })}
        </div>
      </Card>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 text-center">
          <div className="text-xs text-stone-400 mb-2">Your character</div>
          <div className="text-8xl font-bold text-stone-900 mb-2">{char}</div>
          <div className="text-2xl font-semibold text-red-700">≡ƒöñ {romaji}</div>
          {script==="kanji" && <div className="text-sm text-stone-500 mt-2">{item[3]}</div>}
          {script!=="kanji" && <div className="text-4xl mt-3">{item[2]}</div>}
          {script==="kanji" && <div className="text-3xl mt-3">{item[4]}</div>}
          <button onClick={()=>speakJapanese(char)} className="mt-4 inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl"><Volume2 size={17}/> Hear pronunciation</button>
          <div className="mt-4 text-xs text-stone-400">Say it aloud: <b>{romaji}</b></div>
        </Card>
        {mode==="practice" ? <WritingPad character={char}/> : (
          <Card className="p-6">
            <div className="font-semibold mb-3">≡ƒÄ» Memory trick</div>
            <div className="text-5xl mb-3">{script==="kanji"?item[4]:item[2]}</div>
            <div className="text-stone-700 font-medium mb-2">{script==="kanji"?item[3]:item[3]}</div>
            <p className="text-sm text-stone-500">Look at the shape, say <b>{romaji}</b> three times, connect it to the object, then write it without looking.</p>
            <div className="mt-5 p-4 rounded-xl bg-stone-50">
              <div className="text-xs uppercase tracking-wide text-stone-400 mb-1">3-step memory loop</div>
              <div className="text-sm">≡ƒæÇ See ΓåÆ ≡ƒöè Say ΓåÆ Γ£ì∩╕Å Write ΓåÆ ≡ƒöü Repeat</div>
            </div>
          </Card>
        )}
      </div>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div><div className="font-semibold">ΓÜí Rapid recall</div><div className="text-xs text-stone-400">Can you say the romaji before looking?</div></div>
          <button onClick={()=>setIdx((idx+1)%list.length)} className="px-3 py-2 rounded-lg bg-red-700 text-white text-sm">Next character ΓåÆ</button>
        </div>
        <div className="text-4xl font-bold">{char}</div>
        <div className="text-sm text-red-700 mt-1">{romaji}</div>
      </Card>
    </div>
  </>);
}



// ---------------- AI Tutor (every module, every JLPT level) ----------------
function AITutor({level="N5", module="Learning", lesson=null, compact=false}){
  const [open,setOpen]=useState(!compact); const [speaking,setSpeaking]=useState(false); const [question,setQuestion]=useState(""); const [answer,setAnswer]=useState("");
  const tips={Characters:"See the character, say its romaji, hear it, then write it from memory.",Hiragana:"Learn one row at a time. Connect each shape directly to its sound.",Katakana:"Use loanwords and visual associations, then read and write each character.",Kanji:"Remember kanji with meaning + reading + a visual story, not shape alone.",Vocabulary:"Hear the word, say the romaji, recall the meaning, and use it in a sentence.",Grammar:"Learn the pattern, formation, meaning, and one example. Then make your own sentence.",Listening:"Listen once without reading, again with transcript, then repeat aloud.",Speaking:"Copy the tutor's rhythm and repeat until your pronunciation is clear.",Writing:"Follow stroke order, trace once, then write from memory.",Spelling:"Look at Japanese, say it, type the romaji, and check every syllable.","Quick Revision":"Recall without looking first, then check. Active recall is faster than rereading.",Quiz:"Think before answering. Review every mistake and retry it later.","Mock Exam":"Manage time like the real exam. Finish first, then review weak areas.","Level Review":"Use the master notes to recall the whole level before attempting the mock exam."};
  const tip=tips[module]||`Your ${level} AI tutor will guide you through ${module} step by step.`;
  function speak(text=tip){if(typeof window==="undefined"||!window.speechSynthesis)return; window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="en-US"; u.rate=.9; u.onstart=()=>setSpeaking(true); u.onend=()=>setSpeaking(false); window.speechSynthesis.speak(u);}
  function ask(){const q=question.toLowerCase(); let a=tip; if(q.includes("pronoun")||q.includes("read"))a="Listen to the Japanese first, then read the red romaji slowly and repeat it three times."; else if(q.includes("remember")||q.includes("memor"))a="Use See ΓåÆ Hear ΓåÆ Say ΓåÆ Write. Close your eyes and recall it after 30 seconds."; else if(q.includes("grammar"))a="Identify the pattern, formation, meaning and example, then create one personal sentence."; else if(q.includes("exam")||q.includes("test"))a=`For ${level}, finish each lesson revision before the mock. Keep a mistake list and retry weak questions.`; setAnswer(a); speak(a);}
  return <Card className={`border-red-200 bg-gradient-to-br from-red-50 via-white to-amber-50 ${compact?"p-3":"p-5"}`}>
    <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><div className="w-9 h-9 rounded-full bg-red-700 text-white flex items-center justify-center">≡ƒñû</div><div><div className="font-bold text-stone-900">AI Tutor ┬╖ {level}</div><div className="text-xs text-stone-500">{module} coach ┬╖ voice + guidance</div></div></div><button onClick={()=>setOpen(v=>!v)} className="text-xs border border-stone-200 bg-white rounded-lg px-3 py-1.5">{open?"Hide":"Ask tutor"}</button></div>
    {open&&<div className="mt-4 space-y-3"><div className="bg-white rounded-xl border border-stone-200 p-3 text-sm text-stone-700"><b>Tutor tip:</b> {tip}</div><button onClick={()=>speak()} className="inline-flex items-center gap-2 bg-stone-900 text-white rounded-xl px-3 py-2 text-sm">{speaking?<Pause size={14}/>:<Volume2 size={14}/>} Voice tutor</button>{lesson&&<div className="text-xs text-stone-500">Lesson: {lesson.en}</div>}<div className="flex gap-2"><input value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==="Enter"&&ask()} placeholder="Ask: How do I remember this?" className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm bg-white"/><button onClick={ask} className="bg-red-700 text-white rounded-xl px-4 py-2 text-sm">Ask</button></div>{answer&&<div className="bg-white border border-red-100 rounded-xl p-3 text-sm text-stone-700"><b>AI Tutor:</b> {answer}</div>}</div>}
  </Card>;
}

// ---------------- Voice Tutor + step-by-step learning flow ----------------
// The tutor teaches one small item at a time. Learners can hear Japanese,
// see the English-letter reading, repeat it, and optionally use browser
// speech recognition to check their spoken answer.
function VoiceTutor({items=[], title="Voice Tutor", intro="Listen ΓåÆ repeat ΓåÆ understand ΓåÆ practice"}){
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
    rec.onerror=()=>setRecognized("Try again ΓÇö tap the microphone and speak clearly.");
    rec.start();
  }
  function next(){setRecognized("");setHeard(false);setStep(s=>Math.min(s+1,Math.max(items.length-1,0)));}
  return (
    <Card className="p-5 border-red-100 bg-gradient-to-br from-red-50 to-white">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-red-700">≡ƒÄô {title}</div>
          <div className="font-semibold text-stone-900 mt-1">{intro}</div>
        </div>
        <div className="text-xs text-stone-400">{items.length ? `${step+1} / ${items.length}` : ""}</div>
      </div>
      {items.length>0 && (
        <>
          <div className="rounded-2xl bg-white border border-stone-200 p-5 text-center">
            <div className="text-5xl font-bold text-stone-900" lang="ja">{jp}</div>
            <div className="text-xl font-semibold text-red-700 mt-2">≡ƒöñ {reading}</div>
            <div className="text-stone-700 mt-2">{meaning}</div>
            {ta && <div className="text-sm text-red-700/70 mt-1" lang="ta">{ta}</div>}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button onClick={speak} className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2.5 rounded-xl">
                {speaking ? <Pause size={16}/> : <Volume2 size={16}/>} {slow ? "Listen slowly" : "Listen"}
              </button>
              <button onClick={()=>setSlow(v=>!v)} className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm">
                ≡ƒÉó {slow ? "Slow ON" : "Slow mode"}
              </button>
              <button onClick={repeat} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-700">
                ≡ƒÄÖ∩╕Å Repeat
              </button>
            </div>
            {heard && <div className="text-xs text-green-700 mt-3">Γ£ô You listened. Now say <b>{reading}</b> aloud.</div>}
            {recognized && <div className="mt-3 text-sm bg-stone-50 rounded-xl p-3"><b>You said:</b> {recognized}</div>}
          </div>
          <div className="flex justify-between mt-4">
            <button disabled={step===0} onClick={()=>{setRecognized("");setStep(s=>Math.max(0,s-1))}} className="px-4 py-2 rounded-xl border border-stone-200 disabled:opacity-30">ΓåÉ Previous</button>
            <button onClick={next} disabled={step>=items.length-1} className="px-4 py-2 rounded-xl bg-red-700 text-white disabled:opacity-30">Next teaching point ΓåÆ</button>
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
      <div className="text-xs uppercase tracking-widest text-red-700 font-semibold">≡ƒöñ Spell it</div>
      <div className="font-semibold mt-1 mb-4">See the Japanese. Type the English-letter pronunciation.</div>
      <div className="text-center py-4">
        <div className="text-6xl font-bold" lang="ja">{item.jp}</div>
        <button onClick={()=>speakJapanese(item.jp)} className="mt-2 text-sm text-red-700 inline-flex items-center gap-1"><Volume2 size={14}/> Hear</button>
      </div>
      <input value={answer} onChange={e=>{setAnswer(e.target.value);setChecked(false)}} placeholder="Type romaji, e.g. kore" className="w-full border border-stone-200 rounded-xl px-4 py-3 outline-none focus:border-red-500"/>
      {checked && <div className={`mt-3 p-3 rounded-xl ${ok?"bg-green-50 text-green-700":"bg-red-50 text-red-700"}`}>{ok ? "Γ£ô Correct!" : <>Not yet. Correct spelling: <b>{expected}</b></>}</div>}
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
  return (<>
      <AITutor level={"N5"} module="Listening" compact={false}/>
    <Card className="p-5">
      <div className="text-xs uppercase tracking-widest text-red-700 font-semibold">≡ƒÄº Listening</div>
      <div className="font-semibold mt-1 mb-4">Listen first. Do not read. Then reveal the answer.</div>
      <div className="rounded-2xl bg-stone-50 p-5 text-center">
        <div className="text-sm text-stone-500 mb-3">{item.context || "Lesson listening"}</div>
        <button onClick={()=>speakJapanese(item.jp)} className="mx-auto inline-flex items-center gap-2 bg-red-700 text-white px-5 py-3 rounded-xl"><Volume2 size={18}/> Play Japanese</button>
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={()=>{const u=new SpeechSynthesisUtterance(item.jp);u.lang="ja-JP";u.rate=0.55;window.speechSynthesis.speak(u)}} className="px-3 py-2 rounded-lg border border-stone-200 text-sm">≡ƒÉó Slow</button>
          <button onClick={()=>setShow(v=>!v)} className="px-3 py-2 rounded-lg border border-stone-200 text-sm">{show?"Hide transcript":"Reveal transcript"}</button>
        </div>
        {show && <div className="mt-4 text-left bg-white rounded-xl p-4 border border-stone-200">
          <JapaneseReading jp={item.jp} reading={item.r}/>
          <div className="text-sm text-stone-600 mt-2">{item.en}</div>
          {item.ta && <div className="text-sm text-red-700/70" lang="ta">{item.ta}</div>}
        </div>}
      </div>
      <button onClick={()=>{setIdx(i=>(i+1)%Math.max(items.length,1));setShow(false)}} className="mt-4 w-full border border-stone-200 rounded-xl py-2.5">Next listening ΓåÆ</button>
    </Card>
  </>);
}


// ---------------- Quick Revision / Level Notes ----------------
function QuickRevision({lesson, compact=false}){
  const grammar = lesson.grammar || [];
  const vocab = lesson.vocab || [];
  return (<>
      <AITutor level={"N5"} module="Quick Revision" compact={false}/>
    <Card className={`${compact ? "p-4" : "p-6"} bg-amber-50/60 border-amber-200`}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-700 font-semibold">Quick Revision ┬╖ πüÖπüÉσ╛⌐τ┐Æ</div>
          <h3 className="font-bold text-stone-900 mt-1">Lesson {lesson.id} ΓÇö 2 minute review</h3>
        </div>
        <button onClick={()=>speakJapanese(`${lesson.jp}πÇé${vocab.slice(0,3).map(v=>v.jp).join("πÇé")}πÇé${grammar.slice(0,1).map(g=>g.t).join("πÇé")}`)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-stone-900 text-white px-3 py-2 text-xs">
          <Volume2 size={14}/> Listen
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-white p-3 border border-amber-100">
          <div className="text-xs text-stone-400 mb-2">≡ƒöñ Key words</div>
          {vocab.slice(0,5).map((v,i)=><div key={i} className="text-sm mb-2 last:mb-0">
            <span lang="ja" className="font-semibold">{v.jp}</span>
            <span className="text-red-700 ml-2">{v.r || toRomaji(v.jp)}</span>
            <div className="text-stone-500">{v.en}</div>
          </div>)}
        </div>
        <div className="rounded-xl bg-white p-3 border border-amber-100">
          <div className="text-xs text-stone-400 mb-2">≡ƒº⌐ Grammar</div>
          {grammar.slice(0,3).map((g,i)=><div key={i} className="mb-3 last:mb-0">
            <div className="font-semibold text-sm" lang="ja">{g.t}</div>
            <div className="text-xs text-red-700">{g.en}</div>
            <div className="text-xs text-stone-500 mt-1">{g.form}</div>
          </div>)}
        </div>
        <div className="rounded-xl bg-white p-3 border border-amber-100">
          <div className="text-xs text-stone-400 mb-2">≡ƒÄ» Remember</div>
          <div className="text-sm text-stone-700 mb-2"><b>Say:</b> {toRomaji(lesson.jp)}</div>
          <div className="text-sm text-stone-700 mb-2"><b>Meaning:</b> {lesson.en}</div>
          <div className="text-sm text-stone-700"><b>Do:</b> Hear ΓåÆ Read ΓåÆ Say ΓåÆ Write ΓåÆ Quiz</div>
        </div>
      </div>
    </Card>
  </>);
}

function LevelCompletionNotes({level="N5", lessons, progress, goTo}){
  const done = lessons.filter(l=>progress.completedLessons[l.id]);
  const vocab = lessons.flatMap(l=>l.vocab || []);
  const grammar = lessons.flatMap(l=>l.grammar || []);
  const pct = Math.round((done.length/Math.max(lessons.length,1))*100);
  return (<>
      <AITutor level={level} module="Level Review" compact={false}/>
    <div className="space-y-5 pb-24 md:pb-6">
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-7 md:p-10">
        <div className="text-red-400 text-xs tracking-[0.25em] uppercase">Level Complete</div>
        <h2 className="text-3xl md:text-4xl font-bold mt-2">≡ƒÄë JLPT {level} Complete</h2>
        <p className="text-stone-300 mt-2">Your full short-notes revision sheet is ready. Use this before practice tests and mock exams.</p>
        <div className="mt-5"><ProgressBar pct={pct} colorClass="bg-red-500"/></div>
        <div className="text-sm text-stone-400 mt-2">{done.length} / {lessons.length} lessons completed</div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-red-700 font-semibold">Full Short Notes</div>
            <h3 className="text-xl font-bold text-stone-900">JLPT {level} ΓÇö Last-minute revision</h3>
          </div>
          <button onClick={()=>speakJapanese(`JLPT ${level}πÇé${grammar.slice(0,8).map(g=>g.t).join("πÇé")}`)}
            className="inline-flex items-center gap-2 border border-stone-300 rounded-xl px-3 py-2 text-sm"><Volume2 size={15}/> Listen notes</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-stone-50 p-4">
            <h4 className="font-semibold mb-3">≡ƒöñ Vocabulary ΓÇö remember the core words</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vocab.slice(0,60).map((v,i)=><div key={i} className="bg-white rounded-lg p-2 border border-stone-100">
                <div><span lang="ja" className="font-semibold">{v.jp}</span> <span className="text-red-700 text-xs">{v.r || toRomaji(v.jp)}</span></div>
                <div className="text-xs text-stone-500">{v.en}</div>
              </div>)}
            </div>
          </div>
          <div className="rounded-2xl bg-stone-50 p-4">
            <h4 className="font-semibold mb-3">≡ƒº⌐ Grammar ΓÇö patterns at a glance</h4>
            <div className="space-y-3">
              {grammar.slice(0,80).map((g,i)=><div key={i} className="bg-white rounded-lg p-3 border border-stone-100">
                <div className="font-semibold text-sm" lang="ja">{g.t}</div>
                <div className="text-xs text-red-700 mt-0.5">{g.en}</div>
                <div className="text-xs text-stone-500 mt-1"><b>Pattern:</b> {g.form}</div>
                {g.ex && <div className="text-xs mt-1"><span lang="ja">{g.ex.jp}</span> <span className="text-stone-500">ΓÇö {g.ex.en}</span></div>}
              </div>)}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-lg mb-3">≡ƒºá Final revision flow</h3>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            ["1","Kana","Read Hiragana + Katakana"],
            ["2","Kanji","Read N5 kanji + meanings"],
            ["3","Grammar","Recall patterns + examples"],
            ["4","Practice","Listening ΓåÆ spelling ΓåÆ mock exam"]
          ].map(([n,t,d])=><div key={n} className="rounded-xl bg-stone-50 p-4">
            <div className="text-red-700 font-bold">{n}. {t}</div><div className="text-sm text-stone-600 mt-1">{d}</div>
          </div>)}
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <button onClick={()=>goTo("mock")} className="bg-red-700 text-white rounded-xl px-5 py-2.5">Take N5 Mock Exam ΓåÆ</button>
        <button onClick={()=>goTo("characters")} className="border border-stone-300 rounded-xl px-5 py-2.5">Revise Characters</button>
        <button onClick={()=>goTo("lessons")} className="border border-stone-300 rounded-xl px-5 py-2.5">Review Lessons</button>
      </div>
    </div>
  </>);
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
  const qSpeech=(q?.q||"").match(/[πüü-πéôπéí-πâ│Σ╕Ç-Θ╛»πâ╝πÇàπÇîπÇì]+/g)?.join(" ") || q?.options?.[0] || "";
  function answer(opt){if(selected) return;setSelected(opt);if(opt===q.answer)setScore(s=>s+1);}
  function nextQ(){
    if(quizIdx+1<lesson.quiz.length){setQuizIdx(i=>i+1);setSelected(null);}
    else {setFinished(true); const finalScore=score+(selected===q.answer?1:0); onComplete(lesson.id,finalScore,lesson.quiz.length);}
  }
  useEffect(()=>{setStage(0);setQuizIdx(0);setSelected(null);setScore(0);setFinished(false)},[lesson.id]);
  return (<>
      <AITutor level={"N5"} module={stages[stage] || "Lesson"} lesson={lesson} compact={true}/>
    <div className="space-y-5 pb-24 md:pb-6">
      <button onClick={()=>goTo("lessons")} className="flex items-center gap-1 text-sm text-stone-500"><ChevronLeft size={16}/> All lessons</button>
      <div>
        <div className="text-xs text-stone-400">Lesson {lesson.id} / 25 ┬╖ Learn inch by inch</div>
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

      {stage===0 && <VoiceTutor items={teachItems} title={`Teacher mode ┬╖ Lesson ${lesson.id}`} intro="Listen to the teacher one small sentence/word at a time. Hear ΓåÆ read ΓåÆ repeat ΓåÆ understand."/>}
      {stage===1 && <div className="space-y-4"><VoiceTutor items={lesson.vocab} title="Vocabulary tutor" intro="Learn every word with Japanese, romaji, meaning and voice."/><SpellingPractice items={lesson.vocab}/></div>}
      {stage===2 && <div className="space-y-4">
        {lesson.grammar.map((g,i)=><Card key={i} className="p-5">
          <div className="text-xs uppercase tracking-widest text-red-700 font-semibold">Grammar point {i+1}</div>
          <JapaneseReading jp={g.t} className="mt-2"/>
          <div className="text-stone-700 mt-2">{g.en}</div>
          <div className="text-sm text-red-700/70 mt-1" lang="ta">{g.ta}</div>
          <div className="mt-3 bg-stone-50 rounded-xl p-3"><b>Pattern:</b> {g.form}</div>
          <div className="mt-3"><JapaneseReading jp={g.ex.jp}/><div className="text-sm text-stone-600 mt-1">{g.ex.en}</div></div>
          <button onClick={()=>speakJapanese(`${g.t}πÇé${g.ex.jp}`)} className="mt-3 inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl"><Volume2 size={15}/> Tutor explanation</button>
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
        {selected && <div className="mt-4 p-3 rounded-xl bg-stone-50 text-sm">{selected===q.answer?"Γ£ô Correct! ":"Γ£ù Review: "}{q.explain}</div>}
        <button disabled={!selected} onClick={nextQ} className="mt-4 bg-stone-900 disabled:opacity-30 text-white px-5 py-2.5 rounded-xl">{quizIdx+1<lesson.quiz.length?"Next question":"Finish lesson quiz"}</button>
      </Card>}
      {stage===6 && finished && <Card className="p-8 max-w-xl text-center">
        <Award className="mx-auto text-red-700 mb-3" size={40}/>
        <div className="text-2xl font-bold">Lesson complete ≡ƒÄë</div>
        <div className="text-stone-500 mt-1 mb-5">Quiz score: {score + (selected===q.answer?1:0)} / {lesson.quiz.length}</div>
        <div className="text-sm text-stone-500 mb-5">You completed: teaching ΓåÆ vocabulary ΓåÆ grammar ΓåÆ listening ΓåÆ spelling ΓåÆ quiz.</div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={()=>setStage(5)} className="border border-stone-300 rounded-xl px-5 py-2.5">Quick revision</button>
          {isLastLesson
            ? <button onClick={()=>goTo("levelComplete","N5")} className="bg-red-700 text-white rounded-xl px-5 py-2.5">View full N5 notes ΓåÆ</button>
            : <button onClick={()=>goTo("lesson",Math.min(lesson.id+1,25))} className="bg-red-700 text-white rounded-xl px-5 py-2.5">Next lesson ΓåÆ</button>}
        </div>
      </Card>}
    </div>
  </>);
}


// ---------------- Mistake Book ----------------
function MistakeBook({mistakes}){
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">≡ƒôò ΘûôΘüòπüäπâÄπâ╝πâê <span className="text-stone-400 text-base font-normal">Mistake Book</span></h2>
      {mistakes.length===0 ? (
        <Card className="p-10 text-center text-stone-400">No mistakes recorded yet ΓÇö take a lesson quiz or mock exam to build your review list.</Card>
      ) : (
        <div className="space-y-3">
          {mistakes.map((m,i)=>(
            <Card key={i} className="p-4">
              <div className="text-stone-900 font-medium mb-1" lang="ja">{m.q}</div>
              <div className="text-sm text-stone-500 mb-2">Your answer: <span className="text-red-600">{m.userAnswer}</span> ┬╖ Correct: <span className="text-green-600">{m.answer}</span></div>
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

  return (<>
      <AITutor level={"N5"} module="Progress" compact={true}/>
    <div className="space-y-6 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">ΘÇ▓µìù <span className="text-stone-400 text-base font-normal">Progress</span></h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5"><div className="text-xs text-stone-500 mb-1">N5 Readiness</div><div className="text-2xl font-bold">{pct}%</div></Card>
        <Card className="p-5"><div className="text-xs text-stone-500 mb-1">Avg Quiz Score</div><div className="text-2xl font-bold">{avgScore}%</div></Card>
        <Card className="p-5"><div className="text-xs text-stone-500 mb-1">Streak</div><div className="text-2xl font-bold">{progress.streak}d</div></Card>
        <Card className="p-5"><div className="text-xs text-stone-500 mb-1">Best Mock Score</div><div className="text-2xl font-bold">{mockBest!==null ? mockBest+"%" : "ΓÇö"}</div></Card>
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
  </>);
}

// ---------------- Mock Exam ----------------
function buildMockExam(allQuiz, allVocab, lessons){
  // Vocabulary section (8 questions)
  const vocabQ = shuffleArr(allQuiz).slice(0,8).map(q=>({...q, section:"vocab"}));
  // Grammar + Reading section (8 questions) - pull remaining quiz + 2 constructed reading Qs
  const grammarQ = shuffleArr(allQuiz.filter(q=>!vocabQ.includes(q))).slice(0,6).map(q=>({...q, section:"grammar"}));
  const readingPassages = [
    {
      passage: "πéÅπüƒπüùπü» πü╛πüäπüéπüò 7πüÿπü½ πüèπüìπü╛πüÖπÇé7πüÿπü»πéôπü½ πüéπüòπüöπü»πéôπéÆ πüƒπü╣πü╛πüÖπÇéπü¥πéîπüïπéë 8πüÿπü½ πüîπüúπüôπüåπü╕ πüäπüìπü╛πüÖπÇéπüîπüúπüôπüåπü» 9πüÿπüïπéë 3πüÿπü╛πüºπüºπüÖπÇé",
      passageEn: "I get up at 7 every morning. I eat breakfast at 7:30. Then I go to school at 8. School is from 9 to 3.",
      q:"πüîπüúπüôπüåπü» πü¬πéôπüÿπüïπéë πüºπüÖπüïπÇé (What time does school start?)",
      qta:"α«¬α«│α»ìα«│α«┐ α«Äα«ñα»ìα«ñα«⌐α»ê α««α«úα«┐α«òα»ìα«òα»ü α«ñα»èα«ƒα«Öα»ìα«òα»üα«òα«┐α«▒α«ñα»ü?",
      options:["7πüÿ","7πüÿπü»πéô","8πüÿ","9πüÿ"], answer:"9πüÿ",
      explain:"The passage states πüîπüúπüôπüåπü» 9πüÿπüïπéë 3πüÿπü╛πüºπüºπüÖ (school is from 9 to 3)."
    },
    {
      passage: "πüìπü«πüå πâçπâæπâ╝πâêπüº πé╖πâúπâäπéÆ πüïπüäπü╛πüùπüƒπÇéπé╖πâúπâäπü» 3,000πüêπéôπüºπüùπüƒπÇéπüƒπüïπüïπüúπüƒπüºπüÖπüîπÇüπüäπüä πé╖πâúπâäπüºπüÖπüïπéëπÇüπüïπüäπü╛πüùπüƒπÇé",
      passageEn: "Yesterday I bought a shirt at the department store. The shirt was 3,000 yen. It was expensive, but I bought it because it's a good shirt.",
      q:"πé╖πâúπâäπü» πüäπüÅπéëπüºπüùπüƒπüïπÇé (How much was the shirt?)",
      qta:"α«Üα«ƒα»ìα«ƒα»êα«»α«┐α«⌐α»ì α«╡α«┐α«▓α»ê α«Äα«⌐α»ìα«⌐?",
      options:["300πüêπéô","3,000πüêπéô","30,000πüêπéô","3πüêπéô"], answer:"3,000πüêπéô",
      explain:"πé╖πâúπâäπü» 3,000πüêπéôπüºπüùπüƒ = The shirt was 3,000 yen."
    },
  ];
  const readingQ = readingPassages.map((r,i)=>({q:r.q, qta:r.qta, options:r.options, answer:r.answer, explain:r.explain, passage:r.passage, passageEn:r.passageEn, section:"reading", id:"read"+i}));

  // Listening section (4 questions) - text-based simulation with transcript reveal
  const listeningQ = [
    {situation:"At a restaurant", situationJp:"πâ¼πé╣πâêπâ⌐πâ│πüº", transcript:"πüÖπü┐πü╛πü¢πéôπÇüπâíπâïπâÑπâ╝πéÆ πüÅπüáπüòπüäπÇé∩╝Åπü»πüäπÇüπü⌐πüåπü₧πÇé∩╝ÅπéÅπüƒπüùπü» πé½πâ¼πâ╝πâ⌐πéñπé╣πéÆ πüèπü¡πüîπüäπüùπü╛πüÖπÇé",
     q:"Σ╜òπéÆ πüƒπü╣πü╛πüÖπüïπÇé (What will they eat?)", qta:"α«àα«╡α«░α»ìα«òα«│α»ì α«Äα«⌐α»ìα«⌐ α«Üα«╛α«¬α»ìα«¬α«┐α«ƒα»üα«╡α«╛α«░α»ìα«òα«│α»ì?",
     options:["πüÖπüù","πé½πâ¼πâ╝πâ⌐πéñπé╣","πâ⌐πâ╝πâíπâ│","πüåπü⌐πéô"], answer:"πé½πâ¼πâ╝πâ⌐πéñπé╣",
     explain:"πéÅπüƒπüùπü» πé½πâ¼πâ╝πâ⌐πéñπé╣πéÆ πüèπü¡πüîπüäπüùπü╛πüÖ = I'd like curry rice, please."},
    {situation:"At the station", situationJp:"πüêπüìπüº", transcript:"πüñπüÄπü« πüºπéôπüùπéâπü» Σ╜òπüÿπüºπüÖπüïπÇé∩╝ÅπüñπüÄπü« πüºπéôπüùπéâπü» 10πüÿ15πü╡πéôπüºπüÖπÇé",
     q:"πüñπüÄπü« πüºπéôπüùπéâπü» Σ╜òπüÿπüºπüÖπüïπÇé (What time is the next train?)", qta:"α«àα«ƒα»üα«ñα»ìα«ñ α«░α«»α«┐α«▓α»ì α«Äα«ñα»ìα«ñα«⌐α»ê α««α«úα«┐α«òα»ìα«òα»ü?",
     options:["10πüÿ","10πüÿ15πü╡πéô","10πüÿ50πü╡πéô","11πüÿ"], answer:"10πüÿ15πü╡πéô",
     explain:"πüñπüÄπü« πüºπéôπüùπéâπü» 10πüÿ15πü╡πéôπüºπüÖ = The next train is at 10:15."},
    {situation:"At home", situationJp:"πüäπüêπüº", transcript:"πüéπüùπüƒπü» πüéπéüπüºπüÖπüïπéëπÇüπüïπüòπéÆ πééπüúπüª πüäπüúπüª πüÅπüáπüòπüäπÇé",
     q:"πüéπüùπüƒ Σ╜òπéÆ πééπüúπüª πüäπüìπü╛πüÖπüïπÇé (What should you bring tomorrow?)", qta:"α«¿α«╛α«│α»ê α«Äα«⌐α»ìα«⌐ α«òα»èα«úα»ìα«ƒα»ü α«Üα»åα«▓α»ìα«▓ α«╡α»çα«úα»ìα«ƒα»üα««α»ì?",
     options:["πü╝πüåπüù","πüïπüò","πüÅπüñ","πüïπü░πéô"], answer:"πüïπüò",
     explain:"πüïπüòπéÆ πééπüúπüª πüäπüúπüª πüÅπüáπüòπüä = Please bring an umbrella."},
    {situation:"At school", situationJp:"πüîπüúπüôπüåπüº", transcript:"πüùπéàπüÅπüáπüäπü» πüéπüùπüƒ πüÿπéàπüÄπéçπüåπü« πü╛πüêπü½ πüáπüùπüª πüÅπüáπüòπüäπÇé",
     q:"πüùπéàπüÅπüáπüäπü» πüäπüñ πüáπüùπü╛πüÖπüïπÇé (When should you submit the homework?)", qta:"α«╡α»Çα«ƒα»ìα«ƒα»üα«¬α»ìα«¬α«╛α«ƒα«ñα»ìα«ñα»ê α«Äα«¬α»ìα«¬α»ïα«ñα»ü α«Üα««α«░α»ìα«¬α»ìα«¬α«┐α«òα»ìα«ò α«╡α»çα«úα»ìα«ƒα»üα««α»ì?",
     options:["πüìπéçπüå","πüéπüùπüƒ πüÿπéàπüÄπéçπüåπü« πü╛πüêπü½","πüéπüùπüƒ πüÿπéàπüÄπéçπüåπü« πüéπü¿πüº","πéëπüäπüùπéàπüå"], answer:"πüéπüùπüƒ πüÿπéàπüÄπéçπüåπü« πü╛πüêπü½",
     explain:"πüéπüùπüƒ πüÿπéàπüÄπéçπüåπü« πü╛πüêπü½ πüáπüùπüª πüÅπüáπüòπüä = Please submit it before tomorrow's class."},
  ].map((l,i)=>({...l, section:"listening", id:"listen"+i}));

  return { vocab: vocabQ, grammar: [...grammarQ, ...readingQ], listening: listeningQ };
}
function shuffleArr(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

const MOCK_SECTIONS = [
  {key:"vocab", label:"Language Knowledge (Vocabulary)", labelJp:"Φ¿ÇΦ¬₧τƒÑΦ¡ÿ∩╝êµûçσ¡ùπâ╗Φ¬₧σ╜Ö∩╝ë", minutes:20},
  {key:"grammar", label:"Language Knowledge (Grammar) + Reading", labelJp:"Φ¿ÇΦ¬₧τƒÑΦ¡ÿ∩╝êµûçµ│ò∩╝ëπâ╗Φ¬¡Φºú", minutes:40},
  {key:"listening", label:"Listening", labelJp:"Φü┤Φºú", minutes:30},
];

function MockExamIntro({onStart, goTo}){
  return (<>
      <AITutor level={"N5"} module="Mock Exam" compact={false}/>
    <div className="space-y-6 max-w-2xl pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">µ¿íµô¼Φ⌐ªΘ¿ô <span className="text-stone-400 text-base font-normal">JLPT N5 Mock Exam</span></h2>
      <Card className="p-6">
        <p className="text-stone-600 mb-4">This simulates the official N5 section structure and timing. Questions are original practice material inspired by JLPT formats ΓÇö not real JLPT questions.</p>
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
        <button onClick={onStart} className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-xl">≡ƒÄî Start JLPT N5 Mock Test</button>
      </Card>
    </div>
  </>);
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
            <div className="text-xs text-stone-500">{sectionMeta.labelJp} ┬╖ {sectionMeta.label}</div>
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
            {qIdx+1<questions.length ? "Next ΓåÆ" : (sectionIdx+1<sectionOrder.length ? "Next Section ΓåÆ" : "Submit Exam")}
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
    {role:"assistant",text:`πüôπéôπü½πüíπü»! I'm your personal ${level} learning assistant. I will plan your daily practice, explain mistakes and keep you moving toward the ${level} exam.`},
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
    if(s.includes("pronoun")||s.includes("read")) return "Use Japanese ΓåÆ romaji ΓåÆ meaning. Listen first, say the romaji aloud three times, then hide the romaji and read the Japanese.";
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
          <div><div className="font-bold">Personal AI Assistant</div><div className="text-xs text-stone-300">{level} ┬╖ {cfg.title} ┬╖ always-on study coach</div></div>
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">ΓùÅ Online</div>
      </div>
    </div>
    <div className="p-4 bg-stone-50 max-h-80 overflow-y-auto space-y-3">
      {messages.map((m,i)=><div key={i} className={`flex ${m.role==="user"?"justify-end": "justify-start"}`}>
        <div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm ${m.role==="user"?"bg-stone-900 text-white":"bg-white border border-stone-200 text-stone-700"}`}>
          {m.text}
          {m.role==="assistant" && <button onClick={()=>speak(m.text)} className="ml-2 inline-flex align-middle text-stone-400 hover:text-red-700" title="Listen"><Volume2 size={14}/></button>}
        </div>
      </div>)}
      {typing && <div className="text-xs text-stone-400">AI is preparing your coaching responseΓÇª</div>}
    </div>
    <div className="p-3 border-t border-stone-200 flex gap-2">
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask your AI tutor anythingΓÇª" className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-red-500"/>
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
        {!d && <button onClick={t.action} className="text-xs font-semibold text-red-700 px-2 py-1">Open ΓåÆ</button>}
      </div>})}
    </div>
    {doneCount===tasks.length && <div className="mt-4 p-3 rounded-xl bg-green-100 text-green-800 text-sm font-medium">≡ƒÄë Mission complete. Your next session starts with a smarter review based on today's work.</div>}
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
  function launch(){setOpen(true);setChat([{role:"assistant",text:mode==="mentor"?`Welcome. IΓÇÖm your ${level} mentor. IΓÇÖve reviewed your learning path. Today you will complete one core lesson, its revision, and one checkpoint quiz.`:mode==="interviewer"?`Let's begin your ${level} checkpoint. Answer aloud first, then compare with the model pronunciation.`:`Welcome back. Your ${level} AI coach is ready. Your first priority today is the assigned daily mission.`}]);}
  return <Card className="p-5 border-red-200 bg-gradient-to-br from-red-50 via-white to-amber-50">
    <div className="flex items-center gap-2 mb-3"><div className="w-10 h-10 rounded-xl bg-stone-950 text-white flex items-center justify-center"><Icon size={20}/></div><div><div className="font-bold text-stone-900">Guided AI Workspace</div><div className="text-xs text-stone-500">Click once to start an auto-guided conversation</div></div></div>
    <div className="grid sm:grid-cols-3 gap-2 mb-4">{Object.entries(cards).map(([k,v])=><button key={k} onClick={()=>setMode(k)} className={`text-left p-3 rounded-xl border ${mode===k?"border-red-400 bg-white":"border-stone-200 bg-white/70"}`}><div className="text-sm font-semibold">{v.title}</div><div className="text-[11px] text-stone-500 mt-1">{v.desc}</div></button>)}</div>
    <button onClick={launch} className="w-full bg-stone-950 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"><MessageCircle size={17}/> {prompts[mode]}</button>
    {open && <div className="mt-4 p-4 rounded-xl bg-white border border-stone-200"><div className="space-y-2 mb-3">{chat.map((m,i)=><div key={i} className="text-sm p-3 rounded-xl bg-stone-50">{m.text}</div>)}</div><button onClick={()=>setChat(c=>[...c,{role:"assistant",text:"Task assigned: complete today's mission, then return here. Your next task will unlock after completion."}])} className="text-xs font-semibold text-red-700">Assign next task ΓåÆ</button></div>}
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
// AI EXAM PLANNER ΓÇö personalized roadmap for N5/N4/N3/N2/N1
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
  const scoreRule = goal === "high" ? "Aim for consistent 75ΓÇô85%+ practice accuracy before exam week." :
                    goal === "safe" ? "Prioritize section minimums and repair weak areas before chasing difficult questions." :
                    "Build reliable basics first, then use mocks to remove repeated mistakes.";

  return (
    <section className="ai-exam-planner">
      <div className="planner-hero">
        <span className="eyebrow">PERSONAL AI EXAM PLANNER</span>
        <h2>{level} ΓåÆ Your roadmap to exam day</h2>
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
            <span>┬╖</span>
            <strong>{daily} min/day</strong>
            <span>┬╖</span>
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
              <h3>≡ƒôÜ Modules to clear</h3>
              <ul>{cfg.modules.map(m => <li key={m}>{m}</li>)}</ul>
            </article>
            <article>
              <h3>≡ƒô¥ Exam sections</h3>
              <ul>{cfg.rounds.map(r => <li key={r}>{r}</li>)}</ul>
              <small>JLPT is section-based; treat each section as its own timed challenge and check the official rules for your test date.</small>
            </article>
            <article>
              <h3>≡ƒºá Forget ΓåÆ Remember protocol</h3>
              <ol>
                <li>Close the notes and recall from memory.</li>
                <li>Check the answer and mark the exact gap.</li>
                <li>Say it aloud and write it once.</li>
                <li>Review again after 1 day, 3 days and 7 days.</li>
              </ol>
            </article>
            <article>
              <h3>≡ƒÄ» Exam-day strategy</h3>
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
            <h3>≡ƒñû Today's AI mission</h3>
            <p>1 recall drill ΓåÆ 2 core lessons ΓåÆ 1 listening set ΓåÆ 1 spelling/reading drill ΓåÆ 10-question checkpoint ΓåÆ error review.</p>
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
  const [param, setParam] = useState(null);
  const [mockExamData, setMockExamData] = useState(null);
  const [mockResult, setMockResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mistakes, setMistakes] = useState([]);
  const [activeLevel, setActiveLevel] = useState(()=>{try{return localStorage.getItem("nv-active-level")||"N5";}catch(e){return "N5";}});
  useEffect(()=>{try{localStorage.setItem("nv-active-level",activeLevel);}catch(e){}},[activeLevel]);
  const { progress, completeLesson, recordMock, loaded } = useProgress();

  function goTo(scr, p=null){
    if(scr==="levelDetail"){ setActiveLevel(typeof p==="string"?p:(p?.code||"N5")); }
    setScreen(scr); setParam(p); setSidebarOpen(false);
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

  if(!loaded){
    return <div className="min-h-screen flex items-center justify-center text-stone-400">Loading...</div>;
  }

  if(screen === "mockRun" && mockExamData){
    return <MockExamRunner exam={mockExamData} onFinish={finishMock} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans" style={{fontFamily:"'Noto Sans JP','Noto Sans Tamil',ui-sans-serif,system-ui"}}>
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-stone-200 min-h-screen sticky top-0">
          <div className="p-6 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600"/>
              <span className="font-bold text-stone-900 tracking-tight">Nihongo Vertex</span>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(n=>{
              const Icon = n.icon;
              const active = screen===n.key || (n.key==="lessons" && screen==="lesson") || (n.key==="levels" && screen==="levelDetail") || (n.key==="mock" && (screen==="mockResult"));
              return (
                <button key={n.key} onClick={()=>goTo(n.key)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${active ? "bg-red-50 text-red-700 font-medium" : "text-stone-600 hover:bg-stone-50"}`}>
                  <Icon size={18}/> <span lang="ja">{n.jp}</span><span className="text-stone-400 text-xs">{n.en}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-stone-100 text-xs text-stone-400">
            Practice questions are original learning materials inspired by JLPT formats and are not official JLPT questions.
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-stone-200 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600"/>
            <span className="font-bold text-stone-900">Nihongo Vertex</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1"><Flame size={14} className="text-red-600"/>{progress.streak}</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-red-600"/>{progress.xp}</span>
          </div>
        </div>

        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-8 max-w-5xl mx-auto w-full">
          {screen==="home" && <Home progress={progress} lessons={LESSONS} goTo={goTo}/>}
          {screen==="lessons" && <LessonList lessons={LESSONS} progress={progress} goTo={goTo}/>}
          {screen==="characters" && <CharacterLab/>}
          {screen==="lesson" && currentLesson && <LessonFlow lesson={currentLesson} goTo={goTo} onComplete={handleLessonComplete} isLastLesson={currentLesson.id===LESSONS.length}/>}          {screen==="levelComplete" && <LevelCompletionNotes level="N5" lessons={LESSONS} progress={progress} goTo={goTo}/>}
          {screen==="levels" && <LevelSelector progress={progress} lessons={LESSONS} goTo={goTo} otherLevels={OTHER_LEVELS}/>}
          {screen==="levelDetail" && <LevelDetail level={param} otherLevels={OTHER_LEVELS} goTo={goTo}/>}
          {screen==="mistakes" && <MistakeBook mistakes={mistakes}/>}
          {screen==="mock" && <MockExamIntro onStart={startMock} goTo={goTo}/>}
          {screen==="mockResult" && mockResult && <MockExamResult result={mockResult} goTo={goTo}/>}
          {screen==="progress" && <ProgressDashboard progress={progress} lessons={LESSONS}/>}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-stone-200 flex justify-around py-2">
        {NAV.map(n=>{
          const Icon = n.icon;
          const active = screen===n.key || (n.key==="lessons" && screen==="lesson");
          return (
            <button key={n.key} onClick={()=>goTo(n.key)} className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] ${active ? "text-red-700" : "text-stone-400"}`}>
              <Icon size={20}/>
              <span lang="ja">{n.jp}</span>
            </button>
          );
        })}
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
  const japanese = lesson.japanese || lesson.character || "πüé";
  const romaji = lesson.romaji || "a";
  const meaning = lesson.meaning || "sound / meaning";
  const object = lesson.memoryObject || "apple";
  const emoji = lesson.emoji || "≡ƒìÄ";
  const tip = lesson.memoryTip || `Connect ${japanese} with ${emoji}. Say "${romaji}" while tracing the shape.`;
  const pattern = lesson.pattern || `${japanese} ΓåÆ ${romaji} ΓåÆ ${meaning}`;

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
          <p>See it ΓåÆ connect it ΓåÆ hear it ΓåÆ draw it ΓåÆ recall it.</p>
        </div>
        <button onClick={() => setShowAnimation(v => !v)}>
          {showAnimation ? "Pause animation" : "Play animation"}
        </button>
      </div>

      <div className="memory-stage">
        <div className={`character-animation ${showAnimation ? "is-playing" : ""}`}>
          <div className="memory-object">{emoji}</div>
          <div className="memory-arrow">Γåö</div>
          <div className="japanese-character">{japanese}</div>
        </div>
        <div className="pronunciation-row">
          <strong>{japanese}</strong>
          <span>{romaji}</span>
          <span>{meaning}</span>
          <button onClick={speak}>≡ƒöè Listen</button>
        </div>
      </div>

      <div className="memory-pattern">
        <span>≡ƒºá EASY PATTERN</span>
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
            <strong>Γ£ì∩╕Å Draw {japanese}</strong>
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
        ≡ƒÆí <strong>Remember:</strong> Never memorize the symbol alone. Attach a <b>shape + object + sound + meaning + movement</b>.
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
    { char: "πüé", romaji: "a" }, { char: "πüä", romaji: "i" },
    { char: "πüå", romaji: "u" }, { char: "πüê", romaji: "e" },
    { char: "πüè", romaji: "o" }
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
      setResult(value.includes(expected) ? "Γ£à Good! Your pronunciation matched." : `Try again. Say: ${current.romaji}`);
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
      setResult(`Order recall: ${pct}%. ${pct >= 80 ? "≡ƒÄë Excellent ΓÇö you recalled the sequence!" : "≡ƒöü Repeat slowly, then try the whole sequence again."}`);
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
        <span>{current.char} ┬╖ {current.romaji}</span>
      </div>

      <div className="character-hearing-card">
        <div className="big-character">{mode === "blind" ? "?" : current.char}</div>
        <div>
          <b>Romaji: {current.romaji}</b>
          <button onClick={() => speak(current.char)}>≡ƒöè Hear Japanese</button>
          <button onClick={hearThenWrite}>≡ƒÄº Hear ΓåÆ Find ΓåÆ Write</button>
        </div>
      </div>

      <div className="writing-modes">
        <button className={mode === "write" ? "active" : ""} onClick={() => setMode("write")}>Γ£ì∩╕Å Write</button>
        <button className={mode === "blind" ? "active" : ""} onClick={() => setMode("blind")}>≡ƒºá Recall</button>
        <button className={mode === "order" ? "active" : ""} onClick={() => setMode("order")}>≡ƒöó Full Order</button>
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
          <h3>≡ƒºá Say the complete learned order</h3>
          <div className="order-strip">
            {items.map((x, i) => <span key={i}>{i + 1}. {x.char}<small>{x.romaji}</small></span>)}
          </div>
          <p>First listen once. Then hide the romaji and say the whole sequence from memory.</p>
          <button onClick={() => items.forEach((x, i) => setTimeout(() => speak(x.char, 0.6), i * 700))}>≡ƒöè Play full order</button>
          <button onClick={startOrderSpeaking}>≡ƒÄÖ∩╕Å I will say the full order</button>
        </div>
      )}

      <div className="speaking-check">
        <h3>≡ƒùú∩╕Å Say this character</h3>
        <p>Speak the English-letter reading: <b>{current.romaji}</b></p>
        <button onClick={startSpeaking}>≡ƒÄÖ∩╕Å Start pronunciation check</button>
        {spoken && <span>You said: {spoken}</span>}
      </div>

      {result && <div className="practice-result">{result}</div>}

      <div className="lab-navigation">
        <button disabled={index === 0} onClick={() => { setIndex(i => i - 1); clearCanvas(); setResult(""); }}>ΓåÉ Previous</button>
        <button onClick={() => { setIndex(i => (i + 1) % items.length); clearCanvas(); setResult(""); }}>Next character ΓåÆ</button>
      </div>

      <div className="lab-tip">
        ≡ƒÆí <b>Memory rule:</b> Hear it ΓåÆ look for it ΓåÆ write it ΓåÆ say it ΓåÆ recall it without looking.
      </div>
    </section>
  );
}
