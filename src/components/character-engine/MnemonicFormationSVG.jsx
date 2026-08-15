import React, { useEffect, useMemo, useState } from 'react';
import { getMnemonicScene } from '../../data/completeMnemonicScenes.js';

const phaseNames = ['Object drawing', 'Feature', 'Same line → ink', 'Stroke order'];
function drawStyle(delay = 0, duration = 800) {
  return { strokeDasharray: 520, strokeDashoffset: 520, animation: `nvMnemonicDraw ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms forwards` };
}
function ScenePath({ d, delay=0, duration=800, stroke='currentColor', width=3.4, opacity=1, style={}, ...props }) {
  return <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} style={{...drawStyle(delay,duration),...style}} {...props}/>;
}

export default function MnemonicFormationSVG({ characterData, autoPlay=true }) {
  const scene = useMemo(()=>getMnemonicScene(characterData?.character),[characterData?.character]);
  const [stage,setStage]=useState(autoPlay?0:4);
  const [playing,setPlaying]=useState(autoPlay);
  useEffect(()=>{
    if(!scene) return;
    if(!autoPlay){setStage(4);setPlaying(false);return;}
    setStage(0);setPlaying(true);
    const timers=[setTimeout(()=>setStage(1),1000),setTimeout(()=>setStage(2),1800),setTimeout(()=>setStage(3),3000),setTimeout(()=>{setStage(4);setPlaying(false)},Math.max(5000,scene.animationSteps?.reduce((n,x)=>n+(x.duration||800),0)||5000))];
    return()=>timers.forEach(clearTimeout);
  },[scene?.character,autoPlay]);
  const replay=()=>{if(!scene||playing)return;setStage(0);setPlaying(true);setTimeout(()=>setStage(1),1000);setTimeout(()=>setStage(2),1800);setTimeout(()=>setStage(3),3000);setTimeout(()=>{setStage(4);setPlaying(false)},Math.max(5000,scene.animationSteps?.reduce((n,x)=>n+(x.duration||800),0)||5000));};
  if(!characterData)return null;
  if(!scene)return <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center"><div className="text-xs font-bold uppercase tracking-widest text-amber-700">Mnemonic formation</div><div className="mt-2 text-sm font-semibold text-amber-900">Animation artwork pending</div></div>;
  const feature=scene.featurePaths?.[0]||scene.objectPaths?.[0];
  const transform=scene.transformationPaths?.[0]||'';
  const connected=`${feature||''} ${transform.replace(/^M/,'L')}`;
  return <div className="rounded-2xl border border-stone-200 bg-stone-50/80 p-4 space-y-3">
    <div className="flex items-center justify-between gap-3"><div><div className="text-[10px] uppercase tracking-widest font-bold text-red-700">Mnemonic → SVG formation</div><div className="text-sm font-bold text-stone-900">{scene.mnemonicObject} → {scene.character}</div><div className="text-[11px] text-stone-500 mt-0.5">{scene.objectDescription}</div></div><button onClick={replay} disabled={playing} className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-semibold disabled:opacity-50">{playing?'Drawing…':'Replay drawing'}</button></div>
    <svg key={scene.character} viewBox="0 0 220 120" className="w-full h-52 rounded-xl bg-white border border-stone-200">
      <defs><filter id={`mnemonicGlow-${scene.character}`}><feGaussianBlur stdDeviation="1.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter><style>{`@keyframes nvMnemonicDraw{to{stroke-dashoffset:0}} @keyframes nvFeaturePulse{0%,100%{opacity:.65}50%{opacity:1}}`}</style></defs>
      <g opacity={stage>=4?.16:1}>{scene.objectPaths?.map((d,i)=><ScenePath key={`o-${i}`} d={d} stroke="#292524" width={3.3} delay={i*70} duration={650}/>)}</g>
      {stage>=1&&stage<4&&feature&&<ScenePath d={feature} stroke="#dc2626" width={5} duration={650} filter={`url(#mnemonicGlow-${scene.character})`} style={{animation:'nvFeaturePulse 900ms ease-in-out infinite'}}/>}
      {stage>=2&&stage<4&&connected&&<ScenePath d={connected} stroke="#dc2626" width={4.5} duration={1100} filter={`url(#mnemonicGlow-${scene.character})`}/>} 
      {stage>=3&&<g>{scene.strokePaths?.map((s,i)=><ScenePath key={`s-${s.number||i}`} d={s.path} stroke={i===0?'#dc2626':'#1c1917'} width={4.9} delay={i*(scene.timing?.strokeGap||110)} duration={s.duration||600}/>)}</g>}
      {stage>=3&&stage<4&&<text x="108" y="112" textAnchor="middle" fontSize="8" fontWeight="700" fill="#78716c">stroke-by-stroke formation</text>}
    </svg>
    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">{phaseNames.map((name,i)=><div key={name} className={`rounded-lg px-2 py-1.5 border ${stage>=i+1?'bg-white border-red-200 text-red-700':'bg-stone-100 border-stone-200 text-stone-400'}`}>{i+1}. {name}</div>)}</div>
    <div className="text-xs text-stone-600"><b>{scene.mnemonicObject}</b> — the object is drawn first; its highlighted feature stays connected to the red ink path, then the Japanese character is formed stroke-by-stroke.</div>
    {scene.sceneKind==='kanji'&&!scene.strokeVerified&&<div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">Mnemonic artwork is implemented. Verified Japanese stroke-order data is still pending for this Kanji entry.</div>}
  </div>;
}
