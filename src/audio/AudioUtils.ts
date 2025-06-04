/**
 * AudioUtils - Utility functions for audio management in Korean martial arts game
 * Provides cross-browser audio format detection and audio-related calculations
 */

import type { AudioAsset } from "../types/audio";

export class AudioUtils {
  /**
   * Detects the preferred audio format based on browser support
   * Prioritizes OGG for better compression, falls back to MP3, then WAV
   */
  static getPreferredAudioFormat(): string {
    if (typeof window === "undefined") {
      // Server-side rendering - default to OGG
      return "ogg";
    }

    try {
      const audio = new Audio();

      // Check OGG support first (better compression for Korean martial arts sound effects)
      const oggSupport = audio.canPlayType("audio/ogg; codecs=vorbis");
      if (oggSupport === "probably" || oggSupport === "maybe") {
        return "ogg";
      }

      // Fallback to MP3 (wider browser support)
      const mp3Support = audio.canPlayType("audio/mpeg");
      if (mp3Support === "probably" || mp3Support === "maybe") {
        return "mp3";
      }

      // Final fallback to WAV (universal support but larger files)
      const wavSupport = audio.canPlayType("audio/wav");
      if (wavSupport === "probably" || wavSupport === "maybe") {
        return "wav";
      }

      // Ultimate fallback if no format is detected
      return "mp3";
    } catch (error) {
      console.warn("Audio format detection failed:", error);
      return "ogg"; // Default fallback
    }
  }

  /**
   * Creates an HTML audio element with optimized settings for game audio
   */
  static createAudioElement(src: string): HTMLAudioElement {
    const audio = new Audio();
    audio.src = src;
    audio.preload = "auto";
    audio.crossOrigin = "anonymous"; // Enable CORS for web audio processing
    return audio;
  }

  /**
   * Calculates 3D spatial audio volume based on distance
   * Used for Korean martial arts combat positioning
   */
  static calculateVolume(distance: number, maxDistance: number): number {
    // Handle edge cases
    if (maxDistance <= 0) return 0;
    if (distance < 0) return 0;
    if (distance >= maxDistance) return 0;

    // Linear distance attenuation with smooth falloff
    const normalizedDistance = distance / maxDistance;
    return Math.max(0, 1 - normalizedDistance);
  }

  /**
   * Formats audio duration in minutes:seconds format
   * Used for Korean martial arts match timers and audio track displays
   */
  static formatAudioTime(seconds: number): string {
    // Handle negative values
    if (seconds < 0) return "0:00";

    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  /**
   * Calculates Korean martial arts technique audio parameters
   * Based on damage and technique type for authentic combat feedback
   */
  static calculateTechniqueAudioParams(
    damage: number,
    isVitalPoint: boolean = false
  ): { volume: number; pitch: number; duration: number } {
    const baseDamage = Math.max(0, Math.min(100, damage));
    const intensity = baseDamage / 100;

    return {
      volume: 0.3 + intensity * 0.6, // Scale from 30% to 90% volume
      pitch: isVitalPoint ? 1.3 : 0.8 + intensity * 0.4, // Higher pitch for vital hits
      duration: isVitalPoint ? 0.3 : 0.1 + intensity * 0.2, // Longer duration for critical hits
    };
  }

  /**
   * Validates audio file URL for Korean martial arts asset loading
   */
  static isValidAudioUrl(url: string): boolean {
    if (!url || typeof url !== "string") return false;

    const validExtensions = [".mp3", ".ogg", ".wav", ".webm"];
    const lowerUrl = url.toLowerCase();

    return validExtensions.some((ext) => lowerUrl.endsWith(ext));
  }

  /**
   * Generates audio asset paths for Korean martial arts techniques
   */
  static generateKoreanTechniqueAudioPath(
    technique: string,
    type: "attack" | "hit" | "block",
    format: string = "ogg"
  ): string {
    const sanitizedTechnique = technique.replace(/[^a-zA-Z0-9가-힣]/g, "_");
    return `./assets/audio/sfx/${type}_${sanitizedTechnique}.${format}`;
  }
}

/**
 * Completes the properties of an audio asset with default values
 */
export function completeAudioAsset(
  partialAsset: Partial<AudioAsset> & { id: string; category: string }
): AudioAsset {
  return {
    basePath: "/audio/default",
    koreanContext: {
      korean: partialAsset.id,
      english: partialAsset.id.replace(/_/g, " "),
      culturalNote: "Traditional Korean martial arts audio",
    },
    formats: ["webm", "mp3"],
    volume: 0.5,
    preload: false,
    ...partialAsset,
  } as AudioAsset;
}

// Apply default properties to incomplete assets
export function ensureCompleteAsset(asset: any): AudioAsset {
  if (!asset.basePath) {
    asset.basePath = `/audio/${asset.category}`;
  }

  if (!asset.koreanContext) {
    asset.koreanContext = {
      korean: asset.id,
      english: asset.id.replace(/_/g, " "),
      culturalNote: "Korean martial arts audio element",
    };
  }

  return asset as AudioAsset;
}
