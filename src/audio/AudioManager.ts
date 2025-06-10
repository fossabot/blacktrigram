import type {
  AudioConfig,
  SoundEffectId,
  MusicTrackId,
  IAudioManager,
} from "../types/audio";
import { AudioAssetRegistry } from "./AudioAssetRegistry";
import { DefaultSoundGenerator } from "./DefaultSoundGenerator";

export class AudioManager implements IAudioManager {
  private initialized = false;

  private audioContext?: AudioContext;
  private registry = new AudioAssetRegistry();
  private activeSounds = new Map<string, HTMLAudioElement>();

  // Fix: Add proper volume getters
  private _masterVolume = 1.0;
  private _sfxVolume = 1.0;
  private _musicVolume = 1.0;
  private _muted = false;

  private currentMusicTrack: HTMLAudioElement | null = null; // Add for music playback

  public get isInitialized(): boolean {
    return this.initialized;
  }

  public get masterVolume(): number {
    return this._masterVolume;
  }

  public get sfxVolume(): number {
    return this._sfxVolume;
  }

  public get musicVolume(): number {
    return this._musicVolume;
  }

  public get muted(): boolean {
    return this._muted;
  }

  public async initialize(config?: AudioConfig): Promise<void> {
    try {
      // Try to initialize Web Audio API
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      await this.registry.loadAssets();

      console.info("audioContext finitialize", this.audioContext);

      // Set default volumes from config
      if (config) {
        this._masterVolume = config.defaultVolume ?? 0.7;
        this._sfxVolume = config.defaultVolume ?? 0.8;
        this._musicVolume = config.defaultVolume ?? 0.5;
      }

      this.initialized = true;
      console.log("🎵 AudioManager initialized successfully");
    } catch (error) {
      console.warn(
        "🔇 AudioManager failed to initialize, using fallback mode:",
        error
      );
      this.initialized = true; // Allow fallback mode
    }
  }

  public async playSoundEffect(id: SoundEffectId): Promise<void> {
    if (!this.initialized || this._muted) return;

    try {
      // Try to get from registry first
      let sound = this.registry.getSoundEffect(id);

      // Generate fallback sound if not found
      if (!sound) {
        sound = DefaultSoundGenerator.generateSoundEffect(id, 440, 0.5);
      }

      // Create and play HTML Audio element for fallback
      const audio = new Audio();
      audio.src = sound.url;
      audio.volume = this._sfxVolume * this._masterVolume;

      // Store reference to manage multiple sounds
      this.activeSounds.set(id, audio);

      await audio.play();

      // Clean up after playing
      audio.onended = () => {
        this.activeSounds.delete(id);
      };
    } catch (error) {
      console.warn(`Failed to play sound effect: ${id}`, error);
    }
  }

  public setVolume(
    type: "master" | "sfx" | "music" | "voice",
    volume: number
  ): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));

    switch (type) {
      case "master":
        this._masterVolume = clampedVolume;
        this.updateAllVolumes();
        break;
      case "sfx":
        this._sfxVolume = clampedVolume;
        break;
      case "music":
        this._musicVolume = clampedVolume;
        break;
    }
  }

  public mute(): void {
    this._muted = true;
    this.updateAllVolumes();
  }

  public unmute(): void {
    this._muted = false;
    this.updateAllVolumes();
  }

  // Add playMusic method for compatibility with AudioProvider
  public async playMusic(trackId: string): Promise<void> {
    if (!this.initialized || this._muted) return;

    // Stop any currently playing music
    this.stopMusic();

    // Try to get music track from registry
    let track = this.registry.getMusicTrack(trackId as MusicTrackId);

    // Fallback: generate a default ambience if not found
    if (!track) {
      track = DefaultSoundGenerator.generateDojiangAmbience();
    }

    // Create and play HTML Audio element
    const audio = new Audio();
    audio.src = track.url;
    audio.volume = this._musicVolume * this._masterVolume;
    audio.loop = track.loop ?? false;

    this.currentMusicTrack = audio;
    await audio.play();
  }

  // Add stopMusic method for compatibility with AudioProvider
  public stopMusic(): void {
    if (this.currentMusicTrack) {
      this.currentMusicTrack.pause();
      this.currentMusicTrack.currentTime = 0;
      this.currentMusicTrack = null;
    }
  }

  private updateAllVolumes(): void {
    const effectiveVolume = this._muted ? 0 : this._masterVolume;

    // Update all active audio elements
    this.activeSounds.forEach((audio) => {
      audio.volume = effectiveVolume * this._sfxVolume;
    });

    // Update music volume if music is playing
    if (this.currentMusicTrack) {
      this.currentMusicTrack.volume = effectiveVolume * this._musicVolume;
    }
  }

  // Update playMusicTrack to use playMusic for consistency
  public async playMusicTrack(id: MusicTrackId): Promise<void> {
    return this.playMusic(id);
  }

  public async playKoreanTechniqueSound(
    techniqueId: string,
    archetype: string
  ): Promise<void> {
    if (!this.initialized) return;

    try {
      const sound = DefaultSoundGenerator.generateKoreanTechniqueSound(
        techniqueId,
        archetype
      );
      await this.playSoundEffect(sound.id as SoundEffectId);
    } catch (error) {
      console.warn(
        `Failed to play Korean technique sound: ${techniqueId}`,
        error
      );
    }
  }

  public async playTrigramStanceSound(stance: string): Promise<void> {
    if (!this.initialized) return;

    try {
      const sound = DefaultSoundGenerator.generateTrigramSound(stance);
      await this.playSoundEffect(sound.id as SoundEffectId);
    } catch (error) {
      console.warn(`Failed to play trigram stance sound: ${stance}`, error);
    }
  }

  public async playVitalPointHitSound(severity: string): Promise<void> {
    if (!this.initialized) return;

    try {
      const sound = DefaultSoundGenerator.generateVitalPointHitSound(severity);
      await this.playSoundEffect(sound.id as SoundEffectId);
    } catch (error) {
      console.warn(`Failed to play vital point hit sound: ${severity}`, error);
    }
  }

  public async playDojiangAmbience(): Promise<void> {
    if (!this.initialized) return;

    try {
      const ambience = DefaultSoundGenerator.generateDojiangAmbience();
      await this.playMusicTrack(ambience.id as MusicTrackId);
    } catch (error) {
      console.warn("Failed to play dojang ambience", error);
    }
  }
}

export default AudioManager;
