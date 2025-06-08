import React, { useMemo } from "react";
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

  const controlStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.MONO,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "left",
      }),
    []
  );

  const descriptionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
        align: "left",
      }),
    []
  );

  const buttonStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

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

      {/* Header */}
      <Text
        text="조작법 (Controls)"
        anchor={0.5}
        x={width / 2}
        y={50}
        style={headerStyle}
      />

      {/* Controls Content */}
      <Container x={50} y={100}>
        {/* Stance Controls */}
        <Text text="팔괘 자세 (Trigram Stances)" style={sectionStyle} y={0} />

        <Container y={30}>
          {Object.entries(COMBAT_CONTROLS.stanceControls).map(
            ([key, data], index) => (
              <Container key={key} y={index * 25}>
                <Text text={`${key} 키:`} style={controlStyle} x={0} />
                <Text
                  text={`${data.korean} - ${data.technique}`}
                  style={descriptionStyle}
                  x={80}
                />
              </Container>
            )
          )}
        </Container>

        {/* Movement */}
        <Text text="이동 (Movement)" style={sectionStyle} y={240} />

        <Container y={270}>
          <Text
            text="WASD 키: 전술적 위치 선정 및 발놀림"
            style={descriptionStyle}
            y={0}
          />
          <Text
            text="화살표 키: 대체 이동 시스템"
            style={descriptionStyle}
            y={25}
          />
        </Container>

        {/* Combat Actions */}
        <Text text="전투 액션 (Combat Actions)" style={sectionStyle} y={330} />

        <Container y={360}>
          <Text
            text="SPACE: 현재 자세 기술 실행"
            style={descriptionStyle}
            y={0}
          />
          <Text
            text="SHIFT: 방어 자세/막기 위치"
            style={descriptionStyle}
            y={25}
          />
          <Text
            text="CTRL: 정밀 급소 타격 모드"
            style={descriptionStyle}
            y={50}
          />
          <Text
            text="TAB: 플레이어 원형 순환"
            style={descriptionStyle}
            y={75}
          />
        </Container>

        {/* System Controls */}
        <Text text="시스템 (System)" style={sectionStyle} y={460} />

        <Container y={490}>
          <Text
            text="ESC: 일시정지 메뉴 / 인트로로 돌아가기"
            style={descriptionStyle}
            y={0}
          />
          <Text
            text="F1: 도움말 / 조작법 가이드"
            style={descriptionStyle}
            y={25}
          />
          <Text
            text="M: 음소거 / 오디오 설정"
            style={descriptionStyle}
            y={50}
          />
        </Container>
      </Container>

      {/* Back Button */}
      <Container
        x={50}
        y={height - 80}
        interactive
        buttonMode
        pointertap={onBack}
      >
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
            g.lineStyle(2, KOREAN_COLORS.UI_BORDER);
            g.drawRoundedRect(0, 0, 120, 40, 8);
            g.endFill();
          }}
        />
        <Text
          text="뒤로 (Back)"
          anchor={0.5}
          x={60}
          y={20}
          style={buttonStyle}
        />
      </Container>
    </Container>
  );
};

export default ControlsSection;
