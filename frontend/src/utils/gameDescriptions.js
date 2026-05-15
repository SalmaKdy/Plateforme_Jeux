const descriptions = {
    "Snake": {
        intro: "L'un des jeux les plus emblématiques de l'histoire du jeu vidéo, Snake vous plonge dans une expérience simple mais terriblement addictive. Guidez votre serpent à travers l'arène, collectez des pommes et regardez-le grandir — jusqu'à ce que l'erreur fatale arrive.",
        about: "Snake est un classique intemporel né dans les salles d'arcade des années 70 et popularisé sur les téléphones mobiles. Sa beauté réside dans sa simplicité : une seule règle, un seul objectif, mais une profondeur de jeu infinie. Chaque partie est unique, chaque session pousse à battre son propre record.",
        gameplay: "Utilisez les touches directionnelles pour guider le serpent dans toutes les directions. Chaque pomme mangée augmente la longueur du serpent et le score. La difficulté augmente progressivement : plus le serpent est long, plus il devient difficile d'éviter les murs et votre propre queue. Une seule collision et c'est terminé.",
        features: [
            "Contrôles intuitifs aux touches directionnelles",
            "Difficulté progressive selon la longueur du serpent",
            "Système de score en temps réel",
            "Arène fermée avec détection de collision précise",
            "Sessions courtes idéales pour des parties rapides",
        ],
        whyPlay: "Snake est la définition du \"facile à apprendre, difficile à maîtriser\". En quelques secondes vous comprenez les règles, mais battre votre meilleur score demandera des dizaines de parties. Un incontournable pour tout amateur de jeux rétro.",
    },

    "2048": {
        intro: "2048 est un puzzle mathématique hypnotique qui récompense la réflexion stratégique. Fusionnez des tuiles, construisez vos combinaisons, et visez la tuile mythique : 2048. Chaque glissement peut tout changer.",
        about: "Créé en 2014 par Gabriele Cirulli, 2048 est devenu viral en quelques semaines. Son principe est d'une élégance rare : une grille 4×4, des chiffres, et des fusions. Derrière cette apparente simplicité se cache un puzzle d'une profondeur mathématique redoutable qui engage le cerveau sur plusieurs niveaux.",
        gameplay: "Glissez les tuiles dans quatre directions (haut, bas, gauche, droite). Deux tuiles identiques qui se rencontrent fusionnent en une seule avec leur somme. L'objectif est d'atteindre la tuile 2048, mais la grille se remplit rapidement — chaque mouvement doit être calculé. Planifiez plusieurs coups à l'avance pour éviter le blocage.",
        features: [
            "Grille 4×4 avec mécanique de fusion de tuiles",
            "Progression exponentielle des valeurs (2 → 4 → 8 → ... → 2048)",
            "Stratégie de coin pour maximiser le score",
            "Partie infinie après avoir atteint 2048",
            "Score cumulatif à chaque fusion",
        ],
        whyPlay: "2048 est un excellent exercice de pensée stratégique. Il vous force à anticiper, planifier, et prendre des décisions sous pression. Chaque partie est une nouvelle opportunité d'affiner votre stratégie et de repousser vos limites.",
    },

    "Breakout": {
        intro: "Breakout est le roi des jeux de casse-briques. Armé d'une raquette et d'une balle rebondissante, votre mission est de détruire chaque brique du mur avec précision et réflexes. Un classique Atari qui n'a pas pris une ride.",
        about: "Imaginé par Steve Wozniak et Steve Jobs chez Atari en 1976, Breakout est l'un des piliers du jeu vidéo moderne. Il a inspiré des générations de développeurs et reste à ce jour une référence en matière de gameplay pur. Sa formule — destruction totale des briques — reste universellement satisfaisante.",
        gameplay: "Déplacez la raquette horizontalement pour maintenir la balle en jeu. Chaque fois que la balle touche une brique, celle-ci est détruite. L'objectif est de détruire toutes les briques sans laisser tomber la balle. La vitesse augmente progressivement, exigeant des réflexes toujours plus rapides. Des zones de briques spéciales peuvent offrir des bonus.",
        features: [
            "Raquette contrôlable avec précision",
            "Angles de rebond réalistes selon le point d'impact",
            "Multiples rangées de briques avec résistances variables",
            "Accélération progressive de la balle",
            "Compteur de vies et système de score",
        ],
        whyPlay: "Breakout offre une satisfaction immédiate à chaque brique détruite et un défi croissant qui maintient l'engagement. Parfait pour ceux qui cherchent un jeu d'action pur où la précision et la réactivité font la différence.",
    },

    "Memory Match": {
        intro: "Memory Match est le test ultime de votre mémoire et de votre concentration. Retournez les cartes, mémorisez leurs positions, et trouvez toutes les paires cachées avant que le temps ne vous échappe.",
        about: "Inspiré du jeu de cartes Memory inventé en 1959, Memory Match est un entraînement cérébral déguisé en jeu. Il stimule la mémoire à court terme, la concentration et l'observation. Simple en apparence, il devient un vrai défi dès que le nombre de cartes augmente.",
        gameplay: "Cliquez sur une carte pour la retourner et découvrir son symbole. Cherchez la carte correspondante parmi celles restantes. Si les deux cartes sont identiques, elles restent visibles — sinon, elles se retournent. L'objectif est de trouver toutes les paires avec le minimum de tentatives possible.",
        features: [
            "Grille de cartes mélangées à chaque partie",
            "Animation de retournement fluide",
            "Compteur de tentatives et de paires trouvées",
            "Difficulté croissante avec plus de cartes",
            "Entraînement de la mémoire à court terme",
        ],
        whyPlay: "Memory Match est autant un jeu qu'un exercice mental. Il développe votre mémoire visuelle, votre concentration et votre attention aux détails. Idéal pour tous les âges, il offre des sessions courtes et stimulantes.",
    },

    "Tic-Tac-Toe": {
        intro: "Le Morpion — ce grand classique du jeu stratégique — vous met face à une IA redoutable sur une grille 3×3. Simple à comprendre, mais maîtriser la victoire contre une IA bien programmée est une autre affaire.",
        about: "Le Tic-Tac-Toe existe depuis l'Antiquité sous différentes formes. Sa popularité tient à sa pureté stratégique : chaque coup compte, chaque décision peut mener à la victoire ou à l'impasse. Cette version vous confronte à une intelligence artificielle qui joue sans erreur, mettant à l'épreuve votre logique et votre anticipation.",
        gameplay: "Choisissez X ou O et affrontez l'IA. Placez votre symbole dans une case vide pour tenter d'aligner trois symboles identiques — horizontalement, verticalement ou en diagonale — avant l'adversaire. L'IA analyse chaque coup et cherche à bloquer vos alignements tout en construisant les siens. Chaque partie est un duel de logique.",
        features: [
            "IA compétitive avec stratégie de blocage et d'attaque",
            "Grille 3×3 classique avec détection automatique de victoire",
            "Résultat instantané : victoire, défaite ou match nul",
            "Parties ultra-rapides en moins d'une minute",
            "Parfait pour affûter la pensée logique",
        ],
        whyPlay: "Tic-Tac-Toe est un jeu de stratégie pure à portée de tous. Chaque partie est une opportunité d'anticiper les mouvements adverses et de placer le coup parfait. Un excellent exercice de pensée tactique sous contrainte.",
    },

    "Flappy Bird": {
        intro: "Un seul tap, une seule chance. Flappy Bird est l'incarnation du jeu \"one more try\" : frustrant, addictif, impossible à lâcher. Guidez l'oiseau entre les tuyaux et survivez le plus longtemps possible.",
        about: "Créé en 2013 par Dong Nguyen, Flappy Bird est devenu un phénomène culturel mondial en quelques semaines. Sa difficulté brutale et son principe minimaliste en ont fait l'un des jeux mobiles les plus téléchargés de l'histoire. Sa mécanique de vol par taps crée une tension constante qui pousse toujours à rejouer.",
        gameplay: "Appuyez sur la barre d'espace ou cliquez pour faire battre les ailes de l'oiseau et prendre de la hauteur. Relâchez pour le laisser descendre par gravité. L'objectif est de passer entre les tuyaux sans les toucher. Chaque passage réussi rapporte un point. La moindre collision met fin à la partie instantanément.",
        features: [
            "Mécanique de vol par tap ultra-réactive",
            "Gravité réaliste avec montée et descente contrôlées",
            "Génération aléatoire des tuyaux pour chaque partie",
            "Compteur de score en temps réel",
            "Difficulté constante dès la première seconde",
        ],
        whyPlay: "Flappy Bird teste votre timing, votre concentration et votre calme sous pression. La promesse d'un meilleur score à chaque tentative crée une boucle addictive impossible à briser. Un seul tap peut tout changer.",
    },

    "Minesweeper": {
        intro: "Le Démineur est un chef-d'œuvre de logique et de déduction. Utilisez les indices numériques pour cartographier les mines cachées et les désamorcer toutes — sans jamais en déclencher une seule.",
        about: "Popularisé par Windows dans les années 90, le Démineur est l'un des jeux de réflexion les plus joués de l'histoire de l'informatique. Derrière son interface sobre se cache un puzzle de logique rigoureuse : chaque case révélée est un indice, chaque décision rapproche de la victoire ou de l'explosion.",
        gameplay: "Cliquez sur une case pour la révéler. Si elle contient une mine, la partie est perdue. Si elle est sûre, un chiffre indique combien de mines se trouvent dans les 8 cases adjacentes. Utilisez ces informations pour déduire l'emplacement exact des mines et les marquer avec un drapeau. Révélez toutes les cases sûres pour gagner.",
        features: [
            "Grille de jeu avec mines placées aléatoirement",
            "Indices numériques pour guider la déduction logique",
            "Pose de drapeaux pour marquer les mines suspectées",
            "Première case toujours sûre pour démarrer",
            "Chronomètre intégré pour mesurer la performance",
        ],
        whyPlay: "Le Démineur est un entraînement pur à la pensée déductive. Il force à raisonner avec incertitude, à peser les probabilités et à prendre des risques calculés. Une victoire au Démineur est toujours méritée.",
    },

    "Platformer": {
        intro: "Courez, sautez, collectez — le Platformer vous transporte dans l'ère dorée du jeu de plateforme rétro. Des obstacles à éviter, des pièces à ramasser, des niveaux à conquérir. L'aventure commence maintenant.",
        about: "Le jeu de plateforme est l'un des genres fondateurs du jeu vidéo, popularisé par des légendes comme Super Mario Bros. Ce Platformer s'inscrit dans cette tradition avec un gameplay accessible mais progressivement exigeant, des environnements variés et la satisfaction unique de maîtriser chaque niveau.",
        gameplay: "Utilisez les touches directionnelles pour courir et la touche de saut pour s'élever au-dessus des obstacles. Collectez les pièces dorées pour augmenter votre score. Évitez les ennemis, les pièges et les chutes. Chaque niveau introduit de nouveaux défis — plateformes mobiles, passages étroits, ennemis plus rapides — qui demandent une maîtrise croissante du personnage.",
        features: [
            "Déplacement fluide avec saut précis et contrôlable",
            "Niveaux progressifs avec obstacles variés",
            "Collecte de pièces et objets bonus",
            "Ennemis avec comportements distincts",
            "Esthétique pixel art rétro chaleureuse",
        ],
        whyPlay: "Le Platformer est une célébration du jeu vidéo dans sa forme la plus pure. Chaque niveau terminé apporte une fierté immédiate. Sa progression naturelle en fait un jeu accessible à tous, mais les meilleurs records demandent une vraie maîtrise.",
    },

    "Tetris": {
        intro: "Tetris est plus qu'un jeu — c'est une institution. Depuis 1984, il captive les joueurs du monde entier avec une mécanique d'une beauté absolue. Empilez les pièces, effacez les lignes, et survivez à l'accélération inexorable.",
        about: "Créé par Alexeï Pajitnov en 1984 en URSS, Tetris est le jeu vidéo le plus vendu de tous les temps avec plus de 520 millions d'exemplaires. Son concept — des pièces géométriques qui tombent, à empiler intelligemment — est d'une efficacité redoutable. Le jeu a été étudié par des neuroscientifiques pour ses effets positifs sur le cerveau.",
        gameplay: "Des tétrominos (pièces composées de 4 blocs) tombent du haut de l'écran. Déplacez-les horizontalement et faites-les pivoter pour les emboîter parfaitement. Quand une ligne horizontale est complète, elle disparaît et tout ce qui est au-dessus descend. La vitesse de chute augmente avec le niveau. La partie se termine quand les pièces atteignent le sommet.",
        features: [
            "7 types de tétrominos classiques (I, O, T, S, Z, J, L)",
            "Rotation et déplacement précis des pièces",
            "Effacement de lignes simples, doubles, triples ou Tetris (×4)",
            "Accélération progressive du niveau 1 à 20+",
            "Score bonifié pour les combos de lignes multiples",
        ],
        whyPlay: "Tetris est le summum du puzzle sous pression. Il développe la vision spatiale, la vitesse de décision et la gestion du stress. Chaque Tetris (4 lignes d'un coup) déclenche une satisfaction incomparable. Un jeu qu'on ne maîtrise jamais vraiment, ce qui le rend éternel.",
    },

    "Space Invaders": {
        intro: "La Terre est attaquée. Des vagues d'extraterrestres descendent inexorablement vers vous. Votre canon laser est votre seule défense. Détruisez chaque ennemi avant qu'il ne vous atteigne — ou tout est perdu.",
        about: "Sorti en 1978 chez Taito, Space Invaders est le jeu qui a lancé l'industrie du jeu vidéo telle qu'on la connaît. Premier jeu à introduire un compteur de score enregistré, il a créé le concept du \"high score\" et de la compétition entre joueurs. Chaque vague d'aliens est plus rapide que la précédente, créant une tension dramatique unique.",
        gameplay: "Contrôlez le canon laser qui se déplace horizontalement en bas de l'écran. Tirez sur les extraterrestres qui descendent en formation. Utilisez les boucliers pour vous protéger des tirs ennemis, mais attention — ils se dégradent à chaque impact. Les aliens accélèrent à mesure que leur nombre diminue. L'OVNI mystère rapporte des points bonus.",
        features: [
            "Vagues d'aliens en formation organisée",
            "Boucliers destructibles pour la protection",
            "OVNI mystère pour les points bonus",
            "Accélération ennemie selon les survivants",
            "Progression de niveaux avec difficulté croissante",
        ],
        whyPlay: "Space Invaders est l'expérience de shoot-em-up ultime. La tension monte à chaque vague, chaque tir compte, chaque erreur coûte cher. La chasse au high score vous gardera accroché pendant des heures.",
    },

    "Pong": {
        intro: "Avant tous les autres, il y avait Pong. Le premier jeu vidéo de sport de l'histoire vous met face à l'IA dans le duel de tennis de table le plus épuré qui soit. Simple, direct, intemporel.",
        about: "Développé par Atari en 1972, Pong est le premier jeu vidéo d'arcade commercialement réussi. Sa conception minimaliste — deux raquettes et une balle — cache un gameplay d'une précision remarquable. La trajectoire de la balle change selon l'endroit où elle frappe la raquette, introduisant subtilement la notion d'angles et de contrôle.",
        gameplay: "Contrôlez la raquette de droite (ou de gauche) verticalement avec les touches directionnelles. Renvoyez la balle pour que l'adversaire ne puisse pas la rattraper. La balle accélère progressivement et change d'angle selon la zone de la raquette touchée — le bord donne un angle plus prononcé, le centre renvoie droit. Premier à 11 points gagne.",
        features: [
            "Contrôle vertical de la raquette avec précision",
            "Angles de renvoi variables selon le point d'impact",
            "IA avec difficulté progressive",
            "Accélération naturelle de la balle au fil du rally",
            "Compteur de score avec limite de victoire",
        ],
        whyPlay: "Pong est la preuve que la simplicité est la forme suprême du génie. Il développe le sens du timing, des réflexes et de l'anticipation. Un match de Pong contre une IA bien calibrée reste tendu jusqu'au dernier point.",
    },

    "Whack-a-Mole": {
        intro: "Les taupes surgissent, vous devez frapper ! Whack-a-Mole est un jeu de réflexes pur et jouissif. Plus vous êtes rapide, plus votre score monte. Mais les taupes n'attendent pas — êtes-vous assez vif ?",
        about: "Whack-a-Mole est inspiré du jeu d'arcade physique créé au Japon dans les années 70. Son principe — frapper des cibles aléatoires qui apparaissent et disparaissent rapidement — est devenu une métaphore culturelle pour les problèmes récurrents. En jeu, c'est une explosion de fun et d'adrénaline qui teste vos limites de réactivité.",
        gameplay: "Des taupes apparaissent aléatoirement dans l'un des trous du plateau. Cliquez ou tapez dessus rapidement avant qu'elles ne disparaissent pour marquer des points. La fenêtre de temps pour frapper se réduit à mesure que le niveau augmente. Des taupes spéciales peuvent apparaître avec des multiplicateurs de score ou au contraire faire perdre des points si touchées.",
        features: [
            "Apparition aléatoire pour garder le joueur en alerte",
            "Temps imparti avec compte à rebours",
            "Vitesse d'apparition croissante par paliers",
            "Système de multiplicateur de score pour les combos",
            "Interface colorée et réactions visuelles satisfaisantes",
        ],
        whyPlay: "Whack-a-Mole est l'antidote parfait au stress — frapper sur des taupes est universellement satisfaisant. Il développe la vitesse de réaction et la coordination œil-main dans un format court et explosif.",
    },

    "Connect Four": {
        intro: "Puissance 4 — le duel stratégique en colonnes. Faites tomber vos jetons et soyez le premier à aligner quatre disques consécutifs, horizontalement, verticalement ou en diagonale. Mais l'IA a aussi un plan.",
        about: "Connect Four (Puissance 4) a été introduit par Milton Bradley en 1974. Sa grille verticale impose une contrainte physique unique : les jetons tombent par gravité, ce qui force une planification différente des autres jeux d'alignement. L'IA de cette version analyse la grille en profondeur et cherche à contrer chaque tentative d'alignement.",
        gameplay: "À tour de rôle, vous et l'IA faites tomber un jeton dans l'une des 7 colonnes de la grille 6×7. Les jetons s'empilent par gravité. L'objectif est d'aligner 4 jetons de votre couleur dans n'importe quelle direction avant l'adversaire. Surveillez les menaces en double ou en triple — un alignement de 3 non bloqué est souvent fatal au tour suivant.",
        features: [
            "Grille 6×7 avec mécanique de chute par gravité",
            "IA stratégique avec analyse d'alignement multicouche",
            "Détection de victoire dans 4 directions",
            "Alternance de tours avec indication visuelle",
            "Parties courtes mais intenses (moins de 5 minutes)",
        ],
        whyPlay: "Connect Four est un jeu de stratégie accessible mais profond. Chaque colonne choisie ouvre ou ferme des possibilités. Battre l'IA demande de planifier à plusieurs coups de distance — une compétence mentale précieuse.",
    },

    "Simon Says": {
        intro: "Simon vous défie. Une séquence de couleurs s'allume — mémorisez, répétez, et ne faites pas d'erreur. À chaque tour réussi, la séquence s'allonge. Jusqu'où votre mémoire peut-elle aller ?",
        about: "Simon est un jeu électronique créé par Milton Bradley en 1978. Basé sur le principe du \"Simon dit\", il teste la mémoire séquentielle et la concentration sous pression temporelle. Des études ont montré que jouer régulièrement à Simon améliore la mémoire de travail et la capacité à retenir des séquences d'information.",
        gameplay: "Simon affiche une séquence de couleurs lumineuses accompagnées de sons distincts. Après la démonstration, vous devez reproduire la séquence exacte dans le même ordre en cliquant sur les zones colorées. À chaque tour réussi, une nouvelle couleur s'ajoute à la fin de la séquence. Une erreur met fin à la partie — recommencez depuis le début.",
        features: [
            "4 zones colorées avec sons associés pour l'aide à la mémorisation",
            "Séquence qui s'allonge d'un élément à chaque tour",
            "Tempo d'affichage qui s'accélère aux niveaux avancés",
            "Score basé sur le nombre de tours réussis",
            "Entraînement certifié de la mémoire séquentielle",
        ],
        whyPlay: "Simon Says est à la fois un jeu et un entraînement cérébral. Chaque record personnel est une victoire sur vos propres limites cognitives. La progression est gratifiante et l'envie de \"juste un tour de plus\" est irrésistible.",
    },

    "Asteroids": {
        intro: "Votre vaisseau dérive seul dans un champ d'astéroïdes hostile. Tirez, pivotez, accélérez — survivez aux vagues de rochers et aux soucoupes ennemies dans ce classique de l'ère spatiale.",
        about: "Sorti en 1979 chez Atari, Asteroids est l'un des jeux d'arcade les plus réussis de tous les temps. Sa physique vectorielle unique — inertie réaliste, rotation libre à 360°, espace torique sans bordure — le distingue de tous ses contemporains. Il introduit également la notion de fragmentation : les gros astéroïdes se divisent en fragments plus petits et plus rapides.",
        gameplay: "Pilotez votre vaisseau en le faisant pivoter et en activant le propulseur pour se déplacer. L'inertie est réelle — vous glissez dans l'espace même moteur éteint. Tirez des lasers pour détruire les astéroïdes, qui se fragmentent en pièces plus petites. Survivez aux soucoupes volantes qui vous ciblent activement. L'espace est torique : sortir par un bord revient par l'opposé.",
        features: [
            "Physique inertielle réaliste dans l'espace",
            "Astéroïdes à fragmentation en 3 tailles",
            "Soucoupes ennemies avec comportement actif",
            "Espace torique sans murs fixes",
            "Jauge de vie et vaisseaux de réserve",
        ],
        whyPlay: "Asteroids est une expérience de pilotage unique grâce à sa physique inertielle. Maîtriser le vaisseau demande de l'entraînement, mais cette maîtrise est extrêmement gratifiante. Le sentiment de flotter dans l'espace sous feu ennemi est incomparable.",
    },

    "Bubble Shooter": {
        intro: "Visez, ajustez, tirez. Bubble Shooter est le jeu de tir casual le plus satisfaisant qui soit. Éclatez des groupes de bulles colorées pour les faire disparaître et nettoyez le plateau avant qu'il ne descende trop bas.",
        about: "Bubble Shooter est une variation du genre Match-3 popularisé par Puzzle Bobble en 1994. Sa mécanique de visée et de tir à trajectoire courbe le distingue des puzzles classiques. La satisfaction d'un tir parfait qui éclate une chaîne de bulles en cascade est l'une des plus grandes joies du jeu casual.",
        gameplay: "Visez avec la souris et cliquez pour tirer une bulle de la couleur indiquée. La bulle rebondit sur les murs latéraux, ce qui permet des angles indirects pour atteindre des positions difficiles. Trois bulles identiques ou plus qui se touchent éclatent. Des cascades se déclenchent si des groupes se retrouvent suspendus sans attache au plafond. Nettoyez tout le plateau pour progresser.",
        features: [
            "Visée précise avec trajectoire rebondissante",
            "Système de cascades pour les éliminations en chaîne",
            "Bulles bonus et spéciales (jokers, bombes)",
            "Niveaux progressifs avec configurations créatives",
            "Prévisualisation de la prochaine bulle à tirer",
        ],
        whyPlay: "Bubble Shooter est l'alliance parfaite entre réflexion et précision. La satisfaction d'un tir en ricochet qui déclenche une cascade de disparitions est immense. Accessible mais profond, il offre des heures de plaisir détendu.",
    },
};

const genreFallbacks = {
    "Arcade": {
        intro: "Un jeu d'arcade authentique qui capture l'essence des salles de jeux des années 80. Action immédiate, score à battre, et une boucle de jeu addictive qui vous retient encore et encore.",
        about: "Les jeux d'arcade représentent la forme la plus pure du divertissement vidéoludique : pas de tutoriels interminables, pas de couches de complexité inutile — juste une mécanique parfaitement huilée et l'envie de faire mieux à chaque partie.",
        gameplay: "Le gameplay est direct et immédiat. Maîtrisez les contrôles en quelques secondes, mais des heures vous séparent de la maîtrise complète. Chaque partie est une opportunité d'améliorer votre record.",
        features: [
            "Gameplay immédiat sans temps de chargement",
            "Système de score compétitif",
            "Difficulté progressive pour maintenir l'engagement",
            "Sessions courtes adaptées à tout emploi du temps",
        ],
        whyPlay: "Ce jeu incarne l'esprit de l'arcade : fun immédiat, défi permanent, et la promesse éternelle d'une meilleure partie. Impossible de s'arrêter après une seule session.",
    },
    "Puzzle": {
        intro: "Un puzzle qui récompense la réflexion et la patience. Chaque niveau est un problème à résoudre, chaque solution une victoire intellectuelle.",
        about: "Les jeux de puzzle stimulent le cerveau de manière unique : ils développent la logique, la pensée latérale et la persévérance. Ce jeu s'inscrit dans la grande tradition des puzzles qui défient l'esprit sans jamais le décourager.",
        gameplay: "Analysez la situation, identifiez les patterns, et trouvez la solution optimale. Chaque puzzle a une logique interne que vous devez découvrir et exploiter pour progresser.",
        features: [
            "Puzzles soigneusement construits avec progression logique",
            "Systèmes d'indices discrets pour débloquer les situations",
            "Niveaux variés qui testent différentes compétences cognitives",
            "Satisfaction garantie à chaque résolution",
        ],
        whyPlay: "Les puzzles de ce type stimulent votre intellect et vous donnent une vraie satisfaction cognitive à chaque résolution. Un excellent exercice mental enveloppé dans un jeu plaisant.",
    },
    "Strategie": {
        intro: "Chaque décision compte. Ce jeu de stratégie met votre sens tactique à l'épreuve face à une intelligence artificielle qui ne pardonne aucune erreur.",
        about: "La stratégie est l'art de prévoir plusieurs coups à l'avance et d'adapter son plan face à l'adversaire. Ce jeu distille cette essence dans une expérience pure et exigeante.",
        gameplay: "Planifiez, anticipez, et exécutez. Chaque mouvement modifie l'état du jeu et ouvre ou ferme des possibilités. L'IA réagit à chaque décision — restez toujours un coup d'avance.",
        features: [
            "IA stratégique avec analyse approfondie",
            "Parties courtes mais intenses",
            "Développement de la pensée tactique",
            "Rejouabilité élevée grâce à des parties toujours différentes",
        ],
        whyPlay: "Ce jeu aiguise votre pensée stratégique et votre capacité à anticiper. Battre l'IA est une vraie récompense qui demande méthode et persévérance.",
    },
    "Memoire": {
        intro: "Un jeu qui met votre mémoire au défi et récompense la concentration. Chaque niveau teste un peu plus votre capacité à retenir et reproduire des informations.",
        about: "Les jeux de mémoire sont reconnus pour leurs bénéfices cognitifs : ils renforcent la mémoire de travail, améliorent l'attention et développent la capacité de concentration soutenue.",
        gameplay: "Observez, mémorisez, reproduisez. La fenêtre de mémorisation se réduit avec l'avancement, vous forçant à être de plus en plus attentif et précis.",
        features: [
            "Séquences à mémoriser de longueur croissante",
            "Feedback immédiat sur chaque réponse",
            "Entraînement progressif de la mémoire à court terme",
            "Score basé sur la précision et la vitesse",
        ],
        whyPlay: "Jouer régulièrement à des jeux de mémoire améliore mesurée des capacités cognitives. C'est un entraînement cérébral efficace et agréable.",
    },
    "Action": {
        intro: "Action, vitesse, adrénaline. Ce jeu d'action vous plonge dans un rythme effréné où réflexes et coordination sont vos meilleures armes.",
        about: "Les jeux d'action sont conçus pour créer des moments d'intensité pure. Chaque seconde compte, chaque décision doit être prise en une fraction de temps. Ce jeu pousse vos réflexes à leur limite.",
        gameplay: "Réagissez vite, bougez avec précision, et ne laissez aucune erreur vous ralentir. Le rythme augmente progressivement, demandant toujours plus de votre coordination et de votre concentration.",
        features: [
            "Action immédiate et contrôles réactifs",
            "Rythme de jeu progressif",
            "Développement des réflexes et de la coordination",
            "Sessions intenses et satisfaisantes",
        ],
        whyPlay: "Ce jeu libère l'adrénaline et développe vos réflexes dans un cadre sécurisé. Chaque session est une montée en tension qui se termine toujours trop tôt.",
    },
    "Sport": {
        intro: "La compétition sportive dans sa forme numérique la plus pure. Affrontez l'IA dans un duel de précision et de réflexes qui rend hommage aux sports réels.",
        about: "Les jeux de sport numériques capturent l'essence de la compétition : la tension du duel, la satisfaction du point marqué, et le défi constant de s'améliorer.",
        gameplay: "Maîtrisez vos contrôles, anticipez les mouvements adverses, et cherchez l'ouverture au bon moment. La précision et le timing sont vos atouts principaux.",
        features: [
            "IA compétitive avec difficulté adaptative",
            "Contrôles précis et réactifs",
            "Système de score avec conditions de victoire claires",
            "Gameplay fluide et satisfaisant",
        ],
        whyPlay: "Ce jeu de sport offre le frisson de la compétition sans quitter votre chaise. Chaque point gagné contre l'IA est une victoire méritée.",
    },
    "Casual": {
        intro: "Détendez-vous et savourez une expérience de jeu accessible et apaisante. Ce jeu casual offre plaisir et satisfaction sans pression excessive.",
        about: "Les jeux casual sont conçus pour offrir une expérience positive et inclusive. Faciles à prendre en main, ils deviennent progressivement plus engageants à mesure qu'on les maîtrise.",
        gameplay: "Prenez votre temps, visez juste, et profitez du plaisir simple mais réel de chaque action réussie. Pas de timer stressant — juste du fun à votre rythme.",
        features: [
            "Accessibilité immédiate sans courbe d'apprentissage abrupte",
            "Progression douce et satisfaisante",
            "Effets visuels et sonores gratifiants",
            "Idéal pour des sessions de jeu décontractées",
        ],
        whyPlay: "Parfait pour décompresser, ce jeu offre des moments de plaisir pur sans prise de tête. Une expérience positive et accessible pour tous les profils de joueurs.",
    },
};

export function getGameContent(game) {
    const byTitle = descriptions[game.title];
    if (byTitle) return byTitle;
    const byGenre = genreFallbacks[game.genre];
    if (byGenre) return byGenre;
    return genreFallbacks["Casual"];
}
