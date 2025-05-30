import type {
  TrigramStance,
  PlayerState,
  TransitionMetrics,
  KiFlowFactors,
} from "../../types";
import { TRIGRAM_DATA, STANCE_EFFECTIVENESS_MATRIX } from "../../types"; // Fix: Import from types
import { TransitionCalculator } from "./TransitionCalculator";

/**
 * Korean Martial Arts Stance Management System
 * Manages stance transitions, timing, and combat effectiveness
 */

export interface StanceState {
  readonly current: TrigramStance;
  readonly previous: TrigramStance | null;
  readonly timeInStance: number;
  readonly lastTransitionTime: number;
  readonly stability: number;
  readonly mastery: number;
  readonly kiFlow: number;
}

export interface StanceTransition {
  readonly from: TrigramStance;
  readonly to: TrigramStance;
  readonly startTime: number;
  readonly duration: number;
  readonly progress: number;
  readonly isActive: boolean;
}

export class StanceManager {
  private playerStances = new Map<string, StanceState>();
  private activeTransitions = new Map<string, StanceTransition>();
  private stanceMasteryData = new Map<string, Map<TrigramStance, number>>();

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

    // Fix: Remove timeInStance from TransitionCalculator factors
    const transitionMetrics = TransitionCalculator.calculateTransition(
      player.stance,
      targetStance,
      {
        // Fix: Only pass defined values to avoid exactOptionalPropertyTypes issues
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
   * Calculate ki flow rate for current stance
   */
  private calculateKiFlow(playerId: string, stance: TrigramStance): number {
    const baseFlow = TRIGRAM_DATA[stance].kiRegenRate || 1.0;
    const mastery = this.getStanceMastery(playerId, stance);
    const masteryBonus = mastery * 0.5;

    return baseFlow + masteryBonus;
  }

  /**
   * Get player level modifier based on overall mastery
   */
  private getPlayerLevelModifier(playerId: string): number {
    const masteryMap = this.stanceMasteryData.get(playerId);
    if (!masteryMap) return 1.0;

    const totalMastery = Array.from(masteryMap.values()).reduce(
      (sum, mastery) => sum + mastery,
      0
    );
    const averageMastery = totalMastery / masteryMap.size;

    return 0.8 + averageMastery * 0.4; // 0.8 to 1.2 range
  }

  /**
   * Get stance affinity for a player
   */
  private getStanceAffinity(playerId: string, stance: TrigramStance): number {
    return this.getStanceMastery(playerId, stance);
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
