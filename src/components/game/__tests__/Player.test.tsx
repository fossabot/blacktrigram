import { render } from "@testing-library/react";
import { Stage } from "@pixi/react";
import { Player } from "../Player";
import { PlayerArchetype, TrigramStance } from "../../../types/enums";
import { createCompletePlayerState } from "../../../utils/playerUtils";

describe("Player Component", () => {
  it("renders player with stats", () => {
    const mockPlayerState = createCompletePlayerState(
      "test-player",
      { korean: "테스트", english: "Test" },
      PlayerArchetype.MUSA,
      { x: 100, y: 100 }
    );

    render(
      <Stage>
        <Player
          playerState={mockPlayerState}
          playerIndex={0}
          showStats={true}
        />
      </Stage>
    );
  });

  it("renders player without stats", () => {
    const mockPlayerState = createCompletePlayerState(
      "test-player-2",
      { korean: "테스트2", english: "Test2" },
      PlayerArchetype.AMSALJA,
      { x: 200, y: 150 }
    );

    render(
      <Stage>
        <Player
          playerState={mockPlayerState}
          playerIndex={1}
          showStats={false}
        />
      </Stage>
    );
  });
});
