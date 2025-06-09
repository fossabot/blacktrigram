import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrigramStance } from "../../types";
import { KOREAN_COLORS, FONT_SIZES, TRIGRAM_DATA } from "../../types/constants";

export interface StanceIndicatorProps {
  readonly stance: TrigramStance;
  readonly size?: number;
  readonly showText?: boolean;
  readonly color?: number;
  readonly onClick?: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly isActive?: boolean;
}

export const StanceIndicator: React.FC<StanceIndicatorProps> = ({
  stance,
  size = 60,
  showText = true,
  color,
  onClick, // Fix: Use onClick prop
  isActive = true,
  x = 0,
  y = 0,
}) => {
  const stanceData = TRIGRAM_DATA[stance];

  const drawStanceIndicator = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      if (stanceData) {
        g.beginFill(
          isActive ? stanceData.theme.primary : stanceData.theme.secondary,
          isActive ? 1.0 : 0.6
        );
      } else {
        g.beginFill(KOREAN_COLORS.UI_GRAY, 0.5);
      }

      // Draw hexagon or circle for stance indicator
      const radius = size / 2;
      g.drawCircle(radius, radius, radius - 2);
      g.endFill();

      // Border
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, isActive ? 1.0 : 0.5);
      g.drawCircle(radius, radius, radius - 2);
    },
    [stance, size, color, isActive]
  );

  // Fix: Add click handler
  const handleClick = useCallback(() => {
    onClick?.(stance);
  }, [onClick, stance]);

  return (
    <Container
      x={x}
      y={y}
      interactive={!!onClick} // Make interactive if onClick is provided
      buttonMode={!!onClick}
      pointertap={handleClick} // Fix: Use onClick functionality
    >
      <Graphics draw={drawStanceIndicator} />

      {/* Stance Symbol */}
      <Text
        text={stanceData?.symbol || stance}
        anchor={0.5}
        x={size / 2}
        y={size / 2}
        style={
          new PIXI.TextStyle({
            fontSize: size * 0.4,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          })
        }
      />

      {/* Stance Name */}
      {showText && (
        <Text
          text={stanceData?.name.korean || stance}
          anchor={0.5}
          x={size / 2}
          y={size + 10}
          style={
            new PIXI.TextStyle({
              fontSize: FONT_SIZES.small,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            })
          }
        />
      )}
    </Container>
  );
};

export default StanceIndicator;
