import { PixelCanvas } from './pixelCanvas';
import { seededRandom } from '../../utils/random';

export function drawTree(pink: boolean, seed: number): HTMLCanvasElement {
  const p = new PixelCanvas(76, 95);
  const rand = seededRandom(seed);
  p.ellipse(42, 83, 29, 8, '#243e3e38');
  p.rect(35, 48, 9, 36, '#4e4940');
  p.rect(36, 48, 4, 34, '#907255');
  p.rect(33, 80, 13, 3, '#69553f');
  p.rect(28, 49, 9, 4, '#62513d');
  p.rect(28, 38, 4, 13, '#62513d');
  p.rect(41, 42, 11, 4, '#62513d');
  p.rect(49, 32, 4, 12, '#62513d');
  const colors = pink ? ['#814f6b', '#a96883', '#c97f96', '#e5a2ad', '#f3c3c0'] : ['#294e48', '#39664c', '#4c8054', '#6b975b', '#91af6b'];
  p.ellipse(38, 40, 31, 29, colors[0]);
  p.ellipse(24, 43, 22, 20, colors[1]);
  p.ellipse(46, 29, 24, 24, colors[1]);
  p.ellipse(30, 27, 25, 22, colors[2]);
  p.ellipse(25, 23, 18, 15, colors[3]);
  for (let i = 0; i < 235; i++) {
    const x = 6 + Math.floor(rand() * 64);
    const y = 7 + Math.floor(rand() * 59);
    if ((x - 37) ** 2 / 980 + (y - 35) ** 2 / 780 > 1) continue;
    p.rect(x, y, 2 + rand() * 5, 2 + rand() * 3, colors[Math.min(4, Math.floor(rand() * 4) + (y < 32 ? 1 : 0))]);
  }
  return p.canvas;
}

export function drawProp(kind: 'lamp' | 'bench' | 'flower' | 'table' | 'sign' | 'bike'): HTMLCanvasElement {
  const p = new PixelCanvas(48, 64);
  switch (kind) {
    case 'lamp':
      p.ellipse(27, 59, 11, 3, '#243e3e33');
      p.rect(20, 56, 10, 5, '#37464c');
      p.rect(23, 20, 4, 37, '#32444b');
      p.rect(24, 23, 1, 33, '#a8ab91');
      p.ellipse(25, 16, 16, 15, '#ffdc7920');
      p.rect(18, 8, 14, 15, '#33464a');
      p.rect(21, 10, 8, 10, '#f6cd7e');
      p.rect(23, 10, 3, 8, '#fff0b1');
      p.rect(16, 7, 18, 3, '#394b50');
      p.rect(20, 4, 10, 3, '#394b50');
      p.rect(24, 1, 2, 4, '#394b50');
      break;
    case 'bench':
      p.rect(6, 47, 37, 7, '#29413730');
      p.rect(8, 41, 3, 13, '#344748');
      p.rect(36, 41, 3, 13, '#344748');
      p.rect(8, 27, 3, 17, '#344748');
      p.rect(36, 27, 3, 17, '#344748');
      for (let i = 0; i < 3; i++) {
        p.rect(5, 28 + i * 4, 37, 3, '#bc9465');
        p.rect(6, 28 + i * 4, 34, 1, '#deba80');
      }
      p.rect(5, 43, 37, 5, '#a37953');
      p.rect(5, 42, 37, 2, '#d3af79');
      break;
    case 'flower':
      p.rect(7, 44, 36, 14, '#735f51');
      p.rect(6, 43, 38, 4, '#bd9871');
      p.rect(10, 47, 29, 2, '#977357');
      for (let i = 0; i < 8; i++) {
        p.rect(9 + i * 4, 33 + (i % 3) * 3, 7, 11, i % 2 ? '#49784b' : '#668c53');
        p.rect(10 + i * 4, 33 + (i % 3) * 3, 3, 3, ['#e1acb5', '#f0d692', '#c787a1'][i % 3]);
      }
      break;
    case 'table':
      p.ellipse(25, 50, 21, 6, '#343c392e');
      p.rect(23, 32, 3, 18, '#483f3c');
      p.rect(16, 49, 18, 2, '#483f3c');
      p.ellipse(25, 33, 18, 9, '#614c42');
      p.ellipse(25, 30, 18, 9, '#b99068');
      p.ellipse(25, 29, 16, 7, '#dfb783');
      p.rect(21, 25, 5, 5, '#f4e4be');
      p.rect(22, 25, 3, 2, '#795643');
      p.rect(30, 27, 5, 3, '#af7270');
      for (const x of [2, 39]) {
        p.rect(x, 32, 7, 13, '#465457');
        p.rect(x, 34, 7, 3, '#b89565');
        p.rect(x, 41, 8, 4, '#bf986c');
        p.rect(x, 43, 2, 10, '#465457');
        p.rect(x + 6, 43, 2, 10, '#465457');
      }
      break;
    case 'sign':
      p.rect(11, 32, 3, 27, '#b09571');
      p.rect(35, 32, 3, 27, '#b09571');
      p.rect(10, 29, 27, 27, '#d1b387');
      p.rect(13, 32, 21, 21, '#354b49');
      p.text('CAFÉ', 23, 39, 6, '#f0d9b2');
      p.text('♥', 23, 47, 7, '#d4a285');
      break;
    case 'bike':
      for (const x of [12, 37]) {
        p.ellipse(x, 50, 9, 9, '#384b50');
        p.ellipse(x, 50, 7, 7, '#a2aaa0');
        p.ellipse(x, 50, 6, 6, '#b6b4a1');
      }
      p.rect(13, 47, 23, 2, '#a5584e');
      p.rect(22, 35, 2, 14, '#a5584e');
      p.rect(31, 33, 2, 17, '#a5584e');
      p.rect(18, 34, 10, 3, '#37464a');
      p.rect(31, 32, 8, 2, '#37464a');
      break;
  }
  return p.canvas;
}

export function drawFountain(): HTMLCanvasElement {
  const p = new PixelCanvas(92, 94);
  p.ellipse(47, 64, 44, 26, '#293f4030');
  p.ellipse(44, 61, 40, 27, '#777e77');
  p.ellipse(44, 57, 40, 26, '#c7c5ab');
  p.ellipse(44, 56, 35, 22, '#747f79');
  p.ellipse(44, 55, 32, 19, '#679b9d');
  p.ellipse(44, 52, 30, 16, '#79b6b1');
  for (let i = 0; i < 10; i++) {
    p.rect(20 + (i * 19) % 45, 44 + (i * 7) % 24, 7, 1, '#b1d7cb');
  }
  p.ellipse(44, 55, 12, 6, '#bec9b6');
  p.rect(40, 26, 8, 30, '#99a99e');
  p.rect(41, 28, 3, 26, '#d8dbbf');
  p.ellipse(44, 26, 20, 10, '#748c89');
  p.ellipse(44, 23, 21, 10, '#c5ccb5');
  p.ellipse(44, 22, 17, 7, '#74b7b6');
  p.rect(41, 6, 6, 15, '#9cb4a9');
  p.ellipse(44, 5, 5, 5, '#d6d8b7');
  p.rect(26, 26, 2, 20, '#bce3d2b0');
  p.rect(60, 26, 2, 20, '#bce3d2b0');
  return p.canvas;
}
