// filepath: /workspaces/blacktrigram/src/types/constants/game.ts
// General game engine and application constants

export const DEFAULT_GAME_SPEED = 1.0;
export const TARGET_FPS = 60;

export const GAME_CONFIG = {
  MAX_HEALTH: 100,
  MAX_KI: 100,
  MAX_STAMINA: 100,
  ROUND_TIME_SECONDS: 180, // Renamed from ROUND_TIME for clarity
  MAX_ROUNDS: 3,
  DAMAGE_VARIANCE_PERCENT: 0.1,
  CRITICAL_HIT_MULTIPLIER: 1.5,
  BLOCK_DAMAGE_REDUCTION_PERCENT: 0.5,
  STANCE_CHANGE_COOLDOWN_MS: 500,
  VITAL_POINT_ACCURACY_MODIFIER: 0.8,
  BASE_KI_RECOVERY_RATE: 5, // units per second
  BASE_STAMINA_RECOVERY_RATE: 10, // units per second
} as const;
