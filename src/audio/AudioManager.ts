// Extend Window interface for webkit audio context
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

import { Howl, Howler } from "howler";
import type {
  IAudioManager,
  AudioState,
  MusicTrackId,
  SoundEffectId,
  AudioPlaybackOptions,
  AudioAsset,
  AudioAssetRegistry,
  AudioConfig, // Assuming AudioConfig is defined elsewhere
} from "../types/audio";
import { AudioUtils } from "./AudioUtils";
// import { DefaultSoundGenerator } from "./DefaultSoundGenerator"; // TS6133: Unused import
// import { VariantSelector } from "./VariantSelector";

// Placeholder for a simple event emitter if not using a library
class SimpleEventEmitter {
  private listeners: Record<string, Array<(...args: any[]) => void>> = {};
  on(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  emit(event: string, ...args: any[]) {
    this.listeners[event]?.forEach((callback) => callback(...args));
  }
}

const DEFAULT_AUDIO_CONFIG: AudioConfig = {
  MASTER_VOLUME: 0.7,
  SFX_VOLUME: 0.8,
  MUSIC_VOLUME: 0.5,
  AMBIENT_VOLUME: 0.6,
  FADE_DURATION: 1000, // Default fade duration in ms
  MAX_CONCURRENT_SOUNDS: 10, // Max simultaneous sounds
};

// Define DEFAULT_AUDIO_STATE based on AudioState interface and DEFAULT_AUDIO_CONFIG
const DEFAULT_AUDIO_STATE: AudioState = {
  masterVolume: DEFAULT_AUDIO_CONFIG.MASTER_VOLUME,
  sfxVolume: DEFAULT_AUDIO_CONFIG.SFX_VOLUME,
  musicVolume: DEFAULT_AUDIO_CONFIG.MUSIC_VOLUME,
  muted: false,
  currentMusicTrack: null,
  isInitialized: false,
  fallbackMode: false,
};

export class AudioManager implements IAudioManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  public isInitialized: boolean = false;
  // private isSuspended: boolean = false; // Unused
  private audioState: AudioState;
  private assetRegistry: AudioAssetRegistry;
  // private soundGenerator: DefaultSoundGenerator; // TS6133: Instance is unused
  private activeSounds: Record<number, Howl> = {};
  private activeMusic: {
    id: MusicTrackId;
    howl: Howl;
    soundId: number;
  } | null = null;
  private config: AudioConfig = DEFAULT_AUDIO_CONFIG; // Added config property
  private eventEmitter = new SimpleEventEmitter(); // Added eventEmitter

  constructor(
    assetRegistry: AudioAssetRegistry,
    initialAudioState?: Partial<AudioState>
  ) {
    this.assetRegistry = assetRegistry;
    this.audioState = {
      ...DEFAULT_AUDIO_STATE,
      ...(initialAudioState || {}),
      masterVolume:
        initialAudioState?.masterVolume ?? DEFAULT_AUDIO_CONFIG.MASTER_VOLUME,
      sfxVolume:
        initialAudioState?.sfxVolume ?? DEFAULT_AUDIO_CONFIG.SFX_VOLUME,
      musicVolume:
        initialAudioState?.musicVolume ?? DEFAULT_AUDIO_CONFIG.MUSIC_VOLUME,
    };
    // Initialize Howler global volume if Howler is used directly for some sounds
    if (typeof Howler !== "undefined") {
      Howler.volume(this.audioState.masterVolume);
    }
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;
    try {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.sfxGain = this.audioContext.createGain();
      this.musicGain = this.audioContext.createGain();

      this.masterGain.connect(this.audioContext.destination);
      this.sfxGain.connect(this.masterGain);
      this.musicGain.connect(this.masterGain);

      this.setMasterVolume(this.audioState.masterVolume);
      this.setSFXVolume(this.audioState.sfxVolume);
      this.setMusicVolume(this.audioState.musicVolume);
      this.setMuted(this.audioState.muted);

      // Resume context if suspended (e.g., due to browser autoplay policies)
      if (this.audioContext.state === "suspended") {
        console.log(
          "AudioContext is initially suspended. Waiting for user interaction."
        ); // Explicit use
        // Try to resume on first user interaction
        const resumeContext = async () => {
          if (this.audioContext && this.audioContext.state === "suspended") {
            await this.audioContext.resume();
            // this.isSuspended = false; // isSuspended is unused
            console.log("AudioContext resumed on user interaction.");
          }
          document.removeEventListener("click", resumeContext);
          document.removeEventListener("keydown", resumeContext);
        };
        document.addEventListener("click", resumeContext, { once: true });
        document.addEventListener("keydown", resumeContext, { once: true });
      }

      // Preload assets marked for preload
      await this.preloadAssets();

      this.isInitialized = true;
      this.audioState.isInitialized = true;
      console.log("Audio Manager initialized successfully.");
      this.eventEmitter.emit("initialized");
    } catch (error) {
      console.error("Error initializing Audio Manager:", error);
      this.audioState.fallbackMode = true; // Enter fallback mode if Web Audio API fails
      this.isInitialized = true; // Still mark as initialized to prevent re-attempts
      this.audioState.isInitialized = true;
      this.eventEmitter.emit("error", error);
    }
  }

  private async preloadAssets(): Promise<void> {
    const sfxAssets = Object.values(this.assetRegistry.sfx);
    const musicAssets = Object.values(this.assetRegistry.music);
    const assetsToLoad = [...sfxAssets, ...musicAssets].filter(
      (asset) => asset.preload
    );

    for (const asset of assetsToLoad) {
      await this.loadAudioAsset(asset);
    }
  }

  public async loadAudioAsset(asset: AudioAsset): Promise<void> {
    return new Promise((resolve, reject) => {
      /*const sound =*/ new Howl({
        src: AudioUtils.getPreferredFormat(asset.formats, asset.url), // Corrected method name
        volume: asset.volume,
        loop: asset.loop ?? false,
        preload: true, // Ensure Howler preloads it
        onload: () => {
          console.log(`Loaded audio asset: ${asset.id}`);
          resolve();
        },
        onloaderror: (_id, err) => {
          // Prefix unused 'id' with underscore
          console.error(`Error loading audio asset ${asset.id}:`, err);
          reject(err);
        },
      });
      // Howler handles its own loading, no need to store 'sound' here unless for specific active tracking
    });
  }

  public playSFX(
    id: SoundEffectId,
    options?: AudioPlaybackOptions
  ): number | null {
    if (!this.isInitialized && !this.audioState.fallbackMode) {
      console.warn("AudioManager not initialized. Cannot play SFX:", id);
      return null;
    }

    const sfxAsset = this.assetRegistry.sfx[id];
    if (!sfxAsset) {
      console.warn(`SFX asset not found: ${id}`);
      return null;
    }

    const finalVolume =
      (options?.volume ?? sfxAsset.volume) *
      this.audioState.sfxVolume *
      this.audioState.masterVolume;
    if (this.audioState.muted) return null;

    let soundToPlay: Howl | undefined = new Howl({
      src: AudioUtils.getPreferredFormat(sfxAsset.formats, sfxAsset.url), // Corrected method name
      volume: finalVolume,
      loop: options?.loop ?? sfxAsset.loop ?? false,
      rate: options?.rate ?? 1.0,
      // Howler handles its own preloading if src is an array or if preload:true
    });

    const soundId = soundToPlay.play(); // Howl.play() returns a soundId (number)

    if (soundToPlay && soundId !== undefined) {
      // Howl's volume, loop, rate are set at instantiation or via methods on the Howl instance itself
      // For a specific playing instance (soundId), these are controlled via Howler global or the instance.
      // Example: soundToPlay.volume(finalVolume, soundId); // This is incorrect for instance method
      // Correct for instance: soundToPlay.volume(finalVolume); then play.
      // Or Howler.volume(finalVolume, soundId); for global control of a specific sound instance.

      // If options are per-play, they should be applied to the Howl instance before play or via Howler global after play.
      // For simplicity, we assume Howl instance methods are sufficient here.
      // Rate can be set on the instance:
      if (options?.rate) soundToPlay.rate(options.rate, soundId);

      this.activeSounds[soundId] = soundToPlay; // Store the Howl instance

      soundToPlay.once(
        "end",
        () => {
          if (this.activeSounds[soundId]) {
            delete this.activeSounds[soundId];
          }
          this.eventEmitter.emit("sfxEnded", id, soundId);
        },
        soundId
      ); // Scope 'once' to this specific soundId
      this.eventEmitter.emit("sfxPlayed", id, soundId);
      return soundId;
    }
    return null;
  }

  public playMusic(
    id: MusicTrackId,
    options?: AudioPlaybackOptions
  ): number | null {
    if (!this.isInitialized && !this.audioState.fallbackMode) {
      console.warn("AudioManager not initialized. Cannot play music:", id);
      return null;
    }
    if (this.activeMusic && this.activeMusic.id === id) {
      // If the same music is already playing, either restart or do nothing
      // For now, let's assume we stop the current and play new, or just return existing soundId
      return this.activeMusic.soundId;
    }

    this.stopMusic(); // Stop any currently playing music

    const musicAsset = this.assetRegistry.music[id];
    if (!musicAsset) {
      console.warn(`Music asset not found: ${id}`);
      return null;
    }

    const finalVolume =
      (options?.volume ?? musicAsset.volume) *
      this.audioState.musicVolume *
      this.audioState.masterVolume;
    if (this.audioState.muted) return null;

    let soundToPlay: Howl | undefined = new Howl({
      src: AudioUtils.getPreferredFormat(musicAsset.formats, musicAsset.url), // Corrected method name
      volume: finalVolume,
      loop: options?.loop ?? musicAsset.loop ?? true,
      rate: options?.rate ?? 1.0,
      html5: true, // Often recommended for longer tracks / music
      onload: () => {
        this.eventEmitter.emit("musicLoaded", id);
      },
      onplayerror: (soundId, error) => {
        console.error(
          `Error playing music ${id} (soundId: ${soundId}):`,
          error
        );
        this.eventEmitter.emit("musicPlayError", id, error);
        if (this.activeMusic && this.activeMusic.soundId === soundId) {
          this.activeMusic = null;
        }
      },
      onfade: (soundId) => {
        // Use soundToPlay.volume(soundId) to get volume for a specific instance
        const currentVolume = soundToPlay?.volume(soundId) as
          | number
          | undefined;
        if (
          this.activeMusic &&
          this.activeMusic.soundId === soundId &&
          currentVolume === 0
        ) {
          soundToPlay?.stop(soundId);
          this.activeMusic = null;
        }
      },
    });

    const soundId = soundToPlay.play();

    if (soundToPlay && soundId !== undefined) {
      if (options?.fadeIn && options.fadeIn > 0) {
        soundToPlay.volume(0, soundId); // Start at 0 volume
        soundToPlay.fade(0, finalVolume, options.fadeIn, soundId);
      } else {
        soundToPlay.volume(finalVolume, soundId); // Set volume directly
      }

      this.activeMusic = { id, howl: soundToPlay, soundId };
      this.audioState.currentMusicTrack = id;
      this.eventEmitter.emit("musicPlayed", id, soundId);
      return soundId;
    }
    return null;
  }

  public stopMusic(id?: MusicTrackId, fadeOutDuration?: number): void {
    const soundInstanceToStop = id
      ? this.activeMusic?.id === id
        ? this.activeMusic
        : null
      : this.activeMusic;

    if (
      soundInstanceToStop &&
      soundInstanceToStop.howl &&
      soundInstanceToStop.soundId !== undefined
    ) {
      const duration = fadeOutDuration ?? this.config.FADE_DURATION;
      const currentVolume = soundInstanceToStop.howl.volume(
        soundInstanceToStop.soundId
      ) as number;
      if (duration > 0) {
        soundInstanceToStop.howl.fade(
          currentVolume,
          0,
          duration,
          soundInstanceToStop.soundId
        );
        // Howler's fade will eventually call stop if it fades to 0 and is not looping.
        // We set a timeout to ensure it's cleared if Howler doesn't stop it (e.g. if fade is interrupted)
        setTimeout(() => {
          if (
            this.activeMusic &&
            this.activeMusic.soundId === soundInstanceToStop.soundId
          ) {
            soundInstanceToStop.howl.stop(soundInstanceToStop.soundId);
            this.activeMusic = null;
            this.audioState.currentMusicTrack = null;
            this.eventEmitter.emit("musicStopped", soundInstanceToStop.id);
          }
        }, duration + 50); // Add a small buffer
      } else {
        soundInstanceToStop.howl.stop(soundInstanceToStop.soundId);
        this.activeMusic = null;
        this.audioState.currentMusicTrack = null;
        this.eventEmitter.emit("musicStopped", soundInstanceToStop.id);
      }
    } else if (!id && this.activeMusic) {
      // If no id specified, stop current active music
      this.stopMusic(this.activeMusic.id, fadeOutDuration);
    }
  }

  public stopAllMusic(fadeOutDuration?: number): void {
    if (this.activeMusic) {
      this.stopMusic(this.activeMusic.id, fadeOutDuration);
    }
  }

  public setMasterVolume(volume: number): void {
    this.audioState.masterVolume = AudioUtils.clampVolume(volume); // Corrected: Use existing or new clamp utility
    Howler.volume(this.audioState.masterVolume);
    this.eventEmitter.emit("masterVolumeChanged", this.audioState.masterVolume);
  }

  public setSFXVolume(volume: number): void {
    this.audioState.sfxVolume = AudioUtils.clampVolume(volume); // Corrected: Use existing or new clamp utility
    // Adjust volumes of active SFX or rely on new SFX picking up this volume
    this.eventEmitter.emit("sfxVolumeChanged", this.audioState.sfxVolume);
  }

  public setMusicVolume(volume: number): void {
    this.audioState.musicVolume = AudioUtils.clampVolume(volume); // Corrected: Use existing or new clamp utility
    if (
      this.activeMusic &&
      this.activeMusic.howl &&
      this.activeMusic.soundId !== undefined
    ) {
      const musicAsset = this.assetRegistry.music[this.activeMusic.id];
      if (musicAsset) {
        const newVol =
          musicAsset.volume *
          this.audioState.musicVolume *
          this.audioState.masterVolume;
        this.activeMusic.howl.volume(newVol, this.activeMusic.soundId);
      }
    }
    this.eventEmitter.emit("musicVolumeChanged", this.audioState.musicVolume);
  }

  public setMuted(muted: boolean): void {
    this.audioState.muted = muted;
    Howler.mute(muted);
    this.eventEmitter.emit("muted", muted);
  }

  public getState(): AudioState {
    return { ...this.audioState };
  }

  public stopAllSounds(): void {
    Howler.stop(); // Stops all sounds
    this.activeSounds = {};
    if (this.activeMusic) {
      this.activeMusic = null;
    }
    this.audioState.currentMusicTrack = null;
    this.eventEmitter.emit("allSoundsStopped");
  }

  public isMusicPlaying(id?: MusicTrackId): boolean {
    if (id) {
      return (
        this.activeMusic?.id === id &&
        (this.activeMusic?.howl?.playing(this.activeMusic.soundId) ?? false)
      );
    }
    return (
      this.activeMusic !== null &&
      (this.activeMusic?.howl?.playing(this.activeMusic.soundId) ?? false)
    );
  }

  // Placeholder implementations for IAudioManager Korean martial arts specific methods
  public playAttackSound(damage: number): void {
    // Determine sound based on damage
    if (damage > 50) this.playSFX("attack_heavy");
    else if (damage > 20) this.playSFX("attack_medium");
    else this.playSFX("attack_light");
  }

  public playHitSound(damage: number, isVitalPoint?: boolean): void {
    if (isVitalPoint) this.playSFX("critical_hit");
    else if (damage > 50) this.playSFX("hit_heavy");
    else if (damage > 20) this.playSFX("hit_medium");
    else this.playSFX("hit_light");
  }
  public playTechniqueSound(koreanName: string): void {
    // This might map koreanName to a specific SoundEffectId or use text-to-speech
    console.log(`Playing sound for technique: ${koreanName}`);
    this.playSFX("technique_execute"); // Generic for now
  }
  public playStanceChangeSound(): void {
    this.playSFX("stance_change");
  }
  public playBlockSound(): void {
    this.playSFX("block_success");
  }
}
