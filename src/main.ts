import Phaser from 'phaser';
import { CityScene } from './game/scenes/CityScene';
import './ui/styles.css';

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#6c8260',
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  scale: { mode: Phaser.Scale.RESIZE, width: window.innerWidth, height: window.innerHeight },
  physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } },
  render: { powerPreference: 'low-power' },
  scene: [CityScene],
  audio: { noAudio: true },
});

if (import.meta.hot) import.meta.hot.dispose(() => game.destroy(true));

if (import.meta.env.DEV && new URLSearchParams(location.search).has('verify')) {
  void import('../tests/browser').then(({ verify }) => verify(game));
}
