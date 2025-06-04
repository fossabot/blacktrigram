import React, { useCallback } from "react";
import { Container } from "@pixi/react";
import { GameEngine } from "../../game/GameEngine";
import { DojangBackground } from "../../game/DojangBackground";
import { Player } from "../../game/Player";
import { HitEffectsLayer } from "../../game/HitEffectsLayer";
import type { PlayerState, HitEffect, CombatArenaProps } from "../../../types";

export function CombatArena({
  players,
  onPlayerUpdate,
  onTechniqueExecute,
  combatEffects,
  isExecutingTechnique,
  width = 800,
  height = 600,
}: CombatArenaProps): React.ReactElement {
  const [player1, player2] = players;

  const handlePlayerAttack = useCallback(
    (playerIndex: number) => {
      if (!isExecutingTechnique) {
        // Simple attack - in full game this would be more complex
        const currentPlayer = players[playerIndex];
        const opponentIndex = playerIndex === 0 ? 1 : 0;
        const opponent = players[opponentIndex];

        // Basic damage calculation
        const damage = Math.floor(Math.random() * 20) + 10;
        const newHealth = Math.max(0, opponent.health - damage);

        onPlayerUpdate(opponentIndex, { health: newHealth });
        onTechniqueExecute(playerIndex, { damage, target: opponentIndex });
      }
    },
    [players, isExecutingTechnique, onPlayerUpdate, onTechniqueExecute]
  );

  // Pass combat-specific props to the existing GameEngine
  // The GameEngine already handles DojangBackground, Player, and HitEffectsLayer
  return (
    <Container>
      <GameEngine
        players={players}
        gamePhase="combat"
        onPlayerUpdate={onPlayerUpdate}
        onGamePhaseChange={() => {}} // Not needed in arena context
      />

      {/* Dojang Background */}
      <DojangBackground
        width={width}
        height={height}
        timeOfDay="night"
        weather="clear"
      />

      {/* Player 1 */}
      <Player
        playerState={player1}
        playerIndex={0}
        onStateUpdate={(updates) => onPlayerUpdate(0, updates)}
        onAttack={() => handlePlayerAttack(0)}
        isPlayer1={true}
        archetype={player1.archetype}
        stance={player1.stance}
        position={{ x: width * 0.25, y: height * 0.6 }}
        facing="right"
        isAttacking={player1.isAttacking}
        health={player1.health}
        maxHealth={player1.maxHealth}
        ki={player1.ki}
        maxKi={player1.maxKi}
        stamina={player1.stamina}
        maxStamina={player1.maxStamina}
      />

      {/* Player 2 */}
      <Player
        playerState={player2}
        playerIndex={1}
        onStateUpdate={(updates) => onPlayerUpdate(1, updates)}
        onAttack={() => handlePlayerAttack(1)}
        isPlayer1={false}
        archetype={player2.archetype}
        stance={player2.stance}
        position={{ x: width * 0.75, y: height * 0.6 }}
        facing="left"
        isAttacking={player2.isAttacking}
        health={player2.health}
        maxHealth={player2.maxHealth}
        ki={player2.ki}
        maxKi={player2.maxKi}
        stamina={player2.stamina}
        maxStamina={player2.maxStamina}
      />

      {/* Hit Effects */}
      <HitEffectsLayer effects={combatEffects} />

      {/* Arena boundaries */}
      <Container>
        {/* Left boundary marker */}
        <Container x={50} y={height * 0.6}>
          {/* Boundary visual could go here */}
        </Container>

        {/* Right boundary marker */}
        <Container x={width - 50} y={height * 0.6}>
          {/* Boundary visual could go here */}
        </Container>
      </Container>
    </Container>
  );
}
