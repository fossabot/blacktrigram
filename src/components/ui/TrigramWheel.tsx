import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import {
  TRIGRAM_DATA,
  KOREAN_COLORS,
  type TrigramWheelProps,
} from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

export function TrigramWheel({
  selectedStance,
  onStanceChange,
  x = 0,
  y = 0,
  radius = 60,
  isEnabled = true,
  playerKi = 100,
  playerMaxKi = 100,
}: TrigramWheelProps): React.ReactElement {
  const stances = Object.keys(TRIGRAM_DATA) as Array<keyof typeof TRIGRAM_DATA>;
  const anglePerStance = (Math.PI * 2) / stances.length;

  const drawWheel = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Background circle
      g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.8 });
      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
      g.circle(0, 0, radius);
      g.fill();
      g.stroke();

      // Ki indicator (inner circle)
      const kiRatio = playerKi / playerMaxKi;
      g.setFillStyle({ color: KOREAN_COLORS.CYAN, alpha: 0.6 });
      g.circle(0, 0, radius * 0.3 * kiRatio);
      g.fill();

      // Stance segments
      stances.forEach((stance, index) => {
        const angle = index * anglePerStance - Math.PI / 2;
        const stanceData = TRIGRAM_DATA[stance];
        const isSelected = stance === selectedStance;

        // Segment highlight
        if (isSelected) {
          g.setFillStyle({ color: stanceData.color, alpha: 0.4 });
          g.moveTo(0, 0);
          g.arc(
            0,
            0,
            radius * 0.9,
            angle - anglePerStance / 2,
            angle + anglePerStance / 2
          );
          g.lineTo(0, 0);
          g.fill();
        }

        // Stance position indicator
        const indicatorX = Math.cos(angle) * radius * 0.8;
        const indicatorY = Math.sin(angle) * radius * 0.8;

        g.setFillStyle({
          color: isSelected ? KOREAN_COLORS.GOLD : stanceData.color,
          alpha: isEnabled ? 1.0 : 0.5,
        });
        g.circle(indicatorX, indicatorY, 8);
        g.fill();
      });
    },
    [selectedStance, radius, isEnabled, playerKi, playerMaxKi, stances]
  );

  const handleStanceClick = useCallback(
    (stance: keyof typeof TRIGRAM_DATA) => {
      if (isEnabled && onStanceChange) {
        onStanceChange(stance);
      }
    },
    [isEnabled, onStanceChange]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawWheel} />

      {/* Stance symbols and labels */}
      {stances.map((stance, index) => {
        const angle = index * anglePerStance - Math.PI / 2;
        const stanceData = TRIGRAM_DATA[stance];
        const symbolX = Math.cos(angle) * radius * 0.8;
        const symbolY = Math.sin(angle) * radius * 0.8;
        const labelX = Math.cos(angle) * radius * 1.2;
        const labelY = Math.sin(angle) * radius * 1.2;

        return (
          <Container key={stance}>
            {/* Trigram Symbol */}
            <Text
              text={stanceData.symbol}
              anchor={{ x: 0.5, y: 0.5 }}
              x={symbolX}
              y={symbolY}
              style={{
                fontSize: 16,
                fill:
                  selectedStance === stance
                    ? KOREAN_COLORS.GOLD
                    : KOREAN_COLORS.WHITE,
                fontWeight: "bold",
              }}
              interactive={isEnabled}
              onPointerDown={() => handleStanceClick(stance)}
            />

            {/* Korean Name */}
            <Text
              text={stanceData.korean}
              anchor={{ x: 0.5, y: 0.5 }}
              x={labelX}
              y={labelY}
              style={{
                fontSize: 12,
                fill: stanceData.color,
                fontFamily: "Noto Sans KR",
              }}
              interactive={isEnabled}
              onPointerDown={() => handleStanceClick(stance)}
            />
          </Container>
        );
      })}

      {/* Center Ki indicator text */}
      <Text
        text={`기\n${Math.round(playerKi)}`}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontSize: 14,
          fill: KOREAN_COLORS.CYAN,
          align: "center",
          fontFamily: "Noto Sans KR",
        }}
      />
    </Container>
  );
}
