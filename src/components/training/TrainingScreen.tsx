import { useState, useEffect, useCallback } from "react";
import type { JSX } from "react";
import { useAudio } from "../../audio/AudioManager";
import { KoreanHeader } from "../ui/KoreanHeader";
import { TrigramWheel, type TrigramStance } from "../ui/TrigramWheel";
import { ProgressTracker } from "../ui/ProgressTracker";
import { DojangBackground } from "../game/DojangBackground";
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

  return (
    <pixiContainer data-testid="training-screen">
      <DojangBackground
        gameTime={time}
        showVitalPoints={true}
        showTrigramPositions={true}
      />

      <KoreanHeader
        koreanTitle="🥋 기초 수련"
        englishTitle="Basic Training"
        subtitle="흑괘 무술의 8가지 기본 자세를 연습하세요"
        y={100}
      />

      <TrainingInstructions />

      <TrigramWheel
        selectedStance={trainingState.currentStance}
        practiceCount={trainingState.practiceCount}
        onStanceSelect={selectStance}
        showPracticeCount={true}
        time={time}
        radius={200}
      />

      <ProgressTracker
        practiceCount={trainingState.practiceCount}
        totalPractices={trainingState.totalPractices}
        currentStance={trainingState.currentStance}
      />

      {trainingState.isAnimating && (
        <TechniqueAnimation stance={trainingState.currentStance} time={time} />
      )}

      <TrainingTips />
    </pixiContainer>
  );
}

function TrainingInstructions(): JSX.Element {
  return (
    <pixiContainer
      x={window.innerWidth / 2}
      y={200}
      data-testid="training-instructions"
    >
      <pixiText
        text="키보드 1-8 또는 원형 메뉴를 클릭하여 자세를 선택하세요"
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: 0x00ffd0,
          fontWeight: "400",
        }}
        data-testid="instructions-korean"
      />

      <pixiText
        text="Press keys 1-8 or click on the trigram wheel to practice stances"
        anchor={{ x: 0.5, y: 0.5 }}
        y={25}
        style={{
          fontFamily: "Orbitron",
          fontSize: 12,
          fill: 0x7accd4,
          letterSpacing: 1,
        }}
        data-testid="instructions-english"
      />
    </pixiContainer>
  );
}

function TechniqueAnimation({
  stance,
  time,
}: {
  stance: TrigramStance;
  time: number;
}): JSX.Element {
  const TRIGRAM_SYMBOLS: Record<TrigramStance, string> = {
    geon: "☰",
    tae: "☱",
    li: "☲",
    jin: "☳",
    son: "☴",
    gam: "☵",
    gan: "☶",
    gon: "☷",
  };

  return (
    <pixiContainer
      x={window.innerWidth / 2}
      y={window.innerHeight / 2}
      data-testid="technique-animation"
    >
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          const alpha = Math.sin(time * 0.3) * 0.4 + 0.6;
          const radius = 120 + Math.sin(time * 5) * 30;

          // Energy burst effect
          g.setFillStyle({ color: 0x00ffd0, alpha: alpha * 0.2 });
          g.circle(0, 0, radius);
          g.fill();

          // Pulsing ring
          g.setStrokeStyle({ color: 0x00ffd0, width: 4, alpha });
          g.circle(0, 0, radius * 0.7);
          g.stroke();

          // Inner energy core
          g.setFillStyle({ color: 0xffffff, alpha: alpha * 0.8 });
          g.circle(0, 0, 15);
          g.fill();
        }}
        data-testid="technique-effect"
      />

      <pixiText
        text={TRIGRAM_SYMBOLS[stance]}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 80,
          fill: 0xffffff,
          fontWeight: "bold",
          dropShadow: {
            color: 0x00ffd0,
            blur: 8,
            distance: 0,
          },
        }}
        data-testid="technique-symbol"
      />
    </pixiContainer>
  );
}

function TrainingTips(): JSX.Element {
  return (
    <pixiContainer
      x={100}
      y={window.innerHeight - 150}
      data-testid="training-tips"
    >
      <pixiText
        text="💡 수련 팁"
        anchor={{ x: 0, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 16,
          fill: 0x00ffd0,
          fontWeight: "bold",
        }}
        data-testid="tips-title"
      />

      <pixiText
        text="• 각 자세를 10회 이상 연습하여 숙련도를 높이세요"
        anchor={{ x: 0, y: 0.5 }}
        y={25}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: 0xffffff,
        }}
        data-testid="tip-1"
      />

      <pixiText
        text="• 자세 변환을 빠르게 연습하여 반응속도를 향상시키세요"
        anchor={{ x: 0, y: 0.5 }}
        y={45}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: 0xffffff,
        }}
        data-testid="tip-2"
      />

      <pixiText
        text="• 모든 괘를 균형있게 연습하여 완전한 무예를 익히세요"
        anchor={{ x: 0, y: 0.5 }}
        y={65}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: 0xffffff,
        }}
        data-testid="tip-3"
      />
    </pixiContainer>
  );
}
