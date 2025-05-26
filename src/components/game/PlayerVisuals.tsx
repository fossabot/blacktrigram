import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerState, TrigramStance } from "./Player";

// Enhanced visual theme with cooler effects
const VISUAL_THEME = {
  PLAYER_1_COLOR: 0x4a90e2,
  PLAYER_2_COLOR: 0x8b0000,
  TRADITIONAL_GOLD: 0xffd700,
  KOREAN_WHITE: 0xffffff,
  ENERGY_COLORS: {
    geon: 0xffd700, // Gold - Heaven (Lightning energy)
    tae: 0x87ceeb, // Sky Blue - Lake (Water energy)
    li: 0xff4500, // Red Orange - Fire (Flame energy)
    jin: 0x9370db, // Purple - Thunder (Electric energy)
    son: 0x98fb98, // Pale Green - Wind (Air energy)
    gam: 0x4169e1, // Royal Blue - Water (Liquid energy)
    gan: 0x8b4513, // Saddle Brown - Mountain (Earth energy)
    gon: 0x654321, // Dark Brown - Earth (Stone energy)
  },
} as const;

// Helper functions for stance color and symbol
export function getStanceColor(stance: TrigramStance): number {
  return VISUAL_THEME.ENERGY_COLORS[stance];
}

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

interface TrigramTechnique {
  readonly name: string;
  readonly damage: number;
  readonly stamina: number;
  readonly speed: number;
  readonly range: number;
  readonly vitalPoints: readonly string[];
}

interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly currentTechnique: TrigramTechnique;
  readonly isPlayerOne: boolean;
  readonly animationTime: number;
}

export function PlayerVisuals({
  playerState,
  currentTechnique,
  isPlayerOne,
  animationTime,
}: PlayerVisualsProps): JSX.Element {
  return (
    <>
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
      {playerState.isMoving && (
        <MovementTrail
          isPlayerOne={isPlayerOne}
          animationTime={animationTime}
          facing={playerState.facing}
        />
      )}
    </>
  );
}

function PlayerBody({
  playerState,
  isPlayerOne,
  animationTime,
}: {
  playerState: PlayerState;
  isPlayerOne: boolean;
  animationTime: number;
}): JSX.Element {
  return (
    <>
      {/* Enhanced fighter body with martial arts uniform */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          const bodyColor = isPlayerOne
            ? VISUAL_THEME.PLAYER_1_COLOR
            : VISUAL_THEME.PLAYER_2_COLOR;

          // Traditional Korean martial arts uniform (dobok) with better design
          g.setFillStyle({ color: 0xffffff, alpha: 0.9 }); // White dobok
          g.rect(-25, -90, 50, 90);
          g.fill();

          // Traditional belt with rank colors
          const beltColor = isPlayerOne ? 0x000080 : 0x8b0000; // Blue vs Red belt
          g.setFillStyle({ color: beltColor });
          g.rect(-27, -25, 54, 10);
          g.fill();

          // Arm positioning for martial arts stance
          g.setStrokeStyle({ color: bodyColor, width: 8 });
          if (playerState.facing === "right") {
            // Right guard position
            g.moveTo(-15, -60);
            g.lineTo(-35, -45);
            g.moveTo(15, -60);
            g.lineTo(40, -50);
          } else {
            // Left guard position
            g.moveTo(15, -60);
            g.lineTo(35, -45);
            g.moveTo(-15, -60);
            g.lineTo(-40, -50);
          }
          g.stroke();

          // Head with martial arts headband
          g.setFillStyle({ color: 0xffdbac }); // Skin tone
          g.circle(0, -75, 15);
          g.fill();

          // Traditional headband
          g.setFillStyle({ color: beltColor });
          g.rect(-18, -85, 36, 6);
          g.fill();

          // Enhanced stance aura with particle-like effects
          if (playerState.isAttacking) {
            const attackPulse = Math.sin(animationTime * 0.3) * 0.4 + 0.6;
            const stanceColor = VISUAL_THEME.ENERGY_COLORS[playerState.stance];

            // Energy aura around fighter
            g.setStrokeStyle({
              color: stanceColor,
              width: 8,
              alpha: attackPulse * 0.8,
            });
            g.circle(0, -45, 45 + Math.sin(animationTime * 0.5) * 5);
            g.stroke();

            // Inner energy core
            g.setFillStyle({
              color: stanceColor,
              alpha: attackPulse * 0.3,
            });
            g.circle(0, -45, 35);
            g.fill();

            // Energy sparks
            for (let i = 0; i < 8; i++) {
              const angle = (i / 8) * Math.PI * 2 + animationTime * 0.1;
              const sparkX =
                Math.cos(angle) * (50 + Math.sin(animationTime + i) * 10);
              const sparkY =
                -45 + Math.sin(angle) * (50 + Math.sin(animationTime + i) * 10);

              g.setFillStyle({
                color: VISUAL_THEME.KOREAN_WHITE,
                alpha: attackPulse * 0.8,
              });
              g.circle(sparkX, sparkY, 2 + Math.sin(animationTime * 2 + i) * 1);
              g.fill();
            }
          }

          // Enhanced blocking effect with traditional patterns
          if (playerState.isBlocking) {
            // Main blocking barrier
            g.setStrokeStyle({
              color: VISUAL_THEME.KOREAN_WHITE,
              width: 6,
              alpha: 0.9,
            });
            g.rect(-30, -95, 60, 100);
            g.stroke();

            // Traditional Korean geometric patterns
            g.setStrokeStyle({
              color: VISUAL_THEME.TRADITIONAL_GOLD,
              width: 2,
              alpha: 0.7,
            });

            // Cross pattern
            g.moveTo(-30, -45);
            g.lineTo(30, -45);
            g.moveTo(0, -95);
            g.lineTo(0, 5);
            g.stroke();

            // Corner decorations with proper destructuring
            const corners: readonly [number, number][] = [
              [-25, -90],
              [25, -90],
              [-25, 0],
              [25, 0],
            ];
            corners.forEach(([x, y]) => {
              g.setFillStyle({
                color: VISUAL_THEME.TRADITIONAL_GOLD,
                alpha: 0.6,
              });
              g.rect(x - 3, y - 3, 6, 6);
              g.fill();
            });
          }
        }}
      />
    </>
  );
}

function StanceIndicator({ stance }: { stance: TrigramStance }): JSX.Element {
  return (
    <pixiContainer>
      {/* Enhanced traditional Korean stance display with cooler effects */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();

          // Traditional Korean panel with gradient effect
          const stanceColor = VISUAL_THEME.ENERGY_COLORS[stance];

          // Background with glow effect
          g.setFillStyle({ color: 0x000000, alpha: 0.95 });
          g.roundRect(-45, -115, 90, 25, 12);
          g.fill();

          // Glowing border
          g.setStrokeStyle({
            color: stanceColor,
            width: 3,
            alpha: 0.8,
          });
          g.roundRect(-45, -115, 90, 25, 12);
          g.stroke();

          // Inner glow
          g.setStrokeStyle({
            color: VISUAL_THEME.KOREAN_WHITE,
            width: 1,
            alpha: 0.6,
          });
          g.roundRect(-42, -112, 84, 19, 10);
          g.stroke();

          // Corner accent marks with proper destructuring
          const cornerSize = 4;
          const corners: readonly [number, number][] = [
            [-40, -110],
            [40, -110],
            [-40, -95],
            [40, -95],
          ];
          corners.forEach(([x, y]) => {
            g.setFillStyle({ color: stanceColor, alpha: 0.8 });
            g.circle(x, y, cornerSize);
            g.fill();
          });
        }}
      />

      <pixiText
        text={getTrigramSymbol(stance)}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-102}
        style={{
          fontFamily: "serif",
          fontSize: 28,
          fill: VISUAL_THEME.KOREAN_WHITE,
          fontWeight: "bold",
          stroke: { color: VISUAL_THEME.ENERGY_COLORS[stance], width: 2 },
        }}
      />
    </pixiContainer>
  );
}

function HealthStaminaBars({
  playerState,
}: {
  playerState: PlayerState;
}): JSX.Element {
  return (
    <>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: 0x333333 });
          g.rect(-35, -125, 70, 8);
          g.fill();
          g.setFillStyle({
            color: playerState.health > 30 ? 0x4caf50 : 0xff4444,
          });
          g.rect(-35, -125, playerState.health * 0.7, 8);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.rect(-35, -125, 70, 8);
          g.stroke();
        }}
      />
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({ color: 0x333333 });
          g.rect(-35, -115, 70, 6);
          g.fill();
          g.setFillStyle({ color: 0xffc107 });
          g.rect(-35, -115, playerState.stamina * 0.7, 6);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.rect(-35, -115, 70, 6);
          g.stroke();
        }}
      />
    </>
  );
}

function AttackEffect({
  playerState,
  technique,
  animationTime,
}: {
  playerState: PlayerState;
  technique: TrigramTechnique;
  animationTime: number;
}): JSX.Element {
  return (
    <>
      {/* Main attack effect */}
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          const attackAlpha = Math.sin(animationTime * 0.3) * 0.4 + 0.6;
          const attackWidth = technique.range;
          const attackHeight = 30 + technique.damage * 0.8;
          const stanceColor = VISUAL_THEME.ENERGY_COLORS[playerState.stance];

          // Main attack beam
          g.setFillStyle({
            color: stanceColor,
            alpha: attackAlpha * 0.8,
          });

          const attackX =
            playerState.facing === "right" ? 35 : -35 - attackWidth;
          g.rect(attackX, -attackHeight / 2, attackWidth, attackHeight);
          g.fill();

          // Attack core (brighter center)
          g.setFillStyle({
            color: VISUAL_THEME.KOREAN_WHITE,
            alpha: attackAlpha * 0.6,
          });
          g.rect(
            attackX + 5,
            -attackHeight / 4,
            attackWidth - 10,
            attackHeight / 2
          );
          g.fill();

          // Energy particles around attack
          for (let i = 0; i < 12; i++) {
            const particleX = attackX + Math.random() * attackWidth;
            const particleY = -attackHeight / 2 + Math.random() * attackHeight;
            const particleSize = 1 + Math.random() * 3;

            g.setFillStyle({
              color:
                Math.random() > 0.5 ? stanceColor : VISUAL_THEME.KOREAN_WHITE,
              alpha: attackAlpha * (0.3 + Math.random() * 0.5),
            });
            g.circle(particleX, particleY, particleSize);
            g.fill();
          }

          // Technique-specific visual effects
          switch (playerState.stance) {
            case "li": // Fire - add flame-like effects
              for (let i = 0; i < 5; i++) {
                const flameX = attackX + (i * attackWidth) / 5;
                const flameHeight = 10 + Math.sin(animationTime * 0.5 + i) * 8;
                g.setFillStyle({ color: 0xff6600, alpha: attackAlpha * 0.4 });
                g.rect(flameX, -flameHeight, 8, flameHeight * 2);
                g.fill();
              }
              break;

            case "jin": // Thunder - add lightning effects
              g.setStrokeStyle({
                color: VISUAL_THEME.KOREAN_WHITE,
                width: 3,
                alpha: attackAlpha,
              });
              g.moveTo(attackX, -10);
              g.lineTo(attackX + attackWidth / 3, 5);
              g.lineTo(attackX + (2 * attackWidth) / 3, -5);
              g.lineTo(attackX + attackWidth, 10);
              g.stroke();
              break;

            case "gam": // Water - add wave effects
              for (let i = 0; i < 3; i++) {
                const waveY = -15 + i * 10;
                g.setStrokeStyle({
                  color: 0x4169e1,
                  width: 4,
                  alpha: attackAlpha * 0.6,
                });
                g.moveTo(attackX, waveY);
                for (let x = 0; x < attackWidth; x += 10) {
                  const y = waveY + Math.sin((x + animationTime * 50) / 10) * 3;
                  g.lineTo(attackX + x, y);
                }
                g.stroke();
              }
              break;
          }
        }}
      />

      {/* Attack impact indicator */}
      <AttackImpactEffect
        technique={technique}
        playerState={playerState}
        animationTime={animationTime}
      />
    </>
  );
}

function AttackImpactEffect({
  technique,
  playerState,
  animationTime,
}: {
  technique: TrigramTechnique;
  playerState: PlayerState;
  animationTime: number;
}): JSX.Element {
  const impactX =
    playerState.facing === "right"
      ? 35 + technique.range
      : -35 - technique.range;

  return (
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();
        const impactAlpha = Math.sin(animationTime * 0.4) * 0.5 + 0.5;
        const stanceColor = VISUAL_THEME.ENERGY_COLORS[playerState.stance];

        // Impact explosion effect
        g.setFillStyle({
          color: stanceColor,
          alpha: impactAlpha * 0.7,
        });
        g.circle(impactX, 0, 15 + Math.sin(animationTime * 0.6) * 5);
        g.fill();

        // Impact ring
        g.setStrokeStyle({
          color: VISUAL_THEME.KOREAN_WHITE,
          width: 3,
          alpha: impactAlpha,
        });
        g.circle(impactX, 0, 20 + Math.sin(animationTime * 0.8) * 8);
        g.stroke();

        // Impact sparks
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const sparkDistance = 25 + Math.sin(animationTime * 0.7 + i) * 10;
          const sparkX = impactX + Math.cos(angle) * sparkDistance;
          const sparkY = Math.sin(angle) * sparkDistance;

          g.setFillStyle({
            color: VISUAL_THEME.KOREAN_WHITE,
            alpha: impactAlpha * 0.8,
          });
          g.circle(sparkX, sparkY, 2);
          g.fill();
        }
      }}
    />
  );
}

function MovementTrail({
  isPlayerOne,
  facing,
}: {
  isPlayerOne: boolean;
  animationTime: number;
  facing: "left" | "right";
}): JSX.Element {
  return (
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();
        const trailAlpha = 0.4;
        const trailColor = isPlayerOne
          ? VISUAL_THEME.PLAYER_1_COLOR
          : VISUAL_THEME.PLAYER_2_COLOR;

        // Enhanced movement trail with speed lines
        for (let i = 0; i < 5; i++) {
          const offset = facing === "right" ? -(i * 8) : i * 8;
          const alpha = trailAlpha * (1 - i * 0.15);

          g.setFillStyle({
            color: trailColor,
            alpha: alpha,
          });
          g.rect(offset - 20, -75, 40, 70);
          g.fill();
        }

        // Speed lines for dynamic movement
        g.setStrokeStyle({
          color: VISUAL_THEME.KOREAN_WHITE,
          width: 2,
          alpha: trailAlpha * 0.6,
        });

        for (let i = 0; i < 6; i++) {
          const lineY = -60 + i * 15;
          const lineOffset = facing === "right" ? -30 : 30;
          g.moveTo(lineOffset, lineY);
          g.lineTo(lineOffset + (facing === "right" ? -15 : 15), lineY);
          g.stroke();
        }
      }}
    />
  );
}
