import type {
  Graphics,
  Container,
  Text,
  TextStyle,
  TextStyleOptions,
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
      pixiContainer: any;
      pixiGraphics: any;
      pixiText: any;
      pixiSprite: any;
    }
  }
}

export {};
