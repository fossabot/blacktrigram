// Core audio system types for Korean martial arts combat game

// Audio format and quality configuration - ONLY MP3 and WebM
export type AudioFormat = "webm" | "mp3";
export type AudioCategory = "sfx" | "music" | "ambient";
export type AudioQuality = "low" | "medium" | "high";

// Sound effect IDs for Korean martial arts combat
export type SoundEffectId =
  // Menu interface sounds
  | "menu_hover"
  | "menu_select"
  | "menu_back"
  | "menu_navigate"
  | "menu_click"

  // Combat attack sounds
  | "attack_light"
  | "attack_medium"
  | "attack_heavy"
  | "attack_critical"
  | "attack_punch_light"
  | "attack_punch_medium"
  | "attack_special_geon"
  | "attack_special_tae"
  | "attack_special_li"
  | "attack_special_jin"
  | "attack_special_son"
  | "attack_special_gam"
  | "attack_special_gan"
  | "attack_special_gon"

  // Hit impact sounds
  | "hit_light"
  | "hit_medium"
  | "hit_heavy"
  | "hit_critical"
  | "miss"
  | "insufficient_resources"
  | "target_selected"
  | "targeting_mode"

  // Blocking and defensive sounds
  | "block_success"
  | "block_break"

  // Movement and stance sounds
  | "stance_change"
  | "footstep"
  | "dodge"

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
  | "body_realistic_sound";

// Music track IDs for Korean martial arts themes
export type MusicTrackId =
  | "intro_theme"
  | "menu_theme"
  | "combat_theme"
  | "victory_theme"
  | "training_theme"
  | "meditation_theme"
  | "dojang_ambience";

// Audio asset configuration
export interface AudioAsset {
  readonly id: string;
  readonly category: AudioCategory;
  readonly basePath: string;
  readonly formats: readonly AudioFormat[]; // Only MP3 and WebM
  readonly variants?: readonly string[];
  readonly volume: number;
  readonly loop?: boolean;
  readonly preload?: boolean;
  readonly description: string;
  readonly koreanContext: string;
}

// Audio asset registry structure
export interface AudioAssetRegistry {
  readonly sfx: Record<SoundEffectId, AudioAsset>;
  readonly music: Record<MusicTrackId, AudioAsset>;
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
  readonly currentMusicTrack: MusicTrackId | null;
  readonly isInitialized: boolean;
  readonly fallbackMode?: boolean;
}

// Audio manager interface
export interface IAudioManager {
  playSFX(id: SoundEffectId, options?: AudioPlaybackOptions): number | null;
  playMusic(id: MusicTrackId, fadeIn?: boolean): void;
  stopMusic(fadeOut?: boolean): void;
  playAttackSound(damage: number): void;
  playHitSound(damage: number, isVitalPoint?: boolean): void;
  playStanceChangeSound(): void;
  playComboSound(comboCount: number): void;
  setMasterVolume(volume: number): void;
  setSFXVolume(volume: number): void;
  setMusicVolume(volume: number): void;
  toggleMute(): void;
  getState(): AudioState;
  preloadAssets(category?: AudioCategory): Promise<void>;
  unloadAssets(category?: AudioCategory): Promise<void>;
  cleanup(): void;
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
  readonly tracks: readonly MusicTrackId[];
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
