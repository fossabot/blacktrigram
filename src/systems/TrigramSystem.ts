import type {
  TrigramStance,
  PlayerState,
  TrigramData,
  TransitionPath,
  TrigramTransitionCost,
} from "../types";
import { TrigramCalculator } from "./trigram/TrigramCalculator";
import { TRIGRAM_DATA } from "../types/constants/trigram";

export class TrigramSystem {
  constructor() {
    // Initialize system
  }

  canTransitionTo(
    fromStance: TrigramStance,
    toStance: TrigramStance,
    _playerState?: PlayerState // Fix: Add underscore to indicate unused
  ): boolean {
    if (fromStance === toStance) return false;

    return true;
  }

  getTransitionCost(
    from: TrigramStance,
    to: TrigramStance,
    _player?: PlayerState // Fix: Add underscore to indicate unused
  ): TrigramTransitionCost {
    if (from === to) {
      return { ki: 0, stamina: 0, timeMilliseconds: 0 };
    }

    const baseCost = 10;
    const difficulty = TrigramCalculator.calculateTransitionDifficulty(
      from,
      to
    );

    return {
      ki: Math.floor(baseCost * difficulty),
      stamina: Math.floor(baseCost * 1.5 * difficulty),
      timeMilliseconds: Math.floor(500 * difficulty),
    };
  }

  findOptimalPath(
    from: TrigramStance,
    to: TrigramStance,
    _player?: PlayerState // Fix: Add underscore to indicate unused
  ): TransitionPath {
    const path = [from, to];
    const totalCost = this.getTransitionCost(from, to);

    return {
      path,
      totalCost,
      effectiveness: 1.0,
      name: `${from}_to_${to}`,
      description: {
        korean: `${from}에서 ${to}로 전환`,
        english: `Transition from ${from} to ${to}`,
      },
    };
  }

  getCurrentStanceData(stance: TrigramStance): TrigramData | undefined {
    // Fix: Convert TrigramStanceData to TrigramData format
    const stanceData = TRIGRAM_DATA[stance];
    if (!stanceData) return undefined;

    return {
      id: stance,
      korean: stanceData.name.korean,
      english: stanceData.name.english,
      symbol: stanceData.symbol,
      element: stanceData.element,
      nature: stanceData.nature,
      philosophy: stanceData.philosophy,
      combat: stanceData.combat,
      // Fix: Add missing properties to match TrigramTheme interface
      theme: {
        primary: stanceData.theme.primary,
        secondary: stanceData.theme.secondary,
        active: stanceData.theme.primary, // Fix: Add missing active property
        hover: stanceData.theme.secondary, // Fix: Add missing hover property
        text: 0xffffff, // Fix: Add missing text property
      },
      name: stanceData.name,
      defensiveBonus: stanceData.defensiveBonus,
      kiFlowModifier: stanceData.kiFlowModifier,
      techniques: stanceData.techniques,
    };
  }

  calculateStanceEffectiveness(
    attackerStance: TrigramStance,
    defenderStance: TrigramStance
  ): number {
    return TrigramCalculator.calculateStanceEffectiveness(
      attackerStance,
      defenderStance
    );
  }

  // Fix: Add proper method signature
  getOptimalCounter(
    opponentStance: TrigramStance,
    _playerState?: PlayerState // Fix: Add underscore to indicate unused
  ): TrigramStance {
    return TrigramCalculator.getCounterStance(opponentStance);
  }

  // Fix: Add transition validation
  validateTransition(
    from: TrigramStance,
    to: TrigramStance,
    player: PlayerState
  ): { valid: boolean; reason?: string } {
    if (!this.canTransitionTo(from, to, player)) {
      const cost = this.getTransitionCost(from, to, player);
      if (player.ki < cost.ki) {
        return { valid: false, reason: "Insufficient Ki" };
      }
      if (player.stamina < cost.stamina) {
        return { valid: false, reason: "Insufficient Stamina" };
      }
    }
    return { valid: true };
  }

  // Fix: Add missing method referenced in other files
  recommendStance(player: PlayerState, opponent?: PlayerState): TrigramStance {
    if (opponent) {
      return this.getOptimalCounter(opponent.currentStance, player);
    }
    return player.currentStance;
  }
}

export default TrigramSystem;
