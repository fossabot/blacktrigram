import React, {
  useState,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import type { CombatScreenProps } from "../../types/combat";
import type { PlayerState } from "../../types/player";
import type { HitEffect } from "../../types/effects";
import { HitEffectType } from "../../types/effects"; // Fix: Import as value, not type
import type { KoreanTechnique } from "../../types/combat";
import { CombatArena } from "./components/CombatArena";
import { CombatControls } from "./components/CombatControls";
import { CombatHUD } from "./components/CombatHUD";
import { HitEffectsLayer } from "./components/HitEffectsLayer";
import { CombatStats, PlayerStatusPanel } from "./components/";
import { GameEngine } from "./components/GameEngine";
import { DojangBackground } from "./components/DojangBackground";
import {
  ResponsivePixiContainer,
  ResponsivePixiButton,
  ResponsivePixiPanel,
} from "../ui/base/ResponsivePixiComponents";
import { KOREAN_COLORS } from "../../types/constants";
import { TrigramStance } from "../../types/enums";

// Extend PixiJS components for CombatScreen
extend({ Container, Graphics, Text });

interface CombatState {
  readonly phase: "preparation" | "combat" | "victory" | "defeat" | "paused";
  readonly activePlayer: number;
  readonly executingTechnique: boolean;
  readonly selectedTargets: readonly string[];
  readonly combatLog: readonly string[];
  readonly effects: readonly HitEffect[];
}

interface CombatAction {
  readonly type:
    | "START_COMBAT"
    | "EXECUTE_TECHNIQUE"
    | "SWITCH_STANCE"
    | "GUARD"
    | "PAUSE"
    | "RESUME"
    | "END_COMBAT"
    | "ADD_EFFECT"
    | "REMOVE_EFFECT"
    | "LOG_ACTION";
  readonly payload?: any;
}

function combatReducer(state: CombatState, action: CombatAction): CombatState {
  switch (action.type) {
    case "START_COMBAT":
      return {
        ...state,
        phase: "combat",
        combatLog: [...state.combatLog, "전투 시작! - Combat begins!"],
      };

    case "EXECUTE_TECHNIQUE":
      return {
        ...state,
        executingTechnique: true,
        combatLog: [
          ...state.combatLog,
          `${action.payload.technique.name.korean} 실행!`,
        ],
      };

    case "SWITCH_STANCE":
      return {
        ...state,
        combatLog: [...state.combatLog, `자세 변경: ${action.payload.stance}`],
      };

    case "PAUSE":
      return { ...state, phase: "paused" };

    case "RESUME":
      return { ...state, phase: "combat" };

    case "ADD_EFFECT":
      return {
        ...state,
        effects: [...state.effects, action.payload.effect],
      };

    case "REMOVE_EFFECT":
      return {
        ...state,
        effects: state.effects.filter((e) => e.id !== action.payload.effectId),
      };

    case "LOG_ACTION":
      return {
        ...state,
        combatLog: [...state.combatLog.slice(-9), action.payload.message],
      };

    default:
      return state;
  }
}

export const CombatScreen: React.FC<CombatScreenProps> = ({
  players,
  onPlayerUpdate,
  currentRound,
  timeRemaining,
  onReturnToMenu,
  onGameEnd,
  width = 1200,
  height = 800,
  x = 0,
  y = 0,
}) => {
  const validatedPlayers = useMemo(() => {
    if (players.length < 2) {
      console.warn("CombatScreen: Not enough players provided");
      const dummyPlayer: PlayerState = {
        ...players[0],
        id: "dummy_player",
        name: { korean: "더미", english: "Dummy" },
      };
      return [players[0], dummyPlayer] as const;
    }
    return [players[0], players[1]] as const;
  }, [players]);

  const [combatState, dispatchCombat] = useReducer(combatReducer, {
    phase: "preparation",
    activePlayer: 0,
    executingTechnique: false,
    selectedTargets: [],
    combatLog: [],
    effects: [],
  });

  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);

  const executeKoreanTechnique = useCallback(
    (technique: KoreanTechnique, attacker: PlayerState) => {
      dispatchCombat({ type: "EXECUTE_TECHNIQUE", payload: { technique } });

      const baseDamage = technique.damage || 15;
      const critRoll = Math.random();
      const isCritical = critRoll <= (technique.critChance || 0.1);
      const finalDamage = isCritical
        ? baseDamage * (technique.critMultiplier || 1.5)
        : baseDamage;

      const targetIndex = attacker.id === validatedPlayers[0].id ? 1 : 0;
      const newHealth = Math.max(
        0,
        validatedPlayers[targetIndex].health - finalDamage
      );

      onPlayerUpdate(targetIndex, { health: newHealth });

      const effect: HitEffect = {
        id: `hit_${Date.now()}`,
        type: isCritical ? HitEffectType.CRITICAL_HIT : HitEffectType.HIT,
        attackerId: attacker.id,
        defenderId: validatedPlayers[targetIndex].id,
        timestamp: Date.now(),
        duration: 1000,
        position: { x: width * 0.5, y: height * 0.5 },
        intensity: isCritical ? 1.5 : 1.0,
        text: isCritical ? "치명타!" : technique.name.korean,
        startTime: Date.now(),
      };

      dispatchCombat({ type: "ADD_EFFECT", payload: { effect } });

      dispatchCombat({
        type: "LOG_ACTION",
        payload: {
          message: `${attacker.name.korean}가 ${technique.name.korean}으로 ${finalDamage} 피해!`,
        },
      });

      setTimeout(() => {
        dispatchCombat({
          type: "REMOVE_EFFECT",
          payload: { effectId: effect.id },
        });
      }, effect.duration);
    },
    [onPlayerUpdate, validatedPlayers, width, height]
  );

  const handleAttack = useCallback(() => {
    if (combatState.executingTechnique) return;

    const attacker = validatedPlayers[combatState.activePlayer];
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
      stance: attacker.currentStance,
      type: "strike" as any,
      damageType: "blunt" as any,
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

    executeKoreanTechnique(basicAttack, attacker);
  }, [combatState, validatedPlayers, executeKoreanTechnique]);

  const handleDefend = useCallback(() => {
    // Fix: Remove unused variable
    onPlayerUpdate(combatState.activePlayer, { isBlocking: true });

    dispatchCombat({
      type: "LOG_ACTION",
      payload: {
        message: `${
          validatedPlayers[combatState.activePlayer].name.korean
        }가 방어 자세를 취했습니다!`,
      },
    });

    setTimeout(() => {
      onPlayerUpdate(combatState.activePlayer, { isBlocking: false });
    }, 1000);
  }, [combatState, validatedPlayers, onPlayerUpdate]);

  const handleTechniqueExecute = useCallback(
    (technique: KoreanTechnique) => {
      const attacker = validatedPlayers[combatState.activePlayer];
      executeKoreanTechnique(technique, attacker);
    },
    [combatState, validatedPlayers, executeKoreanTechnique]
  );

  const handleStanceSwitch = useCallback(
    (newStance: TrigramStance) => {
      const activePlayer = validatedPlayers[combatState.activePlayer];
      onPlayerUpdate(combatState.activePlayer, { currentStance: newStance });

      dispatchCombat({
        type: "SWITCH_STANCE",
        payload: { stance: newStance },
      });
    },
    [combatState, validatedPlayers, onPlayerUpdate]
  );

  const handlePauseToggle = useCallback(() => {
    if (combatState.phase === "paused") {
      dispatchCombat({ type: "RESUME" });
    } else {
      dispatchCombat({ type: "PAUSE" });
    }
  }, [combatState.phase]);

  const handleEffectComplete = useCallback((effectId: string) => {
    dispatchCombat({ type: "REMOVE_EFFECT", payload: { effectId } });
  }, []);

  const { isMobile } = useMemo(() => {
    const isMobile = width < 768;
    return { isMobile };
  }, [width]);

  useEffect(() => {
    if (combatState.phase === "preparation") {
      const timer = setTimeout(() => {
        dispatchCombat({ type: "START_COMBAT" });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [combatState.phase]);

  useEffect(() => {
    const player1Dead = validatedPlayers[0].health <= 0;
    const player2Dead = validatedPlayers[1].health <= 0;

    if (player1Dead && !player2Dead) {
      dispatchCombat({
        type: "LOG_ACTION",
        payload: { message: `${validatedPlayers[1].name.korean} 승리!` },
      });
      onGameEnd(1);
    } else if (player2Dead && !player1Dead) {
      dispatchCombat({
        type: "LOG_ACTION",
        payload: { message: `${validatedPlayers[0].name.korean} 승리!` },
      });
      onGameEnd(0);
    }
  }, [validatedPlayers, onGameEnd]);

  const handlePlayerClick = useCallback(
    (idx: number) => {
      setSelectedPlayer(idx);
      if (idx !== combatState.activePlayer) {
        handleAttack();
      }
    },
    [combatState.activePlayer, handleAttack]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (combatState.phase === "paused") return;

      const key = event.key;

      // Trigram stance changes (1-8 keys for 8 trigrams)
      if (key >= "1" && key <= "8") {
        const stanceIndex = parseInt(key) - 1;
        const stances = Object.values(TrigramStance);
        if (stances[stanceIndex]) {
          handleStanceSwitch(stances[stanceIndex]);
        }
      }

      // Combat actions
      switch (key) {
        case " ": // Space for attack
          event.preventDefault();
          handleAttack();
          break;
        case "Shift": // Shift for defend
          event.preventDefault();
          handleDefend();
          break;
        case "Escape": // Escape for pause
          event.preventDefault();
          handlePauseToggle();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    combatState.phase,
    handleStanceSwitch,
    handleAttack,
    handleDefend,
    handlePauseToggle,
  ]);

  return (
    <ResponsivePixiContainer x={x} y={y} data-testid="combat-screen">
      {/* Fixed GameEngine with proper props */}
      <GameEngine
        player1={validatedPlayers[0]}
        player2={validatedPlayers[1]}
        onPlayerUpdate={(playerId, updates) => {
          const playerIndex = validatedPlayers.findIndex(
            (p) => p.id === playerId
          );
          if (playerIndex >= 0) {
            onPlayerUpdate(playerIndex, updates);
          }
        }}
        width={width}
        height={height}
      />

      <DojangBackground
        width={width}
        height={height}
        lighting="cyberpunk"
        animate={combatState.phase === "combat"}
      />

      <CombatArena
        players={validatedPlayers}
        width={width}
        height={height * (isMobile ? 0.65 : 0.75)}
        y={height * (isMobile ? 0.2 : 0.15)}
        onPlayerClick={handlePlayerClick}
      />

      <CombatHUD
        player1={validatedPlayers[0]}
        player2={validatedPlayers[1]}
        currentRound={currentRound}
        timeRemaining={timeRemaining}
        maxRounds={3}
        isPaused={combatState.phase === "paused"}
        onPauseToggle={handlePauseToggle}
        width={width}
        height={isMobile ? 80 : 120}
        y={0}
      />

      <ResponsivePixiPanel
        title={validatedPlayers[0].name.korean}
        x={isMobile ? 10 : 20}
        y={height * (isMobile ? 0.15 : 0.2)}
        width={isMobile ? width * 0.4 : 180}
        height={isMobile ? 200 : 300}
        data-testid="player1-status"
      >
        <PlayerStatusPanel
          player={validatedPlayers[0]}
          position="left"
          x={0}
          y={0}
          width={isMobile ? width * 0.4 - 20 : 160}
          height={isMobile ? 180 : 280}
          isSelected={selectedPlayer === 0}
        />
      </ResponsivePixiPanel>

      <ResponsivePixiPanel
        title={validatedPlayers[1].name.korean}
        x={width - (isMobile ? width * 0.4 + 10 : 200)}
        y={height * (isMobile ? 0.15 : 0.2)}
        width={isMobile ? width * 0.4 : 180}
        height={isMobile ? 200 : 300}
        data-testid="player2-status"
      >
        <PlayerStatusPanel
          player={validatedPlayers[1]}
          position="right"
          x={0}
          y={0}
          width={isMobile ? width * 0.4 - 20 : 160}
          height={isMobile ? 180 : 280}
          isSelected={selectedPlayer === 1}
        />
      </ResponsivePixiPanel>

      <ResponsivePixiPanel
        title="전투 기록"
        x={isMobile ? 10 : width / 2 - 150}
        y={height - (isMobile ? 160 : 180)}
        width={isMobile ? width - 20 : 300}
        height={isMobile ? 100 : 160}
        data-testid="combat-log-panel"
      >
        <CombatStats
          players={validatedPlayers}
          combatLog={combatState.combatLog}
          x={0}
          y={0}
          width={isMobile ? width - 40 : 280}
          height={isMobile ? 80 : 140}
        />
      </ResponsivePixiPanel>

      <ResponsivePixiContainer
        x={isMobile ? 10 : 20}
        y={height - (isMobile ? 50 : 140)}
        data-testid="combat-controls-container"
      >
        <CombatControls
          onAttack={handleAttack}
          onDefend={handleDefend}
          onSwitchStance={handleStanceSwitch}
          player={validatedPlayers[combatState.activePlayer]}
          onTechniqueExecute={handleTechniqueExecute}
          isExecutingTechnique={combatState.executingTechnique}
          onPauseToggle={handlePauseToggle}
          isPaused={combatState.phase === "paused"}
          width={isMobile ? width - 20 : 400}
          height={isMobile ? 40 : 120}
          x={0}
          y={0}
        />
      </ResponsivePixiContainer>

      <HitEffectsLayer
        effects={combatState.effects}
        onEffectComplete={handleEffectComplete}
      />

      <ResponsivePixiButton
        text="메뉴로"
        x={width - (isMobile ? 80 : 150)}
        y={isMobile ? 10 : 20}
        width={isMobile ? 70 : 120}
        height={isMobile ? 35 : 45}
        variant="secondary"
        onClick={onReturnToMenu}
        data-testid="return-menu-button"
      />

      {combatState.phase === "paused" && (
        <ResponsivePixiContainer x={0} y={0} data-testid="pause-overlay">
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.8 });
              g.rect(0, 0, width, height);
              g.fill();
            }}
          />
          <pixiText
            text="일시 정지 - PAUSED"
            style={{
              fontSize: isMobile ? 32 : 48,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
              align: "center",
            }}
            x={width / 2}
            y={height / 2}
            anchor={0.5}
          />
          <pixiText
            text="스페이스바를 눌러 계속하기"
            style={{
              fontSize: isMobile ? 14 : 18,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              align: "center",
            }}
            x={width / 2}
            y={height / 2 + 40}
            anchor={0.5}
          />
        </ResponsivePixiContainer>
      )}

      {/* Add visual instruction overlay for Korean controls */}
      <ResponsivePixiContainer
        x={10}
        y={height - 120}
        data-testid="korean-controls-guide"
      >
        <pixiText
          text="조작: 1-8 자세변경, 스페이스 공격, 시프트 방어"
          style={{
            fontSize: isMobile ? 10 : 12,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            fontFamily: "Noto Sans KR",
          }}
        />
        <pixiText
          text="Controls: 1-8 Stance, Space Attack, Shift Defend"
          style={{
            fontSize: isMobile ? 8 : 10,
            fill: KOREAN_COLORS.TEXT_TERTIARY,
          }}
          y={15}
        />
      </ResponsivePixiContainer>
    </ResponsivePixiContainer>
  );
};

export default CombatScreen;
