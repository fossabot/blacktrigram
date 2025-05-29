import React, { useState, useCallback, useEffect } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { JSX } from "react";
import { KOREAN_COLORS } from "../../types";
import { useAudio } from "../../audio/AudioManager";

export interface IntroScreenProps {
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

const COLORS = {
  BLACK: 0x000000,
  WHITE: 0xffffff,
  CYAN: 0x00ffd0,
  DARK_BLUE: 0x004455,
  RED: 0x8b0000,
  GOLD: 0xffd700,
} as const;

export function IntroScreen({
  onStartGame,
  onStartTraining,
}: IntroScreenProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<
    "game" | "training" | null
  >(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const audio = useAudio();

  const drawBackground = useCallback((g: any) => {
    g.clear();

    // Traditional Korean background
    g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 1 });
    g.rect(0, 0, 800, 600);
    g.fill();

    // Traditional Korean pattern border
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 4, alpha: 0.6 });
    g.rect(50, 50, 700, 500);
    g.stroke();

    // Inner decorative frame
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.4 });
    g.rect(70, 70, 660, 460);
    g.stroke();
  }, []);

  const drawMenuOption = useCallback(
    (
      g: any,
      isSelected: boolean,
      isHovered: boolean,
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      g.clear();

      const alpha = isSelected ? 0.9 : isHovered ? 0.7 : 0.5;
      const color = isSelected ? KOREAN_COLORS.RED : KOREAN_COLORS.ACCENT_BLUE;

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.DARK_BLUE, alpha: alpha * 0.8 });
      g.roundRect(x, y, width, height, 8);
      g.fill();

      // Border
      g.setStrokeStyle({ color, width: isSelected ? 3 : 2, alpha });
      g.roundRect(x, y, width, height, 8);
      g.stroke();

      // Glow effect for selected
      if (isSelected) {
        g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 1, alpha: 0.6 });
        g.roundRect(x - 2, y - 2, width + 4, height + 4, 10);
        g.stroke();
      }
    },
    []
  );

  const handleGameStart = useCallback(() => {
    audio.playSFX("menu_select");
    setSelectedOption("game");
    setTimeout(onStartGame, 200);
  }, [audio, onStartGame]);

  const handleTrainingStart = useCallback(() => {
    audio.playSFX("menu_select");
    setSelectedOption("training");
    setTimeout(onStartTraining, 200);
  }, [audio, onStartTraining]);

  const handleButtonHover = useCallback(
    (buttonId: string) => {
      audio.playSFX("menu_hover");
      setHoveredButton(buttonId);
    },
    [audio]
  );

  const handleButtonLeave = useCallback(() => {
    setHoveredButton(null);
  }, []);

  useEffect(() => {
    // Start intro music
    audio.playMusic("intro_theme");

    return () => {
      audio.stopMusic();
    };
  }, [audio]);

  return (
    <Container>
      {/* Background */}
      <Graphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({ color: COLORS.BLACK });
          g.rect(0, 0, window.innerWidth, window.innerHeight);
          g.fill();

          // Subtle gradient overlay
          const gradient = g.createLinearGradient(0, 0, 0, window.innerHeight);
          gradient.addColorStop(0, "rgba(139, 0, 0, 0.2)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
          g.setFillStyle({ color: gradient });
          g.rect(0, 0, window.innerWidth, window.innerHeight);
          g.fill();
        }}
      />

      {/* Title */}
      <Text
        text="흑괘 무술 도장"
        anchor={{ x: 0.5, y: 0.5 }}
        x={window.innerWidth / 2}
        y={window.innerHeight * 0.3}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 48,
          fill: COLORS.GOLD,
          fontWeight: "bold",
          dropShadow: {
            color: COLORS.RED,
            blur: 8,
            distance: 3,
          },
        }}
      />

      <Text
        text="Black Trigram Martial Arts Dojang"
        anchor={{ x: 0.5, y: 0.5 }}
        x={window.innerWidth / 2}
        y={window.innerHeight * 0.35}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 20,
          fill: COLORS.CYAN,
          fontWeight: "normal",
        }}
      />

      {/* Start Game Button */}
      <Container
        x={window.innerWidth / 2}
        y={window.innerHeight * 0.5}
        interactive={true}
        cursor="pointer"
        onPointerEnter={() => handleButtonHover("game")}
        onPointerLeave={handleButtonLeave}
        onPointerDown={handleGameStart}
      >
        <Graphics
          draw={(g) => {
            g.clear();
            const isHovered = hoveredButton === "game";

            g.setFillStyle({
              color: COLORS.DARK_BLUE,
              alpha: isHovered ? 0.9 : 0.7,
            });
            g.roundRect(-100, -25, 200, 50, 8);
            g.fill();

            g.setStrokeStyle({
              color: isHovered ? COLORS.CYAN : COLORS.GOLD,
              width: isHovered ? 3 : 2,
            });
            g.roundRect(-100, -25, 200, 50, 8);
            g.stroke();
          }}
        />
        <Text
          text="실전 대련"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: hoveredButton === "game" ? COLORS.CYAN : COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
      </Container>

      {/* Start Training Button */}
      <Container
        x={window.innerWidth / 2}
        y={window.innerHeight * 0.6}
        interactive={true}
        cursor="pointer"
        onPointerEnter={() => handleButtonHover("training")}
        onPointerLeave={handleButtonLeave}
        onPointerDown={handleTrainingStart}
      >
        <Graphics
          draw={(g) => {
            g.clear();
            const isHovered = hoveredButton === "training";

            g.setFillStyle({
              color: COLORS.DARK_BLUE,
              alpha: isHovered ? 0.9 : 0.7,
            });
            g.roundRect(-100, -25, 200, 50, 8);
            g.fill();

            g.setStrokeStyle({
              color: isHovered ? COLORS.CYAN : COLORS.GOLD,
              width: isHovered ? 3 : 2,
            });
            g.roundRect(-100, -25, 200, 50, 8);
            g.stroke();
          }}
        />
        <Text
          text="수련 모드"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: hoveredButton === "training" ? COLORS.CYAN : COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
      </Container>

      {/* Footer Instructions */}
      <Text
        text="팔괘의 원리로 급소를 노리는 정밀한 격투술을 마스터하세요"
        anchor={{ x: 0.5, y: 0.5 }}
        x={window.innerWidth / 2}
        y={window.innerHeight * 0.8}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: COLORS.WHITE,
          alpha: 0.8,
        }}
      />
    </Container>
  );
}
