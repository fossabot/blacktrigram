import { Container, Graphics, Text, useTick } from "@pixi/react";
import { useState, useCallback } from "react";
import type { JSX } from "react";
import type { PlayerState } from "./GameEngine";
import type { Graphics as PixiGraphics } from "pixi.js";

export interface PlayerVisualsProps {
  readonly playerState: PlayerState;
  readonly color: number;
  readonly isHuman: boolean;
  readonly isHovered: boolean;
  readonly trigramSymbol: string;
  readonly trigramInfo: { korean: string; meaning: string };
}

// Korean martial arts animation states
type AnimationState =
  | "idle"
  | "attacking"
  | "blocking"
  | "moving"
  | "stance_transition";

export function PlayerVisuals({
  playerState,
  color,
  isHuman,
  isHovered,
  trigramSymbol,
  trigramInfo,
}: PlayerVisualsProps): JSX.Element {
  const [animationTime, setAnimationTime] = useState<number>(0);
  const [currentAnimation, setCurrentAnimation] =
    useState<AnimationState>("idle");

  // Update animation time for smooth Korean martial arts movements
  useTick(
    useCallback(
      (delta: number) => {
        setAnimationTime((prev) => prev + delta * 0.1);

        // Determine current animation state
        if (playerState.isAttacking) {
          setCurrentAnimation("attacking");
        } else if (playerState.isBlocking) {
          setCurrentAnimation("blocking");
        } else {
          setCurrentAnimation("idle");
        }
      },
      [playerState.isAttacking, playerState.isBlocking]
    )
  );

  // Draw Korean martial artist with traditional dobok (uniform)
  const drawMartialArtist = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Traditional Korean dobok (white uniform)
      g.setFillStyle({ color: 0xffffff, alpha: 0.95 });

      // Body (rectangular torso)
      const bodyWidth = 35;
      const bodyHeight = 60;
      g.rect(-bodyWidth / 2, -bodyHeight - 10, bodyWidth, bodyHeight);
      g.fill();

      // Arms based on animation state
      const armOffset = currentAnimation === "attacking" ? 20 : 10;
      const armY = currentAnimation === "blocking" ? -40 : -35;

      // Left arm
      g.rect(-bodyWidth / 2 - 8, armY, 8, 30);
      g.fill();

      // Right arm
      g.rect(bodyWidth / 2, armY, 8, 30);
      g.fill();

      // Legs
      g.rect(-bodyWidth / 2 + 5, -10, 12, 35);
      g.fill();
      g.rect(bodyWidth / 2 - 17, -10, 12, 35);
      g.fill();

      // Head
      g.setFillStyle({ color: 0xffdbac, alpha: 1 }); // Skin tone
      g.circle(0, -bodyHeight - 20, 12);
      g.fill();

      // Belt indicating rank
      const beltColor = isHuman ? 0x8b0000 : 0x000000; // Red for human, black for AI
      g.setFillStyle({ color: beltColor, alpha: 0.9 });
      g.rect(-bodyWidth / 2 - 2, -25, bodyWidth + 4, 6);
      g.fill();

      // Stance energy aura based on trigram
      if (playerState.isAttacking || isHovered) {
        const auraAlpha = Math.sin(animationTime) * 0.3 + 0.5;
        const auraSize = 40 + Math.sin(animationTime * 2) * 5;

        g.setStrokeStyle({
          color: color,
          width: 3,
          alpha: auraAlpha,
        });
        g.circle(0, -40, auraSize);
        g.stroke();

        // Inner energy pulse
        g.setStrokeStyle({
          color: 0xffd700,
          width: 1,
          alpha: auraAlpha * 0.7,
        });
        g.circle(0, -40, auraSize * 0.7);
        g.stroke();
      }

      // Attack motion lines
      if (currentAnimation === "attacking") {
        g.setStrokeStyle({ color: 0xffd700, width: 2, alpha: 0.8 });
        const attackDirection = playerState.facingDirection;

        for (let i = 0; i < 3; i++) {
          const lineOffset = (i - 1) * 10;
          g.moveTo(attackDirection * 20, -30 + lineOffset);
          g.lineTo(attackDirection * 40, -35 + lineOffset);
        }
        g.stroke();
      }

      // Blocking defensive stance
      if (currentAnimation === "blocking") {
        g.setStrokeStyle({ color: 0x87ceeb, width: 3, alpha: 0.9 });
        const blockArc = Math.PI * 0.6;
        const radius = 25;

        for (let angle = -blockArc / 2; angle <= blockArc / 2; angle += 0.2) {
          const x = Math.cos(angle) * radius * playerState.facingDirection;
          const y = Math.sin(angle) * radius - 30;
          g.circle(x, y, 2);
          g.fill();
        }
      }

      // Health indicator (subtle red overlay when injured)
      const healthPercent = playerState.health / playerState.maxHealth;
      if (healthPercent < 0.7) {
        const damageAlpha = (0.7 - healthPercent) * 0.5;
        g.setFillStyle({ color: 0xff0000, alpha: damageAlpha });
        g.rect(-bodyWidth / 2, -bodyHeight - 10, bodyWidth, bodyHeight);
        g.fill();
      }

      // Stamina indicator (blue glow when high stamina)
      const staminaPercent = playerState.stamina / playerState.maxStamina;
      if (staminaPercent > 0.8) {
        const staminaGlow = (staminaPercent - 0.8) * 2.5;
        g.setStrokeStyle({
          color: 0x00bfff,
          width: 1,
          alpha: staminaGlow,
        });
        g.circle(0, -40, 35);
        g.stroke();
      }
    },
    [
      currentAnimation,
      animationTime,
      color,
      isHuman,
      isHovered,
      playerState.isAttacking,
      playerState.facingDirection,
      playerState.health,
      playerState.maxHealth,
      playerState.stamina,
      playerState.maxStamina,
    ]
  );

  return (
    <Container>
      {/* Main martial artist figure */}
      <Graphics draw={drawMartialArtist} />

      {/* Trigram symbol above player */}
      <Text
        text={trigramSymbol}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-100}
        style={{
          fontFamily: "serif",
          fontSize: 20,
          fill: 0xffd700,
          fontWeight: "bold",
          dropShadow: {
            color: 0x000000,
            blur: 2,
            distance: 2,
          },
        }}
      />

      {/* Korean stance name */}
      <Text
        text={trigramInfo.korean}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-80}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: color,
          fontWeight: "bold",
        }}
      />

      {/* Player type indicator */}
      {isHuman && (
        <Text
          text="플레이어"
          anchor={{ x: 0.5, y: 0.5 }}
          y={40}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 10,
            fill: 0x00ffd0,
            alpha: 0.8,
          }}
        />
      )}

      {/* Combo counter for impressive combinations */}
      {playerState.comboCount > 1 && (
        <Text
          text={`${playerState.comboCount} 연타!`}
          anchor={{ x: 0.5, y: 0.5 }}
          x={30}
          y={-60}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 12,
            fill: 0xff6b6b,
            fontWeight: "bold",
            dropShadow: {
              color: 0x000000,
              blur: 2,
              distance: 1,
            },
          }}
        />
      )}
    </Container>
  );
}
