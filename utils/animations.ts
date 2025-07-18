import { Animated, Easing, Platform } from 'react-native';

export const animations = {
  // Animations d'entrée
  fadeIn: (animatedValue: Animated.Value, duration = 600) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
  },

  fadeOut: (animatedValue: Animated.Value, duration = 400) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    });
  },

  slideInUp: (animatedValue: Animated.Value, duration = 500) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    });
  },

  slideInDown: (animatedValue: Animated.Value, duration = 500) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    });
  },

  // Animations de scale
  scaleIn: (animatedValue: Animated.Value, duration = 400) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: true,
    });
  },

  scaleOut: (animatedValue: Animated.Value, duration = 300) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      easing: Easing.in(Easing.back(1.5)),
      useNativeDriver: true,
    });
  },

  // Animation de pulsation
  pulse: (animatedValue: Animated.Value) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
  },

  // Animation de rebond
  bounce: (animatedValue: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2,
        duration: 150,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]);
  },

  // Animation de rotation
  rotate: (animatedValue: Animated.Value, duration = 1000) => {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
  },

  // Animations de parallax
  parallax: (animatedValue: Animated.Value, scrollY: Animated.Value, factor = 0.5) => {
    return scrollY.interpolate({
      inputRange: [0, 300],
      outputRange: [0, 300 * factor],
      extrapolate: 'clamp',
    });
  },

  // Animations de spring
  spring: (animatedValue: Animated.Value, toValue: number) => {
    return Animated.spring(animatedValue, {
      toValue,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });
  },

  // Animation de typing (pour le chat)
  typing: (animatedValue: Animated.Value) => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
  },

  // Séquences d'animations
  staggeredFadeIn: (animatedValues: Animated.Value[], delay = 100) => {
    return Animated.stagger(
      delay,
      animatedValues.map(value =>
        Animated.timing(value, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      )
    );
  },

  // Animation de shimmer (loading)
  shimmer: (animatedValue: Animated.Value) => {
    return Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
  },
};

// Utilitaires pour les interpolations
export const interpolations = {
  fadeScale: (animatedValue: Animated.Value) => ({
    opacity: animatedValue,
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  }),

  slideUp: (animatedValue: Animated.Value) => ({
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  }),

  slideDown: (animatedValue: Animated.Value) => ({
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
    ],
  }),

  rotate: (animatedValue: Animated.Value) => ({
    transform: [
      {
        rotate: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  }),

  shimmerTranslate: (animatedValue: Animated.Value, width: number) => ({
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [-width, width],
        }),
      },
    ],
  }),
};

// Configurations prédéfinies
export const animationConfigs = {
  // Pour les boutons
  button: {
    pressIn: { scale: 0.95, duration: 100 },
    pressOut: { scale: 1, duration: 150 },
  },

  // Pour les cartes
  card: {
    enter: { duration: 500, delay: 0 },
    exit: { duration: 300, delay: 0 },
  },

  // Pour les modales
  modal: {
    enter: { duration: 400, easing: Easing.out(Easing.back(1.2)) },
    exit: { duration: 300, easing: Easing.in(Easing.cubic) },
  },

  // Pour les notifications
  notification: {
    enter: { duration: 400, easing: Easing.out(Easing.back(1.1)) },
    exit: { duration: 300, easing: Easing.in(Easing.cubic) },
    autoHide: 3000,
  },
};

// Hook pour les animations conditionnelles selon la plateforme
export const useConditionalAnimation = () => {
  const isWeb = Platform.OS === 'web';
  
  return {
    // Désactive certaines animations sur web pour éviter les problèmes
    shouldAnimate: (animationType: 'layout' | 'transform' | 'opacity') => {
      if (isWeb && animationType === 'layout') return false;
      return true;
    },
    
    // Réduit la durée sur web pour de meilleures performances
    adjustDuration: (duration: number) => {
      return isWeb ? duration * 0.7 : duration;
    },
  };
};