import React, { useEffect, useState } from "react";
import { Sparkles, Play, RotateCcw, Volume2 } from "lucide-react";
import KanjiMnemonicFormationSVG from "./KanjiMnemonicFormationSVG.jsx";
import MnemonicFormationSVG from "./MnemonicFormationSVG.jsx";

export default function MnemonicViewer({characterData,onPlayStrokeAnimation,onSpeak,className=""}){
  const [playing,setPlaying]=useState(false);
  const [stage,setStage]=useState(0);
  const isKanji=characterData?.type==="kanji";
  const m=characterData?.mnemonic||{};
  useEffect(()=>{setPlaying(false);setStage(0)},[characterData?.character]);
  if(!characterData) return null;
  const play=()=>{setPlaying(false);setTimeout(()=>setPlaying(true),20);setStage(1)};
  return <div className={`bg-gradient-to-br from-red-50/70 via-white to-amber-50/60 border border-red-100 rounded-2xl p-6 shadow-sm ${className}`}>
    <div className="flex items-center justify-between gap-3 mb-5 border-b border-red-100/80 pb-4">
      <div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center"><Sparkles size={18}/></div><div><h3 className="font-bold text-stone-900 text-base">{isKanji?"Kanji Object → SVG Formation":"Visual Mnemonic Transformation"}</h3><p className="text-xs text-stone-500">Draw the memory object, extract its feature, then form the character.</p></div></div>
      <div className="flex gap-2"><button onClick={()=>{setPlaying(false);setStage(0)}} className="p-2 rounded-xl border border-stone-200 bg-white text-stone-600"><RotateCcw size={15}/></button><button onClick={play} className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold"><Play size={13}/> Animate Formation</button></div>
    </div>
    {isKanji ? <KanjiMnemonicFormationSVG characterData={characterData} playing={playing}/> : <MnemonicFormationSVG characterData={characterData} autoPlay={playing}/>}
    <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
      {[['1','Object'],['2','Feature'],['3','SVG Ink'],['4',isKanji?'Kanji':'Character']].map(([n,l])=><div key={n} className="rounded-xl border border-stone-200 bg-white p-3"><div className="text-[10px] uppercase tracking-widest text-stone-400">{n}</div><div className="text-xs font-bold text-stone-800 mt-1">{l}</div></div>)}
    </div>
    <div className="mt-4 bg-white border border-stone-200 rounded-xl p-4"><div className="text-sm font-semibold text-stone-900">{m.title||characterData.meaning}</div><p className="text-xs text-stone-600 mt-1 leading-relaxed">{m.story||m.concept||`Use ${characterData.character} as a visual memory cue for ${characterData.meaning}.`}</p><div className="mt-2 text-[11px] font-medium text-red-700 bg-red-50 px-2.5 py-1 rounded-lg inline-block">Meaning: {characterData.meaning} · Reading: {(characterData.readingsHiragana?.onyomi||[]).join(' / ')}</div></div>
    <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-red-100/80"><div className="flex items-center gap-2 text-xs text-stone-500">Pronunciation <span className="font-semibold text-stone-900">{characterData.pronunciation||characterData.romaji||characterData.readingsHiragana?.onyomi?.[0]}</span><button onClick={()=>onSpeak&&onSpeak(characterData.character)} className="text-red-700 p-1"><Volume2 size={15}/></button></div><button onClick={()=>onPlayStrokeAnimation&&onPlayStrokeAnimation()} className="inline-flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-semibold"><Play size={13}/> Play SVG Formation / Stroke View</button></div>
    {isKanji && characterData.strokeDataMode!=="verified-stroke-order" && <div className="mt-3 text-[10px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">SVG formation is used for this Kanji entry. Replace with verified stroke-order data before labeling it as official calligraphy stroke order.</div>}
  </div>
}
