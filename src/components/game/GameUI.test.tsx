import { render, screen } from "@testing-library/react"; // Fix: Remove unused React import
import { Application } from "@pixi/react";
import { GameUI } from "./GameUI";
import type { PlayerState } from "../../types/player";
import { PlayerArchetype, TrigramStance, CombatState } from "../../types/enums";

// Fix: Use individual mock players instead of array
const mockPlayer1: PlayerState = {
  id: "player1",
  name: { korean: "무사", english: "Warrior" },
  archetype: PlayerArchetype.MUSA,
  health: 100,
  maxHealth: 100,
  ki: 80,
  maxKi: 100,
  stamina: 90,
  maxStamina: 100,
  energy: 100,
  maxEnergy: 100,
  attackPower: 85,
  defense: 75,
  speed: 70,
  technique: 80,
  pain: 0,
  consciousness: 100,
  balance: 100,
  momentum: 0,
  currentStance: TrigramStance.GEON,
  combatState: CombatState.IDLE,
  position: { x: 300, y: 400 },
  isBlocking: false,
  isStunned: false,
  isCountering: false,
  lastActionTime: 0,
  recoveryTime: 0,
  lastStanceChangeTime: 0,
  statusEffects: [],
  activeEffects: [],
  vitalPoints: [],
  totalDamageReceived: 0,
  totalDamageDealt: 0,
  hitsTaken: 0,
  hitsLanded: 0,
  perfectStrikes: 0,
  vitalPointHits: 0,
};

const mockPlayer2: PlayerState = {
  ...mockPlayer1,
  id: "player2",
  name: { korean: "암살자", english: "Assassin" },
  archetype: PlayerArchetype.AMSALJA,
  currentStance: TrigramStance.SON,
  position: { x: 900, y: 400 },
};

describe("GameUI", () => {
  it("renders game UI elements", () => {
    render(
      <Application width={800} height={600}>
        <GameUI
          gameState={{
            players: [mockPlayer1, mockPlayer2], // Fix: Use individual players
            timeRemaining: 60,
            currentRound: 1,
            maxRounds: 3,
            isPaused: false,
          }}
          onStateChange={jest.fn()}
          onReturnToMenu={jest.fn()}
          onPlayerUpdate={jest.fn()}
        />
      </Application>
    );

    expect(screen.getByTestId("game-ui")).toBeInTheDocument();
  });

  // ...existing tests with mockPlayer1 and mockPlayer2...
});
