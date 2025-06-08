import React from "react";
import { Text } from "@pixi/react";
import type { KoreanText } from "../../../../types/korean-text";
import {
  createKoreanTextStyle,
  getDisplayText,
  type KoreanPixiTextProps,
} from "./KoreanPixiTextUtils";

// Korean Pixi Text Component
export const KoreanPixiText: React.FC<KoreanPixiTextProps> = ({
  text,
  style,
  x = 0,
  y = 0,
  anchor = 0,
}) => {
  const displayText = getDisplayText(text);
  const textStyle = style || createKoreanTextStyle();

  return (
    <Text text={displayText} style={textStyle} x={x} y={y} anchor={anchor} />
  );
};

export default KoreanPixiText;
