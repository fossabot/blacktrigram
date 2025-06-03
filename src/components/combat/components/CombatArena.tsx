import React from "react";
import { GameEngine } from "../../game/GameEngine";
import type { CombatArenaProps } from "../../../types";

export function CombatArena({
  players,
  onPlayerUpdate,
  isExecutingTechnique,
}: CombatArenaProps): React.ReactElement {
  // Pass combat-specific props to the existing GameEngine
  // The GameEngine already handles DojangBackground, Player, and HitEffectsLayer
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GameEngine
        players={players}
        gamePhase="combat"
        onPlayerUpdate={onPlayerUpdate}
        onGamePhaseChange={() => {}} // Not needed in arena context
      />

      {/* Additional combat-specific overlays can go here */}
      {isExecutingTechnique && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            pointerEvents: "none",
            animation: "flash 0.2s ease-out",
          }}
        />
      )}
    </div>
  );
}
