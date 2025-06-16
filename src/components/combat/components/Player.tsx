// Complete Player UI component with Korean martial arts character rendering

import React, { useMemo, useCallback } from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { PlayerProps } from "../../../types/components";
import {
  KOREAN_COLORS,
  PLAYER_ARCHETYPES_DATA,
} from "../../../types/constants";
import * as PIXI from "pixi.js";

// Fix: Create getArchetypeColors function since it's missing from utils
const getArchetypeColors = (archetype: string) => {
  const archetypeData =
    PLAYER_ARCHETYPES_DATA[archetype as keyof typeof PLAYER_ARCHETYPES_DATA];
  return (
    archetypeData?.colors || {
      primary: KOREAN_COLORS.TEXT_PRIMARY,
      secondary: KOREAN_COLORS.TEXT_SECONDARY,
    }
  );
};

/**
 * Korean Martial Arts Player Visual Component
 * Renders a player with full Korean martial arts aesthetics and combat information
 */
export const Player: React.FC<PlayerProps> = ({
  playerState,
  playerIndex,
  onClick,
  x = 0,
  y = 0,
  width = 80,
  height = 140,
  visible = true,
  alpha = 1.0,
}) => {
  usePixiExtensions();

  // Get archetype-specific data and colors
  const archetypeData = useMemo(() => {
    return PLAYER_ARCHETYPES_DATA[playerState.archetype];
  }, [playerState.archetype]);

  const archetypeColors = useMemo(() => {
    return getArchetypeColors(playerState.archetype);
  }, [playerState.archetype]);

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
    if (playerState.isBlocking) return KOREAN_COLORS.PRIMARY_BLUE;
    if (playerState.isCountering) return KOREAN_COLORS.ACCENT_PURPLE;
    if (playerState.isStunned) return KOREAN_COLORS.NEGATIVE_RED;
    return KOREAN_COLORS.TEXT_PRIMARY;
  }, [playerState.isBlocking, playerState.isCountering, playerState.isStunned]);

  // Combat status glow effect
  const shouldGlow = useMemo(() => {
    return (
      playerState.isBlocking ||
      playerState.isCountering ||
      (playerState.statusEffects && playerState.statusEffects.length > 0)
    );
  }, [
    playerState.isBlocking,
    playerState.isCountering,
    playerState.statusEffects,
  ]);

  // Main graphics drawing callback
  const drawPlayerBody = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      // Body background
      g.fill({ color: playerBodyColor, alpha: 0.9 });
      g.roundRect(0, 0, width, height, 8);
      g.fill();

      // Player outline with combat state indication
      const lineWidth = shouldGlow ? 3 : 2;
      g.stroke({ width: lineWidth, color: outlineColor, alpha: 1 });
      g.roundRect(0, 0, width, height, 8);
      g.stroke();

      // Archetype symbol background
      const symbolSize = 24;
      const symbolX = width / 2 - symbolSize / 2;
      const symbolY = 10;

      g.fill({ color: archetypeColors.secondary, alpha: 0.8 });
      g.circle(
        symbolX + symbolSize / 2,
        symbolY + symbolSize / 2,
        symbolSize / 2
      );
      g.fill();

      // Combat state indicators
      if (playerState.isBlocking) {
        g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_BLUE, alpha: 0.8 });
        g.rect(5, 5, width - 10, height - 10);
        g.stroke();
      }

      if (playerState.isStunned) {
        // Draw stun effect
        for (let i = 0; i < 3; i++) {
          g.stroke({
            width: 1,
            color: KOREAN_COLORS.WARNING_YELLOW,
            alpha: 0.6,
          });
          g.circle(width / 2, height / 2, 15 + i * 8);
          g.stroke();
        }
      }
    },
    [
      width,
      height,
      playerBodyColor,
      outlineColor,
      shouldGlow,
      archetypeColors,
      playerState.isBlocking,
      playerState.isStunned,
    ]
  );

  // Health bar drawing
  const drawHealthBar = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      const barWidth = width - 8;
      const barHeight = 8;
      const barX = 4;
      const barY = height + 10;

      // Background
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.roundRect(barX, barY, barWidth, barHeight, 3);
      g.fill();

      // Health fill
      const healthWidth = barWidth * healthPercentage;
      const healthColor =
        healthPercentage > 0.6
          ? KOREAN_COLORS.POSITIVE_GREEN
          : healthPercentage > 0.3
          ? KOREAN_COLORS.WARNING_YELLOW
          : KOREAN_COLORS.NEGATIVE_RED;

      g.fill({ color: healthColor, alpha: 0.9 });
      g.roundRect(barX, barY, healthWidth, barHeight, 3);
      g.fill();

      // Border
      g.stroke({ width: 1, color: KOREAN_COLORS.UI_BORDER, alpha: 0.8 });
      g.roundRect(barX, barY, barWidth, barHeight, 3);
      g.stroke();
    },
    [width, height, healthPercentage]
  );

  // Ki bar drawing
  const drawKiBar = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      const barWidth = width - 8;
      const barHeight = 6;
      const barX = 4;
      const barY = height + 22;

      // Background
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.6 });
      g.roundRect(barX, barY, barWidth, barHeight, 2);
      g.fill();

      // Ki fill
      const kiWidth = barWidth * kiPercentage;
      g.fill({ color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.8 });
      g.roundRect(barX, barY, kiWidth, barHeight, 2);
      g.fill();
    },
    [width, height, kiPercentage]
  );

  // Stamina bar drawing
  const drawStaminaBar = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      const barWidth = width - 8;
      const barHeight = 4;
      const barX = 4;
      const barY = height + 32;

      // Background
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.4 });
      g.roundRect(barX, barY, barWidth, barHeight, 1);
      g.fill();

      // Stamina fill
      const staminaWidth = barWidth * staminaPercentage;
      g.fill({ color: KOREAN_COLORS.SECONDARY_YELLOW, alpha: 0.7 });
      g.roundRect(barX, barY, staminaWidth, barHeight, 1);
      g.fill();
    },
    [width, height, staminaPercentage]
  );

  // Status effects drawing
  const drawStatusEffects = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();

      if (!playerState.statusEffects || playerState.statusEffects.length === 0)
        return;

      // Draw status effect indicators
      playerState.statusEffects.forEach((effect, index) => {
        const effectX = 5 + index * 12;
        const effectY = height - 15;

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
    [height, playerState.statusEffects]
  );

  // Text styles with proper PIXI color typing
  const nameTextStyle = useMemo(
    () => ({
      fontSize: 12,
      fill: KOREAN_COLORS.TEXT_PRIMARY as PIXI.ColorSource,
      fontFamily: '"Noto Sans KR", Arial, sans-serif',
      align: "center" as const,
      fontWeight: "bold" as const,
    }),
    []
  );

  const stanceTextStyle = useMemo(
    () => ({
      fontSize: 10,
      fill: KOREAN_COLORS.ACCENT_GOLD as PIXI.ColorSource,
      fontFamily: '"Noto Sans KR", Arial, sans-serif',
      align: "center" as const,
    }),
    []
  );

  const archetypeTextStyle = useMemo(
    () => ({
      fontSize: 8,
      fill: archetypeColors.primary as PIXI.ColorSource,
      fontFamily: '"Noto Sans KR", Arial, sans-serif',
      align: "center" as const,
    }),
    [archetypeColors.primary]
  );

  const healthTextStyle = useMemo(
    () => ({
      fontSize: 8,
      fill: KOREAN_COLORS.TEXT_PRIMARY as PIXI.ColorSource,
      fontFamily: "Arial, sans-serif",
      align: "center" as const,
    }),
    []
  );

  return (
    <pixiContainer
      x={x}
      y={y}
      visible={visible}
      alpha={alpha}
      interactive={true}
      pointerdown={onClick}
      data-testid={`player-${playerIndex}`}
    >
      {/* Main player body */}
      <pixiGraphics draw={drawPlayerBody} />

      {/* Player name (Korean) */}
      <pixiText
        text={playerState.name.korean}
        style={nameTextStyle}
        x={width / 2}
        y={-25}
        anchor={0.5}
      />

      {/* Archetype name */}
      <pixiText
        text={archetypeData.name.korean}
        style={archetypeTextStyle}
        x={width / 2}
        y={-12}
        anchor={0.5}
      />

      {/* Current stance indicator */}
      <pixiText
        text={`${playerState.currentStance} 자세`}
        style={stanceTextStyle}
        x={width / 2}
        y={height + 45}
        anchor={0.5}
      />

      {/* Health bar */}
      <pixiGraphics draw={drawHealthBar} />

      {/* Ki bar */}
      <pixiGraphics draw={drawKiBar} />

      {/* Stamina bar */}
      <pixiGraphics draw={drawStaminaBar} />

      {/* Health value text */}
      <pixiText
        text={`${Math.round(playerState.health)}/${playerState.maxHealth}`}
        style={healthTextStyle}
        x={width / 2}
        y={height + 14}
        anchor={0.5}
      />

      {/* Status effects */}
      <pixiGraphics draw={drawStatusEffects} />

      {/* Combat state text */}
      {(playerState.isBlocking ||
        playerState.isStunned ||
        playerState.isCountering) && (
        <pixiText
          text={
            playerState.isBlocking
              ? "방어"
              : playerState.isStunned
              ? "기절"
              : playerState.isCountering
              ? "반격"
              : ""
          }
          style={{
            fontSize: 10,
            fill: KOREAN_COLORS.WARNING_YELLOW as PIXI.ColorSource,
            fontFamily: '"Noto Sans KR", Arial, sans-serif',
            align: "center" as const,
            fontWeight: "bold" as const,
          }}
          x={width / 2}
          y={height / 2 + 20}
          anchor={0.5}
        />
      )}

      {/* Player index indicator (for debugging/development) */}
      <pixiText
        text={`P${playerIndex + 1}`}
        style={{
          fontSize: 8,
          fill: KOREAN_COLORS.TEXT_TERTIARY as PIXI.ColorSource,
          fontFamily: "Arial, sans-serif",
        }}
        x={2}
        y={2}
      />

      {/* Consciousness indicator (if unconscious) */}
      {playerState.consciousness <= 0 && (
        <pixiText
          text="의식잃음"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.NEGATIVE_RED as PIXI.ColorSource,
            fontFamily: '"Noto Sans KR", Arial, sans-serif',
            align: "center" as const,
            fontWeight: "bold" as const,
          }}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
        />
      )}
    </pixiContainer>
  );
};

export default Player;
