import React, { useState, useEffect, useCallback } from "react";
import { extend } from "@pixi/react"; // Removed Stage import
import { Container, Graphics, Text, Sprite } from "pixi.js";

import type { PlayerState, GamePhase, AppState, TrigramStance } from "./types";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY_PRIMARY } from "./types"; // Value import, added KOREAN_FONT_FAMILY_PRIMARY

import { GameUI } from "./components/game/GameUI";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { EndScreen } from "./components/ui/EndScreen"; // Corrected path
import { CombatSystem } from "./systems/CombatSystem";
import { initializePlayers } from "./utils/playerUtils";
import { useAudio } from "./audio/AudioManager";

// Declare the extended components for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: any;
      pixiGraphics: any;
      pixiText: any;
      pixiSprite: any;
    }
  }
}

// Extend PixiJS components for @pixi/react
extend({ Container, Graphics, Text, Sprite });

const INITIAL_GAME_STATE: AppState = {
  players: initializePlayers(),
  gamePhase: "intro" as GamePhase, // Ensure initial phase is valid GamePhase
  gameTime: 0,
  currentRound: 1,
  timeRemaining: 180,
  isPaused: false,
  winnerId: null,
  combatLog: [],
};

const appStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: `linear-gradient(135deg, #${KOREAN_COLORS.DARK_BLUE.toString(
    16
  ).padStart(6, "0")}, #${KOREAN_COLORS.BLACK.toString(16).padStart(6, "0")})`,
  color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
  fontFamily: KOREAN_FONT_FAMILY_PRIMARY, // Corrected to use KOREAN_FONT_FAMILY_PRIMARY
  padding: "20px",
  boxSizing: "border-box",
};

const headerStyle: React.CSSProperties = {
  color: `#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`,
  marginBottom: "20px",
  fontSize: "2.5em",
  textShadow: `2px 2px 4px #${KOREAN_COLORS.BLACK.toString(16).padStart(
    6,
    "0"
  )}`,
};

// App Component
function App() {
  const [appState, setAppState] = useState<AppState>(INITIAL_GAME_STATE);
  const audio = useAudio();

  // Game Loop Logic (simplified)
  useEffect(() => {
    if (appState.gamePhase === "combat" && !appState.isPaused) {
      const timer = setInterval(() => {
        setAppState((prev) => {
          if (prev.timeRemaining <= 0) {
            const winner = CombatSystem.determineRoundWinner(prev.players); // Static call
            // Play victory/defeat sound
            if (winner) {
              audio.playSFX("victory");
            } else {
              audio.playSFX("defeat");
            }
            return {
              ...prev,
              gamePhase: winner ? "victory" : "defeat",
              winnerId: winner ? winner.id : null,
            };
          }
          return {
            ...prev,
            gameTime: prev.gameTime + 1,
            timeRemaining: prev.timeRemaining - 1,
          };
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [appState.gamePhase, appState.isPaused, audio]);

  const handleGamePhaseChange = useCallback((phase: GamePhase | string) => {
    setAppState((prev) => ({
      ...prev,
      gamePhase: phase as GamePhase,
      ...(phase === "intro" || phase === "menu" || phase === "philosophy"
        ? {
            winnerId: null,
            combatLog: [],
            players: initializePlayers(),
            currentRound: 1,
            timeRemaining: 180,
          }
        : {}),
      ...(phase === "combat" && prev.gamePhase !== "combat" // Reset only when entering combat
        ? {
            players: initializePlayers(),
            timeRemaining: 180,
            currentRound: 1,
            winnerId: null,
            combatLog: [],
          }
        : {}),
    }));
  }, []);

  const handlePlayerUpdate = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      setAppState((prev) => {
        const newPlayers = [...prev.players] as [PlayerState, PlayerState];
        newPlayers[playerIndex] = { ...newPlayers[playerIndex], ...updates };

        const winner = CombatSystem.checkWinCondition(newPlayers); // Static call
        if (winner) {
          return {
            ...prev,
            players: newPlayers,
            gamePhase: "victory", // Assuming checkWinCondition implies one player won
            winnerId: winner.id,
          };
        }
        // If checkWinCondition returns null (no winner yet), check if a player is defeated
        // This logic might be redundant if checkWinCondition handles all defeat scenarios
        if (newPlayers[0].health <= 0 || newPlayers[0].consciousness <= 0) {
          return {
            ...prev,
            players: newPlayers,
            gamePhase: "defeat",
            winnerId: newPlayers[1].id,
          };
        }
        if (newPlayers[1].health <= 0 || newPlayers[1].consciousness <= 0) {
          return {
            ...prev,
            players: newPlayers,
            gamePhase: "defeat",
            winnerId: newPlayers[0].id,
          };
        }

        return { ...prev, players: newPlayers };
      });
    },
    [] // Removed combatSystem from dependencies
  );

  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance): void => {
      handlePlayerUpdate(playerIndex, { stance });
    },
    [handlePlayerUpdate]
  );

  // Specific handler for TrainingScreen's onStanceChange (for player 0)
  const handleTrainingStanceChange = useCallback(
    (stance: TrigramStance): void => {
      handleStanceChange(0, stance);
    },
    [handleStanceChange]
  );

  const handleRestartGame = useCallback(() => {
    // setAppState(INITIAL_GAME_STATE); // This creates a new object, fine
    // More robust reset:
    setAppState({
      ...INITIAL_GAME_STATE,
      players: initializePlayers(), // Ensure players are fresh
      gamePhase: "intro" as GamePhase, // Start at intro
    });
  }, []);

  const renderGameContent = () => {
    switch (appState.gamePhase) {
      case "intro":
        return (
          <IntroScreen
            onGamePhaseChange={handleGamePhaseChange}
            currentSection="intro"
          />
        );
      case "philosophy":
        return (
          <IntroScreen
            onGamePhaseChange={handleGamePhaseChange}
            currentSection="philosophy"
          />
        );
      case "training":
        return (
          <TrainingScreen
            players={appState.players}
            onGamePhaseChange={handleGamePhaseChange}
            onPlayerUpdate={handlePlayerUpdate}
            onStanceChange={handleTrainingStanceChange} // Use adapted handler
            selectedStance={appState.players[0].stance}
            gameTime={appState.gameTime}
            currentRound={appState.currentRound}
          />
        );
      case "combat":
        return (
          <GameUI
            players={appState.players}
            gamePhase={appState.gamePhase}
            gameTime={appState.gameTime}
            currentRound={appState.currentRound}
            timeRemaining={appState.timeRemaining}
            isPaused={appState.isPaused}
            combatLog={appState.combatLog}
            onPlayerUpdate={handlePlayerUpdate}
            onStanceChange={handleStanceChange} // GameUI handles both players
            onGamePhaseChange={handleGamePhaseChange}
          />
        );
      case "victory":
      case "defeat": // Both victory and defeat use EndScreen
        return (
          <EndScreen
            winnerId={appState.winnerId}
            onRestart={handleRestartGame}
            onMenu={() => handleGamePhaseChange("intro")}
          />
        );
      default:
        // Exhaustive check for unhandled game phases (optional)
        // const _exhaustiveCheck: never = appState.gamePhase;
        return (
          <div style={headerStyle}>
            Unknown Game Phase: {appState.gamePhase}
          </div>
        );
    }
  };

  return (
    <div style={appStyle}>
      <pixiContainer
        width={window.innerWidth * 0.95}
        height={window.innerHeight * 0.9}
        // No options prop, handled by parent container or Application if used
      >
        {renderGameContent()}
      </pixiContainer>
      {/* Development phase switcher example (can be removed for production) */}
      {/* <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {(Object.keys(GamePhase) as Array<keyof typeof GamePhase>).map(key => (
            <button 
              key={GamePhase[key]}
              style={{ padding: '8px 12px', cursor: 'pointer' }}
              onClick={() => handleGamePhaseChange(GamePhase[key])}
            >
              {GamePhase[key]}
            </button>
          ))}
        </div> */}
    </div>
  );
}

export default App;
