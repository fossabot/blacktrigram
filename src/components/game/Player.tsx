import React, { useCallback, useState, useEffect } from "react";
import { Container, Graphics, Text, useTick } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import type { PlayerState } from "../../types";
import { KOREAN_COLORS, TRIGRAM_DATA } from "../../types";
import { useAudio } from "../../audio/AudioManager";

export interface PlayerProps {
  readonly player: PlayerState;
  readonly isLocalPlayer?: boolean;
  readonly x?: number;
  readonly y?: number;
  readonly scale?: number;
  readonly onDeath?: (playerId: string) => void;
  readonly onStanceChange?: (playerId: string, stance: string) => void;
  readonly onAttack?: (playerId: string, technique: string) => void;
  readonly showHitboxes?: boolean;
  readonly debug?: boolean;
}

export function Player({
  player,
  isLocalPlayer = false,
  x: overrideX,
  y: overrideY,
  scale = 1,
  onDeath,
  onStanceChange,
  onAttack,
  showHitboxes = false,
  debug = false,
}: PlayerProps): React.ReactElement {
  const [animationTime, setAnimationTime] = useState<number>(0);
  const [lastHealthCheck, setLastHealthCheck] = useState<number>(player.health);
  const audio = useAudio();

  // Use override positions or player state positions
  const actualX = overrideX ?? player.position.x;
  const actualY = overrideY ?? player.position.y;

  // Handle death detection
  useEffect(() => {
    if (player.health <= 0 && lastHealthCheck > 0) {
      if (onDeath) {
        onDeath(player.playerId);
      }
    }
    setLastHealthCheck(player.health);
  }, [player.health, lastHealthCheck, onDeath, player.playerId]);

  // Handle stance changes
  useEffect(() => {
    if (onStanceChange) {
      onStanceChange(player.playerId, player.stance);
    }
  }, [player.stance, onStanceChange, player.playerId]);

  // Handle attack detection with audio feedback
  useEffect(() => {
    if (player.isAttacking && onAttack) {
      const technique = TRIGRAM_DATA[player.stance]?.technique;
      if (technique) {
        onAttack(player.playerId, technique.koreanName);

        // Play attack sound if audio is available and local player
        if (isLocalPlayer && audio.playAttackSound) {
          audio.playAttackSound(technique.damage);
        }
      }
    }
  }, [
    player.isAttacking,
    onAttack,
    player.playerId,
    player.stance,
    isLocalPlayer,
    audio,
  ]);

  // Animation tick
  useTick(
    useCallback((delta: number) => {
      setAnimationTime((prev) => prev + delta);
    }, [])
  );

  // Get stance color for Korean martial arts theming - fix color type handling
  const getStanceColor = useCallback((): number => {
    const stanceColors = {
      geon: 0xffd700, // Gold - Heaven
      tae: 0x87ceeb, // Sky Blue - Lake
      li: 0xff4500, // Red Orange - Fire
      jin: 0x9370db, // Purple - Thunder
      son: 0x98fb98, // Pale Green - Wind
      gam: 0x4169e1, // Royal Blue - Water
      gan: 0x8b4513, // Saddle Brown - Mountain
      gon: 0x654321, // Dark Brown - Earth
    };

    return stanceColors[player.stance] || 0xffffff; // Default to white
  }, [player.stance]);

  // Helper function to convert color value to number
  const colorToNumber = useCallback((color: string | number): number => {
    if (typeof color === "number") {
      return color;
    }
    if (typeof color === "string") {
      return parseInt(color.replace("#", ""), 16);
    }
    return 0xffffff; // Default fallback
  }, []);

  // Draw Korean martial artist
  const drawMartialArtist = useCallback(
    (g: PixiGraphics) => {
      g.clear();

      // Traditional Korean martial arts uniform (dobok)
      const whiteColor = colorToNumber(KOREAN_COLORS.WHITE);
      g.setFillStyle({ color: whiteColor, alpha: 0.9 });
      g.rect(-25, -90, 50, 90);
      g.fill();

      // Belt color indicating stance mastery
      const beltColor = getStanceColor();
      g.setFillStyle({ color: beltColor, alpha: 0.8 });
      g.rect(-27, -25, 54, 10);
      g.fill();

      // Health bar (Korean style)
      const healthPercentage = player.health / player.maxHealth;
      const grayColor = colorToNumber(KOREAN_COLORS.GRAY_DARK);
      g.setFillStyle({ color: grayColor, alpha: 0.7 });
      g.rect(-30, -105, 60, 8);
      g.fill();

      const healthColor =
        healthPercentage > 0.6
          ? colorToNumber(KOREAN_COLORS.Green)
          : healthPercentage > 0.3
          ? colorToNumber(KOREAN_COLORS.Orange)
          : colorToNumber(KOREAN_COLORS.Red);
      g.setFillStyle({ color: healthColor, alpha: 0.9 });
      g.rect(-30, -105, 60 * healthPercentage, 8);
      g.fill();

      // Ki energy aura based on stance
      if (player.ki > 20) {
        const auraAlpha = Math.sin(animationTime * 0.3) * 0.4 + 0.6;
        const auraSize = 45 + Math.sin(animationTime * 0.5) * 5;
        g.setStrokeStyle({
          color: beltColor,
          width: 6,
          alpha: auraAlpha * (player.ki / player.maxKi),
        });
        g.circle(0, -45, auraSize);
        g.stroke();
      }

      // Attack animation
      if (player.isAttacking) {
        const attackAlpha = Math.sin(animationTime * 0.8) * 0.5 + 0.5;
        g.setFillStyle({ color: beltColor, alpha: attackAlpha });
        g.circle(0, -45, 60);
        g.fill();
      }

      // Blocking stance
      if (player.isBlocking) {
        const cyanColor = colorToNumber(KOREAN_COLORS.CYAN);
        g.setStrokeStyle({ color: cyanColor, width: 4, alpha: 0.8 });
        g.rect(-35, -95, 70, 95);
        g.stroke();
      }

      // Movement indicator
      if (player.isMoving) {
        const moveAlpha = Math.sin(animationTime * 0.6) * 0.3 + 0.4;
        const yellowColor = colorToNumber(KOREAN_COLORS.YELLOW);
        g.setStrokeStyle({ color: yellowColor, width: 2, alpha: moveAlpha });
        g.circle(0, 10, 15);
        g.stroke();
      }

      // Debug hitboxes
      if (showHitboxes) {
        const redColor = colorToNumber(KOREAN_COLORS.Red);
        g.setStrokeStyle({ color: redColor, width: 2, alpha: 0.5 });
        g.rect(-25, -90, 50, 90);
        g.stroke();
      }

      // Local player indicator (special glow for current player)
      if (isLocalPlayer) {
        const localPlayerAlpha = Math.sin(animationTime * 0.4) * 0.3 + 0.7;
        const goldColor = colorToNumber(KOREAN_COLORS.GOLD);
        g.setStrokeStyle({
          color: goldColor,
          width: 3,
          alpha: localPlayerAlpha,
        });
        g.circle(0, -45, 70);
        g.stroke();
      }
    },
    [
      player.health,
      player.maxHealth,
      player.ki,
      player.maxKi,
      player.isAttacking,
      player.isBlocking,
      player.isMoving,
      animationTime,
      getStanceColor,
      showHitboxes,
      isLocalPlayer,
      colorToNumber,
    ]
  );

  // Get trigram symbol for stance
  const getTrigramSymbol = useCallback((): string => {
    const symbols = {
      geon: "☰", // Heaven
      tae: "☱", // Lake
      li: "☲", // Fire
      jin: "☳", // Thunder
      son: "☴", // Wind
      gam: "☵", // Water
      gan: "☶", // Mountain
      gon: "☷", // Earth
    };
    return symbols[player.stance] || "☰";
  }, [player.stance]);

  // Convert colors to hex strings for Text components with proper type safety
  const stanceColorHex = `#${getStanceColor().toString(16).padStart(6, "0")}`;
  const whiteColorHex =
    typeof KOREAN_COLORS.WHITE === "string"
      ? KOREAN_COLORS.WHITE
      : `#${colorToNumber(KOREAN_COLORS.WHITE).toString(16).padStart(6, "0")}`;
  const blackColorHex =
    typeof KOREAN_COLORS.BLACK === "string"
      ? KOREAN_COLORS.BLACK
      : `#${colorToNumber(KOREAN_COLORS.BLACK).toString(16).padStart(6, "0")}`;
  const cyanColorHex =
    typeof KOREAN_COLORS.CYAN === "string"
      ? KOREAN_COLORS.CYAN
      : `#${colorToNumber(KOREAN_COLORS.CYAN).toString(16).padStart(6, "0")}`;
  const yellowColorHex =
    typeof KOREAN_COLORS.YELLOW === "string"
      ? KOREAN_COLORS.YELLOW
      : `#${colorToNumber(KOREAN_COLORS.YELLOW).toString(16).padStart(6, "0")}`;
  const grayLightColorHex =
    typeof KOREAN_COLORS.GRAY_LIGHT === "string"
      ? KOREAN_COLORS.GRAY_LIGHT
      : `#${colorToNumber(KOREAN_COLORS.GRAY_LIGHT)
          .toString(16)
          .padStart(6, "0")}`;

  return (
    <Container
      x={actualX}
      y={actualY}
      scale={scale}
      alpha={player.health > 0 ? 1.0 : 0.5}
      data-testid={`player-${player.playerId}`}
    >
      {/* Main character graphic */}
      <Graphics draw={drawMartialArtist} />

      {/* Korean technique name display */}
      <Text
        text={TRIGRAM_DATA[player.stance]?.technique?.koreanName || "기본 자세"}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-125}
        style={
          {
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 14,
            fill: stanceColorHex,
            fontWeight: "bold",
            stroke: blackColorHex,
            strokeThickness: 1,
          } as any
        }
      />

      {/* Trigram symbol */}
      <Text
        text={getTrigramSymbol()}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-140}
        style={
          {
            fontFamily: "serif",
            fontSize: 20,
            fill: whiteColorHex,
            stroke: blackColorHex,
            strokeThickness: 1,
          } as any
        }
      />

      {/* Player ID for debugging */}
      {debug && (
        <Text
          text={player.playerId}
          anchor={{ x: 0.5, y: 0.5 }}
          y={25}
          style={
            {
              fontFamily: "Arial, sans-serif",
              fontSize: 10,
              fill: grayLightColorHex,
            } as any
          }
        />
      )}

      {/* Status conditions */}
      {player.conditions && player.conditions.length > 0 && (
        <Text
          text={`상태: ${player.conditions.map((c) => c.type).join(", ")}`}
          anchor={{ x: 0.5, y: 0.5 }}
          y={-155}
          style={
            {
              fontFamily: "Noto Sans KR, Arial, sans-serif",
              fontSize: 10,
              fill: yellowColorHex,
            } as any
          }
        />
      )}

      {/* Ki level indicator */}
      <Text
        text={`기력: ${Math.floor(player.ki)}/${player.maxKi}`}
        anchor={{ x: 0.5, y: 0.5 }}
        y={-115}
        style={
          {
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 10,
            fill: cyanColorHex,
          } as any
        }
      />

      {/* Local player indicator text */}
      {isLocalPlayer && (
        <Text
          text="당신 (You)"
          anchor={{ x: 0.5, y: 0.5 }}
          y={35}
          style={
            {
              fontFamily: "Noto Sans KR, Arial, sans-serif",
              fontSize: 12,
              fill: stanceColorHex,
              fontWeight: "bold",
            } as any
          }
        />
      )}
    </Container>
  );
}
