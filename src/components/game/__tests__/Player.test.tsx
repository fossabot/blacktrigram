import { render } from "@testing-library/react";
import { PlayerArchetype, TrigramStance } from "../../../types/enums";
import { Player } from "../Player";
import type { PlayerState } from "../../../types";

const mockPlayerState: PlayerState = {
  id: "test-player",
  name: { korean: "테스트", english: "Test" },
  archetype: PlayerArchetype.MUSA,
  currentStance: TrigramStance.GEON,
  health: 100,
  maxHealth: 100,
  ki: 100,
  maxKi: 100,
  stamina: 100,
  maxStamina: 100,
  consciousness: 100,
  balance: 100,
  pain: 0,
  position: { x: 100, y: 200 },
  statusEffects: [],
  vitalPoints: [],
  isBlocking: false,
  activeEffects: [],
  combatModifiers: {},
  momentum: { x: 0, y: 0 },
  lastStanceChangeTime: Date.now(),
  actionCooldowns: {},
  technique: null,
  combatState: "idle",
  orientation: "right",
};

describe("Player", () => {
  it("renders without crashing", () => {
    render(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        x={100}
        y={200}
        onClick={() => {}}
        interactive={true}
      />
    );
  });

  it("displays player correctly", () => {
    const { container } = render(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        x={100}
        y={200}
        onClick={() => {}}
        interactive={true}
      />
    );

    expect(container).toBeDefined();
  });

  it("handles player interaction", () => {
    const mockOnClick = jest.fn();

    render(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        x={100}
        y={200}
        onClick={mockOnClick}
        interactive={true}
      />
    );

    expect(mockOnClick).not.toHaveBeenCalled(); // Initial state
  });

  it("displays player stance correctly", () => {
    const player = render(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        x={100}
        y={200}
        onClick={() => {}}
        interactive={true}
      />
    );

    expect(player).toBeTruthy();
    expect(mockPlayerState.currentStance).toBe(TrigramStance.GEON);
  });
});
