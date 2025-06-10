import React, { useMemo } from "react";
import * as PIXI from "pixi.js";
import { BaseButton } from "../../ui/base/BaseButton";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { KoreanHeader } from "../../ui/base/KoreanHeader";
import { KOREAN_COLORS, GAME_CONFIG } from "../../../types/constants";
import { GameMode } from "../../../types/enums";

export interface MenuSectionProps {
  readonly selectedMode: any;
  readonly onModeSelect: (mode: any) => void;
  readonly onStartGame: () => void;
  readonly onShowPhilosophy: () => void;
  readonly onShowControls: () => void;
  readonly width?: number;
  readonly height?: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  // Ensure PixiJS components are extended
  usePixiExtensions();

  const drawBackground = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();
    },
    [width, height]
  );

  return (
    <pixiContainer x={100} y={100} data-testid="menu-section">
      <pixiGraphics draw={drawBackground} />

      {/* Header */}
      <KoreanHeader
        title={{
          korean: "흑괘 무술 도장",
          english: "Black Trigram Martial Arts",
        }}
        subtitle={{
          korean: "전통 한국 무술의 정수",
          english: "The Essence of Traditional Korean Martial Arts",
        }}
        x={width / 2}
        y={60}
        fontSize={24}
        align="center"
      />

      {/* Game Mode Selection */}
      <pixiContainer x={width / 2 - 150} y={250}>
        <BaseButton
          text="대전 (Versus)"
          onClick={() => onModeSelect(GameMode.VERSUS)}
          width={300}
          height={60}
          variant={selectedMode === GameMode.VERSUS ? "primary" : "secondary"}
          y={0}
        />

        <BaseButton
          text="훈련 (Training)"
          onClick={() => onModeSelect(GameMode.TRAINING)}
          width={300}
          height={60}
          variant={selectedMode === GameMode.TRAINING ? "primary" : "secondary"}
          y={80}
        />

        <BaseButton
          text="연습 (Practice)"
          onClick={() => onModeSelect(GameMode.PRACTICE)}
          width={300}
          height={60}
          variant={selectedMode === GameMode.PRACTICE ? "primary" : "secondary"}
          y={160}
        />
      </pixiContainer>

      {/* Action Buttons */}
      <pixiContainer x={width / 2 - 100} y={500}>
        <BaseButton
          text="게임 시작"
          onClick={onStartGame}
          width={200}
          height={50}
          variant="accent"
          y={0}
        />

        <BaseButton
          text="철학 (Philosophy)"
          onClick={onShowPhilosophy}
          width={200}
          height={50}
          variant="ghost"
          y={70}
        />

        <BaseButton
          text="조작법 (Controls)"
          onClick={onShowControls}
          width={200}
          height={50}
          variant="ghost"
          y={140}
        />
      </pixiContainer>

      {/* 시작 버튼 - Start Combat */}
      <BaseButton
        x={50}
        y={150}
        width={300}
        height={60}
        text="Start Combat"
        koreanText="전투 시작"
        onClick={onStartGame}
        variant="primary"
        testId="start-combat-button"
      />

      {/* 훈련 버튼 - Training Mode */}
      <BaseButton
        x={50}
        y={230}
        width={300}
        height={60}
        text="Training Mode"
        koreanText="훈련 모드"
        onClick={onShowControls}
        variant="secondary"
        testId="training-mode-button"
      />

      {/* 아케타입 선택 - Archetype Selection */}
      <BaseButton
        x={50}
        y={310}
        width={300}
        height={60}
        text="Select Archetype"
        koreanText="형태 선택"
        onClick={() => console.log("Archetype selection not implemented")}
        variant="accent"
        testId="archetype-select-button"
      />
    </pixiContainer>
  );
};

export default MenuSection;
