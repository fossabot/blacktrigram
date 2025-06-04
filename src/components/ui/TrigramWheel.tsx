import { useCallback, useState, useMemo } from "react";
import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

import type { TrigramStance } from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types/constants";

export interface TrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly size?: number;
  readonly interactive?: boolean;
  readonly time?: number;
}

export function TrigramWheel({
  currentStance,
  onStanceSelect,
  size = 200,
  interactive = true,
  time = 0,
}: TrigramWheelProps): JSX.Element {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );

  const stances = useMemo(
    () => Object.keys(TRIGRAM_DATA) as TrigramStance[],
    []
  );

  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      if (interactive) {
        onStanceSelect(stance);
      }
    },
    [interactive, onStanceSelect]
  );

  const radius = size * 0.4;

  return (
    <pixiContainer data-testid="trigram-wheel">
      {/* Main wheel background */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          const centerX = 0;
          const centerY = 0;
          const pulse = Math.sin(time * 0.05) * 0.3 + 0.7;

          // Draw outer circle
          g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 2, alpha: 0.6 });
          g.circle(centerX, centerY, radius);
          g.stroke();

          // Inner core pulse effect
          g.setFillStyle({ color: KOREAN_COLORS.CYAN, alpha: pulse * 0.3 });
          g.circle(centerX, centerY, 30);
          g.fill();

          g.setStrokeStyle({
            color: KOREAN_COLORS.CYAN,
            width: 1,
            alpha: pulse,
          });
          g.circle(centerX, centerY, 30);
          g.stroke();
        }}
        data-testid="trigram-wheel-background"
      />

      {/* Center Korean text */}
      <pixiText
        text="흑괘"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
        data-testid="trigram-wheel-center-text"
      />

      {/* Trigram positions */}
      {stances.map((stance, index) => {
        const angle = (index * Math.PI * 2) / 8 - Math.PI / 2;
        const x = Math.cos(angle) * radius * 0.7;
        const y = Math.sin(angle) * radius * 0.7;
        const isActive = stance === currentStance;
        const isHovered = stance === hoveredStance;
        const stanceColor = KOREAN_COLORS[stance] || KOREAN_COLORS.WHITE;

        return (
          <pixiContainer
            key={stance}
            x={x}
            y={y}
            interactive={interactive}
            cursor="pointer"
            onPointerDown={() => handleStanceClick(stance)}
            onPointerEnter={() => setHoveredStance(stance)}
            onPointerLeave={() => setHoveredStance(null)}
            data-testid={`trigram-stance-${stance}`}
          >
            {/* Background circle */}
            <pixiGraphics
              draw={(g: PixiGraphics) => {
                g.clear();
                const bgAlpha = isActive ? 0.8 : isHovered ? 0.7 : 0.5;
                const bgColor = isActive ? stanceColor : KOREAN_COLORS.BLACK;

                g.setFillStyle({ color: bgColor, alpha: bgAlpha });
                g.circle(0, 0, isActive ? 12 : 8);
                g.fill();

                g.setStrokeStyle({
                  color: KOREAN_COLORS.CYAN,
                  width: isActive ? 2 : 1,
                  alpha: isActive ? 1.0 : 0.6,
                });
                g.circle(0, 0, isActive ? 12 : 8);
                g.stroke();
              }}
              data-testid={`trigram-bg-${stance}`}
            />

            {/* Trigram symbol */}
            <pixiText
              text={TRIGRAM_DATA[stance].symbol}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{
                fontFamily: "serif",
                fontSize: 16,
                fill: stanceColor,
                fontWeight: "bold",
              }}
              data-testid={`trigram-symbol-${stance}`}
            />
          </pixiContainer>
        );
      })}

      {/* Yin-yang symbol in center */}
      <pixiText
        text="☯"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: KOREAN_COLORS.WHITE,
          fontWeight: "bold",
        }}
        data-testid="yin-yang-symbol"
      />
    </pixiContainer>
  );
}

export default TrigramWheel;
