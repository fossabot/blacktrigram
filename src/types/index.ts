// Core Korean martial arts game types - UNIFIED SOURCE OF TRUTH

export type TrigramStance =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

// Move KOREAN_COLORS to the top
export const KOREAN_COLORS = {
  TRADITIONAL_RED: "#8a0000",
  GOLD: "#ffd700",
  BLACK: "#000000",
  WHITE: "#ffffff",
  DOJANG_BLUE: "#4a89e2",
  CYAN: "#00ffff",
  GRAY_LIGHT: "#cccccc",
  YELLOW: "#ffff00",
  LIGHT_GREY: "#d3d3d3",
  Red: "#ff0000",
  Orange: "#ffa500",
  Green: "#00ff00",
  Blue: "#0000ff",
  Purple: "#800080",
  Brown: "#a52a2a",
  DARK_BLUE: "#000a12",
  ACCENT_BLUE: "#004455",
  GRAY_MEDIUM: "#888888",
  GRAY_DARK: "#444444",
  SKIN_TONE_LIGHT: "#fdbcb4",
  PLAYER_1_BLUE: "#4a89e2",
  PLAYER_2_RED: "#8a0000",
  CRITICAL_RED: "#ff0000",
  DAMAGE_YELLOW: "#ffff00",
} as const;

// Add Korean font family constant
export const KOREAN_FONT_FAMILY = "Noto Sans KR, Arial, sans-serif";

// Add TRIGRAM_DATA constant
export const TRIGRAM_DATA: Record<
  TrigramStance,
  {
    symbol: string;
    koreanName: string;
    korean: string;
    element: string;
    color: number;
  }
> = {
  geon: {
    symbol: "☰",
    koreanName: "건 (Heaven)",
    korean: "건",
    element: "Heaven",
    color: 0xffd700,
  },
  tae: {
    symbol: "☱",
    koreanName: "태 (Lake)",
    korean: "태",
    element: "Lake",
    color: 0x87ceeb,
  },
  li: {
    symbol: "☲",
    koreanName: "리 (Fire)",
    korean: "리",
    element: "Fire",
    color: 0xff4500,
  },
  jin: {
    symbol: "☳",
    koreanName: "진 (Thunder)",
    korean: "진",
    element: "Thunder",
    color: 0x9370db,
  },
  son: {
    symbol: "☴",
    koreanName: "손 (Wind)",
    korean: "손",
    element: "Wind",
    color: 0x98fb98,
  },
  gam: {
    symbol: "☵",
    koreanName: "감 (Water)",
    korean: "감",
    element: "Water",
    color: 0x4169e1,
  },
  gan: {
    symbol: "☶",
    koreanName: "간 (Mountain)",
    korean: "간",
    element: "Mountain",
    color: 0x8b4513,
  },
  gon: {
    symbol: "☷",
    koreanName: "곤 (Earth)",
    korean: "곤",
    element: "Earth",
    color: 0x654321,
  },
};

// Add TRIGRAM_STANCES_ORDER constant
export const TRIGRAM_STANCES_ORDER: TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
];

// Define interfaces used by the components
export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export type Vector2D = Position;

export interface TrainingProgress {
  practiceCount: number;
  mastery: number;
}

export interface PlayerState {
  playerId: string;
  position: Position;
  velocity: Velocity;
  health: number;
  maxHealth: number;
  ki: number;
  maxKi: number;
  stance: TrigramStance;
  isAttacking: boolean;
  isBlocking: boolean;
  isMoving: boolean;
}

export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly isEnabled?: boolean;
  readonly playerKi?: number;
  readonly playerMaxKi?: number;
}

export interface ProgressTrackerProps {
  readonly label: string;
  readonly current: number;
  readonly maximum: number;
  readonly currentStance?: TrigramStance;
}

export type GamePhase = "intro" | "training" | "combat" | "result";

// Helper function for creating player state
export function createPlayerState(id: string, position: Position): PlayerState {
  return {
    playerId: id,
    position: { ...position },
    velocity: { x: 0, y: 0 },
    health: 100,
    maxHealth: 100,
    ki: 50,
    maxKi: 100,
    stance: "geon",
    isAttacking: false,
    isBlocking: false,
    isMoving: false,
  };
}
