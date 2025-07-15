import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Share2, Heart, MessageCircle, Trophy, Star } from 'lucide-react-native';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';

interface CommunityPost {
  id: string;
  author: string;
  content: string;
  verse?: string;
  reference?: string;
  likes: number;
  comments: number;
  timestamp: Date;
  category: 'testimony' | 'prayer_request' | 'encouragement' | 'question';
}

const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    author: 'Marie L.',
    content: 'Dieu m\'a donné la force de surmonter une période difficile. Sa grâce suffit toujours !',
    verse: 'Ma grâce te suffit, car ma puissance s\'accomplit dans la faiblesse.',
    reference: '2 Corinthiens 12:9',
    likes: 24,
    comments: 8,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    category: 'testimony',
  },
  {
    id: '2',
    author: 'Pierre M.',
    content: 'Priez pour moi, je traverse une période de doute. Merci pour votre soutien.',
    likes: 18,
    comments: 12,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    category: 'prayer_request',
  },
  {
    id: '3',
    author: 'Sarah K.',
    content: 'Rappel du jour : Dieu a un plan parfait pour chacun de nous. Faisons-lui confiance !',
    verse: 'Car je connais les projets que j\'ai formés sur vous, dit l\'Éternel.',
    reference: 'Jérémie 29:11',
    likes: 31,
    comments: 5,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    category: 'encouragement',
  },
];

const getCategoryConfig = (colors: any) => ({
  testimony: { label: 'Témoignage', color: colors.gratitude, icon: Star },
  prayer_request: { label: 'Demande de prière', color: colors.primary, icon: Heart },
  encouragement: { label: 'Encouragement', color: colors.peace, icon: Trophy },
  question: { label: 'Question', color: colors.secondary, icon: MessageCircle },
});

export const CommunityFeatures: React.FC = () => {
  const { colors } = useTheme();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const stats = useSpiritualStore((state) => state.stats);
  const categoryConfig = getCategoryConfig(colors);

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleShare = async (post: CommunityPost) => {
    try {
      const message = `${post.content}\n\n${post.verse ? `"${post.verse}"\n${post.reference}` : ''}`;
      await Share.share({
        message,
        title: 'Partage spirituel',
      });
    } catch (error) {
      console.error('Erreur lors du partage:', error);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'À l\'instant';
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays}j`;
  };

  const renderPost = (post: CommunityPost) => {
    const categoryConfig = getCategoryConfig(colors);
    const config = categoryConfig[post.category];
    const IconComponent = config.icon;
    const isLiked = likedPosts.has(post.id);

    return (
      <View key={post.id} style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.authorInfo}>
            <View style={[styles.categoryBadge, { backgroundColor: config.color }]}>
              <IconComponent size={12} color={colors.white} />
            </View>
            <View>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.timestamp}>{formatTimeAgo(post.timestamp)}</Text>
            </View>
          </View>
          <Text style={[styles.categoryLabel, { color: config.color }]}>
            {config.label}
          </Text>
        </View>

        <Text style={styles.postContent}>{post.content}</Text>

        {post.verse && (
          <View style={styles.verseContainer}>
            <Text style={styles.verseText}>"{post.verse}"</Text>
            <Text style={styles.verseReference}>{post.reference}</Text>
          </View>
        )}

        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleLike(post.id)}
          >
            <Heart 
              size={18} 
              color={isLiked ? colors.love : colors.textSecondary}
              fill={isLiked ? colors.love : 'transparent'}
            />
            <Text style={[
              styles.actionText,
              { color: isLiked ? colors.love : colors.textSecondary }
            ]}>
              {post.likes + (isLiked ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={18} color={colors.textSecondary} />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleShare(post)}
          >
            <Share2 size={18} color={colors.textSecondary} />
            <Text style={styles.actionText}>Partager</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Community Header */}
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <View style={styles.headerContent}>
          <Users size={32} color={colors.white} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Communauté Spirituelle</Text>
            <Text style={styles.headerSubtitle}>
              Partagez votre foi et encouragez-vous mutuellement
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Community Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>1,247</Text>
          <Text style={styles.statLabel}>Membres</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Posts aujourd'hui</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>456</Text>
          <Text style={styles.statLabel}>Prières partagées</Text>
        </View>
      </View>

      {/* Posts */}
      <View style={styles.postsSection}>
        <Text style={styles.sectionTitle}>Publications récentes</Text>
        {mockCommunityPosts.map(renderPost)}
      </View>

      {/* Join Community CTA */}
      <TouchableOpacity 
        style={styles.joinButton}
        onPress={() => Alert.alert('Rejoindre', 'Fonctionnalité à venir !')}
      >
        <LinearGradient
          colors={colors.secondaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.joinButtonGradient}
        >
          <Users size={20} color={colors.white} />
          <Text style={styles.joinButtonText}>Rejoindre la communauté</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: spacing.md,
    borderRadius: 16,
    padding: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.fontSizes.md,
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: 12,
    padding: spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.fontSizes.sm,
    textAlign: 'center',
  },
  postsSection: {
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    marginBottom: spacing.md,
  },
  postCard: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  authorName: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
  },
  timestamp: {
    fontSize: typography.fontSizes.sm,
  },
  categoryLabel: {
    fontSize: typography.fontSizes.sm,
    fontWeight: '600',
  },
  postContent: {
    fontSize: typography.fontSizes.md,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },
  verseContainer: {
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderLeftWidth: 3,
  },
  verseText: {
    fontSize: typography.fontSizes.md,
    fontStyle: 'italic',
    marginBottom: spacing.xs,
  },
  verseReference: {
    fontSize: typography.fontSizes.sm,
    fontWeight: '600',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  actionText: {
    fontSize: typography.fontSizes.sm,
    marginLeft: spacing.xs,
  },
  joinButton: {
    margin: spacing.md,
    marginTop: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  joinButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  joinButtonText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    marginLeft: spacing.sm,
  },
});