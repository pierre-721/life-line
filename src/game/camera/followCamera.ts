import type Phaser from 'phaser';
import { WORLD } from '../config/constants';

export function configureCamera(scene: Phaser.Scene, target: Phaser.GameObjects.GameObject): () => void {
  const camera = scene.cameras.main;
  const resize = () => {
    // Nearest-neighbour filtering stays crisp; smaller laptops need a wider view.
    const preferredZoom = scene.scale.width >= 1700 ? 2 : scene.scale.width >= 1100 ? 1.5 : 1;
    const minimumZoom = Math.max(scene.scale.width / WORLD.width, scene.scale.height / WORLD.height);
    camera.setZoom(Math.max(preferredZoom, Math.ceil(minimumZoom * 2) / 2));
    camera.setBounds(0, 0, WORLD.width, WORLD.height);
  };
  resize();
  camera.roundPixels = true;
  camera.startFollow(target, true, 1, 1);
  camera.setFollowOffset(0, 40);
  scene.scale.on('resize', resize);
  return () => scene.scale.off('resize', resize);
}
