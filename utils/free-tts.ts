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

  async speak(options: FreeTTSOptions, retries: number = 2): Promise<void> {
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
      
      // Retry logic for certain errors
      if (retries > 0 && this.shouldRetry(error)) {
        console.log(`Retrying TTS, attempts left: ${retries}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait 500ms before retry
        return this.speak(options, retries - 1);
      }
      
      throw error;
    }
  }

  private shouldRetry(error: any): boolean {
    if (Platform.OS === 'web') {
      // Retry for certain web speech API errors
      const errorMessage = error?.message?.toLowerCase() || '';
      return errorMessage.includes('network') || 
             errorMessage.includes('synthesis-failed') ||
             errorMessage.includes('audio-busy');
    } else {
      // Retry for mobile TTS errors
      return true; // Generally safe to retry mobile TTS
    }
  }

  private async speakWeb(options: FreeTTSOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (!('speechSynthesis' in window)) {
          throw new Error('La synthèse vocale n\'est pas supportée par ce navigateur');
        }

        if (!window.speechSynthesis) {
          throw new Error('Le service de synthèse vocale n\'est pas disponible');
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Wait a bit for cancellation to complete
        setTimeout(() => {
          try {
            this.currentUtterance = new SpeechSynthesisUtterance(options.text);
            this.currentUtterance.rate = Math.max(0.1, Math.min(10, options.rate || 0.9));
            this.currentUtterance.pitch = Math.max(0, Math.min(2, options.pitch || 1.0));
            this.currentUtterance.volume = Math.max(0, Math.min(1, options.volume || 1.0));
            this.currentUtterance.lang = options.language || 'fr-FR';

            // Set up event handlers
            this.currentUtterance.onstart = () => {
              this.isPlaying = true;
            };

            this.currentUtterance.onend = () => {
              this.isPlaying = false;
              this.currentUtterance = null;
              resolve();
            };

            this.currentUtterance.onpause = () => {
              this.isPlaying = false;
            };

            this.currentUtterance.onresume = () => {
              this.isPlaying = true;
            };

            this.currentUtterance.onerror = (event) => {
              this.isPlaying = false;
              this.currentUtterance = null;
              
              // Handle different error types
              const errorMessage = this.getWebSpeechErrorMessage(event);
              console.warn('Web Speech API error:', errorMessage, event);
              
              // Don't reject for certain recoverable errors
              if (event.error === 'interrupted' || event.error === 'canceled') {
                resolve();
              } else {
                reject(new Error(errorMessage));
              }
            };

            // Check if voices are available
            const voices = window.speechSynthesis.getVoices();
            if (voices.length === 0) {
              // Wait for voices to load
              window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.speak(this.currentUtterance!);
              };
            } else {
              // Find a suitable French voice
              const frenchVoice = voices.find(voice => 
                voice.lang.startsWith('fr') || voice.lang.includes('FR')
              );
              if (frenchVoice) {
                this.currentUtterance.voice = frenchVoice;
              }
              
              window.speechSynthesis.speak(this.currentUtterance);
            }
          } catch (innerError) {
            this.isPlaying = false;
            this.currentUtterance = null;
            reject(innerError);
          }
        }, 100);
      } catch (error) {
        this.isPlaying = false;
        this.currentUtterance = null;
        reject(error);
      }
    });
  }

  private getWebSpeechErrorMessage(event: SpeechSynthesisErrorEvent): string {
    switch (event.error) {
      case 'network':
        return 'Erreur réseau lors de la synthèse vocale';
      case 'synthesis-failed':
        return 'Échec de la synthèse vocale';
      case 'synthesis-unavailable':
        return 'Synthèse vocale non disponible';
      case 'no-speech':
        return 'Aucun texte à lire';
      case 'canceled':
        return 'Lecture annulée';
      case 'interrupted':
        return 'Lecture interrompue';
      case 'audio-busy':
        return 'Audio occupé';
      case 'audio-hardware':
        return 'Problème matériel audio';
      case 'language-not-supported':
        return 'Langue non supportée';
      case 'voice-not-found':
        return 'Voix non trouvée';
      case 'text-too-long':
        return 'Texte trop long';
      case 'invalid-argument':
        return 'Argument invalide';
      default:
        return `Erreur de synthèse vocale: ${event.error}`;
    }
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
          // Cancel current speech
          window.speechSynthesis.cancel();
          
          // Clear the current utterance
          if (this.currentUtterance) {
            this.currentUtterance.onend = null;
            this.currentUtterance.onerror = null;
            this.currentUtterance = null;
          }
        }
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

  // Check if TTS is available
  isAvailable(): boolean {
    if (Platform.OS === 'web') {
      return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    } else {
      try {
        require('expo-speech');
        return true;
      } catch {
        return false;
      }
    }
  }

  // Test speech synthesis with a short phrase
  async testSpeech(): Promise<boolean> {
    try {
      if (!this.isAvailable()) {
        return false;
      }

      await this.speak({
        text: 'Test',
        language: 'fr-FR',
        rate: 1.0,
        pitch: 1.0,
        volume: 0.1 // Very low volume for test
      });
      
      return true;
    } catch (error) {
      console.warn('TTS test failed:', error);
      return false;
    }
  }
}

export const freeTTS = FreeTTSService.getInstance();