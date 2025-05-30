import React from "react";
// Import only what we need
import {
  PixiTextProps,
  Text,
  // Remove unused imports
} from "./PixiComponents";
import { KOREAN_FONT_FAMILY, KOREAN_COLORS } from "../../../types";

// Korean text styles for martial arts UI
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

// Korean Text Component
// Props for KoreanText, extending base PixiTextProps
export interface KoreanTextProps extends PixiTextProps {
  // No additional props specific to KoreanText yet, but can be added.
  // Example: emphasis?: boolean;
}

// Default style for Korean text
const DEFAULT_KOREAN_TEXT_STYLE = {
  fontFamily: KOREAN_FONT_FAMILY, // Used KOREAN_FONT_FAMILY
  fontSize: 18,
  fill: KOREAN_COLORS.WHITE,
  align: "left" as const,
};

export function KoreanText({
  text,
  style,
  ...props
}: KoreanTextProps): React.ReactElement {
  const mergedStyle = {
    ...DEFAULT_KOREAN_TEXT_STYLE,
    ...style,
  };

  // Cast props to any to avoid TypeScript strictness with exactOptionalPropertyTypes
  return <Text text={text} style={mergedStyle} {...(props as any)} />;
}

export interface KoreanHeaderProps {
  readonly text: string;
  readonly x?: number; // Added x
  readonly y?: number; // Added y
  readonly size?: "small" | "medium" | "large";
}

export function KoreanHeader({
  text,
  x = 0,
  y = 0,
  size = "medium",
}: KoreanHeaderProps): React.ReactElement {
  const fontSize = size === "large" ? 32 : size === "medium" ? 24 : 18;

  return (
    <KoreanText
      text={text}
      x={x} // Use prop x
      y={y} // Use prop y
      style={{
        ...KOREAN_TEXT_STYLES.header,
        fontSize,
      }}
    />
  );
}

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
  let colorValue: string = KOREAN_COLORS.WHITE; // Renamed to avoid conflict with color prop
  let fontSize = 16;

  if (isCritical) {
    colorValue = KOREAN_COLORS.CRITICAL_RED;
    fontSize = 20;
  } else if (isVitalPoint) {
    colorValue = KOREAN_COLORS.GOLD;
    fontSize = 18;
  } else if (damage > 20) {
    colorValue = KOREAN_COLORS.DAMAGE_YELLOW;
    fontSize = 17;
  }

  return (
    <KoreanText
      text={text}
      x={x}
      y={y}
      style={{
        fontSize,
        fill: colorValue,
        fontWeight: "bold",
        stroke: {
          color: KOREAN_COLORS.BLACK,
          width: 1,
        },
      }}
    />
  );
}
