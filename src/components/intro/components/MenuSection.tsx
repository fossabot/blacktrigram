import React, { useCallback } from "react";
import { Container, Text, Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { GamePhase } from "../../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types";

export interface MenuSectionProps {
  readonly selectedOption: GamePhase;
  readonly onOptionSelect: (option: GamePhase) => void;
  readonly onNext: () => void;
  readonly onPrev: () => void;
}

const MENU_OPTIONS: Array<{
  phase: GamePhase;
  korean: string;
  english: string;
  description: string;
}> = [
  {
    phase: "training",
    korean: "훈련",
    english: "Training",
    description:
      "기본 기술과 팔괘를 연습합니다 - Practice basic techniques and trigrams",
  },
  {
    phase: "combat",
    korean: "실전",
    english: "Combat",
    description:
      "실제 전투로 기술을 시험합니다 - Test your skills in real combat",
  },
  {
    phase: "philosophy",
    korean: "철학",
    english: "Philosophy",
    description:
      "한국 무술의 철학을 배웁니다 - Learn Korean martial arts philosophy",
  },
];

export function MenuSection({
  selectedOption,
  onOptionSelect,
  onNext,
  onPrev,
}: MenuSectionProps): React.ReactElement {
  const drawOptionBackground = useCallback(
    (isSelected: boolean) => (g: PixiGraphics) => {
      g.clear();

      const bgColor = isSelected
        ? KOREAN_COLORS.ACCENT_BLUE
        : KOREAN_COLORS.DARK_BLUE;
      const borderColor = isSelected
        ? KOREAN_COLORS.GOLD
        : KOREAN_COLORS.GRAY_DARK;

      // Background
      g.setFillStyle({ color: bgColor, alpha: 0.8 });
      g.rect(0, 0, 400, 80);
      g.fill();

      // Border
      g.setStrokeStyle({ color: borderColor, width: 2, alpha: 1.0 });
      g.rect(0, 0, 400, 80);
      g.stroke();

      // Selection indicator
      if (isSelected) {
        g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 1, alpha: 0.6 });
        g.rect(5, 5, 390, 70);
        g.stroke();
      }
    },
    []
  );

  const drawNavigationButton = useCallback((g: PixiGraphics) => {
    g.clear();

    // Button background
    g.setFillStyle({ color: KOREAN_COLORS.TRADITIONAL_RED, alpha: 0.8 });
    g.rect(0, 0, 150, 50);
    g.fill();

    // Button border
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.9 });
    g.rect(0, 0, 150, 50);
    g.stroke();
  }, []);

  return (
    <Container data-testid="menu-section">
      {/* Menu options */}
      {MENU_OPTIONS.map((option, index) => {
        const isSelected = selectedOption === option.phase;
        const yPos = index * 100;

        return (
          <Container
            key={option.phase}
            x={400}
            y={yPos}
            interactive={true}
            onPointerDown={() => onOptionSelect(option.phase)}
            cursor="pointer"
          >
            {/* Option background */}
            <Graphics draw={drawOptionBackground(isSelected)} />

            {/* Korean text */}
            <Text
              text={option.korean}
              anchor={{ x: 0, y: 0.5 }}
              x={20}
              y={25}
              style={
                {
                  fontFamily: KOREAN_FONT_FAMILY,
                  fontSize: 24,
                  fill: isSelected ? KOREAN_COLORS.GOLD : KOREAN_COLORS.WHITE,
                  fontWeight: "bold",
                } as any
              }
            />

            {/* English text */}
            <Text
              text={option.english}
              anchor={{ x: 0, y: 0.5 }}
              x={20}
              y={45}
              style={
                {
                  fontFamily: "Arial, sans-serif",
                  fontSize: 16,
                  fill: isSelected
                    ? KOREAN_COLORS.CYAN
                    : KOREAN_COLORS.GRAY_LIGHT,
                } as any
              }
            />

            {/* Description */}
            {isSelected && (
              <Text
                text={option.description}
                anchor={{ x: 0, y: 0 }}
                x={20}
                y={85}
                style={
                  {
                    fontFamily: KOREAN_FONT_FAMILY,
                    fontSize: 12,
                    fill: KOREAN_COLORS.GRAY_LIGHT,
                    wordWrap: true,
                    wordWrapWidth: 360,
                  } as any
                }
              />
            )}
          </Container>
        );
      })}

      {/* Navigation buttons */}
      <Container x={200} y={350}>
        {/* Previous button */}
        <Container
          x={50}
          y={0}
          interactive={true}
          onPointerDown={onPrev}
          cursor="pointer"
        >
          <Graphics draw={drawNavigationButton} />
          <Text
            text="← 이전"
            anchor={{ x: 0.5, y: 0.5 }}
            x={75}
            y={15}
            style={
              {
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 14,
                fill: KOREAN_COLORS.WHITE,
                fontWeight: "bold",
              } as any
            }
          />
          <Text
            text="Back"
            anchor={{ x: 0.5, y: 0.5 }}
            x={75}
            y={35}
            style={
              {
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fill: KOREAN_COLORS.CYAN,
              } as any
            }
          />
        </Container>

        {/* Continue button */}
        <Container
          x={200}
          y={0}
          interactive={true}
          onPointerDown={onNext}
          cursor="pointer"
        >
          <Graphics draw={drawNavigationButton} />
          <Text
            text="계속하기"
            anchor={{ x: 0.5, y: 0.5 }}
            x={75}
            y={15}
            style={
              {
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 16,
                fill: KOREAN_COLORS.WHITE,
                fontWeight: "bold",
              } as any
            }
          />
          <Text
            text="Continue"
            anchor={{ x: 0.5, y: 0.5 }}
            x={75}
            y={35}
            style={
              {
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fill: KOREAN_COLORS.CYAN,
              } as any
            }
          />
        </Container>
      </Container>

      {/* Instructions */}
      <Text
        text="옵션을 선택하고 계속하기를 눌러주세요"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={450}
        style={
          {
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 14,
            fill: KOREAN_COLORS.YELLOW,
          } as any
        }
      />

      <Text
        text="Select an option and press Continue"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={470}
        style={
          {
            fontFamily: "Arial, sans-serif",
            fontSize: 12,
            fill: KOREAN_COLORS.GRAY_LIGHT,
            fontStyle: "italic",
          } as any
        }
      />
    </Container>
  );
}
