import type { JSX } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerState, TrigramStance } from "./Player";

// Helper functions for stance color and symbol
export function getStanceColor(stance: TrigramStance): number {
  const colors: Record<TrigramStance, number> = {
    geon: 0xffd700, // Gold - Heaven
    tae: 0x87ceeb, // Sky Blue - Lake
    li: 0xff4500, // Red Orange - Fire
    jin: 0x9370db, // Purple - Thunder
    son: 0x98fb98, // Pale Green - Wind
    gam: 0x4169e1, // Royal Blue - Water
    gan: 0x8b4513, // Saddle Brown - Mountain
    gon: 0x654321, // Dark Brown - Earth
  };
  return colors[stance];
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
      {playerState.isMoving && <MovementTrail isPlayerOne={isPlayerOne} />}
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
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();

        const bodyColor = isPlayerOne ? 0x4a90e2 : 0xe24a4a;
        const alpha = playerState.isBlocking ? 0.7 : 1.0;
        g.setFillStyle({ color: bodyColor, alpha });
        g.rect(-20, -80, 40, 80);
        g.fill();

        if (playerState.isAttacking) {
          const attackPulse = Math.sin(animationTime * 0.5) * 0.3 + 0.7;
          g.setStrokeStyle({
            color: getStanceColor(playerState.stance),
            width: 4,
            alpha: attackPulse,
          });
          g.rect(-22, -82, 44, 84);
          g.stroke();
        }

        if (playerState.isBlocking) {
          g.setStrokeStyle({ color: 0xffffff, width: 3, alpha: 0.8 });
          g.rect(-25, -85, 50, 90);
          g.stroke();
        }
      }}
    />
  );
}

function StanceIndicator({ stance }: { stance: TrigramStance }): JSX.Element {
  return (
    <pixiContainer>
      <pixiGraphics
        draw={(g: PixiGraphics) => {
          g.clear();
          g.setFillStyle({
            color: getStanceColor(stance),
            alpha: 0.9,
          });
          g.rect(-35, -105, 70, 12);
          g.fill();
          g.setStrokeStyle({ color: 0xffffff, width: 1 });
          g.rect(-35, -105, 70, 12);
          g.stroke();
        }}
      />

      <pixiText
        text={getTrigramSymbol(stance)}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-99}
        style={{
          fontFamily: "serif",
          fontSize: 20,
          fill: 0xffffff,
          fontWeight: "bold",
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
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();
        const attackAlpha = Math.sin(animationTime * 0.3) * 0.4 + 0.6;
        const attackWidth = technique.range;
        const attackHeight = 25 + technique.damage * 0.5;

        g.setFillStyle({
          color: getStanceColor(playerState.stance),
          alpha: attackAlpha,
        });

        if (playerState.facing === "right") {
          g.rect(30, -attackHeight / 2, attackWidth, attackHeight);
        } else {
          g.rect(
            -30 - attackWidth,
            -attackHeight / 2,
            attackWidth,
            attackHeight
          );
        }
        g.fill();

        // Attack spark effects
        for (let i = 0; i < 3; i++) {
          const sparkX =
            (playerState.facing === "right" ? 30 : -30) + Math.random() * 20;
          const sparkY = -10 + Math.random() * 20;
          g.setFillStyle({ color: 0xffffff, alpha: attackAlpha * 0.8 });
          g.circle(sparkX, sparkY, 2 + Math.random() * 2);
          g.fill();
        }
      }}
    />
  );
}

function MovementTrail({ isPlayerOne }: { isPlayerOne: boolean }): JSX.Element {
  return (
    <pixiGraphics
      draw={(g: PixiGraphics) => {
        g.clear();
        const trailAlpha = 0.3;
        g.setFillStyle({
          color: isPlayerOne ? 0x4a90e2 : 0xe24a4a,
          alpha: trailAlpha,
        });
        g.rect(-22, -78, 44, 76);
        g.fill();
      }}
    />
  );
}
