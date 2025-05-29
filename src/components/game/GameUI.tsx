import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { GameState, TrigramStance } from "../../types";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface GameUIProps {
  readonly gameState: GameState;
  readonly gameTime: number;
  readonly combatLog: readonly string[];
  readonly onStartMatch: () => void;
  readonly onResetMatch: () => void;
  readonly onStanceChange: (stance: TrigramStance) => void;
  readonly onTogglePause: () => void;
}

export function GameUI({
  gameState,
  gameTime,
  combatLog,
  onStartMatch,
  onResetMatch,
}: GameUIProps): JSX.Element {
  const player1 = gameState.players[0];
  const player2 = gameState.players[1];

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const formatHealth = useCallback(
    (health: number, maxHealth: number): string => {
      const percentage = Math.round((health / maxHealth) * 100);
      return `${health}/${maxHealth} (${percentage}%)`;
    },
    []
  );

  const drawHealthBar = useCallback(
    (
      g: PixiGraphics,
      health: number,
      maxHealth: number,
      width: number,
      isPlayer2: boolean = false
    ) => {
      g.clear();

      // Background
      g.setFillStyle({ color: 0x330000, alpha: 0.8 });
      g.rect(0, 0, width, 20);
      g.fill();

      // Health fill
      const healthPercent = Math.max(0, health / maxHealth);
      const healthWidth = width * healthPercent;

      let healthColor: number;
      if (healthPercent > 0.6) {
        healthColor = 0x00ff00; // Green
      } else if (healthPercent > 0.3) {
        healthColor = 0xffff00; // Yellow
      } else {
        healthColor = 0xff0000; // Red
      }

      g.setFillStyle({ color: healthColor, alpha: 0.9 });
      if (isPlayer2) {
        // Player 2 health bar fills from right to left
        g.rect(width - healthWidth, 0, healthWidth, 20);
      } else {
        // Player 1 health bar fills from left to right
        g.rect(0, 0, healthWidth, 20);
      }
      g.fill();

      // Border
      g.setStrokeStyle({ color: 0xffffff, width: 2, alpha: 0.7 });
      g.rect(0, 0, width, 20);
      g.stroke();
    },
    []
  );

  const drawStaminaBar = useCallback(
    (g: PixiGraphics, stamina: number, maxStamina: number, width: number) => {
      g.clear();

      // Background
      g.setFillStyle({ color: 0x001133, alpha: 0.8 });
      g.rect(0, 0, width, 12);
      g.fill();

      // Stamina fill
      const staminaPercent = Math.max(0, stamina / maxStamina);
      const staminaWidth = width * staminaPercent;

      g.setFillStyle({ color: 0x00ffff, alpha: 0.8 });
      g.rect(0, 0, staminaWidth, 12);
      g.fill();

      // Border
      g.setStrokeStyle({ color: 0x00ffff, width: 1, alpha: 0.5 });
      g.rect(0, 0, width, 12);
      g.stroke();
    },
    []
  );

  return (
    <Container>
      {/* Player 1 Health Bar */}
      <Container x={50} y={50}>
        <Graphics
          draw={(g: PixiGraphics) =>
            drawHealthBar(g, player1.health, player1.maxHealth, 300)
          }
        />
        <Text
          text={`Player 1: ${formatHealth(player1.health, player1.maxHealth)}`}
          x={0}
          y={-25}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: 0xffffff,
          }}
        />
      </Container>

      {/* Player 2 Health Bar */}
      <Container x={window.innerWidth - 350} y={50}>
        <Graphics
          draw={(g: PixiGraphics) =>
            drawHealthBar(g, player2.health, player2.maxHealth, 300, true)
          }
        />
        <Text
          text={`Player 2: ${formatHealth(player2.health, player2.maxHealth)}`}
          x={300}
          y={-25}
          anchor={{ x: 1, y: 0 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: 0xffffff,
          }}
        />
      </Container>

      {/* Player 1 Stamina Bar */}
      <Container x={50} y={85}>
        <Graphics
          draw={(g: PixiGraphics) =>
            drawStaminaBar(g, player1.stamina, player1.maxStamina, 300)
          }
        />
      </Container>

      {/* Player 2 Stamina Bar */}
      <Container x={window.innerWidth - 350} y={85}>
        <Graphics
          draw={(g: PixiGraphics) =>
            drawStaminaBar(g, player2.stamina, player2.maxStamina, 300)
          }
        />
      </Container>

      {/* Game Time */}
      <Container x={window.innerWidth / 2} y={50}>
        <Text
          text={formatTime(gameTime)}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 24,
            fill: 0xffd700,
            fontWeight: "bold",
          }}
        />
      </Container>

      {/* Round Display */}
      <Container x={window.innerWidth / 2} y={80}>
        <Text
          text={`라운드 ${gameState.currentRound}`}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: 0xffffff,
          }}
        />
      </Container>

      {/* Pause Indicator */}
      {gameState.isPaused && (
        <Container x={window.innerWidth / 2} y={window.innerHeight / 2}>
          <Graphics
            draw={(g: PixiGraphics) => {
              g.clear();
              g.setFillStyle({ color: 0x000000, alpha: 0.7 });
              g.rect(-200, -50, 400, 100);
              g.fill();

              g.setStrokeStyle({ color: 0xffd700, width: 2 });
              g.rect(-200, -50, 400, 100);
              g.stroke();
            }}
          />
          <Text
            text="일시정지 (PAUSED)"
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 32,
              fill: 0xffd700,
              fontWeight: "bold",
            }}
          />
        </Container>
      )}

      {/* Combat Log */}
      <Container x={50} y={window.innerHeight - 200}>
        {combatLog.slice(-5).map((logEntry, index) => (
          <Text
            key={index}
            text={logEntry}
            y={index * 20}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 12,
              fill: 0xcccccc,
            }}
          />
        ))}
      </Container>
    </Container>
  );
}
