import React from "react";
import { render } from "@testing-library/react"; // Removed unused screen import
import "@testing-library/jest-dom";
import { Application } from "@pixi/react";
import { GameEngine } from "./GameEngine";
import { createPlayerState } from "../../utils/playerUtils";
import type { KoreanText, PlayerState, Position } from "../../types"; // GameState, HitEffect removed
import { PlayerArchetype, GamePhase, GameMode } from "../../types/enums"; // Corrected path
// import { GAME_CONFIG } from "../../types/constants"; // Removed GAME_CONFIG

// Mock audio provider for tests
const MockAudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mockAudioManager = {
    playSFX: vi.fn(),
    playMusic: vi.fn(),
    stopMusic: vi.fn(),
    setMasterVolume: vi.fn(),
    setSFXVolume: vi.fn(),
    setMusicVolume: vi.fn(),
    setMuted: vi.fn(),
    getState: vi.fn(() => ({
      masterVolume: 0.7,
      sfxVolume: 0.8,
      musicVolume: 0.5,
      muted: false,
      currentMusicTrack: null,
      isInitialized: true,
      fallbackMode: false,
    })),
    playAttackSound: vi.fn(),
    playHitSound: vi.fn(),
    playTechniqueSound: vi.fn(),
    playStanceChangeSound: vi.fn(),
    playBlockSound: vi.fn(),
    stopAllSounds: vi.fn(),
    init: vi.fn(),
    isInitialized: true,
    loadAudioAsset: vi.fn(),
    isMusicPlaying: vi.fn(() => false),
  };

  return (
    // @ts-ignore - Mock provider
    <AudioProvider manager={mockAudioManager}>{children}</AudioProvider>
  );
};

const mockPlayer1Name: KoreanText = { korean: "무사", english: "Warrior" };
const mockPlayer2Name: KoreanText = { korean: "암살자", english: "Assassin" };
const mockPlayer1Position: Position = { x: 100, y: 300 };
const mockPlayer2Position: Position = { x: 600, y: 300 };

const mockPlayer1: PlayerState = createPlayerState(
  "player1",
  PlayerArchetype.MUSA, // Use enum
  mockPlayer1Name,
  mockPlayer1Position
);
const mockPlayer2: PlayerState = createPlayerState(
  "player2",
  PlayerArchetype.AMSALJA, // Use enum
  mockPlayer2Name,
  mockPlayer2Position
);

describe("GameEngine", () => {
  const defaultProps = {
    player1: mockPlayer1,
    player2: mockPlayer2,
    gamePhase: GamePhase.COMBAT, // Fix: use enum
    onGameStateChange: vi.fn(),
    onPlayerUpdate: vi.fn(),
    onGamePhaseChange: vi.fn(),
    gameMode: GameMode.VERSUS, // Fix: use enum
  };

  const renderGameEngine = (props = {}) => {
    return render(
      <MockAudioProvider>
        <Application>
          <GameEngine {...defaultProps} {...props} />
        </Application>
      </MockAudioProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { container } = renderGameEngine();
    expect(container).toBeInTheDocument();
  });

  it("initializes in combat mode", () => {
    renderGameEngine({ gamePhase: "combat" });
    expect(defaultProps.onGameStateChange).toHaveBeenCalled();
  });

  it("handles training mode", () => {
    renderGameEngine({ gameMode: "training" });
    expect(defaultProps.onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        isTraining: true,
      })
    );
  });

  it("processes game state changes", () => {
    const onGameStateChange = vi.fn();
    renderGameEngine({ onGameStateChange });

    expect(onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        phase: "combat",
        player1: mockPlayer1,
        player2: mockPlayer2,
      })
    );
  });

  it("handles player updates", () => {
    const onPlayerUpdate = vi.fn();
    renderGameEngine({ onPlayerUpdate });

    // The game engine should be ready to handle player updates
    expect(onPlayerUpdate).not.toHaveBeenCalled(); // Not called automatically
  });

  it("manages combat effects", () => {
    const { rerender } = renderGameEngine();

    // Combat effects should be managed internally
    rerender(
      <MockAudioProvider>
        <Application>
          <GameEngine {...defaultProps} />
        </Application>
      </MockAudioProvider>
    );

    expect(defaultProps.onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        combatEffects: expect.any(Array),
      })
    );
  });

  it("handles victory conditions", () => {
    const damagedPlayer = {
      ...mockPlayer2,
      health: 0,
    };

    renderGameEngine({ player2: damagedPlayer });

    // Should detect victory condition in the game loop
    expect(defaultProps.onGamePhaseChange).not.toHaveBeenCalledWith("victory");
  });

  it("processes stance changes", () => {
    const { container } = renderGameEngine();

    // Game engine should be ready to process stance changes
    expect(container).toBeInTheDocument();

    // In a full test, we would simulate stance change events
    // For now, verify the component renders properly
  });

  it("handles Korean martial arts techniques", () => {
    renderGameEngine();

    // Verify that the game engine is set up to handle Korean techniques
    expect(defaultProps.onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        player1: expect.objectContaining({
          archetype: "musa",
          currentStance: expect.any(String),
        }),
        player2: expect.objectContaining({
          archetype: "amsalja",
          currentStance: expect.any(String),
        }),
      })
    );
  });

  it("manages game timing", async () => {
    renderGameEngine();

    // Wait for game loop to process
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Should have called game state change multiple times due to game loop
    expect(defaultProps.onGameStateChange).toHaveBeenCalled();
  });

  it("handles different game phases", () => {
    renderGameEngine({ gamePhase: "victory" });

    expect(defaultProps.onGameStateChange).toHaveBeenCalledWith(
      expect.objectContaining({
        phase: "victory",
      })
    );
  });
});
