// Complete Player UI component with Korean martial arts character rendering

import React, { useCallback, useMemo } from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { PlayerState } from "../../../types/player";
import { KOREAN_COLORS, PLAYER_ARCHETYPES_DATA } from "../../../types/constants";
import { getArchetypeColors } from "../../../utils/colorUtils";
import { TextStyle } from "pixi.js"; // Fix: Import TextStyle directly

/**
 * Player component props for combat display
 */
export interface CombatPlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onClick?: () => void;
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly visible?: boolean;
  readonly alpha?: number;
}

/**
 * Korean Martial Arts Player Visual Component
 * Renders a player with full Korean martial arts aesthetics and combat information
 */
export const Player: React.FC<CombatPlayerProps> = ({
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
    (g: any) => {
      g.clear();

      // Body background
      g.fill({ color: playerBodyColor, alpha: 0.9 });
      g.roundRect(0, 0, width, height, 8);
      g.fill();

      // Player outline with combat state indication
      const lineWidth = shouldGlow ? 3 : 2;
      g.stroke({ width: lineWidth, color: outlineColor, alpha: 1.0 });
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
          g.stroke({ width: 1, color: KOREAN_COLORS.WARNING_YELLOW, alpha: 0.6 });
          g.circle(width / 2, height / 2, 15 + i * 8);
          g.stroke();
        }
      }

      // Active state indicator
      if (true) {
        g.stroke({ width: 4, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
        g.roundRect(-2, -2, width + 4, height + 4, 10);
        g.stroke();
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

  // Enhanced health bar drawing
  const drawHealthBar = useCallback(
    (g: any) => {
      g.clear();
      const barWidth = width - 8;
      const barHeight = 8;
      const barX = 4;
      const barY = height + 10;

      // Background with Korean traditional pattern
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.roundRect(barX, barY, barWidth, barHeight, 3);
      g.fill();

      // Health fill with gradient effect
      const healthWidth = Math.max(0, barWidth * healthPercentage);
      const healthColor =
        healthPercentage > 0.6
          ? KOREAN_COLORS.POSITIVE_GREEN
          : healthPercentage > 0.3
          ? KOREAN_COLORS.WARNING_YELLOW
          : KOREAN_COLORS.NEGATIVE_RED;

      if (healthWidth > 0) {
        g.fill({ color: healthColor, alpha: 0.9 });
        g.roundRect(barX, barY, healthWidth, barHeight, 3);
        g.fill();

        // Shine effect for healthy players
        if (healthPercentage > 0.8) {
          g.fill({ color: 0xffffff, alpha: 0.3 });
          g.roundRect(barX + 2, barY + 1, healthWidth * 0.6, barHeight - 2, 2);
          g.fill();
        }
      }

      // Enhanced border
      g.stroke({ width: 1, color: KOREAN_COLORS.UI_BORDER, alpha: 0.8 });
      g.roundRect(barX, barY, barWidth, barHeight, 3);
      g.stroke();
    },
    [width, height, healthPercentage]
  );

  // Ki bar drawing with Korean aesthetic
  const drawKiBar = useCallback(
    (g: any) => {
      g.clear();
      const barWidth = width - 8;
      const barHeight = 6;
      const barX = 4;
      const barY = height + 22;

      // Background
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.6 });
      g.roundRect(barX, barY, barWidth, barHeight, 2);
      g.fill();

      // Ki fill with mystical glow
      const kiWidth = Math.max(0, barWidth * kiPercentage);
      if (kiWidth > 0) {
        g.fill({ color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.8 });
        g.roundRect(barX, barY, kiWidth, barHeight, 2);
        g.fill();

        // Mystic energy effect
        if (kiPercentage > 0.5) {
          const time = Date.now() * 0.005;
          const glowAlpha = 0.2 + 0.1 * Math.sin(time);
          g.fill({ color: KOREAN_COLORS.PRIMARY_CYAN, alpha: glowAlpha });
          g.roundRect(barX - 1, barY - 1, kiWidth + 2, barHeight + 2, 3);
          g.fill();
        }
      }
    },
    [width, height, kiPercentage]
  );

  // Stamina bar drawing
  const drawStaminaBar = useCallback(
    (g: any) => {
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
      const staminaWidth = Math.max(0, barWidth * staminaPercentage);
      if (staminaWidth > 0) {
        const staminaColor =
          staminaPercentage > 0.3
            ? KOREAN_COLORS.SECONDARY_YELLOW
            : KOREAN_COLORS.WARNING_ORANGE;

        g.fill({ color: staminaColor, alpha: 0.7 });
        g.roundRect(barX, barY, staminaWidth, barHeight, 1);
        g.fill();
      }
    },
    [width, height, staminaPercentage]
  );

  // Status effects drawing
  const drawStatusEffects = useCallback(
    (g: any) => {
      g.clear();

      if (playerState.statusEffects.length === 0) return;

      // Draw status effect indicators
      playerState.statusEffects.forEach((effect, index) => {
        const effectX = 5 + index * 12;
        const effectY = height - 15;

        // Fix: Use simple number type instead of PIXI.ColorSource
        let effectColor: number = KOREAN_COLORS.NEUTRAL_GRAY;
        switch (effect.type) {
          case "stun":
            effectColor = KOREAN_COLORS.WARNING_YELLOW;
            break;
          case "poison":
            effectColor = KOREAN_COLORS.POSITIVE_GREEN;
            break;
          case "burn":
            effectColor = KOREAN_COLORS.ACCENT_RED;
            break;
          case "bleed":
            effectColor = KOREAN_COLORS.NEGATIVE_RED;
            break;
          case "strengthened":
            effectColor = KOREAN_COLORS.ACCENT_GOLD;
            break;
          case "weakened":
            effectColor = KOREAN_COLORS.UI_GRAY;
            break;
        }

        g.beginFill(effectColor, 0.8);
        g.drawCircle(effectX, effectY, 4);
        g.endFill();
      });
    },
    [height, playerState.statusEffects]
  );

  // Fix: Text styles with proper TextStyle import
  const nameTextStyle = useMemo(
    () =>
      new TextStyle({
        fontSize: 12,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const stanceTextStyle = useMemo(
    () =>
      new TextStyle({
        fontSize: 10,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
        align: "center",
      }),
    []
  );

  const archetypeTextStyle = useMemo(
    () =>
      new TextStyle({
        fontSize: 8,
        fill: archetypeColors.primary,
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
        align: "center",
      }),
    [archetypeColors.primary]
  );

  const healthTextStyle = useMemo(
    () =>
      new TextStyle({
        fontSize: 8,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        fontFamily: "Arial, sans-serif",
        align: "center",
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
      onPointerDown={onClick}
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
        data-testid={`player-${playerIndex}-name`}
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
        data-testid={`player-${playerIndex}-stance`}
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
          style={
            new TextStyle({
              fontSize: 10,
              fill: KOREAN_COLORS.WARNING_YELLOW,
              fontFamily: '"Noto Sans KR", Arial, sans-serif',
              align: "center",
              fontWeight: "bold",
            })
          }
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
          fill: KOREAN_COLORS.TEXT_TERTIARY,
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
            fill: KOREAN_COLORS.NEGATIVE_RED,
            fontFamily: '"Noto Sans KR", Arial, sans-serif',
            align: "center",
            fontWeight: "bold",
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
