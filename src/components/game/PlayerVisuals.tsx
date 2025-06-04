import React, { useCallback, useEffect, useState } from "react";
import type { PlayerState, TrigramStance, StatusEffect } from "../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";

interface PlayerVisualsProps {
  readonly player: PlayerState;
  readonly isActive?: boolean;
  readonly showDebugInfo?: boolean;
  readonly scale?: number;
}

interface StanceAnimationState {
  currentFrame: number;
  animationSpeed: number;
  isTransitioning: boolean;
  targetStance?: TrigramStance;
  transitionProgress: number;
}

interface VisualEffectState {
  id: string;
  type: string;
  intensity: number;
  timeRemaining: number;
  color: number;
  opacity: number;
}

export function PlayerVisuals({
  player,
  isActive = true,
  showDebugInfo = false,
  scale = 1,
}: PlayerVisualsProps): React.JSX.Element {
  const [animationState, setAnimationState] = useState<StanceAnimationState>({
    currentFrame: 0,
    animationSpeed: 0.1,
    isTransitioning: false,
    transitionProgress: 0,
  });
  const [visualEffects, setVisualEffects] = useState<VisualEffectState[]>([]);

  // Korean martial arts stance data
  const stanceData = TRIGRAM_DATA[player.stance];
  const stanceColor = KOREAN_COLORS[player.stance] || KOREAN_COLORS.WHITE;
  const playerPosition = player.position;

  // Update animation based on player state
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setAnimationState((prev) => ({
        ...prev,
        currentFrame: (prev.currentFrame + prev.animationSpeed) % 1,
        transitionProgress: prev.isTransitioning
          ? Math.min(prev.transitionProgress + 0.05, 1.0)
          : 0,
      }));
    }, 16); // 60fps

    return () => clearInterval(interval);
  }, [isActive, player.stance]);

  // Update visual effects based on status effects
  useEffect(() => {
    const newEffects: VisualEffectState[] = player.activeEffects?.map(
      (effect: StatusEffect) => ({
        id: effect.id,
        type: effect.type,
        intensity: getEffectIntensityValue(effect.intensity),
        timeRemaining: effect.duration || 0,
        color: getEffectColor(effect.type),
        opacity: getEffectOpacity(effect.intensity),
      })
    );

    setVisualEffects(newEffects);
  }, [player.activeEffects]);

  // Korean martial artist body rendering
  const drawKoreanMartialArtist = useCallback(
    (g: any) => {
      if (!g || !g.clear) return;

      g.clear();

      // Base body structure for Korean martial artist
      const bodyHeight = 60 * scale;
      const bodyWidth = 20 * scale;
      const headRadius = 8 * scale;

      // Health-based color intensity
      const healthRatio = player.health / player.maxHealth;
      const bodyAlpha = Math.max(0.3, healthRatio);

      // Stance-based posture adjustments
      const stancePosture = getStancePosture(
        player.stance,
        animationState.currentFrame
      );

      // Draw head (Korean martial artist)
      g.beginFill(KOREAN_COLORS.HANBOK_WHITE, bodyAlpha);
      g.drawCircle(0, -bodyHeight * 0.6, headRadius);
      g.endFill();

      // Draw body with stance-specific posture
      g.beginFill(stanceColor, bodyAlpha * 0.8);
      g.drawRoundedRect(
        -bodyWidth * 0.5 + stancePosture.bodyLean,
        -bodyHeight * 0.4,
        bodyWidth,
        bodyHeight * 0.6,
        4 * scale
      );
      g.endFill();

      // Draw arms in stance-specific positions
      drawStanceArms(
        g,
        player.stance,
        stancePosture,
        scale,
        stanceColor,
        bodyAlpha
      );

      // Draw legs in stance-specific positions
      drawStanceLegs(
        g,
        player.stance,
        stancePosture,
        scale,
        stanceColor,
        bodyAlpha
      );

      // Draw Ki energy aura
      if (player.ki > 20) {
        drawKiAura(g, player.ki / player.maxKi, stanceColor, scale);
      }

      // Draw stance transition effects
      if (animationState.isTransitioning) {
        drawTransitionEffects(
          g,
          animationState.transitionProgress,
          stanceColor,
          scale
        );
      }

      // Draw combat readiness indicator
      drawCombatReadinessIndicator(g, player.combatReadiness, scale);
    },
    [player, stanceColor, scale, animationState]
  );

  // Status effects visual overlay
  const drawStatusEffects = useCallback(
    (g: any) => {
      if (!g || !g.clear) return;

      g.clear();

      visualEffects.forEach((effect, index) => {
        const radius = (15 + index * 3) * scale;
        const alpha = effect.opacity * 0.6;

        // Pulsing effect based on intensity
        const pulse =
          Math.sin(Date.now() * 0.01 * effect.intensity) * 0.3 + 0.7;

        g.lineStyle(2 * scale, effect.color, alpha * pulse);
        g.drawCircle(0, 0, radius);
      });
    },
    [visualEffects, scale]
  );

  // Health and Ki bars
  const drawStatusBars = useCallback(
    (g: any) => {
      if (!g || !g.clear) return;

      g.clear();

      const barWidth = 40 * scale;
      const barHeight = 4 * scale;
      const barSpacing = 8 * scale;
      const yOffset = -80 * scale;

      // Health bar (Korean traditional red)
      const healthRatio = player.health / player.maxHealth;
      g.beginFill(KOREAN_COLORS.BLACK, 0.5);
      g.drawRoundedRect(-barWidth * 0.5, yOffset, barWidth, barHeight, 2);
      g.endFill();

      g.beginFill(KOREAN_COLORS.TRADITIONAL_RED, 0.8);
      g.drawRoundedRect(
        -barWidth * 0.5,
        yOffset,
        barWidth * healthRatio,
        barHeight,
        2
      );
      g.endFill();

      // Ki bar (Korean traditional gold)
      const kiRatio = player.ki / player.maxKi;
      g.beginFill(KOREAN_COLORS.BLACK, 0.5);
      g.drawRoundedRect(
        -barWidth * 0.5,
        yOffset + barSpacing,
        barWidth,
        barHeight,
        2
      );
      g.endFill();

      g.beginFill(KOREAN_COLORS.HEAVEN_GOLD, 0.8);
      g.drawRoundedRect(
        -barWidth * 0.5,
        yOffset + barSpacing,
        barWidth * kiRatio,
        barHeight,
        2
      );
      g.endFill();

      // Stamina bar (Korean wind green)
      if (player.stamina !== undefined) {
        const staminaRatio = player.stamina / (player.maxStamina || 100);
        g.beginFill(KOREAN_COLORS.BLACK, 0.5);
        g.drawRoundedRect(
          -barWidth * 0.5,
          yOffset + barSpacing * 2,
          barWidth,
          barHeight,
          2
        );
        g.endFill();

        g.beginFill(KOREAN_COLORS.WIND_GREEN, 0.8);
        g.drawRoundedRect(
          -barWidth * 0.5,
          yOffset + barSpacing * 2,
          barWidth * staminaRatio,
          barHeight,
          2
        );
        g.endFill();
      }
    },
    [player, scale]
  );

  // Stance indicator with Korean trigram symbol
  const getTrigramSymbol = (stance: TrigramStance): string => {
    const symbols = {
      geon: "☰",
      tae: "☱",
      li: "☲",
      jin: "☳",
      son: "☴",
      gam: "☵",
      gan: "☶",
      gon: "☷",
    };
    return symbols[stance] || "☰";
  };

  return (
    <pixiContainer>
      {/* Use currentPlayer for rendering */}
      <pixiContainer
        x={playerPosition.x}
        y={playerPosition.y}
        scale={{ x: player.facing === "left" ? -1 : 1, y: 1 }}
        alpha={isActive ? 1.0 : 0.6}
      >
        {/* Main Korean martial artist body */}
        <pixiGraphics draw={drawKoreanMartialArtist} />

        {/* Status effects overlay */}
        <pixiGraphics draw={drawStatusEffects} />

        {/* Health/Ki/Stamina bars */}
        <pixiGraphics draw={drawStatusBars} />

        {/* Korean martial arts stance indicator */}
        <pixiText
          text={getTrigramSymbol(player.stance)}
          x={0}
          y={-90 * scale}
          anchor={0.5}
          style={{
            fontFamily: "Noto Sans KR, Arial",
            fontSize: 16 * scale,
            fill: stanceColor,
            fontWeight: "bold",
            dropShadow: {
              color: KOREAN_COLORS.BLACK,
              distance: 1,
              alpha: 0.8,
              angle: Math.PI / 4,
              blur: 1,
            },
          }}
        />

        {/* Player name with Korean styling */}
        <pixiText
          text={player.name}
          x={0}
          y={40 * scale}
          anchor={0.5}
          style={{
            fontFamily: "Noto Sans KR, Arial",
            fontSize: 10 * scale,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "normal",
          }}
        />

        {/* Debug information for Korean martial arts development */}
        {showDebugInfo && (
          <pixiContainer>
            <pixiText
              text={`자세: ${stanceData.name.korean} (${player.stance})`}
              x={0}
              y={50 * scale}
              anchor={0.5}
              style={{
                fontFamily: "Noto Sans KR, Arial",
                fontSize: 8 * scale,
                fill: KOREAN_COLORS.CYAN,
              }}
            />
            <pixiText
              text={`기: ${player.ki}/${player.maxKi} | 체: ${player.health}/${player.maxHealth}`}
              x={0}
              y={60 * scale}
              anchor={0.5}
              style={{
                fontFamily: "Noto Sans KR, Arial",
                fontSize: 8 * scale,
                fill: KOREAN_COLORS.CYAN,
              }}
            />
          </pixiContainer>
        )}
      </pixiContainer>
    </pixiContainer>
  );
}

// Helper functions for Korean martial arts stance visualization

function getStancePosture(stance: TrigramStance, animationFrame: number) {
  const basePosture = {
    bodyLean: 0,
    armPosition: 0,
    legSpread: 0,
    headTilt: 0,
  };

  const breathingMotion = Math.sin(animationFrame * Math.PI * 2) * 2;

  switch (stance) {
    case "geon": // Heaven - Strong, upright
      return {
        ...basePosture,
        bodyLean: breathingMotion * 0.5,
        armPosition: 1.2,
        legSpread: 1.0,
        headTilt: 0,
      };

    case "tae": // Lake - Flowing, gentle
      return {
        ...basePosture,
        bodyLean: Math.sin(animationFrame * Math.PI * 4) * 3,
        armPosition: 0.8,
        legSpread: 0.8,
        headTilt: breathingMotion * 0.3,
      };

    case "li": // Fire - Sharp, focused
      return {
        ...basePosture,
        bodyLean: breathingMotion * 0.3,
        armPosition: 1.5,
        legSpread: 1.2,
        headTilt: 0.5,
      };

    case "gam": // Water - Fluid, adaptive
      return {
        ...basePosture,
        bodyLean: Math.sin(animationFrame * Math.PI * 3) * 4,
        armPosition: 0.6,
        legSpread: 0.9,
        headTilt: breathingMotion * 0.4,
      };

    case "gan": // Mountain - Stable, defensive
      return {
        ...basePosture,
        bodyLean: 0,
        armPosition: 0.4,
        legSpread: 1.4,
        headTilt: 0,
      };

    default:
      return {
        ...basePosture,
        bodyLean: breathingMotion,
        armPosition: 1.0,
        legSpread: 1.0,
      };
  }
}

function drawStanceArms(
  g: any,
  stance: TrigramStance,
  posture: any,
  scale: number,
  color: number,
  alpha: number
) {
  const armWidth = 4 * scale;

  g.lineStyle(armWidth, color, alpha);

  switch (stance) {
    case "geon": // Heaven - Strong guard position
      g.moveTo(-12 * scale, -20 * scale);
      g.lineTo(-18 * scale * posture.armPosition, -5 * scale);
      g.moveTo(12 * scale, -20 * scale);
      g.lineTo(18 * scale * posture.armPosition, -5 * scale);
      break;

    case "li": // Fire - Forward strike position
      g.moveTo(-8 * scale, -15 * scale);
      g.lineTo(-20 * scale, 0);
      g.moveTo(8 * scale, -15 * scale);
      g.lineTo(25 * scale * posture.armPosition, -10 * scale);
      break;

    case "gam": // Water - Flowing defensive position
      g.moveTo(-10 * scale, -18 * scale);
      g.bezierCurveTo(
        -20 * scale,
        -10 * scale,
        -15 * scale,
        5 * scale,
        -8 * scale,
        10 * scale
      );
      g.moveTo(10 * scale, -18 * scale);
      g.bezierCurveTo(
        20 * scale,
        -10 * scale,
        15 * scale,
        5 * scale,
        8 * scale,
        10 * scale
      );
      break;

    case "gan": // Mountain - Defensive block position
      g.moveTo(-15 * scale, -25 * scale);
      g.lineTo(-10 * scale, -35 * scale);
      g.moveTo(15 * scale, -25 * scale);
      g.lineTo(10 * scale, -35 * scale);
      break;

    default: // Standard position
      g.moveTo(-10 * scale, -20 * scale);
      g.lineTo(-15 * scale * posture.armPosition, 0);
      g.moveTo(10 * scale, -20 * scale);
      g.lineTo(15 * scale * posture.armPosition, 0);
      break;
  }
}

function drawStanceLegs(
  g: any,
  stance: TrigramStance,
  posture: any,
  scale: number,
  color: number,
  alpha: number
) {
  const legWidth = 6 * scale;

  g.lineStyle(legWidth, color, alpha);

  const legSpread = 12 * scale * posture.legSpread;

  switch (stance) {
    case "geon": // Heaven - Wide, stable stance
      g.moveTo(-8 * scale, 20 * scale);
      g.lineTo(-legSpread, 45 * scale);
      g.moveTo(8 * scale, 20 * scale);
      g.lineTo(legSpread, 45 * scale);
      break;

    case "li": // Fire - Forward stepping stance
      g.moveTo(-5 * scale, 20 * scale);
      g.lineTo(-legSpread * 0.7, 45 * scale);
      g.moveTo(5 * scale, 20 * scale);
      g.lineTo(legSpread * 1.3, 40 * scale);
      break;

    case "gan": // Mountain - Very wide, low stance
      g.moveTo(-8 * scale, 20 * scale);
      g.lineTo(-legSpread * 1.5, 50 * scale);
      g.moveTo(8 * scale, 20 * scale);
      g.lineTo(legSpread * 1.5, 50 * scale);
      break;

    default:
      g.moveTo(-6 * scale, 20 * scale);
      g.lineTo(-legSpread, 45 * scale);
      g.moveTo(6 * scale, 20 * scale);
      g.lineTo(legSpread, 45 * scale);
      break;
  }
}

function drawKiAura(
  g: any,
  kiRatio: number,
  stanceColor: number,
  scale: number
) {
  const auraRadius = 35 * scale * kiRatio;
  const auraAlpha = 0.1 + kiRatio * 0.2;

  g.beginFill(stanceColor, auraAlpha);
  g.drawCircle(0, 0, auraRadius);
  g.endFill();

  // Inner energy core
  g.beginFill(KOREAN_COLORS.WHITE, auraAlpha * 0.5);
  g.drawCircle(0, 0, auraRadius * 0.3);
  g.endFill();
}

function drawTransitionEffects(
  g: any,
  progress: number,
  color: number,
  scale: number
) {
  const effectRadius = 40 * scale;
  const alpha = (1 - progress) * 0.4;

  g.lineStyle(3 * scale, color, alpha);
  g.drawCircle(0, 0, effectRadius * progress);

  // Spiraling energy effect
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + progress * Math.PI * 4;
    const x = Math.cos(angle) * effectRadius * progress * 0.7;
    const y = Math.sin(angle) * effectRadius * progress * 0.7;

    g.beginFill(color, alpha * 0.8);
    g.drawCircle(x, y, 2 * scale);
    g.endFill();
  }
}

function drawCombatReadinessIndicator(
  g: any,
  readiness: number,
  scale: number
) {
  if (readiness >= 80) {
    // Ready state - Green pulse
    const pulse = Math.sin(Date.now() * 0.01) * 0.3 + 0.7;
    g.beginFill(KOREAN_COLORS.GREEN, 0.3 * pulse);
    g.drawCircle(0, -70 * scale, 3 * scale);
    g.endFill();
  } else if (readiness >= 50) {
    // Cautious state - Yellow
    g.beginFill(KOREAN_COLORS.YELLOW, 0.4);
    g.drawCircle(0, -70 * scale, 2 * scale);
    g.endFill();
  } else {
    // Vulnerable state - Red warning
    const flash = Math.sin(Date.now() * 0.02) > 0 ? 0.6 : 0.2;
    g.beginFill(KOREAN_COLORS.RED, flash);
    g.drawCircle(0, -70 * scale, 4 * scale);
    g.endFill();
  }
}

// Helper functions for status effects
function getEffectIntensityValue(intensity: string): number {
  switch (intensity) {
    case "weak":
    case "light":
      return 0.3;
    case "moderate":
    case "medium":
      return 0.6;
    case "strong":
    case "heavy":
      return 0.8;
    case "severe":
    case "extreme":
      return 1.0;
    default:
      return 0.5;
  }
}

function getEffectColor(effectType: string): number {
  switch (effectType) {
    case "stun":
    case "stunned":
      return KOREAN_COLORS.YELLOW;
    case "poison":
    case "bleeding":
      return KOREAN_COLORS.GREEN;
    case "burning":
    case "pain":
      return KOREAN_COLORS.RED;
    case "weakness":
    case "fatigue":
      return KOREAN_COLORS.PURPLE;
    case "buff":
    case "enhancement":
      return KOREAN_COLORS.BLUE;
    case "confusion":
    case "disoriented":
      return KOREAN_COLORS.ORANGE;
    default:
      return KOREAN_COLORS.WHITE;
  }
}

function getEffectOpacity(intensity: string): number {
  switch (intensity) {
    case "weak":
    case "light":
      return 0.2;
    case "moderate":
    case "medium":
      return 0.4;
    case "strong":
    case "heavy":
      return 0.6;
    case "severe":
    case "extreme":
      return 0.8;
    default:
      return 0.3;
  }
}

// Keep only the default export
export default PlayerVisuals;
