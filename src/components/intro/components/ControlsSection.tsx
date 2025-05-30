import { KoreanPixiContainer, Graphics, Text, Container } from "../../ui/base";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types";
import React, { useCallback } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

// Define props for navigation
export interface ControlsSectionProps {
  readonly onNext?: () => void;
  readonly onPrev?: () => void;
}

const KEY_WIDTH = 40;
const KEY_HEIGHT = 40;

const KEY_STYLE = {
  fontFamily: KOREAN_FONT_FAMILY,
  fontSize: 14,
  fill: KOREAN_COLORS.BLACK,
  align: "center" as const,
};

const LABEL_STYLE = {
  fontFamily: KOREAN_FONT_FAMILY,
  fontSize: 14,
  fill: KOREAN_COLORS.WHITE,
  align: "left" as const,
};

interface KeyDisplayProps {
  x: number;
  y: number;
  label: string;
  keyChar: string;
}

const KeyDisplay: React.FC<KeyDisplayProps> = ({ x, y, label, keyChar }) => {
  const drawKeyShape = useCallback((g: PixiGraphics) => {
    g.clear();
    g.rect(0, 0, KEY_WIDTH, KEY_HEIGHT);
    g.fill({ color: KOREAN_COLORS.LIGHT_GREY, alpha: 1 });
    g.stroke({ width: 1, color: KOREAN_COLORS.GRAY_DARK });
  }, []);

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawKeyShape} />
      <Text
        text={keyChar}
        x={KEY_WIDTH / 2}
        y={KEY_HEIGHT / 2}
        anchor={{ x: 0.5, y: 0.5 }}
        style={KEY_STYLE}
      />
      <Text
        text={label}
        x={KEY_WIDTH + 10}
        y={KEY_HEIGHT / 2}
        anchor={{ x: 0, y: 0.5 }}
        style={LABEL_STYLE}
      />
    </Container>
  );
};

export function ControlsSection({}: /* onNext, onPrev */ ControlsSectionProps): React.ReactElement {
  const controls = [
    {
      keyChar: "1-8",
      label: "Select Trigram Stance (건, 태, 리, 진, 손, 감, 간, 곤)",
    },
    { keyChar: "W, A, S, D", label: "Movement (Up, Left, Down, Right)" },
    { keyChar: "Space", label: "Primary Attack / Practice Technique" },
    { keyChar: "Shift", label: "Block / Defensive Maneuver" },
    { keyChar: "Ctrl", label: "Special Ability / Ki Power" },
    { keyChar: "Tab", label: "Cycle Target (Combat Mode)" },
    { keyChar: "Esc", label: "Pause Menu / Exit Training" },
  ];

  return (
    <KoreanPixiContainer
      x={50}
      y={100}
      traditionalBorder={false}
      width={700}
      height={500}
    >
      {/* Add navigation buttons if onNext/onPrev are used */}
      {/* Example:
      {onPrev && <BaseButton x={10} y={450} label="이전 (Prev)" onClick={onPrev} />}
      {onNext && <BaseButton x={600} y={450} label="다음 (Next)" onClick={onNext} />}
      */}
      <Text
        text="게임 조작법 (Game Controls)"
        x={0}
        y={0}
        style={{
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 24,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />
      {controls.map((control, index) => (
        <KeyDisplay
          key={index}
          x={20}
          y={50 + index * (KEY_HEIGHT + 15)}
          label={control.label}
          keyChar={control.keyChar}
        />
      ))}
    </KoreanPixiContainer>
  );
}
