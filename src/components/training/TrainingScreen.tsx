import React, { useState, useCallback, useMemo, useEffect } from "react";
import * as PIXI from "pixi.js";
import type { TrainingScreenProps } from "../../types/components";
import type { PlayerState } from "../../types/player";
import type { TrigramStance } from "../../types/trigram";
import { TrigramStance as TrigramStanceEnum } from "../../types/enums"; // Fix: Import enum
import { Player } from "../game/Player";
import { TrigramWheel } from "../ui/TrigramWheel";
import { HealthBar } from "../ui/HealthBar";
import { StanceIndicator } from "../ui/StanceIndicator";
import { DojangBackground } from "../game/DojangBackground";
import { KOREAN_COLORS } from "../../types/constants";

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  onReturnToMenu,
  player,
  onPlayerUpdate,
  width = 1200,
  height = 800,
  x = 0,
  y = 0,
}) => {
  const [selectedStance, setSelectedStance] = useState<TrigramStance>(
    TrigramStanceEnum.GEON
  );
  const [isTraining, setIsTraining] = useState(false);
  const [dojangTextures, setDojangTextures] = useState<{
    floor: PIXI.Texture | null;
    wall: PIXI.Texture | null;
  }>({ floor: null, wall: null });
  const [logoTexture, setLogoTexture] = useState<PIXI.Texture | null>(null);

  // Responsive calculations
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const logoSize = isMobile ? 60 : isTablet ? 80 : 100;

  // Load training-specific textures
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const [floor, wall, logo] = await Promise.all([
          PIXI.Assets.load("/src/assets/visual/bg/dojang/dojang_floor_tex.png"),
          PIXI.Assets.load("/src/assets/visual/bg/dojang/dojang_wall_tex.png"),
          PIXI.Assets.load("/src/assets/visual/logo/black-trigram-256.png"),
        ]);
        setDojangTextures({
          floor: floor as PIXI.Texture,
          wall: wall as PIXI.Texture,
        });
        setLogoTexture(logo as PIXI.Texture);
      } catch (err) {
        console.warn("Failed to load training assets", err);
      }
    };
    loadAssets();
  }, []);

  // Fix: Use these memoized values in the component
  const trainingPlayer = useMemo(() => {
    return (player || {
      id: "training_player",
      name: { korean: "훈련생", english: "Trainee" },
      health: 100,
      maxHealth: 100,
      currentStance: TrigramStanceEnum.GEON,
      // ... other default properties
    }) as PlayerState;
  }, [player]);

  const trainingDummy = useMemo(() => {
    return {
      id: "training_dummy",
      name: { korean: "훈련 더미", english: "Training Dummy" },
      health: 1000,
      maxHealth: 1000,
      currentStance: TrigramStanceEnum.GAN,
      // ... other properties
    } as PlayerState;
  }, []);

  // Fix: Remove unused handleArchetypeChange or use it
  const handleStanceChange = useCallback(
    (stance: TrigramStance) => {
      setSelectedStance(stance);
      if (onPlayerUpdate) {
        onPlayerUpdate({ currentStance: stance });
      }
    },
    [onPlayerUpdate]
  );

  // Fix: Use the handlers and computed values
  const handleTrainingStart = useCallback(() => {
    setIsTraining(true);
    console.log("Training started with player:", trainingPlayer);
    console.log("Training against dummy:", trainingDummy);

    // Auto-stop training after 3 seconds
    setTimeout(() => {
      setIsTraining(false);
    }, 3000);
  }, [trainingPlayer, trainingDummy]);

  return (
    <pixiContainer x={x} y={y} data-testid="training-screen">
      {/* Enhanced Dojang Background with Textures */}
      <DojangBackground
        width={width}
        height={height}
        lighting="traditional"
        animate={true}
        data-testid="dojang-background"
      />

      {/* Dojang Floor Texture */}
      {dojangTextures.floor && (
        <pixiSprite
          texture={dojangTextures.floor}
          x={0}
          y={height * 0.7}
          width={width}
          height={height * 0.3}
          alpha={0.6}
          data-testid="dojang-floor-texture"
        />
      )}

      {/* Dojang Wall Textures on sides */}
      {dojangTextures.wall && (
        <>
          <pixiSprite
            texture={dojangTextures.wall}
            x={0}
            y={0}
            width={width * 0.15}
            height={height}
            alpha={0.4}
            data-testid="dojang-wall-left"
          />
          <pixiSprite
            texture={dojangTextures.wall}
            x={width * 0.85}
            y={0}
            width={width * 0.15}
            height={height}
            alpha={0.4}
            data-testid="dojang-wall-right"
          />
        </>
      )}

      {/* Header with Logo - Responsive Layout */}
      <pixiContainer
        x={width / 2}
        y={isMobile ? 30 : 40}
        data-testid="training-header"
      >
        {/* Training Logo */}
        {logoTexture && (
          <pixiSprite
            texture={logoTexture}
            x={isMobile ? -80 : -120}
            y={-logoSize / 2}
            scale={{ x: logoSize / 256, y: logoSize / 256 }}
            alpha={0.8}
            data-testid="training-logo"
          />
        )}

        <pixiText
          text="흑괘 훈련 도장"
          style={{
            fontSize: isMobile ? 18 : isTablet ? 22 : 28,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
            align: "center",
          }}
          anchor={0.5}
          data-testid="training-title-korean"
        />

        <pixiText
          text="Black Trigram Training Dojang"
          style={{
            fontSize: isMobile ? 12 : isTablet ? 14 : 16,
            fill: KOREAN_COLORS.TEXT_SECONDARY,
            align: "center",
          }}
          y={isMobile ? 25 : 35}
          anchor={0.5}
          data-testid="training-title-english"
        />
      </pixiContainer>

      {/* Enhanced Training Status with Better Mobile Layout */}
      {isTraining && (
        <pixiContainer
          x={width / 2}
          y={height / 2 - 50}
          data-testid="training-status"
        >
          <pixiGraphics
            draw={(g) => {
              g.clear();
              g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.9 });
              g.roundRect(
                -(isMobile ? 80 : 120),
                -30,
                isMobile ? 160 : 240,
                60,
                12
              );
              g.fill();
              g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_CYAN });
              g.roundRect(
                -(isMobile ? 80 : 120),
                -30,
                isMobile ? 160 : 240,
                60,
                12
              );
              g.stroke();
            }}
            data-testid="training-status-background"
          />
          <pixiText
            text="수련 중..."
            style={{
              fontSize: isMobile ? 14 : 18,
              fill: KOREAN_COLORS.BLACK_SOLID,
              align: "center",
              fontWeight: "bold",
            }}
            anchor={0.5}
            y={-8}
            data-testid="training-status-korean"
          />
          <pixiText
            text="Training in Progress"
            style={{
              fontSize: isMobile ? 10 : 12,
              fill: KOREAN_COLORS.BLACK_SOLID,
              align: "center",
            }}
            anchor={0.5}
            y={8}
            data-testid="training-status-english"
          />
        </pixiContainer>
      )}

      {/* Enhanced Player Status Panel - Mobile Responsive */}
      <pixiContainer
        x={isMobile ? 20 : 50}
        y={isMobile ? height * 0.15 : height * 0.2}
        data-testid="player-status-panel"
      >
        {trainingPlayer && (
          <>
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.fill({
                  color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                  alpha: 0.8,
                });
                g.roundRect(
                  0,
                  0,
                  isMobile ? 160 : 200,
                  isMobile ? 120 : 150,
                  8
                );
                g.fill();
                g.stroke({
                  width: 2,
                  color: KOREAN_COLORS.ACCENT_GOLD,
                  alpha: 0.6,
                });
                g.roundRect(
                  0,
                  0,
                  isMobile ? 160 : 200,
                  isMobile ? 120 : 150,
                  8
                );
                g.stroke();
              }}
              data-testid="status-panel-background"
            />

            <pixiText
              text="수련자 상태"
              style={{
                fontSize: isMobile ? 12 : 14,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                fontWeight: "bold",
              }}
              x={8}
              y={8}
              data-testid="status-panel-title"
            />

            <HealthBar
              currentHealth={trainingPlayer.health}
              maxHealth={trainingPlayer.maxHealth}
              width={isMobile ? 140 : 180}
              height={16}
              x={8}
              y={30}
              data-testid="player-health-bar"
            />

            <StanceIndicator
              stance={trainingPlayer.currentStance}
              size={isMobile ? 40 : 50}
              x={8}
              y={isMobile ? 55 : 70}
              data-testid="player-stance-indicator"
            />

            <pixiText
              text={`자세: ${trainingPlayer.currentStance || "건"}`}
              style={{
                fontSize: isMobile ? 10 : 12,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
              }}
              x={isMobile ? 55 : 70}
              y={isMobile ? 70 : 85}
              data-testid="stance-label"
            />
          </>
        )}
      </pixiContainer>

      {/* Enhanced Training Content Panel with Better Organization */}
      <pixiContainer
        x={isMobile ? 20 : 50}
        y={height - (isMobile ? 280 : 320)}
        data-testid="training-content-panel"
      >
        {/* Training Mode Selection with Icons */}
        <pixiContainer y={0} data-testid="training-modes">
          <pixiText
            text="수련 모드"
            style={{
              fontSize: isMobile ? 12 : 14,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
            }}
            y={-25}
            data-testid="modes-title"
          />

          {[
            {
              id: "basics",
              korean: "기초",
              english: "Basics",
              color: KOREAN_COLORS.ACCENT_GOLD,
            },
            {
              id: "techniques",
              korean: "기법",
              english: "Techniques",
              color: KOREAN_COLORS.PRIMARY_CYAN,
            },
            {
              id: "philosophy",
              korean: "철학",
              english: "Philosophy",
              color: KOREAN_COLORS.ACCENT_PURPLE,
            },
          ].map((mode, index) => (
            <pixiContainer
              key={mode.id}
              x={index * (isMobile ? 70 : 90)}
              y={0}
              data-testid={`mode-${mode.id}`}
            >
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  g.fill({
                    color:
                      index === 0
                        ? mode.color
                        : KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                    alpha: 0.8,
                  });
                  g.roundRect(0, 0, isMobile ? 65 : 80, isMobile ? 35 : 40, 6);
                  g.fill();
                  g.stroke({ width: 1, color: mode.color });
                  g.roundRect(0, 0, isMobile ? 65 : 80, isMobile ? 35 : 40, 6);
                  g.stroke();
                }}
                interactive={true}
                onPointerDown={() => console.log(`${mode.id} mode selected`)}
              />
              <pixiText
                text={mode.korean}
                style={{
                  fontSize: isMobile ? 10 : 12,
                  fill:
                    index === 0
                      ? KOREAN_COLORS.BLACK_SOLID
                      : KOREAN_COLORS.TEXT_PRIMARY,
                  align: "center",
                  fontWeight: index === 0 ? "bold" : "normal",
                }}
                x={(isMobile ? 65 : 80) / 2}
                y={(isMobile ? 35 : 40) / 2}
                anchor={0.5}
                data-testid={`mode-${mode.id}-text`}
              />
            </pixiContainer>
          ))}
        </pixiContainer>

        {/* Enhanced Training Controls */}
        <pixiContainer
          x={0}
          y={isMobile ? 50 : 60}
          data-testid="training-controls"
        >
          <pixiContainer data-testid="execute-technique-button">
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.fill({
                  color: isTraining
                    ? KOREAN_COLORS.WARNING_ORANGE
                    : KOREAN_COLORS.POSITIVE_GREEN,
                  alpha: 0.9,
                });
                g.roundRect(0, 0, isMobile ? 100 : 140, isMobile ? 35 : 45, 8);
                g.fill();
                g.stroke({
                  width: 2,
                  color: isTraining
                    ? KOREAN_COLORS.NEGATIVE_RED
                    : KOREAN_COLORS.ACCENT_GOLD,
                });
                g.roundRect(0, 0, isMobile ? 100 : 140, isMobile ? 35 : 45, 8);
                g.stroke();
              }}
              interactive={!isTraining}
              onPointerDown={isTraining ? undefined : handleTrainingStart}
            />
            <pixiText
              text={isTraining ? "수련 중..." : "기법 실행"}
              style={{
                fontSize: isMobile ? 12 : 14,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
                fontWeight: "bold",
              }}
              x={(isMobile ? 100 : 140) / 2}
              y={(isMobile ? 35 : 45) / 2}
              anchor={0.5}
              data-testid="execute-button-text"
            />
          </pixiContainer>

          {/* Training Progress */}
          {isTraining && (
            <pixiContainer
              x={isMobile ? 110 : 150}
              y={0}
              data-testid="training-progress"
            >
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  g.fill({
                    color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                    alpha: 0.8,
                  });
                  g.roundRect(
                    0,
                    0,
                    isMobile ? 120 : 150,
                    isMobile ? 35 : 45,
                    8
                  );
                  g.fill();
                  // Progress bar
                  g.fill({ color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.9 });
                  g.roundRect(
                    5,
                    (isMobile ? 35 : 45) / 2 - 8,
                    (isMobile ? 110 : 140) * 0.7,
                    16,
                    4
                  );
                  g.fill();
                }}
                data-testid="progress-background"
              />
              <pixiText
                text="진행률 70%"
                style={{
                  fontSize: isMobile ? 10 : 12,
                  fill: KOREAN_COLORS.TEXT_PRIMARY,
                  align: "center",
                }}
                x={(isMobile ? 120 : 150) / 2}
                y={(isMobile ? 35 : 45) / 2}
                anchor={0.5}
                data-testid="progress-text"
              />
            </pixiContainer>
          )}
        </pixiContainer>

        {/* Enhanced Trigram Training Section */}
        <pixiContainer
          x={0}
          y={isMobile ? 100 : 120}
          data-testid="trigram-training"
        >
          <pixiText
            text="팔괘 자세 수련"
            style={{
              fontSize: isMobile ? 14 : 16,
              fill: KOREAN_COLORS.ACCENT_GOLD,
              fontWeight: "bold",
            }}
            y={0}
            data-testid="trigram-section-title"
          />

          <TrigramWheel
            currentStance={selectedStance}
            onStanceSelect={handleStanceChange}
            size={isMobile ? 60 : 80}
            interactive={true}
            x={0}
            y={25}
            data-testid="trigram-wheel"
          />

          <pixiText
            text={`현재: ${selectedStance || "건괘"}`}
            style={{
              fontSize: isMobile ? 10 : 12,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
            }}
            x={isMobile ? 70 : 90}
            y={40}
            data-testid="current-stance-label"
          />
        </pixiContainer>
      </pixiContainer>

      {/* Enhanced Controls Panel - Mobile Optimized */}
      <pixiContainer
        x={width - (isMobile ? 140 : 200)}
        y={height - (isMobile ? 180 : 220)}
        data-testid="controls-panel"
      >
        {/* Action Buttons with Better Visual Design */}
        {[
          {
            id: "combat",
            korean: "실전 모드",
            english: "Combat",
            color: KOREAN_COLORS.ACCENT_RED,
          },
          {
            id: "restore",
            korean: "회복",
            english: "Restore",
            color: KOREAN_COLORS.POSITIVE_GREEN,
          },
          {
            id: "menu",
            korean: "메뉴",
            english: "Menu",
            color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
          },
        ].map((button, index) => (
          <pixiContainer
            key={button.id}
            y={index * (isMobile ? 45 : 55)}
            data-testid={`${button.id}-button`}
          >
            <pixiGraphics
              draw={(g) => {
                g.clear();
                g.fill({ color: button.color, alpha: 0.8 });
                g.roundRect(0, 0, isMobile ? 130 : 170, isMobile ? 35 : 45, 8);
                g.fill();
                g.stroke({
                  width: 2,
                  color: KOREAN_COLORS.ACCENT_GOLD,
                  alpha: 0.6,
                });
                g.roundRect(0, 0, isMobile ? 130 : 170, isMobile ? 35 : 45, 8);
                g.stroke();
              }}
              interactive={true}
              onPointerDown={
                button.id === "menu"
                  ? onReturnToMenu
                  : () => console.log(`${button.id} clicked`)
              }
            />
            <pixiText
              text={button.korean}
              style={{
                fontSize: isMobile ? 11 : 13,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
                fontWeight: "bold",
              }}
              x={(isMobile ? 130 : 170) / 2}
              y={(isMobile ? 35 : 45) / 2 - 6}
              anchor={0.5}
              data-testid={`${button.id}-korean-text`}
            />
            <pixiText
              text={button.english}
              style={{
                fontSize: isMobile ? 9 : 10,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
                align: "center",
              }}
              x={(isMobile ? 130 : 170) / 2}
              y={(isMobile ? 35 : 45) / 2 + 6}
              anchor={0.5}
              data-testid={`${button.id}-english-text`}
            />
          </pixiContainer>
        ))}
      </pixiContainer>

      {/* Enhanced Player Display with Training Dummy */}
      {trainingPlayer && (
        <Player
          playerState={trainingPlayer}
          playerIndex={0}
          x={width / 2 - (isMobile ? 50 : 100)}
          y={height / 2 + (isMobile ? 20 : 50)}
          onClick={() => console.log("Training player clicked")}
          data-testid="training-player"
        />
      )}

      {/* Training Dummy Display */}
      {trainingDummy && (
        <Player
          playerState={trainingDummy}
          playerIndex={1}
          x={width / 2 + (isMobile ? 50 : 100)}
          y={height / 2 + (isMobile ? 20 : 50)}
          onClick={() => console.log("Training dummy clicked")}
          data-testid="training-dummy"
        />
      )}

      {/* Training Logo in corner */}
      {logoTexture && (
        <pixiSprite
          texture={logoTexture}
          x={width - (isMobile ? 60 : 80)}
          y={isMobile ? 60 : 80}
          scale={{
            x: (isMobile ? 40 : 60) / 256,
            y: (isMobile ? 40 : 60) / 256,
          }}
          alpha={0.3}
          data-testid="training-corner-logo"
        />
      )}
    </pixiContainer>
  );
};

export default TrainingScreen;
