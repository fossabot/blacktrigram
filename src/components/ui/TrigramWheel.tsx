import React, { useState, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { TrigramStance, TrigramWheelProps } from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types";

export function TrigramWheel({
  selectedStance,
  onStanceChange,
  x = 0,
  y = 0,
  radius = 120,
}: TrigramWheelProps): React.JSX.Element {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );

  const drawWheel = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Draw central circle
      const blackColor =
        typeof KOREAN_COLORS.BLACK === "string"
          ? parseInt(KOREAN_COLORS.BLACK.replace("#", ""), 16)
          : KOREAN_COLORS.BLACK;
      const goldColor =
        typeof KOREAN_COLORS.GOLD === "string"
          ? parseInt(KOREAN_COLORS.GOLD.replace("#", ""), 16)
          : KOREAN_COLORS.GOLD;

      g.setFillStyle({ color: blackColor, alpha: 0.8 });
      g.circle(0, 0, radius * 0.3);
      g.fill();

      g.setStrokeStyle({ color: goldColor, width: 2 });
      g.circle(0, 0, radius * 0.3);
      g.stroke();
    },
    [radius]
  );

  const drawStanceButton = useCallback(
    (g: PixiGraphics, stance: TrigramStance, index: number) => {
      const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
      const buttonX = Math.cos(angle) * radius;
      const buttonY = Math.sin(angle) * radius;

      const trigramData = TRIGRAM_DATA[stance];
      const isSelected = stance === selectedStance;
      const isHovered = stance === hoveredStance;
      const alpha = isSelected ? 1.0 : isHovered ? 0.8 : 0.6;

      g.clear();

      // Convert color string to number if needed
      const stanceColor =
        typeof trigramData.color === "string"
          ? parseInt(trigramData.color.replace("#", ""), 16)
          : trigramData.color;

      // Button background
      g.setFillStyle({ color: stanceColor, alpha: alpha * 0.3 });
      g.circle(buttonX, buttonY, 30);
      g.fill();

      g.setStrokeStyle({
        color: stanceColor,
        width: isSelected ? 3 : 2,
        alpha: alpha,
      });
      g.circle(buttonX, buttonY, 30);
      g.stroke();
    },
    [radius, selectedStance, hoveredStance]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawWheel} />

      {Object.entries(TRIGRAM_DATA).map(([stance, trigramData], index) => (
        <Container
          key={stance}
          interactive={true}
          onPointerDown={() => onStanceChange(stance as TrigramStance)}
          onPointerEnter={() => setHoveredStance(stance as TrigramStance)}
          onPointerLeave={() => setHoveredStance(null)}
        >
          <Graphics
            draw={(g: PixiGraphics) =>
              drawStanceButton(g, stance as TrigramStance, index)
            }
          />

          <Text
            text={trigramData.symbol}
            anchor={{ x: 0.5, y: 0.5 }}
            x={Math.cos((index / 8) * Math.PI * 2 - Math.PI / 2) * radius}
            y={Math.sin((index / 8) * Math.PI * 2 - Math.PI / 2) * radius}
            style={{
              fontFamily: "serif",
              fontSize: 24,
              fill: KOREAN_COLORS.WHITE,
            }}
          />

          <Text
            text={`${index + 1}`}
            anchor={{ x: 0.5, y: 0.5 }}
            x={Math.cos((index / 8) * Math.PI * 2 - Math.PI / 2) * radius}
            y={Math.sin((index / 8) * Math.PI * 2 - Math.PI / 2) * radius + 20}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 12,
              fill: KOREAN_COLORS.WHITE,
            }}
          />

          <Text
            text={trigramData.korean}
            anchor={{ x: 0.5, y: 0.5 }}
            x={Math.cos((index / 8) * Math.PI * 2 - Math.PI / 2) * radius}
            y={Math.sin((index / 8) * Math.PI * 2 - Math.PI / 2) * radius - 20}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 14,
              fill: trigramData.color,
            }}
          />
        </Container>
      ))}

      {/* Center display */}
      <Text
        text={TRIGRAM_DATA[selectedStance].symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 32,
          fill: TRIGRAM_DATA[selectedStance].color,
        }}
      />

      <Text
        text={TRIGRAM_DATA[selectedStance].english}
        anchor={{ x: 0.5, y: 0.5 }}
        y={25}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: KOREAN_COLORS.WHITE,
        }}
      />
    </Container>
  );
}
