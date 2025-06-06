import type { AudioAsset } from "../types/audio";

// Remove conflicting imports and define our own interface
export interface AudioAssetRegistry {
  [key: string]: AudioAsset;
}

export const AUDIO_ASSET_REGISTRY: AudioAssetRegistry = {
  // Sound Effects - combat and UI sounds
  hit_light: {
    id: "hit_light",
    url: "/audio/sfx/hit_light.mp3", // Added
    basePath: "/audio/sfx/", // Added
    formats: ["mp3"], // Added
    preload: true, // Added
    category: "combat",
    koreanContext: {
      korean: "가벼운 타격음",
      english: "Light strike sound",
    },
    volume: 0.6,
    loop: false,
  },

  hit_medium: {
    id: "hit_medium",
    url: "/audio/sfx/hit_medium.mp3", // Added
    basePath: "/audio/sfx/", // Added
    formats: ["mp3"], // Added
    preload: true, // Added
    category: "combat",
    koreanContext: {
      korean: "중간 타격음",
      english: "Medium strike sound",
    },
    volume: 0.7,
    loop: false,
  },

  hit_heavy: {
    id: "hit_heavy",
    url: "/audio/sfx/hit_heavy.mp3", // Added
    basePath: "/audio/sfx/", // Added
    formats: ["mp3"], // Added
    preload: true, // Added
    category: "combat",
    koreanContext: {
      korean: "강한 타격음",
      english: "Heavy strike sound",
    },
    volume: 0.8,
    loop: false,
  },

  // Add missing sound effects that are referenced
  victory: {
    id: "victory",
    url: "/audio/ui/victory.mp3", // Added
    basePath: "/audio/ui/", // Added
    formats: ["mp3"], // Added
    preload: true, // Added
    category: "ui",
    koreanContext: {
      korean: "승리",
      english: "Victory",
    },
    volume: 0.8,
    loop: false,
  },

  // Add missing music track
  combat_theme: {
    id: "combat_theme",
    url: "/audio/music/combat_theme.mp3", // Added
    basePath: "/audio/music/", // Added
    formats: ["mp3"], // Added
    preload: true, // Added
    category: "music",
    koreanContext: {
      korean: "전투 음악",
      english: "Combat Music",
    },
    volume: 0.5,
    loop: true,
  },

  // ...existing code for other assets...
} as const;

// Fix helper functions with proper type checking
export function getSoundAsset(id: string): AudioAsset | undefined {
  return AUDIO_ASSET_REGISTRY[id];
}

export function getMusicAsset(id: string): AudioAsset | undefined {
  return AUDIO_ASSET_REGISTRY[id];
}
