// System types for Black Trigram game engines
import type { Container as PixiDisplayObject, Texture } from "pixi.js";
import type { Position } from "./common"; // Fix: Remove non-existent imports
import type { TrigramStance } from "./enums";

// Fix: Add missing type definitions
export type Timestamp = number;
export type EntityId = string;
export interface Velocity {
  readonly x: number;
  readonly y: number;
}

// Configuration for the VitalPointSystem
// Result from VitalPointSystem's hit calculation - unified with anatomy.ts version
// Combat system interface
// Vital point system interface
// Trigram system interface
// Input system interface
// Gamepad state
export interface GamepadState {
  readonly id: string;
  readonly axes: readonly number[];
  readonly buttons: readonly { pressed: boolean; value: number }[];
}

// Audio system interface
// Animation system interface
// Animation configuration
export interface AnimationConfig {
  readonly name: string;
  readonly frames: readonly { texture: Texture; duration: number }[]; // Texture from PIXI
  readonly loop?: boolean;
  readonly speed?: number; // Playback speed multiplier // Added
}

// Added AnimationFrame and AnimationState for AnimationSystemInterface
export interface AnimationFrame {
  readonly texture: Texture; // Texture from PIXI
  readonly duration: number;
}

export interface AnimationState {
  readonly currentAnimationName?: string;
  readonly currentFrameIndex: number;
  readonly isPlaying: boolean;
  readonly elapsedTimeInFrame: number;
}

// Physics system interface
// Physics entity configuration
export interface PhysicsEntityConfig {
  readonly position: Position;
  readonly velocity?: Velocity;
  readonly mass?: number;
  readonly friction?: number;
  readonly restitution?: number; // Bounciness
  readonly shape:
    | { type: "circle"; radius: number }
    | { type: "rectangle"; width: number; height: number };
  readonly isStatic?: boolean; // Cannot be moved by forces // Added
}

// Added PhysicsEntityState and CollisionData for PhysicsSystemInterface
export interface PhysicsEntityState {
  readonly position: Position;
  readonly velocity: Velocity;
  readonly acceleration?: Velocity;
  readonly angularVelocity?: number;
}

export interface CollisionData {
  readonly entityA: EntityId;
  readonly entityB: EntityId;
  readonly normal: Velocity; // Collision normal vector
  readonly penetration: number; // How much they are overlapping
}

// Rendering system interface
// Renderable configuration
export interface RenderableConfig {
  readonly displayObject: PixiDisplayObject; // The PIXI object to render - use aliased import
  readonly zOrder?: number; // For sorting
  readonly visible?: boolean;
  readonly alpha?: number; // Added
  readonly parent?: EntityId | "stage"; // ID of parent renderable or stage // Added
}

// Game system manager
// System event base type
// Event bus interface for system communication
// General system configuration
// System-specific types for Korean martial arts combat

// Combat system interfaces
export interface CombatSystemConfig {
  readonly damageMultiplier: number;
  readonly criticalChance: number;
  readonly blockEffectiveness: number;
  readonly staminaDrainRate: number;
}

// Trigram system interfaces
export interface TrigramSystemConfig {
  readonly transitionSpeed: number;
  readonly energyCost: number;
  readonly effectivenessMatrix: Record<
    TrigramStance,
    Record<TrigramStance, number>
  >;
}

// Vital point system interfaces
// AI system interfaces
export interface AISystemConfig {
  readonly difficulty: "easy" | "medium" | "hard" | "expert";
  readonly reactionTime: number;
  readonly aggressiveness: number;
  readonly adaptability: number;
}
