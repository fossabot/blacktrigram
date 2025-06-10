import React, { useCallback } from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import type { TrigramWheelProps } from "../../types/components";
import {
  KOREAN_COLORS,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
} from "../../types/constants";

export const TrigramWheel: React.FC<TrigramWheelProps> = ({
  currentStance, // Fix: Use currentStance instead of selectedStance
  onStanceSelect,
  size = 100,
  radius, // Fix: Accept radius prop for compatibility
  interactive = true,
  showLabels = true, // Fix: Use this parameter
  x = 0, // Fix: Add x to the interface
  y = 0, // Fix: Add y to the interface
}) => {
  usePixiExtensions();

  const wheelRadius = radius || size;

  // Fix: Use drawWheel callback in the component
  const drawWheel = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 0.8);
      g.drawCircle(0, 0, wheelRadius);
      g.endFill();
    },
    [wheelRadius]
  );

  return (
    <pixiContainer x={x} y={y} data-testid="trigram-wheel">
      {/* Wheel background */}
      <pixiGraphics draw={drawWheel} />

      {/* Trigram stances around the wheel */}
      {TRIGRAM_STANCES_ORDER.map((stance, index) => {
        const angle =
          (index / TRIGRAM_STANCES_ORDER.length) * Math.PI * 2 - Math.PI / 2;
        const stanceX = Math.cos(angle) * (wheelRadius - 20);
        const stanceY = Math.sin(angle) * (wheelRadius - 20);
        const isSelected = currentStance === stance;

        return (
          <pixiContainer key={stance} x={stanceX} y={stanceY}>
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.beginFill(
                  isSelected
                    ? KOREAN_COLORS.ACCENT_GOLD
                    : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                  isSelected ? 1.0 : 0.6
                );
                g.drawCircle(0, 0, 15);
                g.endFill();
              }}
              interactive={interactive}
              onPointerDown={() => onStanceSelect?.(stance)}
            />

            {/* Stance symbol */}
            <pixiText
              text={TRIGRAM_DATA[stance]?.symbol || "○"}
              style={{
                fontSize: 12,
                fill: isSelected
                  ? KOREAN_COLORS.BLACK_SOLID
                  : KOREAN_COLORS.TEXT_PRIMARY,
                fontWeight: "bold",
                align: "center",
              }}
              anchor={0.5}
            />

            {/* Labels - Fix: Use showLabels parameter */}
            {showLabels && (
              <pixiText
                text={TRIGRAM_DATA[stance]?.name.korean || ""}
                style={{
                  fontSize: 8,
                  fill: KOREAN_COLORS.TEXT_SECONDARY,
                  align: "center",
                }}
                anchor={0.5}
                y={20}
              />
            )}
          </pixiContainer>
        );
      })}

      {/* Center display */}
      {currentStance && (
        <pixiContainer>
          <pixiText
            text={TRIGRAM_DATA[currentStance]?.name.korean || ""}
            style={{
              fontSize: 16,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
            y={-8}
          />
          <pixiText
            text={TRIGRAM_DATA[currentStance]?.name.english || ""}
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              align: "center",
            }}
            anchor={0.5}
            y={8}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default TrigramWheel;
