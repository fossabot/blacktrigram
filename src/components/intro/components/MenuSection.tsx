import { useState } from "react";
import type { JSX } from "react";
import { BaseButton } from "../../ui/base/BaseButton";
import { KoreanText } from "../../ui/base/KoreanText";
import type { GameMode } from "../../../types";
import { useAudio } from "../../../audio/AudioManager";

interface MenuOption {
  readonly id: GameMode;
  readonly korean: string;
  readonly english: string;
  readonly subtitle: string;
  readonly keyBinding: string;
  readonly action: () => void;
}

export interface MenuSectionProps {
  readonly selectedOption: GameMode;
  readonly onOptionSelect: (option: GameMode) => void;
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

export function MenuSection({
  selectedOption,
  onOptionSelect,
  onStartGame,
  onStartTraining,
}: MenuSectionProps): JSX.Element {
  const audio = useAudio();

  const menuOptions: readonly MenuOption[] = [
    {
      id: "game",
      korean: "⚔️ 대련",
      english: "Sparring",
      subtitle: "🎯 정밀 전투 (Precision Combat)",
      keyBinding: "[1]",
      action: onStartGame,
    },
    {
      id: "training",
      korean: "🏃 수련",
      english: "Training",
      subtitle: "🧘 기술 연마 (Skill Development)",
      keyBinding: "[2] [Alt]",
      action: onStartTraining,
    },
  ] as const;

  return (
    <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2 + 180}>
      {menuOptions.map((option, index) => {
        const xOffset = (index - 0.5) * 300;
        const isSelected = selectedOption === option.id;

        return (
          <pixiContainer key={option.id} x={xOffset} y={0}>
            <BaseButton
              width={200}
              height={90}
              label={`${option.korean} (${option.english})`}
              isSelected={isSelected}
              onSelect={() => {
                audio.playSFX("menu_hover");
                onOptionSelect(option.id);
              }}
              onActivate={() => {
                audio.playSFX("menu_select");
                option.action();
              }}
              keyBinding={option.keyBinding}
              showKeyBinding={true}
            />

            <pixiText
              text={option.subtitle}
              x={0}
              y={50}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 12,
                fill: isSelected ? 0xffffff : 0xcccccc,
              }}
            />
          </pixiContainer>
        );
      })}
    </pixiContainer>
  );
}
