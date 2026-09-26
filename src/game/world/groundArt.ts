import { WORLD } from '../config/constants';
import { buildings, fountain, park, roads } from './map';
import { PixelCanvas } from './pixelCanvas';
import { seededRandom } from '../../utils/random';

export function drawGround(): HTMLCanvasElement {
  const p = new PixelCanvas(WORLD.width, WORLD.height);
  const rand = seededRandom(741);
  p.rect(0, 0, WORLD.width, WORLD.height, '#6c8260');
  p.rect(82, 42, 1380, 1208, '#b3ae98');
  for (let y = 42; y < 1250; y += 16) {
    for (let x = 82; x < 1462; x += 24) {
      p.rect(x + (y % 32 ? 0 : 12), y, 23, 15, ['#bdb59e', '#b8b19c', '#c1b9a3', '#b5ad99'][Math.floor(rand() * 4)]);
      p.rect(x + 2, y + 1, 20, 1, '#d7ccb127');
    }
  }
  for (const r of roads) {
    p.rect(r.x - 5, r.y - 5, r.w + 10, r.h + 10, '#7c8176');
    p.rect(r.x - 3, r.y - 3, r.w + 6, r.h + 6, '#dbd0b5');
    p.rect(r.x, r.y, r.w, r.h, '#59616a');
    p.rect(r.x + 2, r.y + 2, r.w - 4, r.h - 4, '#626970');
    const vertical = r.h > r.w;
    for (let i = 0; i < 1400; i++) {
      p.rect(r.x + rand() * r.w, r.y + rand() * r.h, rand() > 0.6 ? 2 : 1, 1, '#a8a59220');
    }
    if (r.w > 70 && r.h > 70) {
      for (let pos = 14; pos < (vertical ? r.h : r.w); pos += 48) {
        p.rect(vertical ? r.x + r.w / 2 : pos, vertical ? pos : r.y + r.h / 2, vertical ? 2 : 20, vertical ? 20 : 2, '#c5b998');
      }
    }
  }
  // Clear central intersections before adding crossings.
  for (const y of [262, 596, 1008]) {
    const h = y === 262 ? 58 : y === 596 ? 96 : 84;
    p.rect(704, y, 128, h, '#626970');
    for (const x of [716, 803]) {
      for (let dy = 8; dy < h - 4; dy += 12) p.rect(x, y + dy, 17, 6, '#d9d1b6');
    }
    for (const cy of [y - 26, y + h + 10]) {
      for (let dx = 12; dx < 122; dx += 15) p.rect(704 + dx, cy, 8, 16, '#e1d8bd');
    }
  }
  // Inset gardens and private front paths.
  for (const b of buildings) {
    p.rect(b.x - 9, b.y + 37, b.w + 18, b.h - 9, '#8c9a70');
    p.rect(b.x - 6, b.y + 37, b.w + 12, b.h - 12, '#79936a');
    p.rect(b.x + 27, b.y + b.h - 3, b.w - 54, 31, '#c4b598');
    for (let i = 0; i < 30; i++) {
      p.rect(b.x - 4 + rand() * (b.w + 8), b.y + b.h + 5 + rand() * 16, 2, 2, '#b7b986');
    }
  }
  p.rect(park.x - 4, park.y - 4, park.w + 8, park.h + 8, '#d4c7a7');
  p.rect(park.x, park.y, park.w, park.h, '#739266');
  p.rect(park.x + 5, park.y + 5, park.w - 10, park.h - 10, '#7d9c6b');
  for (let i = 0; i < 2000; i++) {
    const x = park.x + rand() * park.w;
    const y = park.y + rand() * park.h;
    p.rect(x, y, 1 + rand() * 3, 1, rand() > 0.5 ? '#a0b47b' : '#618c62');
    if (i % 17 === 0) p.rect(x, y - 2, 2, 2, '#e3d49a');
  }
  p.rect(fountain.x - 15, park.y, 30, park.h, '#c7bc98');
  p.rect(park.x, fountain.y - 14, park.w, 28, '#c7bc98');
  p.ellipse(fountain.x, fountain.y, 64, 53, '#9a9c7e');
  p.ellipse(fountain.x, fountain.y - 1, 60, 50, '#cec29e');
  for (let i = 0; i < 120; i++) {
    const x = fountain.x - 54 + rand() * 108;
    const y = fountain.y - 42 + rand() * 84;
    if ((x - fountain.x) ** 2 / 2916 + (y - fountain.y) ** 2 / 1764 < 1) p.rect(x, y, 3, 1, '#a8a487');
  }
  // Flower beds, quiet lawn at the edges, and paving wear.
  for (let i = 0; i < 1600; i++) {
    const x = Math.floor(rand() * WORLD.width);
    const y = Math.floor(rand() * WORLD.height);
    if (x < 74 || x > 1470 || y < 38) {
      p.rect(x, y, 3, 2, i % 5 ? '#7f9867' : '#a8b376');
    }
  }
  for (const [x, y] of [[762, 490], [776, 781], [330, 646], [1290, 652]]) {
    p.ellipse(x, y, 9, 6, '#4c565e');
    p.ellipse(x, y - 1, 7, 4, '#83867e');
    for (let i = -4; i <= 4; i += 3) p.rect(x + i, y - 3, 1, 5, '#535e63');
  }
  p.text('RUE DES POSSIBLES', 545, 648, 9, '#d5ccb08a');
  p.text('BELLEVILLE', 991, 1062, 10, '#d5ccb08a');
  return p.canvas;
}
