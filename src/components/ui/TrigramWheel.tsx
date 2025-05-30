import React, { useState, useCallback } from "react";
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
      g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.8 });
      g.circle(0, 0, radius * 0.3);
      g.fill();

      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
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

      // Button background
      g.setFillStyle({ color: trigramData.color, alpha: alpha * 0.3 });
      g.circle(buttonX, buttonY, 30);
      g.fill();

      g.setStrokeStyle({
        color: trigramData.color,
        width: isSelected ? 3 : 2,
        alpha: alpha,
      });
      g.circle(buttonX, buttonY, 30);
      g.stroke();
    },
    [radius, selectedStance, hoveredStance]
  );

  return (
    <pixiContainer x={x} y={y}>
      <pixiGraphics draw={drawWheel} />

      {Object.entries(TRIGRAM_DATA).map(([stance, trigramData], index) => (
        <pixiContainer
          key={stance}
          interactive={true}
          onPointerDown={() => onStanceChange(stance as TrigramStance)}
          onPointerEnter={() => setHoveredStance(stance as TrigramStance)}
          onPointerLeave={() => setHoveredStance(null)}
        >
          <pixiGraphics
            draw={(g: PixiGraphics) =>
              drawStanceButton(g, stance as TrigramStance, index)
            }
          />

          <pixiText
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

          <pixiText
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

          <pixiText
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
        </pixiContainer>
      ))}

      {/* Center display */}
      <pixiText
        text={TRIGRAM_DATA[selectedStance].symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 32,
          fill: TRIGRAM_DATA[selectedStance].color,
        }}
      />

      <pixiText
        text={TRIGRAM_DATA[selectedStance].english}
        anchor={{ x: 0.5, y: 0.5 }}
        y={25}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: KOREAN_COLORS.WHITE,
        }}
      />
    </pixiContainer>
  );
}
