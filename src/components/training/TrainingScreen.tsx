import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import * as PIXI from "pixi.js";
import type { TrainingScreenProps } from "../../types/components";
import type { PlayerState } from "../../types/player";
import type { TrigramStance } from "../../types/trigram";
import type { KoreanTechnique } from "../../types/combat"; // Fix: Import from combat
import { TrigramStance as TrigramStanceEnum } from "../../types/enums";
import { TrainingCombatSystem } from "../../systems/combat/TrainingCombatSystem";
import { TRIGRAM_TECHNIQUES } from "../../types/constants/techniques";
import { Player } from "../game/Player";
import { TrigramWheel } from "../ui/TrigramWheel";
// Fix: Remove unused imports
import { DojangBackground } from "../game/DojangBackground";
import { KOREAN_COLORS } from "../../types/constants";
import { useAudio } from "../../audio/AudioProvider";
import {
  ResponsivePixiContainer,
  ResponsivePixiButton,
  ResponsivePixiPanel,
} from "../ui/base/ResponsivePixiComponents";

// Training modes for progressive learning
type TrainingMode = "basics" | "techniques" | "sparring" | "philosophy";
type TrainingDifficulty = "beginner" | "intermediate" | "advanced" | "master";

// Training session state
interface TrainingSession {
  mode: TrainingMode;
  difficulty: TrainingDifficulty;
  successRate: number;
  techniquesAttempted: number;
  perfectStrikes: number;
  currentCombo: number;
  maxCombo: number;
  sessionTime: number;
  instructor: string;
}

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  onReturnToMenu,
  player,
  onPlayerUpdate,
  width = 1200,
  height = 800,
  x = 0,
  y = 0,
}) => {
  // Core training state
  const [selectedStance, setSelectedStance] = useState<TrigramStance>(
    TrigramStanceEnum.GEON
  );
  const [trainingMode, setTrainingMode] = useState<TrainingMode>("basics");
  const [difficulty, setDifficulty] = useState<TrainingDifficulty>("beginner");
  const [isTraining, setIsTraining] = useState(false);
  const [currentTechnique, setCurrentTechnique] =
    useState<KoreanTechnique | null>(null);

  // Training session tracking
  const [session, setSession] = useState<TrainingSession>({
    mode: "basics",
    difficulty: "beginner",
    successRate: 0,
    techniquesAttempted: 0,
    perfectStrikes: 0,
    currentCombo: 0,
    maxCombo: 0,
    sessionTime: 0,
    instructor: "사범님", // Korean for instructor/master
  });

  // Visual feedback
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  // Fix: Remove unused showInstructions
  const [targetPoints, setTargetPoints] = useState<
    Array<{ id: string; x: number; y: number; active: boolean }>
  >([]);

  // Asset loading
  const [dojangTextures, setDojangTextures] = useState<{
    floor: PIXI.Texture | null;
    wall: PIXI.Texture | null;
    woodenDummy: PIXI.Texture | null;
  }>({ floor: null, wall: null, woodenDummy: null });

  // Training system
  const trainingSystemRef = useRef<TrainingCombatSystem>(
    new TrainingCombatSystem() // Fix: Create instance directly, not function
  );
  const sessionTimerRef = useRef<NodeJS.Timeout | undefined>(undefined); // Fix: Provide initial value

  // Audio integration
  const audio = useAudio();

  // Responsive calculations
  const { isMobile, isTablet } = useMemo(() => {
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    return { isMobile, isTablet };
  }, [width, height]);

  // Enhanced asset loading with training-specific resources
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const [floor, wall, dummy] = await Promise.all([
          PIXI.Assets.load("/src/assets/visual/bg/dojang/dojang_floor_tex.png"),
          PIXI.Assets.load("/src/assets/visual/bg/dojang/dojang_wall_tex.png"),
          // Add wooden dummy texture if available
          PIXI.Assets.load(
            "/src/assets/visual/training/wooden_dummy.png"
          ).catch(() => null),
        ]);
        setDojangTextures({
          floor: floor as PIXI.Texture,
          wall: wall as PIXI.Texture,
          woodenDummy: dummy as PIXI.Texture,
        });
      } catch (err) {
        console.warn("Failed to load training assets", err);
      }
    };
    loadAssets();
  }, []);

  // Session timer
  useEffect(() => {
    if (isTraining) {
      sessionTimerRef.current = setInterval(() => {
        setSession((prev) => ({ ...prev, sessionTime: prev.sessionTime + 1 }));
      }, 1000);
    } else {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    }
    return () => {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    };
  }, [isTraining]);

  // Enhanced player state with training progression
  const trainingPlayer = useMemo(() => {
    return (player || {
      id: "training_player",
      name: { korean: "수련생", english: "Student" },
      health: 100,
      maxHealth: 100,
      ki: 100,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      currentStance: selectedStance,
      position: { x: width * 0.3, y: height * 0.6 },
      // ...other required properties
    }) as PlayerState;
  }, [player, selectedStance, width, height]);

  // Fix: Remove unused trainingDummy

  // Core training mechanics
  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      setSelectedStance(stance);
      audio.playSoundEffect("stance_change");

      // Update player stance
      if (onPlayerUpdate) {
        onPlayerUpdate({ currentStance: stance });
      }

      // Fix: Complete stance instructions mapping
      const stanceInstructions: Record<TrigramStance, string> = {
        [TrigramStanceEnum.GEON]: "건괘: 직선적인 강력한 공격에 집중하세요",
        [TrigramStanceEnum.TAE]: "태괘: 유연하고 적응적인 움직임을 연습하세요",
        [TrigramStanceEnum.LI]: "리괘: 정확하고 예리한 타격을 목표로 하세요",
        [TrigramStanceEnum.JIN]: "진괘: 폭발적인 힘을 발휘하세요",
        [TrigramStanceEnum.SON]: "손괘: 바람처럼 연속적인 공격을 하세요",
        [TrigramStanceEnum.GAM]: "감괘: 물처럼 유연하게 흘러가세요",
        [TrigramStanceEnum.GAN]: "간괘: 산처럼 견고한 방어를 하세요",
        [TrigramStanceEnum.GON]: "곤괘: 대지처럼 포용적인 자세를 취하세요",
      };

      setFeedbackMessage(
        stanceInstructions[stance] || "새로운 자세를 연습하세요"
      );
    },
    [onPlayerUpdate, audio]
  );

  // Execute technique training
  const handleTechniqueExecution = useCallback(() => {
    if (!currentTechnique || !isTraining) return;

    const result = trainingSystemRef.current.executeTrainingTechnique(
      trainingPlayer,
      currentTechnique
    );

    // Update session statistics
    setSession((prev) => ({
      ...prev,
      techniquesAttempted: prev.techniquesAttempted + 1,
      perfectStrikes:
        result.accuracyScore > 0.9
          ? prev.perfectStrikes + 1
          : prev.perfectStrikes,
      currentCombo: result.hit ? prev.currentCombo + 1 : 0,
      maxCombo: Math.max(prev.maxCombo, result.hit ? prev.currentCombo + 1 : 0),
      successRate:
        ((prev.perfectStrikes + (result.accuracyScore > 0.9 ? 1 : 0)) /
          (prev.techniquesAttempted + 1)) *
        100,
    }));

    // Provide detailed feedback
    const feedback = generateTechniqueFeedback(result);
    setFeedbackMessage(feedback);

    // Audio feedback
    if (result.accuracyScore > 0.9) {
      audio.playSoundEffect("perfect_strike");
    } else if (result.hit) {
      audio.playSoundEffect("hit_success");
    } else {
      audio.playSoundEffect("miss");
    }

    // Fix: Remove unused variables
    console.log("Hit effect created for result:", result);
  }, [currentTechnique, isTraining, trainingPlayer, audio]);

  // Generate contextual feedback
  const generateTechniqueFeedback = useCallback((result: any) => {
    if (result.accuracyScore > 0.9) {
      return "완벽한 기법입니다! Perfect technique!";
    } else if (result.accuracyScore > 0.7) {
      return "좋은 시도입니다. 자세를 더 안정화하세요.";
    } else if (result.accuracyScore > 0.5) {
      return "타이밍을 개선하세요. Focus on timing.";
    } else {
      return "기본 자세부터 다시 연습하세요.";
    }
  }, []);

  // Training mode progression
  const handleTrainingModeChange = useCallback(
    (mode: TrainingMode) => {
      setTrainingMode(mode);
      setIsTraining(false);

      // Load appropriate techniques for the mode
      const techniques = TRIGRAM_TECHNIQUES[selectedStance] || [];
      if (techniques.length > 0) {
        setCurrentTechnique(techniques[0]);
      }

      // Mode-specific instructions
      const modeInstructions = {
        basics: "기본 자세와 호흡법을 연습합니다",
        techniques: "특정 기법들을 반복 연습합니다",
        sparring: "실전 상황을 시뮬레이션합니다",
        philosophy: "무술의 철학과 원리를 학습합니다",
      };

      setFeedbackMessage(modeInstructions[mode]);
      audio.playSoundEffect("menu_select");
    },
    [selectedStance, audio]
  );

  // Start training session
  const handleTrainingStart = useCallback(() => {
    setIsTraining(true);

    // Reset session if needed
    setSession((prev) => ({
      ...prev,
      mode: trainingMode,
      difficulty,
      sessionTime: 0,
    }));

    // Generate target points for precision training
    if (trainingMode === "techniques") {
      const points = generateTargetPoints();
      setTargetPoints(points);
      console.log("Generated target points:", points); // Fix: Use points
    }

    audio.playSoundEffect("training_start");
    setFeedbackMessage("훈련을 시작합니다! Training begins!");
  }, [trainingMode, difficulty, audio]);

  // Generate target points for precision training
  const generateTargetPoints = useCallback(() => {
    const dummyX = width * 0.7;
    const dummyY = height * 0.6;

    // Add vital points around the dummy
    const vitalPoints = [
      { id: "head", x: dummyX, y: dummyY - 80, active: true },
      { id: "chest", x: dummyX, y: dummyY - 20, active: true },
      { id: "solar_plexus", x: dummyX, y: dummyY + 10, active: true },
      { id: "abdomen", x: dummyX, y: dummyY + 40, active: true },
    ];

    return vitalPoints;
  }, [width, height]);

  // Training evaluation and progression
  const evaluateTrainingSession = useCallback(() => {
    const stats = trainingSystemRef.current.getTrainingStats();

    let evaluation = "";
    if (stats.overallAccuracy > 0.8) {
      evaluation = "뛰어난 실력입니다! 다음 단계로 진행하세요.";
    } else if (stats.overallAccuracy > 0.6) {
      evaluation = "좋은 진전입니다. 계속 연습하세요.";
    } else {
      evaluation = "더 많은 연습이 필요합니다.";
    }

    setFeedbackMessage(evaluation);
    return stats;
  }, []);

  return (
    <ResponsivePixiContainer
      x={x}
      y={y}
      screenWidth={width}
      screenHeight={height}
      data-testid="training-screen"
    >
      {/* Enhanced Dojang Background with Full Screen Coverage */}
      <DojangBackground
        width={width}
        height={height}
        lighting="traditional"
        animate={true}
        data-testid="dojang-background"
      />

      {/* Full-Screen Overlay for Better Visual Depth */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          // Cyberpunk grid overlay
          g.stroke({
            width: 1,
            color: KOREAN_COLORS.PRIMARY_CYAN,
            alpha: 0.08,
          });
          const gridSize = isMobile ? 25 : isTablet ? 35 : 45;
          for (let i = 0; i < width; i += gridSize) {
            g.moveTo(i, 0);
            g.lineTo(i, height);
          }
          for (let i = 0; i < height; i += gridSize) {
            g.moveTo(0, i);
            g.lineTo(width, i);
          }
          g.stroke();

          // Korean traditional border
          g.stroke({ width: 3, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
          g.rect(10, 10, width - 20, height - 20);
          g.stroke();
        }}
        data-testid="training-overlay"
      />

      {/* Responsive Header - Adapts to Screen Size */}
      <ResponsivePixiContainer
        x={width / 2}
        y={isMobile ? 30 : isTablet ? 35 : 40}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-header"
      >
        <pixiText
          text="흑괘 무술 도장"
          style={{
            fontSize: isMobile ? 18 : isTablet ? 24 : 32,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
            align: "center",
          }}
          anchor={0.5}
          data-testid="training-title"
        />

        <pixiText
          text={`수련 모드: ${session.mode} | 난이도: ${session.difficulty}`}
          style={{
            fontSize: isMobile ? 10 : isTablet ? 14 : 16,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "center",
          }}
          y={isMobile ? 25 : isTablet ? 30 : 35}
          anchor={0.5}
          data-testid="training-mode-display"
        />
      </ResponsivePixiContainer>

      {/* Responsive Training Controls Panel */}
      <ResponsivePixiPanel
        title="수련 설정"
        x={isMobile ? 10 : 20}
        y={isMobile ? 80 : 100}
        width={isMobile ? width - 20 : isTablet ? 400 : 500}
        height={isMobile ? 140 : 180}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-controls"
      >
        {/* Mode Selection - Responsive Grid */}
        <ResponsivePixiContainer
          x={0}
          y={0}
          screenWidth={width}
          screenHeight={height}
          data-testid="mode-selection"
        >
          {(
            ["basics", "techniques", "sparring", "philosophy"] as TrainingMode[]
          ).map((mode, index) => {
            const buttonsPerRow = isMobile ? 2 : 4;
            const buttonWidth = isMobile ? 80 : 100;
            const buttonHeight = isMobile ? 30 : 40;
            const xPos = (index % buttonsPerRow) * (buttonWidth + 10);
            const yPos =
              Math.floor(index / buttonsPerRow) * (buttonHeight + 10);

            return (
              <ResponsivePixiButton
                key={mode}
                text={
                  mode === "basics"
                    ? "기초"
                    : mode === "techniques"
                    ? "기법"
                    : mode === "sparring"
                    ? "실전"
                    : "철학"
                }
                x={xPos}
                y={yPos}
                width={buttonWidth}
                height={buttonHeight}
                screenWidth={width}
                screenHeight={height}
                variant={trainingMode === mode ? "primary" : "secondary"}
                onClick={() => handleTrainingModeChange(mode)}
                data-testid={`mode-${mode}`}
              />
            );
          })}
        </ResponsivePixiContainer>

        {/* Difficulty Selection - Responsive Layout */}
        <ResponsivePixiContainer
          x={0}
          y={isMobile ? 80 : 60}
          screenWidth={width}
          screenHeight={height}
          data-testid="difficulty-selection"
        >
          {(
            [
              "beginner",
              "intermediate",
              "advanced",
              "master",
            ] as TrainingDifficulty[]
          ).map((diff, index) => {
            const buttonWidth = isMobile ? 60 : 75;
            const buttonHeight = isMobile ? 25 : 30;
            const xPos = index * (buttonWidth + 8);

            return (
              <ResponsivePixiButton
                key={diff}
                text={
                  diff === "beginner"
                    ? "초급"
                    : diff === "intermediate"
                    ? "중급"
                    : diff === "advanced"
                    ? "고급"
                    : "사범"
                }
                x={xPos}
                y={0}
                width={buttonWidth}
                height={buttonHeight}
                screenWidth={width}
                screenHeight={height}
                variant={difficulty === diff ? "primary" : "secondary"}
                onClick={() => setDifficulty(diff)}
                data-testid={`difficulty-${diff}`}
              />
            );
          })}
        </ResponsivePixiContainer>
      </ResponsivePixiPanel>

      {/* Responsive Stance Selection */}
      <ResponsivePixiContainer
        x={isMobile ? 20 : 30}
        y={height - (isMobile ? 180 : 200)}
        screenWidth={width}
        screenHeight={height}
        data-testid="stance-selection"
      >
        <TrigramWheel
          currentStance={selectedStance}
          onStanceChange={handleStanceChange}
          size={isMobile ? 100 : isTablet ? 130 : 150}
          showLabels={true}
          data-testid="trigram-wheel"
        />

        <pixiText
          text={`현재 자세: ${selectedStance}`}
          style={{
            fontSize: isMobile ? 10 : 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          x={isMobile ? 110 : isTablet ? 140 : 160}
          y={20}
          data-testid="current-stance-display"
        />
      </ResponsivePixiContainer>

      {/* Responsive Statistics Panel */}
      <ResponsivePixiPanel
        title="훈련 통계"
        x={width - (isMobile ? width * 0.95 : isTablet ? 280 : 250)}
        y={isMobile ? height * 0.35 : 100}
        width={isMobile ? width * 0.9 : isTablet ? 260 : 230}
        height={isMobile ? height * 0.25 : 300}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-stats"
      >
        {/* Statistics Content - Responsive Text */}
        <ResponsivePixiContainer
          x={0}
          y={0}
          screenWidth={width}
          screenHeight={height}
        >
          <pixiText
            text={`시간: ${Math.floor(session.sessionTime / 60)}:${(
              session.sessionTime % 60
            )
              .toString()
              .padStart(2, "0")}`}
            style={{
              fontSize: isMobile ? 10 : 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            y={0}
            data-testid="session-time"
          />
          <pixiText
            text={`시도: ${session.techniquesAttempted}`}
            style={{
              fontSize: isMobile ? 10 : 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            y={isMobile ? 15 : 20}
            data-testid="attempts-count"
          />
          <pixiText
            text={`성공률: ${session.successRate.toFixed(1)}%`}
            style={{
              fontSize: isMobile ? 10 : 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            y={isMobile ? 30 : 40}
            data-testid="success-rate"
          />
          <pixiText
            text={`완벽한 타격: ${session.perfectStrikes}`}
            style={{
              fontSize: isMobile ? 10 : 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            y={isMobile ? 45 : 60}
            data-testid="perfect-strikes"
          />
          <pixiText
            text={`최대 연속: ${session.maxCombo}`}
            style={{
              fontSize: isMobile ? 10 : 12,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            y={isMobile ? 60 : 80}
            data-testid="max-combo"
          />

          {/* Progress Bar - Responsive */}
          <pixiGraphics
            draw={(g) => {
              g.clear();
              const barWidth = isMobile ? 150 : 200;
              const barHeight = isMobile ? 10 : 15;
              const yPos = isMobile ? 80 : 110;

              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK });
              g.rect(0, yPos, barWidth, barHeight);
              g.fill();
              g.fill({ color: KOREAN_COLORS.POSITIVE_GREEN });
              g.rect(
                0,
                yPos,
                barWidth * (session.successRate / 100),
                barHeight
              );
              g.fill();
            }}
          />
        </ResponsivePixiContainer>
      </ResponsivePixiPanel>

      {/* Responsive Action Buttons */}
      <ResponsivePixiContainer
        x={width / 2 - (isMobile ? 160 : 200)}
        y={height - (isMobile ? 60 : 80)}
        screenWidth={width}
        screenHeight={height}
        data-testid="action-buttons"
      >
        {!isTraining ? (
          <ResponsivePixiButton
            text="훈련 시작"
            x={0}
            y={0}
            width={isMobile ? 100 : 120}
            height={isMobile ? 40 : 50}
            screenWidth={width}
            screenHeight={height}
            variant="primary"
            onClick={handleTrainingStart}
            data-testid="start-training-button"
          />
        ) : (
          <ResponsivePixiButton
            text="기법 실행"
            x={0}
            y={0}
            width={isMobile ? 100 : 120}
            height={isMobile ? 40 : 50}
            screenWidth={width}
            screenHeight={height}
            variant="primary"
            onClick={handleTechniqueExecution}
            data-testid="execute-technique-button"
          />
        )}

        <ResponsivePixiButton
          text="평가"
          x={isMobile ? 110 : 130}
          y={0}
          width={isMobile ? 80 : 100}
          height={isMobile ? 40 : 50}
          screenWidth={width}
          screenHeight={height}
          variant="secondary"
          onClick={evaluateTrainingSession}
          data-testid="evaluate-button"
        />

        <ResponsivePixiButton
          text="메뉴로"
          x={isMobile ? 200 : 240}
          y={0}
          width={isMobile ? 80 : 100}
          height={isMobile ? 40 : 50}
          screenWidth={width}
          screenHeight={height}
          variant="secondary"
          onClick={onReturnToMenu}
          data-testid="return-menu-button"
        />
      </ResponsivePixiContainer>

      {/* Enhanced Feedback Display - Full Width on Mobile */}
      <ResponsivePixiPanel
        x={isMobile ? 10 : width / 2 - 200}
        y={height - (isMobile ? 140 : 150)}
        width={isMobile ? width - 20 : 400}
        height={isMobile ? 50 : 60}
        screenWidth={width}
        screenHeight={height}
        data-testid="feedback-display"
      >
        <pixiText
          text={feedbackMessage}
          style={{
            fontSize: isMobile ? 11 : 14,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
            wordWrap: true,
            wordWrapWidth: isMobile ? width - 40 : 380,
          }}
          x={(isMobile ? width - 40 : 400) / 2}
          y={0}
          anchor={0.5}
          data-testid="feedback-message"
        />
      </ResponsivePixiPanel>

      {/* Training Player Display with Enhanced Visuals */}
      <Player
        playerState={trainingPlayer}
        playerIndex={0}
        x={width * 0.3}
        y={height * 0.6}
        onClick={() => console.log("Player clicked")}
        data-testid="training-player"
      />

      {/* Training Dummy with Target Points */}
      <pixiContainer
        x={width * 0.7}
        y={height * 0.6}
        data-testid="training-dummy-container"
      >
        {dojangTextures.woodenDummy ? (
          <pixiSprite
            texture={dojangTextures.woodenDummy}
            anchor={0.5}
            scale={0.8}
            data-testid="wooden-dummy"
          />
        ) : (
          // Fallback wooden dummy representation
          <pixiGraphics
            draw={(g) => {
              g.clear();
              // Draw wooden dummy shape
              g.fill({ color: 0x8b4513 }); // Brown color
              g.rect(-20, -80, 40, 160);
              g.fill();
              // Arms
              g.rect(-60, -40, 40, 20);
              g.rect(20, -40, 40, 20);
              g.fill();
              // Head
              g.circle(0, -100, 25);
              g.fill();
            }}
            data-testid="dummy-graphic"
          />
        )}

        {/* Target Points for Precision Training */}
        {targetPoints.map((point) => (
          <pixiContainer
            key={point.id}
            x={point.x - width * 0.7}
            y={point.y - height * 0.6}
          >
            <pixiGraphics
              draw={(g) => {
                g.clear();
                if (point.active) {
                  g.stroke({
                    width: 2,
                    color: KOREAN_COLORS.CRITICAL_HIT,
                    alpha: 0.8,
                  });
                  g.circle(0, 0, 15);
                  g.stroke();
                  // Crosshair
                  g.moveTo(-10, 0);
                  g.lineTo(10, 0);
                  g.moveTo(0, -10);
                  g.lineTo(0, 10);
                  g.stroke();
                }
              }}
              data-testid={`target-point-${point.id}`}
            />
          </pixiContainer>
        ))}
      </pixiContainer>

      {/* Traditional Korean Instructor Wisdom */}
      <pixiContainer x={20} y={height - 80} data-testid="instructor-wisdom">
        <pixiText
          text={`${session.instructor}: "수련은 끝이 없다 - Training never ends"`}
          style={{
            fontSize: 11,
            fill: KOREAN_COLORS.ACCENT_CYAN,
            fontStyle: "italic",
          }}
          data-testid="instructor-quote"
        />
      </pixiContainer>
    </ResponsivePixiContainer>
  );
};

export default TrainingScreen;
