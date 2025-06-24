// Combat effects and status system for Korean martial arts

// Hit effect for visual feedback
// Hit effect types
export enum HitEffectType {
  GENERAL_DAMAGE = "general_damage",
  CRITICAL_HIT = "critical_hit",
  VITAL_POINT_STRIKE = "vital_point_strike",
  STATUS_EFFECT = "status_effect",
  MISS = "miss",
  BLOCK = "block",
  PARRY = "parry",
  COUNTER = "counter",
  HIT = "hit",
}

// Fix: Add missing EffectIntensity values
export type EffectIntensity =
  | "weak" // Fix: Add weak
  | "minor"
  | "low"
  | "medium"
  | "moderate"
  | "high"
  | "severe"
  | "critical"
  | "extreme"; // Fix: Add extreme

// Status effects that can be applied to players
// Effect types
export type EffectType =
  | "stun"
  | "poison"
  | "burn"
  | "bleed"
  | "exhausted"
  | "focused"
  | "rage"
  | "defensive"
  | "weakened"
  | "strengthened"
  | "paralysis" // Add missing paralysis
  | "confusion" // Add missing confusion
  | "vulnerability" // Add missing vulnerability
  | "stamina_drain"; // Add missing stamina_drain

// Particle effect for visual feedback
// Particle effect types
export enum ParticleType {
  SPARK = "spark",
  BLOOD = "blood",
  ENERGY = "energy",
  DUST = "dust",
  FLASH = "flash",
  SMOKE = "smoke",
  LIGHTNING = "lightning",
  WIND = "wind",
}

// Environmental effect
// Environmental effect types
export enum EnvironmentalEffectType {
  SMOKE = "smoke",
  FIRE = "fire",
  ICE = "ice",
  WIND = "wind",
  LIGHTNING = "lightning",
  DARKNESS = "darkness",
  LIGHT = "light",
  PRESSURE = "pressure",
}
