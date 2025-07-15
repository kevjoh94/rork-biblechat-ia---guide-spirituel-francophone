export const lightColors = {
  primary: "#6B4E71", // Violet spirituel principal
  secondary: "#8B7355", // Brun doré spirituel
  accent: "#D4AF37", // Or doux
  background: "#FEFEFE",
  card: "#FFFFFF",
  cardSecondary: "#F8F6F3",
  text: "#2C2C2C",
  textSecondary: "#6B6B6B",
  textLight: "#9B9B9B",
  border: "#E8E6E3",
  borderLight: "#F2F0ED",
  success: "#4CAF50",
  error: "#F44336",
  warning: "#FF9800",
  info: "#2196F3",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0, 0, 0, 0.5)",
  transparent: "transparent",
  
  // Couleurs spirituelles
  spiritual: "#6B4E71",
  peace: "#7B9EBF",
  hope: "#F2C4B3",
  love: "#F2889B",
  strength: "#8E7DBE",
  gratitude: "#6BBAA7",
  comfort: "#F9C846",
  
  // Gradients - properly typed as tuples
  primaryGradient: ["#6B4E71", "#8B7355"] as const,
  secondaryGradient: ["#8B7355", "#D4AF37"] as const,
  peacefulGradient: ["#7B9EBF", "#A8C8E1"] as const,
  hopeGradient: ["#F2C4B3", "#F5D5C8"] as const,
  cardGradient: ["#FFFFFF", "#F8F6F3"] as const,
};

export const darkColors = {
  primary: "#9B7EAF", // Violet spirituel plus clair
  secondary: "#B8A082", // Brun doré plus clair
  accent: "#F4D03F", // Or plus lumineux
  background: "#1A1A1A",
  card: "#2D2D2D",
  cardSecondary: "#3A3A3A",
  text: "#FFFFFF",
  textSecondary: "#B0B0B0",
  textLight: "#808080",
  border: "#404040",
  borderLight: "#505050",
  success: "#66BB6A",
  error: "#EF5350",
  warning: "#FFA726",
  info: "#42A5F5",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0, 0, 0, 0.7)",
  transparent: "transparent",
  
  // Couleurs spirituelles adaptées au mode sombre
  spiritual: "#9B7EAF",
  peace: "#8BB4D9",
  hope: "#F5D4C3",
  love: "#F598AB",
  strength: "#A08DCE",
  gratitude: "#7BCAB7",
  comfort: "#FBD856",
  
  // Gradients adaptés au mode sombre
  primaryGradient: ["#9B7EAF", "#B8A082"] as const,
  secondaryGradient: ["#B8A082", "#F4D03F"] as const,
  peacefulGradient: ["#8BB4D9", "#B8D8F1"] as const,
  hopeGradient: ["#F5D4C3", "#F8E5D8"] as const,
  cardGradient: ["#2D2D2D", "#3A3A3A"] as const,
};

// Default to light theme
export const colors = lightColors;