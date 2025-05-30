import React from "react";
import {
  Stage as PixiStage,
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Text as PixiText,
  Sprite as PixiSprite,
  useTick,
  useApp,
  extend,
} from "@pixi/react";
import { Graphics as PixiJsGraphics, Sprite as PixiJsSprite } from "pixi.js";
import { KOREAN_COLORS } from "../../../types";

// Extend PixiJS objects to make them available as React components
extend({ Graphics: PixiJsGraphics, Sprite: PixiJsSprite });

// Re-export @pixi/react components and hooks
export { useTick, useApp };
export const Stage = PixiStage;
export const Container = PixiContainer;
export const Graphics = PixiGraphics;
export const Text = PixiText;
export const Sprite = PixiSprite;

// Base props interface for all Pixi components
export interface BasePixiProps {
  x?: number | undefined;
  y?: number | undefined;
  width?: number | undefined;
  height?: number | undefined;
  scale?: (number | { x: number; y: number }) | undefined;
  rotation?: number | undefined;
  alpha?: number | undefined;
  visible?: boolean | undefined;
  interactive?: boolean | undefined;
  cursor?: string | undefined;
  pivot?: { x: number; y: number } | undefined;
  anchor?: (number | { x: number; y: number }) | undefined;
  "data-testid"?: string | undefined;
}

// Enhanced component prop interfaces
export interface PixiContainerProps extends BasePixiProps {
  readonly children?: React.ReactNode;
}

export interface PixiGraphicsProps extends BasePixiProps {
  readonly draw: (graphics: PixiJsGraphics) => void;
}

export interface PixiTextProps extends BasePixiProps {
  readonly text: string;
  readonly style?: any; // PIXI.TextStyle
}

export interface PixiSpriteProps extends BasePixiProps {
  readonly texture?: any; // PIXI.Texture
  readonly image?: string | undefined;
}

// Korean-specific container with traditional styling
export interface KoreanPixiContainerProps extends PixiContainerProps {
  readonly traditionalBorder?: boolean | undefined;
  readonly koreanSpacing?: boolean | undefined;
}

export function KoreanPixiContainer({
  children,
  x = 0,
  y = 0,
  alpha = 1.0,
  traditionalBorder = false,
  koreanSpacing = false,
  anchor,
  ...props
}: KoreanPixiContainerProps): React.ReactElement {
  // Create plain JS object for props to avoid TypeScript exact optional properties issues
  const containerProps: any = {
    x,
    y,
    alpha,
    ...props,
  };

  // Only add anchor if it's defined
  if (anchor !== undefined) {
    containerProps.anchor = anchor;
  }

  return (
    <Container {...containerProps}>
      {traditionalBorder && (
        <Graphics
          draw={(g: PixiJsGraphics) => {
            g.clear();
            // Basic border, customize as needed
            g.rect(0, 0, props.width || 100, props.height || 100);
            g.stroke({ width: 2, color: KOREAN_COLORS.GOLD });
          }}
        />
      )}
      {children}
    </Container>
  );
}

// Korean text style constants
export const KOREAN_TEXT_STYLE = {
  fontFamily: "Noto Sans KR, Arial, sans-serif",
  fontSize: 16,
  fill: KOREAN_COLORS.WHITE,
} as const;

// Export KOREAN_COLORS directly - fix the export issue
export { KOREAN_COLORS };
