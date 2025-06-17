import React, { useCallback, useMemo } from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import { Button, ProgressBar, Label } from "@pixi/ui";
import "@pixi/layout";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { PlayerState } from "../../../types/player";
import {
  KOREAN_COLORS,
  PLAYER_ARCHETYPES_DATA,
} from "../../../types/constants";
import * as PIXI from "pixi.js";

extend({ Container, Graphics, Text, Button, ProgressBar, Label });

export interface CombatHUDProps {
  readonly player1: PlayerState;
  readonly player2: PlayerState;
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly maxRounds: number;
  readonly isPaused?: boolean;
  readonly onPauseToggle?: () => void;
  readonly width?: number;
  readonly height?: number;
  readonly x?: number;
  readonly y?: number;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const CombatHUD: React.FC<CombatHUDProps> = ({
  player1,
  player2,
  timeRemaining,
  currentRound,
  maxRounds,
  isPaused = false,
  onPauseToggle,
  width = 1200,
  height = 80,
  x = 0,
  y = 0,
}) => {
  usePixiExtensions();

  // Archetype color data for player names
  const archetype1Data = PLAYER_ARCHETYPES_DATA[player1.archetype] || {
    colors: { primary: KOREAN_COLORS.PLAYER_1_COLOR },
    name: { korean: "", english: "" },
  };
  const archetype2Data = PLAYER_ARCHETYPES_DATA[player2.archetype] || {
    colors: { primary: KOREAN_COLORS.PLAYER_2_COLOR },
    name: { korean: "", english: "" },
  };

  // Health bar width
  const healthBarWidth = Math.max(160, width * 0.18);

  // Responsive layout
  const isMobile = width < 600;
  const hudLayout = useMemo(
    () => ({
      width,
      height,
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      gap: isMobile ? 8 : 16,
      backgroundColor: KOREAN_COLORS.UI_BACKGROUND_DARK,
      borderRadius: 10,
    }),
    [width, height, isMobile]
  );

  // Player info panel
  const renderPlayerPanel = useCallback(
    (
      player: PlayerState,
      archetypeData: any,
      align: "left" | "right" = "left"
    ) => {
      const barColor = archetypeData.colors.primary;
      const alignSelf = align === "left" ? "flex-start" : "flex-end";
      return (
        <Container
          layout={{
            width: isMobile ? width - 40 : 320,
            flexDirection: "column",
            alignItems: alignSelf,
            gap: 4,
          }}
        >
          <Label
            text={player.name.korean}
            style={{
              fontSize: 18,
              fill: barColor,
              fontWeight: "bold",
              fontFamily: "Noto Sans KR",
              align: align,
            }}
            layout={{ marginBottom: 2 }}
          />
          <Label
            text={archetypeData.name.korean}
            style={{
              fontSize: 12,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              fontFamily: "Noto Sans KR",
              align: align,
            }}
            layout={{ marginBottom: 6 }}
          />
          <ProgressBar
            value={player.health}
            maxValue={player.maxHealth}
            width={healthBarWidth}
            height={18}
            background={KOREAN_COLORS.UI_BACKGROUND_MEDIUM}
            fill={barColor}
            border={KOREAN_COLORS.UI_BORDER}
            borderRadius={6}
            layout={{ marginBottom: 2 }}
          />
          <Label
            text={`${Math.round(player.health)}/${player.maxHealth}`}
            style={{
              fontSize: 10,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: align,
            }}
            layout={{ marginBottom: 2 }}
          />
          <Container
            layout={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <ProgressBar
              value={player.ki}
              maxValue={player.maxKi}
              width={70}
              height={8}
              background={KOREAN_COLORS.UI_BACKGROUND_MEDIUM}
              fill={KOREAN_COLORS.PRIMARY_CYAN}
              border={KOREAN_COLORS.UI_BORDER}
              borderRadius={3}
            />
            <Label
              text={`기력: ${Math.round(player.ki)}`}
              style={{
                fontSize: 8,
                fill: KOREAN_COLORS.PRIMARY_CYAN,
              }}
            />
            <ProgressBar
              value={player.stamina}
              maxValue={player.maxStamina}
              width={70}
              height={8}
              background={KOREAN_COLORS.UI_BACKGROUND_MEDIUM}
              fill={KOREAN_COLORS.SECONDARY_YELLOW}
              border={KOREAN_COLORS.UI_BORDER}
              borderRadius={3}
            />
            <Label
              text={`체력: ${Math.round(player.stamina)}`}
              style={{
                fontSize: 8,
                fill: KOREAN_COLORS.SECONDARY_YELLOW,
              }}
            />
          </Container>
        </Container>
      );
    },
    [healthBarWidth, isMobile, width]
  );

  // Center panel (round, timer, rounds)
  const renderCenterPanel = useCallback(() => (
    <Container
      layout={{
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        width: isMobile ? width - 40 : 220,
      }}
    >
      <Label
        text={`라운드 ${currentRound}/${maxRounds}`}
        style={{
          fontSize: 14,
          fill: KOREAN_COLORS.ACCENT_GOLD,
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
          align: "center",
        }}
        layout={{ marginBottom: 2 }}
      />
      <Label
        text={formatTime(timeRemaining)}
        style={{
          fontSize: 18,
          fill:
            timeRemaining < 30
              ? KOREAN_COLORS.NEGATIVE_RED
              : KOREAN_COLORS.TEXT_PRIMARY,
          fontWeight: "bold",
          fontFamily: "Noto Sans KR",
          align: "center",
        }}
        layout={{ marginBottom: 2 }}
      />
      <Container
        layout={{
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        {Array.from({ length: maxRounds }, (_, i) => (
          <Graphics
            key={i}
            draw={(g) => {
              g.clear();
              const isActive = i < currentRound;
              g.beginFill(
                isActive ? KOREAN_COLORS.ACCENT_GOLD : KOREAN_COLORS.UI_GRAY,
                0.8
              );
              g.drawCircle(0, 0, 6);
              g.endFill();
            }}
            x={i * 18}
          />
        ))}
      </Container>
      {isPaused && (
        <Label
          text="일시정지"
          style={{
            fontSize: 12,
            fill: KOREAN_COLORS.WARNING_YELLOW,
            align: "center",
            fontFamily: "Noto Sans KR",
          }}
        />
      )}
    </Container>
  ), [currentRound, maxRounds, timeRemaining, isPaused, isMobile, width]);

  // Pause button
  const renderPauseButton = useCallback(() => {
    if (!onPauseToggle) return null;
    return (
      <Button
        text={isPaused ? "계속" : "정지"}
        width={isMobile ? 60 : 80}
        height={isMobile ? 28 : 36}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: isMobile ? 10 : 12,
          fill: KOREAN_COLORS.TEXT_PRIMARY,
          fontWeight: "bold",
        }}
        background={{
          default: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
          hover: KOREAN_COLORS.ACCENT_GOLD,
          pressed: KOREAN_COLORS.ACCENT_GOLD,
        }}
        border={KOREAN_COLORS.ACCENT_GOLD}
        borderRadius={6}
        onPress={onPauseToggle}
        layout={{
          alignSelf: "center",
          marginTop: isMobile ? 4 : 0,
        }}
        data-testid="pause-button"
      />
    );
  }, [onPauseToggle, isPaused, isMobile]);

  return (
    <Container
      x={x}
      y={y}
      layout={hudLayout}
      data-testid="combat-hud"
      backgroundColor={KOREAN_COLORS.UI_BACKGROUND_DARK}
      borderRadius={10}
    >
      {renderPlayerPanel(player1, archetype1Data, "left")}
      {renderCenterPanel()}
      {renderPlayerPanel(player2, archetype2Data, "right")}
      {renderPauseButton()}
    </Container>
  );
};

export default CombatHUD;
            player2.health,
            player2.maxHealth,
            archetype2Data.colors.primary,
            healthBarWidth;
