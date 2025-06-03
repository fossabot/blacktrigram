import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { PlayerProps } from "../../types/components";
import { KOREAN_COLORS, getTrigramColor } from "../../types/constants";

export function PlayerVisuals({
  playerState,
  playerIndex,
  onStateUpdate,
  x = 0,
  y = 0,
  width = 60,
  height = 80,
  className = "",
  style = {},
}: PlayerProps): React.JSX.Element {
  // Draw player character
  const drawPlayer = useCallback(
    (g: any) => {
      g.clear();

      // Health indicator outline
      const healthRatio = playerState.health / playerState.maxHealth;
      const outlineColor =
        healthRatio > 0.6
          ? KOREAN_COLORS.HEALTH_GREEN
          : healthRatio > 0.3
          ? KOREAN_COLORS.HEALTH_YELLOW
          : KOREAN_COLORS.HEALTH_RED;

      // Player body (simplified rectangle for now)
      g.setFillStyle({ color: stanceVisuals.primaryColor, alpha: 0.8 });
      g.rect(-15, -30, 30, 60);
      g.fill();

      // Stance glow effect
      if (stanceVisuals.glowIntensity > 0.3) {
        g.setFillStyle({
          color: stanceVisuals.primaryColor,
          alpha: stanceVisuals.glowIntensity * 0.3,
        });
        g.circle(0, 0, 40);
        g.fill();
      }

      // Health outline
      g.setStrokeStyle({ color: outlineColor, width: 2 });
      g.rect(-15, -30, 30, 60);
      g.stroke();

      // Facing direction indicator
      g.setFillStyle({ color: KOREAN_COLORS.WHITE, alpha: 0.9 });
      if (playerState.facing === "right") {
        g.moveTo(10, -10);
        g.lineTo(20, 0);
        g.lineTo(10, 10);
      } else {
        g.moveTo(-10, -10);
        g.lineTo(-20, 0);
        g.lineTo(-10, 10);
      }
      g.fill();
    },
    [playerState, stanceVisuals]
  );

  // Stance visual configuration
  const stanceVisuals = useMemo(() => {
    const stanceColors = {
      geon: KOREAN_COLORS.GEON_GOLD,
      tae: KOREAN_COLORS.TAE_SILVER,
      li: KOREAN_COLORS.LI_ORANGE,
      jin: KOREAN_COLORS.JIN_PURPLE,
      son: KOREAN_COLORS.SON_GREEN,
      gam: KOREAN_COLORS.GAM_BLUE,
      gan: KOREAN_COLORS.GAN_BROWN,
      gon: KOREAN_COLORS.GON_YELLOW,
    };

    return {
      primaryColor: stanceColors[playerState.stance] || KOREAN_COLORS.WHITE,
      glowIntensity: playerState.ki / playerState.maxKi,
    };
  }, [playerState.stance, playerState.ki, playerState.maxKi]);

  // Draw status effects
  const drawStatusEffects = useCallback(
    (g: any) => {
      g.clear();

      // Draw status effect indicators above player
      let effectIndex = 0;
      playerState.activeEffects.forEach(() => {
        const xOffset = effectIndex * 12 - 18; // Center multiple effects
        const yOffset = -45; // Above player

        g.setFillStyle({ color: KOREAN_COLORS.WARNING_ORANGE, alpha: 0.8 });
        g.circle(xOffset, yOffset, 4);
        g.fill();

        effectIndex++;
      });

      // Pain indicator
      if (playerState.pain > 30) {
        g.setFillStyle({ color: KOREAN_COLORS.DANGER_RED, alpha: 0.6 });
        g.circle(0, -50, 6);
        g.fill();
      }

      // Consciousness indicator
      if (playerState.consciousness < 70) {
        g.setFillStyle({ color: KOREAN_COLORS.JIN_PURPLE, alpha: 0.5 });
        g.circle(0, -55, 4);
        g.fill();
      }
    },
    [playerState.activeEffects, playerState.pain, playerState.consciousness]
  );

  // Health bar color calculation
  const healthBarColor = useMemo(() => {
    const healthRatio = playerState.health / playerState.maxHealth;
    if (healthRatio > 0.6) return KOREAN_COLORS.HEALTH_GREEN;
    if (healthRatio > 0.3) return KOREAN_COLORS.HEALTH_YELLOW;
    return KOREAN_COLORS.HEALTH_RED;
  }, [playerState.health, playerState.maxHealth]);

  // Draw health and ki bars
  const drawBars = useCallback(
    (g: any) => {
      g.clear();

      const barWidth = 60;
      const barHeight = 6;
      const barSpacing = 10;

      // Health bar background
      g.setFillStyle({ color: KOREAN_COLORS.DARK_GRAY, alpha: 0.8 });
      g.rect(-barWidth / 2, -70, barWidth, barHeight);
      g.fill();

      // Health bar fill
      const healthRatio = playerState.health / playerState.maxHealth;
      const healthColor =
        healthRatio > 0.6
          ? KOREAN_COLORS.HEALTH_GREEN
          : healthRatio > 0.3
          ? KOREAN_COLORS.HEALTH_YELLOW
          : KOREAN_COLORS.HEALTH_RED;

      g.setFillStyle({ color: healthColor, alpha: 0.9 });
      g.rect(-barWidth / 2, -70, barWidth * healthRatio, barHeight);
      g.fill();

      // Ki bar background
      g.setFillStyle({ color: KOREAN_COLORS.DARK_GRAY, alpha: 0.8 });
      g.rect(-barWidth / 2, -70 + barSpacing, barWidth, barHeight);
      g.fill();

      // Ki bar fill
      const kiRatio = playerState.ki / playerState.maxKi;
      g.setFillStyle({ color: KOREAN_COLORS.KI_BLUE, alpha: 0.9 });
      g.rect(-barWidth / 2, -70 + barSpacing, barWidth * kiRatio, barHeight);
      g.fill();

      // Stamina bar background
      g.setFillStyle({ color: KOREAN_COLORS.DARK_GRAY, alpha: 0.8 });
      g.rect(-barWidth / 2, -70 + barSpacing * 2, barWidth, barHeight);
      g.fill();

      // Stamina bar fill
      const staminaRatio = playerState.stamina / playerState.maxStamina;
      g.setFillStyle({ color: KOREAN_COLORS.STAMINA_YELLOW, alpha: 0.9 });
      g.rect(
        -barWidth / 2,
        -70 + barSpacing * 2,
        barWidth * staminaRatio,
        barHeight
      );
      g.fill();
    },
    [playerState]
  );

  return (
    <Container
      x={playerState.position.x}
      y={playerState.position.y}
      scale={1} // Mirror player 2
    >
      {/* Main player graphics */}
      <Graphics draw={drawPlayer} />

      {/* Status effects */}
      <Graphics draw={drawStatusEffects} />

      {/* Health, Ki, and Stamina bars */}
      <Graphics draw={drawBars} />
    </Container>
  );
}
