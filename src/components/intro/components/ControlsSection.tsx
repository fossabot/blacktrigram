import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { ControlsSectionProps } from "../../../types/components";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
  COMBAT_CONTROLS,
} from "../../../types/constants";

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT * 0.5,
  ...props
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight, // Fix: use number value
        align: "center",
      }),
    []
  );

  const controlStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight, // Fix: use number value
        align: "left",
      }),
    []
  );

  const controlsDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
      g.drawRoundedRect(0, 0, width - 40, height - 40, 10);
      g.endFill();

      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.6);
      g.drawRoundedRect(0, 0, width - 40, height - 40, 10);
    },
    [width, height]
  );

  return (
    <Container {...props} width={width} height={height}>
      <Container x={20} y={20}>
        <Graphics draw={controlsDraw} />

        <Container x={30} y={30}>
          <Text text="Controls / 조작법" style={titleStyle} />

          <Container y={60}>
            {Object.entries(COMBAT_CONTROLS.stanceControls).map(
              ([key, control], index) => (
                <Container key={key} y={index * 25}>
                  <Text
                    text={`${key}: ${control.korean} (${control.technique})`}
                    style={controlStyle}
                  />
                </Container>
              )
            )}
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ControlsSection;
