export * from "./AudioManager";
export * from "./AudioProvider";
export * from "./AudioUtils";
export * from "./DefaultSoundGenerator";
export * from "./VariantSelector";
export type {
  AudioState,
  IAudioManager,
  AudioContextState, // Use AudioContextState if it's the intended context type
  SoundEffectId,
  MusicTrackId,
  AudioPlaybackOptions,
  AudioAsset,
  AudioAssetRegistry,
  AudioFormat,
  SoundLibrary,
} from "../types/audio"; // Ensure AudioContextState is exported from types/audio
export { PLACEHOLDER_AUDIO_ASSETS } from "./placeholder-sounds";
