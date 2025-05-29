import React, { useCallback, useState } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { JSX } from "react";
import type { PlayerState, Vector2D } from "../../types/GameTypes";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { TRIGRAM_DATA } from "../../types";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly isPlayerOne: boolean;
  readonly opponentPosition: Vector2D;
}

export function Player({
  playerState,
  isPlayerOne,
  opponentPosition,
}: PlayerProps): JSX.Element {
  const [animationTime, setAnimationTime] = useState(0);

  useTick(
    useCallback((delta: number) => {
      setAnimationTime((prev) => prev + delta * 0.1);
    }, [])
  );

  const trigramData = TRIGRAM_DATA[playerState.currentStance];
  const stanceColor = TrigramSystem.getTrigramColor(playerState.currentStance);

  const drawPlayer = useCallback(
    (g: any) => {
      g.clear();

      // Player body (simplified martial artist silhouette)
      const bodyColor = isPlayerOne ? 0xffffff : 0xcccccc;
      const alpha = playerState.isStunned ? 0.6 : 1.0;

      // Main body
      g.setFillStyle({ color: bodyColor, alpha });
      g.ellipse(0, -40, 15, 30);
      g.fill();

      // Head
      g.circle(0, -75, 12);
      g.fill();

      // Arms
      const armOffset = playerState.isAttacking ? 20 : 10;
      g.rect(-25, -60, armOffset, 8);
      g.rect(25 - armOffset, -60, armOffset, 8);
      g.fill();

      // Legs
      const legSpread = Math.abs(playerState.velocity.x) > 10 ? 15 : 8;
      g.rect(-legSpread, -10, 8, 25);
      g.rect(legSpread - 8, -10, 8, 25);
      g.fill();

      // Stance aura
      if (playerState.currentStance) {
        const auraAlpha = Math.sin(animationTime) * 0.3 + 0.4;
        const auraRadius = 45 + Math.sin(animationTime * 2) * 5;

        g.setStrokeStyle({
          color: stanceColor,
          width: 3,
          alpha: auraAlpha,
        });
        g.circle(0, -40, auraRadius);
        g.stroke();
      }

      // Attack effect
      if (playerState.isAttacking) {
        const attackDirection = playerState.facing === "right" ? 1 : -1;
        g.setStrokeStyle({ color: 0xffff00, width: 4, alpha: 0.8 });
        g.moveTo(attackDirection * 15, -50);
        g.lineTo(attackDirection * 40, -45);
        g.stroke();
      }

      // Block effect
      if (playerState.isBlocking) {
        g.setStrokeStyle({ color: 0x00ffff, width: 6, alpha: 0.7 });
        g.arc(0, -40, 35, -Math.PI / 4, Math.PI / 4);
        g.stroke();
      }

      // Health indicator
      const healthRatio = playerState.health / playerState.maxHealth;
      if (healthRatio < 0.3) {
        // Low health warning effect
        const warningAlpha = Math.sin(animationTime * 4) * 0.5 + 0.5;
        g.setFillStyle({ color: 0xff0000, alpha: warningAlpha * 0.3 });
        g.circle(0, -40, 50);
        g.fill();
      }
    },
    [
      playerState.currentStance,
      playerState.isAttacking,
      playerState.isBlocking,
      playerState.isStunned,
      playerState.facing,
      playerState.health,
      playerState.maxHealth,
      playerState.velocity,
      isPlayerOne,
      stanceColor,
      animationTime,
    ]
  );

  return (
    <Container
      x={playerState.position.x}
      y={playerState.position.y}
      scale={playerState.facing === "left" ? { x: -1, y: 1 } : { x: 1, y: 1 }}
    >
      {/* Main player visual */}
      <Graphics draw={drawPlayer} />

      {/* Trigram symbol above player */}
      <Text
        text={trigramData.symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={-120}
        style={{
          fontFamily: "serif",
          fontSize: 24,
          fill: stanceColor,
          fontWeight: "bold",
          dropShadow: {
            color: 0x000000,
            blur: 2,
            distance: 1,
          },
        }}
      />

      {/* Korean stance name */}
      <Text
        text={`${trigramData.koreanName} (${trigramData.englishName})`}
        anchor={{ x: 0.5, y: 0.5 }}
        x={0}
        y={-140}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 12,
          fill: 0xffd700,
          fontWeight: "400",
        }}
      />

      {/* Combo counter */}
      {playerState.comboCount > 1 && (
        <Text
          text={`${playerState.comboCount} HIT COMBO!`}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={-160}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 14,
            fill: 0xff1493,
            fontWeight: "bold",
          }}
        />
      )}

      {/* Status effects indicators */}
      {playerState.activeEffects.map((effect, index) => (
        <Text
          key={`${effect.type}_${index}`}
          text={effect.type.toUpperCase()}
          anchor={{ x: 0.5, y: 0.5 }}
          x={0}
          y={30 + index * 15}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 10,
            fill: 0xff4500,
            fontWeight: "bold",
          }}
        />
      ))}
    </Container>
  );
}

// Export for backward compatibility
export const PlayerContainer = Player;
