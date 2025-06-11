import React, { useState, useCallback, useMemo } from "react";
import { PlayerState } from "../../types/player";
import { TrigramStance } from "../../types/enums";
import { KOREAN_COLORS } from "../../types/constants";
import { DojangBackground } from "../game/DojangBackground";
import {
  ResponsivePixiContainer,
  ResponsivePixiButton,
  ResponsivePixiPanel,
} from "../ui/base/ResponsivePixiComponents";

export interface TrainingScreenProps {
  readonly player: PlayerState;
  readonly onPlayerUpdate: (updates: Partial<PlayerState>) => void;
  readonly trigramSystem: any;
  readonly vitalPointSystem: any;
  readonly onReturnToMenu: () => void;
  readonly width: number;
  readonly height: number;
}

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  player,
  onPlayerUpdate,
  onReturnToMenu,
  width,
  height,
}) => {
  const [selectedStance, setSelectedStance] = useState<TrigramStance>(
    TrigramStance.GEON
  );
  const [practiceCount, setPracticeCount] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);

  const { isMobile } = useMemo(() => {
    const isMobile = width < 768;
    return { isMobile };
  }, [width]);

  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      setSelectedStance(stance);
      onPlayerUpdate({ currentStance: stance });
      setIsExecuting(true);
      setTimeout(() => setIsExecuting(false), 500);
    },
    [onPlayerUpdate]
  );

  const handlePracticeTechnique = useCallback(() => {
    setPracticeCount((prev) => prev + 1);
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 800);
  }, []);

  const stances = [
    {
      stance: TrigramStance.GEON,
      korean: "건",
      english: "Heaven",
      symbol: "☰",
    },
    { stance: TrigramStance.TAE, korean: "태", english: "Lake", symbol: "☱" },
    { stance: TrigramStance.LI, korean: "리", english: "Fire", symbol: "☲" },
    {
      stance: TrigramStance.JIN,
      korean: "진",
      english: "Thunder",
      symbol: "☳",
    },
    { stance: TrigramStance.SON, korean: "손", english: "Wind", symbol: "☴" },
    { stance: TrigramStance.GAM, korean: "감", english: "Water", symbol: "☵" },
    {
      stance: TrigramStance.GAN,
      korean: "간",
      english: "Mountain",
      symbol: "☶",
    },
    { stance: TrigramStance.GON, korean: "곤", english: "Earth", symbol: "☷" },
  ];

  return (
    <ResponsivePixiContainer
      screenWidth={width}
      screenHeight={height}
      data-testid="training-screen"
    >
      {/* Enhanced Dojang Background */}
      <DojangBackground
        width={width}
        height={height}
        lighting="traditional"
        animate={true}
      />

      {/* Training Area Grid */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.stroke({ width: 1, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.2 });
          const gridSize = isMobile ? 50 : 75;

          for (let i = 0; i < width; i += gridSize) {
            g.moveTo(i, 0);
            g.lineTo(i, height);
          }
          for (let i = 0; i < height; i += gridSize) {
            g.moveTo(0, i);
            g.lineTo(width, i);
          }
          g.stroke();
        }}
      />

      {/* Training Title */}
      <pixiContainer
        x={width / 2}
        y={isMobile ? 40 : 60}
        data-testid="training-title"
      >
        <pixiText
          text="훈련 도장 - Training Dojang"
          style={{
            fontSize: isMobile ? 24 : 32,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
            align: "center",
          }}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Player Status Panel */}
      <ResponsivePixiPanel
        title={`${player.name.korean} - ${player.archetype}`}
        x={20}
        y={isMobile ? 80 : 120}
        width={isMobile ? width * 0.4 : 250}
        height={isMobile ? 150 : 200}
        screenWidth={width}
        screenHeight={height}
        data-testid="player-status-panel"
      >
        <pixiText
          text={`체력: ${player.health}/${player.maxHealth}`}
          style={{
            fontSize: isMobile ? 12 : 14,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          }}
          x={10}
          y={30}
        />
        <pixiText
          text={`기력: ${player.stamina}/${player.maxStamina}`}
          style={{
            fontSize: isMobile ? 12 : 14,
            fill: KOREAN_COLORS.PRIMARY_CYAN,
          }}
          x={10}
          y={50}
        />
        <pixiText
          text={`현재 자세: ${selectedStance}`}
          style={{
            fontSize: isMobile ? 12 : 14,
            fill: KOREAN_COLORS.ACCENT_GOLD,
          }}
          x={10}
          y={70}
        />
        <pixiText
          text={`연습 횟수: ${practiceCount}`}
          style={{
            fontSize: isMobile ? 12 : 14,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          x={10}
          y={90}
        />
      </ResponsivePixiPanel>

      {/* Stance Selection Grid */}
      <ResponsivePixiPanel
        title="팔괘 자세 선택 - Eight Trigram Stances"
        x={width - (isMobile ? width * 0.95 : 320)}
        y={isMobile ? 80 : 120}
        width={isMobile ? width * 0.9 : 300}
        height={isMobile ? 250 : 350}
        screenWidth={width}
        screenHeight={height}
        data-testid="stance-selection-panel"
      >
        {stances.map((stanceInfo, index) => (
          <pixiContainer
            key={stanceInfo.stance}
            x={(index % (isMobile ? 2 : 4)) * (isMobile ? 120 : 70)}
            y={
              Math.floor(index / (isMobile ? 2 : 4)) * (isMobile ? 50 : 60) + 40
            }
            data-testid={`stance-${stanceInfo.stance}`}
          >
            <pixiGraphics
              draw={(g) => {
                g.clear();
                const isSelected = selectedStance === stanceInfo.stance;
                g.fill({
                  color: isSelected
                    ? KOREAN_COLORS.ACCENT_GOLD
                    : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                  alpha: 0.9,
                });
                g.roundRect(0, 0, isMobile ? 110 : 60, isMobile ? 40 : 50, 4);
                g.fill();
                g.stroke({
                  width: 2,
                  color: isSelected
                    ? KOREAN_COLORS.PRIMARY_CYAN
                    : KOREAN_COLORS.ACCENT_GOLD,
                  alpha: 0.8,
                });
                g.roundRect(0, 0, isMobile ? 110 : 60, isMobile ? 40 : 50, 4);
                g.stroke();
              }}
              interactive={true}
              onPointerDown={() => handleStanceChange(stanceInfo.stance)}
            />
            <pixiText
              text={stanceInfo.symbol}
              style={{
                fontSize: isMobile ? 16 : 20,
                fill:
                  selectedStance === stanceInfo.stance
                    ? KOREAN_COLORS.BLACK_SOLID
                    : KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
              }}
              x={(isMobile ? 110 : 60) / 2}
              y={isMobile ? 8 : 10}
              anchor={0.5}
            />
            <pixiText
              text={stanceInfo.korean}
              style={{
                fontSize: isMobile ? 10 : 12,
                fill:
                  selectedStance === stanceInfo.stance
                    ? KOREAN_COLORS.BLACK_SOLID
                    : KOREAN_COLORS.TEXT_SECONDARY,
                align: "center",
              }}
              x={(isMobile ? 110 : 60) / 2}
              y={isMobile ? 28 : 35}
              anchor={0.5}
            />
          </pixiContainer>
        ))}
      </ResponsivePixiPanel>

      {/* Training Actions */}
      <ResponsivePixiContainer
        x={width / 2}
        y={height - (isMobile ? 120 : 150)}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-actions"
      >
        <ResponsivePixiButton
          text="기술 연습 - Practice Technique"
          x={-(isMobile ? 100 : 120)}
          y={0}
          width={isMobile ? 200 : 240}
          height={isMobile ? 40 : 50}
          screenWidth={width}
          screenHeight={height}
          variant="primary"
          onClick={handlePracticeTechnique}
          data-testid="practice-button"
        />

        {isExecuting && (
          <pixiText
            text="기술 실행 중... Executing Technique..."
            style={{
              fontSize: isMobile ? 14 : 16,
              fill: KOREAN_COLORS.PRIMARY_CYAN,
              align: "center",
            }}
            x={0}
            y={isMobile ? 50 : 60}
            anchor={0.5}
          />
        )}
      </ResponsivePixiContainer>

      {/* Training Instructions */}
      <ResponsivePixiPanel
        title="훈련 지침 - Training Instructions"
        x={20}
        y={height - (isMobile ? 180 : 200)}
        width={isMobile ? width * 0.6 : 350}
        height={isMobile ? 100 : 140}
        screenWidth={width}
        screenHeight={height}
        data-testid="training-instructions"
      >
        <pixiText
          text="1-8: 자세 선택 (Select Stance)"
          style={{
            fontSize: isMobile ? 10 : 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          x={10}
          y={30}
        />
        <pixiText
          text="SPACE: 기술 실행 (Execute Technique)"
          style={{
            fontSize: isMobile ? 10 : 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          x={10}
          y={isMobile ? 45 : 50}
        />
        <pixiText
          text="ESC: 메뉴로 돌아가기 (Return to Menu)"
          style={{
            fontSize: isMobile ? 10 : 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          x={10}
          y={isMobile ? 60 : 70}
        />
      </ResponsivePixiPanel>

      {/* Return to Menu Button */}
      <ResponsivePixiButton
        text="메뉴로 돌아가기"
        x={width - (isMobile ? 120 : 180)}
        y={isMobile ? 20 : 30}
        width={isMobile ? 100 : 150}
        height={isMobile ? 35 : 45}
        screenWidth={width}
        screenHeight={height}
        variant="secondary"
        onClick={onReturnToMenu}
        data-testid="return-to-menu-button"
      />
    </ResponsivePixiContainer>
  );
};

export default TrainingScreen;
