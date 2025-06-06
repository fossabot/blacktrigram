// Core audio system types for Korean martial arts combat game

import { TrigramStance } from "./enums";
import type { KoreanText } from "./korean-text"; // Corrected import

// Audio format and quality configuration - ONLY MP3 and WebM
export type AudioFormat = "webm" | "mp3";
export type AudioCategory =
  | "sfx"
  | "music"
  | "ambient"
  | "ui" // Add missing category
  | "combat" // Add missing category
  | "ki_energy" // Add missing category
  | "match" // Add missing category
  | "combo" // Add missing category
  | "status"; // Add missing category
export type AudioQuality = "low" | "medium" | "high";

// Sound effect IDs for Korean martial arts combat
export type SoundEffectId =
  // Menu interface sounds
  | "menu_hover"
  | "menu_select"
  | "menu_back"

  // Combat attack sounds
  | "attack_light"
  | "attack_medium"
  | "attack_heavy"
  | "attack_critical"

  // Hit impact sounds
  | "hit_light"
  | "hit_medium"
  | "hit_heavy"
  | "hit_critical"

  // Blocking and defensive sounds
  | "block_success"
  | "block_break"

  // Movement and stance sounds
  | "stance_change"

  // Ki energy system sounds
  | "ki_charge"
  | "ki_release"
  | "energy_pulse"

  // Match flow sounds
  | "match_start"
  | "match_end"
  | "victory"
  | "defeat"
  | "countdown"

  // Combo and special effects
  | "combo_buildup"
  | "combo_finish"
  | "perfect_strike"

  // Status and warning sounds
  | "health_low"
  | "stamina_depleted"

  // Environmental and ambient effects
  | "dojang_ambience"
  | "wind_effect"

  // Generic/misc sounds
  | "body_realistic_sound"

  // Added missing sound effect IDs
  | "action_blocked"
  | "critical_hit"
  | "heavy_hit"
  | "light_hit"
  | "stance_select"
  | "technique_execute"
  | "combat_end" // Added from constants/combat.ts
  | "miss" // Added from constants/combat.ts
  | "guard" // Added from constants/combat.ts
  | "technique"; // Added from constants/combat.ts

// Music track IDs for Korean martial arts themes
export type MusicTrackId =
  | "combat_theme"
  | "menu_theme"
  | "training_theme"
  | "intro_theme"
  | "victory_theme"
  | "ambient_dojang";

// Add MusicId as alias for backward compatibility
export type MusicId = MusicTrackId;

// Audio asset configuration
export interface AudioAsset {
  readonly id: string;
  readonly url: string; // Add missing url property
  readonly category: AudioCategory;
  readonly basePath: string;
  readonly koreanContext: KoreanText; // Change from string to KoreanText
  readonly formats: readonly AudioFormat[];
  readonly volume: number;
  readonly preload: boolean;
  readonly loop?: boolean;
  readonly fadeIn?: number;
  readonly fadeOut?: number;
  readonly variants?: readonly string[];
  readonly trigram?: TrigramStance;
  readonly culturalSignificance?: string;
  readonly techniqueAssociation?: string;
}

// Audio asset registry structure
export interface AudioAssetRegistry {
  readonly sfx: Record<SoundEffectId, AudioAsset>;
  readonly music: Record<MusicTrackId, AudioAsset>; // Fixed: Use MusicTrackId
}

// Audio playback options
export interface AudioPlaybackOptions {
  readonly volume?: number;
  readonly loop?: boolean;
  readonly rate?: number;
  readonly fadeIn?: number;
  readonly fadeOut?: number;
  readonly delay?: number;
  readonly variant?: string;
}

// Audio system state
export interface AudioState {
  readonly masterVolume: number;
  readonly sfxVolume: number;
  readonly musicVolume: number;
  readonly muted: boolean;
  readonly currentMusicTrack?: MusicTrackId | null; // Fixed: Use MusicTrackId
  readonly isInitialized: boolean;
  readonly fallbackMode?: boolean;
}

// Audio manager interface
export interface IAudioManager {
  playSFX(id: SoundEffectId, options?: AudioPlaybackOptions): number | null;
  playMusic(id: MusicTrackId, options?: AudioPlaybackOptions): number | null; // Fixed: Use MusicTrackId
  stopMusic(): void;
  setMasterVolume(volume: number): void;
  setSFXVolume(volume: number): void;
  setMusicVolume(volume: number): void;
  setMuted(muted: boolean): void;
  getState(): AudioState; // Add missing method

  // Korean martial arts specific methods
  playAttackSound(damage: number): void;
  playHitSound(damage: number, isVitalPoint?: boolean): void;
  playTechniqueSound(koreanName: string): void;
  playStanceChangeSound(): void;
  playBlockSound(): void;
  stopAllSounds(): void;
}

// Audio configuration constants
export interface AudioConfig {
  readonly MASTER_VOLUME: number;
  readonly SFX_VOLUME: number;
  readonly AMBIENT_VOLUME: number;
  readonly MUSIC_VOLUME: number;
  readonly FADE_DURATION: number;
  readonly MAX_CONCURRENT_SOUNDS: number;
}

// Spatial audio for 3D positioning in combat
export interface SpatialAudioOptions {
  readonly position: { x: number; y: number; z?: number };
  readonly maxDistance: number;
  readonly rolloffFactor?: number;
  readonly orientation?: { x: number; y: number; z: number };
}

// Audio effect processing
export interface AudioEffectOptions {
  readonly reverb?: {
    roomSize: number;
    damping: number;
    wetLevel: number;
  };
  readonly distortion?: {
    amount: number;
    oversample: OverSampleType;
  };
  readonly filter?: {
    type: BiquadFilterType;
    frequency: number;
    Q?: number;
  };
}

// Korean martial arts specific audio events
export interface CombatAudioEvent {
  readonly type: "attack" | "hit" | "block" | "stance_change" | "vital_point";
  readonly intensity: number; // 0-100
  readonly archetype?: "musa" | "amsalja" | "hacker" | "jeongbo" | "jojik";
  readonly trigram?:
    | "geon"
    | "tae"
    | "li"
    | "jin"
    | "son"
    | "gam"
    | "gan"
    | "gon";
  readonly vitalPoint?: boolean;
  readonly comboCount?: number;
}

// Audio loading and error handling
export interface AudioLoadResult {
  readonly success: boolean;
  readonly assetId: string;
  readonly error?: string;
  readonly fallbackUsed?: boolean;
}

// Audio analytics for performance monitoring
export interface AudioAnalytics {
  readonly totalAssetsLoaded: number;
  readonly failedLoads: number;
  readonly fallbacksUsed: number;
  readonly averageLoadTime: number;
  readonly memoryUsage: number;
}

// Added missing types
export type SoundLibrary = {
  readonly [K in SoundEffectId]?: HTMLAudioElement | AudioBuffer;
};

export interface MusicPlaylist {
  readonly id: string;
  readonly name: string;
  readonly tracks: readonly MusicTrackId[]; // Fixed: Use MusicTrackId
  readonly shuffle: boolean;
  readonly repeat: "none" | "track" | "playlist";
}

export interface AudioSystemControls extends IAudioManager {
  // Could extend IAudioManager or define specific control methods
  setVolume(category: AudioCategory | "master", volume: number): void;
  isMuted(category?: AudioCategory | "master"): boolean;
  toggleMute(category?: AudioCategory | "master"): void;
  // Add other specific control methods if needed
}

export interface ProceduralSoundConfig {
  readonly type: "sine" | "square" | "sawtooth" | "triangle" | "noise";
  readonly frequency?: number;
  readonly duration: number;
  readonly attack?: number; // ADSR envelope
  readonly decay?: number;
  readonly sustain?: number;
  readonly release?: number;
  readonly volume?: number;
}

// Missing audio types
export interface AudioContextState {
  readonly initialized: boolean;
  readonly suspended: boolean;
  readonly volume: number;
}

export type SoundEffect = SoundEffectId; // Alias for compatibility

export interface AudioManagerInterface {
  readonly isInitialized: boolean;
  readonly volume: number;
  playMusic(trackId: string, loop?: boolean): void;
  stopMusic(fadeOut?: boolean): void;
  playSFX(effectId: SoundEffectId): void;
  setVolume(volume: number): void;
}
