import React from 'react';
import MnemonicFormationSVG from './MnemonicFormationSVG.jsx';

export default function KanjiMnemonicFormationSVG({characterData, playing=true}) {
  return <MnemonicFormationSVG characterData={characterData} autoPlay={playing}/>;
}
