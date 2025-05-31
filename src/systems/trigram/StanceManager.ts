import type {
  TrigramStance,
  PlayerState,
  KiFlowFactors,
  TransitionMetrics,
  StanceState,
  StanceTransition,
  StanceRecommendation,
  TransitionResult,
  StanceAnalysis,
} from "../../types";
import {
  TRIGRAM_DATA,
  STANCE_EFFECTIVENESS_MATRIX,
  TRIGRAM_STANCES_ORDER,
} from "../../types";
import { TransitionCalculator } from "./TransitionCalculator";

/**
 * Korean Martial Arts Stance Manager
 * Manages trigram stance transitions, ki flow, and combat effectiveness
 * Based on traditional I-Ching philosophy and Korean martial arts principles
 */

// Export for tests
export const STANCE_ORDER = TRIGRAM_STANCES_ORDER;

export class StanceManager {
  private playerStances = new Map<string, StanceState>();
  private activeTransitions = new Map<string, StanceTransition>();
  private transitionHistory: Array<{
    playerId: string;
    from: TrigramStance;
    to: TrigramStance;
    timestamp: number;
  }> = [];

  // Static helper methods
  public static getPlayerLevelModifier(playerLevel: number = 1): number {
    return Math.min(2.0, 1.0 + (playerLevel - 1) * 0.1);
  }

  public static getStanceAffinity(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    if (fromStance === toStance) return 1.0;

    const distance = this.calculateStanceDistance(fromStance, toStance);
    return Math.max(0.5, 1.0 - (distance - 1) * 0.2);
  }

  public static calculateKiFlow(
    stance: TrigramStance,
    factors: KiFlowFactors
  ): number {
    const baseFlow = TRIGRAM_DATA[stance].kiRegenRate || 1.0;
    const playerModifier = factors.playerLevelModifier || 1.0;
    const affinityModifier = factors.stanceAffinity || 1.0;

    return baseFlow * playerModifier * affinityModifier;
  }

  /**
   * Execute transition for player with proper return type
   */
  public executeTransition(
    player: PlayerState,
    newStance: TrigramStance
  ): TransitionResult {
    if (!this.canTransition(player, newStance)) {
      return {
        success: false,
        message: "Cannot transition to stance",
        transitionData: {
          success: false,
          reason: player.conditions.some((c) => c.type === "stun")
            ? "Cannot change stance while stunned"
            : "Insufficient resources or invalid transition",
        },
        updatedPlayer: player,
      };
    }

    const transition = StanceManager.calculateTransition(
      player.stance,
      newStance
    );

    // Create updated player state
    const updatedPlayer: PlayerState = {
      ...player,
      stance: newStance,
      ki: player.ki - transition.kiCost,
      stamina: player.stamina - transition.staminaCost,
      lastStanceChangeTime: Date.now(),
    };

    // Record transition
    this.transitionHistory.push({
      playerId: player.playerId,
      from: player.stance,
      to: newStance,
      timestamp: Date.now(),
    });

    return {
      success: true,
      message: "Stance transition successful",
      transitionData: {
        success: true,
        cost: transition.kiCost + transition.staminaCost,
      },
      updatedPlayer,
    };
  }

  /**
   * Get stance analysis between attacker and defender
   */
  public getStanceAnalysis(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): StanceAnalysis {
    const advantage = StanceManager.calculateStanceAdvantage(
      attackerStance,
      defenderStance
    );

    let recommendation = "";
    let effectiveness = advantage;

    if (advantage > 1.2) {
      recommendation = "Strong advantage - continue with current stance";
    } else if (advantage < 0.8) {
      const counter = StanceManager.getCounterStance(defenderStance);
      recommendation = `Consider switching to ${counter} for advantage`;
    } else {
      recommendation = "Neutral matchup - maintain current strategy";
    }

    return {
      advantage,
      effectiveness,
      recommendation,
      counterStances: [StanceManager.getCounterStance(defenderStance)],
    };
  }

  /**
   * Get optimal stance recommendation with proper return type
   */
  public getOptimalStance(
    currentStance: TrigramStance,
    targetStance: TrigramStance,
    playerState: PlayerState
  ): StanceRecommendation {
    const efficient =
      StanceManager.getStancesByTransitionEfficiency(currentStance);

    // Find stance that can counter target and is accessible
    for (const stance of efficient) {
      if (this.canTransition(playerState, stance)) {
        const advantage = StanceManager.calculateStanceAdvantage(
          stance,
          targetStance
        );
        if (advantage >= 1.1) {
          return {
            recommendedStance: stance,
            reason: `${stance} provides advantage against ${targetStance}`,
            confidence: Math.min(1.0, advantage),
            alternatives: efficient.slice(0, 3),
          };
        }
      }
    }

    return {
      recommendedStance: currentStance,
      reason:
        playerState.ki < 10 || playerState.stamina < 10
          ? "No available transitions - insufficient resources"
          : "Stay in current stance - no clear advantage available",
      confidence: 0.5,
    };
  }

  /**
   * Initialize stance state for a player
   */
  public initializePlayer(
    playerId: string,
    initialStance: TrigramStance = "geon"
  ): void {
    this.playerStances.set(playerId, {
      current: initialStance,
      previous: null,
      timeInStance: 0,
      lastTransitionTime: Date.now(),
      stability: 1.0,
      mastery: 0.5,
      kiFlow: TRIGRAM_DATA[initialStance].kiRegenRate || 1.0,
    });

    // Initialize mastery data
    if (!this.stanceMasteryData.has(playerId)) {
      const masteryMap = new Map<TrigramStance, number>();
      Object.keys(TRIGRAM_DATA).forEach((stance) => {
        masteryMap.set(stance as TrigramStance, 0.1);
      });
      this.stanceMasteryData.set(playerId, masteryMap);
    }
  }

  /**
   * Request stance transition with validation and timing
   */
  public requestStanceChange(
    playerId: string,
    newStance: TrigramStance,
    playerState: PlayerState
  ): {
    success: boolean;
    reason: string;
    transitionTime: number;
    cost: TransitionMetrics;
  } {
    const currentState = this.playerStances.get(playerId);
    if (!currentState) {
      return {
        success: false,
        reason: "Player not initialized",
        transitionTime: 0,
        cost: {
          staminaCost: 0,
          kiCost: 0,
          timeDelay: 0,
          effectiveness: 0,
        },
      };
    }

    // Check if already transitioning
    if (this.activeTransitions.has(playerId)) {
      return {
        success: false,
        reason: "이미 자세 전환 중 (Already transitioning)",
        transitionTime: 0,
        cost: {
          staminaCost: 0,
          kiCost: 0,
          timeDelay: 0,
          effectiveness: 0,
        },
      };
    }

    // Calculate transition cost
    const transitionCost = TransitionCalculator.calculateTransition(
      currentState.current,
      newStance,
      {
        playerLevelModifier: this.getPlayerLevelModifier(playerId),
        stanceAffinity: this.getStanceAffinity(playerId, newStance),
        timeInStance: currentState.timeInStance,
      }
    );

    // Check resource availability
    if (playerState.ki < transitionCost.kiCost) {
      return {
        success: false,
        reason: "기력 부족 (Insufficient ki)",
        transitionTime: 0,
        cost: transitionCost,
      };
    }

    if (playerState.stamina < transitionCost.staminaCost) {
      return {
        success: false,
        reason: "체력 부족 (Insufficient stamina)",
        transitionTime: 0,
        cost: transitionCost,
      };
    }

    // Start transition
    this.startTransition(
      playerId,
      currentState.current,
      newStance,
      transitionCost.timeDelay
    );

    return {
      success: true,
      reason: "자세 전환 시작 (Transition started)",
      transitionTime: transitionCost.timeDelay,
      cost: transitionCost,
    };
  }

  /**
   * Check if player can transition to target stance
   */
  public static canTransitionToStance(
    player: PlayerState,
    targetStance: TrigramStance
  ): boolean {
    // Can't transition to same stance
    if (player.stance === targetStance) {
      return false;
    }

    // Calculate transition costs
    const transitionMetrics = TransitionCalculator.calculateTransition(
      player.stance,
      targetStance,
      {
        playerLevelModifier: 1.0,
        stanceAffinity: 1.0,
      }
    );

    // Check if player has enough resources
    const hasStamina = player.stamina >= transitionMetrics.staminaCost;
    const hasKi = player.ki >= transitionMetrics.kiCost;

    return hasStamina && hasKi;
  }

  /**
   * Execute stance transition with validation and cost application
   */
  public static executeStanceTransition(
    player: PlayerState,
    targetStance: TrigramStance,
    forceTransition: boolean = false
  ): {
    success: boolean;
    newPlayerState: PlayerState;
    transitionMetrics: TransitionMetrics;
    message: string;
  } {
    // Validate transition is possible
    if (!this.canTransitionToStance(player, targetStance) && !forceTransition) {
      return {
        success: false,
        newPlayerState: player,
        transitionMetrics: {
          staminaCost: 0,
          kiCost: 0,
          timeDelay: 0,
          effectiveness: 0,
        },
        message: `Cannot transition to ${targetStance}: insufficient resources`,
      };
    }

    // Calculate transition costs
    const currentTime = Date.now();

    // Fix: Remove invalid timeInStance property
    const transitionMetrics = TransitionCalculator.calculateTransition(
      player.stance,
      targetStance,
      {
        playerLevelModifier: 1.0 + (player.ki / player.maxKi) * 0.2,
        stanceAffinity: 1.0,
      }
    );

    // Apply costs and update player state
    const newPlayerState: PlayerState = {
      ...player,
      stance: targetStance,
      stamina: Math.max(0, player.stamina - transitionMetrics.staminaCost),
      ki: Math.max(0, player.ki - transitionMetrics.kiCost),
      lastStanceChangeTime: currentTime,
    };

    return {
      success: true,
      newPlayerState,
      transitionMetrics,
      message: `Successfully transitioned to ${targetStance}`,
    };
  }

  /**
   * Update stance states and transitions
   */
  public update(deltaTime: number): void {
    const currentTime = Date.now();

    // Update stance times
    this.playerStances.forEach((state, playerId) => {
      if (!this.activeTransitions.has(playerId)) {
        const updatedState = {
          ...state,
          timeInStance: state.timeInStance + deltaTime,
          stability: this.calculateStanceStability(state, deltaTime),
          kiFlow: this.calculateKiFlow(playerId, state.current),
        };
        this.playerStances.set(playerId, updatedState);
      }
    });

    // Update active transitions
    this.activeTransitions.forEach((transition, playerId) => {
      const elapsed = currentTime - transition.startTime;
      const progress = Math.min(1.0, elapsed / transition.duration);

      if (progress >= 1.0) {
        // Complete transition
        this.completeTransition(playerId, transition.to);
      } else {
        // Update transition progress
        this.activeTransitions.set(playerId, {
          ...transition,
          progress,
        });
      }
    });
  }

  /**
   * Get current stance state for a player
   */
  public getStanceState(playerId: string): StanceState | null {
    return this.playerStances.get(playerId) || null;
  }

  /**
   * Get active transition for a player
   */
  public getActiveTransition(playerId: string): StanceTransition | null {
    return this.activeTransitions.get(playerId) || null;
  }

  /**
   * Calculate stance effectiveness based on current state
   */
  public calculateStanceEffectiveness(
    playerId: string,
    opponentStance: TrigramStance
  ): number {
    const state = this.playerStances.get(playerId);
    if (!state) return 0.5;

    // Base effectiveness from stance matrix
    const stanceMatrix = STANCE_EFFECTIVENESS_MATRIX[state.current];
    const baseEffectiveness = stanceMatrix?.[opponentStance] ?? 1.0;

    // Modifiers
    const stabilityBonus = state.stability * 0.2;
    const masteryBonus = state.mastery * 0.3;
    const timeBonus = Math.min(0.2, state.timeInStance / 10000); // 10 second max

    return Math.min(
      1.5,
      baseEffectiveness + stabilityBonus + masteryBonus + timeBonus
    );
  }

  /**
   * Get stance mastery level for a player
   */
  public getStanceMastery(playerId: string, stance: TrigramStance): number {
    const masteryMap = this.stanceMasteryData.get(playerId);
    return masteryMap?.get(stance) || 0.1;
  }

  /**
   * Increase stance mastery through practice
   */
  public increaseMastery(
    playerId: string,
    stance: TrigramStance,
    practiceAmount: number = 0.01
  ): void {
    const masteryMap = this.stanceMasteryData.get(playerId);
    if (masteryMap) {
      const currentMastery = masteryMap.get(stance) || 0.1;
      const newMastery = Math.min(1.0, currentMastery + practiceAmount);
      masteryMap.set(stance, newMastery);
    }
  }

  /**
   * Get stance recommendations based on combat situation
   */
  public getStanceRecommendations(
    playerId: string,
    opponentStance: TrigramStance,
    playerKi: number,
    playerStamina: number,
    context: "offensive" | "defensive" | "balanced" = "balanced"
  ): Array<{
    stance: TrigramStance;
    effectiveness: number;
    transitionCost: TransitionMetrics;
    reason: string;
  }> {
    const currentState = this.playerStances.get(playerId);
    if (!currentState) return [];

    const allStances: TrigramStance[] = [
      "geon",
      "tae",
      "li",
      "jin",
      "son",
      "gam",
      "gan",
      "gon",
    ];

    const recommendations = allStances
      .filter((stance) => stance !== currentState.current)
      .map((stance) => {
        const transitionCost = TransitionCalculator.calculateTransition(
          currentState.current,
          stance,
          {
            playerLevelModifier: this.getPlayerLevelModifier(playerId),
            stanceAffinity: this.getStanceAffinity(playerId, stance),
          }
        );

        const stanceData = TRIGRAM_DATA[stance];
        const stanceMatrix = STANCE_EFFECTIVENESS_MATRIX[stance];
        const effectiveness = stanceMatrix?.[opponentStance] ?? 1.0;

        // Context-specific scoring
        let contextScore = 1.0;
        let reason = `${stanceData.koreanName} provides`;

        switch (context) {
          case "offensive":
            contextScore = stanceData.damageModifier || 1.0;
            reason += " 공격적 우위 (offensive advantage)";
            break;
          case "defensive":
            contextScore = stanceData.defenseModifier || 1.0;
            reason += " 방어적 강점 (defensive strength)";
            break;
          case "balanced":
            contextScore =
              ((stanceData.damageModifier || 1.0) +
                (stanceData.defenseModifier || 1.0)) /
              2;
            reason += " 균형잡힌 접근 (balanced approach)";
            break;
        }

        // Resource feasibility
        const canAfford =
          playerKi >= transitionCost.kiCost &&
          playerStamina >= transitionCost.staminaCost;

        if (!canAfford) {
          reason += " (자원 부족 - resource limited)";
        }

        return {
          stance,
          effectiveness:
            effectiveness * contextScore * transitionCost.effectiveness,
          transitionCost,
          reason,
        };
      })
      .sort((a, b) => b.effectiveness - a.effectiveness);

    return recommendations.slice(0, 3);
  }

  /**
   * Start a stance transition
   */
  private startTransition(
    playerId: string,
    fromStance: TrigramStance,
    toStance: TrigramStance,
    duration: number
  ): void {
    this.activeTransitions.set(playerId, {
      from: fromStance,
      to: toStance,
      startTime: Date.now(),
      duration,
      progress: 0,
      isActive: true,
    });
  }

  /**
   * Complete a stance transition
   */
  private completeTransition(playerId: string, newStance: TrigramStance): void {
    const currentState = this.playerStances.get(playerId);
    if (!currentState) return;

    // Update stance state
    this.playerStances.set(playerId, {
      ...currentState,
      current: newStance,
      previous: currentState.current,
      timeInStance: 0,
      lastTransitionTime: Date.now(),
      stability: 0.8, // Reduced stability after transition
      mastery: this.getStanceMastery(playerId, newStance),
      kiFlow: TRIGRAM_DATA[newStance].kiRegenRate || 1.0,
    });

    // Remove active transition
    this.activeTransitions.delete(playerId);

    // Increase mastery for successful transition
    this.increaseMastery(playerId, newStance, 0.005);
  }

  /**
   * Calculate stance stability based on time and usage
   */
  private calculateStanceStability(
    state: StanceState,
    _deltaTime: number
  ): number {
    // Fix: Add underscore prefix to unused parameter
    // Stability increases over time in stance, up to a maximum
    const timeBonus = Math.min(0.5, state.timeInStance / 20000); // 20 second max
    const masteryBonus = state.mastery * 0.3;

    return Math.min(1.0, 0.5 + timeBonus + masteryBonus);
  }

  /**
   * Enhanced transition calculation with player level consideration
   */
  public static calculateTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    playerLevel: number = 1
  ): TransitionMetrics {
    // Use TransitionCalculator for detailed calculations
    return TransitionCalculator.calculateTransition(fromStance, toStance, {
      playerLevelModifier: StanceManager.getPlayerLevelModifier(playerLevel),
      stanceAffinity: StanceManager.getStanceAffinity(fromStance, toStance),
      timeInStance: 0,
    });
  }

  /**
   * Calculate ki flow rate for stance with player state
   */
  public static calculateKiFlowRate(
    stance: TrigramStance,
    playerState: PlayerState
  ): number {
    const factors: KiFlowFactors = {
      playerLevelModifier: StanceManager.getPlayerLevelModifier(1),
      stanceAffinity: StanceManager.getStanceAffinity(
        stance,
        playerState.stance
      ),
      timeInStance: playerState.lastStanceChangeTime
        ? Date.now() - playerState.lastStanceChangeTime
        : 0,
    };

    return StanceManager.calculateKiFlow(stance, factors);
  }

  /**
   * Get counter stance for given stance
   */
  public static getCounterStance(stance: TrigramStance): TrigramStance {
    let bestCounter: TrigramStance = "geon";
    let bestEffectiveness = 0;

    (Object.keys(STANCE_EFFECTIVENESS_MATRIX) as TrigramStance[]).forEach(
      (counterStance) => {
        const effectiveness =
          STANCE_EFFECTIVENESS_MATRIX[counterStance][stance];
        if (effectiveness > bestEffectiveness) {
          bestEffectiveness = effectiveness;
          bestCounter = counterStance;
        }
      }
    );

    return bestCounter;
  }

  /**
   * Calculate stance advantage between attacker and defender
   */
  public static calculateStanceAdvantage(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return STANCE_EFFECTIVENESS_MATRIX[attackerStance][defenderStance];
  }

  /**
   * Calculate distance between two stances in the trigram circle
   */
  public static calculateStanceDistance(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): number {
    const fromIndex = STANCE_ORDER.indexOf(fromStance);
    const toIndex = STANCE_ORDER.indexOf(toStance);

    if (fromIndex === -1 || toIndex === -1) {
      throw new Error("Invalid stance provided");
    }

    const direct = Math.abs(toIndex - fromIndex);
    const wrap = STANCE_ORDER.length - direct;

    return Math.min(direct, wrap);
  }

  /**
   * Get adjacent stances (previous and next in the trigram circle)
   */
  public static getAdjacentStances(stance: TrigramStance): {
    previous: TrigramStance;
    next: TrigramStance;
  } {
    const index = STANCE_ORDER.indexOf(stance);
    if (index === -1) {
      throw new Error("Invalid stance provided");
    }

    const previousIndex =
      (index - 1 + STANCE_ORDER.length) % STANCE_ORDER.length;
    const nextIndex = (index + 1) % STANCE_ORDER.length;

    const previous = STANCE_ORDER[previousIndex];
    const next = STANCE_ORDER[nextIndex];

    if (!previous || !next) {
      throw new Error("Failed to find adjacent stances");
    }

    return { previous, next };
  }

  /**
   * Check if transition is optimal (adjacent or strategic)
   */
  public static isOptimalTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): boolean {
    if (fromStance === toStance) return true;

    const distance = this.calculateStanceDistance(fromStance, toStance);
    const effectiveness = STANCE_EFFECTIVENESS_MATRIX[toStance][fromStance];

    // Optimal if adjacent (distance 1) or strategically advantageous
    return distance <= 1 || effectiveness >= 1.2;
  }

  /**
   * Get stances sorted by transition efficiency from current stance
   */
  public static getStancesByTransitionEfficiency(
    currentStance: TrigramStance
  ): TrigramStance[] {
    return STANCE_ORDER.filter((stance) => stance !== currentStance).sort(
      (a, b) => {
        const distanceA = this.calculateStanceDistance(currentStance, a);
        const distanceB = this.calculateStanceDistance(currentStance, b);
        const effectivenessA = STANCE_EFFECTIVENESS_MATRIX[a][currentStance];
        const effectivenessB = STANCE_EFFECTIVENESS_MATRIX[b][currentStance];

        // Prioritize closer stances with higher effectiveness
        const scoreA = effectivenessA / (distanceA + 1);
        const scoreB = effectivenessB / (distanceB + 1);

        return scoreB - scoreA;
      }
    );
  }

  // Instance methods for state management

  /**
   * Check if player can transition to new stance
   */
  public canTransition(player: PlayerState, newStance: TrigramStance): boolean {
    if (player.stance === newStance) return false;

    // Check for blocking conditions
    if (
      player.conditions.some((c) => c.type === "stun" || c.type === "paralysis")
    ) {
      return false;
    }

    if (player.isAttacking) return false;

    // Check cooldown
    const cooldownTime = 500; // ms
    if (
      player.lastStanceChangeTime &&
      Date.now() - player.lastStanceChangeTime < cooldownTime
    ) {
      return false;
    }

    // Check resources
    const transition = StanceManager.calculateTransition(
      player.stance,
      newStance
    );
    return (
      player.ki >= transition.kiCost && player.stamina >= transition.staminaCost
    );
  }

  /**
   * Get transition history
   */
  public getTransitionHistory(): Array<{
    playerId: string;
    from: TrigramStance;
    to: TrigramStance;
    timestamp: number;
  }> {
    return [...this.transitionHistory];
  }

  /**
   * Clear transition history
   */
  public clearHistory(): void {
    this.transitionHistory = [];
  }

  /**
   * Reset all stance data (for testing or new game)
   */
  public reset(): void {
    this.playerStances.clear();
    this.activeTransitions.clear();
    this.stanceMasteryData.clear();
  }
}

// Global stance manager instance
export const stanceManager = new StanceManager();
