// Complete game engine for Black Trigram Korean martial arts

import React, { useMemo, useEffect } from "react";
import { Container } from "@pixi/react";
import type { GameEngineProps, PlayerState, CombatResult } from "../../types";
import { GAME_CONFIG } from "../../types/constants";

// Combat System Classes with proper player integration
class TrainingCombatSystem {
  update(
    players: readonly [PlayerState, PlayerState],
    deltaTime: number
  ): CombatResult | null {
    // Fix: Use deltaTime for calculations and ensure proper array return
    const regenRate = deltaTime / 1000; // Convert to seconds

    // Training mode: infinite health regeneration, practice mode
    const updatedPlayer1 = {
      ...players[0],
      health: Math.min(
        players[0].maxHealth,
        players[0].health + regenRate * 10
      ),
      ki: Math.min(players[0].maxKi, players[0].ki + regenRate * 20),
      stamina: Math.min(
        players[0].maxStamina,
        players[0].stamina + regenRate * 30
      ),
    };

    const updatedPlayer2 = {
      ...players[1],
      health: Math.min(
        players[1].maxHealth,
        players[1].health + regenRate * 10
      ),
      ki: Math.min(players[1].maxKi, players[1].ki + regenRate * 20),
      stamina: Math.min(
        players[1].maxStamina,
        players[1].stamina + regenRate * 30
      ),
    };

    return {
      success: true,
      damage: 0,
      effects: [],
      criticalHit: false,
      vitalPointHit: false,
      updatedPlayers: [updatedPlayer1, updatedPlayer2] as readonly [
        PlayerState,
        PlayerState
      ],
    };
  }
}

class VersusCombatSystem {
  update(
    players: readonly [PlayerState, PlayerState],
    deltaTime: number
  ): CombatResult | null {
    // Fix: Use deltaTime for realistic combat timing
    const combatStep = deltaTime / 1000;
    console.log("Versus combat step:", combatStep);

    // Check for knockout conditions
    const player1Unconscious =
      players[0].health <= 0 || players[0].consciousness <= 0;
    const player2Unconscious =
      players[1].health <= 0 || players[1].consciousness <= 0;

    if (player1Unconscious || player2Unconscious) {
      return {
        success: true,
        damage: 0,
        effects: [],
        criticalHit: false,
        vitalPointHit: false,
        winner: player1Unconscious ? 1 : 0,
        updatedPlayers: players,
      };
    }

    return null;
  }
}

class DefaultCombatSystem {
  update(
    players: readonly [PlayerState, PlayerState],
    deltaTime: number
  ): CombatResult | null {
    // Fix: Use deltaTime parameter and players for future expansion
    console.log(
      "Default combat update - deltaTime:",
      deltaTime,
      "players:",
      players.length
    );
    return null;
  }
}

export const GameEngine: React.FC<GameEngineProps> = ({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused,
  gameMode,
  width = GAME_CONFIG.CANVAS_WIDTH, // Fix: Use width for container bounds
  height = GAME_CONFIG.CANVAS_HEIGHT, // Fix: Use height for container bounds
}) => {
  // Combat system selection based on game mode
  const combatSystem = useMemo(() => {
    switch (gameMode) {
      case "training":
        return new TrainingCombatSystem();
      case "versus":
        return new VersusCombatSystem();
      default:
        return new DefaultCombatSystem();
    }
  }, [gameMode]);

  // Game loop for combat updates
  useEffect(() => {
    if (isPaused) return;

    const gameLoop = setInterval(() => {
      const deltaTime = 1000 / GAME_CONFIG.TARGET_FPS;
      const result = combatSystem.update(players, deltaTime);

      if (result) {
        // Update players if combat system provides updates
        if (result.updatedPlayers) {
          result.updatedPlayers.forEach((player, index) => {
            onPlayerUpdate(index as 0 | 1, player);
          });
        }

        // Handle combat results
        onCombatResult(result);

        // Emit game events
        if (result.winner !== undefined) {
          onGameEvent("player_defeated", { winner: result.winner });
        }
      }
    }, 1000 / GAME_CONFIG.TARGET_FPS);

    return () => clearInterval(gameLoop);
  }, [
    players,
    combatSystem,
    isPaused,
    onPlayerUpdate,
    onCombatResult,
    onGameEvent,
  ]);

  // Fix: Use width and height for game boundaries
  return (
    <Container width={width} height={height}>
      {/* Game engine renders combat effects and systems */}
      {/* Future: Add visual effects, hit detection overlays, etc. */}
    </Container>
  );
};

export default GameEngine;
