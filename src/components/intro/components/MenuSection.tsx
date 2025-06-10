import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { BaseButton } from "../../ui/base/BaseButton";
import { KoreanHeader } from "../../ui/base/KoreanHeader";
import type { MenuSectionProps } from "../../../types/components";

export const MenuSection: React.FC<MenuSectionProps> = ({
  selectedMode,
  onModeSelect,
  onStartGame,
  onShowPhilosophy,
  onShowControls,
  width = 800,
  height = 600,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="menu-section">
      <KoreanHeader
        title={{ korean: "흑괘", english: "Black Trigram" }}
        subtitle={{
          korean: "한국 무술 시뮬레이터",
          english: "Korean Martial Arts Simulator",
        }}
        x={width / 2}
        y={80}
      />

      {/* Menu Buttons */}
      <pixiContainer x={width / 2} y={height / 2}>
        <BaseButton
          text="대결 모드"
          koreanText="VERSUS MODE"
          onClick={() => {
            onModeSelect("versus" as any);
            onStartGame();
          }}
          x={-100}
          y={-60}
          width={200}
          height={50}
          variant={selectedMode === "versus" ? "primary" : "secondary"}
        />

        <BaseButton
          text="훈련 모드"
          koreanText="TRAINING MODE"
          onClick={() => {
            onModeSelect("training" as any);
            onStartGame();
          }}
          x={-100}
          y={0}
          width={200}
          height={50}
          variant={selectedMode === "training" ? "primary" : "secondary"}
        />

        <BaseButton
          text="철학"
          koreanText="PHILOSOPHY"
          onClick={onShowPhilosophy}
          x={-100}
          y={60}
          width={200}
          height={50}
          variant="ghost"
        />

        <BaseButton
          text="조작법"
          koreanText="CONTROLS"
          onClick={onShowControls}
          x={-100}
          y={120}
          width={200}
          height={50}
          variant="ghost"
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default MenuSection;
