const colors = {
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
  peacefulGradient: ["#7B9EBF", "#A8C8E1"] as const,
  hopeGradient: ["#F2C4B3", "#F5D5C8"] as const,
  cardGradient: ["#FFFFFF", "#F8F6F3"] as const,
};

export { colors };