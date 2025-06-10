import React, { useState, useCallback } from "react";
import { usePixiExtensions } from "../../utils/pixiExtensions";
import { CombatArena } from "./components/CombatArena";
import { CombatHUD } from "./components/CombatHUD";
import { CombatControls } from "./components/CombatControls";
import { DojangBackground } from "../game/DojangBackground";
import { HitEffectsLayer } from "../ui/HitEffectsLayer";
import { GameEngine } from "../game/GameEngine";
import type { PlayerState } from "../../types/player";
import type { CombatScreenProps } from "../../types/components";
import type { HitEffect } from "../../types/effects";

export const CombatScreen: React.FC<CombatScreenProps> = ({
  players,
  currentRound,
  timeRemaining,
  isPaused,
  gameMode,
  onPlayerUpdate,
  onReturnToMenu, // Fix: Use this parameter
  onGameEnd,
  width = 1200,
  height = 800,
}) => {
  usePixiExtensions();

  // Fix: Remove unused state variables or use them
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [isExecutingTechnique, setIsExecutingTechnique] = useState(false);

  // Fix: Use callback functions
  const handleCombatResult = useCallback(
    (result: any) => {
      console.log("Combat result:", result);
      if (result.gameEnd) {
        onGameEnd(result.winner);
      }
    },
    [onGameEnd]
  );

  const handleGameEvent = useCallback((event: string, data?: any) => {
    console.log("Game event:", event, data);
    if (event === "technique_executed") {
      setIsExecutingTechnique(true);
      setTimeout(() => setIsExecutingTechnique(false), 500);
    }
  }, []);

  const handleAttack = useCallback(() => {
    console.log("Attack initiated");
    setIsExecutingTechnique(true);
  }, []);

  const handleDefend = useCallback(() => {
    console.log("Defense initiated");
  }, []);

  const handlePauseToggle = useCallback(() => {
    console.log("Pause toggled");
  }, []);

  const handleStanceSwitch = useCallback((stance: any) => {
    console.log("Stance switched to:", stance);
  }, []);

  const handleTechniqueExecute = useCallback((technique: any) => {
    console.log("Technique executed:", technique);
    setIsExecutingTechnique(true);
    setTimeout(() => setIsExecutingTechnique(false), 800);
  }, []);

  const handlePlayerUpdateForEngine = useCallback(
    (playerIndex: number, updates: Partial<PlayerState>) => {
      onPlayerUpdate(playerIndex, updates);
    },
    [onPlayerUpdate]
  );

  const handleEffectComplete = useCallback((effectId: string) => {
    setHitEffects((prev) => prev.filter((effect) => effect.id !== effectId));
  }, []);

  return (
    <pixiContainer data-testid="combat-screen">
      <DojangBackground
        width={width}
        height={height}
        lighting="cyberpunk"
        animate={true}
      />

      <GameEngine
        players={Array.from(players)} // Fix: Convert readonly array to mutable
        onPlayerUpdate={handlePlayerUpdateForEngine}
        onCombatResult={handleCombatResult}
        onGameEvent={handleGameEvent}
        gameMode={gameMode}
        width={width}
        height={height}
      />

      <CombatArena
        players={players as readonly [PlayerState, PlayerState]} // Fix: Proper type assertion
        width={width}
        height={height}
      />

      <CombatHUD
        player1={players[0]}
        player2={players[1]}
        timeRemaining={timeRemaining}
        currentRound={currentRound}
        maxRounds={3}
        isPaused={isPaused}
        width={width}
        height={height}
      />

      <CombatControls
        onAttack={handleAttack}
        onDefend={handleDefend}
        onPauseToggle={handlePauseToggle}
        onSwitchStance={handleStanceSwitch}
        onTechniqueExecute={handleTechniqueExecute}
        isPaused={isPaused}
        player={players[0]}
        isExecutingTechnique={isExecutingTechnique}
      />

      <HitEffectsLayer
        effects={hitEffects}
        onEffectComplete={handleEffectComplete}
        width={width}
        height={height}
      />

      {/* Return to menu button */}
      <pixiContainer x={width - 120} y={20}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(0x333333, 0.8);
            g.drawRoundedRect(0, 0, 100, 30, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onReturnToMenu} // Fix: Use onPointerDown instead of pointerdown
        />
        <pixiText
          text="메뉴"
          style={{ fontSize: 14, fill: 0xffffff }}
          x={50}
          y={15}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default CombatScreen;
