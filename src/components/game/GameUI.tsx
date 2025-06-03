import React from "react";
import { Container, Text, Graphics } from "@pixi/react";
import { KOREAN_COLORS } from "../../types";
import type { GameUIProps } from "../../types/components";

export function GameUI({
  players,
  gameTime,
  currentRound,
  timeRemaining = 60,
  isPaused = false,
  onStartMatch,
  onResetMatch,
  onTogglePause,
  combatLog = [],
  className,
  style,
  ...props
}: GameUIProps): React.JSX.Element {
  const [player1, player2] = players;

  // Calculate health and stamina ratios for progress bars
  const player1HealthRatio = player1.health / player1.maxHealth;
  const player2HealthRatio = player2.health / player2.maxHealth;

  const player1StaminaRatio = player1.stamina / player1.maxStamina;
  const player2StaminaRatio = player2.stamina / player2.maxStamina;

  // Color based on health/stamina levels
  const getHealthColor = (ratio: number) => {
    if (ratio > 0.6) return KOREAN_COLORS.HEALTH_GREEN;
    if (ratio > 0.3) return KOREAN_COLORS.HEALTH_YELLOW;
    return KOREAN_COLORS.HEALTH_RED;
  };

  const getStaminaColor = (ratio: number) => {
    if (ratio > 0.6) return KOREAN_COLORS.STAMINA_YELLOW;
    if (ratio > 0.3) return KOREAN_COLORS.WARNING_ORANGE;
    return KOREAN_COLORS.DANGER_RED;
  };

  // Draw health bars
  const drawPlayer1Health = React.useCallback(
    (g: any) => {
      g.clear();
      // Background
      g.beginFill(KOREAN_COLORS.DARK_GRAY);
      g.drawRect(20, 20, 200, 20);
      g.endFill();
      // Health fill
      g.beginFill(getHealthColor(player1HealthRatio));
      g.drawRect(20, 20, 200 * player1HealthRatio, 20);
      g.endFill();
      // Border
      g.lineStyle(2, KOREAN_COLORS.WHITE);
      g.drawRect(20, 20, 200, 20);
    },
    [player1HealthRatio]
  );

  const drawPlayer2Health = React.useCallback(
    (g: any) => {
      g.clear();
      // Background
      g.beginFill(KOREAN_COLORS.DARK_GRAY);
      g.drawRect(580, 20, 200, 20);
      g.endFill();
      // Health fill
      g.beginFill(getHealthColor(player2HealthRatio));
      g.drawRect(580, 20, 200 * player2HealthRatio, 20);
      g.endFill();
      // Border
      g.lineStyle(2, KOREAN_COLORS.WHITE);
      g.drawRect(580, 20, 200, 20);
    },
    [player2HealthRatio]
  );

  // Draw stamina bars
  const drawPlayer1Stamina = React.useCallback(
    (g: any) => {
      g.clear();
      // Background
      g.beginFill(KOREAN_COLORS.DARK_GRAY);
      g.drawRect(20, 50, 200, 15);
      g.endFill();
      // Stamina fill
      g.beginFill(getStaminaColor(player1StaminaRatio));
      g.drawRect(20, 50, 200 * player1StaminaRatio, 15);
      g.endFill();
      // Border
      g.lineStyle(1, KOREAN_COLORS.WHITE);
      g.drawRect(20, 50, 200, 15);
    },
    [player1StaminaRatio]
  );

  const drawPlayer2Stamina = React.useCallback(
    (g: any) => {
      g.clear();
      // Background
      g.beginFill(KOREAN_COLORS.DARK_GRAY);
      g.drawRect(580, 50, 200, 15);
      g.endFill();
      // Stamina fill
      g.beginFill(getStaminaColor(player2StaminaRatio));
      g.drawRect(580, 50, 200 * player2StaminaRatio, 15);
      g.endFill();
      // Border
      g.lineStyle(1, KOREAN_COLORS.WHITE);
      g.drawRect(580, 50, 200, 15);
    },
    [player2StaminaRatio]
  );

  return (
    <Container>
      {/* Player 1 Health Bar */}
      <Graphics draw={drawPlayer1Health} />
      <Text
        text={`${player1.name}: ${Math.round(player1.health)}/${
          player1.maxHealth
        }`}
        x={25}
        y={5}
        style={{
          fontSize: 14,
          fill: KOREAN_COLORS.WHITE,
          fontFamily: "Arial, sans-serif",
        }}
      />

      {/* Player 1 Stamina Bar */}
      <Graphics draw={drawPlayer1Stamina} />

      {/* Player 2 Health Bar */}
      <Graphics draw={drawPlayer2Health} />
      <Text
        text={`${player2.name}: ${Math.round(player2.health)}/${
          player2.maxHealth
        }`}
        x={585}
        y={5}
        style={{
          fontSize: 14,
          fill: KOREAN_COLORS.WHITE,
          fontFamily: "Arial, sans-serif",
        }}
      />

      {/* Player 2 Stamina Bar */}
      <Graphics draw={drawPlayer2Stamina} />

      {/* Round and Time Display */}
      <Text
        text={`Round: ${currentRound}`}
        x={350}
        y={20}
        style={{
          fontSize: 16,
          fill: KOREAN_COLORS.GOLD,
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
        }}
      />

      <Text
        text={`Time: ${Math.ceil(timeRemaining)}`}
        x={350}
        y={45}
        style={{
          fontSize: 14,
          fill:
            timeRemaining < 10 ? KOREAN_COLORS.DANGER_RED : KOREAN_COLORS.WHITE,
          fontFamily: "Arial, sans-serif",
        }}
      />

      {/* Pause indicator */}
      {isPaused && (
        <Text
          text="PAUSED"
          x={350}
          y={100}
          style={{
            fontSize: 24,
            fill: KOREAN_COLORS.WARNING_ORANGE,
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
          }}
        />
      )}

      {/* Game Controls */}
      {onStartMatch && (
        <Text
          text="Press SPACE to start"
          x={300}
          y={150}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.CYAN,
            fontFamily: "Arial, sans-serif",
          }}
          interactive
          pointerdown={() => onStartMatch()}
        />
      )}

      {onTogglePause && (
        <Text
          text={isPaused ? "Press P to resume" : "Press P to pause"}
          x={300}
          y={170}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.CYAN,
            fontFamily: "Arial, sans-serif",
          }}
          interactive
          pointerdown={() => onTogglePause()}
        />
      )}

      {onResetMatch && (
        <Text
          text="Press R to reset"
          x={300}
          y={190}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.CYAN,
            fontFamily: "Arial, sans-serif",
          }}
          interactive
          pointerdown={() => onResetMatch()}
        />
      )}

      {/* Combat Log */}
      {combatLog && combatLog.length > 0 && (
        <Container y={500}>
          <Text
            text="Combat Log:"
            x={20}
            y={0}
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.GOLD,
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
            }}
          />
          {combatLog.slice(-5).map((entry: any, index: number) => (
            <Text
              key={index}
              text={
                typeof entry === "string"
                  ? entry
                  : entry.english || entry.korean || "Combat action"
              }
              x={20}
              y={20 + index * 15}
              style={{
                fontSize: 10,
                fill: KOREAN_COLORS.WHITE,
                fontFamily: "Arial, sans-serif",
              }}
            />
          ))}
        </Container>
      )}
    </Container>
  );
}
