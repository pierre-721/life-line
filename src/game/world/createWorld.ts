import Phaser from 'phaser';
import { WORLD } from '../config/constants';
import { drawBuilding } from './buildingArt';
import { drawFountain, drawProp, drawTree } from './environmentArt';
import { drawGround } from './groundArt';
import { buildings, fountain, park } from './map';
import type { Rect } from './map';

export interface WorldView { solids: Phaser.Physics.Arcade.StaticGroup; obstacles: Rect[] }

export function createWorld(scene: Phaser.Scene): WorldView {
  const solids = scene.physics.add.staticGroup();
  const obstacles: Rect[] = [];
  function obstacle(x: number, y: number, w: number, h: number): void {
    const zone = scene.add.zone(x + w / 2, y + h / 2, w, h);
    solids.add(zone);
    obstacles.push({ x, y, w, h });
  }
  function texture(key: string, canvas: HTMLCanvasElement): void {
    if (!scene.textures.exists(key)) scene.textures.addCanvas(key, canvas);
  }
  texture('ground', drawGround());
  scene.add.image(0, 0, 'ground').setOrigin(0).setDepth(-100);
  buildings.forEach((b, i) => {
    const key = `building-${i}`;
    texture(key, drawBuilding(b));
    scene.add.image(b.x, b.y, key).setOrigin(0).setDepth(b.y + b.h);
    obstacle(b.x + 4, b.y + 48, b.w - 8, b.h - 48);
  });

  for (let variant = 0; variant < 4; variant++) texture(`tree-${variant}`, drawTree(variant === 3, variant + 15));
  function tree(x: number, y: number, variant = 0): void {
    scene.add.image(x, y, `tree-${variant}`).setOrigin(0.5, 0.88).setDepth(y);
    obstacle(x - 5, y - 7, 10, 10);
  }
  for (let x = 58; x < WORLD.width; x += 87) {
    tree(x, 60, x % 3);
    tree(x + 7, WORLD.height - 9, x % 3);
  }
  for (let y = 152; y < WORLD.height - 80; y += 104) {
    tree(51, y, y % 3);
    tree(WORLD.width - 39, y + 35, y % 3);
  }
  for (const [x, y, v] of [
    [688, 381, 0], [687, 491, 1], [850, 408, 2], [1140, 489, 0],
    [423, 532, 2], [123, 525, 0], [1435, 538, 1],
    [679, 754, 1], [679, 879, 2], [422, 798, 0], [128, 898, 1],
    [1140, 808, 0], [1203, 922, 1], [1437, 920, 2],
    [682, 180, 1], [842, 184, 0], [330, 216, 3], [1231, 220, 3],
    [889, 772, 3], [1095, 782, 3], [884, 955, 0], [1097, 958, 3],
    [896, 899, 1], [1094, 903, 2], [675, 1203, 0], [1141, 1195, 3],
  ]) tree(x, y, v);

  const props = ['lamp', 'bench', 'flower', 'table', 'sign', 'bike'] as const;
  props.forEach(kind => texture(kind, drawProp(kind)));
  function prop(kind: typeof props[number], x: number, y: number, solid = false): void {
    scene.add.image(x, y, kind).setOrigin(0.5, 0.94).setDepth(y);
    if (solid) obstacle(x - 17, y - 11, 34, 10);
  }
  for (const x of [689, 846]) {
    for (const y of [249, 575, 718, 987, 1190]) prop('lamp', x, y);
  }
  for (const x of [131, 358, 1131, 1419]) {
    prop('lamp', x, 580);
    prop('lamp', x, 982);
  }
  for (const [x, y] of [[467, 581], [637, 581], [878, 584], [1094, 584], [452, 969], [644, 969], [932, 765], [1050, 951]]) prop('flower', x, y);
  prop('table', 518, 587, true);
  prop('table', 593, 588, true);
  prop('sign', 657, 586);
  prop('bike', 445, 593);
  prop('bike', 1112, 590);
  for (const [x, y] of [[935, 797], [1052, 797], [941, 922], [1044, 922], [279, 973]]) prop('bench', x, y, true);

  texture('fountain', drawFountain());
  scene.add.image(fountain.x - 44, fountain.y - 57, 'fountain').setOrigin(0).setDepth(fountain.y + 22);
  obstacle(fountain.x - 34, fountain.y - 20, 68, 39);

  // Short fence segments preserve four generous, walkable park entrances.
  const fence = scene.add.graphics().setDepth(park.y + 3);
  fence.lineStyle(2, 0x4c6557);
  for (const [start, end] of [[park.x, fountain.x - 23], [fountain.x + 23, park.x + park.w]]) {
    fence.lineBetween(start, park.y - 4, end, park.y - 4);
    fence.lineBetween(start, park.y - 11, end, park.y - 11);
    for (let x = start; x <= end; x += 8) {
      fence.lineBetween(x, park.y - 15, x, park.y + 2);
    }
    obstacle(start, park.y - 1, end - start, 4);
  }
  const sign = scene.add.text(fountain.x, park.y - 15, 'PARC DES LILAS', {
    fontFamily: 'monospace', fontSize: '8px', color: '#f6e2b8',
    backgroundColor: '#435c4b', padding: { x: 5, y: 4 },
  }).setOrigin(0.5, 1).setDepth(park.y + 5);
  sign.setResolution(2);

  // Only water glints animate; all buildings, foliage and street furniture stay static.
  const shimmer = scene.add.graphics().setDepth(fountain.y + 23);
  shimmer.fillStyle(0xe4f4d8, 0.65);
  for (const [x, y] of [[-21, -1], [14, 7], [-9, 13]]) shimmer.fillRect(fountain.x + x, fountain.y + y, 5, 1);
  scene.tweens.add({ targets: shimmer, alpha: 0.15, duration: 1800, yoyo: true, repeat: -1 });

  obstacle(0, 0, WORLD.width, 12);
  obstacle(0, WORLD.height - 12, WORLD.width, 12);
  obstacle(0, 0, 12, WORLD.height);
  obstacle(WORLD.width - 12, 0, 12, WORLD.height);
  return { solids, obstacles };
}
