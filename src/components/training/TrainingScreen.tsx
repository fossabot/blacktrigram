import React, { useCallback, useState, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type {
  TrainingScreenProps,
  PlayerState,
  TrigramStance,
} from "../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  GAME_CONFIG,
  PLAYER_ARCHETYPES_DATA,
  TRIGRAM_STANCES_ORDER,
} from "../../types/constants";

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  player: initialPlayer,
  onGamePhaseChange,
  onPlayerUpdate,
  onReturnToMenu,
  onStartCombat,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  ...props
}) => {
  const [player, setPlayer] = useState<PlayerState | undefined>(initialPlayer);

  const archetypeData = player
    ? PLAYER_ARCHETYPES_DATA[player.archetype]
    : null;

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      if (player && onPlayerUpdate) {
        const playerIndex =
          props.players?.findIndex((p: PlayerState) => p.id === player.id) ?? 0;
        onPlayerUpdate(playerIndex as 0 | 1, { currentStance: stance });
      } else if (player) {
        setPlayer((prev) =>
          prev ? { ...prev, currentStance: stance } : undefined
        );
      }
    },
    [player, onPlayerUpdate, props.players]
  );

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.xlarge,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
      }),
    []
  );

  const infoStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_SECONDARY,
        wordWrap: true,
        wordWrapWidth: width * 0.4,
      }),
    [width]
  );

  if (!player || !archetypeData) {
    return (
      <Container x={0} y={0} width={width} height={height}>
        <Text
          text="Loading Training..."
          anchor={0.5}
          x={width / 2}
          y={height / 2}
          style={titleStyle}
        />
      </Container>
    );
  }

  return (
    <Container x={0} y={0} width={width} height={height}>
      <Graphics
        draw={(g: PIXI.Graphics) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />

      <Text
        text="훈련 모드 (Training Mode)"
        anchor={0.5}
        x={width / 2}
        y={50}
        style={titleStyle}
      />

      <Text
        text={`선택된 무예가: ${player.name.korean} (${archetypeData.name.english})`}
        x={50}
        y={120}
        style={infoStyle}
      />

      {/* Stance Training Section */}
      <Container x={50} y={200}>
        <Text
          text="자세 연습 (Stance Practice)"
          x={0}
          y={0}
          style={infoStyle}
        />
        <Text
          text="1-8 키를 눌러 자세를 변경하세요"
          x={0}
          y={30}
          style={{
            ...infoStyle,
            fontSize: FONT_SIZES.small,
            fill: KOREAN_COLORS.TEXT_TERTIARY,
          }}
        />

        {/* Interactive stance buttons */}
        <Container y={70}>
          {TRIGRAM_STANCES_ORDER.map((stance, index) => (
            <Container
              key={stance}
              x={(index % 4) * 150}
              y={Math.floor(index / 4) * 60}
              interactive={true}
              buttonMode={true}
              pointertap={() => handleStanceSelect(stance)}
            >
              <Graphics
                draw={(g: PIXI.Graphics) => {
                  g.clear();
                  g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.8);
                  g.lineStyle(2, KOREAN_COLORS.UI_BORDER);
                  g.drawRoundedRect(0, 0, 140, 50, 5);
                  g.endFill();
                }}
              />
              <Text
                text={`${index + 1}. ${stance}`}
                x={10}
                y={15}
                style={{
                  ...infoStyle,
                  fontSize: FONT_SIZES.small,
                }}
              />
            </Container>
          ))}
        </Container>
      </Container>
    </Container>
  );
};
