// NihongoVertex curriculum engine.
// IMPORTANT: Minna no Nihongo lesson structure is used as a curriculum alignment layer.
// Lesson explanations, Tamil glosses, examples, quizzes and practice tasks in NihongoVertex
// are original learning content; this file does not reproduce the copyrighted textbook.

const makeModule = (id, level, title, jp, ta, grammar, vocabThemes, objective, sourceLesson=null) => ({
  id, level, title, jp, ta,
  sourceLesson,
  objective,
  grammar,
  vocabThemes,
  skills: ["Reading", "Listening", "Speaking", "Writing"],
  materials: ["Original lesson notes", "Vocabulary cards", "Grammar drill", "Reading mini-passage", "Listening task", "Writing task"],
  quizTypes: ["Vocabulary", "Grammar", "Reading", "Listening", "Sentence building"],
  status: "curriculum_ready"
});

const n5 = [
[1,"Introductions & Identity","わたしは学生です","அறிமுகம் மற்றும் அடையாளம்",["NはNです","NはNではありません","～ですか","も","の"],["people","occupations","countries"],"Introduce yourself, identify people and ask basic identity questions."],
[2,"Objects & Ownership","これは何ですか","பொருட்கள் மற்றும் உடைமை",["これ・それ・あれ","この・その・あの","NのN"],["classroom objects","personal belongings"],"Identify objects, ownership and location-relative demonstratives."],
[3,"Places & Locations","ここはどこですか","இடங்கள் மற்றும் இருப்பிடம்",["ここ・そこ・あそこ","こちら・そちら・あちら","Nは場所です"],["buildings","rooms","campus"],"Ask and answer where places and facilities are."],
[4,"Time & Daily Schedule","今何時ですか","நேரம் மற்றும் தினசரி அட்டவணை",["～時・～分","～から～まで","いつ","毎日"],["clock time","weekdays","daily routines"],"Tell time and describe a simple daily schedule."],
[5,"Going & Coming","どこへ行きますか","செல்வது மற்றும் வருவது",["へ","で (transport)","と","いつ"],["transport","destinations","travel"],"Talk about destinations, transport and companions."],
[6,"Actions & Invitations","何をしますか","செயல்கள் மற்றும் அழைப்புகள்",["を","で (place of action)","ませんか","ましょう"],["daily actions","food","leisure"],"Describe actions and invite someone to do something."],
[7,"Giving, Receiving & Learning","何をあげますか","கொடுத்தல், பெறுதல், கற்றல்",["あげます","もらいます","NにNをあげます","NにNをもらいます"],["gifts","school supplies","learning"],"Express simple giving, receiving and learning relationships."],
[8,"Adjectives & Description","どんな町ですか","பெயரடைகள் மற்றும் விளக்கம்",["い-adjectives","な-adjectives","NはAdjです","AdjなN"],["appearance","places","weather"],"Describe people, objects and places with basic adjectives."],
[9,"Likes & Abilities","何が好きですか","விருப்பங்கள் மற்றும் திறன்கள்",["Nが好きです","Nが嫌いです","Nが上手です","Nが分かります"],["hobbies","languages","skills"],"Talk about preferences, understanding and basic ability."],
[10,"Existence & Position","猫がいます","இருப்பு மற்றும் இடநிலை",["あります・います","Nは場所にあります","Nがいます","position words"],["furniture","animals","locations"],"Describe where living and non-living things exist."],
[11,"Numbers, Counters & Quantity","いくつありますか","எண்கள் மற்றும் அளவுகள்",["counters","quantity + あります","duration","frequency"],["items","people","time spans"],"Count common objects and describe quantities and duration."],
[12,"Past & Comparison","昨日はどうでしたか","கடந்த காலம் மற்றும் ஒப்பீடு",["past です","past adjectives","より","一番"],["experiences","weather","preferences"],"Describe past states and make simple comparisons."],
].map((x)=>makeModule(`N5-M${x[0]}`,"N5",x[1],x[2],x[3],x[4],x[5],x[6],x[0]));

const n4 = [
[13,"Wants & Purpose","何がほしいですか","விருப்பம் மற்றும் நோக்கம்",["Nがほしいです","Vます-stem + たいです","Nをください","purpose に行きます"],["shopping","plans","needs"],"Express wants, desires and purposes for going somewhere."],
[14,"Te-form Foundations","手伝ってください","て-form அடிப்படை",["て-form","～てください","～ています","～てもいいですか"],["requests","ongoing actions","classroom actions"],"Form and use the て-form for requests and ongoing actions."],
[15,"Permission & Prohibition","ここで写真を撮ってもいいですか","அனுமதி மற்றும் தடை",["～てもいいです","～てはいけません","～ています"],["rules","public places","activities"],"Ask for permission and state rules or prohibitions."],
[16,"Sequences & Descriptions","朝起きて、学校へ行きます","தொடர் செயல்கள் மற்றும் விளக்கம்",["Vて、V","Vてから","い-adj + くて","な-adj + で"],["routines","processes","descriptions"],"Connect actions and adjectives into longer descriptions."],
[17,"Nai-form & Advice","ここでタバコを吸わないでください","ない-form மற்றும் ஆலோசனை",["ない-form","～ないでください","～なければなりません","～なくてもいいです"],["rules","obligations","health"],"Express prohibition, obligation and lack of necessity."],
[18,"Dictionary Form & Skills","日本語を話すことができます","dictionary form மற்றும் திறன்கள்",["dictionary form","Vことができます","趣味はVことです","前に"],["skills","hobbies","preparation"],"Use dictionary forms to describe ability, hobbies and before-actions."],
[19,"Ta-form & Experience","日本へ行ったことがあります","た-form மற்றும் அனுபவம்",["た-form","Vたことがあります","～たり～たりします","～なります"],["experiences","changes","weekends"],"Talk about experiences, examples of activities and changes."],
[20,"Plain Style Basics","と思います","plain form அடிப்படை",["plain present/past","と思います","と言います"],["opinions","statements","reported speech"],"Use plain forms for opinions and reported speech."],
[21,"Opinions & Reasons","どう思いますか","கருத்து மற்றும் காரணம்",["と思います","でしょう","Nについて","から"],["opinions","reasons","topics"],"Give opinions, reasons and predictions in connected speech."],
[22,"Noun Modification","これは私が作った料理です","பெயர்ச்சொல் இணைப்பு",["relative clauses","plain + N","Nのような"],["people","objects","descriptions"],"Build noun-modifying clauses and identify people or things precisely."],
[23,"When & Conditions","暇なとき、映画を見ます","நேரம் மற்றும் நிபந்தனை",["とき","と","～前に","～あとで"],["events","timing","instructions"],"Explain when actions happen and connect conditions with と."],
[24,"Giving Help & Receiving Actions","手伝ってくれました","உதவி மற்றும் செயல் பெறுதல்",["Vてあげます","Vてもらいます","Vてくれます"],["help","favours","relationships"],"Describe helpful actions and who benefits from them."],
[25,"Conditional たら & Review","時間があったら行きます","たら நிபந்தனை மற்றும் மீளாய்வு",["～たら","～ても","もし","subordinate clauses"],["plans","conditions","review"],"Express conditions, concessions and combine N5 grammar in conversation."]
,
[26,"Explanations & Background","どうしたんですか","விளக்கம் மற்றும் பின்னணி",["～んです","～んですが","どうしたんですか","どうして"],["problems","reasons","requests"],"Explain situations and ask for contextual information politely."],
[27,"Potential & Capability","日本語が話せます","சாத்தியம் மற்றும் திறன்",["potential form","見えます・聞こえます","できます"],["abilities","facilities","skills"],"Express ability, possibility and what can be seen or heard."],
[28,"Parallel Actions & Examples","音楽を聞きながら勉強します","ஒரே நேர செயல்கள் மற்றும் உதாரணங்கள்",["ながら","たり～たり","し～し"],["study","leisure","reasons"],"Connect simultaneous actions and list representative examples."],
[29,"Transitive & Intransitive","ドアが開きます","செயப்படுபொருள் மற்றும் செய்பவர் வினைகள்",["transitive/intransitive","～ています","～が開く/～を開ける"],["machines","rooms","changes"],"Describe states and distinguish intentional actions from resulting states."],
[30,"Prepared States","窓が開けてあります","முன்கூட்டியே செய்யப்பட்ட நிலை",["～てあります","～ておきます","～ておいてください"],["preparation","events","arrangements"],"Describe prepared states and actions done in advance."],
[31,"Volitional & Plans","旅行しようと思っています","விருப்பத் திட்டங்கள்",["volitional","～ようと思います","～つもりです","～予定です"],["plans","travel","goals"],"State intentions, plans and scheduled activities."],
[32,"Advice & Probability","休んだほうがいいです","ஆலோசனை மற்றும் சாத்தியம்",["～ほうがいい","でしょう","かもしれません"],["health","weather","advice"],"Give advice and express probability."],
[33,"Imperatives & Notices","気をつけてください","கட்டளை மற்றும் அறிவிப்புகள்",["imperative","prohibitive","～という意味です","～と読みます"],["signs","warnings","instructions"],"Understand and produce common notices and strong instructions."],
[34,"Condition & Required State","このまま置いてください","நிலை மற்றும் நிபந்தனை",["～とおりに","～たら","～ないで","～ないと"],["procedures","instructions","rules"],"Follow procedures and describe required conditions."],
[35,"Ba-condition & If","安ければ買います","ば நிபந்தனை",["～ば","～なら","～なければ"],["choices","conditions","shopping"],"Use ば and related conditional patterns for decisions."],
[36,"ように Purpose & Change","忘れないようにします","ように நோக்கம்",["～ように","～ようになります","～ようにします"],["habits","goals","changes"],"Describe goals, habits and gradual changes in ability or state."],
[37,"Passive Voice","先生にほめられました","passive voice",["passive form","indirect passive","by-agent に"],["school","work","incidents"],"Describe events from the affected person's perspective."],
].map((x)=>makeModule(`N4-M${x[0]}`,"N4",x[1],x[2],x[3],x[4],x[5],x[6],x[0]));

const advanced = {
N3:[
[1,"Intermediate Grammar Core","中級文法の土台",["ようになる","ようにする","ことになる","ことにする"],["change","decisions","habits"]],
[2,"Conditionals & Concession","条件と逆接",["わけではない","わけがない","とは限らない","ても"],["opinions","conditions","exceptions"]],
[3,"Degree & Comparison","程度と比較",["ほど","くらい","だけでなく","よりも"],["degree","comparison","quantity"]],
[4,"Nominalization & Formal Style","名詞化と書き言葉",["ことから","ことなく","ものだ","わけだ"],["formal writing","explanation"]],
[5,"Causality & Logic","因果関係",["ため","ので","ことによって","そのため"],["causes","effects","reports"]],
[6,"Aspect & Completion","相と完了",["ている","てしまう","かける","続ける"],["process","completion","unfinished action"]],
[7,"Passive/Causative Review","受身・使役",["passive","causative","causative-passive"],["work","incidents"]],
[8,"Reported Speech","伝聞と引用",["そうだ","という","とのことだ","と言われている"],["news","reports"]],
[9,"Relative Clauses & Dense Nouns","連体修飾",["complex noun modification","relative clauses"],["news","descriptions"]],
[10,"Reading Connectors","文章接続",["しかし","一方で","そのため","つまり","例えば"],["essays","articles"]],
[11,"Adverbs & Nuance","副詞とニュアンス",["かなり","ほとんど","せっかく","あまり"],["frequency","degree","attitude"]],
[12,"Speech Registers","話し言葉と書き言葉",["casual contractions","formal endings"],["conversation","emails"]],
[13,"Social Interaction","対人表現",["依頼","断り","提案","配慮表現"],["requests","refusals","suggestions"]],
[14,"Abstract Vocabulary","抽象語彙",["society","education","environment"],["abstract nouns"]],
[15,"Reading: Notices & Emails","通知・メール読解",["information extraction","purpose","tone"],["notices","emails"]],
[16,"Reading: Explanations","説明文読解",["main idea","supporting detail","inference"],["expository texts"]],
[17,"Listening: Daily Reports","日常報告聴解",["key information","speaker intention"],["announcements","reports"]],
[18,"Kanji & Word Formation","漢字語形成",["prefix/suffix","compound kanji"],["academic/work vocabulary"]],
[19,"Integrated N3 Grammar Review","N3文法総復習",["mixed patterns"],["all N3 domains"]],
[20,"N3 Mock Readiness","N3実戦準備",["timed practice","error analysis"],["all exam sections"]]
],
N2:[
[1,"Formal Grammar & Register","上級文法と文体",["にあたって","に際して","をめぐって"],["formal contexts"]],
[2,"Concession & Contrast","逆接と対比",["にもかかわらず","ものの","とはいえ"],["argumentation"]],
[3,"Limitation & Scope","限定と範囲",["に限らず","に限って","にほかならない"],["formal writing"]],
[4,"Cause & Basis","原因と根拠",["ことから","以上","ことだから"],["analysis"]],
[5,"Evaluation & Judgment","評価と判断",["にすぎない","わけにはいかない","に違いない"],["opinions"]],
[6,"Probability & Inference","推量と推測",["に違いない","はずだ","わけだ","ようだ"],["inference"]],
[7,"Emphasis & Focus","強調と焦点",["こそ","さえ","まで","なんて"],["rhetoric"]],
[8,"Parallel & Simultaneous","並行と同時",["つつ","ながらも","一方で"],["processes"]],
[9,"Change & Trend","変化と傾向",["につれて","に伴って","次第に"],["statistics","society"]],
[10,"Abstract Nominal Patterns","抽象名詞構文",["ことなく","ものではない","ところを"],["formal prose"]],
[11,"Business Japanese","ビジネス日本語",["keigo review","email conventions","requests"],["workplace"]],
[12,"News Reading","ニュース読解",["headline grammar","reported claims"],["news","media"]],
[13,"Opinion & Editorial Reading","論説文読解",["claim","evidence","counterargument"],["editorials"]],
[14,"Long Sentence Parsing","長文構造",["embedded clauses","nominalization"],["academic prose"]],
[15,"Vocabulary: Synonym Precision","類義語",["near-synonyms","register"],["abstract vocabulary"]],
[16,"Kanji Compounds N2","N2漢字語",["compound formation","readings"],["academic/work terms"]],
[17,"Listening: Interviews","インタビュー聴解",["speaker attitude","detail"],["interviews"]],
[18,"Listening: Lectures & Reports","講義・報告聴解",["structure","key points"],["lectures"]],
[19,"Integrated N2 Review","N2総復習",["mixed advanced patterns"],["all sections"]],
[20,"N2 Mock Readiness","N2実戦準備",["timed sets","error analysis"],["all exam sections"]]
],
N1:[
[1,"Advanced Formality","高度な文体",["ではあるまいし","にかかわらず","をもって"],["formal discourse"]],
[2,"Rhetorical Concession","譲歩と反論",["とはいえ","といっても","ながらも"],["argumentation"]],
[3,"Restrictive & Exceptional","限定・例外",["にほかならない","をおいてほかにない","に限り"],["formal writing"]],
[4,"Cause, Basis & Context","原因・根拠・背景",["ゆえに","こととて","だけに"],["academic prose"]],
[5,"Evaluation & Criticism","評価・批判",["に足る","に値する","かねる"],["reviews","criticism"]],
[6,"Emotional Nuance","感情のニュアンス",["あまり","ばかりに","てならない"],["emotion","narrative"]],
[7,"Obligation & Prohibition","義務・禁止",["べからず","べきだ","ないではすまない"],["rules","formal notices"]],
[8,"Probability & Certainty","確率・確信",["に違いない","に決まっている","まい"],["argument"]],
[9,"Contrastive Logic","対比論理",["一方だ","反面","かたわら"],["essays"]],
[10,"Temporal & Sequential Nuance","時間関係",["が早いか","や否や","そばから"],["narrative"]],
[11,"Idiomatic Grammar","慣用文法",["あっての","ことなしに","ずにはおかない"],["formal idioms"]],
[12,"Academic Reading","学術読解",["definition","classification","evidence"],["academic texts"]],
[13,"Editorial Reading","社説読解",["stance","rhetoric","counterclaim"],["editorials"]],
[14,"Literary Reading","文学読解",["narrative voice","implicit meaning"],["literature"]],
[15,"Business & Policy Japanese","ビジネス・政策日本語",["formal requests","policy language"],["business","government"]],
[16,"Advanced Vocabulary & Collocations","高度語彙・連語",["collocations","idioms","register"],["advanced vocabulary"]],
[17,"Kanji & Sino-Japanese Formation","漢語形成",["morphemes","compound meaning"],["advanced kanji"]],
[18,"Listening: Abstract Topics","抽象テーマ聴解",["stance","implicit intention"],["lectures","debates"]],
[19,"Integrated N1 Review","N1総復習",["mixed advanced patterns"],["all sections"]],
[20,"N1 Mock Readiness","N1実戦準備",["timed full sets","error analysis"],["all exam sections"]]
]
};

const makeAdvanced = (level) => advanced[level].map((x)=>makeModule(`${level}-M${x[0]}`,level,x[1],x[2],`${level} · ${x[1]}`,x[3],x[4],`Build ${level} competence through original notes, drills and exam-style practice.`));

export const JLPT_CURRICULUM = {
  N5: { title:"JLPT N5", source:"Minna no Nihongo Book 1-1 alignment (Lessons 1–12)", modules:n5, exam:{sections:["Vocabulary/Grammar","Reading","Listening"], quizPolicy:"Original questions aligned to lesson objectives."}},
  N4: { title:"JLPT N4", source:"Minna no Nihongo Book 1-2 alignment (Lessons 13–25)", modules:n4, exam:{sections:["Language Knowledge","Reading","Listening"], quizPolicy:"Original questions aligned to lesson objectives."}},
  N3: { title:"JLPT N3", source:"NihongoVertex advanced bridge using N4 foundations + JLPT skill domains", modules:makeAdvanced("N3"), exam:{sections:["Language Knowledge","Reading","Listening"], quizPolicy:"Original N3-style practice."}},
  N2: { title:"JLPT N2", source:"NihongoVertex advanced curriculum using N3 foundations + JLPT skill domains", modules:makeAdvanced("N2"), exam:{sections:["Language Knowledge + Reading","Listening"], quizPolicy:"Original N2-style practice."}},
  N1: { title:"JLPT N1", source:"NihongoVertex advanced curriculum using N2 foundations + JLPT skill domains", modules:makeAdvanced("N1"), exam:{sections:["Language Knowledge + Reading","Listening"], quizPolicy:"Original N1-style practice."}}
};

export const CURRICULUM_STATS = Object.fromEntries(Object.entries(JLPT_CURRICULUM).map(([level,data])=>[level,{modules:data.modules.length,lessons:data.modules.length,quizSets:data.modules.length,materials:data.modules.length*6}]));

export default JLPT_CURRICULUM;
