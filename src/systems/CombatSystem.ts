import type {
  PlayerState,
  AttackResult,
  VitalPointHit,
  StatusEffect,
  Position,
  TrigramStance,
  Vector2D,
} from "../types/GameTypes";
import { VitalPointSystem } from "./VitalPointSystem";
import { TrigramCalculator } from "./trigram/TrigramCalculator";
import {
  KOREAN_TECHNIQUES,
  type KoreanTechnique,
} from "./trigram/KoreanTechniques";

export class CombatSystem {
  // Remove unused constants or mark as used
  private static readonly MAX_DAMAGE = 100; // Will be used for validation
  private static readonly MIN_DAMAGE = 1; // Will be used for validation
  private static readonly BASE_HIT_CHANCE = 0.8; // Will be used for calculations
  private static readonly DISTANCE_PENALTY_START = 0.7; // Will be used for distance calculations
  private static readonly VITAL_POINT_MULTIPLIER = 1.5; // Will be used for vital point calculations

  private static vitalPointSystem = new VitalPointSystem({
    maxHitDistance: 50,
    precisionThreshold: 0.3,
    debugging: false,
  });

  /**
   * Calculate distance between two positions
   */
  public static calculateDistance(pos1: Vector2D, pos2: Vector2D): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy) / 100; // Normalize to 0-1 range
  }

  /**
   * Calculate damage with Korean martial arts mechanics
   */
  public static calculateDamage(
    technique: string,
    distance: number,
    defenderStance: TrigramStance
  ): number {
    // Import KoreanTechniques dynamically to avoid circular dependency
    const baseDamage = this.getBaseDamageForTechnique(technique);

    const distanceModifier = this.calculateDistanceModifier(distance);

    return Math.max(
      this.MIN_DAMAGE,
      Math.min(this.MAX_DAMAGE, Math.round(baseDamage * distanceModifier))
    );
  }

  private static getBaseDamageForTechnique(technique: string): number {
    // Map technique names to base damage values
    const techniqueMap: Record<string, number> = {
      천둥벽력: 28,
      유수연타: 18,
      화염지창: 35,
      벽력일섬: 40,
      선풍연격: 15,
      수류반격: 25,
      반석방어: 12,
      대지포옹: 30,
    };

    return techniqueMap[technique] || 20; // Default damage
  }

  public static checkHit(
    attacker: PlayerState,
    technique: string,
    distance: number
  ): boolean {
    const baseAccuracy = this.BASE_HIT_CHANCE;
    const distanceModifier = this.calculateDistanceModifier(distance);
    const hitChance = baseAccuracy * distanceModifier;

    return Math.random() < hitChance;
  }

  public static calculateDefense(
    defenderStance: TrigramStance,
    technique: string
  ): number {
    const defenseModifier =
      TrigramCalculator.getDefenseModifier(defenderStance); // Fixed method name
    const baseDefense = 10;

    return Math.round(baseDefense * defenseModifier);
  }

  // Fix VitalPointSystem method call
  public static checkVitalPointHit(
    attackerPos: Vector2D,
    defenderPos: Vector2D,
    technique: { readonly id: string; readonly range: number },
    distance: number
  ): VitalPointHit | null {
    // Create a basic VitalPointSystem instance for checking
    const vitalPointSystem = new VitalPointSystem({
      enabled: true,
      maxHitDistance: technique.range,
      precisionThreshold: 0.3,
      debugging: false,
    });

    return vitalPointSystem.checkVitalPointHit(
      attackerPos,
      defenderPos,
      distance,
      technique
    );
  }

  /**
   * Execute attack with complete validation and results
   */
  public static executeAttack(
    attacker: PlayerState,
    defender: PlayerState,
    techniqueId: string,
    targetX: number,
    targetY: number
  ): AttackResult {
    // Validate attack conditions
    if (!this.canExecuteAttack(attacker, techniqueId)) {
      return this.createFailedAttackResult(
        attacker.id,
        techniqueId,
        "Cannot execute attack"
      );
    }

    const technique = this.getTechnique(techniqueId);
    if (!technique) {
      return this.createFailedAttackResult(
        attacker.id,
        techniqueId,
        "Technique not found"
      );
    }

    const distance = this.calculateDistance(
      attacker.position,
      defender.position
    );

    // Check if attack hits
    const accuracy = this.getBaseAccuracy(techniqueId);
    const hitChance = TrigramCalculator.calculateHitChance(
      attacker.stance,
      defender.stance,
      accuracy
    );

    if (Math.random() > hitChance) {
      return this.createMissedAttackResult(attacker.id, techniqueId);
    }

    // Check vital point hit
    const vitalPointHit = this.vitalPointSystem.checkVitalPointHit(
      targetX,
      targetY,
      techniqueId
    );

    // Calculate damage
    const baseDamage = technique.damage;
    const finalDamage = TrigramCalculator.calculateEffectiveDamage(
      baseDamage,
      attacker.stance,
      defender.stance,
      distance
    );

    const damageWithVital = Math.round(finalDamage * vitalPointHit.multiplier);

    // Generate status effects
    const statusEffects = this.generateStatusEffects(
      technique,
      vitalPointHit.hit ? vitalPointHit : null,
      damageWithVital
    );

    // Calculate knockback
    const knockback = this.calculateKnockbackForce(
      damageWithVital,
      technique,
      distance
    );

    // Check if attack was blocked
    const blocked =
      defender.isBlocking && this.calculateBlockSuccess(attacker, defender);

    return {
      hit: true,
      damage: blocked ? Math.round(damageWithVital * 0.3) : damageWithVital,
      attacker: attacker.id,
      defender: defender.id,
      technique: { id: technique.id, korean: technique.korean },
      hitType: vitalPointHit.hit ? "critical" : "normal",
      distance,
      vitalPointHit: vitalPointHit.hit ? vitalPointHit : null,
      statusEffects,
      knockback: knockback as Position,
      blocked,
      critical: vitalPointHit.hit,
      combo: false, // Will be set by combo system
      description: `${technique.korean} - ${damageWithVital} damage`,
    };
  }

  /**
   * Validate if attack can be executed
   */
  private static validateAttack(
    attacker: PlayerState,
    defender: PlayerState,
    technique: { readonly id: string; readonly range: number },
    distance: number
  ): { success: boolean; reason?: string } {
    if (attacker.isStunned) {
      return { success: false, reason: "Attacker is stunned" };
    }

    if (attacker.isAttacking) {
      return { success: false, reason: "Attacker is already attacking" };
    }

    // Check stamina cost
    const staminaCost = this.getTechniqueStaminaCost(technique.id);
    if (attacker.stamina < staminaCost) {
      return { success: false, reason: "Insufficient stamina" };
    }

    // Check ki cost
    const kiCost = this.getTechniqueKiCost(technique.id);
    if (attacker.ki < kiCost) {
      return { success: false, reason: "Insufficient ki" };
    }

    // Check range
    if (distance > technique.range) {
      return { success: false, reason: "Target out of range" };
    }

    return { success: true };
  }

  /**
   * Calculate hit probability and determine if attack hits
   */
  private static calculateHitResult(
    attacker: PlayerState,
    defender: PlayerState,
    technique: { readonly id: string },
    distance: number
  ): { hit: boolean; accuracy: number } {
    let accuracy = this.getBaseAccuracy(technique.id);

    // Apply stance modifiers
    const stanceModifier = TrigramCalculator.calculateDamageModifier(
      attacker.stance,
      defender.stance
    );
    accuracy *= Math.min(1.2, stanceModifier);

    // Apply distance penalty
    const distanceModifier = this.calculateDistanceModifier(distance);
    accuracy *= distanceModifier;

    // Apply defender evasion
    if (!defender.isStunned && !defender.isAttacking) {
      accuracy *= 0.9; // Defender can partially evade
    }

    // Random roll
    const roll = Math.random();
    return {
      hit: roll < accuracy,
      accuracy,
    };
  }

  /**
   * Validate hit for legacy compatibility
   */
  public static validateHit(
    attacker: PlayerState,
    defender: PlayerState,
    technique: { readonly id: string; readonly range: number }
  ): boolean {
    const distance = this.calculateDistance(
      attacker.position,
      defender.position
    );
    const validation = this.validateAttack(
      attacker,
      defender,
      technique,
      distance
    );

    if (!validation.success) return false;

    const hitResult = this.calculateHitResult(
      attacker,
      defender,
      technique,
      distance
    );
    return hitResult.hit;
  }

  /**
   * Apply attack results to defender
   */
  public static applyAttackResults(
    attackResult: AttackResult,
    defender: PlayerState
  ): { updatedDefender: PlayerState } {
    if (!attackResult.success || !attackResult.hit) {
      return { updatedDefender: defender };
    }

    let updatedDefender = { ...defender };

    // Apply damage
    let finalDamage = attackResult.damage;

    // Reduce damage if blocked
    if (attackResult.blocked) {
      finalDamage = Math.round(finalDamage * 0.3); // 70% damage reduction when blocked
    }

    // Apply damage to health
    updatedDefender.health = Math.max(0, updatedDefender.health - finalDamage);

    // Apply status effects
    if (attackResult.statusEffects.length > 0) {
      updatedDefender.statusEffects = [
        ...updatedDefender.statusEffects,
        ...attackResult.statusEffects,
      ];
    }

    // Apply knockback force (update position)
    if (
      attackResult.force &&
      (attackResult.force.x !== 0 || attackResult.force.y !== 0)
    ) {
      updatedDefender.position = {
        x: updatedDefender.position.x + attackResult.force.x,
        y: updatedDefender.position.y + attackResult.force.y,
      };
    }

    // Apply stun if critical hit
    if (attackResult.critical && attackResult.vitalPointHit?.hit) {
      updatedDefender.isStunned = true;
      // Stun duration would be handled by game loop
    }

    return { updatedDefender };
  }

  /**
   * Calculate combo bonus based on current combo count
   */
  public static calculateComboBonus(player: PlayerState): number {
    if (player.comboCount <= 1) {
      return 1.0; // No bonus for single hits
    }

    // Progressive combo bonus with diminishing returns
    const baseBonus = 0.1; // 10% per combo level
    const maxBonus = 2.0; // Maximum 200% bonus
    const diminishingFactor = 0.8; // Reduce scaling at higher combos

    let bonus = 1.0;
    for (let i = 2; i <= player.comboCount && bonus < maxBonus; i++) {
      const increment = baseBonus * Math.pow(diminishingFactor, i - 2);
      bonus += increment;
    }

    return Math.min(bonus, maxBonus);
  }

  /**
   * Calculate distance modifier for attack effectiveness
   */
  private static calculateDistanceModifier(distance: number): number {
    if (distance <= 0.3) return 1.2; // Close range bonus
    if (distance <= 0.6) return 1.0; // Optimal range
    if (distance <= 0.8) return 0.8; // Medium range penalty
    return 0.5; // Long range significant penalty
  }

  /**
   * Create failed attack result for invalid conditions
   */
  private static createFailedAttackResult(
    attackerId: string,
    technique: string,
    reason: string
  ): AttackResult {
    return {
      hit: false,
      damage: 0,
      attacker: attackerId,
      defender: "",
      technique: { id: technique, name: technique },
      hitType: "miss",
      distance: 0,
      vitalPointHit: null,
      statusEffects: [],
      knockback: null,
      blocked: false,
      critical: false,
      combo: false,
      description: `Attack failed: ${reason}`,
    };
  }

  /**
   * Create missed attack result for accuracy failures
   */
  private static createMissedAttackResult(
    attackerId: string,
    technique: string
  ): AttackResult {
    return {
      hit: false,
      damage: 0,
      attacker: attackerId,
      defender: "",
      technique: { id: technique, name: technique },
      hitType: "miss",
      distance: 0,
      vitalPointHit: null,
      statusEffects: [],
      knockback: null,
      blocked: false,
      critical: false,
      combo: false,
      description: "Attack missed target",
    };
  }

  /**
   * Generate status effects based on attack success
   */
  private static generateStatusEffects(
    technique: KoreanTechnique,
    vitalPointHit: VitalPointHit | null,
    damage: number
  ): readonly StatusEffect[] {
    const effects: StatusEffect[] = [];

    // Add technique-specific effects
    if (technique.effects) {
      effects.push(...technique.effects);
    }

    // Add vital point effects
    if (vitalPointHit?.statusEffects) {
      effects.push(...vitalPointHit.statusEffects);
    }

    // Add damage-based effects
    if (damage >= 30) {
      effects.push({
        type: "stun",
        duration: 1000,
        description: "Heavy impact stun",
      });
    }

    return effects;
  }

  /**
   * Calculate knockback force from attack
   */
  private static calculateKnockbackForce(
    damage: number,
    technique: KoreanTechnique,
    distance: number
  ): { x: number; y: number } | null {
    if (damage < 15) return null;

    const baseForce = Math.min(damage * 0.5, 20);
    const techniqueMultiplier = technique.vitalPointMultiplier || 1.0;
    const distanceModifier = Math.max(0.5, 1.0 - distance);

    const force = baseForce * techniqueMultiplier * distanceModifier;

    return {
      x: force * 0.8,
      y: force * 0.2,
    };
  }

  /**
   * Calculate block success chance
   */
  private static calculateBlockSuccess(
    attacker: PlayerState,
    defender: PlayerState
  ): boolean {
    const attackPower = TrigramCalculator.getDamageModifier(attacker.stance);
    const blockPower = TrigramCalculator.getDefenseModifier(defender.stance);

    const blockChance = blockPower / (attackPower + blockPower);
    return Math.random() < blockChance;
  }

  private static canExecuteAttack(
    attacker: PlayerState,
    techniqueId: string
  ): boolean {
    const staminaCost = this.getTechniqueStaminaCost(techniqueId);
    const kiCost = this.getTechniqueKiCost(techniqueId);

    return (
      attacker.stamina >= staminaCost &&
      attacker.ki >= kiCost &&
      !attacker.isAttacking
    );
  }

  private static getTechnique(techniqueId: string): KoreanTechnique | null {
    return KOREAN_TECHNIQUES.find((t) => t.id === techniqueId) || null;
  }

  private static calculateDistance(pos1: Position, pos2: Position): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy) / 100; // Normalize to 0-1 range
  }

  /**
   * Get technique stamina cost
   */
  private static getTechniqueStaminaCost(techniqueId: string): number {
    const technique = KOREAN_TECHNIQUES.find((t) => t.id === techniqueId);
    return technique?.staminaCost || 10;
  }

  /**
   * Get technique ki cost
   */
  private static getTechniqueKiCost(techniqueId: string): number {
    const technique = KOREAN_TECHNIQUES.find((t) => t.id === techniqueId);
    return technique?.kiCost || 5;
  }

  /**
   * Get base accuracy for technique
   */
  private static getBaseAccuracy(techniqueId: string): number {
    const technique = KOREAN_TECHNIQUES.find((t) => t.id === techniqueId);
    return (technique?.accuracy || 80) / 100;
  }
}
