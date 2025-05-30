import React from "react";
import {
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Text as PixiText,
  Sprite as PixiSprite,
  useApp, // Fix: Use useApp instead of useApplication
} from "@pixi/react";
import type {
  ContainerProps,
  GraphicsProps,
  TextProps,
  SpriteProps,
} from "@pixi/react";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types";

// Re-export @pixi/react components with proper types
export const Container = PixiContainer;
export const Graphics = PixiGraphics;
export const Text = PixiText;
export const Sprite = PixiSprite;

// Export correct hook
export { useApp };

// Export color constants from types
export { KOREAN_COLORS } from "../../../types";

// Export Korean text styles
export const KOREAN_TEXT_STYLE = {
  fontFamily: KOREAN_FONT_FAMILY,
  fontSize: 16,
  fill: KOREAN_COLORS.WHITE,
  fontWeight: "bold" as const,
} as const;

// Base props interfaces with proper PixiJS types
export interface BasePixiProps {
  readonly x?: number;
  readonly y?: number;
  readonly scale?: number | { x: number; y: number };
  readonly rotation?: number;
  readonly alpha?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
  readonly buttonMode?: boolean;
  readonly anchor?: { x: number; y: number }; // Fix: only object form
  readonly pivot?: { x: number; y: number }; // Fix: only object form
}

// Component prop type exports with proper inheritance
export type PixiContainerProps = ContainerProps & BasePixiProps;
export type PixiGraphicsProps = GraphicsProps & BasePixiProps;
export type PixiTextProps = TextProps & BasePixiProps;
export type PixiSpriteProps = SpriteProps & BasePixiProps;

// Korean-specific container props
export interface KoreanContainerProps
  extends Omit<PixiContainerProps, "children"> {
  readonly koreanTheme?: boolean;
  readonly traditionalBorder?: boolean;
  readonly children?: React.ReactNode;
}

// Korean container component with proper prop handling
export function KoreanContainer({
  koreanTheme = true,
  traditionalBorder = false,
  children,
  anchor,
  pivot,
  scale,
  ...props
}: KoreanContainerProps): React.ReactElement {
  // Fix: Handle undefined values properly for strict TypeScript
  const containerProps: ContainerProps = {
    ...props,
    ...(anchor && { anchor }),
    ...(pivot && { pivot }),
    ...(scale && { scale }),
  };

  return (
    <Container {...containerProps}>
      {traditionalBorder && (
        <Graphics
          draw={(g) => {
            g.clear();
            g.setStrokeStyle({
              color: koreanTheme ? KOREAN_COLORS.GOLD : KOREAN_COLORS.WHITE,
              width: 2,
            });
            g.rect(-10, -10, 20, 20);
            g.stroke();
          }}
        />
      )}
      {children}
    </Container>
  );
}

// Traditional Korean text component with proper prop handling
export interface KoreanTextProps
  extends Omit<PixiTextProps, "text" | "style" | "anchor" | "pivot"> {
  readonly koreanText: string;
  readonly size?: number;
  readonly color?: string;
  readonly weight?: "normal" | "bold";
  readonly stroke?: boolean;
  readonly anchor?: { x: number; y: number };
  readonly pivot?: { x: number; y: number };
}

export function KoreanText({
  koreanText,
  size = 16,
  color = KOREAN_COLORS.WHITE,
  weight = "normal",
  stroke = false,
  anchor,
  pivot,
  ...props
}: KoreanTextProps): React.ReactElement {
  // Fix: Create proper style object without undefined values
  const textStyle: any = {
    fontFamily: KOREAN_FONT_FAMILY,
    fontSize: size,
    fill: color,
    fontWeight: weight,
  };

  if (stroke) {
    textStyle.stroke = {
      color: KOREAN_COLORS.BLACK,
      width: 2,
    };
  }

  // Fix: Handle undefined values properly
  const textProps: TextProps = {
    text: koreanText,
    style: textStyle,
    ...(anchor && { anchor }),
    ...(pivot && { pivot }),
    ...props,
  };

  return <Text {...textProps} />;
}

// Traditional Korean header with proper prop handling
export interface KoreanHeaderProps extends BasePixiProps {
  readonly title: string;
  readonly subtitle?: string;
}

export function KoreanHeader({
  title,
  subtitle,
  x = 0,
  y = 0,
  anchor,
  pivot,
  scale,
  ...props
}: KoreanHeaderProps): React.ReactElement {
  // Fix: Handle undefined values properly
  const containerProps: ContainerProps = {
    x,
    y,
    ...(anchor && { anchor }),
    ...(pivot && { pivot }),
    ...(scale && { scale }),
    ...props,
  };

  return (
    <Container {...containerProps}>
      <KoreanText
        koreanText={title}
        size={24}
        color={KOREAN_COLORS.GOLD}
        weight="bold"
        stroke={true}
        x={0}
        y={0}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      {subtitle && (
        <KoreanText
          koreanText={subtitle}
          size={14}
          color={KOREAN_COLORS.WHITE}
          weight="normal"
          x={0}
          y={30}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      )}
    </Container>
  );
}

// Korean martial arts instruction text with proper prop handling
export interface KoreanInstructionProps extends BasePixiProps {
  readonly instruction: string;
  readonly description?: string;
}

export function KoreanInstruction({
  instruction,
  description,
  x = 0,
  y = 0,
  anchor,
  pivot,
  scale,
  ...props
}: KoreanInstructionProps): React.ReactElement {
  // Fix: Handle undefined values properly
  const containerProps: ContainerProps = {
    x,
    y,
    ...(anchor && { anchor }),
    ...(pivot && { pivot }),
    ...(scale && { scale }),
    ...props,
  };

  return (
    <Container {...containerProps}>
      <KoreanText
        koreanText={instruction}
        size={18}
        color={KOREAN_COLORS.CYAN}
        weight="bold"
        x={0}
        y={0}
      />
      {description && (
        <KoreanText
          koreanText={description}
          size={12}
          color={KOREAN_COLORS.GRAY_LIGHT}
          weight="normal"
          x={0}
          y={25}
          alpha={0.8}
        />
      )}
    </Container>
  );
}

// Korean philosophy text component with proper prop handling
export interface KoreanPhilosophyProps extends BasePixiProps {
  readonly philosophy: string;
  readonly emphasis?: boolean;
}

export function KoreanPhilosophy({
  philosophy,
  emphasis = false,
  x = 0,
  y = 0,
  anchor,
  pivot,
  scale,
  ...props
}: KoreanPhilosophyProps): React.ReactElement {
  // Fix: Handle undefined values properly
  const containerProps: ContainerProps = {
    x,
    y,
    ...(anchor && { anchor }),
    ...(pivot && { pivot }),
    ...(scale && { scale }),
    ...props,
  };

  return (
    <Container {...containerProps}>
      <KoreanText
        koreanText={philosophy}
        size={emphasis ? 16 : 14}
        color={emphasis ? KOREAN_COLORS.GOLD : KOREAN_COLORS.WHITE}
        weight={emphasis ? "bold" : "normal"}
        x={0}
        y={0}
        alpha={0.9}
      />
    </Container>
  );
}

// Korean status display with proper prop handling
export interface KoreanStatusProps extends BasePixiProps {
  readonly status: string;
  readonly value?: string | number;
  readonly warning?: boolean;
}

export function KoreanStatus({
  status,
  value,
  warning = false,
  x = 0,
  y = 0,
  anchor,
  pivot,
  scale,
  ...props
}: KoreanStatusProps): React.ReactElement {
  // Fix: Handle undefined values properly
  const containerProps: ContainerProps = {
    x,
    y,
    ...(anchor && { anchor }),
    ...(pivot && { pivot }),
    ...(scale && { scale }),
    ...props,
  };

  return (
    <Container {...containerProps}>
      <KoreanText
        koreanText={status}
        size={14}
        color={warning ? KOREAN_COLORS.Orange : KOREAN_COLORS.WHITE}
        weight="bold"
        stroke={warning}
        x={0}
        y={0}
      />
      {value !== undefined && (
        <KoreanText
          koreanText={String(value)}
          size={16}
          color={warning ? KOREAN_COLORS.CRITICAL_RED : KOREAN_COLORS.CYAN}
          weight="bold"
          x={100}
          y={0}
        />
      )}
    </Container>
  );
}
