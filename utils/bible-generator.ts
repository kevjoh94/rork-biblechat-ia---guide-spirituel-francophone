import { bibleChapters } from "@/mocks/bible-chapters";

// Fonction utilitaire pour générer des chapitres manquants avec du contenu par défaut
export const generateMissingChapter = (bookId: string, chapterNumber: number) => {
  const chapterKey = `${bookId}-${chapterNumber}`;
  
  // Si le chapitre existe déjà, le retourner
  if (bibleChapters[chapterKey]) {
    return bibleChapters[chapterKey];
  }
  
  // Sinon, générer un chapitre par défaut
  return {
    verses: [
      {
        number: 1,
        text: `Contenu du chapitre ${chapterNumber} du livre ${bookId}. Ce chapitre n'est pas encore disponible dans cette version de l'application.`
      },
      {
        number: 2,
        text: "Nous travaillons à ajouter tous les chapitres de la Bible. En attendant, vous pouvez utiliser le chat IA pour poser des questions sur ce passage."
      },
      {
        number: 3,
        text: "\"Car la parole de Dieu est vivante et efficace, plus tranchante qu'une épée quelconque à deux tranchants.\" - Hébreux 4:12"
      }
    ]
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