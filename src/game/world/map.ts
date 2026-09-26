export interface Rect { x: number; y: number; w: number; h: number }
export interface Building extends Rect {
  kind: 'cafe' | 'office' | 'home' | 'shop';
  name: string;
  color: string;
  roof: string;
  floors: number;
}

export const buildings: Building[] = [
  { x: 440, y: 350, w: 228, h: 206, kind: 'cafe', name: 'LE PIXEL CAFÉ', color: '#bd8d72', roof: '#96514e', floors: 2 },
  { x: 856, y: 302, w: 260, h: 250, kind: 'office', name: 'NOVA • TECH', color: '#718e95', roof: '#425865', floors: 3 },
  { x: 147, y: 332, w: 210, h: 226, kind: 'home', name: 'LES TILLEULS', color: '#c4a184', roof: '#62767d', floors: 3 },
  { x: 1196, y: 355, w: 220, h: 200, kind: 'shop', name: 'LES JOLIES CHOSES', color: '#ba947c', roof: '#a76154', floors: 2 },
  { x: 437, y: 728, w: 221, h: 211, kind: 'home', name: 'MAISON MIMOSA', color: '#caa885', roof: '#a96351', floors: 2 },
  { x: 148, y: 761, w: 210, h: 185, kind: 'home', name: 'VILLA SAUGE', color: '#a6ad92', roof: '#526f70', floors: 2 },
  { x: 1221, y: 755, w: 190, h: 193, kind: 'home', name: 'RÉSIDENCE AZUR', color: '#abb6b1', roof: '#597c8a', floors: 2 },
  { x: 433, y: 76, w: 230, h: 158, kind: 'shop', name: 'LA LIBRAIRIE', color: '#b8aa84', roof: '#537576', floors: 1 },
  { x: 872, y: 65, w: 241, h: 170, kind: 'home', name: 'LES HORTENSIAS', color: '#c4a69b', roof: '#816577', floors: 2 },
  { x: 440, y: 1115, w: 219, h: 140, kind: 'shop', name: 'LE PETIT MARCHÉ', color: '#b9a079', roof: '#627667', floors: 1 },
  { x: 870, y: 1110, w: 240, h: 146, kind: 'home', name: 'ATELIER 08', color: '#b2a696', roof: '#746a77', floors: 1 },
];

export const roads: Rect[] = [
  { x: 704, y: 0, w: 128, h: 1280 },
  { x: 0, y: 596, w: 1536, h: 96 },
  { x: 0, y: 1008, w: 1536, h: 84 },
  { x: 0, y: 262, w: 1536, h: 58 },
  { x: 375, y: 0, w: 42, h: 1280 },
  { x: 1150, y: 0, w: 42, h: 1280 },
];

export const park: Rect = { x: 858, y: 723, w: 268, h: 252 };
export const fountain = { x: 992, y: 846, radius: 39 };

export function districtAt(x: number, y: number): string {
  if (x > 832 && x < 1150 && y > 692 && y < 1008) return 'Parc des Lilas';
  if (y > 700 && x < 704) return 'Quartier des Tilleuls';
  if (y < 270) return 'Les Hauts de Belleville';
  if (y > 1008) return 'Promenade du Sud';
  return 'Place des possibles';
}
