// ===== SOURCE: NihongoVertex_RevisionFlow.jsx =====
import React, { useState, useEffect, useMemo, useRef } from "react";
import { BookOpen, Home as HomeIcon, Layers, PenTool, Headphones, ListChecks, ClipboardCheck, AlertCircle, TrendingUp, Settings, Menu, X, Flame, Star, ChevronRight, ChevronLeft, Flag, Clock, CheckCircle2, XCircle, Play, Pause, RotateCcw, Award, Lock, Volume2, PenLine, Search, Sparkles } from "lucide-react";

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
function Home({progress, lessons, goTo}){
  const completedCount = Object.keys(progress.completedLessons).length;
  const totalLessons = lessons.length;
  const pct = Math.round((completedCount/totalLessons)*100);
  const nextLesson = lessons.find(l => !progress.completedLessons[l.id]) || lessons[0];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 md:p-12">
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-red-700/20 blur-2xl"/>
        <div className="absolute right-6 top-6 w-3 h-3 rounded-full bg-red-600"/>
        <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-3">Nihongo Vertex</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-2" lang="ja">日本語を、試験に強い力へ。</h1>
        <p className="text-stone-300 max-w-xl mb-1">Master Japanese from your first hiragana to JLPT N1 — studied through தமிழ் · English · 日本語.</p>
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
function LevelSelector({progress, lessons, goTo, otherLevels}){
  const completedCount = Object.keys(progress.completedLessons).length;
  const pct = Math.round((completedCount/lessons.length)*100);
  return (
    <div className="space-y-4 pb-24 md:pb-6">
      <h2 className="text-2xl font-bold text-stone-900">レベル選択 <span className="text-stone-400 text-base font-normal">Level Selector</span></h2>
      <div className="grid md:grid-cols-2 gap-4">
        {LEVELS.map(lv=>{
          const active = lv === "N5";
          const labels = {N5:"Beginner · ஆரம்பநிலை", N4:"Elementary · தொடக்கநிலை", N3:"Intermediate · இடைநிலை", N2:"Upper Intermediate · மேல்நிலை", N1:"Advanced · மேம்பட்ட நிலை"};
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
                  <div className="text-xs text-stone-500 mt-2 mb-4">{pct}% complete · {completedCount}/{lessons.length} lessons</div>
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
  return (
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
  return (
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
        {mode==="practice" ? <WritingPad character={char}/> : (
          <Card className="p-6">
            <div className="font-semibold mb-3">🎯 Memory trick</div>
            <div className="text-5xl mb-3">{script==="kanji"?item[4]:item[2]}</div>
            <div className="text-stone-700 font-medium mb-2">{script==="kanji"?item[3]:item[3]}</div>
            <p className="text-sm text-stone-500">Look at the shape, say <b>{romaji}</b> three times, connect it to the object, then write it without looking.</p>
            <div className="mt-5 p-4 rounded-xl bg-stone-50">
              <div className="text-xs uppercase tracking-wide text-stone-400 mb-1">3-step memory loop</div>
              <div className="text-sm">👀 See → 🔊 Say → ✍️ Write → 🔁 Repeat</div>
            </div>
          </Card>
        )}
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
  );
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

  return (
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
  );
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

// ---------------- App shell ----------------
export default function NihongoVertex(){
  const [screen, setScreen] = useState("home");
  const [param, setParam] = useState(null);
  const [mockExamData, setMockExamData] = useState(null);
  const [mockResult, setMockResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mistakes, setMistakes] = useState([]);
  const { progress, completeLesson, recordMock, loaded } = useProgress();

  function goTo(scr, p=null){
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

