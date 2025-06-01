// Types specific to system implementations
// These are internal types for system modules, distinct from general combat types

// ===== Combat System Internal Types =====

export interface CombatSystemState {
  readonly isProcessing: boolean;
  readonly currentCombat: string | null;
  readonly combatQueue: readonly string[];
  readonly lastProcessedTime: number;
}

export interface DamageCalculationContext {
  readonly attackerState: import("./player").PlayerState;
  readonly defenderState: import("./player").PlayerState;
  readonly technique: import("./combat").KoreanTechnique;
  readonly environmentFactors: readonly string[];
  readonly stanceEffectiveness: number;
}

// ===== Vital Point System Internal Types =====

export interface VitalPointSystemConfig {
  // New / primary properties
  readonly precisionThreshold: number;
  readonly criticalHitRange: number;
  readonly damageMultiplierCurve: readonly number[]; // Replaces damageMultiplier (number)
  readonly meridianBonusFactors: Record<string, number>;

  // Properties from old config, now optional for transition
  readonly baseAccuracy?: number;
  readonly distanceModifier?: number;
  readonly targetingDifficulty?: number;
  // damageMultiplier (number) is intentionally omitted; use damageMultiplierCurve
  readonly effectChance?: number;
  readonly angleModifier?: number;
}

export interface HitDetectionContext {
  readonly attackPosition: import("./common").Position;
  readonly targetBounds: {
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
  };
  readonly accuracy: number;
  readonly vitalPointModifiers: Record<string, number>;
}

// ===== Trigram System Internal Types =====

export interface StanceTransitionContext {
  readonly currentStance: import("./enums").TrigramStance;
  readonly targetStance: import("./enums").TrigramStance;
  readonly playerKi: number;
  readonly playerStamina: number;
  readonly timeInCurrentStance: number;
  readonly combatState: string;
}

export interface TrigramSystemState {
  readonly activeTransitions: Map<string, import("./trigram").StanceTransition>;
  readonly stanceHistories: Map<
    string,
    readonly import("./enums").TrigramStance[]
  >;
  readonly lastUpdateTime: number;
}

// ===== AI System Internal Types =====

export interface AIDecisionContext {
  readonly playerStates: readonly [
    import("./player").PlayerState,
    import("./player").PlayerState
  ];
  readonly gamePhase: import("./enums").GamePhase;
  readonly availableActions: readonly string[];
  readonly threatAssessment: Record<string, number>;
  readonly opportunityScores: Record<string, number>;
}

export interface AIBehaviorTree {
  readonly rootNode: AIBehaviorNode;
  readonly evaluationCache: Map<string, unknown>;
  readonly lastEvaluationTime: number;
}

export interface AIBehaviorNode {
  readonly id: string;
  readonly type: "selector" | "sequence" | "action" | "condition";
  readonly children: readonly AIBehaviorNode[];
  readonly action?: string;
  readonly condition?: string;
  readonly priority: number;
}

// ===== Physics System Internal Types =====

export interface PhysicsSystemState {
  readonly entities: Map<string, PhysicsEntity>;
  readonly collisions: readonly CollisionPair[];
  readonly lastPhysicsUpdate: number;
  readonly deltaTime: number;
}

export interface PhysicsEntity {
  readonly id: string;
  readonly position: import("./common").Position;
  readonly velocity: import("./common").Velocity;
  readonly mass: number;
  readonly boundingBox: {
    readonly width: number;
    readonly height: number;
  };
  readonly isStatic: boolean;
}

export interface CollisionPair {
  readonly entityA: string;
  readonly entityB: string;
  readonly contactPoint: import("./common").Position;
  readonly normal: import("./common").Vector2D;
  readonly penetration: number;
}

// ===== Rendering System Internal Types =====

export interface RenderingSystemState {
  readonly renderQueue: readonly RenderCommand[];
  readonly activeEffects: Map<string, import("./combat").HitEffect>;
  readonly frameMetrics: FrameMetrics;
  readonly lastRenderTime: number;
}

export interface RenderCommand {
  readonly type: "sprite" | "graphics" | "text" | "effect";
  readonly id: string;
  readonly layer: number;
  readonly position: import("./common").Position;
  readonly data: unknown;
  readonly priority: number;
}

export interface FrameMetrics {
  readonly fps: number;
  readonly frameTime: number;
  readonly renderTime: number;
  readonly updateTime: number;
  readonly memoryUsage: number;
}

// ===== Performance Monitoring Types =====

export interface SystemPerformanceMetrics {
  readonly systemId: string;
  readonly averageUpdateTime: number;
  readonly peakUpdateTime: number;
  readonly memoryFootprint: number;
  readonly updateCount: number;
  readonly errorCount: number;
  readonly lastHealthCheck: number;
}

export interface PerformanceThresholds {
  readonly maxUpdateTime: number;
  readonly maxMemoryUsage: number;
  readonly maxErrorRate: number;
  readonly frameBudget: number;
}

// ===== System Integration Types =====

export interface SystemMessage {
  readonly type: string;
  readonly sender: string;
  readonly recipient: string;
  readonly payload: unknown;
  readonly timestamp: number;
  readonly priority: "low" | "normal" | "high" | "critical";
}

export interface SystemRegistry {
  readonly systems: Map<string, SystemInterface>;
  readonly dependencies: Map<string, readonly string[]>;
  readonly initializationOrder: readonly string[];
}

export interface SystemInterface {
  readonly id: string;
  readonly initialize: () => Promise<void>;
  readonly update: (deltaTime: number) => void;
  readonly shutdown: () => Promise<void>;
  readonly handleMessage: (message: SystemMessage) => void;
  readonly getPerformanceMetrics: () => SystemPerformanceMetrics;
}

// ===== Future System Types =====

// Add system-specific types here as needed
// These should be internal implementation details, not part of the public API
// Note: HitResult is already defined in combat.ts as it's part of the public API
