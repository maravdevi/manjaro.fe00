import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIZE = 256;
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'actors');

function svgWrap(inner) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">` +
    `<defs>` +
    `<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">` +
    `<feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.25"/>` +
    `</filter>` +
    `</defs>` +
    inner +
    `</svg>`;
}

function actorSvg({ palette, hairPath, accessory, label }) {
  const skin = palette.skin;
  const hair = palette.hair;
  const suit = palette.suit;
  const accent = palette.accent;

  // Head + neck + body are basic shapes; we vary hair/accessories to create distinct assets.
  return svgWrap(`
  <g filter="url(#shadow)">
    <path d="M64 220 C85 175, 171 175, 192 220 L192 256 L64 256 Z" fill="${suit}"/>
    <path d="M112 160 L144 160 L152 196 C140 207, 116 207, 104 196 Z" fill="${skin}"/>

    <circle cx="128" cy="112" r="54" fill="${skin}"/>

    ${hairPath.replaceAll('${hair}', hair)}

    <circle cx="108" cy="110" r="6" fill="#111" opacity="0.85"/>
    <circle cx="148" cy="110" r="6" fill="#111" opacity="0.85"/>
    <path d="M110 138 C118 146, 138 146, 146 138" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" opacity="0.8"/>

    <path d="M92 92 C105 78, 118 78, 131 92" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" opacity="0.25"/>
    <path d="M125 92 C138 78, 151 78, 164 92" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" opacity="0.25"/>

    <path d="M128 116 C124 124, 124 130, 128 136" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round" opacity="0.3"/>

    <path d="M64 220 C85 205, 171 205, 192 220" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.65"/>

    ${accessory}
  </g>

  <text x="128" y="22" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="12" fill="#111" opacity="0.45">${label}</text>
`);
}

const variants = [
  {
    file: 'hollywood_1920s.png',
    label: '1920s',
    palette: { skin: '#F2C9A0', hair: '#1C1B1A', suit: '#1E2A44', accent: '#C7A14A' },
    hairPath:
      `<path d="M78 104 C84 66, 110 48, 128 48 C156 48, 178 70, 178 104 C170 90, 156 80, 128 80 C102 80, 88 90, 78 104 Z" fill="\${hair}"/>
       <path d="M94 88 C102 70, 116 64, 128 64 C144 64, 156 72, 162 88 C152 84, 142 84, 128 84 C112 84, 102 84, 94 88 Z" fill="#000" opacity="0.15"/>`,
    accessory:
      `<path d="M92 150 C105 160, 151 160, 164 150" fill="none" stroke="#111" stroke-width="7" stroke-linecap="round" opacity="0.6"/>`,
  },
  {
    file: 'hollywood_1930s.png',
    label: '1930s',
    palette: { skin: '#F0C6A3', hair: '#2A1B12', suit: '#2B2D42', accent: '#D90429' },
    hairPath:
      `<path d="M76 108 C78 70, 108 44, 128 44 C158 44, 182 70, 180 108 C166 92, 152 84, 128 84 C104 84, 90 92, 76 108 Z" fill="\${hair}"/>
       <path d="M82 106 C88 76, 112 62, 128 62 C150 62, 170 76, 174 106 C162 96, 150 92, 128 92 C106 92, 94 96, 82 106 Z" fill="#000" opacity="0.12"/>`,
    accessory:
      `<rect x="82" y="98" width="44" height="22" rx="10" fill="#111" opacity="0.12"/>
       <rect x="130" y="98" width="44" height="22" rx="10" fill="#111" opacity="0.12"/>
       <rect x="126" y="107" width="4" height="4" fill="#111" opacity="0.25"/>`,
  },
  {
    file: 'hollywood_1940s.png',
    label: '1940s',
    palette: { skin: '#F2CBB2', hair: '#0C0C0C', suit: '#1B4332', accent: '#FFD166' },
    hairPath:
      `<path d="M74 108 C74 70, 104 46, 128 46 C160 46, 184 72, 182 112 C170 94, 156 86, 128 86 C100 86, 86 94, 74 108 Z" fill="\${hair}"/>
       <path d="M98 74 C110 60, 146 60, 158 74 C146 70, 136 70, 128 70 C120 70, 110 70, 98 74 Z" fill="#fff" opacity="0.08"/>`,
    accessory:
      `<path d="M96 144 C110 154, 146 154, 160 144" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" opacity="0.5"/>`,
  },
  {
    file: 'hollywood_1950s.png',
    label: '1950s',
    palette: { skin: '#F6D0B3', hair: '#3A2A1F', suit: '#0B1320', accent: '#E09F3E' },
    hairPath:
      `<path d="M72 112 C72 70, 104 40, 130 40 C162 40, 188 72, 184 118 C170 96, 154 86, 128 86 C100 86, 84 96, 72 112 Z" fill="\${hair}"/>
       <path d="M90 88 C100 72, 116 64, 130 64 C148 64, 162 72, 168 88 C156 80, 142 78, 130 78 C116 78, 102 80, 90 88 Z" fill="#000" opacity="0.14"/>`,
    accessory:
      `<path d="M128 166 L106 186" stroke="#111" stroke-width="6" opacity="0.25"/>
       <path d="M128 166 L150 186" stroke="#111" stroke-width="6" opacity="0.25"/>
       <circle cx="128" cy="166" r="8" fill="#111" opacity="0.15"/>`,
  },
  {
    file: 'hollywood_1960s.png',
    label: '1960s',
    palette: { skin: '#F4C9A8', hair: '#1B263B', suit: '#3A0CA3', accent: '#F72585' },
    hairPath:
      `<path d="M74 114 C80 66, 110 44, 130 44 C162 44, 182 76, 180 114 C166 92, 152 86, 128 86 C104 86, 90 94, 74 114 Z" fill="\${hair}"/>
       <path d="M78 110 C86 86, 104 72, 128 72 C150 72, 168 84, 176 110 C162 98, 148 94, 128 94 C108 94, 92 100, 78 110 Z" fill="#fff" opacity="0.07"/>`,
    accessory:
      `<circle cx="92" cy="108" r="14" fill="none" stroke="#111" stroke-width="4" opacity="0.22"/>
       <circle cx="164" cy="108" r="14" fill="none" stroke="#111" stroke-width="4" opacity="0.22"/>
       <path d="M106 108 L150 108" stroke="#111" stroke-width="4" opacity="0.22"/>`,
  },
  {
    file: 'hollywood_1970s.png',
    label: '1970s',
    palette: { skin: '#F3C7A1', hair: '#5A3E2B', suit: '#1D3557', accent: '#2A9D8F' },
    hairPath:
      `<path d="M70 120 C72 70, 108 44, 128 44 C162 44, 190 76, 186 126 C170 100, 154 92, 128 92 C100 92, 84 104, 70 120 Z" fill="\${hair}"/>
       <path d="M76 120 C84 98, 98 86, 128 86 C154 86, 170 96, 180 120" fill="none" stroke="#000" stroke-width="10" opacity="0.10" stroke-linecap="round"/>`,
    accessory:
      `<path d="M100 146 C110 166, 146 166, 156 146" fill="none" stroke="#111" stroke-width="8" stroke-linecap="round" opacity="0.45"/>
       <path d="M112 156 C120 162, 136 162, 144 156" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" opacity="0.3"/>`,
  },
  {
    file: 'hollywood_1980s.png',
    label: '1980s',
    palette: { skin: '#F1C4A2', hair: '#111827', suit: '#14213D', accent: '#FCA311' },
    hairPath:
      `<path d="M74 110 C76 66, 108 40, 132 40 C164 40, 190 70, 184 120 C170 98, 156 90, 128 90 C100 90, 86 98, 74 110 Z" fill="\${hair}"/>
       <path d="M82 100 C90 76, 110 62, 132 62 C154 62, 172 76, 178 104 C166 92, 150 88, 132 88 C112 88, 96 92, 82 100 Z" fill="#fff" opacity="0.08"/>`,
    accessory:
      `<path d="M128 160 C112 160, 96 170, 92 182" fill="none" stroke="#111" stroke-width="5" opacity="0.25"/>
       <path d="M128 160 C144 160, 160 170, 164 182" fill="none" stroke="#111" stroke-width="5" opacity="0.25"/>
       <rect x="120" y="154" width="16" height="18" rx="4" fill="#111" opacity="0.12"/>`,
  },
  {
    file: 'hollywood_1990s.png',
    label: '1990s',
    palette: { skin: '#F3C9A9', hair: '#2B2D42', suit: '#4A4E69', accent: '#9A8C98' },
    hairPath:
      `<path d="M76 112 C78 72, 108 44, 128 44 C158 44, 182 70, 180 112 C168 94, 154 88, 128 88 C102 88, 88 96, 76 112 Z" fill="\${hair}"/>
       <path d="M96 74 C110 60, 146 60, 160 74 C148 68, 140 68, 128 68 C116 68, 108 68, 96 74 Z" fill="#000" opacity="0.12"/>`,
    accessory:
      `<path d="M92 176 C104 166, 152 166, 164 176" fill="none" stroke="#111" stroke-width="6" opacity="0.22"/>
       <path d="M98 180 C110 172, 146 172, 158 180" fill="none" stroke="#111" stroke-width="6" opacity="0.16"/>`,
  },
  {
    file: 'hollywood_2000s.png',
    label: '2000s',
    palette: { skin: '#F2C7A1', hair: '#1F2937', suit: '#003049', accent: '#D62828' },
    hairPath:
      `<path d="M74 110 C74 68, 104 44, 128 44 C160 44, 186 70, 182 114 C168 96, 156 88, 128 88 C100 88, 88 96, 74 110 Z" fill="\${hair}"/>
       <path d="M84 104 C92 78, 110 66, 128 66 C150 66, 166 78, 174 104 C162 94, 148 92, 128 92 C110 92, 96 94, 84 104 Z" fill="#fff" opacity="0.06"/>`,
    accessory:
      `<path d="M108 150 C116 156, 140 156, 148 150" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" opacity="0.35"/>
       <rect x="106" y="120" width="44" height="8" rx="4" fill="#111" opacity="0.10"/>`,
  },
  {
    file: 'hollywood_2010s.png',
    label: '2010s',
    palette: { skin: '#F4CDAE', hair: '#111827', suit: '#0A9396', accent: '#EE9B00' },
    hairPath:
      `<path d="M72 112 C76 68, 106 42, 130 42 C164 42, 190 74, 184 120 C170 98, 156 90, 128 90 C100 90, 86 100, 72 112 Z" fill="\${hair}"/>
       <path d="M88 92 C98 72, 114 62, 130 62 C148 62, 164 72, 170 92 C156 84, 144 82, 130 82 C114 82, 100 84, 88 92 Z" fill="#000" opacity="0.14"/>`,
    accessory:
      `<path d="M88 114 C98 126, 112 132, 128 132 C144 132, 158 126, 168 114" fill="none" stroke="#111" stroke-width="4" opacity="0.18"/>
       <circle cx="128" cy="150" r="7" fill="#111" opacity="0.10"/>`,
  },
  {
    file: 'hollywood_2020s.png',
    label: '2020s',
    palette: { skin: '#F3C7A6', hair: '#0B0F19', suit: '#2D1E2F', accent: '#4CC9F0' },
    hairPath:
      `<path d="M70 116 C72 66, 108 40, 130 40 C166 40, 194 76, 186 128 C170 102, 156 92, 128 92 C98 92, 84 106, 70 116 Z" fill="\${hair}"/>
       <path d="M76 116 C88 92, 106 80, 128 80 C152 80, 170 90, 182 116" fill="none" stroke="#fff" stroke-width="10" opacity="0.06" stroke-linecap="round"/>`,
    accessory:
      `<path d="M96 102 L112 102" stroke="#111" stroke-width="8" stroke-linecap="round" opacity="0.20"/>
       <path d="M144 102 L160 102" stroke="#111" stroke-width="8" stroke-linecap="round" opacity="0.20"/>
       <path d="M112 102 C120 110, 136 110, 144 102" fill="none" stroke="#111" stroke-width="6" stroke-linecap="round" opacity="0.20"/>`,
  },
];

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const v of variants) {
    const svg = actorSvg(v);
    const outPath = path.join(OUT_DIR, v.file);

    await sharp(Buffer.from(svg))
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(outPath);

    // eslint-disable-next-line no-console
    console.log(`Wrote ${path.relative(process.cwd(), outPath)}`);
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
