import { useCallback } from "react";
import { Stage } from "@pixi/react";
import { GameEngine } from "./GameEngine";
import { TrigramWheel } from "../ui/TrigramWheel";
import { ProgressTracker } from "../ui/ProgressTracker";
import { KoreanHeader } from "../ui/KoreanHeader";
import type { GameUIProps, PlayerState } from "../../types";
import { KOREAN_COLORS } from "../../types";

export function GameUI({
  players,
  gamePhase,
  onGamePhaseChange,
  currentRound,
  timeRemaining,
  onStanceChange,
  combatLog,
  onStartMatch,
  onResetMatch,
  onTogglePause,
}: GameUIProps): React.ReactElement {
  const [player1, player2] = players;

  const handleStanceChange = useCallback(
    (stance: Parameters<typeof onStanceChange>[1]) => {
      onStanceChange(0, stance);
    },
    [onStanceChange]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: `linear-gradient(135deg, ${KOREAN_COLORS.DARK_BLUE}, ${KOREAN_COLORS.BLACK})`,
        display: "flex",
        flexDirection: "column",
        color: KOREAN_COLORS.WHITE,
      }}
    >
      {/* Header */}
      <KoreanHeader
        title="흑괘 무술 대전"
        subtitle="Black Trigram Combat"
        currentRound={currentRound}
        timeRemaining={timeRemaining}
      />

      {/* Main Game Area */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Left UI Panel */}
        <div
          style={{
            width: "200px",
            padding: "1rem",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <ProgressTracker
            label="체력 (Health)"
            current={player1.health}
            maximum={player1.maxHealth}
            currentStance={player1.stance}
          />
          <ProgressTracker
            label="기 (Ki)"
            current={player1.ki}
            maximum={player1.maxKi}
            currentStance={player1.stance}
          />
          <ProgressTracker
            label="체력 (Stamina)"
            current={player1.stamina}
            maximum={player1.maxStamina}
            currentStance={player1.stance}
          />

          <TrigramWheel
            selectedStance={player1.stance}
            onStanceChange={handleStanceChange}
            playerKi={player1.ki}
            playerMaxKi={player1.maxKi}
            radius={80}
            isEnabled={gamePhase === "combat"}
          />
        </div>

        {/* Game Canvas */}
        <div style={{ flex: 1, position: "relative" }}>
          <Stage
            width={800}
            height={600}
            options={{
              backgroundColor: KOREAN_COLORS.DARK_BLUE,
              antialias: true,
            }}
          >
            <GameEngine
              players={players}
              gamePhase={gamePhase}
              onGamePhaseChange={onGamePhaseChange}
              onPlayerUpdate={(
                playerIndex: number,
                updates: Partial<PlayerState>
              ) => {
                // Handle player updates
                console.log(`Player ${playerIndex} updated:`, updates);
              }}
              onStanceChange={onStanceChange}
            />
          </Stage>

          {/* Game Controls Overlay */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "1rem",
            }}
          >
            <button
              onClick={onStartMatch}
              style={{
                background: KOREAN_COLORS.TRADITIONAL_RED,
                color: KOREAN_COLORS.WHITE,
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              시작 (Start)
            </button>
            <button
              onClick={onTogglePause}
              style={{
                background: KOREAN_COLORS.GOLD,
                color: KOREAN_COLORS.BLACK,
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              일시정지 (Pause)
            </button>
            <button
              onClick={onResetMatch}
              style={{
                background: KOREAN_COLORS.GRAY_MEDIUM,
                color: KOREAN_COLORS.WHITE,
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              재시작 (Reset)
            </button>
          </div>
        </div>

        {/* Right UI Panel */}
        <div
          style={{
            width: "200px",
            padding: "1rem",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <ProgressTracker
            label="상대 체력"
            current={player2.health}
            maximum={player2.maxHealth}
            currentStance={player2.stance}
          />

          {/* Combat Log */}
          <div style={{ marginTop: "2rem" }}>
            <h4 style={{ color: KOREAN_COLORS.CYAN, marginBottom: "0.5rem" }}>
              전투 기록
            </h4>
            <div
              style={{
                height: "200px",
                overflowY: "auto",
                fontSize: "0.8rem",
                lineHeight: "1.4",
              }}
            >
              {combatLog.slice(-10).map((entry, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "0.25rem", opacity: 0.8 }}
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
