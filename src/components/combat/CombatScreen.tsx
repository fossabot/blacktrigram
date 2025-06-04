import { useState, useEffect, useCallback } from "react";
import { Container, Graphics } from "@pixi/react";
import type { PlayerState, TrigramStance, KoreanTechnique } from "../../types";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types";
import { CombatSystem } from "../../systems/CombatSystem";
import { useAudio } from "../../audio/AudioManager";
import { KoreanText } from "../ui/base/korean-text/KoreanText";
import { CombatHUD } from "./components/CombatHUD";
import { CombatArena } from "./components/CombatArena";
import { CombatControls } from "./components/CombatControls";

interface CombatScreenProps {
  readonly players: readonly [PlayerState, PlayerState];
  readonly onGamePhaseChange: (phase: string) => void;
  readonly onPlayerUpdate: (
    playerIndex: number,
    updates: Partial<PlayerState>
  ) => void;
  readonly gameTime: number;
  readonly currentRound: number;
  readonly timeRemaining: number;
  readonly isPaused: boolean;
}

export function CombatScreen({
  players,
  onGamePhaseChange,
  onPlayerUpdate,
  currentRound,
  timeRemaining,
  isPaused,
}: CombatScreenProps): React.JSX.Element {
  const audio = useAudio();

  // Combat state management
  const [combatEffects, setCombatEffects] = useState<readonly any[]>([]);
  const [selectedVitalPoint] = useState<string | null>(null);
  const [isExecutingTechnique, setIsExecutingTechnique] =
    useState<boolean>(false);

  // Execute Korean martial arts technique
  const executeTechnique = useCallback(
    async (
      attackerIndex: number,
      technique: KoreanTechnique
    ): Promise<void> => {
      if (isExecutingTechnique || isPaused) return;

      setIsExecutingTechnique(true);
      const attacker = players[attackerIndex];
      const defender = players[attackerIndex === 0 ? 1 : 0];

      try {
        // Create proper VitalPoint object if targeting specific point
        const targetVitalPoint = selectedVitalPoint
          ? {
              id: selectedVitalPoint,
              name: { korean: selectedVitalPoint, english: selectedVitalPoint },
              korean: selectedVitalPoint,
              english: selectedVitalPoint,
              category: "head" as const,
              description: { korean: "", english: "" },
              effects: [],
              location: { x: 0.5, y: 0.2, region: "head" as const },
              severity: "moderate" as const,
              technique: ["striking"],
              baseAccuracy: 0.7,
              baseDamage: 15,
              baseStun: 2,
              damageMultiplier: 1.5,
            }
          : undefined;

        // Use CombatSystem to resolve attack
        const combatResult = await CombatSystem.executeAttack({
          attacker,
          defender,
          technique,
          targetPoint: targetVitalPoint?.id || null, // Use ID instead of object
        });

        // Apply Korean martial arts audio feedback
        if (combatResult.hit) {
          audio.playHitSound(combatResult.damage, combatResult.isVitalPoint);
          if (combatResult.isVitalPoint) {
            audio.playSFX("perfect_strike");
          }
        } else {
          audio.playSFX("attack_light");
        }

        // Update attacker state (stamina and ki costs)
        const attackerUpdates: Partial<PlayerState> = {
          stamina: Math.max(
            0,
            attacker.stamina - (technique.staminaCost ?? 10)
          ),
          ki: Math.max(0, attacker.ki - (technique.kiCost ?? 5)),
          isAttacking: true,
        };

        // Update defender state if hit
        const defenderUpdates: Partial<PlayerState> = combatResult.hit
          ? {
              health: Math.max(0, defender.health - combatResult.damage),
              consciousness: Math.max(
                0,
                defender.consciousness - combatResult.consciousnessImpact
              ),
              pain: Math.min(100, defender.pain + combatResult.painLevel),
              balance: Math.max(
                0,
                defender.balance - combatResult.balanceEffect
              ),
              bloodLoss: Math.min(
                100,
                defender.bloodLoss + combatResult.bloodLoss
              ),
              activeEffects: [
                ...defender.activeEffects,
                ...combatResult.statusEffects,
              ],
            }
          : {};

        // Apply updates through parent component
        onPlayerUpdate(attackerIndex, attackerUpdates);
        if (combatResult.hit) {
          onPlayerUpdate(attackerIndex === 0 ? 1 : 0, defenderUpdates);
        }

        // Add visual combat effects
        if (combatResult.hit) {
          const hitEffect = {
            id: `hit_${Date.now()}`,
            position: combatResult.hitPosition ?? defender.position,
            type: combatResult.hitType,
            damage: combatResult.damage,
            startTime: Date.now(),
            duration: 1000,
            korean: technique.koreanName,
            color: TRIGRAM_DATA[attacker.stance]?.color ?? KOREAN_COLORS.WHITE,
            createdAt: Date.now(),
          };
          setCombatEffects((prev) => [...prev, hitEffect]);
        }
      } catch (error) {
        console.error("Failed to execute technique:", error);
        audio.playSFX("menu_back"); // Error sound
      } finally {
        setIsExecutingTechnique(false);
        // Reset attacking state after animation
        setTimeout(() => {
          onPlayerUpdate(attackerIndex, { isAttacking: false });
        }, 500);
      }
    },
    [
      players,
      isExecutingTechnique,
      isPaused,
      selectedVitalPoint,
      audio,
      onPlayerUpdate,
    ]
  );

  // Handle stance changes for Korean martial arts trigrams
  const handleStanceChange = useCallback(
    (playerIndex: number, newStance: TrigramStance): void => {
      const player = players[playerIndex];
      if (player.stance === newStance || isExecutingTechnique) return;

      // Play Korean martial arts stance change sound
      audio.playStanceChangeSound();

      // Apply stance change with proper costs
      const stanceCost = 5; // Base ki cost for stance change
      const updates: Partial<PlayerState> = {
        stance: newStance,
        ki: Math.max(0, player.ki - stanceCost),
        lastStanceChangeTime: Date.now(),
      };

      onPlayerUpdate(playerIndex, updates);
    },
    [players, isExecutingTechnique, audio, onPlayerUpdate]
  );

  // Handle space bar technique execution
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (isPaused || isExecutingTechnique) return;

      switch (event.key) {
        case " ": // Space - execute current stance technique
          event.preventDefault();
          const player1 = players[0];
          const technique = TRIGRAM_DATA[player1.stance]?.technique;
          if (technique) {
            executeTechnique(0, technique);
          }
          break;
        case "Escape":
          onGamePhaseChange("intro");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    players,
    isPaused,
    isExecutingTechnique,
    executeTechnique,
    onGamePhaseChange,
  ]);

  // Clean up expired combat effects
  useEffect(() => {
    const cleanup = setInterval(() => {
      setCombatEffects((prev) =>
        prev.filter(
          (effect: any) => Date.now() - effect.createdAt < effect.duration
        )
      );
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  // Combat screen layout with Korean martial arts aesthetics
  return (
    <Container>
      {/* Combat Arena with Dojang Background */}
      <CombatArena
        players={players}
        onPlayerUpdate={onPlayerUpdate}
        onTechniqueExecute={async (playerIndex: number, technique: any) => {
          await executeTechnique(playerIndex, technique);
        }}
        combatEffects={combatEffects}
        isExecutingTechnique={isExecutingTechnique}
      />

      {/* Combat HUD Overlay */}
      <CombatHUD
        players={players}
        timeRemaining={timeRemaining}
        currentRound={currentRound}
      />

      {/* Center timer display */}
      <Container x={400} y={20}>
        <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.BLACK, 0.7);
            g.drawRoundedRect(-80, -10, 160, 40, 10);
            g.endFill();
          }}
        />
        <KoreanText
          korean={`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60)
            .toString()
            .padStart(2, "0")}`}
          english={`Round ${currentRound}`}
          style={{ fontSize: 18, fill: `#${KOREAN_COLORS.WHITE.toString(16)}` }}
        />
      </Container>

      {/* Combat Controls */}
      <CombatControls
        players={players}
        onStanceChange={handleStanceChange}
        isExecutingTechnique={isExecutingTechnique}
        isPaused={isPaused}
      />

      {/* Pause overlay */}
      {isPaused && (
        <Container>
          <Graphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.BLACK, 0.8);
              g.drawRect(0, 0, 800, 600);
              g.endFill();
            }}
          />
          <KoreanText
            korean="일시정지"
            english="PAUSED"
            style={{
              fontSize: 48,
              fill: `#${KOREAN_COLORS.WHITE.toString(16)}`,
            }}
          />
        </Container>
      )}
    </Container>
  );
}
