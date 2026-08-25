const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const allImages = JSON.parse(fs.readFileSync('all_readdy_images.json', 'utf8'));

const outDir = path.join(__dirname, 'public', 'images', 'readdy');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    
    function makeRequest(currentUrl) {
      const client = currentUrl.startsWith('https') ? https : http;
      client.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        // Follow redirect (301, 302, 307, 308)
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return makeRequest(res.headers.location);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(destPath);
          return reject(new Error(`Failed with status ${res.statusCode} for ${currentUrl}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        reject(err);
      });
    }

    makeRequest(url);
  });
}

async function downloadAll() {
  const map = {};
  const seenSeqs = new Set();

  for (let i = 0; i < allImages.length; i++) {
    const item = allImages[i];
    const urlObj = new URL(item.url);
    const seq = urlObj.searchParams.get('seq') || `img-${i}`;
    
    if (seenSeqs.has(seq)) {
      continue;
    }
    seenSeqs.add(seq);

    const filename = `${seq}.jpg`;
    const destPath = path.join(outDir, filename);
    
    console.log(`[${i + 1}/${allImages.length}] Downloading ${seq} -> ${filename}...`);
    try {
      await downloadImage(item.url, destPath);
      const stat = fs.statSync(destPath);
      console.log(`   Saved ${filename} (${Math.round(stat.size / 1024)} KB)`);
      map[seq] = {
        filename,
        localPath: `/images/readdy/${filename}`,
        originalUrl: item.url,
        query: urlObj.searchParams.get('query')
      };
    } catch (e) {
      console.error(`   Error downloading ${seq}:`, e.message);
    }
  }

  fs.writeFileSync('readdy_images_map.json', JSON.stringify(map, null, 2), 'utf8');
  console.log('\nAll images downloaded successfully! Map saved to readdy_images_map.json');
}

downloadAll();
