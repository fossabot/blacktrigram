/**
 * Shared game components export - keeping only truly shared components
 */

// Keep shared background component
export * from "./DojangBackground";

// Remove moved components - they're now in combat package
// export * from "./GameEngine"; // -> moved to combat/components/
// export * from "./Player";     // -> moved to combat/components/
// export * from "./PlayerVisuals"; // -> moved to combat/components/
// export * from "./HitEffectsLayer"; // -> moved to combat/components/

// Re-export types for convenience
export type {
  DojangBackgroundProps,
} from "../../types/components";
