import React, { useState, useCallback, useEffect } from "react";
import type { CombatScreenProps } from "../../types/components";
import { CombatArena } from "./CombatArena";
import { CombatHUD } from "./CombatHUD";
import { CombatControls } from "./CombatControls";
import { KoreanText } from "../ui/base/korean-text/KoreanText";
import { KOREAN_COLORS } from "../../types/constants";
import type { HitEffect, CombatResult } from "../../types";

export function CombatScreen({
  players,
  onGamePhaseChange,
  onPlayerUpdate,
  gameTime,
  currentRound,
  timeRemaining,
  isPaused,
  ...props
}: CombatScreenProps): React.JSX.Element {
  const [combatEffects, setCombatEffects] = useState<HitEffect[]>([]);
  const [isExecutingTechnique, setIsExecutingTechnique] = useState(false);
  const [showVitalPoints, setShowVitalPoints] = useState(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  const [player1, player2] = players;

  // Handle technique execution
  const handleTechniqueExecute = useCallback(
    async (playerIndex: number, technique: any) => {
      setIsExecutingTechnique(true);

      try {
        const attacker = players[playerIndex];
        const defender = players[1 - playerIndex];

        // Simulate technique execution
        const damage = technique.damage || Math.floor(Math.random() * 20) + 10;
        const newHealth = Math.max(0, defender.health - damage);

        // Update defender
        onPlayerUpdate(1 - playerIndex, {
          health: newHealth,
          pain: Math.min(100, defender.pain + damage * 0.5),
        });

        // Update attacker stamina/ki
        onPlayerUpdate(playerIndex, {
          stamina: Math.max(
            0,
            attacker.stamina - (technique.staminaCost || 10)
          ),
          ki: Math.max(0, attacker.ki - (technique.kiCost || 5)),
        });

        // Add combat effect
        const effect: HitEffect = {
          id: `hit-${Date.now()}`,
          type:
            damage > 30
              ? "critical"
              : damage > 20
              ? "heavy"
              : damage > 10
              ? "medium"
              : "light",
          position: { x: defender.position.x, y: defender.position.y },
          damage,
          timestamp: gameTime,
          duration: 1000,
          color: damage > 30 ? KOREAN_COLORS.CRITICAL_HIT : KOREAN_COLORS.RED,
          playerId: defender.id,
        };

        setCombatEffects((prev) => [...prev, effect]);

        // Add to combat log
        const logEntry = `${attacker.name}: ${technique.koreanName} (${damage} 데미지)`;
        setCombatLog((prev) => [...prev.slice(-4), logEntry]);
      } catch (error) {
        console.error("Technique execution error:", error);
      } finally {
        setTimeout(() => setIsExecutingTechnique(false), 500);
      }
    },
    [players, onPlayerUpdate, gameTime]
  );

  // Handle combat result
  const handleCombatResult = useCallback(
    (result: CombatResult) => {
      if (result.winner) {
        const phase = result.winner === player1.id ? "victory" : "defeat";
        onGamePhaseChange(phase);
      }
    },
    [player1.id, onGamePhaseChange]
  );

  // Clean up old effects
  useEffect(() => {
    const interval = setInterval(() => {
      setCombatEffects((prev) =>
        prev.filter((effect) => gameTime - effect.timestamp < effect.duration)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [gameTime]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${KOREAN_COLORS.BLACK} 0%, #1a1a2e 50%, #16213e 100%)`,
        color: KOREAN_COLORS.WHITE,
        position: "relative",
      }}
    >
      {/* Combat HUD */}
      <CombatHUD
        players={players}
        timeRemaining={timeRemaining}
        currentRound={currentRound}
        isPaused={isPaused}
      />

      {/* Main Combat Arena */}
      <div
        style={{
          height: "calc(100vh - 120px)",
          position: "relative",
        }}
      >
        <CombatArena
          players={players}
          onPlayerUpdate={onPlayerUpdate}
          onTechniqueExecute={handleTechniqueExecute}
          onCombatResult={handleCombatResult}
          combatEffects={combatEffects}
          isExecutingTechnique={isExecutingTechnique}
          showVitalPoints={showVitalPoints}
          showDebugInfo={process.env.NODE_ENV === "development"}
        />
      </div>

      {/* Combat Controls */}
      <CombatControls
        players={players}
        player={player1}
        onStanceChange={(playerIndex, stance) => {
          onPlayerUpdate(playerIndex, { stance });
        }}
        isExecutingTechnique={isExecutingTechnique}
        isPaused={isPaused}
        showVitalPoints={showVitalPoints}
      />

      {/* Pause Overlay */}
      {isPaused && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.9)",
              padding: "2rem",
              borderRadius: "10px",
              border: `2px solid ${KOREAN_COLORS.CYAN}`,
            }}
          >
            <KoreanText
              korean="일시 정지"
              english="Paused"
              size="xlarge"
              weight="bold"
              color={KOREAN_COLORS.CYAN}
            />
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <button
                onClick={() => onGamePhaseChange("intro")}
                style={{
                  backgroundColor: KOREAN_COLORS.RED,
                  color: KOREAN_COLORS.WHITE,
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontFamily: '"Noto Sans KR", Arial, sans-serif',
                }}
              >
                <KoreanText korean="메인 메뉴" english="Main Menu" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Combat Log */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          backgroundColor: "rgba(0,0,0,0.7)",
          padding: "1rem",
          borderRadius: "5px",
          maxWidth: "300px",
        }}
      >
        <KoreanText
          korean="전투 기록"
          english="Combat Log"
          size="small"
          weight="bold"
          color={KOREAN_COLORS.CYAN}
        />
        {combatLog.map((entry, index) => (
          <div key={index} style={{ fontSize: "12px", marginTop: "0.25rem" }}>
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CombatScreen;
