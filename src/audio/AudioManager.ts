// Extend Window interface for webkit audio context
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

import type {
  AudioState,
  SoundEffectId,
  MusicTrackId,
  AudioPlaybackOptions,
  IAudioManager,
} from "../types/audio";

export class AudioManager implements IAudioManager {
  private static instance: AudioManager | null = null;
  private masterVolume: number = 1.0;
  private sfxVolume: number = 1.0;
  private musicVolume: number = 1.0;
  private isMuted: boolean = false;
  private currentMusic: MusicTrackId | null = null;
  private soundPool: Map<string, HTMLAudioElement> = new Map();
  private musicPool: Map<string, HTMLAudioElement> = new Map();
  private activeMusic: HTMLAudioElement | null = null;
  private activeSounds: Set<HTMLAudioElement> = new Set();
  private isInitialized: boolean = false;

  public constructor() {
    // Constructor is now public for direct instantiation
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  // Implement IAudioManager interface methods
  public getState(): AudioState {
    return {
      masterVolume: this.masterVolume,
      sfxVolume: this.sfxVolume,
      musicVolume: this.musicVolume,
      muted: this.isMuted,
      currentMusicTrack: this.currentMusic,
      isInitialized: this.isInitialized,
    };
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  public toggleMute(): void {
    this.setMuted(!this.isMuted);
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.initializeAudioContext();
      this.isInitialized = true;
    } catch (error) {
      console.warn("Audio initialization failed:", error);
      this.isInitialized = false;
    }
  }

  public dispose(): void {
    this.stopAllSounds();
    this.soundPool.clear();
    this.musicPool.clear();
    this.isInitialized = false;
  }

  private async initializeAudioContext(): Promise<void> {
    if (typeof window !== "undefined" && "AudioContext" in window) {
      // Initialize audio context if needed
    }
  }

  public stopAllSounds(): void {
    this.activeSounds.forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
    this.activeSounds.clear();
  }

  // Implement remaining interface methods
  public playSFX(
    id: SoundEffectId,
    options?: AudioPlaybackOptions
  ): number | null {
    if (this.isMuted) return null;

    // Implementation for playing sound effects
    console.log(`Playing SFX: ${id}`, options);
    return 1; // Return audio ID
  }

  public playMusic(
    id: MusicTrackId,
    options?: AudioPlaybackOptions
  ): number | null {
    if (this.isMuted) return null;

    this.currentMusic = id;
    console.log(`Playing Music: ${id}`, options);
    return 1; // Return audio ID
  }

  public stopMusic(): void {
    if (this.activeMusic) {
      this.activeMusic.pause();
      this.activeMusic = null;
    }
    this.currentMusic = null;
  }

  public setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  public setSFXVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  // Korean martial arts specific methods
  public playAttackSound(damage: number): void {
    if (damage < 10) {
      this.playSFX("hit_light");
    } else if (damage < 25) {
      this.playSFX("hit_medium");
    } else if (damage < 40) {
      this.playSFX("hit_heavy");
    } else {
      this.playSFX("hit_critical");
    }
  }

  public playHitSound(damage: number, isVitalPoint?: boolean): void {
    if (isVitalPoint) {
      this.playSFX("critical_hit");
    } else {
      this.playAttackSound(damage);
    }
  }

  public playTechniqueSound(koreanName: string): void {
    // Use the koreanName parameter for Korean martial arts audio context
    console.log(`Playing technique: ${koreanName}`);
    this.playSFX("technique_execute");
  }

  public playStanceChangeSound(): void {
    this.playSFX("stance_change");
  }

  public playBlockSound(): void {
    this.playSFX("block_success");
  }
}

// Export both singleton instance and class
export const audioManager = AudioManager.getInstance();
export default AudioManager;
