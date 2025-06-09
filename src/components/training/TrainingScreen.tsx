import React, { useState, useMemo, useCallback } from "react";
import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrainingScreenProps, PlayerState } from "../../types";
import { PlayerArchetype, TrigramStance } from "../../types/enums";
import { GAME_CONFIG, KOREAN_COLORS, FONT_SIZES } from "../../types/constants";
import { createPlayerFromArchetype } from "../../utils/playerUtils";
import { BaseButton } from "../ui/base/BaseButton";
import { Player } from "../game/Player";
import { DojangBackground } from "../game/DojangBackground";
import { StanceIndicator } from "../ui/StanceIndicator";

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  onReturnToMenu,
  selectedArchetype: selectedArchetypeProp,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const [selectedArchetype] = useState<PlayerArchetype | null>(
    selectedArchetypeProp || null
  );
  const [stance, setStance] = useState<TrigramStance>(TrigramStance.GEON);

  const player: PlayerState = useMemo(() => {
    const archetype = selectedArchetype || PlayerArchetype.MUSA;
    return createPlayerFromArchetype(archetype, "훈련생", { x: 400, y: 300 });
  }, [selectedArchetype]);

  const handleStanceChange = useCallback((newStance: TrigramStance) => {
    setStance(newStance);
  }, []);

  return (
    <Container>
      <DojangBackground
        width={width}
        height={height}
        animate={true}
        lighting="cyberpunk"
      />

      {/* Player */}
      <Player
        playerState={player}
        playerIndex={0}
        showStats={true}
        x={player.position.x}
        y={player.position.y}
      />

      {/* Use StanceIndicator component properly */}
      <StanceIndicator
        stance={stance}
        size={80}
        showText={true}
        x={100}
        y={100}
        onClick={handleStanceChange}
        isActive={true}
      />

      {/* Current stance display */}
      <Text
        text={`현재 자세: ${stance}`}
        style={
          new PIXI.TextStyle({
            fontSize: FONT_SIZES.medium,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          })
        }
        x={50}
        y={height - 200}
      />

      {/* Stance selection buttons */}
      <Container x={50} y={height - 150}>
        {Object.values(TrigramStance).map((stanceOption, index) => (
          <BaseButton
            key={stanceOption}
            text={stanceOption}
            onClick={() => handleStanceChange(stanceOption)}
            x={index * 100}
            y={0}
            width={90}
            height={40}
            variant={stance === stanceOption ? "primary" : "secondary"}
          />
        ))}
      </Container>

      {/* Return to menu button */}
      <BaseButton
        text="메뉴로 돌아가기"
        onClick={onReturnToMenu}
        x={width - 200}
        y={50}
        width={150}
        height={40}
        variant="secondary"
      />
    </Container>
  );
};

export default TrainingScreen;
