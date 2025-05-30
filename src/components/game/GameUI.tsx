import React, { useCallback } from "react";
import { Container, Text } from "@pixi/react";
import type { PlayerState, GameUIProps } from "../../types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY, TRIGRAM_DATA } from "../../types";

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
  // Enhanced helper functions for better data utilization
  const getHealthPercentage = useCallback((player: PlayerState): number => {
    return Math.max(0, Math.min(1, player.health / player.maxHealth));
  }, []);

  const getKiPercentage = useCallback((player: PlayerState): number => {
    return Math.max(0, Math.min(1, player.ki / player.maxKi));
  }, []);

  const getStaminaPercentage = useCallback((player: PlayerState): number => {
    return Math.max(0, Math.min(1, player.stamina / player.maxStamina));
  }, []);

  // Get stance information
  const getStanceInfo = useCallback((player: PlayerState) => {
    const stanceData = TRIGRAM_DATA[player.stance];
    return {
      korean: stanceData.koreanName,
      symbol: stanceData.symbol,
      element: stanceData.element,
      technique: stanceData.technique.koreanName,
    };
  }, []);

  // Format time display
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Get status color based on health
  const getHealthColor = useCallback((percentage: number): string => {
    if (percentage < 0.25) return KOREAN_COLORS.CRITICAL_RED;
    if (percentage < 0.5) return KOREAN_COLORS.Orange;
    return KOREAN_COLORS.WHITE;
  }, []);

  return (
    <Container data-testid="game-ui">
      {/* Enhanced round and timer display */}
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
          text={formatTime(timeRemaining)}
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

        {/* Game phase indicator */}
        <Text
          text={
            gamePhase === "combat"
              ? "전투 중"
              : gamePhase === "intro"
              ? "시작 대기"
              : "게임 진행"
          }
          anchor={{ x: 0.5, y: 0.5 }}
          y={60}
          alpha={0.8}
          style={{
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 14,
            fill: KOREAN_COLORS.CYAN,
          }}
        />
      </Container>

      {/* Enhanced Player 1 UI */}
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

        {/* Health display with enhanced info */}
        <Container y={25}>
          <Text
            text={`체력: ${players[0].health}/${players[0].maxHealth}`}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: getHealthColor(getHealthPercentage(players[0])),
            }}
          />

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

          {/* Last damage indicator */}
          {players[0].lastDamageTaken && players[0].lastDamageTaken > 0 && (
            <Text
              text={`최근 피해: ${players[0].lastDamageTaken}`}
              y={30}
              alpha={0.7}
              style={{
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 10,
                fill: KOREAN_COLORS.Red,
              }}
            />
          )}
        </Container>

        {/* Ki display */}
        <Container y={75}>
          <Text
            text={`기력: ${players[0].ki}/${players[0].maxKi}`}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.CYAN,
            }}
          />

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
        <Container y={110}>
          <Text
            text={`체력: ${players[0].stamina}/${players[0].maxStamina}`}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.YELLOW,
            }}
          />

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

        {/* Enhanced stance display */}
        <Container y={145}>
          {(() => {
            const stanceInfo = getStanceInfo(players[0]);
            return (
              <>
                <Text
                  text={`자세: ${stanceInfo.korean}`}
                  style={{
                    fontFamily: KOREAN_FONT_FAMILY,
                    fontSize: 14,
                    fill: KOREAN_COLORS.GOLD,
                  }}
                />
                <Text
                  text={`${stanceInfo.symbol} (${stanceInfo.element})`}
                  y={15}
                  style={{
                    fontFamily: "serif",
                    fontSize: 12,
                    fill: KOREAN_COLORS.WHITE,
                  }}
                />
                <Text
                  text={`기술: ${stanceInfo.technique}`}
                  y={30}
                  alpha={0.8}
                  style={{
                    fontFamily: KOREAN_FONT_FAMILY,
                    fontSize: 10,
                    fill: KOREAN_COLORS.CYAN,
                  }}
                />
              </>
            );
          })()}
        </Container>

        {/* Combat stats */}
        <Container y={195}>
          <Text
            text={`콤보: ${players[0].comboCount || 0}`}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 12,
              fill: KOREAN_COLORS.Orange,
            }}
          />

          {players[0].facing && (
            <Text
              text={`방향: ${players[0].facing === "left" ? "←" : "→"}`}
              y={15}
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fill: KOREAN_COLORS.WHITE,
              }}
            />
          )}

          {/* Movement state */}
          <Text
            text={
              players[0].isMoving
                ? "이동 중"
                : players[0].isBlocking
                ? "방어 중"
                : players[0].isAttacking
                ? "공격 중"
                : "대기"
            }
            y={30}
            alpha={0.7}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 10,
              fill: players[0].isAttacking
                ? KOREAN_COLORS.Red
                : players[0].isBlocking
                ? KOREAN_COLORS.Blue
                : KOREAN_COLORS.WHITE,
            }}
          />
        </Container>
      </Container>

      {/* Enhanced Player 2 UI (mirrored layout) */}
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
              fill: getHealthColor(getHealthPercentage(players[1])),
            }}
          />

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

          {players[1].lastDamageTaken && players[1].lastDamageTaken > 0 && (
            <Text
              text={`최근 피해: ${players[1].lastDamageTaken}`}
              anchor={{ x: 1, y: 0 }}
              y={30}
              alpha={0.7}
              style={{
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 10,
                fill: KOREAN_COLORS.Red,
              }}
            />
          )}
        </Container>

        {/* Ki display */}
        <Container y={75}>
          <Text
            text={`기력: ${players[1].ki}/${players[1].maxKi}`}
            anchor={{ x: 1, y: 0 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.CYAN,
            }}
          />

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
        <Container y={110}>
          <Text
            text={`체력: ${players[1].stamina}/${players[1].maxStamina}`}
            anchor={{ x: 1, y: 0 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 14,
              fill: KOREAN_COLORS.YELLOW,
            }}
          />

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

        {/* Enhanced stance display */}
        <Container y={145}>
          {(() => {
            const stanceInfo = getStanceInfo(players[1]);
            return (
              <>
                <Text
                  text={`자세: ${stanceInfo.korean}`}
                  anchor={{ x: 1, y: 0 }}
                  style={{
                    fontFamily: KOREAN_FONT_FAMILY,
                    fontSize: 14,
                    fill: KOREAN_COLORS.GOLD,
                  }}
                />
                <Text
                  text={`${stanceInfo.symbol} (${stanceInfo.element})`}
                  anchor={{ x: 1, y: 0 }}
                  y={15}
                  style={{
                    fontFamily: "serif",
                    fontSize: 12,
                    fill: KOREAN_COLORS.WHITE,
                  }}
                />
                <Text
                  text={`기술: ${stanceInfo.technique}`}
                  anchor={{ x: 1, y: 0 }}
                  y={30}
                  alpha={0.8}
                  style={{
                    fontFamily: KOREAN_FONT_FAMILY,
                    fontSize: 10,
                    fill: KOREAN_COLORS.CYAN,
                  }}
                />
              </>
            );
          })()}
        </Container>

        {/* Combat stats */}
        <Container y={195}>
          <Text
            text={`콤보: ${players[1].comboCount || 0}`}
            anchor={{ x: 1, y: 0 }}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 12,
              fill: KOREAN_COLORS.Orange,
            }}
          />

          {players[1].facing && (
            <Text
              text={`방향: ${players[1].facing === "left" ? "←" : "→"}`}
              anchor={{ x: 1, y: 0 }}
              y={15}
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fill: KOREAN_COLORS.WHITE,
              }}
            />
          )}

          <Text
            text={
              players[1].isMoving
                ? "이동 중"
                : players[1].isBlocking
                ? "방어 중"
                : players[1].isAttacking
                ? "공격 중"
                : "대기"
            }
            anchor={{ x: 1, y: 0 }}
            y={30}
            alpha={0.7}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 10,
              fill: players[1].isAttacking
                ? KOREAN_COLORS.Red
                : players[1].isBlocking
                ? KOREAN_COLORS.Blue
                : KOREAN_COLORS.WHITE,
            }}
          />
        </Container>
      </Container>

      {/* Enhanced combat log */}
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
            alpha={0.9 - index * 0.15}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 12,
              fill: KOREAN_COLORS.WHITE,
            }}
          />
        ))}
      </Container>

      {/* Game controls with context-sensitive instructions */}
      <Container x={600} y={700}>
        {gamePhase === "intro" && (
          <Text
            text="스페이스바: 게임 시작"
            anchor={{ x: 0.5, y: 0.5 }}
            interactive={true}
            onPointerDown={onStartMatch}
            alpha={0.9}
            style={{
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 16,
              fill: KOREAN_COLORS.GOLD,
              fontWeight: "bold",
            }}
          />
        )}

        {gamePhase === "combat" && (
          <>
            <Text
              text="P: 일시정지 | R: 리셋"
              anchor={{ x: 0.5, y: 0.5 }}
              alpha={0.7}
              style={{
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 14,
                fill: KOREAN_COLORS.WHITE,
              }}
            />
            <Text
              text="1-8: 팔괘 자세 변경 | 스페이스: 공격"
              anchor={{ x: 0.5, y: 0.5 }}
              y={20}
              alpha={0.6}
              style={{
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 12,
                fill: KOREAN_COLORS.CYAN,
              }}
            />
          </>
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

      {/* Game phase specific overlays */}
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

      {/* Enhanced status effects display */}
      {players[0].conditions.length > 0 && (
        <Container x={50} y={280}>
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
              text={`• ${condition.type} (${Math.ceil(
                condition.duration / 1000
              )}초)`}
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
        <Container x={1000} y={280}>
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
              text={`• ${condition.type} (${Math.ceil(
                condition.duration / 1000
              )}초)`}
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

      {/* Position and velocity debug info (only in training mode) */}
      {gamePhase === "training" && (
        <Container x={400} y={750}>
          <Text
            text={`P1 위치: (${Math.round(players[0].position.x)}, ${Math.round(
              players[0].position.y
            )})`}
            alpha={0.5}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.GRAY_MEDIUM,
            }}
          />
          <Text
            text={`P2 위치: (${Math.round(players[1].position.x)}, ${Math.round(
              players[1].position.y
            )})`}
            y={12}
            alpha={0.5}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.GRAY_MEDIUM,
            }}
          />
          <Text
            text={`거리: ${Math.round(
              Math.abs(players[0].position.x - players[1].position.x)
            )}px`}
            y={24}
            alpha={0.5}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              fill: KOREAN_COLORS.GRAY_MEDIUM,
            }}
          />
        </Container>
      )}
    </Container>
  );
}
