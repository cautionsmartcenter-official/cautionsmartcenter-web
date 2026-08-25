const fs = require('fs');
const analysis = JSON.parse(fs.readFileSync('readdy_analysis.json', 'utf8'));

console.log('=== HOME PAGE TEXTS ===');
const homeList = analysis['readdy_page-C7Q6OsRV.js'] || [];
const homeClean = homeList.filter(t => /[\uAC00-\uD7AF]/.test(t) || (t.length > 10 && !t.includes('__')));
console.log(homeClean.join('\n'));
