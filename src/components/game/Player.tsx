// Complete Player component with Korean martial arts character rendering

import React, { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { 
  PlayerState, 
  TrigramStance, 
  PlayerArchetype,
  Position 
} from "../../types";
import { PlayerVisuals } from "./PlayerVisuals";
import { KoreanTrigramDisplay } from "../ui/base/KoreanPixiComponents";
import { ProgressTracker } from "../ui/ProgressTracker";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY_PRIMARY } from "../../types/constants";
import { useAudio } from "../../audio/AudioManager";
import { g } from "vitest/dist/chunks/suite.d.FvehnV49.js";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly playerIndex: number;
  readonly onStateUpdate: (updates: Partial<PlayerState>) => void;
  readonly onAttack: () => void;
  readonly isPlayer1: boolean;
  readonly archetype: PlayerArchetype;
  readonly stance: TrigramStance;
  readonly position: Position;
  readonly facing: "left" | "right";
  readonly isAttacking?: boolean;
  readonly health: number;
  readonly maxHealth: number;
  readonly ki: number;
  readonly maxKi: number;
  readonly stamina: number;
  readonly maxStamina: number;
}

export function Player({
  playerState,
  playerIndex,
  onStateUpdate,
  onAttack,
  isPlayer1,
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
}: PlayerProps): React.ReactElement {
  const audio = useAudio();

  // Draw player silhouette based on archetype
  const drawPlayerBody = useCallback((g: PixiGraphics) => {
    g.clear();

    const bodyColor = isPlayer1 ? KOREAN_COLORS.CYAN : KOREAN_COLORS.TRADITIONAL_RED;
    const alpha = health / maxHealth;

    // Main body (simplified humanoid)
    g.setFillStyle({ color: bodyColor, alpha });
    
    // Head
    g.circle(0, -40, 12);
    g.fill();

    // Torso
    g.roundRect(-8, -25, 16, 30, 4);
    g.fill();

    // Arms
    const armX = facing === "right" ? 1 : -1;
    g.roundRect(-12 * armX, -20, 8, 25, 3);
    g.fill();
    g.roundRect(4 * armX, -20, 8, 25, 3);
    g.fill();

    // Legs
    g.roundRect(-6, 5, 5, 20, 2);
    g.fill();
    g.roundRect(1, 5, 5, 20, 2);
    g.fill();

    // Stance-specific visual effects
    drawStanceAura(g, stance, alpha);

    // Combat state indicators
    if (isAttacking) {
      g.setStrokeStyle({ color: KOREAN_COLORS.CRITICAL_HIT, width: 2, alpha: 0.8 });
      g.circle(0, -10, 25);
      g.stroke();
    }

    // Health indicator glow
    if (health < maxHealth * 0.3) {
      g.setStrokeStyle({ color: KOREAN_COLORS.RED, width: 1, alpha: 0.5 });
      g.circle(0, -10, 20);
      g.stroke();
    }
  }, [health, maxHealth, isPlayer1, facing, isAttacking, stance]);

  // Draw stance-specific aura
  const drawStanceAura = useCallback((g: PixiGraphics, currentStance: TrigramStance, alpha: number) => {
    const stanceColor = KOREAN_COLORS[currentStance] || KOREAN_COLORS.WHITE;
    
    g.setStrokeStyle({ color: stanceColor, width: 1, alpha: alpha * 0.6 });
    g.circle(0, -10, 30);
    g.stroke();

    // Pulse effect based on Ki level
    const kiRatio = ki / maxKi;
    if (kiRatio > 0.7) {
      g.setStrokeStyle({ color: stanceColor, width: 1, alpha: alpha * 0.3 });
      g.circle(0, -10, 35);
      g.stroke();
    }
  }, [ki, maxKi]);

  // Handle player interaction
  const handlePlayerClick = useCallback(() => {
    if (!isAttacking && stamina > 20) {
      audio.playSFX("technique_execute");
      onAttack();
    } else {
      audio.playSFX("action_blocked");
    }
  }, [isAttacking, stamina, audio, onAttack]);

  // Get archetype display name
  const getArchetypeKorean = (type: PlayerArchetype): string => {
    const korean = {
      musa: "무사",
      amsalja: "암살자",
      hacker: "해커",
      jeongbo: "정보요원",
      jojik: "조직폭력배",
    };
    return korean[type] || type;
  };

  return (
    <Container x={position.x} y={position.y}>
      {/* Player Body */}
      <Graphics 
        draw={drawPlayerBody}
        interactive={true}
        cursor="pointer"
        onpointerdown={handlePlayerClick}
      />

      {/* Player Visuals System */}
      <PlayerVisuals
        archetype={archetype}
        stance={stance}
        facing={facing}
        isAttacking={isAttacking}
        health={health}
        maxHealth={maxHealth}
      />

      {/* Player Name and Archetype */}
      <Text
        text={`${playerState.name} (${getArchetypeKorean(archetype)})`}
        anchor={0.5}
        x={0}
        y={-60}
        style={{
          fontFamily: KOREAN_FONT_FAMILY_PRIMARY,
          fontSize: 12,
          fill: isPlayer1 ? KOREAN_COLORS.CYAN : KOREAN_COLORS.TRADITIONAL_RED,
          fontWeight: "bold",
          stroke: KOREAN_COLORS.BLACK,
          strokeThickness: 1,
        }}
      />

      {/* Current Stance Display */}
      <KoreanTrigramDisplay
        stance={stance}
        x={facing === "right" ? 40 : -40}
        y={-30}
        size={20}
        showKorean={true}
      />

      {/* Health/Ki/Stamina Bars */}
      <ProgressTracker
        health={{ current: health, maximum: maxHealth }}
        ki={{ current: ki, maximum: maxKi }}
        stamina={{ current: stamina, maximum: maxStamina }}
        x={-50}
        y={40}
        width={100}
        spacing={15}
        showLabels={false}
      />

      {/* Combat Status Indicators */}
      {playerState.activeEffects && playerState.activeEffects.length > 0 && (
        <Container x={0} y={60}>
          {playerState.activeEffects.slice(0, 3).map((effect, index) => (
            <Text
              key={effect.id}
              text={effect.description.korean || effect.type}
              anchor={0.5}
              x={0}

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

  // Handle combat actions with fixed technique access
  const handlePlayerClick = useCallback(() => {
    if (onAttack) {
      // Fixed: Use basic damage value since technique structure may vary
      const baseDamage = 20;
      audio.playAttackSound(baseDamage);
      onAttack();
    }
  }, [onAttack, audio]);

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
      interactive={true}
      onpointerdown={handlePlayerClick}
      {...baseProps}
    >
      {/* Player body with Korean martial arts styling */}
      <Graphics draw={drawPlayerBody} />

      {/* Player name with Korean archetype - Fixed: removed strokeThickness */}
      <Text
        text={playerState.name}
        anchor={0.5}
        y={PLAYER_CONFIG.NAME_OFFSET_Y}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 12,
          fill: theme.accent,
          stroke: KOREAN_COLORS.BLACK,
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
          }}
        />
      </Container>

      {/* Health bar */}
      <Graphics draw={drawHealthBar} y={PLAYER_CONFIG.HEALTH_OFFSET_Y} />

      {/* Ki energy bar */}
      <Graphics draw={drawKiBar} y={PLAYER_CONFIG.KI_OFFSET_Y} />

      {/* Stamina bar */}
      <Graphics draw={drawStaminaBar} y={PLAYER_CONFIG.STAMINA_OFFSET_Y} />

      {/* Combat state indicators - Fixed: removed strokeThickness */}
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
            fontWeight: "bold",
          }}
        />
      )}

      {/* Archetype indicator - Fixed: removed strokeThickness */}
      <Text
        text={getArchetypeKorean(archetype)}
        anchor={0.5}
        y={PLAYER_CONFIG.HEIGHT / 2 + 10}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 8,
          fill: theme.secondary,
          stroke: KOREAN_COLORS.BLACK,
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
