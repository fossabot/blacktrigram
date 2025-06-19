import React, { useCallback } from "react";
import { KOREAN_COLORS } from "../../../types/constants";
import { PLAYER_ARCHETYPES_DATA } from "../../../types/constants/player";
import type { PlayerState } from "../../../types/player";
import { extendPixiComponents } from "../../../utils/pixiExtensions";
import { HealthBar } from "../../ui/HealthBar";
import { RoundTimer } from "../../ui/RoundTimer";
import { StanceIndicator } from "../../ui/StanceIndicator";

// Ensure PixiJS components are extended
extendPixiComponents();

export interface CombatHUDProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly isPaused?: boolean;
  readonly onPauseToggle?: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

export const CombatHUD: React.FC<CombatHUDProps> = ({
  player1,
  player2,
  timeRemaining,
  currentRound,
  maxRounds,
  isPaused = false,
  onPauseToggle,
  width = 1200,
  height = 120,
  x = 0,
  y = 0,
}) => {
  const isMobile = width < 768;
  const healthBarWidth = isMobile ? 180 : 250;
  const timerWidth = isMobile ? 140 : 160;
  const centerX = width / 2;

  // Draw background
  const drawBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.95);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Gold border
      g.lineStyle(3, KOREAN_COLORS.ACCENT_GOLD, 0.8);
      g.drawRect(5, 5, width - 10, height - 10);

      // Center divider
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.6);
      g.moveTo(width / 2, 10);
      g.lineTo(width / 2, height - 10);

      // Yin-yang inspired circle at center
      g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.3);
      g.drawCircle(width / 2, height / 2, 25);
      g.endFill();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.arc(width / 2, height / 2, 25, 0, Math.PI);
      g.arc(width / 2, height / 2 - 12.5, 12.5, Math.PI, 0, true);
      g.arc(width / 2, height / 2 + 12.5, 12.5, 0, Math.PI, true);
      g.endFill();
    },
    [width, height]
  );

  // Get archetype data
  const player1Archetype = PLAYER_ARCHETYPES_DATA[player1.archetype];
  const player2Archetype = PLAYER_ARCHETYPES_DATA[player2.archetype];

  return (
    <pixiContainer x={x} y={y} data-testid="combat-hud">
      {/* Background */}
      <pixiGraphics draw={drawBackground} />

      {/* Player 1 Info (Left Side) */}
      <pixiContainer x={20} y={15}>
        {/* Player Name & Archetype */}
        <pixiText
          text={player1.name.korean}
          style={{
            fontSize: 18,
            fill: player1Archetype.colors.primary,
            fontWeight: "bold",
          }}
        />
        <pixiText
          text={player1Archetype.name.korean}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={20}
        />

        {/* Health Bar */}
        <HealthBar
          current={player1.health}
          max={player1.maxHealth}
          width={healthBarWidth}
          height={25}
          showText={true}
          x={20}
          y={35}
          position="left"
          playerName={player1.name.korean}
          screenWidth={width}
          screenHeight={height}
          data-testid="player1-health-bar"
        />

        {/* Resource Bars */}
        <pixiContainer y={70}>
          {/* Ki Bar Label */}
          <pixiText
            text="기력"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
          />

          {/* Ki Bar */}
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRect(25, 0, 100, 8);
              g.endFill();
              g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.9);
              g.drawRect(25, 0, 100 * (player1.ki / player1.maxKi), 8);
              g.endFill();
            }}
          />

          {/* Stamina Bar Label */}
          <pixiText
            text="체력"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
            x={135}
          />

          {/* Stamina Bar */}
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRect(160, 0, 100, 8);
              g.endFill();
              g.beginFill(KOREAN_COLORS.SECONDARY_YELLOW, 0.9);
              g.drawRect(
                160,
                0,
                100 * (player1.stamina / player1.maxStamina),
                8
              );
              g.endFill();
            }}
          />
        </pixiContainer>

        {/* Stance Indicator */}
        <StanceIndicator
          stance={player1.currentStance}
          x={20}
          y={60}
          size={40}
          data-testid="player1-stance-indicator"
        />
      </pixiContainer>

      {/* Center Timer */}
      <pixiContainer x={centerX - timerWidth / 2} y={20}>
        {/* Round Timer */}
        <RoundTimer
          currentRound={currentRound}
          maxRounds={maxRounds}
          timeRemaining={timeRemaining}
          totalTime={180}
          width={timerWidth}
          height={35}
          x={0}
          y={0}
          isPaused={isPaused}
          screenWidth={width}
          screenHeight={height}
          data-testid="round-timer"
        />

        {/* Round Label */}
        <pixiText
          text={`라운드 ${currentRound}/${maxRounds}`}
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            align: "center",
            fontWeight: "bold",
          }}
          x={timerWidth / 2}
          y={45}
          anchor={0.5}
        />

        {/* Round Indicators */}
        {Array.from({ length: maxRounds }).map((_, i) => (
          <pixiGraphics
            key={i}
            draw={(g) => {
              g.clear();
              const isCompleted = i < currentRound;
              g.beginFill(
                isCompleted ? KOREAN_COLORS.ACCENT_GOLD : KOREAN_COLORS.UI_GRAY,
                0.8
              );
              g.drawCircle(40 + i * 20, 65, 6);
              g.endFill();
            }}
          />
        ))}
      </pixiContainer>

      {/* Player 2 Info (Right Side) */}
      <pixiContainer x={width - 320} y={15}>
        {/* Player Name & Archetype (Right-aligned) */}
        <pixiText
          text={player2.name.korean}
          style={{
            fontSize: 18,
            fill: player2Archetype.colors.primary,
            fontWeight: "bold",
            align: "right",
          }}
          x={280}
          anchor={{ x: 1, y: 0 }}
        />
        <pixiText
          text={player2Archetype.name.korean}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "right",
          }}
          x={280}
          y={20}
          anchor={{ x: 1, y: 0 }}
        />

        {/* Health Bar */}
        <HealthBar
          current={player2.health}
          max={player2.maxHealth}
          width={healthBarWidth}
          height={25}
          showText={true}
          x={width - healthBarWidth - 40}
          y={35}
          position="right"
          playerName={player2.name.korean}
          screenWidth={width}
          screenHeight={height}
          data-testid="player2-health-bar"
        />

        {/* Resource Bars */}
        <pixiContainer y={70}>
          {/* Ki Bar Label */}
          <pixiText
            text="기력"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
            x={30}
          />

          {/* Ki Bar */}
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRect(55, 0, 100, 8);
              g.endFill();
              g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.9);
              g.drawRect(55, 0, 100 * (player2.ki / player2.maxKi), 8);
              g.endFill();
            }}
          />

          {/* Stamina Bar Label */}
          <pixiText
            text="체력"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
            x={165}
          />

          {/* Stamina Bar */}
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
              g.drawRect(190, 0, 100, 8);
              g.endFill();
              g.beginFill(KOREAN_COLORS.SECONDARY_YELLOW, 0.9);
              g.drawRect(
                190,
                0,
                100 * (player2.stamina / player2.maxStamina),
                8
              );
              g.endFill();
            }}
          />
        </pixiContainer>

        {/* Stance Indicator */}
        <StanceIndicator
          stance={player2.currentStance}
          x={width - 60}
          y={60}
          size={40}
          data-testid="player2-stance-indicator"
        />
      </pixiContainer>

      {/* Pause Toggle Button */}
      {onPauseToggle && (
        <pixiContainer x={width - 80} y={height - 40}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.9);
              g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 0.8);
              g.drawRoundedRect(0, 0, 60, 30, 5);
              g.endFill();
            }}
            interactive={true}
            onPointerDown={onPauseToggle}
          />
          <pixiText
            text={isPaused ? "계속" : "정지"}
            style={{
              fontSize: 10,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
              fontWeight: "bold",
            }}
            x={30}
            y={15}
            anchor={0.5}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default CombatHUD;
