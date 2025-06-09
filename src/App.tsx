import { useState, useCallback } from "react";
import { Application, Stage } from "@pixi/react";
import { GameMode, PlayerArchetype, TrigramStance } from "./types/enums";
import { IntroScreen } from "./components/intro/IntroScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { AudioProvider } from "./audio/AudioProvider";
import { GAME_CONFIG } from "./types/constants";
import type { PlayerState } from "./types";
import "./App.css";

function App() {
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const createDefaultPlayer = useCallback(
    (
      id: string,
      koreanName: string,
      englishName: string,
      archetype: PlayerArchetype,
      stance: TrigramStance,
      position: { x: number; y: number }
    ): PlayerState => {
      return {
        id,
        name: { korean: koreanName, english: englishName },
        archetype,
        health: 100,
        maxHealth: 100,
        ki: 100,
        maxKi: 100,
        stamina: 100,
        maxStamina: 100,
        currentStance: stance,
        position,
        isGuarding: false,
        stunDuration: 0,
        comboCount: 0,
        lastActionTime: 0,
        consciousness: 100,
        pain: 0,
        balance: 100,
        bloodLoss: 0,
        currentTechnique: null,
        activeEffects: [],
        vitalPoints: {},
        defensiveBonus: 0,
        attackPower: 1.0,
        movementSpeed: 1.0,
        reactionTime: 1.0,
        focusLevel: 100,
        battleExperience: 0,
        injuredLimbs: [],
        statusConditions: [],
      };
    },
    []
  );

  const [gamePlayers, setGamePlayers] = useState<[PlayerState, PlayerState]>(
    () => [
      createDefaultPlayer(
        "player1",
        "플레이어 1",
        "Player 1",
        PlayerArchetype.MUSA,
        TrigramStance.GEON,
        { x: 200, y: 300 }
      ),
      createDefaultPlayer(
        "player2",
        "플레이어 2",
        "Player 2",
        PlayerArchetype.AMSALJA,
        TrigramStance.TAE,
        { x: 600, y: 300 }
      ),
    ]
  );
  const [round, _setRound] = useState(1); // setRound is unused
  const [time, _setTime] = useState(GAME_CONFIG.ROUND_DURATION_SECONDS); // setTime is unused
  const [paused, _setPaused] = useState(false); // setPaused is unused

  const handlePlayerUpdate = useCallback(
    (index: 0 | 1, updates: Partial<PlayerState>) => {
      setGamePlayers((prevPlayers) => {
        const newPlayers = [...prevPlayers] as [PlayerState, PlayerState];
        newPlayers[index] = { ...newPlayers[index], ...updates };
        return newPlayers;
      });
    },
    []
  );

  const handleBackToMenu = useCallback(() => {
    setCurrentMode(null);
    setIsInitialized(false);
  }, []);

  const handleGameEnd = useCallback(
    (winner?: PlayerState | null) => {
      console.log("Game ended. Winner:", winner?.name.english);
      handleBackToMenu();
    },
    [handleBackToMenu]
  );

  const handleMenuSelect = useCallback((mode: GameMode) => {
    setCurrentMode(mode);
    setIsInitialized(true);
  }, []);

  const renderCurrentScreen = () => {
    if (!isInitialized || !currentMode) {
      return <IntroScreen onMenuSelect={handleMenuSelect} />;
    }

    switch (currentMode) {
      case GameMode.VERSUS:
        return (
          <CombatScreen
            players={gamePlayers}
            currentRound={round}
            timeRemaining={time}
            isPaused={paused}
            onPlayerUpdate={handlePlayerUpdate}
            onReturnToMenu={handleBackToMenu}
            onGameEnd={handleGameEnd}
          />
        );
      case GameMode.TRAINING:
        return (
          <TrainingScreen
            selectedArchetype={PlayerArchetype.MUSA}
            onBack={handleBackToMenu}
            onTrainingComplete={() => {
              console.log("Training completed");
            }}
          />
        );
      case GameMode.STORY:
        return (
          <CombatScreen
            players={gamePlayers}
            currentRound={round}
            timeRemaining={time}
            isPaused={paused}
            onPlayerUpdate={handlePlayerUpdate}
            onReturnToMenu={handleBackToMenu}
            onGameEnd={handleGameEnd}
          />
        );
      case GameMode.SPARRING: // Fix: Use SPARRING instead of ARCADE
        return (
          <CombatScreen
            players={gamePlayers}
            currentRound={round}
            timeRemaining={time}
            isPaused={paused}
            onPlayerUpdate={handlePlayerUpdate}
            onReturnToMenu={handleBackToMenu}
            onGameEnd={handleGameEnd}
          />
        );
      case GameMode.SURVIVAL:
        return (
          <CombatScreen
            players={gamePlayers}
            currentRound={round}
            timeRemaining={time}
            isPaused={paused}
            onPlayerUpdate={handlePlayerUpdate}
            onReturnToMenu={handleBackToMenu}
            onGameEnd={handleGameEnd}
          />
        );
      default:
        return <IntroScreen onMenuSelect={handleMenuSelect} />;
    }
  };

  return (
    <AudioProvider>
      <div className="app">
        <Application
          width={GAME_CONFIG.CANVAS_WIDTH}
          height={GAME_CONFIG.CANVAS_HEIGHT}
          options={{
            backgroundColor: 0x000000,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
          }}
        >
          <Stage>{renderCurrentScreen()}</Stage>
        </Application>
      </div>
    </AudioProvider>
  );
}

export default App;
