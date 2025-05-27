export class AudioUtils {
  static getPreferredAudioFormat(): string {
    if (typeof window === "undefined") {
      return "ogg";
    }

    const audio = new Audio();

    // Check OGG support first (better compression)
    if (audio.canPlayType("audio/ogg; codecs=vorbis")) {
      return "ogg";
    }

    // Fallback to MP3
    if (audio.canPlayType("audio/mpeg")) {
      return "mp3";
    }

    // Final fallback to WAV
    return "wav";
  }

  static createAudioElement(src: string): HTMLAudioElement {
    const audio = new Audio();
    audio.src = src;
    audio.preload = "auto";
    return audio;
  }

  static calculateVolume(distance: number, maxDistance: number): number {
    return Math.max(0, 1 - distance / maxDistance);
  }

  static formatAudioTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }
}
