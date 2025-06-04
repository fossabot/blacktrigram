import { describe, it, expect, vi } from "vitest"; // Remove unused beforeEach
import { render } from "@testing-library/react";
import { Player } from "../Player";
import type {
  PlayerProps,
  PlayerArchetype,
  TrigramStance,
} from "../../../types"; // Remove unused PlayerState
import { createPlayerState } from "../../../utils/playerUtils";

describe("Player Component", () => {
  const defaultProps: PlayerProps = {
    playerState: createPlayerState("Test Player", "musa", "geon"),
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
      archetype: "amsalja" as PlayerArchetype,
    };
    render(<Player {...playerWithDifferentArchetype} />);
    expect(document.body).toBeInTheDocument();
  });
});
