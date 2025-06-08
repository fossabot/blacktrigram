import React, { useMemo } from "react";
import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import { KOREAN_COLORS, FONT_FAMILY, FONT_SIZES } from "../../types/constants";

export interface RoundTimerProps {
  readonly timeRemaining: number;
  readonly currentRound?: number; // Make optional if not always used
  readonly maxRounds?: number; // Make optional if not always used
  readonly showWarning?: boolean;
  readonly warningThreshold?: number;
  readonly x?: number;
  readonly y?: number;
}

export const RoundTimer: React.FC<RoundTimerProps> = ({
  timeRemaining,
  showWarning = true,
  warningThreshold = 30,
  x = 0,
  y = 0,
}) => {
  const isWarning = showWarning && timeRemaining <= warningThreshold;

  const timerStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.MONO,
        fontSize: FONT_SIZES.xxlarge,
        fill: isWarning
          ? KOREAN_COLORS.WARNING_ORANGE
          : KOREAN_COLORS.TEXT_PRIMARY,
        fontWeight: "bold",
        align: "center",
        stroke: KOREAN_COLORS.BLACK_SOLID,
      }),
    [isWarning]
  );

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Container x={x} y={y}>
      <Text text={formatTime(timeRemaining)} style={timerStyle} anchor={0.5} />
    </Container>
  );
};

export default RoundTimer;
