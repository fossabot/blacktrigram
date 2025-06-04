import React, { useCallback } from "react";
import type { Container, Graphics, Text, Application } from "pixi.js";
import {
  Container as PixiContainer,
  Graphics as PixiGraphics,
  Text as PixiText,
} from "@pixi/react";
import type {
  PlayerState,
  CombatResult,
  Position,
  VitalPoint,
} from "../../../types";
import { VitalPointSystem } from "../../../systems/VitalPointSystem";
import { KOREAN_COLORS } from "../../../types/constants";
import {
  convertKoreanColorForCSS,
  ensurePixiColor,
} from "../../../utils/colorUtils";

interface CombatArenaProps {
  readonly player: PlayerState;
  readonly opponent: PlayerState;
  readonly onCombatResult?: (result: CombatResult) => void;
  readonly onPlayerStateChange?: (updates: Partial<PlayerState>) => void;
  readonly onOpponentStateChange?: (updates: Partial<PlayerState>) => void;
  readonly isActive?: boolean;
  readonly showVitalPoints?: boolean;
  readonly showDebugInfo?: boolean;
}

export const CombatArena: React.FC<CombatArenaProps> = ({
  player,
  opponent,
  isActive = true,
  showVitalPoints = false,
  showDebugInfo = false,
}) => {
  const ARENA_WIDTH = 1200;
  const ARENA_HEIGHT = 800;

  const handlePlayerClick = useCallback(
    (position: Position) => {
      if (!isActive) return;

      // Find nearest vital point if targeting is enabled
      if (showVitalPoints) {
        const vitalPoints = VitalPointSystem.getVitalPointsInRegion({
          x: position.x,
          y: position.y,
          width: 50,
          height: 50,
        });

        if (vitalPoints.length > 0) {
          console.log("Targeting vital point:", vitalPoints[0].name);
        }
      }
    },
    [isActive, showVitalPoints]
  );

  const renderPlayer = useCallback(
    (playerState: PlayerState, x: number, y: number) => {
      const playerColor = ensurePixiColor(KOREAN_COLORS.CYAN);
      const healthColor = ensurePixiColor(
        playerState.health > 50
          ? KOREAN_COLORS.TRADITIONAL_GREEN
          : KOREAN_COLORS.TRADITIONAL_RED
      );

      return (
        <PixiContainer key={playerState.id} x={x} y={y}>
          {/* Player body */}
          <PixiGraphics
            draw={(g: any) => {
              g.clear();
              g.beginFill(playerColor);
              g.drawCircle(0, 0, 30);
              g.endFill();
            }}
          />

          {/* Health bar */}
          <PixiGraphics
            y={-50}
            draw={(g: any) => {
              g.clear();
              g.beginFill(0x333333);
              g.drawRect(-25, -5, 50, 10);
              g.endFill();
              g.beginFill(healthColor);
              g.drawRect(
                -25,
                -5,
                (50 * playerState.health) / playerState.maxHealth,
                10
              );
              g.endFill();
            }}
          />

          {/* Player name */}
          <PixiText
            text={playerState.name}
            x={0}
            y={-70}
            anchor={0.5}
            style={{
              fontSize: 14,
              fill: ensurePixiColor(KOREAN_COLORS.WHITE),
              fontFamily: "Noto Sans KR, Arial, sans-serif",
            }}
          />
        </PixiContainer>
      );
    },
    []
  );

  const renderVitalPoints = useCallback(() => {
    if (!showVitalPoints) return null;

    const vitalPoints = VitalPointSystem.getAllVitalPoints();

    return vitalPoints.map((vp: VitalPoint) => (
      <PixiContainer key={vp.id} x={vp.location.x * 10} y={vp.location.y * 10}>
        <PixiGraphics
          draw={(g: any) => {
            g.clear();
            g.lineStyle(1, ensurePixiColor(KOREAN_COLORS.TRADITIONAL_RED));
            g.beginFill(ensurePixiColor(KOREAN_COLORS.TRADITIONAL_RED), 0.3);
            g.drawCircle(0, 0, 5);
            g.endFill();
          }}
        />

        {showDebugInfo && (
          <PixiText
            text={vp.name.korean}
            x={8}
            y={-8}
            style={{
              fontSize: 10,
              fill: ensurePixiColor(KOREAN_COLORS.GOLD),
              fontFamily: "Noto Sans KR, Arial, sans-serif",
            }}
          />
        )}
      </PixiContainer>
    ));
  }, [showVitalPoints, showDebugInfo]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: convertKoreanColorForCSS(KOREAN_COLORS.BLACK),
      }}
    >
      <PixiContainer
        width={ARENA_WIDTH}
        height={ARENA_HEIGHT}
        interactive={true}
        onpointerdown={(event: any) => {
          const position = { x: event.global.x, y: event.global.y };
          handlePlayerClick(position);
        }}
      >
        {/* Arena background */}
        <PixiGraphics
          draw={(g: any) => {
            g.clear();
            g.beginFill(ensurePixiColor(KOREAN_COLORS.BLACK));
            g.drawRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);
            g.endFill();

            // Arena border
            g.lineStyle(3, ensurePixiColor(KOREAN_COLORS.GOLD));
            g.drawRect(50, 50, ARENA_WIDTH - 100, ARENA_HEIGHT - 100);
          }}
        />

        {/* Center line */}
        <PixiGraphics
          draw={(g: any) => {
            g.clear();
            g.lineStyle(2, ensurePixiColor(KOREAN_COLORS.DOJANG_BLUE));
            g.moveTo(ARENA_WIDTH / 2, 50);
            g.lineTo(ARENA_WIDTH / 2, ARENA_HEIGHT - 50);
          }}
        />

        {/* Render players */}
        {renderPlayer(player, player.position.x, player.position.y)}
        {renderPlayer(opponent, opponent.position.x, opponent.position.y)}

        {/* Render vital points */}
        {renderVitalPoints()}

        {/* Debug info */}
        {showDebugInfo && (
          <PixiText
            text={`Player: ${player.stance} | Opponent: ${opponent.stance}`}
            x={60}
            y={60}
            style={{
              fontSize: 12,
              fill: ensurePixiColor(KOREAN_COLORS.CYAN),
              fontFamily: "monospace",
            }}
          />
        )}
      </PixiContainer>
    </div>
  );
};

export default CombatArena;
