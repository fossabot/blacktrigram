import type {
  Graphics,
  Container as PixiContainer,
  Text,
  Sprite,
  Texture,
  DisplayObject,
  FederatedPointerEvent,
  TextStyle,
  Ticker,
} from "pixi.js";
import type { ReactNode } from "react";

// Declare module for @pixi/react
declare module "@pixi/react" {
  export interface ContainerProps {
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

    // Data attributes
    "data-testid"?: string;
    [key: string]: any;
  }

  export interface GraphicsProps {
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
  }

  export interface TextProps {
    x?: number;
    y?: number;
    scale?: { x: number; y: number } | number;
    rotation?: number;
    alpha?: number;
    visible?: boolean;
    interactive?: boolean;
    cursor?: string;
    pivot?: { x: number; y: number };
    anchor?: number | { x: number; y: number };

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
    [key: string]: any;
  }

  // Component exports - using the actual @pixi/react exports
  export const Container: React.FC<ContainerProps>;
  export const Graphics: React.FC<GraphicsProps>;
  export const Text: React.FC<TextProps>;
  export const Stage: React.FC<any>;
  export const Sprite: React.FC<any>;

  // Hook exports
  export function useTick(callback: (delta: number) => void): void;
  export function useApp(): any;
}

// Only declare the module for react-reconciler constants fix
declare module "react-reconciler/constants" {
  export * from "react-reconciler/constants.js";
}

export {}; // namespace declaration
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}
