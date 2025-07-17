export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  verses: BibleVerse[];
}

export const bibleChapters: Record<string, BibleChapter> = {
  // GENÈSE
  "genese-1": {
    verses: [
      {
        number: 1,
        text: "Au commencement, Dieu créa le ciel et la terre."
      },
      {
        number: 2,
        text: "La terre n'était que chaos et vide. Il y avait des ténèbres à la surface de l'abîme et l'Esprit de Dieu planait au-dessus de l'eau."
      },
      {
        number: 3,
        text: "Dieu dit: «Qu'il y ait de la lumière!» et il y eut de la lumière."
      },
      {
        number: 4,
        text: "Dieu vit que la lumière était bonne, et il sépara la lumière des ténèbres."
      },
      {
        number: 5,
        text: "Dieu appela la lumière jour, et les ténèbres nuit. Il y eut un soir, puis un matin. Ce fut le premier jour."
      },
      {
        number: 6,
        text: "Dieu dit: «Qu'il y ait une étendue entre les eaux pour les séparer les unes des autres!»"
      },
      {
        number: 7,
        text: "Dieu fit l'étendue et sépara ainsi l'eau qui est au-dessous de l'étendue de celle qui est au-dessus. Cela se passa ainsi."
      },
      {
        number: 8,
        text: "Dieu appela l'étendue ciel. Il y eut un soir, puis un matin. Ce fut le deuxième jour."
      },
      {
        number: 9,
        text: "Dieu dit: «Que les eaux qui sont au-dessous du ciel se rassemblent à un seul endroit et que le sec apparaisse!» Cela se passa ainsi."
      },
      {
        number: 10,
        text: "Dieu appela le sec terre, et la masse des eaux mers. Dieu vit que c'était bon."
      },
      {
        number: 11,
        text: "Puis Dieu dit: «Que la terre produise de la verdure, de l'herbe à graine, des arbres fruitiers qui donnent du fruit selon leur espèce et qui portent leur semence sur la terre!» Et cela se passa ainsi."
      },
      {
        number: 12,
        text: "La terre produisit de la verdure, de l'herbe à graine selon son espèce, et des arbres qui donnent du fruit et portent leur semence selon leur espèce. Dieu vit que c'était bon."
      },
      {
        number: 13,
        text: "Il y eut un soir, puis un matin. Ce fut le troisième jour."
      },
      {
        number: 14,
        text: "Dieu dit: «Qu'il y ait des luminaires dans l'étendue du ciel pour séparer le jour de la nuit! Ils serviront de signes pour marquer les époques, les jours et les années,"
      },
      {
        number: 15,
        text: "ainsi que de luminaires dans l'étendue du ciel pour éclairer la terre!» Et cela se passa ainsi."
      },
      {
        number: 16,
        text: "Dieu fit les deux grands luminaires, le plus grand pour présider au jour et le plus petit pour présider à la nuit. Il fit aussi les étoiles."
      },
      {
        number: 17,
        text: "Dieu les plaça dans l'étendue du ciel pour éclairer la terre,"
      },
      {
        number: 18,
        text: "pour présider au jour et à la nuit, et pour séparer la lumière des ténèbres. Dieu vit que c'était bon."
      },
      {
        number: 19,
        text: "Il y eut un soir, puis un matin. Ce fut le quatrième jour."
      },
      {
        number: 20,
        text: "Dieu dit: «Que l'eau pullule d'animaux vivants et que des oiseaux volent dans le ciel au-dessus de la terre!»"
      },
      {
        number: 21,
        text: "Dieu créa les grands poissons et tous les animaux vivants capables de se mouvoir: l'eau en pullula selon leur espèce. Il créa aussi tous les oiseaux selon leur espèce. Dieu vit que c'était bon."
      },
      {
        number: 22,
        text: "Dieu les bénit en disant: «Reproduisez-vous, devenez nombreux et remplissez les mers, et que les oiseaux se multiplient sur la terre!»"
      },
      {
        number: 23,
        text: "Il y eut un soir, puis un matin. Ce fut le cinquième jour."
      },
      {
        number: 24,
        text: "Dieu dit: «Que la terre produise des animaux vivants selon leur espèce: du bétail, des reptiles et des animaux terrestres selon leur espèce!» Et cela se passa ainsi."
      },
      {
        number: 25,
        text: "Dieu fit les animaux terrestres selon leur espèce, le bétail selon son espèce et tous les reptiles de la terre selon leur espèce. Dieu vit que c'était bon."
      },
      {
        number: 26,
        text: "Puis Dieu dit: «Faisons l'homme à notre image, à notre ressemblance! Qu'il domine sur les poissons de la mer, sur les oiseaux du ciel, sur le bétail, sur toute la terre et sur tous les reptiles qui rampent sur la terre!»"
      },
      {
        number: 27,
        text: "Dieu créa l'homme à son image, il le créa à l'image de Dieu. Il créa l'homme et la femme."
      },
      {
        number: 28,
        text: "Dieu les bénit et leur dit: «Reproduisez-vous, devenez nombreux, remplissez la terre et soumettez-la! Dominez sur les poissons de la mer, sur les oiseaux du ciel et sur tout animal qui se déplace sur la terre!»"
      },
      {
        number: 29,
        text: "Dieu dit aussi: «Je vous donne toute herbe à graine sur toute la surface de la terre, ainsi que tout arbre portant des fruits avec pépins ou noyau: ce sera votre nourriture."
      },
      {
        number: 30,
        text: "A tout animal de la terre, à tout oiseau du ciel et à tout ce qui se déplace sur la terre et qui possède le souffle de vie, je donne toute herbe verte pour nourriture.» Et cela se passa ainsi."
      },
      {
        number: 31,
        text: "Dieu regarda tout ce qu'il avait fait, et il constata que c'était très bon. Il y eut un soir, puis un matin. Ce fut le sixième jour."
      }
    ]
  },
  "genese-2": {
    verses: [
      {
        number: 1,
        text: "C'est ainsi que furent terminés le ciel et la terre et toute leur armée."
      },
      {
        number: 2,
        text: "Le septième jour, Dieu mit un terme à son travail de création. Il se reposa de toute son activité le septième jour."
      },
      {
        number: 3,
        text: "Dieu bénit le septième jour et en fit un jour saint, parce que ce jour-là il se reposa de toute son activité, de tout ce qu'il avait créé."
      },
      {
        number: 4,
        text: "Telle est l'histoire du ciel et de la terre quand ils furent créés. Lorsque l'Éternel Dieu fit la terre et le ciel,"
      },
      {
        number: 5,
        text: "il n'y avait encore aucun arbuste des champs sur la terre et aucune herbe des champs ne poussait encore, car l'Éternel Dieu n'avait pas fait pleuvoir sur la terre et il n'y avait pas d'homme pour cultiver le sol."
      },
      {
        number: 6,
        text: "Cependant, une vapeur montait de la terre et arrosait toute la surface du sol."
      },
      {
        number: 7,
        text: "L'Éternel Dieu façonna l'homme avec la poussière de la terre. Il insuffla un souffle de vie dans ses narines et l'homme devint un être vivant."
      },
      {
        number: 8,
        text: "L'Éternel Dieu planta un jardin en Éden, du côté de l'orient, et il y mit l'homme qu'il avait façonné."
      },
      {
        number: 9,
        text: "L'Éternel Dieu fit pousser du sol des arbres de toute sorte, agréables à voir et porteurs de fruits bons à manger. Il fit pousser l'arbre de la vie au milieu du jardin, ainsi que l'arbre de la connaissance du bien et du mal."
      },
      {
        number: 15,
        text: "L'Éternel Dieu prit l'homme et le plaça dans le jardin d'Éden pour qu'il le cultive et le garde."
      },
      {
        number: 16,
        text: "L'Éternel Dieu donna cet ordre à l'homme: «Tu pourras manger les fruits de tous les arbres du jardin,"
      },
      {
        number: 17,
        text: "mais tu ne mangeras pas le fruit de l'arbre de la connaissance du bien et du mal, car le jour où tu en mangeras, tu mourras, c'est certain.»"
      }
    ]
  },
  "genese-3": {
    verses: [
      {
        number: 1,
        text: "Le serpent était le plus rusé de tous les animaux sauvages que l'Éternel Dieu avait faits. Il dit à la femme: «Dieu a-t-il vraiment dit: 'Vous ne mangerez aucun des fruits des arbres du jardin'?»"
      },
      {
        number: 2,
        text: "La femme répondit au serpent: «Nous mangeons du fruit des arbres du jardin."
      },
      {
        number: 3,
        text: "Cependant, en ce qui concerne le fruit de l'arbre qui est au milieu du jardin, Dieu a dit: 'Vous n'en mangerez pas et vous n'y toucherez pas, sinon vous mourrez.'»"
      },
      {
        number: 4,
        text: "Le serpent dit à la femme: «Vous ne mourrez absolument pas,"
      },
      {
        number: 5,
        text: "mais Dieu sait que, le jour où vous en mangerez, vos yeux s'ouvriront et vous serez comme Dieu: vous connaîtrez le bien et le mal.»"
      },
      {
        number: 6,
        text: "La femme vit que l'arbre était porteur de fruits bons à manger, agréable à regarder et précieux pour ouvrir l'intelligence. Elle prit de son fruit et en mangea. Elle en donna aussi à son mari qui était avec elle et il en mangea."
      },
      {
        number: 15,
        text: "Je mettrai l'hostilité entre toi et la femme, entre ta descendance et sa descendance: celle-ci t'écrasera la tête et tu lui blesseras le talon.»"
      }
    ]
  },

  // EXODE
  "exode-3": {
    verses: [
      {
        number: 1,
        text: "Moïse faisait paître le troupeau de son beau-père Jéthro, prêtre de Madian. Il mena le troupeau derrière le désert et vint à la montagne de Dieu, à Horeb."
      },
      {
        number: 2,
        text: "L'ange de l'Éternel lui apparut dans une flamme de feu, au milieu d'un buisson. Moïse regarda et vit que le buisson était tout en feu sans être consumé."
      },
      {
        number: 3,
        text: "Moïse dit: «Je veux faire un détour pour voir ce grand spectacle: pourquoi le buisson ne brûle-t-il pas?»"
      },
      {
        number: 4,
        text: "L'Éternel vit qu'il faisait un détour pour regarder. Alors Dieu l'appela du milieu du buisson. Il dit: «Moïse! Moïse!» Il répondit: «Me voici!»"
      },
      {
        number: 5,
        text: "Dieu dit: «N'approche pas d'ici, retire tes sandales, car l'endroit où tu te tiens est une terre sainte.»"
      },
      {
        number: 6,
        text: "Il ajouta: «Je suis le Dieu de ton père, le Dieu d'Abraham, le Dieu d'Isaac et le Dieu de Jacob.» Moïse se cacha le visage, car il avait peur de regarder Dieu."
      },
      {
        number: 14,
        text: "Dieu dit à Moïse: «Je suis celui qui suis.» Et il ajouta: «Voici ce que tu diras aux Israélites: 'Celui qui s'appelle 'je suis' m'a envoyé vers vous.'»"
      }
    ]
  },
  "exode-20": {
    verses: [
      {
        number: 1,
        text: "Alors Dieu prononça toutes ces paroles:"
      },
      {
        number: 2,
        text: "«Je suis l'Éternel, ton Dieu, qui t'ai fait sortir d'Égypte, de la maison d'esclavage."
      },
      {
        number: 3,
        text: "Tu n'auras pas d'autres dieux devant moi."
      },
      {
        number: 4,
        text: "Tu ne te feras pas de sculpture sacrée ni de représentation de ce qui est en haut dans le ciel, en bas sur la terre et dans l'eau plus bas que la terre."
      },
      {
        number: 7,
        text: "Tu n'utiliseras pas le nom de l'Éternel, ton Dieu, à la légère, car l'Éternel ne laissera pas impuni celui qui utilisera son nom à la légère."
      },
      {
        number: 8,
        text: "Souviens-toi de faire du jour du sabbat un jour saint."
      },
      {
        number: 12,
        text: "Honore ton père et ta mère afin de vivre longtemps dans le pays que l'Éternel, ton Dieu, te donne."
      },
      {
        number: 13,
        text: "Tu ne commettras pas de meurtre."
      },
      {
        number: 14,
        text: "Tu ne commettras pas d'adultère."
      },
      {
        number: 15,
        text: "Tu ne commettras pas de vol."
      },
      {
        number: 16,
        text: "Tu ne porteras pas de faux témoignage contre ton prochain."
      },
      {
        number: 17,
        text: "Tu ne convoiteras pas la maison de ton prochain; tu ne convoiteras pas la femme de ton prochain, ni son esclave, ni sa servante, ni son bœuf, ni son âne, ni rien de ce qui lui appartient.»"
      }
    ]
  },

  // PSAUMES
  "psaumes-1": {
    verses: [
      {
        number: 1,
        text: "Heureux l'homme qui ne suit pas les conseils des méchants, qui ne s'arrête pas sur la voie des pécheurs et ne s'assied pas en compagnie des moqueurs,"
      },
      {
        number: 2,
        text: "mais qui trouve son plaisir dans la loi de l'Éternel et la médite jour et nuit!"
      },
      {
        number: 3,
        text: "Il ressemble à un arbre planté près d'un cours d'eau: il donne son fruit en sa saison, et son feuillage ne se flétrit pas. Tout ce qu'il fait lui réussit."
      },
      {
        number: 4,
        text: "Ce n'est pas le cas des méchants: ils sont comme la paille que le vent disperse."
      },
      {
        number: 5,
        text: "C'est pourquoi les méchants ne résistent pas lors du jugement, ni les pécheurs dans l'assemblée des justes."
      },
      {
        number: 6,
        text: "En effet, l'Éternel connaît la voie des justes, mais la voie des méchants mène à la ruine."
      }
    ]
  },
  "psaumes-23": {
    verses: [
      {
        number: 1,
        text: "L'Éternel est mon berger: je ne manquerai de rien."
      },
      {
        number: 2,
        text: "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles."
      },
      {
        number: 3,
        text: "Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom."
      },
      {
        number: 4,
        text: "Même quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent."
      },
      {
        number: 5,
        text: "Tu dresses devant moi une table, en face de mes adversaires; tu oins d'huile ma tête, et ma coupe déborde."
      },
      {
        number: 6,
        text: "Oui, le bonheur et la grâce m'accompagneront tous les jours de ma vie, et j'habiterai dans la maison de l'Éternel jusqu'à la fin de mes jours."
      }
    ]
  },
  "psaumes-91": {
    verses: [
      {
        number: 1,
        text: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant."
      },
      {
        number: 2,
        text: "Je dis à l'Éternel: «Tu es mon refuge et ma forteresse, mon Dieu en qui je me confie!»"
      },
      {
        number: 3,
        text: "Oui, c'est lui qui te délivre du piège de l'oiseleur, de la peste et de ses ravages."
      },
      {
        number: 4,
        text: "Il te couvrira de ses ailes, et tu trouveras un refuge sous ses plumes. Sa fidélité est un bouclier et une cuirasse."
      },
      {
        number: 5,
        text: "Tu n'auras à redouter ni les terreurs de la nuit, ni la flèche qui vole durant le jour,"
      },
      {
        number: 11,
        text: "car il ordonnera à ses anges de te garder dans toutes tes voies."
      },
      {
        number: 12,
        text: "Ils te porteront sur les mains, de peur que ton pied ne heurte contre une pierre."
      }
    ]
  },
  "psaumes-139": {
    verses: [
      {
        number: 1,
        text: "Éternel, tu me sondes et tu me connais."
      },
      {
        number: 2,
        text: "Tu sais quand je m'assieds et quand je me lève, tu discernes de loin ma pensée."
      },
      {
        number: 3,
        text: "Tu sais quand je marche et quand je me couche, tu es familier avec toutes mes voies."
      },
      {
        number: 4,
        text: "La parole n'est pas encore sur ma langue que déjà, Éternel, tu la connais entièrement."
      },
      {
        number: 13,
        text: "C'est toi qui as formé mes reins, qui m'as tissé dans le ventre de ma mère."
      },
      {
        number: 14,
        text: "Je te loue de ce que je suis une créature si merveilleuse. Tes œuvres sont admirables, et je le reconnais bien."
      },
      {
        number: 23,
        text: "Sonde-moi, ô Dieu, et connais mon cœur! Éprouve-moi, et connais mes pensées!"
      },
      {
        number: 24,
        text: "Regarde si je suis sur une mauvaise voie, et conduis-moi sur la voie de l'éternité!"
      }
    ]
  },

  // PROVERBES
  "proverbes-3": {
    verses: [
      {
        number: 1,
        text: "Mon fils, n'oublie pas mon enseignement et que ton cœur garde mes commandements,"
      },
      {
        number: 2,
        text: "car ils prolongeront les jours et les années de ta vie, et ils augmenteront ta paix."
      },
      {
        number: 3,
        text: "Que la bonté et la fidélité ne t'abandonnent pas! Attache-les à ton cou, écris-les sur la table de ton cœur."
      },
      {
        number: 4,
        text: "Tu obtiendras ainsi la faveur et une bonne réputation aux yeux de Dieu et des hommes."
      },
      {
        number: 5,
        text: "Confie-toi en l'Éternel de tout ton cœur et ne t'appuie pas sur ton intelligence!"
      },
      {
        number: 6,
        text: "Reconnais-le dans toutes tes voies, et il rendra tes sentiers droits."
      },
      {
        number: 7,
        text: "Ne sois pas sage à tes propres yeux, crains l'Éternel et détourne-toi du mal:"
      },
      {
        number: 8,
        text: "cela apportera la guérison à ton corps et un rafraîchissement à tes os."
      }
    ]
  },

  // ÉSAÏE
  "esaie-40": {
    verses: [
      {
        number: 1,
        text: "«Consolez, consolez mon peuple!» dit votre Dieu."
      },
      {
        number: 28,
        text: "Ne le sais-tu pas? Ne l'as-tu pas appris? C'est le Dieu d'éternité, l'Éternel, qui a créé les extrémités de la terre. Il ne se fatigue pas, il ne s'épuise pas. Son intelligence est impénétrable."
      },
      {
        number: 29,
        text: "Il donne de la force à celui qui est fatigué et il augmente la vigueur de celui qui tombe de faiblesse."
      },
      {
        number: 30,
        text: "Les adolescents se fatiguent et s'épuisent, les jeunes hommes chancellent,"
      },
      {
        number: 31,
        text: "mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent leur envol comme les aigles. Ils courent sans se fatiguer, ils marchent sans s'épuiser."
      }
    ]
  },
  "esaie-53": {
    verses: [
      {
        number: 3,
        text: "Méprisé et délaissé par les hommes, homme de douleur, habitué à la souffrance, il était pareil à celui face auquel on détourne la tête. Nous l'avons méprisé, nous n'avons fait aucun cas de lui."
      },
      {
        number: 4,
        text: "Pourtant, ce sont nos souffrances qu'il a portées, c'est de nos douleurs qu'il s'est chargé. Et nous, nous l'avons considéré comme puni, frappé par Dieu et humilié."
      },
      {
        number: 5,
        text: "Mais lui, il était blessé à cause de nos transgressions, brisé à cause de nos fautes: la punition qui nous donne la paix est tombée sur lui, et c'est par ses blessures que nous sommes guéris."
      },
      {
        number: 6,
        text: "Nous étions tous errants comme des brebis, chacun suivait sa propre voie, et l'Éternel a fait retomber sur lui nos fautes à tous."
      }
    ]
  },

  // MATTHIEU
  "matthieu-5": {
    verses: [
      {
        number: 1,
        text: "A la vue de ces foules, Jésus monta sur la montagne. Il s'assit, ses disciples s'approchèrent de lui,"
      },
      {
        number: 2,
        text: "et il prit la parole pour les enseigner; il dit:"
      },
      {
        number: 3,
        text: "«Heureux ceux qui reconnaissent leur pauvreté spirituelle, car le royaume des cieux leur appartient!"
      },
      {
        number: 4,
        text: "Heureux ceux qui pleurent, car ils seront consolés!"
      },
      {
        number: 5,
        text: "Heureux ceux qui sont doux, car ils hériteront la terre!"
      },
      {
        number: 6,
        text: "Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés!"
      },
      {
        number: 7,
        text: "Heureux ceux qui font preuve de compassion, car on aura de la compassion pour eux!"
      },
      {
        number: 8,
        text: "Heureux ceux qui ont le cœur pur, car ils verront Dieu!"
      },
      {
        number: 9,
        text: "Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu!"
      },
      {
        number: 14,
        text: "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut pas être cachée,"
      },
      {
        number: 16,
        text: "Que votre lumière brille ainsi devant les hommes, afin qu'ils voient vos belles œuvres et qu'ils glorifient votre Père céleste."
      }
    ]
  },
  "matthieu-6": {
    verses: [
      {
        number: 9,
        text: "Voici donc comment vous devez prier: 'Notre Père céleste! Que la sainteté de ton nom soit respectée,"
      },
      {
        number: 10,
        text: "que ton règne vienne, que ta volonté soit faite sur la terre comme au ciel."
      },
      {
        number: 11,
        text: "Donne-nous aujourd'hui notre pain quotidien,"
      },
      {
        number: 12,
        text: "pardonne-nous nos offenses, comme nous aussi nous pardonnons à ceux qui nous ont offensés,"
      },
      {
        number: 13,
        text: "ne nous expose pas à la tentation, mais délivre-nous du mal, [car c'est à toi qu'appartiennent, dans tous les siècles, le règne, la puissance et la gloire. Amen!]'"
      },
      {
        number: 25,
        text: "C'est pourquoi je vous dis: Ne vous inquiétez pas pour votre vie de ce que vous mangerez [ou boirez], ni pour votre corps de quoi vous serez habillés. La vie n'est-elle pas plus que la nourriture et le corps plus que le vêtement?"
      },
      {
        number: 26,
        text: "Regardez les oiseaux du ciel: ils ne sèment pas et ne moissonnent pas, ils n'amassent rien dans des greniers, et votre Père céleste les nourrit. Ne valez-vous pas beaucoup plus qu'eux?"
      },
      {
        number: 33,
        text: "Recherchez d'abord le royaume et la justice de Dieu, et tout cela vous sera donné en plus."
      },
      {
        number: 34,
        text: "Ne vous inquiétez donc pas du lendemain, car le lendemain aura ses inquiétudes. A chaque jour suffit sa peine."
      }
    ]
  },
  "matthieu-11": {
    verses: [
      {
        number: 28,
        text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos."
      },
      {
        number: 29,
        text: "Acceptez mes exigences et laissez-vous instruire par moi, car je suis doux et humble de cœur, et vous trouverez le repos pour votre âme."
      },
      {
        number: 30,
        text: "En effet, mes exigences sont bonnes et mon fardeau léger.»"
      }
    ]
  },

  // MARC
  "marc-12": {
    verses: [
      {
        number: 28,
        text: "Un des spécialistes de la loi, qui les avait entendus discuter, s'approcha. Voyant que Jésus avait bien répondu aux sadducéens, il lui demanda: «Quel est le premier de tous les commandements?»"
      },
      {
        number: 29,
        text: "Jésus répondit: «Voici le premier: Écoute, Israël, le Seigneur, notre Dieu, est l'unique Seigneur,"
      },
      {
        number: 30,
        text: "et tu aimeras le Seigneur, ton Dieu, de tout ton cœur, de toute ton âme, de toute ta pensée et de toute ta force."
      },
      {
        number: 31,
        text: "Voici le deuxième: Tu aimeras ton prochain comme toi-même. Il n'y a pas d'autre commandement plus grand que ceux-là.»"
      }
    ]
  },

  // LUC
  "luc-15": {
    verses: [
      {
        number: 11,
        text: "Il dit encore: «Un homme avait deux fils."
      },
      {
        number: 20,
        text: "Il se leva donc et alla vers son père. Comme il était encore loin, son père le vit et fut rempli de compassion. Il courut se jeter à son cou et l'embrassa."
      },
      {
        number: 21,
        text: "Le fils lui dit: 'Père, j'ai péché contre le ciel et contre toi, je ne suis plus digne d'être appelé ton fils.'"
      },
      {
        number: 22,
        text: "Mais le père dit à ses serviteurs: 'Vite, apportez le plus beau vêtement et mettez-le-lui; passez-lui une bague au doigt et mettez-lui des sandales aux pieds."
      },
      {
        number: 23,
        text: "Amenez le veau qu'on a engraissé et tuez-le. Mangeons et réjouissons-nous,"
      },
      {
        number: 24,
        text: "car mon fils que voici était mort et il est revenu à la vie, il était perdu et il est retrouvé.' Et ils commencèrent à se réjouir."
      }
    ]
  },

  // JEAN
  "jean-1": {
    verses: [
      {
        number: 1,
        text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu."
      },
      {
        number: 2,
        text: "Elle était au commencement avec Dieu."
      },
      {
        number: 3,
        text: "Tout a été fait par elle, et rien de ce qui a été fait n'a été fait sans elle."
      },
      {
        number: 4,
        text: "En elle était la vie, et la vie était la lumière des hommes."
      },
      {
        number: 5,
        text: "La lumière brille dans les ténèbres, et les ténèbres ne l'ont point reçue."
      },
      {
        number: 14,
        text: "Et la Parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père."
      }
    ]
  },
  "jean-3": {
    verses: [
      {
        number: 1,
        text: "Il y avait parmi les pharisiens un homme du nom de Nicodème, un chef des Juifs."
      },
      {
        number: 2,
        text: "Il vint de nuit trouver Jésus et lui dit: «Maître, nous savons que tu es un enseignant envoyé par Dieu, car personne ne peut faire ces signes miraculeux que tu fais si Dieu n'est pas avec lui.»"
      },
      {
        number: 3,
        text: "Jésus lui répondit: «En vérité, en vérité, je te le dis, à moins de naître de nouveau, personne ne peut voir le royaume de Dieu.»"
      },
      {
        number: 16,
        text: "En effet, Dieu a tant aimé le monde qu'il a donné son Fils unique afin que quiconque croit en lui ne périsse pas mais ait la vie éternelle."
      },
      {
        number: 17,
        text: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour juger le monde, mais pour que le monde soit sauvé par lui."
      },
      {
        number: 18,
        text: "Celui qui croit en lui n'est pas jugé, mais celui qui ne croit pas est déjà jugé parce qu'il n'a pas cru au nom du Fils unique de Dieu."
      }
    ]
  },
  "jean-14": {
    verses: [
      {
        number: 1,
        text: "«Que votre cœur ne se trouble pas! Croyez en Dieu, croyez aussi en moi."
      },
      {
        number: 2,
        text: "Il y a beaucoup de demeures dans la maison de mon Père. Si ce n'était pas le cas, je vous l'aurais dit. Je vais vous préparer une place."
      },
      {
        number: 3,
        text: "Lorsque je serai parti et que je vous aurai préparé une place, je reviendrai et je vous prendrai avec moi afin que, là où je suis, vous y soyez aussi."
      },
      {
        number: 6,
        text: "Jésus lui dit: «C'est moi qui suis le chemin, la vérité et la vie. On ne vient au Père qu'en passant par moi."
      },
      {
        number: 27,
        text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble pas et ne s'alarme pas."
      }
    ]
  },

  // ACTES
  "actes-2": {
    verses: [
      {
        number: 1,
        text: "Le jour de la Pentecôte, ils étaient tous ensemble dans le même lieu."
      },
      {
        number: 2,
        text: "Tout à coup, il vint du ciel un bruit comme celui d'un vent violent qui souffle, et il remplit toute la maison où ils étaient assis."
      },
      {
        number: 3,
        text: "Des langues qui semblaient de feu leur apparurent, séparées les unes des autres, et elles se posèrent sur chacun d'eux."
      },
      {
        number: 4,
        text: "Ils furent tous remplis du Saint-Esprit et se mirent à parler en d'autres langues, selon que l'Esprit leur donnait de s'exprimer."
      }
    ]
  },

  // ROMAINS
  "romains-3": {
    verses: [
      {
        number: 23,
        text: "car tous ont péché et sont privés de la gloire de Dieu,"
      },
      {
        number: 24,
        text: "et ils sont gratuitement déclarés justes par sa grâce, par le moyen de la libération qui se trouve en Jésus-Christ."
      }
    ]
  },
  "romains-5": {
    verses: [
      {
        number: 1,
        text: "Ainsi donc, déclarés justes sur la base de la foi, nous avons la paix avec Dieu par l'intermédiaire de notre Seigneur Jésus-Christ."
      },
      {
        number: 8,
        text: "Mais voici comment Dieu prouve son amour envers nous: alors que nous étions encore des pécheurs, Christ est mort pour nous."
      }
    ]
  },
  "romains-8": {
    verses: [
      {
        number: 1,
        text: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ, [qui ne vivent pas selon leur nature propre mais selon l'Esprit]."
      },
      {
        number: 28,
        text: "Du reste, nous savons que tout contribue au bien de ceux qui aiment Dieu, de ceux qui sont appelés conformément à son plan."
      },
      {
        number: 31,
        text: "Que dirons-nous donc de plus? Si Dieu est pour nous, qui sera contre nous?"
      },
      {
        number: 32,
        text: "Lui qui n'a pas épargné son propre Fils mais l'a donné pour nous tous, comment ne nous accorderait-il pas aussi tout avec lui?"
      },
      {
        number: 38,
        text: "En effet, j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni le présent ni l'avenir, ni les puissances,"
      },
      {
        number: 39,
        text: "ni la hauteur ni la profondeur, ni aucune autre créature ne pourra nous séparer de l'amour de Dieu manifesté en Jésus-Christ notre Seigneur."
      }
    ]
  },

  // 1 CORINTHIENS
  "1corinthiens-13": {
    verses: [
      {
        number: 1,
        text: "Si je parle les langues des hommes, et même celles des anges, mais que je n'aie pas l'amour, je suis un cuivre qui résonne ou une cymbale qui retentit."
      },
      {
        number: 4,
        text: "L'amour est patient, il est plein de bonté; l'amour n'est pas envieux; l'amour ne se vante pas, il ne s'enfle pas d'orgueil,"
      },
      {
        number: 5,
        text: "il ne fait rien de malhonnête, il ne cherche pas son intérêt, il ne s'irrite pas, il ne soupçonne pas le mal,"
      },
      {
        number: 6,
        text: "il ne se réjouit pas de l'injustice, mais il se réjouit de la vérité;"
      },
      {
        number: 7,
        text: "il excuse tout, il croit tout, il espère tout, il supporte tout."
      },
      {
        number: 8,
        text: "L'amour ne disparaît jamais. Les prophéties prendront fin, les langues cesseront, la connaissance disparaîtra."
      },
      {
        number: 13,
        text: "Maintenant donc ces trois choses demeurent: la foi, l'espérance, l'amour; mais la plus grande de ces choses, c'est l'amour."
      }
    ]
  },

  // GALATES
  "galates-5": {
    verses: [
      {
        number: 22,
        text: "Mais le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bienveillance, la foi, la douceur, la maîtrise de soi."
      },
      {
        number: 23,
        text: "Contre de telles choses, il n'y a pas de loi."
      }
    ]
  },

  // ÉPHÉSIENS
  "ephesiens-2": {
    verses: [
      {
        number: 8,
        text: "En effet, c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu."
      },
      {
        number: 9,
        text: "Ce n'est pas par les œuvres, afin que personne ne puisse se vanter."
      },
      {
        number: 10,
        text: "En réalité, c'est lui qui nous a faits; nous avons été créés en Jésus-Christ pour des œuvres bonnes que Dieu a préparées d'avance afin que nous les pratiquions."
      }
    ]
  },

  // PHILIPPIENS
  "philippiens-4": {
    verses: [
      {
        number: 4,
        text: "Réjouissez-vous toujours dans le Seigneur! Je le répète: réjouissez-vous!"
      },
      {
        number: 6,
        text: "Ne vous inquiétez de rien, mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, dans un esprit de reconnaissance."
      },
      {
        number: 7,
        text: "Et la paix de Dieu, qui dépasse tout ce qu'on peut comprendre, gardera votre cœur et vos pensées en Jésus-Christ."
      },
      {
        number: 13,
        text: "Je peux tout par celui qui me fortifie."
      },
      {
        number: 19,
        text: "Et mon Dieu pourvoira à tous vos besoins conformément à sa richesse, avec gloire, en Jésus-Christ."
      }
    ]
  },

  // APOCALYPSE
  "apocalypse-21": {
    verses: [
      {
        number: 1,
        text: "Puis je vis un nouveau ciel et une nouvelle terre, car le premier ciel et la première terre avaient disparu et la mer n'existait plus."
      },
      {
        number: 2,
        text: "Je vis descendre du ciel, d'auprès de Dieu, la ville sainte, la nouvelle Jérusalem, préparée comme une épouse qui s'est faite belle pour son époux."
      },
      {
        number: 3,
        text: "J'entendis une voix forte venant du ciel qui disait: «Voici le tabernacle de Dieu parmi les hommes! Il habitera avec eux, ils seront son peuple et Dieu lui-même sera avec eux, [il sera leur Dieu]."
      },
      {
        number: 4,
        text: "Il essuiera toute larme de leurs yeux, la mort ne sera plus et il n'y aura plus ni deuil, ni cri, ni douleur, car ce qui existait avant a disparu.»"
      }
    ]
  },

  // GENÈSE - Chapitres supplémentaires
  "genese-4": {
    verses: [
      {
        number: 1,
        text: "Adam eut des relations avec sa femme Ève. Elle tomba enceinte et mit au monde Caïn. Elle dit: «J'ai donné vie à un homme avec l'aide de l'Éternel.»"
      },
      {
        number: 2,
        text: "Elle mit encore au monde le frère de Caïn, Abel. Abel fut berger et Caïn fut cultivateur."
      },
      {
        number: 3,
        text: "Au bout de quelque temps, Caïn fit une offrande des produits de la terre à l'Éternel."
      },
      {
        number: 4,
        text: "De son côté, Abel en fit une des premiers-nés de son troupeau et de leur graisse. L'Éternel porta un regard favorable sur Abel et sur son offrande,"
      },
      {
        number: 5,
        text: "mais il ne porta pas un regard favorable sur Caïn et sur son offrande. Caïn fut très irrité et il arbora un air sombre."
      },
      {
        number: 6,
        text: "L'Éternel dit à Caïn: «Pourquoi es-tu irrité et pourquoi arbores-tu un air sombre?"
      },
      {
        number: 7,
        text: "Certainement, si tu agis bien, tu te relèveras. Si tu n'agis pas bien, le péché est couché à la porte et ses désirs se portent vers toi, mais c'est à toi de dominer sur lui.»"
      },
      {
        number: 8,
        text: "Cependant, Caïn dit à son frère Abel: «Allons dans les champs!» Lorsqu'ils furent dans les champs, Caïn se jeta sur son frère Abel et le tua."
      },
      {
        number: 9,
        text: "L'Éternel dit à Caïn: «Où est ton frère Abel?» Il répondit: «Je ne sais pas. Suis-je le gardien de mon frère?»"
      },
      {
        number: 10,
        text: "Dieu dit: «Qu'as-tu fait? La voix du sang de ton frère crie de la terre jusqu'à moi."
      }
    ]
  },

  "genese-6": {
    verses: [
      {
        number: 1,
        text: "Lorsque les hommes eurent commencé à se multiplier à la surface de la terre et que des filles leur furent nées,"
      },
      {
        number: 2,
        text: "les fils de Dieu virent que les filles des hommes étaient belles et ils en prirent pour femmes parmi toutes celles qu'ils choisirent."
      },
      {
        number: 5,
        text: "L'Éternel vit que la méchanceté de l'homme était grande sur la terre et que toutes les pensées de son cœur se portaient chaque jour uniquement vers le mal."
      },
      {
        number: 6,
        text: "L'Éternel regretta d'avoir fait l'homme sur la terre, et il fut affligé dans son cœur."
      },
      {
        number: 7,
        text: "L'Éternel dit: «J'exterminerai de la surface de la terre l'homme que j'ai créé, depuis l'homme jusqu'au bétail, aux reptiles et aux oiseaux du ciel, car je regrette de les avoir faits.»"
      },
      {
        number: 8,
        text: "Cependant, Noé trouva grâce aux yeux de l'Éternel."
      },
      {
        number: 9,
        text: "Voici l'histoire de Noé. C'était un homme juste et intègre dans sa génération, un homme qui marchait avec Dieu."
      },
      {
        number: 13,
        text: "Alors Dieu dit à Noé: «La fin de toute créature est décidée devant moi, car ils ont rempli la terre de violence. Je vais les détruire avec la terre."
      },
      {
        number: 14,
        text: "Fais-toi une arche en bois de cyprès. Tu disposeras cette arche en compartiments et tu l'enduiras de poix à l'intérieur et à l'extérieur."
      },
      {
        number: 19,
        text: "De tout ce qui vit, de toute créature, tu feras entrer dans l'arche deux de chaque espèce pour leur conserver la vie avec toi. Il y aura un mâle et une femelle."
      }
    ]
  },

  // PSAUMES - Chapitres supplémentaires populaires
  "psaumes-27": {
    verses: [
      {
        number: 1,
        text: "L'Éternel est ma lumière et mon salut: de qui aurais-je peur? L'Éternel est le soutien de ma vie: qui pourrais-je redouter?"
      },
      {
        number: 2,
        text: "Quand les méchants s'avancent contre moi pour dévorer ma chair, ce sont mes persécuteurs et mes ennemis qui chancellent et tombent."
      },
      {
        number: 3,
        text: "Si une armée prenait position contre moi, mon cœur n'éprouverait aucune crainte; si une guerre s'élevait contre moi, je garderais confiance."
      },
      {
        number: 4,
        text: "Je demande une chose à l'Éternel, c'est ce que je recherche: habiter toute ma vie dans la maison de l'Éternel pour contempler sa beauté et pour visiter son temple."
      },
      {
        number: 5,
        text: "Oui, il me protégera dans son abri au jour du malheur, il me cachera sous l'abri de sa tente, il m'élèvera sur un rocher."
      },
      {
        number: 14,
        text: "Espère en l'Éternel! Fortifie-toi et que ton cœur s'affermisse! Espère en l'Éternel!"
      }
    ]
  },

  "psaumes-46": {
    verses: [
      {
        number: 1,
        text: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse."
      },
      {
        number: 2,
        text: "C'est pourquoi nous sommes sans crainte quand la terre est bouleversée et que les montagnes s'effondrent au cœur des mers,"
      },
      {
        number: 3,
        text: "quand les eaux de la mer mugissent et bouillonnent, quand les montagnes s'ébranlent à cause de ses flots en furie."
      },
      {
        number: 4,
        text: "Il y a un fleuve dont les bras réjouissent la ville de Dieu, le sanctuaire des demeures du Très-Haut."
      },
      {
        number: 5,
        text: "Dieu est au milieu d'elle: elle ne chancellera pas. Dieu la secourra dès l'aube."
      },
      {
        number: 10,
        text: "Arrêtez et reconnaissez que je suis Dieu! Je domine sur les nations, je domine sur la terre."
      },
      {
        number: 11,
        text: "L'Éternel, le maître de l'univers, est avec nous, le Dieu de Jacob est notre refuge."
      }
    ]
  },

  // JEAN - Chapitres supplémentaires
  "jean-15": {
    verses: [
      {
        number: 1,
        text: "Je suis le vrai cep, et mon Père est le vigneron."
      },
      {
        number: 2,
        text: "Tout sarment qui est en moi et qui ne porte pas de fruit, il le retranche; et tout sarment qui porte du fruit, il l'émonde afin qu'il porte encore plus de fruit."
      },
      {
        number: 4,
        text: "Demeurez en moi et moi en vous. De même que le sarment ne peut pas porter de fruit par lui-même, sans demeurer attaché au cep, vous non plus, si vous ne demeurez pas en moi."
      },
      {
        number: 5,
        text: "Je suis le cep, vous êtes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire."
      },
      {
        number: 9,
        text: "Comme le Père m'a aimé, je vous ai aussi aimés. Demeurez dans mon amour."
      },
      {
        number: 12,
        text: "Voici mon commandement: aimez-vous les uns les autres comme je vous ai aimés."
      },
      {
        number: 13,
        text: "Il n'y a pas de plus grand amour que de donner sa vie pour ses amis."
      },
      {
        number: 16,
        text: "Ce n'est pas vous qui m'avez choisi, mais moi, je vous ai choisis et je vous ai établis afin que vous alliez, que vous portiez du fruit et que votre fruit demeure."
      }
    ]
  },

  // MATTHIEU - Chapitre supplémentaire
  "matthieu-28": {
    verses: [
      {
        number: 1,
        text: "Après le sabbat, à l'aube du dimanche, Marie de Magdala et l'autre Marie allèrent voir le tombeau."
      },
      {
        number: 2,
        text: "Soudain, il y eut un grand tremblement de terre, car un ange du Seigneur descendit du ciel, vint rouler la pierre [de devant l'ouverture] et s'assit dessus."
      },
      {
        number: 5,
        text: "L'ange prit la parole et dit aux femmes: «N'ayez pas peur, vous! Je sais que vous cherchez Jésus, celui qui a été crucifié."
      },
      {
        number: 6,
        text: "Il n'est pas ici, car il est ressuscité comme il l'avait dit. Venez voir l'endroit où le Seigneur était couché"
      },
      {
        number: 18,
        text: "Jésus s'approcha et leur dit: «Tout pouvoir m'a été donné dans le ciel et sur la terre."
      },
      {
        number: 19,
        text: "Allez [donc], faites de toutes les nations des disciples, baptisez-les au nom du Père, du Fils et du Saint-Esprit"
      },
      {
        number: 20,
        text: "et enseignez-leur à mettre en pratique tout ce que je vous ai prescrit. Et moi, je suis avec vous tous les jours, jusqu'à la fin du monde.»"
      }
    ]
  }
};