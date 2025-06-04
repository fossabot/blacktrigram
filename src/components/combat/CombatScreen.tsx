import { useState, useCallback, useEffect, useRef } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type {
  PlayerState,
  TrigramStance,
  KoreanTechnique,
  CombatResult,
  PlayerArchetype,
  VitalPoint,
} from "../../types";
import { useAudio } from "../../audio/AudioManager";
import { CombatSystem } from "../../systems/CombatSystem";
import { VitalPointSystem } from "../../systems/VitalPointSystem";
import { TrigramSystem } from "../../systems/TrigramSystem";
import { TRIGRAM_DATA, KOREAN_COLORS } from "../../types/constants";
import { KoreanText, KoreanTechniqueText } from "../ui/base/korean-text";
import {
  TECHNIQUES,
  getTechniquesByStance,
} from "../../systems/trigram/KoreanTechniques";
import {
  getPhilosophyForStance,
  getStanceWisdom,
} from "../../systems/trigram/KoreanCulture";
import { TrigramWheel, ProgressBar } from "../ui/base/PixiComponents";

interface CombatScreenProps {
  readonly player1Archetype: PlayerArchetype;
  readonly player2Archetype: PlayerArchetype;
  readonly onCombatEnd: (winner: string, result: CombatResult) => void;
  readonly onReturnToMenu: () => void;
}

interface CombatState {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly currentTurn: "player1" | "player2";
  readonly combatLog: readonly CombatResult[];
  readonly gamePhase: "preparation" | "combat" | "finished";
  readonly winner: string | null;
  readonly selectedVitalPoint: VitalPoint | null;
  readonly isTargetingMode: boolean;
  readonly timeRemaining: number;
}

const TURN_TIME_LIMIT = 30000; // 30 seconds per turn
const COMBAT_ARENA_WIDTH = 800;
const COMBAT_ARENA_HEIGHT = 600;

export function CombatScreen({
  player1Archetype,
  player2Archetype,
  onCombatEnd,
  onReturnToMenu,
}: CombatScreenProps): React.ReactElement {
  const audio = useAudio();
  const trigramSystem = useRef(new TrigramSystem());

  // Initialize player states
  const createInitialPlayerState = useCallback(
    (id: string, archetype: PlayerArchetype): PlayerState => ({
      id,
      name: `${archetype}_fighter`,
      archetype,
      stance: "geon", // Start with Heaven stance
      position: { x: id === "player1" ? 200 : 600, y: 300 },
      facing: id === "player1" ? "right" : "left",
      health: 100,
      maxHealth: 100,
      ki: 100,
      maxKi: 100,
      stamina: 100,
      maxStamina: 100,
      consciousness: 100,
      pain: 0,
      balance: 100,
      bloodLoss: 0,
      lastStanceChangeTime: 0,
      isAttacking: false,
      combatReadiness: 100,
      activeEffects: [],
      combatState: "ready",
      conditions: [],
    }),
    []
  );

  const [combatState, setCombatState] = useState<CombatState>(() => ({
    player1: createInitialPlayerState("player1", player1Archetype),
    player2: createInitialPlayerState("player2", player2Archetype),
    currentTurn: "player1",
    combatLog: [],
    gamePhase: "preparation",
    winner: null,
    selectedVitalPoint: null,
    isTargetingMode: false,
    timeRemaining: TURN_TIME_LIMIT,
  }));

  // Timer for turn management
  useEffect(() => {
    if (combatState.gamePhase !== "combat") return;

    const timer = setInterval(() => {
      setCombatState((prev) => {
        if (prev.timeRemaining <= 1000) {
          // Time up, switch turns
          return {
            ...prev,
            currentTurn: prev.currentTurn === "player1" ? "player2" : "player1",
            timeRemaining: TURN_TIME_LIMIT,
            isTargetingMode: false,
            selectedVitalPoint: null,
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1000 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [combatState.gamePhase]);

  // Combat execution
  const executeAttack = useCallback(
    async (
      attacker: PlayerState,
      defender: PlayerState,
      technique: KoreanTechnique,
      targetVitalPoint?: VitalPoint
    ) => {
      // Play technique audio
      audio.playAttackSound(technique.damageRange?.min || 10);

      // Execute combat through CombatSystem
      const result = await CombatSystem.executeAttack(
        attacker,
        defender,
        technique,
        targetVitalPoint?.id
      );

      // Play hit/miss audio feedback
      if (result.hit) {
        audio.playHitSound(result.damage, result.isVitalPoint);
        if (result.isVitalPoint && targetVitalPoint) {
          // Try to play vital point sound, fall back to generic if not found
          try {
            audio.playSFX(`vital_${targetVitalPoint.category}` as any);
          } catch {
            audio.playSFX("hit_heavy" as any);
          }
        }
      } else {
        try {
          audio.playSFX("miss" as any);
        } catch {
          // Fallback if miss sound not available
        }
      }

      // Update defender state
      const newDefenderState: PlayerState = {
        ...defender,
        health: Math.max(0, defender.health - result.damage),
        consciousness: Math.max(
          0,
          defender.consciousness - (result.consciousnessImpact || 0)
        ),
        pain: Math.min(100, defender.pain + (result.painLevel || 0)),
        balance: Math.max(0, defender.balance - (result.balanceEffect || 0)),
        bloodLoss: defender.bloodLoss + (result.bloodLoss || 0),
        combatState: result.newState || defender.combatState,
        activeEffects: [
          ...defender.activeEffects,
          ...(result.statusEffects || []),
        ],
      };

      // Update attacker stamina/ki
      const newAttackerState: PlayerState = {
        ...attacker,
        stamina: Math.max(
          0,
          attacker.stamina - (result.staminaUsed || technique.staminaCost || 0)
        ),
        ki: Math.max(0, attacker.ki - (result.kiUsed || technique.kiCost || 0)),
      };

      return { result, newAttackerState, newDefenderState };
    },
    [audio]
  );

  // Handle stance change
  const handleStanceChange = useCallback(
    (newStance: TrigramStance) => {
      setCombatState((prev) => {
        const currentPlayer =
          prev.currentTurn === "player1" ? prev.player1 : prev.player2;
        const stanceResult = trigramSystem.current.executeStanceChange(
          currentPlayer,
          newStance
        );

        if (stanceResult.success) {
          try {
            audio.playSFX(`stance_${newStance}` as any);
          } catch {
            // Fallback if stance sound not available
          }

          const updatedPlayer = stanceResult.newState || {
            ...currentPlayer,
            stance: newStance,
            ki: currentPlayer.ki - stanceResult.cost.ki,
            stamina: currentPlayer.stamina - stanceResult.cost.stamina,
            lastStanceChangeTime: Date.now(),
          };

          return {
            ...prev,
            [prev.currentTurn]: updatedPlayer,
          };
        }

        return prev;
      });
    },
    [audio]
  );

  // Handle technique execution
  const handleTechniqueExecution = useCallback(
    async (techniqueId: string) => {
      const technique = TECHNIQUES[techniqueId];
      if (!technique) return;

      setCombatState((prev) => {
        const attacker =
          prev.currentTurn === "player1" ? prev.player1 : prev.player2;
        const defender =
          prev.currentTurn === "player1" ? prev.player2 : prev.player1;

        // Check if attacker can afford the technique
        const kiCost = technique.kiCost || 0;
        const staminaCost = technique.staminaCost || 0;

        if (attacker.ki < kiCost || attacker.stamina < staminaCost) {
          try {
            audio.playSFX("insufficient_resources" as any);
          } catch {
            // Fallback if sound not available
          }
          return prev;
        }

        // Execute attack
        executeAttack(
          attacker,
          defender,
          technique,
          prev.selectedVitalPoint || undefined
        ).then(({ result, newAttackerState, newDefenderState }) => {
          setCombatState((current) => {
            const updatedState = {
              ...current,
              [current.currentTurn]: newAttackerState,
              [current.currentTurn === "player1" ? "player2" : "player1"]:
                newDefenderState,
              combatLog: [...current.combatLog, result],
              currentTurn:
                current.currentTurn === "player1"
                  ? "player2"
                  : ("player1" as "player1" | "player2"),
              timeRemaining: TURN_TIME_LIMIT,
              isTargetingMode: false,
              selectedVitalPoint: null,
            };

            // Check win condition
            const winner = CombatSystem.checkWinCondition([
              newAttackerState,
              newDefenderState,
            ]);
            if (winner) {
              onCombatEnd(winner, result);
              return {
                ...updatedState,
                gamePhase: "finished" as const,
                winner,
              };
            }

            return updatedState;
          });
        });

        return prev;
      });
    },
    [executeAttack, audio, onCombatEnd]
  );

  // Toggle targeting mode
  const toggleTargetingMode = useCallback(() => {
    setCombatState((prev) => ({
      ...prev,
      isTargetingMode: !prev.isTargetingMode,
      selectedVitalPoint: null,
    }));
    try {
      audio.playSFX("targeting_mode" as any);
    } catch {
      // Fallback if sound not available
    }
  }, [audio]);

  // Start combat
  const startCombat = useCallback(() => {
    setCombatState((prev) => ({ ...prev, gamePhase: "combat" }));
    audio.playMusic("combat_theme");
  }, [audio]);

  // Get current player data
  const currentPlayer =
    combatState.currentTurn === "player1"
      ? combatState.player1
      : combatState.player2;
  const opponent =
    combatState.currentTurn === "player1"
      ? combatState.player2
      : combatState.player1;
  const availableTechniques = getTechniquesByStance(currentPlayer.stance);
  const stancePhilosophy = getPhilosophyForStance(currentPlayer.stance);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (combatState.gamePhase !== "combat") return;

      const key = event.key;

      // Stance changes (1-8)
      if (key >= "1" && key <= "8") {
        const stanceIndex = parseInt(key) - 1;
        const stances: TrigramStance[] = [
          "geon",
          "tae",
          "li",
          "jin",
          "son",
          "gam",
          "gan",
          "gon",
        ];
        handleStanceChange(stances[stanceIndex]);
      }

      // Combat actions
      switch (key) {
        case " ": // Space - Execute primary technique
          if (availableTechniques.length > 0) {
            handleTechniqueExecution(availableTechniques[0].id);
          }
          break;
        case "Control":
          toggleTargetingMode();
          break;
        case "Escape":
          onReturnToMenu();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    combatState.gamePhase,
    availableTechniques,
    handleStanceChange,
    handleTechniqueExecution,
    toggleTargetingMode,
    onReturnToMenu,
  ]);

  return (
    <Container>
      {/* Dojang Background */}
      <Graphics
        draw={useCallback((g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.BLACK);
          g.drawRect(0, 0, COMBAT_ARENA_WIDTH, COMBAT_ARENA_HEIGHT);
          g.endFill();

          // Traditional Korean patterns
          g.lineStyle(2, KOREAN_COLORS.GOLD, 0.3);
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const x = COMBAT_ARENA_WIDTH / 2 + Math.cos(angle) * 200;
            const y = COMBAT_ARENA_HEIGHT / 2 + Math.sin(angle) * 200;
            g.drawCircle(x, y, 30);
          }
        }, [])}
      />

      {/* Player 1 Visual */}
      <Container
        x={combatState.player1.position.x}
        y={combatState.player1.position.y}
      >
        <Graphics
          draw={useCallback(
            (g) => {
              g.clear();
              const stanceColor =
                KOREAN_COLORS[combatState.player1.stance] ||
                KOREAN_COLORS.WHITE;
              g.beginFill(stanceColor);
              g.drawCircle(0, 0, 30);
              g.endFill();
            },
            [combatState.player1.stance]
          )}
        />
        <Text
          text={`P1: ${combatState.player1.archetype}`}
          style={{ fontSize: 14, fill: KOREAN_COLORS.WHITE }}
          anchor={0.5}
          y={-50}
        />
      </Container>

      {/* Player 2 Visual */}
      <Container
        x={combatState.player2.position.x}
        y={combatState.player2.position.y}
      >
        <Graphics
          draw={useCallback(
            (g) => {
              g.clear();
              const stanceColor =
                KOREAN_COLORS[combatState.player2.stance] ||
                KOREAN_COLORS.WHITE;
              g.beginFill(stanceColor);
              g.drawCircle(0, 0, 30);
              g.endFill();
            },
            [combatState.player2.stance]
          )}
        />
        <Text
          text={`P2: ${combatState.player2.archetype}`}
          style={{ fontSize: 14, fill: KOREAN_COLORS.WHITE }}
          anchor={0.5}
          y={-50}
        />
      </Container>

      {/* UI Overlay */}
      <Container>
        {/* Health/Ki Bars using ProgressBar component */}
        <Container x={20} y={20}>
          <Text
            text="Player 1"
            style={{ fontSize: 16, fill: KOREAN_COLORS.WHITE }}
          />
          <Container y={25}>
            <ProgressBar
              current={combatState.player1.health}
              max={combatState.player1.maxHealth}
              width={200}
              height={20}
              color={KOREAN_COLORS.RED}
              label="Health"
            />
            <Container y={30}>
              <ProgressBar
                current={combatState.player1.ki}
                max={combatState.player1.maxKi}
                width={200}
                height={15}
                color={KOREAN_COLORS.BLUE}
                label="Ki"
              />
            </Container>
            <Container y={50}>
              <ProgressBar
                current={combatState.player1.stamina}
                max={combatState.player1.maxStamina}
                width={200}
                height={15}
                color={KOREAN_COLORS.GREEN}
                label="Stamina"
              />
            </Container>
          </Container>
        </Container>

        {/* Player 2 Stats */}
        <Container x={COMBAT_ARENA_WIDTH - 220} y={20}>
          <Text
            text="Player 2"
            style={{ fontSize: 16, fill: KOREAN_COLORS.WHITE }}
          />
          <Container y={25}>
            <ProgressBar
              current={combatState.player2.health}
              max={combatState.player2.maxHealth}
              width={200}
              height={20}
              color={KOREAN_COLORS.RED}
              label="Health"
            />
            <Container y={30}>
              <ProgressBar
                current={combatState.player2.ki}
                max={combatState.player2.maxKi}
                width={200}
                height={15}
                color={KOREAN_COLORS.BLUE}
                label="Ki"
              />
            </Container>
            <Container y={50}>
              <ProgressBar
                current={combatState.player2.stamina}
                max={combatState.player2.maxStamina}
                width={200}
                height={15}
                color={KOREAN_COLORS.GREEN}
                label="Stamina"
              />
            </Container>
          </Container>
        </Container>

        {/* Current Turn Indicator */}
        <Container x={COMBAT_ARENA_WIDTH / 2} y={20}>
          <Text
            text={`${
              combatState.currentTurn === "player1" ? "Player 1" : "Player 2"
            } Turn`}
            style={{ fontSize: 18, fill: KOREAN_COLORS.GOLD }}
            anchor={0.5}
          />
          <Text
            text={`${Math.ceil(combatState.timeRemaining / 1000)}s`}
            style={{ fontSize: 16, fill: KOREAN_COLORS.WHITE }}
            anchor={0.5}
            y={30}
          />
        </Container>

        {/* Current Stance Display */}
        <Container x={COMBAT_ARENA_WIDTH / 2} y={100}>
          <Text
            text={TRIGRAM_DATA[currentPlayer.stance].name.english}
            style={{ fontSize: 24, fill: KOREAN_COLORS[currentPlayer.stance] }}
            anchor={0.5}
          />
          <Text
            text={TRIGRAM_DATA[currentPlayer.stance].symbol}
            style={{ fontSize: 36, fill: KOREAN_COLORS[currentPlayer.stance] }}
            anchor={0.5}
            y={40}
          />
        </Container>

        {/* Technique Panel */}
        <Container x={20} y={COMBAT_ARENA_HEIGHT - 150}>
          <Text
            text="Available Techniques"
            style={{ fontSize: 16, fill: KOREAN_COLORS.WHITE }}
          />
          {availableTechniques.slice(0, 3).map((technique, index) => (
            <Container key={technique.id} y={25 + index * 30}>
              <Graphics
                draw={useCallback((g) => {
                  g.clear();
                  g.beginFill(KOREAN_COLORS.BLUE, 0.3);
                  g.drawRect(0, 0, 300, 25);
                  g.endFill();
                  g.lineStyle(1, KOREAN_COLORS.WHITE);
                  g.drawRect(0, 0, 300, 25);
                }, [])}
                eventMode="static"
                onpointertap={() => handleTechniqueExecution(technique.id)}
              />
              <Text
                text={`${technique.koreanName} - ${technique.englishName}`}
                style={{ fontSize: 12, fill: KOREAN_COLORS.WHITE }}
                x={10}
                y={5}
              />
            </Container>
          ))}
        </Container>

        {/* Stance Selection using TrigramWheel */}
        <TrigramWheel
          currentStance={currentPlayer.stance}
          onStanceSelect={handleStanceChange}
          size={120}
          x={COMBAT_ARENA_WIDTH - 100}
          y={COMBAT_ARENA_HEIGHT - 100}
        />

        {/* Philosophy Display */}
        <Container x={20} y={COMBAT_ARENA_HEIGHT - 250}>
          <Text
            text={stancePhilosophy.description.english}
            style={{ fontSize: 14, fill: KOREAN_COLORS.GOLD }}
          />
          <Text
            text={stancePhilosophy.modernInterpretation}
            style={{ fontSize: 12, fill: KOREAN_COLORS.WHITE }}
            y={20}
          />
        </Container>

        {/* Preparation Phase */}
        {combatState.gamePhase === "preparation" && (
          <Container x={COMBAT_ARENA_WIDTH / 2} y={COMBAT_ARENA_HEIGHT / 2}>
            <Graphics
              draw={useCallback((g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.BLACK, 0.8);
                g.drawRect(-200, -100, 400, 200);
                g.endFill();
                g.lineStyle(2, KOREAN_COLORS.GOLD);
                g.drawRect(-200, -100, 400, 200);
              }, [])}
            />
            <Text
              text="Black Trigram Combat"
              style={{ fontSize: 24, fill: KOREAN_COLORS.GOLD }}
              anchor={0.5}
              y={-50}
            />
            <Graphics
              y={20}
              draw={useCallback((g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.BLUE);
                g.drawRect(-100, 0, 200, 40);
                g.endFill();
              }, [])}
              eventMode="static"
              onpointertap={startCombat}
            />
            <Text
              text="Start Combat"
              style={{ fontSize: 16, fill: KOREAN_COLORS.WHITE }}
              anchor={0.5}
              y={40}
            />
          </Container>
        )}

        {/* Combat End */}
        {combatState.gamePhase === "finished" && combatState.winner && (
          <Container x={COMBAT_ARENA_WIDTH / 2} y={COMBAT_ARENA_HEIGHT / 2}>
            <Graphics
              draw={useCallback((g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.BLACK, 0.9);
                g.drawRect(-250, -150, 500, 300);
                g.endFill();
                g.lineStyle(3, KOREAN_COLORS.GOLD);
                g.drawRect(-250, -150, 500, 300);
              }, [])}
            />
            <Text
              text="Combat Decided!"
              style={{ fontSize: 28, fill: KOREAN_COLORS.GOLD }}
              anchor={0.5}
              y={-100}
            />
            <Text
              text={`Winner: ${combatState.winner}`}
              style={{ fontSize: 20, fill: KOREAN_COLORS.WHITE }}
              anchor={0.5}
              y={-50}
            />
            <Graphics
              y={50}
              draw={useCallback((g) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.BLUE);
                g.drawRect(-80, 0, 160, 40);
                g.endFill();
              }, [])}
              eventMode="static"
              onpointertap={onReturnToMenu}
            />
            <Text
              text="Return to Menu"
              style={{ fontSize: 16, fill: KOREAN_COLORS.WHITE }}
              anchor={0.5}
              y={70}
            />
          </Container>
        )}
      </Container>
    </Container>
  );
}
