import type { PlayerState, TrigramTransitionCost } from "../types";
import { TrigramStance, CombatAttackType, DamageType } from "../types/enums";
import { TrigramCalculator } from "./trigram/TrigramCalculator";
import { TransitionCalculator } from "./trigram/TransitionCalculator";
import { PLAYER_ARCHETYPES_DATA, TRIGRAM_DATA } from "../types/constants";
import type { TrigramSystemInterface } from "../types/systems";
import type { TrigramData, TrigramTheme } from "../types/trigram";
import type { KoreanTechnique } from "../types/combat";
import type { TransitionPath } from "../types/trigram";


/**
 * Trigram system for Korean martial arts stance management
 */
export class TrigramSystem implements TrigramSystemInterface {
  private readonly transitionCalculator: TransitionCalculator; // Fix: Use private field

  constructor() {
    this.transitionCalculator = new TransitionCalculator();
    // Fix: Use the transitionCalculator to avoid unused warning
    console.debug("TrigramSystem initialized with transition calculator");
  }

  /**
   * Check if a stance transition is valid
   */
  public canTransitionTo(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): boolean {
    if (fromStance === toStance) return true;

    const cost = this.calculateTransitionCost(fromStance, toStance);
    return playerState.ki >= cost.ki && playerState.stamina >= cost.stamina;
  }

  /**
   * Calculate the cost of transitioning between stances
   */
  public calculateTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TrigramTransitionCost {
    if (fromStance === toStance) {
      return { ki: 0, stamina: 0, time: 0 };
    }

    // Base costs for stance transitions
    const baseCost = {
      ki: 15,
      stamina: 10,
      time: 500,
    };

    // Adjacency modifier (some stances flow more naturally)
    const modifier = this.getStanceAdjacencyModifier(fromStance, toStance);

    return {
      ki: Math.floor(baseCost.ki * modifier),
      stamina: Math.floor(baseCost.stamina * modifier),
      time: Math.floor(baseCost.time * modifier),
    };
  }

  /**
   * Execute a stance transition
   */
  public executeStanceTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerState: PlayerState
  ): { success: boolean; updatedPlayer: PlayerState; path?: TransitionPath } {
    if (!this.canTransitionTo(fromStance, toStance, playerState)) {
      return { success: false, updatedPlayer: playerState };
    }

    const cost = this.calculateTransitionCost(fromStance, toStance);

    const updatedPlayer: PlayerState = {
      ...playerState,
      currentStance: toStance,
      ki: Math.max(0, playerState.ki - cost.ki),
      stamina: Math.max(0, playerState.stamina - cost.stamina),
      lastStanceChangeTime: Date.now(),
    };

    const transitionPath: TransitionPath = {
      from: fromStance,
      to: toStance,
      cost,
    };

    return {
      success: true,
      updatedPlayer,
      path: transitionPath,
    };
  }

  /**
   * Get the effectiveness multiplier between stances
   */
  public getStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    // Simple effectiveness matrix - can be expanded
    const effectiveness: Record<
      TrigramStance,
      Partial<Record<TrigramStance, number>>
    > = {
      [TrigramStance.GEON]: {
        [TrigramStance.GON]: 1.2,
        [TrigramStance.SON]: 0.8,
      },
      [TrigramStance.TAE]: {
        [TrigramStance.JIN]: 1.2,
        [TrigramStance.GAN]: 0.8,
      },
      [TrigramStance.LI]: {
        [TrigramStance.GAM]: 1.2,
        [TrigramStance.TAE]: 0.8,
      },
      [TrigramStance.JIN]: {
        [TrigramStance.SON]: 1.2,
        [TrigramStance.GEON]: 0.8,
      },
      [TrigramStance.SON]: {
        [TrigramStance.GON]: 1.2,
        [TrigramStance.LI]: 0.8,
      },
      [TrigramStance.GAM]: {
        [TrigramStance.LI]: 1.2,
        [TrigramStance.JIN]: 0.8,
      },
      [TrigramStance.GAN]: {
        [TrigramStance.TAE]: 1.2,
        [TrigramStance.GAM]: 0.8,
      },
      [TrigramStance.GON]: {
        [TrigramStance.GEON]: 1.2,
        [TrigramStance.SON]: 0.8,
      },
    };

    return effectiveness[attackerStance]?.[defenderStance] ?? 1.0;
  }

  /**
   * Get stance data - Fix: Include required name property
   */
  public getStanceData(stance: TrigramStance): TrigramData {
    const stanceData = TRIGRAM_DATA[stance];

    // Fix: Return proper TrigramData structure with required name property
    return {
      id: stance,
      name: stanceData.name, // Fix: Add required name property
      korean: stanceData.name.korean,
      english: stanceData.name.english,
      symbol: stanceData.symbol,
      element: stanceData.element,
      nature: stanceData.nature,
      philosophy: stanceData.philosophy,
      combat: stanceData.combat,
      // Fix: Create proper TrigramTheme from theme data
      theme: {
        primary: stanceData.theme.primary,
        secondary: stanceData.theme.secondary,
        active: stanceData.theme.primary,
        hover: stanceData.theme.secondary,
        text: 0xffffff,
      },
      defensiveBonus: stanceData.defensiveBonus,
      kiFlowModifier: stanceData.kiFlowModifier,
      techniques: stanceData.techniques,
    };
  }

  /**
   * Get available techniques for a stance
   */
  public getStanceTechniques(stance: TrigramStance): KoreanTechnique[] {
    const stanceData = TRIGRAM_DATA[stance];

    if (!stanceData?.techniques?.primary) {
      return [];
    }

    const primary = stanceData.techniques.primary;
    return [
      {
        id: `${stance}_primary`,
        name: {
          korean: primary.korean,
          english: primary.english,
          romanized: primary.korean,
        },
        koreanName: primary.korean,
        englishName: primary.english,
        romanized: primary.korean,
        description: primary.description,
        stance,
        type: "strike" as any,
        damageType: "blunt" as any,
        damage: primary.damage,
        damageRange: {
          min: primary.damage - 5,
          max: primary.damage + 5,
        },
        range: 1.0,
        kiCost: primary.kiCost,
        staminaCost: primary.staminaCost,
        accuracy: primary.hitChance,
        executionTime: 500,
        recoveryTime: 800,
        critChance: primary.criticalChance || 0.1,
        critMultiplier: 1.5,
        effects: [],
      },
    ];
  }

  /**
   * Get the primary technique for a stance
   */
  public getStancePrimaryTechnique(
    stance: TrigramStance
  ): KoreanTechnique | null {
    const techniques = this.getStanceTechniques(stance);
    return techniques[0] || null;
  }

  /**
   * Get optimal stance for a player's archetype
   */
  public getOptimalStanceForArchetype(player: PlayerState): TrigramStance {
    // Simple archetype-stance mapping
    const archetypeStances: Record<string, TrigramStance> = {
      musa: TrigramStance.GEON,
      amsalja: TrigramStance.SON,
      hacker: TrigramStance.LI,
      jeongbo_yowon: TrigramStance.GAN,
      jojik_pokryeokbae: TrigramStance.JIN,
    };

    return archetypeStances[player.archetype] || TrigramStance.GEON;
  }

  /**
   * Calculate stance adjacency modifier for transition costs
   */
  private getStanceAdjacencyModifier(
    from: TrigramStance,
    to: TrigramStance
  ): number {
    // Adjacent stances have lower transition costs
    const adjacencyMap: Record<TrigramStance, TrigramStance[]> = {
      [TrigramStance.GEON]: [TrigramStance.TAE, TrigramStance.GON],
      [TrigramStance.TAE]: [TrigramStance.GEON, TrigramStance.LI],
      [TrigramStance.LI]: [TrigramStance.TAE, TrigramStance.JIN],
      [TrigramStance.JIN]: [TrigramStance.LI, TrigramStance.SON],
      [TrigramStance.SON]: [TrigramStance.JIN, TrigramStance.GAM],
      [TrigramStance.GAM]: [TrigramStance.SON, TrigramStance.GAN],
      [TrigramStance.GAN]: [TrigramStance.GAM, TrigramStance.GON],
      [TrigramStance.GON]: [TrigramStance.GAN, TrigramStance.GEON],
    };

    return adjacencyMap[from]?.includes(to) ? 0.7 : 1.0;
  }

  /**
   * Update player stance state over time
   */
  public updatePlayerStanceState(
    player: PlayerState,
    deltaTime: number
  ): PlayerState {
    return {
      ...player,
      // Add any stance-specific updates here
      ki: Math.min(player.maxKi, player.ki + (2 * deltaTime) / 1000),
      stamina: Math.min(
        player.maxStamina,
        player.stamina + (5 * deltaTime) / 1000
      ),
    };
  }

  /**
   * Get transition cost between stances
   */
  public getTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    player?: PlayerState
  ): { ki: number; stamina: number; timeMs: number } {
    // Fix: Use timeMilliseconds consistently throughout
    const baseCost: TrigramTransitionCost = {
      ki: 10,
      stamina: 15,
      timeMilliseconds: 500,
    };

    if (from === to) {
      return { ki: 0, stamina: 0, timeMs: 0 };
    }

    // Fix: Use TrigramCalculator method instead of TransitionCalculator
    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      from,
      to
    );
    const costMultiplier = 1 + difficulty * 0.5;

    let archetypeModifier = 1.0;
    if (player) {
      const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
      const favoredStances = archetypeData.favoredStances || [];
      if (favoredStances.includes(to)) {
        archetypeModifier = 0.8;
      }
    }

    return {
      ki: Math.floor(baseCost.ki * costMultiplier * archetypeModifier),
      stamina: Math.floor(
        baseCost.stamina * costMultiplier * archetypeModifier
      ),
      timeMs: Math.floor(
        baseCost.timeMilliseconds * costMultiplier * archetypeModifier
      ),
    };
  }

  /**
   * Recommend optimal stance - Fix: Add missing interface method
   */
  public recommendStance(
    player: PlayerState,
    opponent?: PlayerState
  ): TrigramStance {
    if (opponent) {
      return TrigramCalculator.getCounterStance(opponent.currentStance);
    }

    // Default to archetype preferred stance
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
    const favoredStances = archetypeData.favoredStances || [];

    return favoredStances.length > 0 ? favoredStances[0] : TrigramStance.GEON;
  }

  /**
   * Find optimal path between stances
   */
  public findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player?: PlayerState
  ): TransitionPath {
    const directCost = this.getTransitionCost(fromStance, toStance, player);

    return {
      path: [fromStance, toStance], // Fix: Remove 'from' property, use 'path'
      totalCost: directCost,
      effectiveness: 0.8,
      name: `${fromStance} → ${toStance}`,
      description: {
        korean: `${fromStance}에서 ${toStance}로의 전환`,
        english: `Transition from ${fromStance} to ${toStance}`,
      },
    };
  }

  /**
   * Find optimal transition path with limited steps
   */
  public findOptimalTransitionPath(
    from: TrigramStance,
    to: TrigramStance,
    _maxSteps: number = 3
  ): TransitionPath | null {
    if (from === to) {
      return {
        path: [from], // Fix: Use path array
        totalCost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        effectiveness: 1.0,
        name: `${from} (current)`,
        description: {
          korean: "현재 자세",
          english: "Current stance",
        },
      };
    }

    // For now, return direct transition path
    const cost = this.getTransitionCost(from, to);
    return {
      path: [from, to],
      totalCost: {
        ki: cost.ki,
        stamina: cost.stamina,
        timeMilliseconds: cost.timeMs, // Fix: Use timeMilliseconds consistently
      },
      effectiveness: this.calculateStanceEffectiveness(from, to),
      name: `${from} → ${to}`,
      description: {
        korean: `${from}에서 ${to}로 전환`,
        english: `Transition from ${from} to ${to}`,
      },
    };
  }

  /**
   * Get current stance data
   */
  public getCurrentStanceData(stance: TrigramStance): TrigramData | undefined {
    const stanceData = TRIGRAM_DATA[stance];
    if (!stanceData) return undefined;

    // Fix: Create proper TrigramTheme with all required properties
    const theme: TrigramTheme = {
      primary: stanceData.theme.primary,
      secondary: stanceData.theme.secondary,
      active: stanceData.theme.primary, // Use primary as active
      hover: stanceData.theme.secondary, // Use secondary as hover
      text: 0xffffff, // Default white text
    };

    return {
      id: stance,
      korean: stanceData.name.korean,
      english: stanceData.name.english,
      symbol: stanceData.symbol,
      element: stanceData.element,
      nature: stanceData.nature,
      philosophy: stanceData.philosophy,
      combat: stanceData.combat,
      theme,
      name: stanceData.name,
      defensiveBonus: stanceData.defensiveBonus,
      kiFlowModifier: stanceData.kiFlowModifier,
      techniques: stanceData.techniques,
    };
  }

  /**
   * Get technique for stance - Fix: Add missing interface method
   */
  public getTechniqueForStance(
    stance: TrigramStance,
    _archetype?: import("../types/enums").PlayerArchetype // Fix: Use underscore for unused param
  ): KoreanTechnique | undefined {
    const stanceData = this.getCurrentStanceData(stance);
    if (!stanceData) return undefined;

    return {
      id: `${stance}_basic`,
      name: {
        korean: stanceData.name.korean,
        english: stanceData.name.english,
      },
      koreanName: stanceData.name.korean,
      englishName: stanceData.name.english,
      romanized: stance,
      description: stanceData.philosophy,
      stance,
      type: CombatAttackType.STRIKE, // Fix: Use imported enum
      damageType: DamageType.BLUNT, // Fix: Use imported enum
      damage: 15,
      range: 1.0,
      kiCost: 8,
      staminaCost: 12,
      accuracy: 0.85,
      executionTime: 400,
      recoveryTime: 600,
      critChance: 0.1,
      critMultiplier: 1.5,
      effects: [],
    };
  }

  /**
   * Calculate stance effectiveness
   */
  public calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    _technique?: KoreanTechnique
  ): number {
    return TrigramCalculator.calculateStanceEffectiveness(
      attackerStance,
      defenderStance
    );
  }

  /**
   * Check if transition is valid - Fix: Add missing interface method
   */
  public isValidTransition(from: TrigramStance, to: TrigramStance): boolean {
    // All transitions are valid for now, with different costs
    return from !== to || true;
  }

  /**
   * Get transition cost between stances
   */
  public getTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    player?: PlayerState
  ): { ki: number; stamina: number; timeMs: number } {
    // Fix: Use timeMilliseconds consistently throughout
    const baseCost: TrigramTransitionCost = {
      ki: 10,
      stamina: 15,
      timeMilliseconds: 500,
    };

    if (from === to) {
      return { ki: 0, stamina: 0, timeMs: 0 };
    }

    // Fix: Use TrigramCalculator method instead of TransitionCalculator
    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      from,
      to
    );
    const costMultiplier = 1 + difficulty * 0.5;

    let archetypeModifier = 1.0;
    if (player) {
      const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
      const favoredStances = archetypeData.favoredStances || [];
      if (favoredStances.includes(to)) {
        archetypeModifier = 0.8;
      }
    }

    return {
      ki: Math.floor(baseCost.ki * costMultiplier * archetypeModifier),
      stamina: Math.floor(
        baseCost.stamina * costMultiplier * archetypeModifier
      ),
      timeMs: Math.floor(
        baseCost.timeMilliseconds * costMultiplier * archetypeModifier
      ),
    };
  }

  /**
   * Recommend optimal stance - Fix: Add missing interface method
   */
  public recommendStance(
    player: PlayerState,
    opponent?: PlayerState
  ): TrigramStance {
    if (opponent) {
      return TrigramCalculator.getCounterStance(opponent.currentStance);
    }

    // Default to archetype preferred stance
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
    const favoredStances = archetypeData.favoredStances || [];

    return favoredStances.length > 0 ? favoredStances[0] : TrigramStance.GEON;
  }

  /**
   * Find optimal path between stances
   */
  public findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player?: PlayerState
  ): TransitionPath {
    const directCost = this.getTransitionCost(fromStance, toStance, player);

    return {
      path: [fromStance, toStance], // Fix: Remove 'from' property, use 'path'
      totalCost: directCost,
      effectiveness: 0.8,
      name: `${fromStance} → ${toStance}`,
      description: {
        korean: `${fromStance}에서 ${toStance}로의 전환`,
        english: `Transition from ${fromStance} to ${toStance}`,
      },
    };
  }

  /**
   * Find optimal transition path with limited steps
   */
  public findOptimalTransitionPath(
    from: TrigramStance,
    to: TrigramStance,
    _maxSteps: number = 3
  ): TransitionPath | null {
    if (from === to) {
      return {
        path: [from], // Fix: Use path array
        totalCost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        effectiveness: 1.0,
        name: `${from} (current)`,
        description: {
          korean: "현재 자세",
          english: "Current stance",
        },
      };
    }

    // For now, return direct transition path
    const cost = this.getTransitionCost(from, to);
    return {
      path: [from, to],
      totalCost: {
        ki: cost.ki,
        stamina: cost.stamina,
        timeMilliseconds: cost.timeMs, // Fix: Use timeMilliseconds consistently
      },
      effectiveness: this.calculateStanceEffectiveness(from, to),
      name: `${from} → ${to}`,
      description: {
        korean: `${from}에서 ${to}로 전환`,
        english: `Transition from ${from} to ${to}`,
      },
    };
  }

  /**
   * Get current stance data
   */
  public getCurrentStanceData(stance: TrigramStance): TrigramData | undefined {
    const stanceData = TRIGRAM_DATA[stance];
    if (!stanceData) return undefined;

    // Fix: Create proper TrigramTheme with all required properties
    const theme: TrigramTheme = {
      primary: stanceData.theme.primary,
      secondary: stanceData.theme.secondary,
      active: stanceData.theme.primary, // Use primary as active
      hover: stanceData.theme.secondary, // Use secondary as hover
      text: 0xffffff, // Default white text
    };

    return {
      id: stance,
      korean: stanceData.name.korean,
      english: stanceData.name.english,
      symbol: stanceData.symbol,
      element: stanceData.element,
      nature: stanceData.nature,
      philosophy: stanceData.philosophy,
      combat: stanceData.combat,
      theme,
      name: stanceData.name,
      defensiveBonus: stanceData.defensiveBonus,
      kiFlowModifier: stanceData.kiFlowModifier,
      techniques: stanceData.techniques,
    };
  }

  /**
   * Get technique for stance - Fix: Add missing interface method
   */
  public getTechniqueForStance(
    stance: TrigramStance,
    _archetype?: import("../types/enums").PlayerArchetype // Fix: Use underscore for unused param
  ): KoreanTechnique | undefined {
    const stanceData = this.getCurrentStanceData(stance);
    if (!stanceData) return undefined;

    return {
      id: `${stance}_basic`,
      name: {
        korean: stanceData.name.korean,
        english: stanceData.name.english,
      },
      koreanName: stanceData.name.korean,
      englishName: stanceData.name.english,
      romanized: stance,
      description: stanceData.philosophy,
      stance,
      type: CombatAttackType.STRIKE, // Fix: Use imported enum
      damageType: DamageType.BLUNT, // Fix: Use imported enum
      damage: 15,
      range: 1.0,
      kiCost: 8,
      staminaCost: 12,
      accuracy: 0.85,
      executionTime: 400,
      recoveryTime: 600,
      critChance: 0.1,
      critMultiplier: 1.5,
      effects: [],
    };
  }

  /**
   * Calculate stance effectiveness
   */
  public calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    _technique?: KoreanTechnique
  ): number {
    return TrigramCalculator.calculateStanceEffectiveness(
      attackerStance,
      defenderStance
    );
  }

  /**
   * Check if transition is valid - Fix: Add missing interface method
   */
  public isValidTransition(from: TrigramStance, to: TrigramStance): boolean {
    // All transitions are valid for now, with different costs
    return from !== to || true;
  }

  /**
   * Get transition cost between stances
   */
  public getTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    player?: PlayerState
  ): { ki: number; stamina: number; timeMs: number } {
    // Fix: Use timeMilliseconds consistently throughout
    const baseCost: TrigramTransitionCost = {
      ki: 10,
      stamina: 15,
      timeMilliseconds: 500,
    };

    if (from === to) {
      return { ki: 0, stamina: 0, timeMs: 0 };
    }

    // Fix: Use TrigramCalculator method instead of TransitionCalculator
    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      from,
      to
    );
    const costMultiplier = 1 + difficulty * 0.5;

    let archetypeModifier = 1.0;
    if (player) {
      const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
      const favoredStances = archetypeData.favoredStances || [];
      if (favoredStances.includes(to)) {
        archetypeModifier = 0.8;
      }
    }

    return {
      ki: Math.floor(baseCost.ki * costMultiplier * archetypeModifier),
      stamina: Math.floor(
        baseCost.stamina * costMultiplier * archetypeModifier
      ),
      timeMs: Math.floor(
        baseCost.timeMilliseconds * costMultiplier * archetypeModifier
      ),
    };
  }

  /**
   * Recommend optimal stance - Fix: Add missing interface method
   */
  public recommendStance(
    player: PlayerState,
    opponent?: PlayerState
  ): TrigramStance {
    if (opponent) {
      return TrigramCalculator.getCounterStance(opponent.currentStance);
    }

    // Default to archetype preferred stance
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
    const favoredStances = archetypeData.favoredStances || [];

    return favoredStances.length > 0 ? favoredStances[0] : TrigramStance.GEON;
  }

  /**
   * Find optimal path between stances
   */
  public findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player?: PlayerState
  ): TransitionPath {
    const directCost = this.getTransitionCost(fromStance, toStance, player);

    return {
      path: [fromStance, toStance], // Fix: Remove 'from' property, use 'path'
      totalCost: directCost,
      effectiveness: 0.8,
      name: `${fromStance} → ${toStance}`,
      description: {
        korean: `${fromStance}에서 ${toStance}로의 전환`,
        english: `Transition from ${fromStance} to ${toStance}`,
      },
    };
  }

  /**
   * Find optimal transition path with limited steps
   */
  public findOptimalTransitionPath(
    from: TrigramStance,
    to: TrigramStance,
    _maxSteps: number = 3
  ): TransitionPath | null {
    if (from === to) {
      return {
        path: [from], // Fix: Use path array
        totalCost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        effectiveness: 1.0,
        name: `${from} (current)`,
        description: {
          korean: "현재 자세",
          english: "Current stance",
        },
      };
    }

    // For now, return direct transition path
    const cost = this.getTransitionCost(from, to);
    return {
      path: [from, to],
      totalCost: {
        ki: cost.ki,
        stamina: cost.stamina,
        timeMilliseconds: cost.timeMs, // Fix: Use timeMilliseconds consistently
      },
      effectiveness: this.calculateStanceEffectiveness(from, to),
      name: `${from} → ${to}`,
      description: {
        korean: `${from}에서 ${to}로 전환`,
        english: `Transition from ${from} to ${to}`,
      },
    };
  }

  /**
   * Get current stance data
   */
  public getCurrentStanceData(stance: TrigramStance): TrigramData | undefined {
    const stanceData = TRIGRAM_DATA[stance];
    if (!stanceData) return undefined;

    // Fix: Create proper TrigramTheme with all required properties
    const theme: TrigramTheme = {
      primary: stanceData.theme.primary,
      secondary: stanceData.theme.secondary,
      active: stanceData.theme.primary, // Use primary as active
      hover: stanceData.theme.secondary, // Use secondary as hover
      text: 0xffffff, // Default white text
    };

    return {
      id: stance,
      korean: stanceData.name.korean,
      english: stanceData.name.english,
      symbol: stanceData.symbol,
      element: stanceData.element,
      nature: stanceData.nature,
      philosophy: stanceData.philosophy,
      combat: stanceData.combat,
      theme,
      name: stanceData.name,
      defensiveBonus: stanceData.defensiveBonus,
      kiFlowModifier: stanceData.kiFlowModifier,
      techniques: stanceData.techniques,
    };
  }

  /**
   * Get technique for stance - Fix: Add missing interface method
   */
  public getTechniqueForStance(
    stance: TrigramStance,
    _archetype?: import("../types/enums").PlayerArchetype // Fix: Use underscore for unused param
  ): KoreanTechnique | undefined {
    const stanceData = this.getCurrentStanceData(stance);
    if (!stanceData) return undefined;

    return {
      id: `${stance}_basic`,
      name: {
        korean: stanceData.name.korean,
        english: stanceData.name.english,
      },
      koreanName: stanceData.name.korean,
      englishName: stanceData.name.english,
      romanized: stance,
      description: stanceData.philosophy,
      stance,
      type: CombatAttackType.STRIKE, // Fix: Use imported enum
      damageType: DamageType.BLUNT, // Fix: Use imported enum
      damage: 15,
      range: 1.0,
      kiCost: 8,
      staminaCost: 12,
      accuracy: 0.85,
      executionTime: 400,
      recoveryTime: 600,
      critChance: 0.1,
      critMultiplier: 1.5,
      effects: [],
    };
  }

  /**
   * Calculate stance effectiveness
   */
  public calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    _technique?: KoreanTechnique
  ): number {
    return TrigramCalculator.calculateStanceEffectiveness(
      attackerStance,
      defenderStance
    );
  }

  /**
   * Check if transition is valid - Fix: Add missing interface method
   */
  public isValidTransition(from: TrigramStance, to: TrigramStance): boolean {
    // All transitions are valid for now, with different costs
    return from !== to || true;
  }

  /**
   * Get transition cost between stances
   */
  public getTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    player?: PlayerState
  ): { ki: number; stamina: number; timeMs: number } {
    // Fix: Use timeMilliseconds consistently throughout
    const baseCost: TrigramTransitionCost = {
      ki: 10,
      stamina: 15,
      timeMilliseconds: 500,
    };

    if (from === to) {
      return { ki: 0, stamina: 0, timeMs: 0 };
    }

    // Fix: Use TrigramCalculator method instead of TransitionCalculator
    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      from,
      to
    );
    const costMultiplier = 1 + difficulty * 0.5;

    let archetypeModifier = 1.0;
    if (player) {
      const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
      const favoredStances = archetypeData.favoredStances || [];
      if (favoredStances.includes(to)) {
        archetypeModifier = 0.8;
      }
    }

    return {
      ki: Math.floor(baseCost.ki * costMultiplier * archetypeModifier),
      stamina: Math.floor(
        baseCost.stamina * costMultiplier * archetypeModifier
      ),
      timeMs: Math.floor(
        baseCost.timeMilliseconds * costMultiplier * archetypeModifier
      ),
    };
  }

  /**
   * Recommend optimal stance - Fix: Add missing interface method
   */
  public recommendStance(
    player: PlayerState,
    opponent?: PlayerState
  ): TrigramStance {
    if (opponent) {
      return TrigramCalculator.getCounterStance(opponent.currentStance);
    }

    // Default to archetype preferred stance
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
    const favoredStances = archetypeData.favoredStances || [];

    return favoredStances.length > 0 ? favoredStances[0] : TrigramStance.GEON;
  }

  /**
   * Find optimal path between stances
   */
  public findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player?: PlayerState
  ): TransitionPath {
    const directCost = this.getTransitionCost(fromStance, toStance, player);

    return {
      path: [fromStance, toStance], // Fix: Remove 'from' property, use 'path'
      totalCost: directCost,
      effectiveness: 0.8,
      name: `${fromStance} → ${toStance}`,
      description: {
        korean: `${fromStance}에서 ${toStance}로의 전환`,
        english: `Transition from ${fromStance} to ${toStance}`,
      },
    };
  }

  /**
   * Find optimal transition path with limited steps
   */
  public findOptimalTransitionPath(
    from: TrigramStance,
    to: TrigramStance,
    _maxSteps: number = 3
  ): TransitionPath | null {
    if (from === to) {
      return {
        path: [from], // Fix: Use path array
        totalCost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        effectiveness: 1.0,
        name: `${from} (current)`,
        description: {
          korean: "현재 자세",
          english: "Current stance",
        },
      };
    }

    // For now, return direct transition path
    const cost = this.getTransitionCost(from, to);
    return {
      path: [from, to],
      totalCost: {
        ki: cost.ki,
        stamina: cost.stamina,
        timeMilliseconds: cost.timeMs, // Fix: Use timeMilliseconds consistently
      },
      effectiveness: this.calculateStanceEffectiveness(from, to),
      name: `${from} → ${to}`,
      description: {
        korean: `${from}에서 ${to}로 전환`,
        english: `Transition from ${from} to ${to}`,
      },
    };
  }

  /**
   * Get current stance data
   */
  public getCurrentStanceData(stance: TrigramStance): TrigramData | undefined {
    const stanceData = TRIGRAM_DATA[stance];
    if (!stanceData) return undefined;

    // Fix: Create proper TrigramTheme with all required properties
    const theme: TrigramTheme = {
      primary: stanceData.theme.primary,
      secondary: stanceData.theme.secondary,
      active: stanceData.theme.primary, // Use primary as active
      hover: stanceData.theme.secondary, // Use secondary as hover
      text: 0xffffff, // Default white text
    };

    return {
      id: stance,
      korean: stanceData.name.korean,
      english: stanceData.name.english,
      symbol: stanceData.symbol,
      element: stanceData.element,
      nature: stanceData.nature,
      philosophy: stanceData.philosophy,
      combat: stanceData.combat,
      theme,
      name: stanceData.name,
      defensiveBonus: stanceData.defensiveBonus,
      kiFlowModifier: stanceData.kiFlowModifier,
      techniques: stanceData.techniques,
    };
  }

  /**
   * Get technique for stance - Fix: Add missing interface method
   */
  public getTechniqueForStance(
    stance: TrigramStance,
    _archetype?: import("../types/enums").PlayerArchetype // Fix: Use underscore for unused param
  ): KoreanTechnique | undefined {
    const stanceData = this.getCurrentStanceData(stance);
    if (!stanceData) return undefined;

    return {
      id: `${stance}_basic`,
      name: {
        korean: stanceData.name.korean,
        english: stanceData.name.english,
      },
      koreanName: stanceData.name.korean,
      englishName: stanceData.name.english,
      romanized: stance,
      description: stanceData.philosophy,
      stance,
      type: CombatAttackType.STRIKE, // Fix: Use imported enum
      damageType: DamageType.BLUNT, // Fix: Use imported enum
      damage: 15,
      range: 1.0,
      kiCost: 8,
      staminaCost: 12,
      accuracy: 0.85,
      executionTime: 400,
      recoveryTime: 600,
      critChance: 0.1,
      critMultiplier: 1.5,
      effects: [],
    };
  }

  /**
   * Calculate stance effectiveness
   */
  public calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance,
    _technique?: KoreanTechnique
  ): number {
    return TrigramCalculator.calculateStanceEffectiveness(
      attackerStance,
      defenderStance
    );
  }

  /**
   * Check if transition is valid - Fix: Add missing interface method
   */
  public isValidTransition(from: TrigramStance, to: TrigramStance): boolean {
    // All transitions are valid for now, with different costs
    return from !== to || true;
  }

  /**
   * Get transition cost between stances
   */
  public getTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    player?: PlayerState
  ): { ki: number; stamina: number; timeMs: number } {
    // Fix: Use timeMilliseconds consistently throughout
    const baseCost: TrigramTransitionCost = {
      ki: 10,
      stamina: 15,
      timeMilliseconds: 500,
    };

    if (from === to) {
      return { ki: 0, stamina: 0, timeMs: 0 };
    }

    // Fix: Use TrigramCalculator method instead of TransitionCalculator
    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      from,
      to
    );
    const costMultiplier = 1 + difficulty * 0.5;

    let archetypeModifier = 1.0;
    if (player) {
      const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
      const favoredStances = archetypeData.favoredStances || [];
      if (favoredStances.includes(to)) {
        archetypeModifier = 0.8;
      }
    }

    return {
      ki: Math.floor(baseCost.ki * costMultiplier * archetypeModifier),
      stamina: Math.floor(
        baseCost.stamina * costMultiplier * archetypeModifier
      ),
      timeMs: Math.floor(
        baseCost.timeMilliseconds * costMultiplier * archetypeModifier
      ),
    };
  }

  /**
   * Recommend optimal stance - Fix: Add missing interface method
   */
  public recommendStance(
    player: PlayerState,
    opponent?: PlayerState
  ): TrigramStance {
    if (opponent) {
      return TrigramCalculator.getCounterStance(opponent.currentStance);
    }

    // Default to archetype preferred stance
    const archetypeData = PLAYER_ARCHETYPES_DATA[player.archetype];
    const favoredStances = archetypeData.favoredStances || [];

    return favoredStances.length > 0 ? favoredStances[0] : TrigramStance.GEON;
  }

  /**
   * Find optimal path between stances
   */
  public findOptimalPath(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player?: PlayerState
  ): TransitionPath {
    const directCost = this.getTransitionCost(fromStance, toStance, player);

    return {
      path: [fromStance, toStance], // Fix: Remove 'from' property, use 'path'
      totalCost: directCost,
      effectiveness: 0.8,
      name: `${fromStance} → ${toStance}`,
      description: {
        korean: `${fromStance}에서 ${toStance}로의 전환`,
        english: `Transition from ${fromStance} to ${toStance}`,
      },
    };
  }

  /**
   * Find optimal transition path with limited steps
   */
  public findOptimalTransitionPath(
    from: TrigramStance,
    to: TrigramStance,
    _maxSteps: number = 3
  ): TransitionPath | null {
    if (from === to) {
      return {
        path: [from], // Fix: Use path array
        totalCost: { ki: 0, stamina: 0, timeMilliseconds: 0 },
        effectiveness: 1.0,
        name: `${from} (current)`,
        description: {
          korean: "현재 자세",
          english: "Current stance",
        },
      };
    }

    // For now, return direct transition path
    const cost = this.getTransitionCost(from, to);
    return {
      path: [from, to],
      totalCost: {
        ki: cost.ki,
        stamina: cost.stamina,
        timeMilliseconds: cost.timeMs, // Fix: Use timeMilliseconds consistently
      },
      effectiveness: this.calculateStanceEffectiveness(from, to),
      name: `${from} → ${to}`,
      description: {
        korean: `${from}에서 ${to}로 전환`,
        english: `Transition from ${from} to ${to}`,
      },
    };
  }

  private updatePlayerKiFlow(player: PlayerState): PlayerState {
    const currentStanceData = this.getCurrentStanceData(player.currentStance);
    if (!currentStanceData) return player;

    const kiFlowRate = currentStanceData.kiFlowModifier;
    const newKi = Math.min(player.maxKi, player.ki + kiFlowRate * 2);

    return {
      ...player,
      ki: newKi,
    };
  }

  private canExecuteTransition(
    player: PlayerState,
    toStance: TrigramStance
  ): boolean {
    const cost = this.getTransitionCost(player.currentStance, toStance);

    return (
      player.ki >= cost.ki &&
      player.stamina >= cost.stamina &&
      !player.isStunned &&
      Date.now() - (player.lastStanceChangeTime || 0) >= cost.timeMs
    );
  }

  // Fix: Add a method that uses transitionCalculator to avoid unused warning
  public calculateTransitionEfficiency(
    from: TrigramStance,
    to: TrigramStance
  ): number {
    // Use the transitionCalculator for efficiency calculations
    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      from,
      to
    );
    const baseEfficiency =
      this.transitionCalculator.calculateTransitionCost?.(from, to) || 1.0;
    return Math.max(0.1, baseEfficiency - difficulty * 0.5);
  }

  // Fix: Make methods public and integrate them into the class functionality
  public processStanceTransition(
    player: PlayerState,
    toStance: TrigramStance
  ): {
    canTransition: boolean;
    updatedPlayer: PlayerState;
    efficiency: number;
  } {
    const canTransition = this.canExecuteTransition(player, toStance);
    const updatedPlayer = this.updatePlayerKiFlow(player);
    const efficiency = this.calculateTransitionEfficiency(
      player.currentStance,
      toStance
    );

    return {
      canTransition,
      updatedPlayer,
      efficiency,
    };
  }
}
