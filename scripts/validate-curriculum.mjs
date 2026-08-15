import { JLPT_CURRICULUM } from '../src/data/curriculum.js';
const expected={N5:12,N4:25,N3:20,N2:20,N1:20};
let ok=true;
console.log('==================================================');
console.log('NIHONGOVERTEX CURRICULUM VALIDATION');
console.log('==================================================');
for(const [level,count] of Object.entries(expected)){
  const mods=JLPT_CURRICULUM[level]?.modules||[];
  const ids=new Set(mods.map(m=>m.id));
  const complete=mods.filter(m=>m.title&&m.jp&&m.ta&&m.objective&&m.grammar?.length&&m.vocabThemes?.length&&m.skills?.length&&m.materials?.length&&m.quizTypes?.length).length;
  const pass=mods.length===count&&ids.size===mods.length&&complete===mods.length;
  ok=ok&&pass;
  console.log(`${level}: modules=${mods.length} unique=${ids.size} structured=${complete} ${pass?'PASS':'FAIL'}`);
}
console.log(`STATUS: ${ok?'PASS':'FAIL'}`);
process.exit(ok?0:1);
