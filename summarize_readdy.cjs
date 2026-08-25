const fs = require('fs');
const analysis = JSON.parse(fs.readFileSync('readdy_analysis.json', 'utf8'));

for (const [file, list] of Object.entries(analysis)) {
  console.log(`\n================== ${file} ==================`);
  // Filter for Korean or significant English text
  const clean = list.filter(t => /[\uAC00-\uD7AF]/.test(t) || (t.length > 15 && !t.includes('__') && !t.includes('(')));
  console.log(clean.slice(0, 50).join('\n---\n'));
}
