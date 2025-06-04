import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics, FederatedPointerEvent } from "pixi.js";
import type { TrigramStance } from "../../types";
import {
  KOREAN_COLORS,
  TRIGRAM_DATA,
  KOREAN_FONT_FAMILY_PRIMARY,
} from "../../types/constants";
import { useAudio } from "../../audio/AudioManager";

export interface TrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly x?: number;
  readonly y?: number;
  readonly radius?: number;
  readonly disabled?: boolean;
  readonly showLabels?: boolean;
}

const TRIGRAM_STANCES_ORDER: readonly TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
] as const;

const TRIGRAM_SYMBOLS = {
  geon: "☰",
  tae: "☱",
  li: "☲",
  jin: "☳",
  son: "☴",
  gam: "☵",
  gan: "☶",
  gon: "☷",
} as const;

export function TrigramWheel({
  currentStance,
  onStanceSelect,
  x = 0,
  y = 0,
  radius = 80,
  disabled = false,
  showLabels = true,
}: TrigramWheelProps): React.ReactElement {
  const audio = useAudio();

  // Calculate positions for each trigram
  const trigramPositions = useMemo(() => {
    return TRIGRAM_STANCES_ORDER.map((stance, index) => {
      const angle = (index / 8) * Math.PI * 2 - Math.PI / 2; // Start from top
      const distance = radius * 0.8;
      return {
        stance,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        angle,
      };
    });
  }, [radius]);

  // Draw the wheel background
  const drawWheel = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Outer circle
      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 3 });
      g.circle(0, 0, radius);
      g.stroke();

      // Inner circle
      g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 2, alpha: 0.7 });
      g.circle(0, 0, radius * 0.3);
      g.stroke();

      // Connecting lines to trigrams
      trigramPositions.forEach(({ x: px, y: py }) => {
        g.setStrokeStyle({
          color: KOREAN_COLORS.GRAY_LIGHT,
          width: 1,
          alpha: 0.5,
        });
        g.moveTo(0, 0);
        g.lineTo(px, py);
        g.stroke();
      });

      // Center I Ching symbol
      g.setFillStyle({ color: KOREAN_COLORS.WHITE });
      g.circle(0, 0, 8);
      g.fill();

      g.setFillStyle({ color: KOREAN_COLORS.BLACK });
      g.circle(0, 0, 6);
      g.fill();
    },
    [radius, trigramPositions]
  );

  // Handle trigram selection
  const handleTrigramClick = useCallback(
    (stance: TrigramStance) => {
      if (!disabled && stance !== currentStance) {
        audio.playSFX("stance_change");
        onStanceSelect(stance);
      }
    },
    [disabled, currentStance, onStanceSelect, audio]
  );

  return (
    <Container x={x} y={y}>
      {/* Wheel background */}
      <Graphics draw={drawWheel} />

      {/* Trigram buttons */}
      {trigramPositions.map(({ stance, x: px, y: py }) => {
        const isSelected = stance === currentStance;
        const stanceData = TRIGRAM_DATA[stance];
        const stanceColor = KOREAN_COLORS[stance] || KOREAN_COLORS.WHITE;

        return (
          <Container key={stance} x={px} y={py}>
            {/* Trigram button background */}
            <Graphics
              draw={(g: PixiGraphics) => {
                g.clear();

                const buttonRadius = 25;
                const bgColor = isSelected ? stanceColor : KOREAN_COLORS.BLACK;
                const borderColor = isSelected
                  ? KOREAN_COLORS.WHITE
                  : stanceColor;
                const alpha = disabled ? 0.5 : isSelected ? 1 : 0.8;

                g.setFillStyle({ color: bgColor, alpha });
                g.circle(0, 0, buttonRadius);
                g.fill();

                g.setStrokeStyle({ color: borderColor, width: 2 });
                g.circle(0, 0, buttonRadius);
                g.stroke();

                // Glow effect for selected stance
                if (isSelected) {
                  g.setStrokeStyle({
                    color: stanceColor,
                    width: 1,
                    alpha: 0.6,
                  });
                  g.circle(0, 0, buttonRadius + 5);
                  g.stroke();
                }
              }}
              interactive={!disabled}
              cursor={!disabled ? "pointer" : "default"}
              onpointerdown={(e: FederatedPointerEvent) => {
                e.stopPropagation();
                handleTrigramClick(stance);
              }}
            />

            {/* Trigram symbol */}
            <Text
              text={TRIGRAM_SYMBOLS[stance]}
              anchor={0.5}
              style={{
                fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
                fontSize: 20,
                fill: isSelected ? KOREAN_COLORS.BLACK : KOREAN_COLORS.WHITE,
                fontWeight: "bold",
              }}
            />

            {/* Korean name */}
            {showLabels && (
              <Text
                text={stanceData.name.korean}
                anchor={0.5}
                y={35}
                style={{
                  fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
                  fontSize: 10,
                  fill: KOREAN_COLORS.WHITE,
                  stroke: KOREAN_COLORS.BLACK,
                  strokeThickness: 1,
                }}
              />
            )}
          </Container>
        );
      })}

      {/* Center label */}
      <Text
        text="팔괘"
        anchor={0.5}
        y={-5}
        style={{
          fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
          fontSize: 12,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />
    </Container>
  );
}
