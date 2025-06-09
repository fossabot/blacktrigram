import React, { useMemo } from "react";
import { Container, Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { BaseButton } from "../../ui/base/BaseButton";
import { KoreanHeader } from "../../ui/base/KoreanHeader";
import { KOREAN_COLORS, COMBAT_CONTROLS } from "../../../types/constants";

export interface ControlsSectionProps {
  readonly onBack: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  onBack,
  width = 800,
  height = 600,
  x = 0,
  y = 0,
}) => {
  const backgroundDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();
    },
    [width, height]
  );

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 16,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        wordWrap: true,
        wordWrapWidth: width - 100,
      }),
    [width]
  );

  const headerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 20,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: "bold",
      }),
    []
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />

      {/* Header */}
      <KoreanHeader
        title={{
          korean: "조작법",
          english: "Controls",
        }}
        subtitle={{
          korean: "흑괘 무술 조작 가이드",
          english: "Black Trigram Martial Arts Control Guide",
        }}
        x={width / 2}
        y={60}
        fontSize={24}
        align="center"
      />

      {/* Stance Controls */}
      <Container x={50} y={140}>
        <Text text="팔괘 자세 (Trigram Stances)" style={headerStyle} />
        <Container y={40}>
          {Object.entries(COMBAT_CONTROLS.stanceControls).map(
            ([key, data], index) => (
              <Container key={key} y={index * 25}>
                <Text
                  text={`${key}: ${data.korean} (${data.stance}) - ${data.technique}`}
                  style={textStyle}
                />
              </Container>
            )
          )}
        </Container>
      </Container>

      {/* Combat Controls */}
      <Container x={50} y={360}>
        <Text text="전투 조작 (Combat Controls)" style={headerStyle} />
        <Container y={40}>
          {Object.entries(COMBAT_CONTROLS.combat).map(
            ([key, description], index) => (
              <Container key={key} y={index * 25}>
                <Text text={`${key}: ${description}`} style={textStyle} />
              </Container>
            )
          )}
        </Container>
      </Container>

      {/* Movement Controls */}
      <Container x={400} y={360}>
        <Text text="이동 조작 (Movement)" style={headerStyle} />
        <Container y={40}>
          {Object.entries(COMBAT_CONTROLS.movement).map(
            ([key, description], index) => (
              <Container key={key} y={index * 25}>
                <Text text={`${key}: ${description}`} style={textStyle} />
              </Container>
            )
          )}
        </Container>
      </Container>

      {/* Back Button */}
      <BaseButton
        text="돌아가기 (Back)"
        onClick={onBack}
        x={50}
        y={height - 80}
        width={150}
        height={50}
        variant="secondary"
      />
    </Container>
  );
};

export default ControlsSection;
