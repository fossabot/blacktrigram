import React, { useCallback } from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../types/constants";

export interface HealthBarProps {
  readonly health: number;
  readonly maxHealth: number;
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
}

export const HealthBar: React.FC<HealthBarProps> = ({
  health,
  maxHealth,
  width = 200,
  height = 20,
  showText = true,
}) => {
  usePixiExtensions();

  const drawHealthBar = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      const healthPercent = Math.max(0, Math.min(1, health / maxHealth));

      // Background
      g.beginFill(KOREAN_COLORS.NEGATIVE_RED, 0.3);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Health fill
      g.beginFill(KOREAN_COLORS.POSITIVE_GREEN);
      g.drawRect(0, 0, width * healthPercent, height);
      g.endFill();

      // Border
      g.lineStyle(1, KOREAN_COLORS.TEXT_PRIMARY, 0.5);
      g.drawRect(0, 0, width, height);
    },
    [health, maxHealth, width, height]
  );

  return (
    <pixiContainer data-testid="health-bar">
      <pixiGraphics draw={drawHealthBar} />
      {showText && (
        <pixiText
          text={`체력: ${Math.round(health)}/${maxHealth}`}
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            })
          }
          x={width / 2}
          y={height + 5}
          anchor={0.5}
        />
      )}
    </pixiContainer>
  );
};

export default HealthBar;
