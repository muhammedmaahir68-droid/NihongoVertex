import React, { useState, useEffect, useMemo, useRef } from "react";
import Syllabus from "./components/Syllabus";
import KanaExplorer from "./components/KanaExplorer";
import KanjiDictionary from "./components/KanjiDictionary";
import QuizEngine from "./components/QuizEngine";
import { OBJECT_FIRST_SCENES } from "./data/objectFirstScenes";
import { BookOpen, Home as HomeIcon, Layers, PenTool, Headphones, ListChecks, ClipboardCheck, AlertCircle, TrendingUp, Settings, Menu, X, Flame, Star, ChevronRight, ChevronLeft, Flag, Clock, CheckCircle2, XCircle, Play, Pause, RotateCcw, Award, Lock, Volume2, PenLine, Search, Sparkles, Bot, MessageCircle, CalendarCheck, Target, Briefcase, Send, Trophy, Bell, UserRound, Check, Zap } from "lucide-react";

// ===== Data (N5: sourced from user-uploaded Minna no Nihongo I translation/grammar notes; N4-N1: sample from public JLPT references) =====
// Nihongo Vertex — N5 curriculum data
// Sourced from the structure of Minna no Nihongo I (Lessons 1-25), the user's own uploaded
// translation/grammar-note material. Tamil (TA) and English (EN) glosses are original.
// N4-N1 sample data is drawn from well-established public JLPT study references
// (JLPTsensei-style grammar groupings) and is explicitly marked as a sample/expandable set.

const LESSONS = [
{id:1,jp:"これは　なんですか",en:"What is this?",ta:"இது என்ன?",
 vocab:[
  {jp:"これ",r:"kore",en:"this (thing)",ta:"இது"},
  {jp:"それ",r:"sore",en:"that (thing, near you)",ta:"அது (உன் அருகில்)"},
  {jp:"あれ",r:"are",en:"that (thing, over there)",ta:"அது (தூரத்தில்)"},
  {jp:"なん／なに",r:"nan/nani",en:"what",ta:"என்ன"},
  {jp:"ほん",r:"hon",en:"book",ta:"புத்தகம்"},
  {jp:"せんせい",r:"sensei",en:"teacher",ta:"ஆசிரியர்"},
 ],
 grammar:[
  {t:"AはBです",en:"A is B (topic marker は)",ta:"A என்பது B ஆகும் (は என்பது தலைப்பு குறியீடு)",
   form:"Noun + は + Noun + です",
   ex:{jp:"これは　ほんです。",en:"This is a book.",ta:"இது ஒரு புத்தகம்."}},
  {t:"～か（question)",en:"か turns a sentence into a question",ta:"か என்பது வினா குறியீடு",
   form:"…です + か",
   ex:{jp:"これは　ほんですか。",en:"Is this a book?",ta:"இது புத்தகமா?"}},
 ]},
{id:2,jp:"それは　わたしの　かさです",en:"That is my umbrella",ta:"அது என் குடை",
 vocab:[
  {jp:"この／その／あの",r:"kono/sono/ano",en:"this/that/that (+ noun)",ta:"இந்த/அந்த/அந்த (பெயர்ச்சொல்லுடன்)"},
  {jp:"ここ／そこ／あそこ",r:"koko/soko/asoko",en:"here/there/over there",ta:"இங்கே/அங்கே/அங்கே தூரத்தில்"},
  {jp:"かさ",r:"kasa",en:"umbrella",ta:"குடை"},
  {jp:"つくえ",r:"tsukue",en:"desk",ta:"மேசை"},
  {jp:"の",r:"no",en:"possession particle (~'s)",ta:"உடைமை குறியீடு"},
 ],
 grammar:[
  {t:"AのB",en:"possession / attribute: A's B",ta:"உடைமை: A இன் B",
   form:"Noun + の + Noun",
   ex:{jp:"これは　わたしの　かさです。",en:"This is my umbrella.",ta:"இது என் குடை."}},
  {t:"この／その／あの + Noun",en:"this/that + noun (must be followed by a noun)",ta:"இந்த/அந்த + பெயர்ச்சொல்",
   form:"この/その/あの + Noun",
   ex:{jp:"その　ほんは　わたしのです。",en:"That book is mine.",ta:"அந்தப் புத்தகம் என்னுடையது."}},
 ]},
{id:3,jp:"ここは　しょくどうです",en:"This is the cafeteria",ta:"இது உணவகம்",
 vocab:[
  {jp:"しょくどう",r:"shokudou",en:"cafeteria",ta:"உணவகம்"},
  {jp:"だいがく",r:"daigaku",en:"university",ta:"பல்கலைக்கழகம்"},
  {jp:"いま",r:"ima",en:"now",ta:"இப்போது"},
  {jp:"きます",r:"kimasu",en:"to come",ta:"வருதல்"},
  {jp:"いきます",r:"ikimasu",en:"to go",ta:"செல்லுதல்"},
 ],
 grammar:[
  {t:"場所は Noun です",en:"place + は + noun (identifying a place)",ta:"இடம் + は + பெயர்ச்சொல்",
   form:"Place + は + Noun + です",
   ex:{jp:"ここは　だいがくです。",en:"This is the university.",ta:"இது பல்கலைக்கழகம்."}},
  {t:"～へ　いきます／きます",en:"へ marks direction of movement",ta:"へ திசையைக் குறிக்கிறது",
   form:"Place + へ + いきます/きます",
   ex:{jp:"がっこうへ　いきます。",en:"I go to school.",ta:"நான் பள்ளிக்குச் செல்கிறேன்."}},
 ]},
{id:4,jp:"いま　なんじですか",en:"What time is it now?",ta:"இப்போது என்ன நேரம்?",
 vocab:[
  {jp:"じ",r:"ji",en:"o'clock",ta:"மணி"},
  {jp:"はん",r:"han",en:"half (past)",ta:"அரை"},
  {jp:"おきます",r:"okimasu",en:"to get up",ta:"எழுந்திருத்தல்"},
  {jp:"ねます",r:"nemasu",en:"to sleep",ta:"தூங்குதல்"},
  {jp:"はたらきます",r:"hatarakimasu",en:"to work",ta:"வேலை செய்தல்"},
 ],
 grammar:[
  {t:"～から～まで",en:"from ~ to ~ (time/place range)",ta:"~ முதல் ~ வரை",
   form:"A + から + B + まで",
   ex:{jp:"9じから　5じまで　はたらきます。",en:"I work from 9 to 5.",ta:"நான் 9 மணி முதல் 5 மணி வரை வேலை செய்கிறேன்."}},
 ]},
{id:5,jp:"エレベーターは　どこですか",en:"Where is the elevator?",ta:"லிப்ட் எங்கே?",
 vocab:[
  {jp:"どこ",r:"doko",en:"where",ta:"எங்கே"},
  {jp:"いきます",r:"ikimasu",en:"to go",ta:"செல்லுதல்"},
  {jp:"でんしゃ",r:"densha",en:"train",ta:"ரயில்"},
  {jp:"バス",r:"basu",en:"bus",ta:"பேருந்து"},
  {jp:"タクシー",r:"takushi-",en:"taxi",ta:"டாக்ஸி"},
 ],
 grammar:[
  {t:"～で（乗り物）",en:"で marks the means of transport",ta:"で போக்குவரத்து சாதனத்தைக் குறிக்கிறது",
   form:"Vehicle + で + いきます",
   ex:{jp:"バスで　だいがくへ　いきます。",en:"I go to university by bus.",ta:"நான் பேருந்தில் பல்கலைக்கழகம் செல்கிறேன்."}},
  {t:"～と（with）",en:"と marks 'together with'",ta:"と உடன் என்பதைக் குறிக்கிறது",
   form:"Person + と + いきます",
   ex:{jp:"ともだちと　いきます。",en:"I go with a friend.",ta:"நான் நண்பருடன் செல்கிறேன்."}},
 ]},
{id:6,jp:"なにを　かいますか",en:"What will you buy?",ta:"நீங்கள் என்ன வாங்குவீர்கள்?",
 vocab:[
  {jp:"かいます",r:"kaimasu",en:"to buy",ta:"வாங்குதல்"},
  {jp:"たべます",r:"tabemasu",en:"to eat",ta:"சாப்பிடுதல்"},
  {jp:"のみます",r:"nomimasu",en:"to drink",ta:"குடித்தல்"},
  {jp:"パン",r:"pan",en:"bread",ta:"ரொட்டி"},
  {jp:"みず",r:"mizu",en:"water",ta:"தண்ணீர்"},
 ],
 grammar:[
  {t:"～を（object marker)",en:"を marks the direct object of a verb",ta:"を செயப்படுபொருளைக் குறிக்கிறது",
   form:"Noun + を + Verb",
   ex:{jp:"パンを　たべます。",en:"I eat bread.",ta:"நான் ரொட்டி சாப்பிடுகிறேன்."}},
  {t:"～や～（など）",en:"listing a few examples among others",ta:"சில உதாரணங்களைப் பட்டியலிடுதல்",
   form:"A + や + B",
   ex:{jp:"パンや　みずを　かいます。",en:"I buy bread, water, etc.",ta:"நான் ரொட்டி, தண்ணீர் போன்றவை வாங்குகிறேன்."}},
 ]},
{id:7,jp:"しゃしんを　とりましょう",en:"Let's take a photo",ta:"புகைப்படம் எடுப்போம்",
 vocab:[
  {jp:"とります",r:"torimasu",en:"to take (photo)",ta:"எடுத்தல்"},
  {jp:"かします",r:"kashimasu",en:"to lend",ta:"கடன் கொடுத்தல்"},
  {jp:"かります",r:"karimasu",en:"to borrow",ta:"கடன் வாங்குதல்"},
  {jp:"おしえます",r:"oshiemasu",en:"to teach",ta:"கற்பித்தல்"},
  {jp:"ならいます",r:"naraimasu",en:"to learn",ta:"கற்றல்"},
 ],
 grammar:[
  {t:"～ましょう",en:"let's do ~ (invitation)",ta:"~ செய்வோம் (அழைப்பு)",
   form:"Verb stem + ましょう",
   ex:{jp:"いっしょに　たべましょう。",en:"Let's eat together.",ta:"ஒன்றாக சாப்பிடுவோம்."}},
  {t:"～に（person - to/from）",en:"に marks the person given to/received from",ta:"に நபருக்கு/நபரிடமிருந்து என்பதைக் குறிக்கிறது",
   form:"Person + に + かします/かります",
   ex:{jp:"ともだちに　ほんを　かります。",en:"I borrow a book from my friend.",ta:"நான் நண்பரிடம் இருந்து புத்தகம் கடன் வாங்குகிறேன்."}},
 ]},
{id:8,jp:"かぜが　つよいですね",en:"The wind is strong, isn't it",ta:"காற்று வலிமையாக உள்ளது, இல்லையா",
 vocab:[
  {jp:"おおきい",r:"ookii",en:"big",ta:"பெரியது"},
  {jp:"ちいさい",r:"chiisai",en:"small",ta:"சிறியது"},
  {jp:"あたらしい",r:"atarashii",en:"new",ta:"புதியது"},
  {jp:"ふるい",r:"furui",en:"old (things)",ta:"பழையது"},
  {jp:"いい",r:"ii",en:"good",ta:"நல்லது"},
 ],
 grammar:[
  {t:"い-adjective + Noun",en:"い-adjectives modify nouns directly",ta:"い-குணவினையடைகள் நேரடியாக பெயர்ச்சொல்லை மாற்றியமைக்கும்",
   form:"い-adj + Noun",
   ex:{jp:"おおきい　いえです。",en:"It's a big house.",ta:"இது ஒரு பெரிய வீடு."}},
  {t:"～ね",en:"ね seeks agreement ('isn't it')",ta:"ね ஒப்புதலை நாடுகிறது",
   form:"Sentence + ね",
   ex:{jp:"きょうは　あついですね。",en:"It's hot today, isn't it.",ta:"இன்று வெப்பமாக உள்ளது, இல்லையா."}},
 ]},
{id:9,jp:"わたしは　いぬが　すきです",en:"I like dogs",ta:"எனக்கு நாய்கள் பிடிக்கும்",
 vocab:[
  {jp:"すきです",r:"suki desu",en:"to like",ta:"பிடிக்கும்"},
  {jp:"きらいです",r:"kirai desu",en:"to dislike",ta:"பிடிக்காது"},
  {jp:"じょうずです",r:"jouzu desu",en:"good at",ta:"திறமையானவர்"},
  {jp:"へたです",r:"heta desu",en:"poor at",ta:"திறமையற்றவர்"},
  {jp:"りょうり",r:"ryouri",en:"cooking",ta:"சமையல்"},
 ],
 grammar:[
  {t:"～が　すき／きらい／じょうず",en:"が marks the object of feeling/ability adjectives",ta:"உணர்வு/திறமை பெயரடைகளுடன் が பயன்படுத்தப்படுகிறது",
   form:"Noun + が + すきです",
   ex:{jp:"わたしは　りょうりが　じょうずです。",en:"I am good at cooking.",ta:"நான் சமையலில் திறமையானவன்."}},
 ]},
{id:10,jp:"つくえの　うえに　ねこが　います",en:"There is a cat on the desk",ta:"மேசையின் மேல் ஒரு பூனை இருக்கிறது",
 vocab:[
  {jp:"います",r:"imasu",en:"there is (living things)",ta:"இருக்கிறது (உயிரினங்கள்)"},
  {jp:"あります",r:"arimasu",en:"there is (non-living things)",ta:"இருக்கிறது (உயிரற்றவை)"},
  {jp:"うえ",r:"ue",en:"on top of / above",ta:"மேலே"},
  {jp:"した",r:"shita",en:"under / below",ta:"கீழே"},
  {jp:"なか",r:"naka",en:"inside",ta:"உள்ளே"},
 ],
 grammar:[
  {t:"場所に　Noun が　います／あります",en:"existence sentence pattern",ta:"இருப்பதைக் குறிக்கும் வாக்கிய அமைப்பு",
   form:"Place + に + Noun + が + います/あります",
   ex:{jp:"つくえの　うえに　ほんが　あります。",en:"There is a book on the desk.",ta:"மேசையின் மேல் புத்தகம் இருக்கிறது."}},
 ]},
{id:11,jp:"りんごを　みっつ　ください",en:"Please give me three apples",ta:"தயவுசெய்து மூன்று ஆப்பிள் தாருங்கள்",
 vocab:[
  {jp:"ひとつ／ふたつ／みっつ",r:"hitotsu/futatsu/mittsu",en:"one/two/three (items)",ta:"ஒன்று/இரண்டு/மூன்று (பொருட்கள்)"},
  {jp:"～えん",r:"~en",en:"~ yen",ta:"~ யென்"},
  {jp:"ぜんぶで",r:"zenbu de",en:"in total",ta:"மொத்தமாக"},
  {jp:"ください",r:"kudasai",en:"please give me",ta:"தயவுசெய்து கொடுங்கள்"},
  {jp:"りんご",r:"ringo",en:"apple",ta:"ஆப்பிள்"},
 ],
 grammar:[
  {t:"数量 + ください",en:"quantity + ください (please give X of these)",ta:"அளவு + ください (தயவுசெய்து இவ்வளவு தாருங்கள்)",
   form:"Noun + を + Number + ください",
   ex:{jp:"みかんを　ふたつ　ください。",en:"Please give me two mandarins.",ta:"தயவுசெய்து இரண்டு ஆரஞ்சு தாருங்கள்."}},
 ]},
{id:12,jp:"たんじょうびは　いつですか",en:"When is your birthday?",ta:"உங்கள் பிறந்தநாள் எப்போது?",
 vocab:[
  {jp:"いつ",r:"itsu",en:"when",ta:"எப்போது"},
  {jp:"たんじょうび",r:"tanjoubi",en:"birthday",ta:"பிறந்தநாள்"},
  {jp:"きょねん",r:"kyonen",en:"last year",ta:"கடந்த வருடம்"},
  {jp:"らいねん",r:"rainen",en:"next year",ta:"அடுத்த வருடம்"},
  {jp:"たかい",r:"takai",en:"expensive / tall",ta:"விலை உயர்ந்த / உயரமான"},
 ],
 grammar:[
  {t:"い-adj past/negative",en:"い-adjective conjugation: past & negative",ta:"い-குணவினையடை: கடந்த காலம் & மறுப்பு",
   form:"~い → ~かったです／～くないです",
   ex:{jp:"きのうは　さむかったです。",en:"It was cold yesterday.",ta:"நேற்று குளிராக இருந்தது."}},
 ]},
{id:13,jp:"にほんりょうりが　たべたいです",en:"I want to eat Japanese food",ta:"எனக்கு ஜப்பானிய உணவு சாப்பிட வேண்டும்",
 vocab:[
  {jp:"～たいです",r:"~tai desu",en:"want to do ~",ta:"~ செய்ய வேண்டும்"},
  {jp:"おんせん",r:"onsen",en:"hot spring",ta:"சூடான நீரூற்று"},
  {jp:"うみ",r:"umi",en:"sea",ta:"கடல்"},
  {jp:"やま",r:"yama",en:"mountain",ta:"மலை"},
  {jp:"りょこう",r:"ryokou",en:"travel/trip",ta:"பயணம்"},
 ],
 grammar:[
  {t:"Verb stem + たいです",en:"expressing a desire to do something",ta:"ஏதேனும் செய்ய வேண்டும் என்ற ஆசையை வெளிப்படுத்துதல்",
   form:"Verb stem + たいです",
   ex:{jp:"にほんへ　いきたいです。",en:"I want to go to Japan.",ta:"எனக்கு ஜப்பான் செல்ல வேண்டும்."}},
  {t:"～ませんか",en:"won't you ~? (invitation)",ta:"~ செய்ய மாட்டீர்களா? (அழைப்பு)",
   form:"Verb stem + ませんか",
   ex:{jp:"いっしょに　いきませんか。",en:"Won't you go together with me?",ta:"என்னுடன் வருகிறீர்களா?"}},
 ]},
{id:14,jp:"すみませんが、しゃしんを　とって　ください",en:"Excuse me, please take a photo",ta:"மன்னிக்கவும், புகைப்படம் எடுத்துக் கொடுங்கள்",
 vocab:[
  {jp:"まって",r:"matte",en:"wait (て-form)",ta:"காத்திருங்கள்"},
  {jp:"みて",r:"mite",en:"look (て-form)",ta:"பாருங்கள்"},
  {jp:"きいて",r:"kiite",en:"listen (て-form)",ta:"கேளுங்கள்"},
  {jp:"はなして",r:"hanashite",en:"speak (て-form)",ta:"பேசுங்கள்"},
  {jp:"すみません",r:"sumimasen",en:"excuse me / sorry",ta:"மன்னிக்கவும்"},
 ],
 grammar:[
  {t:"～て　ください",en:"please do ~ (request)",ta:"தயவுசெய்து ~ செய்யுங்கள் (கோரிக்கை)",
   form:"Verb て-form + ください",
   ex:{jp:"ここに　なまえを　かいて　ください。",en:"Please write your name here.",ta:"இங்கே உங்கள் பெயரை எழுதுங்கள்."}},
 ]},
{id:15,jp:"いま、でんわを　して　います",en:"I am on the phone right now",ta:"நான் இப்போது தொலைபேசியில் பேசிக்கொண்டிருக்கிறேன்",
 vocab:[
  {jp:"～て　います",r:"~te imasu",en:"is doing ~ (ongoing action)",ta:"~ செய்து கொண்டிருக்கிறேன்"},
  {jp:"すんで　います",r:"sunde imasu",en:"lives (state)",ta:"வசிக்கிறார்"},
  {jp:"けっこんして　います",r:"kekkon shite imasu",en:"is married",ta:"திருமணமானவர்"},
  {jp:"つとめて　います",r:"tsutomete imasu",en:"works for (a company)",ta:"பணிபுரிகிறார்"},
  {jp:"でんわ",r:"denwa",en:"telephone",ta:"தொலைபேசி"},
 ],
 grammar:[
  {t:"～て　います（動作の進行）",en:"ongoing action: is ~ing",ta:"நடந்துகொண்டிருக்கும் செயல்",
   form:"Verb て-form + います",
   ex:{jp:"あめが　ふって　います。",en:"It is raining.",ta:"மழை பெய்து கொண்டிருக்கிறது."}},
  {t:"～て　います（状態）",en:"ongoing state: lives/works/is married",ta:"தொடர்ச்சியான நிலை",
   form:"Verb て-form + います",
   ex:{jp:"とうきょうに　すんで　います。",en:"I live in Tokyo.",ta:"நான் டோக்கியோவில் வசிக்கிறேன்."}},
 ]},
{id:16,jp:"しゅくだいを　しなければ　なりません",en:"I must do my homework",ta:"நான் வீட்டுப்பாடம் செய்ய வேண்டும்",
 vocab:[
  {jp:"しゅくだい",r:"shukudai",en:"homework",ta:"வீட்டுப்பாடம்"},
  {jp:"やすみます",r:"yasumimasu",en:"to rest/take a day off",ta:"ஓய்வெடுத்தல்"},
  {jp:"つかいます",r:"tsukaimasu",en:"to use",ta:"பயன்படுத்துதல்"},
  {jp:"あるきます",r:"arukimasu",en:"to walk",ta:"நடத்தல்"},
  {jp:"パスポート",r:"pasupo-to",en:"passport",ta:"கடவுச்சீட்டு"},
 ],
 grammar:[
  {t:"～なければ　なりません",en:"must do ~ (obligation)",ta:"~ செய்யவேண்டும் (கடமை)",
   form:"Verb ない-form (-ない→-なければ) + なりません",
   ex:{jp:"あした　はやく　おきなければ　なりません。",en:"I must get up early tomorrow.",ta:"நாளை நான் அதிகாலையில் எழவேண்டும்."}},
  {t:"～なくても　いいです",en:"don't have to do ~",ta:"~ செய்ய வேண்டியதில்லை",
   form:"Verb ない-form + なくても いいです",
   ex:{jp:"きょうは　こなくても　いいです。",en:"You don't have to come today.",ta:"இன்று வர வேண்டியதில்லை."}},
 ]},
{id:17,jp:"ピアノが　ひけます",en:"I can play the piano",ta:"எனக்கு பியானோ வாசிக்கத் தெரியும்",
 vocab:[
  {jp:"ひけます",r:"hikemasu",en:"can play (piano)",ta:"வாசிக்க முடியும்"},
  {jp:"およげます",r:"oyogemasu",en:"can swim",ta:"நீந்த முடியும்"},
  {jp:"うんてん",r:"unten",en:"driving",ta:"ஓட்டுதல்"},
  {jp:"しゅみ",r:"shumi",en:"hobby",ta:"பொழுதுபோக்கு"},
  {jp:"じゅう",r:"jiyuu",en:"free (time)",ta:"ஓய்வு நேரம்"},
 ],
 grammar:[
  {t:"辞書形（Dictionary form)",en:"the plain/dictionary form of verbs",ta:"வினைச்சொல்லின் அகராதி வடிவம்",
   form:"ます-form → dictionary form",
   ex:{jp:"たべます → たべる",en:"eat (polite) → eat (plain)",ta:"சாப்பிடுதல் (பணிவான) → சாப்பிடுதல் (எளிய)"}},
  {t:"辞書形＋ことが　できます",en:"can do ~ (ability/possibility)",ta:"~ செய்ய முடியும் (திறமை)",
   form:"Verb dictionary form + ことが できます",
   ex:{jp:"わたしは　うんてんが　できます。",en:"I can drive.",ta:"எனக்கு ஓட்ட முடியும்."}},
 ]},
{id:18,jp:"じしょを　もって　きて　ください",en:"Please bring a dictionary",ta:"தயவுசெய்து அகராதி கொண்டு வாருங்கள்",
 vocab:[
  {jp:"じしょ",r:"jisho",en:"dictionary",ta:"அகராதி"},
  {jp:"まえに",r:"mae ni",en:"before ~ing",ta:"~ முன்பு"},
  {jp:"あとで",r:"ato de",en:"after ~ing",ta:"~ பின்பு"},
  {jp:"けいかく",r:"keikaku",en:"plan",ta:"திட்டம்"},
  {jp:"やくそく",r:"yakusoku",en:"promise/appointment",ta:"வாக்குறுதி"},
 ],
 grammar:[
  {t:"辞書形＋まえに",en:"before doing ~",ta:"~ செய்வதற்கு முன்",
   form:"Verb dictionary form + まえに",
   ex:{jp:"ねる　まえに　ほんを　よみます。",en:"I read a book before sleeping.",ta:"தூங்குவதற்கு முன் நான் புத்தகம் படிக்கிறேன்."}},
 ]},
{id:19,jp:"しゃしんを　とらないで　ください",en:"Please don't take photos",ta:"தயவுசெய்து புகைப்படம் எடுக்காதீர்கள்",
 vocab:[
  {jp:"ない形",r:"nai-kei",en:"negative (nai) form",ta:"மறுப்பு வடிவம்"},
  {jp:"しんぱいします",r:"shinpai shimasu",en:"to worry",ta:"கவலைப்படுதல்"},
  {jp:"きけん",r:"kiken",en:"dangerous",ta:"ஆபத்தானது"},
  {jp:"ちゅうい",r:"chuui",en:"caution",ta:"எச்சரிக்கை"},
  {jp:"びょういん",r:"byouin",en:"hospital",ta:"மருத்துவமனை"},
 ],
 grammar:[
  {t:"～ないで　ください",en:"please don't do ~",ta:"தயவுசெய்து ~ செய்யாதீர்கள்",
   form:"Verb ない-form + ないで ください",
   ex:{jp:"ここに　くるまを　とめないで　ください。",en:"Please don't park the car here.",ta:"இங்கே காரை நிறுத்தாதீர்கள்."}},
 ]},
{id:20,jp:"らいしゅう　しけんが　あると　おもいます",en:"I think there is a test next week",ta:"அடுத்த வாரம் தேர்வு இருக்கும் என்று நினைக்கிறேன்",
 vocab:[
  {jp:"～と　おもいます",r:"~to omoimasu",en:"I think that ~",ta:"~ என்று நினைக்கிறேன்"},
  {jp:"～と　いいます",r:"~to iimasu",en:"says that ~",ta:"~ என்று சொல்கிறார்"},
  {jp:"しけん",r:"shiken",en:"exam",ta:"தேர்வு"},
  {jp:"にゅうがくしき",r:"nyuugakushiki",en:"entrance ceremony",ta:"நுழைவு விழா"},
  {jp:"たぶん",r:"tabun",en:"probably",ta:"ஒருவேளை"},
 ],
 grammar:[
  {t:"普通形＋と　おもいます",en:"I think that ~ (plain form + と おもいます)",ta:"நான் ~ என்று நினைக்கிறேன்",
   form:"Plain form + と おもいます",
   ex:{jp:"あした　あめが　ふると　おもいます。",en:"I think it will rain tomorrow.",ta:"நாளை மழை பெய்யும் என்று நினைக்கிறேன்."}},
 ]},
{id:21,jp:"かいぎしつに　だれか　いますか",en:"Is anyone in the meeting room?",ta:"கூட்ட அறையில் யாராவது இருக்கிறார்களா?",
 vocab:[
  {jp:"だれか",r:"dareka",en:"someone",ta:"யாராவது"},
  {jp:"なにか",r:"nanika",en:"something",ta:"ஏதாவது"},
  {jp:"かいぎ",r:"kaigi",en:"meeting",ta:"கூட்டம்"},
  {jp:"きんえん",r:"kin\u2019en",en:"no smoking",ta:"புகைபிடிக்க கூடாது"},
  {jp:"んです",r:"n desu",en:"explanatory 'you see...'",ta:"விளக்க வடிவம்"},
 ],
 grammar:[
  {t:"普通形＋んです",en:"explanatory tone: giving a reason/context",ta:"காரணத்தை விளக்கும் தொனி",
   form:"Plain form + んです",
   ex:{jp:"どうして　おくれたんですか。",en:"Why were you late? (seeking explanation)",ta:"ஏன் தாமதமானீர்கள்?"}},
 ]},
{id:22,jp:"むりを　しない　ほうが　いいですよ",en:"You'd better not overdo it",ta:"அதிகமாக முயற்சி செய்யாதீர்கள்",
 vocab:[
  {jp:"むり",r:"muri",en:"overdoing / unreasonable",ta:"அதீதமான முயற்சி"},
  {jp:"ほうが　いい",r:"hou ga ii",en:"had better ~",ta:"~ செய்வது நல்லது"},
  {jp:"かぜ",r:"kaze",en:"a cold (illness)",ta:"சளிக்காய்ச்சல்"},
  {jp:"くすり",r:"kusuri",en:"medicine",ta:"மருந்து"},
  {jp:"ねつ",r:"netsu",en:"fever",ta:"காய்ச்சல்"},
 ],
 grammar:[
  {t:"～た　ほうが　いいです",en:"you'd better do ~ (advice)",ta:"~ செய்வது நல்லது (அறிவுரை)",
   form:"Verb た-form + ほうが いいです",
   ex:{jp:"はやく　ねた　ほうが　いいです。",en:"You'd better sleep early.",ta:"விரைவில் தூங்குவது நல்லது."}},
  {t:"～ない　ほうが　いいです",en:"you'd better not do ~",ta:"~ செய்யாமல் இருப்பது நல்லது",
   form:"Verb ない-form + ほうが いいです",
   ex:{jp:"おさけを　のまない　ほうが　いいです。",en:"You'd better not drink alcohol.",ta:"மது அருந்தாமல் இருப்பது நல்லது."}},
 ]},
{id:23,jp:"みぎへ　まがると、ぎんこうが　あります",en:"If you turn right, there is a bank",ta:"வலது பக்கம் திரும்பினால் வங்கி இருக்கிறது",
 vocab:[
  {jp:"まがります",r:"magarimasu",en:"to turn",ta:"திரும்புதல்"},
  {jp:"みぎ／ひだり",r:"migi/hidari",en:"right/left",ta:"வலது/இடது"},
  {jp:"しんごう",r:"shingou",en:"traffic light",ta:"போக்குவரத்து விளக்கு"},
  {jp:"ぎんこう",r:"ginkou",en:"bank",ta:"வங்கி"},
  {jp:"まっすぐ",r:"massugu",en:"straight",ta:"நேராக"},
 ],
 grammar:[
  {t:"普通形（辞書形）＋と",en:"conditional: whenever/if ~, then ~ (natural consequence)",ta:"நிபந்தனை: எப்போதும் ~ என்றால் ~",
   form:"Plain non-past + と、result",
   ex:{jp:"はるに　なると、さくらが　さきます。",en:"When spring comes, cherry blossoms bloom.",ta:"வசந்த காலம் வந்தால் செர்ரி மலர்கள் மலரும்."}},
 ]},
{id:24,jp:"どろぼうに　さいふを　とられました",en:"My wallet was stolen by a thief",ta:"என் பணப்பை திருடனால் திருடப்பட்டது",
 vocab:[
  {jp:"どろぼう",r:"dorobou",en:"thief",ta:"திருடன்"},
  {jp:"とります",r:"torimasu",en:"to take/steal",ta:"எடுத்தல் / திருடுதல்"},
  {jp:"さいふ",r:"saifu",en:"wallet",ta:"பணப்பை"},
  {jp:"うまれます",r:"umaremasu",en:"to be born",ta:"பிறத்தல்"},
  {jp:"しかられます",r:"shikararemasu",en:"to be scolded",ta:"கண்டிக்கப்படுதல்"},
 ],
 grammar:[
  {t:"受身形（passive）",en:"passive voice: to be done to",ta:"செயப்பாட்டு வினை",
   form:"Verb -(r)areru",
   ex:{jp:"わたしは　あめに　ふられました。",en:"I got rained on.",ta:"நான் மழையில் நனைந்தேன்."}},
 ]},
{id:25,jp:"にもつは　もう　おくって　しまいました",en:"I've already sent the luggage",ta:"நான் ஏற்கனவே பொருட்களை அனுப்பிவிட்டேன்",
 vocab:[
  {jp:"～て　しまいます",r:"~te shimaimasu",en:"to finish/end up doing ~",ta:"முடித்துவிடுதல் / செய்துவிடுதல்"},
  {jp:"～て　おきます",r:"~te okimasu",en:"to do ~ in advance",ta:"முன்கூட்டியே செய்து வைத்தல்"},
  {jp:"にもつ",r:"nimotsu",en:"luggage",ta:"சாமான்கள்"},
  {jp:"おくります",r:"okurimasu",en:"to send",ta:"அனுப்புதல்"},
  {jp:"じゅんび",r:"junbi",en:"preparation",ta:"தயாரிப்பு"},
 ],
 grammar:[
  {t:"～て　おきます",en:"to do something in advance / for later",ta:"முன்கூட்டியே ஒன்றை செய்து வைத்தல்",
   form:"Verb て-form + おきます",
   ex:{jp:"ビールを　ひやして　おきます。",en:"I'll chill the beer in advance.",ta:"நான் முன்கூட்டியே பீரை குளிர்விப்பேன்."}},
  {t:"～て　しまいます",en:"to complete something (often with regret/finality)",ta:"ஏதோ ஒன்றை முழுமையாக செய்துவிடுதல்",
   form:"Verb て-form + しまいます",
   ex:{jp:"しゅくだいを　わすれて　しまいました。",en:"I ended up forgetting my homework.",ta:"நான் வீட்டுப்பாடத்தை மறந்துவிட்டேன்."}},
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
// Original N4/N3/N2/N1 preparation materials. Tamil (TA) and English (EN) glosses are original.
const BEGINNER_II_LESSONS = [
  {id:26,pattern:"～んですが",ex:"週末、いっしょに 図書館へ 行きませんか。",en:"I would like to invite you to the library this weekend.",ta:"இந்த வார இறுதியில் நூலகத்திற்கு வர விரும்புகிறீர்களா?",q:"Which phrase makes an invitation softer?",options:["～んですが","～ません","～ないで"],answer:"～んですが"},
  {id:27,pattern:"可能形",ex:"妹は 自転車に 乗れます。",en:"My younger sister can ride a bicycle.",ta:"என் தங்கை மிதிவண்டி ஓட்ட முடியும்.",q:"What does 乗れます express?",options:["ability","prohibition","past experience"],answer:"ability"},
  {id:28,pattern:"～ながら",ex:"音楽を 聞きながら 日本語を 勉強します。",en:"I study Japanese while listening to music.",ta:"இசை கேட்கும்போது ஜப்பானியம் படிக்கிறேன்.",q:"What happens with ～ながら?",options:["two actions happen together","an action is forbidden","an action is completed"],answer:"two actions happen together"},
  {id:29,pattern:"自動詞・他動詞",ex:"窓が 開きました。田中さんが 窓を 開けました。",en:"The window opened. Mr Tanaka opened the window.",ta:"ஜன்னல் திறந்தது. தனகா சான் ஜன்னலைத் திறந்தார்.",q:"Which sentence has a person intentionally doing the action?",options:["田中さんが 窓を 開けました。","窓が 開きました。","Both are passive."],answer:"田中さんが 窓を 開けました。"},
  {id:30,pattern:"～てあります",ex:"会議の資料は 机の上に 置いてあります。",en:"The meeting papers have been placed on the desk.",ta:"கூட்டக் காகிதங்கள் மேசையின் மேல் வைக்கப்பட்டுள்ளன.",q:"What does ～てあります emphasize?",options:["a prepared resulting state","a future plan","a comparison"],answer:"a prepared resulting state"},
  {id:31,pattern:"意向形",ex:"来月、日本語の試験を 受けようと 思っています。",en:"I am thinking of taking a Japanese test next month.",ta:"அடுத்த மாதம் ஜப்பானியத் தேர்வு எழுத நினைக்கிறேன்.",q:"～ようと 思っています shows…",options:["an intention","a command","a past result"],answer:"an intention"},
  {id:32,pattern:"～たほうがいい",ex:"疲れているなら、今夜は 早く 寝たほうが いいです。",en:"If you are tired, you should sleep early tonight.",ta:"சோர்வாக இருந்தால் இன்று சீக்கிரம் தூங்குவது நல்லது.",q:"This pattern is used for…",options:["advice","a noun description","counting objects"],answer:"advice"},
  {id:33,pattern:"命令・禁止",ex:"危ないですから、この線を 越えるな。",en:"It is dangerous, so do not cross this line.",ta:"ஆபத்தானது; இந்த கோட்டைக் கடக்காதே.",q:"Where should you be especially careful with command forms?",options:["notices and urgent instructions","casual self-introductions","dates"],answer:"notices and urgent instructions"},
  {id:34,pattern:"～と 言っていました",ex:"先生は 来週 小テストが あると 言っていました。",en:"The teacher said that there will be a quiz next week.",ta:"அடுத்த வாரம் சிறு தேர்வு இருக்கும் என்று ஆசிரியர் கூறினார்.",q:"What does と introduce here?",options:["a quotation","a destination","a tool"],answer:"a quotation"},
  {id:35,pattern:"～ば",ex:"時間が あれば、この記事を 読んでください。",en:"If you have time, please read this article.",ta:"நேரம் இருந்தால் இந்தக் கட்டுரையைப் படியுங்கள்.",q:"～ば is a form for…",options:["a condition","a request only","a completed action"],answer:"a condition"},
  {id:36,pattern:"～ために",ex:"健康のために、毎朝 30分 歩いています。",en:"For my health, I walk for 30 minutes every morning.",ta:"உடல்நலத்திற்காக தினமும் காலை 30 நிமிடம் நடக்கிறேன்.",q:"～ために gives…",options:["purpose or benefit","a quoted opinion","a prohibition"],answer:"purpose or benefit"},
  {id:37,pattern:"受身形",ex:"私は 雨に 降られて、かばんが ぬれました。",en:"I got caught in the rain, and my bag became wet.",ta:"மழையில் சிக்கி என் பை நனைந்தது.",q:"Passive forms can describe…",options:["an experience received by someone","only future plans","only quantities"],answer:"an experience received by someone"},
  {id:38,pattern:"～のは／のが",ex:"毎日 漢字を 書くのは 大切です。",en:"Writing kanji every day is important.",ta:"தினமும் காஞ்சி எழுதுவது முக்கியம்.",q:"What does の do in this sentence?",options:["turns an action into a topic","marks a location","makes a command"],answer:"turns an action into a topic"},
  {id:39,pattern:"使役形",ex:"先生は 学生に もう一度 文を 読ませました。",en:"The teacher made the student read the sentence once more.",ta:"ஆசிரியர் மாணவரை வாக்கியத்தை மீண்டும் படிக்கச் செய்தார்.",q:"Causative form expresses…",options:["making or letting someone act","a comparison","a simple past action"],answer:"making or letting someone act"},
  {id:40,pattern:"～か どうか",ex:"電車が 遅れるかどうか、アプリで 調べます。",en:"I will check in the app whether the train will be late.",ta:"ரயில் தாமதமாகுமா என்று செயலியில் பார்க்கிறேன்.",q:"～かどうか means…",options:["whether or not","because","until"],answer:"whether or not"},
  {id:41,pattern:"～ていただけますか",ex:"この申込書を 見ていただけますか。",en:"Could you please look at this application form?",ta:"இந்த விண்ணப்பப் படிவத்தைப் பார்த்துத் தர முடியுமா?",q:"This expression is a polite…",options:["request","prohibition","counter"],answer:"request"},
  {id:42,pattern:"～に 行く",ex:"週末、友だちと 映画を 見に 行きます。",en:"I am going with a friend to watch a movie this weekend.",ta:"வார இறுதியில் நண்பருடன் திரைப்படம் பார்க்கப் போகிறேன்.",q:"The に indicates…",options:["the purpose of movement","a comparison","a completed state"],answer:"the purpose of movement"},
  {id:43,pattern:"～そうです",ex:"このスープは 辛そうですが、おいしそうです。",en:"This soup looks spicy, but it also looks delicious.",ta:"இந்த சூப் காரமாகத் தெரிகிறது, ஆனால் சுவையாகவும் தெரிகிறது.",q:"～そうです here is based on…",options:["appearance","a direct quotation","a command"],answer:"appearance"},
  {id:44,pattern:"～すぎる",ex:"この部屋は 少し 暑すぎます。",en:"This room is a little too hot.",ta:"இந்த அறை கொஞ்சம் அதிகமாக சூடாக உள்ளது.",q:"～すぎる means…",options:["too much / excessively","not enough","only once"],answer:"too much / excessively"},
  {id:45,pattern:"～場合は",ex:"分からない場合は、先生に 質問してください。",en:"If you do not understand, please ask the teacher.",ta:"புரியாத நிலையில் ஆசிரியரிடம் கேளுங்கள்.",q:"場合 is useful in…",options:["formal conditional guidance","food ordering only","past-tense stories only"],answer:"formal conditional guidance"},
  {id:46,pattern:"～ところです",ex:"今から 宿題を 始めるところです。",en:"I am just about to start my homework.",ta:"இப்போது தான் வீட்டுப்பாடம் தொடங்கப் போகிறேன்.",q:"～ところです can show…",options:["a stage of an action","a comparison","a counter"],answer:"a stage of an action"},
  {id:47,pattern:"尊敬語",ex:"部長は ただ今 会議室に いらっしゃいます。",en:"The department manager is currently in the meeting room.",ta:"துறை மேலாளர் இப்போது கூட்ட அறையில் இருக்கிறார்.",q:"Honorific Japanese raises the status of…",options:["the other person or subject","yourself only","an object count"],answer:"the other person or subject"},
  {id:48,pattern:"謙譲語",ex:"私が 駅まで ご案内します。",en:"I will guide you to the station.",ta:"நான் உங்களை நிலையத்திற்கு வழிகாட்டுகிறேன்.",q:"Humble Japanese lowers the speaker to…",options:["show respect to the listener","give an order","describe weather"],answer:"show respect to the listener"},
  {id:49,pattern:"お～します",ex:"こちらで お名前を 確認します。",en:"I will confirm your name here.",ta:"இங்கே உங்கள் பெயரை உறுதிப்படுத்துகிறேன்.",q:"This is commonly used in…",options:["polite service communication","informal slang","children's games"],answer:"polite service communication"},
  {id:50,pattern:"総合復習",ex:"予定を 説明してから、相手の 質問に 丁寧に 答えましょう。",en:"After explaining the plan, let us answer the other person's questions politely.",ta:"திட்டத்தை விளக்கிய பின் மற்றவரின் கேள்விகளுக்கு மரியாதையாக பதிலளிப்போம்.",q:"The final lesson asks you to…",options:["combine grammar in practical communication","memorize one isolated word","avoid listening practice"],answer:"combine grammar in practical communication"},

  // ================= JLPT N3 Lessons (51-65) =================
  {id:51,pattern:"～ようになる",ex:"毎日練習すれば、日本語が話せるようになります。",en:"If you practice every day, you will become able to speak Japanese.",ta:"தினமும் பயிற்சி செய்தால், உங்களால் ஜப்பானியம் பேச முடியும்.",q:"What does 〜ようになる indicate?",options:["a gradual change in ability","an immediate command","a past regret"],answer:"a gradual change in ability"},
  {id:52,pattern:"～まま",ex:"靴を履いたまま、部屋に入らないでください。",en:"Please do not enter the room with your shoes still on.",ta:"காலணிகளை அணிந்தவாறே அறைக்குள் நுழைய வேண்டாம்.",q:"What state does 〜まま describe?",options:["leaving a state unchanged","completing an action","prohibiting a movement"],answer:"leaving a state unchanged"},
  {id:53,pattern:"～ばかり",ex:"彼は毎日ゲームをしてばかりいます。",en:"He does nothing but play games every day.",ta:"அவன் தினமும் விளையாட்டு விளையாடிக் கொண்டே இருக்கிறான்.",q:"What does 〜ばかり express?",options:["only / nothing but","a recommendation","a possibility"],answer:"only / nothing but"},
  {id:54,pattern:"～代わりに",ex:"山田先生の代わりに、新しい先生が来ました。",en:"Instead of Teacher Yamada, a new teacher came.",ta:"ஆசிரியர் யமதாவுக்குப் பதிலாக, புதிய ஆசிரியர் வந்தார்.",q:"What does 〜代わりに mean?",options:["instead of / in place of","because of","in addition to"],answer:"instead of / in place of"},
  {id:55,pattern:"～はずだ",ex:"彼は昨日たくさん勉強したから、今日の試験は合格するはずです。",en:"Since he studied a lot yesterday, he should pass today's exam.",ta:"நேற்று அவன் நிறைய படித்ததால், இன்றைய தேர்வில் தேர்ச்சி பெற வேண்டும்.",q:"What does 〜はずです express?",options:["a strong expectation / probability","an advice","a command"],answer:"a strong expectation / probability"},
  {id:56,pattern:"～うちに",ex:"若いうちに、いろいろな国へ行ってみたいです。",en:"While I am young, I want to visit various countries.",ta:"இளமையாக இருக்கும்போதே, பல்வேறு நாடுகளுக்குச் செல்ல விரும்புகிறேன்.",q:"What is the function of 〜うちに?",options:["while in a certain state","after completing everything","because of a reason"],answer:"while in a certain state"},
  {id:57,pattern:"～わけではない",ex:"日本人がみんなアニメが好きなわけではありません。",en:"It doesn't mean that all Japanese people like anime.",ta:"ஜப்பானியர்கள் அனைவரும் அனிமேவை விரும்புவதாக அர்த்தமல்ல.",q:"What does 〜わけではない express?",options:["partial negation / not necessarily","absolute negation","strong assertion"],answer:"partial negation / not necessarily"},
  {id:58,pattern:"～さえ",ex:"ひらがなさえ書ければ、この授業を受けられます。",en:"If you can at least write hiragana, you can take this class.",ta:"ஹிரகானா மட்டும் எழுத முடிந்தால், நீங்கள் இந்த வகுப்பில் சேரலாம்.",q:"What does 〜さえ highlight?",options:["the minimum requirement / even","a past action","a future promise"],answer:"the minimum requirement / even"},
  {id:59,pattern:"～たとたん",ex:"家に帰ったとたん、雨が降り出しました。",en:"As soon as I got home, it started to rain.",ta:"வீட்டிற்கு வந்தவுடன் மழை பெய்யத் தொடங்கியது.",q:"When does the second action happen in 〜たとたん?",options:["immediately after the first","before the first","much later"],answer:"immediately after the first"},
  {id:60,pattern:"～たびに",ex:"この写真を見るたびに、故郷を思い出します。",en:"Every time I look at this picture, I remember my hometown.",ta:"இந்த புகைப்படத்தை பார்க்கும் போதெல்லாம், என் சொந்த ஊர் நினைவுக்கு வருகிறது.",q:"What does 〜たびに mean?",options:["whenever / every time","rarely","never"],answer:"whenever / every time"},
  {id:61,pattern:"～最中に",ex:"スピーチの最中に、停電が起こりました。",en:"In the middle of the speech, a power outage occurred.",ta:"பேச்சின் நடுவில் மின்தடை ஏற்பட்டது.",q:"What does 〜最中に indicate?",options:["in the middle of an action","at the end of an action","before starting"],answer:"in the middle of an action"},
  {id:62,pattern:"～を中心に",ex:"この大学は留学生を中心にして、国際交流を行っています。",en:"This university conducts international exchanges, centering around foreign students.",ta:"இந்த பல்கலைக்கழகம் வெளிநாட்டு மாணவர்களை மையமாகக் கொண்டு சர்வதேச பரிமாற்றங்களை நடத்துகிறது.",q:"What does 〜を中心に mean?",options:["centered around","excluding","instead of"],answer:"centered around"},
  {id:63,pattern:"～わけにはいかない",ex:"明日は大切な試験があるので、休むわけにはいきません。",en:"Since there is an important exam tomorrow, I cannot afford to take a day off.",ta:"நாளை முக்கியமான தேர்வு இருப்பதால், என்னால் விடுப்பு எடுக்க முடியாது.",q:"What does 〜わけにはいかない indicate?",options:["cannot do due to social/moral reasons","cannot do due to physical ability","forbidden by law"],answer:"cannot do due to social/moral reasons"},
  {id:64,pattern:"～に関して",ex:"新しい計画に関して、意見を聞かせてください。",en:"Please let me hear your opinion regarding the new plan.",ta:"புதிய திட்டம் குறித்து உங்கள் கருத்தைக் கூறுங்கள்.",q:"What does 〜に関して mean?",options:["regarding / about","contrary to","in addition to"],answer:"regarding / about"},
  {id:65,pattern:"～に対して",ex:"昨日とは対照的に、今日は風に対してとても寒いです。",en:"In contrast to yesterday, it is very cold against the wind today.",ta:"நேற்றுடன் ஒப்பிடுகையில், இன்று காற்றுக்கு எதிராக மிகவும் குளிரาก இருக்கிறது.",q:"What does 〜に対して indicate?",options:["towards / in contrast to","because of","after doing"],answer:"towards / in contrast to"},

  // ================= JLPT N2 Lessons (66-75) =================
  {id:66,pattern:"～にもかかわらず",ex:"雨が激しく降っているにもかかわらず、多くの人が集まりました。",en:"Despite the heavy rain, many people gathered.",ta:"கடும் மழை பெய்தபோதிலும், ஏராளமானோர் திரண்டனர்.",q:"What does 〜にもかかわらず mean?",options:["despite / regardless of","because of","only when"],answer:"despite / regardless of"},
  {id:67,pattern:"～ものの",ex:"日本に来たものの、日本語がなかなか上手になりません。",en:"Although I came to Japan, my Japanese is not improving easily.",ta:"ஜப்பான் வந்தபோதிலும், எனது ஜப்பானிய மொழி எளிதில் மேம்படவில்லை.",q:"What is the nuance of 〜ものの?",options:["although / even though","because / since","in order to"],answer:"although / even though"},
  {id:68,pattern:"～つつ",ex:"体に悪いと知りつつ、タバコがやめられません。",en:"While knowing it is bad for the body, I cannot quit smoking.",ta:"உடலுக்கு கெடுதல் என்று தெரிந்தும் என்னால் புகையிலை பழக்கத்தை கைவிட முடியவில்லை.",q:"What does 〜つつ mean in this context?",options:["while / although","because","after"],answer:"while / although"},
  {id:69,pattern:"～からといって",ex:"日本に住んでいるからといって、日本語が話せるとは限りません。",en:"Just because you live in Japan doesn't mean you can speak Japanese.",ta:"நீங்கள் ஜப்பானில் வசிப்பதால் ஜப்பானிய மொழி பேச முடியும் என்று அர்த்தமல்ல.",q:"What does 〜からといって indicate?",options:["just because","unless","only after"],answer:"just because"},
  {id:70,pattern:"～ぬきで",ex:"冗談ぬきで、真剣に私たちの将来について考えましょう。",en:"Jokes aside, let's think seriously about our future.",ta:"விளையாட்டைத் தவிர்த்து, நமது எதிர்காலத்தைப் பற்றி தீவிரமாக யோசிப்போம்.",q:"What does 〜ぬきで mean?",options:["without / leaving out","including","because of"],answer:"without / leaving out"},
  {id:71,pattern:"～に相違ない",ex:"これだけの証拠がある以上、彼が犯人に相違ない。",en:"As long as there is this much evidence, he must be the culprit.",ta:"இந்த அளவிற்கு ஆதாரம் இருக்கும் வரை அவன்தான் குற்றவாளியாக இருக்க வேண்டும்.",q:"What does 〜に相違ない mean?",options:["without doubt / must be","impossible to be","might be"],answer:"without doubt / must be"},
  {id:72,pattern:"～得る／得ない",ex:"それは十分に起こり得る事態です。",en:"That is a situation that could fully happen.",ta:"அது முற்றிலும் நடக்கக்கூடிய ஒரு சூழ்நிலை தான்.",q:"What does 〜得る (eru/uru) express?",options:["capability / possibility","prohibition","obligation"],answer:"capability / possibility"},
  {id:73,pattern:"～おそれがある",ex:"この台風は上陸するおそれがあります。",en:"There is a danger that this typhoon will make landfall.",ta:"இந்த சூறாவளி கரையை கடக்க கூடும் என்ற அபாயம் உள்ளது.",q:"What does 〜おそれがある mean?",options:["danger / risk of","hope of","guarantee of"],answer:"danger / risk of"},
  {id:74,pattern:"～を契機に",ex:"病気を契機にして、タバコをやめました。",en:"Taking my illness as an opportunity, I quit smoking.",ta:"எனது நோயை ஒரு வாய்ப்பாகக் கொண்டு, நான் புகைப்பிடிப்பதை நிறுத்தியுள்ளேன்.",q:"What does 〜を契機に mean?",options:["as a turning point / opportunity","regardless of","before doing"],answer:"as a turning point / opportunity"},
  {id:75,pattern:"～のもとで",ex:"厳しい指導のもとで、練習に励んでいます。",en:"Under strict guidance, we are working hard on our practice.",ta:"கடுமையான வழிகாட்டுதலின் கீழ், நாங்கள் எங்கள் பயிற்சியில் கடினமாக உழைத்து வருகிறோம்.",q:"What does 〜のもとで mean?",options:["under / guided by","above","instead of"],answer:"under / guided by"},

  // ================= JLPT N1 Lessons (76-85) =================
  {id:76,pattern:"～ではあるまいし",ex:"子供ではあるまいし、泣くのはやめなさい。",en:"It's not as if you are a child, stop crying.",ta:"நீ ஒன்றும் குழந்தை இல்லை, அழுவதை நிறுத்து.",q:"What does 〜ではあるまいし mean?",options:["it's not as if / you are not","because you are","if you were"],answer:"it's not as if / you are not"},
  {id:77,pattern:"～べからず",ex:"ここにゴミを捨てるべからず。",en:"Do not throw trash here. (formal prohibition)",ta:"இங்கு குப்பை கொட்டக் கூடாது.",q:"Where do you typically see 〜べからず?",options:["public notices and signs","casual texts","polite customer service"],answer:"public notices and signs"},
  {id:78,pattern:"～ごとき",ex:"私ごとき未熟者に、このような大役は務まりません。",en:"An inexperienced person like me cannot handle such a big role.",ta:"என்னை போன்ற அனுபவமில்லாத ஒருவரால் இவ்வளவு பெரிய பொறுப்பை ஏற்க முடியாது.",q:"What is the nuance of 〜ごとき?",options:["like / as if (often humble/deprecating)","exactly the same","superior to"],answer:"like / as if (often humble/deprecating)"},
  {id:79,pattern:"～にかたくない",ex:"彼の落胆ぶりは、察するにかたくない。",en:"It is not difficult to imagine his disappointment.",ta:"அவரது ஏமாற்றத்தை கற்பனை செய்வது கடினம் அல்ல.",q:"What does 〜にかたくない mean?",options:["not difficult to (do)","impossible to do","unnecessary to do"],answer:"not difficult to (do)"},
  {id:80,pattern:"～極まりない",ex:"失礼極まりない態度に、腹が立ちました。",en:"I was angry at his extremely rude attitude.",ta:"அவரது மிகுந்த முரட்டுத்தனமான அணுகுமுறையால் நான் கோபமடைந்தேன்.",q:"What does 〜極まりない mean?",options:["extremely / limitlessly","not very","neutral"],answer:"extremely / limitlessly"},
  {id:81,pattern:"～を限りに",ex:"今日を限りに、この店は閉店します。",en:"Closing today, this shop will be closed forever.",ta:"இன்றோடு இந்த கடை நிரந்தரமாக மூடப்படும்.",q:"What does 〜を限りに mean?",options:["starting from / as the last","sometimes","never"],answer:"starting from / as the last"},
  {id:82,pattern:"～ともなると",ex:"社長ともなると、責任が非常に重くなります。",en:"Once you become president, the responsibility becomes extremely heavy.",ta:"தலைவரானவுடன் பொறுப்பு மிகவும் கனமாகிவிடுகிறது.",q:"What does 〜ともなると indicate?",options:["once a certain level is reached","if it is cheap","before starting"],answer:"once a certain level is reached"},
  {id:83,pattern:"～ずにはすまない",ex:"これだけ迷惑をかけたのだから、謝らずにはすまない。",en:"Since I caused this much trouble, I cannot help but apologize.",ta:"இந்த அளவிற்கு தொல்லை கொடுத்ததால் நான் மன்னிப்பு கேட்காமல் இருக்க முடியாது.",q:"What does 〜ずにはすまない express?",options:["must do / cannot help but do","don't need to do","should not do"],answer:"must do / cannot help but do"},
  {id:84,pattern:"～すら",ex:"自分の名前すら書けないほど、彼は疲れていました。",en:"He was so tired that he couldn't even write his own name.",ta:"அவன் தன் பெயரை கூட எழுத முடியாத அளவிற்கு சோர்வாக இருந்தான்.",q:"What does 〜すら mean?",options:["even","except","only"],answer:"even"},
  {id:85,pattern:"～をおいてほかにない",ex:"この仕事を任せられるのは、あなたをおいてほかにいない。",en:"There is no one else but you who can be entrusted with this job.",ta:"உன்னைத் தவிர வேறு யாருக்கும் இந்த வேலையை ஒப்படைக்க முடியாது.",q:"What does 〜をおいてほかにない express?",options:["no other than / uniquely qualified","not including","anyone is fine"],answer:"no other than / uniquely qualified"}
];

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
      <div className={`font-semibold text-stone-900 ${sizes[size]}`} lang="ja">{jp}</div>
      <div className="text-red-700 text-xs font-medium mt-0.5">🔤 {toRomaji(jp)}</div>
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
function Home({progress, lessons, goTo, activeLevel="N5", onChangeGoal}){
  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = lessons.length;
  const pct = Math.round((completedCount/totalLessons)*100);
  const nextLesson = lessons.find(l => !progress.completedLessons[l.id]) || lessons[0];

  return (<>
    <div className="home-dashboard space-y-6 pb-24 md:pb-6">
      <button type="button" onClick={onChangeGoal} className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-800 shadow-sm hover:bg-sky-50"><ChevronLeft size={17}/> Back</button>
      <div className="home-hero relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 md:p-12">
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-red-700/20 blur-2xl"/>
        <div className="absolute right-6 top-6 w-3 h-3 rounded-full bg-red-600"/>
        <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-3">Nihongo Vertex</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-2" lang="ja">日本語を、試験に強い力へ。</h1>
        <p className="text-stone-300 max-w-xl mb-1">Master Japanese from your first hiragana to JLPT N1 — studied through தமிழ் · English · 日本語.</p>
        <button onClick={()=>activeLevel==="N5"?goTo("lessons"):goTo("levelDetail",activeLevel)} className="mt-6 inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 transition-colors px-6 py-3 rounded-xl font-semibold">
          Continue Learning <ChevronRight size={18}/>
        </button>
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
          <h3 className="font-semibold text-stone-900">{activeLevel} Lesson Progress</h3>
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
  </>);
}

// ---------------- Level Selector ----------------
function LevelSelector({progress, goTo, otherLevels, activeLevel, onSelectLevel}){
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">レベル選択 <span className="text-stone-400 text-base font-normal">Level Selector</span></h2>
      <div className="grid md:grid-cols-2 gap-4">
        {LEVELS.map(lv=>{
          const isActive = lv === activeLevel;
          const labels = {N5:"Beginner · ஆரம்பநிலை", N4:"Elementary · தொடக்கநிலை", N3:"Intermediate · இடைநிலை", N2:"Upper Intermediate · மேல்நிலை", N1:"Advanced · மேம்பட்ட நிலை"};
          
          let levelLessons = [];
          if (lv === "N5") {
            levelLessons = Array.from({length: 25}, (_, i) => ({id: i + 1}));
          } else if (lv === "N4") {
            levelLessons = BEGINNER_II_LESSONS.filter(l => l.id >= 26 && l.id <= 50);
          } else if (lv === "N3") {
            levelLessons = BEGINNER_II_LESSONS.filter(l => l.id >= 51 && l.id <= 65);
          } else if (lv === "N2") {
            levelLessons = BEGINNER_II_LESSONS.filter(l => l.id >= 66 && l.id <= 75);
          } else if (lv === "N1") {
            levelLessons = BEGINNER_II_LESSONS.filter(l => l.id >= 76 && l.id <= 85);
          }
          
          const completedCount = levelLessons.filter(l => progress.completedLessons[l.id]).length;
          const totalLessons = levelLessons.length;
          const pct = totalLessons > 0 ? Math.round((completedCount/totalLessons)*100) : 0;

          return (
            <Card key={lv} className={`p-6 ${isActive ? "border-red-400 bg-red-50/20" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-stone-900">{lv}</div>
                {isActive && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-800">Current Goal</span>}
              </div>
              <div className="text-sm text-stone-500 mb-4">{labels[lv]}</div>
              <ProgressBar pct={pct}/>
              <div className="text-xs text-stone-500 mt-2 mb-4">{pct}% complete · {completedCount}/{totalLessons} lessons</div>
              <div className="flex gap-2">
                <button onClick={()=>onSelectLevel(lv)} className={`flex-1 rounded-xl py-2.5 font-medium text-sm ${isActive ? "bg-red-700 text-white" : "bg-stone-900 text-white hover:bg-stone-800"}`}>
                  {isActive ? "Study Now" : "Set as Target"}
                </button>
                <button onClick={()=>goTo("levelDetail", lv)} className="border border-stone-300 text-stone-700 rounded-xl px-3 py-2.5 font-medium text-sm hover:bg-stone-50">
                  Syllabus
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function LevelDetail({level, otherLevels, goTo}){
  const data = otherLevels[level];
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <button onClick={()=>goTo("levels")} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"><ChevronLeft size={16}/> Back to levels</button>
      <h2 className="text-2xl font-bold text-stone-900">{level} <span className="text-stone-400 text-base font-normal">Syllabus Overview</span></h2>
      <Card className="p-5">
        <h3 className="font-semibold text-stone-800 mb-2">Course Description</h3>
        <p className="text-stone-600 text-sm leading-relaxed">{data.desc}</p>
      </Card>
      
      <h3 className="font-semibold text-stone-800 mt-6 mb-2">Featured Grammar Patterns</h3>
      <div className="space-y-3">
        {data.sampleGrammar.map((g,i)=>(
          <Card key={i} className="p-5">
            <JapaneseReading jp={g.t} className="mb-1 text-lg font-bold" />
            <div className="text-sm text-stone-600 mb-2">{g.en}</div>
            <div className="text-xs text-stone-400 mb-2 font-mono bg-stone-50 p-1.5 rounded inline-block">Formation: {g.form}</div>
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Example Sentence</div>
              <JapaneseReading jp={g.ex.jp} className="mb-1 text-base font-medium" />
              <div className="text-sm text-stone-600">{g.ex.en}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---------------- Lesson List ----------------
function LessonList({lessons, progress, goTo}){
  return (<>
      
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
  </>);
}



function LevelLessonHub({level, goTo}){
  // Filter lessons belonging to the selected level
  const levelLessons = BEGINNER_II_LESSONS.filter(lesson => {
    if (level === "N4") return lesson.id >= 26 && lesson.id <= 50;
    if (level === "N3") return lesson.id >= 51 && lesson.id <= 65;
    if (level === "N2") return lesson.id >= 66 && lesson.id <= 75;
    if (level === "N1") return lesson.id >= 76 && lesson.id <= 85;
    return false;
  });

  return <div className="space-y-5 pb-24 md:pb-6">
    <div><div className="text-xs uppercase tracking-[.2em] text-sky-700">Selected exam</div><h2 className="text-2xl font-bold text-stone-900 mt-1">{level} learning path</h2><p className="text-stone-600 mt-1">This is your {level}-specific syllabus, vocabulary focus, kanji focus, and skill plan.</p></div>
    <LevelSyllabus level={level} goTo={goTo}/>
    <Card className="p-5">
      <div className="font-bold text-stone-900">{level} original study lessons</div>
      <p className="text-sm text-stone-600 mt-1">Open any lesson to study an original explanation, listen, answer practice, and write a sentence.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
        {levelLessons.map(lesson => (
          <button key={lesson.id} onClick={()=>goTo("minnaII",lesson.id)} className="rounded-xl border border-stone-200 p-3 text-left hover:border-sky-400 hover:bg-sky-50">
            <div className="font-semibold text-stone-800">Lesson {lesson.id}</div>
            <div className="text-xs text-stone-500 mt-1" lang="ja">{lesson.pattern}</div>
          </button>
        ))}
      </div>
    </Card>
  </div>;
}

function BeginnerIILesson({lesson, goTo}){
  const [selected,setSelected] = useState(null);
  const [writing,setWriting] = useState("");
  if(!lesson) return <div className="text-stone-600">This study lesson could not be found.</div>;
  const correct = selected === lesson.answer;
  return <div className="space-y-5 pb-24 md:pb-6">
    <button onClick={()=>goTo("lessons")} className="flex items-center gap-1 text-sm text-stone-500 hover:text-stone-800"><ChevronLeft size={16}/> All lessons</button>
    <div className="rounded-3xl bg-gradient-to-br from-sky-900 to-indigo-800 text-white p-6 md:p-8">
      <div className="text-xs uppercase tracking-[.2em] text-sky-200">JLPT Lesson Course · Original preparation</div>
      <h2 className="text-3xl font-bold mt-2">Lesson {lesson.id}</h2>
      <div className="text-xl mt-4" lang="ja">{lesson.pattern}</div>
      <p className="text-sky-100 mt-2">Study the meaning, listen, practise, and write your own response.</p>
    </div>
    <Card className="p-5">
      <div className="text-xs uppercase tracking-widest font-semibold text-sky-700">Original example</div>
      <JapaneseReading jp={lesson.ex} className="mt-3"/>
      <p className="text-stone-700 mt-3">{lesson.en}</p>
      <p className="text-red-700/70 text-sm mt-1" lang="ta">{lesson.ta}</p>
      <button onClick={()=>speakJapanese(lesson.ex)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-white"><Volume2 size={16}/> Listen and repeat</button>
    </Card>
    <Card className="p-5">
      <div className="font-semibold text-stone-900">Quick practice</div>
      <p className="text-sm text-stone-600 mt-1">{lesson.q}</p>
      <div className="grid sm:grid-cols-3 gap-2 mt-4">
        {lesson.options.map(option => <button key={option} onClick={()=>setSelected(option)} className={`rounded-xl border px-3 py-3 text-left text-sm ${selected === option ? (option === lesson.answer ? "border-green-500 bg-green-50 text-green-800" : "border-red-400 bg-red-50 text-red-800") : "border-stone-200 hover:border-sky-400"}`}>{option}</button>)}
      </div>
      {selected && <div className={`mt-4 rounded-xl p-3 text-sm ${correct ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"}`}>{correct ? "Correct — excellent work." : `Try again. Review ${lesson.pattern} and choose the best answer.`}</div>}
    </Card>
    <Card className="p-5">
      <div className="font-semibold text-stone-900">Write your own sentence</div>
      <p className="text-sm text-stone-600 mt-1">Use <b lang="ja">{lesson.pattern}</b> to make one original Japanese sentence. Your draft stays in this lesson while you practise.</p>
      <textarea value={writing} onChange={event=>setWriting(event.target.value)} rows={4} placeholder="日本語で文を書いてください…" className="mt-4 w-full rounded-xl border border-stone-200 p-3 outline-none focus:border-sky-500" lang="ja"/>
      <div className="mt-2 text-xs text-stone-500">{writing.trim() ? `${Array.from(writing.trim()).length} characters written` : "Start with a short sentence."}</div>
    </Card>
  </div>;
}

function LevelOnboarding({onChoose}){
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <Card className="max-w-xl w-full p-8 md:p-12 text-center space-y-6 bg-white shadow-xl rounded-3xl border border-stone-200">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 text-3xl">🎌</div>
        <div>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">NihongoVertex</h1>
          <p className="text-stone-600 mt-2 text-base">Select your current Japanese Language Proficiency Test (JLPT) level to start your customized training curriculum.</p>
        </div>
        <div className="grid gap-3 text-left">
          {[
            {level: "N5", title: "Beginner (ஆரம்பநிலை)", desc: "Hiragana, Katakana, basic Kanji (80 words), and simple survival communication."},
            {level: "N4", title: "Elementary (தொடக்கநிலை)", desc: "Basic conversations, basic grammar (te-form, potential, passive), and 80 kanji."},
            {level: "N3", title: "Intermediate (இடைநிலை)", desc: "Everyday situations, complex grammar, reading comprehension passages, and 100 kanji."},
            {level: "N2", title: "Upper-Intermediate (மேல்நிலை)", desc: "Social conversations, business Japanese, formal registers, and 100 kanji."},
            {level: "N1", title: "Advanced (மேம்பட்ட நிலை)", desc: "Academic texts, news articles, literary vocabulary, and 100 kanji."}
          ].map(l => (
            <button key={l.level} onClick={()=>onChoose(l.level)} className="group flex items-start gap-4 p-4 rounded-2xl border border-stone-200 hover:border-red-400 hover:bg-red-50/10 text-left transition-all">
              <div className="text-xl font-bold bg-stone-100 group-hover:bg-red-100 group-hover:text-red-700 px-3 py-1.5 rounded-xl text-stone-700 transition-colors">{l.level}</div>
              <div>
                <div className="font-semibold text-stone-800 group-hover:text-red-950 transition-colors">{l.title}</div>
                <div className="text-xs text-stone-500 mt-0.5">{l.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
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
      <div lang="ja" className="text-stone-900">{jp}</div>
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
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-8xl text-stone-200">{character}</div>
        <canvas ref={canvasRef} width="360" height="360" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} className="w-full aspect-square border border-stone-200 rounded-2xl bg-white touch-none relative"/>
      </div>
      <p className="text-xs text-stone-400 mt-3 text-center">Write over the faint character, then clear and try from memory.</p>
    </Card>
  );
}

function ObjectFirstScene({scene}){
  const [replay,setReplay]=useState(0);
  if(!scene) return null;
  const delay=(ms)=>({animationDelay:`${ms}ms`});
  return <div className="shape-mnemonic object-first-scene" key={replay}>
    <div className="shape-caption"><b>{scene.character} · {scene.romaji}</b> — a <b>{scene.object}</b> becomes the character</div>
    <svg className="object-first-svg" viewBox="0 0 240 150" role="img" aria-label={`${scene.character}: ${scene.object} transforms into the character`}>
      <g className="object-lines">
        {scene.transformationPaths.map((path,index)=><path key={path.id} d={path.from} className="object-first-line" style={delay(index*120)}>
          <animate attributeName="d" dur={`${scene.timing.loopMs}ms`} repeatCount="indefinite" values={`${path.from};${path.from};${path.to};${path.to}`} keyTimes="0;0.27;0.55;1"/>
        </path>)}
      </g>
    </svg>
    <div className="scene-controls"><span>object → connected lines → character</span><button type="button" onClick={()=>setReplay(value=>value+1)}>Replay</button></div>
  </div>;
}

function ShapeMnemonic({character,romaji,meaning,mnemonic}){
  const scene=OBJECT_FIRST_SCENES[character];
  if(scene) return <ObjectFirstScene scene={scene}/>;
  return <Card className="p-6">
    <div className="font-semibold mb-3">🎯 Memory trick</div>
    <div className="text-stone-700 font-medium mb-2">{meaning || mnemonic}</div>
    <p className="text-sm text-stone-500">Look at the shape, say <b>{romaji}</b> three times, connect it to the object, then write it without looking.</p>
  </Card>;
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
      
    <div className="space-y-5 pb-24 md:pb-6">
      <div>
        <div className="text-xs text-red-700 font-semibold tracking-widest uppercase">Character Lab</div>
        <h2 className="text-2xl font-bold text-stone-900">ひらがな · カタカナ · 漢字</h2>
        <p className="text-stone-500">Japanese + English-letter pronunciation + sound + memory object + writing practice.</p>
      </div>
      <Card className="p-4 bg-red-50 border-red-100">
        <div className="font-semibold text-stone-900 mb-1">🧠 Never guess the reading</div>
        <p className="text-sm text-stone-600">Every character card gives you <b>Japanese → Romaji → English meaning → sound</b>. Use the object/emoji as a memory hook, then write it.</p>
      </Card>
      <div className="flex flex-wrap gap-2">
        {[["hiragana","Hiragana ひらがな"],["katakana","Katakana カタカナ"],["kanji","Kanji 漢字"]].map(([k,l])=>
          <button key={k} onClick={()=>{setScript(k);setIdx(0);setMode("learn")}} className={`px-4 py-2 rounded-xl text-sm font-semibold ${script===k?"bg-stone-900 text-white":"bg-stone-100 text-stone-600"}`}>{l}</button>
        )}
        <button onClick={()=>setMode("practice")} className={`px-4 py-2 rounded-xl text-sm font-semibold ${mode==="practice"?"bg-red-700 text-white":"bg-stone-100 text-stone-600"}`}>✍️ Writing mode</button>
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
          <div className="text-2xl font-semibold text-red-700">🔤 {romaji}</div>
          {script==="kanji" && <div className="text-sm text-stone-500 mt-2">{item[3]}</div>}
          {script!=="kanji" && <div className="text-4xl mt-3">{item[2]}</div>}
          {script==="kanji" && <div className="text-3xl mt-3">{item[4]}</div>}
          <button onClick={()=>speakJapanese(char)} className="mt-4 inline-flex items-center gap-2 bg-stone-900 text-white px-5 py-2.5 rounded-xl"><Volume2 size={17}/> Hear pronunciation</button>
          <div className="mt-4 text-xs text-stone-400">Say it aloud: <b>{romaji}</b></div>
        </Card>
        {mode==="practice" ? <WritingPad character={char}/> : <ShapeMnemonic character={char} romaji={romaji} meaning={item[3]} mnemonic={item[3]}/>}
      </div>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div><div className="font-semibold">⚡ Rapid recall</div><div className="text-xs text-stone-400">Can you say the romaji before looking?</div></div>
          <button onClick={()=>setIdx((idx+1)%list.length)} className="px-3 py-2 rounded-lg bg-red-700 text-white text-sm">Next character →</button>
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
  return (<>
      
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
  </>);
}


// ---------------- Quick Revision / Level Notes ----------------
function QuickRevision({lesson, compact=false}){
  const grammar = lesson.grammar || [];
  const vocab = lesson.vocab || [];
  return (<>
      
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
  </>);
}

function LevelCompletionNotes({level="N5", lessons, progress, goTo}){
  const done = lessons.filter(l=>progress.completedLessons[l.id]);
  const vocab = lessons.flatMap(l=>l.vocab || []);
  const grammar = lessons.flatMap(l=>l.grammar || []);
  const pct = Math.round((done.length/Math.max(lessons.length,1))*100);
  return (<>
      
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
  const qSpeech=(q?.q||"").match(/[ぁ-んァ-ン一-龯ー々「」]+/g)?.join(" ") || q?.options?.[0] || "";
  function answer(opt){if(selected) return;setSelected(opt);if(opt===q.answer)setScore(s=>s+1);}
  function nextQ(){
    if(quizIdx+1<lesson.quiz.length){setQuizIdx(i=>i+1);setSelected(null);}
    else {setFinished(true); const finalScore=score+(selected===q.answer?1:0); onComplete(lesson.id,finalScore,lesson.quiz.length);}
  }
  useEffect(()=>{setStage(0);setQuizIdx(0);setSelected(null);setScore(0);setFinished(false)},[lesson.id]);
  return (<>
      
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
  </>);
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

  return (<>
      
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
  </>);
}

// ---------------- Mock Exam ----------------
function buildMockExam(allQuiz, allVocab, lessons, level = "N5"){
  const vocabQ = shuffleArr(allQuiz).slice(0,8).map(q=>({...q, section:"vocab"}));
  const grammarQ = shuffleArr(allQuiz.filter(q=>!vocabQ.includes(q))).slice(0,6).map(q=>({...q, section:"grammar"}));
  
  const readingPassagesPool = {
    N5: [
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
      }
    ],
    N4: [
      {
        passage: "あしたは 雨が 降ったら、美術館へ 行きます。もし 晴れたら、近くの 公園で お花見を します。",
        passageEn: "If it rains tomorrow, we will go to the art museum. If it is sunny, we will do flower viewing at a nearby park.",
        q: "雨が 降ったら、どこへ 行きますか。 (Where will they go if it rains?)",
        qta: "மழை பெய்தால் எங்கு போவார்கள்?",
        options: ["美術館", "公園", "駅", "図書館"], answer: "美術館",
        explain: "The passage states: 雨が 降ったら、美術館へ 行きます (If it rains, we will go to the art museum)."
      },
      {
        passage: "私は 音楽を 聞きながら 日本語を 勉強します。そのほうが 漢字や 文法を よく 覚えられるからです。",
        passageEn: "I study Japanese while listening to music. This is because I can memorize Kanji and grammar better that way.",
        q: "どうして 音楽を 聞きますか。 (Why do they listen to music?)",
        qta: "அவர் ஏன் இசை கேட்கிறார்?",
        options: ["よく 覚えられるから", "音楽が 好きだから", "部屋が 静かだから", "友達と 話すため"], answer: "よく 覚えられるから",
        explain: "The text says: そのほうが よく 覚えられるからです (Because I can memorize better that way)."
      }
    ],
    N3: [
      {
        passage: "健康のために、毎日５キロ走るようになりました。最初は大変でしたが、体力がついてきて、今は楽しく走っています。",
        passageEn: "For my health, I have become able to run 5km every day. It was tough at first, but as my stamina built up, I enjoy running now.",
        q: "最近どうして走っていますか。 (Why are they running recently?)",
        qta: "அவர் ஏன் சமீபத்தில் ஓடுகிறார்?",
        options: ["健康のため", "友達に誘われたから", "大会に出るため", "走るのが好きだから"], answer: "健康のため",
        explain: "The text explicitly starts with: 健康のために (For health)."
      },
      {
        passage: "プラスチックごみを減らすために、買い物にはマイバッグを持って行くべきです。レジ袋を使ってばかりいるのは良くありません。",
        passageEn: "To reduce plastic waste, we should bring our own shopping bag when shopping. Doing nothing but using plastic bags is not good.",
        q: "力者が良いと考えている行動は何ですか。 (What action does the author think is good?)",
        qta: "ஆசிரியர் எது நல்ல செயல் என்று நினைக்கிறார்?",
        options: ["マイバッグを持って行くこと", "レジ袋をたくさんもらうこと", "買い物を控えること", "ゴミを燃やすこと"], answer: "マイバッグを持って行くこと",
        explain: "The author recommends: マイバッグを持って行くべきです (We should bring our own bags)."
      }
    ],
    N2: [
      {
        passage: "スマートフォンの普及によって、私たちの生活は格段に便利になった。しかし、その一方で、対面でのコミュニケーションが減少し、社会的なつながりが希薄になっているにもかかわらず、人々は画面から目を離しようとしない。",
        passageEn: "With the spread of smartphones, our lives have become significantly more convenient. However, on the other hand, face-to-face communication is decreasing, and despite social connections weakening, people refuse to take their eyes off the screen.",
        q: "スマートフォンの普及による問題点として述べられていることは何か。 (What is stated as a problem due to the spread of smartphones?)",
        qta: "ஸ்மார்ட்போன் பரவலால் ஏற்படும் பிரச்சனை என்ன?",
        options: ["対面コミュニケーションの減少", "スマホの価格高騰", "生活が不便になること", "電波状況の悪化"], answer: "対面コミュニケーションの減少",
        explain: "The text states that face-to-face communication is decreasing: 対面でのコミュニケーションが減少."
      },
      {
        passage: "地球温暖化対策は、個人の努力に依存するぬきで、国際的な厳しい枠組みのもとで進める必要がある。そうでなければ、近い将来取り返しのつかない事態になり得る。",
        passageEn: "Global warming countermeasures need to be promoted under a strict international framework, without depending solely on individual efforts. Otherwise, it could lead to an irreversible situation in the near future.",
        q: "著者が必要だと主張している対策は何か。 (What measure does the author claim is necessary?)",
        qta: "ஆசிரியர் கூறும் தேவையான நடவடிக்கை என்ன?",
        options: ["国際的な厳しい枠組みのもとでの推進", "個人の努力にのみ頼ること", "温暖化対策の中止", "新しいエネルギーの開発"], answer: "国際的な厳しい枠組みのもとでの推進",
        explain: "The text states: 国際的な厳しい枠組みのもとで進める必要がある (Need to promote under a strict international framework)."
      }
    ],
    N1: [
      {
        passage: "学問的な探究において、安易な妥協は極まりない害毒をもたらす。単なる多数派の意見に同調することは、思考の放棄にほかならない。真理の把握は、絶えざる試行錯誤と葛藤の先にあるのであり、それをおいてほかに道はない。",
        passageEn: "In academic inquiry, easy compromise brings limitlessly toxic harm. Aligning simply with majority opinion is nothing but the abandonment of thought. The grasp of truth lies beyond continuous trial-and-error and conflict; there is no other way but that.",
        q: "筆者の学問的探究に対する見解として最も適切なものはどれか。 (Which is the most appropriate view of the author on academic inquiry?)",
        qta: "ஆசிரியரின் கல்வி ஆராய்ச்சி பற்றிய கருத்து என்ன?",
        options: ["絶えざる試行錯誤と葛藤が必要である", "多数派の意見に従うべきである", "安易な妥協が時に必要である", "思考を放棄して従事するべきである"], answer: "絶えざる試行錯誤と葛藤が必要である",
        explain: "The text concludes that truth is found beyond trial-and-error and conflict: 絶えざる試行錯誤と葛藤の先にある."
      },
      {
        passage: "現代の表現活動において、古典的な表現や雅言は過去の遺物とみなされがちである。しかし、言葉の持つ厳かな威厳や繊細なニュアンスは、安易な口語表現すら凌駕する力を持っている。これを忘れるべからず。",
        passageEn: "In modern expressive activities, classical expressions and elegant language tend to be regarded as relics of the past. However, the solemn dignity and delicate nuance of words possess power that surpasses even simple colloquial expressions. We must not forget this.",
        q: "文章で最も主張されていることは何か。 (What is most strongly asserted in the text?)",
        qta: "கட்டுரையில் கூறப்படும் முக்கிய கருத்து என்ன?",
        options: ["言葉の持つ威厳やニュアンスの重要性", "古典表現の完全な廃止", "口語表現のみを使用すること", "外国語の積極的な導入"], answer: "言葉の持つ威厳やニュアンスの重要性",
        explain: "The author argues that the solemn dignity and delicate nuance of words have power that surpasses simple colloquial expressions."
      }
    ]
  };

  const listeningPool = {
    N5: [
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
       explain:"あした じゅぎょうの まえに だして ください = Please submit it before tomorrow's class."}
    ],
    N4: [
      {situation:"At the train station", situationJp:"駅で", transcript:"次の東京行きの電車は、３番線から出ます。２番線ではありませんので、ご注意ください。",
       q: "東京行きの電車は何番線から出ますか。 (Which platform does the Tokyo-bound train leave from?)", qta: "தோக்கியோ செல்லும் ரயில் எந்த மேடையில் இருந்து புறப்படும்?",
       options: ["２番線", "３番線", "４番線", "１番線"], answer: "３番線",
       explain: "The text says: 次の東京行きの電車は、３番線から出ます (leaves from platform 3)."},
      {situation:"At the office", situationJp:"会社で", transcript:"田中さん、明日の会議は３時からになりました。２時ではありません。",
       q: "明日の会議は何時からですか。 (What time is the meeting tomorrow?)", qta: "நாளை கூட்டம் எத்தனை மணிக்கு?",
       options: ["２時", "３時", "４時", "５時"], answer: "３時",
       explain: "The speaker states: 明日の会議は３時からになりました (from 3 o'clock)."}
    ],
    N3: [
      {situation:"At a company", situationJp:"会社で", transcript:"明日のプレゼンの準備なんですが、資料の印刷は終わりましたか？／はい、終わりました。今はスライドの最終確認をしているところです。",
       q: "二人は今何をしていますか。 (What are the two doing now?)", qta: "இருவரும் இப்போது என்ன செய்து கொண்டிருக்கிறார்கள்?",
       options: ["スライドの最終確認", "資料の印刷", "会議室の片付け", "プレゼンテーションの発表"], answer: "スライドの最終確認",
       explain: "The response says: 今はスライドの最終確認をしているところです (Currently doing final check of the slides)."},
      {situation:"At the clinic", situationJp:"クリニックで", transcript:"この薬は食後に飲んでください。また、飲んだ後は眠くなることがありますので、運転は避けてください。",
       q: "薬を飲んだ後に何をしてはいけませんか。 (What must you not do after taking the medicine?)", qta: "மருந்து சாப்பிட்ட பிறகு என்ன செய்யக் கூடாது?",
       options: ["車の運転", "食事", "睡眠", "仕事"], answer: "車の運転",
       explain: "The doctor warns: 運転は避けてください (Avoid driving)."}
    ],
    N2: [
      {situation:"At a lecture hall", situationJp:"講義室で", transcript:"近年、少子高齢化が進み、労働力不足が深刻化しています。これに伴い、定年の延長や外国人労働者の受け入れ拡大が必要不可欠となっています。",
       q: "労働力不足に伴って必要とされていることは何ですか。 (What is needed along with the labor shortage?)", qta: "தொழிலாளர் பற்றாக்குறையையொட்டி தேவைப்படும் நடவடிக்கை என்ன?",
       options: ["定年の延長や外国人労働者の受け入れ拡大", "出生率 of 低下防止対策", "国内消費の削減", "ロボットの全面導入"], answer: "定年の延長や外国人労働者の受け入れ拡大",
       explain: "The speaker states: 定年の延長や外国人労働者の受け入れ拡大が必要不可欠となっています."},
      {situation:"At the news desk", situationJp:"ニュースで", transcript:"大型の台風１５号は、明日午前中に強い勢力を維持したまま上陸するおそれがあります。土砂災害や河川の氾濫に厳重に警戒してください。",
       q: "ニュースは何について警戒を呼びかけていますか。 (What is the news calling for vigilance against?)", qta: "செய்திகளில் எதைப் பற்றி எச்சரிக்கை விடுக்கப்படுகிறது?",
       options: ["土砂災害や河川の氾濫", "地震の発生", "気温の急激な低下", "電波障害の発生"], answer: "土砂災害や河川の氾濫",
       explain: "The announcer calls for: 土砂災害や河川の氾濫に厳重に警戒してください."}
    ],
    N1: [
      {situation:"Academic Symposium", situationJp:"シンポジウムで", transcript:"人工知能の急速な進歩は、社会に多大な恩恵をもたらす一方で、倫理的な懸念を呼び起こさずにはおきません。技術革新のスピードに法整備が追いつかない現状においては、研究者個人の高い道徳観が極めて重要となります。",
       q: "現状において研究者に何が求められていますか。 (What is required of researchers in the current situation?)", qta: "தற்போதைய சூழ்நிலையில் ஆராய்ச்சியாளர்களிடம் இருந்து என்ன எதிர்பார்க்கப்படுகிறது?",
       options: ["高い道徳観", "技術革新の加速", "法整備の完全な停止", "資金の確保"], answer: "高い道徳観",
       explain: "The speaker asserts: 研究者個人の高い道徳観が極めて重要となります."},
      {situation:"Business Briefing", situationJp:"ビジネス説明会で", transcript:"今回の組織改編を契機に、意思決定プロセスの迅速化を図り、多様化する顧客ニーズに臨機応変に対応できる体制を構築してまいります。",
       q: "組織改編の主な目的は何ですか。 (What is the main purpose of the organizational restructuring?)", qta: "அமைப்பு மாற்றத்தின் முக்கிய நோக்கம் என்ன?",
       options: ["迅速な意思決定と臨機応変な対応体制の構築", "人員の削減とコストカット", "新しい製品ラインナップの発表", "オフィスの移転"], answer: "迅速な意思決定と臨機応変な対応体制 of 構築",
       explain: "The speaker states the purpose is: 意思決定プロセスの迅速化を図り、多様化する顧客ニーズに臨機応変に対応できる体制を構築してまいります."}
    ]
  };

  const readingPassages = readingPassagesPool[level] || readingPassagesPool["N5"];
  const readingQ = readingPassages.map((r,i)=>({q:r.q, qta:r.qta, options:r.options, answer:r.answer, explain:r.explain, passage:r.passage, passageEn:r.passageEn, section:"reading", id:"read"+i}));

  const listeningPassages = listeningPool[level] || listeningPool["N5"];
  const listeningQ = listeningPassages.map((l,i)=>({...l, section:"listening", id:"listen"+i}));

  return { vocab: vocabQ, grammar: [...grammarQ, ...readingQ], listening: listeningQ };
}
function shuffleArr(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }

const MOCK_SECTIONS = [
  {key:"vocab", label:"Language Knowledge (Vocabulary)", labelJp:"言語知識（文字・語彙）", minutes:20},
  {key:"grammar", label:"Language Knowledge (Grammar) + Reading", labelJp:"言語知識（文法）・読解", minutes:40},
  {key:"listening", label:"Listening", labelJp:"聴解", minutes:30},
];

function MockExamIntro({onStart, goTo, level = "N5"}){
  return (
    <div className="space-y-6 max-w-2xl pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">模擬試験 <span className="text-stone-400 text-base font-normal">JLPT {level} Mock Exam</span></h2>
      <Card className="p-6">
        <p className="text-stone-600 mb-4">This simulates the official {level} section structure and timing. Questions are original practice material inspired by JLPT formats — not real JLPT questions.</p>
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
        <button onClick={onStart} className="w-full bg-red-700 hover:bg-red-600 text-white font-semibold py-3 rounded-xl">🎌 Start JLPT {level} Mock Test</button>
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
  const [param, setParam] = useState(null);
  const [mockExamData, setMockExamData] = useState(null);
  const [mockResult, setMockResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(()=>typeof window!=="undefined" && window.innerWidth>=768);
  const [mistakes, setMistakes] = useState([]);
  const [activeLevel, setActiveLevel] = useState(()=>{try{return localStorage.getItem("nv-active-level")||"N5";}catch(e){return "N5";}});
  const [hasChosenLevel, setHasChosenLevel] = useState(()=>{try{return localStorage.getItem("nv-level-chosen")==="true";}catch(e){return false;}});
  useEffect(()=>{try{localStorage.setItem("nv-active-level",activeLevel);}catch(e){}},[activeLevel]);
  const { progress, completeLesson, recordMock, loaded } = useProgress();
  const currentBeginnerIILesson = param && BEGINNER_II_LESSONS.find(l=>l.id===param);

  function goTo(scr, p=null){
    if(scr==="levelDetail"){
      const selectedLevel = typeof p==="string" ? p : (p?.code||"N5");
      setActiveLevel(LEVELS.includes(selectedLevel) ? selectedLevel : "N5");
      if(selectedLevel === "N5"){ scr="lessons"; p=null; }
    }
    setScreen(scr); setParam(p); setSidebarOpen(false);
    window.scrollTo(0,0);
  }

  function changeExamGoal(){
    try{localStorage.removeItem("nv-level-chosen");}catch(e){}
    setSidebarOpen(false);
    setHasChosenLevel(false);
    window.scrollTo(0,0);
  }

  function selectStudyLevel(level){
    const selectedLevel = LEVELS.includes(level) ? level : "N5";
    setActiveLevel(selectedLevel);
    try{localStorage.setItem("nv-active-level",selectedLevel);}catch(e){}
    goTo(selectedLevel === "N5" ? "lessons" : "levelDetail", selectedLevel);
  }

  function handleLessonComplete(lessonId, score, total){
    completeLesson(lessonId, score, total);
  }

    function startMock(){
    let levelQuiz = [];
    let levelVocab = [];
    let levelLessonsList = [];

    if (activeLevel === "N5") {
      levelQuiz = ALL_N5_QUIZ;
      levelVocab = ALL_N5_VOCAB;
      levelLessonsList = LESSONS;
    } else {
      levelLessonsList = BEGINNER_II_LESSONS.filter(l => {
        if (activeLevel === "N4") return l.id >= 26 && l.id <= 50;
        if (activeLevel === "N3") return l.id >= 51 && l.id <= 65;
        if (activeLevel === "N2") return l.id >= 66 && l.id <= 75;
        if (activeLevel === "N1") return l.id >= 76 && l.id <= 85;
        return false;
      });
      levelQuiz = quizBank[activeLevel] || [];
      levelVocab = levelLessonsList.map(l => ({ jp: l.pattern, en: l.en, ta: l.ta }));
    }

    setMockExamData(buildMockExam(levelQuiz, levelVocab, levelLessonsList, activeLevel));
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

  if(!hasChosenLevel){
    return <LevelOnboarding onChoose={(level)=>{setActiveLevel(level);try{localStorage.setItem("nv-level-chosen","true");}catch(e){}setHasChosenLevel(true);}}/>;
  }

  if(screen === "mockRun" && mockExamData){
    return <MockExamRunner exam={mockExamData} onFinish={finishMock} />;
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans" style={{fontFamily:"'Noto Sans JP','Noto Sans Tamil',ui-sans-serif,system-ui"}}>
      <div className="flex">
        {/* Desktop sidebar: compact rail by default, expandable as in the reference UI. */}
        <aside className={`app-sidebar hidden md:flex md:flex-col shrink-0 bg-white border-r border-stone-200 min-h-screen sticky top-0 ${sidebarOpen ? "sidebar-expanded" : "sidebar-collapsed"}`}>
          <div className="sidebar-brand p-4 border-b border-stone-100">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-600"/><span className="sidebar-label font-bold text-stone-900 tracking-tight">Nihongo Vertex</span></div>
            <button type="button" className="sidebar-menu-button" onClick={()=>setSidebarOpen(value=>!value)} aria-label={sidebarOpen ? "Collapse navigation" : "Expand navigation"} aria-expanded={sidebarOpen}>{sidebarOpen ? <X size={19}/> : <Menu size={19}/>}</button>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {NAV.map(n=>{
              const Icon = n.icon;
              const active = screen===n.key || (n.key==="lessons" && (screen==="lesson" || screen==="minnaII")) || (n.key==="levels" && screen==="levelDetail") || (n.key==="mock" && (screen==="mockResult"));
              return (
                <button key={n.key} title={`${n.jp} · ${n.en}`} onClick={()=>goTo(n.key)} className={`sidebar-nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${active ? "bg-red-50 text-red-700 font-medium" : "text-stone-600 hover:bg-stone-50"}`}>
                  <Icon size={18}/><span className="sidebar-label" lang="ja">{n.jp}</span><span className="sidebar-label text-stone-400 text-xs">{n.en}</span>
                </button>
              );
            })}
          </nav>
          <div className="sidebar-label p-4 border-t border-stone-100 text-xs text-stone-400">
            Practice questions are original learning materials inspired by JLPT formats and are not official JLPT questions.
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="md:hidden fixed top-0 inset-x-0 z-30 bg-white border-b border-stone-200 flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <button type="button" className="mobile-menu-button" onClick={()=>setSidebarOpen(true)} aria-label="Open navigation"><Menu size={21}/></button>
            <div className="w-2 h-2 rounded-full bg-red-600"/>
            <span className="font-bold text-stone-900">Nihongo Vertex</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span className="flex items-center gap-1"><Flame size={14} className="text-red-600"/>{progress.streak}</span>
            <span className="flex items-center gap-1"><Star size={14} className="text-red-600"/>{progress.xp}</span>
          </div>
        </div>

        <div className={`mobile-nav-layer md:hidden ${sidebarOpen ? "is-open" : ""}`} aria-hidden={!sidebarOpen}>
          <button type="button" className="mobile-nav-backdrop" onClick={()=>setSidebarOpen(false)} aria-label="Close navigation"/>
          <aside className="mobile-nav-drawer" aria-label="Mobile navigation">
            <div className="flex items-center justify-between p-5 border-b border-stone-100"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-600"/><b>Nihongo Vertex</b></div><button type="button" className="mobile-menu-button" onClick={()=>setSidebarOpen(false)} aria-label="Close navigation"><X size={21}/></button></div>
            <nav className="p-3 space-y-1">{NAV.map(n=>{const Icon=n.icon;const active=screen===n.key || (n.key==="lessons"&&(screen==="lesson"||screen==="minnaII")) || (n.key==="levels"&&screen==="levelDetail");return <button key={n.key} onClick={()=>goTo(n.key)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm ${active?"bg-red-50 text-red-700 font-medium":"text-stone-600"}`}><Icon size={19}/><span lang="ja">{n.jp}</span><span className="text-stone-400 text-xs">{n.en}</span></button>})}</nav>
          </aside>
        </div>

        <main className="app-main flex-1 p-4 md:p-6 lg:p-8 pt-20 md:pt-8 max-w-5xl mx-auto w-full">
          {screen==="home" && <Home progress={progress} lessons={LESSONS} goTo={goTo} activeLevel={activeLevel} onChangeGoal={changeExamGoal}/>}
          {screen==="lessons" && (activeLevel === "N5" ? <LessonList lessons={LESSONS} progress={progress} goTo={goTo}/> : <LevelLessonHub level={activeLevel} goTo={goTo}/>)}
          {screen==="characters" && <CharacterLab/>}
          {screen==="lesson" && currentLesson && <LessonFlow lesson={currentLesson} goTo={goTo} onComplete={handleLessonComplete} isLastLesson={currentLesson.id===LESSONS.length}/>}
          {screen==="levelComplete" && <LevelCompletionNotes level="N5" lessons={LESSONS} progress={progress} goTo={goTo}/>}
          {screen==="minnaII" && <BeginnerIILesson lesson={currentBeginnerIILesson} goTo={goTo}/>}
          {screen==="levels" && <LevelSelector progress={progress} goTo={goTo} otherLevels={OTHER_LEVELS} activeLevel={activeLevel} onSelectLevel={selectStudyLevel}/>}
          {screen==="levelDetail" && <LevelDetail level={param || activeLevel} otherLevels={OTHER_LEVELS} goTo={goTo}/>}
          {screen==="mistakes" && <MistakeBook mistakes={mistakes}/>}
          {screen==="mock" && <MockExamIntro level={activeLevel} onStart={startMock} goTo={goTo}/>}
          {screen==="mockResult" && mockResult && <MockExamResult result={mockResult} goTo={goTo}/>}
          {screen==="progress" && <ProgressDashboard progress={progress} lessons={LESSONS}/>}
          {screen==="aiHub" && <AIMentorHub level={activeLevel} progress={progress} goTo={goTo}/>}
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
