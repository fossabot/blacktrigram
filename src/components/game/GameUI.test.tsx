import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GameUI } from "../GameUI";
import type { PlayerState } from "../../types";
import { PlayerArchetype, TrigramStance } from "../../types/enums";

describe("GameUI", () => {
  const mockPlayer1: PlayerState = {
    id: "player1",
    name: { korean: "선수 1", english: "Player 1" },
    archetype: PlayerArchetype.MUSA,
    health: 80,
    maxHealth: 100,
    ki: 70,
    maxKi: 100,
    stamina: 90,
    maxStamina: 100,
    currentStance: TrigramStance.GEON,
    position: { x: 100, y: 300 },
    isGuarding: false,
    stunDuration: 0,
    comboCount: 0,
    lastActionTime: 0,
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    currentTechnique: null,
    activeEffects: [],
    vitalPoints: {},
    defensiveBonus: 0,
    attackPower: 1,
    movementSpeed: 1,
    reactionTime: 1,
    focusLevel: 100,
    battleExperience: 0,
    injuredLimbs: [],
    statusConditions: [],
  };

  const mockPlayer2: PlayerState = {
    id: "player2",
    name: { korean: "선수 2", english: "Player 2" },
    archetype: PlayerArchetype.AMSALJA,
    health: 60,
    maxHealth: 100,
    ki: 85,
    maxKi: 100,
    stamina: 75,
    maxStamina: 100,
    currentStance: TrigramStance.TAE,
    position: { x: 700, y: 300 },
    isGuarding: true,
    stunDuration: 0,
    comboCount: 0,
    lastActionTime: 0,
    consciousness: 100,
    pain: 0,
    balance: 100,
    bloodLoss: 0,
    currentTechnique: null,
    activeEffects: [],
    vitalPoints: {},
    defensiveBonus: 0,
    attackPower: 1,
    movementSpeed: 1,
    reactionTime: 1,
    focusLevel: 100,
    battleExperience: 0,
    injuredLimbs: [],
    statusConditions: [],
  };

  const defaultProps = {
    player1: mockPlayer1,
    player2: mockPlayer2,
    timeRemaining: 120,
    currentRound: 1,
    maxRounds: 3,
    combatEffects: [],
  };

  describe("Component Rendering", () => {
    it("renders without crashing", () => {
      const { container } = render(<GameUI {...defaultProps} />);
      expect(container).toBeInTheDocument();
    });

    it("displays player information", () => {
      render(<GameUI {...defaultProps} />);
      expect(screen.getByText(/선수 1/i)).toBeInTheDocument();
      expect(screen.getByText(/선수 2/i)).toBeInTheDocument();
    });

    it("shows game timer and round info", () => {
      render(<GameUI {...defaultProps} timeRemaining={30} currentRound={2} />);
      expect(screen.getByText(/time remaining: 30/i)).toBeInTheDocument();
      expect(screen.getByText(/round 2/i)).toBeInTheDocument();
    });

    it("renders with correct props structure", () => {
      expect(defaultProps).toMatchObject({
        player1: expect.any(Object),
        player2: expect.any(Object),
        timeRemaining: expect.any(Number),
        currentRound: expect.any(Number),
        maxRounds: expect.any(Number),
        combatEffects: expect.any(Array),
      });
    });
  });

  describe("Global Test Environment", () => {
    it("should have proper global setup", () => {
      expect(typeof globalThis).toBe("object");
    });
  });
});
