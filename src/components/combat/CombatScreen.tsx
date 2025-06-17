import React, {
  useState,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import "@pixi/layout";
import type { CombatScreenProps } from "../../types/combat";
import type { PlayerState } from "../../types/player";
import type { HitEffect } from "../../types/effects";
import { HitEffectType } from "../../types/effects";
import type { KoreanTechnique } from "../../types/combat";
import { PlayerArchetype, TrigramStance } from "../../types/enums";
import { CombatArena } from "./components/CombatArena";
import { CombatControls } from "./components/CombatControls";
import { CombatHUD } from "./components/CombatHUD";
import { HitEffectsLayer } from "./components/HitEffectsLayer";
import { CombatStats, PlayerStatusPanel } from "./components/";
import { GameEngine } from "./components/GameEngine";
import { DojangBackground } from "./components/DojangBackground";
import {
  KoreanPanel,
  KoreanButton,
  ResponsiveCombatLayout,
  KOREAN_LAYOUTS,
} from "../ui/base/KoreanLayoutComponents";
import { KOREAN_COLORS } from "../../types/constants";

// Extend PixiJS components for layout support
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
          `${action.payload.technique.name.korean} (${action.payload.technique.name.english}) 실행!`,
        ],
      };
    case "SWITCH_STANCE":
      return {
        ...state,
        combatLog: [
          ...state.combatLog,
          `자세 변경: ${action.payload.stance.korean} (${action.payload.stance.english})`,
        ],
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

  // --- Layout config using @pixi/layout ---
  const { isMobile, isTablet, layoutConfig } = useMemo(() => {
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const layoutConfig = {
      arena: {
        width: width,
        height: height * (isMobile ? 0.6 : 0.7),
        y: height * (isMobile ? 0.15 : 0.1),
      },
      hud: isMobile
        ? KOREAN_LAYOUTS.MOBILE_COMBAT_HUD
        : KOREAN_LAYOUTS.COMBAT_HUD,
      playerPanels: {
        width: isMobile ? width * 0.45 : 180,
        height: isMobile ? 160 : 280,
        spacing: isMobile ? 10 : 20,
      },
      controls: {
        width: isMobile ? width - 20 : 400,
        height: isMobile ? 50 : 100,
        y: height - (isMobile ? 60 : 120),
      },
    };
    return { isMobile, isTablet, layoutConfig };
  }, [width, height]);

  // --- Combat logic (unchanged, but always use both Hangul and English in logs/UI) ---
  const executeKoreanTechnique = useCallback(
    (technique: KoreanTechnique, attacker: PlayerState) => {
      dispatchCombat({ type: "EXECUTE_TECHNIQUE", payload: { technique } });
      const baseDamage = technique.damage || 15;
      const stanceMultiplier = 1.0;
      const archetypeMultiplier = 1.0;
      const critRoll = Math.random();
      const isCritical = critRoll <= (technique.critChance || 0.1);
      const finalDamage = Math.round(
        baseDamage *
          stanceMultiplier *
          archetypeMultiplier *
          (isCritical ? technique.critMultiplier || 1.5 : 1)
      );
      const targetIndex = attacker.id === validatedPlayers[0].id ? 1 : 0;
      const newHealth = Math.max(
        0,
        validatedPlayers[targetIndex].health - finalDamage
      );
      const kiDrain = Math.round(technique.kiCost * (1 + Math.random() * 0.2));
      const staminaDrain = Math.round(
        technique.staminaCost * (1 + Math.random() * 0.2)
      );
      onPlayerUpdate(targetIndex, { health: newHealth });
      onPlayerUpdate(attacker.id === validatedPlayers[0].id ? 0 : 1, {
        ki: Math.max(0, attacker.ki - kiDrain),
        stamina: Math.max(0, attacker.stamina - staminaDrain),
      });
      const effect: HitEffect = {
        id: `hit_${Date.now()}`,
        type: isCritical ? HitEffectType.CRITICAL_HIT : HitEffectType.HIT,
        attackerId: attacker.id,
        defenderId: validatedPlayers[targetIndex].id,
        timestamp: Date.now(),
        duration: isCritical ? 1500 : 1000,
        position: { x: width * 0.5, y: height * 0.5 },
        intensity: isCritical ? 1.5 : 1.0,
        text: isCritical
          ? "치명타! (Critical!)"
          : `${technique.name.korean} (${technique.name.english})`,
        startTime: Date.now(),
      };
      dispatchCombat({ type: "ADD_EFFECT", payload: { effect } });
      const combatMessage = isCritical
        ? `${attacker.name.korean} (${attacker.name.english})가 ${technique.name.korean} (${technique.name.english})으로 치명적인 ${finalDamage} 피해를 입혔습니다!`
        : `${attacker.name.korean} (${attacker.name.english})가 ${technique.name.korean} (${technique.name.english})으로 ${finalDamage} 피해를 입혔습니다.`;
      dispatchCombat({
        type: "LOG_ACTION",
        payload: { message: combatMessage },
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
    onPlayerUpdate(combatState.activePlayer, { isBlocking: true });
    dispatchCombat({
      type: "LOG_ACTION",
      payload: {
        message: `${validatedPlayers[combatState.activePlayer].name.korean} (${
          validatedPlayers[combatState.activePlayer].name.english
        })가 방어 자세 (Defensive Stance)를 취했습니다!`,
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
        payload: {
          stance: {
            korean: newStance,
            english: newStance,
          },
        },
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
        payload: {
          message: `${validatedPlayers[1].name.korean} (${validatedPlayers[1].name.english}) 승리! (Victory!)`,
        },
      });
      onGameEnd(1);
    } else if (player2Dead && !player1Dead) {
      dispatchCombat({
        type: "LOG_ACTION",
        payload: {
          message: `${validatedPlayers[0].name.korean} (${validatedPlayers[0].name.english}) 승리! (Victory!)`,
        },
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
        case " ":
          event.preventDefault();
          handleAttack();
          break;
        case "Shift":
          event.preventDefault();
          handleDefend();
          break;
        case "Escape":
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

  // --- PixiJS UI Layout ---
  return (
    <ResponsiveCombatLayout
      screenWidth={width}
      screenHeight={height}
      data-testid="combat-screen"
      layout={{
        width: width,
        height: height,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
      }}
    >
      {/* Game Engine */}
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

      {/* Dojang Background */}
      <DojangBackground
        width={width}
        height={height}
        lighting="cyberpunk"
        animate={combatState.phase === "combat"}
      />

      {/* Main Layout Row: Arena + Player Panels */}
      <pixiContainer
        layout={{
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        {/* Player 1 Panel */}
        <KoreanPanel
          title={{
            korean: validatedPlayers[0].name.korean,
            english: validatedPlayers[0].name.english,
          }}
          x={layoutConfig.playerPanels.spacing}
          y={height * 0.2}
          width={layoutConfig.playerPanels.width}
          height={layoutConfig.playerPanels.height}
          variant="status"
          responsive={true}
          data-testid="player1-status-panel"
        >
          <PlayerStatusPanel
            player={validatedPlayers[0]}
            position="left"
            width={layoutConfig.playerPanels.width - 20}
            height={layoutConfig.playerPanels.height - 40}
            isSelected={selectedPlayer === 0}
          />
        </KoreanPanel>

        {/* Arena */}
        <pixiContainer
          layout={{
            width: layoutConfig.arena.width * 0.6,
            height: layoutConfig.arena.height,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CombatArena
            players={validatedPlayers}
            width={layoutConfig.arena.width * 0.6}
            height={layoutConfig.arena.height}
            onPlayerClick={handlePlayerClick}
          />
        </pixiContainer>

        {/* Player 2 Panel */}
        <KoreanPanel
          title={{
            korean: validatedPlayers[1].name.korean,
            english: validatedPlayers[1].name.english,
          }}
          x={
            width -
            layoutConfig.playerPanels.width -
            layoutConfig.playerPanels.spacing
          }
          y={height * 0.2}
          width={layoutConfig.playerPanels.width}
          height={layoutConfig.playerPanels.height}
          variant="status"
          responsive={true}
          data-testid="player2-status-panel"
        >
          <PlayerStatusPanel
            player={validatedPlayers[1]}
            position="right"
            width={layoutConfig.playerPanels.width - 20}
            height={layoutConfig.playerPanels.height - 40}
            isSelected={selectedPlayer === 1}
          />
        </KoreanPanel>
      </pixiContainer>

      {/* HUD and Controls Row */}
      <pixiContainer
        layout={{
          width: "100%",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        {/* Combat HUD */}
        <pixiContainer
          layout={layoutConfig.hud}
          data-testid="combat-hud-container"
        >
          <CombatHUD
            player1={validatedPlayers[0]}
            player2={validatedPlayers[1]}
            currentRound={currentRound}
            timeRemaining={timeRemaining}
            maxRounds={3}
            isPaused={combatState.phase === "paused"}
            onPauseToggle={handlePauseToggle}
            width={width}
            height={layoutConfig.hud.height}
          />
        </pixiContainer>

        {/* Combat Controls */}
        <pixiContainer
          layout={{
            ...KOREAN_LAYOUTS.CONTROLS_ROW,
            x: layoutConfig.playerPanels.spacing,
            y: layoutConfig.controls.y,
            width: layoutConfig.controls.width,
            height: layoutConfig.controls.height,
          }}
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
            width={layoutConfig.controls.width}
            height={layoutConfig.controls.height}
          />
        </pixiContainer>
      </pixiContainer>

      {/* Combat Log Panel */}
      <KoreanPanel
        title={{ korean: "전투 기록", english: "Combat Log" }}
        x={isMobile ? 10 : width / 2 - 150}
        y={height - (isMobile ? 140 : 180)}
        width={isMobile ? width - 20 : 300}
        height={isMobile ? 80 : 140}
        variant="combat"
        responsive={true}
        data-testid="combat-log-panel"
      >
        <CombatStats
          players={validatedPlayers}
          combatLog={combatState.combatLog}
          width={isMobile ? width - 40 : 280}
          height={isMobile ? 60 : 120}
        />
      </KoreanPanel>

      {/* Hit Effects Layer */}
      <HitEffectsLayer
        effects={combatState.effects}
        onEffectComplete={handleEffectComplete}
      />

      {/* Return to Menu Button */}
      <KoreanButton
        text={{ korean: "메뉴로", english: "Menu" }}
        onClick={onReturnToMenu}
        x={width - (isMobile ? 80 : 130)}
        y={isMobile ? 10 : 20}
        width={isMobile ? 70 : 100}
        height={isMobile ? 30 : 40}
        variant="secondary"
        data-testid="return-menu-button"
      />

      {/* Pause Overlay */}
      {combatState.phase === "paused" && (
        <pixiContainer
          layout={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
          }}
          data-testid="pause-overlay"
        >
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_DARK, alpha: 0.9 });
              g.rect(0, 0, width, height);
              g.fill();
            }}
          />
          <pixiContainer
            layout={{
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <pixiText
              text="일시 정지 - PAUSED"
              style={{
                fontSize: isMobile ? 24 : 36,
                fill: KOREAN_COLORS.ACCENT_GOLD,
                fontWeight: "bold",
                align: "center",
                fontFamily: "Noto Sans KR",
              }}
              anchor={0.5}
            />
            <pixiText
              text="ESC 키를 눌러 계속하기 - Press ESC to continue"
              style={{
                fontSize: isMobile ? 12 : 16,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
                align: "center",
              }}
              anchor={0.5}
            />
          </pixiContainer>
        </pixiContainer>
      )}

      {/* Controls Guide */}
      <pixiContainer
        layout={{
          position: "absolute",
          bottom: 10,
          left: 10,
          flexDirection: "column",
          gap: 3,
        }}
        data-testid="korean-controls-guide"
      >
        <pixiText
          text="조작법: 1-8 자세, 스페이스 공격, 시프트 방어"
          style={{
            fontSize: isMobile ? 8 : 10,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            fontFamily: "Noto Sans KR",
          }}
        />
        <pixiText
          text="Controls: 1-8 Stance, Space Attack, Shift Defend"
          style={{
            fontSize: isMobile ? 7 : 9,
            fill: KOREAN_COLORS.TEXT_TERTIARY,
          }}
        />
      </pixiContainer>
    </ResponsiveCombatLayout>
  );
};

export default CombatScreen;
