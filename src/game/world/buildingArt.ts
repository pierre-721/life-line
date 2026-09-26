import type { Building } from './map';
import { PixelCanvas } from './pixelCanvas';
import { seededRandom } from '../../utils/random';

function window(p: PixelCanvas, x: number, y: number, w: number, h: number, lit: boolean, office: boolean): void {
  p.rect(x - 3, y - 3, w + 6, h + 7, '#655c59');
  p.rect(x - 2, y - 2, w + 4, h + 3, '#e1c5a1');
  p.rect(x, y, w, h, lit ? '#dcaf71' : '#334b59');
  p.rect(x + 2, y + 2, w - 4, h * 0.4, lit ? '#f6dca0' : '#729199');
  p.rect(x + 3, y + 4, 3, h - 7, lit ? '#fff0bb' : '#9cb4b0');
  p.rect(x + w / 2, y, 2, h, office ? '#46606a' : '#c1a17f');
  p.rect(x, y + h * 0.58, w, 2, office ? '#46606a' : '#c1a17f');
  p.rect(x - 4, y + h + 2, w + 8, 3, '#e6c6a0');
  p.rect(x - 3, y + h + 5, w + 8, 2, '#826c63');
  if (!office) {
    p.rect(x - 9, y - 1, 5, h + 1, '#4d6864');
    p.rect(x + w + 4, y - 1, 5, h + 1, '#4d6864');
    for (let dy = 3; dy < h; dy += 4) {
      p.rect(x - 8, y + dy, 3, 1, '#718d78');
      p.rect(x + w + 5, y + dy, 3, 1, '#718d78');
    }
  }
}

function planter(p: PixelCanvas, x: number, y: number, width: number): void {
  p.rect(x, y, width, 6, '#704f43');
  p.rect(x - 1, y, width + 2, 2, '#b47b57');
  for (let i = 0; i < width; i += 4) {
    p.rect(x + i, y - 4 - (i % 3), 5, 5, i % 8 === 0 ? '#537951' : '#385e44');
    if (i % 3 === 0) p.rect(x + i + 1, y - 4, 2, 2, '#e5a1a5');
  }
}

export function drawBuilding(b: Building): HTMLCanvasElement {
  const p = new PixelCanvas(b.w + 18, b.h + 18);
  const rand = seededRandom(b.x * 7 + b.y);
  const office = b.kind === 'office';
  const roofH = office ? 57 : 54;
  const faceY = roofH + 9;
  const w = b.w;
  p.rect(12, 34, w + 4, b.h - 22, '#29393b55');
  p.rect(16, 48, w, b.h - 37, '#29393b33');
  p.rect(5, faceY, w - 10, b.h - faceY, '#554f4b');
  p.rect(7, faceY, w - 17, b.h - faceY - 7, b.color);
  p.rect(w - 12, faceY, 7, b.h - faceY, '#665f59');
  p.rect(9, faceY + 5, 4, b.h - faceY - 10, '#dec0a1');
  p.rect(6, b.h - 9, w - 9, 6, '#a59786');
  p.rect(3, b.h - 3, w - 3, 3, '#ded0b4');
  for (let y = faceY + 5; y < b.h - 12; y += 8) {
    for (let x = 14 + (y % 16 === 0 ? 6 : 0); x < w - 18; x += 19) {
      if (rand() > 0.48) p.rect(x, y, 13, 1, '#826e6124');
    }
  }
  const upperLevels = b.floors - 1;
  const shopH = 62;
  const floorH = (b.h - faceY - shopH) / Math.max(1, upperLevels);
  for (let level = 0; level < upperLevels; level++) {
    const y = faceY + 11 + floorH * level;
    p.rect(8, y + floorH - 7, w - 18, 3, '#ded0b255');
    const cols = office ? 5 : 4;
    const windowW = office ? 32 : 24;
    for (let col = 0; col < cols; col++) {
      const x = 24 + col * ((w - 48 - windowW) / (cols - 1));
      window(p, x, y, windowW, Math.max(22, floorH - 21), rand() > 0.42, office);
      if (!office && level === 0) planter(p, x - 2, y + Math.max(22, floorH - 21) + 5, windowW + 4);
    }
  }
  // A deep cornice separates the facade from the handmade tiled roof.
  p.rect(1, 17, w - 2, roofH, '#3b4649');
  p.rect(5, 14, w - 10, roofH - 4, b.roof);
  for (let y = 17; y < roofH + 8; y += 7) {
    for (let x = 7; x < w - 10; x += office ? 35 : 12) {
      p.rect(x + ((y % 2) * 4), y, office ? 30 : 10, 2, '#ffffff16');
      p.rect(x, y + 5, office ? 34 : 11, 1, '#202b353c');
      if (!office) p.rect(x, y + 1, 1, 5, '#342f393a');
    }
  }
  p.rect(1, 13, w - 2, 4, '#d4b79a');
  p.rect(1, roofH + 10, w - 2, 5, '#383d44');
  p.rect(0, roofH + 8, w, 3, '#d5baa0');
  p.rect(5, roofH + 15, w - 10, 5, '#403e3c44');
  if (office) {
    // Rooftop skylights and HVAC.
    for (let i = 0; i < 3; i++) {
      p.rect(29 + i * 44, 27, 36, 24, '#2a404d');
      p.rect(31 + i * 44, 28, 32, 19, '#7198a3');
      p.rect(33 + i * 44, 30, 13, 5, '#a2c4c5');
      p.rect(47 + i * 44, 28, 2, 19, '#405c67');
    }
    p.rect(w - 67, 24, 37, 23, '#9baca9');
    for (let i = 0; i < 5; i++) p.rect(w - 63, 28 + i * 3, 27, 1, '#556e73');
  } else {
    p.rect(w - 47, 2, 18, 28, '#65595b');
    p.rect(w - 47, 2, 13, 25, '#b78d79');
    p.rect(w - 50, 2, 23, 5, '#d5b598');
    p.rect(w - 47, 0, 17, 3, '#4a4244');
    for (let y = 10; y < 24; y += 6) p.rect(w - 47, y, 13, 1, '#8b6860');
    p.rect(28, 26, 32, 22, '#3f4e56');
    p.rect(31, 28, 26, 16, '#7698a0');
    p.rect(33, 29, 9, 6, '#b4ccca');
    p.rect(44, 28, 2, 17, '#344b56');
  }

  const ground = b.h - 58;
  const signY = ground - 13;
  p.rect(13, signY - 4, w - 26, 21, office ? '#2d5265' : b.kind === 'cafe' ? '#593d3f' : '#3e5b52');
  p.rect(15, signY - 2, w - 30, 1, office ? '#87bfbd' : '#dcb784');
  p.text(b.name, w / 2, signY + 7, office ? 13 : 11, '#f6e1b6');
  for (let col = 0; col < 3; col++) {
    const x = 21 + col * ((w - 84) / 2);
    const ww = col === 1 ? 36 : 48;
    window(p, x, ground + 15, ww, 35, true, true);
    if (col !== 1) {
      p.rect(x + 6, ground + 41, ww - 12, 4, '#9e7251');
      p.rect(x + 10, ground + 33, 6, 8, '#6f7752');
      p.rect(x + 8, ground + 29, 10, 5, '#526c45');
      p.rect(x + 28, ground + 28, 5, 13, '#e4cc99');
    } else {
      p.rect(x + ww - 7, ground + 34, 2, 5, '#fff0b2');
      p.rect(x - 4, b.h - 6, ww + 8, 4, '#e8d6b7');
    }
  }
  if (b.kind === 'cafe' || b.kind === 'shop') {
    p.rect(12, ground + 10, w - 24, 10, '#4c3736');
    for (let x = 14; x < w - 14; x += 12) {
      const c = Math.floor((x - 14) / 12) % 2 === 0 ? '#c87762' : '#ead7a9';
      p.rect(x, ground + 10, 12, 7, c);
      p.rect(x, ground + 17, 11, 5, c);
    }
  }
  for (const x of [14, w - 23]) {
    p.rect(x, b.h - 19, 12, 15, '#825c49');
    p.rect(x - 1, b.h - 20, 14, 3, '#b88f67');
    p.ellipse(x + 6, b.h - 27, 9, 12, '#3a654a');
    p.rect(x + 1, b.h - 37, 5, 8, '#74915c');
  }
  return p.canvas;
}
