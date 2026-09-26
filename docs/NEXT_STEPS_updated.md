# Prochaines étapes — non implémentées

## Phase 2 — identité du joueur, production visuelle et espaces

1. Valider la direction artistique :
   - palette principale ;
   - résolution des tiles ;
   - taille des personnages ;
   - perspective ;
   - règles de rendu pixel-art ;
   - échelle et zoom de caméra.

2. Ajouter le créateur de personnage :
   - prénom ;
   - nom ;
   - sexe / genre utilisé par le jeu ;
   - date de naissance ;
   - âge de départ autorisé pour le prototype ;
   - aperçu animé du personnage avant validation.

3. Mettre en place une apparence modulaire :
   - teinte de peau ;
   - coiffure ;
   - couleur des cheveux ;
   - yeux ;
   - haut ;
   - bas ;
   - chaussures ;
   - accessoires.

   Prévoir les assets pour qu'ils puissent évoluer plus tard avec les vêtements, la coiffure et le vieillissement du personnage.

4. Produire dans Aseprite les premiers sprites définitifs et animations :
   - idle haut / bas / gauche / droite ;
   - marche haut / bas / gauche / droite ;
   - spritesheets et métadonnées exportées proprement ;
   - séparation entre fichiers source `.aseprite` et assets utilisés par le jeu.

5. Ajouter une persistance locale minimale du profil joueur :
   - sauvegarder l'identité ;
   - sauvegarder l'apparence ;
   - sauvegarder la date de naissance ;
   - sauvegarder la position et la map actuelle ;
   - recharger automatiquement le personnage lors d'une reprise de partie.

   Utiliser IndexedDB avec une structure versionnée simple. Cette persistance reste volontairement limitée au profil et à l'état minimal nécessaire au prototype.

6. Ajouter un écran de démarrage :
   - Nouvelle vie ;
   - Continuer si une sauvegarde existe ;
   - accès au créateur de personnage lors d'une nouvelle partie.

7. Remplacer le plan TypeScript actuel par une vraie tilemap Tiled :
   - sol ;
   - routes ;
   - trottoirs ;
   - obstacles ;
   - façades ;
   - végétation ;
   - mobilier urbain ;
   - éléments au-dessus du joueur ;
   - collisions ;
   - points d'entrée ;
   - points de spawn ;
   - zones d'interaction.

8. Ajouter un premier intérieur avec transition réversible extérieur/intérieur :
   - premier bâtiment conseillé : Pixel Café ;
   - entrée avec interaction ;
   - transition visuelle ;
   - chargement de la map intérieure ;
   - spawn intérieur ;
   - sortie ;
   - retour exact dans la ville.

9. Introduire un système de temps indépendant de Phaser :
   - date du jeu ;
   - heure ;
   - pause ;
   - vitesse ×1 ;
   - vitesse ×2 ;
   - vitesse ×5 ;
   - vitesse ×10 ;
   - calcul de l'âge à partir de la date de naissance ;
   - préparation des futurs événements temporels.

   Le rendu Phaser doit rester indépendant de la vitesse du temps simulé.

10. Tester la Phase 2 :
    - création d'une nouvelle vie ;
    - validation du personnage ;
    - sauvegarde ;
    - rechargement ;
    - cohérence visuelle des sprites ;
    - déplacements et collisions ;
    - transition extérieur/intérieur ;
    - retour extérieur ;
    - pause et changements de vitesse ;
    - resize ;
    - build de production ;
    - absence d'erreurs console.

### Résultat attendu de la Phase 2

Le joueur doit pouvoir :

1. lancer LIFE//LINE ;
2. choisir « Nouvelle vie » ;
3. créer son personnage ;
4. sauvegarder sa création ;
5. apparaître dans la ville avec cette apparence ;
6. se déplacer ;
7. entrer dans un premier bâtiment ;
8. ressortir ;
9. modifier la vitesse du temps ;
10. fermer puis relancer le jeu et continuer avec le même personnage.

---

## Phase 3 — habitants et interactions

1. Ajouter les premiers PNJ dans le quartier visible.
2. Mettre en place des chemins simples et déplacements cohérents.
3. Ajouter des emplois du temps indépendants du rendu.
4. Ajouter des états simples : activité, destination, disponibilité et humeur.
5. Ajouter les premières interactions proches.
6. Ajouter des dialogues écrits et contextuels.
7. Préparer les relations entre le joueur et les PNJ.
8. Distinguer :
   - PNJ visibles ;
   - PNJ éloignés ;
   - PNJ très éloignés ;

   avant d'augmenter leur nombre.
9. Ne pas utiliser d'IA générative permanente pour piloter les PNJ.

---

## Phase 4 — systèmes de vie

Introduire progressivement, un système à la fois :

1. études ;
2. travail ;
3. revenus ;
4. dépenses ;
5. budget ;
6. logement ;
7. relations amicales ;
8. relations amoureuses ;
9. santé et énergie ;
10. objectifs personnels.

Chaque système doit avoir :

- des règles explicites ;
- un état testable indépendamment du rendu ;
- des retours visuels clairs ;
- des tests de simulation ;
- aucune dépendance directe entre une simple valeur du HUD et la logique métier.

La sauvegarde locale pourra être étendue progressivement pour prendre en charge ces nouveaux états.

---

## Phase 5 — simulation pendant l'absence

1. Sauvegarder l'instant de la dernière session.
2. Calculer le temps réel écoulé lors du retour du joueur.
3. Convertir ce temps en temps simulé selon les règles du jeu.
4. Faire évoluer l'état de manière déterministe à partir du temps écoulé.
5. Utiliser des événements agrégés plutôt qu'une simulation minute par minute.
6. Limiter les rattrapages trop importants.
7. Gérer :
   - travail ;
   - études ;
   - revenus ;
   - dépenses ;
   - relations ;
   - santé ;
   - événements importants.
8. Présenter un résumé compréhensible :
   - « Pendant votre absence... »
   - événements majeurs ;
   - changements de situation ;
   - décisions en attente.

Ne jamais recalculer chaque PNJ à chaque minute simulée.

---

## Phase 6 — persistance complète, comptes et synchronisation

La Phase 2 introduit déjà une sauvegarde IndexedDB minimale pour le profil joueur.

La Phase 6 transforme cette base en véritable système de persistance :

1. version de schéma ;
2. migrations ;
3. sauvegardes multiples ;
4. autosave ;
5. récupération après erreur ;
6. export d'une sauvegarde ;
7. import d'une sauvegarde ;
8. intégrité des données ;
9. gestion des anciennes versions ;
10. préparation de la synchronisation cloud.

Ajouter ensuite le cloud uniquement après définition explicite :

- des comptes utilisateurs ;
- de l'authentification ;
- de la confidentialité ;
- de la sécurité ;
- de la synchronisation entre appareils ;
- de la résolution des conflits ;
- des règles de suppression des données.

Le cloud ne doit jamais être nécessaire pour jouer en local.

---

## Phase 7 — extensions à envisager plus tard

Seulement lorsque les phases précédentes sont stables :

- vieillissement complet de l'enfance à la vieillesse ;
- familles et enfants ;
- arbre généalogique ;
- héritage ;
- plusieurs générations ;
- davantage de quartiers ;
- transports ;
- immobilier ;
- entreprises ;
- événements complexes ;
- dialogues dynamiques assistés par IA ;
- interactions entre vrais joueurs ;
- synchronisation multijoueur asynchrone ou temps réel.
