import { icon } from './icons';
import { Minimap } from './minimap';
import { playerFrame } from '../game/entities/playerArt';
import { districtAt } from '../game/world/map';

export interface HudActions { pause: (paused: boolean) => void; reset: () => void }

export class Hud {
  readonly minimap: Minimap;
  readonly touch = { x: 0, y: 0 };
  private readonly dialog: HTMLDialogElement;
  private readonly place: HTMLElement;
  private readonly debug: HTMLElement;
  private readonly menuButton: HTMLButtonElement;
  private readonly disposers: (() => void)[] = [];
  private currentDistrict = '';
  private currentPanel = '';

  constructor(private readonly actions: HudActions) {
    const root = document.querySelector<HTMLDivElement>('#ui')!;
    root.innerHTML = `
      <header class="topbar">
        <a class="brand" href="#" aria-label="LIFE LINE, accueil du prototype"><span>LIFE<i>//</i>LINE<span class="brand-dot">®</span></span><small>CHAQUE VIE EST UNE HISTOIRE</small></a>
        <div class="status panel">
          <div class="profile"><div class="portrait"><img src="${playerFrame('down', 0).toDataURL()}" alt="Alex, personnage du joueur" /></div><div><strong>Alex <span class="online-dot"></span></strong><span class="secondary">22 ans <b>·</b> Un nouveau départ</span></div></div>
          <div class="date status-item"><span class="eyebrow">MARDI, 16 AVRIL</span><strong>Jour 1 <span class="muted">/</span> 08:00</strong></div>
          <div class="weather">${icon('sun')}<div><strong>18°</strong><span class="secondary">Printemps</span></div></div>
          <div class="money status-item" title="Valeur de démonstration — aucune simulation financière">${icon('wallet')}<div><span class="eyebrow">PORTE-MONNAIE</span><strong>1 324 <span class="currency">€</span></strong></div></div>
          <div class="vitals" title="Valeurs de démonstration"><div>${icon('smile')}<span>Humeur</span><div class="meter"><i style="width:78%"></i></div></div><div>${icon('energy')}<span>Énergie</span><div class="meter energy"><i style="width:65%"></i></div></div></div>
        </div>
        <button class="icon-button panel" id="menu-button" aria-label="Mettre en pause" title="Menu · Échap">${icon('pause')}</button>
      </header>
      <section class="welcome" aria-label="Bienvenue"><div class="overline"><span></span> LES PREMIERS PAS</div><h1>Bienvenue à<br><em>Belleville.</em></h1><p>Une ville, mille possibles.<br>Votre histoire commence ici.</p><div class="explore-label">${icon('leaf')} EXPLORATION LIBRE</div></section>
      <div class="location-chip panel">${icon('pin')}<span id="district">Place des possibles</span><span class="location-dot"></span></div>
      <aside class="minimap panel"><button id="map-button" aria-label="Ouvrir la carte de Belleville"><span>${icon('map')} Belleville</span>${icon('expand')}</button><div class="map-wrap"><canvas id="minimap" aria-label="Mini-carte indiquant la position d’Alex"></canvas><span class="north">N ↑</span><span class="map-player-label"><i></i> Vous êtes ici</span></div><div class="map-footer"><span>PREMIER CHAPITRE</span><kbd>M</kbd></div></aside>
      <footer class="bottom-bar"><div class="controls panel"><span class="key-group"><kbd>↑</kbd><span><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd></span></span><div><strong>Prenez votre chemin</strong><span>Flèches, <b>ZQSD</b> ou <b>WASD</b></span></div><span class="control-divider"></span><button id="help-button">${icon('help')}<span>Commandes</span></button></div><div class="prototype"><span class="live-dot"></span> PROTOTYPE <span class="version">v0.1</span><span class="prototype-divider">/</span><span class="phase">Une vie à imaginer.</span></div></footer>
      <nav class="touch-controls" aria-label="Déplacements tactiles"><button data-dx="0" data-dy="-1" aria-label="Avancer vers le haut">↑</button><button data-dx="-1" data-dy="0" aria-label="Aller à gauche">←</button><button data-dx="0" data-dy="1" aria-label="Avancer vers le bas">↓</button><button data-dx="1" data-dy="0" aria-label="Aller à droite">→</button></nav>
      <output id="debug" hidden></output>
      <dialog id="game-dialog" class="panel"><button id="close-dialog" class="icon-button" aria-label="Fermer">${icon('close')}</button><div class="dialog-overline">LIFE<span>//</span>LINE <span>— PHASE 01</span></div><section id="pause-panel"><span class="dialog-icon">${icon('pause')}</span><h2>Un instant pour soi.</h2><p>La ville vous attend. Reprenez votre exploration<br>quand vous le souhaitez.</p><button class="primary" id="resume-button">${icon('play')} Reprendre l’exploration</button><button class="text-button" id="reset-button">Revenir sur la place</button><div class="dialog-note">Phase 1 · Exploration uniquement<br>Heure, argent et besoins : valeurs de démonstration.</div></section><section id="help-panel" hidden><span class="dialog-icon">${icon('help')}</span><h2>La ville est à vous.</h2><p>Promenez-vous entre les façades, prenez un café<br>du regard, puis faites un détour par le parc.</p><dl class="shortcut-list"><div><dt>Se déplacer</dt><dd>↑ ↓ ← → / ZQSD / WASD</dd></div><div><dt>Carte du quartier</dt><dd><kbd>M</kbd></dd></div><div><dt>Pause / Reprendre</dt><dd><kbd>Échap</kbd></dd></div></dl><p class="dialog-note">Les intérieurs et les interactions viendront dans les prochaines phases.</p></section><section id="map-panel" hidden><h2>Un petit coin de Belleville.</h2><p>Suivez les rues. Prenez les chemins de traverse.</p><canvas id="large-map" aria-label="Carte complète de Belleville"></canvas><div class="map-legend"><span><i class="legend-player"></i> Alex</span><span><i class="legend-home"></i> Quartier résidentiel</span><span><i class="legend-park"></i> Parc des Lilas</span></div></section></dialog>`;
    this.dialog = root.querySelector('#game-dialog')!;
    this.place = root.querySelector('#district')!;
    this.debug = root.querySelector('#debug')!;
    this.menuButton = root.querySelector('#menu-button')!;
    this.minimap = new Minimap([root.querySelector('#minimap')!, root.querySelector('#large-map')!]);
    this.on(this.menuButton, 'click', () => this.toggle('pause'));
    this.on(root.querySelector('#map-button')!, 'click', () => this.toggle('map'));
    this.on(root.querySelector('#help-button')!, 'click', () => this.toggle('help'));
    this.on(root.querySelector('#resume-button')!, 'click', () => this.close());
    this.on(root.querySelector('#close-dialog')!, 'click', () => this.close());
    this.on(root.querySelector('#reset-button')!, 'click', () => { actions.reset(); this.close(); });
    this.on(root.querySelector('.brand')!, 'click', event => { event.preventDefault(); this.toggle('help'); });
    this.on(this.dialog, 'cancel', event => { event.preventDefault(); this.close(); });
    this.on(this.dialog, 'close', () => { actions.pause(false); this.menuButton.setAttribute('aria-label', 'Mettre en pause'); });
    this.on(window, 'keydown', event => {
      if ((event as KeyboardEvent).ctrlKey || (event as KeyboardEvent).metaKey || (event as KeyboardEvent).altKey) return;
      const key = (event as KeyboardEvent).key;
      if ((event as KeyboardEvent).repeat) return;
      if (key === 'Escape') {
        event.preventDefault();
        this.toggle('pause');
      }
      if (key.toLowerCase() === 'm') { event.preventDefault(); this.toggle('map'); }
    });
    this.on(window, 'blur', () => {
      this.touch.x = this.touch.y = 0;
      if (!this.dialog.open) this.toggle('pause');
    });
    const clearTouch = () => { this.touch.x = this.touch.y = 0; };
    root.querySelectorAll<HTMLButtonElement>('.touch-controls button').forEach(button => {
      this.on(button, 'pointerdown', event => {
        event.preventDefault();
        button.setPointerCapture((event as PointerEvent).pointerId);
        this.touch.x = Number(button.dataset.dx);
        this.touch.y = Number(button.dataset.dy);
      });
      this.on(button, 'pointerup', clearTouch);
      this.on(button, 'pointercancel', clearTouch);
      this.on(button, 'lostpointercapture', clearTouch);
    });
  }

  private on(target: EventTarget, type: string, listener: (event: Event) => void): void {
    target.addEventListener(type, listener);
    this.disposers.push(() => target.removeEventListener(type, listener));
  }

  toggle(panel: 'pause' | 'map' | 'help'): void {
    if (this.dialog.open && (panel === this.currentPanel || panel === 'pause')) { this.close(); return; }
    this.currentPanel = panel;
    for (const id of ['pause', 'help', 'map']) this.dialog.querySelector<HTMLElement>(`#${id}-panel`)!.hidden = id !== panel;
    this.touch.x = this.touch.y = 0;
    this.actions.pause(true);
    this.menuButton.setAttribute('aria-label', 'Reprendre l’exploration');
    if (!this.dialog.open) this.dialog.showModal();
  }

  close(): void {
    this.dialog.close();
    this.actions.pause(false);
    document.querySelector<HTMLElement>('#game')?.focus({ preventScroll: true });
  }

  update(x: number, y: number, view: { x: number; y: number; width: number; height: number }, fps: number, debug: boolean): void {
    const district = districtAt(x, y);
    if (district !== this.currentDistrict) { this.currentDistrict = district; this.place.textContent = district; }
    this.minimap.update(x, y, view);
    this.debug.hidden = !debug;
    if (debug) this.debug.textContent = `${Math.round(fps)} FPS · x ${Math.round(x)} / y ${Math.round(y)} · F3 : masquer`;
  }

  destroy(): void { this.disposers.forEach(dispose => dispose()); this.dialog.close(); }
}
