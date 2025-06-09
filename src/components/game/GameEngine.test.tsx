import { render } from "@testing-library/react";
import { GameEngine } from "./GameEngine";
import { Stage } from "@pixi/react";
import type { PlayerState } from "../../types";
import { PlayerArchetype, TrigramStance } from "../../types/enums";

// Fix: Create complete PlayerState objects with all required properties
const createMockPlayer = (
  id: string,
  name: string,
  archetype: PlayerArchetype,
  stance: TrigramStance,
  x: number,
  y: number
): PlayerState => ({
  id,
  name: { korean: name, english: name },
  archetype,
  position: { x, y },
  health: 100,
  maxHealth: 100,
  ki: 100,
  maxKi: 100,
  stamina: 100,
  maxStamina: 100,
  currentStance: stance,
  pain: 0,
  consciousness: 100,
  balance: 100,
  isBlocking: false,
  statusEffects: [],
  // Fix: Add missing properties
  activeEffects: [],
  vitalPoints: [],
  combatModifiers: {
    damageMultiplier: 1.0,
    accuracyModifier: 1.0,
    speedModifier: 1.0,
    defenseMultiplier: 1.0,
  },
  momentum: 0,
  lastActionTime: 0,
  combo: 0,
  direction: "right" as const,
  grounded: true,
  invulnerable: false,
  combatState: {
    state: "idle" as const,
    frameData: {
      startup: 0,
      active: 0,
      recovery: 0,
      currentFrame: 0,
    },
    hitboxActive: false,
    invulnerabilityFrames: 0,
  },
});

describe("GameEngine", () => {
  it("renders correctly with training mode", () => {
    const mockPlayers: [PlayerState, PlayerState] = [
      createMockPlayer(
        "player1",
        "플레이어1",
        PlayerArchetype.MUSA,
        TrigramStance.GEON,
        100,
        100
      ),
      createMockPlayer(
        "player2",
        "플레이어2",
        PlayerArchetype.AMSALJA,
        TrigramStance.SON,
        200,
        100
      ),
    ];

    render(
      <Stage>
        <GameEngine
          players={mockPlayers}
          onPlayerUpdate={(playerIndex: 0 | 1, updates) => {
            console.log(`Player ${playerIndex} updated:`, updates);
          }}
          onCombatResult={(result) => {
            console.log("Combat result:", result);
          }}
          onGameEvent={(event, data) => {
            console.log("Game event:", event, data);
          }}
          isPaused={false}
          gameMode="training"
        />
      </Stage>
    );
  });

  it("renders correctly with versus mode", () => {
    const mockPlayers: [PlayerState, PlayerState] = [
      createMockPlayer(
        "player1",
        "무사",
        PlayerArchetype.MUSA,
        TrigramStance.GEON,
        150,
        200
      ),
      createMockPlayer(
        "player2",
        "암살자",
        PlayerArchetype.AMSALJA,
        TrigramStance.SON,
        250,
        200
      ),
    ];

    render(
      <Stage>
        <GameEngine
          players={mockPlayers}
          onPlayerUpdate={() => {}}
          onCombatResult={() => {}}
          onGameEvent={() => {}}
          isPaused={false}
          gameMode="versus"
        />
      </Stage>
    );
  });
});
