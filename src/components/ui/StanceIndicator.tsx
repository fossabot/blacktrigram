import React, { useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { StanceIndicatorProps } from "../../types";
import {
  TRIGRAM_DATA,
  KOREAN_COLORS,
  FONT_FAMILY,
  PIXI_FONT_WEIGHTS,
} from "../../types/constants";

export const StanceIndicator: React.FC<StanceIndicatorProps> = ({
  stance,
  x = 0,
  y = 0,
  size = 50,
  showLabel = false,
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
        fontFamily: FONT_FAMILY.PRIMARY, // Or a specific symbol font
        fontSize: size * 0.6,
        fill: stanceData?.theme?.text || KOREAN_COLORS.TEXT_PRIMARY, // Ensure theme.text exists
        align: "center",
        fontWeight: PIXI_FONT_WEIGHTS.bold,
      }),
    [size, stanceData]
  );

  const labelTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.SECONDARY,
        fontSize: size * 0.25,
        fill: stanceData?.theme?.text || KOREAN_COLORS.TEXT_SECONDARY, // Ensure theme.text exists
        align: "center",
      }),
    [size, stanceData]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawIndicator} />
      <Text
        text={stanceData?.symbol || "?"}
        anchor={0.5}
        x={size / 2}
        y={size / 2}
        style={symbolTextStyle}
      />
      {showLabel && (
        <Text
          text={stanceData?.name.korean || stance.toString()} // Using stance prop for label
          anchor={0.5}
          x={size / 2}
          y={size + size * 0.15} // Position label below the indicator
          style={labelTextStyle}
        />
      )}
    </Container>
  );
};

export default StanceIndicator;
