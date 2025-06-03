// filepath: /workspaces/blacktrigram/src/types/constants/game.ts
// General game engine and application constants

export const DEFAULT_GAME_SPEED = 1.0;

// Game configuration constants for Korean martial arts simulator

// Main game configuration
export const GAME_CONFIG = {
  // Match settings
  ROUND_DURATION: 180000, // 3 minutes in milliseconds
  MAX_ROUNDS: 3,
  SUDDEN_DEATH_DURATION: 60000, // 1 minute

  // Player settings
  MAX_PLAYERS: 2,
  DEFAULT_HEALTH: 100,
  DEFAULT_KI: 100,
  DEFAULT_STAMINA: 100,

  // Performance settings
  TARGET_FPS: 60,
  MAX_PARTICLES: 100,
  MAX_SOUND_CHANNELS: 8,

  // UI settings
  UI_FADE_DURATION: 300,
  NOTIFICATION_DURATION: 3000,

  // Training settings
  TRAINING_ROUNDS: 5,
  PRACTICE_TIME_LIMIT: 600000, // 10 minutes

  // Add missing properties for backward compatibility
  MAX_HEALTH: 100, // Alias for DEFAULT_HEALTH
  MAX_KI: 100, // Alias for DEFAULT_KI
  MAX_STAMINA: 100, // Alias for DEFAULT_STAMINA
} as const;

// Game phases for state management
export const GAME_PHASES = {
  INTRO: "intro",
  MENU: "menu",
  TRAINING: "training",
  COMBAT: "combat",
  PAUSED: "paused",
  GAME_OVER: "game_over",
  VICTORY: "victory",
  DEFEAT: "defeat",
} as const;

// Korean martial arts specific settings
export const MARTIAL_ARTS_CONFIG = {
  // Trigram transition settings
  STANCE_CHANGE_DURATION: 400,
  KI_COST_PER_STANCE_CHANGE: 5,

  // Vital point system
  TOTAL_VITAL_POINTS: 70,
  VITAL_POINT_ACCURACY_THRESHOLD: 0.8,

  // Philosophy integration
  RESPECT_BONUS: 1.1,
  DISCIPLINE_BONUS: 1.15,
  PRECISION_BONUS: 1.2,
} as const;
