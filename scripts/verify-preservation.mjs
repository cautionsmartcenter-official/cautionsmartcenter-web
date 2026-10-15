import ts from 'typescript';
import {execFileSync} from 'node:child_process';
import {readFileSync, existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
const baseline='8b9ab6efc5d17a65a580afc3fc856f07cb9f51ce';
let checks=0;
const errors=[];
const original=path=>execFileSync('git',['show',`${baseline}:${path}`],{encoding:'utf8'});
// All original bytes in public/ (pictures, fonts, videos, models) must be identical.
const assets=JSON.parse(readFileSync('docs/asset-baseline.json','utf8'));
for(const [path,hash] of Object.entries(assets)) {
 checks++;
 if(!existsSync(path)||createHash('sha256').update(readFileSync(path)).digest('hex')!==hash) errors.push(`Changed asset: ${path}`);
}
const files=execFileSync('git',['ls-tree','-r','--name-only',baseline],{encoding:'utf8'}).trim().split('\n');
const protectedFiles=files.filter(path=>/^(api\/|src\/lib\/|src\/config\/|src\/contexts\/)/.test(path)||['tailwind.config.js','src/index.css','vercel.json','package-lock.json','package.json'].includes(path));
for(const path of protectedFiles){checks++;if(readFileSync(path,'utf8')!==original(path))errors.push(`Changed integration/config: ${path}`);}
// Visible JSX text and Korean/URL/image strings are retained, regardless of markup changes.
function copy(source,path){
 const tree=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const texts=new Set();
 function visit(node){
   if(ts.isJsxText(node)){const t=node.text.replace(/\s+/g,' ').trim();if(t)texts.add(t);}
   if(ts.isStringLiteral(node)&&(/[가-힣]/.test(node.text)||/^(https?:|tel:|mailto:|\/images\/|\/videos\/)/.test(node.text))){
     // Assistive labels may become more specific; presentation CSS isn't content.
     const attr=node.parent;
     if(!(ts.isJsxAttribute(attr)&&/^(className|aria-|title|alt)/.test(attr.name.getText(tree))))texts.add(node.text);
   }
   ts.forEachChild(node,visit);
 }
 visit(tree);return texts;
}
for(const path of files.filter(path=>/^src\/components\/.*\.tsx$/.test(path))){
 const before=copy(original(path),path),after=copy(readFileSync(path,'utf8'),path);
 for(const text of before){checks++;if(!after.has(text))errors.push(`Missing copy in ${path}: ${text}`);}
}
const app=readFileSync('src/App.tsx','utf8');
const home=['ReaddyHeroSlider','ReaddyServicesSection','ReaddyAiTechSection','ReaddyReviewsSection','ReaddyCtaSection','ReaddyLocationSection','ReaddyContactSection'];
let previous=-1;for(const name of home){checks++;const index=app.indexOf(`<${name}`);if(index<previous)errors.push(`Home order changed: ${name}`);previous=index;}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`PASS: ${checks} preservation checks; ${Object.keys(assets).length} original assets, ${protectedFiles.length} integration/config files, original copy and homepage section order.`);
