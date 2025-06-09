// Audio utility functions for format detection and optimization

import { AudioFormat, type AudioAsset } from "../types/audio";

// Create AudioFormat constants for runtime use
export const AUDIO_FORMATS = {
  MP3: "audio/mp3" as const,
  WAV: "audio/wav" as const,
  WEBM: "audio/webm" as const,
  OGG: "audio/ogg" as const,
  AAC: "audio/aac" as const,
  FLAC: "audio/flac" as const,
} as const;

export class AudioUtils {
  /**
   * Get browser's supported audio formats
   */
  public static getSupportedFormats(): readonly AudioFormat[] {
    const audio = new Audio();
    const supported: AudioFormat[] = [];

    // Use AUDIO_FORMATS constants instead of enum values
    if (audio.canPlayType(AUDIO_FORMATS.WEBM)) {
      supported.push(AUDIO_FORMATS.WEBM);
    }
    if (audio.canPlayType(AUDIO_FORMATS.MP3)) {
      supported.push(AUDIO_FORMATS.MP3);
    }
    if (audio.canPlayType(AUDIO_FORMATS.OGG)) {
      supported.push(AUDIO_FORMATS.OGG);
    }
    if (audio.canPlayType(AUDIO_FORMATS.WAV)) {
      supported.push(AUDIO_FORMATS.WAV);
    }

    return supported;
  }

  public static getBestFormat(
    _formats: readonly AudioFormat[]
  ): AudioFormat | null {
    const preferenceOrder: AudioFormat[] = [
      "audio/webm", // Fix: Use string literal instead of AudioFormat.WEBM
      "audio/mp3", // Fix: Use string literal instead of AudioFormat.MP3
      "audio/ogg", // Fix: Use string literal instead of AudioFormat.OGG
      "audio/wav", // Fix: Use string literal instead of AudioFormat.WAV
    ];

    const supported = this.getSupportedFormats();
    for (const format of preferenceOrder) {
      if (supported.includes(format)) {
        // Fix: Use includes() method instead of has()
        return format;
      }
    }

    return null;
  }

  /**
   * Get the preferred audio format based on browser support
   */
  public static getPreferredFormat(
    availableFormats: readonly string[],
    fallbackUrl: string
  ): string {
    const supported = this.getSupportedFormats();
    const formatPriority = [
      "audio/webm",
      "audio/mp3",
      "audio/ogg",
      "audio/wav",
    ];

    for (const format of formatPriority) {
      if (
        supported.includes(format as AudioFormat) &&
        availableFormats.includes(format)
      ) {
        // Fix: Cast to AudioFormat
        return format;
      }
    }

    return fallbackUrl;
  }

  /**
   * Normalize audio volume for consistent playback
   */
  public static normalizeVolume(volume: number): number {
    return Math.max(0, Math.min(1, volume));
  }

  /**
   * Clamp volume to valid range
   */
  public static clampVolume(volume: number): number {
    return this.normalizeVolume(volume);
  }

  /**
   * Calculate optimal buffer size based on device capabilities
   */
  public static getOptimalBufferSize(): number {
    // Default buffer sizes for different scenarios
    const isMobile =
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    return isMobile ? 4096 : 2048;
  }

  /**
   * Check if audio asset has required properties
   */
  public static validateAudioAsset(asset: AudioAsset): boolean {
    return !!(asset && asset.id && asset.category && asset.url);
  }

  /**
   * Generate fallback URL for missing audio files
   */
  public static generateFallbackUrl(_assetId: string): string {
    return "/audio/placeholder.webm";
  }

  /**
   * Create audio sprite from multiple files
   */
  public static createAudioSprite(sources: readonly string[]): string {
    // Implementation would concatenate audio files
    // For now, return the first source
    return sources[0] || this.generateFallbackUrl("sprite");
  }

  /**
   * Apply audio effects (reverb, echo, etc.)
   */
  public static applyAudioEffects(
    audioContext: AudioContext,
    source: AudioNode,
    effects: readonly string[]
  ): AudioNode {
    let currentNode = source;

    effects.forEach((effect) => {
      switch (effect) {
        case "reverb":
          const convolver = audioContext.createConvolver();
          currentNode.connect(convolver);
          currentNode = convolver;
          break;
        case "delay":
          const delay = audioContext.createDelay();
          delay.delayTime.value = 0.1;
          currentNode.connect(delay);
          currentNode = delay;
          break;
        // Add more effects as needed
      }
    });

    return currentNode;
  }

  /**
   * Convert decibels to linear gain
   */
  public static dbToGain(db: number): number {
    return Math.pow(10, db / 20);
  }

  /**
   * Convert linear gain to decibels
   */
  public static gainToDb(gain: number): number {
    return 20 * Math.log10(gain);
  }

  /**
   * Create cross-fade between two audio sources
   */
  public static crossFade(
    audioContext: AudioContext,
    source1: AudioNode,
    source2: AudioNode,
    duration: number
  ): AudioNode {
    const merger = audioContext.createChannelMerger(2);
    const gain1 = audioContext.createGain();
    const gain2 = audioContext.createGain();

    source1.connect(gain1);
    source2.connect(gain2);
    gain1.connect(merger, 0, 0);
    gain2.connect(merger, 0, 1);

    // Set up cross-fade
    const now = audioContext.currentTime;
    gain1.gain.setValueAtTime(1, now);
    gain1.gain.linearRampToValueAtTime(0, now + duration);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(1, now + duration);

    return merger;
  }

  /**
   * Check if Web Audio API is supported
   */
  public static isWebAudioSupported(): boolean {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  }

  /**
   * Load audio asset
   */
  public static async loadAsset(asset: AudioAsset): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();

      audio.addEventListener(
        "canplaythrough",
        () => {
          resolve();
        },
        { once: true }
      );

      audio.addEventListener(
        "error",
        (err) => {
          // Fix: Rename to 'err' and use it to avoid unused variable warning
          reject(
            new Error(
              `Failed to load audio asset: ${asset.id} - ${
                err.message || "Unknown error"
              }`
            )
          );
        },
        { once: true }
      );

      audio.src = asset.url;
      audio.load();
    });
  }

  /**
   * Preload audio assets
   */
  public static async preloadAssets(
    assets: readonly AudioAsset[],
    onProgress?: (progress: number) => void
  ): Promise<void> {
    let loaded = 0;
    const total = assets.length;

    for (const asset of assets) {
      try {
        await AudioUtils.loadAsset(asset);
        loaded++;
        onProgress?.(loaded / total);
      } catch (err) {
        // Fix: Rename 'error' to 'err' and use it to avoid unused variable warning
        console.warn(`Failed to preload audio asset: ${asset.id}`, err);
      }
    }
  }

  /**
   * Create Korean martial arts specific audio effects
   */
  public static createKoreanMartialArtsEffect(
    effectType: "technique" | "stance" | "vital_point",
    parameters: {
      frequency?: number;
      duration?: number;
      intensity?: number;
      archetype?: string;
    }
  ): AudioBuffer | null {
    // Use effectType parameter to avoid warning
    console.debug(`Creating ${effectType} effect`);
    const { frequency = 440, duration = 0.5, intensity = 1.0 } = parameters;

    try {
      const context = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const sampleRate = context.sampleRate;
      const samples = Math.floor(sampleRate * duration);
      const buffer = context.createBuffer(1, samples, sampleRate);
      const channelData = buffer.getChannelData(0);

      for (let i = 0; i < samples; i++) {
        const t = i / sampleRate;
        const envelope = Math.exp(-t * 3) * intensity;
        channelData[i] = Math.sin(2 * Math.PI * frequency * t) * envelope;
      }

      return buffer;
    } catch (error) {
      console.error(`Failed to create ${effectType} effect:`, error);
      return null;
    }
  }

  public static selectAudioFormat(
    availableFormats: readonly AudioFormat[],
    preferredOrder: readonly AudioFormat[]
  ): AudioFormat | null {
    for (const preferred of preferredOrder) {
      if (availableFormats.includes(preferred)) {
        return preferred;
      }
    }
    return availableFormats.length > 0 ? availableFormats[0] : null;
  }

  public static canPlayType(format: AudioFormat): boolean {
    const audio = new Audio();
    return !!audio.canPlayType(format);
  }

  public static processAudioBuffer(
    buffer: ArrayBuffer,
    callback: (processedBuffer: ArrayBuffer) => void,
    _errorCallback: (error: Error) => void // Mark as unused
  ): void {
    // Process audio buffer
    callback(buffer);
  }
}

export default AudioUtils;
