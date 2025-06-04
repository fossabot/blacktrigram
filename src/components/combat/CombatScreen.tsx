import React, { useState, useCallback, useReducer, useEffect } from "react";
import { Container as PixiContainer } from "@pixi/react";
import { CombatArena } from "./components/CombatArena";
import { CombatHUD } from "./components/CombatHUD";
import { CombatControls } from "./components/CombatControls";
import { KoreanText } from "../ui/base/korean-text";
import { useAudio } from "../../audio/AudioManager"; // Fix: Use named import
import { CombatSystem } from "../../systems/CombatSystem";
import type {
  PlayerState,
  TrigramStance,
  CombatResult,
  GameSettings,
  Position,
} from "../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types/constants";
import { createPlayerState } from "../../utils/playerUtils";

interface CombatScreenProps {
  readonly player: PlayerState;
  readonly onPlayerStateChange?: (updates: Partial<PlayerState>) => void;
  readonly onCombatResult?: (result: CombatResult) => void;
  readonly onReturnToMenu?: () => void;
  readonly settings?: GameSettings;
  readonly isActive?: boolean;
}

interface CombatState {
  readonly phase: "preparation" | "active" | "paused" | "finished";
  readonly opponent: PlayerState;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly gameTime: number;
  readonly hitEffects: readonly HitEffect[];
  readonly isPlayerTurn: boolean;
  readonly lastActionTime: number;
}

interface HitEffect {
  readonly id: string;
  readonly position: Position;
  readonly damage: number;
  readonly timestamp: number;
  readonly playerId: string;
}

type CombatAction =
  | { type: "START_COMBAT" }
  | { type: "END_COMBAT"; winner: string }
  | { type: "NEXT_ROUND" }
  | { type: "ADD_HIT_EFFECT"; effect: HitEffect }
  | { type: "UPDATE_GAME_TIME"; time: number }
  | { type: "TOGGLE_TURN" }
  | { type: "UPDATE_OPPONENT"; updates: Partial<PlayerState> };

const createDefaultOpponent = (): PlayerState =>
  createPlayerState("AI Opponent", "amsalja", "gam"); // Fixed: Correct parameter order

const initialCombatState: CombatState = {
  phase: "preparation",
  opponent: createDefaultOpponent(),
  currentRound: 1,
  maxRounds: 3,
  gameTime: 0,
  hitEffects: [],
  isPlayerTurn: true,
  lastActionTime: 0,
};

const combatReducer = (
  state: CombatState,
  action: CombatAction
): CombatState => {
  switch (action.type) {
    case "START_COMBAT":
      return { ...state, phase: "active" };
    case "END_COMBAT":
      return { ...state, phase: "finished" };
    case "ADD_HIT_EFFECT":
      return { ...state, hitEffects: [...state.hitEffects, action.effect] };
    case "UPDATE_GAME_TIME":
      return { ...state, gameTime: action.time };
    case "TOGGLE_TURN":
      return { ...state, isPlayerTurn: !state.isPlayerTurn };
    case "UPDATE_OPPONENT":
      return { ...state, opponent: { ...state.opponent, ...action.updates } };
    default:
      return state;
  }
};

export function CombatScreen({
  player,
  onPlayerStateChange,
  onCombatResult,
  onReturnToMenu,
  settings,
  isActive = true,
}: CombatScreenProps): React.JSX.Element {
  const audio = useAudio(); // Now works correctly
  const [combatState, dispatch] = useReducer(combatReducer, initialCombatState);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Handle combat end
  const handleCombatEnd = useCallback(
    (winner: string) => {
      if (audio?.playSFX) {
        audio.playSFX("victory");
      }

      dispatch({ type: "END_COMBAT", winner });

      if (onCombatResult) {
        // Fixed: Create complete CombatResult
        const result: CombatResult = {
          hit: true,
          damage: 0,
          damageType: "blunt",
          isVitalPoint: false,
          newState: "ready",
          effects: [],
          critical: false,
          vitalPointsHit: [],
          attacker: player.archetype,
          defender: combatState.opponent.archetype,
          damagePrevented: 0,
          staminaUsed: 0,
          kiUsed: 0,
          defenderDamaged: false,
          attackerStance: player.stance,
          defenderStance: combatState.opponent.stance,
          painLevel: 0,
          consciousnessImpact: 0,
          balanceEffect: 0,
          bloodLoss: 0,
          stunDuration: 0,
          statusEffects: [],
          hitType: "normal",
          techniqueUsed: {
            id: "victory",
            name: "Victory",
            koreanName: "승리",
            englishName: "Victory",
            romanized: "seungri",
            description: { korean: "승리", english: "Victory" },
            stance: player.stance,
            type: "special_technique",
          },
          effectiveness: 1.0,
          hitPosition: { x: 0, y: 0 },
          winner,
          loser: winner === player.id ? combatState.opponent.id : player.id,
        };
        onCombatResult(result);
      }
    },
    [audio, player, combatState.opponent, onCombatResult]
  );

  // Ki and stamina regeneration
  useEffect(() => {
    if (combatState.phase !== "active") return;

    const interval = setInterval(() => {
      if (onPlayerStateChange) {
        const kiRegenRate = 2;
        const staminaRegenRate = 3;

        const newKi = Math.min(player.maxKi, player.ki + kiRegenRate);
        const newStamina = Math.min(
          player.maxStamina,
          player.stamina + staminaRegenRate
        );

        onPlayerStateChange({
          ki: newKi,
          stamina: newStamina,
        });
      }

      const opponentKiRegen = Math.min(
        combatState.opponent.maxKi,
        combatState.opponent.ki + 1.5
      );
      const opponentStaminaRegen = Math.min(
        combatState.opponent.maxStamina,
        combatState.opponent.stamina + 2
      );

      dispatch({
        type: "UPDATE_OPPONENT",
        updates: {
          ki: opponentKiRegen,
          stamina: opponentStaminaRegen,
        },
      });

      // Fixed: Handle StatusEffect timestamp property correctly
      if (player.activeEffects && player.activeEffects.length > 0) {
        const now = Date.now();
        const filteredEffects = player.activeEffects.filter((effect) => {
          // Use optional chaining since timestamp might not exist
          const effectTimestamp = (effect as any).timestamp || 0;
          const effectDuration = effect.duration || 0;
          return now - effectTimestamp < effectDuration;
        });

        if (
          filteredEffects.length !== player.activeEffects.length &&
          onPlayerStateChange
        ) {
          onPlayerStateChange({ activeEffects: filteredEffects });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [combatState.phase, player, onPlayerStateChange, combatState.opponent]);

  // Game timer
  useEffect(() => {
    if (combatState.phase !== "active") return;

    const timer = setInterval(() => {
      dispatch({ type: "UPDATE_GAME_TIME", time: combatState.gameTime + 1 });
    }, 1000);

    return () => clearInterval(timer);
  }, [combatState.phase, combatState.gameTime]);

  // Handle stance change
  const handleStanceChangeInternal = useCallback(
    async (newStance: TrigramStance) => {
      if (isProcessingAction || !isActive || combatState.phase !== "active")
        return;

      setIsProcessingAction(true);

      try {
        const stanceManager = new (
          await import("../../systems/trigram/StanceManager")
        ).StanceManager(
          new (
            await import("../../systems/trigram/TrigramCalculator")
          ).TrigramCalculator()
        );

        const transitionResult = stanceManager.changeStance(player, newStance);

        if (transitionResult.success && onPlayerStateChange) {
          onPlayerStateChange({
            stance: newStance,
            ki: transitionResult.newState.ki,
            stamina: transitionResult.newState.stamina,
            lastStanceChangeTime: transitionResult.timestamp,
          });

          if (audio?.playTechniqueSound) {
            audio.playTechniqueSound(
              TRIGRAM_DATA[newStance].technique.koreanName
            );
          }
        }
      } catch (error) {
        console.error("Stance change failed:", error);
      } finally {
        setIsProcessingAction(false);
      }
    },
    [
      isProcessingAction,
      isActive,
      combatState.phase,
      player,
      onPlayerStateChange,
      audio,
    ]
  );

  // Create wrapper to match CombatControls expected signature
  const handleStanceChange = useCallback(
    (playerIndex: number, stance: TrigramStance) => {
      if (playerIndex === 0) {
        handleStanceChangeInternal(stance);
      }
    },
    [handleStanceChangeInternal]
  );

  // Handle attack action
  const handleAttack = useCallback(async () => {
    if (isProcessingAction || !isActive || !combatState.isPlayerTurn) return;

    setIsProcessingAction(true);

    try {
      const technique = TRIGRAM_DATA[player.stance].technique;
      const result = await CombatSystem.executeAttack(
        player,
        combatState.opponent,
        technique
      );

      if (result.hit) {
        const hitEffect: HitEffect = {
          id: `hit_${Date.now()}`,
          position: combatState.opponent.position,
          damage: result.damage,
          timestamp: Date.now(),
          playerId: player.id,
        };

        dispatch({ type: "ADD_HIT_EFFECT", effect: hitEffect });

        dispatch({
          type: "UPDATE_OPPONENT",
          updates: {
            health: Math.max(0, combatState.opponent.health - result.damage),
            consciousness: Math.max(
              0,
              combatState.opponent.consciousness -
                (result.consciousnessImpact || 0)
            ),
          },
        });

        if (audio?.playHitSound) {
          audio.playHitSound(
            result.damage,
            result.vitalPointsHit && result.vitalPointsHit.length > 0
          );
        }

        if (combatState.opponent.health <= result.damage) {
          handleCombatEnd(player.id);
          return;
        }
      } else {
        if (audio?.playSFX) {
          audio.playSFX("miss" as any);
        }
      }

      if (onPlayerStateChange) {
        onPlayerStateChange({
          ki: Math.max(0, player.ki - (technique.kiCost || 0)),
          stamina: Math.max(0, player.stamina - (technique.staminaCost || 0)),
        });
      }

      dispatch({ type: "TOGGLE_TURN" });
    } catch (error) {
      console.error("Attack failed:", error);
    } finally {
      setIsProcessingAction(false);
    }
  }, [
    isProcessingAction,
    isActive,
    combatState.isPlayerTurn,
    player,
    combatState.opponent,
    onPlayerStateChange,
    audio,
    handleCombatEnd,
  ]);

  // Handle block action
  const handleBlock = useCallback(() => {
    if (isProcessingAction || !isActive) return;

    if (audio?.playSFX) {
      audio.playSFX("guard" as any);
    }

    if (onPlayerStateChange) {
      onPlayerStateChange({
        stamina: Math.max(0, player.stamina - 5),
      });
    }

    dispatch({ type: "TOGGLE_TURN" });
  }, [
    isProcessingAction,
    isActive,
    audio,
    onPlayerStateChange,
    player.stamina,
  ]);

  // Handle special technique
  const handleSpecialTechnique = useCallback(async () => {
    if (isProcessingAction || !isActive || player.ki < 30) return;

    setIsProcessingAction(true);

    try {
      if (audio?.playSFX) {
        audio.playSFX("technique" as any);
      }

      const specialDamage = 40;

      dispatch({
        type: "UPDATE_OPPONENT",
        updates: {
          health: Math.max(0, combatState.opponent.health - specialDamage),
        },
      });

      if (onPlayerStateChange) {
        onPlayerStateChange({
          ki: Math.max(0, player.ki - 30),
          stamina: Math.max(0, player.stamina - 20),
        });
      }

      if (combatState.opponent.health <= specialDamage) {
        handleCombatEnd(player.id);
      } else {
        dispatch({ type: "TOGGLE_TURN" });
      }
    } catch (error) {
      console.error("Special technique failed:", error);
    } finally {
      setIsProcessingAction(false);
    }
  }, [
    isProcessingAction,
    isActive,
    player.ki,
    audio,
    combatState.opponent.health,
    onPlayerStateChange,
    player,
    handleCombatEnd,
  ]);

  // Remove unused handleCombatActions or use it
  const combatActions = useCallback(
    () => ({
      attack: handleAttack,
      block: handleBlock,
      special: handleSpecialTechnique,
    }),
    [handleAttack, handleBlock, handleSpecialTechnique]
  );

  return (
    <PixiContainer>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: `#${KOREAN_COLORS.BLACK.toString(16).padStart(
            6,
            "0"
          )}`,
          color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(6, "0")}`,
          fontFamily: "Noto Sans KR, Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Combat Arena - use combatActions */}
        <CombatArena
          player={player}
          opponent={combatState.opponent}
          onCombatResult={onCombatResult}
          onPlayerStateChange={onPlayerStateChange}
          onOpponentStateChange={(updates) =>
            dispatch({ type: "UPDATE_OPPONENT", updates })
          }
          isActive={isActive && combatState.phase === "active"}
          showVitalPoints={settings?.showVitalPoints || false}
          showDebugInfo={settings?.showDebugInfo || false}
          combatActions={combatActions()}
        />

        {/* Combat HUD */}
        <CombatHUD
          player={player}
          opponent={combatState.opponent}
          currentRound={combatState.currentRound} // Fixed: Added missing props
          maxRounds={combatState.maxRounds}
          gameTime={combatState.gameTime}
          isPlayerTurn={combatState.isPlayerTurn}
          phase={combatState.phase}
        />

        {/* Combat Controls */}
        <CombatControls
          players={[player, combatState.opponent]}
          player={player} // Add missing required prop
          onStanceChange={handleStanceChange}
          isExecutingTechnique={isProcessingAction}
          isPaused={combatState.phase !== "active"}
        />

        {/* Combat Phase Overlay */}
        {combatState.phase === "preparation" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: `linear-gradient(135deg, #${KOREAN_COLORS.BLACK.toString(
                16
              ).padStart(6, "0")}dd, #${KOREAN_COLORS.DOJANG_BLUE.toString(
                16
              ).padStart(6, "0")}dd)`,
              padding: "32px",
              borderRadius: "12px",
              border: `2px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(
                6,
                "0"
              )}`,
              textAlign: "center",
              zIndex: 1000,
            }}
          >
            <KoreanText
              korean="전투 준비 중..."
              english="Preparing for Combat..."
              size="large"
              weight="semibold" // Fixed: Use proper KoreanFontWeight value
              color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
            />
          </div>
        )}

        {/* Combat End Overlay */}
        {combatState.phase === "finished" && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, #${KOREAN_COLORS.BLACK.toString(
                  16
                ).padStart(6, "0")}, #${KOREAN_COLORS.DOJANG_BLUE.toString(
                  16
                ).padStart(6, "0")})`,
                padding: "48px",
                borderRadius: "16px",
                border: `3px solid #${KOREAN_COLORS.GOLD.toString(16).padStart(
                  6,
                  "0"
                )}`,
                textAlign: "center",
                maxWidth: "600px",
              }}
            >
              <KoreanText
                korean="전투 종료"
                english="Combat Finished"
                size="xlarge"
                weight="bold" // Fixed: Use proper KoreanFontWeight value
                color={`#${KOREAN_COLORS.GOLD.toString(16).padStart(6, "0")}`}
              />

              <div style={{ marginTop: "24px" }}>
                <button
                  onClick={onReturnToMenu}
                  style={{
                    padding: "12px 24px",
                    background: `#${KOREAN_COLORS.TRADITIONAL_RED.toString(
                      16
                    ).padStart(6, "0")}`,
                    color: `#${KOREAN_COLORS.WHITE.toString(16).padStart(
                      6,
                      "0"
                    )}`, // Fixed: Convert to hex string
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontFamily: "Noto Sans KR, Arial, sans-serif",
                  }}
                >
                  메인 메뉴로 돌아가기 (Return to Main Menu)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Korean Martial Arts Status */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "16px",
            fontSize: "12px",
            color: `#${KOREAN_COLORS.CYAN.toString(16).padStart(6, "0")}`, // Fixed: Convert to hex string
            opacity: 0.8,
          }}
        >
          흑괘 무술 시뮬레이터 (Black Trigram Martial Arts Simulator) |
          {TRIGRAM_DATA[player.stance].symbol}{" "}
          {TRIGRAM_DATA[player.stance].name.korean}
        </div>
      </div>
    </PixiContainer>
  );
}

export default CombatScreen;
