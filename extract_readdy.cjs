const fs = require('fs');
let code = fs.readFileSync('readdy_index.js', 'utf8');

// Unescape unicode \uXXXX
const unescaped = code.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
  return String.fromCharCode(parseInt(grp, 16));
});

const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`/g;
let m;
const sentences = new Set();
while ((m = regex.exec(unescaped)) !== null) {
  const str = m[1] || m[2] || m[3] || '';
  if (/[\uAC00-\uD7AF]/.test(str) && str.length > 2 && str.length < 500) {
    sentences.add(str.trim());
  }
}
fs.writeFileSync('readdy_sentences.json', JSON.stringify(Array.from(sentences), null, 2), 'utf8');
console.log('Extracted', sentences.size, 'strings from unescaped code');
