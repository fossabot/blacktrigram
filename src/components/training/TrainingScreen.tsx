import React, { useState, useCallback, useMemo, useEffect } from "react";
import { DojangBackground } from "../game/DojangBackground";
import { TrigramWheel } from "../ui/TrigramWheel";
import { StanceIndicator } from "../ui/StanceIndicator";
import { ProgressTracker } from "../ui/ProgressTracker";
import { HealthBar } from "../ui/HealthBar";
import { KoreanHeader } from "../ui/base/KoreanHeader";
import {
  ResponsivePixiContainer,
  ResponsivePixiButton,
  ResponsivePixiPanel,
} from "../ui/base/ResponsivePixiComponents";
import { KOREAN_COLORS } from "../../types/constants";
import { TrigramStance } from "../../types/enums"; // Removed unused PlayerArchetype
import type { PlayerState } from "../../types/player";
import type { TrigramSystem } from "../../types/systems";
import type { VitalPointSystem } from "../../types/systems";
import { useAudio } from "../../audio/AudioProvider";

export interface TrainingScreenProps {
  readonly player: PlayerState;
  readonly onPlayerUpdate: (updates: Partial<PlayerState>) => void;
  readonly trigramSystem: TrigramSystem;
  readonly vitalPointSystem: VitalPointSystem;
  readonly onReturnToMenu: () => void;
  readonly width: number;
  readonly height: number;
  readonly x?: number;
  readonly y?: number;
}

// Training modes for Korean martial arts
type TrainingMode = "stances" | "techniques" | "combinations" | "meditation";

// Training dummy states
interface TrainingDummy {
  readonly id: string;
  readonly health: number;
  readonly maxHealth: number;
  readonly position: { x: number; y: number };
  readonly type: "basic" | "advanced" | "master";
  readonly isActive: boolean;
}

// Training session statistics
interface TrainingStats {
  readonly stancesCompleted: number;
  readonly techniquesExecuted: number;
  readonly perfectStrikes: number;
  readonly sessionTime: number;
  readonly currentCombo: number;
  readonly bestCombo: number;
}

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  player,
  onPlayerUpdate,
  // Note: trigramSystem and vitalPointSystem are reserved for future use
  trigramSystem: _trigramSystem,
  vitalPointSystem: _vitalPointSystem,
  onReturnToMenu,
  width,
  height,
  x = 0,
  y = 0,
}) => {
  const audio = useAudio();

  // Training state management
  const [trainingMode, setTrainingMode] = useState<TrainingMode>("stances");
  const [selectedStance, setSelectedStance] = useState<TrigramStance>(
    TrigramStance.GEON
  );
  const [isTraining, setIsTraining] = useState(false);
  const [dummy, setDummy] = useState<TrainingDummy>({
    id: "training_dummy_1",
    health: 100,
    maxHealth: 100,
    position: { x: width * 0.6, y: height * 0.5 },
    type: "basic",
    isActive: true,
  });

  // Training session statistics
  const [stats, setStats] = useState<TrainingStats>({
    stancesCompleted: 0,
    techniquesExecuted: 0,
    perfectStrikes: 0,
    sessionTime: 0,
    currentCombo: 0,
    bestCombo: 0,
  });

  // Session timer
  const [sessionStartTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Responsive design calculations
  const { isMobile } = useMemo(() => {
    const isMobile = width < 768;
    // Note: isTablet variable removed as it was unused
    return { isMobile };
  }, [width]);

  // Update session time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate session duration
  const sessionDuration = Math.floor((currentTime - sessionStartTime) / 1000);

  // Training mode descriptions in Korean and English
  const trainingModes = useMemo(
    () => ({
      stances: { korean: "자세 연습", english: "Stance Practice", icon: "☰" },
      techniques: {
        korean: "기술 연습",
        english: "Technique Practice",
        icon: "⚡",
      },
      combinations: {
        korean: "연계 기술",
        english: "Combinations",
        icon: "🔄",
      },
      meditation: { korean: "명상", english: "Meditation", icon: "🧘" },
    }),
    []
  );

  // Handle stance selection and practice
  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      setSelectedStance(stance);
      onPlayerUpdate({ currentStance: stance });

      // Update stats
      setStats((prev) => ({
        ...prev,
        stancesCompleted: prev.stancesCompleted + 1,
      }));

      // Play stance change sound
      audio.playSoundEffect("stance_change");

      // Brief training animation
      setIsTraining(true);
      setTimeout(() => setIsTraining(false), 800);
    },
    [onPlayerUpdate, audio]
  );

  // Execute technique based on current stance
  const handleTechniqueExecute = useCallback(() => {
    if (isTraining) return;

    setIsTraining(true);

    // Update stats based on execution quality
    const isPerfect = Math.random() > 0.7; // 30% chance for perfect strike
    setStats((prev) => ({
      ...prev,
      techniquesExecuted: prev.techniquesExecuted + 1,
      perfectStrikes: prev.perfectStrikes + (isPerfect ? 1 : 0),
      currentCombo: prev.currentCombo + 1,
      bestCombo: Math.max(prev.bestCombo, prev.currentCombo + 1),
    }));

    // Damage training dummy
    setDummy((prev) => ({
      ...prev,
      health: Math.max(0, prev.health - (isPerfect ? 25 : 15)),
    }));

    // Play appropriate sound effect
    if (isPerfect) {
      audio.playSoundEffect("attack_critical");
    } else {
      audio.playSoundEffect("attack_medium");
    }

    // Reset training state
    setTimeout(() => setIsTraining(false), 1000);
  }, [isTraining, audio]);

  // Reset training dummy
  const handleDummyReset = useCallback(() => {
    setDummy((prev) => ({
      ...prev,
      health: prev.maxHealth,
    }));

    setStats((prev) => ({
      ...prev,
      currentCombo: 0,
    }));

    audio.playSoundEffect("menu_select");
  }, [audio]);

  // Handle training mode change
  const handleModeChange = useCallback(
    (mode: TrainingMode) => {
      setTrainingMode(mode);
      audio.playSoundEffect("menu_hover");
    },
    [audio]
  );

  // Keyboard input handling for training
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Stance selection (1-8 keys)
      const stanceNum = parseInt(event.key);
      if (stanceNum >= 1 && stanceNum <= 8) {
        const stances = Object.values(TrigramStance);
        if (stances[stanceNum - 1]) {
          handleStanceSelect(stances[stanceNum - 1]);
        }
        return;
      }

      switch (event.key) {
        case " ": // Space - execute technique
          event.preventDefault();
          handleTechniqueExecute();
          break;
        case "r":
        case "R": // Reset dummy
          handleDummyReset();
          break;
        case "Escape": // Return to menu
          onReturnToMenu();
          break;
        case "Tab": // Cycle training modes
          event.preventDefault();
          const modes = Object.keys(trainingModes) as TrainingMode[];
          const currentIndex = modes.indexOf(trainingMode);
          const nextIndex = (currentIndex + 1) % modes.length;
          handleModeChange(modes[nextIndex]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    trainingMode,
    trainingModes,
    handleStanceSelect,
    handleTechniqueExecute,
    handleDummyReset,
    handleModeChange,
    onReturnToMenu,
  ]);

  return (
    <ResponsivePixiContainer
      x={x}
      y={y}
      screenWidth={width}
      screenHeight={height}
      data-testid="training-screen"
    >
      {/* Dojang Background with Training Hall Atmosphere */}
      <DojangBackground
        width={width}
        height={height}
        lighting="cyberpunk"
        animate={true}
      />

      {/* Training Screen Header */}
      <KoreanHeader
        title={{ korean: "무술 도장", english: "Training Dojang" }}
        subtitle={{
          korean: `${trainingModes[trainingMode].korean} 모드`,
          english: `${trainingModes[trainingMode].english} Mode`,
        }}
        align="center"
        x={width / 2}
        y={isMobile ? 40 : 60}
        data-testid="training-header"
      />

      {/* Training Mode Selection */}
      <ResponsivePixiContainer
        x={isMobile ? 20 : 40}
        y={isMobile ? 80 : 120}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-mode-selection"
      >
        {Object.entries(trainingModes).map(([mode, info], index) => (
          <ResponsivePixiButton
            key={mode}
            text={`${info.icon} ${info.korean}`}
            x={index * (isMobile ? 80 : 120)}
            y={0}
            width={isMobile ? 75 : 110}
            height={isMobile ? 35 : 45}
            screenWidth={width}
            screenHeight={height}
            variant={trainingMode === mode ? "primary" : "secondary"}
            onClick={() => handleModeChange(mode as TrainingMode)}
            data-testid={`training-mode-${mode}`}
          />
        ))}
      </ResponsivePixiContainer>

      {/* Main Training Area */}
      <ResponsivePixiContainer
        x={0}
        y={isMobile ? 140 : 180}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-area"
      >
        {/* Player Character - Fixed props to match PlayerProps interface */}
        <pixiContainer
          x={width * 0.25}
          y={height * 0.5}
          data-testid="training-player"
        >
          {/* Create a visual representation of the player using PixiJS graphics */}
          <pixiGraphics
            draw={(g) => {
              g.clear();

              // Player body (simplified representation)
              g.fill({ color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.8 });
              g.circle(0, -40, 15); // Head
              g.rect(-8, -25, 16, 40); // Body
              g.rect(-6, 15, 5, 25); // Left leg
              g.rect(1, 15, 5, 25); // Right leg
              g.rect(-15, -20, 10, 5); // Left arm
              g.rect(5, -20, 10, 5); // Right arm
              g.fill();

              // Player outline
              g.stroke({
                width: 2,
                color: KOREAN_COLORS.ACCENT_GOLD,
                alpha: 0.6,
              });
              g.circle(0, -40, 15); // Head outline
              g.rect(-8, -25, 16, 40); // Body outline
              g.stroke();

              // Stance indicator
              g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.9 });
              g.circle(0, -60, 8);
              g.fill();
            }}
            scale={{ x: isMobile ? 0.8 : 1.0, y: isMobile ? 0.8 : 1.0 }}
          />

          {/* Player name display */}
          <pixiText
            text={player.name.korean}
            style={{
              fontSize: isMobile ? 12 : 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
              fontWeight: "bold",
            }}
            x={0}
            y={-80}
            anchor={0.5}
          />
        </pixiContainer>

        {/* Training Dummy */}
        <ResponsivePixiContainer
          x={dummy.position.x}
          y={dummy.position.y}
          screenWidth={width}
          screenHeight={height}
          data-testid="training-dummy"
        >
          {/* Dummy Visual */}
          <pixiGraphics
            draw={(g) => {
              g.clear();

              // Dummy body (cylinder shape)
              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM, alpha: 0.8 });
              g.roundRect(-30, -60, 60, 120, 10);
              g.fill();

              // Dummy head
              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_LIGHT, alpha: 0.9 });
              g.circle(0, -80, 25);
              g.fill();

              // Target zones (vital points)
              g.stroke({
                width: 2,
                color: KOREAN_COLORS.ACCENT_GOLD,
                alpha: 0.6,
              });
              g.circle(0, -80, 15); // Head
              g.circle(0, -40, 10); // Chest
              g.circle(0, -10, 8); // Solar plexus
              g.circle(0, 20, 12); // Abdomen
              g.stroke();

              // Damage indicator
              if (dummy.health < dummy.maxHealth) {
                g.fill({ color: KOREAN_COLORS.ACCENT_RED, alpha: 0.4 });
                g.circle(0, 0, 40);
                g.fill();
              }
            }}
            interactive={true}
            onPointerDown={handleTechniqueExecute}
          />

          {/* Dummy Health Bar - Fixed props to match HealthBarProps interface */}
          <HealthBar
            currentHealth={dummy.health}
            maxHealth={dummy.maxHealth}
            x={-40}
            y={-100}
            width={80}
            height={8}
          />
        </ResponsivePixiContainer>

        {/* Training Effects */}
        {isTraining && (
          <pixiGraphics
            x={dummy.position.x}
            y={dummy.position.y}
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.3 });
              g.circle(0, 0, 60);
              g.fill();

              // Impact lines
              g.stroke({
                width: 3,
                color: KOREAN_COLORS.ACCENT_GOLD,
                alpha: 0.8,
              });
              for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI * 2) / 8;
                g.moveTo(0, 0);
                g.lineTo(Math.cos(angle) * 50, Math.sin(angle) * 50);
              }
              g.stroke();
            }}
            data-testid="training-effects"
          />
        )}
      </ResponsivePixiContainer>

      {/* Trigram Stance Selection */}
      <ResponsivePixiContainer
        x={isMobile ? 20 : width - 300}
        y={height - (isMobile ? 280 : 320)}
        screenWidth={width}
        screenHeight={height}
        data-testid="stance-selection"
      >
        <TrigramWheel
          selectedStance={selectedStance}
          onStanceSelect={handleStanceSelect}
          x={0}
          y={0}
          radius={isMobile ? 60 : 80}
          data-testid="training-trigram-wheel"
        />
      </ResponsivePixiContainer>

      {/* Current Stance Indicator - Fixed props to match StanceIndicatorProps interface */}
      <StanceIndicator
        stance={selectedStance}
        x={isMobile ? width / 2 : width * 0.25}
        y={height - (isMobile ? 120 : 140)}
        data-testid="current-stance-indicator"
      />

      {/* Training Statistics Panel */}
      <ResponsivePixiPanel
        title="훈련 통계 - Training Stats"
        x={isMobile ? 20 : 40}
        y={height - (isMobile ? 200 : 240)}
        width={isMobile ? width - 40 : 280}
        height={isMobile ? 160 : 200}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-stats-panel"
      >
        <pixiContainer>
          {/* Session Time */}
          <pixiText
            text={`시간: ${Math.floor(sessionDuration / 60)}:${(
              sessionDuration % 60
            )
              .toString()
              .padStart(2, "0")}`}
            style={{
              fontSize: isMobile ? 12 : 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            x={10}
            y={30}
          />

          {/* Stances Completed */}
          <pixiText
            text={`자세 연습: ${stats.stancesCompleted}`}
            style={{
              fontSize: isMobile ? 12 : 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            x={10}
            y={50}
          />

          {/* Techniques Executed */}
          <pixiText
            text={`기술 실행: ${stats.techniquesExecuted}`}
            style={{
              fontSize: isMobile ? 12 : 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            x={10}
            y={70}
          />

          {/* Perfect Strikes */}
          <pixiText
            text={`완벽한 타격: ${stats.perfectStrikes}`}
            style={{
              fontSize: isMobile ? 12 : 14,
              fill: KOREAN_COLORS.ACCENT_GOLD,
            }}
            x={10}
            y={90}
          />

          {/* Current Combo */}
          <pixiText
            text={`현재 콤보: ${stats.currentCombo}`}
            style={{
              fontSize: isMobile ? 12 : 14,
              fill: KOREAN_COLORS.PRIMARY_CYAN,
            }}
            x={10}
            y={110}
          />

          {/* Best Combo */}
          <pixiText
            text={`최고 콤보: ${stats.bestCombo}`}
            style={{
              fontSize: isMobile ? 12 : 14,
              fill: KOREAN_COLORS.ACCENT_GOLD,
            }}
            x={10}
            y={130}
          />
        </pixiContainer>
      </ResponsivePixiPanel>

      {/* Training Progress Tracker - Fixed props to match ProgressTrackerProps interface */}
      <ProgressTracker
        progress={Math.min(
          100,
          stats.stancesCompleted * 12.5 + stats.perfectStrikes * 5
        )}
        maxProgress={100}
        x={isMobile ? width / 2 : width - 160}
        y={isMobile ? height - 80 : height - 180}
        width={isMobile ? 120 : 140}
        height={isMobile ? 60 : 80}
        data-testid="training-progress"
      />

      {/* Control Instructions */}
      <ResponsivePixiContainer
        x={width / 2}
        y={height - (isMobile ? 40 : 60)}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-controls"
      >
        <pixiText
          text="1-8: 자세 선택 | 스페이스: 기술 실행 | R: 초기화 | ESC: 메뉴"
          style={{
            fontSize: isMobile ? 10 : 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "center",
          }}
          anchor={0.5}
        />
      </ResponsivePixiContainer>

      {/* Action Buttons */}
      <ResponsivePixiContainer
        x={width - (isMobile ? 100 : 180)}
        y={isMobile ? 20 : 40}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-actions"
      >
        <ResponsivePixiButton
          text="초기화"
          x={0}
          y={0}
          width={isMobile ? 60 : 80}
          height={isMobile ? 30 : 40}
          screenWidth={width}
          screenHeight={height}
          variant="secondary"
          onClick={handleDummyReset}
          data-testid="reset-dummy-button"
        />

        <ResponsivePixiButton
          text="메뉴"
          x={isMobile ? 65 : 90}
          y={0}
          width={isMobile ? 50 : 70}
          height={isMobile ? 30 : 40}
          screenWidth={width}
          screenHeight={height}
          variant="primary"
          onClick={onReturnToMenu}
          data-testid="return-menu-button"
        />
      </ResponsivePixiContainer>

      {/* Training Mode Specific Content */}
      {trainingMode === "meditation" && (
        <ResponsivePixiContainer
          x={width / 2}
          y={height / 2}
          screenWidth={width}
          screenHeight={height}
          data-testid="meditation-mode"
        >
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
              g.circle(0, 0, isMobile ? 100 : 150);
              g.fill();

              // Breathing visualization
              const breathScale = 1 + Math.sin(Date.now() / 1000) * 0.1;
              g.stroke({
                width: 2,
                color: KOREAN_COLORS.PRIMARY_CYAN,
                alpha: 0.6,
              });
              g.circle(0, 0, (isMobile ? 80 : 120) * breathScale);
              g.stroke();
            }}
          />

          <pixiText
            text="심호흡 - Deep Breathing"
            style={{
              fontSize: isMobile ? 16 : 20,
              fill: KOREAN_COLORS.PRIMARY_CYAN,
              align: "center",
              fontWeight: "bold",
            }}
            anchor={0.5}
            y={-30}
          />

          <pixiText
            text="🧘‍♂️"
            style={{
              fontSize: isMobile ? 32 : 48,
              align: "center",
            }}
            anchor={0.5}
            y={20}
          />
        </ResponsivePixiContainer>
      )}
    </ResponsivePixiContainer>
  );
};

export default TrainingScreen;
