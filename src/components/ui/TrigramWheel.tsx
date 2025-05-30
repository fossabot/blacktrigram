import { useState, useCallback } from "react";
import type { JSX } from "react";
import { useAudio } from "../../audio/AudioManager";
import type { TrigramWheelProps, TrigramStance } from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

export function TrigramWheel({
  selectedStance,
  onStanceSelect,
  onStanceChange,
  x = 400,
  y = 300,
  radius = 120,
  isEnabled = true,
  playerKi = 50,
  playerMaxKi = 100,
}: TrigramWheelProps): JSX.Element {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );
  const audio = useAudio();

  const drawWheel = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Draw outer ring
      g.setStrokeStyle({
        color: KOREAN_COLORS.GOLD,
        width: 3,
        alpha: 0.8,
      });
      g.circle(0, 0, radius);
      g.stroke();

      // Draw Ki energy ring
      const kiRatio = playerKi / playerMaxKi;
      const kiArcStart = -Math.PI / 2;

      g.setStrokeStyle({
        color: KOREAN_COLORS.CYAN,
        width: 6,
        alpha: 0.6,
      });
      g.arc(0, 0, radius - 10, kiArcStart, kiArcStart + kiRatio * Math.PI * 2);
      g.stroke();

      // Draw trigram positions
      const stances: TrigramStance[] = [
        "geon",
        "tae",
        "li",
        "jin",
        "son",
        "gam",
        "gan",
        "gon",
      ];

      stances.forEach((stance, index) => {
        const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
        const posX = Math.cos(angle) * (radius - 30);
        const posY = Math.sin(angle) * (radius - 30);

        // Stance background
        const isSelected = stance === selectedStance;
        const isHovered = stance === hoveredStance;

        g.setFillStyle({
          color: isSelected
            ? KOREAN_COLORS.GOLD
            : isHovered
            ? KOREAN_COLORS.CYAN
            : KOREAN_COLORS.BLACK,
          alpha: 0.7,
        });
        g.circle(posX, posY, 20);
        g.fill();

        // Stance border
        g.setStrokeStyle({
          color: TRIGRAM_DATA[stance].color,
          width: 2,
          alpha: 1.0,
        });
        g.circle(posX, posY, 20);
        g.stroke();
      });
    },
    [radius, playerKi, playerMaxKi, selectedStance, hoveredStance]
  );

  return (
    <pixiContainer
      x={x}
      y={y}
      interactive={isEnabled}
      data-testid="trigram-wheel"
    >
      <pixiGraphics draw={drawWheel} />

      {/* Trigram symbols and labels */}
      {(
        [
          "geon",
          "tae",
          "li",
          "jin",
          "son",
          "gam",
          "gan",
          "gon",
        ] as TrigramStance[]
      ).map((stance, index) => {
        const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
        const posX = Math.cos(angle) * (radius - 30);
        const posY = Math.sin(angle) * (radius - 30);

        return (
          <pixiContainer
            key={stance}
            x={posX}
            y={posY}
            interactive={isEnabled}
            cursor="pointer"
            onPointerDown={() => {
              if (isEnabled) {
                audio.playSFX("menu_select");
                onStanceSelect?.(stance);
                onStanceChange(stance);
              }
            }}
            onPointerEnter={() => setHoveredStance(stance)}
            onPointerLeave={() => setHoveredStance(null)}
          >
            {/* Trigram symbol */}
            <pixiText
              text={TRIGRAM_DATA[stance].symbol}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{
                fontFamily: "serif",
                fontSize: 16,
                fill: KOREAN_COLORS.WHITE,
                fontWeight: "bold",
              }}
            />

            {/* Korean name */}
            <pixiText
              text={TRIGRAM_DATA[stance].koreanName}
              anchor={{ x: 0.5, y: 0.5 }}
              y={25}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 12,
                fill: KOREAN_COLORS.GOLD,
              }}
            />
          </pixiContainer>
        );
      })}

      {/* Center Ki indicator */}
      <pixiText
        text={`기 ${Math.round(playerKi)}/${playerMaxKi}`}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: KOREAN_COLORS.CYAN,
          fontWeight: "bold",
        }}
      />
    </pixiContainer>
  );
}
