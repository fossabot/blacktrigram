import React, { useState, useCallback } from "react";
import { Stage } from "@pixi/react";
import { GameEngine } from "./GameEngine";
import { KoreanHeader } from "../ui/base/KoreanHeader";
import type { GameUIProps } from "../../types";
import { KOREAN_COLORS } from "../../types";

export function GameUI({
  players,
  gamePhase,
  onGamePhaseChange,
  gameTime,
  currentRound,
  timeRemaining,
  onStanceChange,
  combatLog,
  onStartMatch,
  onResetMatch,
  onTogglePause,
  onPlayerUpdate,
}: GameUIProps): React.ReactElement {
  const [showDebug, setShowDebug] = useState(false);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  const gameContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `#${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")}`,
    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
  };

  const headerStyle: React.CSSProperties = {
    padding: "1rem",
    borderBottom: `2px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(
      6,
      "0"
    )}`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const gameAreaStyle: React.CSSProperties = {
    flex: 1,
    position: "relative",
    minHeight: "600px",
  };

  const uiOverlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 10,
  };

  const playerStatsStyle: React.CSSProperties = {
    position: "absolute",
    top: "20px",
    left: "20px",
    right: "20px",
    display: "flex",
    justifyContent: "space-between",
    pointerEvents: "auto",
  };

  const playerStatBoxStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "1rem",
    borderRadius: "8px",
    border: `2px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
    minWidth: "200px",
  };

  const healthBarStyle = (
    health: number,
    maxHealth: number
  ): React.CSSProperties => {
    const percentage = (health / maxHealth) * 100;
    const color =
      percentage > 60 ? "#00ff00" : percentage > 30 ? "#ffff00" : "#ff0000";

    return {
      width: "100%",
      height: "8px",
      backgroundColor: "#333",
      borderRadius: "4px",
      overflow: "hidden",
      position: "relative",
      marginTop: "4px",
    };
  };

  const healthFillStyle = (
    health: number,
    maxHealth: number
  ): React.CSSProperties => {
    const percentage = (health / maxHealth) * 100;
    const color =
      percentage > 60 ? "#00ff00" : percentage > 30 ? "#ffff00" : "#ff0000";

    return {
      width: `${percentage}%`,
      height: "100%",
      backgroundColor: color,
      transition: "width 0.3s ease",
    };
  };

  const combatLogStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    right: "20px",
    maxHeight: "150px",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    border: `1px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
    borderRadius: "4px",
    padding: "1rem",
    overflow: "auto",
    pointerEvents: "auto",
  };

  const renderPlayerStats = (player: (typeof players)[0], index: number) => (
    <div key={index} style={playerStatBoxStyle}>
      <div
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        플레이어 {index + 1} ({player.stance})
      </div>
      <div>
        체력: {player.health}/{player.maxHealth}
        <div style={healthBarStyle(player.health, player.maxHealth)}>
          <div style={healthFillStyle(player.health, player.maxHealth)} />
        </div>
      </div>
      <div style={{ marginTop: "0.5rem" }}>
        기력: {player.ki}/{player.maxKi}
      </div>
      <div>
        체력: {player.stamina}/{player.maxStamina}
      </div>
      <div style={{ fontSize: "0.9rem", marginTop: "0.5rem", opacity: 0.8 }}>
        상태: {player.combatState}
      </div>
    </div>
  );

  return (
    <div style={gameContainerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <KoreanHeader
          title="흑괘 무술 도장"
          subtitle="Black Trigram Combat"
          level={2}
        />

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            라운드 {currentRound}
          </div>
          <div
            style={{
              fontSize: "2rem",
              color: timeRemaining < 10 ? "#ff0000" : "#ffffff",
            }}
          >
            {formatTime(timeRemaining)}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={onStartMatch}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(
                16
              ).padStart(6, "0")}`,
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            시작
          </button>
          <button
            onClick={onResetMatch}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: `#${KOREAN_COLORS.TRADITIONAL_RED.toString(
                16
              ).padStart(6, "0")}`,
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            리셋
          </button>
          <button
            onClick={onTogglePause}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: `#${KOREAN_COLORS.SILVER.toString(16).padStart(
                6,
                "0"
              )}`,
              color: "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            일시정지
          </button>
          <button
            onClick={() => onGamePhaseChange("intro")}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: `#${KOREAN_COLORS.ACCENT_BLUE.toString(
                16
              ).padStart(6, "0")}`,
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            메뉴
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div style={gameAreaStyle}>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight - 100}
          options={{
            backgroundColor: KOREAN_COLORS.DARK_BLUE,
            antialias: true,
          }}
        >
          <GameEngine
            players={players}
            gamePhase={gamePhase}
            onPlayerUpdate={onPlayerUpdate}
            onGamePhaseChange={onGamePhaseChange}
          />
        </Stage>

        {/* UI Overlay */}
        <div style={uiOverlayStyle}>
          {/* Player Stats */}
          <div style={playerStatsStyle}>
            {renderPlayerStats(players[0], 0)}
            {renderPlayerStats(players[1], 1)}
          </div>

          {/* Combat Log */}
          <div style={combatLogStyle}>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              전투 로그:
            </div>
            {combatLog.slice(-5).map((log, index) => (
              <div
                key={index}
                style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
