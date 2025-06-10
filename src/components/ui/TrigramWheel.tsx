import React, { useCallback } from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { KOREAN_COLORS } from "../../types/constants";
import { TrigramStance } from "../../types/trigram";
import { TRIGRAM_DATA } from "../../types/constants/trigram";

export interface TrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
  readonly radius?: number;
}

export const TrigramWheel: React.FC<TrigramWheelProps> = ({
  currentStance,
  onStanceSelect,
  radius = 100,
}) => {
  usePixiExtensions();

  const drawWheel = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.2);
      g.drawCircle(0, 0, radius);
      g.endFill();

      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN);
      g.drawCircle(0, 0, radius);
    },
    [radius]
  );

  // Use proper TrigramStance enum values as strings
  const trigrams: TrigramStance[] = [
    "geon" as TrigramStance,
    "tae" as TrigramStance,
    "li" as TrigramStance,
    "jin" as TrigramStance,
    "son" as TrigramStance,
    "gam" as TrigramStance,
    "gan" as TrigramStance,
    "gon" as TrigramStance,
  ];

  return (
    <pixiContainer data-testid="trigram-wheel">
      <pixiGraphics draw={drawWheel} />

      <pixiText
        text="팔괘 (Eight Trigrams)"
        style={
          new PIXI.TextStyle({
            fontSize: 16,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          })
        }
        x={0}
        y={-radius - 30}
        anchor={0.5}
      />

      {trigrams.map((trigram, index) => {
        // Fix: Use stanceData properly
        const stanceData = TRIGRAM_DATA[trigram];
        const angle = (index / 8) * Math.PI * 2;
        const x = Math.cos(angle) * (radius * 0.8);
        const y = Math.sin(angle) * (radius * 0.8);

        return (
          <pixiContainer
            key={trigram}
            x={x}
            y={y}
            interactive={true}
            onPointerDown={() => onStanceSelect?.(trigram)}
          >
            <pixiGraphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                g.beginFill(
                  currentStance === trigram
                    ? KOREAN_COLORS.ACCENT_GOLD
                    : KOREAN_COLORS.UI_BACKGROUND_DARK
                );
                g.drawCircle(0, 0, 20);
                g.endFill();

                // Add border for active stance
                if (currentStance === trigram) {
                  g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN);
                  g.drawCircle(0, 0, 20);
                }
              }}
            />
            <pixiText
              text={stanceData?.symbol || trigram}
              style={
                new PIXI.TextStyle({
                  fontSize: 14,
                  fill: KOREAN_COLORS.TEXT_PRIMARY,
                })
              }
              anchor={0.5}
            />
          </pixiContainer>
        );
      })}
    </pixiContainer>
  );
};

export default TrigramWheel;
