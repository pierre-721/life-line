# Architecture de la phase 1

## Séparation des responsabilités

- `main.ts` configure Phaser, le rendu pixel-art et le cycle de vie Vite/HMR.
- `CityScene` assemble la ville, le joueur, le HUD et leurs connexions. Elle ne contient aucune règle de simulation de vie.
- `map.ts` décrit les bâtiments et les quartiers avec des données typées. `createWorld.ts` construit le rendu et les corps statiques.
- Les modules `*Art.ts` fabriquent des textures déterministes une fois au démarrage. Ils seront remplacés progressivement par des atlas ; leurs consommateurs n'ont pas besoin de connaître la méthode de création artistique.
- `Player` gère les touches, la normalisation de vitesse et les quatre animations de marche. Il utilise `KeyboardEvent.key` pour prendre en compte les lettres produites par AZERTY ou QWERTY.
- `followCamera.ts` contient suivi, bornes et adaptation de zoom.
- `Hud` possède ses éléments DOM et nettoie ses écouteurs à la destruction. Les callbacks pause / retour au départ constituent ses seuls ordres vers le jeu. La mini-carte n'est rafraîchie qu'à 10 Hz.
- `simulation/` reste vide de logique. Les futures règles devront pouvoir être testées sans Phaser ni DOM.

## Rendu et collisions

Une texture de sol de 1 536 × 1 280, onze façades et quelques textures partagées de végétation/mobilier. Pas de milliers d'objets pour les pavés ou les feuilles ; leurs détails sont dessinés dans les textures. Phaser trie les objets selon la coordonnée des pieds pour que les troncs et les façades passent devant Alex lorsque nécessaire.

Le corps du joueur ne couvre que ses pieds : 10 × 8 unités. Les bâtiments ont un rectangle solide à partir du pied du toit jusqu'à la façade. Les troncs, bancs, tables, fontaine et petits segments de clôture sont solides. Les lampes et pots décoratifs ne multiplient pas les obstacles. Le monde a aussi ses limites physiques.

La caméra suit directement Alex, avec arrondi des pixels et un léger décalage vers le nord pour voir les façades. Le zoom vaut 2 sur grand écran, 1,5 sur portable et 1 sur petit écran. Le filtrage reste au plus proche voisin ; à 1,5, certains pixels occupent alternativement un ou deux pixels d'écran, sans flou. La résolution de rendu suit la taille CSS, sans multiplication automatique par le DPR des écrans Retina.

L'ouverture du menu suspend la physique, les entrées et le scintillement. La perte de focus efface les touches pressées et ouvre le menu. Une reprise ne conserve aucun mouvement bloqué.

## Limites assumées

Pas de serveur, de PNJ, d'intérieur accessible, de progression, de simulation du temps, de stockage ni de simulation hors connexion. Le monde est une carte de démonstration écrite en TypeScript ; Tiled viendra après validation de la direction artistique. L'interface affiche explicitement des données de démonstration dans le menu.

Le module de vérification navigateur est importé seulement sous `import.meta.env.DEV` avec `?verify`. Il n'est pas livré dans le build de production. Aucun accès de debug à l'état du jeu n'est ajouté à `window`.
