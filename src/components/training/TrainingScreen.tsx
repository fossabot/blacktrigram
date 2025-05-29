import React, { useState, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import { useAudio } from "../../audio/AudioManager";
import type { TrigramStance } from "../../types/GameTypes";

interface TrainingScreenProps {
  readonly onExit: () => void;
}

const TRIGRAM_STANCES: Array<{
  stance: TrigramStance;
  korean: string;
  symbol: string;
}> = [
  { stance: "geon", korean: "건 (天)", symbol: "☰" },
  { stance: "tae", korean: "태 (澤)", symbol: "☱" },
  { stance: "li", korean: "리 (火)", symbol: "☲" },
  { stance: "jin", korean: "진 (雷)", symbol: "☳" },
  { stance: "son", korean: "손 (風)", symbol: "☴" },
  { stance: "gam", korean: "감 (水)", symbol: "☵" },
  { stance: "gan", korean: "간 (山)", symbol: "☶" },
  { stance: "gon", korean: "곤 (地)", symbol: "☷" },
];

const COLORS = {
  BLACK: 0x000000,
  WHITE: 0xffffff,
  CYAN: 0x00ffd0,
  DARK_BLUE: 0x004455,
  RED: 0x8b0000,
  GOLD: 0xffd700,
} as const;

export function TrainingScreen({ onExit }: TrainingScreenProps): JSX.Element {
  const [selectedStance, setSelectedStance] = useState<TrigramStance>("geon");
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );
  const audio = useAudio();

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      audio.playSFX("stance_change");
      setSelectedStance(stance);
    },
    [audio]
  );

  const handleStanceHover = useCallback(
    (stance: TrigramStance) => {
      audio.playSFX("menu_hover");
      setHoveredStance(stance);
    },
    [audio]
  );

  return (
    <Container>
      {/* Background */}
      <Graphics
        draw={(g) => {
          g.clear();
          g.setFillStyle({ color: COLORS.BLACK });
          g.rect(0, 0, window.innerWidth, window.innerHeight);
          g.fill();
        }}
      />

      {/* Title */}
      <Text
        text="팔괘 수련"
        anchor={{ x: 0.5, y: 0.5 }}
        x={window.innerWidth / 2}
        y={80}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: COLORS.GOLD,
          fontWeight: "bold",
        }}
      />

      {/* Trigram Selection Grid */}
      {TRIGRAM_STANCES.map((trigram, index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const x = window.innerWidth / 2 - 150 + col * 100;
        const y = 200 + row * 100;
        const isSelected = selectedStance === trigram.stance;
        const isHovered = hoveredStance === trigram.stance;

        return (
          <Container
            key={trigram.stance}
            x={x}
            y={y}
            interactive={true}
            cursor="pointer"
            onPointerEnter={() => setHoveredStance(trigram.stance)}
            onPointerLeave={() => setHoveredStance(null)}
            onPointerDown={() => handleStanceSelect(trigram.stance)}
          >
            <Graphics
              draw={(g) => {
                g.clear();

                if (isSelected) {
                  g.setFillStyle({ color: COLORS.CYAN, alpha: 0.3 });
                } else if (isHovered) {
                  g.setFillStyle({ color: COLORS.GOLD, alpha: 0.2 });
                } else {
                  g.setFillStyle({ color: COLORS.DARK_BLUE, alpha: 0.5 });
                }

                g.circle(0, 0, 35);
                g.fill();

                g.setStrokeStyle({
                  color: isSelected
                    ? COLORS.CYAN
                    : isHovered
                    ? COLORS.GOLD
                    : COLORS.WHITE,
                  width: isSelected ? 3 : 2,
                });
                g.circle(0, 0, 35);
                g.stroke();
              }}
            />

            <Text
              text={trigram.symbol}
              anchor={{ x: 0.5, y: 0.5 }}
              y={-10}
              style={{
                fontFamily: "serif",
                fontSize: 24,
                fill: isSelected ? COLORS.CYAN : COLORS.WHITE,
              }}
            />

            <Text
              text={trigram.korean}
              anchor={{ x: 0.5, y: 0.5 }}
              y={15}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 10,
                fill: isSelected ? COLORS.CYAN : COLORS.WHITE,
              }}
            />
          </Container>
        );
      })}

      {/* Selected Stance Info */}
      <Container x={window.innerWidth / 2} y={450}>
        <Text
          text={`선택된 자세: ${
            TRIGRAM_STANCES.find((t) => t.stance === selectedStance)?.korean ||
            ""
          }`}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: COLORS.WHITE,
          }}
        />
      </Container>

      {/* Instructions */}
      <Text
        text="팔괘 자세를 선택하여 수련하세요 • 1-8 키로도 선택 가능"
        anchor={{ x: 0.5, y: 0.5 }}
        x={window.innerWidth / 2}
        y={window.innerHeight - 100}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: COLORS.WHITE,
          alpha: 0.7,
        }}
      />
    </Container>
  );
}
