import { useCallback, useState } from "react";
import type { PlayerState, TrigramStance } from "../../types";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { TRIGRAM_DATA } from "../../systems/trigram/KoreanCulture";
import type { Graphics as PixiGraphics, Ticker } from "pixi.js";

export interface PlayerProps {
  readonly playerState: PlayerState;
  readonly opponentPosition: { x: number; y: number };
  readonly onStateChange?: (newState: Partial<PlayerState>) => void;
}

export function Player({
  playerState,
  onStateChange,
}: PlayerProps): JSX.Element {
  const [animationTime, setAnimationTime] = useState<number>(0);

  // Use proper ticker callback with Ticker parameter
  const tickerCallback = useCallback((ticker: Ticker) => {
    setAnimationTime((prev) => prev + ticker.deltaTime * 0.1);
  }, []);

  // Get trigram data safely
  const trigramData = TRIGRAM_DATA[playerState.stance as TrigramStance];
  const stanceColor = trigramData?.color || 0xffffff;

  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Draw martial artist figure
      const headRadius = 12;
      const bodyHeight = 40;
      const bodyWidth = 20;

      // Determine if player is moving based on animation
      const isMoving = Math.sin(animationTime) > 0.5;
      const legSpread = isMoving ? 15 : 8;

      // Head
      g.setFillStyle({ color: 0xffdbac }); // Skin tone
      g.circle(0, -bodyHeight - headRadius, headRadius);
      g.fill();

      // Body (Korean martial arts uniform - dobok)
      if (playerState.stance) {
        // Draw stance-specific aura
        const auraIntensity = Math.sin(animationTime * 2) * 0.3 + 0.7;
        g.setStrokeStyle({
          color: stanceColor,
          width: 3,
          alpha: auraIntensity * 0.5,
        });
        g.circle(0, -bodyHeight / 2, 35);
        g.stroke();

        // Draw attacking effect if attacking
        if (playerState.isAttacking) {
          const attackDirection = 1; // Default to right-facing

          g.setStrokeStyle({ color: stanceColor, width: 4, alpha: 0.8 });
          g.moveTo(bodyWidth / 2, -bodyHeight / 2);
          g.lineTo(bodyWidth / 2 + 30 * attackDirection, -bodyHeight / 2);
          g.stroke();

          // Attack impact effect
          g.setFillStyle({ color: stanceColor, alpha: 0.6 });
          g.circle(bodyWidth / 2 + 25 * attackDirection, -bodyHeight / 2, 8);
          g.fill();
        }
      }

      // White martial arts uniform
      g.setFillStyle({ color: 0xffffff });
      g.rect(-bodyWidth / 2, -bodyHeight, bodyWidth, bodyHeight);
      g.fill();

      // Belt (colored based on skill level)
      const beltColor =
        playerState.health > 80
          ? 0x8b0000 // Red for high health
          : playerState.health > 40
          ? 0xffd700 // Gold for medium
          : 0x8b4513; // Brown for low
      g.setFillStyle({ color: beltColor });
      g.rect(-bodyWidth / 2 - 2, -bodyHeight / 3, bodyWidth + 4, 6);
      g.fill();

      // Arms
      g.setStrokeStyle({ color: 0xffdbac, width: 6 });
      g.moveTo(-bodyWidth / 2, -bodyHeight * 0.7);
      g.lineTo(-bodyWidth - 8, -bodyHeight * 0.4);
      g.moveTo(bodyWidth / 2, -bodyHeight * 0.7);
      g.lineTo(bodyWidth + 8, -bodyHeight * 0.4);
      g.stroke();

      // Legs
      g.moveTo(-bodyWidth / 4, 0);
      g.lineTo(-legSpread, bodyHeight);
      g.moveTo(bodyWidth / 4, 0);
      g.lineTo(legSpread, bodyHeight);
      g.stroke();

      // Health indicator
      if (playerState.health < playerState.maxHealth) {
        const healthPercent = playerState.health / playerState.maxHealth;

        // Health bar background
        g.setFillStyle({ color: 0x330000, alpha: 0.8 });
        g.rect(-25, -bodyHeight - 30, 50, 5);
        g.fill();

        // Health bar fill
        const healthColor =
          healthPercent > 0.6
            ? 0x00ff00
            : healthPercent > 0.3
            ? 0xffff00
            : 0xff0000;
        g.setFillStyle({ color: healthColor });
        g.rect(-25, -bodyHeight - 30, 50 * healthPercent, 5);
        g.fill();
      }
    },
    [
      animationTime,
      playerState.stance,
      playerState.isAttacking,
      playerState.health,
      playerState.maxHealth,
      stanceColor,
    ]
  );

  return (
    <pixiContainer
      x={playerState.position.x}
      y={playerState.position.y}
      // Remove scale flipping for now to avoid complexity
      scale={{ x: 1, y: 1 }}
    >
      {/* Main player graphics */}
      <pixiGraphics draw={drawPlayer} />

      {/* Player stance indicator */}
      <pixiText
        text={trigramData?.korean || ""}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-80}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 14,
          fill: stanceColor,
          fontWeight: "bold",
        }}
      />

      {/* Trigram symbol */}
      <pixiText
        text={trigramData?.symbol || ""}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-95}
        style={{
          fontFamily: "serif",
          fontSize: 18,
          fill: 0xffffff,
        }}
      />

      {/* Status effects display */}
      {playerState.statusEffects.map((effect, index) => (
        <pixiText
          key={index}
          text={`${effect.type}: ${effect.duration}`}
          anchor={{ x: 0.5, y: 0.5 }}
          y={60 + index * 15}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 10,
            fill: 0xffd700,
          }}
        />
      ))}
    </pixiContainer>
  );
}
