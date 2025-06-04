// Reusable PIXI.js components for Black Trigram Korean martial arts game

import React, { useCallback, useMemo, useState } from "react";
import { TextStyle } from "pixi.js"; // Import TextStyle as a value
import type {
  FederatedPointerEvent,
  Graphics as GraphicsType,
  TextDropShadow,
  TextStyleFontWeight,
} from "pixi.js"; // Keep these as type imports
import type { TrigramStance } from "../../../types";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY_PRIMARY,
  TRIGRAM_DATA,
} from "../../../types/constants";

// Extended TextStyle interface for better type safety
export interface ExtendedPixiTextStyle {
  readonly fontFamily?: string;
  readonly fontSize?: number;
  readonly fill?: number | string;
  readonly fontWeight?: TextStyleFontWeight;
  readonly align?: "left" | "center" | "right";
  readonly dropShadow?: TextDropShadow;
  readonly stroke?: { color: number; width: number } | number | string;
  readonly strokeThickness?: number;
}

// Base component interfaces
export interface PixiContainerComponentProps {
  readonly x?: number;
  readonly y?: number;
  readonly scale?: number | { x: number; y: number };
  readonly rotation?: number;
  readonly alpha?: number;
  readonly visible?: boolean;
  readonly interactive?: boolean;
  readonly cursor?: string;
  readonly onpointertap?: (event: FederatedPointerEvent) => void;
  readonly onpointerover?: (event: FederatedPointerEvent) => void;
  readonly onpointerout?: (event: FederatedPointerEvent) => void;
  readonly children?: React.ReactNode;
}

export interface PixiGraphicsComponentProps
  extends PixiContainerComponentProps {
  readonly draw: (graphics: GraphicsType) => void;
}

export interface PixiTextComponentProps extends PixiContainerComponentProps {
  readonly text: string;
  readonly style?: ExtendedPixiTextStyle;
  readonly anchor?: { x: number; y: number } | number;
  readonly resolution?: number;
}

// Base components
export function PixiContainerComponent({
  children,
  ...props
}: PixiContainerComponentProps): React.ReactElement {
  return <pixiContainer {...props}>{children}</pixiContainer>;
}

export function PixiGraphicsComponent({
  draw,
  ...props
}: PixiGraphicsComponentProps): React.ReactElement {
  const drawCallback = useCallback(
    (g: GraphicsType) => {
      if (draw && g) {
        g.clear();
        draw(g);
      }
    },
    [draw]
  );

  return <pixiGraphics draw={drawCallback} {...props} />;
}

export function PixiTextComponent({
  text,
  style,
  ...props
}: PixiTextComponentProps): React.ReactElement {
  // Instead of creating a TextStyle instance, we'll pass the style props directly
  return <pixiText text={text} style={style || {}} {...props} />;
}

// Example stance colors - use lowercase property names from KOREAN_COLORS
const STANCE_COLORS = {
  geon: KOREAN_COLORS.geon,
  tae: KOREAN_COLORS.tae,
  li: KOREAN_COLORS.li,
  jin: KOREAN_COLORS.jin,
  son: KOREAN_COLORS.son,
  gam: KOREAN_COLORS.gam,
  gan: KOREAN_COLORS.gan,
  gon: KOREAN_COLORS.gon,
} as const;

// Interface definitions
export interface TrigramButtonProps {
  readonly stance: TrigramStance;
  readonly onClick?: (event: FederatedPointerEvent) => void;
  readonly size?: number;
  readonly x?: number;
  readonly y?: number;
  readonly active?: boolean;
}

export interface StatusBarProps {
  readonly current: number;
  readonly maximum: number;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
  readonly color?: number;
  readonly backgroundColor?: number;
  readonly showText?: boolean;
}

export interface KoreanTextDisplayProps {
  readonly korean: string;
  readonly english?: string;
  readonly x?: number;
  readonly y?: number;
  readonly size?: number;
  readonly color?: number;
  readonly emphasis?: boolean;
  readonly bilingual?: boolean;
}

export interface CyberpunkGlowProps {
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly intensity?: number;
  readonly color?: number;
}

// Add missing interface definitions - place these before their component implementations
interface HealthBarProps {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly currentHealth: number;
  readonly maxHealth: number;
  readonly color?: number;
}

interface KiBarProps {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly currentKi: number;
  readonly maxKi: number;
}

interface StanceIndicatorProps {
  readonly x: number;
  readonly y: number;
  readonly radius: number;
  readonly color: number;
  readonly isActive?: boolean;
}

// Component implementations
export const TrigramButton = React.memo(function TrigramButton({
  stance,
  onClick,
  size = 60,
  x = 0,
  y = 0,
  active = false,
}: TrigramButtonProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  const trigram = TRIGRAM_DATA[stance];
  const stanceColor = STANCE_COLORS[stance];

  const drawButton = useCallback(
    (g: GraphicsType) => {
      g.clear();

      // Button background
      const alpha = active ? 1.0 : isHovered ? 0.8 : 0.6;
      g.beginFill(stanceColor, alpha);
      g.drawCircle(0, 0, size / 2);
      g.endFill();

      // Button border
      g.lineStyle(
        active ? 3 : 2,
        active ? KOREAN_COLORS.WHITE : KOREAN_COLORS.GRAY_LIGHT
      );
      g.drawCircle(0, 0, size / 2);
    },
    [size, stanceColor, active, isHovered]
  );

  return (
    <pixiContainer
      x={x}
      y={y}
      interactive={true}
      cursor="pointer"
      onPointerDown={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <pixiGraphics draw={drawButton} />
      <pixiText
        text={trigram.symbol}
        style={{
          fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
          fontSize: size * 0.4,
          fill: KOREAN_COLORS.WHITE,
          align: "center",
        }}
        anchor={0.5}
      />
    </pixiContainer>
  );
});

export const StatusBar = React.memo(function StatusBar({
  current,
  maximum,
  width = 200,
  height = 20,
  x = 0,
  y = 0,
  color = KOREAN_COLORS.CYAN,
  backgroundColor = KOREAN_COLORS.GRAY_DARK,
  showText = true,
}: StatusBarProps): React.ReactElement {
  const percentage = Math.max(0, Math.min(1, current / maximum));

  const drawBar = useCallback(
    (g: GraphicsType) => {
      g.clear();

      // Background
      g.beginFill(backgroundColor, 0.8);
      g.drawRoundedRect(0, 0, width, height, 4);
      g.endFill();

      // Fill bar
      if (percentage > 0) {
        g.beginFill(color, 1.0);
        g.drawRoundedRect(2, 2, (width - 4) * percentage, height - 4, 2);
        g.endFill();
      }

      // Border
      g.lineStyle(1, KOREAN_COLORS.WHITE);
      g.drawRoundedRect(0, 0, width, height, 4);
    },
    [width, height, percentage, color, backgroundColor]
  );

  return (
    <pixiContainer x={x} y={y}>
      <pixiGraphics draw={drawBar} />
      {showText && (
        <pixiText
          text={`${Math.round(current)} / ${maximum}`}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: height * 0.6,
            fill: KOREAN_COLORS.WHITE,
            align: "center",
          }}
          anchor={0.5}
          x={width / 2}
          y={height / 2}
        />
      )}
    </pixiContainer>
  );
});

export const KoreanTextDisplay = React.memo(function KoreanTextDisplay({
  korean,
  english,
  x = 0,
  y = 0,
  size = 16,
  color = KOREAN_COLORS.WHITE,
  emphasis = false,
  bilingual = true,
}: KoreanTextDisplayProps): React.ReactElement {
  const drawBackground = useCallback(
    (g: GraphicsType) => {
      if (!emphasis) return;

      g.clear();
      g.beginFill(KOREAN_COLORS.BLACK, 0.7);
      g.drawRoundedRect(-10, -5, 200, size + 10, 5);
      g.endFill();
    },
    [emphasis, size]
  );

  const backgroundBar = useCallback(
    (g: GraphicsType) => {
      if (!emphasis) return;

      g.clear();
      g.beginFill(KOREAN_COLORS.ACCENT_BLUE, 0.3);
      g.drawRect(-8, -3, 196, size + 6);
      g.endFill();
    },
    [emphasis, size]
  );

  const accentLine = useCallback(
    (g: GraphicsType) => {
      if (!emphasis) return;

      g.clear();
      g.lineStyle(2, KOREAN_COLORS.CYAN);
      g.moveTo(-8, size + 3);
      g.lineTo(188, size + 3);
    },
    [emphasis, size]
  );

  const displayText = bilingual && english ? `${korean} (${english})` : korean;

  return (
    <pixiContainer x={x} y={y}>
      <pixiGraphics draw={drawBackground} />
      <pixiGraphics draw={backgroundBar} />
      <pixiGraphics draw={accentLine} />
      <pixiText
        text={displayText}
        style={{
          fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
          fontSize: size,
          fill: color,
          fontWeight: emphasis ? "bold" : "normal",
          align: "left",
          dropShadow: emphasis
            ? {
                color: KOREAN_COLORS.BLACK,
                distance: 1,
                blur: 2,
                angle: Math.PI / 4,
                alpha: 0.5,
              }
            : undefined,
        }}
      />
    </pixiContainer>
  );
});

export const CyberpunkGlow = React.memo(function CyberpunkGlow({
  x = 0,
  y = 0,
  radius = 50,
  intensity = 1.0,
  color = KOREAN_COLORS.CYAN,
}: CyberpunkGlowProps): React.ReactElement {
  const drawGlow = useCallback(
    (g: GraphicsType) => {
      g.clear();

      // Outer glow
      g.beginFill(color, 0.1 * intensity);
      g.drawCircle(0, 0, radius * 1.5);
      g.endFill();

      // Middle glow
      g.beginFill(color, 0.3 * intensity);
      g.drawCircle(0, 0, radius);
      g.endFill();

      // Inner glow
      g.beginFill(color, 0.6 * intensity);
      g.drawCircle(0, 0, radius * 0.5);
      g.endFill();

      // Core
      g.beginFill(KOREAN_COLORS.WHITE, 0.8 * intensity);
      g.drawCircle(0, 0, radius * 0.2);
      g.endFill();
    },
    [radius, intensity, color]
  );

  return (
    <pixiContainer x={x} y={y}>
      <pixiGraphics draw={drawGlow} />
    </pixiContainer>
  );
});

// Background grid component
export const BackgroundGrid = React.memo(function BackgroundGrid({
  width,
  height,
  gridSize = 50,
  color = KOREAN_COLORS.GRAY_MEDIUM,
  alpha = 0.3,
}: {
  width: number;
  height: number;
  gridSize?: number;
  color?: number;
  alpha?: number;
}): React.ReactElement {
  const drawGrid = useCallback(
    (g: GraphicsType) => {
      g.clear();
      g.lineStyle(1, color, alpha);

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        g.moveTo(x, 0);
        g.lineTo(x, height);
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        g.moveTo(0, y);
        g.lineTo(width, y);
      }
    },
    [width, height, gridSize, color, alpha]
  );

  return <pixiGraphics draw={drawGrid} />;
});

// Highlight text component with Korean and English support
export interface KoreanHighlightTextProps {
  readonly text: string;
  readonly type?: "info" | "warning" | "success";
  readonly style?: ExtendedPixiTextStyle;
  readonly x?: number;
  readonly y?: number;
  readonly anchor?: number | { x: number; y: number };
}

export function KoreanHighlightText({
  text,
  type = "info",
  style,
  ...textProps
}: KoreanHighlightTextProps): React.ReactElement {
  const colors = useMemo(
    () => ({
      info: KOREAN_COLORS.CYAN,
      warning: KOREAN_COLORS.TRADITIONAL_RED,
      success: KOREAN_COLORS.GREEN,
    }),
    []
  );

  const highlightStyle = useCallback((): ExtendedPixiTextStyle => {
    const base: ExtendedPixiTextStyle = {
      fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
      fontSize: 16,
      fill: colors[type],
      fontWeight: "bold",
    };

    // Fix: Create dropShadow object without duplicates
    const dropShadowConfig = style?.dropShadow
      ? {
          ...style.dropShadow,
        }
      : {
          color: KOREAN_COLORS.BLACK,
          distance: 1,
          blur: 2,
          angle: Math.PI / 4,
          alpha: 0.5,
        };

    return {
      ...base,
      ...style,
      dropShadow: dropShadowConfig,
    };
  }, [type, style, colors]);

  return (
    <PixiTextComponent {...textProps} text={text} style={highlightStyle()} />
  );
}

// Create proper text styles without unsupported properties
export const createTextStyle = (
  baseStyle: Partial<TextStyle> = {}
): TextStyle => {
  const style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 16,
    fill: 0xffffff,
    ...baseStyle,
  });

  return style;
};

// Korean-styled text component for PIXI
interface KoreanPixiTextProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly style?: Partial<ExtendedPixiTextStyle>;
  readonly anchor?: number | { x: number; y: number };
}

export function KoreanPixiText({
  text,
  x = 0,
  y = 0,
  style = {},
  anchor = 0.5,
}: KoreanPixiTextProps): React.ReactElement {
  const defaultStyle: Partial<TextStyle> = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: 16,
    fill: 0xffffff,
    align: "center",
    ...style,
  };

  return (
    <pixiText text={text} x={x} y={y} style={defaultStyle} anchor={anchor} />
  );
}

// Trigram symbol component
interface TrigramSymbolProps {
  readonly symbol: string;
  readonly x: number;
  readonly y: number;
  readonly color?: number;
  readonly size?: number;
}

export function TrigramSymbol({
  symbol,
  x,
  y,
  color = 0xffd700,
  size = 32,
}: TrigramSymbolProps): React.ReactElement {
  return (
    <KoreanPixiText
      text={symbol}
      x={x}
      y={y}
      style={{
        fontSize: size,
        fill: color,
        fontWeight: "bold",
      }}
    />
  );
}

// Combat HUD background
interface CombatHUDBackgroundProps {
  readonly width: number;
  readonly height: number;
  readonly alpha?: number;
}

export function CombatHUDBackground({
  width,
  height,
  alpha = 0.8,
}: CombatHUDBackgroundProps): React.ReactElement {
  const draw = React.useCallback(
    (g: GraphicsType) => {
      g.clear();
      g.beginFill(0x000000, alpha);
      g.lineStyle(2, 0x00ffff, 0.5);
      g.drawRoundedRect(0, 0, width, height, 8);
      g.endFill();
    },
    [width, height, alpha]
  );

  return <pixiGraphics draw={draw} />;
}

export function HealthBar({
  x,
  y,
  width,
  height,
  currentHealth,
  maxHealth,
  color = 0x00ff00,
}: HealthBarProps): React.ReactElement {
  const healthPercentage = Math.max(0, Math.min(1, currentHealth / maxHealth));

  const draw = React.useCallback(
    (g: GraphicsType) => {
      g.clear();

      // Background
      g.beginFill(0x333333);
      g.drawRect(x, y, width, height);
      g.endFill();

      // Health fill
      g.beginFill(color);
      g.drawRect(x, y, width * healthPercentage, height);
      g.endFill();

      // Border
      g.lineStyle(1, 0xffffff, 0.5);
      g.drawRect(x, y, width, height);
    },
    [x, y, width, height, healthPercentage, color]
  );

  return <pixiGraphics draw={draw} />;
}

export function KiBar({
  x,
  y,
  width,
  height,
  currentKi,
  maxKi,
}: KiBarProps): React.ReactElement {
  const kiPercentage = Math.max(0, Math.min(1, currentKi / maxKi));

  const draw = React.useCallback(
    (g: GraphicsType) => {
      g.clear();

      // Background
      g.beginFill(0x1a1a2e);
      g.drawRect(x, y, width, height);
      g.endFill();

      // Ki fill with gradient effect
      g.beginFill(0x00ffff);
      g.drawRect(x, y, width * kiPercentage, height);
      g.endFill();

      // Border
      g.lineStyle(1, 0x00ffff, 0.8);
      g.drawRect(x, y, width, height);
    },
    [x, y, width, height, kiPercentage]
  );

  return <pixiGraphics draw={draw} />;
}

export function StanceIndicator({
  x,
  y,
  radius,
  color,
  isActive = false,
}: StanceIndicatorProps): React.ReactElement {
  const draw = React.useCallback(
    (g: GraphicsType) => {
      g.clear();

      if (isActive) {
        // Glow effect for active stance
        g.beginFill(color, 0.3);
        g.drawCircle(x, y, radius + 8);
        g.endFill();
      }

      // Main circle
      g.beginFill(color, isActive ? 1.0 : 0.6);
      g.lineStyle(2, 0xffffff, isActive ? 1.0 : 0.5);
      g.drawCircle(x, y, radius);
      g.endFill();
    },
    [x, y, radius, color, isActive]
  );

  return <pixiGraphics draw={draw} />;
}

// Damage number display
interface DamageNumberProps {
  readonly damage: number;
  readonly x: number;
  readonly y: number;
  readonly isCritical?: boolean;
  readonly isVitalPoint?: boolean;
}

export function DamageNumber({
  damage,
  x,
  y,
  isCritical = false,
  isVitalPoint = false,
}: DamageNumberProps): React.ReactElement {
  let color = 0xffffff;
  let fontSize = 18;

  if (isVitalPoint) {
    color = 0xff0040;
    fontSize = 24;
  } else if (isCritical) {
    color = 0xffd700;
    fontSize = 22;
  }

  const displayText = isVitalPoint ? `급소! ${damage}` : damage.toString();

  return (
    <KoreanPixiText
      text={displayText}
      x={x}
      y={y}
      style={{
        fontSize,
        fill: color,
        fontWeight: "bold",
        stroke: 0x000000,
        strokeThickness: 2,
      }}
    />
  );
}

// Trigram wheel background
interface TrigramWheelBackgroundProps {
  readonly centerX: number;
  readonly centerY: number;
  readonly radius: number;
}

export function TrigramWheelBackground({
  centerX,
  centerY,
  radius,
}: TrigramWheelBackgroundProps): React.ReactElement {
  const draw = React.useCallback(
    (g: GraphicsType) => {
      g.clear();

      // Outer ring
      g.lineStyle(3, 0x00ffff, 0.8);
      g.beginFill(0x000000, 0.7);
      g.drawCircle(centerX, centerY, radius);
      g.endFill();

      // Inner decorative rings
      g.lineStyle(1, 0xffd700, 0.5);
      g.drawCircle(centerX, centerY, radius * 0.8);
      g.drawCircle(centerX, centerY, radius * 0.6);

      // Center point
      g.beginFill(0xffd700);
      g.drawCircle(centerX, centerY, 4);
      g.endFill();
    },
    [centerX, centerY, radius]
  );

  return <pixiGraphics draw={draw} />;
}

// Export all components
export {
  type ExtendedPixiTextStyle as PixiTextStyle,
  type KoreanPixiTextProps,
  type TrigramSymbolProps,
  type CombatHUDBackgroundProps,
  type HealthBarProps,
  type KiBarProps,
  type StanceIndicatorProps,
  type DamageNumberProps,
  type TrigramWheelBackgroundProps,
};
