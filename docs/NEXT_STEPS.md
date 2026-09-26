# Prochaines étapes — non implémentées

## Phase 2 — production visuelle et espaces

1. Valider palette, résolution des tiles, taille des personnages et perspective.
2. Produire les sprites définitifs et animations dans Aseprite.
3. Remplacer le plan TypeScript par une tilemap Tiled : sol, obstacles, façades, dessus et points d'entrée.
4. Ajouter un premier intérieur avec transition réversible extérieur/intérieur.
5. Introduire un système de temps indépendant de Phaser, avec pause et vitesses.

## Phase 3 — habitants et interactions

1. Premiers PNJ et chemins simples dans le quartier visible.
2. Emplois du temps et états indépendants du rendu.
3. Interactions proches et dialogues écrits.
4. Distinguer PNJ visibles, éloignés et très éloignés avant d'augmenter leur nombre.

## Phase 4 — systèmes de vie

Études, travail, budget et relations, introduits un par un avec règles explicites, retours visuels et tests de simulation indépendants. Ne pas lier directement une valeur de HUD à la logique métier.

## Phase 5 — simulation pendant l'absence

Faire évoluer l'état de manière déterministe à partir du temps écoulé. Utiliser des événements agrégés, limiter les rattrapages et présenter un résumé compréhensible des changements. Aucun calcul complet de tous les PNJ à chaque minute simulée.

## Phase 6 — persistance et synchronisation

IndexedDB d'abord : version de schéma, migrations, export/import et récupération. Ajouter le cloud ensuite, uniquement après choix explicite des exigences de comptes, de confidentialité et de résolution des conflits. Un mécanisme local minimal peut être avancé en phase 4 si nécessaire pour les tests de progression.
