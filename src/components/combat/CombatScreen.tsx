import React, { useEffect, useState } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { CombatSystem } from "../../systems/CombatSystem";
import { BaseButton } from "../ui/base/BaseButton";
import { GAME_CONFIG } from "../../types/constants/game";
import { KOREAN_COLORS } from "../../types/constants/colors";
import type { PlayerState, GamePhase } from "../../types"; // Fix: Add GamePhase import
import { useAudio } from "../../audio/AudioProvider";

interface CombatScreenProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onPlayerUpdate?: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly onReturnToMenu?: () => void;
  readonly gamePhase?: GamePhase; // Fix: Now properly imported
  readonly onGamePhaseChange?: (phase: GamePhase) => void; // Fix: Now properly imported
  readonly timeRemaining?: number;
  readonly isPaused?: boolean; // Fix: Add missing prop
  readonly width?: number; // Fix: Add missing prop
  readonly height?: number; // Fix: Add missing prop
}

export const CombatScreen: React.FC<CombatScreenProps> = ({
  players,
  // Fix: Remove unused onPlayerUpdate
  onReturnToMenu,
  timeRemaining = 120,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const [roundTimer, setRoundTimer] = useState(timeRemaining);

  const audioManager = useAudio();

  // Handle timer countdown
  useEffect(() => {
    setRoundTimer(timeRemaining);

    if (timeRemaining <= 10 && timeRemaining > 0) {
      audioManager.playSFX("countdown");
    }
  }, [timeRemaining, audioManager]);

  // Check for win conditions
  useEffect(() => {
    const winner = CombatSystem.checkWinCondition([...players]); // Fix: Spread readonly array
    if (winner) {
      console.log(`Winner detected: ${winner}`);
      // In a full implementation, this would trigger game phase change
    }
  }, [players]);

  return (
    <Container width={width} height={height}>
      {/* Background */}
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
          g.drawRect(0, 0, width, height);
          g.endFill();

          // Cyberpunk grid
          g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.3);
          const gridSize = 50;
          for (let i = 0; i <= width; i += gridSize) {
            g.moveTo(i, 0);
            g.lineTo(i, height);
          }
          for (let j = 0; j <= height; j += gridSize) {
            g.moveTo(0, j);
            g.lineTo(width, j);
          }
        }}
      />

      {/* Back button */}
      {onReturnToMenu && (
        <BaseButton
          text="메뉴로 (Menu)"
          onClick={onReturnToMenu}
          x={20}
          y={20}
          width={120}
          height={40}
          variant="secondary"
        />
      )}

      {/* Combat arena */}
      <Container x={width / 2} y={height / 2}>
        {/* Player displays */}
        {players.map((player, index) => (
          <Container key={player.id} x={index === 0 ? -200 : 200} y={0}>
            {/* Simple player representation */}
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                g.beginFill(
                  index === 0
                    ? KOREAN_COLORS.PLAYER_1_COLOR
                    : KOREAN_COLORS.PLAYER_2_COLOR
                );
                g.drawRect(-25, -50, 50, 100);
                g.endFill();
              }}
            />

            {/* Player name */}
            <Text
              text={player.name.korean}
              anchor={0.5}
              x={0}
              y={-70}
              style={
                new PIXI.TextStyle({
                  fontSize: 16,
                  fill: KOREAN_COLORS.TEXT_PRIMARY,
                })
              }
            />
          </Container>
        ))}
      </Container>

      {/* Timer display */}
      <Container x={width / 2} y={50}>
        <Text
          text={`${Math.floor(roundTimer / 60)}:${(roundTimer % 60)
            .toString()
            .padStart(2, "0")}`}
          anchor={0.5}
          style={
            new PIXI.TextStyle({
              fontSize: 24,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
            })
          }
        />
      </Container>

      {/* Combat controls */}
      <Container x={20} y={height - 100}>
        <Text
          text="1-8: 팔괘 자세 / SPACE: 기술 실행"
          style={
            new PIXI.TextStyle({
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            })
          }
        />
      </Container>
    </Container>
  );
};

export default CombatScreen;
