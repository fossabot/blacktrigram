// filepath: /workspaces/blacktrigram/src/types/constants/game.ts
// General game engine and application constants

export const DEFAULT_GAME_SPEED = 1.0;
export const TARGET_FPS = 60;

// Game configuration constants
export const GAME_CONFIG = {
  MAX_HEALTH: 100,
  MAX_KI: 100,
  MAX_STAMINA: 100,
  BASE_DAMAGE: 15,
  CRITICAL_MULTIPLIER: 1.5,
  ROUND_TIME_SECONDS: 180,
  MAX_ROUNDS: 3,
} as const;

export const GAME_PHASES = {
  INTRO: "intro",
  TRAINING: "training",
  COMBAT: "combat",
  VICTORY: "victory",
  DEFEAT: "defeat",
  PHILOSOPHY: "philosophy",
} as const;

export type GameConfig = typeof GAME_CONFIG;
