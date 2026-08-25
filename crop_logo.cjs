const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'public/images/logos/caution_smart_center_logo.png';
const whiteOutPath = 'public/images/logos/caution_logo_white.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    let minX = this.width, minY = this.height, maxX = 0, maxY = 0;

    // 1. Find bounding box of actual white text/logo
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const brightness = Math.max(this.data[idx], this.data[idx + 1], this.data[idx + 2]);
        if (brightness > 40) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    console.log('Bounding Box:', { minX, minY, maxX, maxY });
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;

    // 2. Create cropped transparent PNG
    const croppedPng = new PNG({ width: cropWidth, height: cropHeight });

    for (let y = 0; y < cropHeight; y++) {
      for (let x = 0; x < cropWidth; x++) {
        const srcX = minX + x;
        const srcY = minY + y;
        const srcIdx = (this.width * srcY + srcX) << 2;
        const destIdx = (cropWidth * y + x) << 2;

        const r = this.data[srcIdx];
        const g = this.data[srcIdx + 1];
        const b = this.data[srcIdx + 2];
        const brightness = Math.max(r, g, b);

        const alpha = brightness < 30 ? 0 : brightness;

        croppedPng.data[destIdx] = 255;
        croppedPng.data[destIdx + 1] = 255;
        croppedPng.data[destIdx + 2] = 255;
        croppedPng.data[destIdx + 3] = alpha;
      }
    }

    croppedPng.pack().pipe(fs.createWriteStream(whiteOutPath)).on('finish', () => {
      console.log('Successfully cropped and saved crisp white logo to', whiteOutPath);
      console.log(`Dimensions: ${cropWidth}x${cropHeight}`);
    });
  });
