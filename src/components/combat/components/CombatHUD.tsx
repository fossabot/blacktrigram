import React from "react";
import type { PlayerState, TrigramStance } from "../../../types";
import { KoreanText } from "../../ui/base/korean-text/KoreanText";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../../types/constants";

interface CombatHUDProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly gameTime: number;
}

export function CombatHUD({
  player1,
  player2,
  currentRound,
  maxRounds,
  gameTime,
}: CombatHUDProps): React.JSX.Element {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  const getHealthBarColor = (health: number, maxHealth: number) => {
    const percentage = health / maxHealth;
    if (percentage > 0.6) return KOREAN_COLORS.GREEN;
    if (percentage > 0.3) return KOREAN_COLORS.YELLOW;
    return KOREAN_COLORS.RED;
  };

  const PlayerStatsPanel = ({
    player,
    isLeft,
  }: {
    player: PlayerState;
    isLeft: boolean;
  }) => (
    <div
      style={{
        position: "absolute",
        [isLeft ? "left" : "right"]: "1rem",
        top: "1rem",
        width: "300px",
        background: "rgba(0, 0, 0, 0.8)",
        border: `2px solid #${KOREAN_COLORS.GOLD.toString(16)}`,
        borderRadius: "8px",
        padding: "1rem",
        color: "#ffffff",
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
      }}
    >
      <KoreanText
        korean={player.name}
        english={`(${player.archetype})`}
        size="medium"
        weight={700}
        style={{ marginBottom: "0.5rem" }}
      />

      {/* Health Bar */}
      <div style={{ marginBottom: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
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
            height: "12px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(player.health / player.maxHealth) * 100}%`,
              height: "100%",
              background: `#${getHealthBarColor(
                player.health,
                player.maxHealth
              ).toString(16)}`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Ki Bar */}
      <div style={{ marginBottom: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
          }}
        >
          <span>기 (Ki)</span>
          <span>
            {player.ki}/{player.maxKi}
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "10px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(player.ki / player.maxKi) * 100}%`,
              height: "100%",
              background: `#${KOREAN_COLORS.CYAN.toString(16)}`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Stamina Bar */}
      <div style={{ marginBottom: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
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
            height: "8px",
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(player.stamina / player.maxStamina) * 100}%`,
              height: "100%",
              background: `#${KOREAN_COLORS.GREEN.toString(16)}`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* Current Stance */}
      <div
        style={{
          background: `#${
            KOREAN_COLORS[
              player.stance as keyof typeof KOREAN_COLORS
            ]?.toString(16) || KOREAN_COLORS.WHITE.toString(16)
          }20`,
          padding: "0.5rem",
          borderRadius: "4px",
          marginTop: "0.5rem",
        }}
      >
        <KoreanText
          korean={`${TRIGRAM_DATA[player.stance].symbol} ${
            TRIGRAM_DATA[player.stance].name.korean
          }`}
          english={TRIGRAM_DATA[player.stance].name.english}
          size="small"
          weight={600}
        />
      </div>
    </div>
  );

  return (
    <>
      <PlayerStatsPanel player={player1} isLeft={true} />
      <PlayerStatsPanel player={player2} isLeft={false} />

      {/* Center HUD */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.9)",
          border: `2px solid #${KOREAN_COLORS.GOLD.toString(16)}`,
          borderRadius: "8px",
          padding: "1rem 2rem",
          color: "#ffffff",
          textAlign: "center",
          fontFamily: '"Noto Sans KR", Arial, sans-serif',
        }}
      >
        <KoreanText
          korean="흑괘 무술 경기장"
          english="Black Trigram Combat Arena"
          size="large"
          weight={700}
          style={{ marginBottom: "0.5rem" }}
        />
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <span>
            라운드 {currentRound}/{maxRounds}
          </span>
          <span>시간: {formatTime(gameTime)}</span>
        </div>
      </div>
    </>
  );
}
