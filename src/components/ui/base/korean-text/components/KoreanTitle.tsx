import React from "react";
import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanTitleProps } from "../types";
import { KOREAN_TEXT_SIZES, KOREAN_FONT_FAMILIES } from "../constants";
import { KOREAN_COLORS } from "../../../../types";

export function KoreanTitle({
  korean,
  english,
  subtitle,
  level = 1,
  size = "large",
  color = KOREAN_COLORS.GOLD,
  align = "center",
  style,
  ...props
}: KoreanTitleProps): React.ReactElement {
  const fontSize =
    typeof size === "number"
      ? size
      : KOREAN_TEXT_SIZES[size] || KOREAN_TEXT_SIZES.large;

  const adjustedFontSize = fontSize * (2 - (level - 1) * 0.2);

  const titleStyle = new PIXI.TextStyle({
    fontFamily: KOREAN_FONT_FAMILIES.PRIMARY,
    fontSize: adjustedFontSize,
    fill: color,
    fontWeight: "bold",
    align: align,
    wordWrap: true,
    wordWrapWidth: 600,
  });

  const subtitleStyle = new PIXI.TextStyle({
    fontFamily: KOREAN_FONT_FAMILIES.PRIMARY,
    fontSize: adjustedFontSize * 0.7,
    fill: color,
    fontWeight: "normal",
    align: align,
    wordWrap: true,
    wordWrapWidth: 600,
  });

  const HeaderTag =
    level === 1
      ? "h1"
      : level === 2
      ? "h2"
      : level === 3
      ? "h3"
      : level === 4
      ? "h4"
      : level === 5
      ? "h5"
      : "h6";

  return (
    <div style={style} {...props}>
      <Text text={korean} style={titleStyle} anchor={{ x: 0.5, y: 0.5 }} />
      {english && (
        <Text
          text={english}
          style={subtitleStyle}
          anchor={{ x: 0.5, y: 0.5 }}
          y={adjustedFontSize * 0.8}
        />
      )}
      {subtitle && (
        <Text
          text={subtitle}
          style={subtitleStyle}
          anchor={{ x: 0.5, y: 0.5 }}
          y={adjustedFontSize * 1.4}
        />
      )}
    </div>
  );
}
