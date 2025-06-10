import React from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../types/constants";
import type { HealthBarProps } from "../../types/ui";

export const HealthBar: React.FC<HealthBarProps> = ({
  currentHealth,
  maxHealth,
  width = 200,
  height = 20,
  showText = true,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  const healthPercent = Math.max(0, Math.min(1, currentHealth / maxHealth));

  const getHealthColor = (percent: number): number => {
    if (percent > 0.6) return KOREAN_COLORS.POSITIVE_GREEN;
    if (percent > 0.3) return KOREAN_COLORS.WARNING_YELLOW;
    return KOREAN_COLORS.NEGATIVE_RED;
  };

  const drawHealthBar = React.useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Health fill
      const healthColor = getHealthColor(healthPercent);
      g.beginFill(healthColor, 0.9);
      g.drawRect(2, 2, (width - 4) * healthPercent, height - 4);
      g.endFill();

      // Border
      g.lineStyle(1, KOREAN_COLORS.UI_BORDER, 0.8);
      g.drawRect(0, 0, width, height);
    },
    [width, height, healthPercent]
  );

  return (
    <pixiContainer x={x} y={y} data-testid="health-bar">
      <pixiGraphics draw={drawHealthBar} />

      {showText && (
        <pixiText
          text={`${Math.round(currentHealth)}/${maxHealth}`}
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
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
