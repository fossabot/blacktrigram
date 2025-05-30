import React, { useState, useCallback } from "react";
import { KoreanPixiContainer, BaseButton, Text } from "../../ui/base";
import { KOREAN_COLORS } from "../../../types";

export interface MenuSectionProps {
  readonly selectedOption?: string | null;
  readonly onOptionChange?: (option: string) => void;
  readonly onMenuSelect: (section: string) => void;
  readonly onNext?: () => void;
  readonly onPrev?: () => void;
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

export function MenuSection({
  selectedOption: propSelectedOption,
  onOptionChange,
  onMenuSelect,
  onNext,
  // onPrev,
  onStartGame,
  onStartTraining,
}: MenuSectionProps): React.ReactElement {
  const [internalSelectedOption, setInternalSelectedOption] = useState<
    string | null
  >(propSelectedOption || null);

  // Use either the prop or internal state
  const selectedOption =
    propSelectedOption !== undefined
      ? propSelectedOption
      : internalSelectedOption;

  const menuItems = [
    { label: "새 게임 (New Game)", action: "game", targetSection: "game" },
    { label: "훈련 (Training)", action: "training", targetSection: "training" },
    {
      label: "조작법 (Controls)",
      action: "controls",
      targetSection: "controls",
    },
    {
      label: "철학 (Philosophy)",
      action: "philosophy",
      targetSection: "philosophy",
    },
    { label: "나가기 (Exit)", action: "exit", targetSection: "exit" },
  ];

  const handleSelect = useCallback(
    (item: (typeof menuItems)[0]) => {
      if (onOptionChange) {
        // Call the external handler with string parameter
        onOptionChange(item.action);
      } else {
        // Use internal state when no handler is provided
        setInternalSelectedOption(item.action);
      }

      if (item.action === "game") {
        onStartGame();
      } else if (item.action === "training") {
        onStartTraining();
      } else if (item.action === "exit") {
        if (onNext) onNext();
      } else {
        onMenuSelect(item.targetSection);
      }
    },
    [onMenuSelect, onStartGame, onStartTraining, onNext, onOptionChange]
  );

  return (
    <KoreanPixiContainer
      x={50}
      y={150}
      width={700}
      height={300}
      traditionalBorder={true}
    >
      <Text
        text="메인 메뉴 (Main Menu)"
        x={350}
        y={20}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 28,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      {menuItems.map((item, index) => (
        <BaseButton
          key={item.action}
          x={150}
          y={80 + index * 60}
          width={400}
          height={50}
          text={`${item.label}${selectedOption === item.action ? " <" : ""}`}
          onClick={() => handleSelect(item)}
          isSelected={selectedOption === item.action}
          isEnabled={true}
        />
      ))}
    </KoreanPixiContainer>
  );
}
