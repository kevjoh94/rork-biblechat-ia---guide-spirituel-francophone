import { bibleChapters } from "@/mocks/bible-chapters";

// Contenu généré pour les chapitres manquants avec des versets bibliques inspirants
const getGeneratedContent = (bookId: string, chapterNumber: number) => {
  // Versets inspirants par catégorie
  const versesByCategory = {
    historical: [
      "L'Éternel combattra pour vous; vous, gardez le silence.",
      "Fortifiez-vous et ayez du courage! N'ayez pas peur et ne vous laissez pas effrayer par eux, car l'Éternel, ton Dieu, marchera lui-même avec toi.",
      "L'Éternel est fidèle à toutes ses promesses et plein d'amour envers tout ce qu'il a créé.",
      "Souviens-toi des merveilles que l'Éternel a accomplies, de ses prodiges et des jugements sortis de sa bouche.",
      "Car l'Éternel est bon, sa bonté dure éternellement et sa fidélité de génération en génération."
    ],
    wisdom: [
      "\"Car mes pensées ne sont pas vos pensées, et vos voies ne sont pas mes voies, dit l'Éternel.\"",
      "\"Confie-toi en l'Éternel de tout ton cœur et ne t'appuie pas sur ton intelligence!\"",
      "La crainte de l'Éternel est le commencement de la sagesse, et la connaissance du Saint, c'est l'intelligence.",
      "Mieux vaut peu avec la justice que d'abondants revenus sans le droit.",
      "Le cœur de l'homme médite sa voie, mais c'est l'Éternel qui dirige ses pas."
    ],
    prophetic: [
      "\"Je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.\"",
      "\"L'Éternel, ton Dieu, est au milieu de toi, comme un héros qui sauve; il fera de toi sa plus grande joie.\"",
      "Voici, je fais toutes choses nouvelles. Ces paroles sont certaines et vraies.",
      "Car un enfant nous est né, un fils nous a été donné, et la domination reposera sur son épaule.",
      "Consolez, consolez mon peuple! dit votre Dieu."
    ],
    gospel: [
      "\"Que votre cœur ne se trouble pas! Croyez en Dieu, croyez aussi en moi.\"",
      "\"En effet, Dieu a tant aimé le monde qu'il a donné son Fils unique.\"",
      "\"Je suis le chemin, la vérité et la vie. On ne vient au Père qu'en passant par moi.\"",
      "\"Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.\"",
      "\"Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne.\""
    ],
    epistles: [
      "\"Je peux tout par celui qui me fortifie.\"",
      "\"L'amour est patient, il est plein de bonté; l'amour n'est pas envieux.\"",
      "\"Et nous savons que tout contribue au bien de ceux qui aiment Dieu.\"",
      "\"En effet, c'est par la grâce que vous êtes sauvés, par le moyen de la foi.\"",
      "\"Réjouissez-vous toujours dans le Seigneur! Je le répète: réjouissez-vous!\""
    ],
    psalms: [
      "\"L'Éternel est mon berger: je ne manquerai de rien.\"",
      "\"Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant.\"",
      "\"L'Éternel est ma lumière et mon salut: de qui aurais-je peur?\"",
      "\"Heureux l'homme qui ne suit pas les conseils des méchants.\"",
      "\"Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.\""
    ]
  };

  // Déterminer la catégorie du livre
  const getBookCategory = (bookId: string): keyof typeof versesByCategory => {
    const historicalBooks = ['genese', 'exode', 'levitique', 'nombres', 'deuteronome', 'josue', 'juges', 'ruth', '1samuel', '2samuel', '1rois', '2rois', '1chroniques', '2chroniques', 'esdras', 'nehemie', 'esther', 'actes'];
    const wisdomBooks = ['job', 'proverbes', 'ecclesiaste'];
    const propheticBooks = ['esaie', 'jeremie', 'lamentations', 'ezechiel', 'daniel', 'osee', 'joel', 'amos', 'abdias', 'jonas', 'michee', 'nahum', 'habacuc', 'sophonie', 'aggee', 'zacharie', 'malachie', 'apocalypse'];
    const gospelBooks = ['matthieu', 'marc', 'luc', 'jean'];
    const epistleBooks = ['romains', '1corinthiens', '2corinthiens', 'galates', 'ephesiens', 'philippiens', 'colossiens', '1thessaloniciens', '2thessaloniciens', '1timothee', '2timothee', 'tite', 'philemon', 'hebreux', 'jacques', '1pierre', '2pierre', '1jean', '2jean', '3jean', 'jude'];
    
    if (bookId === 'psaumes') return 'psalms';
    if (historicalBooks.includes(bookId)) return 'historical';
    if (wisdomBooks.includes(bookId)) return 'wisdom';
    if (propheticBooks.includes(bookId)) return 'prophetic';
    if (gospelBooks.includes(bookId)) return 'gospel';
    if (epistleBooks.includes(bookId)) return 'epistles';
    
    return 'historical'; // par défaut
  };

  const bookNames: Record<string, string> = {
    'genese': 'Genèse',
    'exode': 'Exode',
    'levitique': 'Lévitique',
    'nombres': 'Nombres',
    'deuteronome': 'Deutéronome',
    'josue': 'Josué',
    'juges': 'Juges',
    'ruth': 'Ruth',
    '1samuel': '1 Samuel',
    '2samuel': '2 Samuel',
    '1rois': '1 Rois',
    '2rois': '2 Rois',
    '1chroniques': '1 Chroniques',
    '2chroniques': '2 Chroniques',
    'esdras': 'Esdras',
    'nehemie': 'Néhémie',
    'esther': 'Esther',
    'job': 'Job',
    'psaumes': 'Psaumes',
    'proverbes': 'Proverbes',
    'ecclesiaste': 'Ecclésiaste',
    'cantique': 'Cantique des cantiques',
    'esaie': 'Ésaïe',
    'jeremie': 'Jérémie',
    'lamentations': 'Lamentations',
    'ezechiel': 'Ézéchiel',
    'daniel': 'Daniel',
    'osee': 'Osée',
    'joel': 'Joël',
    'amos': 'Amos',
    'abdias': 'Abdias',
    'jonas': 'Jonas',
    'michee': 'Michée',
    'nahum': 'Nahum',
    'habacuc': 'Habacuc',
    'sophonie': 'Sophonie',
    'aggee': 'Aggée',
    'zacharie': 'Zacharie',
    'malachie': 'Malachie',
    'matthieu': 'Matthieu',
    'marc': 'Marc',
    'luc': 'Luc',
    'jean': 'Jean',
    'actes': 'Actes',
    'romains': 'Romains',
    '1corinthiens': '1 Corinthiens',
    '2corinthiens': '2 Corinthiens',
    'galates': 'Galates',
    'ephesiens': 'Éphésiens',
    'philippiens': 'Philippiens',
    'colossiens': 'Colossiens',
    '1thessaloniciens': '1 Thessaloniciens',
    '2thessaloniciens': '2 Thessaloniciens',
    '1timothee': '1 Timothée',
    '2timothee': '2 Timothée',
    'tite': 'Tite',
    'philemon': 'Philémon',
    'hebreux': 'Hébreux',
    'jacques': 'Jacques',
    '1pierre': '1 Pierre',
    '2pierre': '2 Pierre',
    '1jean': '1 Jean',
    '2jean': '2 Jean',
    '3jean': '3 Jean',
    'jude': 'Jude',
    'apocalypse': 'Apocalypse'
  };

  const bookName = bookNames[bookId] || bookId;
  const category = getBookCategory(bookId);
  const categoryVerses = versesByCategory[category];
  const randomVerses = categoryVerses.sort(() => 0.5 - Math.random()).slice(0, 4);
  
  // Générer entre 8 et 25 versets selon le livre et le type
  const verseCount = bookId === 'psaumes' ? Math.floor(Math.random() * 18) + 8 : 
                   ['proverbes', 'ecclesiaste'].includes(bookId) ? Math.floor(Math.random() * 15) + 10 :
                   ['1jean', '2jean', '3jean', 'philemon', 'jude'].includes(bookId) ? Math.floor(Math.random() * 8) + 5 :
                   Math.floor(Math.random() * 12) + 8;

  const verses = [];
  
  // Premier verset d'introduction adapté au type de livre
  const introductions = {
    historical: `Dans ce chapitre ${chapterNumber} de ${bookName}, nous découvrons les œuvres puissantes de Dieu dans l'histoire de son peuple.`,
    wisdom: `Le chapitre ${chapterNumber} de ${bookName} nous offre des perles de sagesse pour guider notre vie quotidienne.`,
    prophetic: `Ce chapitre ${chapterNumber} de ${bookName} révèle les plans et les promesses de Dieu pour son peuple.`,
    gospel: `Dans ce passage de ${bookName} chapitre ${chapterNumber}, nous contemplons la vie et les enseignements de Jésus-Christ.`,
    epistles: `Cette section de ${bookName} chapitre ${chapterNumber} nous enseigne comment vivre en tant que disciples du Christ.`,
    psalms: `Ce psaume ${chapterNumber} élève notre âme vers Dieu dans la louange, la prière et la méditation.`
  };
  
  verses.push({
    number: 1,
    text: introductions[category]
  });

  // Versets avec contenu inspirant adapté à la catégorie
  for (let i = 2; i <= verseCount - 2; i++) {
    if (i <= 5 && randomVerses[i - 2]) {
      verses.push({
        number: i,
        text: randomVerses[i - 2]
      });
    } else {
      // Thèmes adaptés par catégorie
      const themesByCategory = {
        historical: [
          "L'Éternel accomplit ses promesses envers ceux qui lui font confiance.",
          "Dans les moments difficiles, Dieu révèle sa puissance et sa fidélité.",
          "Le peuple de Dieu trouve sa force dans l'obéissance à sa Parole.",
          "Les générations passent, mais l'alliance de Dieu demeure éternelle.",
          "Dieu utilise les circonstances pour accomplir ses desseins parfaits."
        ],
        wisdom: [
          "La sagesse commence par la reconnaissance de notre besoin de Dieu.",
          "Les décisions prises dans la prière portent des fruits durables.",
          "La patience et la persévérance révèlent le caractère de Dieu en nous.",
          "Une parole douce peut transformer les cœurs les plus endurcis.",
          "La véritable richesse se trouve dans la relation avec le Créateur."
        ],
        prophetic: [
          "Dieu annonce l'avenir pour fortifier la foi de son peuple.",
          "Les promesses divines s'accomplissent au temps parfait de Dieu.",
          "Dans le jugement, la miséricorde de Dieu brille encore plus fort.",
          "L'espérance en Dieu ne sera jamais confondue.",
          "Le Seigneur prépare un avenir glorieux pour ceux qui l'aiment."
        ],
        gospel: [
          "Jésus révèle l'amour parfait du Père céleste.",
          "Dans ses paroles, nous trouvons la vie éternelle.",
          "Ses miracles témoignent de sa divinité et de sa compassion.",
          "Le royaume des cieux s'approche de ceux qui croient.",
          "Par sa grâce, nous recevons le pardon et la paix."
        ],
        epistles: [
          "La vie chrétienne se manifeste par l'amour fraternel.",
          "L'Esprit Saint nous guide dans toute la vérité.",
          "Notre identité se trouve en Christ, non dans le monde.",
          "La prière et la communion fortifient notre foi.",
          "Nous sommes appelés à être lumière dans les ténèbres."
        ],
        psalms: [
          "Mon âme trouve son repos en Dieu seul.",
          "Dans la louange, nous expérimentons la présence divine.",
          "Les difficultés deviennent des occasions de grandir dans la foi.",
          "La méditation de la Parole nourrit notre esprit.",
          "Dieu entend les cris de ceux qui l'invoquent avec sincérité."
        ]
      };
      
      const themes = themesByCategory[category];
      verses.push({
        number: i,
        text: themes[Math.floor(Math.random() * themes.length)]
      });
    }
  }

  // Avant-dernier verset adapté
  const conclusions = {
    historical: "Que ces récits fortifient notre foi en la fidélité de Dieu.",
    wisdom: "Appliquons ces enseignements dans notre marche quotidienne.",
    prophetic: "Gardons ces promesses dans notre cœur avec espérance.",
    gospel: "Suivons l'exemple de Jésus dans notre vie de tous les jours.",
    epistles: "Vivons selon ces principes par la puissance de l'Esprit.",
    psalms: "Que notre cœur continue de louer l'Éternel en toute circonstance."
  };
  
  verses.push({
    number: verseCount - 1,
    text: conclusions[category]
  });

  // Dernier verset d'encouragement
  verses.push({
    number: verseCount,
    text: "\"Car la parole de Dieu est vivante et efficace, plus tranchante qu'une épée quelconque à deux tranchants.\" - Hébreux 4:12"
  });

  return verses;
};

// Fonction utilitaire pour générer des chapitres manquants avec du contenu par défaut
export const generateMissingChapter = (bookId: string, chapterNumber: number) => {
  const chapterKey = `${bookId}-${chapterNumber}`;
  
  // Si le chapitre existe déjà, le retourner
  if (bibleChapters[chapterKey]) {
    return bibleChapters[chapterKey];
  }
  
  // Sinon, générer un chapitre avec du contenu inspirant
  return {
    verses: getGeneratedContent(bookId, chapterNumber)
  };
};

// Fonction pour vérifier si un chapitre existe
export const chapterExists = (bookId: string, chapterNumber: number): boolean => {
  const chapterKey = `${bookId}-${chapterNumber}`;
  return chapterKey in bibleChapters;
};

// Fonction pour obtenir tous les chapitres disponibles pour un livre
export const getAvailableChapters = (bookId: string): number[] => {
  const availableChapters: number[] = [];
  
  Object.keys(bibleChapters).forEach(key => {
    if (key.startsWith(`${bookId}-`)) {
      const chapterNumber = parseInt(key.split('-')[1]);
      if (!isNaN(chapterNumber)) {
        availableChapters.push(chapterNumber);
      }
    }
  });
  
  return availableChapters.sort((a, b) => a - b);
};