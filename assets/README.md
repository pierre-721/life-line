# Assets artistiques

En phase 1, toutes les textures sont dessinées par le projet :

- personnages : `src/game/entities/playerArt.ts` ;
- bâtiments : `src/game/world/buildingArt.ts` ;
- environnement et mobilier : `src/game/world/environmentArt.ts` ;
- sol et routes : `src/game/world/groundArt.ts` ;
- icônes d'interface : `src/ui/icons.ts`.

Aucun asset commercial, générateur distant, police externe ou image de référence n'est chargé à l'exécution.

À l'arrivée des fichiers définitifs en phase 2, créer ici `characters/`, `tiles/`, `buildings/`, `environment/` et `ui/`, puis importer les assets via Vite. Conserver les sources éditables, les exports et leur provenance/licence ensemble. Les dossiers vides ne sont pas créés avant leur premier usage.
