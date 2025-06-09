import React, { useMemo } from "react";
import { Container, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import { BaseButton } from "../../ui/base/BaseButton";
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
  readonly x?: number;
  readonly y?: number;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
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

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />

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
        align="center" // Fix: Use align instead of alignment
      />

      {/* Game Mode Selection */}
      <Container x={width / 2 - 150} y={250}>
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
      </Container>

      {/* Action Buttons */}
      <Container x={width / 2 - 100} y={500}>
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
      </Container>
    </Container>
  );
};

export default MenuSection;
