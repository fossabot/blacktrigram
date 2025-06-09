// Complete game engine for Black Trigram Korean martial arts

import React, { useEffect, useCallback, useRef } from "react";
import type {
  GameEngineProps,
  PlayerState,
  CombatResult,
  KoreanTechnique,
} from "../../types";
import { CombatSystem } from "../../systems/CombatSystem";
import { GAME_CONFIG } from "../../types/constants";
import { GameMode } from "../../types/enums";

export const GameEngine: React.FC<GameEngineProps> = ({
  players,
  onPlayerUpdate,
  onCombatResult,
  onGameEvent,
  isPaused = false,
  gameMode = GameMode.VERSUS, // Fix: Use gameMode
}) => {
  const combatSystemRef = useRef<CombatSystem>(new CombatSystem());
  const lastUpdateRef = useRef<number>(Date.now());

  // Game loop - different behavior based on game mode
  useEffect(() => {
    if (isPaused) return;

    const gameLoop = () => {
      const now = Date.now();
      const deltaTime = now - lastUpdateRef.current;
      lastUpdateRef.current = now;

      // Update player states
      const updatedPlayers = players.map((player, index) => {
        const updatedPlayer = combatSystemRef.current.updatePlayerState(
          player,
          deltaTime
        );

        if (JSON.stringify(updatedPlayer) !== JSON.stringify(player)) {
          onPlayerUpdate(index as 0 | 1, updatedPlayer);
        }

        return updatedPlayer;
      });

      // Apply game mode specific logic
      if (gameMode === GameMode.TRAINING) {
        // Training mode - no knockout conditions
        onCombatResult({
          success: true,
          damage: 0,
          effects: [],
          criticalHit: false,
          vitalPointHit: false,
          hit: true,
          updatedPlayers: updatedPlayers as readonly PlayerState[],
          message: {
            korean: "훈련 모드",
            english: "Training Mode",
          },
        });
        return;
      }

      // Check for knockout conditions in combat modes
      const player1Unconscious = updatedPlayers[0].consciousness <= 0;
      const player2Unconscious = updatedPlayers[1].consciousness <= 0;

      if (player1Unconscious || player2Unconscious) {
        const winResult: CombatResult = {
          success: true,
          damage: 0,
          effects: [],
          criticalHit: false,
          vitalPointHit: false,
          hit: true,
          winner: player1Unconscious ? 1 : 0,
          updatedPlayers: updatedPlayers as readonly PlayerState[],
          message: {
            korean: player1Unconscious
              ? "플레이어 2 승리!"
              : "플레이어 1 승리!",
            english: player1Unconscious ? "Player 2 Wins!" : "Player 1 Wins!",
          },
        };

        onCombatResult(winResult);
        return;
      }

      // Regular game state update
      const result: CombatResult = {
        success: true,
        damage: 0,
        effects: [],
        criticalHit: false,
        vitalPointHit: false,
        hit: true,
        updatedPlayers: updatedPlayers as readonly PlayerState[],
        message: {
          korean: "게임 진행 중",
          english: "Game in progress",
        },
      };

      onCombatResult(result);
    };

    const intervalId = setInterval(gameLoop, 1000 / GAME_CONFIG.FPS);
    return () => clearInterval(intervalId);
  }, [isPaused, players, onPlayerUpdate, onCombatResult, gameMode]);

  // Handle combat events
  const handleCombatEvent = useCallback(
    (
      attacker: PlayerState,
      defender: PlayerState,
      technique: KoreanTechnique
    ) => {
      const result = combatSystemRef.current.executeAttack(
        attacker,
        defender,
        technique
      );

      if (result.updatedPlayers) {
        result.updatedPlayers.forEach((player: PlayerState, index: number) => {
          onPlayerUpdate(index as 0 | 1, player);
        });
      }

      onCombatResult(result);

      if (result.winner !== undefined) {
        onGameEvent("player_defeated", { winner: result.winner });
      }
    },
    [onPlayerUpdate, onCombatResult, onGameEvent]
  );

  // Expose combat system for external use
  useEffect(() => {
    (window as any).triggerCombatEvent = handleCombatEvent;
    (window as any).combatSystem = combatSystemRef.current;

    return () => {
      delete (window as any).triggerCombatEvent;
      delete (window as any).combatSystem;
    };
  }, [handleCombatEvent]);

  return null;
};

export default GameEngine;
