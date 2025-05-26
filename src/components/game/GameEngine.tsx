import { useTick } from "@pixi/react";
import { useState, useCallback } from "react";
import type { JSX } from "react";
import { PlayerContainer } from "./Player";
import { DojoBackground } from "./DojoBackground";
import { HitEffectsLayer, HitEffect } from "./HitEffectsLayer";
import { GameUI } from "./GameUI";

// Centralized game constants
const GAME_CONFIG = {
  ARENA_WIDTH: 800,
  ARENA_HEIGHT: 600,
  HEALTH_MAX: 100,
  ROUND_TIME: 90,
  HIT_RANGE: 100,
  EFFECT_LIFETIME: 120,
} as const;

interface GameState {
  readonly player1Health: number;
  readonly player2Health: number;
  readonly roundTime: number;
  readonly round: number;
  readonly winner: string | null;
  readonly isPaused: boolean;
  readonly matchStarted: boolean;
  readonly gamePhase: "preparation" | "combat" | "victory";
}

interface PlayerPosition {
  readonly x: number;
  readonly y: number;
}

interface AttackParams {
  readonly attacker: "player1" | "player2";
  readonly technique: string;
  readonly damage: number;
  readonly position: PlayerPosition;
}

// Combat system with Korean martial arts mechanics
class CombatSystem {
  private static readonly TECHNIQUE_DAMAGES: Readonly<Record<string, number>> =
    {
      천둥벽력: 28, // Heaven - Thunder Strike
      유수연타: 18, // Lake - Flowing Combo
      화염지창: 35, // Fire - Flame Spear
      벽력일섬: 40, // Thunder - Lightning Flash
      선풍연격: 15, // Wind - Whirlwind
      수류반격: 25, // Water - Counter Strike
      반석방어: 12, // Mountain - Defense
      대지포옹: 30, // Earth - Grappling
    } as const;

  private static readonly TECHNIQUE_TRANSLATIONS: Readonly<
    Record<string, string>
  > = {
    천둥벽력: "천둥벽력 (Thunder Strike)",
    유수연타: "유수연타 (Flowing Combo)",
    화염지창: "화염지창 (Flame Spear)",
    벽력일섬: "벽력일섬 (Lightning Flash)",
    선풍연격: "선풍연격 (Whirlwind Strike)",
    수류반격: "수류반격 (Water Counter)",
    반석방어: "반석방어 (Mountain Defense)",
    대지포옹: "대지포옹 (Earth Grapple)",
  } as const;

  static calculateDamage(
    technique: string,
    distance: number,
    maxRange: number
  ): number {
    const baseDamage = this.TECHNIQUE_DAMAGES[technique] ?? 15;
    const precisionMultiplier = Math.max(0.5, 1.2 - distance / maxRange);
    const variance = 0.8 + Math.random() * 0.4;

    return Math.floor(baseDamage * precisionMultiplier * variance);
  }

  static getKoreanTechniqueName(technique: string): string {
    return this.TECHNIQUE_TRANSLATIONS[technique] ?? technique;
  }

  static calculateDistance(pos1: PlayerPosition, pos2: PlayerPosition): number {
    return Math.sqrt(
      Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
    );
  }

  static isWithinHitRange(distance: number): boolean {
    return distance <= GAME_CONFIG.HIT_RANGE;
  }
}

// Game state management with immutable updates
class GameStateManager {
  static createInitialState(): GameState {
    return {
      player1Health: GAME_CONFIG.HEALTH_MAX,
      player2Health: GAME_CONFIG.HEALTH_MAX,
      roundTime: GAME_CONFIG.ROUND_TIME,
      round: 1,
      winner: null,
      isPaused: false,
      matchStarted: false,
      gamePhase: "preparation",
    };
  }

  static updateHealth(
    state: GameState,
    player: "player1" | "player2",
    damage: number
  ): GameState {
    const healthKey = player === "player1" ? "player1Health" : "player2Health";
    const newHealth = Math.max(0, state[healthKey] - damage);

    return {
      ...state,
      [healthKey]: newHealth,
    };
  }

  static updateTimer(state: GameState, deltaTime: number): GameState {
    if (state.gamePhase !== "combat" || state.isPaused || state.winner) {
      return state;
    }

    const newTime = Math.max(0, state.roundTime - deltaTime / 60);

    if (newTime <= 0) {
      return {
        ...state,
        roundTime: 0,
        winner: "Time Out",
        gamePhase: "victory",
      };
    }

    return { ...state, roundTime: newTime };
  }

  static checkWinCondition(state: GameState): GameState {
    if (state.winner || state.gamePhase === "victory") {
      return state;
    }

    let winner: string | null = null;

    if (state.player1Health <= 0) {
      winner =
        "Player 2 승리! 완벽한 급소 공격! (Perfect Vital Strike Victory!)";
    } else if (state.player2Health <= 0) {
      winner = "Player 1 승리! 무술의 달인! (Martial Arts Master Victory!)";
    }

    if (winner) {
      return {
        ...state,
        winner,
        gamePhase: "victory",
      };
    }

    return state;
  }

  static startMatch(state: GameState): GameState {
    return {
      ...state,
      matchStarted: true,
      isPaused: false,
      gamePhase: "combat",
    };
  }

  static resetMatch(): GameState {
    return this.createInitialState();
  }
}

export function GameEngine(): JSX.Element {
  const [gameState, setGameState] = useState<GameState>(
    GameStateManager.createInitialState()
  );
  const [player1Pos, setPlayer1Pos] = useState<PlayerPosition>({
    x: 200,
    y: 400,
  });
  const [player2Pos, setPlayer2Pos] = useState<PlayerPosition>({
    x: 600,
    y: 400,
  });
  const [combatLog, setCombatLog] = useState<readonly string[]>([]);
  const [hitEffects, setHitEffects] = useState<readonly HitEffect[]>([]);
  const [gameTime, setGameTime] = useState<number>(0);

  useTick(
    useCallback((ticker: { deltaTime: number }) => {
      const delta = ticker.deltaTime;
      setGameTime((prev) => prev + delta);

      setGameState((prev) => GameStateManager.updateTimer(prev, delta));
      setHitEffects((prev) =>
        prev
          .map((effect) => ({ ...effect, life: effect.life - delta }))
          .filter((effect) => effect.life > 0)
      );
      setGameState((prev) => GameStateManager.checkWinCondition(prev));
    }, [])
  );

  const startMatch = useCallback(() => {
    setGameState(GameStateManager.startMatch);
    setCombatLog([
      "경기 시작! (Match Start!)",
      "팔괘 무술로 싸우십시오 (Fight with Eight Trigram techniques)",
      "급소를 노려라! (Target vital points!)",
    ]);
  }, []);

  const handleAttack = useCallback(
    (params: AttackParams) => {
      const { attacker, technique, position } = params;
      const defenderPos = attacker === "player1" ? player2Pos : player1Pos;

      const distance = CombatSystem.calculateDistance(position, defenderPos);

      if (CombatSystem.isWithinHitRange(distance)) {
        const actualDamage = CombatSystem.calculateDamage(
          technique,
          distance,
          GAME_CONFIG.HIT_RANGE
        );

        const hitEffect: HitEffect = {
          id: `hit_${Date.now()}_${Math.random()}`,
          x: defenderPos.x,
          y: defenderPos.y - 50,
          damage: actualDamage,
          technique,
          life: GAME_CONFIG.EFFECT_LIFETIME,
          maxLife: GAME_CONFIG.EFFECT_LIFETIME,
        };

        setHitEffects((prev) => [...prev, hitEffect]);
        setGameState((prev) =>
          GameStateManager.updateHealth(
            prev,
            attacker === "player1" ? "player2" : "player1",
            actualDamage
          )
        );
        const logMessage = `${CombatSystem.getKoreanTechniqueName(
          technique
        )} 명중! ${actualDamage} 급소타격 피해`;
        setCombatLog((prev) => [logMessage, ...prev].slice(0, 8));
      }
    },
    [player1Pos, player2Pos]
  );

  const resetMatch = useCallback(() => {
    setGameState(GameStateManager.resetMatch());
    setPlayer1Pos({ x: 200, y: 400 });
    setPlayer2Pos({ x: 600, y: 400 });
    setCombatLog([]);
    setHitEffects([]);
  }, []);

  return (
    <pixiContainer>
      <DojoBackground gameTime={gameTime} />
      <PlayerContainer
        x={player1Pos.x}
        y={player1Pos.y}
        isPlayerOne={true}
        onAttack={(technique, damage, position) =>
          handleAttack({ attacker: "player1", technique, damage, position })
        }
        onMove={setPlayer1Pos}
        opponentPosition={player2Pos}
        gameStarted={gameState.matchStarted}
      />
      <PlayerContainer
        x={player2Pos.x}
        y={player2Pos.y}
        isPlayerOne={false}
        onAttack={(technique, damage, position) =>
          handleAttack({ attacker: "player2", technique, damage, position })
        }
        onMove={setPlayer2Pos}
        opponentPosition={player1Pos}
        gameStarted={gameState.matchStarted}
      />
      <HitEffectsLayer hitEffects={hitEffects} />
      <GameUI
        gameState={gameState}
        gameTime={gameTime}
        combatLog={combatLog}
        onStartMatch={startMatch}
        onResetMatch={resetMatch}
      />
    </pixiContainer>
  );
}
