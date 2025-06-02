import { useCallback, useMemo } from "react"; // Removed unused React
import { Container, Graphics, Text } from "@pixi/react";
import type { ProgressTrackerProps, PixiTextStyleConfig } from "../../types/ui"; // Ensure PixiTextStyleConfig is imported
import { KOREAN_COLORS } from "../../types/constants";
import * as PIXI from "pixi.js";

const BAR_WIDTH = 200;
// const BAR_HEIGHT = 20; // Unused
// const BAR_BORDER_RADIUS = 5; // Unused
const LABEL_OFFSET_Y = -15;
const VALUE_OFFSET_Y = 25;

export function ProgressTracker({
  label,
  current,
  maximum,
  color = KOREAN_COLORS.GREEN,
  backgroundColor = KOREAN_COLORS.GRAY_DARK,
  borderColor = KOREAN_COLORS.GRAY_LIGHT,
  borderWidth = 1,
  showPercentage = false,
  // animated = false, // Unused
  critical = false,
  criticalThreshold = 0.3,
  criticalColor = KOREAN_COLORS.CRITICAL_RED,
  width = BAR_WIDTH,
  height = 20, // Default height
  x = 0,
  y = 0,
  interactive = false,
  onClick,
  style: textStyleOverride,
  currentStance,
}: ProgressTrackerProps): JSX.Element {
  // Use JSX.Element for React components
  const percentage =
    maximum > 0 ? Math.max(0, Math.min(1, current / maximum)) : 0;
  const isCriticalActual =
    critical || (maximum > 0 && current / maximum <= criticalThreshold);
  const displayColor = isCriticalActual ? criticalColor : color;

  const barFillWidth = percentage * width;

  const drawGraphics = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.rect(0, 0, width, height);
      g.fill({ color: backgroundColor as PIXI.ColorSource, alpha: 0.8 }); // Ensure color is PIXI.ColorSource

      // Foreground (current value)
      if (barFillWidth > 0) {
        g.rect(0, 0, barFillWidth, height);
        g.fill(displayColor as PIXI.ColorSource); // Ensure color is PIXI.ColorSource
      }

      // Border
      if (borderWidth > 0) {
        g.rect(0, 0, width, height);
        g.stroke({
          width: borderWidth,
          color: borderColor as PIXI.ColorSource,
          alpha: 0.9,
        }); // Ensure color is PIXI.ColorSource
      }
    },
    [
      width,
      height,
      backgroundColor,
      barFillWidth,
      displayColor,
      borderWidth,
      borderColor,
    ]
  );

  const baseTextStyle: Partial<PIXI.TextStyle> = useMemo(
    () => ({
      fontFamily: "Noto Sans KR, Arial, sans-serif",
      fontSize: 12,
      fill: KOREAN_COLORS.WHITE as PIXI.FillInput, // Use FillInput
      align: "center" as PIXI.TextStyleAlign,
      ...textStyleOverride,
    }),
    [textStyleOverride]
  );

  const labelText = typeof label === "string" ? label : label.english; // Handle KoreanText label

  return (
    <Container
      x={x}
      y={y}
      interactive={interactive}
      onpointertap={onClick}
      buttonMode={!!onClick}
    >
      {labelText && (
        <Text
          text={labelText}
          anchor={{ x: 0.5, y: 1 }}
          x={width / 2}
          y={LABEL_OFFSET_Y}
          style={new PIXI.TextStyle(baseTextStyle as PIXI.TextStyleOptions)} // Ensure PIXI.TextStyleOptions
        />
      )}
      <Graphics draw={drawGraphics} />
      {(showPercentage || currentStance) && (
        <Text
          text={
            showPercentage
              ? `${Math.round(percentage * 100)}%`
              : `${current}/${maximum}`
          }
          anchor={{ x: 0.5, y: 0 }}
          x={width / 2}
          y={height + VALUE_OFFSET_Y - 15}
          style={
            new PIXI.TextStyle({
              ...baseTextStyle,
              fontSize: 10,
            } as PIXI.TextStyleOptions)
          } // Ensure PIXI.TextStyleOptions
        />
      )}
      {currentStance && (
        <Text
          text={`Stance: ${currentStance}`}
          anchor={{ x: 0.5, y: 0 }}
          x={width / 2}
          y={height + VALUE_OFFSET_Y}
          style={
            new PIXI.TextStyle({
              ...baseTextStyle,
              fontSize: 10,
              fill: KOREAN_COLORS[currentStance] || KOREAN_COLORS.WHITE,
            } as PIXI.TextStyleOptions)
          } // Ensure PIXI.TextStyleOptions
        />
      )}
    </Container>
  );
}
