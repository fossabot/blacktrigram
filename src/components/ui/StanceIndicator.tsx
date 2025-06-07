import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { BaseUIComponentProps, TrigramStance } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  TRIGRAM_DATA,
} from "../../types/constants";

interface StanceIndicatorProps extends BaseUIComponentProps {
  readonly stance: TrigramStance;
  readonly size?: number;
  readonly x?: number;
  readonly y?: number;
  readonly interactive?: boolean;
  readonly onStanceSelect?: (stance: TrigramStance) => void;
}

export const StanceIndicator: React.FC<StanceIndicatorProps> = ({
  stance,
  size = 60,
  x = 0,
  y = 0,
  interactive = false,
  onStanceSelect,
  ...props
}) => {
  const stanceData = TRIGRAM_DATA[stance];

  const symbolStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const labelStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        align: "center",
      }),
    []
  );

  const drawBackground = (g: PIXI.Graphics) => {
    g.clear();

    const color =
      stanceData?.theme?.primary || KOREAN_COLORS.UI_BACKGROUND_MEDIUM;
    const borderColor = stanceData?.theme?.secondary || KOREAN_COLORS.UI_BORDER;

    g.beginFill(color, 0.3);
    g.lineStyle(2, borderColor, 0.8);
    g.drawCircle(size / 2, size / 2, size / 2 - 2);
    g.endFill();
  };

  const handleClick = () => {
    if (interactive && onStanceSelect) {
      onStanceSelect(stance);
    }
  };

  return (
    <Container
      x={x}
      y={y}
      interactive={interactive}
      buttonMode={interactive}
      pointertap={handleClick}
      {...props}
    >
      <Graphics draw={drawBackground} />

      <Text
        text={stanceData?.symbol || "☰"}
        anchor={0.5}
        x={size / 2}
        y={size / 2 - 5}
        style={symbolStyle}
      />

      <Text
        text={stanceData?.name.korean || stance}
        anchor={0.5}
        x={size / 2}
        y={size + 5}
        style={labelStyle}
      />
    </Container>
  );
};

export default StanceIndicator;
