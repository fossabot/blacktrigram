/**
 * UI constants for Korean martial arts interface
 */

import { KOREAN_COLORS } from "./colors";

// Layout constants
export const UI_LAYOUT = {
  // Header
  HEADER_HEIGHT: 80,
  HEADER_PADDING: 20,

  // Sidebar
  SIDEBAR_WIDTH: 300,
  SIDEBAR_PADDING: 15,

  // Footer/Controls
  FOOTER_HEIGHT: 120,
  FOOTER_PADDING: 20,

  // Content area
  CONTENT_MARGIN: 20,
  CONTENT_PADDING: 15,

  // Buttons
  BUTTON_HEIGHT: 50,
  BUTTON_WIDTH: 150,
  BUTTON_PADDING: 10,
  BUTTON_BORDER_RADIUS: 8,

  // Cards
  CARD_PADDING: 20,
  CARD_MARGIN: 15,
  CARD_BORDER_RADIUS: 12,

  // Health bars
  HEALTH_BAR_HEIGHT: 20,
  HEALTH_BAR_WIDTH: 200,
  HEALTH_BAR_BORDER: 2,

  // Stance indicators
  STANCE_INDICATOR_SIZE: 60,
  STANCE_ICON_SIZE: 40,

  // Combat UI
  COMBAT_HUD_HEIGHT: 100,
  TECHNIQUE_BUTTON_SIZE: 80,
  VITAL_POINT_INDICATOR_SIZE: 8,
} as const;

// Z-index layers
export const UI_LAYERS = {
  BACKGROUND: 0,
  GAME_WORLD: 100,
  EFFECTS: 200,
  UI_BACKGROUND: 300,
  UI_ELEMENTS: 400,
  MODAL_BACKGROUND: 500,
  MODAL_CONTENT: 600,
  TOOLTIP: 700,
  OVERLAY: 800,
  DEBUG: 900,
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440,
  ULTRAWIDE: 1920,
} as const;

// Animation speeds
export const UI_ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
} as const;

// Button states
export const BUTTON_STATES = {
  NORMAL: {
    background: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
    border: KOREAN_COLORS.UI_BORDER,
    text: KOREAN_COLORS.TEXT_PRIMARY,
    alpha: 1.0,
  },
  HOVER: {
    background: KOREAN_COLORS.UI_BACKGROUND_LIGHT,
    border: KOREAN_COLORS.ACTIVE_BORDER,
    text: KOREAN_COLORS.TEXT_ACCENT,
    alpha: 1.0,
  },
  PRESSED: {
    background: KOREAN_COLORS.UI_BACKGROUND_DARK,
    border: KOREAN_COLORS.ACTIVE_BORDER,
    text: KOREAN_COLORS.TEXT_ACCENT,
    alpha: 0.8,
  },
  DISABLED: {
    background: KOREAN_COLORS.UI_DISABLED_FILL,
    border: KOREAN_COLORS.UI_DISABLED_BORDER,
    text: KOREAN_COLORS.TEXT_TERTIARY,
    alpha: 0.5,
  },
} as const;

// Health bar colors
export const HEALTH_COLORS = {
  FULL: KOREAN_COLORS.POSITIVE_GREEN,
  HIGH: KOREAN_COLORS.ACCENT_YELLOW,
  MEDIUM: KOREAN_COLORS.WARNING_ORANGE,
  LOW: KOREAN_COLORS.WARNING_YELLOW,
  CRITICAL: KOREAN_COLORS.NEGATIVE_RED,
  UNCONSCIOUS: KOREAN_COLORS.UI_GRAY,
} as const;

// Status effect colors
export const STATUS_COLORS = {
  POSITIVE: KOREAN_COLORS.POSITIVE_GREEN,
  NEGATIVE: KOREAN_COLORS.NEGATIVE_RED,
  NEUTRAL: KOREAN_COLORS.TEXT_SECONDARY,
  TEMPORARY: KOREAN_COLORS.ACCENT_YELLOW,
  PERMANENT: KOREAN_COLORS.ACCENT_PURPLE,
} as const;

// Combat feedback colors
export const COMBAT_FEEDBACK_COLORS = {
  HIT: KOREAN_COLORS.ACCENT_RED,
  CRITICAL_HIT: KOREAN_COLORS.CRITICAL_HIT,
  BLOCKED: KOREAN_COLORS.BLOCKED_ATTACK,
  MISS: KOREAN_COLORS.UI_GRAY,
  PERFECT: KOREAN_COLORS.PERFECT_STRIKE,
  COUNTER: KOREAN_COLORS.ACCENT_CYAN,
  VITAL_POINT: KOREAN_COLORS.VITAL_POINT_HIT,
} as const;

// UI spacing
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 48,
} as const;

// Border radius
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  CIRCLE: 50,
} as const;

// Shadow definitions
export const SHADOWS = {
  SMALL: {
    color: KOREAN_COLORS.BLACK_SOLID,
    blur: 4,
    distance: 2,
    alpha: 0.3,
  },
  MEDIUM: {
    color: KOREAN_COLORS.BLACK_SOLID,
    blur: 8,
    distance: 4,
    alpha: 0.4,
  },
  LARGE: {
    color: KOREAN_COLORS.BLACK_SOLID,
    blur: 16,
    distance: 8,
    alpha: 0.5,
  },
} as const;

/**
 * UI Layout and component constants for Korean martial arts game
 */

export const UI_CONSTANTS = {
  // Layout dimensions
  HEADER_HEIGHT: 80,
  FOOTER_HEIGHT: 60,
  SIDEBAR_WIDTH: 240,
  PANEL_WIDTH: 320,

  // Component sizes
  BUTTON_HEIGHT: 48,
  BUTTON_WIDTH: 160,
  INPUT_HEIGHT: 40,
  CARD_MIN_HEIGHT: 120,

  // Spacing
  MARGIN_SMALL: 8,
  MARGIN_MEDIUM: 16,
  MARGIN_LARGE: 24,
  MARGIN_XLARGE: 32,

  // Borders and radii
  BORDER_RADIUS: 8,
  BORDER_WIDTH: 2,

  // Animation durations (ms)
  ANIMATION_FAST: 150,
  ANIMATION_NORMAL: 300,
  ANIMATION_SLOW: 500,

  // Z-index layers
  Z_BACKGROUND: 0,
  Z_CONTENT: 10,
  Z_OVERLAY: 100,
  Z_MODAL: 1000,
  Z_TOOLTIP: 2000,
} as const;

export const CYBERPUNK_UI_EFFECTS = {
  GLOW_INTENSITY: 0.3,
  PULSE_SPEED: 2.0,
  FLICKER_FREQUENCY: 0.1,
  SCAN_LINE_OPACITY: 0.1,
  NOISE_INTENSITY: 0.05,
} as const;

export const KOREAN_UI_LAYOUTS = {
  // Traditional Korean proportions
  GOLDEN_RATIO: 1.618,
  HANGEUL_LINE_HEIGHT: 1.4,
  KOREAN_ENGLISH_RATIO: 0.7,

  // Text hierarchy
  TITLE_SCALE: 2.0,
  SUBTITLE_SCALE: 1.5,
  BODY_SCALE: 1.0,
  CAPTION_SCALE: 0.8,
} as const;

export default UI_CONSTANTS;
