import React from "react";
import { Container, Graphics, Text } from "@pixi/react";
import { useCallback } from "react";
import type { JSX } from "react";
import type { GameState, TrigramStance } from "../../types/GameTypes";
import { KOREAN_COLORS } from "../../types";

export interface GameUIProps {
  readonly gameState: GameState;
  readonly onStanceChange: (playerId: string, stance: TrigramStance) => void;
  readonly onTogglePause: () => void;
}

export function GameUI({
  gameState,
  onStanceChange,
  onTogglePause,
}: GameUIProps): JSX.Element {
  const player1 = gameState.players.player1;
  const player2 = gameState.players.player2;

  // Draw health bar
  const drawHealthBar = useCallback(
    (
      g: any,
      health: number,
      maxHealth: number,
      x: number,
      y: number,
      width: number
    ) => {
      const healthRatio = health / maxHealth;

      g.clear();

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.GRAY_DARK, alpha: 0.8 });
      g.rect(x, y, width, 20);
      g.fill();

      // Health fill
      const healthColor =
        healthRatio > 0.6
          ? KOREAN_COLORS.CYAN
          : healthRatio > 0.3
          ? 0xffff00
          : KOREAN_COLORS.RED;

      g.setFillStyle({ color: healthColor, alpha: 0.9 });
      g.rect(x + 2, y + 2, (width - 4) * healthRatio, 16);
      g.fill();

      // Border
      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2 });
      g.rect(x, y, width, 20);
      g.stroke();
    },
    []
  );

  // Draw stamina bar
  const drawStaminaBar = useCallback(
    (
      g: any,
      stamina: number,
      maxStamina: number,
      x: number,
      y: number,
      width: number
    ) => {
      const staminaRatio = stamina / maxStamina;

      g.clear();

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.GRAY_DARK, alpha: 0.6 });
      g.rect(x, y, width, 12);
      g.fill();

      // Stamina fill
      g.setFillStyle({ color: 0x98fb98, alpha: 0.8 });
      g.rect(x + 1, y + 1, (width - 2) * staminaRatio, 10);
      g.fill();

      // Border
      g.setStrokeStyle({ color: 0x98fb98, width: 1 });
      g.rect(x, y, width, 12);
      g.stroke();
    },
    []
  );

  // Format time display
  const formatTime = (timeMs: number): string => {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container>
      {/* Player 1 UI (Left side) */}
      <Container x={20} y={20}>
        {/* Player 1 name */}
        <Text
          text="플레이어 1 (Player 1)"
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: KOREAN_COLORS.CYAN,
            fontWeight: "bold",
          }}
        />

        {/* Health bar */}
        <Graphics
          draw={(g: any) =>
            drawHealthBar(g, player1.health, player1.maxHealth, 0, 25, 200)
          }
        />
        <Text
          text={`${Math.ceil(player1.health)}/${player1.maxHealth}`}
          x={100}
          y={32}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />

        {/* Stamina bar */}
        <Graphics
          draw={(g: any) =>
            drawStaminaBar(g, player1.stamina, player1.maxStamina, 0, 50, 200)
          }
        />

        {/* Current stance */}
        <Text
          text={`자세: ${player1.currentStance.toUpperCase()}`}
          y={70}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "500",
          }}
        />
      </Container>

      {/* Player 2 UI (Right side) */}
      <Container x={580} y={20}>
        {/* Player 2 name */}
        <Text
          text="플레이어 2 (Player 2)"
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: KOREAN_COLORS.RED,
            fontWeight: "bold",
          }}
        />

        {/* Health bar */}
        <Graphics
          draw={(g: any) =>
            drawHealthBar(g, player2.health, player2.maxHealth, 0, 25, 200)
          }
        />
        <Text
          text={`${Math.ceil(player2.health)}/${player2.maxHealth}`}
          x={100}
          y={32}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />

        {/* Stamina bar */}
        <Graphics
          draw={(g: any) =>
            drawStaminaBar(g, player2.stamina, player2.maxStamina, 0, 50, 200)
          }
        />

        {/* Current stance */}
        <Text
          text={`자세: ${player2.currentStance.toUpperCase()}`}
          y={70}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "500",
          }}
        />
      </Container>

      {/* Center UI */}
      <Container x={400} y={20}>
        {/* Timer */}
        <Text
          text={formatTime(gameState.combat.timeRemaining)}
          anchor={{ x: 0.5, y: 0 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 24,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
            dropShadow: {
              color: KOREAN_COLORS.BLACK,
              blur: 2,
              distance: 1,
            },
          }}
        />

        {/* Round indicator */}
        <Text
          text={`라운드 ${gameState.combat.round}`}
          anchor={{ x: 0.5, y: 0 }}
          y={30}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: KOREAN_COLORS.CYAN,
            fontWeight: "500",
          }}
        />

        {/* Pause indicator */}
        {gameState.paused && (
          <Text
            text="일시정지 (PAUSED)"
            anchor={{ x: 0.5, y: 0 }}
            y={60}
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: 18,
              fill: KOREAN_COLORS.RED,
              fontWeight: "bold",
            }}
          />
        )}
      </Container>

      {/* Controls help */}
      <Container x={20} y={550}>
        <Text
          text="조작법: 1-8 (팔괘), WASD (이동), SPACE (공격), SHIFT (방어), P (정지)"
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: KOREAN_COLORS.GRAY_LIGHT,
            fontWeight: "300",
          }}
        />
      </Container>
    </Container>
  );
}
