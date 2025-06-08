import React from "react";
import { Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  TRIGRAM_DATA,
} from "../../../types/constants";
import { BaseButton } from "../../ui/base/BaseButton";

export interface PhilosophySectionProps {
  onBack?: () => void;
  width?: number;
  height?: number;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  onBack,
  width = 800,
  height = 600,
}) => {
  const philosophyStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY,
    fontSize: FONT_SIZES.large,
    fill: KOREAN_COLORS.TEXT_PRIMARY,
    align: "center",
    wordWrap: true,
    wordWrapWidth: width - 100,
  });

  return (
    <Container width={width} height={height}>
      {/* Background */}
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.95);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />

      {/* Back Button */}
      {onBack && (
        <BaseButton
          text="뒤로 (Back)"
          onClick={onBack}
          x={20}
          y={20}
          width={120}
          height={40}
          variant="secondary"
        />
      )}

      {/* Philosophy Content */}
      <Text
        text="팔괘의 지혜 (Wisdom of Eight Trigrams)"
        style={{
          ...philosophyStyle,
          fontSize: FONT_SIZES.title,
          fill: KOREAN_COLORS.ACCENT_GOLD,
        }}
        anchor={0.5}
        x={width / 2}
        y={100}
      />

      <Text
        text="흑괘는 전통 한국 무술의 정신과 현대 기술의 융합입니다.\n팔괘의 원리로 몸과 마음을 단련하고 70개 급소를 통한 정밀한 격투를 익힙니다."
        style={philosophyStyle}
        anchor={0.5}
        x={width / 2}
        y={200}
      />

      {/* Trigram Symbols */}
      <Container x={width / 2 - 200} y={300}>
        {Object.entries(TRIGRAM_DATA)
          .slice(0, 4)
          .map(([key, data], index) => (
            <Container key={key} x={index * 100} y={0}>
              <Text
                text={data.symbol}
                style={{
                  ...philosophyStyle,
                  fontSize: FONT_SIZES.xxlarge,
                  fill: data.theme?.primary || KOREAN_COLORS.ACCENT_PRIMARY,
                }}
                anchor={0.5}
                x={50}
                y={0}
              />
              <Text
                text={data.name.korean}
                style={{
                  ...philosophyStyle,
                  fontSize: FONT_SIZES.small,
                }}
                anchor={0.5}
                x={50}
                y={50}
              />
            </Container>
          ))}
      </Container>

      <Container x={width / 2 - 200} y={400}>
        {Object.entries(TRIGRAM_DATA)
          .slice(4, 8)
          .map(([key, data], index) => (
            <Container key={key} x={index * 100} y={0}>
              <Text
                text={data.symbol}
                style={{
                  ...philosophyStyle,
                  fontSize: FONT_SIZES.xxlarge,
                  fill: data.theme?.primary || KOREAN_COLORS.ACCENT_PRIMARY,
                }}
                anchor={0.5}
                x={50}
                y={0}
              />
              <Text
                text={data.name.korean}
                style={{
                  ...philosophyStyle,
                  fontSize: FONT_SIZES.small,
                }}
                anchor={0.5}
                x={50}
                y={50}
              />
            </Container>
          ))}
      </Container>
    </Container>
  );
};

export default PhilosophySection;
