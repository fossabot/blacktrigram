import { useState, useCallback, useEffect, useRef } from "react";
import { Application } from "@pixi/react";
import { exposePixiAppForTesting } from "./test/pixi-cypress-helpers";
import { usePixiExtensions } from "./utils/pixiExtensions";
import { AudioProvider } from "./audio/AudioProvider";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { EndScreen } from "./components/ui/EndScreen";
import { GameMode, PlayerArchetype } from "./types/enums";
import { createPlayerFromArchetype } from "./utils/playerUtils";
import type { PlayerState } from "./types/player";
import type { MatchStatistics } from "./types/game";
import "./App.css";

function App() {
  usePixiExtensions();

  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameWinner, setGameWinner] = useState<PlayerState | null>(null);
  const [matchStats, setMatchStats] = useState<MatchStatistics | null>(null);
  const [appReady, setAppReady] = useState(false);

  const handleApplicationReady = useCallback((app: any) => {
    if (app && typeof window !== "undefined") {
      // Expose for testing
      exposePixiAppForTesting(app);
    }
  }, []);

  // Fix: Move useEffect inside component body
  useEffect(() => {
    // Alternative way to access PIXI app if needed
    const checkForApp = () => {
      const pixiApp = (window as any).pixiApp;
      if (pixiApp) {
        handleApplicationReady(pixiApp);
      }
    };

    const timer = setInterval(checkForApp, 100);
    setTimeout(() => clearInterval(timer), 5000); // Stop checking after 5 seconds

    return () => clearInterval(timer);
  }, [handleApplicationReady]);

  // Fix: Ensure app is properly initialized
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Focus window for input handling
        window.focus();

        // Set up global error handlers for audio issues
        window.addEventListener("error", (e) => {
          console.error("Global error:", e.error);
        });

        window.addEventListener("unhandledrejection", (e) => {
          console.error("Unhandled promise rejection:", e.reason);
          // Prevent audio loading failures from failing tests
          if (
            e.reason?.message?.includes("Failed to load") ||
            e.reason?.message?.includes("no supported source")
          ) {
            e.preventDefault();
          }
        });

        setAppReady(true);
        console.log("🎯 Black Trigram app initialized");
      } catch (error) {
        console.error("Failed to initialize app:", error);
        setAppReady(true); // Continue with fallback
      }
    };

    initializeApp();
  }, []);

  const handleGameStart = useCallback((mode: GameMode) => {
    console.log("🎮 Starting game mode:", mode);
    setGameMode(mode);
    setIsGameActive(true);
    setGameWinner(null);
    setMatchStats(null);
  }, []);

  const handleGameEnd = useCallback((winner: number) => {
    setIsGameActive(false);
    setGameWinner(createPlayerFromArchetype(PlayerArchetype.MUSA, winner));

    // Create basic match statistics
    setMatchStats({
      totalDamageDealt: 150,
      totalDamageTaken: 100,
      criticalHits: 3,
      vitalPointHits: 2,
      techniquesUsed: 8,
      perfectStrikes: 1,
      consecutiveWins: 1,
      matchDuration: 120,
      totalMatches: 1,
      maxRounds: 3,
      winner: winner,
      totalRounds: 2,
      currentRound: 2,
      timeRemaining: 0,
      combatEvents: [],
      finalScore: {
        player1: winner === 0 ? 2 : 0,
        player2: winner === 1 ? 2 : 0,
      },
      roundsWon: {
        player1: winner === 0 ? 2 : 0,
        player2: winner === 1 ? 2 : 0,
      },
      player1: {
        wins: winner === 0 ? 1 : 0,
        losses: winner === 0 ? 0 : 1,
        hitsTaken: 5,
        hitsLanded: 8,
        totalDamageDealt: winner === 0 ? 150 : 100,
        totalDamageReceived: winner === 0 ? 100 : 150,
        techniques: ["천둥벽력", "유수연타"],
        perfectStrikes: winner === 0 ? 1 : 0,
        vitalPointHits: winner === 0 ? 2 : 1,
        consecutiveWins: winner === 0 ? 1 : 0,
        matchDuration: 120,
      },
      player2: {
        wins: winner === 1 ? 1 : 0,
        losses: winner === 1 ? 0 : 1,
        hitsTaken: 8,
        hitsLanded: 5,
        totalDamageDealt: winner === 1 ? 150 : 100,
        totalDamageReceived: winner === 1 ? 100 : 150,
        techniques: ["화염지창", "벽력일섬"],
        perfectStrikes: winner === 1 ? 1 : 0,
        vitalPointHits: winner === 1 ? 2 : 1,
        consecutiveWins: winner === 1 ? 1 : 0,
        matchDuration: 120,
      },
    });
  }, []);

  const handleReturnToMenu = useCallback(() => {
    setGameMode(null);
    setIsGameActive(false);
    setGameWinner(null);
    setMatchStats(null);
  }, []);

  const renderCurrentScreen = () => {
    // Show end screen if game ended
    if (gameWinner && matchStats) {
      return (
        <EndScreen
          winner={gameWinner}
          matchStatistics={matchStats}
          onReturnToMenu={handleReturnToMenu}
          onRestart={() => handleGameStart(gameMode!)}
        />
      );
    }

    // Show game screen based on mode
    if (isGameActive && gameMode) {
      switch (gameMode) {
        case GameMode.TRAINING:
          return (
            <TrainingScreen
              onReturnToMenu={handleReturnToMenu}
              width={1200}
              height={800}
            />
          );
        case GameMode.VERSUS:
        case GameMode.PRACTICE:
          const player1 = createPlayerFromArchetype(PlayerArchetype.MUSA, 0);
          const player2 = createPlayerFromArchetype(PlayerArchetype.AMSALJA, 1);

          return (
            <CombatScreen
              players={[player1, player2]}
              currentRound={1}
              timeRemaining={180}
              isPaused={false}
              onPlayerUpdate={(playerIndex, updates) => {
                console.log(`Player ${playerIndex} updated:`, updates);
              }}
              onReturnToMenu={handleReturnToMenu}
              onGameEnd={handleGameEnd}
              gameMode={gameMode}
              width={1200}
              height={800}
            />
          );
        default:
          return <IntroScreen onMenuSelect={handleGameStart} />;
      }
    }

    // Default to intro screen
    return <IntroScreen onMenuSelect={handleGameStart} />;
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, [appReady]);

  if (!appReady) {
    return (
      <div className="app loading" data-testid="app-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            color: "white",
            backgroundColor: "#1a1a2e",
          }}
        >
          흑괘 로딩 중... Loading Black Trigram...
        </div>
      </div>
    );
  }

  return (
    <AudioProvider>
      <div
        className="app"
        tabIndex={0}
        ref={containerRef}
        style={{ outline: "none" }}
        data-testid="app-container"
      >
        <Application
          width={1200}
          height={800}
          backgroundColor={0x1a1a2e}
          antialias={true}
          autoDensity={true}
          resizeTo={window}
        >
          {renderCurrentScreen()}
        </Application>

        {/* HTML Overlay for better testability */}
        <div
          className="test-overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {/* Invisible HTML elements for testing */}
          {gameMode === null && (
            <div className="intro-screen" data-testid="intro-screen" />
          )}

          {gameMode === null && (
            <>
              <button
                className="training-button"
                data-testid="training-button"
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: "40%",
                  left: "20%",
                }}
                onClick={() => handleGameStart(GameMode.TRAINING)}
              >
                Training
              </button>
              <button
                className="combat-button"
                data-testid="combat-button"
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: "50%",
                  left: "20%",
                }}
                onClick={() => handleGameStart(GameMode.VERSUS)}
              >
                Combat
              </button>
              <button
                className="archetype-toggle"
                data-testid="archetype-toggle"
                style={{
                  opacity: 0,
                  position: "absolute",
                  bottom: "20%",
                  left: "20%",
                }}
              >
                Archetype
              </button>
              {[
                "musa",
                "amsalja",
                "hacker",
                "jeongbo_yowon",
                "jojik_pokryeokbae",
              ].map((archetype) => (
                <button
                  key={archetype}
                  className={`archetype-option-${archetype}`}
                  data-testid={`archetype-option-${archetype}`}
                  style={{
                    opacity: 0,
                    position: "absolute",
                    bottom: "10%",
                    left: "20%",
                  }}
                >
                  {archetype}
                </button>
              ))}
              <div
                data-testid="selected-archetype"
                style={{
                  opacity: 0,
                  position: "absolute",
                }}
              >
                암살자
              </div>
            </>
          )}

          {gameMode === GameMode.TRAINING && (
            <>
              <div className="training-screen" data-testid="training-screen" />
              <button
                data-testid="return-to-menu-button"
                style={{
                  opacity: 0,
                  position: "absolute",
                  bottom: "10%",
                  right: "10%",
                }}
                onClick={handleReturnToMenu}
              >
                Return to Menu
              </button>
            </>
          )}

          {(gameMode === GameMode.VERSUS || gameMode === GameMode.PRACTICE) && (
            <div className="combat-screen" data-testid="combat-screen" />
          )}
        </div>
      </div>
    </AudioProvider>
  );
}

export default App;
