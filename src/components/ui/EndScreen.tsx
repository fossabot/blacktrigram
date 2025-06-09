import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { EndScreenProps } from "../../types/components";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  FONT_WEIGHTS,
} from "../../types/constants";
import { BaseButton } from "./base/BaseButton";

export const EndScreen: React.FC<EndScreenProps> = ({
  winner,
  matchStatistics,
  onReturnToMenu,
  onPlayAgain, // Fix: Add optional onPlayAgain prop
  width = 800,
  height = 600,
  x = 0,
  y = 0,
}) => {
  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        fontWeight: FONT_WEIGHTS.bold.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
        dropShadow: {
          color: KOREAN_COLORS.BLACK_SOLID,
          blur: 8,
          angle: Math.PI / 4,
          distance: 4,
        },
      }),
    []
  );

  const backgroundDraw = useMemo(
    () => (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.95);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Victory border effect
      g.lineStyle(4, KOREAN_COLORS.ACCENT_GOLD, 0.8);
      g.drawRect(20, 20, width - 40, height - 40);
    },
    [width, height]
  );

  const isVictory = winner !== null;
  const resultText = isVictory ? "승리!" : "무승부";
  const resultTextEn = isVictory ? "Victory!" : "Draw";

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />

      {/* Victory/Draw Title */}
      <Text
        text={`${resultText} / ${resultTextEn}`}
        style={titleStyle}
        x={width / 2}
        y={height / 4}
        anchor={0.5}
      />

      {/* Winner Information */}
      {winner && (
        <Text
          text={`${winner.name.korean} 승리 / ${winner.name.english} Wins`}
          style={
            new PIXI.TextStyle({
              fontFamily: FONT_FAMILY.PRIMARY,
              fontSize: FONT_SIZES.xlarge,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            })
          }
          x={width / 2}
          y={height / 3}
          anchor={0.5}
        />
      )}

      {/* Match Statistics */}
      {matchStatistics && (
        <Container x={width / 2} y={height / 2}>
          <Text
            text={`라운드: ${matchStatistics.roundsWon?.player1 || 0} - ${
              matchStatistics.roundsWon?.player2 || 0
            } / Rounds: ${matchStatistics.roundsWon?.player1 || 0} - ${
              matchStatistics.roundsWon?.player2 || 0
            }`}
            style={
              new PIXI.TextStyle({
                fontFamily: FONT_FAMILY.MONO,
                fontSize: FONT_SIZES.medium,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
                align: "center",
              })
            }
            anchor={0.5}
            y={0}
          />
        </Container>
      )}

      {/* Buttons */}
      <Container x={width / 2 - 100} y={height - 100}>
        <BaseButton
          text="메뉴로 돌아가기"
          onClick={onReturnToMenu}
          width={200}
          height={50}
          variant="primary"
        />

        {onPlayAgain && (
          <BaseButton
            text="다시 플레이"
            onClick={onPlayAgain}
            width={200}
            height={50}
            variant="secondary"
            y={60}
          />
        )}
      </Container>
    </Container>
  );
};

export default EndScreen;
