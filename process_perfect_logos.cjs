const fs = require('fs');
const { PNG } = require('pngjs');

// 1. Process Black Logo from Transparent PNG (media_1787627005982.png)
fs.createReadStream('C:/Users/socce/.gemini/antigravity-ide/brain/fb82cd16-b9c2-464b-a643-2beca7af0952/.user_uploaded/media_1787627005982.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    let minX = this.width, minY = this.height, maxX = 0, maxY = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const a = this.data[idx + 3];
        if (a > 15) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;
    console.log('Black Logo (already transparent) Bounding Box:', { minX, minY, maxX, maxY, cropW, cropH });

    const outPng = new PNG({ width: cropW, height: cropH });

    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const srcIdx = (this.width * (minY + y) + (minX + x)) << 2;
        const destIdx = (cropW * y + x) << 2;

        outPng.data[destIdx] = this.data[srcIdx];
        outPng.data[destIdx + 1] = this.data[srcIdx + 1];
        outPng.data[destIdx + 2] = this.data[srcIdx + 2];
        outPng.data[destIdx + 3] = this.data[srcIdx + 3];
      }
    }

    outPng.pack().pipe(fs.createWriteStream('public/images/logos/caution_logo_black.png')).on('finish', () => {
      console.log('Saved High-Res Black Logo (Tight Cropped)');
    });
  });

// 2. Also produce White Logo directly by inverting the pure RGB from the transparent high-res PNG!
fs.createReadStream('C:/Users/socce/.gemini/antigravity-ide/brain/fb82cd16-b9c2-464b-a643-2beca7af0952/.user_uploaded/media_1787627005982.png')
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    let minX = this.width, minY = this.height, maxX = 0, maxY = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const a = this.data[idx + 3];
        if (a > 15) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;

    const outWhitePng = new PNG({ width: cropW, height: cropH });

    for (let y = 0; y < cropH; y++) {
      for (let x = 0; x < cropW; x++) {
        const srcIdx = (this.width * (minY + y) + (minX + x)) << 2;
        const destIdx = (cropW * y + x) << 2;

        const a = this.data[srcIdx + 3];
        outWhitePng.data[destIdx] = 255;
        outWhitePng.data[destIdx + 1] = 255;
        outWhitePng.data[destIdx + 2] = 255;
        outWhitePng.data[destIdx + 3] = a;
      }
    }

    outWhitePng.pack().pipe(fs.createWriteStream('public/images/logos/caution_logo_white.png')).on('finish', () => {
      console.log('Saved High-Res White Logo with Pure Alpha Transparency!');
    });
  });
