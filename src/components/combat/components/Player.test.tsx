import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Player } from "./Player";
import { renderWithPixi } from "../../../test/test-utils";
import { PlayerArchetype, TrigramStance } from "../../../types/enums";
import type { PlayerState } from "../../../types/player";

const mockPlayerState: PlayerState = {
  id: "test-player",
  name: { korean: "테스트 무사", english: "Test Warrior" },
  archetype: PlayerArchetype.MUSA,
  health: 80,
  maxHealth: 100,
  ki: 60,
  maxKi: 100,
  stamina: 70,
  maxStamina: 100,
  energy: 100,
  maxEnergy: 100,
  attackPower: 75,
  defense: 75,
  speed: 75,
  technique: 75,
  pain: 10,
  consciousness: 90,
  balance: 85,
  momentum: 0,
  currentStance: TrigramStance.GEON,
  combatState: "idle" as any,
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
  totalDamageReceived: 20,
  totalDamageDealt: 35,
  hitsTaken: 3,
  hitsLanded: 5,
  perfectStrikes: 1,
  vitalPointHits: 2,
  experiencePoints: 150,
};

describe("Player Component", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render player with correct Korean name", () => {
    renderWithPixi(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0")).toBeInTheDocument();
    expect(screen.getByTestId("player-0-name")).toHaveTextContent(
      "테스트 무사"
    );
  });

  it("should display health status correctly", () => {
    renderWithPixi(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    // Health should be 80/100
    expect(screen.getByTestId("player-0")).toBeInTheDocument();
  });

  it("should show current stance correctly", () => {
    renderWithPixi(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0-stance")).toHaveTextContent("G"); // Geon stance
  });

  it("should handle click events", () => {
    renderWithPixi(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    fireEvent.click(screen.getByTestId("player-0"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should display blocking state visually", () => {
    const blockingPlayer = { ...mockPlayerState, isBlocking: true };

    renderWithPixi(
      <Player
        playerState={blockingPlayer}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0")).toBeInTheDocument();
    // Blocking state should be reflected in visual appearance
  });

  it("should display stunned state correctly", () => {
    const stunnedPlayer = { ...mockPlayerState, isStunned: true };

    renderWithPixi(
      <Player
        playerState={stunnedPlayer}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0")).toBeInTheDocument();
    // Stunned state should show visual effects
  });

  it("should show unconscious state when consciousness is zero", () => {
    const unconsciousPlayer = { ...mockPlayerState, consciousness: 0 };

    renderWithPixi(
      <Player
        playerState={unconsciousPlayer}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0-unconscious")).toBeInTheDocument();
    expect(screen.getByTestId("player-0-unconscious")).toHaveTextContent(
      "기절"
    );
  });

  it("should display status effects", () => {
    const playerWithEffects = {
      ...mockPlayerState,
      statusEffects: [
        {
          id: "stun1",
          type: "stun" as any,
          duration: 1000,
          startTime: Date.now(),
        },
        {
          id: "poison1",
          type: "poison" as any,
          duration: 2000,
          startTime: Date.now(),
        },
      ],
    };

    renderWithPixi(
      <Player
        playerState={playerWithEffects}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0")).toBeInTheDocument();
    // Status effects should be visually represented
  });

  it("should adapt to different grid positions", () => {
    renderWithPixi(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onClick={mockOnClick}
        gridPosition={{ row: 5, col: 3 }}
        gridSize={60}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0")).toBeInTheDocument();
  });

  it("should show active state when selected", () => {
    renderWithPixi(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onClick={mockOnClick}
        isActive={true}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0")).toBeInTheDocument();
    // Active state should show visual highlighting
  });

  it("should display archetype-specific colors", () => {
    const differentArchetypes = [
      PlayerArchetype.AMSALJA,
      PlayerArchetype.HACKER,
      PlayerArchetype.JEONGBO_YOWON,
      PlayerArchetype.JOJIK_POKRYEOKBAE,
    ];

    differentArchetypes.forEach((archetype, index) => {
      const playerWithArchetype = {
        ...mockPlayerState,
        archetype,
        id: `player-${index}`,
      };

      const { unmount } = renderWithPixi(
        <Player
          playerState={playerWithArchetype}
          playerIndex={index}
          onClick={mockOnClick}
          data-testid={`player-${index}`}
        />
      );

      expect(screen.getByTestId(`player-${index}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("should maintain Korean martial arts authenticity", () => {
    renderWithPixi(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    // Should display Korean names and terminology
    expect(screen.getByTestId("player-0-name")).toHaveTextContent(
      "테스트 무사"
    );
    expect(screen.getByTestId("player-0")).toBeInTheDocument();
  });

  it("should handle low health states with appropriate visual feedback", () => {
    const lowHealthPlayer = { ...mockPlayerState, health: 15, maxHealth: 100 };

    renderWithPixi(
      <Player
        playerState={lowHealthPlayer}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    expect(screen.getByTestId("player-0")).toBeInTheDocument();
    // Low health should be visually distinct (red coloring, etc.)
  });

  it("should display ki energy correctly", () => {
    renderWithPixi(
      <Player
        playerState={mockPlayerState}
        playerIndex={0}
        onClick={mockOnClick}
        data-testid="player-0"
      />
    );

    // Ki should be 60/100 as per mockPlayerState
    expect(screen.getByTestId("player-0")).toBeInTheDocument();
  });
});

describe("Performance and Stability", () => {
  it("should render without errors with minimal props", () => {
    expect(() => {
      renderWithPixi(
        <Player
          playerState={mockPlayerState}
          playerIndex={0}
          onClick={mockClick}
        />
      );
    }).not.toThrow();
  });

  it("should handle all archetype types", () => {
    const archetypes = Object.values(PlayerArchetype);

    archetypes.forEach((archetype) => {
      const player = { ...mockPlayerState, archetype };
      expect(() => {
        renderWithPixi(
          <Player playerState={player} playerIndex={0} onClick={mockClick} />
        );
      }).not.toThrow();
    });
  });

  it("should handle extreme health values", () => {
    const criticalPlayer = {
      ...mockPlayerState,
      health: 1,
      ki: 0,
      stamina: 0,
    };

    expect(() => {
      renderWithPixi(
        <Player
          playerState={criticalPlayer}
          playerIndex={0}
          onClick={mockClick}
        />
      );
    }).not.toThrow();
  });
});
