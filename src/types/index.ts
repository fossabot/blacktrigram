// Central type exports for Korean martial arts game

import { AnatomicalRegion } from "./GameTypes";

// Re-export all game types
export * from "./GameTypes";

// Trigram data with authentic Korean martial arts information
export const TRIGRAM_DATA = {
  geon: {
    korean: "건괘",
    english: "Heaven",
    symbol: "☰",
    color: 0xffd700,
    philosophy: "Creative force - overwhelming power and righteous strength",
  },
  tae: {
    korean: "태괘",
    english: "Lake",
    symbol: "☱",
    color: 0x87ceeb,
    philosophy: "Joyful expression - flowing adaptation and graceful movement",
  },
  li: {
    korean: "리괘",
    english: "Fire",
    symbol: "☲",
    color: 0xff4500,
    philosophy: "Brilliant illumination - rapid strikes that cling to targets",
  },
  jin: {
    korean: "진괘",
    english: "Thunder",
    symbol: "☳",
    color: 0x9370db,
    philosophy: "Arousing power - sudden overwhelming force that awakens",
  },
  son: {
    korean: "손괘",
    english: "Wind",
    symbol: "☴",
    color: 0x98fb98,
    philosophy:
      "Gentle penetration - persistent pressure that wears down resistance",
  },
  gam: {
    korean: "감괘",
    english: "Water",
    symbol: "☵",
    color: 0x4169e1,
    philosophy:
      "Abysmal depth - flowing around obstacles to find the deepest path",
  },
  gan: {
    korean: "간괘",
    english: "Mountain",
    symbol: "☶",
    color: 0x8b4513,
    philosophy:
      "Keeping still - unmovable stability waiting for the perfect moment",
  },
  gon: {
    korean: "곤괘",
    english: "Earth",
    symbol: "☷",
    color: 0x654321,
    philosophy:
      "Receptive foundation - balanced nurturing that supports all growth",
  },
} as const;

// Korean martial arts constants
export const KOREAN_MARTIAL_ARTS = {
  DOJANG_NAME: "흑괘 무술 도장",
  MASTER_TITLE: "사범님",
  STUDENT_TITLE: "제자",
  BOW_COMMAND: "경례",
  BEGIN_COMMAND: "시작",
  STOP_COMMAND: "그만",
  VICTORY: "승리",
  DEFEAT: "패배",
  DRAW: "무승부",
} as const;

// Game configuration constants
export const GAME_CONFIG = {
  CANVAS_WIDTH: 1920,
  CANVAS_HEIGHT: 1080,
  TARGET_FPS: 60,
  MAX_PLAYERS: 2,
  ROUND_DURATION: 90, // seconds
  MAX_ROUNDS: 3,
  VITAL_POINT_COUNT: 70,
  TRIGRAM_COUNT: 8,
} as const;

// Audio configuration
export const AUDIO_CONFIG = {
  MASTER_VOLUME: 0.8,
  SFX_VOLUME: 0.7,
  MUSIC_VOLUME: 0.5,
  FADE_DURATION: 1000,
} as const;

// Korean color scheme constants
export const KOREAN_COLORS = {
  RED: 0x8b0000, // Traditional Korean red
  GOLD: 0xffd700, // Golden yellow for highlights
  BLACK: 0x000000, // Deep black background
  WHITE: 0xffffff, // Pure white for contrast
  CYAN: 0x00ffd0, // Cyberpunk accent color
  BLUE: 0x4a90e2, // Dojang blue
  GRAY_DARK: 0x2c3e50, // Dark gray for UI
  GRAY_LIGHT: 0xbdc3c7, // Light gray for text
  GREEN: 0x27ae60, // Health/stamina green
  ORANGE: 0xe67e22, // Warning/energy orange
  PURPLE: 0x9b59b6, // Ki/spiritual energy
} as const;

// Korean technique database with authentic names
export const KOREAN_TECHNIQUES = {
  // Heaven (건) techniques - Direct force
  thunder_strike: {
    id: "thunder_strike",
    koreanName: "천둥벽력",
    englishName: "Thunder Strike",
    stance: "geon" as const,
    damage: 28,
    range: 80,
    accuracy: 85,
    stamina: 25,
    kiCost: 20,
    speed: 0.8,
    vitalPointMultiplier: 1.5,
    description: "A devastating overhead strike channeling heaven's power",
    philosophy:
      "Pure creative force manifesting as overwhelming physical power",
  },

  // Lake (태) techniques - Flowing redirection
  flowing_combo: {
    id: "flowing_combo",
    koreanName: "유수연타",
    englishName: "Flowing Combo",
    stance: "tae" as const,
    damage: 18,
    range: 70,
    accuracy: 90,
    stamina: 20,
    kiCost: 15,
    speed: 1.2,
    vitalPointMultiplier: 1.2,
    description: "Multiple fluid strikes that redirect and overwhelm",
    philosophy:
      "Joy in movement - flowing like water through opponent's defenses",
  },

  // Fire (리) techniques - Precision targeting
  flame_spear: {
    id: "flame_spear",
    koreanName: "화염지창",
    englishName: "Flame Spear",
    stance: "li" as const,
    damage: 35,
    range: 90,
    accuracy: 95,
    stamina: 30,
    kiCost: 25,
    speed: 0.7,
    vitalPointMultiplier: 2.0,
    description: "Precise thrust targeting vital points with fire's clarity",
    philosophy: "Illuminating precision - seeing through to the vital core",
  },

  // Thunder (진) techniques - Shocking power
  lightning_flash: {
    id: "lightning_flash",
    koreanName: "벽력일섬",
    englishName: "Lightning Flash",
    stance: "jin" as const,
    damage: 40,
    range: 85,
    accuracy: 80,
    stamina: 35,
    kiCost: 30,
    speed: 0.6,
    vitalPointMultiplier: 1.8,
    description: "Explosive technique that stuns and devastates",
    philosophy: "Sudden arousal - shocking the opponent into submission",
  },

  // Wind (손) techniques - Persistent pressure
  whirlwind: {
    id: "whirlwind",
    koreanName: "선풍연격",
    englishName: "Whirlwind",
    stance: "son" as const,
    damage: 15,
    range: 75,
    accuracy: 95,
    stamina: 15,
    kiCost: 10,
    speed: 1.5,
    vitalPointMultiplier: 1.1,
    description: "Continuous spinning attacks that build momentum",
    philosophy: "Gentle persistence - wearing down through constant pressure",
  },

  // Water (감) techniques - Adaptive flow
  counter_strike: {
    id: "counter_strike",
    koreanName: "수류반격",
    englishName: "Counter Strike",
    stance: "gam" as const,
    damage: 25,
    range: 60,
    accuracy: 85,
    stamina: 20,
    kiCost: 18,
    speed: 1.0,
    vitalPointMultiplier: 1.6,
    description: "Defensive technique that turns opponent's force against them",
    philosophy: "Abysmal depth - finding the hidden path to victory",
  },

  // Mountain (간) techniques - Defensive stance
  mountain_defense: {
    id: "mountain_defense",
    koreanName: "반석방어",
    englishName: "Mountain Defense",
    stance: "gan" as const,
    damage: 12,
    range: 50,
    accuracy: 70,
    stamina: 10,
    kiCost: 5,
    speed: 0.9,
    vitalPointMultiplier: 0.8,
    description: "Solid blocking technique that absorbs and deflects",
    philosophy: "Keeping still - immovable mountain that endures all storms",
  },

  // Earth (곤) techniques - Grounding control
  earth_grapple: {
    id: "earth_grapple",
    koreanName: "대지포옹",
    englishName: "Earth Grappling",
    stance: "gon" as const,
    damage: 30,
    range: 65,
    accuracy: 75,
    stamina: 28,
    kiCost: 22,
    speed: 0.8,
    vitalPointMultiplier: 1.3,
    description: "Grounding technique that brings opponent to earth",
    philosophy:
      "Receptive strength - embracing and controlling through yielding",
  },
} as const;

// Progress tracking interface
export interface ProgressTrackerProps {
  readonly label: string;
  readonly current: number;
  readonly maximum: number;
  readonly currentStance?: TrigramStance;
  readonly progress?: number;
  readonly onProgressChange?: (progress: number) => void;
}

// Enhanced VitalPoint interface with required properties
export interface VitalPoint {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly region: AnatomicalRegion;
  readonly bounds: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly vulnerability: {
    readonly damage: number;
    readonly stunning: number;
    readonly criticalChance: number;
  };
  readonly description: {
    readonly korean: string;
    readonly english: string;
  };
}

// Enhanced DamageResult to include all expected properties
export interface DamageResult {
  readonly damage: number;
  readonly multiplier: number;
  readonly critical: boolean;
  readonly effectType: "normal" | "critical" | "vital_point" | "blocked";
  readonly stunDuration?: number;
  readonly knockback?: number;
}

// Add missing VitalPointCategory type
export type VitalPointCategory = "primary" | "secondary" | "tertiary";

// Add missing AnatomicalRegion type with all required regions
export type AnatomicalRegion =
  | "head"
  | "neck"
  | "chest"
  | "abdomen"
  | "arms"
  | "legs";

// Export type helpers
export type KoreanTechniqueId = keyof typeof KOREAN_TECHNIQUES;
export type TrigramStance = keyof typeof TRIGRAM_DATA;

// Re-export all game types for easier imports
export * from "./GameTypes";
