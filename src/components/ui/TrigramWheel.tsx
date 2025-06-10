import React, { useCallback } from "react";
import type { TrigramStance } from "../../types/trigram";

export interface TrigramWheelProps {
  currentStance: TrigramStance;
  onStanceChange: (stance: TrigramStance) => void;
  size?: number;
  showLabels?: boolean;
  x?: number;
  y?: number;
  interactive?: boolean;
}

export const TrigramWheel: React.FC<TrigramWheelProps> = ({
  currentStance,
  onStanceChange,
  size = 150,
  showLabels = true,
  x = 0,
  y = 0,
  interactive = true,
}) => {
  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      if (interactive) {
        onStanceChange(stance);
      }
    },
    [onStanceChange, interactive]
  );

  // Trigram stances in order
  const trigrams = [
    {
      stance: "geon" as TrigramStance,
      symbol: "☰",
      korean: "건",
      english: "Heaven",
    },
    {
      stance: "tae" as TrigramStance,
      symbol: "☱",
      korean: "태",
      english: "Lake",
    },
    {
      stance: "li" as TrigramStance,
      symbol: "☲",
      korean: "리",
      english: "Fire",
    },
    {
      stance: "jin" as TrigramStance,
      symbol: "☳",
      korean: "진",
      english: "Thunder",
    },
    {
      stance: "son" as TrigramStance,
      symbol: "☴",
      korean: "손",
      english: "Wind",
    },
    {
      stance: "gam" as TrigramStance,
      symbol: "☵",
      korean: "감",
      english: "Water",
    },
    {
      stance: "gan" as TrigramStance,
      symbol: "☶",
      korean: "간",
      english: "Mountain",
    },
    {
      stance: "gon" as TrigramStance,
      symbol: "☷",
      korean: "곤",
      english: "Earth",
    },
  ];

  const radius = size * 0.4;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <pixiContainer x={x} y={y} data-testid="trigram-wheel">
      {/* Outer circle */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.stroke({ width: 3, color: 0xffd700, alpha: 0.8 });
          g.circle(centerX, centerY, radius + 20);
          g.stroke();
        }}
      />

      {/* Inner circle */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.stroke({ width: 2, color: 0x00ffff, alpha: 0.6 });
          g.circle(centerX, centerY, radius);
          g.stroke();
        }}
      />

      {/* Trigram positions */}
      {trigrams.map((trigram, index) => {
        const angle = (index * Math.PI * 2) / 8 - Math.PI / 2;
        const trigramX = centerX + Math.cos(angle) * radius;
        const trigramY = centerY + Math.sin(angle) * radius;
        const isSelected = currentStance === trigram.stance;

        return (
          <pixiContainer key={trigram.stance} x={trigramX} y={trigramY}>
            {/* Selection indicator */}
            {isSelected && (
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  g.fill({ color: 0xffd700, alpha: 0.3 });
                  g.circle(0, 0, 25);
                  g.fill();
                }}
              />
            )}

            {/* Trigram symbol */}
            <pixiText
              text={trigram.symbol}
              style={{
                fontSize: 24,
                fill: isSelected ? 0xffd700 : 0xffffff,
                align: "center",
                fontWeight: isSelected ? "bold" : "normal",
              }}
              anchor={0.5}
              interactive={interactive}
              onPointerDown={() => handleStanceSelect(trigram.stance)}
            />

            {/* Labels */}
            {showLabels && (
              <pixiText
                text={trigram.korean}
                style={{
                  fontSize: 12,
                  fill: isSelected ? 0xffd700 : 0xcccccc,
                  align: "center",
                }}
                anchor={0.5}
                y={20}
              />
            )}
          </pixiContainer>
        );
      })}

      {/* Center text */}
      <pixiContainer x={centerX} y={centerY}>
        <pixiText
          text="팔괘"
          style={{
            fontSize: 16,
            fill: 0xffd700,
            align: "center",
            fontWeight: "bold",
          }}
          anchor={0.5}
          y={-8}
        />
        <pixiText
          text="Eight Trigrams"
          style={{
            fontSize: 10,
            fill: 0xcccccc,
            align: "center",
          }}
          anchor={0.5}
          y={8}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default TrigramWheel;
