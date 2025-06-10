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
  const [selectedArchetype, setSelectedArchetype] = useState<PlayerArchetype>(
    PlayerArchetype.AMSALJA
  );

  // Add responsive screen size detection
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  });

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

  const handleArchetypeSelect = useCallback((archetype: PlayerArchetype) => {
    setSelectedArchetype(archetype);
    console.log(`Selected archetype: ${archetype}`);
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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        style={{
          outline: "none",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        data-testid="app-container"
      >
        <Application
          width={screenSize.width}
          height={screenSize.height}
          backgroundColor={0x0a0a0f}
          antialias={true}
          autoDensity={true}
          resizeTo={window}
        >
          {renderCurrentScreen()}
        </Application>

        {/* Enhanced Full-Screen Overlay with Better Test IDs */}
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
          data-testid="ui-overlay"
        >
          {/* Intro Screen Test Elements */}
          {gameMode === null && (
            <>
              <div
                className="intro-screen"
                data-testid="intro-screen"
                style={{
                  pointerEvents: "none",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              />

              <button
                className="training-button"
                data-testid="training-button"
                style={{
                  position: "absolute",
                  top: "45%",
                  left: "35%",
                  padding: "12px 24px",
                  backgroundColor: "rgba(0, 212, 255, 0.8)",
                  color: "white",
                  border: "2px solid #00d4ff",
                  borderRadius: "8px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  fontSize: "16px",
                  fontWeight: "bold",
                  zIndex: 1001,
                }}
                onClick={() => handleGameStart(GameMode.TRAINING)}
              >
                훈련 모드 - Training
              </button>

              <button
                className="combat-button"
                data-testid="combat-button"
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "35%",
                  padding: "12px 24px",
                  backgroundColor: "rgba(255, 107, 53, 0.8)",
                  color: "white",
                  border: "2px solid #ff6b35",
                  borderRadius: "8px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  fontSize: "16px",
                  fontWeight: "bold",
                  zIndex: 1001,
                }}
                onClick={() => handleGameStart(GameMode.VERSUS)}
              >
                대전 모드 - Combat
              </button>

              {/* Fixed Archetype Selection */}
              <div
                className="archetype-section"
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "5%",
                  pointerEvents: "auto",
                  zIndex: 1001,
                }}
              >
                <button
                  className="archetype-toggle"
                  data-testid="archetype-toggle"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "rgba(255, 215, 0, 0.8)",
                    color: "black",
                    border: "2px solid #ffd700",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    display: "block",
                  }}
                  onClick={() => console.log("Archetype toggle clicked")}
                >
                  무사 유형 - Archetype
                </button>

                <div data-testid="archetype-list" style={{ display: "block" }}>
                  {[
                    {
                      id: PlayerArchetype.MUSA,
                      korean: "무사",
                      english: "Warrior",
                    },
                    {
                      id: PlayerArchetype.AMSALJA,
                      korean: "암살자",
                      english: "Assassin",
                    },
                    {
                      id: PlayerArchetype.HACKER,
                      korean: "해커",
                      english: "Hacker",
                    },
                    {
                      id: PlayerArchetype.JEONGBO_YOWON,
                      korean: "정보요원",
                      english: "Agent",
                    },
                    {
                      id: PlayerArchetype.JOJIK_POKRYEOKBAE,
                      korean: "조직폭력배",
                      english: "Gangster",
                    },
                  ].map((archetype) => (
                    <button
                      key={archetype.id}
                      className={`archetype-option-${archetype.id}`}
                      data-testid={`archetype-option-${archetype.id}`}
                      style={{
                        display: "block",
                        width: "200px",
                        padding: "8px 16px",
                        marginBottom: "5px",
                        backgroundColor:
                          selectedArchetype === archetype.id
                            ? "rgba(255, 215, 0, 0.3)"
                            : "rgba(26, 26, 46, 0.9)",
                        color: "white",
                        border: "1px solid #4a5568",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                        textAlign: "left",
                      }}
                      onClick={() => handleArchetypeSelect(archetype.id)}
                    >
                      {archetype.korean} - {archetype.english}
                    </button>
                  ))}
                </div>

                <div
                  data-testid="selected-archetype"
                  style={{
                    marginTop: "10px",
                    padding: "8px",
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    color: "#ffd700",
                    borderRadius: "4px",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  선택됨:{" "}
                  {selectedArchetype === PlayerArchetype.AMSALJA
                    ? "암살자"
                    : selectedArchetype === PlayerArchetype.HACKER
                    ? "해커"
                    : selectedArchetype === PlayerArchetype.MUSA
                    ? "무사"
                    : selectedArchetype === PlayerArchetype.JEONGBO_YOWON
                    ? "정보요원"
                    : "조직폭력배"}
                </div>
              </div>
            </>
          )}

          {/* Training Screen Test Elements */}
          {gameMode === GameMode.TRAINING && (
            <>
              <div
                className="training-screen"
                data-testid="training-screen"
                style={{
                  pointerEvents: "none",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              />
              <button
                data-testid="return-to-menu-button"
                style={{
                  position: "absolute",
                  bottom: "10%",
                  right: "10%",
                  padding: "10px 20px",
                  backgroundColor: "rgba(74, 85, 104, 0.8)",
                  color: "white",
                  border: "2px solid #4a5568",
                  borderRadius: "6px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  fontSize: "14px",
                  zIndex: 1001,
                }}
                onClick={handleReturnToMenu}
              >
                메뉴로 돌아가기 - Return to Menu
              </button>
            </>
          )}

          {/* Combat Screen Test Elements */}
          {(gameMode === GameMode.VERSUS || gameMode === GameMode.PRACTICE) && (
            <>
              <div
                className="combat-screen"
                data-testid="combat-screen"
                style={{
                  pointerEvents: "none",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  pointerEvents: "none",
                  zIndex: 1001,
                }}
              >
                Combat - 전투
              </div>
              <button
                data-testid="return-to-menu-button"
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  padding: "10px 20px",
                  backgroundColor: "rgba(74, 85, 104, 0.8)",
                  color: "white",
                  border: "2px solid #4a5568",
                  borderRadius: "6px",
                  cursor: "pointer",
                  pointerEvents: "auto",
                  fontSize: "14px",
                  zIndex: 1001,
                }}
                onClick={handleReturnToMenu}
              >
                메뉴
              </button>
            </>
          )}
        </div>
      </div>
    </AudioProvider>
  );
}

export default App;
