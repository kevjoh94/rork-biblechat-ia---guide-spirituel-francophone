export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  verses: BibleVerse[];
}

export const bibleChapters: Record<string, BibleChapter> = {
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
  }
};