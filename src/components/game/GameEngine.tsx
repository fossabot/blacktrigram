import React, { useState, useCallback, useEffect } from "react";
import { Container } from "@pixi/react";
import type {
  PlayerState,
  GamePhase,
  TrigramStance,
  KoreanTechnique,
} from "../../types";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { GameUI } from "./GameUI";
import { Player } from "./Player";
import { DojangBackground } from "./DojangBackground";

export interface GameEngineProps {
  readonly players: [PlayerState, PlayerState];
  readonly gamePhase: GamePhase;
  readonly onPlayersChange: (players: [PlayerState, PlayerState]) => void;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onExit?: () => void;
}

export function GameEngine({
  players,
  gamePhase,
  onPlayersChange,
  onExit,
}: GameEngineProps): React.JSX.Element {
  const [currentRound] = useState<number>(1);
  const [timeRemaining] = useState<number>(90);
  const [combatLog] = useState<string[]>([]);

  const handleExit = useCallback(() => {
    onExit?.();
  }, [onExit]);

  const handleStanceChange = useCallback(
    (playerId: string, stance: TrigramStance) => {
      const playerIndex = players.findIndex((p) => p.playerId === playerId);
      if (playerIndex !== -1) {
        const newPlayers = [...players] as [PlayerState, PlayerState];
        const currentPlayer = players[playerIndex];

        if (!currentPlayer) return; // Guard against undefined

        // Create new player state with stance change
        newPlayers[playerIndex] = {
          ...currentPlayer,
          stance,
          lastStanceChangeTime: Date.now(),
        };
        onPlayersChange(newPlayers);
      }
    },
    [players, onPlayersChange]
  );

  const handlePlayerAttack = useCallback(
    (playerId: string, technique: KoreanTechnique) => {
      const attackerIndex = players.findIndex((p) => p.playerId === playerId);
      const defenderIndex = attackerIndex === 0 ? 1 : 0;

      if (attackerIndex !== -1 && attackerIndex < players.length) {
        const newPlayers = [...players] as [PlayerState, PlayerState];
        const attacker = players[attackerIndex];
        const defender = players[defenderIndex];

        if (!attacker || !defender) return; // Guard against undefined

        // Update attacker state
        newPlayers[attackerIndex] = {
          ...attacker,
          stamina: Math.max(0, attacker.stamina - (technique.staminaCost || 3)),
          ki: Math.max(0, attacker.ki - (technique.kiCost || 5)),
          isAttacking: true,
        };

        const damage = technique.damage || 10;
        // Update defender state
        newPlayers[defenderIndex] = {
          ...defender,
          health: Math.max(0, defender.health - damage),
          lastDamageTaken: damage,
        };

        onPlayersChange(newPlayers);
      }
    },
    [players, onPlayersChange]
  );

  useEffect(() => {
    if (gamePhase === "victory" || gamePhase === "defeat") {
      setTimeout(handleExit, 3000);
    }
  }, [gamePhase, handleExit]);

  return (
    <Container data-testid="game-container">
      <DojangBackground width={800} height={600} />

      {players.map((player) => {
        const technique = TrigramSystem.getTechniqueForStance(player.stance);

        return (
          <Player
            key={player.playerId}
            playerState={player}
            onStanceChange={(stance) =>
              handleStanceChange(player.playerId, stance)
            }
            onAttack={(attackTechnique) => {
              // Fix: ensure we only pass KoreanTechnique objects
              const finalTechnique = attackTechnique || technique;
              if (
                finalTechnique &&
                typeof finalTechnique === "object" &&
                "damage" in finalTechnique
              ) {
                handlePlayerAttack(
                  player.playerId,
                  finalTechnique as KoreanTechnique
                );
              }
            }}
          />
        );
      })}

      <GameUI
        players={players}
        gameTime={Date.now()}
        currentRound={currentRound}
        timeRemaining={timeRemaining}
        combatLog={combatLog}
      />
    </Container>
  );
}
