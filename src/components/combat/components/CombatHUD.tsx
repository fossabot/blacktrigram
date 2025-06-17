import React, { useCallback } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { PlayerState } from "../../../types/player";
import { KOREAN_COLORS } from "../../../types/constants";
import * as PIXI from "pixi.js";

extend({ Container, Graphics, Text });

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
  height = 80,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  const drawHUDBackground = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.9 });
      g.rect(0, 0, width, height);
      g.fill();

      g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.6 });
      g.rect(0, 0, width, height);
      g.stroke();
    },
    [width, height]
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <pixiContainer x={x} y={y} data-testid="combat-hud">
      <pixiGraphics draw={drawHUDBackground} />

      {/* Player 1 info */}
      <pixiContainer x={20} y={10}>
        <pixiText
          text={player1.name.korean}
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.PLAYER_1_COLOR,
            fontWeight: "bold",
          }}
        />

        <pixiText
          text={`${Math.round(player1.health)}/${player1.maxHealth}`}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          }}
          y={25}
        />
      </pixiContainer>

      {/* Center info */}
      <pixiContainer x={width / 2} y={10}>
        <pixiText
          text={`라운드 ${currentRound}/${maxRounds}`}
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
            align: "center",
          }}
          anchor={0.5}
        />

        <pixiText
          text={formatTime(timeRemaining)}
          style={{
            fontSize: 18,
            fill: timeRemaining < 30 ? KOREAN_COLORS.NEGATIVE_RED : KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
            align: "center",
          }}
          anchor={0.5}
          y={25}
        />

        {isPaused && (
          <pixiText
            text="일시정지"
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.WARNING_YELLOW,
              align: "center",
            }}
            anchor={0.5}
            y={50}
          />
        )}
      </pixiContainer>

      {/* Player 2 info */}
      <pixiContainer x={width - 20} y={10}>
        <pixiText
          text={player2.name.korean}
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.PLAYER_2_COLOR,
            fontWeight: "bold",
            align: "right",
          }}
          anchor={[1, 0]}
        />

        <pixiText
          text={`${Math.round(player2.health)}/${player2.maxHealth}`}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "right",
          }}
          anchor={[1, 0]}
          y={25}
        />
      </pixiContainer>

      {/* Pause button */}
      {onPauseToggle && (
        <pixiContainer x={width - 80} y={height - 30}>
          <pixiGraphics
            interactive={true}
            pointerdown={onPauseToggle}
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.8 });
              g.roundRect(0, 0, 60, 20, 5);
              g.fill();
            }}
          />
          <pixiText
            text={isPaused ? "계속" : "정지"}
            style={{
              fontSize: 10,
              fill: KOREAN_COLORS.BLACK_SOLID,
              align: "center",
            }}
            anchor={0.5}
            x={30}
            y={10}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default CombatHUD;
          screenWidth={width}
          screenHeight={height}
          data-testid="round-timer"
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
          current={player2.health}
          max={player2.maxHealth}
          width={healthBarWidth}
          height={25}
          showText={true}
          x={width - healthBarWidth - 20}
          y={35}
          position="right"
          playerName={player2.name.korean}
          screenWidth={width}
          screenHeight={height}
          data-testid="player2-health-bar"
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
          x={width - 60}
          y={60}
          size={40}
          data-testid="player2-stance-indicator"
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
