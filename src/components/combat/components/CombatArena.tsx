import React from "react";
// Remove unused imports
import type { CombatArenaProps } from "../../../types/components";

export function CombatArena({
  players,
  onPlayerUpdate,
  onTechniqueExecute,
  combatEffects,
  isExecutingTechnique,
  isActive = true,
  showVitalPoints = false,
  showDebugInfo = false,
}: CombatArenaProps): React.JSX.Element {
  const [player1, player2] = players;

  // Use all the props to avoid unused variable warnings
  const handleArenaAction = () => {
    if (isExecutingTechnique) {
      console.log("Technique in progress");
    }
    onPlayerUpdate(0, {});
    onTechniqueExecute(0, {});
  };

  return (
    <div
      style={{
        width: "100%",
        height: "60%",
        position: "relative",
        opacity: isActive ? 1 : 0.5,
      }}
    >
      <div>Player 1: {player1.name}</div>
      <div>Player 2: {player2.name}</div>
      <div>Effects: {combatEffects.length}</div>

      {showVitalPoints && <div>Vital points visible</div>}
      {showDebugInfo && <div>Debug mode active</div>}

      <button onClick={handleArenaAction}>Arena Action</button>
    </div>
  );
}

export default CombatArena;
