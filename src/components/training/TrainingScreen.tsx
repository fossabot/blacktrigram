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
  const isMobile = width < 768;
  // Fix: Remove unused isTablet

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
    <pixiContainer x={x} y={y} data-testid="training-screen">
      {/* Enhanced Dojang Background with Authentic Atmosphere */}
      <DojangBackground
        width={width}
        height={height}
        lighting="traditional"
        animate={true}
        data-testid="dojang-background"
      />

      {/* Floor texturing for authentic dojang feel */}
      {dojangTextures.floor && (
        <pixiSprite
          texture={dojangTextures.floor}
          x={0}
          y={height * 0.75}
          width={width}
          height={height * 0.25}
          alpha={0.8}
          data-testid="dojang-floor"
        />
      )}

      {/* Traditional Korean dojang elements */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          // Traditional Korean border pattern
          g.stroke({ width: 3, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
          g.rect(10, 10, width - 20, height - 20);
          g.stroke();

          // Training area boundaries
          g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.4 });
          g.rect(width * 0.1, height * 0.2, width * 0.8, height * 0.6);
          g.stroke();
        }}
        data-testid="dojang-boundaries"
      />

      {/* Enhanced Header with Training Status */}
      <pixiContainer x={width / 2} y={40} data-testid="training-header">
        <pixiText
          text="흑괘 무술 도장"
          style={{
            fontSize: isMobile ? 20 : 32,
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
            fontSize: isMobile ? 12 : 16,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "center",
          }}
          y={35}
          anchor={0.5}
          data-testid="training-mode-display"
        />
      </pixiContainer>

      {/* Comprehensive Training Control Panel */}
      <pixiContainer x={20} y={100} data-testid="training-controls">
        {/* Mode Selection */}
        <pixiContainer y={0} data-testid="mode-selection">
          <pixiText
            text="수련 모드 선택"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
            }}
            data-testid="mode-title"
          />

          {(
            ["basics", "techniques", "sparring", "philosophy"] as TrainingMode[]
          ).map((mode, index) => (
            <pixiContainer
              key={mode}
              x={index * 120}
              y={25}
              data-testid={`mode-${mode}`}
            >
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  const isSelected = trainingMode === mode;
                  g.fill({
                    color: isSelected
                      ? KOREAN_COLORS.ACCENT_GOLD
                      : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                    alpha: 0.8,
                  });
                  g.roundRect(0, 0, 110, 40, 6);
                  g.fill();
                  g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_CYAN });
                  g.roundRect(0, 0, 110, 40, 6);
                  g.stroke();
                }}
                interactive={true}
                onPointerDown={() => handleTrainingModeChange(mode)}
              />
              <pixiText
                text={
                  mode === "basics"
                    ? "기초"
                    : mode === "techniques"
                    ? "기법"
                    : mode === "sparring"
                    ? "실전"
                    : "철학"
                }
                style={{
                  fontSize: 12,
                  fill:
                    trainingMode === mode
                      ? KOREAN_COLORS.BLACK_SOLID
                      : KOREAN_COLORS.TEXT_PRIMARY,
                  align: "center",
                  fontWeight: "bold",
                }}
                x={55}
                y={20}
                anchor={0.5}
                data-testid={`mode-${mode}-text`}
              />
            </pixiContainer>
          ))}
        </pixiContainer>

        {/* Difficulty Selection */}
        <pixiContainer y={80} data-testid="difficulty-selection">
          <pixiText
            text="난이도"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
            }}
            data-testid="difficulty-title"
          />

          {(
            [
              "beginner",
              "intermediate",
              "advanced",
              "master",
            ] as TrainingDifficulty[]
          ).map((diff, index) => (
            <pixiContainer
              key={diff}
              x={index * 80}
              y={25}
              data-testid={`difficulty-${diff}`}
            >
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  const isSelected = difficulty === diff;
                  g.fill({
                    color: isSelected
                      ? KOREAN_COLORS.ACCENT_GOLD
                      : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                    alpha: 0.8,
                  });
                  g.roundRect(0, 0, 75, 30, 4);
                  g.fill();
                }}
                interactive={true}
                onPointerDown={() => setDifficulty(diff)}
              />
              <pixiText
                text={
                  diff === "beginner"
                    ? "초급"
                    : diff === "intermediate"
                    ? "중급"
                    : diff === "advanced"
                    ? "고급"
                    : "사범"
                }
                style={{
                  fontSize: 10,
                  fill:
                    difficulty === diff
                      ? KOREAN_COLORS.BLACK_SOLID
                      : KOREAN_COLORS.TEXT_PRIMARY,
                  align: "center",
                }}
                x={37.5}
                y={15}
                anchor={0.5}
                data-testid={`difficulty-${diff}-text`}
              />
            </pixiContainer>
          ))}
        </pixiContainer>
      </pixiContainer>

      {/* Enhanced Stance Selection with Trigram Wheel */}
      <pixiContainer x={20} y={height - 200} data-testid="stance-selection">
        <TrigramWheel
          currentStance={selectedStance} // Fix: Use currentStance instead of selectedStance
          onStanceChange={handleStanceChange}
          size={isMobile ? 120 : 150}
          showLabels={true}
          data-testid="trigram-wheel"
        />

        <pixiText
          text={`현재 자세: ${selectedStance}`}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          x={isMobile ? 130 : 160}
          y={20}
          data-testid="current-stance-display"
        />
      </pixiContainer>

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

      {/* Comprehensive Training Statistics Panel */}
      <pixiContainer x={width - 250} y={100} data-testid="training-stats">
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM, alpha: 0.9 });
            g.roundRect(0, 0, 230, 300, 8);
            g.fill();
            g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD });
            g.roundRect(0, 0, 230, 300, 8);
            g.stroke();
          }}
        />

        <pixiText
          text="훈련 통계"
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
          }}
          x={115}
          y={20}
          anchor={0.5}
          data-testid="stats-title"
        />

        {/* Session Statistics */}
        <pixiContainer x={10} y={45}>
          <pixiText
            text={`시간: ${Math.floor(session.sessionTime / 60)}:${(
              session.sessionTime % 60
            )
              .toString()
              .padStart(2, "0")}`}
            style={{ fontSize: 12, fill: KOREAN_COLORS.TEXT_PRIMARY }}
            y={0}
            data-testid="session-time"
          />
          <pixiText
            text={`시도: ${session.techniquesAttempted}`}
            style={{ fontSize: 12, fill: KOREAN_COLORS.TEXT_PRIMARY }}
            y={20}
            data-testid="attempts-count"
          />
          <pixiText
            text={`성공률: ${session.successRate.toFixed(1)}%`}
            style={{ fontSize: 12, fill: KOREAN_COLORS.TEXT_PRIMARY }}
            y={40}
            data-testid="success-rate"
          />
          <pixiText
            text={`완벽한 타격: ${session.perfectStrikes}`}
            style={{ fontSize: 12, fill: KOREAN_COLORS.TEXT_PRIMARY }}
            y={60}
            data-testid="perfect-strikes"
          />
          <pixiText
            text={`최대 연속: ${session.maxCombo}`}
            style={{ fontSize: 12, fill: KOREAN_COLORS.TEXT_PRIMARY }}
            y={80}
            data-testid="max-combo"
          />
        </pixiContainer>

        {/* Visual Progress Bars */}
        <pixiContainer x={10} y={140}>
          <pixiText
            text="실력 진행도"
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
            }}
            y={0}
          />

          {/* Accuracy Progress */}
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK });
              g.rect(0, 25, 200, 15);
              g.fill();
              g.fill({ color: KOREAN_COLORS.POSITIVE_GREEN });
              g.rect(0, 25, 200 * (session.successRate / 100), 15);
              g.fill();
            }}
          />
          <pixiText
            text="정확도"
            style={{ fontSize: 10, fill: KOREAN_COLORS.TEXT_SECONDARY }}
            y={20}
          />
        </pixiContainer>
      </pixiContainer>

      {/* Dynamic Feedback Display */}
      <pixiContainer
        x={width / 2}
        y={height - 150}
        data-testid="feedback-display"
      >
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
            g.roundRect(-200, -30, 400, 60, 10);
            g.fill();
            g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_CYAN });
            g.roundRect(-200, -30, 400, 60, 10);
            g.stroke();
          }}
        />
        <pixiText
          text={feedbackMessage}
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
            wordWrap: true,
            wordWrapWidth: 380,
          }}
          anchor={0.5}
          data-testid="feedback-message"
        />
      </pixiContainer>

      {/* Training Action Buttons */}
      <pixiContainer
        x={width / 2 - 150}
        y={height - 80}
        data-testid="action-buttons"
      >
        {!isTraining ? (
          <pixiContainer data-testid="start-training-button">
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.fill({ color: KOREAN_COLORS.POSITIVE_GREEN, alpha: 0.8 });
                g.roundRect(0, 0, 120, 50, 8);
                g.fill();
              }}
              interactive={true}
              onPointerDown={handleTrainingStart}
            />
            <pixiText
              text="훈련 시작"
              style={{
                fontSize: 14,
                fill: KOREAN_COLORS.BLACK_SOLID,
                fontWeight: "bold",
                align: "center",
              }}
              x={60}
              y={25}
              anchor={0.5}
            />
          </pixiContainer>
        ) : (
          <pixiContainer data-testid="execute-technique-button">
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.fill({ color: KOREAN_COLORS.ACCENT_RED, alpha: 0.8 });
                g.roundRect(0, 0, 120, 50, 8);
                g.fill();
              }}
              interactive={true}
              onPointerDown={handleTechniqueExecution}
            />
            <pixiText
              text="기법 실행"
              style={{
                fontSize: 14,
                fill: KOREAN_COLORS.WHITE_SOLID,
                fontWeight: "bold",
                align: "center",
              }}
              x={60}
              y={25}
              anchor={0.5}
            />
          </pixiContainer>
        )}

        {/* Evaluate Button */}
        <pixiContainer x={140} data-testid="evaluate-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
              g.roundRect(0, 0, 120, 50, 8);
              g.fill();
            }}
            interactive={true}
            onPointerDown={evaluateTrainingSession}
          />
          <pixiText
            text="평가"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.BLACK_SOLID,
              fontWeight: "bold",
              align: "center",
            }}
            x={60}
            y={25}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Return to Menu */}
        <pixiContainer x={280} data-testid="return-menu-button">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM, alpha: 0.8 });
              g.roundRect(0, 0, 120, 50, 8);
              g.fill();
            }}
            interactive={true}
            onPointerDown={onReturnToMenu}
          />
          <pixiText
            text="메뉴로"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
              align: "center",
            }}
            x={60}
            y={25}
            anchor={0.5}
          />
        </pixiContainer>
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
    </pixiContainer>
  );
};

export default TrainingScreen;
