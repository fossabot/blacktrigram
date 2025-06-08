import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { TrigramStance } from "../../types/enums"; // Remove 'type' to allow value usage
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  TRIGRAM_DATA,
} from "../../types/constants";

export interface TrigramWheelProps {
  currentStance: TrigramStance; // This is the correct prop name
  onStanceChange: (stance: TrigramStance) => void;
  size?: number;
  x?: number;
  y?: number;
  showLabels?: boolean;
  interactive?: boolean;
}

export const TrigramWheel: React.FC<TrigramWheelProps> = ({
  currentStance,
  onStanceChange,
  size = 100,
  x = 0,
  y = 0,
  showLabels = true,
  interactive = true,
}) => {
  const stances: TrigramStance[] = [
    TrigramStance.GEON,
    TrigramStance.TAE,
    TrigramStance.LI,
    TrigramStance.JIN,
    TrigramStance.SON,
    TrigramStance.GAM,
    TrigramStance.GAN,
    TrigramStance.GON,
  ];

  const wheelDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Draw wheel background
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawCircle(0, 0, size);
      g.endFill();

      // Draw wheel border
      g.lineStyle(3, KOREAN_COLORS.PRIMARY_CYAN, 1.0);
      g.drawCircle(0, 0, size);

      // Draw stance segments
      const angleStep = (Math.PI * 2) / stances.length;
      stances.forEach((stance, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const isSelected = stance === currentStance;

        // Segment color
        const segmentColor = isSelected
          ? KOREAN_COLORS.ACCENT_GOLD
          : TRIGRAM_DATA[stance]?.theme?.primary || KOREAN_COLORS.UI_BORDER;

        // Draw segment
        g.beginFill(segmentColor, isSelected ? 0.6 : 0.3);
        g.moveTo(0, 0);
        g.arc(0, 0, size * 0.8, angle - angleStep / 2, angle + angleStep / 2);
        g.lineTo(0, 0);
        g.endFill();

        // Draw segment border
        g.lineStyle(1, KOREAN_COLORS.UI_BORDER_LIGHT, 0.8);
        g.moveTo(0, 0);
        g.arc(0, 0, size * 0.8, angle - angleStep / 2, angle + angleStep / 2);
        g.lineTo(0, 0);
      });
    },
    [size, currentStance, stances]
  );

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
      }),
    []
  );

  const centerTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: "bold",
        align: "center",
      }),
    []
  );

  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      if (interactive) {
        onStanceChange(stance);
      }
    },
    [interactive, onStanceChange]
  );

  return (
    <Container x={x} y={y} data-testid="trigram-wheel">
      {/* Wheel background and segments */}
      <Graphics draw={wheelDraw} />

      {/* Center text showing current stance */}
      <Container data-testid="trigram-wheel-center-text">
        <Text
          text={TRIGRAM_DATA[currentStance]?.symbol || currentStance}
          style={centerTextStyle}
          anchor={0.5}
        />
      </Container>

      {/* Yin-Yang symbol in center */}
      <Container data-testid="yin-yang-symbol">
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.WHITE_SOLID);
            g.drawCircle(-5, 0, 15);
            g.endFill();
            g.beginFill(KOREAN_COLORS.BLACK_SOLID);
            g.drawCircle(5, 0, 15);
            g.endFill();
          }}
        />
      </Container>

      {/* Current stance indicator */}
      <Container data-testid="current-stance-indicator">
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.8);
            g.drawCircle(0, -size + 10, 8);
            g.endFill();
          }}
        />
      </Container>

      {/* Stance labels */}
      {showLabels &&
        stances.map((stance, index) => {
          const angleStep = (Math.PI * 2) / stances.length;
          const angle = index * angleStep - Math.PI / 2;
          const labelRadius = size + 20;
          const labelX = Math.cos(angle) * labelRadius;
          const labelY = Math.sin(angle) * labelRadius;

          return (
            <Container
              key={stance}
              x={labelX}
              y={labelY}
              interactive={interactive}
              buttonMode={interactive}
              pointerdown={() => handleStanceClick(stance)}
            >
              <Text
                text={TRIGRAM_DATA[stance]?.name.korean || stance}
                style={textStyle}
                anchor={0.5}
              />
            </Container>
          );
        })}
    </Container>
  );
};

export default TrigramWheel;
