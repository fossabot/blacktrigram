import React, { useCallback, useState, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { TrigramStance } from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types/constants";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface TrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly size?: number;
  readonly interactive?: boolean;
}

export function TrigramWheel({
  currentStance,
  onStanceSelect,
  size = 200,
  interactive = true,
}: TrigramWheelProps): React.JSX.Element {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );

  const stances = useMemo(
    () => Object.keys(TRIGRAM_DATA) as TrigramStance[],
    []
  );

  const drawWheel = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size * 0.4;

      // Draw outer circle
      g.lineStyle(2, KOREAN_COLORS.CYAN);
      g.drawCircle(centerX, centerY, radius);

      // Draw stance segments
      stances.forEach((stance, index) => {
        const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius * 0.7;
        const y = centerY + Math.sin(angle) * radius * 0.7;

        const isActive = stance === currentStance;
        const isHovered = stance === hoveredStance;
        const stanceColor = KOREAN_COLORS[stance] || KOREAN_COLORS.WHITE;

        // Draw stance indicator
        g.beginFill(stanceColor, isActive ? 1.0 : isHovered ? 0.7 : 0.5);
        g.drawCircle(x, y, isActive ? 12 : 8);
        g.endFill();
      });

      // Draw center
      g.beginFill(KOREAN_COLORS.GOLD);
      g.drawCircle(centerX, centerY, 15);
      g.endFill();
    },
    [size, currentStance, hoveredStance, stances]
  );

  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      if (interactive) {
        onStanceSelect(stance);
      }
    },
    [interactive, onStanceSelect]
  );

  return (
    <Container>
      <Graphics draw={drawWheel} interactive={interactive} eventMode="static" />

      {stances.map((stance, index) => {
        const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
        const x = size / 2 + Math.cos(angle) * size * 0.28;
        const y = size / 2 + Math.sin(angle) * size * 0.28;

        return (
          <Text
            key={stance}
            text={TRIGRAM_DATA[stance].symbol}
            x={x}
            y={y}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 16,
              fill: KOREAN_COLORS[stance] || KOREAN_COLORS.WHITE,
            }}
            interactive={interactive}
            eventMode="static"
            onPointerTap={() => handleStanceClick(stance)}
            onPointerOver={() => setHoveredStance(stance)}
            onPointerOut={() => setHoveredStance(null)}
          />
        );
      })}

      <Text
        text="흑괘"
        x={size / 2}
        y={size / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />
    </Container>
  );
}

export default TrigramWheel;
