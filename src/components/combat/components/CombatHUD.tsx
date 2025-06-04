import React from "react";
import type { Container, Graphics, Text } from "pixi.js";
import {
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Text as PixiText,
} from "@pixi/react";
import type { PlayerState } from "../../../types";
import { KOREAN_COLORS } from "../../../types/constants";
import { KoreanText } from "../../ui/base/korean-text";
import { convertKoreanColorForCSS } from "../../../utils/colorUtils";

interface CombatHUDProps {
  readonly player: PlayerState;
  readonly opponent: PlayerState;
  readonly currentRound: number; // Added missing prop
  readonly maxRounds: number; // Added missing prop
  readonly gameTime: number; // Added missing prop
  readonly isPlayerTurn: boolean; // Added missing prop
  readonly phase: "preparation" | "active" | "paused" | "finished"; // Added missing prop
}

export const CombatHUD: React.FC<CombatHUDProps> = ({
  player,
  opponent,
  currentRound,
  maxRounds,
  gameTime,
  isPlayerTurn,
  phase,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        left: 0,
        right: 0,
        height: "120px",
        background: `linear-gradient(180deg, ${KOREAN_COLORS.BLACK}dd, transparent)`,
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        zIndex: 100,
      }}
    >
      {/* Player Stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          minWidth: "300px",
        }}
      >
        <KoreanText
          korean={`플레이어: ${player.name}`}
          english={`Player: ${player.name}`}
          size="medium"
          weight="semibold"
          color={convertKoreanColorForCSS(KOREAN_COLORS.CYAN)}
        />

        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              background: `linear-gradient(90deg, ${KOREAN_COLORS.TRADITIONAL_RED}, transparent)`,
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            체력: {player.health}/{player.maxHealth}
          </div>

          <div
            style={{
              background: `linear-gradient(90deg, ${KOREAN_COLORS.GOLD}, transparent)`,
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            기: {player.ki}/{player.maxKi}
          </div>

          <div
            style={{
              background: `linear-gradient(90deg, ${KOREAN_COLORS.CYAN}, transparent)`,
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            체력: {player.stamina}/{player.maxStamina}
          </div>
        </div>
      </div>

      {/* Center Game Info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <KoreanText
          korean={`${currentRound}라운드 / ${maxRounds}`}
          english={`Round ${currentRound} / ${maxRounds}`}
          size="large"
          weight="bold"
          color={convertKoreanColorForCSS(KOREAN_COLORS.GOLD)}
        />

        <div
          style={{
            fontSize: "18px",
            color: convertKoreanColorForCSS(KOREAN_COLORS.WHITE),
            fontFamily: "monospace",
          }}
        >
          {formatTime(gameTime)}
        </div>

        <div
          style={{
            fontSize: "14px",
            color: isPlayerTurn
              ? convertKoreanColorForCSS(KOREAN_COLORS.CYAN)
              : convertKoreanColorForCSS(KOREAN_COLORS.TRADITIONAL_RED),
            fontWeight: "bold",
          }}
        >
          {isPlayerTurn ? "플레이어 턴 (Your Turn)" : "상대 턴 (Opponent Turn)"}
        </div>

        <div
          style={{
            fontSize: "12px",
            color: convertKoreanColorForCSS(KOREAN_COLORS.GOLD),
            opacity: 0.8,
          }}
        >
          상태:{" "}
          {phase === "active"
            ? "전투 중"
            : phase === "preparation"
            ? "준비 중"
            : "일시정지"}
        </div>
      </div>

      {/* Opponent Stats */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          minWidth: "300px",
          alignItems: "flex-end",
        }}
      >
        <KoreanText
          korean={`상대: ${opponent.name}`}
          english={`Opponent: ${opponent.name}`}
          size="medium"
          weight="semibold"
          color={convertKoreanColorForCSS(KOREAN_COLORS.TRADITIONAL_RED)}
        />

        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              background: `linear-gradient(90deg, transparent, ${KOREAN_COLORS.TRADITIONAL_RED})`,
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {opponent.health}/{opponent.maxHealth} :체력
          </div>

          <div
            style={{
              background: `linear-gradient(90deg, transparent, ${KOREAN_COLORS.GOLD})`,
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {opponent.ki}/{opponent.maxKi} :기
          </div>

          <div
            style={{
              background: `linear-gradient(90deg, transparent, ${KOREAN_COLORS.CYAN})`,
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {opponent.stamina}/{opponent.maxStamina} :체력
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatHUD;
