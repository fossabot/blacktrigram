/**
 * Audio utility functions for Korean martial arts game
 */

import type { AudioFormat } from "../types/audio";

export const AUDIO_FORMATS: readonly AudioFormat[] = [
  "audio/webm",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
] as const;

/**
 * Select the best available audio format based on browser support
 */
export function selectAudioFormat(
  availableFormats: readonly AudioFormat[],
  preferredFormats: readonly AudioFormat[] = AUDIO_FORMATS
): AudioFormat | null {
  // Check each preferred format against available formats
  for (const preferred of preferredFormats) {
    if (availableFormats.includes(preferred) && canPlayType(preferred)) {
      return preferred;
    }
  }

  // If no preferred format is available, return the first available that can be played
  for (const format of availableFormats) {
    if (canPlayType(format)) {
      return format;
    }
  }

  return null;
}

/**
 * Get preferred audio URLs based on format selection
 * Returns an array of URLs to try in order of preference
 */
export function getPreferredFormat(
  availableFormats: readonly AudioFormat[],
  basePath: string
): string[] {
  const selectedFormat = selectAudioFormat(availableFormats);

  if (!selectedFormat) {
    // Fallback to first format if none can be determined
    const fallbackFormat = availableFormats[0];
    if (fallbackFormat) {
      const extension = fallbackFormat.replace("audio/", "");
      return [`${basePath}.${extension}`];
    }
    return [];
  }

  const extension = selectedFormat.replace("audio/", "");
  return [`${basePath}.${extension}`];
}

/**
 * Check if the browser can play a specific audio type
 */
export function canPlayType(format: AudioFormat): boolean {
  if (typeof Audio === "undefined") {
    // In test environment, mock basic support
    return ["audio/mp3", "audio/wav"].includes(format);
  }

  const audio = new Audio();
  const support = audio.canPlayType(format);
  return support === "probably" || support === "maybe";
}

/**
 * Clamp volume to valid range (0-1)
 */
export function clampVolume(volume: number): number {
  return Math.max(0, Math.min(1, volume));
}

/**
 * Get metadata for the best available format
 */
export function getBestFormatMetadata(
  availableFormats: readonly AudioFormat[]
) {
  const selectedFormat = selectAudioFormat(availableFormats);
  return {
    format: selectedFormat,
    supported: selectedFormat ? canPlayType(selectedFormat) : false,
    quality: getFormatQuality(selectedFormat),
  };
}

function getFormatQuality(
  format: AudioFormat | null
): "high" | "medium" | "low" {
  if (!format) return "low";

  switch (format) {
    case "audio/wav":
      return "high";
    case "audio/webm":
    case "audio/ogg":
      return "medium";
    case "audio/mp3":
    default:
      return "medium";
  }
}

export class AudioUtils {
  /**
   * Check if browser can play audio type
   */
  static canPlayType(mimeType: string): boolean {
    const audio = new Audio();
    const canPlay = audio.canPlayType(mimeType);
    return canPlay === "probably" || canPlay === "maybe";
  }

  /**
   * Select best audio format from available options
   */
  static selectAudioFormat(
    available: readonly AudioFormat[],
    preferred: readonly AudioFormat[] = [
      "audio/mp3",
      "audio/wav",
      "audio/ogg",
      "audio/webm",
    ]
  ): AudioFormat | null {
    // Convert to mutable arrays for processing
    const availableFormats: AudioFormat[] = [...available];
    const preferredFormats: AudioFormat[] = [...preferred];

    // Find first preferred format that is both available and supported
    for (const format of preferredFormats) {
      if (availableFormats.includes(format) && this.canPlayType(format)) {
        return format;
      }
    }

    // Fallback: find any available format that is supported
    for (const format of availableFormats) {
      if (this.canPlayType(format)) {
        return format;
      }
    }

    return null;
  }

  /**
   * Get best format metadata
   */
  static getBestFormatMetadata(formats: readonly AudioFormat[]): {
    format: AudioFormat | null;
    supported: boolean;
    confidence: string;
  } {
    const selectedFormat = this.selectAudioFormat(formats);

    if (!selectedFormat) {
      return {
        format: null,
        supported: false,
        confidence: "",
      };
    }

    const audio = new Audio();
    const confidence = audio.canPlayType(selectedFormat);

    return {
      format: selectedFormat,
      supported: this.canPlayType(selectedFormat),
      confidence,
    };
  }
}
