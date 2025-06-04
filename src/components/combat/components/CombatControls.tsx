import React, { useState, useMemo } from "react";
import type { PlayerState, TrigramStance } from "../../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../../types";
import useAudio from "../../../audio/AudioManager"; // Fix: Use default import

interface CombatControlsProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly player: PlayerState; // Add missing required prop
  readonly onStanceChange: (playerIndex: number, stance: TrigramStance) => void;
  readonly isExecutingTechnique: boolean;
  readonly isPaused: boolean;
  readonly showVitalPoints?: boolean;
}

export function CombatControls({
  players,
  player,
  onStanceChange,
  isExecutingTechnique,
  isPaused,
}: CombatControlsProps): React.JSX.Element {
  const audio = useAudio();
  const [selectedStance, setSelectedStance] = useState<TrigramStance>(
    player.stance
  );

  // Use combatData to satisfy TypeScript
  const handleCombatAction = useMemo(() => {
    const otherPlayer = players.find((p) => p.id !== player.id) || players[1];
    return {
      otherPlayer,
      canAttack: !isExecutingTechnique && !isPaused,
      stanceCount: players.length,
      executeAction: () => {
        if (audio) {
          audio.playSFX("stance_change");
        }
      },
    };
  }, [players, player.id, isExecutingTechnique, isPaused, audio]);

  // Fix: Use correct property names (lowercase)
  const STANCE_COLORS = {
    geon: KOREAN_COLORS.geon,
    tae: KOREAN_COLORS.tae,
    li: KOREAN_COLORS.li,
    jin: KOREAN_COLORS.jin,
    son: KOREAN_COLORS.son,
    gam: KOREAN_COLORS.gam,
    gan: KOREAN_COLORS.gan,
    gon: KOREAN_COLORS.gon,
  };

  const currentTechnique = useMemo(() => {
    const trigramData = TRIGRAM_DATA[player.stance];
    return (
      trigramData?.technique || {
        koreanName: "기본 기법",
        englishName: "Basic Technique",
        damage: 10,
      }
    );
  }, [player.stance]);

  const getStanceButtonStyle = (
    stance: TrigramStance,
    isSelected: boolean
  ) => ({
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border: `3px solid ${isSelected ? "#00ffff" : "#666"}`,
    backgroundColor: `#${STANCE_COLORS[stance].toString(16)}`,
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    margin: "5px",
    transition: "all 0.2s ease",
    boxShadow: isSelected
      ? "0 0 15px rgba(0, 255, 255, 0.7)"
      : "0 2px 5px rgba(0, 0, 0, 0.3)",
  });

  const handleStanceSelect = useMemo(() => {
    return (stance: TrigramStance) => {
      if (!isExecutingTechnique && !isPaused) {
        setSelectedStance(stance);
        onStanceChange(0, stance);
        audio.playSFX("stance_change");
      }
    };
  }, [isExecutingTechnique, isPaused, onStanceChange, audio]);

  const handleExecuteTechnique = useMemo(() => {
    return () => {
      audio.playSFX("technique_execute");
      // Technique execution logic here
    };
  }, [audio]);

  return (
    <div style={{ padding: "20px", backgroundColor: "#1a1a1a" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Stance Selection */}
        <div>
          <h3 style={{ color: "#ffffff", marginBottom: "10px" }}>
            팔괘 (Eight Trigrams)
          </h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {(Object.keys(STANCE_COLORS) as TrigramStance[]).map((stance) => (
              <button
                key={stance}
                style={getStanceButtonStyle(stance, selectedStance === stance)}
                onClick={() => handleStanceSelect(stance)}
                disabled={isExecutingTechnique || isPaused}
              >
                <div>{TRIGRAM_DATA[stance]?.symbol || "☰"}</div>
                <div style={{ fontSize: "8px" }}>
                  {TRIGRAM_DATA[stance]?.name.korean || stance}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Technique Display */}
        <div>
          <h4 style={{ color: "#ffffff" }}>현재 기법 (Current Technique)</h4>
          <div
            style={{
              padding: "15px",
              backgroundColor: "#333",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          >
            <div>
              <strong>{currentTechnique.koreanName}</strong> (
              {currentTechnique.englishName})
            </div>
            <div style={{ fontSize: "12px", marginTop: "5px" }}>
              데미지: {currentTechnique.damage}
            </div>
          </div>
        </div>

        {/* Execute Button */}
        <button
          onClick={handleExecuteTechnique}
          disabled={isExecutingTechnique || isPaused}
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            backgroundColor: isExecutingTechnique ? "#666" : "#ff4444",
            color: "#ffffff",
            border: "none",
            borderRadius: "8px",
            cursor: isExecutingTechnique ? "not-allowed" : "pointer",
          }}
        >
          {isExecutingTechnique ? "실행 중..." : "기법 실행"}
        </button>

        {/* Use handleCombatAction */}
        <button onClick={handleCombatAction.executeAction}>
          Combat Action
        </button>
      </div>
    </div>
  );
}

export default CombatControls;
