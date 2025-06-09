import React, { useMemo } from "react";
import { Container, Text } from "@pixi/react"; // Fix: Remove unused Graphics import
import * as PIXI from "pixi.js";
import type { KoreanHeaderProps } from "../../types/components";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

export const KoreanHeader: React.FC<KoreanHeaderProps> = ({
  title,
  subtitle,
  // Note: size, alignment, height can be used for future styling
  fontSize = FONT_SIZES.xlarge,
  textColor = KOREAN_COLORS.TEXT_PRIMARY,
  accentColor = KOREAN_COLORS.PRIMARY_CYAN,
  showUnderline = true,
  align = "center",
  width = 400,
  x = 0,
  y = 0,
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize,
        fill: textColor,
        fontWeight: "bold",
        align,
        stroke: KOREAN_COLORS.BLACK_SOLID,
        // strokeThickness: 2, // Remove this line to fix PIXI error
      }),
    [fontSize, textColor, align]
  );

  const subtitleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: fontSize * 0.6,
        fill: accentColor,
        align,
      }),
    [fontSize, accentColor, align]
  );

  const underlineStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontSize: fontSize * 0.3,
        fill: accentColor,
        align,
      }),
    [fontSize, accentColor, align]
  );

  const getDisplayText = (text: typeof title) => {
    if (typeof text === "string") return text;
    return `${text.korean} (${text.english})`;
  };

  // Create underline text safely
  const createUnderlineText = () => {
    const underlineChar = "━";
    const repeatCount = Math.floor(width / (fontSize * 0.6));
    return underlineChar.repeat(Math.max(1, repeatCount));
  };

  return (
    <Container x={x} y={y}>
      <Text
        text={getDisplayText(title)}
        style={titleStyle}
        anchor={align === "center" ? 0.5 : align === "right" ? 1 : 0}
      />

      {subtitle && (
        <Text
          text={getDisplayText(subtitle)}
          y={fontSize + 10}
          style={subtitleStyle}
          anchor={align === "center" ? 0.5 : align === "right" ? 1 : 0}
        />
      )}

      {showUnderline && (
        <Text
          text={createUnderlineText()}
          y={
            fontSize +
            (subtitle ? fontSize * 0.6 + 20 : 20) +
            (align === "center" ? -fontSize * 0.3 : 0)
          }
          style={underlineStyle}
          anchor={align === "center" ? 0.5 : align === "right" ? 1 : 0}
        />
      )}
    </Container>
  );
};

export default KoreanHeader;
