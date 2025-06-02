// System types for Black Trigram game engines
import type { Position } from "./common"; // Corrected import for Position
import type { AudioAsset } from "./audio"; // Added AudioAsset, removed AudioConfig
import type { PlayerArchetype, TrigramStance } from "./enums"; // Added PlayerArchetype, TrigramStance
import type { KoreanTechnique, CombatResult } from "./combat"; // Added KoreanTechnique, CombatResult
import type { PlayerState } from "./player"; // Added PlayerState
import type { StatusEffect } from "./effects"; // Added StatusEffect
import type { VitalPoint } from "./anatomy"; // Added VitalPoint

// Configuration for the VitalPointSystem
export interface VitalPointSystemConfig {
  readonly baseAccuracyMultiplier?: number;
  readonly damageVariance?: number;
  readonly archetypeModifiers?: Record<PlayerArchetype, Record<string, number>>;
  readonly baseDamageMultiplier?: number;
  readonly vitalPointSeverityMultiplier?: Record<string, number>; // e.g. { minor: 1.1, critical: 2.0 }
  readonly maxHitAngleDifference?: number; // For 3D combat, max angle for a hit to register
  readonly baseVitalPointAccuracy?: number; // Base accuracy for hitting any vital point
}

// Combat system interface
export interface CombatSystemInterface {
  calculateDamage: (
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    defenderState: PlayerState,
    hitResult: CombatResult // Use CombatResult, not HitResult if it's just an alias
  ) => {
    baseDamage: number;
    modifierDamage: number;
    totalDamage: number;
    effectsApplied: readonly StatusEffect[];
  };

  resolveAttack: (
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique
  ) => CombatResult;

  checkWinCondition: (
    player1: PlayerState,
    player2: PlayerState
  ) => { winner: "player1" | "player2" | "draw"; reason: string } | null; // Updated winner type

  calculateTechnique: (
    technique: KoreanTechnique,
    archetype: PlayerArchetype,
    target?: PlayerState
  ) => CombatResult;
}

// Vital point system interface
export interface VitalPointSystemInterface {
  getVitalPointById: (id: string) => VitalPoint | undefined;
  getAllVitalPoints: () => readonly VitalPoint[];
  getVitalPointEffects: (
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    isCriticalHit: boolean
  ) => readonly StatusEffect[];
  calculateVitalPointDamage: (
    vitalPoint: VitalPoint,
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    isCriticalHit?: boolean
  ) => number;
  setConfig: (config: VitalPointSystemConfig) => void;

  // Add missing method that CombatSystem expects
  calculateHit: (
    technique: KoreanTechnique,
    targetedVitalPointId?: string | null,
    attackerPosition?: Position, // Optional for advanced hit calculation
    targetPosition?: Position // Optional for advanced hit calculation
  ) => {
    hit: boolean;
    damage: number;
    effects: readonly StatusEffect[];
    vitalPointsHit: readonly string[];
    // Potentially add hitLocation: AnatomicalLocation if needed by CombatSystem
  };
}

// Trigram system interface
export interface TrigramSystemInterface {
  getCurrentStance(playerId: string): TrigramStance | undefined;
  changeStance(playerId: string, newStance: TrigramStance): boolean;
  getAvailableTechniques(stance: TrigramStance): readonly KoreanTechnique[];

  // Add missing method that CombatSystem expects
  getStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number;
  // Potentially add other methods like getKiCostForStanceChange, etc.
}

// Input system interface
export interface InputSystemInterface {
  registerAction(actionName: string, callback: (event?: any) => void): void; // Allow event pass-through
  handleKeyPress(key: string): void;
  handleGamepadInput(gamepadState: GamepadState): void; // Added for gamepad
  setKeyBinding(actionName: string, newKey: string): boolean;
  getKeyBinding(actionName: string): string | undefined;
}

// Gamepad state
export interface GamepadState {
  readonly buttons: readonly boolean[]; // Array of button states (pressed/not pressed)
  readonly axes: readonly number[]; // Array of axis values (e.g., joystick positions)
  readonly id: string; // Gamepad identifier
  readonly connected: boolean;
}

// Audio system interface
export interface AudioSystemInterface {
  playSfx(id: string, options?: AudioPlaybackOptions): void;
  playMusic(id: string, options?: AudioPlaybackOptions): void;
  stopMusic(options?: AudioPlaybackOptions): void;
  setVolume(type: "master" | "sfx" | "music", volume: number): void;
  getVolume(type: "master" | "sfx" | "music"): number;
  loadAssets(assets: readonly AudioAsset[]): Promise<void>;
  isAssetLoaded(id: string): boolean;
}

// Animation system interface
export interface AnimationSystemInterface {
  playAnimation(
    entityId: string,
    animationName: string,
    config?: AnimationConfig
  ): void;
  stopAnimation(entityId: string, animationName?: string): void; // Optional name to stop specific animation
  getAnimationState(entityId: string): Record<string, AnimationState>; // Get state of all/specific animations
  registerAnimation(
    name: string,
    frames: readonly AnimationFrame[],
    loop?: boolean
  ): void;
}

// Animation configuration
export interface AnimationConfig {
  readonly speed?: number; // Playback speed multiplier
  readonly loop?: boolean;
  readonly onComplete?: () => void;
  readonly startFrame?: number;
  readonly endFrame?: number;
}

// Added AnimationFrame and AnimationState for AnimationSystemInterface
export interface AnimationFrame {
  readonly textureId: string; // ID of the texture/sprite for this frame
  readonly duration: number; // Duration in milliseconds
}

export interface AnimationState {
  readonly currentFrame: number;
  readonly isPlaying: boolean;
  readonly loop: boolean;
  readonly speed: number;
}

// Physics system interface
export interface PhysicsSystemInterface {
  addEntity(entityId: string, config: PhysicsEntityConfig): void;
  removeEntity(entityId: string): void;
  update(deltaTime: number): void;
  getEntityState(entityId: string): PhysicsEntityState | undefined;
  applyForce(entityId: string, force: { x: number; y: number }): void;
  setCollisionCallback(
    entityIdA: string,
    entityIdB: string,
    callback: (collisionData: CollisionData) => void
  ): void;
}

// Physics entity configuration
export interface PhysicsEntityConfig {
  readonly mass: number;
  readonly shape:
    | { type: "circle"; radius: number }
    | { type: "rectangle"; width: number; height: number };
  readonly position: Position;
  readonly velocity?: Position; // Initial velocity
  readonly restitution?: number; // Bounciness
  readonly friction?: number;
  readonly isStatic?: boolean; // Immovable object
}

// Added PhysicsEntityState and CollisionData for PhysicsSystemInterface
export interface PhysicsEntityState {
  readonly position: Position;
  readonly velocity: Position;
  readonly angularVelocity: number;
}

export interface CollisionData {
  readonly entityAId: string;
  readonly entityBId: string;
  readonly contactPoint: Position;
  readonly normal: Position; // Collision normal vector
  readonly penetrationDepth: number;
}

// Rendering system interface
export interface RenderingSystemInterface {
  addRenderable(entityId: string, config: RenderableConfig): void;
  removeRenderable(entityId: string): void;
  updateRenderable(entityId: string, updates: Partial<RenderableConfig>): void;
  render(context: any): void; // Context could be PIXI.Container, CanvasRenderingContext2D, etc.
  setCamera(position: Position, zoom: number): void;
}

// Renderable configuration
export interface RenderableConfig {
  readonly type: "sprite" | "graphics" | "text";
  readonly textureId?: string; // For sprites
  readonly drawCommands?: any[]; // For PIXI.Graphics or similar
  readonly textContent?: string;
  readonly style?: any; // PIXI.TextStyle or similar
  readonly position: Position;
  readonly rotation?: number;
  readonly scale?: { x: number; y: number };
  readonly alpha?: number;
  readonly zIndex?: number;
  readonly visible?: boolean;
}

// Game system manager
export interface GameSystemManager {
  registerSystem(name: string, system: any): void; // System can be any of the interfaces above
  getSystem<T>(name: string): T | undefined;
  updateAll(deltaTime: number): void;
  initializeAll(): Promise<void>;
  shutdownAll(): void;
}

// System event base type
export interface SystemEvent {
  readonly type: string; // e.g., "PLAYER_DAMAGE", "ENTITY_CREATED"
  readonly timestamp: number;
  readonly payload?: any; // Data associated with the event
}

// Event bus interface for system communication
export interface EventBusInterface {
  publish(event: SystemEvent): void;
  subscribe(
    eventType: string,
    callback: (event: SystemEvent) => void
  ): () => void; // Returns an unsubscribe function
}

// General system configuration
export interface SystemConfig {
  readonly debugMode?: boolean;
  readonly performanceMonitoring?: boolean;
  // Add other global system settings
}

// Added AudioPlaybackOptions for AudioSystemInterface
export interface AudioPlaybackOptions {
  readonly volume?: number;
  readonly loop?: boolean;
  readonly rate?: number; // Playback rate
  readonly fadeIn?: number; // Fade-in duration in ms
  readonly fadeOut?: number; // Fade-out duration in ms
  readonly delay?: number; // Delay before playback starts in ms
}
