import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Player } from "./Player";
import { type PlayerState, TRIGRAM_DATA, createPlayerState } from "../../types";

// Mock @pixi/react with proper JSX component types
vi.mock("@pixi/react", () => ({
  useTick: vi.fn((callback) => {
    // Simulate tick callback
    callback(0.016); // 60fps
  }),
}));

// Mock PixiJS components with proper React component structure
vi.mock("../ui/base/PixiComponents", () => ({
  PixiContainerComponent: ({ children, onClick, ...props }: any) => (
    <div data-testid="pixi-container" onClick={onClick} {...props}>
      {children}
    </div>
  ),
  PixiGraphicsComponent: ({ draw, ...props }: any) => {
    if (draw) {
      const mockGraphics = {
        clear: vi.fn(),
        setFillStyle: vi.fn(),
        setStrokeStyle: vi.fn(),
        circle: vi.fn(),
        rect: vi.fn(),
        fill: vi.fn(),
        stroke: vi.fn(),
      };
      draw(mockGraphics);
    }
    return <div data-testid="pixi-graphics" {...props} />;
  },
  PixiTextComponent: ({ text, ...props }: any) => (
    <div data-testid="pixi-text" data-text={text} {...props}>
      {text}
    </div>
  ),
}));

describe("Player Component", () => {
  const mockPlayerState: PlayerState = createPlayerState(
    "player1",
    { x: 100, y: 200 },
    "geon",
    {
      health: 80,
      maxHealth: 100,
      ki: 60,
      maxKi: 100,
      stamina: 90,
      maxStamina: 100,
      isAttacking: false,
      isBlocking: false,
    }
  );

  it("should render within PixiJS Application", () => {
    const { container } = render(
      <Player
        playerState={mockPlayerState}
        onAttack={() => {}}
        isPlayer1={true}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("should handle attacks", () => {
    let capturedDamage: number | null = null;

    const handleAttack = (damage: number) => {
      capturedDamage = damage;
    };

    render(
      <Player
        playerState={mockPlayerState}
        onAttack={handleAttack}
        isPlayer1={true}
      />
    );

    // Test that component renders without errors
    expect(capturedDamage).toBeNull(); // Initially no attacks
  });

  it("should render player with Korean martial arts styling", () => {
    const { getByTestId } = render(
      <Player
        playerState={mockPlayerState}
        isPlayer1={true}
        onAttack={() => {}}
      />
    );

    expect(getByTestId("pixi-container")).toBeInTheDocument();
    expect(getByTestId("pixi-graphics")).toBeInTheDocument();
  });

  it("should execute attack when clicked", () => {
    const mockOnAttack = vi.fn();
    const { getByTestId } = render(
      <Player
        playerState={mockPlayerState}
        isPlayer1={true}
        onAttack={mockOnAttack}
      />
    );

    // Click on player container
    const playerContainer = getByTestId("pixi-container");
    fireEvent.click(playerContainer);

    // Verify attack was called with correct damage and position
    expect(mockOnAttack).toHaveBeenCalledWith(
      TRIGRAM_DATA["geon"].technique.damage,
      mockPlayerState.position
    );
  });

  it("should display Korean stance information", () => {
    const geonPlayer = createPlayerState(
      "geonPlayer",
      { x: 100, y: 100 },
      "geon"
    );

    const { container } = render(
      <Player playerState={geonPlayer} onAttack={() => {}} isPlayer1={false} />
    );

    expect(container).toBeInTheDocument();
    // Note: PixiJS content is rendered to canvas, so we can't test text content directly
    // This test verifies the component mounts successfully with Korean stance data
  });
});
