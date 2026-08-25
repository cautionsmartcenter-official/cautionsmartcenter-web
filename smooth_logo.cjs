const fs = require('fs');
const { PNG } = require('pngjs');

// High-quality smooth alpha extraction with anti-aliasing preservation
const inputPath = 'public/images/logos/caution_smart_center_logo.png';
const whiteOutPath = 'public/images/logos/caution_logo_white.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    let minX = this.width, minY = this.height, maxX = 0, maxY = 0;

    // 1. Find bounding box
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const brightness = Math.max(this.data[idx], this.data[idx + 1], this.data[idx + 2]);
        if (brightness > 25) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    // Add 2px margin for smooth anti-aliased edge
    minX = Math.max(0, minX - 2);
    minY = Math.max(0, minY - 2);
    maxX = Math.min(this.width - 1, maxX + 2);
    maxY = Math.min(this.height - 1, maxY + 2);

    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;

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

        // Smooth continuous alpha to preserve original anti-aliasing
        let alpha = 0;
        if (brightness > 15) {
          alpha = Math.min(255, Math.round(Math.pow(brightness / 255, 0.85) * 255));
        }

        croppedPng.data[destIdx] = 255;
        croppedPng.data[destIdx + 1] = 255;
        croppedPng.data[destIdx + 2] = 255;
        croppedPng.data[destIdx + 3] = alpha;
      }
    }

    croppedPng.pack().pipe(fs.createWriteStream(whiteOutPath)).on('finish', () => {
      console.log('Saved ultra-smooth anti-aliased white logo:', whiteOutPath);
    });
  });
