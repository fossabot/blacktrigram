import { render } from "@testing-library/react";
import { GameEngine } from "./GameEngine";
import type { PlayerState } from "../../types";
import {
  PlayerArchetype,
  TrigramStance,
  GameMode,
  CombatState,
} from "../../types/enums";

// Fix: Create tuple with exactly 2 players as required by interface
const mockPlayers: readonly [PlayerState, PlayerState] = [
  {
    id: "player1",
    name: { korean: "플레이어 1", english: "Player 1" },
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
    position: { x: 300, y: 400 },
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
  },
  {
    id: "player2",
    name: { korean: "플레이어 2", english: "Player 2" },
    archetype: PlayerArchetype.AMSALJA,
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
    currentStance: TrigramStance.SON,
    position: { x: 500, y: 400 },
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
  },
] as const;

describe("GameEngine", () => {
  it("renders without crashing", () => {
    render(
      <GameEngine
        players={mockPlayers}
        onPlayerUpdate={() => {}}
        onCombatResult={() => {}}
        onGameEvent={() => {}}
        isPaused={false}
        gameMode={GameMode.VERSUS}
      />
    );
  });

  it("handles player updates correctly", () => {
    const mockOnPlayerUpdate = jest.fn();

    render(
      <GameEngine
        players={mockPlayers}
        onPlayerUpdate={mockOnPlayerUpdate}
        onCombatResult={() => {}}
        onGameEvent={() => {}}
        isPaused={false}
        gameMode={GameMode.TRAINING}
      />
    );

    // Test would involve triggering updates
    expect(mockOnPlayerUpdate).not.toHaveBeenCalled(); // Initial state
  });

  it("processes combat results", () => {
    const mockOnCombatResult = jest.fn();

    render(
      <GameEngine
        players={mockPlayers}
        onPlayerUpdate={() => {}}
        onCombatResult={mockOnCombatResult}
        onGameEvent={() => {}}
        isPaused={false}
        gameMode={GameMode.VERSUS}
      />
    );

    // Combat results would be tested through integration
    expect(mockOnCombatResult).not.toHaveBeenCalled(); // Initial state
  });
});
