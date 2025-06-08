import React, { useState, useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type { TrainingScreenProps } from "../../types/components"; // Fix: Import interface
import { PlayerArchetype } from "../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  GAME_CONFIG,
  PLAYER_ARCHETYPES_DATA,
  TRIGRAM_DATA,
} from "../../types/constants";
import { BaseButton } from "../ui/base/BaseButton";
import { PixiTrigramWheel } from "../ui/base/PixiComponents";
import { KoreanText } from "../ui/base/korean-text";
import type { TrigramStance } from "../../types";
import { TrigramStance as TrigramStanceEnum } from "../../types/enums";

// Fix: Remove duplicate interface definition since it's imported above
// interface TrainingScreenProps { ... } // Remove this

export const TrainingScreen: React.FC<TrainingScreenProps> = ({
  selectedArchetype = "musa" as PlayerArchetype,
  onBack,
  onTrainingComplete,
  // Fix: Remove unused width and height parameters
  // width = GAME_CONFIG.CANVAS_WIDTH,
  // height = GAME_CONFIG.CANVAS_HEIGHT,
}) => {
  const [currentStance, setCurrentStance] = useState<TrigramStance>(
    TrigramStanceEnum.GEON as TrigramStance // Fix: Use proper enum value
  );
  const [trainingMode, setTrainingMode] = useState<
    "basics" | "techniques" | "vital_points"
  >("basics");
  const [progress, setProgress] = useState(0);

  const titleStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.title,
        fill: KOREAN_COLORS.ACCENT_GOLD,
        align: "center",
        fontWeight: "bold",
      }),
    []
  );

  const instructionStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: FONT_SIZES.medium,
        fill: KOREAN_COLORS.TEXT_PRIMARY,
        align: "center",
        wordWrap: true,
        wordWrapWidth: GAME_CONFIG.CANVAS_WIDTH - 100,
      }),
    []
  );

  const handleStanceChange = useCallback((stance: TrigramStance) => {
    setCurrentStance(stance);
    setProgress((prev) => Math.min(100, prev + 10));
  }, []);

  const handleTrainingModeChange = useCallback(
    (mode: "basics" | "techniques" | "vital_points") => {
      setTrainingMode(mode);
      setProgress(0);
    },
    []
  );

  const handleCompleteTraining = useCallback(() => {
    // Fix: Call without parameters
    onTrainingComplete?.();
  }, [onTrainingComplete]);

  const backgroundDraw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.95);
    g.drawRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);
    g.endFill();

    // Training mat grid
    g.lineStyle(1, KOREAN_COLORS.PRIMARY_CYAN, 0.3);
    const gridSize = 40;
    for (let i = 0; i <= GAME_CONFIG.CANVAS_WIDTH; i += gridSize) {
      g.moveTo(i, 0);
      g.lineTo(i, GAME_CONFIG.CANVAS_HEIGHT);
    }
    for (let j = 0; j <= GAME_CONFIG.CANVAS_HEIGHT; j += gridSize) {
      g.moveTo(0, j);
      g.lineTo(GAME_CONFIG.CANVAS_WIDTH, j);
    }
  }, []);

  const currentStanceData = TRIGRAM_DATA[currentStance];
  const archetypeData =
    PLAYER_ARCHETYPES_DATA[selectedArchetype as PlayerArchetype];

  // Use GAME_CONFIG values directly instead of props
  const canvasWidth = GAME_CONFIG.CANVAS_WIDTH;
  const canvasHeight = GAME_CONFIG.CANVAS_HEIGHT;

  return (
    <Container width={canvasWidth} height={canvasHeight}>
      <Graphics draw={backgroundDraw} />

      {/* Back Button */}
      {onBack && (
        <BaseButton
          text="뒤로 (Back)"
          onClick={onBack}
          x={20}
          y={20}
          width={120}
          height={40}
          variant="secondary"
        />
      )}

      {/* Title */}
      <Text
        text="무술 수련 (Martial Arts Training)"
        style={titleStyle}
        anchor={0.5}
        x={GAME_CONFIG.CANVAS_WIDTH / 2}
        y={80}
      />

      {/* Archetype Display */}
      <Container x={50} y={140}>
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(
              archetypeData?.colors?.primary || KOREAN_COLORS.ACCENT_PRIMARY,
              0.3
            );
            g.drawRoundedRect(0, 0, 300, 100, 8);
            g.endFill();
            g.lineStyle(
              2,
              archetypeData?.colors?.primary || KOREAN_COLORS.ACCENT_PRIMARY
            );
            g.drawRoundedRect(0, 0, 300, 100, 8);
          }}
        />
        <Text
          text={`${archetypeData?.name.korean || selectedArchetype}\n(${
            archetypeData?.name.english || selectedArchetype
          })`}
          style={instructionStyle}
          anchor={0.5}
          x={150}
          y={50}
        />
      </Container>

      {/* Training Mode Selection */}
      <Container x={GAME_CONFIG.CANVAS_WIDTH / 2 - 200} y={260}>
        <BaseButton
          text="기본 자세 (Basics)"
          onClick={() => handleTrainingModeChange("basics")}
          x={0}
          y={0}
          width={130}
          height={50}
          variant={trainingMode === "basics" ? "primary" : "secondary"}
        />

        <BaseButton
          text="기술 연습 (Techniques)"
          onClick={() => handleTrainingModeChange("techniques")}
          x={140}
          y={0}
          width={130}
          height={50}
          variant={trainingMode === "techniques" ? "primary" : "secondary"}
        />

        <BaseButton
          text="급소 공격 (Vital Points)"
          onClick={() => handleTrainingModeChange("vital_points")}
          x={280}
          y={0}
          width={130}
          height={50}
          variant={trainingMode === "vital_points" ? "primary" : "secondary"}
        />
      </Container>

      {/* Trigram Wheel */}
      <PixiTrigramWheel
        currentStance={currentStance}
        onStanceChange={handleStanceChange}
        size={150}
        x={GAME_CONFIG.CANVAS_WIDTH / 2}
        y={GAME_CONFIG.CANVAS_HEIGHT / 2}
      />

      {/* Current Stance Info */}
      <Container
        x={GAME_CONFIG.CANVAS_WIDTH / 2 + 200}
        y={GAME_CONFIG.CANVAS_HEIGHT / 2 - 100}
      >
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            g.beginFill(
              currentStanceData?.theme?.primary || KOREAN_COLORS.ACCENT_PRIMARY,
              0.2
            );
            g.drawRoundedRect(0, 0, 250, 200, 10);
            g.endFill();
            g.lineStyle(
              2,
              currentStanceData?.theme?.primary || KOREAN_COLORS.ACCENT_PRIMARY
            );
            g.drawRoundedRect(0, 0, 250, 200, 10);
          }}
        />

        <KoreanText
          text={{
            korean: currentStanceData?.name.korean || currentStance,
            english: currentStanceData?.name.english || currentStance,
          }}
          style={{
            fontSize: FONT_SIZES.large,
            fill: `#${(
              currentStanceData?.theme?.primary || KOREAN_COLORS.ACCENT_PRIMARY
            ).toString(16)}`,
            textAlign: "center", // Fix: Use textAlign instead of align
          }}
          // Fix: Remove x, y, anchor props - use CSS positioning instead
        />

        <Text
          text={currentStanceData?.philosophy?.korean || "자세 설명"} // Fix: Use philosophy.korean
          style={{
            ...instructionStyle,
            fontSize: FONT_SIZES.small,
            wordWrapWidth: 230,
          }}
          anchor={0.5}
          x={125}
          y={100}
        />

        <Text
          text={`진행도: ${progress}%`}
          style={{
            ...instructionStyle,
            fontSize: FONT_SIZES.medium,
            fill: KOREAN_COLORS.ACCENT_GOLD,
          }}
          anchor={0.5}
          x={125}
          y={160}
        />
      </Container>

      {/* Training Instructions */}
      <Container
        x={GAME_CONFIG.CANVAS_WIDTH / 2}
        y={GAME_CONFIG.CANVAS_HEIGHT - 150}
      >
        <Text
          text={
            trainingMode === "basics"
              ? "1-8번 키로 팔괘 자세를 연습하세요 (Practice trigram stances with 1-8 keys)"
              : trainingMode === "techniques"
              ? "SPACE로 기술을 실행하고 연습하세요 (Execute techniques with SPACE)"
              : "CTRL로 급소 타겟팅을 연습하세요 (Practice vital point targeting with CTRL)"
          }
          style={instructionStyle}
          anchor={0.5}
        />
      </Container>

      {/* Complete Training Button */}
      {progress >= 80 && (
        <BaseButton
          text="수련 완료 (Complete Training)"
          onClick={handleCompleteTraining}
          x={GAME_CONFIG.CANVAS_WIDTH / 2 - 100}
          y={GAME_CONFIG.CANVAS_HEIGHT - 80}
          width={200}
          height={50}
          variant="primary"
        />
      )}
    </Container>
  );
};

export default TrainingScreen;
