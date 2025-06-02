import type { DamageType } from "../enums";
import type { DamageRange } from "../common";

// Korean technique damage ranges
export const KOREAN_TECHNIQUE_DAMAGE: Record<string, DamageRange> = {
  light_strike: { min: 15, max: 35, type: "blunt" as DamageType },
  medium_strike: { min: 10, max: 25, type: "blunt" as DamageType },
  vital_point: { min: 25, max: 50, type: "pressure" as DamageType },
  nerve_strike: { min: 5, max: 15, type: "nerve" as DamageType },
} as const;

// Technique execution timings (frame data)
export const TECHNIQUE_TIMINGS = {
  STARTUP_FRAMES: {
    FAST: 3,
    NORMAL: 6,
    SLOW: 12,
  },
  ACTIVE_FRAMES: {
    FAST: 2,
    NORMAL: 4,
    SLOW: 8,
  },
  RECOVERY_FRAMES: {
    FAST: 8,
    NORMAL: 15,
    SLOW: 25,
  },
} as const;

// Technique properties
export const TECHNIQUE_PROPERTIES = {
  UNBLOCKABLE: "unblockable",
  ARMOR_PIERCING: "armor_piercing",
  COUNTER_HIT: "counter_hit",
  PROJECTILE: "projectile",
  ANTI_AIR: "anti_air",
  LOW_ATTACK: "low_attack",
  OVERHEAD: "overhead",
  COMMAND_GRAB: "command_grab",
} as const;
