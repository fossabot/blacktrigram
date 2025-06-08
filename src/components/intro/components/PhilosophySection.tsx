import React from "react";
import { Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  PLAYER_ARCHETYPES_DATA,
} from "../../../types/constants";
import { BaseButton } from "../../ui/base/BaseButton";

export interface PhilosophySectionProps {
  onBack?: () => void;
  onGamePhaseChange?: (phase: string) => void;
  width?: number;
  height?: number;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  onBack,
  width = 800,
  height = 600,
}) => {
  const titleStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY,
    fontSize: FONT_SIZES.xlarge,
    fill: KOREAN_COLORS.ACCENT_GOLD,
    align: "center",
    fontWeight: "bold",
  });

  const philosophyTextStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY,
    fontSize: FONT_SIZES.medium,
    fill: KOREAN_COLORS.TEXT_PRIMARY,
    align: "center",
    wordWrap: true,
    wordWrapWidth: width - 100,
  });

  const archetypeTextStyle = new PIXI.TextStyle({
    fontFamily: FONT_FAMILY.PRIMARY,
    fontSize: FONT_SIZES.small,
    fill: KOREAN_COLORS.TEXT_SECONDARY,
    align: "center",
    wordWrap: true,
    wordWrapWidth: 180,
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

      {/* Title */}
      <Text
        text="흑괘의 철학 (Philosophy of Black Trigram)"
        style={titleStyle}
        anchor={0.5}
        x={width / 2}
        y={80}
      />

      {/* Philosophy Text */}
      <Text
        text="전통 한국 무술과 현대 기술의 융합\nFusion of Traditional Korean Martial Arts and Modern Technology"
        style={philosophyTextStyle}
        anchor={0.5}
        x={width / 2}
        y={150}
      />

      <Text
        text="팔괘의 정신으로 몸과 마음을 단련하고\n70개 급소를 통한 정밀한 격투술을 익힙니다"
        style={philosophyTextStyle}
        anchor={0.5}
        x={width / 2}
        y={220}
      />

      {/* Player Archetypes */}
      <Text
        text="오대 무사 유형 (Five Warrior Archetypes)"
        style={{
          ...titleStyle,
          fontSize: FONT_SIZES.large,
        }}
        anchor={0.5}
        x={width / 2}
        y={300}
      />

      {/* Archetype Grid */}
      <Container x={50} y={350}>
        {Object.entries(PLAYER_ARCHETYPES_DATA).map(
          ([key, archetype], index) => (
            <Container
              key={key}
              x={(index % 3) * 200}
              y={Math.floor(index / 3) * 120}
            >
              <Graphics
                draw={(g: PIXI.Graphics) => {
                  g.clear();
                  g.beginFill(
                    archetype.colors?.primary || KOREAN_COLORS.ACCENT_PRIMARY,
                    0.3
                  );
                  g.drawRoundedRect(0, 0, 180, 100, 8);
                  g.endFill();
                  g.lineStyle(
                    2,
                    archetype.colors?.primary || KOREAN_COLORS.ACCENT_PRIMARY
                  );
                  g.drawRoundedRect(0, 0, 180, 100, 8);
                }}
              />
              <Text
                text={`${archetype.name.korean}\n(${archetype.name.english})`}
                style={archetypeTextStyle}
                anchor={0.5}
                x={90}
                y={30}
              />
              <Text
                text={archetype.description?.korean || ""}
                style={{
                  ...archetypeTextStyle,
                  fontSize: FONT_SIZES.xsmall,
                }}
                anchor={0.5}
                x={90}
                y={70}
              />
            </Container>
          )
        )}
      </Container>
    </Container>
  );
};

export default PhilosophySection;
