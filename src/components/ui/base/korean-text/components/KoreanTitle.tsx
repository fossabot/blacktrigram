import React from "react";
import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanText } from "../types"; // Fix: Now properly exported
import { KOREAN_COLORS, FONT_SIZES, FONT_FAMILY } from "../constants"; // Fix: Now properly exported

interface KoreanTitleProps {
  readonly text: KoreanText;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
  readonly color?: number;
  readonly x?: number;
  readonly y?: number;
}

export const KoreanTitle: React.FC<KoreanTitleProps> = ({
  text,
  level = 1,
  color = KOREAN_COLORS.TEXT_PRIMARY,
  x = 0,
  y = 0,
}) => {
  const fontSize = FONT_SIZES.title - (level - 1) * 4;

  const titleStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.KOREAN,
    fontSize,
    fill: color,
    fontWeight: "bold",
    align: "center",
  });

  const displayText = typeof text === "string" ? text : text.korean;

  return (
    <Text text={displayText} style={titleStyle} x={x} y={y} anchor={0.5} />
  );
};

export default KoreanTitle;
