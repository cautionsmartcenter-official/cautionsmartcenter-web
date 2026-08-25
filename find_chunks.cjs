const fs = require('fs');
const code = fs.readFileSync('readdy_index.js', 'utf8');

const matches = code.match(/assets\/[a-zA-Z0-9_-]+\.js/g) || [];
console.log('Asset JS matches:', Array.from(new Set(matches)));

// Search for any strings
console.log('Sample from code (first 500 chars):', code.slice(0, 500));
