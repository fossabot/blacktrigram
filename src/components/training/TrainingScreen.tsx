import React, { useState, useCallback, useEffect } from "react";
import { Container, Text, Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import {
  TrigramStance,
  PlayerState,
  TrainingProgress,
  KOREAN_COLORS,
  TRIGRAM_STANCES_ORDER,
  TRIGRAM_DATA,
} from "../../types";
import { BaseButton } from "../ui/base/BaseButton";
import { useAudio } from "../../audio/AudioManager";

interface TrainingScreenProps {
  readonly playerState: PlayerState;
  readonly onBack: () => void;
}

const trainingTips = [
  { korean: "좋은 시작입니다!", english: "Good start!" },
  { korean: "자세를 낮추세요.", english: "Lower your stance." },
  { korean: "더욱 강하게 치세요!", english: "Strike harder!" },
  { korean: "정확성을 높이세요.", english: "Increase your accuracy." },
  { korean: "기술을 연마하세요.", english: "Refine your technique." },
];

export function TrainingScreen({
  onBack,
}: TrainingScreenProps): React.JSX.Element {
  const [trainingProgress, setTrainingProgress] = useState<
    Record<TrigramStance, TrainingProgress>
  >(() => {
    return TRIGRAM_STANCES_ORDER.reduce((acc, stance) => {
      acc[stance] = { practiceCount: 0, mastery: 0 };
      return acc;
    }, {} as Record<TrigramStance, TrainingProgress>);
  });

  const [currentTip, setCurrentTip] = useState<number>(0);
  const [selectedStance, setSelectedStance] = useState<TrigramStance>("geon");
  const audio = useAudio();

  const handleStancePractice = useCallback(
    (stance: TrigramStance) => {
      setTrainingProgress((prev: Record<TrigramStance, TrainingProgress>) => {
        const current = prev[stance];
        const newPracticeCount = current.practiceCount + 1;
        const newMastery = Math.min(100, current.mastery + 2);

        return {
          ...prev,
          [stance]: {
            practiceCount: newPracticeCount,
            mastery: newMastery,
          },
        };
      });

      setCurrentTip((prev: number) => (prev + 1) % trainingTips.length);

      if (audio.playSFX) {
        audio.playSFX("attack_light");
      }
    },
    [audio]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      const keyIndex = parseInt(key, 10);

      if (keyIndex >= 1 && keyIndex <= 8) {
        const targetStance = TRIGRAM_STANCES_ORDER[keyIndex - 1];
        if (targetStance) {
          setSelectedStance(targetStance);
          handleStancePractice(targetStance);
        }
      }
    },
    [handleStancePractice]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleStartTraining = () => {
    setTrainingProgress((prev: Record<TrigramStance, TrainingProgress>) => {
      const newProgress = { ...prev };
      Object.keys(newProgress).forEach((key) => {
        const stanceKey = key as TrigramStance;
        newProgress[stanceKey] = { practiceCount: 0, mastery: 0 };
      });
      return newProgress;
    });

    if (audio.playSFX) {
      audio.playSFX("match_start");
    }
  };

  const drawBackground = useCallback((g: PixiGraphics) => {
    g.clear();
    g.setFillStyle({ color: KOREAN_COLORS.BLACK });
    g.rect(0, 0, window.innerWidth, window.innerHeight);
    g.fill();
  }, []);

  const drawStanceIndicator = useCallback((g: PixiGraphics) => {
    g.clear();

    const radius = 60;
    g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 3, alpha: 0.6 });
    g.circle(0, 0, radius);
    g.stroke();

    g.setFillStyle({ color: KOREAN_COLORS.GOLD, alpha: 0.3 });
    g.circle(0, 0, radius);
    g.fill();
  }, []);

  const totalMastery = Object.values(trainingProgress).reduce(
    (sum: number, progress: TrainingProgress) => sum + progress.mastery,
    0
  );

  return (
    <Container>
      <Graphics draw={drawBackground} />

      <Text
        text="수련 모드 (Training Mode)"
        anchor={{ x: 0.5, y: 0.5 }}
        x={window.innerWidth / 2}
        y={50}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />

      <Text
        text={`현재 자세: ${
          TRIGRAM_DATA[selectedStance].koreanName
        } (${selectedStance.toUpperCase()})`}
        anchor={{ x: 0.5, y: 0.5 }}
        x={window.innerWidth / 2}
        y={100}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 24,
          fill: KOREAN_COLORS.WHITE,
        }}
      />

      <Container y={150}>
        {TRIGRAM_STANCES_ORDER.map((stance, index) => (
          <Text
            key={stance}
            text={`${index + 1}. ${TRIGRAM_DATA[stance].koreanName}`}
            x={(index % 4) * 200}
            y={Math.floor(index / 4) * 30}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 16,
              fill: KOREAN_COLORS.WHITE,
            }}
            interactive={true}
            onClick={() => {
              setSelectedStance(stance);
              handleStancePractice(stance);
            }}
          />
        ))}
      </Container>

      <Container y={250}>
        <Text
          text="훈련 진행도 (Training Progress)"
          anchor={{ x: 0.5, y: 0.5 }}
          x={window.innerWidth / 2}
          y={0}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 20,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
          }}
        />
        <Text
          text={`연습 횟수: ${trainingProgress[selectedStance].practiceCount}`}
          anchor={{ x: 0.5, y: 0.5 }}
          x={window.innerWidth / 2}
          y={30}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: KOREAN_COLORS.CYAN,
          }}
        />
        <Text
          text={`숙련도: ${trainingProgress[selectedStance].mastery}%`}
          anchor={{ x: 0.5, y: 0.5 }}
          x={window.innerWidth / 2}
          y={60}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: KOREAN_COLORS.GOLD,
          }}
        />
      </Container>

      <Container y={350}>
        <Text
          text={trainingTips[currentTip]?.korean || ""}
          anchor={{ x: 0.5, y: 0.5 }}
          x={window.innerWidth / 2}
          y={0}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.CYAN,
            fontStyle: "italic",
          }}
        />
        <Text
          text={trainingTips[currentTip]?.english || ""}
          anchor={{ x: 0.5, y: 0.5 }}
          x={window.innerWidth / 2}
          y={30}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: KOREAN_COLORS.WHITE,
          }}
        />
      </Container>

      <BaseButton
        text="훈련 시작 (Start Training)"
        x={window.innerWidth / 2 - 150}
        y={450}
        width={300}
        height={50}
        onClick={handleStartTraining}
        testId="start-training-button"
      />

      <BaseButton
        text="메뉴로 돌아가기 (Back to Menu)"
        x={window.innerWidth / 2 - 150}
        y={520}
        width={300}
        height={50}
        onClick={onBack}
        testId="back-to-menu-button"
      />

      <Container x={window.innerWidth - 100} y={100}>
        <Graphics draw={drawStanceIndicator} />
        <Text
          text={TRIGRAM_DATA[selectedStance]?.symbol || ""}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "serif",
            fontSize: 36,
            fill: KOREAN_COLORS.WHITE,
          }}
        />
      </Container>

      {/* Progress bar showing total mastery */}
      <Container x={50} y={80}>
        <Graphics
          draw={(g: PixiGraphics) => {
            g.clear();
            g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.8 });
            g.rect(0, 0, 300, 20);
            g.fill();

            const progressWidth = (totalMastery / (8 * 100)) * 300;
            g.setFillStyle({ color: KOREAN_COLORS.GOLD });
            g.rect(0, 0, progressWidth, 20);
            g.fill();

            g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
            g.rect(0, 0, 300, 20);
            g.stroke();
          }}
        />
        <Text
          text={`Total Mastery: ${Math.round(totalMastery / 8)}%`}
          x={150}
          y={10}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: KOREAN_COLORS.WHITE,
          }}
        />
      </Container>
    </Container>
  );
}
