import React, { useState, useCallback, useEffect } from "react";
import { Container, Graphics, Text } from "@pixi/react"; // Removed useTick
import type { TrigramStance } from "../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types";
import { TrigramWheel } from "../ui/TrigramWheel";
import { ProgressTracker } from "../ui/ProgressTracker";
import { useAudio } from "../../audio/AudioManager";
import type { Graphics as PixiGraphics } from "pixi.js";

interface TrainingScreenProps {
  readonly onExit: () => void;
}

export function TrainingScreen({
  onExit,
}: TrainingScreenProps): React.JSX.Element {
  const [currentStance, setCurrentStance] = useState<TrigramStance>("geon");
  const [practiceCount, setPracticeCount] = useState<
    Record<TrigramStance, number>
  >(
    Object.fromEntries(Object.keys(TRIGRAM_DATA).map((s) => [s, 0])) as Record<
      TrigramStance,
      number
    >
  );
  const audio = useAudio();

  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      setCurrentStance(stance);
      setPracticeCount((prev) => ({
        ...prev,
        [stance]: (prev[stance] || 0) + 1,
      }));
      audio.playStanceChangeSound();
      // Potentially play a sound unique to the stance or technique
    },
    [audio]
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key >= "1" && event.key <= "8") {
        const stanceIndex = parseInt(event.key, 10) - 1;
        const stance = Object.keys(TRIGRAM_DATA)[stanceIndex] as TrigramStance;
        if (stance) {
          handleStanceChange(stance);
        }
      } else if (event.key === "Escape" || event.key === "Backspace") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleStanceChange, onExit]);

  const totalPractices = Object.values(practiceCount).reduce(
    (sum, count) => sum + count,
    0
  );
  const overallProgress = Math.min(
    100,
    (totalPractices / (Object.keys(TRIGRAM_DATA).length * 10)) * 100
  ); // Example: 10 practices per stance for mastery

  return (
    <Container data-testid="training-screen">
      {/* Background */}
      <Graphics
        data-testid="dojang-background"
        draw={(g: PixiGraphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.BLACK);
          g.drawRect(0, 0, 800, 600); // Assuming 800x600 canvas
          g.endFill();
          // Add more sophisticated Dojang background later
        }}
      />

      <Text
        data-testid="korean-header"
        text="수련장 (Training Hall)"
        x={400}
        y={50}
        anchor={0.5}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 32,
          fill: KOREAN_COLORS.GOLD,
        }}
      />

      <Container x={400} y={300} data-testid="trigram-wheel-container">
        <TrigramWheel
          selectedStance={currentStance}
          onStanceChange={handleStanceChange}
          radius={120}
          interactive={true}
          isEnabled={true}
          playerKi={100} // Example Ki, can be dynamic
          playerMaxKi={100}
          data-testid="trigram-wheel"
        />
      </Container>

      <Container x={50} y={100} data-testid="training-instructions-container">
        <Text
          data-testid="training-instructions"
          text={`현재 자세: ${TRIGRAM_DATA[currentStance].koreanName} (${TRIGRAM_DATA[currentStance].symbol})\n연습 횟수: ${practiceCount[currentStance]}`}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
            align: "left",
          }}
        />
        <Text
          data-testid="instructions-korean"
          text="키보드 1-8로 자세를 변경하세요. Esc로 나가기."
          y={50}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: KOREAN_COLORS.LIGHT_GREY,
          }}
        />
      </Container>

      <Container x={550} y={100} data-testid="progress-container">
        <ProgressTracker
          label="전체 수련 진행도"
          current={Math.floor(overallProgress)}
          maximum={100}
          currentStance={currentStance} // Or undefined if not relevant here
        />
      </Container>

      <Container x={50} y={500} data-testid="training-tips-container">
        <Text
          data-testid="tips-title"
          text="수련 팁:"
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.YELLOW,
          }}
        />
        <Text
          data-testid="tip-1"
          y={30}
          text="- 각 자세의 기의 흐름을 느껴보세요."
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: KOREAN_COLORS.WHITE,
          }}
        />
        <Text
          data-testid="tip-2"
          y={50}
          text="- 반복 연습하여 기술을 숙달하세요."
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
