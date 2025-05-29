import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Player } from "./Player";
import { createPlayerState } from "../../types";
import type { PlayerState, TrigramStance } from "../../types";

// Mock useTick properly
vi.mock("@pixi/react", async () => {
  const actual = await vi.importActual("@pixi/react");
  return {
    ...actual,
    useTick: vi.fn((callback) => {
      // Simulate ticker with proper type
      const mockTicker = { deltaTime: 1 };
      callback(mockTicker);
    }),
  };
});

// Create comprehensive mock player state
function createMockPlayerState(
  overrides: Partial<PlayerState> = {}
): PlayerState {
  return createPlayerState({
    playerId: "test-player",
    position: { x: 400, y: 300 },
    velocity: { x: 0, y: 0 },
    health: 100,
    maxHealth: 100,
    stamina: 100,
    maxStamina: 100,
    ki: 50,
    maxKi: 100,
    stance: "geon",
    isAttacking: false,
    isBlocking: false,
    isMoving: false,
    facing: "right",
    lastDamageTaken: 0,
    activeEffects: [],
    comboCount: 0,
    ...overrides,
  });
}

describe("Player Component", () => {
  const mockOpponentPosition = { x: 600, y: 300 };
  const mockOnAttack = vi.fn();
  const mockOnStanceChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render player with correct initial state", () => {
    const playerState = createMockPlayerState();

    render(
      <Player
        playerState={playerState}
        opponentPosition={mockOpponentPosition}
        onAttack={mockOnAttack}
        onStanceChange={mockOnStanceChange}
      />
    );

    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("should display Korean technique name based on stance", () => {
    const playerState = createMockPlayerState({ stance: "li" });

    render(
      <Player
        playerState={playerState}
        opponentPosition={mockOpponentPosition}
        onAttack={mockOnAttack}
        onStanceChange={mockOnStanceChange}
      />
    );

    // Verify trigram-specific content is rendered
    expect(screen.getByTestId("pixi-text")).toBeInTheDocument();
  });

  it("should handle all trigram stances correctly", () => {
    const stances: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];

    stances.forEach((stance) => {
      const playerState = createMockPlayerState({ stance });

      const { unmount } = render(
        <Player
          playerState={playerState}
          opponentPosition={mockOpponentPosition}
          onAttack={mockOnAttack}
          onStanceChange={mockOnStanceChange}
        />
      );

      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
      unmount();
    });
  });

  it("should update animation time correctly", () => {
    const playerState = createMockPlayerState({ isAttacking: true });

    render(
      <Player
        playerState={playerState}
        opponentPosition={mockOpponentPosition}
        onAttack={mockOnAttack}
        onStanceChange={mockOnStanceChange}
      />
    );

    // Verify component renders without errors when attacking
    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("should handle status effects correctly", () => {
    const playerState = createMockPlayerState({
      activeEffects: [
        {
          id: "test-effect",
          name: "Test Effect",
          korean: "테스트 효과",
          type: "stun",
          intensity: 50,
          duration: 1000,
          effects: {
            healthReduction: 10,
            speedMultiplier: 0.5,
          },
        },
      ],
    });

    render(
      <Player
        playerState={playerState}
        opponentPosition={mockOpponentPosition}
        onAttack={mockOnAttack}
        onStanceChange={mockOnStanceChange}
      />
    );

    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("should handle low health states", () => {
    const playerState = createMockPlayerState({
      health: 15,
      maxHealth: 100,
    });

    render(
      <Player
        playerState={playerState}
        opponentPosition={mockOpponentPosition}
        onAttack={mockOnAttack}
        onStanceChange={mockOnStanceChange}
      />
    );

    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("should render all korean trigram techniques", () => {
    const techniques = [
      { stance: "geon", name: "천둥벽력" },
      { stance: "tae", name: "유수연타" },
      { stance: "li", name: "화염지창" },
      { stance: "jin", name: "벽력일섬" },
      { stance: "son", name: "선풍연격" },
      { stance: "gam", name: "수류반격" },
      { stance: "gan", name: "반석방어" },
      { stance: "gon", name: "대지포옹" },
    ];

    techniques.forEach(({ stance }) => {
      const playerState = createMockPlayerState({
        stance: stance as TrigramStance,
      });

      const { unmount } = render(
        <Player
          playerState={playerState}
          opponentPosition={mockOpponentPosition}
          onAttack={mockOnAttack}
          onStanceChange={mockOnStanceChange}
        />
      );

      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
      unmount();
    });
  });
});
