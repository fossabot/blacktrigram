import type {
  Graphics,
  Container,
  Text,
  Sprite,
  Texture,
  DisplayObject,
  FederatedPointerEvent,
  TextStyle,
} from "pixi.js";
import type { ReactNode } from "react";

// Only declare the module for react-reconciler constants fix
declare module "react-reconciler/constants" {
  export * from "react-reconciler/constants.js";
}

// Extend TextStyle to support alpha property for compatibility
declare module "pixi.js" {
  interface TextStyle {
    alpha?: number;
  }

  interface TextStyleOptions {
    alpha?: number;
  }
}

// Global JSX declarations for PixiJS React components
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        scale?: { x: number; y: number } | number;
        rotation?: number;
        alpha?: number;
        visible?: boolean;
        interactive?: boolean;
        cursor?: string;
        pivot?: { x: number; y: number };
        anchor?: { x: number; y: number };
        children?: React.ReactNode;

        // Event handlers
        onPointerDown?: (event: FederatedPointerEvent) => void;
        onPointerUp?: (event: FederatedPointerEvent) => void;
        onPointerMove?: (event: FederatedPointerEvent) => void;
        onPointerEnter?: (event: FederatedPointerEvent) => void;
        onPointerLeave?: (event: FederatedPointerEvent) => void;
        onClick?: (event: FederatedPointerEvent) => void;

        // Data attributes for testing
        "data-testid"?: string;
        [key: string]: any;
      };

      pixiGraphics: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        scale?: { x: number; y: number } | number;
        rotation?: number;
        alpha?: number;
        visible?: boolean;
        interactive?: boolean;
        cursor?: string;
        pivot?: { x: number; y: number };
        anchor?: { x: number; y: number };

        // Graphics-specific props
        draw?: (graphics: Graphics) => void;

        // Event handlers
        onPointerDown?: (event: FederatedPointerEvent) => void;
        onPointerUp?: (event: FederatedPointerEvent) => void;
        onPointerMove?: (event: FederatedPointerEvent) => void;
        onPointerEnter?: (event: FederatedPointerEvent) => void;
        onPointerLeave?: (event: FederatedPointerEvent) => void;
        onClick?: (event: FederatedPointerEvent) => void;

        // Data attributes
        "data-testid"?: string;
        [key: string]: any;
      };

      pixiText: {
        x?: number;
        y?: number;
        scale?: { x: number; y: number } | number;
        rotation?: number;
        alpha?: number;
        visible?: boolean;
        interactive?: boolean;
        cursor?: string;
        pivot?: { x: number; y: number };
        anchor?: { x: number; y: number };

        // Text-specific props
        text: string;
        style?: Partial<TextStyle> | TextStyle;

        // Event handlers
        onPointerDown?: (event: FederatedPointerEvent) => void;
        onPointerUp?: (event: FederatedPointerEvent) => void;
        onPointerMove?: (event: FederatedPointerEvent) => void;
        onPointerEnter?: (event: FederatedPointerEvent) => void;
        onPointerLeave?: (event: FederatedPointerEvent) => void;
        onClick?: (event: FederatedPointerEvent) => void;

        // Data attributes
        "data-testid"?: string;
        "data-text"?: string;
        "data-font-family"?: string;
        "data-font-size"?: string;
        "data-fill"?: string;
        [key: string]: any;
      };

      pixiSprite: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        scale?: { x: number; y: number } | number;
        rotation?: number;
        alpha?: number;
        visible?: boolean;
        interactive?: boolean;
        cursor?: string;
        pivot?: { x: number; y: number };
        anchor?: { x: number; y: number };

        // Sprite-specific props
        texture: Texture;
        tint?: number;

        // Event handlers
        onPointerDown?: (event: FederatedPointerEvent) => void;
        onPointerUp?: (event: FederatedPointerEvent) => void;
        onPointerMove?: (event: FederatedPointerEvent) => void;
        onPointerEnter?: (event: FederatedPointerEvent) => void;
        onPointerLeave?: (event: FederatedPointerEvent) => void;
        onClick?: (event: FederatedPointerEvent) => void;

        // Data attributes
        "data-testid"?: string;
        [key: string]: any;
      };
    }
  }
}

export {};
