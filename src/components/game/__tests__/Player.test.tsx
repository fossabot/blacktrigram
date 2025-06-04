import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Player } from "../Player";
import { createPlayerState } from "../../../utils/playerUtils";
import type {
  PlayerArchetype,
  PlayerState,
  TrigramStance,
} from "../../../types";

describe("Player Component", () => {
  let mockPlayerState: PlayerState;

  beforeEach(() => {
    mockPlayerState = createPlayerState("Test Player", "musa", "geon");
  });

  const defaultProps: {
    playerState: PlayerState;
    playerIndex: number;
    onStateUpdate: (updates: Partial<PlayerState>) => void;
    isActive?: boolean;
  } = {
    playerState: mockPlayerState,
    playerIndex: 0,
    onStateUpdate: vi.fn(),
    archetype: "musa" as PlayerArchetype,
    stance: "geon" as TrigramStance,
    position: { x: 100, y: 100 },
    facing: "right" as const,
    isAttacking: false,
    health: 100,
    maxHealth: 100,
    ki: 80,
    maxKi: 100,
    stamina: 90,
    maxStamina: 100,
    isActive: true,
  };

  it("should render without crashing", () => {
    const { container } = render(<Player {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it("should display players", () => {
    render(<Player {...defaultProps} />);
    expect(document.body).toBeInTheDocument();
  });

  it("should handle different archetypes", () => {
    const playerWithDifferentArchetype = {
      ...defaultProps,
      playerState: createPlayerState("player2", "amsalja", "gon"),
    };
    render(<Player {...playerWithDifferentArchetype} />);
  });
});
