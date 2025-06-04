// Extend Window interface for webkit audio context
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

import type {
  SoundEffectId,
  MusicId,
  AudioAsset,
  AudioPlaybackOptions,
} from "../types/audio";
import {
  AUDIO_ASSET_REGISTRY,
  getSoundAsset,
  getMusicAsset,
} from "./AudioAssetRegistry";
import { DefaultSoundGenerator } from "./DefaultSoundGenerator";

/**
 * Korean Martial Arts Audio Manager for Black Trigram (흑괘)
 * Singleton pattern for centralized audio management
 */
export class AudioManager {
  private static instance: AudioManager | null = null;
  private audioContext: AudioContext | null = null;
  private masterVolume: number = 0.7;
  private sfxVolume: number = 1.0;
  private musicVolume: number = 1.0;
  private isMuted: boolean = false;
  private loadedAssets: Map<string, HTMLAudioElement> = new Map();
  private currentMusic: HTMLAudioElement | null = null;
  private isInitialized: boolean = false;

  private constructor() {
    this.initializeAudioContext();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private async initializeAudioContext(): Promise<void> {
    try {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }
      this.isInitialized = true;
    } catch (error) {
      console.warn("AudioContext initialization failed:", error);
      this.isInitialized = false;
    }
  }

  // Public getters to match interface expectations
  public getMasterVolume(): number {
    return this.masterVolume;
  }

  public getSFXVolume(): number {
    return this.sfxVolume;
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsInitialized(): boolean {
    return this.isInitialized;
  }

  public getLoadedAssetCount(): number {
    return this.loadedAssets.size;
  }

  public async playSFX(
    soundId: SoundEffectId,
    options: AudioPlaybackOptions = {}
  ): Promise<void> {
    if (this.isMuted) return;

    const asset = getSoundAsset(soundId);
    if (!asset) {
      console.warn(`Sound asset not found: ${soundId}`);
      await this.playFallbackSound(soundId);
      return;
    }

    try {
      const audio = await this.loadAudioAsset(asset);
      const volume =
        (options.volume ?? asset.volume ?? 1.0) *
        this.sfxVolume *
        this.masterVolume;

      audio.volume = Math.max(0, Math.min(1, volume));
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.warn(`Failed to play SFX ${soundId}:`, error);
      await this.playFallbackSound(soundId);
    }
  }

  public async playMusic(
    musicId: MusicId,
    options: AudioPlaybackOptions = {}
  ): Promise<void> {
    const asset = getMusicAsset(musicId);
    if (!asset) {
      console.warn(`Music asset not found: ${musicId}`);
      return;
    }

    try {
      // Stop current music
      if (this.currentMusic) {
        this.currentMusic.pause();
        this.currentMusic = null;
      }

      if (this.isMuted) return;

      const audio = await this.loadAudioAsset(asset);
      const volume =
        (options.volume ?? asset.volume ?? 1.0) *
        this.musicVolume *
        this.masterVolume;

      audio.volume = Math.max(0, Math.min(1, volume));
      audio.loop = asset.loop ?? false;
      audio.currentTime = 0;

      this.currentMusic = audio;
      await audio.play();
    } catch (error) {
      console.warn(`Failed to play music ${musicId}:`, error);
    }
  }

  public stopMusic(): void {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic = null;
    }
  }

  public setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  public setSFXVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.currentMusic) {
      this.currentMusic.volume = this.musicVolume * this.masterVolume;
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stopMusic();
    }
  }

  private async playFallbackSound(soundId: SoundEffectId): Promise<void> {
    try {
      // Map specific sound IDs to DefaultSoundGenerator methods
      switch (soundId) {
        case "attack_light":
        case "attack_medium":
        case "attack_heavy":
        case "attack_critical":
          const damage =
            soundId === "attack_critical"
              ? 40
              : soundId === "attack_heavy"
              ? 30
              : soundId === "attack_medium"
              ? 20
              : 10;
          await DefaultSoundGenerator.playAttackSound(damage);
          break;

        case "hit_light":
        case "hit_medium":
        case "hit_heavy":
        case "hit_critical":
          const hitDamage =
            soundId === "hit_critical"
              ? 40
              : soundId === "hit_heavy"
              ? 30
              : soundId === "hit_medium"
              ? 20
              : 10;
          await DefaultSoundGenerator.playHitSound(hitDamage);
          break;

        case "perfect_strike":
          await DefaultSoundGenerator.playHitSound(35, true);
          break;

        case "stance_change":
          await DefaultSoundGenerator.playStanceChangeSound();
          break;

        case "match_start":
          await DefaultSoundGenerator.playMatchStartSound();
          break;

        case "victory":
          await DefaultSoundGenerator.playVictorySound();
          break;

        case "menu_hover":
        case "menu_select":
          await DefaultSoundGenerator.playMenuSound();
          break;

        default:
          // Generic fallback using Web Audio API
          await this.generateGenericSound(soundId);
      }
    } catch (error) {
      console.warn("Failed to generate fallback sound:", error);
    }
  }

  private async generateGenericSound(soundId: SoundEffectId): Promise<void> {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Different frequencies for different sound types
      const soundFrequencies: Record<string, number> = {
        combo_buildup: 350,
        combo_finish: 500,
        block_success: 300,
        technique_execute: 400,
        ki_charge: 250,
        defeat: 150,
      };

      oscillator.frequency.setValueAtTime(
        soundFrequencies[soundId] || 400,
        this.audioContext.currentTime
      );
      oscillator.type = "square";

      gainNode.gain.setValueAtTime(
        0.1 * this.sfxVolume * this.masterVolume,
        this.audioContext.currentTime
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.1
      );

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.1);
    } catch (error) {
      console.warn("Failed to generate generic sound:", error);
    }
  }

  private async loadAudioAsset(asset: AudioAsset): Promise<HTMLAudioElement> {
    const cacheKey = asset.id;

    if (this.loadedAssets.has(cacheKey)) {
      return this.loadedAssets.get(cacheKey)!.cloneNode() as HTMLAudioElement;
    }

    const audio = new Audio();
    const assetPath = this.getAssetPath(asset);

    audio.src = assetPath;
    audio.preload = asset.preload ? "auto" : "metadata";

    return new Promise((resolve, reject) => {
      audio.oncanplaythrough = () => {
        this.loadedAssets.set(cacheKey, audio);
        resolve(audio.cloneNode() as HTMLAudioElement);
      };

      audio.onerror = () => {
        reject(new Error(`Failed to load audio: ${assetPath}`));
      };

      audio.load();
    });
  }

  private getAssetPath(asset: AudioAsset): string {
    const preferredFormat = this.getPreferredFormat(asset.formats);
    return `${asset.basePath}/${asset.id}.${preferredFormat}`;
  }

  private getPreferredFormat(formats: readonly string[]): string {
    // Prefer webm for modern browsers, fallback to mp3
    if (formats.includes("webm")) return "webm";
    if (formats.includes("mp3")) return "mp3";
    return formats[0] || "mp3";
  }

  private updateAllVolumes(): void {
    if (this.currentMusic) {
      this.currentMusic.volume = this.musicVolume * this.masterVolume;
    }
  }

  public async preloadAssets(assetIds: string[]): Promise<void> {
    const preloadPromises = assetIds.map(async (id) => {
      const asset = AUDIO_ASSET_REGISTRY[id];
      if (asset && asset.preload) {
        try {
          await this.loadAudioAsset(asset);
        } catch (error) {
          console.warn(`Failed to preload asset ${id}:`, error);
        }
      }
    });

    await Promise.allSettled(preloadPromises);
  }

  // Combat-specific audio methods following project guidelines
  public async playAttackSound(damage: number): Promise<void> {
    if (damage < 10) {
      await this.playSFX("attack_light");
    } else if (damage < 25) {
      await this.playSFX("attack_medium");
    } else if (damage < 40) {
      await this.playSFX("attack_heavy");
    } else {
      await this.playSFX("attack_critical");
    }
  }

  public async playHitSound(
    damage: number,
    isVitalPoint: boolean = false
  ): Promise<void> {
    if (isVitalPoint) {
      await this.playSFX("perfect_strike");
      return;
    }

    if (damage < 10) {
      await this.playSFX("hit_light");
    } else if (damage < 25) {
      await this.playSFX("hit_medium");
    } else if (damage < 40) {
      await this.playSFX("hit_heavy");
    } else {
      await this.playSFX("hit_critical");
    }
  }

  public async playTechniqueSound(techniqueName: string): Promise<void> {
    // Map Korean technique names to sound effects
    const techniqueMap: Record<string, SoundEffectId> = {
      천둥벽력: "attack_critical",
      유수연타: "combo_buildup",
      화염지창: "perfect_strike",
      벽력일섬: "attack_heavy",
      선풍연격: "combo_finish",
      수류반격: "block_success",
      반석방어: "block_success",
      대지포옹: "attack_heavy",
    };

    const soundId = techniqueMap[techniqueName] || "technique_execute";
    await this.playSFX(soundId);
  }

  public async playStanceChangeSound(): Promise<void> {
    await this.playSFX("stance_change");
  }

  public async playKiChargeSound(): Promise<void> {
    await this.playSFX("ki_charge");
  }

  public async playMatchStartSound(): Promise<void> {
    await this.playSFX("match_start");
  }

  public async playVictorySound(): Promise<void> {
    await this.playSFX("victory");
  }

  public async playDefeatSound(): Promise<void> {
    await this.playSFX("defeat");
  }

  public async playMenuSound(): Promise<void> {
    await this.playSFX("menu_select");
  }

  public destroy(): void {
    this.stopMusic();
    this.loadedAssets.clear();

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.isInitialized = false;
    AudioManager.instance = null;
  }
}

// Export singleton instance getter
export const useAudio = (): AudioManager => AudioManager.getInstance();
