import React, { useState, useEffect, useCallback, useRef } from "react";
import type {
  PlayerState,
  TrigramStance,
  CombatResult,
  GamePhase,
  Position,
} from "../../types";
import { CombatHUD } from "./components/CombatHUD";
import { CombatControls } from "./components/CombatControls";
import { CombatArena } from "./components/CombatArena";
import { useAudio } from "../../audio/AudioManager";
import { CombatSystem } from "../../systems/CombatSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";
import { KoreanText } from "../ui/base/korean-text/KoreanText";

interface CombatScreenProps {
  readonly players: readonly PlayerState[];
  readonly onGamePhaseChange: (phase: GamePhase) => void;
  readonly onPlayerUpdate: (
    index: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly gameTime: number;
  readonly currentRound: number;
  readonly maxRounds: number;
}

interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly damage: number;
  readonly type: "normal" | "critical" | "vital";
  readonly timestamp: number;
}

export function CombatScreen({
  players,
  onGamePhaseChange,
  onPlayerUpdate,
  gameTime,
  currentRound,
  maxRounds,
}: CombatScreenProps): React.JSX.Element {
  const audio = useAudio();
  const [player1] = useState(players[0]);
  const [player2] = useState(players[1]);
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [isProcessingAction, setIsProcessingAction] = useState(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);
  const gameLoopRef = useRef<number>();

  const ARENA_WIDTH = 800;
  const ARENA_HEIGHT = 600;

  // Korean martial arts combat initialization
  useEffect(() => {
    audio.playMusic("combat_theme", { loop: true, volume: 0.6 });

    // Initialize combat positions if not set
    if (player1.position.x === 0 && player1.position.y === 0) {
      onPlayerUpdate(0, {
        position: { x: ARENA_WIDTH * 0.25, y: ARENA_HEIGHT * 0.6 },
      });
    }
    if (player2.position.x === 0 && player2.position.y === 0) {
      onPlayerUpdate(1, {
        position: { x: ARENA_WIDTH * 0.75, y: ARENA_HEIGHT * 0.6 },
      });
    }

    // Start game loop for Korean martial arts physics
    const gameLoop = () => {
      // Update combat states, regeneration, effect timers
      updateCombatStates();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      audio.stopMusic();
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [audio, player1.position, player2.position, onPlayerUpdate]);

  // Check win conditions
  useEffect(() => {
    const winner = CombatSystem.checkWinCondition([player1, player2]);
    if (winner) {
      setIsProcessingAction(true);
      audio.playSFX("combat_end");

      setTimeout(() => {
        onGamePhaseChange("end");
      }, 2000);
    }
  }, [
    player1.health,
    player1.consciousness,
    player2.health,
    player2.consciousness,
    audio,
    onGamePhaseChange,
  ]);

  const updateCombatStates = useCallback(() => {
    // Regenerate Ki and stamina over time
    const regenRate = 16; // 60fps
    const kiRegen = 0.5 * (regenRate / 1000);
    const staminaRegen = 1.0 * (regenRate / 1000);

    [player1, player2].forEach((player, index) => {
      const updates: Partial<PlayerState> = {};

      if (player.ki < player.maxKi) {
        updates.ki = Math.min(player.maxKi, player.ki + kiRegen);
      }

      if (player.stamina < player.maxStamina) {
        updates.stamina = Math.min(
          player.maxStamina,
          player.stamina + staminaRegen
        );
      }

      // Process active effects
      if (player.activeEffects?.length > 0) {
        const updatedEffects = player.activeEffects.filter((effect) => {
          return (effect.duration || 0) > gameTime;
        });

        if (updatedEffects.length !== player.activeEffects.length) {
          updates.activeEffects = updatedEffects;
        }
      }

      if (Object.keys(updates).length > 0) {
        onPlayerUpdate(index, updates);
      }
    });

    // Clean up old hit effects
    setHitEffects((prev) =>
      prev.filter((effect) => gameTime - effect.timestamp < 2000)
    );
  }, [player1, player2, gameTime, onPlayerUpdate]);

  // Korean martial arts stance change handler
  const handleStanceChange = useCallback(
    async (playerId: string, newStance: TrigramStance) => {
      if (isProcessingAction) return;

      const playerIndex = players.findIndex((p) => p.id === playerId);
      if (playerIndex === -1) return;

      const player = players[playerIndex];
      if (player.stance === newStance) return;

      setIsProcessingAction(true);

      try {
        // Use TrigramSystem for authentic Korean martial arts transitions
        const canTransition = TrigramSystem.canTransitionTo(
          player.stance,
          newStance,
          player
        );

        if (canTransition) {
          const transitionResult = TrigramSystem.executeTransition(
            player,
            newStance
          );

          if (transitionResult.success) {
            onPlayerUpdate(playerIndex, transitionResult.newState);
            audio.playSFX("stance_change");

            const logEntry = `${player.name}이(가) ${TRIGRAM_DATA[newStance].name.korean} 자세로 전환했습니다.`;
            setCombatLog((prev) => [...prev.slice(-4), logEntry]);
          }
        }
      } catch (error) {
        console.error("Korean martial arts stance transition error:", error);
      } finally {
        setTimeout(() => setIsProcessingAction(false), 300);
      }
    },
    [isProcessingAction, players, onPlayerUpdate, audio]
  );

  // Korean martial arts attack execution
  const handleAttack = useCallback(
    async (attackerId: string) => {
      if (isProcessingAction) return;

      const attackerIndex = players.findIndex((p) => p.id === attackerId);
      const defenderIndex = attackerIndex === 0 ? 1 : 0;

      if (attackerIndex === -1) return;

      const attacker = players[attackerIndex];
      const defender = players[defenderIndex];

      setIsProcessingAction(true);

      try {
        // Execute Korean martial arts combat
        const technique = TRIGRAM_DATA[attacker.stance].technique;
        const combatResult: CombatResult = await CombatSystem.executeAttack(
          attacker,
          defender,
          technique
        );

        if (combatResult.hit) {
          // Apply damage and effects
          const defenderUpdates: Partial<PlayerState> = {
            health: Math.max(0, defender.health - combatResult.damage),
            consciousness: Math.max(
              0,
              defender.consciousness - (combatResult.consciousnessImpact || 0)
            ),
            pain: Math.min(100, defender.pain + (combatResult.painLevel || 0)),
            activeEffects: [
              ...(defender.activeEffects || []),
              ...combatResult.effects,
            ],
          };

          const attackerUpdates: Partial<PlayerState> = {
            stamina: Math.max(0, attacker.stamina - combatResult.staminaUsed),
            ki: Math.max(0, attacker.ki - combatResult.kiUsed),
          };

          onPlayerUpdate(defenderIndex, defenderUpdates);
          onPlayerUpdate(attackerIndex, attackerUpdates);

          // Create hit effect
          const hitEffect: HitEffect = {
            id: `hit_${Date.now()}`,
            position: defender.position,
            damage: combatResult.damage,
            type: combatResult.critical
              ? "critical"
              : combatResult.isVitalPoint
              ? "vital"
              : "normal",
            timestamp: gameTime,
          };
          setHitEffects((prev) => [...prev, hitEffect]);

          // Audio feedback
          await audio.playHitSound(
            combatResult.damage,
            combatResult.isVitalPoint
          );

          if (combatResult.critical) {
            audio.playSFX("critical_hit");
          }

          // Combat log
          const logEntry = combatResult.critical
            ? `${attacker.name}의 치명적인 ${technique.koreanName}! (${combatResult.damage} 피해)`
            : `${attacker.name}의 ${technique.koreanName} (${combatResult.damage} 피해)`;
          setCombatLog((prev) => [...prev.slice(-4), logEntry]);
        } else {
          audio.playSFX("attack_miss");

          const attackerUpdates: Partial<PlayerState> = {
            stamina: Math.max(0, attacker.stamina - 5), // Miss penalty
          };
          onPlayerUpdate(attackerIndex, attackerUpdates);

          setCombatLog((prev) => [
            ...prev.slice(-4),
            `${attacker.name}의 공격이 빗나갔습니다.`,
          ]);
        }
      } catch (error) {
        console.error("Korean martial arts combat error:", error);
      } finally {
        setTimeout(() => setIsProcessingAction(false), 600);
      }
    },
    [isProcessingAction, players, onPlayerUpdate, audio, gameTime]
  );

  const handleBlock = useCallback(
    (playerId: string) => {
      const playerIndex = players.findIndex((p) => p.id === playerId);
      if (playerIndex === -1) return;

      const player = players[playerIndex];

      onPlayerUpdate(playerIndex, {
        stamina: Math.max(0, player.stamina - 10),
        combatState: "defending",
      });

      audio.playSFX("block");
      setCombatLog((prev) => [
        ...prev.slice(-4),
        `${player.name}이(가) 방어 자세를 취했습니다.`,
      ]);
    },
    [players, onPlayerUpdate, audio]
  );

  const handleSpecialTechnique = useCallback(
    async (playerId: string) => {
      const playerIndex = players.findIndex((p) => p.id === playerId);
      if (playerIndex === -1) return;

      const player = players[playerIndex];

      if (player.ki < 25) return;

      const technique = TRIGRAM_DATA[player.stance].technique;

      onPlayerUpdate(playerIndex, {
        ki: Math.max(0, player.ki - 25),
        stamina: Math.max(0, player.stamina - 15),
      });

      audio.playSFX("special_technique");
      setCombatLog((prev) => [
        ...prev.slice(-4),
        `${player.name}이(가) ${technique.koreanName} 특수기를 사용했습니다!`,
      ]);
    },
    [players, onPlayerUpdate, audio]
  );

  const handlePlayerClick = useCallback(
    (playerId: string, position: Position) => {
      // Handle targeting for precise Korean martial arts strikes
      console.log(`Korean martial arts targeting: ${playerId} at`, position);
    },
    []
  );

  // Render Korean martial arts combat interface
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: `linear-gradient(135deg, #${KOREAN_COLORS.BLACK.toString(
          16
        )} 0%, #${KOREAN_COLORS.TRADITIONAL_BLUE.toString(16)} 100%)`,
        position: "relative",
        overflow: "hidden",
        fontFamily: '"Noto Sans KR", Arial, sans-serif',
      }}
    >
      {/* Combat Arena */}
      <CombatArena
        width={ARENA_WIDTH}
        height={ARENA_HEIGHT}
        player1={player1}
        player2={player2}
        hitEffects={hitEffects}
        onPlayerClick={handlePlayerClick}
      />

      {/* HUD Overlay */}
      <CombatHUD
        player1={player1}
        player2={player2}
        currentRound={currentRound}
        maxRounds={maxRounds}
        gameTime={gameTime}
      />

      {/* Combat Controls for Player 1 */}
      <CombatControls
        player={player1}
        onStanceChange={(stance) => handleStanceChange(player1.id, stance)}
        onAttack={() => handleAttack(player1.id)}
        onBlock={() => handleBlock(player1.id)}
        onSpecialTechnique={() => handleSpecialTechnique(player1.id)}
        disabled={isProcessingAction}
      />

      {/* Combat Log */}
      <div
        style={{
          position: "absolute",
          right: "1rem",
          bottom: "1rem",
          width: "300px",
          maxHeight: "200px",
          background: "rgba(0, 0, 0, 0.8)",
          border: `1px solid #${KOREAN_COLORS.GOLD.toString(16)}`,
          borderRadius: "8px",
          padding: "1rem",
          overflow: "auto",
          fontSize: "0.8rem",
          color: "#ffffff",
        }}
      >
        <KoreanText
          korean="전투 기록"
          english="Combat Log"
          size="small"
          weight={600}
          style={{ marginBottom: "0.5rem" }}
        />
        {combatLog.map((entry, index) => (
          <div key={index} style={{ marginBottom: "0.3rem", opacity: 0.8 }}>
            {entry}
          </div>
        ))}
      </div>

      {/* Exit Controls */}
      <button
        onClick={() => onGamePhaseChange("intro")}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          padding: "0.5rem 1rem",
          background: "rgba(0, 0, 0, 0.8)",
          border: `1px solid #${KOREAN_COLORS.WHITE.toString(16)}`,
          borderRadius: "4px",
          color: "#ffffff",
          cursor: "pointer",
          fontFamily: '"Noto Sans KR", Arial, sans-serif',
        }}
      >
        <KoreanText korean="나가기" english="Exit" size="small" />
      </button>

      {/* Combat Processing Overlay */}
      {isProcessingAction && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              padding: "1rem 2rem",
              borderRadius: "8px",
              border: `2px solid #${KOREAN_COLORS.GOLD.toString(16)}`,
            }}
          >
            <KoreanText
              korean="기법 실행 중..."
              english="Executing Technique..."
              size="medium"
              weight={600}
            />
          </div>
        </div>
      )}
    </div>
  );
}
