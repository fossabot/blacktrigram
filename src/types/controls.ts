// Control system types for Korean martial arts game

import type { TrigramStance, PlayerArchetype } from "./enums";
import type { KoreanTechnique } from "./combat";

// Base input event interface
export interface InputEvent {
  readonly type:
    | "keydown"
    | "keyup"
    | "pointerdown"
    | "pointerup"
    | "pointermove";
  readonly key?: string;
  readonly code?: string;
  readonly button?: number;
  readonly x?: number;
  readonly y?: number;
  readonly timestamp: number;
  readonly playerId?: string;
}

// Control configuration for Korean martial arts
export interface ControlConfig {
  readonly stanceControls: Record<string, StanceControl>;
  readonly movementControls: MovementControls;
  readonly combatControls: CombatControls;
  readonly systemControls: SystemControls;
  readonly customBindings?: Record<string, string>;
}

// Stance control mapping (1-8 keys for trigram stances)
export interface StanceControl {
  readonly stance: TrigramStance;
  readonly korean: string;
  readonly technique: string;
  readonly keyCode: string;
  readonly alternativeKeys?: readonly string[];
}

// Movement controls for positioning
export interface MovementControls {
  readonly forward: readonly string[];
  readonly backward: readonly string[];
  readonly left: readonly string[];
  readonly right: readonly string[];
  readonly dash: readonly string[];
  readonly crouch: readonly string[];
  readonly jump?: readonly string[]; // Optional for future ground techniques
}

// Combat action controls
export interface CombatControls {
  readonly attack: readonly string[];
  readonly defend: readonly string[];
  readonly guard: readonly string[];
  readonly parry: readonly string[];
  readonly counter: readonly string[];
  readonly technique: readonly string[];
  readonly vitalPointMode: readonly string[];
  readonly combo: readonly string[];
}

// System and UI controls
export interface SystemControls {
  readonly pause: readonly string[];
  readonly menu: readonly string[];
  readonly help: readonly string[];
  readonly settings: readonly string[];
  readonly fullscreen: readonly string[];
  readonly screenshot: readonly string[];
  readonly mute: readonly string[];
}

// Input state tracking
export interface InputState {
  readonly playerId: string;
  readonly pressedKeys: Set<string>;
  readonly mousePosition: { x: number; y: number };
  readonly mouseButtons: Set<number>;
  readonly lastInputTime: number;
  readonly inputSequence: readonly string[];
  readonly comboBuffer: readonly string[];
}

// Control event handlers
export interface ControlHandlers {
  readonly onStanceChange: (playerId: string, stance: TrigramStance) => void;
  readonly onMovement: (
    playerId: string,
    direction: { x: number; y: number }
  ) => void;
  readonly onAttack: (playerId: string, technique?: KoreanTechnique) => void;
  readonly onDefend: (
    playerId: string,
    type: "block" | "parry" | "counter"
  ) => void;
  readonly onSystemAction: (action: string) => void;
  readonly onComboInput: (
    playerId: string,
    sequence: readonly string[]
  ) => void;
}

// Combo input system
export interface ComboDefinition {
  readonly id: string;
  readonly name: string;
  readonly sequence: readonly string[];
  readonly timing: number; // Maximum time between inputs in milliseconds
  readonly archetype?: PlayerArchetype; // Archetype-specific combos
  readonly stance?: TrigramStance; // Stance-specific combos
  readonly effect: ComboEffect;
}

// Combo execution effect
export interface ComboEffect {
  readonly type: "technique" | "stance_change" | "special";
  readonly value: string | KoreanTechnique | TrigramStance;
  readonly damage?: number;
  readonly kiCost?: number;
  readonly executionTime?: number;
}

// Input validation and filtering
export interface InputValidator {
  readonly isValidKey: (key: string) => boolean;
  readonly isValidCombo: (sequence: readonly string[]) => boolean;
  readonly filterSpam: (events: readonly InputEvent[]) => readonly InputEvent[];
  readonly validateTiming: (sequence: readonly InputEvent[]) => boolean;
}

// Accessibility options for controls
export interface AccessibilityOptions {
  readonly allowKeyRepeat: boolean;
  readonly longPressDelay: number;
  readonly doubleClickThreshold: number;
  readonly mouseSensitivity: number;
  readonly enableVisualFeedback: boolean;
  readonly enableAudioFeedback: boolean;
  readonly simplifiedControls: boolean;
}

// Control customization
export interface ControlCustomization {
  readonly playerId: string;
  readonly customBindings: Record<string, string>;
  readonly sensitivity: number;
  readonly deadzone: number;
  readonly accessibility: AccessibilityOptions;
  readonly preferredDevice: "keyboard" | "mouse" | "gamepad" | "touch";
}

export default ControlConfig;
