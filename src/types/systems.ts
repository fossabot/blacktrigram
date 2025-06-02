// System types for Black Trigram game engines
import type { Position, Timestamp, EntityId, Velocity } from "./common"; // Corrected import for Position
import type {
  AudioAsset,
  AudioPlaybackOptions,
  SoundEffectId,
  MusicTrackId,
} from "./audio"; // Added AudioAsset, removed AudioConfig
import type { PlayerArchetype, TrigramStance, InputAction } from "./enums"; // Added PlayerArchetype, TrigramStance
import type { KoreanTechnique, CombatResult, CombatEvent } from "./combat"; // Added KoreanTechnique, CombatResult
import type { PlayerState } from "./player"; // Added PlayerState
import type { StatusEffect } from "./effects"; // Added StatusEffect
import type { VitalPoint, TargetingResult, InjuryReport } from "./anatomy"; // Added VitalPoint
import type {
  TrigramData,
  TrigramTransition,
  StanceTransition,
} from "./trigram";
import type {
  Application as PixiApplication,
  DisplayObject,
  Texture,
} from "pixi.js"; // For RenderingSystemInterface

// Configuration for the VitalPointSystem
export interface VitalPointSystemConfig {
  readonly baseAccuracyMultiplier?: number;
  readonly damageVariance?: number;
  readonly archetypeModifiers?: Record<PlayerArchetype, Record<string, number>>;
  readonly baseDamageMultiplier?: number;
  readonly vitalPointSeverityMultiplier?: Record<string, number>;
  readonly maxHitAngleDifference?: number;
  readonly baseVitalPointAccuracy?: number;
}

// Result from VitalPointSystem's hit calculation
export interface VitalPointHitResult {
  readonly hit: boolean;
  readonly damage: number;
  readonly effects: readonly StatusEffect[];
  readonly vitalPointsHit: readonly string[]; // IDs of vital points hit
  readonly bodyPartId?: string; // ID of the body part hit
  readonly isCritical?: boolean;
  // Removed isVitalPointHit, vitalPointsHit array serves this purpose
  // Removed vitalPoint, vitalPointsHit provides IDs, details can be fetched if needed
  // Removed damageDealt, use 'damage' field
}

// Combat system interface
export interface CombatSystemInterface {
  calculateDamage: (
    technique: KoreanTechnique,
    attacker: PlayerState, // Changed from PlayerArchetype to full PlayerState
    defender: PlayerState,
    hitResult: VitalPointHitResult // Changed from CombatResult to VitalPointHitResult for more specific input
  ) => {
    baseDamage: number;
    modifierDamage: number;
    totalDamage: number;
    effectsApplied: readonly StatusEffect[];
    finalDefenderState?: Partial<PlayerState>; // Optional: predicted state after damage
  };

  resolveAttack: (
    attacker: PlayerState,
    defender: PlayerState,
    technique: KoreanTechnique,
    targetedVitalPointId?: string // Optional: if player is specifically targeting a vital point
  ) => CombatResult; // This should return the overall CombatResult

  applyCombatResult: (
    result: CombatResult,
    attacker: PlayerState,
    defender: PlayerState
  ) => { updatedAttacker: PlayerState; updatedDefender: PlayerState };

  getAvailableTechniques: (player: PlayerState) => readonly KoreanTechnique[];
}

// Vital point system interface
export interface VitalPointSystemInterface {
  getVitalPointById: (id: string) => VitalPoint | undefined;
  getVitalPointsForBodyPart: (bodyPartId: string) => readonly VitalPoint[];
  calculateHit: (
    technique: KoreanTechnique,
    targetVitalPointId: string | null, // Explicitly allow null if no specific target
    accuracyRoll: number, // Player's accuracy roll (0-1)
    attackerPosition: Position,
    defenderPosition: Position,
    defenderStance: TrigramStance
  ) => VitalPointHitResult; // Changed to use the new result type
  applyVitalPointEffects: (
    player: PlayerState,
    vitalPoint: VitalPoint,
    intensityMultiplier?: number
  ) => PlayerState; // Returns updated player state
}

// Trigram system interface
export interface TrigramSystemInterface {
  getCurrentStanceData: (stance: TrigramStance) => TrigramData;
  getTechniqueForStance: (
    stance: TrigramStance,
    archetype?: PlayerArchetype
  ) => KoreanTechnique | undefined;
  calculateStanceEffectiveness: (
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ) => number;
  isValidTransition: (from: TrigramStance, to: TrigramStance) => boolean;
  getTransitionCost: (
    from: TrigramStance,
    to: TrigramStance,
    player?: PlayerState
  ) => { ki: number; stamina: number; timeMs: number };
  recommendStance: (
    player: PlayerState,
    opponent?: PlayerState
  ) => TrigramStance;
}

// Input system interface
export interface InputSystemInterface {
  registerAction: (action: InputAction, callback: () => void) => void;
  handleKeyPress: (key: string) => void;
  handleGamePadInput: (gamepadState: GamepadState) => void;
  getLastInputTime: () => Timestamp;
  isActionActive: (action: InputAction) => boolean;
}

// Gamepad state
export interface GamepadState {
  readonly id: string;
  readonly axes: readonly number[];
  readonly buttons: readonly { pressed: boolean; value: number }[];
}

// Audio system interface
export interface AudioSystemInterface {
  playSFX: (id: SoundEffectId, options?: AudioPlaybackOptions) => void;
  playMusic: (id: MusicTrackId, options?: AudioPlaybackOptions) => void;
  stopMusic: (id?: MusicTrackId, fadeOutDuration?: number) => void;
  setVolume: (type: "master" | "sfx" | "music", volume: number) => void;
  loadAudioAsset: (asset: AudioAsset) => Promise<void>;
  isMusicPlaying: (id?: MusicTrackId) => boolean;
}

// Animation system interface
export interface AnimationSystemInterface {
  playAnimation: (entityId: EntityId, animationName: string) => void;
  stopAnimation: (entityId: EntityId, animationName?: string) => void;
  getCurrentFrame: (entityId: EntityId) => AnimationFrame | undefined;
  addAnimation: (config: AnimationConfig) => void;
  getAnimationState: (entityId: EntityId) => AnimationState | undefined;
}

// Animation configuration
export interface AnimationConfig {
  readonly name: string;
  readonly frames: readonly { texture: Texture; duration: number }[]; // Texture from PIXI
  readonly loop?: boolean;
  readonly speed?: number; // Playback speed multiplier
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
export interface PhysicsSystemInterface {
  addEntity: (entityId: EntityId, config: PhysicsEntityConfig) => void;
  removeEntity: (entityId: EntityId) => void;
  update: (deltaTime: number) => void; // Update all physics entities
  getEntityState: (entityId: EntityId) => PhysicsEntityState | undefined;
  checkCollision: (
    entityIdA: EntityId,
    entityIdB: EntityId
  ) => CollisionData | null;
  applyForce: (entityId: EntityId, force: Velocity) => void;
}

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
  readonly isStatic?: boolean; // Cannot be moved by forces
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
export interface RenderingSystemInterface {
  readonly app: PixiApplication; // PIXI.Application instance
  addRenderable: (entityId: EntityId, config: RenderableConfig) => void;
  removeRenderable: (entityId: EntityId) => void;
  updateRenderable: (
    entityId: EntityId,
    updates: Partial<RenderableConfig>
  ) => void;
  getDisplayObject: (entityId: EntityId) => DisplayObject | undefined;
  render: () => void; // Main render loop call
}

// Renderable configuration
export interface RenderableConfig {
  readonly displayObject: DisplayObject; // The PIXI object to render
  readonly zOrder?: number; // For sorting
  readonly visible?: boolean;
  readonly alpha?: number;
  readonly parent?: EntityId | "stage"; // ID of parent renderable or stage
}

// Game system manager
export interface GameSystemManager {
  readonly combatSystem: CombatSystemInterface;
  readonly vitalPointSystem: VitalPointSystemInterface;
  readonly trigramSystem: TrigramSystemInterface;
  readonly inputSystem: InputSystemInterface;
  readonly audioSystem: AudioSystemInterface;
  readonly animationSystem?: AnimationSystemInterface;
  readonly physicsSystem?: PhysicsSystemInterface;
  readonly renderingSystem?: RenderingSystemInterface;
  readonly eventBus: EventBusInterface;
  initializeAll: () => Promise<void>;
  updateAll: (deltaTime: number) => void; // For systems that need per-frame updates
}

// System event base type
export interface SystemEvent {
  readonly type: string; // e.g., "PLAYER_DAMAGE", "STANCE_CHANGED"
  readonly timestamp: Timestamp;
  readonly payload?: any; // Data associated with the event
}

// Event bus interface for system communication
export interface EventBusInterface {
  publish: (event: SystemEvent) => void;
  subscribe: (
    eventType: string,
    callback: (event: SystemEvent) => void
  ) => void;
  unsubscribe: (
    eventType: string,
    callback: (event: SystemEvent) => void
  ) => void;
}

// General system configuration
export interface SystemConfig {
  // Common configuration options for all systems, if any
  readonly debugMode?: boolean;
  readonly performanceMonitoring?: boolean;
}
