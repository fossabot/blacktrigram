import React, { useState, useCallback, useMemo } from "react"; // Fix: Add useMemo import
import { Stage } from "@pixi/react"; // Fix: Remove unused Application import

// Import screens
import { IntroScreen } from "./components/intro/IntroScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { EndScreen } from "./components/ui/EndScreen";

// Import types and utilities
import type { PlayerState, MatchStatistics, GameMode } from "./types";
import { PlayerArchetype, TrigramStance } from "./types/enums";
import { GAME_CONFIG, KOREAN_COLORS } from "./types/constants";
import { createPlayerStateSimple } from "./utils/playerUtils";
import { AudioProvider } from "./audio/AudioProvider";

// Game screen types
type GameScreen = "intro" | "training" | "combat" | "endscreen";

const App: React.FC = () => {
  // Fix: Add missing state variables
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("intro");
  const [winner, setWinner] = useState<PlayerState | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>("versus" as GameMode);
  const [selectedArchetype, setSelectedArchetype] = useState<PlayerArchetype>(
    "musa" as PlayerArchetype
  );

  // Combat state
  const [currentRound, setCurrentRound] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [isPaused, setIsPaused] = useState(false);

  // Fix: Create default players with proper stance parameter
  const players = useMemo<[PlayerState, PlayerState]>(
    () => [
      createPlayerStateSimple(
        "1",
        "Player 1",
        "musa" as PlayerArchetype,
        TrigramStance.GEON
      ),
      createPlayerStateSimple(
        "2",
        "Player 2",
        "amsalja" as PlayerArchetype,
        TrigramStance.TAE
      ),
    ],
    []
  );

  // Match statistics for EndScreen
  const matchStatistics = useMemo<MatchStatistics>(
    () => ({
      player1: {
        wins: winner === players[0] ? 1 : 0,
        losses: winner === players[1] ? 1 : 0,
        hitsTaken: 0,
        hitsLanded: 0,
        totalDamageDealt: 0,
        totalDamageReceived: 0,
        techniques: [],
        perfectStrikes: 0,
        vitalPointHits: 0,
        consecutiveWins: 0,
        matchDuration: 180 - timeRemaining,
      },
      player2: {
        wins: winner === players[1] ? 1 : 0,
        losses: winner === players[0] ? 1 : 0,
        hitsTaken: 0,
        hitsLanded: 0,
        totalDamageDealt: 0,
        totalDamageReceived: 0,
        techniques: [],
        perfectStrikes: 0,
        vitalPointHits: 0,
        consecutiveWins: 0,
        matchDuration: 180 - timeRemaining,
      },
      totalMatches: 1,
      currentRound,
      maxRounds: 3,
      roundsWon: {
        player1: winner === players[0] ? 1 : 0,
        player2: winner === players[1] ? 1 : 0,
      },
    }),
    [winner, players, timeRemaining, currentRound]
  );

  // Screen navigation handlers
  const handleMenuSelect = useCallback((mode: GameMode) => {
    setGameMode(mode);
    switch (mode) {
      case "training":
        setCurrentScreen("training");
        break;
      case "versus":
        setCurrentScreen("combat");
        break;
      // Fix: Remove "arcade" case as it's not in GameMode enum
      default:
        setCurrentScreen("combat");
    }
  }, []);

  const handleReturnToMenu = useCallback(() => {
    setCurrentScreen("intro");
    setWinner(null);
    setCurrentRound(1);
    setTimeRemaining(180);
    setIsPaused(false);
  }, []);

  const handleGameEnd = useCallback(
    (winner?: PlayerState | "draw" | undefined) => {
      console.log("Game ended", winner);

      // Determine the actual winner
      let finalWinner: PlayerState | null = null;
      if (winner && typeof winner === "object") {
        finalWinner = winner;
      }

      setWinner(finalWinner);
      setCurrentScreen("endscreen");
    },
    []
  );

  const handlePlayerUpdate = useCallback(
    (index: 0 | 1, updates: Partial<PlayerState>) => {
      // This would update the player state in a real implementation
      console.log(`Updating player ${index + 1}:`, updates);
    },
    []
  );

  // Fix: Use selectedArchetype for training screen
  const handleArchetypeSelect = useCallback((archetype: PlayerArchetype) => {
    setSelectedArchetype(archetype);
  }, []);

  // Remove unused pixiApp variable
  // const pixiApp = useMemo(() => { ... }, []);

  return (
    <AudioProvider>
      <div
        className="app"
        style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      >
        <Stage
          width={GAME_CONFIG.CANVAS_WIDTH}
          height={GAME_CONFIG.CANVAS_HEIGHT}
          options={{
            backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
          }}
        >
          {currentScreen === "intro" && (
            <IntroScreen
              onMenuSelect={handleMenuSelect}
              onArchetypeSelect={handleArchetypeSelect}
              selectedArchetype={selectedArchetype}
              width={GAME_CONFIG.CANVAS_WIDTH}
              height={GAME_CONFIG.CANVAS_HEIGHT}
            />
          )}

          {currentScreen === "training" && (
            <TrainingScreen
              onReturnToMenu={handleReturnToMenu}
              selectedArchetype={selectedArchetype}
              width={GAME_CONFIG.CANVAS_WIDTH}
              height={GAME_CONFIG.CANVAS_HEIGHT}
            />
          )}

          {currentScreen === "combat" && (
            <CombatScreen
              players={players}
              currentRound={currentRound}
              timeRemaining={timeRemaining}
              isPaused={isPaused}
              onPlayerUpdate={handlePlayerUpdate}
              onReturnToMenu={handleReturnToMenu}
              onGameEnd={handleGameEnd}
              gameMode={gameMode}
              width={GAME_CONFIG.CANVAS_WIDTH}
              height={GAME_CONFIG.CANVAS_HEIGHT}
            />
          )}

          {currentScreen === "endscreen" && (
            <EndScreen
              winner={winner}
              matchStatistics={matchStatistics}
              onReturnToMenu={handleReturnToMenu}
              // Fix: Remove onPlayAgain - use onReturnToMenu for now
              width={GAME_CONFIG.CANVAS_WIDTH}
              height={GAME_CONFIG.CANVAS_HEIGHT}
            />
          )}
        </Stage>
      </div>
    </AudioProvider>
  );
};

export default App;
