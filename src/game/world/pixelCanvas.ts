export class PixelCanvas {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Votre navigateur ne permet pas le rendu Canvas 2D.');
    this.ctx = context;
    this.ctx.imageSmoothingEnabled = false;
  }

  rect(x: number, y: number, w: number, h: number, color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  ellipse(x: number, y: number, rx: number, ry: number, color: string): void {
    // Horizontal pixel strips keep silhouettes crisp, including on curves.
    for (let dy = -ry; dy <= ry; dy++) {
      const half = Math.round(rx * Math.sqrt(Math.max(0, 1 - (dy * dy) / (ry * ry))));
      this.rect(x - half, y + dy, half * 2, 1, color);
    }
  }

  text(text: string, x: number, y: number, size: number, color: string, font = 'monospace'): void {
    this.ctx.font = `bold ${size}px ${font}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, Math.round(x), Math.round(y));
  }
}
