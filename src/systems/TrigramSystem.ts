import { TrigramStance } from "../types/enums";
import type { PlayerState } from "../types/player";
import { TrigramCalculator } from "./trigram/TrigramCalculator";
import { TRIGRAM_DATA } from "../types/constants/trigram";

export class TrigramSystem {
  private calculator: TrigramCalculator;

  constructor() {
    this.calculator = new TrigramCalculator();
  }

  /**
   * Check if player can transition to a new stance
   */
  canTransitionTo(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState
  ): boolean {
    if (fromStance === toStance) return true;

    const cost = this.getTransitionCost(fromStance, toStance, player);

    // Check if player has sufficient resources
    const hasEnoughKi = player.ki >= cost.ki;
    const hasEnoughStamina = player.stamina >= cost.stamina;

    return hasEnoughKi && hasEnoughStamina;
  }

  /**
   * Get transition cost between stances
   */
  getTransitionCost(
    fromStance: TrigramStance,
    toStance: TrigramStance
  ): TrigramTransitionCost {
    if (fromStance === toStance) {
      return {
        ki: 0,
        stamina: 0,
        timeMilliseconds: 0, // Fix: Add missing property
      };
    }

    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      fromStance,
      toStance
    );
    const baseCost = 10;
    const baseTime = 500;

    return {
      ki: Math.ceil(baseCost * difficulty),
      stamina: Math.ceil(baseCost * difficulty * 1.5),
      timeMilliseconds: Math.ceil(baseTime * difficulty), // Fix: Add missing property
    };
  }

  /**
   * Calculate stance effectiveness
   */
  calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return this.calculator.calculateStanceEffectiveness(
      attackerStance,
      defenderStance
    );
  }

  /**
   * Get stance name in Korean and English
   */
  getStanceName(stance: TrigramStance): { korean: string; english: string } {
    const stanceNames = {
      [TrigramStance.GEON]: { korean: "건", english: "Heaven" },
      [TrigramStance.TAE]: { korean: "태", english: "Lake" },
      [TrigramStance.LI]: { korean: "리", english: "Fire" },
      [TrigramStance.JIN]: { korean: "진", english: "Thunder" },
      [TrigramStance.SON]: { korean: "손", english: "Wind" },
      [TrigramStance.GAM]: { korean: "감", english: "Water" },
      [TrigramStance.GAN]: { korean: "간", english: "Mountain" },
      [TrigramStance.GON]: { korean: "곤", english: "Earth" },
    };

    return stanceNames[stance] || { korean: "Unknown", english: "Unknown" };
  }

  /**
   * Get current stance data
   */
  getCurrentStanceData(stance: TrigramStance): any {
    const stanceName = this.getStanceName(stance);
    return {
      id: stance,
      name: stanceName,
      korean: stanceName.korean,
      english: stanceName.english,
    };
  }

  /**
   * Recommend optimal stance against opponent
   */
  recommendStance(opponentStance: TrigramStance): TrigramStance {
    return this.calculator.getCounterStance(opponentStance);
  }

  /**
   * Validate transition with detailed feedback
   */
  validateTransition(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    player: PlayerState
  ): { valid: boolean; reason?: string } {
    if (fromStance === toStance) {
      return { valid: true };
    }

    const cost = this.getTransitionCost(fromStance, toStance, player);

    if (player.ki < cost.ki) {
      return {
        valid: false,
        reason: `Insufficient Ki: need ${cost.ki}, have ${player.ki}`,
      };
    }

    if (player.stamina < cost.stamina) {
      return {
        valid: false,
        reason: `Insufficient Stamina: need ${cost.stamina}, have ${player.stamina}`,
      };
    }

    return { valid: true };
  }

  private getArchetypeModifier(player: PlayerState): number {
    // Different archetypes have different stance transition costs
    switch (player.archetype) {
      case "musa":
        return 0.9; // Warriors are efficient with stance changes
      case "amsalja":
        return 1.1; // Assassins pay more for stance changes
      case "hacker":
        return 1.0; // Neutral
      case "jeongbo_yowon":
        return 0.95; // Agents are well-trained
      case "jojik_pokryeokbae":
        return 1.2; // Gangsters are less efficient
      default:
        return 1.0;
    }
  }
}

export default TrigramSystem;
