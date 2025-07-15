import React, { useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useSpiritualStore } from '@/store/spiritual-store';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const NotificationManager: React.FC = () => {
  // Use stable selectors to prevent infinite loops
  const notificationsSelector = useCallback((state: any) => state.notifications, []);
  const getDailyVerseSelector = useCallback((state: any) => state.getDailyVerse, []);
  
  const notifications = useSpiritualStore(notificationsSelector);
  const getDailyVerse = useSpiritualStore(getDailyVerseSelector);

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    scheduleNotifications();
  }, [notifications]);

  const setupNotifications = async () => {
    if (Platform.OS === 'web') {
      // Web notifications setup
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.log('Notification permission denied');
        }
      }
      return;
    }

    // Mobile notifications setup
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Notifications désactivées',
        'Activez les notifications dans les paramètres pour recevoir vos rappels spirituels.'
      );
      return;
    }
  };

  const scheduleNotifications = async () => {
    if (Platform.OS === 'web') {
      scheduleWebNotifications();
      return;
    }

    // Cancel all existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    const [hour, minute] = notifications.time.split(':').map(Number);

    // Daily verse notification
    if (notifications.dailyVerse) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🙏 Votre verset quotidien',
          body: 'Découvrez votre verset spirituel du jour',
          data: { type: 'daily_verse' },
        },
        trigger: {
          hour,
          minute,
          repeats: true,
        },
      });
    }

    // Reading reminder
    if (notifications.readingReminder) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '📖 Temps de lecture',
          body: 'Prenez un moment pour lire la Parole de Dieu',
          data: { type: 'reading_reminder' },
        },
        trigger: {
          hour: hour + 1,
          minute,
          repeats: true,
        },
      });
    }

    // Prayer reminder
    if (notifications.prayerReminder) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🤲 Moment de prière',
          body: 'Prenez un instant pour vous recueillir et prier',
          data: { type: 'prayer_reminder' },
        },
        trigger: {
          hour: hour + 2,
          minute,
          repeats: true,
        },
      });
    }

    // Meditation reminder
    if (notifications.meditationReminder) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🧘 Méditation spirituelle',
          body: 'Accordez-vous un moment de méditation et de paix',
          data: { type: 'meditation_reminder' },
        },
        trigger: {
          hour: hour + 3,
          minute,
          repeats: true,
        },
      });
    }
  };

  const scheduleWebNotifications = () => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const [hour, minute] = notifications.time.split(':').map(Number);
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hour, minute, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime();

    if (notifications.dailyVerse) {
      setTimeout(() => {
        const dailyVerse = getDailyVerse();
        new Notification('🙏 Votre verset quotidien', {
          body: `"${dailyVerse.verse}" - ${dailyVerse.reference}`,
          icon: '/icon.png',
        });
        
        // Schedule for next day
        setInterval(() => {
          const verse = getDailyVerse();
          new Notification('🙏 Votre verset quotidien', {
            body: `"${verse.verse}" - ${verse.reference}`,
            icon: '/icon.png',
          });
        }, 24 * 60 * 60 * 1000);
      }, timeUntilNotification);
    }
  };

  return null; // This component doesn't render anything
};

export default NotificationManager;