import { LinearGradient } from "expo-linear-gradient";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";

import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

interface MeditationSessionProps {
  verse: string;
  reference: string;
  duration: number; // en minutes
  onComplete: () => void;
}

export const MeditationSession: React.FC<MeditationSessionProps> = ({
  verse,
  reference,
  duration,
  onComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60); // en secondes
  const [breatheAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, onComplete]);

  useEffect(() => {
    if (isPlaying) {
      // Animation de respiration
      const breathe = () => {
        Animated.sequence([
          Animated.timing(breatheAnimation, {
            toValue: 1.2,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(breatheAnimation, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (isPlaying) breathe();
        });
      };
      breathe();
    }
  }, [isPlaying, breatheAnimation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setTimeLeft(duration * 60);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary + "20", colors.secondary + "20"]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Méditation guidée</Text>
          <Text style={styles.duration}>{duration} minutes</Text>
        </View>

        <Animated.View 
          style={[
            styles.breatheCircle,
            { transform: [{ scale: breatheAnimation }] }
          ]}
        >
          <View style={styles.innerCircle}>
            <Text style={styles.breatheText}>
              {isPlaying ? "Respirez" : "Prêt"}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.verseContainer}>
          <Text style={styles.verse}>"{verse}"</Text>
          <Text style={styles.reference}>— {reference}</Text>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={reset} style={styles.controlButton}>
            <RotateCcw size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={togglePlay} style={styles.playButton}>
            <LinearGradient
              colors={colors.primaryGradient}
              style={styles.playButtonGradient}
            >
              {isPlaying ? (
                <Pause size={32} color={colors.white} />
              ) : (
                <Play size={32} color={colors.white} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton}>
            <Volume2 size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {isPlaying && (
          <View style={styles.guidance}>
            <Text style={styles.guidanceText}>
              Inspirez profondément... Laissez cette parole pénétrer votre cœur
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.md,
    borderRadius: 20,
    overflow: "hidden",
  },
  gradient: {
    padding: spacing.xl,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  duration: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
  },
  breatheCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary + "30",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  innerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primary + "50",
    justifyContent: "center",
    alignItems: "center",
  },
  breatheText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: "500",
    color: colors.primary,
  },
  verseContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  verse: {
    fontSize: typography.fontSizes.md,
    color: colors.text,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeights.md,
  },
  reference: {
    fontSize: typography.fontSizes.sm,
    color: colors.primary,
    fontWeight: "500",
  },
  timerContainer: {
    marginBottom: spacing.xl,
  },
  timer: {
    fontSize: typography.fontSizes.xxxl,
    fontWeight: "300",
    color: colors.text,
    fontFamily: "monospace",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  controlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  playButtonGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  guidance: {
    backgroundColor: colors.white + "90",
    borderRadius: 12,
    padding: spacing.md,
    alignItems: "center",
  },
  guidanceText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text,
    textAlign: "center",
    fontStyle: "italic",
  },
});