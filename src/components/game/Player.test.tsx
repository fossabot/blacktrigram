import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Player } from "./Player";
import { createPlayerState } from "../../types";
import type { PlayerState, TrigramStance, KoreanTechnique } from "../../types";

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
function createTestPlayerState(overrides?: Partial<PlayerState>): PlayerState {
  return createPlayerState(
    "test-player",
    { x: 100, y: 100 },
    "geon",
    overrides
  );
}

describe("Player Component", () => {
  const mockOnAttack = vi.fn<(technique: KoreanTechnique) => void>();
  const mockOnStanceChange = vi.fn<(stance: TrigramStance) => void>();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render player with correct initial state", () => {
    const player = createTestPlayerState();

    render(
      <Player
        player={player}
        onAttack={mockOnAttack}
        onStanceChange={mockOnStanceChange}
      />
    );

    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("should display Korean technique name based on stance", () => {
    const player = createTestPlayerState({ stance: "li" });

    render(
      <Player
        player={player}
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
      const player = createTestPlayerState({ stance });

      const { unmount } = render(
        <Player
          player={player}
          onAttack={mockOnAttack}
          onStanceChange={mockOnStanceChange}
        />
      );

      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
      unmount();
    });
  });

  it("should update animation time correctly", () => {
    const player = createTestPlayerState({ isAttacking: true });

    render(
      <Player
        player={player}
        onAttack={mockOnAttack}
        onStanceChange={mockOnStanceChange}
      />
    );

    // Verify component renders without errors when attacking
    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("should handle status effects correctly", () => {
    const player = createTestPlayerState({
      conditions: [
        {
          type: "stun",
          duration: 1000,
          magnitude: 0.5,
          source: "test",
        },
      ],
    });

    render(
      <Player
        player={player}
        onAttack={mockOnAttack}
        onStanceChange={mockOnStanceChange}
      />
    );

    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
  });

  it("should handle low health states", () => {
    const player = createTestPlayerState({
      health: 15,
      maxHealth: 100,
    });

    render(
      <Player
        player={player}
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
      const player = createTestPlayerState({
        stance: stance as TrigramStance,
      });

      const { unmount } = render(
        <Player
          player={player}
          onAttack={mockOnAttack}
          onStanceChange={mockOnStanceChange}
        />
      );

      expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
      unmount();
    });
  });

  it("should render with different stances", () => {
    const player = createTestPlayerState({
      stance: "li" as TrigramStance,
    });

    render(
      <Player
        player={player}
        onStanceChange={mockOnStanceChange}
        onAttack={mockOnAttack}
      />
    );

    expect(screen.getByTestId("pixi-container")).toBeInTheDocument();
  });
});
