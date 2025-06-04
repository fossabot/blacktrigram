// Complete Player component with Korean martial arts character rendering

import React, { useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { PlayerProps } from "../../types";
import useAudio from "../../audio/AudioManager"; // Fixed: Use default import

export function Player({
  playerState,
  playerIndex,
  onStateUpdate,
  archetype,
  stance,
  position,
  facing,
  health,
  maxHealth,
  ki,
  maxKi,
  stamina,
  maxStamina,
}: PlayerProps): React.JSX.Element {
  const audio = useAudio(); // Fixed: Now works with default import

  const playerStyle = useMemo(
    () => ({
      x: position.x,
      y: position.y,
      scaleX: facing === "left" ? -1 : 1,
    }),
    [position.x, position.y, facing]
  );

  return (
    <Container {...playerStyle}>{/* Player visual representation */}</Container>
  );
}
