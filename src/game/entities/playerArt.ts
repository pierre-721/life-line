import { PixelCanvas } from '../world/pixelCanvas';

export type Direction = 'down' | 'left' | 'right' | 'up';
export const directions: Direction[] = ['down', 'left', 'right', 'up'];

/** Original 24 × 36 sprite, four directions, three poses per direction. */
export function playerFrame(direction: Direction, frame: number): HTMLCanvasElement {
  const p = new PixelCanvas(24, 36);
  const step = frame === 1 ? -2 : frame === 2 ? 2 : 0;
  const bob = frame === 0 ? 0 : -1;
  p.rect(7, 24, 4, 8 + step, '#283e51');
  p.rect(13, 24, 4, 8 - step, '#283e51');
  p.rect(6, 31 + step, 5, 3, '#202c37');
  p.rect(13, 31 - step, 6, 3, '#202c37');
  p.rect(6, 33 + step, 5, 1, '#c2c5b1');
  p.rect(13, 33 - step, 6, 1, '#c2c5b1');
  p.rect(6, 16 + bob, 12, 11, '#bd7855');
  p.rect(8, 17 + bob, 8, 10, '#dfac72');
  p.rect(4, 17 + bob + step / 2, 3, 9, '#c38b60');
  p.rect(17, 17 + bob - step / 2, 3, 9, '#8c604e');
  p.rect(4, 24 + bob + step / 2, 3, 3, '#e3ae80');
  p.rect(17, 24 + bob - step / 2, 3, 3, '#d09a74');
  p.rect(9, 16 + bob, 6, 3, '#eee1bf');
  p.rect(11, 19 + bob, 2, 7, '#f2dfb4');
  p.rect(7, 5 + bob, 11, 12, '#624b40');
  p.rect(7, 8 + bob, 11, 8, '#e7b184');
  p.rect(8, 13 + bob, 9, 4, '#d8956e');
  p.rect(5, 6 + bob, 3, 6, '#674431');
  p.rect(6, 3 + bob, 13, 6, '#513d35');
  p.rect(9, 1 + bob, 8, 4, '#513d35');
  p.rect(5, 4 + bob, 6, 4, '#513d35');
  p.rect(8, 3 + bob, 7, 3, '#875735');
  p.rect(7, 6 + bob, 4, 3, '#704a32');
  p.rect(13, 4 + bob, 6, 3, '#674632');
  if (direction === 'up') {
    p.rect(6, 6 + bob, 13, 8, '#513d35');
    p.rect(7, 7 + bob, 10, 4, '#61432f');
    p.rect(7, 18 + bob, 10, 9, '#3c5c57');
    p.rect(8, 18 + bob, 8, 6, '#54766b');
    p.rect(9, 24 + bob, 6, 3, '#294841');
  } else if (direction === 'left' || direction === 'right') {
    const left = direction === 'left';
    p.rect(left ? 7 : 15, 10 + bob, 2, 2, '#2b3439');
    p.rect(left ? 5 : 18, 11 + bob, 2, 3, '#e7b184');
    p.rect(left ? 15 : 5, 17 + bob, 5, 10, '#3f6159');
  } else {
    p.rect(8, 10 + bob, 2, 2, '#28323a');
    p.rect(15, 10 + bob, 2, 2, '#28323a');
    p.rect(11, 14 + bob, 3, 1, '#955d4c');
    p.rect(6, 17 + bob, 2, 9, '#3f6159');
    p.rect(16, 17 + bob, 2, 9, '#3f6159');
  }
  return p.canvas;
}
