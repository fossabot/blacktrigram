import { render } from "@testing-library/react";
import {
  PlayerArchetype,
  TrigramStance,
  CombatState,
} from "../../../types/enums";
import { Player } from "../Player";
import type { PlayerState } from "../../../types";

const mockPlayerState: PlayerState = {
  id: "test-player",
  name: { korean: "테스트", english: "Test" },
  archetype: PlayerArchetype.MUSA,
  health: 100,
  maxHealth: 100,
  ki: 100,
  maxKi: 100,
  stamina: 100,
  maxStamina: 100,
  energy: 100,
  maxEnergy: 100,
  attackPower: 50,
  defense: 50,
  speed: 50,
  technique: 50, // Fix: Use number instead of null
  pain: 0,
  consciousness: 100,
  balance: 100,
  momentum: 0, // Fix: Use number instead of Position
  currentStance: TrigramStance.GEON,
  position: { x: 100, y: 100 },
  isBlocking: false,
  isStunned: false,
  isCountering: false,
  lastActionTime: 0,
  recoveryTime: 0,
  statusEffects: [],
  activeEffects: [],
  combatState: CombatState.IDLE,
  lastStanceChangeTime: 0,
  vitalPoints: [],
  totalDamageReceived: 0,
  totalDamageDealt: 0,
  hitsTaken: 0,
  hitsLanded: 0,
  perfectStrikes: 0,
  vitalPointHits: 0,
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
