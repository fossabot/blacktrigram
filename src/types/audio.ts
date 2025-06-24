// Audio type definitions for Korean martial arts game

// Export AudioCategory enum (only one declaration)
export enum AudioCategory {
  SFX = "sfx",
  MUSIC = "music",
  VOICE = "voice",
  UI = "ui",
  // Remove AMBIENT since it's causing errors
}

import { AudioAssetRegistry, AudioConfig, EnhancedAudioAsset } from "@/audio";
// Use AudioCategory from enums instead of defining locally

// Audio context for spatial audio
export interface AudioContext3D {
  readonly position: { x: number; y: number; z?: number };
  readonly velocity?: { x: number; y: number; z?: number };
  readonly orientation?: { x: number; y: number; z?: number };
  readonly maxDistance?: number;
  readonly rolloffFactor?: number;
}

// Combat audio mapping
// Add missing type exports
export type SoundEffectId = string;
export type MusicTrackId = string;
export type VoiceLineId = string;

// Audio format type (string literals only, not enum)
export type AudioFormat =
  | "audio/mp3"
  | "audio/wav"
  | "audio/ogg"
  | "audio/webm";

// Audio effect definitions
export interface AudioEffect {
  readonly type: "reverb" | "delay" | "distortion" | "filter" | "compressor";
  readonly parameters: Record<string, number>;
  readonly enabled: boolean;
}

// Audio mixer channel
export interface AudioChannel {
  readonly id: string;
  readonly category: AudioCategory;
  readonly volume: number;
  readonly muted: boolean;
  readonly effects: readonly AudioEffect[];
  readonly connectedSources: readonly string[];
}

// Enhanced audio registry with proper types
export interface EnhancedAudioAssetRegistry extends AudioAssetRegistry {
  readonly enhanced?: Record<string, EnhancedAudioAsset>;
}

// Audio platform capabilities
export interface AudioCapabilities {
  readonly supportsWebAudio: boolean;
  readonly supportsHowler: boolean;
  readonly maxSources: number;
  readonly formats: readonly string[];
  readonly spatialAudio: boolean;
  readonly realTimeEffects: boolean;
}

// AudioAsset interface for loadAsset method
export interface AudioAsset {
  readonly id: string;
  readonly url: string;
  readonly volume?: number;
  readonly formats?: readonly string[];
  readonly type?: "sound" | "music" | "voice";
}

export interface IAudioManager {
  readonly isInitialized: boolean;
  readonly masterVolume: number;
  readonly sfxVolume: number;
  readonly musicVolume: number;
  readonly muted: boolean;

  initialize(config?: AudioConfig): Promise<void>;
  loadAsset(asset: AudioAsset): Promise<void>; // ✅ Added missing method
  setVolume(type: "master" | "sfx" | "music" | "voice", volume: number): void;
  playMusic(trackId: string): Promise<void>;
  playSoundEffect(soundId: string): Promise<void>;
  playSFX(soundId: string, volume?: number): Promise<void>; // ✅ Added missing playSFX method
  stopMusic(): void;
  mute(): void;
  unmute(): void;
  playKoreanTechniqueSound(
    techniqueId: string,
    archetype: string
  ): Promise<void>;
  playTrigramStanceSound(stance: string): Promise<void>;
  playVitalPointHitSound(severity: string): Promise<void>;
  playDojiangAmbience(): Promise<void>;
}
