import React, { useState, useCallback, useMemo } from "react";
import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrainingScreenProps } from "../../types/components";
import { PlayerArchetype, TrigramStance } from "../../types/enums";
import { createPlayerFromArchetype } from "../../utils/playerUtils";
import { BaseButton } from "../ui/base/BaseButton";
import { DojangBackground } from "../game/DojangBackground";
import { Player } from "../game/Player";
import {
  KOREAN_COLORS,
  GAME_CONFIG,
  PLAYER_ARCHETYPES_DATA,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
} from "../../types/constants";

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  onReturnToMenu,
  player,
  selectedArchetype,
  onPlayerUpdate,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
  x = 0,
  y = 0,
}) => {
  const [currentArchetype, setCurrentArchetype] = useState<PlayerArchetype>(
    selectedArchetype || PlayerArchetype.MUSA
  );
  const [currentStance, setCurrentStance] = useState<TrigramStance>(
    TrigramStance.GEON
  );

  const trainingPlayer = useMemo(() => {
    if (player) {
      return player;
    }
    return createPlayerFromArchetype(currentArchetype, 0);
  }, [player, currentArchetype]);

  const trainingDummy = useMemo(() => {
    return createPlayerFromArchetype(PlayerArchetype.MUSA, 1);
  }, []);

  const handleArchetypeChange = useCallback(
    (archetype: PlayerArchetype) => {
      setCurrentArchetype(archetype);
      if (onPlayerUpdate) {
        const newPlayer = createPlayerFromArchetype(archetype, 0);
        onPlayerUpdate(newPlayer);
      }
    },
    [onPlayerUpdate]
  );

  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      setCurrentStance(stance);
      if (onPlayerUpdate) {
        onPlayerUpdate({ currentStance: stance });
      }
    },
    [onPlayerUpdate]
  );

  return (
    <Container x={x} y={y}>
      {/* Background */}
      <DojangBackground width={width} height={height} />

      {/* Training Player */}
      <Player
        playerState={trainingPlayer}
        playerIndex={0}
        x={300}
        y={400}
        interactive={true}
      />

      {/* Training Dummy */}
      <Player
        playerState={trainingDummy}
        playerIndex={1}
        x={600}
        y={400}
        interactive={false}
      />

      {/* Stance information display - Fix: Use @pixi/react Text component */}
      <Container x={50} y={height - 200}>
        <Text
          text={`현재 자세: ${currentStance}`}
          style={
            new PIXI.TextStyle({
              fontSize: 24,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontFamily: "Arial",
            })
          }
        />
      </Container>

      {/* Archetype selection buttons */}
      <Container x={50} y={height - 150}>
        {Object.values(PlayerArchetype).map((archetype, index) => (
          <BaseButton
            key={archetype}
            text={PLAYER_ARCHETYPES_DATA[archetype].name.korean}
            onClick={() => handleArchetypeChange(archetype)}
            x={index * 120}
            y={0}
            width={110}
            height={40}
            variant={currentArchetype === archetype ? "primary" : "secondary"}
          />
        ))}
      </Container>

      {/* Stance selection buttons */}
      <Container x={50} y={height - 100}>
        {TRIGRAM_STANCES_ORDER.map((stance, index) => {
          const stanceData = TRIGRAM_DATA[stance];
          return (
            <BaseButton
              key={stance}
              text={stanceData?.symbol || stance}
              onClick={() => handleStanceChange(stance as TrigramStance)}
              x={index * 60}
              y={0}
              width={50}
              height={40}
              variant={currentStance === stance ? "primary" : "ghost"}
            />
          );
        })}
      </Container>

      {/* Return button */}
      <BaseButton
        text="메뉴로 돌아가기"
        onClick={onReturnToMenu}
        x={50}
        y={height - 50}
        width={200}
        height={50}
        variant="secondary"
      />
    </Container>
  );
};

export default TrainingScreen;
