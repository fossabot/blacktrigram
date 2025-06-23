/**
 * Component props interfaces for Black Trigram Korean martial arts system
 */

import type * as PIXI from "pixi.js";

// Base component props interface
export interface BaseComponentProps {
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
  readonly alpha?: number;
  readonly rotation?: number;
  readonly scale?: number | { x: number; y: number };
  readonly anchor?: number | { x: number; y: number };
  readonly pivot?: number | { x: number; y: number };
  readonly tint?: number;
  readonly blendMode?: PIXI.BLEND_MODES;
  readonly filters?: PIXI.Filter[];
  readonly mask?: PIXI.Container; // Fix: Use Container instead of DisplayObject
  readonly renderable?: boolean;
  readonly zIndex?: number;
  readonly name?: string;
  readonly accessibleTitle?: string;
  readonly accessibleHint?: string;
  readonly tabIndex?: number;
}

export type PixiContainer = PIXI.Container;
export type PixiGraphics = PIXI.Graphics;
export type PixiText = PIXI.Text;
export type PixiSprite = PIXI.Sprite;
export type PixiTextStyle = PIXI.TextStyle;
