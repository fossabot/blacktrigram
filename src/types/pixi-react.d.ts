/// <reference types="pixi.js" />
/// <reference types="react" />

import type {
  Container,
  Graphics,
  Text,
  Sprite,
  Texture,
  DisplayObject,
  FederatedPointerEvent,
  TextStyle,
  Application as PIXIApplication, // Renamed to avoid conflict
} from "pixi.js";

// PIXI.js React integration type declarations
declare module "@pixi/react" {
  import * as PIXI from "pixi.js";
  import { ComponentType, ReactNode } from "react";

  // Basic PixiJS React components
  export const Stage: ComponentType<{
    children?: ReactNode;
    width?: number;
    height?: number;
    options?: Partial<PIXI.ApplicationOptions>;
  }>;

  export const Container: ComponentType<{
    children?: ReactNode;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    interactive?: boolean;
    buttonMode?: boolean;
    pointertap?: () => void;
    anchor?: number | { x: number; y: number };
  }>;

  export const Graphics: ComponentType<{
    draw: (graphics: PIXI.Graphics) => void;
    x?: number;
    y?: number;
  }>;

  export const Text: ComponentType<{
    text: string;
    style?: PIXI.TextStyle | Partial<PIXI.TextStyleOptions>;
    x?: number;
    y?: number;
    anchor?: number | { x: number; y: number };
  }>;

  export const Sprite: ComponentType<{
    texture?: PIXI.Texture;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    anchor?: number | { x: number; y: number };
    interactive?: boolean;
    buttonMode?: boolean;
    pointertap?: () => void;
  }>;

  // Hooks
  export function useApp(): PIXI.Application;
  export function useTick(callback: (delta: number) => void): void;
}

// Additional PIXI types for Korean martial arts
declare module "pixi.js" {
  interface TextStyleOptions {
    fontFamily?: string | string[];
    fontSize?: number;
    fontWeight?: TextStyleFontWeight;
    fill?: ColorSource;
    stroke?:
      | ColorSource
      | {
          color?: ColorSource;
          width?: number;
        };
    dropShadow?: {
      color?: ColorSource;
      alpha?: number;
      angle?: number;
      blur?: number;
      distance?: number;
    };
    align?: TextStyleAlign;
    wordWrap?: boolean;
    wordWrapWidth?: number;
    lineHeight?: number;
  }
}

// Korean text specific PIXI extensions
export interface KoreanPixiTextOptions extends PIXI.TextStyleOptions {
  koreanFont?: string;
  englishFont?: string;
  romanizedFont?: string;
  bilingual?: boolean;
  showRomanization?: boolean;
}

export interface KoreanPixiGraphicsOptions {
  trigramSymbol?: string;
  stance?: string;
  glowColor?: number;
  pulseAnimation?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: any;
      pixiGraphics: any;
      pixiSprite: any;
      pixiText: any;
      pixiAnimatedSprite: any;
      pixiTilingSprite: any;
      pixiParticleContainer: any;
      pixiBitmapText: any;
    }
  }
}

export {};
