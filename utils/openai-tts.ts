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
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        throw new Error('OpenAI API key not configured. Please set EXPO_PUBLIC_OPENAI_API_KEY in your .env file.');
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
    } catch (error) {
      console.error('Error in speak:', error);
      throw error;
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
      
      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.didJustFinish) {
          this.isPlaying = false;
          sound.unloadAsync();
          URL.revokeObjectURL(audioUrl);
        }
        if (status.error) {
          this.isPlaying = false;
          sound.unloadAsync();
          URL.revokeObjectURL(audioUrl);
          console.error('Audio playback error:', status.error);
        }
      });
      
      await sound.playAsync();
    } catch (error) {
      this.isPlaying = false;
      URL.revokeObjectURL(audioUrl);
      throw error;
    }
  }

  stop(): void {
    if (Platform.OS === 'web' && this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    this.isPlaying = false;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const openaiTTS = OpenAITTSService.getInstance();