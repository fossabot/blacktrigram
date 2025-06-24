/**
 * Barrel exports for systems types
 */

// Export base types
export type {
  AISystemConfig,
  AnimationSystemInterface,
  AudioSystemInterface,
  CombatSystemConfig,
  CombatSystemInterface,
  DisplayHitEffect,
  EffectSystem,
  EnvironmentalEffect,
  EventBusInterface,
  GameSystemManager,
  GameSystemState,
  HitEffect,
  InputSystemInterface,
  ParticleEffect,
  PhysicsSystemInterface,
  RenderingSystemInterface,
  StatusEffect,
  SystemConfig,
  SystemEvent,
  SystemPerformance,
  TrigramSystemConfig,
  TrigramSystemInterface,
  VisualEffect,
  VitalPointSystemConfig,
  VitalPointSystemInterface,
} from "./types";

// Export specific system types
export type {
  CombatEventData,
  CombatResult,
  CombatStats,
  CombatSystem,
  TrainingCombatResult,
} from "./combat";

export type {
  AnatomicalRegion,
  DamageResult,
  KoreanTechnique,
  VitalPoint,
  VitalPointEffect,
  VitalPointHitResult,
  VitalPointSystem,
} from "./vitalpoint";

export type {
  StanceTransition,
  TransitionMetrics,
  TransitionPath,
  TrigramCombatStyle,
  TrigramData,
  TrigramPhilosophy,
  TrigramSystem,
  TrigramTheme,
  TrigramTransitionCost,
  TrigramTransitionRule,
} from "./trigram";
