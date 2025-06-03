// Complete player component for Korean martial arts fighter

import React, { useCallback, useEffect, useMemo } from "react";
import { Container, Graphics, Text, Sprite } from "@pixi/react";
import type { PlayerProps } from "../../types";
import {
  KOREAN_COLORS,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
  STANCE_EFFECTIVENESS_MATRIX,
} from "../../types";
import { useAudio } from "../../audio/AudioManager";
import type { Graphics as PixiGraphics } from "pixi.js";

// Trigram symbols for authentic Korean martial arts display
const TRIGRAM_SYMBOLS = {
  geon: "☰", // 건 - Heaven
  tae: "☱", // 태 - Lake
  li: "☲", // 리 - Fire
  jin: "☳", // 진 - Thunder
  son: "☴", // 손 - Wind
  gam: "☵", // 감 - Water
  gan: "☶", // 간 - Mountain
  gon: "☷", // 곤 - Earth
} as const;

// Korean martial arts player visual configuration
const PLAYER_CONFIG = {
  WIDTH: 60,
  HEIGHT: 80,
  HEALTH_BAR_WIDTH: 80,
  HEALTH_BAR_HEIGHT: 8,
  KI_BAR_WIDTH: 60,
  KI_BAR_HEIGHT: 6,
  STAMINA_BAR_WIDTH: 70,
  STAMINA_BAR_HEIGHT: 4,
  STANCE_INDICATOR_SIZE: 32,
  NAME_OFFSET_Y: -25,
  TRIGRAM_OFFSET_Y: -45,
  HEALTH_OFFSET_Y: -15,
  KI_OFFSET_Y: -8,
  STAMINA_OFFSET_Y: -2,
} as const;

// Archetype visual themes for Korean martial arts
const ARCHETYPE_THEMES = {
  musa: {
    primary: KOREAN_COLORS.TRADITIONAL_BLUE,
    secondary: KOREAN_COLORS.GOLD,
    accent: KOREAN_COLORS.WHITE,
  },
  amsalja: {
    primary: KOREAN_COLORS.BLACK,
    secondary: KOREAN_COLORS.NEON_PINK,
    accent: KOREAN_COLORS.SILVER,
  },
  hacker: {
    primary: KOREAN_COLORS.NEON_CYAN,
    secondary: KOREAN_COLORS.NEON_GREEN,
    accent: KOREAN_COLORS.WHITE,
  },
  jeongbo: {
    primary: KOREAN_COLORS.GRAY_DARK,
    secondary: KOREAN_COLORS.NEON_BLUE,
    accent: KOREAN_COLORS.GRAY_LIGHT,
  },
  jojik: {
    primary: KOREAN_COLORS.TRADITIONAL_RED,
    secondary: KOREAN_COLORS.BLACK,
    accent: KOREAN_COLORS.GOLD,
  },
} as const;

export function Player({
  playerState,
  playerIndex,
  onStateUpdate,
  onAttack,
  isPlayer1 = playerIndex === 0,
  archetype,
  stance,
  position,
  facing,
  isAttacking = false,
  health,
  maxHealth,
  ki,
  maxKi,
  stamina,
  maxStamina,
  ...baseProps
}: PlayerProps): React.ReactElement {
  const audio = useAudio();

  // Get current trigram data for authentic Korean martial arts display
  const currentTrigramData = useMemo(() => TRIGRAM_DATA[stance], [stance]);

  // Get archetype theme colors
  const theme = useMemo(() => ARCHETYPE_THEMES[archetype], [archetype]);

  // Get stance color from Korean color system
  const stanceColor = useMemo(() => {
    const stanceColorMap = {
      geon: KOREAN_COLORS.HEAVEN_GOLD,
      tae: KOREAN_COLORS.LAKE_SILVER,
      li: KOREAN_COLORS.FIRE_RED,
      jin: KOREAN_COLORS.THUNDER_YELLOW,
      son: KOREAN_COLORS.WIND_GREEN,
      gam: KOREAN_COLORS.WATER_BLUE,
      gan: KOREAN_COLORS.MOUNTAIN_BROWN,
      gon: KOREAN_COLORS.EARTH_ORANGE,
    };
    return stanceColorMap[stance];
  }, [stance]);

  // Calculate combat readiness visual indicators
  const combatReadiness = useMemo(() => {
    const healthRatio = health / maxHealth;
    const kiRatio = ki / maxKi;
    const staminaRatio = stamina / maxStamina;

    return {
      overall: (healthRatio + kiRatio + staminaRatio) / 3,
      healthCritical: healthRatio < 0.25,
      kiDepleted: kiRatio < 0.15,
      staminaLow: staminaRatio < 0.2,
    };
  }, [health, maxHealth, ki, maxKi, stamina, maxStamina]);

  // Draw player body with Korean martial arts styling
  const drawPlayerBody = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Main body - Korean martial artist silhouette
      g.setFillStyle({ color: theme.primary, alpha: 0.8 });
      g.setStrokeStyle({ color: stanceColor, width: 2 });

      // Body (torso)
      g.roundRect(
        -PLAYER_CONFIG.WIDTH / 2,
        -PLAYER_CONFIG.HEIGHT / 2,
        PLAYER_CONFIG.WIDTH,
        PLAYER_CONFIG.HEIGHT * 0.6,
        8
      );
      g.fill();
      g.stroke();

      // Head
      g.setFillStyle({ color: theme.secondary, alpha: 0.9 });
      g.circle(0, -PLAYER_CONFIG.HEIGHT * 0.4, 15);
      g.fill();
      g.stroke();

      // Arms in combat position based on trigram stance
      const armPosition = getArmPositionForStance(stance);
      drawArms(g, armPosition, theme.primary, stanceColor);

      // Legs in proper Korean martial arts stance
      const legPosition = getLegPositionForStance(stance);
      drawLegs(g, legPosition, theme.primary, stanceColor);

      // Combat readiness glow effect
      if (isAttacking) {
        g.setFillStyle({ color: KOREAN_COLORS.CRITICAL_HIT, alpha: 0.3 });
        g.circle(0, 0, PLAYER_CONFIG.WIDTH);
        g.fill();
      }

      // Stance energy aura
      if (ki > maxKi * 0.75) {
        g.setStrokeStyle({ color: stanceColor, width: 1, alpha: 0.5 });
        g.circle(0, 0, PLAYER_CONFIG.WIDTH + 10);
        g.stroke();
      }
    },
    [theme, stanceColor, stance, isAttacking, ki, maxKi]
  );

  // Draw health bar with Korean styling
  const drawHealthBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      const healthRatio = health / maxHealth;
      const barColor = combatReadiness.healthCritical
        ? KOREAN_COLORS.CRITICAL_RED
        : KOREAN_COLORS.HEALTH_RED;

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.7 });
      g.roundRect(
        -PLAYER_CONFIG.HEALTH_BAR_WIDTH / 2,
        0,
        PLAYER_CONFIG.HEALTH_BAR_WIDTH,
        PLAYER_CONFIG.HEALTH_BAR_HEIGHT,
        2
      );
      g.fill();

      // Health fill
      g.setFillStyle({ color: barColor });
      g.roundRect(
        -PLAYER_CONFIG.HEALTH_BAR_WIDTH / 2,
        0,
        PLAYER_CONFIG.HEALTH_BAR_WIDTH * healthRatio,
        PLAYER_CONFIG.HEALTH_BAR_HEIGHT,
        2
      );
      g.fill();

      // Border
      g.setStrokeStyle({ color: KOREAN_COLORS.WHITE, width: 1 });
      g.roundRect(
        -PLAYER_CONFIG.HEALTH_BAR_WIDTH / 2,
        0,
        PLAYER_CONFIG.HEALTH_BAR_WIDTH,
        PLAYER_CONFIG.HEALTH_BAR_HEIGHT,
        2
      );
      g.stroke();
    },
    [health, maxHealth, combatReadiness.healthCritical]
  );

  // Draw ki energy bar with Korean martial arts styling
  const drawKiBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      const kiRatio = ki / maxKi;

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.7 });
      g.roundRect(
        -PLAYER_CONFIG.KI_BAR_WIDTH / 2,
        0,
        PLAYER_CONFIG.KI_BAR_WIDTH,
        PLAYER_CONFIG.KI_BAR_HEIGHT,
        2
      );
      g.fill();

      // Ki fill with stance color
      g.setFillStyle({ color: stanceColor, alpha: 0.8 });
      g.roundRect(
        -PLAYER_CONFIG.KI_BAR_WIDTH / 2,
        0,
        PLAYER_CONFIG.KI_BAR_WIDTH * kiRatio,
        PLAYER_CONFIG.KI_BAR_HEIGHT,
        2
      );
      g.fill();

      // Energy pulse effect for high ki
      if (kiRatio > 0.8) {
        g.setStrokeStyle({ color: stanceColor, width: 1, alpha: 0.6 });
        g.roundRect(
          -PLAYER_CONFIG.KI_BAR_WIDTH / 2 - 2,
          -1,
          PLAYER_CONFIG.KI_BAR_WIDTH + 4,
          PLAYER_CONFIG.KI_BAR_HEIGHT + 2,
          3
        );
        g.stroke();
      }
    },
    [ki, maxKi, stanceColor]
  );

  // Draw stamina bar
  const drawStaminaBar = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      const staminaRatio = stamina / maxStamina;
      const barColor = combatReadiness.staminaLow
        ? KOREAN_COLORS.CRITICAL_RED
        : KOREAN_COLORS.STAMINA_GREEN;

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.BLACK, alpha: 0.5 });
      g.roundRect(
        -PLAYER_CONFIG.STAMINA_BAR_WIDTH / 2,
        0,
        PLAYER_CONFIG.STAMINA_BAR_WIDTH,
        PLAYER_CONFIG.STAMINA_BAR_HEIGHT,
        1
      );
      g.fill();

      // Stamina fill
      g.setFillStyle({ color: barColor });
      g.roundRect(
        -PLAYER_CONFIG.STAMINA_BAR_WIDTH / 2,
        0,
        PLAYER_CONFIG.STAMINA_BAR_WIDTH * staminaRatio,
        PLAYER_CONFIG.STAMINA_BAR_HEIGHT,
        1
      );
      g.fill();
    },
    [stamina, maxStamina, combatReadiness.staminaLow]
  );

  // Handle stance changes with audio feedback
  const handleStanceChange = useCallback(
    (newStance: typeof stance) => {
      if (newStance !== stance) {
        onStateUpdate({
          stance: newStance,
          lastStanceChangeTime: Date.now(),
        });
        audio.playStanceChangeSound();
      }
    },
    [stance, onStateUpdate, audio]
  );

  // Handle combat actions
  const handleAttack = useCallback(() => {
    if (onAttack) {
      const technique = currentTrigramData.technique;
      audio.playAttackSound(technique.damage || 20);
      onAttack();
    }
  }, [onAttack, currentTrigramData, audio]);

  // Audio feedback for health changes
  useEffect(() => {
    if (combatReadiness.healthCritical) {
      audio.playSFX("health_low");
    }
  }, [combatReadiness.healthCritical, audio]);

  return (
    <Container
      x={position.x}
      y={position.y}
      scale={{ x: facing === "left" ? -1 : 1, y: 1 }}
      {...baseProps}
    >
      {/* Player body with Korean martial arts styling */}
      <Graphics draw={drawPlayerBody} />

      {/* Player name with Korean archetype */}
      <Text
        text={playerState.name}
        anchor={0.5}
        y={PLAYER_CONFIG.NAME_OFFSET_Y}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 12,
          fill: theme.accent,
          stroke: KOREAN_COLORS.BLACK,
          strokeThickness: 1,
          fontWeight: "bold",
        }}
      />

      {/* Trigram symbol and stance name */}
      <Container y={PLAYER_CONFIG.TRIGRAM_OFFSET_Y}>
        <Text
          text={TRIGRAM_SYMBOLS[stance]}
          anchor={0.5}
          style={{
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 24,
            fill: stanceColor,
            stroke: KOREAN_COLORS.BLACK,
            strokeThickness: 2,
            fontWeight: "bold",
          }}
        />
        <Text
          text={currentTrigramData.name.korean}
          anchor={0.5}
          y={15}
          style={{
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 10,
            fill: KOREAN_COLORS.WHITE,
            stroke: KOREAN_COLORS.BLACK,
            strokeThickness: 1,
          }}
        />
      </Container>

      {/* Health bar */}
      <Graphics draw={drawHealthBar} y={PLAYER_CONFIG.HEALTH_OFFSET_Y} />

      {/* Ki energy bar */}
      <Graphics draw={drawKiBar} y={PLAYER_CONFIG.KI_OFFSET_Y} />

      {/* Stamina bar */}
      <Graphics draw={drawStaminaBar} y={PLAYER_CONFIG.STAMINA_OFFSET_Y} />

      {/* Combat state indicators */}
      {isAttacking && (
        <Text
          text="공격!"
          anchor={0.5}
          y={PLAYER_CONFIG.TRIGRAM_OFFSET_Y - 20}
          style={{
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 14,
            fill: KOREAN_COLORS.CRITICAL_HIT,
            stroke: KOREAN_COLORS.BLACK,
            strokeThickness: 1,
            fontWeight: "bold",
          }}
        />
      )}

      {/* Archetype indicator */}
      <Text
        text={getArchetypeKorean(archetype)}
        anchor={0.5}
        y={PLAYER_CONFIG.HEIGHT / 2 + 10}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 8,
          fill: theme.secondary,
          stroke: KOREAN_COLORS.BLACK,
          strokeThickness: 1,
        }}
      />
    </Container>
  );
}

// Helper functions for authentic Korean martial arts stances

function getArmPositionForStance(
  stance: (typeof TRIGRAM_STANCES_ORDER)[number]
) {
  const positions = {
    geon: { left: { x: -20, y: -10 }, right: { x: 20, y: -15 } }, // Heaven - powerful
    tae: { left: { x: -15, y: -5 }, right: { x: 15, y: -10 } }, // Lake - flowing
    li: { left: { x: -25, y: -20 }, right: { x: 25, y: -20 } }, // Fire - extended
    jin: { left: { x: -18, y: -12 }, right: { x: 22, y: -8 } }, // Thunder - striking
    son: { left: { x: -12, y: -8 }, right: { x: 18, y: -12 } }, // Wind - circular
    gam: { left: { x: -16, y: -6 }, right: { x: 16, y: -6 } }, // Water - balanced
    gan: { left: { x: -22, y: -18 }, right: { x: 10, y: -5 } }, // Mountain - defensive
    gon: { left: { x: -14, y: -4 }, right: { x: 14, y: -4 } }, // Earth - grounded
  };
  return positions[stance];
}

function getLegPositionForStance(
  stance: (typeof TRIGRAM_STANCES_ORDER)[number]
) {
  const positions = {
    geon: { left: { x: -12, y: 25 }, right: { x: 12, y: 25 } }, // Heaven - wide
    tae: { left: { x: -8, y: 22 }, right: { x: 15, y: 28 } }, // Lake - fluid
    li: { left: { x: -10, y: 20 }, right: { x: 10, y: 30 } }, // Fire - forward
    jin: { left: { x: -15, y: 25 }, right: { x: 8, y: 22 } }, // Thunder - ready
    son: { left: { x: -6, y: 26 }, right: { x: 18, y: 24 } }, // Wind - light
    gam: { left: { x: -10, y: 25 }, right: { x: 10, y: 25 } }, // Water - centered
    gan: { left: { x: -8, y: 30 }, right: { x: 16, y: 20 } }, // Mountain - rooted
    gon: { left: { x: -12, y: 28 }, right: { x: 12, y: 28 } }, // Earth - stable
  };
  return positions[stance];
}

function drawArms(
  g: PixiGraphics,
  position: ReturnType<typeof getArmPositionForStance>,
  primaryColor: number,
  accentColor: number
) {
  g.setStrokeStyle({ color: primaryColor, width: 4 });

  // Left arm
  g.moveTo(-8, -5);
  g.lineTo(position.left.x, position.left.y);
  g.stroke();

  // Right arm
  g.moveTo(8, -5);
  g.lineTo(position.right.x, position.right.y);
  g.stroke();

  // Hand accents
  g.setFillStyle({ color: accentColor });
  g.circle(position.left.x, position.left.y, 3);
  g.fill();
  g.circle(position.right.x, position.right.y, 3);
  g.fill();
}

function drawLegs(
  g: PixiGraphics,
  position: ReturnType<typeof getLegPositionForStance>,
  primaryColor: number,
  accentColor: number
) {
  g.setStrokeStyle({ color: primaryColor, width: 6 });

  // Left leg
  g.moveTo(-6, 15);
  g.lineTo(position.left.x, position.left.y);
  g.stroke();

  // Right leg
  g.moveTo(6, 15);
  g.lineTo(position.right.x, position.right.y);
  g.stroke();

  // Foot accents
  g.setFillStyle({ color: accentColor });
  g.circle(position.left.x, position.left.y, 4);
  g.fill();
  g.circle(position.right.x, position.right.y, 4);
  g.fill();
}

function getArchetypeKorean(archetype: PlayerProps["archetype"]): string {
  const korean = {
    musa: "무사",
    amsalja: "암살자",
    hacker: "해커",
    jeongbo: "정보요원",
    jojik: "조직폭력배",
  };
  return korean[archetype];
}
