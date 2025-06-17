// Complete Player UI component with Korean martial arts character rendering

import React, { useCallback, useMemo } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { PlayerState } from "../../../types/player";
import type { GridPosition } from "../../../types/combat";
import { KOREAN_COLORS, PLAYER_ARCHETYPES_DATA, TRIGRAM_DATA } from "../../../types/constants";
import * as PIXI from "pixi.js";

// Extend PixiJS components
extend({ Container, Graphics, Text });

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onClick: () => void;
  readonly x?: number;
  readonly y?: number;
  readonly gridPosition?: GridPosition;
  readonly gridSize?: number;
  readonly isActive?: boolean;
}

export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  onClick,
  x = 0,
  y = 0,
  gridPosition,
  gridSize = 60,
  isActive = false,
}) => {
  usePixiExtensions();

  const archetypeData = PLAYER_ARCHETYPES_DATA[playerState.archetype];
  const stanceData = TRIGRAM_DATA[playerState.currentStance];

  // Calculate health and resource percentages
  const healthPercent = playerState.health / playerState.maxHealth;
  const kiPercent = playerState.ki / playerState.maxKi;
  const staminaPercent = playerState.stamina / playerState.maxStamina;

  // Position calculations for grid-based positioning
  const finalX = useMemo(() => {
    if (gridPosition) {
      return gridPosition.col * gridSize + gridSize / 2;
    }
    return x;
  }, [gridPosition, gridSize, x]);

  const finalY = useMemo(() => {
    if (gridPosition) {
      return gridPosition.row * gridSize + gridSize / 2;
    }
    return y;
  }, [gridPosition, gridSize, y]);

  // Player body rendering with Korean martial arts aesthetics
  const drawPlayerBody = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Base body color from archetype
      const bodyColor = archetypeData.colors.primary;
      const alpha = healthPercent > 0.2 ? 0.9 : 0.5;

      // Active player highlight
      if (isActive) {
        g.stroke({ width: 3, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
        g.circle(0, 0, 45);
        g.stroke();
      }

      // Main body
      g.fill({ color: bodyColor, alpha });
      g.circle(0, -30, 12); // Head
      g.rect(-8, -18, 16, 30); // Torso
      g.rect(-6, 12, 4, 20); // Left leg
      g.rect(2, 12, 4, 20); // Right leg
      g.rect(-18, -10, 8, 4); // Left arm
      g.rect(10, -10, 8, 4); // Right arm
      g.fill();

      // Stance aura effect
      if (stanceData) {
        g.stroke({ width: 2, color: stanceData.theme.primary, alpha: 0.6 });
        g.circle(0, 0, 35);
        g.stroke();
      }

      // Combat state indicators
      if (playerState.isBlocking) {
        g.stroke({ width: 3, color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.8 });
        g.rect(-20, -25, 40, 50);
        g.stroke();
      }

      if (playerState.isStunned) {
        // Stun effect with rotating symbols
        g.fill({ color: KOREAN_COLORS.WARNING_YELLOW, alpha: 0.8 });
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2;
          const x = Math.cos(angle) * 25;
          const y = Math.sin(angle) * 25;
          g.star(x, y, 4, 3, 6);
        }
        g.fill();
      }
    },
    [
      archetypeData,
      stanceData,
      healthPercent,
      isActive,
      playerState.isBlocking,
      playerState.isStunned,
    ]
  );

  // Health bar above player
  const drawHealthBar = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const barWidth = 40;
      const barHeight = 4;
      const barY = -45;

      // Background
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.rect(-barWidth / 2, barY, barWidth, barHeight);
      g.fill();

      // Health fill
      const healthColor =
        healthPercent > 0.6
          ? KOREAN_COLORS.POSITIVE_GREEN
          : healthPercent > 0.3
          ? KOREAN_COLORS.WARNING_YELLOW
          : KOREAN_COLORS.NEGATIVE_RED;

      g.fill({ color: healthColor, alpha: 0.9 });
      g.rect(-barWidth / 2, barY, barWidth * healthPercent, barHeight);
      g.fill();
    },
    [healthPercent]
  );

  // Status effects visualization
  const drawStatusEffects = useCallback(
    (g: PIXI.Graphics) => {
      if (!playerState.statusEffects || playerState.statusEffects.length === 0) {
        return;
      }

      g.clear();

      playerState.statusEffects.slice(0, 3).forEach((effect, index) => {
        const effectX = -15 + index * 10;
        const effectY = -55;

        // Effect icon based on type
        let effectColor = KOREAN_COLORS.WARNING_YELLOW;
        if (effect.type === "burn") effectColor = KOREAN_COLORS.NEGATIVE_RED;
        if (effect.type === "poison") effectColor = KOREAN_COLORS.POSITIVE_GREEN;
        if (effect.type === "stun") effectColor = KOREAN_COLORS.ACCENT_BLUE;

        g.fill({ color: effectColor, alpha: 0.8 });
        g.circle(effectX, effectY, 3);
        g.fill();
      });
    },
    [playerState.statusEffects]
  );

  return (
    <pixiContainer
      x={finalX}
      y={finalY}
      interactive={true}
      pointerdown={onClick}
      data-testid={`player-${playerIndex}`}
    >
      {/* Main player body */}
      <pixiGraphics draw={drawPlayerBody} />

      {/* Health bar */}
      <pixiGraphics draw={drawHealthBar} />

      {/* Status effects */}
      <pixiGraphics draw={drawStatusEffects} />

      {/* Player name */}
      <pixiText
        text={playerState.name.korean}
        style={{
          fontSize: 8,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          align: "center",
          fontFamily: "Noto Sans KR",
        }}
        anchor={0.5}
        y={-60}
        data-testid={`player-${playerIndex}-name`}
      />

      {/* Current stance display */}
      <pixiText
        text={`${stanceData.symbol} ${stanceData.name.korean}`}
        style={{
          fontSize: 6,
          fill: stanceData.theme.primary,
          align: "center",
        }}
        anchor={0.5}
        y={40}
        data-testid={`player-${playerIndex}-stance`}
      />

      {/* Unconscious indicator */}
      {playerState.consciousness <= 0 && (
        <pixiContainer data-testid={`player-${playerIndex}-unconscious`}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.NEGATIVE_RED, alpha: 0.8 });
              g.rect(-20, -5, 40, 10);
              g.fill();
            }}
          />
          <pixiText
            text="기절"
            style={{
              fontSize: 8,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}

      {/* Debug info */}
      <pixiText
        text={`P${playerIndex + 1}`}
        style={{
          fontSize: 6,
          fill: KOREAN_COLORS.TEXT_TERTIARY,
          align: "center",
        }}
        anchor={0.5}
        y={50}
        data-testid={`player-${playerIndex}-debug`}
      />
    </pixiContainer>
  );
};

export default Player;
          {playerState.statusEffects.slice(0, 3).map((effect, index) => (
            <pixiGraphics
              key={effect.id}
              draw={(g) => {
                g.clear();
                const effectColor =
                  effect.type === "stun"
                    ? KOREAN_COLORS.WARNING_YELLOW
                    : effect.type === "poison"
                    ? KOREAN_COLORS.POSITIVE_GREEN
                    : KOREAN_COLORS.NEGATIVE_RED;

                g.fill({ color: effectColor, alpha: 0.7 });
                g.circle(index * 15, 0, 5);
                g.fill();
              }}
            />
          ))}
        </pixiContainer>
      )}

      {/* Unconscious indicator */}
      {playerState.consciousness <= 0 && (
        <pixiText
          text="기절"
          style={{
            fontSize: 8,
            fill: KOREAN_COLORS.NEGATIVE_RED,
            align: "center",
            fontWeight: "bold",
          }}
          x={0}
          y={55}
          anchor={0.5}
          data-testid={`player-${playerIndex}-unconscious`}
        />
      )}

      {/* Debug info */}
      <pixiText
        text={`P${playerIndex + 1}`}
        style={{
          fontSize: 6,
          fill: KOREAN_COLORS.TEXT_TERTIARY,
          align: "center",
        }}
        x={0}
        y={65}
        anchor={0.5}
        data-testid={`player-${playerIndex}-debug`}
      />
    </pixiContainer>
  );
};

export default Player;
