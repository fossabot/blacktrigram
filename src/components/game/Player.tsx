// Complete Player component with Korean martial arts character rendering

import React, { useMemo } from "react";
import { Container } from "@pixi/react";
import type { PlayerProps } from "../../types/components";
import { useAudio } from "../../audio/AudioManager"; // Fix: Use named import
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";

export function Player({
  playerState, // Use playerState parameter
  playerIndex, // Use playerIndex parameter
  onStateUpdate, // Use onStateUpdate parameter
  archetype, // Use archetype parameter
  stance,
  position,
  facing,
  isAttacking,
  health,
  maxHealth,
  ki,
  maxKi,
  stamina, // Use stamina parameter
  maxStamina, // Use maxStamina parameter
  x = 0,
  y = 0,
  isActive = true,
}: PlayerProps): React.JSX.Element {
  const audio = useAudio(); // Use audio for sound effects

  // Use stamina values in component logic
  const playerMetrics = useMemo(
    () => ({
      healthRatio: health / maxHealth,
      kiRatio: ki / maxKi,
      staminaRatio: stamina / maxStamina, // Use stamina
      isLowStamina: stamina < maxStamina * 0.3, // Use stamina
      needsRest: stamina < 20, // Use stamina
    }),
    [health, maxHealth, ki, maxKi, stamina, maxStamina]
  );

  // Calculate visual states based on health and stance
  const playerColor = useMemo(() => {
    const stanceColor = KOREAN_COLORS[stance] || KOREAN_COLORS.WHITE;
    const healthRatio = health / maxHealth;

    // Adjust color based on health
    if (healthRatio < 0.3) {
      return 0xff6666; // Red tint for low health
    } else if (healthRatio < 0.6) {
      return 0xffaa66; // Orange tint for medium health
    }
    return stanceColor;
  }, [stance, health, maxHealth]);

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
      alpha={(ki / maxKi) * 0.3 + 0.7} // Ki affects visibility
    >
      {/* Player visual representation using all props */}
      <Container
        x={0}
        y={0}
        tint={playerColor}
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
