import React from "react";
import type { CombatHUDProps } from "../../../types/components";

export function CombatHUD({
  players,
  currentRound,
  timeRemaining,
  maxRounds = 3,
  gameTime = 0,
  isPlayerTurn = true,
  isPaused = false,
}: CombatHUDProps): React.JSX.Element {
  const [player1, player2] = players;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",
        background: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        color: "white",
      }}
    >
      {/* Player 1 stats */}
      <div>
        <div>{player1.name}</div>
        <div>
          체력: {player1.health}/{player1.maxHealth}
        </div>
      </div>

      {/* Game info */}
      <div style={{ textAlign: "center" }}>
        <div>
          {currentRound}라운드 / {maxRounds}
        </div>
        <div>남은 시간: {Math.max(0, timeRemaining)}초</div>
        <div>게임 시간: {gameTime}초</div>
        <div>턴: {isPlayerTurn ? "플레이어" : "상대방"}</div>
        {isPaused && <div>일시정지</div>}
      </div>

      {/* Player 2 stats */}
      <div style={{ textAlign: "right" }}>
        <div>{player2.name}</div>
        <div>
          체력: {player2.health}/{player2.maxHealth}
        </div>
      </div>
    </div>
  );
}

export default CombatHUD;
