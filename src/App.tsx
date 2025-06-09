import React, { useState, useCallback, useMemo } from "react";
import { Stage } from "@pixi/react";

// Import screens
import { IntroScreen } from "./components/intro/IntroScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { EndScreen } from "./components/ui/EndScreen";

// Import types and utilities
import type { GameState, PlayerState, MatchStatistics } from "./types";
import { GameMode, PlayerArchetype, GamePhase } from "./types/enums";
import { GAME_CONFIG } from "./types/constants/game";
import { createPlayerFromArchetype } from "./utils/playerUtils";
import { AudioProvider } from "./audio/AudioProvider";
import { GameUI } from "./components";

const App: React.FC = () => {
  // Create default players with proper stance parameter
  const mockPlayers = useMemo(() => {
    const player1 = createPlayerFromArchetype(PlayerArchetype.MUSA, 0);
    const player2 = createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1);
    return [player1, player2] as const;
  }, []);

  // Complete MatchStatistics structure with ALL required properties
  const mockMatchStats = useMemo(
    (): MatchStatistics => ({
      // Top-level properties
      totalDamageDealt: 270,
      totalDamageTaken: 270,
      criticalHits: 8,
      vitalPointHits: 5,
      techniquesUsed: 50,
      perfectStrikes: 3,
      consecutiveWins: 1,
      matchDuration: 180,
      totalMatches: 1,
      maxRounds: 3,
      winner: 0,
      totalRounds: 3,
      currentRound: 1,
      timeRemaining: 120,
      combatEvents: [],
      finalScore: { player1: 2, player2: 1 },
      roundsWon: { player1: 2, player2: 1 },

      // Individual player statistics
      player1: {
        wins: 2,
        losses: 1,
        hitsTaken: 15,
        hitsLanded: 20,
        totalDamageDealt: 150,
        totalDamageReceived: 120,
        techniques: [],
        perfectStrikes: 2,
        vitalPointHits: 3,
        consecutiveWins: 1,
        matchDuration: 180,
      },
      player2: {
        wins: 1,
        losses: 2,
        hitsTaken: 20,
        hitsLanded: 15,
        totalDamageDealt: 120,
        totalDamageReceived: 150,
        techniques: [],
        perfectStrikes: 1,
        vitalPointHits: 2,
        consecutiveWins: 0,
        matchDuration: 180,
      },
    }),
    []
  );

  const [gameState, setGameState] = useState<GameState>(() => ({
    mode: GameMode.VERSUS,
    phase: GamePhase.INTRO,
    players: mockPlayers as readonly [PlayerState, PlayerState],
    currentRound: 1,
    maxRounds: 3,
    timeRemaining: 120,
    isPaused: false,
    matchStatistics: mockMatchStats,
    winner: undefined,
  }));

  // Use setGameState properly
  const handleStateChange = useCallback((newState: GameState) => {
    setGameState(newState);
  }, []);

  // Screen navigation handlers
  const handleMenuSelect = useCallback((mode: GameMode) => {
    setGameState((prev) => ({
      ...prev,
      mode,
      phase: mode === GameMode.TRAINING ? GamePhase.TRAINING : GamePhase.COMBAT,
    }));
  }, []);

  const handleReturnToMenu = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      phase: GamePhase.INTRO,
      currentRound: 1,
      timeRemaining: 180,
      isPaused: false,
      winner: undefined,
    }));
  }, []);

  const handleGameEnd = useCallback(
    (winner: number) => {
      console.log("Game ended", winner);

      // Determine the actual winner from player index
      let finalWinner: PlayerState | null = null;
      if (winner === 0) {
        finalWinner = gameState.players[0];
      } else if (winner === 1) {
        finalWinner = gameState.players[1];
      }

      setGameState((prev) => ({
        ...prev,
        phase: GamePhase.GAME_OVER,
        winner: finalWinner,
      }));
    },
    [gameState.players] // Fix: Add dependency
  );

  // Fix: Use correct function signature - match CombatScreenProps
  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      if (playerIndex !== 0 && playerIndex !== 1) return;

      setGameState((prev) => ({
        ...prev,
        players: [
          playerIndex === 0
            ? { ...prev.players[0], ...updates }
            : prev.players[0],
          playerIndex === 1
            ? { ...prev.players[1], ...updates }
            : prev.players[1],
        ] as readonly [PlayerState, PlayerState],
      }));
    },
    []
  );

  return (
    <Stage width={GAME_CONFIG.CANVAS_WIDTH} height={GAME_CONFIG.CANVAS_HEIGHT}>
      <AudioProvider>
        {gameState.phase === GamePhase.INTRO && (
          <IntroScreen onMenuSelect={handleMenuSelect} />
        )}

        {gameState.phase === GamePhase.TRAINING && (
          <TrainingScreen
            onReturnToMenu={handleReturnToMenu}
            player={gameState.players[0]}
            onPlayerUpdate={(updates: Partial<PlayerState>) => {
              handlePlayerUpdate(0, updates);
            }}
            selectedArchetype={gameState.players[0].archetype}
            width={GAME_CONFIG.CANVAS_WIDTH}
            height={GAME_CONFIG.CANVAS_HEIGHT}
          />
        )}

        {gameState.phase === GamePhase.COMBAT && (
          <CombatScreen
            players={gameState.players}
            currentRound={gameState.currentRound}
            timeRemaining={gameState.timeRemaining}
            isPaused={gameState.isPaused}
            onPlayerUpdate={handlePlayerUpdate}
            onReturnToMenu={handleReturnToMenu}
            onGameEnd={handleGameEnd}
            gameMode={gameState.mode}
            matchStatistics={mockMatchStats}
          />
        )}

        {gameState.phase === GamePhase.GAME_OVER && (
          <EndScreen
            winner={gameState.winner}
            matchStatistics={mockMatchStats}
            onReturnToMenu={handleReturnToMenu}
            onRestart={() =>
              setGameState((prev) => ({ ...prev, phase: GamePhase.INTRO }))
            }
          />
        )}

        {/* Game UI overlays */}
        <GameUI
          gameState={gameState}
          onStateChange={handleStateChange}
          onReturnToMenu={handleReturnToMenu}
          onPlayerUpdate={(updates: Partial<PlayerState>) => {
            handlePlayerUpdate(0, updates);
          }}
        />
      </AudioProvider>
    </Stage>
  );
};

export default App;
