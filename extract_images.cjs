const fs = require('fs');

const files = [
  'readdy_page-C7Q6OsRV.js',
  'readdy_page-DwlcqPA5.js',
  'readdy_page-CLL6ubHe.js',
  'readdy_page-BJu8nNG7.js',
  'readdy_Footer-C-U-ezfE.js',
  'readdy_index.js',
  'chunk-EVOBXE3Y-ZbIjXw_o.js'
];

const results = {};

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  
  // Find image urls (jpg, png, webp, svg, unsplash, readdy, etc.)
  const imgUrls = content.match(/https?:\/\/[^\s"'`)]+\.(?:jpg|jpeg|png|webp|svg|gif)[^\s"'`)]*|https?:\/\/images\.unsplash\.com\/[^\s"'`)]+|https?:\/\/static\.readdy\.ai\/[^\s"'`)]+/gi) || [];
  
  // Also look for relative asset paths
  const relativeImgs = content.match(/["'](\/?assets\/[^"']+\.(?:png|jpg|jpeg|webp|svg))["']/gi) || [];

  results[file] = {
    urls: Array.from(new Set(imgUrls)),
    relative: Array.from(new Set(relativeImgs))
  };
});

fs.writeFileSync('extracted_images.json', JSON.stringify(results, null, 2), 'utf8');
console.log('Images extracted:');
for (const [f, d] of Object.entries(results)) {
  console.log(`${f}: ${d.urls.length} remote URLs, ${d.relative.length} relative assets`);
  if (d.urls.length > 0) console.log('  Sample URLs:', d.urls.slice(0, 5));
}
