const fs = require('fs');

function beautifyMini(code) {
  let res = '';
  let indent = 0;
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (ch === '{' || ch === '[') {
      indent++;
      res += ch + '\n' + '  '.repeat(indent);
    } else if (ch === '}' || ch === ']') {
      indent = Math.max(0, indent - 1);
      res += '\n' + '  '.repeat(indent) + ch;
    } else if (ch === ';') {
      res += ';\n' + '  '.repeat(indent);
    } else {
      res += ch;
    }
  }
  return res;
}

const files = [
  'readdy_page-C7Q6OsRV.js',
  'readdy_page-DwlcqPA5.js',
  'readdy_page-CLL6ubHe.js',
  'readdy_page-BJu8nNG7.js',
  'readdy_Footer-C-U-ezfE.js'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const raw = fs.readFileSync(f, 'utf8');
  fs.writeFileSync(f.replace('.js', '_formatted.js'), beautifyMini(raw), 'utf8');
  console.log('Formatted', f);
});
