import { useState, useEffect, useCallback } from "react";
import type { JSX } from "react";
import { useAudio } from "../../audio/AudioManager";
import type { Graphics as PixiGraphics } from "pixi.js";

// Type definitions
interface TrainingScreenProps {
  readonly onExit: () => void;
}

type Stance = "geon" | "tae" | "li" | "jin" | "son" | "gam" | "gan" | "gon";

interface TrainingState {
  currentStance: Stance;
  practiceCount: Record<Stance, number>;
  lastPracticedTime: Record<Stance, number>;
  totalPractices: number;
  isAnimating: boolean;
}

// Constants
const COLORS = {
  BLACK: 0x000000,
  CYAN: 0x00ffd0,
  WHITE: 0xffffff,
  DARK_BLUE: 0x000a12,
  GRAY_MEDIUM: 0x666666,
  GRAY_LIGHT: 0xcccccc,
  GRAY_DARK: 0x444444,
  ACCENT_BLUE: 0x004455,
  MEDIUM_BG: 0x222222,
  VITAL_ORANGE: 0xff7700,
} as const;

const STANCES: Stance[] = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
];

const TRIGRAM_SYMBOLS: Record<Stance, string> = {
  geon: "☰",
  tae: "☱",
  li: "☲",
  jin: "☳",
  son: "☴",
  gam: "☵",
  gan: "☶",
  gon: "☷",
};

export function TrainingScreen({ onExit }: TrainingScreenProps): JSX.Element {
  const [time, setTime] = useState<number>(0);
  const [trainingState, setTrainingState] = useState<TrainingState>({
    currentStance: "geon",
    practiceCount: {
      geon: 0,
      tae: 0,
      li: 0,
      jin: 0,
      son: 0,
      gam: 0,
      gan: 0,
      gon: 0,
    },
    lastPracticedTime: {
      geon: 0,
      tae: 0,
      li: 0,
      jin: 0,
      son: 0,
      gam: 0,
      gan: 0,
      gon: 0,
    },
    totalPractices: 0,
    isAnimating: false,
  });

  const audio = useAudio();

  // Animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.016);
    }, 16);

    return () => clearInterval(interval);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      // Number keys 1-8 to select stances
      if (event.code.startsWith("Digit") && !event.repeat) {
        const stanceIndex = parseInt(event.code.replace("Digit", "")) - 1;
        if (stanceIndex >= 0 && stanceIndex < STANCES.length) {
          const stance = STANCES[stanceIndex];
          if (stance) {
            selectStance(stance);
          }
        }
      }

      // Add exit handling for Escape and Backspace
      if (event.code === "Escape" || event.code === "Backspace") {
        audio.playSFX("menu_back");
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [trainingState, onExit]);

  const selectStance = useCallback(
    (stance: Stance): void => {
      audio.playSFX("stance_change");

      setTrainingState((prev) => {
        const newCount = { ...prev.practiceCount };
        newCount[stance] += 1;

        return {
          ...prev,
          currentStance: stance,
          practiceCount: newCount,
          lastPracticedTime: {
            ...prev.lastPracticedTime,
            [stance]: Date.now(),
          },
          totalPractices: prev.totalPractices + 1,
          isAnimating: true,
        };
      });

      // Reset animation state after animation completes
      setTimeout(() => {
        setTrainingState((prev) => ({ ...prev, isAnimating: false }));
      }, 800);
    },
    [audio]
  );

  const drawBackground = useCallback((graphics: PixiGraphics) => {
    graphics.clear();
    graphics.setFillStyle({ color: COLORS.BLACK });
    graphics.rect(0, 0, window.innerWidth, window.innerHeight);
    graphics.fill();

    // Draw grid pattern
    graphics.setStrokeStyle({ color: COLORS.DARK_BLUE, width: 1, alpha: 0.3 });
    for (let x = 0; x < window.innerWidth; x += 50) {
      graphics.moveTo(x, 0);
      graphics.lineTo(x, window.innerHeight);
      graphics.stroke();
    }
    for (let y = 0; y < window.innerHeight; y += 50) {
      graphics.moveTo(0, y);
      graphics.lineTo(window.innerWidth, y);
      graphics.stroke();
    }
  }, []);

  // Calculate overall training progress
  const calculateProgress = (): number => {
    const totalPossible = STANCES.length * 10; // Arbitrary "mastery" level
    const current = Object.values(trainingState.practiceCount).reduce(
      (sum, count) => sum + Math.min(count, 10),
      0
    );
    return Math.floor((current / totalPossible) * 100);
  };

  return (
    <pixiContainer data-testid="pixicontainer-training-screen">
      <pixiGraphics
        draw={drawBackground}
        data-testid="pixigraphics-background"
      />

      {/* Header */}
      <pixiContainer
        x={window.innerWidth / 2}
        y={80}
        data-testid="pixicontainer-header"
      >
        <pixiGraphics
          draw={(g: PixiGraphics) => {
            g.clear();
            g.setFillStyle({ color: COLORS.DARK_BLUE, alpha: 0.8 });
            g.roundRect(-200, -30, 400, 60, 10);
            g.fill();
            g.setStrokeStyle({ color: COLORS.CYAN, width: 2 });
            g.roundRect(-200, -30, 400, 60, 10);
            g.stroke();
          }}
          data-testid="pixigraphics-header-bg"
        />

        <pixiText
          text="🥋 기초 수련"
          anchor={{ x: 0.5, y: 0.5 }}
          y={-8}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 24,
            fill: COLORS.CYAN,
            fontWeight: "bold",
          }}
          data-testid="pixitext-title-korean"
        />

        <pixiText
          text="Basic Training"
          anchor={{ x: 0.5, y: 0.5 }}
          y={12}
          style={{
            fontFamily: "Orbitron",
            fontSize: 14,
            fill: 0x7accd4,
            letterSpacing: 1,
          }}
          data-testid="pixitext-title-english"
        />
      </pixiContainer>

      {/* Instructions */}
      <pixiContainer
        x={window.innerWidth / 2}
        y={150}
        data-testid="pixicontainer-instructions"
      >
        <pixiText
          text="흑괘 무술의 8가지 기본 자세를 연습하세요"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: COLORS.WHITE,
          }}
          data-testid="pixitext-instructions-korean"
        />

        <pixiText
          text="Practice the 8 fundamental stances of Black Trigram martial arts"
          anchor={{ x: 0.5, y: 0.5 }}
          y={25}
          style={{
            fontFamily: "Orbitron",
            fontSize: 12,
            fill: COLORS.GRAY_LIGHT,
          }}
          data-testid="pixitext-instructions-english"
        />

        <pixiText
          text="키보드 1-8 또는 원형 메뉴를 클릭하여 자세를 선택하세요"
          anchor={{ x: 0.5, y: 0.5 }}
          y={60}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: COLORS.CYAN,
          }}
          data-testid="pixitext-controls-korean"
        />

        <pixiText
          text="Press keys 1-8 or click on the circular menu to select a stance"
          anchor={{ x: 0.5, y: 0.5 }}
          y={80}
          style={{
            fontFamily: "monospace",
            fontSize: 11,
            fill: COLORS.GRAY_MEDIUM,
          }}
          data-testid="pixitext-controls-english"
        />
      </pixiContainer>

      {/* Training progress */}
      <pixiContainer
        x={window.innerWidth - 200}
        y={window.innerHeight - 100}
        data-testid="pixicontainer-progress"
      >
        <pixiText
          text={`총 연습 횟수: ${trainingState.totalPractices}`}
          anchor={{ x: 0, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: COLORS.CYAN,
          }}
          data-testid="pixitext-total-practices"
        />

        <pixiText
          text={`전체 진행률: ${calculateProgress()}%`}
          anchor={{ x: 0, y: 0.5 }}
          y={20}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: COLORS.CYAN,
          }}
          data-testid="pixitext-progress-percentage"
        />

        <pixiText
          text={`현재 자세: ${trainingState.currentStance.toUpperCase()}`}
          anchor={{ x: 0, y: 0.5 }}
          y={40}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: COLORS.WHITE,
          }}
          data-testid="pixitext-current-stance"
        />
      </pixiContainer>

      {/* Stance selection wheel */}
      <pixiContainer
        x={window.innerWidth / 2}
        y={window.innerHeight / 2 + 100}
        data-testid="pixicontainer-stance-wheel"
      >
        {STANCES.map((stance, index) => {
          const angle = (index * Math.PI * 2) / 8;
          const radius = 180;
          const x = Math.cos(angle - Math.PI / 2) * radius;
          const y = Math.sin(angle - Math.PI / 2) * radius;
          const isActive = stance === trainingState.currentStance;

          return (
            <pixiContainer
              key={stance}
              x={x}
              y={y}
              interactive={true}
              cursor="pointer"
              onPointerDown={() => selectStance(stance)}
              data-testid={`pixicontainer-stance-${stance}`}
            >
              <pixiGraphics
                draw={(g: PixiGraphics) => {
                  g.clear();
                  const pulse = isActive
                    ? Math.sin(time * 0.1) * 0.2 + 0.8
                    : 0.6;

                  g.setFillStyle({
                    color: COLORS.DARK_BLUE,
                    alpha: isActive ? 0.9 : 0.7,
                  });
                  g.circle(0, 0, 30);
                  g.fill();

                  g.setStrokeStyle({
                    color: isActive ? COLORS.CYAN : COLORS.WHITE,
                    width: isActive ? 2 : 1,
                    alpha: pulse,
                  });
                  g.circle(0, 0, 30);
                  g.stroke();

                  // Practice count indicator
                  if (trainingState.practiceCount[stance] > 0) {
                    g.setFillStyle({ color: COLORS.CYAN, alpha: 0.7 });
                    g.circle(20, -20, 10);
                    g.fill();
                  }
                }}
                data-testid={`pixigraphics-stance-${stance}`}
              />

              <pixiText
                text={TRIGRAM_SYMBOLS[stance]}
                anchor={{ x: 0.5, y: 0.5 }}
                y={-5}
                style={{
                  fontFamily: "serif",
                  fontSize: 24,
                  fill: isActive ? COLORS.CYAN : COLORS.WHITE,
                  fontWeight: "bold",
                }}
                data-testid={`pixitext-symbol-${stance}`}
              />

              <pixiText
                text={`[${index + 1}]`}
                anchor={{ x: 0.5, y: 0.5 }}
                y={15}
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  fill: COLORS.GRAY_MEDIUM,
                }}
                data-testid={`pixitext-key-${stance}`}
              />

              {trainingState.practiceCount[stance] > 0 && (
                <pixiText
                  text={`${trainingState.practiceCount[stance]}`}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={20}
                  y={-20}
                  style={{
                    fontFamily: "monospace",
                    fontSize: 12,
                    fill: COLORS.BLACK,
                    fontWeight: "bold",
                  }}
                  data-testid={`pixitext-count-${stance}`}
                />
              )}
            </pixiContainer>
          );
        })}
      </pixiContainer>

      {/* Current technique animation */}
      {trainingState.isAnimating && (
        <pixiContainer
          x={window.innerWidth / 2}
          y={window.innerHeight / 2 - 50}
          data-testid="pixicontainer-technique-animation"
        >
          <pixiGraphics
            draw={(g: PixiGraphics) => {
              g.clear();
              const alpha = Math.sin(time * 0.3) * 0.4 + 0.6;

              g.setFillStyle({ color: COLORS.CYAN, alpha: alpha * 0.3 });
              g.circle(0, 0, 100 + Math.sin(time * 5) * 20);
              g.fill();

              g.setStrokeStyle({ color: COLORS.CYAN, width: 3, alpha });
              g.circle(0, 0, 80 + Math.sin(time * 5) * 10);
              g.stroke();
            }}
            data-testid="pixigraphics-technique-effect"
          />

          <pixiText
            text={TRIGRAM_SYMBOLS[trainingState.currentStance]}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "serif",
              fontSize: 60,
              fill: COLORS.WHITE,
              fontWeight: "bold",
            }}
            data-testid="pixitext-current-symbol"
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
}
