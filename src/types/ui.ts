// UI-specific types for Black Trigram Korean martial arts game

import type { ReactNode } from "react";
import type { KoreanText } from "./korean-text";

// Base UI component props
export interface BaseUIProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly alpha?: number;
  readonly visible?: boolean;
  readonly children?: ReactNode;
}

// UI theme configuration
export interface UITheme {
  readonly primary: number;
  readonly secondary: number;
  readonly accent: number;
  readonly background: number;
  readonly text: number;
  readonly border: number;
}

// Menu item definition
export interface MenuItem {
  readonly id: string;
  readonly label: KoreanText;
  readonly action: () => void;
  readonly disabled?: boolean;
  readonly icon?: string;
}

// Modal props
// Notification system
export interface Notification {
  readonly id: string;
  readonly type: "info" | "success" | "warning" | "error";
  readonly title: KoreanText;
  readonly message: KoreanText;
  readonly duration?: number;
  readonly timestamp: number;
}

// Game settings
export interface GameSettings {
  readonly volume: {
    readonly master: number;
    readonly music: number;
    readonly sfx: number;
  };
  readonly graphics: {
    readonly quality: "low" | "medium" | "high";
    readonly fullscreen: boolean;
    readonly vsync: boolean;
  };
  readonly controls: {
    readonly keyboardLayout: "qwerty" | "dvorak" | "colemak";
    readonly mouseSensitivity: number;
  };
  readonly language: "korean" | "english" | "both";
}

// Screen navigation
export interface ScreenNavigation {
  readonly currentScreen: string;
  readonly previousScreen?: string;
  readonly navigate: (screen: string) => void;
  readonly goBack: () => void;
}

// Loading state
export interface LoadingState {
  readonly isLoading: boolean;
  readonly progress?: number;
  readonly message?: KoreanText;
}

// Error state
export interface ErrorState {
  readonly hasError: boolean;
  readonly error?: Error;
  readonly message?: KoreanText;
  readonly retry?: () => void;
}

// UI component interfaces
export interface UIComponentProps {
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
}

// Fix: Add missing ComponentState export
export interface ComponentState {
  readonly visible: boolean;
  readonly interactive: boolean;
  readonly loading: boolean;
  readonly error?: string;
}

// Fix: Add missing InteractionEvent export
export interface InteractionEvent {
  readonly type: string;
  readonly target: string;
  readonly timestamp: number;
  readonly data?: any;
}
