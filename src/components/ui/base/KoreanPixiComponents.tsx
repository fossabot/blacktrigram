import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
} from "../../../types/constants";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import {
  createKoreanTextStyle,
  getDisplayText,
} from "./korean-text/components/KoreanPixiTextUtils";
// Fix: Import type from the main types directory to avoid conflict
import type { KoreanText } from "../../../types/korean-text";

// Define only necessary props interfaces
export interface KoreanPixiButtonProps {
  label: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  variant?: "primary" | "secondary" | "accent";
  disabled?: boolean;
  onClick?: () => void;
}

export interface KoreanPixiProgressTrackerProps {
  currentValue: number;
  maxValue: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  label?: string;
  showPercentage?: boolean;
  color?: number;
  backgroundColor?: number;
}

export interface KoreanPixiTrigramWheelProps {
  currentStance: string;
  onStanceChange: (stance: string) => void;
  size?: number;
  x?: number;
  y?: number;
  showLabels?: boolean;
}

export interface KoreanPixiHealthBarProps {
  currentHealth: number;
  maxHealth: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  showText?: boolean;
  variant?: "player1" | "player2" | "neutral";
}

export const KoreanPixiButton: React.FC<KoreanPixiButtonProps> = ({
  label,
  x = 0,
  y = 0,
  width = 150,
  height = 40,
  variant = "primary",
  disabled = false,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <Container x={x} y={y}>
      <Graphics
        interactive={!disabled}
        pointerdown={handleClick}
        draw={(g: PIXI.Graphics) => {
          g.clear();
          const bgColor = disabled
            ? KOREAN_COLORS.UI_DISABLED_BG
            : variant === "primary"
            ? KOREAN_COLORS.PRIMARY_CYAN
            : KOREAN_COLORS.SECONDARY_BLUE;
          g.beginFill(bgColor);
          g.drawRoundedRect(0, 0, width, height, 8);
          g.endFill();
        }}
      />
      <Text
        text={label}
        anchor={0.5}
        x={width / 2}
        y={height / 2}
        style={
          new PIXI.TextStyle({
            fontFamily: FONT_FAMILY.PRIMARY,
            fontSize: FONT_SIZES.medium,
            fill: disabled
              ? KOREAN_COLORS.UI_DISABLED_TEXT
              : KOREAN_COLORS.TEXT_PRIMARY,
          })
        }
      />
    </Container>
  );
};

// Export actual components, not just types
export const KoreanPixiProgressTracker: React.FC<
  KoreanPixiProgressTrackerProps
> = ({
  currentValue,
  maxValue,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  label,
  showPercentage = false,
  color = KOREAN_COLORS.POSITIVE_GREEN,
  backgroundColor = KOREAN_COLORS.UI_BACKGROUND_DARK,
}) => {
  // Implementation
  const percentage = Math.max(0, Math.min(1, currentValue / maxValue));

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          // Background
          g.beginFill(backgroundColor);
          g.drawRoundedRect(0, 0, width, height, 4);
          g.endFill();

          // Progress bar
          g.beginFill(color);
          g.drawRoundedRect(2, 2, (width - 4) * percentage, height - 4, 2);
          g.endFill();
        }}
      />
      {label && (
        <Text
          text={
            showPercentage
              ? `${label}: ${Math.round(percentage * 100)}%`
              : label
          }
          x={width / 2}
          y={height / 2}
          anchor={0.5}
          style={
            new PIXI.TextStyle({
              fontFamily: FONT_FAMILY.PRIMARY,
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            })
          }
        />
      )}
    </Container>
  );
};

export const KoreanPixiTrigramWheel: React.FC<KoreanPixiTrigramWheelProps> = ({
  currentStance,
  onStanceChange,
  size = 100,
  x = 0,
  y = 0,
  showLabels = true,
}) => {
  const handleStanceClick = useCallback(
    (stance: string) => {
      onStanceChange(stance);
    },
    [onStanceChange]
  );

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM);
          g.drawCircle(0, 0, size);
          g.endFill();

          // Draw stance indicators using all parameters
          if (showLabels) {
            g.lineStyle(
              2,
              currentStance === "geon"
                ? KOREAN_COLORS.ACCENT_GOLD
                : KOREAN_COLORS.UI_BORDER
            );
            g.drawCircle(0, 0, size * 0.8);
          }
        }}
        interactive={true}
        pointerdown={() => handleStanceClick(currentStance)}
      />
    </Container>
  );
};

export const KoreanPixiHealthBar: React.FC<KoreanPixiHealthBarProps> = ({
  currentHealth,
  maxHealth,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
  showText = true,
  variant = "neutral",
}) => {
  const healthPercentage = currentHealth / maxHealth;
  const barColor =
    healthPercentage > 0.5
      ? KOREAN_COLORS.POSITIVE_GREEN
      : healthPercentage > 0.25
      ? KOREAN_COLORS.WARNING_YELLOW
      : KOREAN_COLORS.NEGATIVE_RED;

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          // Background
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK);
          g.drawRect(0, 0, width, height);
          g.endFill();

          // Health bar
          g.beginFill(barColor);
          g.drawRect(0, 0, width * healthPercentage, height);
          g.endFill();

          // Border based on variant
          const borderColor =
            variant === "player1"
              ? KOREAN_COLORS.PLAYER_1_COLOR
              : variant === "player2"
              ? KOREAN_COLORS.PLAYER_2_COLOR
              : KOREAN_COLORS.UI_BORDER;
          g.lineStyle(1, borderColor);
          g.drawRect(0, 0, width, height);
        }}
      />
      {showText && (
        <Text
          text={`${currentHealth}/${maxHealth}`}
          anchor={0.5}
          x={width / 2}
          y={height / 2}
          style={
            new PIXI.TextStyle({
              fontSize: height * 0.6,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            })
          }
        />
      )}
    </Container>
  );
};

export interface KoreanPixiTextProps {
  text: KoreanText;
  style?: PIXI.TextStyle;
  showRomanization?: boolean;
  x?: number;
  y?: number;
  anchor?: number | { x: number; y: number };
}

export const KoreanPixiText: React.FC<KoreanPixiTextProps> = ({
  text,
  style,
  showRomanization = false,
  x = 0,
  y = 0,
  anchor = 0,
}) => {
  usePixiExtensions();

  const displayText = getDisplayText(text, showRomanization);
  const textStyle = style || createKoreanTextStyle(); // Fix: Now has default parameter

  return (
    <pixiText
      text={displayText}
      style={textStyle}
      x={x}
      y={y}
      anchor={anchor}
    />
  );
};

// Fix: Export KoreanPixiComponents as a collection
export const KoreanPixiComponents = {
  KoreanPixiText,
};

export default KoreanPixiComponents;
