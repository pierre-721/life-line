export const WORLD = { width: 1536, height: 1280 } as const;
export const PLAYER = { speed: 112, spawnX: 768, spawnY: 623 } as const;
export const DEBUG = import.meta.env.DEV && new URLSearchParams(location.search).has('debug');
