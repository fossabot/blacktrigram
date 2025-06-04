// Reusable PIXI.js components for Black Trigram Korean martial arts game

import React, { useCallback, useMemo, useState } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { TextStyle } from "@pixi/text"; // Import as value, not type
import type {
  Graphics as PixiGraphicsType,
  FederatedPointerEvent,
  TextDropShadow,
  TextStyleFontWeight,
} from "pixi.js";
import type { TrigramStance } from "../../../types";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY_PRIMARY,
  TRIGRAM_DATA,
} from "../../../types/constants";
import { KoreanHighlightTextProps } from "./KoreanPixiComponents";

// Extended TextStyle interface for better type safety
export interface ExtendedPixiTextStyle
  extends Partial<Omit<TextStyle, "dropShadow" | "fontWeight">> {
  readonly fontFamily?: string;
  readonly fontSize?: number;
  readonly fill?: number | string;
  readonly fontWeight?: TextStyleFontWeight;
  readonly align?: "left" | "center" | "right";
  readonly dropShadow?: TextDropShadow; // Remove boolean option to match PIXI TextStyle
  readonly stroke?: { color: number; width: number } | number | string;
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
  readonly draw: (graphics: PixiGraphicsType) => void;
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
  return <Container {...props}>{children}</Container>;
}

export function PixiGraphicsComponent({
  draw,
  ...props
}: PixiGraphicsComponentProps): React.ReactElement {
  const drawCallback = useCallback(
    (g: PixiGraphicsType) => {
      if (draw && g) {
        draw(g);
      }
    },
    [draw]
  );

  return <Graphics draw={drawCallback} {...props} />;
}

export function PixiTextComponent({
  text,
  style,
  ...props
}: PixiTextComponentProps): React.ReactElement {
  const textStyle = useMemo(() => {
    if (!style) return new PIXI.TextStyle();

    // Helper function to convert weight to proper type
    const convertFontWeight = (
      weight?: string | number
    ): TextStyleFontWeight => {
      if (typeof weight === "number") {
        if (weight <= 300) return "100";
        if (weight <= 400) return "normal";
        if (weight <= 500) return "500";
        if (weight <= 700) return "bold";
        return "900";
      }
      if (typeof weight === "string") {
        // Ensure string weights are valid TextStyleFontWeight values
        const validWeights: TextStyleFontWeight[] = [
          "100",
          "200",
          "300",
          "400",
          "500",
          "600",
          "700",
          "800",
          "900",
          "normal",
          "bold",
          "lighter",
          "bolder",
        ];
        return validWeights.includes(weight as TextStyleFontWeight)
          ? (weight as TextStyleFontWeight)
          : "normal";
      }
      return "normal";
    };

    const pixiStyle = new PIXI.TextStyle({
      fontFamily: style.fontFamily || KOREAN_FONT_FAMILY_PRIMARY,
      fontSize: style.fontSize || 16,
      fill: style.fill || KOREAN_COLORS.WHITE,
      fontWeight: convertFontWeight(style.fontWeight),
      align: style.align || "left",
    });

    // Handle dropShadow - only accept TextDropShadow objects
    if (style.dropShadow) {
      pixiStyle.dropShadow = style.dropShadow;
    }

    // Handle stroke
    if (style.stroke) {
      if (typeof style.stroke === "object" && "color" in style.stroke) {
        pixiStyle.stroke = {
          color: style.stroke.color,
          width: style.stroke.width,
        };
      } else {
        pixiStyle.stroke = style.stroke;
      }
    }

    return pixiStyle;
  }, [style]);

  return <Text text={text} style={textStyle} {...props} />;
}

// Example stance colors - use lowercase property names from KOREAN_COLORS
const STANCE_COLORS = {
  geon: KOREAN_COLORS.geon, // Gold for Heaven
  tae: KOREAN_COLORS.tae, // Sky Blue for Lake
  li: KOREAN_COLORS.li, // Orange Red for Fire
  jin: KOREAN_COLORS.jin, // Medium Purple for Thunder
  son: KOREAN_COLORS.son, // Pale Green for Wind
  gam: KOREAN_COLORS.gam, // Royal Blue for Water
  gan: KOREAN_COLORS.gan, // Saddle Brown for Mountain
  gon: KOREAN_COLORS.gon, // Dark Brown for Earth
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
    (g: PixiGraphicsType) => {
      g.clear();

      // Button background
      const alpha = active ? 1.0 : isHovered ? 0.8 : 0.6;
      g.setFillStyle({ color: stanceColor, alpha });
      g.circle(0, 0, size / 2);
      g.fill();

      // Button border
      g.setStrokeStyle({
        color: active ? KOREAN_COLORS.WHITE : KOREAN_COLORS.GRAY_LIGHT,
        width: active ? 3 : 2,
      });
      g.circle(0, 0, size / 2);
      g.stroke();
    },
    [size, stanceColor, active, isHovered]
  );

  return (
    <PixiContainerComponent
      x={x}
      y={y}
      interactive={true}
      cursor="pointer"
      onpointertap={onClick}
      onpointerover={() => setIsHovered(true)}
      onpointerout={() => setIsHovered(false)}
    >
      <PixiGraphicsComponent draw={drawButton} />
      <PixiTextComponent
        text={trigram.symbol}
        style={{
          fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
          fontSize: size * 0.4,
          fill: KOREAN_COLORS.WHITE,
          align: "center",
        }}
        anchor={{ x: 0.5, y: 0.5 }}
      />
    </PixiContainerComponent>
  );
});

export const StatusBar = React.memo(function StatusBar({
  current,
  maximum,
  width = 200,
  height = 20,
  x = 0,
  y = 0,
  color = KOREAN_COLORS.CYAN, // Use CYAN instead of NEON_CYAN
  backgroundColor = KOREAN_COLORS.GRAY_DARK,
  showText = true,
}: StatusBarProps): React.ReactElement {
  const percentage = Math.max(0, Math.min(1, current / maximum));

  const drawBar = useCallback(
    (g: PixiGraphicsType) => {
      g.clear();

      // Background
      g.setFillStyle({ color: backgroundColor, alpha: 0.8 });
      g.roundRect(0, 0, width, height, 4);
      g.fill();

      // Fill bar
      if (percentage > 0) {
        g.setFillStyle({ color: color, alpha: 1.0 });
        g.roundRect(2, 2, (width - 4) * percentage, height - 4, 2);
        g.fill();
      }

      // Border
      g.setStrokeStyle({ color: KOREAN_COLORS.WHITE, width: 1 });
      g.roundRect(0, 0, width, height, 4);
      g.stroke();
    },
    [width, height, percentage, color, backgroundColor]
  );

  return (
    <PixiContainerComponent x={x} y={y}>
      <PixiGraphicsComponent draw={drawBar} />
      {showText && (
        <PixiTextComponent
          text={`${Math.round(current)} / ${maximum}`}
          style={{
            fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
            fontSize: height * 0.6,
            fill: KOREAN_COLORS.WHITE,
            align: "center",
          }}
          anchor={{ x: 0.5, y: 0.5 }}
          x={width / 2}
          y={height / 2}
        />
      )}
    </PixiContainerComponent>
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
    (g: PixiGraphicsType) => {
      if (!emphasis) return;

      g.clear();
      g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.7 });
      g.roundRect(-10, -5, 200, size + 10, 5);
      g.fill();
    },
    [emphasis, size]
  );

  const backgroundBar = useCallback(
    (g: PixiGraphicsType) => {
      if (!emphasis) return;

      g.clear();
      g.setFillStyle({ color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.3 });
      g.rect(-8, -3, 196, size + 6);
      g.fill();
    },
    [emphasis, size]
  );

  const accentLine = useCallback(
    (g: PixiGraphicsType) => {
      if (!emphasis) return;

      g.clear();
      g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 2 });
      g.moveTo(-8, size + 3);
      g.lineTo(188, size + 3);
      g.stroke();
    },
    [emphasis, size]
  );

  const displayText = bilingual && english ? `${korean} (${english})` : korean;

  return (
    <PixiContainerComponent x={x} y={y}>
      <PixiGraphicsComponent draw={drawBackground} />
      <PixiGraphicsComponent draw={backgroundBar} />
      <PixiGraphicsComponent draw={accentLine} />
      <PixiTextComponent
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
            : undefined, // Fix: Use undefined instead of false
        }}
      />
    </PixiContainerComponent>
  );
});

export const CyberpunkGlow = React.memo(function CyberpunkGlow({
  x = 0,
  y = 0,
  radius = 50,
  intensity = 1.0,
  color = KOREAN_COLORS.CYAN, // Use CYAN instead of NEON_CYAN
}: CyberpunkGlowProps): React.ReactElement {
  const drawGlow = useCallback(
    (g: PixiGraphicsType) => {
      g.clear();

      // Outer glow
      g.setFillStyle({ color: color, alpha: 0.1 * intensity });
      g.circle(0, 0, radius * 1.5);
      g.fill();

      // Middle glow
      g.setFillStyle({ color: color, alpha: 0.3 * intensity });
      g.circle(0, 0, radius);
      g.fill();

      // Inner glow
      g.setFillStyle({ color: color, alpha: 0.6 * intensity });
      g.circle(0, 0, radius * 0.5);
      g.fill();

      // Core
      g.setFillStyle({ color: KOREAN_COLORS.WHITE, alpha: 0.8 * intensity });
      g.circle(0, 0, radius * 0.2);
      g.fill();
    },
    [radius, intensity, color]
  );

  return (
    <PixiContainerComponent x={x} y={y}>
      <PixiGraphicsComponent draw={drawGlow} />
    </PixiContainerComponent>
  );
});

// Background grid component
export const BackgroundGrid = React.memo(function BackgroundGrid({
  width,
  height,
  gridSize = 50,
  color = KOREAN_COLORS.GRAY_MEDIUM, // Use GRAY_MEDIUM instead of GRAY
  alpha = 0.3,
}: {
  width: number;
  height: number;
  gridSize?: number;
  color?: number;
  alpha?: number;
}): React.ReactElement {
  const drawGrid = useCallback(
    (g: PixiGraphicsType) => {
      g.clear();
      g.setStrokeStyle({
        color: color,
        width: 1,
        alpha: alpha,
      });

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        g.moveTo(x, 0);
        g.lineTo(x, height);
        g.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        g.moveTo(0, y);
        g.lineTo(width, y);
        g.stroke();
      }
    },
    [width, height, gridSize, color, alpha]
  );

  return <PixiGraphicsComponent draw={drawGrid} />;
});

// Highlight text component with Korean and English support
export function KoreanHighlightText({
  text,
  type = "info",
  style,
  ...textProps
}: KoreanHighlightTextProps): React.ReactElement {
  const colors = useMemo(
    () => ({
      info: KOREAN_COLORS.CYAN,
      warning: KOREAN_COLORS.TRADITIONAL_RED, // Fix: Use TRADITIONAL_RED instead of ORANGE
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
          ...style.dropShadow, // Spread existing dropShadow properties first
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

  // Remove unsupported properties
  delete (style as any).strokeThickness;
  delete (style as any).alpha;

  return style;
};

export const KoreanText: React.FC<{
  text: string;
  style?: Partial<TextStyle>;
  x?: number;
  y?: number;
}> = ({ text, style = {}, x = 0, y = 0 }) => {
  const textStyle = createTextStyle(style);

  return <ReactText text={text} style={textStyle} x={x} y={y} />;
};
