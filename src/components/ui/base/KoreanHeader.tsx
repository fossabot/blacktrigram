import React, { useMemo } from "react";
import { Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanText } from "../../../types/korean-text";
import {
  FONT_SIZES,
  KOREAN_COLORS,
  FONT_FAMILY,
} from "../../../types/constants";

export interface KoreanHeaderProps {
  readonly title: KoreanText;
  readonly subtitle?: KoreanText;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly fontSize?: number;
  readonly textColor?: number;
  readonly accentColor?: number;
  readonly showUnderline?: boolean;
  readonly align?: "left" | "center" | "right";
}

export const KoreanHeader: React.FC<KoreanHeaderProps> = ({
  title,
  subtitle,
  x = 0,
  y = 0,
  fontSize = FONT_SIZES.xlarge,
  textColor = KOREAN_COLORS.TEXT_PRIMARY,
  accentColor = KOREAN_COLORS.PRIMARY_CYAN,
  showUnderline = true,
  align = "center",
}) => {
  const getDisplayText = (text: KoreanText): string => {
    return `${text.korean} (${text.english})`;
  };

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize,
        fill: accentColor,
        fontWeight: "bold" as PIXI.TextStyleFontWeight,
        align,
        stroke: KOREAN_COLORS.BLACK_SOLID,
      }),
    [fontSize, accentColor, align]
  );

  const subtitleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: fontSize * 0.7,
        fill: textColor,
        fontWeight: "normal" as PIXI.TextStyleFontWeight,
        align,
      }),
    [fontSize, textColor, align]
  );

  const underlineStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: 2,
        fill: accentColor,
      }),
    [accentColor]
  );

  const createUnderlineText = (): string => {
    return "━".repeat(20);
  };

  return (
    <>
      <Text
        text={getDisplayText(title)}
        x={x}
        y={y}
        style={titleStyle}
        anchor={align === "center" ? 0.5 : align === "right" ? 1 : 0}
      />

      {subtitle && (
        <Text
          text={getDisplayText(subtitle)}
          x={x}
          y={y + fontSize + 10}
          style={subtitleStyle}
          anchor={align === "center" ? 0.5 : align === "right" ? 1 : 0}
        />
      )}

      {showUnderline && (
        <Text
          text={createUnderlineText()}
          x={x}
          y={y + fontSize + (subtitle ? fontSize * 0.6 + 20 : 20)}
          style={underlineStyle}
          anchor={align === "center" ? 0.5 : align === "right" ? 1 : 0}
        />
      )}
    </>
  );
};

export default KoreanHeader;
