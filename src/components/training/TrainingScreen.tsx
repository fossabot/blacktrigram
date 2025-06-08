import React, { useCallback } from "react";
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

      // Training area border
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.6);
      g.drawRect(20, 20, width - 40, height - 40);
    },
    [width, height]
  );

  const handleStanceChange = useCallback(
    (newStance: TrigramStance) => {
      if (player && onPlayerUpdate) {
        onPlayerUpdate(0, { ...player, currentStance: newStance });
      }
    },
    [player, onPlayerUpdate]
  );

  return (
    <Container x={x} y={y} width={width} height={height}>
      <Graphics draw={backgroundDraw} />

      {/* Training UI */}
      <Container x={50} y={50}>
        <Text
          text="Training Mode / 훈련 모드"
          style={
            new PIXI.TextStyle({
              fontFamily: FONT_FAMILY.PRIMARY,
              fontSize: FONT_SIZES.title,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontWeight: "bold",
            })
          }
        />

        {player && (
          <>
            <ProgressTracker
              currentValue={player.health}
              maxValue={player.maxHealth}
              x={0}
              y={80}
              width={200}
              height={20}
            />

            <TrigramWheel
              currentStance={player.currentStance}
              onStanceChange={handleStanceChange}
              x={300}
              y={100}
            />
          </>
        )}

        <BaseButton
          text="Return to Menu" // Fix: Use 'text' instead of 'label'
          x={0}
          y={height - 150}
          onClick={onReturnToMenu}
        />
      </Container>
    </Container>
  );
};

export default TrainingScreen;
