const fs = require('fs');
const content = fs.readFileSync('readdy_page-C7Q6OsRV.js', 'utf8');

// Search for img or src or background or static
const matches = content.match(/src:([a-zA-Z0-9_$]+)|image:([a-zA-Z0-9_$]+)|img/gi) || [];
console.log('Matches count:', matches.length);

// Look for string literals that might be base64 or encoded urls or objects
const strings = content.match(/["'`]([^"'`]{10,500})["'`]/g) || [];
console.log('Total strings:', strings.length);

const imageRelated = strings.filter(s => /image|img|photo|picture|static|readdy|blob|\.png|\.jpg|\.webp|svg/i.test(s));
console.log('Image related strings (first 30):', imageRelated.slice(0, 30));

// Also let's inspect the entire file for any variables
console.log('File size:', content.length);
fs.writeFileSync('readdy_page_home_dump.txt', content, 'utf8');
