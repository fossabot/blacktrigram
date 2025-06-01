// Types related to audio system and Korean martial arts sound effects

// Korean martial arts sound effect mappings
export type SoundEffectId =
  | "menu_hover"
  | "menu_select"
  | "menu_back"
  | "match_start"
  | "match_end"
  | "victory"
  | "defeat"
  | "countdown"
  | "stance_change"
  | "attack_light"
  | "attack_medium"
  | "attack_heavy"
  | "attack_critical"
  | "block_success"
  | "block_break"
  | "hit_light"
  | "hit_medium"
  | "hit_heavy"
  | "hit_critical"
  | "footstep"
  | "dodge"
  | "ki_charge"
  | "ki_release"
  | "combo_buildup"
  | "combo_finish"
  | "health_low"
  | "stamina_depleted"
  | "perfect_strike"
  | "dojang_ambience"
  | "wind_effect"
  | "energy_pulse";

export type MusicTrackId =
  | "intro_theme"
  | "menu_theme"
  | "combat_theme"
  | "victory_theme"
  | "training_theme"
  | "meditation_theme";

// Audio configuration constants
export interface AudioConfig {
  readonly MASTER_VOLUME: number;
  readonly SFX_VOLUME: number;
  readonly AMBIENT_VOLUME: number;
  readonly MUSIC_VOLUME: number;
  readonly FADE_DURATION: number;
  readonly MAX_CONCURRENT_SOUNDS: number;
}

// Sound effect definitions with Korean martial arts context
export interface SoundEffectDefinition {
  src: string[];
  volume: number;
  sprite?: Record<string, [number, number]>;
  loop?: boolean;
  preload?: boolean;
  description: string;
}

export interface AudioManagerState {
  isInitialized: boolean;
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  isMuted: boolean;
  activeSounds: Map<string, any>; // Howl instances
  currentMusic?: any; // Current background music Howl
}

// Audio context and state management
export interface AudioState {
  readonly masterVolume: number;
  readonly sfxVolume: number;
  readonly musicVolume: number;
  readonly muted: boolean;
  readonly currentMusicTrack: MusicTrackId | null;
  readonly isInitialized: boolean;
}
