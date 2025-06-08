import React, { useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrainingScreenProps } from "../../types/components";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  GAME_CONFIG,
} from "../../types/constants";
import { ProgressTracker } from "../ui/ProgressTracker";
import { BaseButton } from "../ui/base/BaseButton";
import { TrigramWheel } from "../ui/TrigramWheel";
import { TrigramStance } from "../../types/enums";

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  players,
  onPlayerUpdate,
  onReturnToMenu,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  x = 0,
  y = 0,
}) => {
  const player = players?.[0];

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.drawRect(0, 0, width, height);
      g.endFill();

      // Training area outline
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.5);
      g.drawRect(50, 50, width - 100, height - 100);
    },
    [width, height]
  );

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        align: "center",
      }),
    []
  );

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      if (player && onPlayerUpdate) {
        onPlayerUpdate(0, { currentStance: stance });
      }
    },
    [player, onPlayerUpdate]
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />

      <Text
        text="훈련모드 (Training Mode)"
        style={titleStyle}
        x={width / 2}
        y={50}
        anchor={0.5}
      />

      {player && (
        <ProgressTracker
          currentValue={player.health} // Fix: Use currentValue instead of current
          maxValue={player.maxHealth} // Fix: Use maxValue instead of max
          x={20}
          y={height - 120}
          width={200}
          height={20}
        />
      )}

      <TrigramWheel
        currentStance={player?.currentStance || "geon"} // Fix: Use currentStance instead of selectedStance
        onStanceChange={(stance: TrigramStance) => {
          // Fix: Use onStanceChange instead of onStanceSelect
          onPlayerUpdate(0, { currentStance: stance });
        }}
        x={width / 2}
        y={height / 2}
        size={100} // Fix: Use size instead of radius
      />

      <BaseButton
        text="돌아가기 (Return)"
        onClick={onReturnToMenu}
        x={width / 2 - 100}
        y={height - 100}
        width={200}
        height={50}
      />
    </Container>
  );
};

export default TrainingScreen;
