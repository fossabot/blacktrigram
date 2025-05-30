import { useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { ReactElement } from "react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS, TRIGRAM_DATA, type PlayerState } from "../../types";

interface PlayerVisualsProps {
  player: PlayerState;
  isLocalPlayer?: boolean;
}

export function PlayerVisuals({
  player,
  isLocalPlayer = false,
}: PlayerVisualsProps): ReactElement {
  const showHealthBar = true; // Add missing variable
  const showStanceIndicator = true; // Add missing variable

  const uniformColor = isLocalPlayer
    ? KOREAN_COLORS.PLAYER_1_BLUE
    : KOREAN_COLORS.WHITE;

  const drawPlayer = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Player body
      g.setFillStyle({ color: uniformColor });
      g.rect(-15, -40, 30, 80);
      g.fill();

      // Stance aura
      const trigramData = TRIGRAM_DATA[player.stance];
      if (trigramData) {
        g.setStrokeStyle({
          color: trigramData.color,
          width: 3,
          alpha: 0.7,
        });
        g.circle(0, 0, 50);
        g.stroke();
      }
    },
    [player.stance, uniformColor]
  );

  const drawHealthBar = useCallback(
    (g: PixiGraphics) => {
      if (!showHealthBar) return;

      g.clear();

      const barWidth = 40;
      const barHeight = 4;
      const healthPercent = player.health / player.maxHealth;

      // Background
      g.setFillStyle({ color: KOREAN_COLORS.GRAY_DARK, alpha: 0.8 });
      g.rect(-barWidth / 2, 0, barWidth, barHeight);
      g.fill();

      // Health
      const healthColor =
        healthPercent > 0.6
          ? KOREAN_COLORS.Green
          : healthPercent > 0.3
          ? KOREAN_COLORS.Orange
          : KOREAN_COLORS.Red;
      g.setFillStyle({ color: healthColor, alpha: 0.9 });
      g.rect(-barWidth / 2, 0, barWidth * healthPercent, barHeight);
      g.fill();

      // Border
      g.setStrokeStyle({ color: KOREAN_COLORS.WHITE, width: 1 });
      g.rect(-barWidth / 2, 0, barWidth, barHeight);
      g.stroke();
    },
    [player.health, player.maxHealth, showHealthBar]
  );

  return (
    <Container x={player.position.x} y={player.position.y}>
      {/* Main player graphics */}
      <Graphics draw={drawPlayer} />

      {/* Health bar */}
      <Container y={-75}>
        <Graphics draw={drawHealthBar} />
      </Container>

      {/* Player ID label */}
      <Text
        text={player.playerId}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-90}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 10,
          fill: KOREAN_COLORS.PLAYER_1_BLUE,
        }}
      />

      {/* Stance indicator */}
      {showStanceIndicator && (
        <Container y={50}>
          <Text
            text={`${TRIGRAM_DATA[player.stance].symbol} ${
              TRIGRAM_DATA[player.stance].koreanName
            }`}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              fontFamily: "Noto Sans KR, Arial, sans-serif",
              fontSize: 14,
              fill: isLocalPlayer
                ? KOREAN_COLORS.PLAYER_1_BLUE
                : KOREAN_COLORS.PLAYER_2_RED,
              fontWeight: "bold",
            }}
          />
        </Container>
      )}

      {/* Ki level indicator */}
      <Container y={-65}>
        <Text
          text={`기 ${Math.round(player.ki)}/${player.maxKi}`}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 8,
            fill: KOREAN_COLORS.CYAN,
          }}
        />
      </Container>
    </Container>
  );
}
