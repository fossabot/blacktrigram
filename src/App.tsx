import React, { Suspense, useEffect, useState, useCallback } from "react";
import { Application as PixiApplication } from "@pixi/react";
import { AudioProvider } from "./audio/AudioProvider";
import { GameEngine } from "./components/game/GameEngine";
import { GAME_CONFIG } from "./types/constants";
import { createPlayerState } from "./utils/playerUtils";
import type { PlayerState, GamePhase, KoreanText, GameState } from "./types";
import "./App.css";
import {
  IntroScreen,
  TrainingScreen,
  CombatScreen,
  EndScreen,
} from "./components/ui/EndScreen";
import { CombatSystem } from "./systems/CombatSystem";

function App() {
  const [gamePhase, setGamePhase] = React.useState<GamePhase>("intro");

  const initialPlayer1Name: KoreanText = {
    korean: "선수1",
    english: "Player 1",
  };
  const initialPlayer2Name: KoreanText = {
    korean: "선수2",
    english: "Player 2",
  };

  const [player1, setPlayer1] = React.useState<PlayerState>(() =>
    createPlayerState("player1", "musa", initialPlayer1Name)
  );
  const [player2, setPlayer2] = React.useState<PlayerState>(() =>
    createPlayerState("player2", "amsalja", initialPlayer2Name)
  );

  const [winner, setWinner] = useState<PlayerState | null>(null); // For storing the winner or null for draw

  const handlePlayerUpdate = (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => {
    if (playerIndex === 0) {
      setPlayer1((prevPlayer) => ({ ...prevPlayer, ...updates }));
    } else if (playerIndex === 1) {
      setPlayer2((prevPlayer) => ({ ...prevPlayer, ...updates }));
    }
  };

  const handleStartCombat = React.useCallback(() => {
    setGamePhase("combat");
  }, []);

  const handleStartTraining = React.useCallback(() => {
    setGamePhase("training");
  }, []);

  const handleReturnToMenu = React.useCallback(() => {
    setGamePhase("intro");
  }, []);

  const handleGameEnd = useCallback(
    (winningPlayer?: PlayerState) => {
      setWinner(winningPlayer === undefined ? null : winningPlayer); // Set to null for a draw explicitly
      setGamePhase("end");
      audioManager.playSFX(winningPlayer ? "victory" : "defeat");
    },
    [audioManager, setGamePhase]
  );

  const handleGameStateChange = (state: Partial<GameState>) => {
    // Handle game state changes
    console.log("Game state changed:", state);

    // Update any global state management here
    if (state.phase) {
      // Handle phase changes
      console.log("Game phase changed to:", state.phase);
    }

    if (state.isPaused !== undefined) {
      // Handle pause state changes
      console.log("Game pause state:", state.isPaused);
    }

    // Additional state handling logic as needed
  };

  // Main game loop and rendering logic
  useEffect(() => {
    // ...existing code...
    if (gamePhase === "combat") {
      const combatWinner = CombatSystem.checkWinCondition(players);
      if (combatWinner) {
        const winningPlayer = players.find((p) => p.id === combatWinner);
        handleGameEnd(winningPlayer);
      } else if (timeRemaining <= 0 && currentRound >= GAME_CONFIG.MAX_ROUNDS) {
        // Check for draw condition (time up, max rounds reached, no winner)
        const p1Health = players[0].health;
        const p2Health = players[1].health;
        if (p1Health === p2Health) {
          handleGameEnd(undefined); // Explicitly pass undefined for a draw
        } else {
          handleGameEnd(p1Health > p2Health ? players[0] : players[1]);
        }
      }
    }
  }, [gamePhase, players, handleGameEnd, timeRemaining, currentRound]);

  // Render logic based on gamePhase
  const renderGameContent = () => {
    switch (gamePhase) {
      case "intro":
        return (
          <IntroScreen
            onGamePhaseChange={setGamePhase}
            onStartCombat={() => {
              resetGameState();
              setGamePhase("combat");
            }}
            onStartTraining={() => {
              resetGameState();
              setGamePhase("training");
            }}
            onArchetypeSelect={handleArchetypeSelect}
          />
        );
      case "combat":
        return (
          <CombatScreen
            players={players}
            onPlayerUpdate={handlePlayerUpdate}
            onGamePhaseChange={setGamePhase}
            currentRound={currentRound}
            timeRemaining={timeRemaining}
            isPaused={isPaused}
            // onTechniqueExecute={handleTechniqueExecute} // This prop is not expected by CombatScreen
            // combatLog={combatLog} // This prop is not expected by CombatScreen
          />
        );
      case "training":
        return (
          <TrainingScreen
            player={players[0]} // Assuming player 1 is the training player
            players={players}
            onPlayerUpdate={handlePlayerUpdate}
            onGamePhaseChange={setGamePhase}
            onReturnToMenu={() => setGamePhase("intro")}
            onStartCombat={() => setGamePhase("combat")} // Example action
          />
        );
      case "end":
        return (
          <EndScreen
            winner={winner} // Changed from winnerId
            onRestart={() => {
              resetGameState();
              setGamePhase("combat");
            }}
            onReturnToMenu={() => {
              resetGameState(); // Also reset game state when returning to menu
              setGamePhase("intro");
            }}
          />
        );
      default:
        return (
          <Text
            text="Loading..."
            style={new PIXI.TextStyle({ fill: "white" })}
          />
        );
    }
  };

  return (
    <div className="app-container" data-testid="app-container">
      <AudioProvider>
        <PixiApplication
          width={GAME_CONFIG.CANVAS_WIDTH}
          height={GAME_CONFIG.CANVAS_HEIGHT}
          options={{ backgroundColor: GAME_CONFIG.BACKGROUND_COLOR }} // Now BACKGROUND_COLOR exists
        >
          <Suspense fallback={null}>
            <GameEngine
              player1={player1}
              player2={player2}
              gamePhase={gamePhase}
              onGameStateChange={handleGameStateChange}
              onPlayerUpdate={handlePlayerUpdate}
              onGamePhaseChange={setGamePhase}
              gameMode="versus"
            />
          </Suspense>
        </PixiApplication>
      </AudioProvider>
    </div>
  );
}

export default App;
