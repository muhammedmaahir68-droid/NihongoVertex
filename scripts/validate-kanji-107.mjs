import fs from "fs";
const file="src/data/characters/kanji.js";
const text=fs.readFileSync(file,"utf8");
const chars=[...text.matchAll(/"character": "([一-龯々〆〇])"/g)].map(m=>m[1]);
const unique=new Set(chars);
console.log(`KANJI entries: ${chars.length}`);
console.log(`Unique Kanji: ${unique.size}`);
if(chars.length!==107||unique.size!==107) process.exit(1);
console.log("PASS: exactly 107 unique Kanji entries.");
