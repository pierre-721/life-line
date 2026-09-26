import Phaser from 'phaser';
import { PLAYER } from '../config/constants';
import { directions, playerFrame } from './playerArt';
import type { Direction } from './playerArt';

export class Player extends Phaser.Physics.Arcade.Sprite {
  private facing: Direction = 'down';
  private readonly pressed = new Set<string>();
  private readonly onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (this.isMovementKey(event.key)) {
      event.preventDefault();
      this.pressed.add(event.key.toLowerCase());
    }
  };
  private readonly onKeyUp = (event: KeyboardEvent) => { this.pressed.delete(event.key.toLowerCase()); };
  private readonly onBlur = () => this.clearInput();

  constructor(scene: Phaser.Scene) {
    for (const direction of directions) {
      for (let frame = 0; frame < 3; frame++) {
        const key = `alex-${direction}-${frame}`;
        if (!scene.textures.exists(key)) scene.textures.addCanvas(key, playerFrame(direction, frame));
      }
      if (!scene.anims.exists(`walk-${direction}`)) scene.anims.create({
        key: `walk-${direction}`,
        frames: [1, 0, 2, 0].map(frame => ({ key: `alex-${direction}-${frame}` })),
        frameRate: 9,
        repeat: -1,
      });
    }
    super(scene, PLAYER.spawnX, PLAYER.spawnY, 'alex-down-0');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0.5, 1);
    this.setSize(10, 8).setOffset(7, 27);
    this.setCollideWorldBounds(true);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('blur', this.onBlur);
  }

  private isMovementKey(key: string): boolean {
    return ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', 'z', 'q'].includes(key.toLowerCase());
  }

  clearInput(): void { this.pressed.clear(); this.setVelocity(0); }

  move(paused: boolean, touch: { x: number; y: number }): void {
    const has = (...keys: string[]) => keys.some(key => this.pressed.has(key));
    let x = Number(has('arrowright', 'd')) - Number(has('arrowleft', 'a', 'q')) + touch.x;
    let y = Number(has('arrowdown', 's')) - Number(has('arrowup', 'w', 'z')) + touch.y;
    if (paused) x = y = 0;
    const length = Math.hypot(x, y);
    if (length > 0) {
      this.setVelocity(x / length * PLAYER.speed, y / length * PLAYER.speed);
      this.facing = Math.abs(x) > Math.abs(y) ? (x > 0 ? 'right' : 'left') : (y > 0 ? 'down' : 'up');
      this.play(`walk-${this.facing}`, true);
    } else {
      this.setVelocity(0);
      this.anims.stop();
      this.setTexture(`alex-${this.facing}-0`);
    }
    this.setDepth(this.y);
  }

  override destroy(fromScene?: boolean): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('blur', this.onBlur);
    super.destroy(fromScene);
  }
}
