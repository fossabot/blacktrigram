import React, { useCallback, useMemo, useState } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrigramStance } from "../../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  KOREAN_FONT_WEIGHTS,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
} from "../../../types/constants";
import { createKoreanTextStyle } from "./korean-text/components/KoreanPixiTextUtils";
import type {
  KoreanPixiTrigramWheelProps,
  KoreanPixiProgressTrackerProps,
  KoreanPixiHealthBarProps,
} from "../../../types/ui";

// Simple Korean Pixi Text component
const KoreanPixiText: React.FC<{
  text: string;
  x?: number;
  y?: number;
  anchor?: number;
  style?: PIXI.TextStyle;
}> = ({ text, x = 0, y = 0, anchor = 0, style }) => {
  return <Text text={text} x={x} y={y} anchor={anchor} style={style} />;
};

export const KoreanPixiProgressTracker: React.FC<{
  progress: number;
  maxProgress?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  color?: number;
  backgroundColor?: number;
  showText?: boolean;
}> = ({
  progress,
  maxProgress = 100,
  width = 200,
  height = 20,
  x = 0,
  y = 0,
  color = KOREAN_COLORS.POSITIVE_GREEN,
  backgroundColor = KOREAN_COLORS.UI_BACKGROUND_DARK,
  showText = true,
}) => {
  const progressRatio = Math.max(0, Math.min(1, progress / maxProgress));

  const progressBarDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.beginFill(backgroundColor, 0.8);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Progress fill
      if (progressRatio > 0) {
        g.beginFill(color, 1.0);
        g.drawRect(2, 2, (width - 4) * progressRatio, height - 4);
        g.endFill();
      }

      // Border
      g.lineStyle(1, KOREAN_COLORS.UI_BORDER, 1.0);
      g.drawRect(0, 0, width, height);
    },
    [width, height, progressRatio, color, backgroundColor]
  );

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: Math.min(height * 0.7, 14),
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight:
          KOREAN_FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    [height]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={progressBarDraw} />
      {showText && (
        <Text
          text={`${Math.round(progress)}/${maxProgress}`}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
          style={textStyle}
        />
      )}
    </Container>
  );
};

export const KoreanPixiTrigramWheel: React.FC<{
  currentStance: TrigramStance;
  onStanceChange: (stance: TrigramStance) => void;
  size?: number;
  x?: number;
  y?: number;
  showLabels?: boolean;
}> = ({
  currentStance,
  onStanceChange,
  size = 120,
  x = 0,
  y = 0,
  showLabels = true,
}) => {
  const stances = TRIGRAM_STANCES_ORDER as readonly TrigramStance[];

  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      onStanceChange?.(stance);
    },
    [onStanceChange]
  );

  return (
    <Container x={x} y={y}>
      {stances.map((stanceId: TrigramStance, index: number) => {
        const angle = (index / stances.length) * Math.PI * 2;
        const radius = size * 0.4;
        const segmentX = Math.cos(angle) * radius;
        const segmentY = Math.sin(angle) * radius;

        const isActive = stanceId === currentStance;
        const stanceData = TRIGRAM_DATA[stanceId];

        return (
          <Container key={stanceId} x={segmentX} y={segmentY}>
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                const color = isActive
                  ? KOREAN_COLORS.PRIMARY_CYAN
                  : KOREAN_COLORS.UI_GRAY;
                g.beginFill(color, 0.6);
                g.drawCircle(0, 0, 20);
                g.endFill();
              }}
              interactive={true}
              pointerdown={() => handleStanceClick(stanceId)}
            />

            {showLabels && (
              <Text
                text={
                  stanceData?.symbol || stanceId.substring(0, 1).toUpperCase()
                }
                anchor={0.5}
                style={createKoreanTextStyle({
                  fontSize: 16,
                  fill: KOREAN_COLORS.TEXT_PRIMARY,
                  align: "center",
                })}
              />
            )}
          </Container>
        );
      })}

      <Container>
        <Text
          text={TRIGRAM_DATA[currentStance as TrigramStance]?.symbol || ""} // Fix: Type assertion
          anchor={0.5}
          style={createKoreanTextStyle({
            fontSize: size * 0.25,
            fill:
              TRIGRAM_DATA[currentStance as TrigramStance]?.theme?.primary ||
              KOREAN_COLORS.PRIMARY_CYAN,
            align: "center",
          })}
        />
      </Container>
    </Container>
  );
};

export const KoreanPixiHeader: React.FC<{
  korean: string;
  english: string;
  x?: number;
  y?: number;
}> = ({ korean, english, x = 0, y = 0 }) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: 24,
        fill: KOREAN_COLORS.PRIMARY_CYAN,
        fontWeight:
          KOREAN_FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
      }),
    []
  );

  const formatDisplayText = (text: {
    korean: string;
    english: string;
  }): string => {
    return `${text.korean} (${text.english})`;
  };

  return (
    <Container x={x} y={y}>
      <Text
        text={formatDisplayText({ korean, english })}
        anchor={0.5}
        style={titleStyle}
      />

      {english && (
        <Text
          text={formatDisplayText({ korean, english })}
          y={34}
          anchor={0.5}
          style={titleStyle}
        />
      )}
    </Container>
  );
};

export const KoreanPixiButton: React.FC<KoreanPixiButtonProps> = ({
  text,
  onClick,
  x = 0,
  y = 0,
  width = 200,
  height = 50,
  variant = "primary",
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getButtonColor = useCallback(() => {
    if (disabled) return KOREAN_COLORS.UI_DISABLED_FILL;

    switch (variant) {
      case "primary":
        return isPressed
          ? KOREAN_COLORS.PRIMARY_CYAN_DARK
          : isHovered
          ? KOREAN_COLORS.PRIMARY_CYAN_LIGHT
          : KOREAN_COLORS.PRIMARY_CYAN;
      case "secondary":
        return isPressed
          ? KOREAN_COLORS.UI_GRAY_DARK
          : isHovered
          ? KOREAN_COLORS.UI_GRAY_LIGHT
          : KOREAN_COLORS.UI_GRAY;
      case "danger":
        return isPressed
          ? KOREAN_COLORS.NEGATIVE_RED_DARK
          : isHovered
          ? KOREAN_COLORS.NEGATIVE_RED_LIGHT
          : KOREAN_COLORS.NEGATIVE_RED;
      default:
        return KOREAN_COLORS.PRIMARY_CYAN;
    }
  }, [variant, isHovered, isPressed, disabled]);

  const buttonDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const color = getButtonColor();

      // Background
      g.beginFill(color, 0.8);
      g.drawRoundedRect(0, 0, width, height, 8);
      g.endFill();

      // Border
      g.lineStyle(
        2,
        disabled ? KOREAN_COLORS.UI_DISABLED_BORDER : KOREAN_COLORS.UI_BORDER
      );
      g.drawRoundedRect(0, 0, width, height, 8);
    },
    [width, height, getButtonColor, disabled]
  );

  const textStyle = useMemo(
    () =>
      createKoreanTextStyle({
        fontSize: Math.min(height * 0.4, 16),
        fill: disabled
          ? KOREAN_COLORS.UI_DISABLED_TEXT
          : KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: KOREAN_FONT_WEIGHTS.medium.toString() as any,
        align: "center",
      }),
    [height, disabled]
  );

  const getDisplayText = useCallback(() => {
    if (typeof text === "string") return text;
    return `${text.korean} / ${text.english}`;
  }, [text]);

  return (
    <Container
      x={x}
      y={y}
      interactive={!disabled}
      pointerover={() => !disabled && setIsHovered(true)}
      pointerout={() => !disabled && setIsHovered(false)}
      pointerdown={() => !disabled && setIsPressed(true)}
      pointerup={() => {
        if (!disabled) {
          setIsPressed(false);
          onClick?.();
        }
      }}
    >
      <Graphics draw={buttonDraw} />
      <KoreanPixiText
        text={getDisplayText()}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
        style={textStyle}
      />
    </Container>
  );
};
