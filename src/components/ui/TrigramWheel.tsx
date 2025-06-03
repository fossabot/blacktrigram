import React, { useCallback } from "react";
// Remove: import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrigramStance, TrigramWheelProps } from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types";

export function TrigramWheel({
  selectedStance,
  onStanceChange,
  size = 200, // Added default value
  position = { x: 0, y: 0 }, // Added default value
  interactive = true,
}: TrigramWheelProps): React.ReactElement {
  const stances = Object.keys(TRIGRAM_DATA) as TrigramStance[];

  const drawWheel = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Draw outer circle
      g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 2 });
      g.circle(0, 0, size / 2);
      g.stroke();

      // Draw inner circle
      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 1 });
      g.circle(0, 0, size / 4);
      g.stroke();
    },
    [size]
  );

  return (
    <pixiContainer x={position.x} y={position.y}>
      <pixiGraphics draw={drawWheel} />
      {stances.map((stance, index) => {
        const angle = (index / stances.length) * Math.PI * 2;
        const radius = size / 3;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const trigramData = TRIGRAM_DATA[stance];

        return (
          <pixiContainer
            key={stance}
            x={x}
            y={y}
            interactive={interactive}
            eventMode={interactive ? "static" : "passive"}
            onPointerDown={() => onStanceChange && onStanceChange(stance)}
          >
            <pixiGraphics
              draw={useCallback(
                (g: PIXI.Graphics) => {
                  g.clear();
                  g.setFillStyle({
                    color:
                      stance === selectedStance
                        ? trigramData.color
                        : KOREAN_COLORS.WHITE,
                    alpha: 0.8,
                  });
                  g.circle(0, 0, 20);
                  g.fill();
                },
                [stance, selectedStance, trigramData.color]
              )}
            />
            <pixiText
              text={trigramData.symbol}
              anchor={{ x: 0.5, y: 0.5 }}
              style={
                new PIXI.TextStyle({
                  fontFamily: "Noto Sans KR, Arial, sans-serif",
                  fontSize: 16,
                  fill: KOREAN_COLORS.BLACK,
                })
              }
            />
          </pixiContainer>
        );
      })}
    </pixiContainer>
  );
}
