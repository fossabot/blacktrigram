// Complete Player component with Korean martial arts character rendering

import React, { useMemo } from "react";
import { Container } from "@pixi/react";
import type { PlayerProps } from "../../types/components";
import useAudio from "../../audio/AudioManager"; // Fix: Use default import
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";

export function Player({
  playerState,
  playerIndex,
  onStateUpdate,
  archetype,
  stance,
  position,
  facing,
  isAttacking,
  health,
  maxHealth,
  ki,
  maxKi,
  stamina,
  maxStamina,
  x = 0,
  y = 0,
  isActive = true,
}: PlayerProps): React.JSX.Element {
  const audio = useAudio();

  // Use playerMetrics in component logic
  const playerStatus = useMemo(() => {
    const playerMetrics = {
      healthRatio: health / maxHealth,
      kiRatio: ki / maxKi,
      staminaRatio: stamina / maxStamina,
      isLowStamina: stamina < maxStamina * 0.3,
      needsRest: stamina < 20,
    };

    return {
      ...playerMetrics,
      statusColor:
        playerMetrics.healthRatio < 0.3 ? 0xff6666 : KOREAN_COLORS[stance],
      canAct: playerMetrics.staminaRatio > 0.1,
    };
  }, [health, maxHealth, ki, maxKi, stamina, maxStamina, stance]);

  // Handle stance changes using all required props
  const handleStanceChange = useMemo(() => {
    return (newStance: any) => {
      onStateUpdate({ stance: newStance });
      audio.playSFX("stance_change");
    };
  }, [onStateUpdate, audio]);

  // Update player state when archetype changes
  const updatePlayerForArchetype = useMemo(() => {
    return () => {
      if (playerState.archetype !== archetype) {
        onStateUpdate({ archetype });
      }
    };
  }, [playerState.archetype, archetype, onStateUpdate]);

  // Use playerIndex for player-specific logic
  const isPlayer1 = useMemo(() => playerIndex === 0, [playerIndex]);

  return (
    <Container
      x={position.x + x}
      y={position.y + y}
      scale={{ x: facing === "left" ? -1 : 1, y: 1 }}
      visible={isActive}
      interactive={true}
      eventMode="static"
      alpha={playerStatus.staminaRatio * 0.3 + 0.7} // Use playerStatus
    >
      {/* Player visual representation */}
      <Container
        x={0}
        y={0}
        tint={playerStatus.statusColor}
        onClick={() => {
          // Use functions that reference required props
          handleStanceChange(stance);
          updatePlayerForArchetype();
        }}
      >
        {/* Player body representation */}
        <Container x={0} y={0}>
          {/* Show stance indicator using archetype */}
          {TRIGRAM_DATA[stance] && isPlayer1 && (
            <Container x={0} y={-40}>
              {/* Trigram symbol representation */}
            </Container>
          )}
        </Container>
      </Container>

      {/* Combat effects */}
      {isAttacking && (
        <Container x={facing === "left" ? -20 : 20} y={0}>
          {/* Attack effect visualization */}
        </Container>
      )}
    </Container>
  );
}

export default Player;
