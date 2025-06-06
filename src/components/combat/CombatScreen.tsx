import React, { useState, useEffect, useCallback } from "react";
import { Container, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type {
  CombatScreenProps,
  TrigramStance,
  KoreanTechnique,
  CombatResult,
} from "../../types";
import { CombatArena } from "./components/CombatArena"; // Named import
import CombatControls from "./components/CombatControls";
import CombatHUD from "./components/CombatHUD";
import { useAudio } from "../../audio/AudioProvider";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../types/constants";

const CombatScreen: React.FC<CombatScreenProps> = ({
  players,
  onGamePhaseChange,
  onPlayerUpdate,
  gameTime,
  currentRound,
  timeRemaining,
  isPaused,
}) => {
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [lastTechnique, setLastTechnique] = useState<KoreanTechnique | null>(
    null
  );
  const audio = useAudio();

  const handleStanceChange = useCallback(
    (playerIndex: 0 | 1, stance: TrigramStance) => {
      onPlayerUpdate(playerIndex, { currentStance: stance });
      setCombatLog((prevLog) => [
        ...prevLog,
        `Player ${playerIndex + 1} changed to ${stance} stance.`,
      ]);
      audio?.playSFX("stance_change");
    },
    [onPlayerUpdate, audio]
  );

  const handleTechniqueExecution = useCallback(
    async (
      playerIndex: 0 | 1,
      technique: KoreanTechnique
    ): Promise<CombatResult | undefined> => {
      setLastTechnique(technique);
      setCombatLog((prevLog) => [
        ...prevLog,
        `Player ${playerIndex + 1} used ${technique.koreanName}.`,
      ]);
      audio?.playSFX("technique_execute"); // Or a more specific sound

      // Simulate a combat result
      const opponentIndex = playerIndex === 0 ? 1 : 0;
      const damageDealt =
        Math.floor(Math.random() * (technique.damage ?? 20)) + 5;

      onPlayerUpdate(opponentIndex, {
        health: Math.max(0, players[opponentIndex].health - damageDealt),
      });

      // Placeholder CombatResult
      const result: CombatResult = {
        damage: damageDealt,
        hit: true,
        critical: Math.random() < 0.1,
        techniqueUsed: technique,
        effects: technique.effects || [],
        vitalPointsHit: [],
        attacker: players[playerIndex].archetype,
        defender: players[opponentIndex].archetype,
        defenderDamaged: true,
        damageType: technique.damageType || "blunt",
        isVitalPoint: false,
        newState:
          players[opponentIndex].health - damageDealt <= 0
            ? "defeated"
            : "idle",
        damagePrevented: 0,
        staminaUsed: technique.staminaCost || 0,
        kiUsed: technique.kiCost || 0,
        attackerStance: players[playerIndex].currentStance,
        defenderStance: players[opponentIndex].currentStance,
        painLevel: damageDealt * 0.5,
        consciousnessImpact: damageDealt * 0.1,
        balanceEffect: 0,
        bloodLoss: 0,
        stunDuration: 0,
        statusEffects: [],
        hitType: "normal",
        effectiveness: 1.0,
        hitPosition: { x: 0, y: 0 },
      };

      if (players[opponentIndex].health - damageDealt <= 0) {
        onGamePhaseChange("victory"); // Or pass winner ID
      }
      return result;
    },
    [onPlayerUpdate, audio, players, onGamePhaseChange]
  );

  useEffect(() => {
    // Example: Log round start
    setCombatLog((prevLog) => [...prevLog, `Round ${currentRound} Start!`]);
  }, [currentRound]);

  if (!players || players.length < 2) {
    return (
      <Text
        text="Waiting for players..."
        x={100}
        y={100}
        style={new PIXI.TextStyle({ fill: KOREAN_COLORS.WHITE, fontSize: 24 })}
      />
    );
  }

  return (
    <Container>
      <CombatHUD
        players={players}
        timeRemaining={timeRemaining}
        currentRound={currentRound}
        isPaused={isPaused}
        gameTime={gameTime}
      />
      <CombatArena
        players={players}
        onPlayerUpdate={onPlayerUpdate}
        onTechniqueExecute={handleTechniqueExecution}
        combatEffects={[]} // Placeholder for actual hit effects
        isExecutingTechnique={false} // Placeholder
      />
      <CombatControls
        player={players[0]} // Example: controls for player 1
        onStanceChange={(playerIndex: number, stance: TrigramStance) =>
          handleStanceChange(playerIndex as 0 | 1, stance)
        } // Example for player 1
        isExecutingTechnique={false} // Placeholder
        isPaused={isPaused}
        // players prop is required by CombatControlsProps, but might be redundant if 'player' is specific
        players={players}
      />
      {/* Combat Log Display (Simplified) */}
      <Container y={500}>
        {combatLog.slice(-5).map((log, index) => (
          <Text
            key={index}
            text={log}
            x={20}
            y={index * 20}
            style={
              new PIXI.TextStyle({
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 14,
                fill: KOREAN_COLORS.CYAN,
              })
            }
          />
        ))}
      </Container>
      {lastTechnique && (
        <Text
          text={`Last Technique: ${lastTechnique.koreanName}`}
          x={20}
          y={600}
          style={
            new PIXI.TextStyle({
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 18,
              fill: KOREAN_COLORS.GOLD,
            })
          }
        />
      )}
    </Container>
  );
};

export default CombatScreen;
