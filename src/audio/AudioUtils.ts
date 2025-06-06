/**
 * AudioUtils - Utility functions for audio management in Korean martial arts game
 * Provides cross-browser audio format detection and audio-related calculations
 */

import type { AudioAsset } from "../types"; // KoreanText is still used by completeAudioAsset
import type { AudioFormat } from "../types/audio"; // Corrected import for AudioFormat

export class AudioUtils {
  private static audioTestElement: HTMLAudioElement | null = null;

  /**
   * Checks if a given audio MIME type can be played by the browser.
   * @param mimeType - The MIME type string (e.g., "audio/mpeg", "audio/webm").
   * @returns True if the format is likely playable, false otherwise.
   */
  public static canPlayType(mimeType: string): boolean {
    if (!AudioUtils.audioTestElement) {
      AudioUtils.audioTestElement = document.createElement("audio");
    }
    return !!AudioUtils.audioTestElement.canPlayType(mimeType);
  }

  /**
   * Selects the best available audio format from a list based on browser support and preferred order.
   * @param availableFormats - An array of available AudioFormat strings for the asset.
   * @param preferredOrder - An array of AudioFormat strings representing the desired order of preference.
   * @returns The preferred and supported AudioFormat string, or null if none are supported.
   */
  public static selectAudioFormat(
    availableFormats: readonly AudioFormat[],
    preferredOrder: readonly AudioFormat[]
  ): AudioFormat | null {
    for (const format of preferredOrder) {
      if (availableFormats.includes(format)) {
        const mimeType = `audio/${format === "mp3" ? "mpeg" : format}`;
        if (AudioUtils.canPlayType(mimeType)) {
          return format;
        }
      }
    }
    // Fallback: check any available format if preferred ones are not supported
    for (const format of availableFormats) {
      if (!preferredOrder.includes(format)) {
        // Only check those not already checked
        const mimeType = `audio/${format === "mp3" ? "mpeg" : format}`;
        if (AudioUtils.canPlayType(mimeType)) {
          return format;
        }
      }
    }
    return null;
  }

  /**
   * Constructs the full URL for an audio asset given its base path, file name (asset ID), and format.
   * @param basePath - The base directory path for the audio asset.
   * @param fileName - The name of the audio file (typically the asset ID).
   * @param format - The AudioFormat (e.g., "mp3", "webm").
   * @param variant - Optional variant string (e.g., "_male", "_female").
   * @returns The full URL string for the audio asset.
   */
  public static constructAudioUrl(
    basePath: string,
    fileName: string,
    format: AudioFormat | null, // Allow null for cases where format might not be determined
    variant: string = ""
  ): string {
    if (!format) {
      // Handle cases where format is null, e.g., return a placeholder or throw error
      console.warn(
        `Cannot construct audio URL for ${fileName}: format is null.`
      );
      return `${basePath}/${fileName}${variant}.error`; // Placeholder for error
    }
    return `${basePath}/${fileName}${variant}.${format}`;
  }

  /**
   * Gets the preferred audio format URL for an asset.
   * @param availableFormats - Formats the asset is available in.
   * @param preferredOrder - Order of preference for formats.
   * @param assetUrlOrBasePath - If it's a full URL template (e.g. asset.url which might contain {format}), use it. Otherwise, it's a basePath.
   * @param assetId - The ID of the asset, used if assetUrlOrBasePath is a basePath.
   * @param variant - Optional variant.
   * @returns The URL string for the best supported format, or the original URL if no format selection is needed.
   */
  public static getPreferredFormat(
    availableFormats: readonly AudioFormat[],
    assetUrlOrBasePath: string, // Can be a template URL or a base path
    preferredOrder: readonly AudioFormat[] = ["webm", "mp3"], // Default preference
    assetId?: string, // Required if assetUrlOrBasePath is a basePath
    variant?: string
  ): string {
    const selectedFormat = AudioUtils.selectAudioFormat(
      availableFormats,
      preferredOrder
    );

    if (assetUrlOrBasePath.includes("{format}")) {
      // Check if it's a template URL
      return selectedFormat
        ? assetUrlOrBasePath.replace("{format}", selectedFormat)
        : assetUrlOrBasePath.replace("{format}", availableFormats[0] || "mp3");
    } else if (assetId && selectedFormat) {
      // It's a basePath, construct the URL
      return AudioUtils.constructAudioUrl(
        assetUrlOrBasePath,
        assetId,
        selectedFormat,
        variant
      );
    } else if (assetId && !selectedFormat && availableFormats.length > 0) {
      // Fallback to first available if selection fails
      return AudioUtils.constructAudioUrl(
        assetUrlOrBasePath,
        assetId,
        availableFormats[0],
        variant
      );
    }
    // If it's a direct URL (not a template, not a base path needing construction) or if format selection fails with no fallback
    return assetUrlOrBasePath; // Return the original URL/path
  }

  static clampVolume(volume: number): number {
    return Math.max(0, Math.min(1, volume));
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

  /**
   * Completes a partial AudioAsset with default values and constructs the full URL.
   * @param partialAsset - The partial audio asset data.
   * @param defaultBasePath - The default base path if not provided in the asset.
   * @param defaultFormats - Default formats if not provided.
   * @param defaultVolume - Default volume if not provided.
   * @param defaultPreload - Default preload flag if not provided.
   * @param defaultLoop - Default loop flag if not provided.
   * @returns The completed AudioAsset.
   */
  public static completeAudioAsset(
    partialAsset: Partial<AudioAsset> & Pick<AudioAsset, "id" | "category">,
    defaultBasePath: string = "assets/audio/",
    defaultFormats: readonly AudioFormat[] = ["mp3", "webm"],
    defaultVolume: number = 0.7,
    defaultPreload: boolean = true,
    defaultLoop: boolean = false
  ): AudioAsset {
    const basePath = partialAsset.basePath ?? defaultBasePath;
    const id = partialAsset.id;
    const koreanContext = partialAsset.koreanContext ?? {
      korean: "",
      english: "",
    };
    const formats = partialAsset.formats ?? defaultFormats;
    const category = partialAsset.category;

    const url =
      partialAsset.url ??
      AudioUtils.constructAudioUrl(
        // Changed to AudioUtils.constructAudioUrl
        basePath.endsWith("/") ? basePath : `${basePath}/`,
        id,
        formats[0]
      );

    return {
      id,
      url,
      category,
      basePath,
      koreanContext,
      formats,
      volume: partialAsset.volume ?? defaultVolume,
      preload: partialAsset.preload ?? defaultPreload,
      loop: partialAsset.loop ?? defaultLoop,
      fadeIn: partialAsset.fadeIn,
      fadeOut: partialAsset.fadeOut,
      variants: partialAsset.variants,
      trigram: partialAsset.trigram,
      culturalSignificance: partialAsset.culturalSignificance,
      techniqueAssociation: partialAsset.techniqueAssociation,
    };
  }

  // Apply default properties to incomplete assets
  public static ensureCompleteAsset(asset: any): AudioAsset {
    // Changed to public static
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
}
