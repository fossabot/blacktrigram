import React from "react";
import { Container } from "@pixi/react";
import type { TextStyle } from "pixi.js";
import { KOREAN_COLORS, type Position } from "../../../types";

interface KoreanTextProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly style?: Partial<TextStyle>;
  readonly anchor?: { x: number; y: number };
  readonly interactive?: boolean;
  readonly onPointerDown?: () => void;
}

export function KoreanText({
  text,
  x = 0,
  y = 0,
  style = {},
  anchor = { x: 0.5, y: 0.5 },
  interactive = false,
  onPointerDown,
}: KoreanTextProps): React.ReactElement {
  const defaultStyle: Partial<TextStyle> = {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: 16,
    fill: KOREAN_COLORS.WHITE,
    align: "center",
    ...style,
  };

  // Use pixiText instead of Text since it's not exported
  return React.createElement("pixiText", {
    text,
    x,
    y,
    anchor,
    style: defaultStyle,
    interactive,
    onPointerDown,
  });
}

interface KoreanHeaderProps {
  readonly text: string;
  readonly position: Position;
  readonly size?: "small" | "medium" | "large";
  readonly color?: string;
}

export function KoreanHeader({
  text,
  position,
  size = "medium",
  color = KOREAN_COLORS.GOLD,
}: KoreanHeaderProps): React.ReactElement {
  const sizeMap = {
    small: 18,
    medium: 24,
    large: 32,
  };

  return (
    <KoreanText
      text={text}
      x={position.x}
      y={position.y}
      style={{
        fontSize: sizeMap[size],
        fill: color,
        fontWeight: "bold",
        stroke: {
          color: KOREAN_COLORS.BLACK,
          width: 2,
        },
      }}
    />
  );
}

interface KoreanButtonProps {
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly width?: number;
  readonly height?: number;
  readonly onClick: () => void;
  readonly isSelected?: boolean;
}

export function KoreanButton({
  text,
  x,
  y,
  width = 200,
  height = 50,
  onClick,
  isSelected = false,
}: KoreanButtonProps): React.ReactElement {
  const buttonColor = isSelected
    ? KOREAN_COLORS.GOLD
    : KOREAN_COLORS.TRADITIONAL_RED;
  const textColor = isSelected ? KOREAN_COLORS.BLACK : KOREAN_COLORS.WHITE;

  return (
    <Container
      x={x}
      y={y}
      interactive={true}
      cursor="pointer"
      onPointerDown={onClick}
    >
      {/* Button background using pixiGraphics */}
      {React.createElement("pixiGraphics", {
        draw: (graphics: any) => {
          graphics.clear();
          graphics.setFillStyle({ color: buttonColor });
          graphics.roundRect(-width / 2, -height / 2, width, height, 5);
          graphics.fill();
          graphics.setStrokeStyle({ color: KOREAN_COLORS.WHITE, width: 2 });
          graphics.roundRect(-width / 2, -height / 2, width, height, 5);
          graphics.stroke();
        },
      })}

      {/* Button text */}
      <KoreanText
        text={text}
        x={0}
        y={0}
        style={{
          fontSize: 16,
          fill: textColor,
          fontWeight: "bold",
        }}
      />
    </Container>
  );
}

// Export common Korean martial arts text styles
export const KOREAN_TEXT_STYLES = {
  header: {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: 24,
    fill: KOREAN_COLORS.GOLD,
    fontWeight: "bold",
    stroke: {
      color: KOREAN_COLORS.BLACK,
      width: 2,
    },
  },
  body: {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: 16,
    fill: KOREAN_COLORS.WHITE,
    align: "center",
  },
  technique: {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: 18,
    fill: KOREAN_COLORS.GOLD,
    fontWeight: "bold",
  },
  damage: {
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    fontSize: 20,
    fill: KOREAN_COLORS.CRITICAL_RED,
    fontWeight: "bold",
    stroke: {
      color: KOREAN_COLORS.WHITE,
      width: 1,
    },
  },
} as const;

export interface KoreanTitleProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly size?: "large" | "xlarge";
  readonly color?: string;
}

export function KoreanTitle({
  text,
  x = 0,
  y = 0,
  size = "large",
  color = KOREAN_COLORS.GOLD,
}: KoreanTitleProps): React.ReactElement {
  const fontSize = size === "xlarge" ? 36 : 28;

  return (
    <KoreanText
      text={text}
      x={x}
      y={y}
      style={{
        fontSize,
        fill: color,
        fontWeight: "bold",
        stroke: {
          color: KOREAN_COLORS.BLACK,
          width: 3,
        },
      }}
    />
  );
}

export interface KoreanSubtitleProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly color?: string;
}

export function KoreanSubtitle({
  text,
  x = 0,
  y = 0,
  color = KOREAN_COLORS.WHITE,
}: KoreanSubtitleProps): React.ReactElement {
  return (
    <KoreanText
      text={text}
      x={x}
      y={y}
      style={{
        fontSize: 20,
        fill: color,
        fontWeight: "normal",
      }}
    />
  );
}

export interface KoreanInstructionProps {
  readonly text: string;
  readonly x?: number;
  readonly y?: number;
  readonly color?: string;
}

export function KoreanInstruction({
  text,
  x = 0,
  y = 0,
  color = KOREAN_COLORS.GRAY_LIGHT,
}: KoreanInstructionProps): React.ReactElement {
  return (
    <KoreanText
      text={text}
      x={x}
      y={y}
      style={{
        fontSize: 14,
        fill: color,
        fontStyle: "italic",
      }}
    />
  );
}

export interface CombatFeedbackProps {
  readonly text: string;
  readonly x: number;
  readonly y: number;
  readonly damage?: number;
  readonly isVitalPoint?: boolean;
  readonly isCritical?: boolean;
}

export function CombatFeedback({
  text,
  x,
  y,
  damage = 0,
  isVitalPoint = false,
  isCritical = false,
}: CombatFeedbackProps): React.ReactElement {
  let color: string = KOREAN_COLORS.WHITE;
  let fontSize = 16;

  if (isCritical) {
    color = KOREAN_COLORS.CRITICAL_RED;
    fontSize = 20;
  } else if (isVitalPoint) {
    color = KOREAN_COLORS.GOLD;
    fontSize = 18;
  } else if (damage > 20) {
    color = KOREAN_COLORS.DAMAGE_YELLOW;
    fontSize = 17;
  }

  return (
    <KoreanText
      text={text}
      x={x}
      y={y}
      style={{
        fontSize,
        fill: color,
        fontWeight: "bold",
        stroke: {
          color: KOREAN_COLORS.BLACK,
          width: 1,
        },
      }}
    />
  );
}
