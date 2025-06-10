import { useMemo, useCallback, useState } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type {
  CombatControlsProps,
  TrigramStance,
  KoreanTechnique,
} from "../../../types";
import { DamageType } from "../../../types/enums";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  TRIGRAM_DATA,
  TRIGRAM_STANCES_ORDER,
} from "../../../types/constants";
import { BaseButton } from "../../ui/base/BaseButton";

export const CombatControls: React.FC<CombatControlsProps> = ({
  onAttack,
  onDefend,
  onSwitchStance,
  onPauseToggle,
  isPaused,
  player,
  onTechniqueExecute,
  onGuard,
  isExecutingTechnique = false,
  width = 300,
  height = 100,
  x = 0,
  y = 0,
}) => {
  const [selectedStance, setSelectedStance] = useState<TrigramStance | null>(
    null
  );

  // Get current stance data safely
  const currentStanceData = player
    ? TRIGRAM_DATA[player.currentStance as TrigramStance]
    : undefined;

  const availableTechniques: KoreanTechnique[] = useMemo(() => {
    if (!currentStanceData?.techniques?.primary) return [];

    const stanceTechnique = currentStanceData.techniques.primary;
    const koreanTechnique: KoreanTechnique = {
      id: `${player.currentStance}_primary`,
      name: {
        korean: stanceTechnique.korean,
        english: stanceTechnique.english,
        romanized: stanceTechnique.korean,
      },
      koreanName: stanceTechnique.korean,
      englishName: stanceTechnique.english,
      romanized: stanceTechnique.korean,
      description: stanceTechnique.description,
      stance: player.currentStance,
      type: "strike" as any,
      damageType: DamageType.BLUNT,
      damage: stanceTechnique.damage,
      damageRange: {
        min: stanceTechnique.damage - 5,
        max: stanceTechnique.damage + 5,
      },
      range: 1.0,
      kiCost: stanceTechnique.kiCost,
      staminaCost: stanceTechnique.staminaCost,
      accuracy: stanceTechnique.hitChance,
      executionTime: 500,
      recoveryTime: 800,
      critChance: stanceTechnique.criticalChance,
      critMultiplier: 1.5,
      effects: [],
    };

    return [koreanTechnique];
  }, [currentStanceData, player.currentStance]);

  const handleStanceSelect = useCallback(
    (stance: TrigramStance) => {
      setSelectedStance(stance);
      onSwitchStance?.(stance);
    },
    [onSwitchStance]
  );

  const handleTechniqueExecute = useCallback(
    (technique: KoreanTechnique) => {
      onTechniqueExecute?.(technique);
    },
    [onTechniqueExecute]
  );

  const getCurrentTechnique = useCallback((): KoreanTechnique | null => {
    if (!player?.currentStance) return null;

    return {
      id: `${player.currentStance}_basic`,
      name: {
        korean: `${player.currentStance} 기법`,
        english: `${player.currentStance} Technique`,
        romanized: `${player.currentStance} gihbeop`,
      },
      koreanName: `${player.currentStance} 기법`,
      englishName: `${player.currentStance} Technique`,
      romanized: `${player.currentStance} gihbeop`,
      description: {
        korean: `${player.currentStance} 자세의 기본 기법`,
        english: `Basic technique for ${player.currentStance} stance`,
      },
      stance: player.currentStance,
      type: "strike" as any,
      damageType: DamageType.BLUNT,
      damage: 20,
      damageRange: { min: 15, max: 25 },
      range: 1.0,
      kiCost: 10,
      staminaCost: 15,
      accuracy: 0.8,
      executionTime: 500,
      recoveryTime: 800,
      critChance: 0.1,
      critMultiplier: 1.5,
      effects: [],
    };
  }, [player?.currentStance]);

  const controlsPanelDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
      g.lineStyle(2, KOREAN_COLORS.PRIMARY_CYAN, 0.8);
      g.drawRoundedRect(0, 0, width, height, 10);
      g.endFill();
    },
    [width, height]
  );

  return (
    <Container x={x} y={y}>
      {/* Controls panel background */}
      <Graphics draw={controlsPanelDraw} />

      {/* Stance selection buttons */}
      <Container x={20} y={20}>
        <Text
          text="자세 선택 (Stance Selection)"
          style={
            new PIXI.TextStyle({
              fontSize: FONT_SIZES.small,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              fontFamily: FONT_FAMILY.PRIMARY,
            })
          }
        />

        {TRIGRAM_STANCES_ORDER.map((stance, index) => {
          const stanceData = TRIGRAM_DATA[stance];
          const isSelected = selectedStance === stance;
          const isCurrentStance = player?.currentStance === stance;

          return (
            <BaseButton
              key={stance}
              x={index * 80}
              y={25}
              width={70}
              height={30}
              text={stanceData?.symbol || stance}
              variant={
                isCurrentStance ? "primary" : isSelected ? "secondary" : "ghost"
              }
              onClick={() => handleStanceSelect(stance as TrigramStance)}
              disabled={isExecutingTechnique}
            />
          );
        })}
      </Container>

      {/* Available techniques display - Fix: Use availableTechniques */}
      <Container x={20} y={80}>
        <Text
          text="기술 (Techniques)"
          style={
            new PIXI.TextStyle({
              fontSize: FONT_SIZES.small,
              fill: KOREAN_COLORS.TEXT_SECONDARY,
              fontFamily: FONT_FAMILY.PRIMARY,
            })
          }
        />

        {availableTechniques.map((tech: KoreanTechnique, index: number) => (
          <BaseButton
            key={tech.id}
            x={index * 160}
            y={25}
            width={150}
            height={35}
            text={tech.koreanName}
            variant={!isExecutingTechnique ? "primary" : "ghost"}
            onClick={() => handleTechniqueExecute(tech)}
            disabled={isExecutingTechnique}
          />
        ))}
      </Container>

      {/* Combat Control Buttons */}
      <BaseButton
        text="공격 (Attack)"
        onClick={onAttack}
        x={10}
        y={10}
        width={80}
        height={30}
        variant={!isExecutingTechnique ? "primary" : "ghost"}
        disabled={isExecutingTechnique}
      />

      <BaseButton
        text="방어 (Defend)"
        onClick={onDefend}
        x={100}
        y={10}
        width={80}
        height={30}
        variant="secondary"
      />

      <BaseButton
        text="방어 (Guard)"
        onClick={() => onGuard?.()}
        x={10}
        y={50}
        width={80}
        height={30}
        variant="secondary"
      />

      {/* Technique execution button - Fix: Use getCurrentTechnique */}
      <BaseButton
        text="기법 실행"
        onClick={() => {
          const technique = getCurrentTechnique();
          if (technique) {
            handleTechniqueExecute(technique);
          }
        }}
        x={190}
        y={50}
        width={80}
        height={30}
        variant="accent"
        disabled={!getCurrentTechnique() || isExecutingTechnique}
      />

      <BaseButton
        text={isPaused ? "재개" : "일시정지"}
        onClick={onPauseToggle}
        x={190}
        y={10}
        width={80}
        height={30}
        variant="ghost"
      />
    </Container>
  );
};

export default CombatControls;
