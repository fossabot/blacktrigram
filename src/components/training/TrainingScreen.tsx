import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrainingScreenProps, KoreanText } from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  GAME_CONFIG,
} from "../../types/constants";
import { ProgressTracker } from "../ui/ProgressTracker";

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  players,
  selectedStance = "geon",
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const player = players?.[0];

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Training dojo atmosphere
      g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 0.3);
      g.drawRect(50, 50, width - 100, height - 100);
    },
    [width, height]
  );

  const headerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.large,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const instructionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        align: "center",
        wordWrap: true,
        wordWrapWidth: width - 100,
      }),
    [width]
  );

  const stanceStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.PRIMARY_CYAN,
        align: "center",
      }),
    []
  );

  if (!player) {
    return (
      <Container>
        <Text
          text="훈련 모드를 위한 플레이어가 필요합니다"
          style={headerStyle}
          x={width / 2}
          y={height / 2}
          anchor={0.5}
        />
      </Container>
    );
  }

  // Create proper KoreanText objects for labels
  const healthLabel: KoreanText = { korean: "체력", english: "Health" };
  const kiLabel: KoreanText = { korean: "기", english: "Ki" };
  const staminaLabel: KoreanText = { korean: "체력", english: "Stamina" };

  return (
    <Container>
      <Graphics draw={backgroundDraw} />

      {/* Training Header */}
      <Text
        text="훈련 모드 (Training Mode)"
        style={headerStyle}
        x={width / 2}
        y={80}
        anchor={0.5}
      />

      {/* Player Stats */}
      {player && (
        <Container x={50} y={150}>
          <ProgressTracker
            label={healthLabel}
            current={player.health}
            maximum={player.maxHealth}
            x={0}
            y={0}
            width={300}
            height={20}
          />

          <ProgressTracker
            label={kiLabel}
            current={player.ki}
            maximum={player.maxKi}
            x={0}
            y={40}
            width={300}
            height={20}
          />

          <ProgressTracker
            label={staminaLabel}
            current={player.stamina}
            maximum={player.maxStamina}
            x={0}
            y={80}
            width={300}
            height={20}
          />
        </Container>
      )}

      {/* Training Instructions */}
      <Text
        text="자세를 선택하고 기술을 연습하세요\nSelect stance and practice techniques"
        style={instructionStyle}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
      />

      {/* Current Stance Display */}
      <Text
        text={`현재 자세: ${selectedStance} / Current Stance: ${selectedStance}`}
        style={stanceStyle}
        x={width / 2}
        y={height - 100}
        anchor={0.5}
      />

      {/* Training Controls */}
      <Text
        text="1-8: 팔괘 자세 변경 / Change Trigram Stance\nSPACE: 기술 연습 / Practice Technique"
        style={instructionStyle}
        x={width / 2}
        y={height - 60}
        anchor={0.5}
      />
    </Container>
  );
};

export default TrainingScreen;
