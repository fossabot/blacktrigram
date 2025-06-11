// Complete game engine for Black Trigram Korean martial arts

import React, { useState, useEffect, useCallback } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics } from "pixi.js";
import { GameMode } from "../../types/enums"; // Fix: Import GameMode
import type { PlayerState } from "../../types/player";
import type { GameEngineProps } from "../../types/components";
import type { TrigramStance } from "../../types/trigram"; // Fix: Import TrigramStance
import { KOREAN_COLORS } from "../../types/constants";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { CombatSystem } from "../../systems/CombatSystem";

extend({
  Container,
  Graphics,
});

export const GameEngine: React.FC<GameEngineProps> = ({
  player1,
  player2,
  onPlayerUpdate,
  onCombatResult,
}) => {
  usePixiExtensions();
  const [gameTime, setGameTime] = useState(0);

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime((prev) => prev + 16); // ~60fps
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const handleCombatAction = useCallback(
    (attacker: PlayerState, defender: PlayerState) => {
      const result = CombatSystem.resolveAttack(attacker, defender, {
        technique: "basic_attack",
        targetArea: "torso",
        force: 50,
      });

      onCombatResult(result);
    },
    [onCombatResult]
  );

  const drawArena = useCallback(
    (g: any) => {
      g.clear();

      // Arena background
      g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
      g.rect(0, 0, width, height);
      g.fill();

      // Center line
      g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.5 });
      g.moveTo(width / 2, 0);
      g.lineTo(width / 2, height);
      g.stroke();
    },
    [width, height]
  );

  const renderPlayer = useCallback(
    (player: PlayerState, index: number) => {
      const x = index === 0 ? width * 0.25 : width * 0.75;
      const y = height * 0.5;

      return (
        <pixiContainer key={player.id} x={x} y={y}>
          <pixiGraphics
            draw={(g: any) => {
              g.clear();

              // Player body
              g.fill({
                color:
                  index === 0
                    ? KOREAN_COLORS.PRIMARY_CYAN
                    : KOREAN_COLORS.ACCENT_RED,
                alpha: 0.8,
              });
              g.circle(0, -40, 15); // Head
              g.rect(-8, -25, 16, 40); // Body
              g.rect(-6, 15, 5, 25); // Left leg
              g.rect(1, 15, 5, 25); // Right leg
              g.rect(-15, -20, 10, 5); // Left arm
              g.rect(5, -20, 10, 5); // Right arm
              g.fill();

              // Health bar
              const healthPercent = player.health / player.maxHealth;
              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
              g.rect(-30, -60, 60, 8);
              g.fill();

              g.fill({
                color:
                  healthPercent > 0.5
                    ? KOREAN_COLORS.POSITIVE_GREEN
                    : KOREAN_COLORS.ACCENT_RED,
                alpha: 0.9,
              });
              g.rect(-30, -60, 60 * healthPercent, 8);
              g.fill();
            }}
          />
        </pixiContainer>
      );
    },
    [width, height]
  );

  return (
    <pixiContainer data-testid="game-engine">
      <pixiGraphics draw={drawArena} />
      {players.map(renderPlayer)}
      {/* Game engine visualization */}
      <pixiText
        text={`Game Time: ${Math.floor(gameTime / 1000)}s`}
        style={{ fontSize: 12, fill: 0xffffff }}
        x={10}
        y={10}
      />
    </pixiContainer>
  );
};

export default GameEngine;
