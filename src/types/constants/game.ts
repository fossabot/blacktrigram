// General game engine and application constants

export const DEFAULT_GAME_SPEED = 1.0;

// Core game configuration for Black Trigram Korean martial arts simulator

// Main game configuration
export const GAME_CONFIG = {
  // Canvas and rendering
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  TARGET_FPS: 60,
  PIXEL_RATIO: window.devicePixelRatio || 1,

  // Combat mechanics
  DEFAULT_HEALTH: 100,
  DEFAULT_KI: 100,
  DEFAULT_STAMINA: 100,

  // Korean martial arts transition costs
  MAX_TRANSITION_COST_KI: 50,
  MAX_TRANSITION_COST_STAMINA: 40,
  MAX_TRANSITION_TIME_MILLISECONDS: 2000,

  // Audio settings
  DEFAULT_VOLUME: 0.7,
  SFX_VOLUME: 0.8,
  MUSIC_VOLUME: 0.6,
} as const;

// Korean martial arts philosophy integration
export const PHILOSOPHY_CONFIG = {
  // 팔괘 (Eight Trigrams) display timing
  TRIGRAM_DISPLAY_DURATION: 2000,
  TRIGRAM_TRANSITION_TIME: 500,

  // 음양 (Yin-Yang) balance indicators
  BALANCE_INDICATOR_SENSITIVITY: 0.1,
  BALANCE_RESTORATION_TIME: 3000,

  // 기 (Ki) energy visualization
  KI_PARTICLE_COUNT: 20,
  KI_FLOW_ANIMATION_SPEED: 1.5,
  KI_AURA_INTENSITY: 0.7,

  // 도장 (Dojang) environment
  DOJANG_LIGHTING_CYCLE: 300000, // 5 minutes day/night cycle
  MEDITATION_MODE_DURATION: 60000, // 1 minute meditation
  RESPECT_BOW_DURATION: 1500, // Traditional bow timing
} as const;

// Difficulty settings for Korean martial arts training
export const DIFFICULTY_SETTINGS = {
  BEGINNER: {
    korean: "초급",
    english: "Beginner",
    autoBlock: true,
    vitalPointHighlight: true,
    techniqueHints: true,
    slowerCombat: true,

    // Damage modifiers
    playerDamageMultiplier: 1.5,
    enemyDamageMultiplier: 0.7,

    // Timing assistance
    extendedBlockWindow: 1.5,
    extendedCounterWindow: 1.3,

    // Learning aids
    showCombatAnalysis: true,
    displayTechniqueNames: true,
    culturalContext: true,
  },

  INTERMEDIATE: {
    korean: "중급",
    english: "Intermediate",

    // Reduced assistance
    autoBlock: false,
    vitalPointHighlight: false, // Changed from true
    techniqueHints: true,
    slowerCombat: false,

    // Balanced damage
    playerDamageMultiplier: 1.0,
    enemyDamageMultiplier: 1.0,

    // Standard timing
    extendedBlockWindow: 1.0,
    extendedCounterWindow: 1.0,

    // Some learning aids
    showCombatAnalysis: true,
    displayTechniqueNames: false, // Changed from true
    culturalContext: true,
  },

  EXPERT: {
    korean: "전문가",
    english: "Expert",

    // No assistance
    autoBlock: false,
    vitalPointHighlight: false,
    techniqueHints: false,
    slowerCombat: false,

    // Realistic damage
    playerDamageMultiplier: 1.0,
    enemyDamageMultiplier: 1.2,

    // Precise timing required
    extendedBlockWindow: 0.8,
    extendedCounterWindow: 0.9,

    // Minimal aids
    showCombatAnalysis: false,
    displayTechniqueNames: false,
    culturalContext: false,
  },

  MASTER: {
    korean: "대가",
    english: "Master",

    // Maximum challenge
    autoBlock: false,
    vitalPointHighlight: false,
    techniqueHints: false,
    slowerCombat: false,

    // Punishing damage
    playerDamageMultiplier: 0.8,
    enemyDamageMultiplier: 1.5,

    // Strict timing
    extendedBlockWindow: 0.7,
    extendedCounterWindow: 0.8,

    // No aids
    showCombatAnalysis: false,
    displayTechniqueNames: false,
    culturalContext: false,
  },
} as const;

// Achievement and progression system
export const ACHIEVEMENT_CONFIG = {
  // Korean martial arts mastery levels
  TECHNIQUE_MASTERY_THRESHOLD: 100, // Uses before mastery
  STANCE_MASTERY_THRESHOLD: 50, // Successful stance changes
  COMBO_MASTERY_THRESHOLD: 25, // Perfect combos executed

  // Cultural understanding achievements
  PHILOSOPHY_COMPLETION: 8, // All trigram philosophies learned
  RESPECT_POINTS_MAX: 1000, // Maximum respect/honor points
  MEDITATION_HOURS: 10, // Hours in meditation mode

  // Combat achievements
  PERFECT_ROUNDS: 10, // Rounds won without taking damage
  VITAL_POINT_MASTERY: 70, // All vital points discovered
  ARCHETYPE_MASTERY: 5, // All player archetypes mastered

  // Progression milestones
  TOTAL_MATCHES: 100, // Career matches played
  WIN_STREAK_RECORD: 10, // Consecutive wins
  COMEBACK_VICTORIES: 5, // Wins from critical health
} as const;

// Game constants for Black Trigram

export const DEFAULT_STANCE_COOLDOWN_MS = 500;

export const GAME_CONSTANTS = {
  MAX_HEALTH: 100,
  MAX_KI: 100,
  MAX_STAMINA: 100,
  MAX_CONSCIOUSNESS: 100,
  MAX_PAIN: 100,
  MAX_BALANCE: 100,
  MAX_BLOOD_LOSS: 100,

  CRITICAL_HEALTH_THRESHOLD: 20,
  LOW_HEALTH_THRESHOLD: 50,

  BASE_DAMAGE_MULTIPLIER: 1.0,
  CRITICAL_HIT_MULTIPLIER: 1.5,

  DEFAULT_ACCURACY: 0.8,
  DEFAULT_TECHNIQUE_RANGE: 1.0,

  KI_REGEN_RATE: 1.5,
  STAMINA_REGEN_RATE: 2.0,
  HEALTH_REGEN_RATE: 0.1,
} as const;

// Game state persistence
export const SAVE_CONFIG = {
  AUTOSAVE_INTERVAL: 60000, // Autosave every minute
  MAX_SAVE_SLOTS: 3, // Number of save slots
  SAVE_COMPRESSION: true, // Compress save data
  CLOUD_SYNC: false, // Cloud save sync (future feature)

  // Data retention
  MATCH_HISTORY_LIMIT: 50, // Recent matches to keep
  REPLAY_STORAGE_LIMIT: 10, // Replay files to store
  SCREENSHOT_LIMIT: 20, // Screenshots to keep
} as const;

// Performance monitoring thresholds
export const PERFORMANCE_THRESHOLDS = {
  // Frame rate monitoring
  MIN_FPS: 30, // Minimum acceptable FPS
  TARGET_FPS: 60, // Target FPS
  FPS_SAMPLE_SIZE: 60, // Frames to average for FPS calculation

  // Memory usage alerts
  MAX_MEMORY_MB: 512, // Maximum memory usage in MB
  MEMORY_WARNING_THRESHOLD: 0.8, // Warning at 80% of max
  GARBAGE_COLLECTION_THRESHOLD: 0.9, // Force GC at 90% of max

  // Audio performance
  MAX_AUDIO_LATENCY: 100, // Maximum audio latency in ms
  AUDIO_BUFFER_SIZE: 4096, // Audio buffer size

  // Rendering performance
  MAX_DRAW_CALLS: 100, // Maximum draw calls per frame
  TEXTURE_CACHE_LIMIT: 50, // Maximum cached textures
} as const;

// Export individual constants (no duplicates)
// These are already part of GAME_CONFIG, so direct export might be redundant
// unless specifically needed for tree-shaking or direct import clarity.
// export const {
//   MAX_TRANSITION_COST_KI,
//   MAX_TRANSITION_COST_STAMINA,
//   MAX_TRANSITION_TIME_MILLISECONDS,
// } = GAME_CONFIG;
