import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  COMBAT_CONTROLS,
  FONT_WEIGHTS,
  GAME_CONFIG, // Fix: Now properly exported
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
  const titleStyle = useMemo(
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
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "left",
      }),
    []
  );

  const controlStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
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
        style={titleStyle}
        x={width / 2}
        y={30}
        anchor={0.5}
      />

      <Container x={100} y={120}>
        <Text text="팔괘 자세 (Trigram Stances)" style={sectionStyle} y={0} />

        {/* Stance Controls Display */}
        <Container y={40}>
          {Object.entries(COMBAT_CONTROLS.stanceControls).map(
            ([key, control], index) => (
              <Container key={key} y={index * 30}>
                <Text
                  text={`${key}: ${(control as { korean: string }).korean} (${(
                    control as { stance: string }
                  ).stance.toUpperCase()}) - ${
                    (control as { technique: string }).technique
                  }`}
                  style={controlStyle}
                />
              </Container>
            )
          )}
        </Container>

        {/* Combat Controls */}
        <Container y={280}>
          <Text text="전투 조작 (Combat Controls)" style={sectionStyle} />
          <Container y={40}>
            <Text
              text="SPACE: 기술 실행 (Execute Technique)"
              style={controlStyle}
              y={0}
            />
            <Text
              text="SHIFT: 방어 (Guard/Block)"
              style={controlStyle}
              y={25}
            />
            <Text
              text="CTRL: 급소 조준 (Vital Point Targeting)"
              style={controlStyle}
              y={50}
            />
            <Text
              text="TAB: 캐릭터 변경 (Change Archetype)"
              style={controlStyle}
              y={75}
            />
          </Container>
        </Container>

        {/* System Controls */}
        <Container y={420}>
          <Text text="시스템 조작 (System Controls)" style={sectionStyle} />
          <Container y={40}>
            <Text
              text="ESC: 일시정지/메뉴 (Pause/Menu)"
              style={controlStyle}
              y={0}
            />
            <Text text="F1: 도움말 (Help)" style={controlStyle} y={25} />
            <Text text="M: 음소거 (Mute)" style={controlStyle} y={50} />
          </Container>
        </Container>
      </Container>

      {/* Back Button */}
      {onBack && (
        <Container x={width - 150} y={height - 80}>
          <Graphics
            draw={(g: PIXI.Graphics) => {
              g.clear()
                .lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN)
                .beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8)
                .drawRoundedRect(0, 0, 120, 40, 5)
                .endFill();
            }}
            interactive={true}
            pointerdown={() => onBack()}
          />
          <Text
            text="뒤로 (Back)"
            x={60}
            y={20}
            anchor={0.5}
            style={controlStyle}
          />
        </Container>
      )}
    </Container>
  );
};

// Re-export from the components directory to maintain compatibility
export {
  ControlsSection,
  type ControlsSectionProps,
} from "../components/ControlsSection";
export default ControlsSection;
