import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { GameMode } from "../../../types/enums";
import type { MenuSectionProps } from "../../../types/components"; // Fix: Import MenuSectionProps
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
  GAME_CONFIG,
} from "../../../types/constants";
import { BaseButton } from "../../ui/base/BaseButton"; // Fix: Add missing import

export const MenuSection: React.FC<MenuSectionProps> = ({
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  selectedMode,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        dropShadow: {
          color: KOREAN_COLORS.ACCENT_CYAN,
          blur: 8,
          angle: Math.PI / 6,
          distance: 3,
        },
      }),
    []
  );

  const subtitleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        fontWeight: FONT_WEIGHTS.regular.toString() as PIXI.TextStyleFontWeight,
        align: "center",
      }),
    []
  );

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Title background
      g.beginFill(KOREAN_COLORS.ACCENT_PRIMARY, 0.1);
      g.drawRoundedRect(50, 20, width - 100, 80, 10);
      g.endFill();
    },
    [width, height]
  );

  const handleModeSelect = useCallback(
    (mode: GameMode) => {
      onModeSelect?.(mode); // Fix: Safe call with optional chaining
    },
    [onModeSelect]
  );

  const handleStartClick = useCallback(() => {
    onStartGame?.(); // Fix: Safe call with optional chaining
  }, [onStartGame]);

  const handlePhilosophyClick = useCallback(() => {
    onShowPhilosophy?.(); // Fix: Safe call with optional chaining
  }, [onShowPhilosophy]);

  const handleControlsClick = useCallback(() => {
    onShowControls?.(); // Fix: Safe call with optional chaining
  }, [onShowControls]);

  return (
    <Container width={width} height={height}>
      <Graphics draw={backgroundDraw} />

      {/* Main Title */}
      <Text
        text="흑괘 (Black Trigram)"
        style={titleStyle}
        x={width / 2}
        y={100}
        anchor={0.5}
      />

      <Text
        text="Korean Martial Arts Combat Simulator"
        style={subtitleStyle}
        x={width / 2}
        y={160}
        anchor={0.5}
      />

      {/* Game Mode Selection */}
      <Container x={width / 2} y={240}>
        <Text
          text="게임 모드 선택 (Select Game Mode)"
          style={{
            ...subtitleStyle,
            fontSize: FONT_SIZES.medium,
          }}
          anchor={0.5}
          y={0}
        />

        {/* Mode Buttons */}
        <Container y={40}>
          {Object.values(GameMode).map((mode, index) => {
            const modeKey = `mode-${mode}-${index}`;
            const modeText =
              mode === GameMode.VERSUS
                ? "대련 (Versus)"
                : mode === GameMode.TRAINING
                ? "수련 (Training)"
                : mode === GameMode.STORY
                ? "이야기 (Story)"
                : String(mode);

            return (
              <BaseButton
                key={modeKey}
                text={modeText}
                onClick={() => handleModeSelect(mode)} // Fix: Use safe callback
                x={-300 + index * 200}
                y={0}
                width={180}
                height={50}
                variant={selectedMode === mode ? "accent" : "secondary"}
              />
            );
          })}
        </Container>
      </Container>

      {/* Menu Buttons */}
      <Container x={width / 2} y={height - 200}>
        <BaseButton
          text="게임 시작 (Start Game)"
          onClick={handleStartClick} // Fix: Use safe callback
          x={-100}
          y={0}
          width={200}
          height={60}
          variant="primary"
        />

        <BaseButton
          text="철학 (Philosophy)"
          onClick={handlePhilosophyClick} // Fix: Use safe callback
          x={-100}
          y={80}
          width={200}
          height={50}
          variant="secondary"
        />

        <BaseButton
          text="조작법 (Controls)"
          onClick={handleControlsClick} // Fix: Use safe callback
          x={-100}
          y={140}
          width={200}
          height={50}
          variant="secondary"
        />
      </Container>
    </Container>
  );
};

export default MenuSection;
