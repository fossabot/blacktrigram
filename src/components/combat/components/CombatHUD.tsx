import React from "react";
import type { CombatHUDProps } from "../../../types";
import { KOREAN_COLORS } from "../../../types";
import { KoreanText } from "../../ui/base/korean-text/KoreanText";

export function CombatHUD({
  players,
  timeRemaining,
  currentRound,
  isPaused = false,
}: CombatHUDProps): React.ReactElement {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getHealthColor = (ratio: number): string => {
    if (ratio > 0.6)
      return `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`;
    if (ratio > 0.3)
      return `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`;
    return `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(6, "0")}`;
  };

  const accentColor = KOREAN_COLORS.GOLD;

  const renderPlayerHUD = (player: any, index: number, isLeft: boolean) => (
    <div
      style={{
        position: "absolute",
        top: "20px",
        [isLeft ? "left" : "right"]: "20px",
        width: "280px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        border: `2px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(
          6,
          "0"
        )}`,
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "Noto Sans KR, Arial, sans-serif",
        color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
      }}
    >
      {/* Player name and archetype */}
      <div style={{ marginBottom: "12px" }}>
        <KoreanText
          korean={player.name || `플레이어 ${index + 1}`}
          english={player.archetype?.toUpperCase() || "WARRIOR"}
          style={{ fontSize: "16px", fontWeight: "bold" }}
        />
      </div>

      {/* Health bar */}
      <div style={{ marginBottom: "8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
          }}
        >
          <span>체력 (Health)</span>
          <span>
            {player.health}/{player.maxHealth}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
            overflow: "hidden",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              width: `${(player.health / player.maxHealth) * 100}%`,
              height: "100%",
              backgroundColor: getHealthColor(player.health / player.maxHealth),
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Ki bar */}
      <div style={{ marginBottom: "8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
          }}
        >
          <span>기력 (Ki)</span>
          <span>
            {player.ki}/{player.maxKi}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
            overflow: "hidden",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              width: `${(player.ki / player.maxKi) * 100}%`,
              height: "100%",
              backgroundColor: `#${KOREAN_COLORS.DOJANG_BLUE.toString(
                16
              ).padStart(6, "0")}`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Stamina bar */}
      <div style={{ marginBottom: "8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
          }}
        >
          <span>체력 (Stamina)</span>
          <span>
            {player.stamina}/{player.maxStamina}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "15px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
            overflow: "hidden",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              width: `${(player.stamina / player.maxStamina) * 100}%`,
              height: "100%",
              backgroundColor: `#${KOREAN_COLORS.GOLD.toString(16).padStart(
                6,
                "0"
              )}`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Current stance */}
      <div
        style={{
          fontSize: "14px",
          textAlign: "center",
          marginTop: "8px",
        }}
      >
        <KoreanText
          korean={`현재 자세: ${player.stance}`}
          english={`Stance: ${player.stance.toUpperCase()}`}
          style={{ fontSize: "12px" }}
        />
      </div>
    </div>
  );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {/* Player HUDs */}
      {renderPlayerHUD(players[0], 0, true)}
      {renderPlayerHUD(players[1], 1, false)}

      {/* Center timer */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          border: `2px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(
            6,
            "0"
          )}`,
          borderRadius: "8px",
          padding: "12px 24px",
          textAlign: "center",
          fontFamily: "Noto Sans KR, Arial, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color:
              timeRemaining < 10
                ? `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(
                    6,
                    "0"
                  )}`
                : `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
          }}
        >
          {formatTime(timeRemaining)}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
            marginTop: "4px",
          }}
        >
          라운드 {currentRound}
        </div>
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            border: `3px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(
              6,
              "0"
            )}`,
            borderRadius: "12px",
            padding: "24px 48px",
            textAlign: "center",
          }}
        >
          <KoreanText
            korean="일시정지"
            english="PAUSED"
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
            }}
          />
        </div>
      )}
    </div>
  );
}
