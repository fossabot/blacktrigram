export { AudioManager, audioManager } from "./AudioManager";
export { AudioProvider, useAudio } from "./AudioProvider";
export { DefaultSoundGenerator } from "./DefaultSoundGenerator";
export { AUDIO_ASSET_REGISTRY } from "./AudioAssetRegistry";
export { VariantSelector } from "./VariantSelector";
export * from "./AudioUtils";

// Re-export useAudio as default for backward compatibility
export { useAudio as default } from "./AudioProvider";
