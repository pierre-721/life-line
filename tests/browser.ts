import type Phaser from 'phaser';
import type { CityScene } from '../src/game/scenes/CityScene';
import { PLAYER, WORLD } from '../src/game/config/constants';

/** Real browser integration checks. Loaded only in Vite development with ?verify. */
export async function verify(game: Phaser.Game): Promise<void> {
  const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
  const report = document.createElement('aside');
  report.id = 'verification-report';
  report.setAttribute('role', 'status');
  report.style.cssText = 'position:fixed;z-index:99;right:15px;top:115px;max-height:70vh;overflow:auto;width:360px;max-width:94vw;background:#10232bf5;color:#d6efdb;padding:18px;border:1px solid #97d7b5;border-radius:8px;font:12px/1.6 monospace';
  report.textContent = 'Vérifications en cours…';
  document.body.append(report);
  const results: string[] = [];
  let failures = 0;
  function check(name: string, condition: boolean, details = ''): void {
    results.push(`${condition ? 'PASS' : 'FAIL'} ${name}${details ? ` (${details})` : ''}`);
    if (!condition) failures++;
    report.innerText = results.join('\n');
  }
  let scene: CityScene | undefined;
  for (let i = 0; i < 100; i++) {
    scene = game.scene.getScene('City') as CityScene | undefined;
    if (scene?.player) break;
    await wait(100);
  }
  if (!scene?.player) { check('Boot Phaser', false); return; }
  const city = scene;
  const player = city.player;
  const body = player.body as Phaser.Physics.Arcade.Body;
  const event = (type: string, key: string) => window.dispatchEvent(new KeyboardEvent(type, { key, bubbles: true, cancelable: true }));
  const button = (id: string) => document.querySelector<HTMLButtonElement>(id)!.click();
  async function position(x = PLAYER.spawnX as number, y = PLAYER.spawnY as number): Promise<void> {
    player.clearInput();
    body.reset(x, y);
    await wait(80);
  }
  async function move(keys: string[], ms: number): Promise<void> {
    keys.forEach(key => event('keydown', key));
    await wait(ms);
    keys.forEach(key => event('keyup', key));
    await wait(40);
  }
  try {
    if (document.querySelector<HTMLDialogElement>('dialog')!.open) button('#resume-button');
    check('Boot Phaser', city.sys.isActive() && !!game.canvas);
    for (const [key, axis, sign] of [
      ['ArrowRight', 'x', 1], ['ArrowLeft', 'x', -1], ['ArrowUp', 'y', -1], ['ArrowDown', 'y', 1],
      ['w', 'y', -1], ['a', 'x', -1], ['s', 'y', 1], ['d', 'x', 1], ['z', 'y', -1], ['q', 'x', -1],
    ] as const) {
      await position();
      const before = player[axis];
      await move([key], 260);
      check(`Déplacement ${key}`, (player[axis] - before) * sign > 12);
    }
    await position();
    event('keydown', 'd'); event('keydown', 's');
    await wait(120);
    check('Diagonale normalisée', Math.abs(body.velocity.length() - PLAYER.speed) < 0.01);
    event('keyup', 'd'); event('keyup', 's');
    await position(550, 590);
    await move(['w'], 700);
    check('Collision façade du café', player.y >= 564 && player.y <= 568, `y=${player.y.toFixed(1)}`);
    await position(992, 895);
    await move(['w'], 650);
    check('Collision fontaine', player.y >= 872 && player.y <= 878, `y=${player.y.toFixed(1)}`);
    await position(718, 490);
    await move(['a'], 600);
    check('Collision tronc', player.x >= 697 && player.x <= 701, `x=${player.x.toFixed(1)}`);
    await position(28, 645);
    await move(['a'], 350);
    check('Limite ouest', body.left >= 11.9 && player.x < 20);
    await position(WORLD.width - 28, 645);
    await move(['d'], 350);
    check('Limite est', body.right <= WORLD.width - 11.9 && player.x > WORLD.width - 20);
    for (const [x, y] of [[20, 20], [WORLD.width - 20, WORLD.height - 20], [768, 800]]) {
      await position(x, y);
      const v = city.cameras.main.worldView;
      check(`Caméra bornée ${x}/${y}`, v.x >= -1 && v.y >= -1 && v.right <= WORLD.width + 1 && v.bottom <= WORLD.height + 1);
    }
    await position(768, 800);
    const camera = city.cameras.main;
    check('Caméra suit Alex', Math.abs(camera.worldView.centerX - player.x) < 2 && Math.abs(camera.worldView.centerY - (player.y - 40)) < 2);
    await position();
    button('#menu-button');
    const beforePause = player.x;
    await move(['d'], 250);
    check('Pause bloque le déplacement', Math.abs(player.x - beforePause) < 0.1 && city.physics.world.isPaused);
    button('#resume-button');
    await wait(80);
    check('Reprise de la physique', !city.physics.world.isPaused && !document.querySelector<HTMLDialogElement>('dialog')!.open);
    event('keydown', 'd');
    await wait(100);
    window.dispatchEvent(new Event('blur'));
    await wait(80);
    button('#resume-button');
    const afterBlur = player.x;
    await wait(150);
    check('Perte de focus sans touche bloquée', Math.abs(player.x - afterBlur) < 0.1);
    event('keydown', 'm'); event('keyup', 'm');
    check('Raccourci carte', document.querySelector<HTMLDialogElement>('dialog')!.open && !document.querySelector<HTMLElement>('#map-panel')!.hidden);
    button('#close-dialog');
    await wait(60);
    check('Carte fermée', !document.querySelector<HTMLDialogElement>('dialog')!.open);
    check('Canvas adapté', game.canvas.width === innerWidth && game.canvas.height === innerHeight, `${innerWidth}×${innerHeight}`);
    const hud = document.querySelector('.status')!.getBoundingClientRect();
    const menu = document.querySelector('#menu-button')!.getBoundingClientRect();
    check('HUD dans le viewport', hud.left >= 0 && menu.right <= innerWidth && hud.right <= menu.left);
    check('Aucun débordement horizontal', document.documentElement.scrollWidth === innerWidth);
    check('Pas de debug par défaut', document.querySelector<HTMLElement>('#debug')!.hidden);
    await position();
    results.push(`TERMINÉ : ${results.length - failures}/${results.length} vérifications réussies.`);
    report.innerText = results.join('\n');
    report.dataset.result = failures === 0 ? 'pass' : 'fail';
  } catch (error) {
    check('Erreur inattendue', false, String(error));
    report.dataset.result = 'fail';
  }
}
