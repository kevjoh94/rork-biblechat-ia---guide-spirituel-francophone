import { Platform } from 'react-native';

export interface FreeTTSOptions {
  text: string;
  language?: string;
  rate?: number; // 0.1 to 10
  pitch?: number; // 0 to 2
  volume?: number; // 0 to 1
}

export class FreeTTSService {
  private static instance: FreeTTSService;
  private isPlaying = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  static getInstance(): FreeTTSService {
    if (!FreeTTSService.instance) {
      FreeTTSService.instance = new FreeTTSService();
    }
    return FreeTTSService.instance;
  }

  async speak(options: FreeTTSOptions): Promise<void> {
    try {
      // Stop any current playback
      this.stop();

      if (Platform.OS === 'web') {
        return this.speakWeb(options);
      } else {
        return this.speakMobile(options);
      }
    } catch (error) {
      console.error('Error in FreeTTS speak:', error);
      throw error;
    }
  }

  private async speakWeb(options: FreeTTSOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!('speechSynthesis' in window)) {
          throw new Error('Speech synthesis not supported in this browser');
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        this.currentUtterance = new SpeechSynthesisUtterance(options.text);
        this.currentUtterance.rate = options.rate || 0.9;
        this.currentUtterance.pitch = options.pitch || 1.0;
        this.currentUtterance.volume = options.volume || 1.0;
        this.currentUtterance.lang = options.language || 'fr-FR';

        this.currentUtterance.onstart = () => {
          this.isPlaying = true;
        };

        this.currentUtterance.onend = () => {
          this.isPlaying = false;
          this.currentUtterance = null;
          resolve();
        };

        this.currentUtterance.onerror = (error) => {
          this.isPlaying = false;
          this.currentUtterance = null;
          console.error('Web Speech API error:', error);
          reject(new Error('Speech synthesis failed'));
        };

        window.speechSynthesis.speak(this.currentUtterance);
      } catch (error) {
        this.isPlaying = false;
        this.currentUtterance = null;
        reject(error);
      }
    });
  }

  private async speakMobile(options: FreeTTSOptions): Promise<void> {
    try {
      const { Speech } = require('expo-speech');

      // Stop any ongoing speech
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
            console.error('Expo Speech error:', error);
            reject(new Error('Mobile TTS failed'));
          },
        });
      });
    } catch (error) {
      console.error('Failed to load expo-speech:', error);
      throw new Error('Mobile TTS not available');
    }
  }

  stop(): void {
    try {
      this.isPlaying = false;

      if (Platform.OS === 'web') {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        this.currentUtterance = null;
      } else {
        try {
          const { Speech } = require('expo-speech');
          Speech.stop();
        } catch (error) {
          console.warn('Could not stop expo-speech:', error);
        }
      }
    } catch (error) {
      console.warn('Error stopping FreeTTS:', error);
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Get available voices (web only)
  getAvailableVoices(): SpeechSynthesisVoice[] {
    if (Platform.OS === 'web' && 'speechSynthesis' in window) {
      return window.speechSynthesis.getVoices();
    }
    return [];
  }

  // Get French voices specifically
  getFrenchVoices(): SpeechSynthesisVoice[] {
    return this.getAvailableVoices().filter(voice => 
      voice.lang.startsWith('fr') || voice.lang.includes('FR')
    );
  }
}

export const freeTTS = FreeTTSService.getInstance();