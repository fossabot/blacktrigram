import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { StanceIndicatorProps } from "../../types";
import { TrigramStance } from "../../types/enums";
import {
  TRIGRAM_DATA,
  KOREAN_COLORS,
  FONT_FAMILY, // Added import
  FONT_SIZES, // Added import
} from "../../types/constants";

export const StanceIndicator: React.FC<StanceIndicatorProps> = ({
  stance,
  x = 0,
  y = 0,
  size = 50,
}) => {
  const stanceData = TRIGRAM_DATA[stance];

  const drawIndicator = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      const baseColor = stanceData?.theme?.primary || KOREAN_COLORS.UI_BORDER;

      // Outer ring
      g.lineStyle(3, baseColor, 0.8);
      g.drawCircle(size / 2, size / 2, size / 2 - 2);

      // Inner fill if active or specific style
      if (stanceData?.theme?.active) {
        g.beginFill(stanceData.theme.active, 0.3);
        g.drawCircle(size / 2, size / 2, size / 2 - 5);
        g.endFill();
      }
    },
    [stance, size, stanceData]
  );

  const symbolTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY, // Ensure FONT_FAMILY is imported
        fontSize: FONT_SIZES.large, // Ensure FONT_SIZES is imported
        fill: stanceData?.theme?.text || KOREAN_COLORS.TEXT_PRIMARY, // Ensure theme.text exists or use a fallback
        align: "center",
      }),
    [size, stanceData]
  );

  const nameTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY, // Ensure FONT_FAMILY is imported
        fontSize: FONT_SIZES.small, // Ensure FONT_SIZES is imported
        fill: stanceData?.theme?.text || KOREAN_COLORS.TEXT_SECONDARY, // Ensure theme.text exists or use a fallback
        align: "center",
      }),
    [size, stanceData]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawIndicator} />

      <Text
        text={stanceData?.symbol || "☰"}
        style={symbolTextStyle}
        x={size / 2}
        y={size / 2}
        anchor={0.5}
      />

      {showLabel && (
        <Text
          text={stanceData?.name.korean || currentStance}
          style={nameTextStyle}
          x={size / 2}
          y={size + 10}
          anchor={0.5}
        />
      )}
    </Container>
  );
};

export default StanceIndicator;
