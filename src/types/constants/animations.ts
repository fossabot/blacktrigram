/**
 * Animation timing and effect constants for Korean martial arts
 */

// Animation timing constants (milliseconds)
export const ANIMATION_TIMINGS = {
  // Combat animations
  STANCE_TRANSITION: 300,
  TECHNIQUE_STARTUP: 150,
  TECHNIQUE_ACTIVE: 100,
  TECHNIQUE_RECOVERY: 250,
  HIT_STUN: 200,
  BLOCK_STUN: 100,
  KNOCKDOWN_RECOVERY: 1000,

  // UI animations
  MENU_FADE: 200,
  BUTTON_HOVER: 100,
  MODAL_OPEN: 300,
  TOOLTIP_SHOW: 150,

  // Visual effects
  HIT_FLASH: 100,
  SCREEN_SHAKE: 200,
  PARTICLE_LIFETIME: 1000,
  GLOW_PULSE: 2000,
} as const;

// Animation easing curves
export const EASING_FUNCTIONS = {
  // Standard easing
  LINEAR: "linear",
  EASE_IN: "ease-in",
  EASE_OUT: "ease-out",
  EASE_IN_OUT: "ease-in-out",

  // Cyberpunk-style easing
  CYBER_SNAP: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  CYBER_ELASTIC: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  CYBER_BOUNCE: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
} as const;

// Technique animation sequences
export const TECHNIQUE_ANIMATIONS = {
  // Basic strikes
  PUNCH: {
    startup: 100,
    active: 50,
    recovery: 200,
    totalFrames: 21, // At 60fps
  },
  KICK: {
    startup: 150,
    active: 100,
    recovery: 300,
    totalFrames: 33,
  },

  // Korean martial arts techniques
  TAEKWONDO_KICK: {
    startup: 120,
    active: 80,
    recovery: 250,
    totalFrames: 27,
  },
  HAPKIDO_THROW: {
    startup: 200,
    active: 150,
    recovery: 400,
    totalFrames: 45,
  },
  SSIREUM_GRAPPLE: {
    startup: 180,
    active: 200,
    recovery: 350,
    totalFrames: 44,
  },
} as const;

// Particle effect animations
export const PARTICLE_ANIMATIONS = {
  SPARK_COUNT: 8,
  SPARK_SPEED: 200,
  SPARK_LIFETIME: 300,

  BLOOD_DROPLET_COUNT: 5,
  BLOOD_GRAVITY: 500,
  BLOOD_LIFETIME: 2000,

  ENERGY_PULSE_SIZE: 50,
  ENERGY_PULSE_SPEED: 100,
  ENERGY_PULSE_LIFETIME: 800,
} as const;

// Combat state animation durations
export const COMBAT_STATE_DURATIONS = {
  IDLE: 0, // Infinite
  ATTACKING: 500,
  DEFENDING: 300,
  STUNNED: 1000,
  RECOVERING: 400,
  KNOCKED_DOWN: 2000,
  UNCONSCIOUS: 5000,
} as const;

// Combat animation data
export const COMBAT_ANIMATION_DATA = {
  // Trigram stance animations
  STANCE_EFFECTS: {
    geon: { duration: 400, intensity: 1.2 },
    tae: { duration: 350, intensity: 0.8 },
    li: { duration: 300, intensity: 1.5 },
    jin: { duration: 250, intensity: 1.8 },
    son: { duration: 200, intensity: 1.0 },
    gam: { duration: 450, intensity: 0.9 },
    gan: { duration: 500, intensity: 0.7 },
    gon: { duration: 400, intensity: 1.1 },
  },

  // Technique animation multipliers
  TECHNIQUE_SPEED_MODIFIERS: {
    strike: 1.0,
    thrust: 1.2,
    block: 0.8,
    counter_attack: 1.5,
    throw: 0.6,
    grapple: 0.5,
  },
} as const;

export default ANIMATION_TIMINGS;
