const fs = require('fs');

const files = [
  'readdy_page-C7Q6OsRV.js',
  'readdy_page-DwlcqPA5.js',
  'readdy_page-CLL6ubHe.js',
  'readdy_page-BJu8nNG7.js',
  'readdy_Footer-C-U-ezfE.js'
];

const analysis = {};

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  // Extract all text strings
  const strings = [];
  const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const s = (m[1] || m[2] || m[3] || '').trim();
    if (s.length > 2 && !s.startsWith('http') && !s.includes('class') && !s.includes('px') && !s.includes('svg')) {
      strings.push(s);
    }
  }
  analysis[file] = strings;
});

fs.writeFileSync('readdy_analysis.json', JSON.stringify(analysis, null, 2), 'utf8');
console.log('Analysis saved to readdy_analysis.json');
