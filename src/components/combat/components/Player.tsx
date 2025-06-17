// Complete Player UI component with Korean martial arts character rendering

import React, { useCallback, useMemo } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { PlayerState } from "../../../types/player";
import type { GridPosition } from "../../../types/combat";
import {
  KOREAN_COLORS,
  PLAYER_ARCHETYPES_DATA,
  TRIGRAM_DATA,
} from "../../../types/constants";
import { lightenColor } from "../../../utils/colorUtils";
import * as PIXI from "pixi.js";

// Extend PixiJS components
extend({ Container, Graphics, Text });

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onClick: (playerIndex: number) => void;
  readonly x?: number;
  readonly y?: number;
  readonly isActive?: boolean;
  readonly gridPosition?: { row: number; col: number }; // Fix type
  readonly gridSize?: number;
  readonly showDetails?: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  onClick,
  x = 0,
  y = 0,
  isActive = false,
  gridPosition,
  gridSize = 60,
  showDetails = true,
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

  const drawPlayerBody = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Active player glow
      if (isActive) {
        g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.3 });
        g.circle(0, 0, 70);
        g.fill();
      }

      // Health-based body color
      const bodyColor =
        healthPercent > 0.6
          ? archetypeData.colors.primary
          : healthPercent > 0.3
          ? lightenColor(archetypeData.colors.primary, -0.3)
          : KOREAN_COLORS.NEGATIVE_RED;

      const bodyAlpha = playerState.consciousness > 0 ? 0.9 : 0.4;

      // Main body
      g.fill({ color: bodyColor, alpha: bodyAlpha });
      g.circle(0, -40, 15); // Head
      g.rect(-12, -25, 24, 50); // Body
      g.rect(-10, 25, 8, 30); // Left leg
      g.rect(2, 25, 8, 30); // Right leg
      g.rect(-22, -15, 12, 8); // Left arm
      g.rect(10, -15, 12, 8); // Right arm
      g.fill();

      // Combat state indicators
      if (playerState.isBlocking) {
        g.stroke({ width: 3, color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.8 });
        g.circle(0, 0, 50);
        g.stroke();
      }

      if (playerState.isStunned) {
        g.fill({ color: KOREAN_COLORS.WARNING_YELLOW, alpha: 0.6 });
        g.star(0, -60, 5, 15, 8);
        g.fill();
      }

      if (playerState.isCountering) {
        g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_PURPLE, alpha: 0.8 });
        g.circle(0, 0, 45);
        g.stroke();
      }

      // Stance aura
      if (stanceData) {
        g.stroke({ width: 2, color: stanceData.theme.primary, alpha: 0.6 });
        g.circle(0, 0, 55);
        g.stroke();
      }
    },
    [playerState, archetypeData, stanceData, healthPercent, isActive]
  );

  const drawResourceBars = useCallback(
    (g: PIXI.Graphics) => {
      if (!showDetails) return;

      g.clear();

      const barWidth = 40;
      const barHeight = 4;
      const barSpacing = 6;

      // Health bar
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.rect(-barWidth / 2, -80, barWidth, barHeight);
      g.fill();

      const healthColor =
        healthPercent > 0.6
          ? KOREAN_COLORS.POSITIVE_GREEN
          : healthPercent > 0.3
          ? KOREAN_COLORS.WARNING_YELLOW
          : KOREAN_COLORS.NEGATIVE_RED;

      g.fill({ color: healthColor, alpha: 0.9 });
      g.rect(-barWidth / 2, -80, barWidth * healthPercent, barHeight);
      g.fill();

      // Ki bar
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.rect(-barWidth / 2, -80 + barSpacing, barWidth, barHeight);
      g.fill();

      g.fill({ color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.9 });
      g.rect(-barWidth / 2, -80 + barSpacing, barWidth * kiPercent, barHeight);
      g.fill();

      // Stamina bar
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.rect(-barWidth / 2, -80 + barSpacing * 2, barWidth, barHeight);
      g.fill();

      g.fill({ color: KOREAN_COLORS.SECONDARY_YELLOW, alpha: 0.9 });
      g.rect(
        -barWidth / 2,
        -80 + barSpacing * 2,
        barWidth * staminaPercent,
        barHeight
      );
      g.fill();
    },
    [showDetails, healthPercent, kiPercent, staminaPercent]
  );

  const drawStatusEffects = useCallback(
    (g: PIXI.Graphics) => {
      if (!playerState.statusEffects || playerState.statusEffects.length === 0)
        return;

      g.clear();

      playerState.statusEffects.slice(0, 4).forEach((effect, index) => {
        const effectX = -30 + index * 15;
        const effectY = 65;

        const effectColor =
          effect.type === "stun"
            ? KOREAN_COLORS.WARNING_YELLOW
            : effect.type === "poison"
            ? KOREAN_COLORS.POSITIVE_GREEN
            : KOREAN_COLORS.NEGATIVE_RED;

        g.fill({ color: effectColor, alpha: 0.8 });
        g.circle(effectX, effectY, 6);
        g.fill();

        g.stroke({ width: 1, color: effectColor, alpha: 1.0 });
        g.circle(effectX, effectY, 6);
        g.stroke();
      });
    },
    [playerState.statusEffects]
  );

  return (
    <pixiContainer
      x={finalPosition.x}
      y={finalPosition.y}
      interactive={true}
      onPointerDown={() => onClick(playerIndex)}
      data-testid={`player-${playerIndex}`}
    >
      <pixiGraphics draw={drawPlayerBody} />
      <pixiGraphics draw={drawResourceBars} />
      <pixiGraphics draw={drawStatusEffects} />

      {/* Player name */}
      {showDetails && (
        <pixiText
          text={playerState.name.korean}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
            align: "center",
            fontFamily: "Noto Sans KR",
          }}
          anchor={0.5}
          y={-95}
          data-testid={`player-${playerIndex}-name`}
        />
      )}

      {/* Current stance */}
      {showDetails && stanceData && (
        <pixiContainer y={75} data-testid={`player-${playerIndex}-stance`}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: stanceData.theme.primary, alpha: 0.8 });
              g.circle(0, 0, 12);
              g.fill();
            }}
          />
          <pixiText
            text={stanceData.symbol}
            style={{
              fontSize: 10,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}

      {/* Unconscious indicator */}
      {playerState.consciousness <= 0 && (
        <pixiContainer data-testid={`player-${playerIndex}-unconscious`}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.NEGATIVE_RED, alpha: 0.7 });
              g.rect(-25, -10, 50, 20);
              g.fill();
            }}
          />
          <pixiText
            text="의식불명"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
              align: "center",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}

      {/* Debug info */}
      <pixiContainer y={-110} data-testid={`player-${playerIndex}-debug`}>
        <pixiText
          text={`P${playerIndex + 1}`}
          style={{
            fontSize: 8,
            fill: KOREAN_COLORS.TEXT_TERTIARY,
            align: "center",
          }}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default Player;
