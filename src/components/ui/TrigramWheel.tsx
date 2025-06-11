import React, { useCallback } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";
import { TrigramStance } from "../../types/trigram";

extend({ Container, Graphics, Text });

export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly showLabels?: boolean;
  readonly [key: string]: any; // For data-testid
}

export const TrigramWheel: React.FC<TrigramWheelProps> = ({
  selectedStance,
  onStanceSelect,
  x = 0,
  y = 0,
  radius = 80,
  showLabels = true,
  ...props
}) => {
  const stances = Object.keys(TRIGRAM_DATA) as TrigramStance[];

  const drawWheel = useCallback(
    (g: any) => {
      g.clear();

      // Draw outer circle
      g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
      g.circle(radius, radius, radius - 10);
      g.stroke();

      // Draw inner circle
      g.stroke({ width: 1, color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.6 });
      g.circle(radius, radius, radius - 30);
      g.stroke();
    },
    [radius]
  );

  return (
    <pixiContainer x={x} y={y} {...props}>
      <pixiGraphics draw={drawWheel} />

      {stances.map((stance, index) => {
        const angle = (index / stances.length) * Math.PI * 2 - Math.PI / 2;
        const stanceX = radius + Math.cos(angle) * (radius - 20);
        const stanceY = radius + Math.sin(angle) * (radius - 20);
        const isSelected = stance === selectedStance;

        return (
          <pixiContainer key={stance} x={stanceX} y={stanceY}>
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.fill({
                  color: isSelected
                    ? KOREAN_COLORS.ACCENT_GOLD
                    : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                  alpha: 0.8,
                });
                g.circle(0, 0, 15);
                g.fill();
                g.stroke({
                  width: 2,
                  color: isSelected
                    ? KOREAN_COLORS.PRIMARY_CYAN
                    : KOREAN_COLORS.UI_BORDER,
                  alpha: 0.8,
                });
                g.circle(0, 0, 15);
                g.stroke();
              }}
              interactive={true}
              onPointerDown={() => onStanceSelect(stance)}
              data-testid={`stance-${stance}-button`}
            />

            {showLabels && (
              <pixiText
                text={TRIGRAM_DATA[stance]?.symbol || stance}
                style={{
                  fontSize: 12,
                  fill: isSelected
                    ? KOREAN_COLORS.BLACK_SOLID
                    : KOREAN_COLORS.TEXT_PRIMARY,
                  align: "center",
                  fontWeight: "bold",
                }}
                anchor={0.5}
                data-testid={`stance-${stance}-symbol`}
              />
            )}
          </pixiContainer>
        );
      })}
    </pixiContainer>
  );
};

export default TrigramWheel;
