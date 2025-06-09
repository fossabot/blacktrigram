import { useMemo, useCallback, useState } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import type {
  CombatControlsProps,
  TrigramStance,
  KoreanTechnique,
} from "../../../types";
// Fix: Import EnumCombatAttackType instead of CombatAttackType
import { EnumCombatAttackType, DamageType } from "../../../types/enums";
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
  onPauseToggle, // Fix: This is required, not optional
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
      name: stanceTechnique.korean,
      koreanName: stanceTechnique.korean,
      englishName: stanceTechnique.english,
      romanized: stanceTechnique.korean,
      description: stanceTechnique.description,
      stance: player.currentStance,
      type: EnumCombatAttackType.STRIKE, // Fix: Use EnumCombatAttackType
      damageType: DamageType.BLUNT,
      damage: stanceTechnique.damage,
      kiCost: stanceTechnique.kiCost,
      staminaCost: stanceTechnique.staminaCost,
      accuracy: stanceTechnique.hitChance,
      range: 1.0,
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

  // Get current stance technique for the player
  const getCurrentTechnique = useCallback((): KoreanTechnique | null => {
    if (!player?.currentStance) return null;

    // Create a basic technique based on current stance
    return {
      id: `${player.currentStance}_basic`,
      name: `${player.currentStance} 기법`,
      koreanName: `${player.currentStance} 기법`,
      englishName: `${player.currentStance} Technique`,
      romanized: `${player.currentStance} gihbeop`,
      description: {
        korean: `${player.currentStance} 자세의 기본 기법`,
        english: `Basic technique for ${player.currentStance} stance`,
      },
      stance: player.currentStance,
      type: EnumCombatAttackType.STRIKE, // Fix: Use EnumCombatAttackType
      damageType: DamageType.BLUNT,
      damage: 20,
      kiCost: 10,
      staminaCost: 15,
      accuracy: 0.8,
      range: 1.0,
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
              onClick={() => handleStanceSelect(stance as TrigramStance)} // Fix: Use onClick instead of onPointerTap
              interactive={!isExecutingTechnique}
            />
          );
        })}
      </Container>

      {/* Available techniques */}
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
            onClick={() => handleTechniqueExecute(tech)} // Fix: Use onClick instead of onPointerTap
            disabled={isExecutingTechnique}
          />
        ))}
      </Container>

      {/* Status indicators */}
      <Container x={width - 200} y={20}>
        <Graphics
          draw={(g: PIXI.Graphics) => {
            g.clear();
            if (player) {
              // Ki indicator
              g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.7);
              g.drawRect(0, 0, (player.ki / player.maxKi) * 180, 15);
              g.endFill();

              // Stamina indicator
              g.beginFill(KOREAN_COLORS.SECONDARY_YELLOW, 0.7);
              g.drawRect(0, 20, (player.stamina / player.maxStamina) * 180, 15);
              g.endFill();
            }
          }}
        />

        <Text
          text={`기 (Ki): ${player?.ki || 0}/${player?.maxKi || 100}`}
          style={
            new PIXI.TextStyle({
              fontSize: FONT_SIZES.small,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontFamily: FONT_FAMILY.PRIMARY,
            })
          }
          y={40}
        />

        <Text
          text={`체력 (Stamina): ${player?.stamina || 0}/${
            player?.maxStamina || 100
          }`}
          style={
            new PIXI.TextStyle({
              fontSize: FONT_SIZES.small,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              fontFamily: FONT_FAMILY.PRIMARY,
            })
          }
          y={55}
        />
      </Container>

      {/* Technique Execution Button - Fix: Pass actual technique */}
      <BaseButton
        text="기술 (Technique)"
        onClick={() => {
          const technique = getCurrentTechnique();
          if (technique) {
            handleTechniqueExecute(technique);
          }
        }}
        x={10}
        y={50}
        width={80}
        height={30}
        interactive={!isExecutingTechnique}
        variant="accent"
        disabled={!getCurrentTechnique() || isExecutingTechnique}
      />

      {/* Attack Button */}
      <BaseButton
        text="공격 (Attack)"
        onClick={onAttack}
        x={10}
        y={10}
        width={80}
        height={30}
        variant={!isExecutingTechnique ? "primary" : "ghost"} // Fix: Use destructured prop
        interactive={true}
        disabled={isExecutingTechnique} // Fix: Use destructured prop
      />

      {/* Guard Button */}
      <Container
        x={10}
        y={90}
        interactive={true}
        buttonMode={true}
        pointertap={() => onGuard?.()} // Fix: Use destructured prop
      >
        <BaseButton
          text="방어 (Guard)"
          onClick={() => onGuard?.()} // Fix: Use destructured prop
          width={80}
          height={30}
          variant="secondary"
        />
      </Container>

      {/* Combat Control Buttons */}
      <Container x={width - 300} y={height - 100}>
        {/* Defend Button */}
        <BaseButton
          text="방어 (Defend)"
          onClick={onDefend}
          x={100}
          y={10}
          width={80}
          height={30}
          variant="secondary"
        />

        {/* Pause Button */}
        <BaseButton
          text={isPaused ? "재개" : "일시정지"}
          onClick={onPauseToggle} // Fix: Remove undefined check
          x={190}
          y={10}
          width={80}
          height={30}
          variant="ghost"
        />

        {/* Stance Info */}
        {player && (
          <Text
            text={`현재 자세: ${player.currentStance}`}
            style={
              new PIXI.TextStyle({
                fontSize: FONT_SIZES.small,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
              })
            }
            x={10}
            y={50}
          />
        )}
      </Container>
    </Container>
  );
};

export default CombatControls;
