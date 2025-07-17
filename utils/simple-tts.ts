import { Platform } from 'react-native';

export interface SimpleTTSOptions {
  text: string;
  language?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

class SimpleTTSService {
  private static instance: SimpleTTSService;
  private isPlaying = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  static getInstance(): SimpleTTSService {
    if (!SimpleTTSService.instance) {
      SimpleTTSService.instance = new SimpleTTSService();
    }
    return SimpleTTSService.instance;
  }

  async speak(options: SimpleTTSOptions): Promise<void> {
    if (Platform.OS === 'web') {
      return this.speakWeb(options);
    } else {
      return this.speakMobile(options);
    }
  }

  private async speakWeb(options: SimpleTTSOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      // Vérifier la disponibilité
      if (!window.speechSynthesis) {
        reject(new Error('Synthèse vocale non disponible'));
        return;
      }

      // Arrêter toute lecture en cours
      this.stop();

      // Attendre un peu pour que l'arrêt soit effectif
      setTimeout(() => {
        try {
          this.currentUtterance = new SpeechSynthesisUtterance(options.text);
          
          // Configuration de base
          this.currentUtterance.lang = options.language || 'fr-FR';
          this.currentUtterance.rate = options.rate || 0.9;
          this.currentUtterance.pitch = options.pitch || 1.0;
          this.currentUtterance.volume = options.volume || 1.0;

          // Gestionnaires d'événements simplifiés
          this.currentUtterance.onstart = () => {
            this.isPlaying = true;
          };

          this.currentUtterance.onend = () => {
            this.isPlaying = false;
            this.currentUtterance = null;
            resolve();
          };

          this.currentUtterance.onerror = (event) => {
            this.isPlaying = false;
            this.currentUtterance = null;
            
            // Ne pas rejeter pour les interruptions
            if (event.error === 'interrupted' || event.error === 'canceled') {
              resolve();
            } else {
              reject(new Error(`Erreur TTS: ${event.error}`));
            }
          };

          // Lancer la synthèse
          window.speechSynthesis.speak(this.currentUtterance);
          
        } catch (error) {
          this.isPlaying = false;
          this.currentUtterance = null;
          reject(error);
        }
      }, 50);
    });
  }

  private async speakMobile(options: SimpleTTSOptions): Promise<void> {
    try {
      const { Speech } = require('expo-speech');
      
      // Arrêter toute lecture en cours
      Speech.stop();

      return new Promise((resolve, reject) => {
        Speech.speak(options.text, {
          language: options.language || 'fr-FR',
          rate: options.rate || 0.9,
          pitch: options.pitch || 1.0,
          volume: options.volume || 1.0,
          onStart: () => {
            this.isPlaying = true;
          },
          onDone: () => {
            this.isPlaying = false;
            resolve();
          },
          onError: (error: any) => {
            this.isPlaying = false;
            reject(new Error('Erreur TTS mobile'));
          },
        });
      });
    } catch (error) {
      throw new Error('TTS mobile non disponible');
    }
  }

  stop(): void {
    this.isPlaying = false;

    if (Platform.OS === 'web') {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      this.currentUtterance = null;
    } else {
      try {
        const { Speech } = require('expo-speech');
        Speech.stop();
      } catch (error) {
        // Ignorer les erreurs d'arrêt
      }
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  isAvailable(): boolean {
    if (Platform.OS === 'web') {
      return typeof window !== 'undefined' && 
             'speechSynthesis' in window && 
             'SpeechSynthesisUtterance' in window;
    } else {
      try {
        require('expo-speech');
        return true;
      } catch {
        return false;
      }
    }
  }

  // Fonction de test simple
  async testSpeech(): Promise<boolean> {
    try {
      await this.speak({
        text: 'Test',
        volume: 0.1
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const simpleTTS = SimpleTTSService.getInstance();