import React, { useState, useCallback, useEffect } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type { CombatScreenProps, TrigramStance } from "../../types";
import { useAudio } from "../../audio/AudioManager";
import { KoreanText } from "../ui/base/korean-text";
import { CombatArena } from "./components/CombatArena";
import { CombatHUD } from "./components/CombatHUD";
import { CombatControls } from "./components/CombatControls";
import { KOREAN_COLORS } from "../../types/constants";
import type { Graphics as PixiGraphics } from "pixi.js";

/**
 * CombatScreen Component for Black Trigram (흑괘)
 * Main combat interface with authentic Korean martial arts mechanics
 */
export function CombatScreen({
  players,
  onGamePhaseChange,
  onPlayerUpdate,
  currentRound,
  timeRemaining,
  isPaused,
  className = "",
  style = {},
}: CombatScreenProps): React.JSX.Element {
  const audio = useAudio();

  // Combat state management
  const [combatPhase, setCombatPhase] = useState<
    "preparation" | "fighting" | "round_end"
  >("preparation");
  const [isExecutingTechnique, setIsExecutingTechnique] = useState(false);
  const [combatEffects] = useState<readonly any[]>([]);
  const [showVitalPoints, setShowVitalPoints] = useState(false);
  const [combatLog, setCombatLog] = useState<readonly string[]>([]);

  // Destructure players for easier access
  const [player1] = players;

  // Combat execution logic
  const executeTechnique = useCallback(
    async (playerIndex: number, technique: any) => {
      if (isExecutingTechnique || isPaused) return;

      setIsExecutingTechnique(true);

      try {
        // Play technique sound
        audio.playSFX("technique_execute");

        // Get the executing player and opponent
        const executingPlayer = players[playerIndex];
        const opponentIndex = playerIndex === 0 ? 1 : 0;
        const opponent = players[opponentIndex];

        // Simulate technique execution
        await new Promise((resolve) =>
          setTimeout(resolve, technique.executionTime || 500)
        );

        // Calculate damage and effects
        const damage = Math.floor(Math.random() * 20) + 10;
        const newHealth = Math.max(0, opponent.health - damage);

        // Update opponent state
        onPlayerUpdate(opponentIndex, {
          health: newHealth,
          pain: Math.min(100, opponent.pain + damage * 0.5),
          consciousness: Math.max(0, opponent.consciousness - damage * 0.3),
        });

        // Add to combat log
        const logEntry = `${executingPlayer.name} used ${technique.koreanName}! ${damage} damage dealt.`;
        setCombatLog((prev) => [...prev.slice(-9), logEntry]);

        // Play hit sound
        audio.playSFX(damage > 15 ? "hit_heavy" : "hit_light");
      } catch (error) {
        console.error("Technique execution failed:", error);
      } finally {
        setIsExecutingTechnique(false);
      }
    },
    [isExecutingTechnique, isPaused, players, onPlayerUpdate, audio]
  );

  // Handle stance changes
  const handleStanceChange = useCallback(
    (playerIndex: number, newStance: TrigramStance) => {
      const player = players[playerIndex];

      // Check if player has enough Ki and Stamina for stance change
      if (player.ki >= 10 && player.stamina >= 8) {
        onPlayerUpdate(playerIndex, {
          stance: newStance,
          ki: player.ki - 10,
          stamina: player.stamina - 8,
          lastStanceChangeTime: Date.now(),
        });

        audio.playSFX("stance_change");
      }
    },
    [players, onPlayerUpdate, audio]
  );

  // Handle pause toggle
  const handlePauseToggle = useCallback(() => {
    // Toggle pause state - this would typically be handled by parent component
    console.log("Pause toggle requested");
  }, []);

  // Check for round end conditions
  useEffect(() => {
    const [p1, p2] = players;

    if (
      p1.health <= 0 ||
      p2.health <= 0 ||
      p1.consciousness <= 0 ||
      p2.consciousness <= 0
    ) {
      setCombatPhase("round_end");

      setTimeout(() => {
        onGamePhaseChange("victory");
      }, 2000);
    }
  }, [players, onGamePhaseChange]);

  // Initialize combat phase
  useEffect(() => {
    if (combatPhase === "preparation") {
      const timer = setTimeout(() => {
        setCombatPhase("fighting");
        audio.playSFX("match_start");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [combatPhase, audio]);

  return (
    <div className={`combat-screen ${className}`} style={style}>
      {/* Main Combat Container */}
      <Container x={0} y={0} width={1200} height={800}>
        {/* Combat Arena */}
        <CombatArena
          players={players}
          onPlayerUpdate={onPlayerUpdate}
          onTechniqueExecute={executeTechnique}
          combatEffects={combatEffects}
          isExecutingTechnique={isExecutingTechnique}
          showVitalPoints={showVitalPoints}
        />

        {/* Combat HUD */}
        <CombatHUD
          players={players}
          timeRemaining={timeRemaining}
          currentRound={currentRound}
          isPaused={isPaused}
        />

        {/* Combat Controls */}
        <CombatControls
          players={players}
          player={player1} // Current active player
          onStanceChange={handleStanceChange}
          isExecutingTechnique={isExecutingTechnique}
          isPaused={isPaused}
          showVitalPoints={showVitalPoints}
        />

        {/* Combat Phase Indicator */}
        {combatPhase === "preparation" && (
          <Container x={400} y={300}>
            <Graphics
              draw={(g: PixiGraphics) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.BLACK, 0.7);
                g.drawRoundedRect(0, 0, 400, 200, 20);
                g.endFill();
                g.lineStyle(3, KOREAN_COLORS.CYAN);
                g.drawRoundedRect(0, 0, 400, 200, 20);
              }}
            />
            <Text
              text="준비"
              x={200}
              y={80}
              anchor={0.5}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 48,
                fill: KOREAN_COLORS.CYAN,
                align: "center",
              }}
            />
            <Text
              text="PREPARE"
              x={200}
              y={130}
              anchor={0.5}
              style={{
                fontFamily: "Arial",
                fontSize: 24,
                fill: KOREAN_COLORS.WHITE,
                align: "center",
              }}
            />
          </Container>
        )}

        {/* Round End Overlay */}
        {combatPhase === "round_end" && (
          <Container x={300} y={200}>
            <Graphics
              draw={(g: PixiGraphics) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.BLACK, 0.8);
                g.drawRoundedRect(0, 0, 600, 400, 30);
                g.endFill();
                g.lineStyle(4, KOREAN_COLORS.GOLD);
                g.drawRoundedRect(0, 0, 600, 400, 30);
              }}
            />
            <Text
              text="라운드 종료"
              x={300}
              y={150}
              anchor={0.5}
              style={{
                fontFamily: "Noto Sans KR",
                fontSize: 36,
                fill: KOREAN_COLORS.GOLD,
                align: "center",
              }}
            />
            <Text
              text="ROUND END"
              x={300}
              y={200}
              anchor={0.5}
              style={{
                fontFamily: "Arial",
                fontSize: 24,
                fill: KOREAN_COLORS.WHITE,
                align: "center",
              }}
            />
          </Container>
        )}

        {/* Combat Log Display */}
        <Container x={50} y={600}>
          <Graphics
            draw={(g: PixiGraphics) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.BLACK, 0.6);
              g.drawRoundedRect(0, 0, 300, 150, 10);
              g.endFill();
              g.lineStyle(2, KOREAN_COLORS.CYAN, 0.5);
              g.drawRoundedRect(0, 0, 300, 150, 10);
            }}
          />
          {combatLog.slice(-5).map((entry, index) => (
            <Text
              key={`log-${index}-${entry.substring(0, 10)}`}
              text={entry}
              x={10}
              y={20 + index * 25}
              style={{
                fontFamily: "Arial",
                fontSize: 12,
                fill: KOREAN_COLORS.WHITE,
                wordWrap: true,
                wordWrapWidth: 280,
              }}
            />
          ))}
        </Container>
      </Container>

      {/* UI Controls Overlay */}
      <div className="combat-ui-overlay">
        <div className="top-controls">
          <button
            onClick={() => onGamePhaseChange("intro")}
            className="return-button"
          >
            <KoreanText korean="돌아가기" english="Return" size="medium" />
          </button>

          <button onClick={handlePauseToggle} className="pause-button">
            <KoreanText
              korean={isPaused ? "재개" : "일시정지"}
              english={isPaused ? "Resume" : "Pause"}
              size="medium"
            />
          </button>

          <button
            onClick={() => setShowVitalPoints(!showVitalPoints)}
            className={`vital-points-toggle ${showVitalPoints ? "active" : ""}`}
          >
            <KoreanText
              korean="급소 표시"
              english="Show Vital Points"
              size="medium"
            />
          </button>
        </div>
      </div>

      <style>{`
        .combat-screen {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, 
            rgba(5, 5, 15, 0.95), 
            rgba(15, 15, 30, 0.95)
          );
          position: relative;
          overflow: hidden;
        }

        .combat-ui-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 100;
        }

        .top-controls {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
          pointer-events: auto;
        }

        .return-button,
        .pause-button,
        .vital-points-toggle {
          padding: 12px 24px;
          border: 2px solid rgba(0, 255, 255, 0.6);
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.7);
          color: #00ffff;
          font-family: 'Noto Sans KR', Arial, sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .return-button:hover,
        .pause-button:hover,
        .vital-points-toggle:hover {
          background: rgba(0, 255, 255, 0.1);
          border-color: rgba(0, 255, 255, 0.9);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }

        .vital-points-toggle.active {
          background: rgba(255, 215, 0, 0.1);
          border-color: rgba(255, 215, 0, 0.8);
          color: #ffd700;
        }

        .vital-points-toggle.active:hover {
          background: rgba(255, 215, 0, 0.2);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
        }

        @media (max-width: 768px) {
          .top-controls {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .return-button,
          .pause-button,
          .vital-points-toggle {
            padding: 10px 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export default CombatScreen;
