// Complete Player UI component with Korean martial arts character rendering

import React, { useCallback, useMemo } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { PlayerState } from "../../../types/player";
import {
  KOREAN_COLORS,
  PLAYER_ARCHETYPES_DATA,
  TRIGRAM_DATA,
} from "../../../types/constants";
import * as PIXI from "pixi.js";

extend({ Container, Graphics, Text });

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onClick?: (playerIndex: number) => void;
  readonly x?: number;
  readonly y?: number;
  readonly isActive?: boolean;
  readonly gridPosition?: { row: number; col: number };
  readonly gridSize?: number;
}

const getHealthColor = (healthPercent: number): number => {
  if (healthPercent > 0.6) return KOREAN_COLORS.POSITIVE_GREEN;
  if (healthPercent > 0.3) return KOREAN_COLORS.WARNING_YELLOW;
  return KOREAN_COLORS.NEGATIVE_RED;
};

export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  onClick,
  x = 0,
  y = 0,
  isActive = false,
  gridPosition,
  gridSize = 60,
}) => {
  usePixiExtensions();

  const archetypeData = PLAYER_ARCHETYPES_DATA[playerState.archetype];
  const stanceData = TRIGRAM_DATA[playerState.currentStance];

  const healthPercent = playerState.health / playerState.maxHealth;
  const kiPercent = playerState.ki / playerState.maxKi;
  const staminaPercent = playerState.stamina / playerState.maxStamina;

  // Calculate position based on grid if provided
  const finalPosition = useMemo(() => {
    if (gridPosition) {
      return {
        x: gridPosition.col * gridSize + gridSize / 2,
        y: gridPosition.row * gridSize + gridSize / 2,
      };
    }
    return { x, y };
  }, [gridPosition, gridSize, x, y]);

  const handleClick = useCallback(() => {
    onClick?.(playerIndex);
  }, [onClick, playerIndex]);

  const drawPlayerBody = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const bodyColor = archetypeData.colors.primary;
      const alpha = playerState.consciousness > 10 ? 0.9 : 0.5;

      // Main body
      g.fill({ color: bodyColor, alpha });
      g.circle(0, 0, 25); // Head
      g.rect(-12, 10, 24, 40); // Torso
      g.rect(-15, 50, 8, 25); // Left leg
      g.rect(7, 50, 8, 25); // Right leg
      g.rect(-25, 15, 8, 6); // Left arm
      g.rect(17, 15, 8, 6); // Right arm
      g.fill();

      // Status effects overlay
      if (playerState.isStunned) {
        g.fill({ color: KOREAN_COLORS.WARNING_YELLOW, alpha: 0.3 });
        g.circle(0, 0, 35);
        g.fill();
      }

      if (playerState.isBlocking) {
        g.stroke({ width: 3, color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.8 });
        g.circle(0, 0, 30);
        g.stroke();
      }

      if (playerState.isCountering) {
        g.fill({ color: KOREAN_COLORS.NEGATIVE_RED, alpha: 0.3 });
        g.circle(0, 0, 28);
        g.fill();
      }

      // Active player indicator
      if (isActive) {
        g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.9 });
        g.circle(0, 0, 40);
        g.stroke();
      }
    },
    [archetypeData, playerState, isActive]
  );

  const drawHealthBar = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const barWidth = 40;
      const barHeight = 6;

      // Background
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.rect(-barWidth / 2, -50, barWidth, barHeight);
      g.fill();

      // Health fill
      g.fill({ color: getHealthColor(healthPercent), alpha: 0.9 });
      g.rect(-barWidth / 2, -50, barWidth * healthPercent, barHeight);
      g.fill();

      // Border
      g.stroke({ width: 1, color: KOREAN_COLORS.UI_BORDER, alpha: 0.6 });
      g.rect(-barWidth / 2, -50, barWidth, barHeight);
      g.stroke();
    },
    [healthPercent]
  );

  const drawResourceBars = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const barWidth = 30;
      const barHeight = 4;

      // Ki bar
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.6 });
      g.rect(-barWidth / 2, 80, barWidth, barHeight);
      g.fill();

      g.fill({ color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.8 });
      g.rect(-barWidth / 2, 80, barWidth * kiPercent, barHeight);
      g.fill();

      // Stamina bar
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.6 });
      g.rect(-barWidth / 2, 87, barWidth, barHeight);
      g.fill();

      g.fill({ color: KOREAN_COLORS.SECONDARY_YELLOW, alpha: 0.8 });
      g.rect(-barWidth / 2, 87, barWidth * staminaPercent, barHeight);
      g.fill();
    },
    [kiPercent, staminaPercent]
  );

  const drawStatusEffects = useCallback(
    (g: PIXI.Graphics) => {
      if (!playerState.statusEffects?.length) return;

      g.clear();

      playerState.statusEffects.slice(0, 3).forEach((effect, index) => {
        const effectColor =
          effect.type === "burn"
            ? KOREAN_COLORS.NEGATIVE_RED
            : effect.type === "poison"
            ? KOREAN_COLORS.POSITIVE_GREEN
            : KOREAN_COLORS.WARNING_YELLOW;

        g.fill({ color: effectColor, alpha: 0.7 });
        g.circle(-20 + index * 15, -70, 5);
        g.fill();
      });
    },
    [playerState.statusEffects]
  );

  return (
    <pixiContainer
      x={finalPosition.x}
      y={finalPosition.y}
      interactive={true}
      onpointerdown={handleClick}
      data-testid={`player-${playerIndex}`}
    >
      {/* Player body */}
      <pixiGraphics draw={drawPlayerBody} />

      {/* Health bar */}
      <pixiGraphics draw={drawHealthBar} />

      {/* Resource bars */}
      <pixiGraphics draw={drawResourceBars} />

      {/* Status effects */}
      <pixiGraphics draw={drawStatusEffects} />

      {/* Player name */}
      <pixiContainer data-testid={`player-${playerIndex}-name`}>
        <pixiText
          text={playerState.name.korean}
          style={{
            fontSize: 10,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
            align: "center",
            fontFamily: "Noto Sans KR",
          }}
          anchor={0.5}
          y={-65}
        />
      </pixiContainer>

      {/* Current stance */}
      <pixiContainer data-testid={`player-${playerIndex}-stance`}>
        <pixiText
          text={stanceData.symbol}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
            align: "center",
          }}
          anchor={0.5}
          y={100}
        />
      </pixiContainer>

      {/* Unconscious indicator */}
      {playerState.consciousness <= 0 && (
        <pixiContainer data-testid={`player-${playerIndex}-unconscious`}>
          <pixiText
            text="기절"
            style={{
              fontSize: 14,
              fill: KOREAN_COLORS.NEGATIVE_RED,
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
            y={-30}
          />
        </pixiContainer>
      )}

      {/* Debug info */}
      <pixiContainer data-testid={`player-${playerIndex}-debug`}>
        <pixiText
          text={`P${playerIndex + 1}`}
          style={{
            fontSize: 8,
            fill: KOREAN_COLORS.TEXT_TERTIARY,
            align: "center",
          }}
          anchor={0.5}
          y={115}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default Player;
