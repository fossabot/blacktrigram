import React, { useState, useCallback } from "react";
import { Container, Graphics } from "@pixi/react";
import type { JSX } from "react";
import type { TrigramStance } from "../../types/GameTypes";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types";
import { KoreanText } from "./base/KoreanText";
import { useAudio } from "../../audio/AudioManager";

export interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
}

export function TrigramWheel({
  selectedStance,
  onStanceSelect,
  x = 0,
  y = 0,
  radius = 120,
}: TrigramWheelProps): JSX.Element {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );
  const audio = useAudio();

  const stances = Object.keys(TRIGRAM_DATA) as TrigramStance[];

  const drawWheel = useCallback(
    (g: any) => {
      g.clear();

      // Draw center circle
      g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.8 });
      g.circle(0, 0, 30);
      g.fill();

      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.6 });
      g.circle(0, 0, 30);
      g.stroke();

      // Draw outer ring
      g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 1, alpha: 0.4 });
      g.circle(0, 0, radius + 10);
      g.stroke();
    },
    [radius]
  );

  const getStancePosition = useCallback(
    (index: number) => {
      const angle = (index / 8) * Math.PI * 2 - Math.PI / 2; // Start from top
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      };
    },
    [radius]
  );

  const stanceElements = stances.map((stance, index) => {
    const position = getStancePosition(index);
    const isSelected = selectedStance === stance;
    const isHovered = hoveredStance === stance;
    const trigramData = TRIGRAM_DATA[stance];

    const drawStanceButton = useCallback(
      (g: any) => {
        g.clear();

        const size = isSelected ? 40 : isHovered ? 35 : 30;
        const alpha = isSelected ? 1.0 : isHovered ? 0.9 : 0.7;

        // Background circle
        g.setFillStyle({ color: trigramData.color, alpha: alpha * 0.3 });
        g.circle(0, 0, size);
        g.fill();

        // Border
        g.setStrokeStyle({
          color: trigramData.color,
          width: isSelected ? 3 : 2,
          alpha,
        });
        g.circle(0, 0, size);
        g.stroke();

        // Selection glow
        if (isSelected) {
          g.setStrokeStyle({
            color: KOREAN_COLORS.WHITE,
            width: 1,
            alpha: 0.6,
          });
          g.circle(0, 0, size + 3);
          g.stroke();
        }
      },
      [isSelected, isHovered, trigramData.color]
    );

    const handleStanceClick = useCallback(() => {
      audio.playSFX("menu_select");
      onStanceSelect(stance);
    }, [stance]);

    const handleStanceHover = useCallback(() => {
      if (hoveredStance !== stance) {
        audio.playSFX("menu_hover");
        setHoveredStance(stance);
      }
    }, [stance]);

    return (
      <Container
        key={stance}
        x={position.x}
        y={position.y}
        interactive={true}
        cursor="pointer"
        onPointerDown={handleStanceClick}
        onPointerEnter={handleStanceHover}
        onPointerLeave={() => setHoveredStance(null)}
      >
        <Graphics draw={drawStanceButton} />

        <KoreanText
          text={trigramData.symbol}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontSize: isSelected ? 28 : isHovered ? 24 : 20,
            fill: trigramData.color,
            fontWeight: "bold",
          }}
        />

        <KoreanText
          text={`${index + 1}`}
          y={-50}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.GRAY_LIGHT,
            fontWeight: "300",
          }}
        />

        <KoreanText
          text={trigramData.korean}
          y={50}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontSize: 10,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "400",
          }}
        />
      </Container>
    );
  });

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawWheel} />
      {stanceElements}

      {/* Center trigram info */}
      <KoreanText
        text={TRIGRAM_DATA[selectedStance].symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-8}
        style={{
          fontSize: 32,
          fill: TRIGRAM_DATA[selectedStance].color,
          fontWeight: "bold",
        }}
      />

      <KoreanText
        text={TRIGRAM_DATA[selectedStance].english}
        anchor={{ x: 0.5, y: 0.5 }}
        y={12}
        style={{
          fontSize: 10,
          fill: KOREAN_COLORS.WHITE,
          fontWeight: "300",
        }}
      />
    </Container>
  );
}
