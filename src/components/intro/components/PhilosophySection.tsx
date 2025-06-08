import React from "react";
import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  KOREAN_COLORS,
  FONT_FAMILY, // Use FONT_FAMILY instead of KOREAN_FONT_FAMILY
  FONT_SIZES,
} from "../../../types/constants";

export interface PhilosophySectionProps {
  onGamePhaseChange?: (phase: string) => void;
  width?: number;
  height?: number;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  width = 800,
  height = 600,
}) => {
  const philosophyTextStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY, // Fix: use FONT_FAMILY.PRIMARY
    fontSize: FONT_SIZES.large,
    fill: KOREAN_COLORS.TEXT_PRIMARY,
    align: "center",
    stroke: KOREAN_COLORS.BLACK_SOLID,
    // strokeThickness: 2, // Remove: deprecated in PixiJS v7+
    wordWrap: true,
    wordWrapWidth: width - 100,
  });

  return (
    <Container width={width} height={height}>
      <Text
        text="흑괘의 철학 (Philosophy of Black Trigram)"
        style={philosophyTextStyle}
        anchor={0.5}
        x={width / 2}
        y={height / 3}
      />
      <Text
        text="전통 한국 무술과 현대 기술의 융합"
        style={philosophyTextStyle}
        anchor={0.5}
        x={width / 2}
        y={height / 2}
      />
    </Container>
  );
};

export default PhilosophySection;
