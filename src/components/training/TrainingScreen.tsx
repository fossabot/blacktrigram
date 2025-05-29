import { useState, useCallback } from "react";
import type { JSX } from "react";
import type { TrigramStance } from "../../types";

interface TrainingScreenProps {
  readonly onExit: () => void;
}

const TRIGRAM_STANCES: TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
];

const KOREAN_COLORS = {
  BLACK: 0x000000,
  WHITE: 0xffffff,
  GOLD: 0xffd700,
  RED: 0x8b0000,
  BLUE: 0x4a90e2,
} as const;

export function TrainingScreen({
  onExit: _,
}: TrainingScreenProps): JSX.Element {
  // Using underscore to indicate intentionally unused parameter
  const [selectedStance, setSelectedStance] = useState<TrigramStance>("geon");
  const [practiceCount, setPracticeCount] = useState<
    Record<TrigramStance, number>
  >({
    geon: 0,
    tae: 0,
    li: 0,
    jin: 0,
    son: 0,
    gam: 0,
    gan: 0,
    gon: 0,
  });

  const handleStanceSelect = useCallback((stance: TrigramStance) => {
    setSelectedStance(stance);
    setPracticeCount((prev) => ({
      ...prev,
      [stance]: prev[stance] + 1,
    }));
  }, []);

  return (
    <pixiContainer x={0} y={0}>
      {/* Background */}
      <pixiGraphics
        draw={(g: any) => {
          g.clear();
          g.setFillStyle({ color: KOREAN_COLORS.BLACK });
          g.rect(0, 0, window.innerWidth, window.innerHeight);
          g.fill();
        }}
      />

      {/* Training header */}
      <pixiContainer x={window.innerWidth / 2} y={100}>
        <pixiText
          text="수련 모드 (Training Mode)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 36,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
          }}
        />
      </pixiContainer>

      {/* Trigram stance grid */}
      <pixiContainer x={window.innerWidth / 2} y={window.innerHeight / 2}>
        {TRIGRAM_STANCES.map((stance, index) => {
          const angle = (index / TRIGRAM_STANCES.length) * Math.PI * 2;
          const radius = 200;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <pixiContainer
              key={stance}
              x={x}
              y={y}
              interactive={true}
              cursor="pointer"
              onPointerDown={() => handleStanceSelect(stance)}
            >
              <pixiGraphics
                draw={(g: any) => {
                  g.clear();
                  const isSelected = selectedStance === stance;
                  g.setFillStyle({
                    color: isSelected ? KOREAN_COLORS.RED : KOREAN_COLORS.BLUE,
                    alpha: 0.8,
                  });
                  g.circle(0, 0, 40);
                  g.fill();

                  g.setStrokeStyle({
                    color: KOREAN_COLORS.GOLD,
                    width: 2,
                  });
                  g.circle(0, 0, 40);
                  g.stroke();
                }}
              />
              <pixiText
                text={stance.toUpperCase()}
                anchor={{ x: 0.5, y: 0.5 }}
                style={{
                  fontFamily: "Noto Sans KR",
                  fontSize: 14,
                  fill: KOREAN_COLORS.WHITE,
                  fontWeight: "bold",
                }}
              />
              <pixiText
                text={`${practiceCount[stance]}`}
                anchor={{ x: 0.5, y: 0.5 }}
                y={60}
                style={{
                  fontFamily: "Arial",
                  fontSize: 12,
                  fill: KOREAN_COLORS.GOLD,
                }}
              />
            </pixiContainer>
          );
        })}
      </pixiContainer>
    </pixiContainer>
  );
}
