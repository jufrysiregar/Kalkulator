const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Calculator icon SVG — dark bg (#0e0f17) with blue accent (#5B8EFF)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Background -->
  <rect width="512" height="512" rx="100" fill="#0e0f17"/>
  <!-- Top gradient accent line -->
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#5B8EFF" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#7C5BFF" stop-opacity="0.8"/>
    </linearGradient>
  </defs>
  <rect x="80" y="80" width="352" height="352" rx="50" fill="none" stroke="url(#g1)" stroke-width="8"/>
  <!-- Display area -->
  <rect x="100" y="105" width="312" height="95" rx="18" fill="#13141f"/>
  <!-- Display number -->
  <text x="390" y="172" font-family="monospace" font-size="52" font-weight="300" fill="#f0f2ff" text-anchor="end">0</text>
  <!-- Button grid: row 1 -->
  <rect x="100" y="215" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="178" y="215" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="256" y="215" width="68" height="50" rx="14" fill="#2d3a6e"/>
  <rect x="334" y="215" width="68" height="50" rx="14" fill="#5B8EFF"/>
  <!-- Button grid: row 2 -->
  <rect x="100" y="275" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="178" y="275" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="256" y="275" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="334" y="275" width="68" height="50" rx="14" fill="#2d3a6e"/>
  <!-- Button grid: row 3 -->
  <rect x="100" y="335" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="178" y="335" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="256" y="335" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="334" y="335" width="68" height="50" rx="14" fill="#2d3a6e"/>
  <!-- Button grid: row 4 (0 wide + = blue) -->
  <rect x="100" y="395" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="178" y="395" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="256" y="395" width="68" height="50" rx="14" fill="#1c1e2a"/>
  <rect x="334" y="395" width="68" height="50" rx="14" fill="#5B8EFF"/>
  <!-- Labels row1 -->
  <text x="134" y="247" font-family="sans-serif" font-size="22" fill="#aaa" text-anchor="middle">AC</text>
  <text x="212" y="247" font-family="sans-serif" font-size="22" fill="#8aaeff" text-anchor="middle">%</text>
  <text x="290" y="247" font-family="sans-serif" font-size="26" fill="#8aaeff" text-anchor="middle">÷</text>
  <text x="368" y="249" font-family="sans-serif" font-size="26" fill="#fff" font-weight="600" text-anchor="middle">×</text>
  <!-- Labels row2 -->
  <text x="134" y="307" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">7</text>
  <text x="212" y="307" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">8</text>
  <text x="290" y="307" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">9</text>
  <text x="368" y="309" font-family="sans-serif" font-size="28" fill="#8aaeff" text-anchor="middle">−</text>
  <!-- Labels row3 -->
  <text x="134" y="367" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">4</text>
  <text x="212" y="367" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">5</text>
  <text x="290" y="367" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">6</text>
  <text x="368" y="369" font-family="sans-serif" font-size="28" fill="#8aaeff" text-anchor="middle">+</text>
  <!-- Labels row4 -->
  <text x="134" y="427" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">1</text>
  <text x="212" y="427" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">0</text>
  <text x="290" y="427" font-family="sans-serif" font-size="22" fill="#f0f2ff" text-anchor="middle">.</text>
  <text x="368" y="429" font-family="sans-serif" font-size="22" fill="#fff" font-weight="600" text-anchor="middle">=</text>
</svg>`;

const sizes = [
  { name: 'mipmap-mdpi',    size: 48  },
  { name: 'mipmap-hdpi',    size: 72  },
  { name: 'mipmap-xhdpi',   size: 96  },
  { name: 'mipmap-xxhdpi',  size: 144 },
  { name: 'mipmap-xxxhdpi', size: 192 },
];

const baseDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

async function generate() {
  for (const { name, size } of sizes) {
    const dir = path.join(baseDir, name);
    fs.mkdirSync(dir, { recursive: true });

    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(dir, 'ic_launcher.png'));

    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(path.join(dir, 'ic_launcher_round.png'));

    console.log(`Generated ${name}/ic_launcher.png (${size}x${size})`);
  }
  console.log('All icons generated!');
}

generate().catch(console.error);
