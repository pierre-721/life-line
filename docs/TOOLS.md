# Outils

Environnement vérifié le 26 septembre 2026 : macOS 26 / Darwin 25.6, Apple Silicon, Node.js 24.16.0, npm 11.13.0, Git 2.54.0. Git était déjà initialisé ; l'historique et les images de référence ont été préservés.

| Outil | Utilité | Statut | Quand |
| --- | --- | --- | --- |
| Node.js 24 LTS | Exécuter Vite et les outils TypeScript | Obligatoire pour développer ; déjà installé | Phase 1 |
| npm | Installer les dépendances verrouillées | Obligatoire ; déjà installé | Phase 1 |
| Git | Historique et suivi du code | Recommandé ; déjà installé et initialisé | Dès maintenant |
| Navigateur moderne | Exécuter le jeu, Canvas/WebGL | Obligatoire | Toutes les phases |
| TypeScript 5.9 | Types stricts | Dépendance de développement locale | Phase 1 |
| Vite 8.3 | Serveur, HMR et build | Dépendance de développement locale | Phase 1 |
| Phaser 3.90 | Rendu 2D, physique Arcade, caméra et animations | Dépendance locale du jeu | Phase 1 |
| Aseprite | Sprites et animations pixel-art définitifs | Optionnel, non installé par ce projet | Phase 2, production des assets |
| Tiled | Cartes en tuiles, calques et objets de collision | Optionnel, non installé par ce projet | Phase 2, remplacement du plan de démonstration |
| Figma | Maquettes et composants du HUD | Optionnel, non installé par ce projet | Lorsque l'interface se développe |

Pas besoin d'Aseprite, Tiled ou Figma pour lancer le jeu. Aucun logiciel global n'a été ajouté ou mis à jour.

Phaser 3.90 est volontairement fixé pour cette fondation Arcade 2D. TypeScript reste sur la branche 5.9 ; une mise à jour majeure devra être testée séparément. Le fichier `package-lock.json` verrouille les dépendances transitives.

Références officielles consultées : [prérequis Vite](https://vite.dev/guide/), [Phaser 3.90](https://phaser.io/news/2025/05/phaser-v390-released).
