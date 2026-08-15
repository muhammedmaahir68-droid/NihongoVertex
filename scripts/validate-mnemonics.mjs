import { BASIC_HIRAGANA_SCENES, BASIC_HIRAGANA_REQUIRED } from '../src/data/basicHiraganaMnemonicScenes.js';

const scenes = Object.values(BASIC_HIRAGANA_SCENES);
const required = new Set(BASIC_HIRAGANA_REQUIRED);
const fallbackNames = new Set(['default','generic','placeholder']);
const has = (v) => Array.isArray(v) ? v.length > 0 : Boolean(v);
const signatures = scenes.map(s => JSON.stringify(s.objectPaths));
const duplicates = signatures.filter((x,i,a) => a.indexOf(x) !== i);
const missing = BASIC_HIRAGANA_REQUIRED.filter(c => !BASIC_HIRAGANA_SCENES[c]);
const badStatus = scenes.filter(s => s.status === 'complete' && (!has(s.objectPaths) || !has(s.featurePaths) || !has(s.transformationPaths) || !has(s.characterPaths) || !has(s.strokePaths) || !s.strokeVerified));
const fallback = scenes.filter(s => fallbackNames.has(String(s.mnemonicObject).toLowerCase()));
const wrongCount = scenes.length !== 46 || required.size !== 46;

console.log('='.repeat(50));
console.log('BASIC HIRAGANA MNEMONIC VALIDATION');
console.log('='.repeat(50));
console.log(`Required characters:       ${required.size}`);
console.log(`Scene records:             ${scenes.length}`);
console.log(`Bespoke object artwork:    ${scenes.filter(s=>has(s.objectPaths)).length}`);
console.log(`Feature definitions:       ${scenes.filter(s=>has(s.featurePaths)).length}`);
console.log(`Transformations:           ${scenes.filter(s=>has(s.transformationPaths)).length}`);
console.log(`Character artwork:         ${scenes.filter(s=>has(s.characterPaths)).length}`);
console.log(`Stroke data:               ${scenes.filter(s=>has(s.strokePaths)).length}`);
console.log(`Verified stroke data:      ${scenes.filter(s=>s.strokeVerified).length}`);
console.log(`Missing scenes:             ${missing.length}`);
console.log(`Fallback scenes:            ${fallback.length}`);
console.log(`Duplicate artwork:          ${duplicates.length}`);
console.log(`Status inconsistencies:     ${badStatus.length}`);
console.log(`STATUS: ${wrongCount || missing.length || fallback.length || duplicates.length || badStatus.length ? 'FAIL' : 'PASS'}`);
console.log('='.repeat(50));

if (wrongCount || missing.length || fallback.length || duplicates.length || badStatus.length) process.exit(1);
