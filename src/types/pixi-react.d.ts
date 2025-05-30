/// <reference types="pixi.js" />
/// <reference types="react" />

import type {
  Graphics,
  Container as PixiContainer,
  Text as PixiText,
  Sprite,
  Texture,
  DisplayObject,
  FederatedPointerEvent,
  TextStyle,
  Application,
} from "pixi.js";
import type { ReactNode } from "react";

// Declare module for @pixi/react with correct v8 exports
declare module "@pixi/react" {
  // Component prop interfaces
  export interface BaseProps {
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
    "data-testid"?: string;
    [key: string]: any;
  }

  export interface ContainerProps extends BaseProps {
    children?: React.ReactNode;
    // Event handlers
    onPointerDown?: (event: FederatedPointerEvent) => void;
    onPointerUp?: (event: FederatedPointerEvent) => void;
    onPointerMove?: (event: FederatedPointerEvent) => void;
    onPointerEnter?: (event: FederatedPointerEvent) => void;
    onPointerLeave?: (event: FederatedPointerEvent) => void;
    onClick?: (event: FederatedPointerEvent) => void;
  }

  export interface GraphicsProps extends BaseProps {
    draw?: (graphics: Graphics) => void;
    // Event handlers
    onPointerDown?: (event: FederatedPointerEvent) => void;
    onPointerUp?: (event: FederatedPointerEvent) => void;
    onPointerMove?: (event: FederatedPointerEvent) => void;
    onPointerEnter?: (event: FederatedPointerEvent) => void;
    onPointerLeave?: (event: FederatedPointerEvent) => void;
    onClick?: (event: FederatedPointerEvent) => void;
  }

  export interface TextProps extends BaseProps {
    text: string;
    style?: Partial<TextStyle> | TextStyle;
    anchor?: number | { x: number; y: number };
    // Event handlers
    onPointerDown?: (event: FederatedPointerEvent) => void;
    onPointerUp?: (event: FederatedPointerEvent) => void;
    onPointerMove?: (event: FederatedPointerEvent) => void;
    onPointerEnter?: (event: FederatedPointerEvent) => void;
    onPointerLeave?: (event: FederatedPointerEvent) => void;
    onClick?: (event: FederatedPointerEvent) => void;
  }

  export interface StageProps {
    width?: number;
    height?: number;
    options?: any;
    children?: React.ReactNode;
    onMount?: (app: Application) => void;
    [key: string]: any;
  }

  export interface SpriteProps extends BaseProps {
    texture?: Texture;
    image?: string;
    // Event handlers
    onPointerDown?: (event: FederatedPointerEvent) => void;
    onPointerUp?: (event: FederatedPointerEvent) => void;
    onPointerMove?: (event: FederatedPointerEvent) => void;
    onPointerEnter?: (event: FederatedPointerEvent) => void;
    onPointerLeave?: (event: FederatedPointerEvent) => void;
    onClick?: (event: FederatedPointerEvent) => void;
  }

  // Component exports - these are the actual component functions
  export const Stage: React.FC<StageProps>;
  export const Container: React.FC<ContainerProps>;
  export const Graphics: React.FC<GraphicsProps>;
  export const Text: React.FC<TextProps>;
  export const Sprite: React.FC<SpriteProps>;

  // Hook exports
  export function useTick(callback: (delta: number) => void): void;
  export function useApp(): Application;
  export function extend(components: Record<string, any>): void;

  // Additional utilities
  export const PixiComponent: any;
}

// Ensure proper module resolution
declare module "react-reconciler/constants" {
  export * from "react-reconciler/constants.js";
}

export {};
