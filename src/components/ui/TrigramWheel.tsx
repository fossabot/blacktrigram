import { useState, useCallback } from "react";
import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";

export type TrigramStance =
  | "geon"
  | "tae"
  | "li"
  | "jin"
  | "son"
  | "gam"
  | "gan"
  | "gon";

interface TrigramWheelProps {
  readonly selectedStance: TrigramStance;
  readonly practiceCount?: Record<TrigramStance, number>;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly showPracticeCount?: boolean;
  readonly radius?: number;
  readonly time: number;
}

const TRIGRAM_DATA: Record<
  TrigramStance,
  { symbol: string; korean: string; english: string; element: string }
> = {
  geon: { symbol: "☰", korean: "건", english: "Heaven", element: "Metal" },
  tae: { symbol: "☱", korean: "태", english: "Lake", element: "Metal" },
  li: { symbol: "☲", korean: "리", english: "Fire", element: "Fire" },
  jin: { symbol: "☳", korean: "진", english: "Thunder", element: "Wood" },
  son: { symbol: "☴", korean: "손", english: "Wind", element: "Wood" },
  gam: { symbol: "☵", korean: "감", english: "Water", element: "Water" },
  gan: { symbol: "☶", korean: "간", english: "Mountain", element: "Earth" },
  gon: { symbol: "☷", korean: "곤", english: "Earth", element: "Earth" },
};

const STANCES: TrigramStance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
];

const COLORS = {
  CYAN: 0x00ffd0,
  WHITE: 0xffffff,
  DARK_BLUE: 0x000a12,
  BLACK: 0x000000,
  VITAL_ORANGE: 0xff7700,
  GRAY_MEDIUM: 0x666666,
} as const;

export function TrigramWheel({
  selectedStance,
  practiceCount,
  onStanceSelect,
  showPracticeCount = false,
  radius = 180,
  time,
}: TrigramWheelProps): JSX.Element {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      onStanceSelect(stance);
    },
    [onStanceSelect]
  );

  return (
    <pixiContainer data-testid="trigram-wheel">
      {/* Central circle */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          const pulse = Math.sin(time * 0.05) * 0.3 + 0.7;

          // Outer ring
          g.setStrokeStyle({ color: COLORS.CYAN, width: 2, alpha: 0.6 });
          g.circle(0, 0, radius + 20);
          g.stroke();

          // Inner core
          g.setFillStyle({ color: COLORS.CYAN, alpha: pulse * 0.3 });
          g.circle(0, 0, 30);
          g.fill();

          g.setStrokeStyle({ color: COLORS.CYAN, width: 1, alpha: pulse });
          g.circle(0, 0, 30);
          g.stroke();
        }}
        data-testid="trigram-wheel-center"
      />

      {/* Yin-yang symbol in center */}
      <pixiText
        text="☯"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 32,
          fill: COLORS.WHITE,
          fontWeight: "bold",
        }}
        data-testid="yin-yang-symbol"
      />

      {/* Trigram positions */}
      {STANCES.map((stance, index) => {
        const angle = (index * Math.PI * 2) / 8 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const isActive = stance === selectedStance;
        const isHovered = stance === hoveredStance;
        const trigram = TRIGRAM_DATA[stance];

        return (
          <pixiContainer
            key={stance}
            x={x}
            y={y}
            interactive={true}
            cursor="pointer"
            onPointerDown={() => handleStanceSelect(stance)}
            onPointerEnter={() => setHoveredStance(stance)}
            onPointerLeave={() => setHoveredStance(null)}
            data-testid={`trigram-stance-${stance}`}
          >
            {/* Background circle */}
            <pixiGraphics
              draw={(g: PixiGraphics) => {
                g.clear();
                const bgAlpha = isActive ? 0.8 : isHovered ? 0.6 : 0.4;
                const bgColor = isActive ? COLORS.CYAN : COLORS.DARK_BLUE;

                g.setFillStyle({ color: bgColor, alpha: bgAlpha });
                g.circle(0, 0, 35);
                g.fill();

                g.setStrokeStyle({
                  color: COLORS.CYAN,
                  width: isActive ? 3 : 2,
                  alpha: isActive ? 1.0 : 0.6,
                });
                g.circle(0, 0, 35);
                g.stroke();
              }}
              data-testid={`trigram-bg-${stance}`}
            />

            {/* Trigram symbol */}
            <pixiText
              text={trigram.symbol}
              anchor={{ x: 0.5, y: 0.5 }}
              y={-5}
              style={{
                fontFamily: "serif",
                fontSize: 24,
                fill: isActive ? COLORS.CYAN : COLORS.WHITE,
                fontWeight: "bold",
              }}
              data-testid={`trigram-symbol-${stance}`}
            />

            {/* Korean name */}
            <pixiText
              text={trigram.korean}
              anchor={{ x: 0.5, y: 0.5 }}
              y={12}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 12,
                fill: COLORS.WHITE,
                fontWeight: "400",
              }}
              data-testid={`trigram-korean-${stance}`}
            />

            {/* Key binding */}
            <pixiText
              text={`[${index + 1}]`}
              anchor={{ x: 0.5, y: 0.5 }}
              y={15}
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                fill: COLORS.GRAY_MEDIUM,
              }}
              data-testid={`trigram-key-${stance}`}
            />

            {/* Practice count display */}
            {showPracticeCount &&
              practiceCount &&
              practiceCount[stance] > 0 && (
                <pixiText
                  text={practiceCount[stance].toString()}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={20}
                  y={-20}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    fill: COLORS.VITAL_ORANGE,
                    fontWeight: "bold",
                  }}
                  data-testid={`trigram-count-${stance}`}
                />
              )}
          </pixiContainer>
        );
      })}
    </pixiContainer>
  );
}
