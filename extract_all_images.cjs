const fs = require('fs');

const files = [
  'readdy_page-C7Q6OsRV.js',
  'readdy_page-DwlcqPA5.js',
  'readdy_page-CLL6ubHe.js',
  'readdy_page-BJu8nNG7.js',
  'readdy_Footer-C-U-ezfE.js'
];

const allImageUrls = [];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/https:\/\/readdy\.ai\/api\/search-image\?[^"'`\s]+/g) || [];
  matches.forEach(m => {
    allImageUrls.push({
      file,
      url: m.replace(/&amp;/g, '&')
    });
  });
});

console.log('Total search-image URLs found:', allImageUrls.length);
fs.writeFileSync('all_readdy_images.json', JSON.stringify(allImageUrls, null, 2), 'utf8');

// Also print them out clearly
allImageUrls.forEach((item, idx) => {
  const urlObj = new URL(item.url);
  const query = urlObj.searchParams.get('query');
  const seq = urlObj.searchParams.get('seq');
  console.log(`[${idx + 1}] (${item.file}) seq: ${seq} => ${query.slice(0, 70)}...`);
});
