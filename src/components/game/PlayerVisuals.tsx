import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { PlayerState, TrigramStance } from "./Player";

// Dark Trigram theme constants
const DARK_TRIGRAM_THEME = {
  PRIMARY_CYAN: 0x00ffd0,
  DARK_BG: 0x0a0e12,
  DARKER_BG: 0x181c20,
  MEDIUM_BG: 0x23272b,
  VITAL_ORANGE: 0xff4400,
  CRITICAL_RED: 0xff3030,
  WHITE: 0xffffff,
  HEALTH_CYAN: 0x00ffd0,
  WARNING_ORANGE: 0xff9800,
  STANCE_ICONS: {
    geon: "🔥", // Heaven
    tae: "🌊", // Lake
    li: "⚡", // Fire
    jin: "💥", // Thunder
    son: "🌪️", // Wind
    gam: "🛡️", // Water
    gan: "🗿", // Mountain
    gon: "🤜", // Earth
  } as Record<TrigramStance, string>,
} as const;

// Trigram technique interface
interface TrigramTechnique {
  readonly name: string;
  readonly damage: number;
  readonly stamina: number;
  readonly speed: number;
  readonly range: number;
  readonly vitalPoints: readonly string[];
}

// Export the helper function for testing
export function getTrigramSymbol(stance: TrigramStance): string {
  const symbols: Record<TrigramStance, string> = {
    geon: "☰", // Heaven
    tae: "☱", // Lake
    li: "☲", // Fire
    jin: "☳", // Thunder
    son: "☴", // Wind
    gam: "☵", // Water
    gan: "☶", // Mountain
    gon: "☷", // Earth
  };
  return symbols[stance];
}

// Export stance color function for testing
export function getStanceColor(stance: TrigramStance): number {
  const stanceColors: Record<TrigramStance, number> = {
    geon: 0xffd700, // Gold - Heaven
    tae: 0x87ceeb, // Sky Blue - Lake
    li: 0xff4500, // Red Orange - Fire
    jin: 0x9370db, // Purple - Thunder
    son: 0x98fb98, // Pale Green - Wind
    gam: 0x4169e1, // Royal Blue - Water
    gan: 0x8b4513, // Saddle Brown - Mountain
    gon: 0x654321, // Dark Brown - Earth
  };
  return stanceColors[stance];
}

// Helper function to get trigram symbols
function getTrigramSymbolInternal(stance: TrigramStance): string {
  return getTrigramSymbol(stance);
}

// Main PlayerVisuals component
interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly currentTechnique: TrigramTechnique;
  readonly isPlayerOne: boolean;
  readonly animationTime: number;
  readonly showImpactEffect?: boolean;
}

export function PlayerVisuals({
  playerState,
  currentTechnique,
  isPlayerOne,
  animationTime,
  showImpactEffect = false,
}: PlayerVisualsProps): JSX.Element {
  return (
    <pixiContainer>
      <PlayerBody
        playerState={playerState}
        isPlayerOne={isPlayerOne}
        animationTime={animationTime}
      />

      <StanceIndicator stance={playerState.stance} />

      <HealthStaminaBars playerState={playerState} />

      {playerState.isAttacking && (
        <AttackEffect
          playerState={playerState}
          technique={currentTechnique}
          animationTime={animationTime}
        />
      )}

      {playerState.isAttacking && showImpactEffect && (
        <AttackImpactEffect
          technique={currentTechnique}
          playerState={playerState}
          animationTime={animationTime}
          isVital={currentTechnique.damage > 30}
        />
      )}

      {playerState.isMoving && (
        <MovementTrail
          isPlayerOne={isPlayerOne}
          animationTime={animationTime}
          facing={playerState.facing}
        />
      )}
    </pixiContainer>
  );
}

function PlayerBody({
  playerState,
  isPlayerOne,
  animationTime,
}: {
  readonly playerState: PlayerState;
  readonly isPlayerOne: boolean;
  readonly animationTime: number;
}): JSX.Element {
  const auraPulse = Math.sin(animationTime * 0.1) * 0.3 + 0.7;

  // Use isPlayerOne for player-specific styling
  const playerColor = isPlayerOne
    ? DARK_TRIGRAM_THEME.PRIMARY_CYAN
    : DARK_TRIGRAM_THEME.VITAL_ORANGE;

  return (
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();

        // Dark silhouette body with player-specific accent
        g.setFillStyle({ color: DARK_TRIGRAM_THEME.DARKER_BG, alpha: 0.95 });
        g.rect(-25, -90, 50, 90);
        g.fill();

        // Player-specific glowing outline
        g.setStrokeStyle({ color: playerColor, width: 4, alpha: auraPulse });
        g.rect(-25, -90, 50, 90);
        g.stroke();

        // Enhanced head with player-specific glow
        g.setFillStyle({ color: DARK_TRIGRAM_THEME.MEDIUM_BG });
        g.circle(0, -75, 15);
        g.fill();

        g.setStrokeStyle({
          color: playerColor,
          width: 3,
          alpha: auraPulse * 0.8,
        });
        g.circle(0, -75, 15);
        g.stroke();

        // Arm positioning with player-specific glow
        g.setStrokeStyle({ color: playerColor, width: 6, alpha: 0.8 });
        if (playerState.facing === "right") {
          // Right-facing stance
          g.moveTo(25, -60);
          g.lineTo(45, -40);
          g.moveTo(-25, -60);
          g.lineTo(-15, -50);
        } else {
          // Left-facing stance
          g.moveTo(-25, -60);
          g.lineTo(-45, -40);
          g.moveTo(25, -60);
          g.lineTo(15, -50);
        }
        g.stroke();

        // Pulsing aura when attacking or high stamina
        if (playerState.isAttacking || playerState.stamina > 95) {
          const attackAlpha = playerState.isAttacking ? 0.8 : 0.4;
          g.setStrokeStyle({
            color: playerColor,
            width: 8,
            alpha: attackAlpha * auraPulse,
          });
          g.circle(0, -45, 55 + Math.sin(animationTime * 0.3) * 10);
          g.stroke();
        }

        // Enhanced blocking effect with player distinction
        if (playerState.isBlocking) {
          g.setStrokeStyle({
            color: 0xffffff,
            width: 4,
            alpha: 0.9,
          });
          g.circle(0, -45, 35);
          g.stroke();

          g.setFillStyle({ color: 0xffffff, alpha: 0.3 });
          g.circle(0, -45, 30);
          g.fill();
        }
      }}
    />
  );
}

// Update StanceIndicator to use the internal function
function StanceIndicator({
  stance,
}: {
  readonly stance: TrigramStance;
}): JSX.Element {
  const pulse = Math.sin(Date.now() * 0.002) * 0.2 + 0.8;

  return (
    <pixiContainer y={-120}>
      {/* Stance symbol background */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({
            color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
            alpha: pulse * 0.3,
          });
          g.circle(0, 0, 25);
          g.fill();

          g.setStrokeStyle({
            color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
            width: 2,
            alpha: pulse,
          });
          g.circle(0, 0, 25);
          g.stroke();
        }}
      />

      {/* Trigram symbol */}
      <pixiText
        text={getTrigramSymbolInternal(stance)}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: DARK_TRIGRAM_THEME.WHITE,
          fontWeight: "bold",
        }}
      />

      {/* Stance icon */}
      <pixiText
        text={DARK_TRIGRAM_THEME.STANCE_ICONS[stance]}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-35}
        style={{
          fontSize: 20,
        }}
      />
    </pixiContainer>
  );
}

function HealthStaminaBars({
  playerState,
}: {
  readonly playerState: PlayerState;
}): JSX.Element {
  const healthColor =
    playerState.health > 50
      ? DARK_TRIGRAM_THEME.PRIMARY_CYAN
      : playerState.health > 25
      ? DARK_TRIGRAM_THEME.WARNING_ORANGE
      : DARK_TRIGRAM_THEME.CRITICAL_RED;

  return (
    <pixiContainer y={60}>
      {/* Health bar */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Background
          g.setFillStyle({ color: DARK_TRIGRAM_THEME.DARKER_BG, alpha: 0.8 });
          g.rect(-30, 0, 60, 8);
          g.fill();

          // Health fill
          g.setFillStyle({ color: healthColor });
          g.rect(-30, 0, (playerState.health / 100) * 60, 8);
          g.fill();

          // Border
          g.setStrokeStyle({
            color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
            width: 1,
          });
          g.rect(-30, 0, 60, 8);
          g.stroke();
        }}
      />

      {/* Stamina bar */}
      <pixiGraphics
        y={12}
        draw={(g: PixiGraphics) => {
          g.clear();

          // Background
          g.setFillStyle({ color: DARK_TRIGRAM_THEME.DARKER_BG, alpha: 0.8 });
          g.rect(-30, 0, 60, 6);
          g.fill();

          // Stamina fill
          g.setFillStyle({
            color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
            alpha: 0.8,
          });
          g.rect(-30, 0, (playerState.stamina / 100) * 60, 6);
          g.fill();

          // Border
          g.setStrokeStyle({
            color: DARK_TRIGRAM_THEME.PRIMARY_CYAN,
            width: 1,
            alpha: 0.6,
          });
          g.rect(-30, 0, 60, 6);
          g.stroke();
        }}
      />
    </pixiContainer>
  );
}

function AttackEffect({
  playerState,
  technique,
  animationTime,
}: {
  readonly playerState: PlayerState;
  readonly technique: TrigramTechnique;
  readonly animationTime: number;
}): JSX.Element {
  const isVital = technique.damage > 30;
  const burstColor = isVital
    ? DARK_TRIGRAM_THEME.VITAL_ORANGE
    : DARK_TRIGRAM_THEME.PRIMARY_CYAN;
  const burstAlpha = Math.sin(animationTime * 0.3) * 0.4 + 0.6;

  return (
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();

        const attackX = playerState.facing === "right" ? 35 : -35;

        // Main attack burst
        g.setFillStyle({ color: burstColor, alpha: burstAlpha * 0.6 });
        g.circle(attackX, -45, 20 + Math.sin(animationTime * 0.4) * 8);
        g.fill();

        // Attack ring
        g.setStrokeStyle({ color: burstColor, width: 3, alpha: burstAlpha });
        g.circle(attackX, -45, 25 + Math.sin(animationTime * 0.5) * 5);
        g.stroke();

        // Technique-specific effect
        if (isVital) {
          // Vital point targeting crosshair
          g.setStrokeStyle({
            color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
            width: 2,
            alpha: burstAlpha,
          });
          g.moveTo(attackX - 15, -45);
          g.lineTo(attackX + 15, -45);
          g.moveTo(attackX, -60);
          g.lineTo(attackX, -30);
          g.stroke();
        }
      }}
    />
  );
}

// Export AttackImpactEffect for use in other components
export function AttackImpactEffect({
  technique,
  playerState,
  animationTime,
  isVital = false,
}: {
  readonly technique: TrigramTechnique;
  readonly playerState: PlayerState;
  readonly animationTime: number;
  readonly isVital?: boolean;
}): JSX.Element {
  const impactX =
    playerState.facing === "right"
      ? 35 + technique.range
      : -35 - technique.range;
  const impactColor = isVital
    ? DARK_TRIGRAM_THEME.VITAL_ORANGE
    : DARK_TRIGRAM_THEME.PRIMARY_CYAN;
  const impactAlpha = Math.sin(animationTime * 0.4) * 0.5 + 0.5;

  return (
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();

        // Impact burst
        g.setFillStyle({ color: impactColor, alpha: impactAlpha * 0.8 });
        g.circle(impactX, -45, 15 + Math.sin(animationTime * 0.6) * 5);
        g.fill();

        // Impact shockwave
        g.setStrokeStyle({ color: impactColor, width: 2, alpha: impactAlpha });
        g.circle(impactX, -45, 20 + Math.sin(animationTime * 0.4) * 10);
        g.stroke();

        if (isVital) {
          // Vital hit indicator
          g.setStrokeStyle({
            color: DARK_TRIGRAM_THEME.VITAL_ORANGE,
            width: 3,
            alpha: impactAlpha,
          });
          g.moveTo(impactX - 20, -45);
          g.lineTo(impactX + 20, -45);
          g.moveTo(impactX, -65);
          g.lineTo(impactX, -25);
          g.stroke();
        }
      }}
    />
  );
}

function MovementTrail({
  isPlayerOne,
  animationTime,
  facing,
}: {
  readonly isPlayerOne: boolean;
  readonly animationTime: number;
  readonly facing: "left" | "right";
}): JSX.Element {
  // Use isPlayerOne for different trail colors
  const trailColor = isPlayerOne
    ? DARK_TRIGRAM_THEME.PRIMARY_CYAN
    : DARK_TRIGRAM_THEME.VITAL_ORANGE;

  return (
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();

        const trailX = facing === "right" ? -20 : 20;
        const trailAlpha = Math.sin(animationTime * 0.2) * 0.3 + 0.4;

        // Movement trail effect
        for (let i = 0; i < 5; i++) {
          const offsetX = trailX + i * (facing === "right" ? -8 : 8);
          const alpha = trailAlpha * (1 - i * 0.2);

          g.setFillStyle({ color: trailColor, alpha });
          g.circle(offsetX, -45, 8 - i * 1.5);
          g.fill();
        }
      }}
    />
  );
}
