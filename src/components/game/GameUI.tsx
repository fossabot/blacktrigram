import React from "react";
import type { GameUIProps } from "../../types";

export function GameUI({
  players,
  gameTime,
  currentRound,
  gamePhase,
  timeRemaining = 120,
  isPaused = false,
  onStanceChange,
  onPlayerUpdate,
  onGamePhaseChange,
  onPauseToggle,
  combatLog = [],
  showDebug = false,
}: GameUIProps): React.JSX.Element {
  // Use the props to avoid unused variable warnings
  const player1 = players[0];
  const player2 = players[1];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStanceChange = (playerIndex: 0 | 1, stance: any) => {
    onStanceChange(playerIndex, stance);
  };

  const handlePlayerUpdate = (index: number, updates: any) => {
    onPlayerUpdate(index, updates);
  };

  const handlePhaseChange = (phase: string) => {
    onGamePhaseChange(phase);
  };

  const handlePauseToggle = () => {
    onPauseToggle?.();
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1rem",
        background: "rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          Round {currentRound} | Time: {formatTime(timeRemaining)} | Game Time:{" "}
          {gameTime}ms
        </div>
        <div>
          Phase: {gamePhase} {isPaused && "| PAUSED"}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <div>
          <div>
            {player1?.name}: {player1?.health}/{player1?.maxHealth} HP
          </div>
          <div>Stance: {player1?.stance}</div>
        </div>
        <div>
          <div>
            {player2?.name}: {player2?.health}/{player2?.maxHealth} HP
          </div>
          <div>Stance: {player2?.stance}</div>
        </div>
      </div>

      {showDebug && (
        <div style={{ marginTop: "1rem", fontSize: "0.8rem" }}>
          <div>Combat Log: {combatLog.length} entries</div>
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => handleStanceChange(0, "geon")}>P1 Geon</button>
        <button
          onClick={() =>
            handlePlayerUpdate(0, {
              health: player1?.health ? player1.health - 10 : 90,
            })
          }
        >
          P1 -10 HP
        </button>
        <button onClick={handlePauseToggle}>
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button onClick={() => handlePhaseChange("menu")}>Menu</button>
      </div>
    </div>
  );
}
