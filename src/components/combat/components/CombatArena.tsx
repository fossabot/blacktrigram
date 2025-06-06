import React from "react";
import { Container as PixiContainer } from "@pixi/react"; // Use PixiContainer for PIXI.Container
import Player from "../../../components/game/Player"; // Keep one Player import
import type { CombatArenaProps } from "../../../types";
import { HitEffectsLayer } from "../../../components/game/HitEffectsLayer";

export const CombatArena: React.FC<CombatArenaProps> = ({
  players,
  onPlayerUpdate,
  combatEffects,
  isExecutingTechnique,
  showVitalPoints,
  showDebugInfo,
}: CombatArenaProps): React.JSX.Element => {
  if (!players || players.length < 2) {
    return <></>; // Return a fragment instead of null
  }

  const player1 = players[0];
  const player2 = players[1];

  if (!player1 || !player2) {
    // console.error("CombatArena: Player data is missing.");
    return <></>; // Or a loading indicator
  }

  // Memoize player visuals to prevent unnecessary re-renders
  return (
    <PixiContainer>
      {/* Player 1 */}
      <Player
        playerState={player1}
        playerIndex={0}
        x={player1.position.x}
        y={player1.position.y}
        position={player1.position} // Add missing position prop
        showVitalPoints={showVitalPoints}
        onStateUpdate={(updates) => onPlayerUpdate(0, updates)}
        archetype={player1.archetype}
        stance={player1.currentStance}
        facing={player1.facing}
        health={player1.health}
        maxHealth={player1.maxHealth}
        ki={player1.ki}
        maxKi={player1.maxKi}
        stamina={player1.stamina}
        maxStamina={player1.maxStamina}
        isAttacking={isExecutingTechnique && player1.id === "attacker1"} // Example logic
        // onAttack might be needed if Player component handles attack initiation
      />

      {/* Player 2 */}
      <Player
        playerState={player2}
        playerIndex={1}
        x={player2.position.x}
        y={player2.position.y}
        position={player2.position} // Add missing position prop
        showVitalPoints={showVitalPoints}
        onStateUpdate={(updates) => onPlayerUpdate(1, updates)}
        archetype={player2.archetype}
        stance={player2.currentStance}
        facing={player2.facing}
        health={player2.health}
        maxHealth={player2.maxHealth}
        ki={player2.ki}
        maxKi={player2.maxKi}
        stamina={player2.stamina}
        maxStamina={player2.maxStamina}
        isAttacking={isExecutingTechnique && player2.id === "attacker2"} // Example logic
        // onAttack might be needed
      />

      <HitEffectsLayer effects={combatEffects} />

      {showDebugInfo && (
        <PixiContainer>
          {/* Debug text can be added here using Pixi Text component */}
        </PixiContainer>
      )}
    </PixiContainer>
  );
};
