// System types for Black Trigram game engines
import type { Position } from "./common"; // Corrected import for Position
import type { AudioConfig, AudioAsset } from "./audio"; // Added AudioConfig, AudioAsset
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
  readonly baseDamageMultiplier?: number; // Added baseDamageMultiplier
  readonly vitalPointSeverityMultiplier?: Record<string, number>; // Added from VitalPointSystem.ts DEFAULT_CONFIG
  readonly maxHitAngleDifference?: number; // Added from VitalPointSystem.ts DEFAULT_CONFIG
  readonly baseVitalPointAccuracy?: number; // Added from VitalPointSystem.ts DEFAULT_CONFIG
}

// Combat system interface
export interface CombatSystemInterface {
  calculateDamage: (
    technique: KoreanTechnique,
    attackerArchetype: PlayerArchetype,
    defenderState: PlayerState,
    hitResult: CombatResult
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
  ) => { winner: 1 | 2; reason: string } | null;

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
    targetedVitalPointId?: string | null
  ) => {
    hit: boolean;
    damage: number;
    effects: readonly StatusEffect[];
    vitalPointsHit: readonly string[];
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
}

// Input system interface
export interface InputSystemInterface {
  registerAction(actionName: string, callback: () => void): void;
  handleKeyPress(key: string): void;
  getGamepadState(gamepadIndex: number): GamepadState | undefined;
  // Add other input system methods
}

// Gamepad state
export interface GamepadState {
  readonly buttons: readonly boolean[];
  readonly axes: readonly number[];
  readonly connected: boolean;
  readonly id: string;
}

// Audio system interface
export interface AudioSystemInterface {
  playSfx(soundId: string, volume?: number): void;
  playMusic(trackId: string, loop?: boolean, volume?: number): void;
  stopMusic(trackId?: string): void;
  setMasterVolume(volume: number): void;
  loadAudioConfig(config: AudioConfig): void;
  loadAudioAsset(asset: AudioAsset): Promise<void>;
  // Add other audio system methods
}

// Animation system interface
export interface AnimationSystemInterface {
  playAnimation(config: AnimationConfig): string; // Returns animation instance ID
  stopAnimation(animationId: string): void;
  update(deltaTime: number): void;
  // Add other animation system methods
}

// Animation configuration
export interface AnimationConfig {
  readonly targetId: string; // ID of the entity to animate
  readonly animationName: string; // e.g., "player_idle", "hit_effect_blood"
  readonly loop?: boolean;
  readonly speed?: number;
  readonly onComplete?: () => void;
}

// Physics system interface
export interface PhysicsSystemInterface {
  addEntity(entityId: string, config: PhysicsEntityConfig): void;
  removeEntity(entityId: string): void;
  update(deltaTime: number): void;
  applyForce(entityId: string, force: Position): void;
  // Add other physics system methods
}

// Physics entity configuration
export interface PhysicsEntityConfig {
  readonly position: Position;
  readonly mass: number;
  readonly velocity?: Position;
  readonly restitution?: number; // Bounciness
  readonly friction?: number;
  readonly isStatic?: boolean;
  readonly collisionGroup?: string;
}

// Rendering system interface
export interface RenderingSystemInterface {
  addRenderable(entityId: string, config: RenderableConfig): void;
  removeRenderable(entityId: string): void;
  updateRenderable(entityId: string, updates: Partial<RenderableConfig>): void;
  renderScene(): void;
  // Add other rendering system methods
}

// Renderable configuration
export interface RenderableConfig {
  readonly spriteName?: string; // For sprite-based rendering
  readonly shape?: "rectangle" | "circle"; // For basic shape rendering
  readonly color?: number; // Hex color
  readonly dimensions?: { width: number; height: number };
  readonly position: Position;
  readonly zIndex?: number;
  readonly alpha?: number;
  readonly visible?: boolean;
}

// Game system manager
export interface GameSystemManager {
  registerSystem(name: string, system: any): void; // Use specific system interface type if possible
  getSystem<T>(name: string): T | undefined;
  initializeAll(): Promise<void>;
  updateAll(deltaTime: number): void;
  // Add other manager methods
}

// System event base type
export interface SystemEvent {
  readonly type: string; // e.g., "PLAYER_DAMAGE", "GAME_PAUSED"
  readonly payload?: any;
  readonly timestamp: number;
}

// Event bus interface for system communication
export interface EventBusInterface {
  publish(event: SystemEvent): void;
  subscribe(
    eventType: string,
    callback: (event: SystemEvent) => void
  ): () => void; // Returns unsubscribe function
}

// General system configuration
export interface SystemConfig {
  readonly debugMode?: boolean;
  // Add other common system configurations
}
