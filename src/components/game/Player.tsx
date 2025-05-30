import React, { useCallback, useState, useEffect } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { Graphics as PixiGraphics, FederatedPointerEvent } from "pixi.js";
import type { PlayerState, TrigramStance, KoreanTechnique } from "../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types";

interface PlayerProps {
  readonly player: PlayerState;
  readonly onAttack?: (technique: KoreanTechnique) => void;
  readonly onStanceChange?: (stance: TrigramStance) => void;
  readonly onDeath?: () => void;
  readonly scale?: number;
  readonly showHitboxes?: boolean;
  readonly debug?: boolean;
}

export function Player({
  player,
  onAttack,
  onStanceChange,
  onDeath,
  scale = 1,
  showHitboxes = false,
  debug = false,
}: PlayerProps): React.ReactElement {
  const [animationTime, setAnimationTime] = useState<number>(0);

  // Use useTick for animation updates
  useTick(
    useCallback((delta: number) => {
      setAnimationTime((prev) => prev + delta * 0.01);
    }, [])
  );

  // Check for death condition
  useEffect(() => {
    if (player.health <= 0 && onDeath) {
      onDeath();
    }
  }, [player.health, onDeath]);

  // Handle stance changes
  useEffect(() => {
    if (onStanceChange) {
      // This would be triggered by external stance changes
      // Implementation depends on how stance changes are detected
    }
  }, [player.stance, onStanceChange]);

  const handlePointerDown = useCallback(
    (event: FederatedPointerEvent) => {
      event.stopPropagation();
      if (onAttack) {
        const technique = TRIGRAM_DATA[player.stance].technique;
        onAttack(technique);
      }
    },
    [onAttack, player.stance]
  );

  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Korean martial arts uniform (dobok)
      g.setFillStyle({ color: 0xffffff, alpha: 0.9 });
      g.rect(-25, -90, 50, 90);
      g.fill();

      // Belt color based on skill level
      const beltColor = player.health > 75 ? 0x8b0000 : 0x000000; // Red belt for healthy, black for injured
      g.setFillStyle({ color: beltColor });
      g.rect(-27, -25, 54, 10);
      g.fill();

      // Stance-specific aura
      if (player.isAttacking) {
        const stanceData = TRIGRAM_DATA[player.stance];
        g.setStrokeStyle({
          color: stanceData.color,
          width: 8,
          alpha: Math.sin(animationTime * 0.3) * 0.4 + 0.6,
        });
        g.circle(0, -45, 45 + Math.sin(animationTime * 0.5) * 5);
        g.stroke();
      }

      // Health indicator
      if (player.health < player.maxHealth) {
        // Health bar background
        g.setFillStyle({ color: 0x333333 });
        g.rect(-30, -110, 60, 8);
        g.fill();

        // Health bar fill
        const healthPercent = player.health / player.maxHealth;
        const healthColor =
          healthPercent > 0.5
            ? 0x00ff00
            : healthPercent > 0.25
            ? 0xffff00
            : 0xff0000;
        g.setFillStyle({ color: healthColor });
        g.rect(-30, -110, 60 * healthPercent, 8);
        g.fill();
      }

      // Ki indicator
      if (player.ki < player.maxKi) {
        // Ki bar background
        g.setFillStyle({ color: 0x222222 });
        g.rect(-25, -120, 50, 6);
        g.fill();

        // Ki bar fill
        const kiPercent = player.ki / player.maxKi;
        g.setFillStyle({ color: 0x00aaff });
        g.rect(-25, -120, 50 * kiPercent, 6);
        g.fill();
      }

      // Debug hitboxes
      if (showHitboxes) {
        g.setStrokeStyle({ color: 0xff0000, width: 2, alpha: 0.5 });
        g.rect(-25, -90, 50, 90);
        g.stroke();
      }
    },
    [player, animationTime, showHitboxes]
  );

  return (
    <Container
      x={player.position.x}
      y={player.position.y}
      scale={scale}
      visible={player.visible ?? true}
      interactive={true}
      onPointerDown={handlePointerDown}
      data-testid="player"
    >
      <Graphics draw={drawPlayer} />

      {/* Korean technique name display */}
      <Text
        text={TRIGRAM_DATA[player.stance].koreanName}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-130}
        style={{
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          fontSize: 14,
          fill: KOREAN_COLORS.GOLD,
          fontWeight: "bold",
        }}
      />

      {/* Trigram symbol */}
      <Text
        text={TRIGRAM_DATA[player.stance].symbol}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-150}
        style={{
          fontFamily: "serif",
          fontSize: 20,
          fill: KOREAN_COLORS.WHITE,
        }}
      />

      {/* Player ID for debugging */}
      {debug && (
        <Text
          text={player.playerId}
          anchor={{ x: 0.5, y: 0.5 }}
          y={20}
          style={{
            fontFamily: "Arial",
            fontSize: 10,
            fill: KOREAN_COLORS.GRAY_LIGHT,
          }}
        />
      )}

      {/* Status effects indicator */}
      {player.conditions.length > 0 && (
        <Text
          text="!"
          anchor={{ x: 0.5, y: 0.5 }}
          y={-170}
          style={{
            fontFamily: "Arial",
            fontSize: 16,
            fill: KOREAN_COLORS.CRITICAL_RED,
            fontWeight: "bold",
          }}
        />
      )}
    </Container>
  );
}
