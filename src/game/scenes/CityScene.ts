import Phaser from 'phaser';
import { DEBUG, PLAYER, WORLD } from '../config/constants';
import { Player } from '../entities/Player';
import { createWorld } from '../world/createWorld';
import { configureCamera } from '../camera/followCamera';
import { Hud } from '../../ui/Hud';

export class CityScene extends Phaser.Scene {
  player!: Player;
  private hud!: Hud;
  private marker!: Phaser.GameObjects.Ellipse;
  private nameTag!: Phaser.GameObjects.Text;
  private paused = false;
  private showDebug = DEBUG;
  private lastHudUpdate = 0;

  constructor() { super('City'); }

  create(): void {
    this.physics.world.setBounds(0, 0, WORLD.width, WORLD.height);
    const world = createWorld(this);
    this.player = new Player(this);
    this.physics.add.collider(this.player, world.solids);
    this.marker = this.add.ellipse(this.player.x, this.player.y - 3, 23, 10, 0x98ecd0, 0.14)
      .setStrokeStyle(1, 0xb9f6ce, 0.8).setDepth(this.player.y - 1);
    this.nameTag = this.add.text(this.player.x, this.player.y - 45, 'ALEX', {
      fontFamily: 'Arial, sans-serif', fontSize: '7px', color: '#ebf4d9',
      backgroundColor: '#243e3ae6', padding: { x: 5, y: 3 },
    }).setOrigin(0.5, 1).setResolution(2).setDepth(2000);
    const cleanCamera = configureCamera(this, this.player);
    this.hud = new Hud({
      pause: paused => {
        this.paused = paused;
        this.player.clearInput();
        if (paused) { this.physics.pause(); this.tweens.pauseAll(); }
        else { this.physics.resume(); this.tweens.resumeAll(); }
      },
      reset: () => {
        this.player.setPosition(PLAYER.spawnX, PLAYER.spawnY);
        this.player.body?.reset(PLAYER.spawnX, PLAYER.spawnY);
      },
    });
    if (import.meta.env.DEV) {
      this.physics.world.createDebugGraphic();
      this.physics.world.drawDebug = this.showDebug;
      this.physics.world.debugGraphic.setVisible(this.showDebug);
      this.input.keyboard?.on('keydown-F3', (event: KeyboardEvent) => {
        event.preventDefault();
        this.showDebug = !this.showDebug;
        this.physics.world.drawDebug = this.showDebug;
        this.physics.world.debugGraphic.setVisible(this.showDebug);
      });
    }
    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      cleanCamera();
      this.hud.destroy();
    };
    this.events.once('shutdown', cleanup);
    this.events.once('destroy', cleanup);
    document.querySelector('#loading')?.classList.add('ready');
    document.querySelector('#loading')?.setAttribute('aria-hidden', 'true');
    document.querySelector<HTMLElement>('#game')?.focus({ preventScroll: true });
  }

  override update(time: number): void {
    this.player.move(this.paused, this.hud.touch);
    this.marker.setPosition(Math.round(this.player.x), Math.round(this.player.y - 3)).setDepth(this.player.y - 1);
    this.nameTag.setPosition(Math.round(this.player.x), Math.round(this.player.y - 39));
    if (time - this.lastHudUpdate > 100) {
      this.hud.update(this.player.x, this.player.y, this.cameras.main.worldView, this.game.loop.actualFps, this.showDebug);
      this.lastHudUpdate = time;
    }
  }
}
