/**
 * @fileoverview Korean Trigram Stance Management System
 * @description Manages the eight trigram stances (팔괘) with authentic Korean martial arts mechanics
 */

import type { TrigramStance } from "../../types/enums";
import type { PlayerState } from "../../types/player";
import type {
  StanceTransition,
  StanceEffectiveness,
} from "../../types/trigram";
import { TRIGRAM_DATA } from "../../types/constants/trigram";

export class StanceManager {
  private readonly stanceTransitions: Map<string, StanceTransition>;
  private readonly stanceEffectiveness: Map<string, number>;

  constructor() {
    this.stanceTransitions = new Map();
    this.stanceEffectiveness = new Map();
    this.initializeStanceSystem();
  }

  /**
   * Initialize the authentic Korean trigram stance system
   */
  private initializeStanceSystem(): void {
    // I Ching based stance effectiveness matrix
    const stanceInteractions = {
      [TrigramStance.GEON]: {
        // ☰ Heaven
        strong: [TrigramStance.GAM, TrigramStance.GAN], // Overcomes Water, Mountain
        weak: [TrigramStance.GON, TrigramStance.SON], // Weak to Earth, Wind
      },
      [TrigramStance.TAE]: {
        // ☱ Lake
        strong: [TrigramStance.LI, TrigramStance.GAN],
        weak: [TrigramStance.JIN, TrigramStance.SON],
      },
      [TrigramStance.LI]: {
        // ☲ Fire
        strong: [TrigramStance.GAN, TrigramStance.GEON],
        weak: [TrigramStance.GAM, TrigramStance.TAE],
      },
      [TrigramStance.JIN]: {
        // ☳ Thunder
        strong: [TrigramStance.GON, TrigramStance.GAM],
        weak: [TrigramStance.GEON, TrigramStance.GAN],
      },
      [TrigramStance.SON]: {
        // ☴ Wind
        strong: [TrigramStance.GEON, TrigramStance.LI],
        weak: [TrigramStance.GAN, TrigramStance.JIN],
      },
      [TrigramStance.GAM]: {
        // ☵ Water
        strong: [TrigramStance.LI, TrigramStance.TAE],
        weak: [TrigramStance.GEON, TrigramStance.GON],
      },
      [TrigramStance.GAN]: {
        // ☶ Mountain
        strong: [TrigramStance.TAE, TrigramStance.SON],
        weak: [TrigramStance.JIN, TrigramStance.LI],
      },
      [TrigramStance.GON]: {
        // ☷ Earth
        strong: [TrigramStance.GEON, TrigramStance.JIN],
        weak: [TrigramStance.GAM, TrigramStance.LI],
      },
    };

    // Build effectiveness matrix
    Object.entries(stanceInteractions).forEach(([attacker, relations]) => {
      relations.strong.forEach((defender) => {
        this.stanceEffectiveness.set(`${attacker}-${defender}`, 1.3);
      });
      relations.weak.forEach((defender) => {
        this.stanceEffectiveness.set(`${attacker}-${defender}`, 0.7);
      });
    });
  }

  /**
   * Change player stance with Korean martial arts validation
   */
  public changeStance(
    player: PlayerState,
    newStance: TrigramStance
  ): { success: boolean; message: string; cost: number } {
    const currentStance = player.currentStance;

    // Check if player has sufficient ki and stamina for stance change
    const stanceCost = this.calculateStanceCost(currentStance, newStance);

    if (player.ki < stanceCost.ki || player.stamina < stanceCost.stamina) {
      return {
        success: false,
        message: "기력이나 체력이 부족합니다 - Insufficient Ki or Stamina",
        cost: 0,
      };
    }

    // Check stance transition rules
    if (!this.isValidTransition(currentStance, newStance)) {
      return {
        success: false,
        message: "잘못된 자세 전환입니다 - Invalid stance transition",
        cost: 0,
      };
    }

    const stanceData = TRIGRAM_DATA[newStance];
    return {
      success: true,
      message: `${stanceData.name.korean} 자세로 변경 - Changed to ${stanceData.name.english} stance`,
      cost: stanceCost.ki + stanceCost.stamina,
    };
  }

  /**
   * Calculate stance change costs based on Korean martial arts principles
   */
  private calculateStanceCost(
    from: TrigramStance,
    to: TrigramStance
  ): { ki: number; stamina: number } {
    // Same stance - no cost
    if (from === to) {
      return { ki: 0, stamina: 0 };
    }

    // Adjacent trigrams in I Ching order cost less
    const trigrams = Object.values(TrigramStance);
    const fromIndex = trigrams.indexOf(from);
    const toIndex = trigrams.indexOf(to);
    const distance = Math.min(
      Math.abs(toIndex - fromIndex),
      trigrams.length - Math.abs(toIndex - fromIndex)
    );

    const baseCost = {
      ki: 5 + distance * 2,
      stamina: 3 + distance * 1.5,
    };

    return {
      ki: Math.round(baseCost.ki),
      stamina: Math.round(baseCost.stamina),
    };
  }

  /**
   * Check if stance transition follows Korean martial arts principles
   */
  private isValidTransition(from: TrigramStance, to: TrigramStance): boolean {
    // All transitions are valid in Korean martial arts, but some are more natural
    return true;
  }

  /**
   * Get stance effectiveness multiplier for combat
   */
  public getStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    const key = `${attackerStance}-${defenderStance}`;
    return this.stanceEffectiveness.get(key) || 1.0;
  }

  /**
   * Get available techniques for current stance
   */
  public getAvailableTechniques(stance: TrigramStance): readonly string[] {
    const stanceData = TRIGRAM_DATA[stance];
    return stanceData?.availableTechniques || [];
  }

  /**
   * Get stance bonus modifiers
   */
  public getStanceBonuses(stance: TrigramStance): {
    attack: number;
    defense: number;
    speed: number;
    criticalChance: number;
  } {
    const stanceData = TRIGRAM_DATA[stance];
    return (
      stanceData?.combatBonuses || {
        attack: 1.0,
        defense: 1.0,
        speed: 1.0,
        criticalChance: 0.1,
      }
    );
  }

  /**
   * Validate stance change timing (can't change during technique execution)
   */
  public canChangeStance(player: PlayerState, currentTime: number): boolean {
    return currentTime >= player.lastActionTime + player.recoveryTime;
  }
}

export default StanceManager;
export const stanceManager = new StanceManager();
