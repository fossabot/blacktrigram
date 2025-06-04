import React, { useState, useCallback, useEffect, useReducer } from "react";
import { AudioProvider } from "./audio/AudioProvider";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import EndScreen from "./components/ui/EndScreen";
import type {
  AppState,
  GamePhase,
  PlayerState,
  PlayerArchetype,
  TrigramStance,
} from "./types";
import { createPlayerState } from "./utils/playerUtils";
import { KOREAN_COLORS } from "./types/constants";
import "./App.css";

// App state reducer for complex state management
interface AppAction {
  readonly type:
    | "SET_PHASE"
    | "UPDATE_PLAYER"
    | "UPDATE_GAME_TIME"
    | "SET_WINNER"
    | "RESET_GAME"
    | "TOGGLE_PAUSE"
    | "ADD_COMBAT_LOG";
  readonly payload?: any;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_PHASE":
      return { ...state, gamePhase: action.payload };

    case "UPDATE_PLAYER":
      const { playerIndex, updates } = action.payload;
      const newPlayers = [...state.players] as [PlayerState, PlayerState];
      newPlayers[playerIndex] = { ...newPlayers[playerIndex], ...updates };
      return { ...state, players: newPlayers };

    case "UPDATE_GAME_TIME":
      return {
        ...state,
        gameTime: action.payload,
        timeRemaining: Math.max(0, state.timeRemaining - action.payload),
      };

    case "SET_WINNER":
      return { ...state, winnerId: action.payload };

    case "TOGGLE_PAUSE":
      return { ...state, isPaused: !state.isPaused };

    case "ADD_COMBAT_LOG":
      return {
        ...state,
        combatLog: [...state.combatLog.slice(-9), action.payload],
      };

    case "RESET_GAME":
      return {
        ...state,
        gamePhase: "intro",
        gameTime: 0,
        currentRound: 1,
        timeRemaining: 180000,
        combatLog: [],
        isPaused: false,
        winnerId: null,
        players: [
          createPlayerState("player1", "musa"),
          createPlayerState("training_dummy", "musa"),
        ],
      };

    default:
      return state;
  }
}

// Initial app state
const initialAppState: AppState = {
  gamePhase: "intro",
  players: [
    createPlayerState("player1", "musa"),
    createPlayerState("training_dummy", "musa"),
  ],
  gameTime: 0,
  currentRound: 1,
  timeRemaining: 180000, // 3 minutes default
  combatLog: [],
  isPaused: false,
  winnerId: null,
};

export default function App(): React.JSX.Element {
  const [appState, dispatch] = useReducer(appReducer, initialAppState);
  const [selectedArchetype, setSelectedArchetype] =
    useState<PlayerArchetype>("musa");

  // Handle game phase changes with proper type conversion
  const handlePhaseChange = useCallback((phase: GamePhase | string) => {
    const validPhase = phase as GamePhase;
    dispatch({ type: "SET_PHASE", payload: validPhase });
  }, []);

  // Handle player updates
  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      dispatch({ type: "UPDATE_PLAYER", payload: { playerIndex, updates } });
    },
    []
  );

  // Handle archetype selection
  const handleArchetypeSelect = useCallback(
    (archetype: PlayerArchetype) => {
      setSelectedArchetype(archetype);
      // Update player 1 with new archetype
      const updatedPlayer = createPlayerState("player1", archetype);
      handlePlayerUpdate(0, updatedPlayer);
    },
    [handlePlayerUpdate]
  );

  // Handle stance selection
  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      handlePlayerUpdate(0, { stance });
    },
    [handlePlayerUpdate]
  );

  // Game timer effect
  useEffect(() => {
    if (appState.gamePhase === "combat" && !appState.isPaused) {
      const interval = setInterval(() => {
        dispatch({ type: "UPDATE_GAME_TIME", payload: 16 }); // ~60fps
      }, 16);

      return () => clearInterval(interval);
    }
  }, [appState.gamePhase, appState.isPaused]);

  // Check for victory conditions
  useEffect(() => {
    if (appState.gamePhase === "combat") {
      const [player1, player2] = appState.players;

      if (player1.health <= 0) {
        dispatch({ type: "SET_WINNER", payload: player2.id });
        handlePhaseChange("defeat");
      } else if (player2.health <= 0) {
        dispatch({ type: "SET_WINNER", payload: player1.id });
        handlePhaseChange("victory");
      } else if (appState.timeRemaining <= 0) {
        // Time up - determine winner by health
        const winner =
          player1.health > player2.health ? player1.id : player2.id;
        dispatch({ type: "SET_WINNER", payload: winner });
        handlePhaseChange(
          player1.health > player2.health ? "victory" : "defeat"
        );
      }
    }
  }, [
    appState.players,
    appState.timeRemaining,
    appState.gamePhase,
    handlePhaseChange,
  ]);

  // Render current game phase
  const renderCurrentPhase = () => {
    switch (appState.gamePhase) {
      case "intro":
        return (
          <IntroScreen
            onArchetypeSelect={handleArchetypeSelect}
            onStartTraining={() => handlePhaseChange("training")}
            onStartCombat={() => handlePhaseChange("combat")}
            selectedArchetype={selectedArchetype}
          />
        );

      case "training":
        return (
          <TrainingScreen
            players={appState.players}
            onPlayerUpdate={handlePlayerUpdate}
            onStanceChange={handleStanceSelect}
            gameTime={appState.gameTime}
            onReturnToMenu={() => handlePhaseChange("intro")}
            onStartCombat={() => handlePhaseChange("combat")}
          />
        );

      case "combat":
        return (
          <CombatScreen
            players={appState.players}
            onGamePhaseChange={handlePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            gameTime={appState.gameTime}
            currentRound={appState.currentRound}
            timeRemaining={appState.timeRemaining}
            isPaused={appState.isPaused}
          />
        );

      case "victory":
      case "defeat":
        return (
          <EndScreen
            winnerId={appState.winnerId}
            onRestart={() => dispatch({ type: "RESET_GAME" })}
            onMenu={() => handlePhaseChange("intro")}
            winner={appState.winnerId || ""}
          />
        );

      default:
        return (
          <div
            style={{
              color: `#${KOREAN_COLORS.WHITE.toString(16)}`,
              backgroundColor: `#${KOREAN_COLORS.BLACK.toString(16)}`,
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>흑괘 (Black Trigram) - Loading...</h1>
          </div>
        );
    }
  };

  return (
    <AudioProvider>
      <div
        className="app"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, #${KOREAN_COLORS.BLACK.toString(
            16
          )} 0%, #1a1a2e 50%, #16213e 100%)`,
          color: `#${KOREAN_COLORS.WHITE.toString(16)}`,
          fontFamily: '"Noto Sans KR", Arial, sans-serif',
        }}
      >
        {renderCurrentPhase()}

        {/* Debug information in development */}
        {process.env.NODE_ENV === "development" && (
          <div
            style={{
              position: "fixed",
              top: 10,
              right: 10,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: `#${KOREAN_COLORS.CYAN.toString(16)}`,
              padding: "10px",
              borderRadius: "5px",
              fontSize: "12px",
              fontFamily: "monospace",
            }}
          >
            <div>Phase: {appState.gamePhase}</div>
            <div>Time: {Math.floor(appState.gameTime / 1000)}s</div>
            <div>Round: {appState.currentRound}</div>
            <div>P1: {appState.players[0].health}HP</div>
            <div>P2: {appState.players[1].health}HP</div>
          </div>
        )}
      </div>
    </AudioProvider>
  );
}
