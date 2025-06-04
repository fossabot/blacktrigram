import { useState, useCallback, useEffect } from "react";
import type { Container, Graphics, Text } from "pixi.js";
import {
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Text as PixiText,
} from "@pixi/react";
import { AudioManagerProvider } from "./audio/AudioManager";
import { IntroScreen } from "./components/intro/IntroScreen";
import { TrainingScreen } from "./components/training/TrainingScreen";
import { CombatScreen } from "./components/combat/CombatScreen";
import type {
  PlayerState,
  GameState,
  GameScreen,
  CombatResult,
  SessionData,
  GameSettings,
} from "./types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "./types/constants";
import { createDefaultPlayer } from "./utils/playerUtils";
import { convertKoreanColorForCSS } from "./utils/colorUtils";

const createDefaultSessionData = (): SessionData => ({
  startTime: Date.now(),
  trainingStats: {
    sessionsCompleted: 0,
    totalTrainingTime: 0,
    stancesLearned: ["geon"],
    techniquesLearned: [],
  },
  combatStats: {
    wins: 0,
    losses: 0,
    totalCombats: 0,
    averageDamageDealt: 0,
    favoriteStance: "geon",
  },
  currentScore: 0,
});

const createDefaultSettings = (): GameSettings => ({
  audioEnabled: true,
  musicVolume: 0.7,
  sfxVolume: 0.8,
  language: "bilingual",
  showVitalPoints: true,
  showDebugInfo: false,
  difficulty: "intermediate",
});

function App(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: "intro",
    player: createDefaultPlayer("musa", "geon"),
    sessionData: createDefaultSessionData(),
    settings: createDefaultSettings(),
    isInitialized: false,
  });

  // Initialize game
  useEffect(() => {
    setGameState((prev) => ({
      ...prev,
      isInitialized: true,
    }));
  }, []);

  const handlePlayerStateChange = useCallback(
    (updates: Partial<PlayerState>) => {
      setGameState((prev) => ({
        ...prev,
        player: { ...prev.player, ...updates },
      }));
    },
    []
  );

  const handleScreenChange = useCallback((screen: GameScreen) => {
    setGameState((prev) => ({
      ...prev,
      currentScreen: screen,
    }));
  }, []);

  const handleCombatResult = useCallback(
    (result: CombatResult) => {
      const isWin = result.winner === gameState.player.id;

      setGameState((prev) => ({
        ...prev,
        sessionData: {
          ...prev.sessionData,
          combatStats: {
            ...prev.sessionData.combatStats,
            wins: prev.sessionData.combatStats.wins + (isWin ? 1 : 0),
            losses: prev.sessionData.combatStats.losses + (isWin ? 0 : 1),
            totalCombats: prev.sessionData.combatStats.totalCombats + 1,
            averageDamageDealt:
              (prev.sessionData.combatStats.averageDamageDealt +
                result.damage) /
              2,
          },
        },
      }));
    },
    [gameState.player.id]
  );

  if (!gameState.isInitialized) {
    return (
      <PixiContainer>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: convertKoreanColorForCSS(KOREAN_COLORS.BLACK),
            color: convertKoreanColorForCSS(KOREAN_COLORS.WHITE),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Noto Sans KR, Arial, sans-serif",
          }}
        >
          <PixiText
            text="흑괘 로딩 중... (Loading Black Trigram...)"
            style={{
              fontSize: 24,
              fill: convertKoreanColorForCSS(KOREAN_COLORS.GOLD),
              fontFamily: "Noto Sans KR, Arial, sans-serif",
            }}
          />
        </div>
      </PixiContainer>
    );
  }

  const renderCurrentScreen = () => {
    switch (gameState.currentScreen) {
      case "intro":
        return (
          <IntroScreen
            onStartTraining={() => handleScreenChange("training")}
            onStartCombat={() => handleScreenChange("combat")}
            player={gameState.player}
            onPlayerChange={handlePlayerStateChange}
            sessionData={gameState.sessionData}
          />
        );

      case "training":
        return (
          <TrainingScreen
            player={gameState.player}
            onPlayerStateChange={handlePlayerStateChange}
            onReturnToMenu={() => handleScreenChange("intro")}
            onStartCombat={() => handleScreenChange("combat")}
            showVitalPoints={gameState.settings.showVitalPoints}
            difficulty={gameState.settings.difficulty}
          />
        );

      case "combat":
        return (
          <CombatScreen
            player={gameState.player}
            onPlayerStateChange={handlePlayerStateChange}
            onCombatResult={handleCombatResult}
            onReturnToMenu={() => handleScreenChange("intro")}
            settings={gameState.settings}
            isActive={true}
          />
        );

      default:
        return (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              backgroundColor: convertKoreanColorForCSS(KOREAN_COLORS.BLACK),
              color: convertKoreanColorForCSS(KOREAN_COLORS.WHITE),
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Error: Unknown screen
          </div>
        );
    }
  };

  return (
    <AudioManagerProvider>
      <PixiContainer>
        {renderCurrentScreen()}

        {/* Debug overlay */}
        {gameState.settings.showDebugInfo && (
          <div
            style={{
              position: "fixed",
              top: "10px",
              left: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: convertKoreanColorForCSS(KOREAN_COLORS.CYAN),
              padding: "8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontFamily: "monospace",
              zIndex: 9999,
            }}
          >
            <div>Screen: {gameState.currentScreen}</div>
            <div>
              Stance: {TRIGRAM_DATA[gameState.player.stance].symbol}{" "}
              {TRIGRAM_DATA[gameState.player.stance].name.korean}
            </div>
            <div>
              Health: {gameState.player.health}/{gameState.player.maxHealth}
            </div>
            <div>
              Ki: {gameState.player.ki}/{gameState.player.maxKi}
            </div>
          </div>
        )}

        {/* Korean aesthetic footer */}
        <div
          style={{
            position: "fixed",
            bottom: "8px",
            right: "8px",
            fontSize: "10px",
            color: convertKoreanColorForCSS(KOREAN_COLORS.CYAN),
            opacity: 0.6,
            fontFamily: "Noto Sans KR, Arial, sans-serif",
          }}
        >
          흑괘의 길 (Path of Black Trigram)
        </div>
      </PixiContainer>
    </AudioManagerProvider>
  );
}

export default App;
