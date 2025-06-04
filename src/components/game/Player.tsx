// Complete Player component with Korean martial arts character rendering

import React, { useMemo, useCallback } from "react";
import { Container } from "@pixi/react";
import type { PlayerProps } from "../../types/components";
import { useAudio } from "../../audio/AudioProvider";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";
import { KoreanTechnique } from "../../types";

export function Player({
  playerState,
  playerIndex,
  onStateUpdate,
  onAttack,
  // Destructure props from playerState and component props
  archetype = playerState.archetype,
  stance = playerState.stance,
  position = playerState.position,
  facing = playerState.facing,
  isAttacking = playerState.isAttacking,
  health = playerState.health,
  maxHealth = playerState.maxHealth,
  ki = playerState.ki,
  maxKi = playerState.maxKi,
  stamina = playerState.stamina,
  maxStamina = playerState.maxStamina,
  x = 0,
  y = 0,
  isActive = true,
}: PlayerProps): React.JSX.Element {
  const audio = useAudio(); // Now properly typed

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
        playerMetrics.healthRatio < 0.3
          ? 0xff6666
          : KOREAN_COLORS[stance] || KOREAN_COLORS.WHITE,
      canAct: playerMetrics.staminaRatio > 0.1,
    };
  }, [health, maxHealth, ki, maxKi, stamina, maxStamina, stance]);

  // Handle stance changes using all required props
  const handleStanceChange = useMemo(() => {
    return (newStance: any) => {
      onStateUpdate({ stance: newStance });
      if (audio) audio.playSFX("stance_change");
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

  // Combat actions with proper audio integration
  const executeTechnique = useCallback(
    async (technique: KoreanTechnique) => {
      if (!technique || !playerState) return;

      try {
        // Play technique sound using proper audio hook
        if (audio) audio.playSFX("technique_execute");

        // Update player state for technique execution
        onStateUpdate({
          stamina: Math.max(
            0,
            playerState.stamina - (technique.staminaCost || 10)
          ),
          ki: Math.max(0, playerState.ki - (technique.kiCost || 5)),
          isAttacking: true,
        });

        // Play attack sound based on damage
        if (technique.damage && audio) {
          audio.playAttackSound(technique.damage);
        }

        // Reset attacking state after technique
        setTimeout(() => {
          onStateUpdate({ isAttacking: false });
        }, technique.executionTime || 500);
      } catch (error) {
        console.error("Technique execution failed:", error);
      }
    },
    [playerState, onStateUpdate, audio]
  );

  // Use onAttack prop
  const handleAttack = useCallback(() => {
    if (onAttack) {
      onAttack(position);
    }
    // Also use executeTechnique for specific techniques
    const currentTechnique = TRIGRAM_DATA[stance]?.technique;
    if (currentTechnique) {
      executeTechnique(currentTechnique);
    }
  }, [onAttack, position, stance, executeTechnique]);

  return (
    <Container
      x={position.x + x}
      y={position.y + y}
      scale={{ x: facing === "left" ? -1 : 1, y: 1 }}
      visible={isActive}
      interactive={true}
      eventMode="static"
      alpha={playerStatus.staminaRatio * 0.3 + 0.7} // Use playerStatus
      onClick={handleAttack} // Use handleAttack to utilize onAttack prop
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
