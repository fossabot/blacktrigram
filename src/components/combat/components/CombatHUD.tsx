import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import { HealthBar } from "../../ui/HealthBar";
import { KOREAN_COLORS } from "../../../types/constants";
import type { PlayerState } from "../../../types/player";
import * as PIXI from "pixi.js";

export interface CombatHUDProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly currentRound?: number;
  readonly timeRemaining?: number;
  readonly width?: number;
  readonly height?: number;
}

export const CombatHUD: React.FC<CombatHUDProps> = ({
  player1,
  player2,
  currentRound = 1,
  timeRemaining = 60,
  width = 800,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer data-testid="combat-hud">
      {/* Player 1 Health Bar - Top Left */}
      <pixiContainer x={20} y={20}>
        <HealthBar
          health={player1.health}
          maxHealth={player1.maxHealth}
          width={200}
          height={20}
          showText={true}
        />
        <pixiText
          text={`${player1.archetype} - ${player1.currentStance}`}
          style={
            new PIXI.TextStyle({
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            })
          }
          y={-18}
        />
      </pixiContainer>

      {/* Round/Time Info - Center */}
      <pixiText
        text={`라운드 ${currentRound} | 시간: ${timeRemaining}초`}
        style={
          new PIXI.TextStyle({
            fontSize: 18,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontWeight: "bold",
          })
        }
        x={width / 2}
        y={20}
        anchor={0.5}
      />

      {/* Player 2 Health Bar - Top Right */}
      <pixiContainer x={width - 220} y={20}>
        <HealthBar
          health={player2.health}
          maxHealth={player2.maxHealth}
          width={200}
          height={20}
          showText={true}
        />
        <pixiText
          text={`${player2.archetype} - ${player2.currentStance}`}
          style={
            new PIXI.TextStyle({
              fontSize: 14,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            })
          }
          y={-18}
          anchor={1}
        />
      </pixiContainer>

      {/* Ki/Energy Bars */}
      <pixiContainer x={20} y={50}>
        <pixiText
          text={`기: ${Math.round(player1.ki)}/${player1.maxKi}`}
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.PRIMARY_CYAN,
            })
          }
        />
      </pixiContainer>

      <pixiContainer x={width - 120} y={50}>
        <pixiText
          text={`기: ${Math.round(player2.ki)}/${player2.maxKi}`}
          style={
            new PIXI.TextStyle({
              fontSize: 12,
              fill: KOREAN_COLORS.PRIMARY_CYAN,
            })
          }
          anchor={1}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default CombatHUD;
