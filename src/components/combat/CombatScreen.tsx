import React, { useState, useCallback, useMemo } from "react";
import type { CombatScreenProps } from "../../types/combat"; // Fix: Import from combat types
import type { PlayerState } from "../../types/player";
import type { Position } from "../../types/common";
import type { HitEffect } from "../../types/effects";
import { CombatArena } from "./components/CombatArena";
import { CombatControls } from "./components/CombatControls";
import { CombatHUD } from "./components/CombatHUD";
import { HitEffectsLayer } from "../ui/HitEffectsLayer";
import { DojangBackground } from "../game/DojangBackground";
import { CombatStats, PlayerStatusPanel } from "./components/";
import { KOREAN_COLORS } from "../../types/constants";

export const CombatScreen: React.FC<CombatScreenProps> = ({
  players,
  onPlayerUpdate,
  currentRound,
  timeRemaining,
  isPaused,
  onReturnToMenu,
  onGameEnd,
  width = 1200,
  height = 800,
  x = 0,
  y = 0,
}) => {
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [isExecutingTechnique, setIsExecutingTechnique] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  // Fix: Remove unused setCombatLog since it's never used
  const [combatLog] = useState<string[]>([]);

  const createHitEffect = useCallback(
    (
      id: string,
      type: "hit" | "critical" | "block" | "miss",
      position: Position,
      intensity: number
    ): HitEffect => ({
      id,
      type: type as any,
      attackerId: "player1",
      defenderId: "player2",
      timestamp: Date.now(),
      duration: 1000,
      position,
      intensity,
      startTime: Date.now(),
      // Fix: Remove readonly text assignment - handle in effects layer
    }),
    []
  );

  const handleAttack = useCallback(() => {
    // Create hit effect when attacking
    const effect = createHitEffect(
      `attack_${Date.now()}`,
      "hit",
      { x: 400, y: 300 },
      1.0
    );
    setHitEffects((prev) => [...prev, effect]);
  }, [createHitEffect]);

  const handleDefend = useCallback(() => {
    console.log("Defending");
  }, []);

  const handleTechniqueExecute = useCallback((technique: any) => {
    setIsExecutingTechnique(true);
    console.log("Executing technique:", technique.name);
    setTimeout(() => setIsExecutingTechnique(false), 500);
  }, []);

  const handleStanceSwitch = useCallback(
    (stance: any) => {
      setIsExecutingTechnique(true);
      console.log("Switching to stance:", stance);
      // Update player stance via onPlayerUpdate
      onPlayerUpdate(0, { currentStance: stance });
    },
    [onPlayerUpdate]
  );

  const handleGuard = useCallback(() => {
    console.log("Guarding");
  }, []);

  const handlePauseToggle = useCallback(() => {
    setIsExecutingTechnique(true);
    setTimeout(() => setIsExecutingTechnique(false), 800);
  }, []);

  const handleEffectComplete = useCallback((effectId: string) => {
    setHitEffects((prev) => prev.filter((effect) => effect.id !== effectId));
  }, []);

  // Fix: Safe type conversion with proper validation
  const validatedPlayers = useMemo(() => {
    if (players.length < 2) {
      console.warn("CombatScreen: Not enough players provided");
      // Create dummy second player if needed
      const dummyPlayer: PlayerState = {
        ...players[0],
        id: "dummy_player",
        name: { korean: "더미", english: "Dummy" },
      };
      return [players[0], dummyPlayer] as const;
    }
    return [players[0], players[1]] as const;
  }, [players]);

  const addHitEffect = useCallback(
    (type: "hit" | "critical" | "block" | "miss", position: Position) => {
      const effect = createHitEffect(
        `effect_${Date.now()}`,
        type,
        position,
        1.0
      );
      setHitEffects((prev) => [...prev, effect]);
    },
    [createHitEffect]
  );

  // Fix: Handle game end logic
  const handleGameEndLogic = useCallback(() => {
    if (validatedPlayers[0].health <= 0) {
      onGameEnd(1); // Player 2 wins
    } else if (validatedPlayers[1].health <= 0) {
      onGameEnd(0); // Player 1 wins
    }
  }, [validatedPlayers, onGameEnd]);

  // Check for game end conditions
  React.useEffect(() => {
    handleGameEndLogic();
  }, [handleGameEndLogic]);

  return (
    <pixiContainer x={x} y={y} data-testid="combat-screen">
      {/* Enhanced Background with Korean Pattern */}
      <DojangBackground
        width={width}
        height={height}
        lighting="cyberpunk"
        animate={true}
      />

      {/* Korean Traditional Pattern Overlay */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.lineStyle(1, KOREAN_COLORS.ACCENT_GOLD, 0.1);
          // Draw traditional Korean taegeuk pattern subtly
          for (let i = 0; i < width; i += 150) {
            for (let j = 0; j < height; j += 150) {
              g.drawCircle(i + 75, j + 75, 40);
              g.moveTo(i + 35, j + 75);
              g.arc(i + 75, j + 75, 40, Math.PI, 0);
              g.arc(i + 75, j + 55, 20, 0, Math.PI, true);
              g.arc(i + 75, j + 95, 20, Math.PI, 0, true);
            }
          }
        }}
      />

      {/* Main Combat Arena */}
      <CombatArena
        players={validatedPlayers}
        width={width}
        height={height * 0.75}
        y={height * 0.15}
        onPlayerClick={(playerIndex) => {
          setSelectedPlayer(playerIndex);
          addHitEffect("hit", { x: 100 + playerIndex * 200, y: 200 });
        }}
      />

      {/* Enhanced Top HUD with Complete Player Info */}
      <CombatHUD
        player1={validatedPlayers[0]}
        player2={validatedPlayers[1]}
        currentRound={currentRound}
        timeRemaining={timeRemaining}
        maxRounds={3}
        isPaused={isPaused}
        width={width}
        height={120}
        y={0}
      />

      {/* Left Player Status Panel - Comprehensive Data */}
      <PlayerStatusPanel
        player={validatedPlayers[0]}
        position="left"
        x={20}
        y={height * 0.2}
        width={180}
        height={300}
        isSelected={selectedPlayer === 0}
      />

      {/* Right Player Status Panel - Comprehensive Data */}
      <PlayerStatusPanel
        player={validatedPlayers[1]}
        position="right"
        x={width - 200}
        y={height * 0.2}
        width={180}
        height={300}
        isSelected={selectedPlayer === 1}
      />

      {/* Combat Statistics Panel */}
      <CombatStats
        players={validatedPlayers}
        combatLog={combatLog}
        x={width / 2 - 150}
        y={height - 180}
        width={300}
        height={160}
      />

      {/* Enhanced Combat Controls */}
      <CombatControls
        onAttack={handleAttack}
        onDefend={handleDefend}
        onSwitchStance={handleStanceSwitch}
        onPauseToggle={handlePauseToggle}
        isPaused={isPaused}
        player={validatedPlayers[0]}
        onTechniqueExecute={handleTechniqueExecute}
        onGuard={handleGuard}
        isExecutingTechnique={isExecutingTechnique}
        width={400}
        height={120}
        x={20}
        y={height - 140}
      />

      {/* Hit Effects Layer */}
      <HitEffectsLayer
        effects={hitEffects}
        onEffectComplete={handleEffectComplete}
      />

      {/* Enhanced Return Menu Button */}
      <pixiContainer x={width - 150} y={20}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.UI_BACKGROUND_MEDIUM, 0.9);
            g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 0.8);
            g.drawRoundedRect(0, 0, 120, 45, 8);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onReturnToMenu}
        />
        <pixiText
          text="메뉴로"
          style={{
            fontSize: 14,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            align: "center",
            fontWeight: "bold",
          }}
          x={60}
          y={15}
          anchor={0.5}
        />
        <pixiText
          text="Return"
          style={{
            fontSize: 10,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "center",
          }}
          x={60}
          y={30}
          anchor={0.5}
        />
      </pixiContainer>

      {/* Pause Overlay */}
      {isPaused && (
        <pixiContainer x={0} y={0}>
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
              g.drawRect(0, 0, width, height);
              g.endFill();
            }}
          />
          <pixiText
            text="일시 정지"
            style={{
              fontSize: 48,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
              align: "center",
            }}
            x={width / 2}
            y={height / 2 - 30}
            anchor={0.5}
          />
          <pixiText
            text="PAUSED"
            style={{
              fontSize: 24,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              align: "center",
            }}
            x={width / 2}
            y={height / 2 + 20}
            anchor={0.5}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
};

export default CombatScreen;
