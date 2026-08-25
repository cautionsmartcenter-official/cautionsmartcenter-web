const fs = require('fs');
const { PNG } = require('pngjs');

const inputPath = 'public/images/logos/caution_smart_center_logo.png';
const whiteOutPath = 'public/images/logos/caution_logo_white.png';
const blackOutPath = 'public/images/logos/caution_logo_black.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    // 1. Create White Transparent Logo
    const whitePng = new PNG({ width: this.width, height: this.height });
    const blackPng = new PNG({ width: this.width, height: this.height });

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const srcAlpha = this.data[idx + 3];

        // Calculate brightness
        const brightness = Math.max(r, g, b);

        // If very dark, make transparent
        const alpha = brightness < 30 ? 0 : Math.min(255, Math.round((brightness / 255) * 255 * (srcAlpha / 255)));

        // White logo
        whitePng.data[idx] = 255;
        whitePng.data[idx + 1] = 255;
        whitePng.data[idx + 2] = 255;
        whitePng.data[idx + 3] = alpha;

        // Black logo
        blackPng.data[idx] = 17;
        blackPng.data[idx + 1] = 24;
        blackPng.data[idx + 2] = 39;
        blackPng.data[idx + 3] = alpha;
      }
    }

    whitePng.pack().pipe(fs.createWriteStream(whiteOutPath)).on('finish', () => {
      console.log('Saved', whiteOutPath);
    });

    blackPng.pack().pipe(fs.createWriteStream(blackOutPath)).on('finish', () => {
      console.log('Saved', blackOutPath);
    });
  });
