import React, { useCallback, useMemo, useState } from "react";
import { Container, useTick } from "@pixi/react";
import type {
  CombatArenaProps,
  HitEffect,
  Position,
  VitalPoint,
} from "../../../types";
import { HitEffectType } from "../../../types/enums"; // Import HitEffectType
import PlayerVisuals from "../../game/PlayerVisuals";
import { HitEffectsLayer } from "../../game/HitEffectsLayer";
import { KOREAN_COLORS, GAME_CONFIG } from "../../../types/constants";

export const CombatArena: React.FC<CombatArenaProps> = ({
  players,
  onTechniqueExecute,
  combatEffects: externalCombatEffects,
  isExecutingTechnique,
  showVitalPoints,
  showDebugInfo,
  width = GAME_CONFIG.CANVAS_WIDTH,
  height = GAME_CONFIG.CANVAS_HEIGHT - 200,
  ...props
}) => {
  const [internalCombatEffects, setInternalCombatEffects] = useState<
    readonly HitEffect[]
  >([]);
  const [selectedTarget, setSelectedTarget] = useState<{
    playerId: string;
    vitalPointId?: string;
  } | null>(null);

  const allCombatEffects = useMemo(() => {
    return [...(externalCombatEffects || []), ...internalCombatEffects].slice(
      -10
    );
  }, [externalCombatEffects, internalCombatEffects]);

  const handlePlayerClick = useCallback(
    async (playerIndex: 0 | 1, vitalPoint?: VitalPoint) => {
      const targetPlayer = players[playerIndex];
      if (!targetPlayer) return;

      const activePlayerIndex = players[0].combatState !== "idle" ? 0 : 1;
      const activePlayer = players[activePlayerIndex];

      // Mock technique for now - Add missing romanized property
      const mockTechnique = {
        id: "basic_strike",
        name: "기본 타격", // Changed from object to string
        koreanName: "기본 타격",
        englishName: "Basic Strike",
        romanized: "gibon tagyeok", // Added missing romanized property
        description: {
          korean: "기본 타격 기술",
          english: "Basic strike technique",
        },
        stance: activePlayer.currentStance,
        type: "strike" as const,
        damage: 10,
        kiCost: 5,
        staminaCost: 10,
        executionTime: 500,
        range: 80,
        accuracy: 85,
        effects: [],
        requirements: {
          minKi: 5,
          minStamina: 10,
          requiredStance: activePlayer.currentStance,
        },
      };

      if (activePlayer.id !== targetPlayer.id) {
        setSelectedTarget({
          playerId: targetPlayer.id,
          vitalPointId: vitalPoint?.id,
        });

        const result = await onTechniqueExecute(
          activePlayerIndex,
          mockTechnique
        );
        if (result && result.hit) {
          const newEffect: HitEffect = {
            id: `hit-effect-${Date.now()}`,
            type: result.critical
              ? HitEffectType.CRITICAL // Corrected
              : HitEffectType.MEDIUM, // Corrected
            position: result.hitPosition || targetPlayer.position,
            damage: result.damage,
            timestamp: Date.now(),
            duration: 500,
            color: KOREAN_COLORS.ACCENT_RED,
            targetPlayerId: targetPlayer.id, // Corrected property name
          };
          setInternalCombatEffects((prev) => [...prev, newEffect]);
        }
      }
    },
    [players, onTechniqueExecute]
  );

  useTick(() => {
    // Animation logic here
  });

  const player1 = players[0];
  const player2 = players[1];

  if (!player1 || !player2) return <Container />;

  const player1Position: Position = { x: width * 0.25, y: height * 0.65 };
  const player2Position: Position = { x: width * 0.75, y: height * 0.65 };

  return (
    <Container width={width} height={height} {...props}>
      {/* Player 1 Visuals - Remove position prop */}
      <PlayerVisuals
        playerState={player1}
        x={player1Position.x}
        y={player1Position.y}
        width={100}
        height={150}
        showVitalPoints={showVitalPoints}
        onClick={() => handlePlayerClick(0)}
      />

      {/* Player 2 Visuals - Remove position prop */}
      <PlayerVisuals
        playerState={player2}
        x={player2Position.x}
        y={player2Position.y}
        width={100}
        height={150}
        showVitalPoints={showVitalPoints}
        onClick={() => handlePlayerClick(1)}
      />

      <HitEffectsLayer effects={allCombatEffects} />

      {showDebugInfo && selectedTarget && (
        <Container>{/* Debug info components */}</Container>
      )}
    </Container>
  );
};
