import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
  COMBAT_CONTROLS,
} from "../../../types/constants";

interface ControlsSectionProps {
  readonly width?: number;
  readonly height?: number;
  readonly onBack?: () => void;
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  onBack,
}) => {
  const headerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const sectionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.ACCENT_CYAN,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "left",
      }),
    []
  );

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Section dividers
      g.lineStyle(1, KOREAN_COLORS.UI_BORDER, 0.3);
      g.moveTo(50, 80);
      g.lineTo(width - 50, 80);
    },
    [width, height]
  );

  return (
    <Container>
      <Graphics draw={backgroundDraw} />

      <Text
        text="조작법 (Controls)"
        style={headerStyle}
        x={width / 2}
        y={30}
        anchor={0.5}
      />

      <Container x={100} y={120}>
        <Text text="팔괘 자세 (Trigram Stances)" style={sectionStyle} y={0} />

        {Object.entries(COMBAT_CONTROLS.stanceControls).map(
          ([key, control], index) => (
            <Text
              key={key}
              text={`${key}: ${control.korean} (${control.technique})`}
              style={
                new PIXI.TextStyle({
                  fontFamily: FONT_FAMILY.MONO,
                  fontSize: FONT_SIZES.medium,
                  fill: KOREAN_COLORS.TEXT_SECONDARY,
                })
              }
              y={40 + index * 25}
            />
          )
        )}
      </Container>

      {onBack && (
        <Container
          x={width / 2}
          y={height - 100}
          interactive={true}
          buttonMode={true}
          pointertap={onBack}
        >
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.ACCENT_PRIMARY, 0.8);
              g.drawRoundedRect(-75, -25, 150, 50, 10);
              g.endFill();
            }}
          />
          <Text text="뒤로 (Back)" anchor={0.5} style={sectionStyle} />
        </Container>
      )}
    </Container>
  );
};

export default ControlsSection;
