import React, { useCallback } from "react";
import { Stage } from "@pixi/react";
import { GameEngine } from "./GameEngine";
import { KoreanHeader } from "../ui/base/KoreanHeader";
import type { GameUIProps } from "../../types";
import type { PlayerState } from "../../types/player";
import { KOREAN_COLORS } from "../../types";

export function GameUI({
  players,
  gamePhase,
  onGamePhaseChange,
  currentRound,
  timeRemaining = 0,
  combatLog = [],
  onStartMatch,
  onResetMatch,
  onTogglePause,
  onPlayerUpdate,
}: GameUIProps): React.ReactElement {
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Bilingual stance display
  const stanceDisplay = (stance: string) => {
    const map: Record<string, { korean: string; english: string }> = {
      geon: { korean: "건", english: "GEON" },
      tae: { korean: "태", english: "TAE" },
      li: { korean: "리", english: "LI" },
      jin: { korean: "진", english: "JIN" },
      son: { korean: "손", english: "SON" },
      gam: { korean: "감", english: "GAM" },
      gan: { korean: "간", english: "GAN" },
      gon: { korean: "곤", english: "GON" },
    };
    return `${map[stance]?.korean ?? stance} (${
      map[stance]?.english ?? stance.toUpperCase()
    })`;
  };

  // Render player stats with bilingual and status effects
  const renderPlayerStats = (player: PlayerState, index: number) => (
    <div
      key={index}
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        padding: "1rem",
        borderRadius: 8,
        border: `2px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(
          6,
          "0"
        )}`,
        minWidth: 200,
        color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
        fontFamily: "Noto Sans KR, Arial, sans-serif",
      }}
    >
      <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: 8 }}>
        {player.name ?? `플레이어 ${index + 1}`}
        <br />
        <span style={{ fontSize: "1rem", opacity: 0.8 }}>
          자세: {stanceDisplay(player.stance)}
        </span>
      </div>
      <div>
        체력: {player.health}/{player.maxHealth}
      </div>
      <div>
        기력: {player.ki}/{player.maxKi}
      </div>
      <div>
        스태미나: {player.stamina}/{player.maxStamina}
      </div>
      {player.conditions && player.conditions.length > 0 && (
        <div style={{ marginTop: 8 }}>
          상태 효과:
          <br />
          {player.conditions.map((cond: any, i: number) => (
            <span key={i} style={{ fontSize: "0.9rem" }}>
              • {typeof cond === "string" ? cond : cond.type}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  // Render combat log (bilingual if possible)
  const renderCombatLog = () => (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        maxHeight: 150,
        backgroundColor: "rgba(0,0,0,0.9)",
        border: `1px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(
          6,
          "0"
        )}`,
        borderRadius: 4,
        padding: "1rem",
        overflow: "auto",
        pointerEvents: "auto",
        color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
        fontFamily: "Noto Sans KR, Arial, sans-serif",
      }}
    >
      <div style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 8 }}>
        전투 기록
      </div>
      {combatLog.slice(-5).map((log, i) => (
        <div key={i} style={{ fontSize: "0.95rem", marginBottom: 4 }}>
          {typeof log === "string" ? log : log.korean ?? log.english}
        </div>
      ))}
    </div>
  );

  // Render controls for each phase
  const renderControls = () => {
    if (gamePhase === "intro") {
      return (
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
          }}
        >
          <div>스페이스바: 게임 시작</div>
          <div>1-8: 팔괘 자세 선택</div>
          <div>ESC: 메뉴</div>
        </div>
      );
    }
    if (gamePhase === "combat") {
      return (
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`,
          }}
        >
          <div>P: 일시정지 | R: 리셋</div>
          <div>1-8: 팔괘 자세 변경</div>
        </div>
      );
    }
    if (gamePhase === "victory" || gamePhase === "defeat") {
      return (
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
          }}
        >
          <div>R: 다시 시작</div>
          <div>스페이스바: 계속</div>
          <div>라운드 종료</div>
        </div>
      );
    }
    return null;
  };

  // Render victory/defeat message
  const renderResultMessage = () => {
    if (gamePhase === "victory") {
      return (
        <div
          style={{
            fontSize: "2.2rem",
            color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
            textAlign: "center",
            margin: 16,
          }}
        >
          승리!
        </div>
      );
    }
    if (gamePhase === "defeat") {
      return (
        <div
          style={{
            fontSize: "2.2rem",
            color: `#${KOREAN_COLORS.TRADITIONAL_RED.toString(16).padStart(
              6,
              "0"
            )}`,
            textAlign: "center",
            margin: 16,
          }}
        >
          패배!
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: `#${KOREAN_COLORS.BLACK.toString(16).padStart(
          6,
          "0"
        )}`,
        color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
        fontFamily: "Noto Sans KR, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem",
          borderBottom: `2px solid #${KOREAN_COLORS.CYAN.toString(16).padStart(
            6,
            "0"
          )}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            시작 (Start)
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
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            리셋 (Reset)
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
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            일시정지 (Pause)
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
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            메뉴 (Menu)
          </button>
        </div>
      </div>
      {/* Game Area */}
      <div style={{ flex: 1, position: "relative", minHeight: 600 }}>
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {/* Player Stats */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 20,
              right: 20,
              display: "flex",
              justifyContent: "space-between",
              pointerEvents: "auto",
            }}
          >
            {renderPlayerStats(players[0], 0)}
            {renderPlayerStats(players[1], 1)}
          </div>
          {/* Combat Log */}
          {renderCombatLog()}
          {/* Controls */}
          {renderControls()}
          {/* Result Message */}
          {renderResultMessage()}
        </div>
      </div>
    </div>
  );
}
