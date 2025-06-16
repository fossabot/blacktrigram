import React, { useCallback, useReducer, useEffect } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import type { PlayerState } from "../../../types/player";
import type { KoreanTechnique } from "../../../types/combat";
import { TrigramStance } from "../../../types/enums";

// Extend PixiJS components
extend({ Container, Graphics, Text });

// Fixed GameEngine props interface
export interface GameEngineProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly onPlayerUpdate: (
    playerId: string,
    updates: Partial<PlayerState>
  ) => void;
  readonly width: number;
  readonly height: number;
  readonly isPaused?: boolean;
  readonly gameMode?: string;
}

// ...existing combat state and reducer...

export const GameEngine: React.FC<GameEngineProps> = ({
  player1,
  player2,
  onPlayerUpdate,
  isPaused = false,
  gameMode = "versus",
  width = 1200,
  height = 800,
}) => {
  const players = [player1, player2];

  // ...existing combat logic...

  // Korean martial arts AI behavior
  const executeAITechnique = useCallback(
    (aiPlayer: PlayerState, targetPlayer: PlayerState) => {
      // Simple AI that cycles through trigram stances and attacks
      const trigrams = Object.values(TrigramStance);
      const randomStance =
        trigrams[Math.floor(Math.random() * trigrams.length)];

      // Change AI stance
      onPlayerUpdate(aiPlayer.id, { currentStance: randomStance });

      // Execute attack after stance change
      setTimeout(() => {
        const damage = Math.floor(Math.random() * 20) + 10;
        const newHealth = Math.max(0, targetPlayer.health - damage);
        onPlayerUpdate(targetPlayer.id, { health: newHealth });

        console.log(
          `AI ${aiPlayer.name.korean} attacks with ${randomStance} for ${damage} damage!`
        );
      }, 500);
    },
    [onPlayerUpdate]
  );

  // Auto AI behavior for single player mode
  useEffect(() => {
    if (gameMode === "training" && !isPaused) {
      const aiTimer = setInterval(() => {
        if (Math.random() > 0.7) {
          // 30% chance per second
          executeAITechnique(player2, player1);
        }
      }, 1000);

      return () => clearInterval(aiTimer);
    }
  }, [gameMode, isPaused, executeAITechnique, player1, player2]);

  // Enhanced arena rendering for Korean dojang
  const renderKoreanArena = useCallback(
    (g: any) => {
      g.clear();

      // Traditional Korean dojang floor
      g.fill({ color: 0x2a2a3e, alpha: 0.9 });
      g.rect(0, 0, width, height);
      g.fill();

      // Traditional mat boundaries with Korean patterns
      g.stroke({ width: 3, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.8 });
      g.rect(50, 100, width - 100, height - 200);
      g.stroke();

      // Center circle with trigram symbol
      g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.6 });
      g.circle(width / 2, height / 2, 80);
      g.stroke();

      // Draw trigram symbols around center
      const symbols = ["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"];
      symbols.forEach((symbol, index) => {
        const angle = (index / 8) * Math.PI * 2;
        const symbolX = width / 2 + Math.cos(angle) * 100;
        const symbolY = height / 2 + Math.sin(angle) * 100;

        // These would be drawn via text components in the render
      });
    },
    [width, height]
  );

  // ...existing player rendering logic...

  return (
    <pixiContainer
      data-testid="game-engine"
      x={0}
      y={0}
      width={width}
      height={height}
    >
      {/* Enhanced Korean dojang arena */}
      <pixiGraphics draw={renderKoreanArena} />

      {/* Players with Korean martial arts styling */}
      {players.map((player, index) => {
        const x = index === 0 ? width * 0.25 : width * 0.75;
        const y = height * 0.6;

        return (
          <pixiContainer key={player.id} x={x} y={y}>
            <pixiGraphics
              draw={(g) => {
                g.clear();

                // Player with archetype-specific colors
                const bodyColor =
                  index === 0
                    ? KOREAN_COLORS.PLAYER_1_COLOR
                    : KOREAN_COLORS.PLAYER_2_COLOR;
                const healthPercent = player.health / player.maxHealth;
                const alpha = healthPercent > 0.2 ? 0.9 : 0.5;

                g.fill({ color: bodyColor, alpha });
                g.circle(0, -40, 15); // Head
                g.rect(-10, -25, 20, 50); // Body
                g.rect(-8, 25, 6, 30); // Left leg
                g.rect(2, 25, 6, 30); // Right leg
                g.rect(-20, -15, 8, 6); // Left arm
                g.rect(12, -15, 8, 6); // Right arm
                g.fill();

                // Stance aura effect
                if (player.currentStance) {
                  g.stroke({
                    width: 2,
                    color: KOREAN_COLORS.ACCENT_GOLD,
                    alpha: 0.6,
                  });
                  g.circle(0, 0, 60);
                  g.stroke();
                }
              }}
            />

            {/* Korean player info */}
            <pixiText
              text={player.name.korean}
              style={{
                fontSize: 14,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
                fontWeight: "bold",
                fontFamily: "Noto Sans KR",
              }}
              x={0}
              y={-70}
              anchor={0.5}
            />

            <pixiText
              text={`${player.currentStance || "기본"} 자세`}
              style={{
                fontSize: 10,
                fill: KOREAN_COLORS.ACCENT_GOLD,
                align: "center",
                fontFamily: "Noto Sans KR",
              }}
              x={0}
              y={70}
              anchor={0.5}
            />
          </pixiContainer>
        );
      })}

      {/* Pause overlay */}
      {isPaused && (
        <pixiContainer x={width / 2} y={height / 2}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: 0x000000, alpha: 0.7 });
              g.rect(-150, -40, 300, 80);
              g.fill();
            }}
          />
          <pixiText
            text="일시정지 - PAUSED"
            style={{
              fontSize: 18,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              align: "center",
              fontWeight: "bold",
              fontFamily: "Noto Sans KR",
            }}
            anchor={0.5}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default GameEngine;
