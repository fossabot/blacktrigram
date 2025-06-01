import { PixiContainerComponent } from "../ui/base/PixiComponents";
import { PlayerVisuals } from "./PlayerVisuals";
import type { PlayerProps } from "../../types";

export function Player({
  playerState,
  isPlayer1,
  onAttack,
}: PlayerProps): React.ReactElement {
  return (
    <PixiContainerComponent
      x={playerState.position.x}
      y={playerState.position.y}
      interactive={true}
      onClick={() => {
        // Execute attack without damage calculation (handled in GameEngine)
        onAttack(playerState.position);
      }}
    >
      {/* Delegate all visual rendering to PlayerVisuals */}
      <PlayerVisuals playerState={playerState} isPlayer1={isPlayer1} />
    </PixiContainerComponent>
  );
}
