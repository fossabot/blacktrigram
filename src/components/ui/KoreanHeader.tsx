import React, { useMemo } from "react";
import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { KoreanHeaderProps } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
} from "../../types/constants";

export const KoreanHeader: React.FC<KoreanHeaderProps> = ({
  text,
  variant = "primary",
  size = "large",
  x = 0,
  y = 0,
  anchor = 0.5,
  ...props
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: size === "large" ? FONT_SIZES.xlarge : FONT_SIZES.large,
        fill:
          variant === "primary"
            ? KOREAN_COLORS.TEXT_PRIMARY
            : KOREAN_COLORS.ACCENT_PRIMARY,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        stroke: { color: KOREAN_COLORS.BLACK_SOLID, width: 2 },
        dropShadow: {
          color: KOREAN_COLORS.BLACK_SOLID,
          blur: 3,
          distance: 2,
        },
      }),
    [variant, size]
  );

  return (
    <Container x={x} y={y} {...props}>
      <Text text={text.korean} anchor={anchor} style={titleStyle} />
      <Text
        text={text.english}
        anchor={anchor}
        y={30}
        style={{
          ...titleStyle,
          fontSize: FONT_SIZES.medium,
          fill: KOREAN_COLORS.TEXT_SECONDARY,
        }}
      />
    </Container>
  );
};

export default KoreanHeader;
