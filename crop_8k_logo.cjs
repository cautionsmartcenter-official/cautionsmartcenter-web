const fs = require('fs');
const { PNG } = require('pngjs');

// Crop the 8000x1452 ultra-high-resolution official master logo perfectly
fs.createReadStream('public/images/logos/readdy_logo.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    let minX = this.width, minY = this.height, maxX = 0, maxY = 0;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        if (this.data[idx + 3] > 15) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;

    console.log(`Cropping 8K Master Logo: ${cropWidth}x${cropHeight} from (${minX},${minY})`);

    const croppedPng = new PNG({ width: cropWidth, height: cropHeight });

    for (let y = 0; y < cropHeight; y++) {
      for (let x = 0; x < cropWidth; x++) {
        const srcIdx = (this.width * (minY + y) + (minX + x)) << 2;
        const destIdx = (cropWidth * y + x) << 2;

        croppedPng.data[destIdx] = this.data[srcIdx];
        croppedPng.data[destIdx + 1] = this.data[srcIdx + 1];
        croppedPng.data[destIdx + 2] = this.data[srcIdx + 2];
        croppedPng.data[destIdx + 3] = this.data[srcIdx + 3];
      }
    }

    const outPath = 'public/images/logos/caution_logo_master_crisp.png';
    croppedPng.pack().pipe(fs.createWriteStream(outPath)).on('finish', () => {
      console.log('Saved 8K Ultra-Crisp Master Logo:', outPath);
    });
  });
