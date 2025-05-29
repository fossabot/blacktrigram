import type { JSX } from "react";
import { BaseButton } from "../../ui/base/BaseButton";

interface MenuSectionProps {
  readonly x: number;
  readonly y: number;
  readonly onGameSelect: () => void;
  readonly onTrainingSelect: () => void;
  readonly selectedOption: string | null;
}

interface MenuOption {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly keyBinding: string;
}

const MENU_OPTIONS: MenuOption[] = [
  {
    id: "game",
    korean: "대련",
    english: "Combat",
    keyBinding: "1",
  },
  {
    id: "training",
    korean: "수련",
    english: "Training",
    keyBinding: "2",
  },
];

export function MenuSection({
  x,
  y,
  onGameSelect,
  onTrainingSelect,
  selectedOption,
}: MenuSectionProps): JSX.Element {
  const handleOptionSelect = (optionId: string): void => {
    if (optionId === "game") {
      onGameSelect();
    } else if (optionId === "training") {
      onTrainingSelect();
    }
  };

  return (
    <pixiContainer x={x} y={y}>
      {MENU_OPTIONS.map((option, index) => (
        <pixiContainer key={option.id} y={index * 60}>
          <BaseButton
            key={option.id}
            width={300}
            height={50}
            text={`${option.korean} (${option.english})`}
            onSelect={() => handleOptionSelect(option.id)}
            onActivate={() => handleOptionSelect(option.id)}
            keyBinding={option.keyBinding}
            showKeyBinding={true}
          />
        </pixiContainer>
      ))}
    </pixiContainer>
  );
}
