import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, RotateCcw, Heart, Wind, BookOpen, Sparkles } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';

const { width } = Dimensions.get('window');

interface MeditationSessionProps {
  onComplete?: () => void;
}

const meditationTypes = [
  {
    id: 'breathing',
    title: 'Respiration Consciente',
    description: 'Concentrez-vous sur votre respiration et trouvez la paix intérieure',
    icon: Wind,
    color: '#3B82F6',
    duration: 5,
  },
  {
    id: 'scripture',
    title: 'Méditation Biblique',
    description: 'Réfléchissez profondément sur un passage des Écritures',
    icon: BookOpen,
    color: '#10B981',
    duration: 10,
  },
  {
    id: 'prayer',
    title: 'Prière Contemplative',
    description: 'Un moment de communion silencieuse avec Dieu',
    icon: Sparkles,
    color: '#8B5CF6',
    duration: 8,
  },
  {
    id: 'gratitude',
    title: 'Gratitude',
    description: 'Cultivez un cœur reconnaissant envers les bénédictions reçues',
    icon: Heart,
    color: '#EC4899',
    duration: 7,
  },
];

export const MeditationSession: React.FC<MeditationSessionProps> = ({ onComplete }) => {
  const [selectedType, setSelectedType] = useState(meditationTypes[0]);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedType.duration * 60);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  
  const addMeditationSession = useSpiritualStore((state) => state.addMeditationSession);
  
  const breathingAnimation = useRef(new Animated.Value(0.8)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  
  const totalTime = selectedType.duration * 60;
  const progress = (totalTime - timeLeft) / totalTime;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            handleComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (selectedType.id === 'breathing' && isActive) {
      startBreathingAnimation();
    }
  }, [isActive, phase, selectedType.id]);

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const startBreathingAnimation = () => {
    const inhaleTime = 4000;
    const holdTime = 2000;
    const exhaleTime = 6000;
    
    const sequence = () => {
      // Inhale
      setPhase('inhale');
      Animated.timing(breathingAnimation, {
        toValue: 1.2,
        duration: inhaleTime,
        useNativeDriver: true,
      }).start(() => {
        // Hold
        setPhase('hold');
        setTimeout(() => {
          // Exhale
          setPhase('exhale');
          Animated.timing(breathingAnimation, {
            toValue: 0.8,
            duration: exhaleTime,
            useNativeDriver: true,
          }).start(() => {
            if (isActive) {
              sequence();
            }
          });
        }, holdTime);
      });
    };
    
    sequence();
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(selectedType.duration * 60);
    setPhase('inhale');
    breathingAnimation.setValue(0.8);
    progressAnimation.setValue(0);
  };

  const handleComplete = () => {
    addMeditationSession({
      type: selectedType.id as any,
      duration: selectedType.duration,
      title: selectedType.title,
      description: selectedType.description,
    });
    onComplete?.();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inspirez lentement...';
      case 'hold':
        return 'Retenez votre souffle...';
      case 'exhale':
        return 'Expirez doucement...';
      default:
        return 'Respirez naturellement...';
    }
  };

  const TypeSelector = () => (
    <View style={styles.typeSelector}>
      <Text style={styles.selectorTitle}>Choisissez votre méditation</Text>
      <View style={styles.typeGrid}>
        {meditationTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType.id === type.id;
          
          return (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                isSelected && { borderColor: type.color, borderWidth: 2 }
              ]}
              onPress={() => {
                setSelectedType(type);
                setTimeLeft(type.duration * 60);
                handleReset();
              }}
            >
              <LinearGradient
                colors={isSelected ? [type.color + '20', type.color + '10'] : [colors.white, colors.cardSecondary]}
                style={styles.typeCardGradient}
              >
                <View style={[styles.typeIcon, { backgroundColor: type.color + '15' }]}>
                  <Icon size={24} color={type.color} />
                </View>
                <Text style={styles.typeTitle}>{type.title}</Text>
                <Text style={styles.typeDuration}>{type.duration} min</Text>
                <Text style={styles.typeDescription}>{type.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const MeditationTimer = () => (
    <View style={styles.timerContainer}>
      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      
      <View style={styles.centerContent}>
        {selectedType.id === 'breathing' && (
          <Animated.View
            style={[
              styles.breathingCircle,
              {
                transform: [{ scale: breathingAnimation }],
                backgroundColor: selectedType.color + '20',
                borderColor: selectedType.color,
              },
            ]}
          >
            <View style={[styles.innerCircle, { backgroundColor: selectedType.color + '40' }]} />
          </Animated.View>
        )}
        
        <Text style={styles.timeDisplay}>{formatTime(timeLeft)}</Text>
        
        {selectedType.id === 'breathing' && isActive && (
          <Text style={styles.phaseText}>{getPhaseText()}</Text>
        )}
        
        <Text style={styles.sessionTitle}>{selectedType.title}</Text>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleReset}
        >
          <RotateCcw size={24} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: selectedType.color }]}
          onPress={isActive ? handlePause : handleStart}
        >
          <LinearGradient
            colors={[selectedType.color, selectedType.color + 'CC']}
            style={styles.playButtonGradient}
          >
            {isActive ? (
              <Pause size={32} color={colors.white} />
            ) : (
              <Play size={32} color={colors.white} />
            )}
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.controlButton} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isActive && timeLeft === selectedType.duration * 60 ? (
        <TypeSelector />
      ) : (
        <MeditationTimer />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  typeSelector: {
    flex: 1,
    padding: spacing.md,
  },
  selectorTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  typeGrid: {
    flex: 1,
    justifyContent: 'center',
  },
  typeCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeCardGradient: {
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
  },
  typeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  typeTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  typeDuration: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  typeDescription: {
    fontSize: typography.fontSizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeights.sm,
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  progressContainer: {
    height: 4,
    backgroundColor: colors.cardSecondary,
    borderRadius: 2,
    marginTop: spacing.md,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: '300',
    color: colors.text,
    marginBottom: spacing.md,
  },
  phaseText: {
    fontSize: typography.fontSizes.lg,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  sessionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardSecondary,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});