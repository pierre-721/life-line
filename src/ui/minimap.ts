import { WORLD } from '../game/config/constants';
import { buildings, fountain, park, roads } from '../game/world/map';

export class Minimap {
  private readonly background: HTMLCanvasElement;
  private readonly contexts: CanvasRenderingContext2D[];

  constructor(canvases: HTMLCanvasElement[]) {
    this.background = document.createElement('canvas');
    this.background.width = 384;
    this.background.height = 320;
    const ctx = this.background.getContext('2d')!;
    const s = 0.25;
    ctx.scale(s, s);
    ctx.fillStyle = '#516c58';
    ctx.fillRect(0, 0, WORLD.width, WORLD.height);
    ctx.fillStyle = '#909a86';
    ctx.fillRect(82, 42, 1380, 1208);
    roads.forEach(r => { ctx.fillStyle = '#394c55'; ctx.fillRect(r.x, r.y, r.w, r.h); });
    buildings.forEach(b => {
      ctx.fillStyle = '#354a4d'; ctx.fillRect(b.x + 8, b.y + 8, b.w, b.h);
      ctx.fillStyle = b.roof; ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.fillStyle = '#e4cba388'; ctx.fillRect(b.x + 8, b.y + b.h - 14, b.w - 16, 6);
    });
    ctx.fillStyle = '#648a68'; ctx.fillRect(park.x, park.y, park.w, park.h);
    ctx.fillStyle = '#b6bc96'; ctx.fillRect(fountain.x - 12, park.y, 24, park.h);
    ctx.fillRect(park.x, fountain.y - 12, park.w, 24);
    ctx.fillStyle = '#92cec3'; ctx.beginPath(); ctx.arc(fountain.x, fountain.y, 33, 0, Math.PI * 2); ctx.fill();
    this.contexts = canvases.map(canvas => {
      canvas.width = 384;
      canvas.height = 320;
      return canvas.getContext('2d')!;
    });
  }

  update(x: number, y: number, view: { x: number; y: number; width: number; height: number }): void {
    for (const ctx of this.contexts) {
      ctx.clearRect(0, 0, 384, 320);
      ctx.drawImage(this.background, 0, 0);
      ctx.strokeStyle = '#d5edd65c';
      ctx.lineWidth = 1;
      ctx.strokeRect(view.x / 4, view.y / 4, view.width / 4, view.height / 4);
      ctx.fillStyle = '#8aefd12c';
      ctx.beginPath(); ctx.arc(x / 4, y / 4, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#bbffe6';
      ctx.strokeStyle = '#183c39';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(x / 4, y / 4, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
  }
}
