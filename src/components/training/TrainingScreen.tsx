import { useState, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS, TRIGRAM_DATA, type TrigramStance } from "../../types";

interface TrainingScreenProps {
  readonly onExit: () => void;
}

export function TrainingScreen({ onExit }: TrainingScreenProps): JSX.Element {
  const [selectedStance, setSelectedStance] = useState<TrigramStance>("geon");

  const drawBackground = useCallback((g: PixiGraphics) => {
    g.clear();
    g.setFillStyle({ color: KOREAN_COLORS.BLACK });
    g.rect(0, 0, window.innerWidth, window.innerHeight);
    g.fill();

    // Training dojang elements
    g.setStrokeStyle({
      color: KOREAN_COLORS.DOJANG_BLUE,
      width: 2,
      alpha: 0.6,
    });
    g.rect(50, 50, window.innerWidth - 100, window.innerHeight - 100);
    g.stroke();
  }, []);

  return (
    <Container>
      <Graphics draw={drawBackground} />

      <Text
        text="수련장 (Training Hall)"
        x={window.innerWidth / 2}
        y={100}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 36,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />

      <Text
        text={`현재 자세: ${TRIGRAM_DATA[selectedStance].korean} (${TRIGRAM_DATA[selectedStance].english})`}
        x={window.innerWidth / 2}
        y={200}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 24,
          fill: KOREAN_COLORS.WHITE,
        }}
      />

      <Text
        text={TRIGRAM_DATA[selectedStance].philosophy}
        x={window.innerWidth / 2}
        y={250}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: KOREAN_COLORS.CYAN,
        }}
      />

      {/* Stance selector grid */}
      {Object.entries(TRIGRAM_DATA).map(([stance, data], index) => {
        const col = index % 4;
        const row = Math.floor(index / 4);
        const x = window.innerWidth / 2 - 150 + col * 100;
        const y = 350 + row * 80;

        return (
          <Container
            key={stance}
            x={x}
            y={y}
            interactive={true}
            onPointerDown={() => setSelectedStance(stance as TrigramStance)}
          >
            <Graphics
              draw={(g: PixiGraphics) => {
                g.clear();
                const isSelected = stance === selectedStance;
                g.setFillStyle({
                  color: isSelected ? data.color : KOREAN_COLORS.BLACK,
                  alpha: isSelected ? 0.8 : 0.3,
                });
                g.circle(0, 0, 30);
                g.fill();
                g.setStrokeStyle({
                  color: data.color,
                  width: isSelected ? 3 : 1,
                });
                g.circle(0, 0, 30);
                g.stroke();
              }}
            />
            <Text
              text={data.symbol}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{
                fontFamily: "serif",
                fontSize: 24,
                fill: KOREAN_COLORS.WHITE,
              }}
            />
          </Container>
        );
      })}
    </Container>
  );
}
