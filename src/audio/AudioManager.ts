// Extend Window interface for webkit audio context
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

import { Howl, Howler } from "howler";
import type {
  AudioState,
  IAudioManager,
  SoundEffectId,
  MusicTrackId,
  AudioPlaybackOptions,
  AudioConfig,
  AudioAsset,
  AudioCategory,
} from "../types/audio";
import { AUDIO_ASSET_REGISTRY, AudioAssetUtils } from "./AudioAssetRegistry";
import { SmartVariantSelector } from "./VariantSelector";

// Configuration moved to types
const AUDIO_CONFIG: AudioConfig = {
  MASTER_VOLUME: 0.8,
  SFX_VOLUME: 0.7,
  AMBIENT_VOLUME: 0.4,
  MUSIC_VOLUME: 0.6,
  FADE_DURATION: 1000,
  MAX_CONCURRENT_SOUNDS: 8,
} as const;

class AudioManager implements IAudioManager {
  private static instance: AudioManager;
  private sounds: Map<string, Howl> = new Map();
  private music: Map<MusicTrackId, Howl> = new Map();
  private currentMusic: Howl | null = null;
  private variantSelector = new SmartVariantSelector("adaptive");
  private useFallbackSounds: boolean = false;

  private state: AudioState = {
    masterVolume: AUDIO_CONFIG.MASTER_VOLUME,
    sfxVolume: AUDIO_CONFIG.SFX_VOLUME,
    musicVolume: AUDIO_CONFIG.MUSIC_VOLUME,
    muted: false,
    currentMusicTrack: null,
    isInitialized: false,
  };

  private constructor() {
    this.initializeAudioSystem();
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  private async initializeAudioSystem(): Promise<void> {
    try {
      Howler.autoUnlock = true;
      Howler.html5PoolSize = AUDIO_CONFIG.MAX_CONCURRENT_SOUNDS;
      Howler.volume(this.state.masterVolume);

      await this.preloadAssets();
      this.state = { ...this.state, isInitialized: true };
      console.log("🎵 AudioManager initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize AudioManager:", error);
      this.useFallbackSounds = true;
      this.state = { ...this.state, isInitialized: true, fallbackMode: true };
    }
  }

  // Enhanced playSFX with variant support
  public playSFX(
    id: SoundEffectId,
    options: AudioPlaybackOptions = {}
  ): number | null {
    if (this.state.muted || !this.state.isInitialized) return null;

    if (this.useFallbackSounds) {
      this.playFallbackSound(id);
      return null;
    }

    // Check if we should play a specific variant
    const soundKey = this.resolveSoundKey(id, options.variant);
    const sound = this.sounds.get(soundKey);

    if (!sound) {
      console.warn(`🔇 Sound effect not found: ${soundKey}, using fallback`);
      this.playFallbackSound(id);
      return null;
    }

    try {
      const soundId = sound.play();

      if (options.volume !== undefined) {
        sound.volume(options.volume * this.state.sfxVolume, soundId);
      }

      if (options.rate !== undefined) {
        sound.rate(options.rate, soundId);
      }

      if (options.fadeIn) {
        sound.volume(0, soundId);
        sound.fade(
          0,
          options.volume || sound.volume(),
          options.fadeIn,
          soundId
        );
      }

      return soundId;
    } catch (error) {
      console.error(`❌ Failed to play sound ${soundKey}:`, error);
      this.playFallbackSound(id);
      return null;
    }
  }

  private resolveSoundKey(
    id: SoundEffectId,
    requestedVariant?: string
  ): string {
    const asset = AUDIO_ASSET_REGISTRY.sfx[id];
    if (!asset) return id;

    // If specific variant requested and exists, use it
    if (requestedVariant && asset.variants?.includes(requestedVariant)) {
      return `${id}_${requestedVariant}`;
    }

    // If asset has variants, select one using strategy
    if (asset.variants && asset.variants.length > 0) {
      const selectedVariant = this.variantSelector.selectVariant(
        id,
        asset.variants
      );
      return selectedVariant ? `${id}_${selectedVariant}` : id;
    }

    // Use base sound
    return id;
  }

  async preloadAssets(category?: AudioCategory): Promise<void> {
    const assetsToLoad = category
      ? AudioAssetUtils.getAssetsByCategory(category)
      : [
          ...Object.values(AUDIO_ASSET_REGISTRY.sfx),
          ...Object.values(AUDIO_ASSET_REGISTRY.music),
        ];

    const loadPromises = assetsToLoad.map((asset: AudioAsset) =>
      this.loadAsset(asset)
    );
    await Promise.allSettled(loadPromises);
  }

  private async loadAsset(asset: AudioAsset): Promise<void> {
    return new Promise((resolve, reject) => {
      const paths = AudioAssetUtils.getAssetPaths(asset);

      const sound = new Howl({
        src: paths,
        volume:
          asset.volume *
          (asset.category === "music"
            ? this.state.musicVolume
            : this.state.sfxVolume),
        loop: asset.loop || false,
        preload: asset.preload || false,
        onload: () => {
          console.log(`🎵 Loaded: ${asset.id} - ${asset.description}`);
          resolve();
        },
        onloaderror: (_id, error) => {
          console.warn(`⚠️ Failed to load ${asset.id}:`, error);
          this.useFallbackSounds = true;
          reject(error);
        },
      });

      // Store base sound and variants
      if (asset.category === "music") {
        this.music.set(asset.id as MusicTrackId, sound);
      } else {
        this.sounds.set(asset.id, sound);

        // Load variants as separate sounds for individual control
        if (asset.variants) {
          const variantsArray = [...asset.variants]; // Convert readonly to mutable
          variantsArray.forEach((variant) => {
            const variantPaths = asset.formats.map((format) =>
              AudioAssetUtils.getVariantPath(asset, variant, format)
            );

            const variantSound = new Howl({
              src: variantPaths,
              volume: asset.volume * this.state.sfxVolume,
              loop: asset.loop || false,
              preload: asset.preload || false,
            });

            this.sounds.set(`${asset.id}_${variant}`, variantSound);
          });
        }
      }
    });
  }

  // Specialized sound methods for game events
  public playAttackSound(damage: number): void {
    if (this.useFallbackSounds) {
      // Dynamic import for fallback
      import("./DefaultSoundGenerator")
        .then(({ defaultSoundGenerator }) => {
          defaultSoundGenerator.playAttackSound(damage);
        })
        .catch((error) => {
          console.warn("Failed to load fallback sound generator:", error);
        });
      return;
    }

    if (damage >= 35) {
      this.playSFX("attack_critical");
    } else if (damage >= 25) {
      this.playSFX("attack_heavy");
    } else if (damage >= 15) {
      this.playSFX("attack_medium");
    } else {
      this.playSFX("attack_light");
    }
  }

  public playHitSound(damage: number, isVitalPoint: boolean = false): void {
    if (this.useFallbackSounds) {
      // Dynamic import for fallback
      import("./DefaultSoundGenerator")
        .then(({ defaultSoundGenerator }) => {
          defaultSoundGenerator.playHitSound(damage, isVitalPoint);
        })
        .catch((error) => {
          console.warn("Failed to load fallback sound generator:", error);
        });
      return;
    }

    if (isVitalPoint) {
      this.playSFX("hit_critical");
      this.playSFX("perfect_strike", { delay: 100 });
    } else if (damage >= 30) {
      this.playSFX("hit_heavy");
    } else if (damage >= 20) {
      this.playSFX("hit_medium");
    } else {
      this.playSFX("hit_light");
    }
  }

  public playStanceChangeSound(): void {
    if (this.useFallbackSounds) {
      // Dynamic import for fallback
      import("./DefaultSoundGenerator")
        .then(({ defaultSoundGenerator }) => {
          defaultSoundGenerator.playStanceChangeSound();
        })
        .catch((error) => {
          console.warn("Failed to load fallback sound generator:", error);
        });
      return;
    }

    this.playSFX("stance_change");
    // Add slight delay for energy pulse based on trigram
    setTimeout(() => {
      this.playSFX("energy_pulse", { volume: 0.3 });
    }, 150);
  }

  public playComboSound(comboCount: number): void {
    if (this.useFallbackSounds) {
      // Dynamic import for fallback
      import("./DefaultSoundGenerator")
        .then(({ defaultSoundGenerator }) => {
          defaultSoundGenerator.playComboSound(comboCount);
        })
        .catch((error) => {
          console.warn("Failed to load fallback sound generator:", error);
        });
      return;
    }

    if (comboCount >= 5) {
      this.playSFX("combo_finish");
    } else if (comboCount >= 2) {
      this.playSFX("combo_buildup", { rate: 1 + comboCount * 0.1 });
    }
  }

  // Music management
  public playMusic(id: MusicTrackId, fadeIn: boolean = true): void {
    if (this.state.muted) return;

    // Stop current music if playing
    if (this.currentMusic) {
      this.stopMusic(fadeIn);
    }

    const music = this.music.get(id);
    if (!music) {
      console.warn(`🔇 Music track not found: ${id}`);
      return;
    }

    try {
      if (fadeIn) {
        music.volume(0);
        const musicId = music.play();
        music.fade(
          0,
          this.state.musicVolume,
          AUDIO_CONFIG.FADE_DURATION,
          musicId
        );
      } else {
        music.volume(this.state.musicVolume);
        music.play();
      }

      this.currentMusic = music;
      this.state = { ...this.state, currentMusicTrack: id };
    } catch (error) {
      console.error(`❌ Failed to play music ${id}:`, error);
    }
  }

  public stopMusic(fadeOut: boolean = true): void {
    if (!this.currentMusic) return;

    try {
      if (fadeOut) {
        this.currentMusic.fade(
          this.state.musicVolume,
          0,
          AUDIO_CONFIG.FADE_DURATION
        );
        setTimeout(() => {
          this.currentMusic?.stop();
          this.currentMusic = null;
          this.state = { ...this.state, currentMusicTrack: null };
        }, AUDIO_CONFIG.FADE_DURATION);
      } else {
        this.currentMusic.stop();
        this.currentMusic = null;
        this.state = { ...this.state, currentMusicTrack: null };
      }
    } catch (error) {
      console.error("❌ Failed to stop music:", error);
    }
  }

  // Volume and state management
  public setMasterVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.state = { ...this.state, masterVolume: clampedVolume };
    Howler.volume(clampedVolume);
  }

  public setSFXVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.state = { ...this.state, sfxVolume: clampedVolume };

    // Update all loaded sound effects
    this.sounds.forEach((sound) => {
      sound.volume(clampedVolume);
    });
  }

  public setMusicVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.state = { ...this.state, musicVolume: clampedVolume };

    // Update current music if playing
    if (this.currentMusic) {
      this.currentMusic.volume(clampedVolume);
    }
  }

  public toggleMute(): void {
    this.state = { ...this.state, muted: !this.state.muted };
    Howler.mute(this.state.muted);
  }

  public getState(): AudioState {
    return { ...this.state };
  }

  async unloadAssets(category?: AudioCategory): Promise<void> {
    if (category) {
      // Unload specific category
      const assetsToUnload = AudioAssetUtils.getAssetsByCategory(category);

      assetsToUnload.forEach((asset) => {
        if (asset.category === "music") {
          const music = this.music.get(asset.id as MusicTrackId);
          if (music) {
            music.unload();
            this.music.delete(asset.id as MusicTrackId);
          }
        } else {
          const sound = this.sounds.get(asset.id);
          if (sound) {
            sound.unload();
            this.sounds.delete(asset.id);
          }

          // Also unload variants
          if (asset.variants) {
            const variantsArray = [...asset.variants]; // Convert readonly to mutable
            variantsArray.forEach((variant) => {
              const variantKey = `${asset.id}_${variant}`;
              const variantSound = this.sounds.get(variantKey);
              if (variantSound) {
                variantSound.unload();
                this.sounds.delete(variantKey);
              }
            });
          }
        }
      });
    } else {
      // Unload all assets
      this.cleanup();
    }
  }

  private async playFallbackSound(id: SoundEffectId): Promise<void> {
    if (this.state.muted) return;

    try {
      // Dynamic import to avoid unused import error
      const { defaultSoundGenerator } = await import("./DefaultSoundGenerator");

      switch (id) {
        case "menu_hover":
        case "menu_select":
        case "menu_back":
          await defaultSoundGenerator.playMenuSound();
          break;
        case "match_start":
          await defaultSoundGenerator.playMatchStartSound();
          break;
        case "victory":
          await defaultSoundGenerator.playVictorySound();
          break;
        case "stance_change":
          await defaultSoundGenerator.playStanceChangeSound();
          break;
        case "attack_light":
        case "attack_medium":
        case "attack_heavy":
        case "attack_critical":
          const damage =
            id === "attack_critical"
              ? 40
              : id === "attack_heavy"
              ? 30
              : id === "attack_medium"
              ? 20
              : 10;
          await defaultSoundGenerator.playAttackSound(damage);
          break;
        case "hit_light":
        case "hit_medium":
        case "hit_heavy":
        case "hit_critical":
          const hitDamage =
            id === "hit_critical"
              ? 40
              : id === "hit_heavy"
              ? 30
              : id === "hit_medium"
              ? 20
              : 10;
          const isVital = id === "hit_critical";
          await defaultSoundGenerator.playHitSound(hitDamage, isVital);
          break;
        case "combo_buildup":
        case "combo_finish":
          const comboLevel = id === "combo_finish" ? 5 : 3;
          await defaultSoundGenerator.playComboSound(comboLevel);
          break;
        default:
          // Generic fallback
          await defaultSoundGenerator.playMenuSound();
      }
    } catch (error) {
      console.warn(`Failed to play fallback sound for ${id}:`, error);
    }
  }

  // Cleanup
  public cleanup(): void {
    this.stopMusic(false);
    this.sounds.forEach((sound) => sound.unload());
    this.music.forEach((music) => music.unload());
    this.sounds.clear();
    this.music.clear();
  }
}

// Export singleton instance and hook
export const audioManager = AudioManager.getInstance();
export function useAudio(): AudioManager {
  return audioManager;
}
