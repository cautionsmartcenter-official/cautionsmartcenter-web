const fs = require('fs');
const code = fs.readFileSync('readdy_index.js', 'utf8');

// Find all words or patterns of interest
const words = code.match(/["']([^"']{3,80})["']/g) || [];
console.log('Total string literals found:', words.length);

const interesting = words.filter(w => !w.includes('/') && !w.includes('px') && !w.includes('#') && w.length > 5);
console.log('Sample interesting strings (first 40):', interesting.slice(0, 40));

// Search for any sections
const sections = words.filter(w => /section|header|footer|nav|service|hero|about|contact|portfolio|pricing|faq|review|testimonial|step|feature/i.test(w));
console.log('Section related strings:', Array.from(new Set(sections)).slice(0, 30));
