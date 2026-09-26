# LIFE//LINE — Phase 1

Une petite ville originale en pixel-art, un personnage jouable et les fondations d'une simulation de vie. **Pas encore de simulation, d'intérieurs, de PNJ ou de sauvegarde.**

## Installation et lancement

Prérequis : **Node.js 24 LTS** (version indiquée dans `.nvmrc`), npm et un navigateur moderne avec Canvas/WebGL.

```sh
npm install
npm run dev
```

Ouvrir l'adresse affichée par Vite, normalement **http://127.0.0.1:5173**. Aucun compte, service distant, asset à télécharger ou outil graphique n'est nécessaire. Le serveur écoute uniquement sur la machine locale.

```sh
npm run typecheck  # Vérification TypeScript stricte
npm run build      # Vérification + version de production dans dist/
npm run preview    # Aperçu local du build
```

## Jouer

- **ZQSD**, **WASD** ou **flèches** : marcher. Les diagonales sont normalisées.
- **Échap** : pause / reprise. Le jeu se met également en pause à la perte de focus.
- **M** : carte du quartier.
- **Commandes** : aide. Le menu permet de revenir au point de départ.
- Sur petit écran : quatre boutons tactiles.
- En développement seulement : **F3** ou `?debug` pour FPS, coordonnées et collisions.

Explorez le Pixel Café, les bureaux Nova Tech, le parc des Lilas et les rues résidentielles de Belleville. Les panneaux de bâtiments identifient les lieux ; ils ne déclenchent pas encore d'interaction. L'heure, l'argent, l'humeur et l'énergie sont des **valeurs de démonstration fixes**.

## Structure

```text
src/
  main.ts                    Initialisation Phaser / Vite
  game/
    config/                  Dimensions, vitesse, point de départ, debug
    scenes/                  Scène de ville, assemblage du prototype
    entities/                Alex, contrôles et sprites originaux
    world/                   Données de carte, textures et collisions
    camera/                  Suivi, bornes et redimensionnement
  ui/                        HUD HTML/CSS, menu et mini-carte
  simulation/                Réservé aux futures règles de vie
  utils/                     Aléatoire déterministe pour les textures
assets/                      Convention pour les futurs fichiers artistiques
tests/browser.ts             Vérifications intégrées au navigateur, dev uniquement
docs/                        Outils, architecture, validations et prochaines phases
```

## Choix de la phase 1

TypeScript strict, Phaser 3.90 et Vite 8 ; **Phaser est l'unique dépendance de production**. Les dessins originaux sont créés par Canvas 2D puis utilisés comme textures Phaser. Les images de `images-ref/` sont des références de direction artistique et ne sont pas embarquées dans le jeu.

La carte mesure 1 536 × 1 280 unités, soit environ 45–50 secondes pour un grand circuit à vitesse normale, selon l'itinéraire. Le sol est une texture statique de 7,5 Mio non compressée en mémoire, les arbres et le mobilier partagent leurs textures. Aucun objet décoratif n'est redessiné à chaque frame. Seuls Alex, le suivi de caméra, le petit scintillement de la fontaine et la mini-carte à 10 Hz évoluent.

Voir [l'architecture](docs/ARCHITECTURE.md), [les tests](docs/TESTING.md), [les outils](docs/TOOLS.md) et [la roadmap](docs/NEXT_STEPS.md).
