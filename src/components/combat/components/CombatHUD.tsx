import React, { useCallback } from "react";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { CombatHUDProps } from "../../../types/components";
import { HealthBar } from "../../ui/HealthBar";
import { RoundTimer } from "../../ui/RoundTimer";
import { StanceIndicator } from "../../ui/StanceIndicator";
import {
  KOREAN_COLORS,
  PLAYER_ARCHETYPES_DATA,
} from "../../../types/constants";

export const CombatHUD: React.FC<CombatHUDProps> = ({
  player1,
  player2,
  timeRemaining,
  currentRound,
  maxRounds,
  isPaused,
  onPauseToggle,
  width = 1200,
  height = 120,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  const hudBackgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Main HUD background with Korean traditional gradient
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.95);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Traditional Korean decorative border
      g.lineStyle(3, KOREAN_COLORS.ACCENT_GOLD, 0.8);
      g.drawRect(5, 5, width - 10, height - 10);

      // Center divider with taegeuk symbol
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.6);
      g.moveTo(width / 2, 10);
      g.lineTo(width / 2, height - 10);

      // Taegeuk symbol in center
      g.beginFill(KOREAN_COLORS.ACCENT_GOLD, 0.3);
      g.drawCircle(width / 2, height / 2, 25);
      g.endFill();

      // Yin-yang pattern
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.arc(width / 2, height / 2, 25, 0, Math.PI);
      g.arc(width / 2, height / 2 - 12.5, 12.5, Math.PI, 0, true);
      g.arc(width / 2, height / 2 + 12.5, 12.5, 0, Math.PI, true);
      g.endFill();
    },
    [width, height]
  );

  const archetype1Data = PLAYER_ARCHETYPES_DATA[player1.archetype];
  const archetype2Data = PLAYER_ARCHETYPES_DATA[player2.archetype];

  return (
    <pixiContainer x={x} y={y} data-testid="combat-hud">
      {/* Enhanced Background */}
      <pixiGraphics draw={hudBackgroundDraw} />

      {/* Player 1 Section */}
      <pixiContainer x={20} y={15}>
        {/* Player 1 Name with Archetype Colors */}
        <pixiText
          text={player1.name.korean}
          style={{
            fontSize: 18,
            fill: archetype1Data.colors.primary,
            fontWeight: "bold",
          }}
        />
        <pixiText
          text={archetype1Data.name.korean}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={20}
        />

        {/* Enhanced Health Bar with Segments */}
        <HealthBar
          currentHealth={player1.health}
          maxHealth={player1.maxHealth}
          width={250}
          height={25}
          showText={true}
          x={0}
          y={40}
        />

        {/* Ki and Stamina Mini Bars */}
        <pixiContainer y={70}>
          <pixiText
            text="기력"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
          />
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

          <pixiText
            text="체력"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
            x={135}
          />
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

        {/* Player 1 Stance */}
        <StanceIndicator
          stance={player1.currentStance}
          x={280}
          y={40}
          size={35}
          showText={false}
        />
      </pixiContainer>

      {/* Center Section - Timer and Round */}
      <pixiContainer x={width / 2 - 80} y={20}>
        <RoundTimer
          timeRemaining={timeRemaining}
          totalTime={180}
          width={160}
          height={35}
          isPaused={isPaused}
        />

        <pixiText
          text={`라운드 ${currentRound}/${maxRounds}`}
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            align: "center",
            fontWeight: "bold",
          }}
          x={80}
          y={45}
          anchor={0.5}
        />

        {/* Traditional Korean round markers */}
        {Array.from({ length: maxRounds }, (_, i) => (
          <pixiGraphics
            key={i}
            draw={(g) => {
              g.clear();
              const isActive = i < currentRound;
              g.beginFill(
                isActive ? KOREAN_COLORS.ACCENT_GOLD : KOREAN_COLORS.UI_GRAY,
                0.8
              );
              g.drawCircle(40 + i * 20, 65, 6);
              g.endFill();
            }}
          />
        ))}
      </pixiContainer>

      {/* Player 2 Section */}
      <pixiContainer x={width - 320} y={15}>
        {/* Player 2 Name */}
        <pixiText
          text={player2.name.korean}
          style={{
            fontSize: 18,
            fill: archetype2Data.colors.primary,
            fontWeight: "bold",
            align: "right",
          }}
          x={280}
          anchor={{ x: 1, y: 0 }}
        />
        <pixiText
          text={archetype2Data.name.korean}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "right",
          }}
          x={280}
          y={20}
          anchor={{ x: 1, y: 0 }}
        />

        {/* Player 2 Health Bar */}
        <HealthBar
          currentHealth={player2.health}
          maxHealth={player2.maxHealth}
          width={250}
          height={25}
          showText={true}
          x={30}
          y={40}
        />

        {/* Player 2 Ki and Stamina */}
        <pixiContainer y={70}>
          <pixiText
            text="기력"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
            x={30}
          />
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

          <pixiText
            text="체력"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
            x={165}
          />
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

        {/* Player 2 Stance */}
        <StanceIndicator
          stance={player2.currentStance}
          x={-35}
          y={40}
          size={35}
          showText={false}
        />
      </pixiContainer>

      {/* Enhanced Pause Button */}
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
