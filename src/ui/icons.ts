const paths: Record<string, string> = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  wallet: '<path d="M4 6V5a2 2 0 0 1 2-2h12v4M3 7h17v14H3z"/><path d="M15 11h6v6h-6z"/><path d="M17 14h1"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14s1 3 4 3 4-3 4-3M8 9h.01M16 9h.01"/>',
  energy: '<path d="m13 2-8 12h6l-1 8 9-13h-7z"/>',
  pin: '<path d="M19 9c0 6-7 12-7 12S5 15 5 9a7 7 0 0 1 14 0Z"/><circle cx="12" cy="9" r="2"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  pause: '<path d="M8 5v14M16 5v14" stroke-width="3"/>',
  play: '<path d="m8 4 12 8-12 8z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3v1"/>',
  map: '<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16M15 5v16"/>',
  expand: '<path d="M14 3h7v7m0-7-7 7M3 14v7h7m-7 0 7-7"/>',
  leaf: '<path d="M20 3C8 2 2 8 5 15s16 7 15-12ZM5 20 16 8"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
};

export function icon(name: string, className = ''): string {
  return `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.pin}</svg>`;
}
