import React from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";
import type { TrigramStance } from "../../types/trigram";

export interface StanceIndicatorProps {
  readonly stance: TrigramStance;
  readonly size?: number;
  readonly showText?: boolean;
  readonly isActive?: boolean;
  readonly x?: number;
  readonly y?: number;
}

export const StanceIndicator: React.FC<StanceIndicatorProps> = ({
  stance,
  size = 50,
  showText = true,
  isActive = false,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  const stanceData = TRIGRAM_DATA[stance];

  const drawIndicator = React.useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Background circle
      g.beginFill(
        isActive ? stanceData.theme.primary : KOREAN_COLORS.UI_BACKGROUND_DARK,
        0.8
      );
      g.drawCircle(size / 2, size / 2, size / 2);
      g.endFill();

      // Border
      g.lineStyle(2, stanceData.theme.primary, isActive ? 1.0 : 0.5);
      g.drawCircle(size / 2, size / 2, size / 2);
    },
    [stance, size, isActive, stanceData.theme.primary]
  );

  return (
    <pixiContainer x={x} y={y} data-testid="stance-indicator">
      <pixiGraphics draw={drawIndicator} />

      <pixiText
        text={stanceData.symbol}
        style={
          new PIXI.TextStyle({
            fontSize: size * 0.4,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          })
        }
        x={size / 2}
        y={size / 2}
        anchor={0.5}
      />

      {showText && (
        <pixiText
          text={stanceData.name.korean}
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            })
          }
          x={size / 2}
          y={size + 5}
          anchor={0.5}
        />
      )}
    </pixiContainer>
  );
};

export default StanceIndicator;
