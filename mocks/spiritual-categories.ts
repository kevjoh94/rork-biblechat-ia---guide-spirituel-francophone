import { colors } from "@/constants/colors";
import { SpiritualCategoryInfo } from "@/types/spiritual";

export const spiritualCategories: SpiritualCategoryInfo[] = [
  {
    id: "reconfort",
    title: "Réconfort",
    description: "Trouve la paix dans les moments difficiles",
    icon: "heart",
    color: colors.spiritual,
  },
  {
    id: "paix",
    title: "Paix Intérieure",
    description: "Apaise ton cœur et ton esprit",
    icon: "sun",
    color: colors.peace,
  },
  {
    id: "pardon",
    title: "Pardon",
    description: "Apprends à pardonner et être pardonné",
    icon: "hand-heart",
    color: "#6BBAA7",
  },
  {
    id: "esperance",
    title: "Espérance",
    description: "Garde espoir en toutes circonstances",
    icon: "sunrise",
    color: "#F9C846",
  },
  {
    id: "gratitude",
    title: "Gratitude",
    description: "Cultive un cœur reconnaissant",
    icon: "gift",
    color: colors.hope,
  },
  {
    id: "force",
    title: "Force",
    description: "Puise ta force en Dieu",
    icon: "shield",
    color: "#8E7DBE",
  },
  {
    id: "amour",
    title: "Amour",
    description: "Découvre l'amour inconditionnel de Dieu",
    icon: "heart-handshake",
    color: "#F2889B",
  },
];