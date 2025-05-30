import React, { useState, useCallback, useEffect } from "react";
import { Stage } from "@pixi/react";
import { KoreanContainer, KoreanText } from "../ui/base";
import { BaseButton } from "../ui/base/BaseButton";
import { TrigramWheel } from "../ui/TrigramWheel";
import { ProgressTracker } from "../ui/ProgressTracker";
import { KoreanHeader } from "../ui/KoreanHeader";
import { DojangBackground } from "../game/DojangBackground";
import { Player } from "../game/Player";
import type {
  GamePhase,
  TrigramStance,
  PlayerState,
  TrainingProgress,
  KoreanTechnique,
} from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS, createPlayerState } from "../../types";
import { useAudio } from "../../audio/AudioManager";

export interface TrainingScreenProps {
  readonly onGamePhaseChange: (phase: GamePhase) => void;
}

interface TrainingSession {
  readonly stance: TrigramStance;
  readonly technique: KoreanTechnique;
  readonly targetHits: number;
  readonly successfulHits: number;
  readonly accuracy: number;
  readonly startTime: number;
}

export function TrainingScreen({
  onGamePhaseChange,
}: TrainingScreenProps): React.ReactElement {
  // Training state
  const [currentStance, setCurrentStance] = useState<TrigramStance>("geon");
  const [trainingMode, setTrainingMode] = useState<
    "basics" | "techniques" | "combinations"
  >("basics");
  const [playerState, setPlayerState] = useState<PlayerState>(() =>
    createPlayerState("trainee", { x: 200, y: 300 }, "geon")
  );

  // Training progress tracking
  const [trainingProgress, setTrainingProgress] = useState<
    Record<TrigramStance, TrainingProgress>
  >(() =>
    Object.keys(TRIGRAM_DATA).reduce(
      (acc, stance) => ({
        ...acc,
        [stance as TrigramStance]: { practiceCount: 0, mastery: 0 },
      }),
      {} as Record<TrigramStance, TrainingProgress>
    )
  );

  const [currentSession, setCurrentSession] = useState<TrainingSession | null>(
    null
  );
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  const audio = useAudio();

  // Handle stance changes with audio feedback
  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      setCurrentStance(stance);
      setPlayerState((prev) => ({ ...prev, stance }));

      // Update training progress
      setTrainingProgress((prev) => ({
        ...prev,
        [stance]: {
          ...prev[stance],
          practiceCount: prev[stance].practiceCount + 1,
          mastery: Math.min(1.0, prev[stance].mastery + 0.05),
        },
      }));

      // Audio feedback for stance change
      if (audio.playStanceChangeSound) {
        audio.playStanceChangeSound();
      }
    },
    [audio]
  );

  // Start technique practice session - fix undefined stance issue
  const startTechniqueSession = useCallback((stance: TrigramStance) => {
    const stanceData = TRIGRAM_DATA[stance];
    if (!stanceData?.technique) {
      console.warn(`No technique found for stance: ${stance}`);
      return;
    }

    const technique = stanceData.technique;
    setCurrentSession({
      stance,
      technique,
      targetHits: 10,
      successfulHits: 0,
      accuracy: 0,
      startTime: Date.now(),
    });
  }, []);

  // Practice technique execution
  const executeTechnique = useCallback(() => {
    if (!currentSession) return;

    const accuracy = 0.7 + Math.random() * 0.3; // Simulate practice accuracy
    const isSuccessful = accuracy > 0.6;

    if (isSuccessful && audio.playAttackSound) {
      audio.playAttackSound(currentSession.technique.damage);
    }

    setCurrentSession((prev) => {
      if (!prev) return null;

      const successfulHits = isSuccessful
        ? prev.successfulHits + 1
        : prev.successfulHits;
      const totalAttempts = prev.successfulHits + 1;

      return {
        ...prev,
        successfulHits,
        accuracy: successfulHits / totalAttempts,
      };
    });

    // Complete session if target reached
    if (
      currentSession.successfulHits + (isSuccessful ? 1 : 0) >=
      currentSession.targetHits
    ) {
      setCurrentSession(null);
      setTrainingProgress((prev) => ({
        ...prev,
        [currentSession.stance]: {
          ...prev[currentSession.stance],
          mastery: Math.min(1.0, prev[currentSession.stance].mastery + 0.1),
        },
      }));
    }
  }, [currentSession, audio]);

  // Keyboard controls for stance changes
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = parseInt(event.key);
      if (key >= 1 && key <= 8) {
        const stances: TrigramStance[] = [
          "geon",
          "tae",
          "li",
          "jin",
          "son",
          "gam",
          "gan",
          "gon",
        ];
        const selectedStance = stances[key - 1];
        if (selectedStance) {
          handleStanceChange(selectedStance);
        }
      } else if (event.code === "Space") {
        event.preventDefault();
        if (currentSession) {
          executeTechnique();
        } else {
          startTechniqueSession(currentStance);
        }
      } else if (event.code === "Escape") {
        onGamePhaseChange("intro");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    currentStance,
    currentSession,
    handleStanceChange,
    executeTechnique,
    startTechniqueSession,
    onGamePhaseChange,
  ]);

  const renderTrainingModeSelector = (): React.ReactElement => (
    <KoreanContainer koreanTheme={true} traditionalBorder={true} x={50} y={50}>
      <KoreanText
        koreanText="수련 방식 (Training Mode)"
        size={18}
        weight="bold"
        x={0}
        y={-20}
        anchor={{ x: 0.5, y: 0.5 }}
      />

      {(["basics", "techniques", "combinations"] as const).map(
        (mode, index) => {
          const modeLabels = {
            basics: { korean: "기본기", english: "Basics" },
            techniques: { korean: "기술", english: "Techniques" },
            combinations: { korean: "연계기", english: "Combinations" },
          };

          return (
            <BaseButton
              key={mode}
              label={`${modeLabels[mode].korean} (${modeLabels[mode].english})`}
              x={0}
              y={index * 50 + 10}
              width={200}
              height={40}
              onClick={() => setTrainingMode(mode)}
              variant={trainingMode === mode ? "primary" : "secondary"}
              testId={`training-mode-${mode}`}
            />
          );
        }
      )}
    </KoreanContainer>
  );

  const renderCurrentTechnique = (): React.ReactElement => {
    const technique = TRIGRAM_DATA[currentStance]?.technique;

    if (!technique) {
      return (
        <KoreanContainer
          koreanTheme={true}
          traditionalBorder={true}
          x={300}
          y={50}
        >
          <KoreanText
            koreanText="기술 정보 없음 (No Technique Data)"
            size={16}
            weight="bold"
            color={KOREAN_COLORS.GRAY_MEDIUM}
            x={0}
            y={10}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        </KoreanContainer>
      );
    }

    return (
      <KoreanContainer
        koreanTheme={true}
        traditionalBorder={true}
        x={300}
        y={50}
      >
        <KoreanText
          koreanText="현재 기술 (Current Technique)"
          size={16}
          weight="bold"
          x={0}
          y={-20}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <KoreanText
          koreanText={technique.koreanName}
          size={20}
          weight="bold"
          color={KOREAN_COLORS.GOLD}
          x={0}
          y={10}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <KoreanText
          koreanText={`(${technique.englishName})`}
          size={14}
          color={KOREAN_COLORS.GRAY_LIGHT}
          x={0}
          y={30}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <KoreanText
          koreanText={technique.description.korean}
          size={12}
          x={0}
          y={50}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        {/* Technique stats */}
        <KoreanText
          koreanText={`데미지: ${technique.damage} | 기력: ${technique.kiCost} | 사정거리: ${technique.range}`}
          size={10}
          color={KOREAN_COLORS.CYAN}
          x={0}
          y={70}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      </KoreanContainer>
    );
  };

  const renderTrainingProgress = (): React.ReactElement => (
    <KoreanContainer koreanTheme={true} traditionalBorder={true} x={550} y={50}>
      <KoreanText
        koreanText="수련 진도 (Training Progress)"
        size={16}
        weight="bold"
        x={0}
        y={-20}
        anchor={{ x: 0.5, y: 0.5 }}
      />

      <ProgressTracker
        label={`${
          TRIGRAM_DATA[currentStance]?.koreanName || currentStance
        } 숙련도`}
        current={Math.floor(trainingProgress[currentStance].mastery * 100)}
        maximum={100}
        currentStance={currentStance}
      />

      <KoreanText
        koreanText={`연습 횟수: ${trainingProgress[currentStance].practiceCount}`}
        size={12}
        color={KOREAN_COLORS.GRAY_LIGHT}
        x={0}
        y={40}
        anchor={{ x: 0.5, y: 0.5 }}
      />
    </KoreanContainer>
  );

  const renderSessionStatus = (): React.ReactElement | null => {
    if (!currentSession) return null;

    return (
      <KoreanContainer
        koreanTheme={true}
        traditionalBorder={true}
        x={300}
        y={200}
      >
        <KoreanText
          koreanText="훈련 세션 (Training Session)"
          size={16}
          weight="bold"
          x={0}
          y={-20}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <KoreanText
          koreanText={`목표: ${currentSession.targetHits}회 성공`}
          size={14}
          x={0}
          y={10}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <KoreanText
          koreanText={`성공: ${currentSession.successfulHits}/${currentSession.targetHits}`}
          size={14}
          color={KOREAN_COLORS.GOLD}
          x={0}
          y={30}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <ProgressTracker
          label="정확도"
          current={Math.floor(currentSession.accuracy * 100)}
          maximum={100}
        />

        <KoreanText
          koreanText="스페이스 키로 기술 실행"
          size={12}
          color={KOREAN_COLORS.CYAN}
          x={0}
          y={70}
          anchor={{ x: 0.5, y: 0.5 }}
        />
      </KoreanContainer>
    );
  };

  const renderInstructions = (): React.ReactElement | null => {
    if (!showInstructions) return null;

    return (
      <KoreanContainer
        koreanTheme={true}
        traditionalBorder={true}
        x={50}
        y={450}
      >
        <KoreanText
          koreanText="조작법 (Controls)"
          size={16}
          weight="bold"
          x={0}
          y={-20}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <KoreanText
          koreanText="1-8: 팔괘 자세 변경 | 스페이스: 기술 연습 | ESC: 메뉴로 돌아가기"
          size={12}
          x={0}
          y={10}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <BaseButton
          label="지시사항 숨기기"
          x={0}
          y={30}
          width={120}
          height={25}
          onClick={() => setShowInstructions(false)}
          variant="secondary"
        />
      </KoreanContainer>
    );
  };

  return (
    <Stage
      width={800}
      height={600}
      options={{ backgroundColor: KOREAN_COLORS.DARK_BLUE }}
    >
      {/* Traditional Korean dojang background - fix missing props */}
      <DojangBackground width={800} height={600} />

      {/* Korean martial arts header */}
      <KoreanHeader
        title="흑괘 무술 수련장"
        subtitle="Black Trigram Training Dojo"
      />

      {/* Training mode selector */}
      {renderTrainingModeSelector()}

      {/* Current technique display */}
      {renderCurrentTechnique()}

      {/* Training progress */}
      {renderTrainingProgress()}

      {/* Trigram wheel for stance selection */}
      <TrigramWheel
        selectedStance={currentStance}
        onStanceChange={handleStanceChange}
        x={100}
        y={300}
        radius={80}
        isEnabled={!currentSession}
        playerKi={playerState.ki}
        playerMaxKi={playerState.maxKi}
      />

      {/* Player character - fix props interface */}
      <Player player={playerState} isLocalPlayer={true} />

      {/* Training session status */}
      {renderSessionStatus()}

      {/* Instructions */}
      {renderInstructions()}

      {/* Navigation buttons */}
      <BaseButton
        label="메뉴로 돌아가기 (Back to Menu)"
        x={600}
        y={500}
        width={180}
        height={40}
        onClick={() => onGamePhaseChange("intro")}
        variant="secondary"
        testId="back-to-menu"
      />

      <BaseButton
        label="실전 대련 (Combat Mode)"
        x={600}
        y={550}
        width={180}
        height={40}
        onClick={() => onGamePhaseChange("combat")}
        variant="primary"
        testId="enter-combat"
      />
    </Stage>
  );
}
