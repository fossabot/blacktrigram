import React, { useState, useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrigramWheelProps } from "../../types";
import { TrigramStance } from "../../types/enums";
import {
  TRIGRAM_STANCES_ORDER,
  TRIGRAM_DATA,
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  DEFAULT_TRIGRAM_THEME,
} from "../../types/constants";

const RADIUS = 150;
const SEGMENT_ARC = (2 * Math.PI) / TRIGRAM_STANCES_ORDER.length;

export const TrigramWheel: React.FC<TrigramWheelProps> = ({
  x = 0,
  y = 0,
  selectedStance,
  onStanceSelect,
  interactive = true,
}) => {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );

  const drawSegments = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      TRIGRAM_STANCES_ORDER.forEach((stance: TrigramStance, index) => {
        const stanceData = TRIGRAM_DATA[stance];
        const theme = stanceData?.theme || DEFAULT_TRIGRAM_THEME;
        const startAngle = index * SEGMENT_ARC - Math.PI / 2 - SEGMENT_ARC / 2;
        const endAngle = startAngle + SEGMENT_ARC;

        const isHovered = hoveredStance === stance;
        const isSelected = selectedStance === stance;

        let fillColor = theme.primary;
        let lineColor = theme.secondary;
        let alpha = 0.8;

        if (isSelected) {
          fillColor = theme.active;
          lineColor = theme.secondary; // Or theme.active for more highlight
          alpha = 1;
        } else if (isHovered) {
          fillColor = theme.hover;
          lineColor = theme.active; // Or theme.hover for softer highlight
          alpha = 0.9;
        }

        g.lineStyle(2, lineColor, alpha);
        g.beginFill(fillColor, alpha);
        g.moveTo(x, y);
        g.arc(x, y, RADIUS, startAngle, endAngle);
        g.lineTo(x, y);
        g.endFill();
      });
    },
    [hoveredStance, selectedStance, x, y]
  );

  const handlePointerMove = useCallback(
    (event: PIXI.FederatedPointerEvent) => {
      if (!interactive) return;
      const point = event.global;
      const dx = point.x - x;
      const dy = point.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0 && dist <= RADIUS) {
        let angle = Math.atan2(dy, dx) + Math.PI / 2 + SEGMENT_ARC / 2;
        if (angle < 0) angle += 2 * Math.PI;
        const segmentIndex =
          Math.floor(angle / SEGMENT_ARC) % TRIGRAM_STANCES_ORDER.length;
        const currentHoveredStance = TRIGRAM_STANCES_ORDER[segmentIndex];
        if (hoveredStance !== currentHoveredStance) {
          setHoveredStance(currentHoveredStance as TrigramStance);
        }
      } else {
        if (hoveredStance !== null) {
          setHoveredStance(null);
        }
      }
    },
    [x, y, interactive, hoveredStance]
  );

  const handlePointerTap = useCallback(
    (_event: PIXI.FederatedPointerEvent) => {
      if (!interactive || !hoveredStance) return;
      onStanceSelect(hoveredStance);
    },
    [interactive, hoveredStance, onStanceSelect]
  );

  const symbolTextStyle = useMemo(
    () =>
      (stance: TrigramStance): PIXI.TextStyle => {
        const stanceData = TRIGRAM_DATA[stance];
        const theme = stanceData?.theme || DEFAULT_TRIGRAM_THEME;
        return new PIXI.TextStyle({
          fontFamily: FONT_FAMILY.PRIMARY,
          fontSize: FONT_SIZES.large,
          fill:
            selectedStance === stance
              ? theme.active
              : hoveredStance === stance
              ? theme.hover
              : theme.text,
          fontWeight: "bold", // Corrected: Use string literal 'bold'
        });
      },
    [selectedStance, hoveredStance]
  );

  const labelTextStyle = useMemo(
    () =>
      (stance: TrigramStance): PIXI.TextStyle => {
        const stanceData = TRIGRAM_DATA[stance];
        const theme = stanceData?.theme || DEFAULT_TRIGRAM_THEME;
        return new PIXI.TextStyle({
          fontFamily: FONT_FAMILY.SECONDARY,
          fontSize: FONT_SIZES.small,
          fill: theme.text,
        });
      },
    [] // No direct dependencies on selectedStance/hoveredStance for this style
  );

  return (
    <Container
      interactive={interactive}
      pointermove={handlePointerMove}
      pointertap={handlePointerTap}
      pointerout={() => interactive && setHoveredStance(null)}
    >
      <Graphics draw={drawSegments} />
      {TRIGRAM_STANCES_ORDER.map((stance: TrigramStance, index) => {
        const stanceData = TRIGRAM_DATA[stance];
        const angle = index * SEGMENT_ARC - Math.PI / 2;
        const textX = x + (RADIUS - 30) * Math.cos(angle);
        const textY = y + (RADIUS - 30) * Math.sin(angle);

        return (
          <Container key={stance} x={textX} y={textY}>
            <Text
              text={stanceData?.symbol || ""}
              anchor={0.5}
              style={symbolTextStyle(stance)}
            />
            <Text
              text={stanceData?.name.korean || ""}
              anchor={[0.5, -0.5]} // Position below the symbol
              style={labelTextStyle(stance)}
            />
          </Container>
        );
      })}
    </Container>
  );
};

export const TrigramWheelWithBackground: React.FC<TrigramWheelProps> = (
  props
) => {
  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.7);
      g.drawCircle(props.x ?? 0, props.y ?? 0, RADIUS + 20);
      g.endFill();
    },
    [props.x, props.y]
  );

  return (
    <Container x={props.x} y={props.y}>
      <Graphics draw={drawBackground} />
      <TrigramWheel {...props} />
    </Container>
  );
};
