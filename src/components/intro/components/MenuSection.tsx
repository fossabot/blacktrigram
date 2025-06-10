import React from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { BaseButton } from "../../ui/base/BaseButton";
import { KOREAN_COLORS } from "../../../types/constants";
import { GameMode } from "../../../types/enums";

export interface MenuSectionProps {
  readonly selectedMode: GameMode;
  readonly onModeSelect: (mode: GameMode) => void;
  readonly onStartGame: () => void;
  readonly onShowPhilosophy: () => void;
  readonly onShowControls: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  width = 1200,
  height = 600,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer
      x={x}
      y={y}
      width={width}
      height={height}
      data-testid="menu-section"
    >
      {/* Game Mode Selection */}
      <pixiContainer x={width / 2 - 200} y={100}>
        <pixiText
          text="게임 모드 선택 (Select Game Mode)"
          style={
            new PIXI.TextStyle({
              fontSize: 20,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
            })
          }
          anchor={0.5}
          x={200}
          y={0}
        />

        <BaseButton
          text="대련 (Versus)"
          koreanText="대련"
          onClick={() => onModeSelect(GameMode.VERSUS)}
          variant={selectedMode === GameMode.VERSUS ? "primary" : "secondary"}
          x={50}
          y={50}
          width={150}
          height={50}
        />

        <BaseButton
          text="수련 (Training)"
          koreanText="수련"
          onClick={() => onModeSelect(GameMode.TRAINING)}
          variant={selectedMode === GameMode.TRAINING ? "primary" : "secondary"}
          x={220}
          y={50}
          width={150}
          height={50}
        />

        <BaseButton
          text="게임 시작 (Start Game)"
          koreanText="게임 시작"
          onClick={onStartGame}
          variant="accent"
          x={125}
          y={120}
          width={150}
          height={50}
        />
      </pixiContainer>

      {/* Info Buttons */}
      <pixiContainer x={width / 2 - 150} y={350}>
        <BaseButton
          text="철학 (Philosophy)"
          koreanText="철학"
          onClick={onShowPhilosophy}
          variant="ghost"
          x={0}
          y={0}
          width={120}
          height={40}
        />

        <BaseButton
          text="조작법 (Controls)"
          koreanText="조작법"
          onClick={onShowControls}
          variant="ghost"
          x={180}
          y={0}
          width={120}
          height={40}
        />
      </pixiContainer>

      {/* Archetype Preview */}
      <pixiContainer x={50} y={250}>
        <pixiText
          text="플레이어 유형 (Player Archetypes)"
          style={
            new PIXI.TextStyle({
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              fontWeight: "bold",
            })
          }
          y={0}
        />

        <pixiText
          text="• 무사 (Musa) - 전통 무사의 길"
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            })
          }
          y={30}
        />

        <pixiText
          text="• 암살자 (Amsalja) - 그림자 속의 효율성"
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            })
          }
          y={50}
        />

        <pixiText
          text="• 해커 (Hacker) - 정보를 통한 힘"
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            })
          }
          y={70}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default MenuSection;
