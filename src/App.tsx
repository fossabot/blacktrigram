import React, { useState, useCallback, useEffect } from "react";
import { IntroScreen } from "./components/intro/IntroScreen";
import { GameUI } from "./components/game/GameUI";
import { TrainingScreen } from "./components/training/TrainingScreen";
import {
  createPlayerState,
  type GamePhase,
  type PlayerState,
  type TrigramStance,
  type AppState,
  type EndScreenProps,
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
} from "./types";
import { CombatSystem } from "./systems/CombatSystem";
import "./App.css";

// Victory/Defeat Screen Component
function EndScreen({
  message,
  onRestart,
  onMenu,
}: EndScreenProps): React.ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, #${KOREAN_COLORS.DARK_BLUE.toString(
          16
        ).padStart(6, "0")}, #${KOREAN_COLORS.BLACK.toString(16).padStart(
          6,
          "0"
        )})`,
        color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
        fontFamily: KOREAN_FONT_FAMILY,
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          color: KOREAN_COLORS.GOLD.toString(16).padStart(6, "0"),
          marginBottom: "2rem",
        }}
      >
        {message}
      </h1>
      <button
        onClick={onRestart}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          backgroundColor: KOREAN_COLORS.DOJANG_BLUE.toString(16).padStart(
            6,
            "0"
          ),
        }}
      >
        다시하기 (Play Again)
      </button>
      <button
        onClick={onMenu}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          backgroundColor: KOREAN_COLORS.ACCENT_BLUE.toString(16).padStart(
            6,
            "0"
          ),
        }}
      >
        메뉴로 돌아가기 (Return to Menu)
      </button>
    </div>
  );
}

export default function App(): React.ReactElement {
  // Initialize player states using helper function
  const player1Initial = createPlayerState(
    "player1",
    { x: 200, y: 400 },
    "geon",
    {
      health: 100,
      maxHealth: 100,
      ki: 50,
      maxKi: 100,
      facing: "right",
    }
  );

  const player2Initial = createPlayerState(
    "player2",
    { x: 600, y: 400 },
    "gon",
    {
      health: 100,
      maxHealth: 100,
      ki: 50,
      maxKi: 100,
      facing: "left",
    }
  );

  const [appState, setAppState] = useState<AppState>({
    gamePhase: "intro",
    players: [player1Initial, player2Initial],
    gameTime: 0,
    currentRound: 1,
    timeRemaining: 90, // Initial round time
    combatLog: [],
    isPaused: false,
    winnerId: null,
  });

  // Game loop for combat phase
  useEffect(() => {
    if (appState.gamePhase !== "combat" || appState.isPaused) return;

    const gameLoop = setInterval(() => {
      setAppState((prev) => {
        const newTimeRemaining = Math.max(0, prev.timeRemaining - 1);
        const { gamePhase: newGamePhase, winnerId: newWinnerId } =
          CombatSystem.checkWinCondition(prev.players, newTimeRemaining);

        if (newGamePhase === "victory" || newGamePhase === "defeat") {
          return {
            ...prev,
            timeRemaining: newTimeRemaining,
            gamePhase: newGamePhase,
            winnerId: newWinnerId,
            combatLog: [
              ...prev.combatLog,
              newWinnerId ? `${newWinnerId} 승리!` : "무승부!",
            ],
          };
        }

        return {
          ...prev,
          gameTime: prev.gameTime + 1,
          timeRemaining: newTimeRemaining,
        };
      });
    }, 1000);

    return () => clearInterval(gameLoop);
  }, [appState.gamePhase, appState.isPaused]);

  const handleGamePhaseChange = useCallback((phase: GamePhase) => {
    setAppState((prev) => ({
      ...prev,
      gamePhase: phase,
      winnerId: null, // Reset winner on phase change
      // Reset game state when entering combat
      ...(phase === "combat" && {
        gameTime: 0,
        timeRemaining: 90, // Reset timer for combat
        currentRound: 1, // Reset round for new combat session
        combatLog: ["전투 시작! (Combat Started!)"],
        players: [
          createPlayerState("player1", { x: 200, y: 400 }, "geon"),
          createPlayerState("player2", { x: 600, y: 400 }, "gon"),
        ],
        isPaused: false,
      }),
    }));
  }, []);

  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance): void => {
      setAppState((prev) => ({
        ...prev,
        players: [
          playerIndex === 0
            ? { ...prev.players[0], stance, lastStanceChangeTime: Date.now() }
            : prev.players[0],
          playerIndex === 1
            ? { ...prev.players[1], stance, lastStanceChangeTime: Date.now() }
            : prev.players[1],
        ] as [PlayerState, PlayerState],
      }));
    },
    []
  );

  // Add separate handler for training screen
  const handleTrainingStanceChange = useCallback(
    (stance: TrigramStance): void => {
      handleStanceChange(0, stance); // Always update player 0 in training
    },
    [handleStanceChange]
  );

  const handleStartMatch = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      isPaused: false,
      combatLog: [...prev.combatLog, "경기 시작! (Match Started!)"],
    }));
  }, []);

  const handleResetMatch = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      gamePhase: "combat", // Directly go to combat
      gameTime: 0,
      timeRemaining: 90,
      currentRound: 1,
      isPaused: false,
      winnerId: null,
      players: [
        createPlayerState("player1", { x: 200, y: 400 }, "geon"),
        createPlayerState("player2", { x: 600, y: 400 }, "gon"),
      ],
      combatLog: ["경기 재시작! (Match Reset!)"],
    }));
  }, []);

  const handleTogglePause = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
      combatLog: [
        ...prev.combatLog,
        prev.isPaused ? "경기 재개 (Resumed)" : "일시정지 (Paused)",
      ],
    }));
  }, []);

  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>): void => {
      setAppState((prev) => {
        const newPlayers = [
          playerIndex === 0
            ? { ...prev.players[0], ...updates }
            : prev.players[0],
          playerIndex === 1
            ? { ...prev.players[1], ...updates }
            : prev.players[1],
        ] as [PlayerState, PlayerState];

        // Check win condition after player update (e.g., health change)
        const { gamePhase: newGamePhase, winnerId: newWinnerId } =
          CombatSystem.checkWinCondition(newPlayers, prev.timeRemaining);
        if (
          prev.gamePhase === "combat" &&
          (newGamePhase === "victory" || newGamePhase === "defeat")
        ) {
          return {
            ...prev,
            players: newPlayers,
            gamePhase: newGamePhase,
            winnerId: newWinnerId,
            combatLog: [
              ...prev.combatLog,
              newWinnerId ? `${newWinnerId} 승리!` : "무승부!",
            ],
          };
        }

        return {
          ...prev,
          players: newPlayers,
        };
      });
    },
    []
  );

  // Wrap the entire app with AudioManagerProvider
  const renderCurrentPhase = (): React.ReactElement => {
    switch (appState.gamePhase) {
      case "intro":
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;

      case "training":
        return (
          <TrainingScreen
            onGamePhaseChange={handleGamePhaseChange}
            onStanceChange={handleTrainingStanceChange}
            selectedStance={appState.players[0].stance}
          />
        );

      case "philosophy": // Philosophy can be part of GameUI or a separate screen
        // For now, let's assume GameUI can handle it or it's a distinct screen.
        // If Philosophy is meant to be a sub-section of Intro, that's handled by IntroScreen.
        // If it's a game mode like training/combat, GameUI might be appropriate.
        // Let's route it to IntroScreen for simplicity if it's just content display.
        // Or, if it's interactive like training, it needs its own screen or GameUI adaptation.
        // Given the existing structure, if "philosophy" is a main phase, GameUI might be okay.
        // However, the prompt implies IntroScreen's PhilosophySection.
        // Let's assume 'philosophy' from MenuSection leads to a view within IntroScreen or a dedicated screen.
        // For now, to avoid breaking existing logic if 'philosophy' is a top-level phase:
        return (
          <GameUI // Or a dedicated PhilosophyScreen if it's complex
            players={appState.players}
            gamePhase={appState.gamePhase}
            onGamePhaseChange={handleGamePhaseChange}
            gameTime={appState.gameTime}
            currentRound={appState.currentRound}
            timeRemaining={appState.timeRemaining}
            onStanceChange={handleStanceChange}
            combatLog={appState.combatLog}
            onStartMatch={handleStartMatch}
            onResetMatch={handleResetMatch}
            onTogglePause={handleTogglePause}
            onPlayerUpdate={handlePlayerUpdate}
          />
        );

      case "combat":
        return (
          <GameUI
            players={appState.players}
            gamePhase={appState.gamePhase}
            onGamePhaseChange={handleGamePhaseChange}
            gameTime={appState.gameTime}
            currentRound={appState.currentRound}
            timeRemaining={appState.timeRemaining}
            onStanceChange={handleStanceChange}
            combatLog={appState.combatLog}
            onStartMatch={handleStartMatch}
            onResetMatch={handleResetMatch}
            onTogglePause={handleTogglePause}
            onPlayerUpdate={handlePlayerUpdate}
          />
        );

      case "victory":
        return (
          <EndScreen
            message={
              appState.winnerId === "player1"
                ? "플레이어 1 승리!"
                : "플레이어 2 승리!"
            }
            onRestart={handleResetMatch}
            onMenu={() => handleGamePhaseChange("intro")}
          />
        );

      case "defeat": // Could be a draw or specific loss scenario
        return (
          <EndScreen
            message={
              appState.winnerId
                ? `${
                    appState.winnerId === "player1"
                      ? "플레이어 2"
                      : "플레이어 1"
                  } 승리!`
                : "무승부!"
            }
            onRestart={handleResetMatch}
            onMenu={() => handleGamePhaseChange("intro")}
          />
        );

      default:
        return <IntroScreen onGamePhaseChange={handleGamePhaseChange} />;
    }
  };

  // Remove AudioManagerProvider wrapper for now
  return renderCurrentPhase();
}
