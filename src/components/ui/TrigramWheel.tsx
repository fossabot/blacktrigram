import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { TRIGRAM_STANCES_ORDER, TRIGRAM_DATA } from "../../types/constants";
import type { TrigramStance } from "../../types/enums";
import type { TrigramWheelProps } from "../../types";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

export const TrigramWheel: React.FC<TrigramWheelProps> = ({
  selectedStance,
  onStanceSelect,
  x = 0,
  y = 0,
  radius = 100,
  showLabels = true,
  interactive = true,
  ...props
}) => {
  const centerX = radius;
  const centerY = radius;
  const innerRadius = radius * 0.3;
  const outerRadius = radius * 0.9;

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const drawSegment = useCallback(
    (g: PIXI.Graphics, stance: TrigramStance, index: number) => {
      const angleStep = (2 * Math.PI) / TRIGRAM_STANCES_ORDER.length;
      const startAngle = index * angleStep - Math.PI / 2;
      const endAngle = (index + 1) * angleStep - Math.PI / 2;

      const isSelected = selectedStance === stance;
      const stanceData = TRIGRAM_DATA[stance];

      // Determine colors - fix type issues
      let fillColor: number;
      let lineColor: number;

      if (isSelected) {
        fillColor = KOREAN_COLORS.ACCENT_PRIMARY;
        lineColor = KOREAN_COLORS.PRIMARY_CYAN;
      } else {
        fillColor = KOREAN_COLORS.UI_BACKGROUND_LIGHT;
        lineColor = KOREAN_COLORS.TEXT_SECONDARY; // Fixed: use existing color
      }

      // Draw the segment
      g.beginFill(fillColor, 0.8);
      g.lineStyle(2, lineColor);
      g.moveTo(centerX, centerY);
      g.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      g.lineTo(centerX, centerY);
      g.endFill();

      // Calculate text position
      const midAngle = (startAngle + endAngle) / 2;
      const textRadius = (innerRadius + outerRadius) / 2;
      const textX = centerX + Math.cos(midAngle) * textRadius;
      const textY = centerY + Math.sin(midAngle) * textRadius;

      // Draw stance symbol
      g.beginFill(KOREAN_COLORS.TEXT_PRIMARY);
      g.drawCircle(textX, textY, 2);
      g.endFill();

      // Store positions for text rendering
      return {
        stance,
        symbol: stanceData?.symbol || "?",
        korean: stanceData?.name.korean || stance,
        x: textX,
        y: textY,
        isSelected,
      };
    },
    [selectedStance, centerX, centerY, innerRadius, outerRadius]
  );

  const handleSegmentClick = useCallback(
    (stance: TrigramStance) => {
      if (interactive && onStanceSelect) {
        onStanceSelect(stance);
      }
    },
    [interactive, onStanceSelect]
  );

  const segmentData = useMemo(() => {
    return TRIGRAM_STANCES_ORDER.map((stance, index) => {
      const g = new PIXI.Graphics();
      return drawSegment(g, stance, index);
    });
  }, [drawSegment]);

  const drawWheel = (g: PIXI.Graphics) => {
    g.clear();

    // Draw all segments
    TRIGRAM_STANCES_ORDER.forEach((stance, index) => {
      drawSegment(g, stance, index);
    });

    // Draw center circle
    g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
    g.lineStyle(3, KOREAN_COLORS.PRIMARY_CYAN);
    g.drawCircle(centerX, centerY, innerRadius);
    g.endFill();
  };

  const drawSegments = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      TRIGRAM_STANCES_ORDER.forEach((stance: TrigramStance, index) => {
        // Ensure drawSegment is called with TrigramStance
        return drawSegment(g, stance, index);
      });
    },
    [drawSegment]
  );

  const drawHighlight = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      if (hoveredStance !== null || selectedStance !== null) {
        const stanceToHighlight = hoveredStance ?? selectedStance;
        if (stanceToHighlight !== null) {
          const index = TRIGRAM_STANCES_ORDER.indexOf(stanceToHighlight);
          // Ensure drawSegment is called with TrigramStance
          drawSegment(g, stanceToHighlight, index); // Highlight the segment
        }
      }
    },
    [hoveredStance, selectedStance, drawSegment]
  );

  return (
    <Container x={x} y={y} {...props}>
      <Graphics draw={drawWheel} />

      {/* Render text labels */}
      {showLabels &&
        segmentData.map(
          (
            data // Removed unused index parameter
          ) => (
            <Container
              key={data.stance}
              x={data.x}
              y={data.y}
              interactive={interactive}
              buttonMode={interactive}
              pointertap={() => handleSegmentClick(data.stance)}
            >
              <Text
                text={data.symbol}
                anchor={0.5}
                x={0}
                y={-8}
                style={{
                  ...textStyle,
                  fontSize: FONT_SIZES.medium,
                  fill: data.isSelected
                    ? KOREAN_COLORS.TEXT_PRIMARY
                    : KOREAN_COLORS.TEXT_SECONDARY,
                }}
              />
              <Text
                text={data.korean}
                anchor={0.5}
                x={0}
                y={8}
                style={{
                  ...textStyle,
                  fontSize: FONT_SIZES.small,
                  fill: data.isSelected
                    ? KOREAN_COLORS.TEXT_PRIMARY
                    : KOREAN_COLORS.TEXT_SECONDARY,
                }}
              />
            </Container>
          )
        )}

      {/* Center text */}
      <Text
        text="팔괘"
        anchor={0.5}
        x={centerX}
        y={centerY}
        style={{
          ...textStyle,
          fontSize: FONT_SIZES.large,
          fill: KOREAN_COLORS.PRIMARY_CYAN,
        }}
      />
    </Container>
  );
};

export default TrigramWheel;
