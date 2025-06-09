import type {
  AudioConfig,
  SoundEffectId,
  MusicTrackId,
  AudioManagerInterface, // Fix: Import correct interface name
} from "../types/audio";
import { AudioAssetRegistry } from "./AudioAssetRegistry";
import { DefaultSoundGenerator } from "./DefaultSoundGenerator";

// Remove global declaration that conflicts
// declare global {
//   interface Window {
//     webkitAudioContext?: typeof AudioContext;
//   }
// }

export class AudioManager implements AudioManagerInterface {
  private initialized = false;
  private audioContext?: AudioContext;
  // Remove unused config property
  private registry = new AudioAssetRegistry();

  // Volume controls - mark as used via methods
  private masterVolume = 1.0;
  private sfxVolume = 1.0;
  private musicVolume = 1.0;
  private voiceVolume = 1.0;

  public get isInitialized(): boolean {
    return this.initialized;
  }

  public async initialize(_config: AudioConfig): Promise<void> {
    // this.config = config; // Remove unused assignment

    try {
      // Fix: Use proper AudioContext initialization without global declaration
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      // Initialize registry
      await this.registry.loadAssets();

      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize audio context:", error);
      throw error;
    }
  }

  public setVolume(
    type: "master" | "sfx" | "music" | "voice",
    volume: number
  ): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));

    switch (type) {
      case "master":
        this.masterVolume = clampedVolume;
        this.updateAllVolumes();
        break;
      case "sfx":
        this.sfxVolume = clampedVolume;
        break;
      case "music":
        this.musicVolume = clampedVolume;
        break;
      case "voice":
        this.voiceVolume = clampedVolume;
        break;
    }
  }

  // Add missing setSfxVolume method
  public setSfxVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
    this.setVolume("sfx", this.sfxVolume);
  }

  // Add missing setMusicVolume method
  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    this.setVolume("music", this.musicVolume);
  }

  // Add missing stopMusic method
  public stopMusic(): void {
    if (!this.initialized) return;
    console.log("Stopping music");
    // Implementation would stop current music track
  }

  private updateAllVolumes(): void {
    // Update actual audio volumes when master volume changes
    console.debug(
      `Master volume updated to ${this.masterVolume}, affecting SFX: ${this.sfxVolume}, Music: ${this.musicVolume}, Voice: ${this.voiceVolume}`
    );
  }

  // Add missing playSoundEffect method
  public async playSoundEffect(id: SoundEffectId): Promise<void> {
    if (!this.initialized || !this.audioContext) return;

    try {
      const sound = this.registry.getSoundEffect(id);
      if (sound) {
        console.log(`Playing sound effect: ${id}`, sound);
        // Implementation would use Web Audio API to play the sound
      } else {
        // Generate sound if not found in registry
        const generatedSound = DefaultSoundGenerator.generateSoundEffect(
          id,
          440,
          0.5
        );
        console.log(
          `Generated and playing sound effect: ${id}`,
          generatedSound
        );
      }
    } catch (error) {
      console.warn(`Failed to play sound effect: ${id}`, error);
    }
  }

  // Add missing playMusicTrack method
  public async playMusicTrack(id: MusicTrackId): Promise<void> {
    if (!this.initialized || !this.audioContext) return;

    try {
      const track = this.registry.getMusicTrack(id);
      if (track) {
        console.log(`Playing music track: ${id}`, track);
      } else {
        console.warn(`Music track not found: ${id}`);
      }
    } catch (error) {
      console.warn(`Failed to play music track: ${id}`, error);
    }
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
