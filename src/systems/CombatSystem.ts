import type {
  PlayerState,
  AttackResult,
  VitalPointHit,
  StatusEffect,
  KoreanTechnique,
  Position,
} from "../types";
import { TRIGRAM_DATA, KOREAN_TECHNIQUES } from "../types";
import { Vector2D } from "../types/GameTypes";
import { VitalPointSystem } from "./VitalPointSystem";

export class CombatSystem {
  private static readonly BASE_ACCURACY = 0.8;

  private static vitalPointSystem = new VitalPointSystem({
    enabled: true,
    precisionThreshold: 0.7,
    debugging: false,
  });

  // Remove duplicate calculateDistance - keep only one implementation
  public static calculateDistance(pos1: Vector2D, pos2: Vector2D): number {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Fix validateAttack method signature
  private static validateAttack(
    attacker: PlayerState,
    _defender: PlayerState, // Use underscore to indicate unused parameter
    technique: string
  ): { success: boolean; reason?: string } {
    // Check if technique exists
    if (!KOREAN_TECHNIQUES[technique]) {
      return { success: false, reason: "Unknown technique" };
    }

    // Check if attacker is already attacking
    if (attacker.isAttacking) {
      return { success: false, reason: "Attacker is already attacking" };
    }

    // Check stamina requirements
    const techniqueData = KOREAN_TECHNIQUES[technique];
    if (attacker.stamina < techniqueData.staminaCost) {
      return { success: false, reason: "Insufficient stamina" };
    }

    // Check ki requirements
    if (attacker.ki < techniqueData.kiCost) {
      return { success: false, reason: "Insufficient ki" };
    }

    return { success: true };
  }

  // Add missing helper methods
  private static createFailedAttack(reason: string): AttackResult {
    return {
      hit: false,
      damage: 0,
      accuracy: 0,
      blocked: false,
      critical: false,
      statusEffects: [],
      comboMultiplier: 1,
      description: `공격 실패: ${reason}`,
    };
  }

  private static calculateAccuracy(
    attacker: PlayerState,
    technique: KoreanTechnique
  ): number {
    let accuracy = this.BASE_ACCURACY * technique.accuracy;

    // Apply skill modifier if player has skill property
    if ("skill" in attacker) {
      accuracy *= (attacker as any).skill / 100;
    }

    return Math.min(1, accuracy);
  }

  private static calculateBaseDamage(
    attacker: PlayerState,
    technique: KoreanTechnique
  ): number {
    let damage = technique.damage;

    // Apply attack modifier if player has attack property
    if ("attack" in attacker) {
      damage *= 1 + (attacker as any).attack / 100;
    }

    return damage;
  }

  private static applyDistanceModifier(
    accuracy: number,
    distance: number,
    range: number
  ): number {
    if (distance <= range * 0.5) {
      return accuracy; // Full accuracy at close range
    }

    if (distance >= range) {
      return accuracy * 0.3; // Significant penalty at max range
    }

    // Linear falloff between 50% and 100% of range
    const falloffFactor = 1 - ((distance - range * 0.5) / (range * 0.5)) * 0.7;
    return accuracy * falloffFactor;
  }

  private static applyDefense(damage: number, defender: PlayerState): number {
    // Apply defense if player has defense property
    if ("defense" in defender && "attack" in defender) {
      const defenseRatio =
        (defender as any).defense / ((defender as any).defense + 50);
      return damage * (1 - defenseRatio * 0.5);
    }

    return damage;
  }

  private static createMissedAttack(): AttackResult {
    return {
      hit: false,
      damage: 0,
      accuracy: 0,
      blocked: false,
      critical: false,
      statusEffects: [],
      comboMultiplier: 1,
      description: "공격 실패",
    };
  }

  /**
   * Execute attack with proper vital point handling
   */
  public static executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: string,
    targetPosition: Position
  ): AttackResult {
    // Validate attack prerequisites
    const validation = this.validateAttack(attacker, defender, technique);
    if (!validation.success) {
      return this.createFailedAttack(
        validation.reason || "Attack validation failed"
      );
    }

    // Calculate distance for accuracy
    const distance = this.calculateDistance(attacker.position, targetPosition);

    // Get technique data
    const techniqueData = KOREAN_TECHNIQUES[technique];
    if (!techniqueData) {
      return this.createFailedAttack("Unknown technique");
    }

    // Calculate base accuracy
    const baseAccuracy = this.calculateAccuracy(attacker, techniqueData);
    const finalAccuracy = this.applyDistanceModifier(
      baseAccuracy,
      distance,
      techniqueData.range
    );

    // Check if attack hits
    const hit = Math.random() < finalAccuracy;
    if (!hit) {
      return this.createMissedAttack();
    }

    // Calculate damage
    const baseDamage = this.calculateBaseDamage(attacker, techniqueData);

    // Check for vital point hit
    const vitalPointHit = this.vitalPointSystem.detectVitalPointHit(
      targetPosition.x,
      targetPosition.y,
      technique
    );

    let finalDamage = baseDamage;
    let statusEffects: StatusEffect[] = [];

    if (vitalPointHit) {
      finalDamage *= 1.5; // Vital point multiplier
      statusEffects.push(...(vitalPointHit.effects || []));
    }

    // Apply defense
    const defendedDamage = this.applyDefense(finalDamage, defender);

    return {
      hit: true,
      damage: Math.round(defendedDamage),
      accuracy: finalAccuracy,
      blocked: false,
      critical: !!vitalPointHit,
      statusEffects,
      // Fix optional property handling
      ...(vitalPointHit && { vitalPointHit }),
      comboMultiplier:
        attacker.comboCount > 0 ? 1 + attacker.comboCount * 0.1 : 1,
      description: vitalPointHit
        ? vitalPointHit.description
        : `${techniqueData.korean} 공격`,
    };
  }

  // Add missing methods for test compatibility
  public static validateHit(
    attacker: PlayerState,
    defender: PlayerState,
    distance: number
  ): boolean {
    return distance <= 100 && attacker.stamina > 0 && !defender.isDodging;
  }

  public static applyAttackResults(
    defender: PlayerState,
    attackResult: AttackResult
  ): { updatedDefender: PlayerState } {
    if (!attackResult.hit) {
      return { updatedDefender: defender };
    }

    const newHealth = Math.max(0, defender.health - attackResult.damage);

    return {
      updatedDefender: {
        ...defender,
        health: newHealth,
        statusEffects: [
          ...defender.statusEffects,
          ...attackResult.statusEffects,
        ],
      },
    };
  }

  public static calculateComboBonus(player: PlayerState): number {
    return player.comboCount > 0 ? 1 + player.comboCount * 0.1 : 1;
  }

  public static calculateDamage(
    technique: string,
    distance: number,
    attackerSkill: number
  ): number {
    const techniqueData = KOREAN_TECHNIQUES[technique];
    if (!techniqueData) return 0;

    let damage = techniqueData.damage;

    // Apply distance modifier
    if (distance > techniqueData.range) {
      damage *= 0.5;
    }

    // Apply skill modifier
    damage *= attackerSkill / 100;

    return Math.round(damage);
  }

  /**
   * Check if position hits a vital point
   */
  public static checkVitalPointHit(
    x: number,
    y: number,
    technique: string
  ): VitalPointHit | null {
    return this.vitalPointSystem.detectVitalPointHit(x, y, technique);
  }

  /**
   * Gets Korean technique name with fallback
   */
  public static getKoreanTechniqueName(techniqueId: string): string {
    const technique = KOREAN_TECHNIQUES[techniqueId];
    return technique
      ? `${technique.korean} (${technique.english})`
      : techniqueId;
  }

  public static calculateTechniqueDamage(
    technique: string,
    distance: number,
    playerHealth: number
  ): number {
    // Find technique in KOREAN_TECHNIQUES with proper error handling
    const techniqueData = KOREAN_TECHNIQUES[technique];

    if (!techniqueData) {
      console.warn(`Unknown technique: ${technique}`);
      return 0;
    }

    // ...existing calculation logic...
    const baseDamage = techniqueData.damage;
    const distanceMultiplier = Math.max(0.1, 1 - distance / 200);

    return Math.round(baseDamage * distanceMultiplier);
  }

  public executeAttack(
    attackerId: string,
    technique: string,
    targetX: number,
    targetY: number
  ): AttackResult {
    // Find technique data properly
    const techniqueData = KOREAN_TECHNIQUES[technique];

    if (!techniqueData) {
      return {
        hit: false,
        damage: 0,
        blocked: false,
        critical: false,
        accuracy: 0,
        comboMultiplier: 1,
        statusEffects: [],
        description: "Unknown technique",
      };
    }

    // Calculate damage with proper typing
    const baseDamage = techniqueData.damage;
    const distance = Math.sqrt(targetX * targetX + targetY * targetY);

    // Check for vital point hit with correct parameter types
    const vitalPointHit = this.vitalPointSystem.detectVitalPointHit(
      targetX,
      targetY,
      baseDamage // Pass damage as number, not technique name
    );

    const statusEffects: StatusEffect[] = [];
    if (vitalPointHit.hit && vitalPointHit.effects) {
      statusEffects.push(...vitalPointHit.effects);
    }

    return {
      hit: true,
      damage: vitalPointHit.damage || baseDamage,
      blocked: false,
      critical: vitalPointHit.critical,
      accuracy: techniqueData.accuracy,
      comboMultiplier: 1,
      vitalPointHit,
      statusEffects,
      description:
        vitalPointHit.description || techniqueData.description.korean,
    };
  }

  private checkVitalPointHit(
    x: number,
    y: number,
    damage: number
  ): VitalPointHit {
    return this.vitalPointSystem.detectVitalPointHit(x, y, damage);
  }

  public static getKoreanTechniqueName(techniqueId: string): string {
    const technique = KOREAN_TECHNIQUES[techniqueId];
    return technique
      ? `${technique.name} (${technique.englishName})`
      : techniqueId;
  }

  // ...rest of existing methods with proper type handling...
}
