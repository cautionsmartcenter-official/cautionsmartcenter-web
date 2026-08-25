const fs = require('fs');
const { PNG } = require('pngjs');

function processWhiteBgAccurate(inputPath, outputPath) {
  fs.createReadStream(inputPath)
    .pipe(new PNG({ filterType: 4 }))
    .on('parsed', function() {
      let minX = this.width, minY = this.height, maxX = 0, maxY = 0;
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;
          const r = this.data[idx], g = this.data[idx+1], b = this.data[idx+2];
          // If pixel is sufficiently dark (i.e. black text)
          if (r < 180 && g < 180 && b < 180) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      minX = Math.max(0, minX - 1);
      minY = Math.max(0, minY - 1);
      maxX = Math.min(this.width - 1, maxX + 1);
      maxY = Math.min(this.height - 1, maxY + 1);

      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;
      console.log('Accurate Black Logo Bounding Box:', { minX, minY, maxX, maxY, cropW, cropH });

      const outPng = new PNG({ width: cropW, height: cropH });

      for (let y = 0; y < cropH; y++) {
        for (let x = 0; x < cropW; x++) {
          const srcIdx = (this.width * (minY + y) + (minX + x)) << 2;
          const destIdx = (cropW * y + x) << 2;

          const r = this.data[srcIdx];
          const g = this.data[srcIdx + 1];
          const b = this.data[srcIdx + 2];
          const darkness = 255 - Math.max(r, g, b);

          let alpha = 0;
          if (darkness > 25) {
            alpha = Math.min(255, Math.round(Math.pow(darkness / 255, 0.8) * 255));
          }

          outPng.data[destIdx] = 17;
          outPng.data[destIdx + 1] = 24;
          outPng.data[destIdx + 2] = 39;
          outPng.data[destIdx + 3] = alpha;
        }
      }

      outPng.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
        console.log('Saved Accurate Crisp Black Logo ->', outputPath);
      });
    });
}

const dir = 'C:/Users/socce/.gemini/antigravity-ide/brain/fb82cd16-b9c2-464b-a643-2beca7af0952/.user_uploaded/';
processWhiteBgAccurate(dir + 'media_1787627005982.png', 'public/images/logos/caution_logo_black.png');
