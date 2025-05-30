import React, { useCallback } from "react";
import { Container, Text } from "@pixi/react";
import type { PlayerState, GamePhase, TrigramStance } from "../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../types";

export interface GameUIProps {
  readonly players: [PlayerState, PlayerState]; // Changed from readonly array
  readonly gamePhase: GamePhase;
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly combatLog: readonly string[];
  readonly onStartMatch: () => void;
  readonly onResetMatch: () => void;
  readonly onTogglePause: () => void;
}

export function GameUI({
  players,
  gamePhase,
  currentRound,
  timeRemaining,
  combatLog,
  onStartMatch,
  onResetMatch,
  onTogglePause,
}: GameUIProps): React.ReactElement {
  // Health bar visualization helper
  const getHealthPercentage = useCallback((player: PlayerState): number => {
    return Math.max(0, Math.min(1, player.health / player.maxHealth));
  }, []);

  // Ki bar visualization helper
  const getKiPercentage = useCallback((player: PlayerState): number => {
    return Math.max(0, Math.min(1, player.ki / player.maxKi));
  }, []);

  // Stamina bar visualization helper
  const getStaminaPercentage = useCallback((player: PlayerState): number => {
    return Math.max(0, Math.min(1, player.stamina / player.maxStamina));
  }, []);

  return (
    <Container data-testid="game-ui">
      {/* Round timer */}
      <Container x={600} y={30}>
        <Text
          text={`라운드 ${currentRound}`}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 24,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
          }}
        />

        <Text
          text={`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60)
            .toString()
            .padStart(2, "0")}`}
          anchor={{ x: 0.5, y: 0.5 }}
          y={30}
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 32,
            fill:
              timeRemaining < 10
                ? KOREAN_COLORS.CRITICAL_RED
                : KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
      </Container>

      {/* Player 1 UI */}
      <Container x={50} y={50}>
        <Text
          text={players[0].playerId}
          style={{
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 18,
            fill: KOREAN_COLORS.PLAYER_1_BLUE,
            fontWeight: "bold",
          }}
        />

        {/* Health display */}
        <Container y={25}>
          <Text
            text={`체력: ${players[0].health}/${players[0].maxHealth}`}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill:
                getHealthPercentage(players[0]) < 0.3
                  ? KOREAN_COLORS.CRITICAL_RED
                  : KOREAN_COLORS.WHITE,
            }}
          />

          {/* Health bar representation */}
          <Text
            text={`[${"█".repeat(
              Math.floor(getHealthPercentage(players[0]) * 20)
            )}${"░".repeat(
              20 - Math.floor(getHealthPercentage(players[0]) * 20)
            )}]`}
            y={15}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.CRITICAL_RED,
            }}
          />
        </Container>

        {/* Ki display */}
        <Container y={60}>
          <Text
            text={`기력: ${players[0].ki}/${players[0].maxKi}`}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.CYAN,
            }}
          />

          {/* Ki bar representation */}
          <Text
            text={`[${"█".repeat(
              Math.floor(getKiPercentage(players[0]) * 20)
            )}${"░".repeat(
              20 - Math.floor(getKiPercentage(players[0]) * 20)
            )}]`}
            y={15}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.CYAN,
            }}
          />
        </Container>

        {/* Stamina display */}
        <Container y={95}>
          <Text
            text={`체력: ${players[0].stamina}/${players[0].maxStamina}`}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.YELLOW,
            }}
          />

          {/* Stamina bar representation */}
          <Text
            text={`[${"█".repeat(
              Math.floor(getStaminaPercentage(players[0]) * 20)
            )}${"░".repeat(
              20 - Math.floor(getStaminaPercentage(players[0]) * 20)
            )}]`}
            y={15}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.YELLOW,
            }}
          />
        </Container>

        {/* Current stance */}
        <Container y={130}>
          <Text
            text={`자세: ${players[0].stance.toUpperCase()}`}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.GOLD,
            }}
          />
        </Container>
      </Container>

      {/* Player 2 UI */}
      <Container x={1000} y={50}>
        <Text
          text={players[1].playerId}
          anchor={{ x: 1, y: 0 }}
          style={{
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 18,
            fill: KOREAN_COLORS.PLAYER_2_RED,
            fontWeight: "bold",
          }}
        />

        {/* Health display */}
        <Container y={25}>
          <Text
            text={`체력: ${players[1].health}/${players[1].maxHealth}`}
            anchor={{ x: 1, y: 0 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill:
                getHealthPercentage(players[1]) < 0.3
                  ? KOREAN_COLORS.CRITICAL_RED
                  : KOREAN_COLORS.WHITE,
            }}
          />

          {/* Health bar representation */}
          <Text
            text={`[${"█".repeat(
              Math.floor(getHealthPercentage(players[1]) * 20)
            )}${"░".repeat(
              20 - Math.floor(getHealthPercentage(players[1]) * 20)
            )}]`}
            anchor={{ x: 1, y: 0 }}
            y={15}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.CRITICAL_RED,
            }}
          />
        </Container>

        {/* Ki display */}
        <Container y={60}>
          <Text
            text={`기력: ${players[1].ki}/${players[1].maxKi}`}
            anchor={{ x: 1, y: 0 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.CYAN,
            }}
          />

          {/* Ki bar representation */}
          <Text
            text={`[${"█".repeat(
              Math.floor(getKiPercentage(players[1]) * 20)
            )}${"░".repeat(
              20 - Math.floor(getKiPercentage(players[1]) * 20)
            )}]`}
            anchor={{ x: 1, y: 0 }}
            y={15}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.CYAN,
            }}
          />
        </Container>

        {/* Stamina display */}
        <Container y={95}>
          <Text
            text={`체력: ${players[1].stamina}/${players[1].maxStamina}`}
            anchor={{ x: 1, y: 0 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.YELLOW,
            }}
          />

          {/* Stamina bar representation */}
          <Text
            text={`[${"█".repeat(
              Math.floor(getStaminaPercentage(players[1]) * 20)
            )}${"░".repeat(
              20 - Math.floor(getStaminaPercentage(players[1]) * 20)
            )}]`}
            anchor={{ x: 1, y: 0 }}
            y={15}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.YELLOW,
            }}
          />
        </Container>

        {/* Current stance */}
        <Container y={130}>
          <Text
            text={`자세: ${players[1].stance.toUpperCase()}`}
            anchor={{ x: 1, y: 0 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.GOLD,
            }}
          />
        </Container>
      </Container>

      {/* Combat log */}
      <Container x={50} y={600}>
        <Text
          text="전투 기록"
          style={{
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 16,
            fill: KOREAN_COLORS.GOLD,
            fontWeight: "bold",
          }}
        />

        {combatLog.slice(-5).map((entry, index) => (
          <Text
            key={`log-${index}`}
            text={entry}
            y={25 + index * 20}
            alpha={0.8 - index * 0.1} // Move alpha outside style
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 12,
              fill: KOREAN_COLORS.WHITE,
            }}
          />
        ))}
      </Container>

      {/* Game controls */}
      <Container x={600} y={700}>
        {gamePhase === "intro" && (
          <Text
            text="스페이스바: 게임 시작"
            anchor={{ x: 0.5, y: 0.5 }}
            interactive={true}
            onPointerDown={onStartMatch}
            alpha={0.9} // Move alpha outside style
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 16,
              fill: KOREAN_COLORS.GOLD,
              fontWeight: "bold",
            }}
          />
        )}

        {gamePhase === "combat" && (
          <Text
            text="P: 일시정지 | R: 리셋"
            anchor={{ x: 0.5, y: 0.5 }}
            alpha={0.7} // Move alpha outside style
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.WHITE,
            }}
          />
        )}

        {(gamePhase === "result" ||
          gamePhase === "victory" ||
          gamePhase === "defeat") && (
          <Container>
            <Text
              text="R: 다시 시작"
              anchor={{ x: 0.5, y: 0.5 }}
              interactive={true}
              onPointerDown={onResetMatch}
              style={{
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 16,
                fill: KOREAN_COLORS.GOLD,
                fontWeight: "bold",
              }}
            />

            <Text
              text="스페이스바: 계속"
              anchor={{ x: 0.5, y: 0.5 }}
              y={25}
              interactive={true}
              onPointerDown={onTogglePause}
              style={{
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 16,
                fill: KOREAN_COLORS.WHITE,
              }}
            />
          </Container>
        )}
      </Container>

      {/* Game phase indicator */}
      {gamePhase !== "combat" && (
        <Container x={600} y={400}>
          <Text
            text={
              gamePhase === "victory"
                ? "승리!"
                : gamePhase === "defeat"
                ? "패배!"
                : gamePhase === "result"
                ? "라운드 종료"
                : gamePhase === "intro"
                ? "흑괘 무술 대전"
                : "준비 중..."
            }
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 48,
              fill:
                gamePhase === "victory"
                  ? KOREAN_COLORS.GOLD
                  : gamePhase === "defeat"
                  ? KOREAN_COLORS.CRITICAL_RED
                  : KOREAN_COLORS.WHITE,
              fontWeight: "bold",
              dropShadow: {
                color: KOREAN_COLORS.BLACK,
                distance: 4,
                angle: Math.PI / 4,
                alpha: 0.8,
                blur: 2,
              },
            }}
          />
        </Container>
      )}

      {/* Stance change hints */}
      {gamePhase === "combat" && (
        <Container x={600} y={750}>
          <Text
            text="1-8: 팔괘 자세 변경"
            anchor={{ x: 0.5, y: 0.5 }}
            alpha={0.6} // Move alpha outside style
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 12,
              fill: KOREAN_COLORS.WHITE,
            }}
          />
        </Container>
      )}

      {/* Status effects display for both players */}
      {players[0].conditions.length > 0 && (
        <Container x={50} y={170}>
          <Text
            text="상태 효과:"
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 12,
              fill: KOREAN_COLORS.GOLD,
            }}
          />
          {players[0].conditions.slice(0, 3).map((condition, index) => (
            <Text
              key={`p1-condition-${index}`}
              text={`• ${condition.type}`}
              y={15 + index * 12}
              style={{
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 10,
                fill: KOREAN_COLORS.Orange,
              }}
            />
          ))}
        </Container>
      )}

      {players[1].conditions.length > 0 && (
        <Container x={1000} y={170}>
          <Text
            text="상태 효과:"
            anchor={{ x: 1, y: 0 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 12,
              fill: KOREAN_COLORS.GOLD,
            }}
          />
          {players[1].conditions.slice(0, 3).map((condition, index) => (
            <Text
              key={`p2-condition-${index}`}
              text={`• ${condition.type}`}
              anchor={{ x: 1, y: 0 }}
              y={15 + index * 12}
              style={{
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 10,
                fill: KOREAN_COLORS.Orange,
              }}
            />
          ))}
        </Container>
      )}
    </Container>
  );
}
