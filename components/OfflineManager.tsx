import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@/components/ThemeProvider';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { useSpiritualStore } from '@/store/spiritual-store';

interface OfflineData {
  dailyVerses: any[];
  biblicalContent: any[];
  bibleChapters: any[];
  lastSync: string;
}

export const OfflineManager: React.FC = () => {
  const { colors } = useTheme();
  const [isOnline, setIsOnline] = useState(true);
  const [offlineData, setOfflineData] = useState<OfflineData | null>(null);
  
  // Use stable selectors to prevent infinite loops
  const contentSelector = useCallback((state: any) => state.content, []);
  const getDailyVerseSelector = useCallback((state: any) => state.getDailyVerse, []);
  
  const content = useSpiritualStore(contentSelector);
  const getDailyVerse = useSpiritualStore(getDailyVerseSelector);
  
  // Get daily verse using the function
  const dailyVerse = getDailyVerse();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const wasOffline = !isOnline;
      const isNowOnline = state.isConnected ?? false;
      
      setIsOnline(isNowOnline);
      
      if (wasOffline && isNowOnline) {
        // Back online - sync data
        syncOfflineData();
      } else if (!isNowOnline) {
        // Gone offline - prepare offline data
        prepareOfflineData();
      }
    });

    return () => unsubscribe();
  }, [isOnline]);

  const prepareOfflineData = async () => {
    try {
      const offlineData: OfflineData = {
        dailyVerses: [dailyVerse],
        biblicalContent: content.slice(0, 20), // Cache first 20 items
        bibleChapters: [], // Would cache essential chapters
        lastSync: new Date().toISOString(),
      };
      
      await AsyncStorage.setItem('offlineData', JSON.stringify(offlineData));
      setOfflineData(offlineData);
      
      console.log('Offline data prepared');
    } catch (error) {
      console.error('Error preparing offline data:', error);
    }
  };

  const syncOfflineData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('offlineData');
      if (storedData) {
        const parsedData: OfflineData = JSON.parse(storedData);
        setOfflineData(parsedData);
        
        // Here you would sync any offline changes back to the server
        console.log('Data synced from offline storage');
      }
    } catch (error) {
      console.error('Error syncing offline data:', error);
    }
  };

  const loadOfflineData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('offlineData');
      if (storedData) {
        const parsedData: OfflineData = JSON.parse(storedData);
        setOfflineData(parsedData);
      }
    } catch (error) {
      console.error('Error loading offline data:', error);
    }
  };

  useEffect(() => {
    loadOfflineData();
  }, []);

  if (isOnline) {
    return null; // Don't show anything when online
  }

  return (
    <View style={styles.container}>
      <View style={styles.offlineIndicator}>
        <Text style={styles.offlineText}>Mode hors ligne</Text>
        <Text style={styles.offlineSubtext}>
          Contenu limité disponible
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  offlineIndicator: {
    padding: spacing.sm,
    alignItems: 'center',
  },
  offlineText: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
  },
  offlineSubtext: {
    fontSize: typography.fontSizes.sm,
    opacity: 0.9,
  },
});