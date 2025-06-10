import React, { useState, useCallback, useMemo } from "react";
import type { CombatScreenProps } from "../../types/components";
import type { PlayerState } from "../../types/player";
import type { Position } from "../../types/common";
import type { HitEffect } from "../../types/effects";
import { CombatArena } from "./components/CombatArena";
import { CombatControls } from "./components/CombatControls";
import { CombatHUD } from "./components/CombatHUD";
import { HitEffectsLayer } from "../ui/HitEffectsLayer";
import { DojangBackground } from "../game/DojangBackground";

export const CombatScreen: React.FC<CombatScreenProps> = ({
  players,
  onPlayerUpdate, // Fix: Use this parameter
  currentRound,
  timeRemaining,
  isPaused,
  onReturnToMenu, // Fix: Use this parameter
  onGameEnd, // Fix: Use this parameter
  width = 1200,
  height = 800,
  x = 0,
  y = 0,
}) => {
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [isExecutingTechnique, setIsExecutingTechnique] = useState(false);

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
      <DojangBackground
        width={width}
        height={height}
        lighting="cyberpunk"
        animate={true}
      />

      <CombatArena
        players={validatedPlayers}
        width={width}
        height={height}
        onPlayerClick={(playerIndex) => {
          // Fix: Use parameter
          console.log(`Player ${playerIndex} clicked`);
          addHitEffect("hit", { x: 100 + playerIndex * 200, y: 200 });
        }}
      />

      <CombatHUD
        player1={validatedPlayers[0]}
        player2={validatedPlayers[1]}
        currentRound={currentRound}
        timeRemaining={timeRemaining}
        maxRounds={3}
        isPaused={isPaused}
        width={width}
        height={100}
      />

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
        width={300}
        height={100}
        x={0}
        y={height - 100}
      />

      <HitEffectsLayer
        effects={hitEffects}
        onEffectComplete={handleEffectComplete}
      />

      {/* Return to Menu Button */}
      <pixiContainer x={width - 120} y={20}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(0x333333, 0.8);
            g.drawRoundedRect(0, 0, 100, 40, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onReturnToMenu} // Fix: Use parameter
        />
        <pixiText
          text="메뉴"
          style={{
            fontSize: 14,
            fill: 0xffffff,
            align: "center",
          }}
          x={50}
          y={20}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default CombatScreen;
