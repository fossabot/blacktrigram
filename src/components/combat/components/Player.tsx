// Complete Player component with Korean martial arts character rendering

import React, { useMemo, useCallback } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import type { PlayerProps } from "../../../types/components";
import {
  KOREAN_COLORS,
  PLAYER_ARCHETYPES_DATA,
} from "../../../types/constants";
import { getArchetypeColors } from "../../../utils/colorUtils";
import * as PIXI from "pixi.js";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import type { PlayerState } from "../../types/player";

extend({ Container, Graphics, Text });

export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  onClick,
  x = 0,
  y = 0,
  width = 50,
  height = 50,
  visible = true,
  alpha = 1.0,
  gridPosition,
  gridSize = 60,
  isActive = false,
}) => {
  usePixiExtensions();

  // Get archetype-specific data and colors
  const archetypeData = useMemo(() => {
    return PLAYER_ARCHETYPES_DATA[playerState.archetype];
  }, [playerState.archetype]);

  const archetypeColors = useMemo(() => {
    return getArchetypeColors(playerState.archetype);
  }, [playerState.archetype]);

  // Calculate actual position based on grid
  const actualPosition = useMemo(() => {
    if (gridPosition && gridSize) {
      return {
        x: gridPosition.col * gridSize + gridSize / 2,
        y: gridPosition.row * gridSize + gridSize / 2,
      };
    }
    return { x, y };
  }, [gridPosition, gridSize, x, y]);

  // Calculate health-based visual states
  const healthPercentage = useMemo(() => {
    return playerState.health / playerState.maxHealth;
  }, [playerState.health, playerState.maxHealth]);

  const kiPercentage = useMemo(() => {
    return playerState.ki / playerState.maxKi;
  }, [playerState.ki, playerState.maxKi]);

  const staminaPercentage = useMemo(() => {
    return playerState.stamina / playerState.maxStamina;
  }, [playerState.stamina, playerState.maxStamina]);

  // Determine player body color based on health and status
  const playerBodyColor = useMemo(() => {
    if (playerState.isStunned) return KOREAN_COLORS.WARNING_YELLOW;
    if (healthPercentage > 0.7) return archetypeColors.primary;
    if (healthPercentage > 0.4) return KOREAN_COLORS.WARNING_ORANGE;
    if (healthPercentage > 0.15) return KOREAN_COLORS.WARNING_YELLOW;
    return KOREAN_COLORS.NEGATIVE_RED;
  }, [healthPercentage, playerState.isStunned, archetypeColors.primary]);

  // Player body outline color based on combat state
  const outlineColor = useMemo(() => {
    if (isActive) return KOREAN_COLORS.ACCENT_GOLD;
    if (playerState.isBlocking) return KOREAN_COLORS.PRIMARY_BLUE;
    if (playerState.isCountering) return KOREAN_COLORS.ACCENT_PURPLE;
    if (playerState.isStunned) return KOREAN_COLORS.NEGATIVE_RED;
    return KOREAN_COLORS.TEXT_PRIMARY;
  }, [
    isActive,
    playerState.isBlocking,
    playerState.isCountering,
    playerState.isStunned,
  ]);

  // Enhanced player drawing with martial arts representation
  const drawPlayerBody = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const centerX = 0;
      const centerY = 0;
      const bodyRadius = Math.min(width, height) / 3;

      // Active player glow
      if (isActive) {
        g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.4 });
        g.circle(centerX, centerY, bodyRadius + 8);
        g.fill();
      }

      // Main body circle
      g.fill({ color: playerBodyColor, alpha: 0.9 });
      g.circle(centerX, centerY, bodyRadius);
      g.fill();

      // Enhanced outline
      g.stroke({ width: isActive ? 3 : 2, color: outlineColor, alpha: 1.0 });
      g.circle(centerX, centerY, bodyRadius);
      g.stroke();

      // Stance indicator - small inner circle
      g.fill({ color: archetypeColors.secondary, alpha: 0.8 });
      g.circle(centerX, centerY, bodyRadius * 0.6);
      g.fill();

      // Health indicator segments
      const segments = 8;
      const segmentAngle = (Math.PI * 2) / segments;

      for (let i = 0; i < segments; i++) {
        const angle = i * segmentAngle - Math.PI / 2;
        const segmentHealth = Math.max(
          0,
          Math.min(1, healthPercentage * segments - i)
        );

        if (segmentHealth > 0) {
          const startAngle = angle - segmentAngle / 2;
          const endAngle = angle + segmentAngle / 2;

          g.stroke({
            width: 2,
            color: getStatusColor(segmentHealth),
            alpha: segmentHealth,
          });
          g.arc(centerX, centerY, bodyRadius + 3, startAngle, endAngle);
          g.stroke();
        }
      }

      // Combat state indicators
      if (playerState.isBlocking) {
        g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_BLUE, alpha: 0.8 });
        g.rect(
          centerX - bodyRadius,
          centerY - bodyRadius,
          bodyRadius * 2,
          bodyRadius * 2
        );
        g.stroke();
      }

      if (playerState.isStunned) {
        // Stun effect - spinning stars
        for (let i = 0; i < 3; i++) {
          const starAngle =
            (Date.now() * 0.01 + i * ((Math.PI * 2) / 3)) % (Math.PI * 2);
          const starX = centerX + Math.cos(starAngle) * (bodyRadius + 12);
          const starY = centerY + Math.sin(starAngle) * (bodyRadius + 12);

          g.fill({ color: KOREAN_COLORS.WARNING_YELLOW, alpha: 0.8 });
          g.star(starX, starY, 4, 3, 6);
          g.fill();
        }
      }
    },
    [
      width,
      height,
      isActive,
      playerBodyColor,
      outlineColor,
      archetypeColors,
      healthPercentage,
      playerState.isBlocking,
      playerState.isStunned,
    ]
  );

  // Status color helper
  const getStatusColor = useCallback((percentage: number) => {
    if (percentage > 0.7) return KOREAN_COLORS.POSITIVE_GREEN;
    if (percentage > 0.4) return KOREAN_COLORS.WARNING_YELLOW;
    if (percentage > 0.2) return KOREAN_COLORS.WARNING_ORANGE;
    return KOREAN_COLORS.NEGATIVE_RED;
  }, []);

  // Status bars drawing
  const drawStatusBars = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      const barWidth = width * 0.8;
      const barHeight = 3;
      const barY = height / 2 + 8;

      // Health bar
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.rect(-barWidth / 2, barY, barWidth, barHeight);
      g.fill();

      g.fill({ color: getStatusColor(healthPercentage), alpha: 0.9 });
      g.rect(-barWidth / 2, barY, barWidth * healthPercentage, barHeight);
      g.fill();

      // Ki bar
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.6 });
      g.rect(-barWidth / 2, barY + 5, barWidth, barHeight - 1);
      g.fill();

      g.fill({ color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.8 });
      g.rect(-barWidth / 2, barY + 5, barWidth * kiPercentage, barHeight - 1);
      g.fill();

      // Stamina bar
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.4 });
      g.rect(-barWidth / 2, barY + 9, barWidth, barHeight - 1);
      g.fill();

      g.fill({ color: KOREAN_COLORS.SECONDARY_YELLOW, alpha: 0.7 });
      g.rect(
        -barWidth / 2,
        barY + 9,
        barWidth * staminaPercentage,
        barHeight - 1
      );
      g.fill();
    },
    [
      width,
      height,
      healthPercentage,
      kiPercentage,
      staminaPercentage,
      getStatusColor,
    ]
  );

  // Status effects drawing
  const drawStatusEffects = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      if (playerState.statusEffects.length === 0) return;

      // Draw status effect indicators as small icons around the player
      playerState.statusEffects.forEach((effect, index) => {
        const angle = (index / playerState.statusEffects.length) * Math.PI * 2;
        const effectX = Math.cos(angle) * (width / 2 + 15);
        const effectY = Math.sin(angle) * (height / 2 + 15);

        let effectColor: PIXI.ColorSource = KOREAN_COLORS.NEUTRAL_GRAY;
        switch (effect.type) {
          case "stun":
            effectColor = KOREAN_COLORS.WARNING_YELLOW as PIXI.ColorSource;
            break;
          case "poison":
            effectColor = KOREAN_COLORS.POSITIVE_GREEN as PIXI.ColorSource;
            break;
          case "burn":
            effectColor = KOREAN_COLORS.ACCENT_RED as PIXI.ColorSource;
            break;
          case "bleed":
            effectColor = KOREAN_COLORS.NEGATIVE_RED as PIXI.ColorSource;
            break;
          case "strengthened":
            effectColor = KOREAN_COLORS.ACCENT_GOLD as PIXI.ColorSource;
            break;
          case "weakened":
            effectColor = KOREAN_COLORS.UI_GRAY as PIXI.ColorSource;
            break;
        }

        g.fill({ color: effectColor, alpha: 0.8 });
        g.circle(effectX, effectY, 4);
        g.fill();
      });
    },
    [width, height, playerState.statusEffects]
  );

  // Text styles with proper PIXI color typing
  const nameTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontSize: 10,
        fill: KOREAN_COLORS.TEXT_PRIMARY as PIXI.ColorSource,
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const stanceTextStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontSize: 12,
        fill: KOREAN_COLORS.ACCENT_GOLD as PIXI.ColorSource,
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  return (
    <pixiContainer
      x={actualPosition.x}
      y={actualPosition.y}
      visible={visible}
      alpha={alpha}
      interactive={true}
      onPointerDown={onClick}
      data-testid={`player-${playerIndex}`}
    >
      {/* Main player body */}
      <pixiGraphics draw={drawPlayerBody} />

      {/* Player name (Korean) */}
      <pixiText
        text={playerState.name.korean}
        style={nameTextStyle}
        x={0}
        y={-height / 2 - 15}
        anchor={0.5}
        data-testid={`player-${playerIndex}-name`}
      />

      {/* Current stance symbol */}
      <pixiText
        text={playerState.currentStance.charAt(0).toUpperCase()}
        style={stanceTextStyle}
        x={0}
        y={0}
        anchor={0.5}
        data-testid={`player-${playerIndex}-stance`}
      />

      {/* Status bars */}
      <pixiGraphics draw={drawStatusBars} />

      {/* Status effects */}
      <pixiGraphics draw={drawStatusEffects} />

      {/* Player index indicator (for debugging/development) */}
      <pixiText
        text={`P${playerIndex + 1}`}
        style={{
          fontSize: 8,
          fill: KOREAN_COLORS.TEXT_TERTIARY as PIXI.ColorSource,
          fontFamily: "Arial, sans-serif",
        }}
        x={-width / 2 + 5}
        y={-height / 2 + 5}
        data-testid={`player-${playerIndex}-debug`}
      />

      {/* Consciousness indicator (if unconscious) */}
      {playerState.consciousness <= 0 && (
        <pixiText
          text="기절"
          style={{
            fontSize: 8,
            fill: KOREAN_COLORS.NEGATIVE_RED as PIXI.ColorSource,
            fontFamily: '"Noto Sans KR", Arial, sans-serif',
            align: "center",
            fontWeight: "bold",
          }}
          x={0}
          y={height / 2 + 20}
          anchor={0.5}
          data-testid={`player-${playerIndex}-unconscious`}
        />
      )}
    </pixiContainer>
  );
};

export default Player;
