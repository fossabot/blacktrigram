// Audio system exports for Black Trigram Korean martial arts

import {
  TECHNIQUE_SOUND_EFFECTS,
  ARCHETYPE_MUSIC_THEMES,
  ALL_PLACEHOLDER_SOUNDS,
} from "./placeholder-sounds";

// Core audio components
export { AudioManager } from "./AudioManager";
export { AudioProvider, useAudio } from "./AudioProvider";
export { AudioAssetRegistry } from "./AudioAssetRegistry";
export { AudioUtils, AUDIO_FORMATS } from "./AudioUtils";
export { DefaultSoundGenerator } from "./DefaultSoundGenerator";
export { VariantSelector } from "./VariantSelector";

// Placeholder sounds - fix import
export {
  PLACEHOLDER_AUDIO_ASSETS,
  ALL_PLACEHOLDER_SOUNDS,
  ALL_PLACEHOLDER_MUSIC,
  TECHNIQUE_SOUND_EFFECTS,
  ARCHETYPE_MUSIC_THEMES,
} from "./placeholder-sounds";

// Types
export type {
  AudioConfig,
  SoundEffect,
  MusicTrack,
  AudioAsset,
  AudioFormat,
  AudioCategory,
  SoundEffectId,
  MusicTrackId,
  AudioManagerInterface,
} from "../types/audio";

// Audio constants
export const AUDIO_SYSTEM_CONFIG = {
  MAX_CONCURRENT_SOUNDS: 32,
  DEFAULT_VOLUME: 0.7,
  FADE_DURATION: 1000,
  PRELOAD_PRIORITY_SOUNDS: true,
} as const;

// Korean martial arts audio integration
export const KOREAN_MARTIAL_ARTS_AUDIO = {
  TRIGRAM_SOUNDS: TECHNIQUE_SOUND_EFFECTS,
  ARCHETYPE_THEMES: ARCHETYPE_MUSIC_THEMES,
  COMBAT_EFFECTS: ALL_PLACEHOLDER_SOUNDS,
} as const;
