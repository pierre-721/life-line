# Validation — 26 septembre 2026

## Installation et compilation

- `npm install` terminé ; audit à l'installation : 0 vulnérabilité.
- `npm run typecheck` : TypeScript strict sans erreur.
- `npm run build` : bundle de production généré avec Phaser séparé du code du jeu.
- `npm run dev` : Vite démarré sur `http://127.0.0.1:5173/`.
- Chargement réel dans le navigateur intégré Chromium de Codex, inspection visuelle du canvas et lecture des erreurs / avertissements navigateur.
- `npm run preview -- --port 4173` : build de production ouvert et contrôlé ; Échap ouvre puis ferme le menu, sans erreur navigateur. Le module de vérification est absent de `dist/`.
- Aperçu du build validé : [preview.png](preview.png).

## Vérifications fonctionnelles reproductibles

En développement, ouvrir **http://127.0.0.1:5173/?verify** et laisser l'onglet au premier plan pendant environ 12 secondes. Un panneau affiche les résultats. Revenir à `/` pour jouer normalement. Ce module n'est pas présent en production.

Les 30 vérifications ont réussi à 1440 × 900 :

- initialisation réelle de Phaser et du canvas ;
- les dix touches des trois schémas de déplacement ;
- vitesse diagonale égale à la vitesse axiale ;
- blocage contre la façade du café, le bassin et un tronc ;
- limites ouest et est du monde ;
- caméra dans les limites aux deux coins extrêmes et au centre ;
- suivi de la position du joueur avec décalage prévu ;
- immobilité pendant la pause et reprise de la physique ;
- absence de touche bloquée après perte de focus ;
- ouverture de la carte avec M et fermeture ;
- correspondance viewport / canvas ;
- HUD dans l'écran et absence de débordement horizontal ;
- debug masqué par défaut.

Les tests pilotent les événements clavier de la page, attendent des frames du véritable moteur et vérifient les positions des corps Arcade. Ils ne remplacent pas les essais sur appareils physiques.

## Résolutions inspectées dans le navigateur

| Viewport | Résultat |
| --- | --- |
| 1920 × 1080 | Canvas adapté, HUD et mini-carte dans l'écran, pas de débordement |
| 1440 × 900 | Canvas adapté, 30 tests fonctionnels réussis |
| 1366 × 768 | Canvas adapté, HUD et mini-carte dans l'écran, pas de débordement |
| 390 × 844 | HUD compact, carte accessible, boutons tactiles visibles, pas de débordement |

Les changements de résolution ont été effectués sur le jeu actif, ce qui exerce aussi le redimensionnement de la caméra. Le menu et la grande carte ont été ouverts depuis leurs boutons. Aucune erreur ou alerte JavaScript n'a été constatée pendant cette validation.

## Limites de cette validation

Validation Chromium sur macOS, pas de matrice Safari/Firefox, pas de smartphone physique, pas de mesure exhaustive de performances sur matériel modeste. Le responsive mobile a été vérifié à l'écran ; un essai tactile physique restera nécessaire avant une livraison mobile. Le temps de parcours dépend de l'itinéraire et n'est pas un benchmark automatisé.

Après des changements de carte, relancer `?verify` et parcourir à la main les entrées du parc, les ruelles et les contours des bâtiments. Pour diagnostiquer, utiliser `?debug` ou F3 en développement.
