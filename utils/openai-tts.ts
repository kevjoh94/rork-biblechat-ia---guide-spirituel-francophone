import { Platform } from 'react-native';

export interface OpenAITTSOptions {
  text: string;
  voice?: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
  model?: 'tts-1' | 'tts-1-hd';
  speed?: number; // 0.25 to 4.0
}

export class OpenAITTSService {
  private static instance: OpenAITTSService;
  private currentAudio: HTMLAudioElement | null = null;
  private isPlaying = false;

  static getInstance(): OpenAITTSService {
    if (!OpenAITTSService.instance) {
      OpenAITTSService.instance = new OpenAITTSService();
    }
    return OpenAITTSService.instance;
  }

  async generateSpeech(options: OpenAITTSOptions): Promise<string> {
    try {
      const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
      if (!apiKey || apiKey === 'your_openai_api_key_here' || apiKey.trim() === '') {
        console.log('OpenAI API key not configured. Using fallback TTS.');
        throw new Error('API_KEY_NOT_CONFIGURED');
      }

      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: options.model || 'tts-1',
          input: options.text,
          voice: options.voice || 'nova',
          speed: options.speed || 1.0,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI TTS API error: ${response.status} - ${errorText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  }

  async speak(text: string, options?: Partial<OpenAITTSOptions>): Promise<void> {
    try {
      // Stop any current playback
      this.stop();

      try {
        const audioUrl = await this.generateSpeech({
          text,
          voice: options?.voice || 'nova',
          model: options?.model || 'tts-1',
          speed: options?.speed || 1.0,
        });

        if (Platform.OS === 'web') {
          return this.playWebAudio(audioUrl);
        } else {
          // For mobile, we'll use expo-av
          return this.playMobileAudio(audioUrl);
        }
      } catch (error: any) {
        if (error.message === 'API_KEY_NOT_CONFIGURED') {
          console.log('OpenAI API key not configured, using system TTS fallback');
          // Fallback to system TTS
          return this.fallbackToSystemTTS(text);
        }
        throw error;
      }
    } catch (error) {
      console.error('Error in speak:', error);
      // If all else fails, try system TTS as last resort
      try {
        return this.fallbackToSystemTTS(text);
      } catch (fallbackError) {
        console.error('Fallback TTS also failed:', fallbackError);
        throw error; // Throw original error
      }
    }
  }

  private async playWebAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.currentAudio = new Audio(audioUrl);
        this.currentAudio.onended = () => {
          this.isPlaying = false;
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        this.currentAudio.onerror = (error) => {
          this.isPlaying = false;
          URL.revokeObjectURL(audioUrl);
          reject(error);
        };
        
        this.currentAudio.play();
        this.isPlaying = true;
      } catch (error) {
        URL.revokeObjectURL(audioUrl);
        reject(error);
      }
    });
  }

  private async playMobileAudio(audioUrl: string): Promise<void> {
    try {
      const { Audio } = require('expo-av');
      
      // Configure audio mode for playback
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true, volume: 1.0 }
      );
      
      this.isPlaying = true;
      
      return new Promise((resolve, reject) => {
        sound.setOnPlaybackStatusUpdate((status: any) => {
          if (status.didJustFinish) {
            this.isPlaying = false;
            sound.unloadAsync();
            URL.revokeObjectURL(audioUrl);
            resolve();
          }
          if (status.error) {
            this.isPlaying = false;
            sound.unloadAsync();
            URL.revokeObjectURL(audioUrl);
            console.error('Audio playback error:', status.error);
            reject(new Error('Audio playback failed'));
          }
        });
        
        sound.playAsync().catch((error) => {
          this.isPlaying = false;
          sound.unloadAsync();
          URL.revokeObjectURL(audioUrl);
          reject(error);
        });
      });
    } catch (error) {
      this.isPlaying = false;
      URL.revokeObjectURL(audioUrl);
      throw error;
    }
  }

  stop(): void {
    try {
      if (Platform.OS === 'web') {
        // Stop web audio
        if (this.currentAudio) {
          this.currentAudio.pause();
          this.currentAudio.currentTime = 0;
          this.currentAudio = null;
        }
        // Stop web speech synthesis
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } else {
        // Stop mobile speech
        try {
          const { Speech } = require('expo-speech');
          Speech.stop();
        } catch (error) {
          console.warn('Could not stop expo-speech:', error);
        }
      }
    } catch (error) {
      console.warn('Error stopping TTS:', error);
    }
    this.isPlaying = false;
  }

  private async fallbackToSystemTTS(text: string): Promise<void> {
    try {
      console.log('Using system TTS fallback');
      
      if (Platform.OS === 'web') {
        // Use Web Speech API as fallback
        if ('speechSynthesis' in window) {
          // Cancel any ongoing speech
          window.speechSynthesis.cancel();
          
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 0.9;
          utterance.pitch = 1.0;
          utterance.volume = 1.0;
          
          return new Promise((resolve, reject) => {
            utterance.onend = () => {
              this.isPlaying = false;
              resolve();
            };
            utterance.onerror = (error) => {
              this.isPlaying = false;
              console.error('Web Speech API error:', error);
              reject(new Error('Web Speech API failed'));
            };
            
            try {
              window.speechSynthesis.speak(utterance);
              this.isPlaying = true;
            } catch (error) {
              this.isPlaying = false;
              reject(error);
            }
          });
        } else {
          throw new Error('Speech synthesis not supported in this browser');
        }
      } else {
        // Use expo-speech as fallback for mobile
        try {
          const { Speech } = require('expo-speech');
          
          // Stop any ongoing speech
          Speech.stop();
          
          return new Promise((resolve, reject) => {
            Speech.speak(text, {
              onDone: () => {
                this.isPlaying = false;
                resolve();
              },
              onError: (error: any) => {
                this.isPlaying = false;
                console.error('Expo Speech error:', error);
                reject(new Error('System TTS failed'));
              },
              rate: 0.9,
              pitch: 1.0,
              language: 'fr-FR', // French language
            });
            this.isPlaying = true;
          });
        } catch (error) {
          console.error('Failed to load expo-speech:', error);
          throw new Error('System TTS not available');
        }
      }
    } catch (error) {
      console.error('Fallback TTS error:', error);
      this.isPlaying = false;
      throw error;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const openaiTTS = OpenAITTSService.getInstance();