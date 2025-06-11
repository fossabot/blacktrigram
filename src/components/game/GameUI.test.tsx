import { render, screen, waitFor } from "@testing-library/react"; // Fix: Remove unused React import
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
  it("renders game UI elements", async () => {
    const mockPlayers: PlayerState[] = [
      {
        id: "player1",
        name: { korean: "선수1", english: "Player 1" },
        archetype: PlayerArchetype.MUSA,
        health: 100,
        maxHealth: 100,
        ki: 100,
        maxKi: 100,
        stamina: 100,
        maxStamina: 100,
        energy: 100,
        maxEnergy: 100,
        attackPower: 75,
        defense: 75,
        speed: 75,
        technique: 75,
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
        experiencePoints: 0,
      },
      {
        id: "player2",
        name: { korean: "선수2", english: "Player 2" },
        archetype: PlayerArchetype.AMSALJA,
        health: 80,
        maxHealth: 100,
        ki: 90,
        maxKi: 100,
        stamina: 85,
        maxStamina: 100,
        energy: 90,
        maxEnergy: 100,
        attackPower: 85,
        defense: 65,
        speed: 90,
        technique: 95,
        pain: 20,
        consciousness: 80,
        balance: 90,
        momentum: 0,
        currentStance: TrigramStance.SON,
        combatState: CombatState.IDLE,
        position: { x: 500, y: 400 },
        isBlocking: false,
        isStunned: false,
        isCountering: false,
        lastActionTime: 0,
        recoveryTime: 0,
        lastStanceChangeTime: 0,
        statusEffects: [],
        activeEffects: [],
        vitalPoints: [],
        totalDamageReceived: 20,
        totalDamageDealt: 0,
        hitsTaken: 1,
        hitsLanded: 0,
        perfectStrikes: 0,
        vitalPointHits: 0,
        experiencePoints: 0,
      },
    ];

    render(
      <GameUI
        players={mockPlayers}
        roundNumber={1}
        timeRemaining={180}
        isPaused={false}
        onTogglePause={() => {}}
        onReturnToMenu={() => {}}
        width={800}
        height={600}
      />
    );

    // Give PixiJS time to initialize
    await waitFor(
      () => {
        expect(screen.getByTestId("game-ui")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Just verify the canvas exists for now
    expect(screen.getByRole("img")).toBeInTheDocument(); // Canvas has img role
  });

  // ...existing tests with mockPlayer1 and mockPlayer2...
});
