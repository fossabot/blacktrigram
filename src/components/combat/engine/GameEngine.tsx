// Combat-focused game engine moved from game package

import React, { useCallback, useEffect, useReducer, useMemo } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { KOREAN_COLORS } from "../../../types/constants";
import { TrigramStance, DamageType } from "../../../types/enums";
import type { PlayerState } from "../../../types/player";
import type { KoreanTechnique } from "../../../types/combat";
import type { Position, Direction } from "../../../types/movement";

extend({ Container, Graphics, Text });

export interface GameEngineProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly onPlayerUpdate: (
    playerId: string,
    updates: Partial<PlayerState>
  ) => void;
  readonly onCombatEnd?: (winnerId: string) => void;
  readonly width: number;
  readonly height: number;
  readonly gridSize?: number;
  readonly turnDuration?: number;
}

interface GameState {
  readonly activePlayer: string;
  readonly turnPhase: "movement" | "action" | "resolution";
  readonly remainingActions: number;
  readonly grid: readonly (readonly (string | null)[])[];
  readonly combatLog: readonly string[];
  readonly turnNumber: number;
  readonly lastAction: string | null;
}

interface GameAction {
  readonly type:
    | "MOVE_PLAYER"
    | "EXECUTE_TECHNIQUE"
    | "SWITCH_STANCE"
    | "NEXT_TURN"
    | "END_COMBAT"
    | "LOG_ACTION";
  readonly payload?: any;
}

const GRID_SIZE = 10;
const OCTAGONAL_GRID_BOUNDS = 4; // Distance from center for octagonal shape

function createOctagonalGrid(): (string | null)[][] {
  const grid: (string | null)[][] = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));

  const center = Math.floor(GRID_SIZE / 2);

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const distFromCenter = Math.max(
        Math.abs(row - center),
        Math.abs(col - center)
      );

      // Create octagonal arena by limiting corner spaces
      if (distFromCenter <= OCTAGONAL_GRID_BOUNDS) {
        grid[row][col] = "empty";
      }
    }
  }

  return grid;
}

function isValidPosition(
  pos: Position,
  grid: readonly (readonly (string | null)[])[]
): boolean {
  return (
    pos.row >= 0 &&
    pos.row < GRID_SIZE &&
    pos.col >= 0 &&
    pos.col < GRID_SIZE &&
    grid[pos.row][pos.col] !== null
  );
}

function calculateNewPosition(
  currentPos: Position,
  direction: Direction
): Position {
  switch (direction) {
    case "north":
      return { ...currentPos, row: currentPos.row - 1 };
    case "south":
      return { ...currentPos, row: currentPos.row + 1 };
    case "east":
      return { ...currentPos, col: currentPos.col + 1 };
    case "west":
      return { ...currentPos, col: currentPos.col - 1 };
    case "northeast":
      return { row: currentPos.row - 1, col: currentPos.col + 1 };
    case "northwest":
      return { row: currentPos.row - 1, col: currentPos.col - 1 };
    case "southeast":
      return { row: currentPos.row + 1, col: currentPos.col + 1 };
    case "southwest":
      return { row: currentPos.row + 1, col: currentPos.col - 1 };
    default:
      return currentPos;
  }
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "MOVE_PLAYER":
      return {
        ...state,
        remainingActions: Math.max(0, state.remainingActions - 1),
        combatLog: [
          ...state.combatLog,
          `${action.payload.playerName} 이동: ${action.payload.direction}`,
        ],
      };

    case "EXECUTE_TECHNIQUE":
      return {
        ...state,
        turnPhase: "resolution",
        remainingActions: 0,
        combatLog: [
          ...state.combatLog,
          `${action.payload.attacker} 기술 실행: ${action.payload.technique}`,
        ],
      };

    case "NEXT_TURN":
      return {
        ...state,
        activePlayer: action.payload.nextPlayer,
        turnPhase: "movement",
        remainingActions: 2,
        turnNumber: state.turnNumber + 1,
        combatLog: [
          ...state.combatLog.slice(-15),
          `턴 ${state.turnNumber + 1}: ${action.payload.nextPlayerName} 차례`,
        ],
      };

    case "LOG_ACTION":
      return {
        ...state,
        combatLog: [...state.combatLog.slice(-15), action.payload.message],
      };

    default:
      return state;
  }
}

export const GameEngine: React.FC<GameEngineProps> = ({
  player1,
  player2,
  onPlayerUpdate,
  onCombatEnd,
  width,
  height,
  gridSize = 60,
  turnDuration = 30000,
}) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    activePlayer: player1.id,
    turnPhase: "movement",
    remainingActions: 2,
    grid: createOctagonalGrid(),
    combatLog: [`전투 시작! ${player1.name.korean} vs ${player2.name.korean}`],
    turnNumber: 1,
    lastAction: null,
  });

  // Initialize player positions if not set
  useEffect(() => {
    if (!player1.position) {
      onPlayerUpdate(player1.id, { position: { row: 7, col: 2 } });
    }
    if (!player2.position) {
      onPlayerUpdate(player2.id, { position: { row: 7, col: 7 } });
    }
  }, [
    player1.position,
    player2.position,
    onPlayerUpdate,
    player1.id,
    player2.id,
  ]);

  // Check victory conditions
  useEffect(() => {
    const checkVictory = () => {
      const p1Defeated = player1.health <= 0 || player1.consciousness <= 0;
      const p2Defeated = player2.health <= 0 || player2.consciousness <= 0;

      if (p1Defeated && !p2Defeated) {
        dispatch({
          type: "LOG_ACTION",
          payload: { message: `${player2.name.korean} 승리!` },
        });
        onCombatEnd?.(player2.id);
      } else if (p2Defeated && !p1Defeated) {
        dispatch({
          type: "LOG_ACTION",
          payload: { message: `${player1.name.korean} 승리!` },
        });
        onCombatEnd?.(player1.id);
      } else if (p1Defeated && p2Defeated) {
        dispatch({ type: "LOG_ACTION", payload: { message: "무승부!" } });
        onCombatEnd?.("draw");
      }
    };

    checkVictory();
  }, [
    player1.health,
    player1.consciousness,
    player2.health,
    player2.consciousness,
    onCombatEnd,
    player1.name.korean,
    player2.name.korean,
  ]);

  // Handle player movement
  const handlePlayerMovement = useCallback(
    (playerId: string, direction: Direction) => {
      const player = playerId === player1.id ? player1 : player2;
      const currentPos = player.position || { row: 5, col: 5 };
      const newPosition = calculateNewPosition(currentPos, direction);

      if (
        isValidPosition(newPosition, gameState.grid) &&
        gameState.remainingActions > 0
      ) {
        // Check if target position is occupied
        const otherPlayer = playerId === player1.id ? player2 : player1;
        const otherPos = otherPlayer.position;

        if (
          otherPos &&
          otherPos.row === newPosition.row &&
          otherPos.col === newPosition.col
        ) {
          dispatch({
            type: "LOG_ACTION",
            payload: { message: "이동 불가: 상대방이 있습니다!" },
          });
          return;
        }

        // Move player and consume stamina
        onPlayerUpdate(playerId, {
          position: newPosition,
          stamina: Math.max(0, player.stamina - 3),
        });

        dispatch({
          type: "MOVE_PLAYER",
          payload: {
            playerName: player.name.korean,
            direction,
          },
        });
      }
    },
    [
      player1,
      player2,
      gameState.grid,
      gameState.remainingActions,
      onPlayerUpdate,
    ]
  );

  // Execute combat technique
  const executeTechnique = useCallback(
    (technique: KoreanTechnique, attackerId: string, targetId: string) => {
      const attacker = attackerId === player1.id ? player1 : player2;
      const target = targetId === player1.id ? player1 : player2;

      // Check range and ki/stamina costs
      if (
        attacker.ki < technique.kiCost ||
        attacker.stamina < technique.staminaCost
      ) {
        dispatch({
          type: "LOG_ACTION",
          payload: { message: "기력 또는 체력 부족!" },
        });
        return;
      }

      // Calculate damage
      const baseAccuracy = technique.accuracy || 0.8;
      const stanceBonus = 0.1; // Bonus for correct stance
      const finalAccuracy = Math.min(0.95, baseAccuracy + stanceBonus);

      const hitRoll = Math.random();
      const isHit = hitRoll <= finalAccuracy;

      if (isHit) {
        const baseDamage = technique.damage || 15;
        const critRoll = Math.random();
        const isCritical = critRoll <= (technique.critChance || 0.1);
        const finalDamage = isCritical
          ? baseDamage * (technique.critMultiplier || 1.5)
          : baseDamage;

        // Apply damage
        onPlayerUpdate(targetId, {
          health: Math.max(0, target.health - finalDamage),
          consciousness: Math.max(
            0,
            target.consciousness - (isCritical ? 10 : 5)
          ),
        });

        // Consume attacker resources
        onPlayerUpdate(attackerId, {
          ki: Math.max(0, attacker.ki - technique.kiCost),
          stamina: Math.max(0, attacker.stamina - technique.staminaCost),
        });

        const damageText = isCritical
          ? `치명타 ${finalDamage}`
          : `${finalDamage}`;
        dispatch({
          type: "EXECUTE_TECHNIQUE",
          payload: {
            attacker: attacker.name.korean,
            technique: technique.name.korean,
            damage: damageText,
          },
        });
      } else {
        dispatch({
          type: "LOG_ACTION",
          payload: { message: `${attacker.name.korean} 공격 빗나감!` },
        });
      }

      // End turn after technique
      const nextPlayer = attackerId === player1.id ? player2.id : player1.id;
      const nextPlayerName =
        attackerId === player1.id ? player2.name.korean : player1.name.korean;

      setTimeout(() => {
        dispatch({
          type: "NEXT_TURN",
          payload: { nextPlayer, nextPlayerName },
        });
      }, 1000);
    },
    [player1, player2, onPlayerUpdate]
  );

  // Comprehensive keyboard input handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.activePlayer !== player1.id) return; // Only handle input for active human player

      const key = event.key.toLowerCase();

      // Movement controls (WASD and Arrow keys)
      const movementMap: Record<string, Direction> = {
        w: "north",
        arrowup: "north",
        s: "south",
        arrowdown: "south",
        a: "west",
        arrowleft: "west",
        d: "east",
        arrowright: "east",
      };

      if (movementMap[key] && gameState.turnPhase === "movement") {
        event.preventDefault();
        handlePlayerMovement(gameState.activePlayer, movementMap[key]);
        return;
      }

      // Stance changes (1-8 for eight trigrams)
      if (key >= "1" && key <= "8" && gameState.remainingActions > 0) {
        event.preventDefault();
        const stanceIndex = parseInt(key) - 1;
        const stances = Object.values(TrigramStance);
        const newStance = stances[stanceIndex];

        if (newStance) {
          onPlayerUpdate(gameState.activePlayer, { currentStance: newStance });
          dispatch({
            type: "LOG_ACTION",
            payload: { message: `자세 변경: ${newStance}` },
          });
        }
        return;
      }

      // Basic attack (Space)
      if (key === " " && gameState.turnPhase === "action") {
        event.preventDefault();
        const basicAttack: KoreanTechnique = {
          id: "basic_attack",
          name: {
            korean: "기본 공격",
            english: "Basic Attack",
            romanized: "gibon_gonggyeok",
          },
          koreanName: "기본 공격",
          englishName: "Basic Attack",
          romanized: "gibon_gonggyeok",
          description: { korean: "기본적인 공격", english: "Basic attack" },
          stance: player1.currentStance,
          type: "strike" as any,
          damageType: DamageType.BLUNT,
          damage: 15,
          kiCost: 5,
          staminaCost: 8,
          accuracy: 0.85,
          range: 1.0,
          executionTime: 400,
          recoveryTime: 200,
          critChance: 0.1,
          critMultiplier: 1.5,
          effects: [],
        };

        executeTechnique(basicAttack, player1.id, player2.id);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    gameState,
    handlePlayerMovement,
    executeTechnique,
    onPlayerUpdate,
    player1.id,
    player2.id,
    player1.currentStance,
  ]);

  // AI opponent logic for player 2
  useEffect(() => {
    if (
      gameState.activePlayer === player2.id &&
      gameState.turnPhase === "movement"
    ) {
      const aiTimer = setTimeout(() => {
        // Simple AI: move toward player 1 or attack if in range
        const p1Pos = player1.position;
        const p2Pos = player2.position;

        if (p1Pos && p2Pos) {
          const distance =
            Math.abs(p1Pos.row - p2Pos.row) + Math.abs(p1Pos.col - p2Pos.col);

          if (distance <= 1) {
            // In range, attack
            const aiAttack: KoreanTechnique = {
              id: "ai_attack",
              name: {
                korean: "AI 공격",
                english: "AI Attack",
                romanized: "ai_gonggyeok",
              },
              koreanName: "AI 공격",
              englishName: "AI Attack",
              romanized: "ai_gonggyeok",
              description: { korean: "AI의 공격", english: "AI attack" },
              stance: player2.currentStance,
              type: "strike" as any,
              damageType: DamageType.BLUNT,
              damage: 12,
              kiCost: 4,
              staminaCost: 6,
              accuracy: 0.7,
              range: 1.0,
              executionTime: 400,
              recoveryTime: 200,
              critChance: 0.05,
              critMultiplier: 1.3,
              effects: [],
            };

            executeTechnique(aiAttack, player2.id, player1.id);
          } else {
            // Move toward player 1
            let direction: Direction = "north";

            if (p1Pos.row < p2Pos.row) direction = "north";
            else if (p1Pos.row > p2Pos.row) direction = "south";
            else if (p1Pos.col < p2Pos.col) direction = "west";
            else if (p1Pos.col > p2Pos.col) direction = "east";

            handlePlayerMovement(player2.id, direction);

            // Switch to action phase after movement
            setTimeout(() => {
              dispatch({
                type: "NEXT_TURN",
                payload: {
                  nextPlayer: player1.id,
                  nextPlayerName: player1.name.korean,
                },
              });
            }, 500);
          }
        }
      }, 1000); // AI delay for human readability

      return () => clearTimeout(aiTimer);
    }
  }, [
    gameState.activePlayer,
    gameState.turnPhase,
    player1.position,
    player2.position,
    player1.name.korean,
    executeTechnique,
    handlePlayerMovement,
    player1.id,
    player2.id,
    player2.currentStance,
  ]);

  // Grid visualization
  const drawGrid = useCallback(
    (g: any) => {
      g.clear();

      const offsetX = (width - GRID_SIZE * gridSize) / 2;
      const offsetY = (height - GRID_SIZE * gridSize) / 2;

      // Draw grid cells
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          const cellX = offsetX + col * gridSize;
          const cellY = offsetY + row * gridSize;

          if (gameState.grid[row][col] !== null) {
            // Valid cell
            g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM, alpha: 0.3 });
            g.rect(cellX, cellY, gridSize, gridSize);
            g.fill();

            // Cell border
            g.stroke({
              width: 1,
              color: KOREAN_COLORS.ACCENT_GOLD,
              alpha: 0.4,
            });
            g.rect(cellX, cellY, gridSize, gridSize);
            g.stroke();

            // Grid coordinates (for debugging)
            g.fill({ color: KOREAN_COLORS.TEXT_TERTIARY, alpha: 0.5 });
            // Add coordinate text if needed
          }
        }
      }

      // Highlight active player's possible moves
      if (
        gameState.remainingActions > 0 &&
        gameState.turnPhase === "movement"
      ) {
        const activePlayer =
          gameState.activePlayer === player1.id ? player1 : player2;
        const pos = activePlayer.position;

        if (pos) {
          const directions: Direction[] = [
            "north",
            "south",
            "east",
            "west",
            "northeast",
            "northwest",
            "southeast",
            "southwest",
          ];

          directions.forEach((direction) => {
            const newPos = calculateNewPosition(pos, direction);
            if (isValidPosition(newPos, gameState.grid)) {
              const cellX = offsetX + newPos.col * gridSize;
              const cellY = offsetY + newPos.row * gridSize;

              g.fill({ color: KOREAN_COLORS.ACCENT_GREEN, alpha: 0.3 });
              g.rect(cellX + 2, cellY + 2, gridSize - 4, gridSize - 4);
              g.fill();
            }
          });
        }
      }
    },
    [
      width,
      height,
      gridSize,
      gameState.grid,
      gameState.remainingActions,
      gameState.turnPhase,
      gameState.activePlayer,
      player1,
      player2,
    ]
  );

  return (
    <pixiContainer data-testid="game-engine">
      {/* Grid visualization */}
      <pixiGraphics draw={drawGrid} />

      {/* Game state display */}
      <pixiContainer x={20} y={20} data-testid="game-state-display">
        <pixiText
          text={`턴 ${gameState.turnNumber}: ${
            gameState.activePlayer === player1.id
              ? player1.name.korean
              : player2.name.korean
          }`}
          style={{
            fontSize: 16,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
          }}
        />

        <pixiText
          text={`단계: ${
            gameState.turnPhase === "movement"
              ? "이동"
              : gameState.turnPhase === "action"
              ? "행동"
              : "해결"
          }`}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
          }}
          y={20}
        />

        <pixiText
          text={`남은 행동: ${gameState.remainingActions}`}
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
          }}
          y={35}
        />
      </pixiContainer>

      {/* Combat log display */}
      <pixiContainer x={20} y={height - 120} data-testid="combat-log-display">
        <pixiText
          text="전투 기록:"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.ACCENT_CYAN,
            fontWeight: "bold",
          }}
        />

        {gameState.combatLog.slice(-4).map((entry, index) => (
          <pixiText
            key={index}
            text={entry}
            style={{
              fontSize: 10,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
            }}
            y={15 + index * 12}
          />
        ))}
      </pixiContainer>
    </pixiContainer>
  );
};

export default GameEngine;
