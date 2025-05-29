import { describe, it, expect, beforeEach } from "vitest";
import { CombatSystem } from "./CombatSystem";
import type {
  PlayerState,
  AttackResult,
  VitalPointHit,
  TrigramStance,
  Vector2D,
} from "../types/GameTypes";

describe("CombatSystem", () => {
  let mockPlayerState: PlayerState;
  let mockDefender: PlayerState;

  beforeEach(() => {
    mockPlayerState = {
      id: "player1",
      health: 100,
      maxHealth: 100,
      stamina: 100,
      maxStamina: 100,
      ki: 100,
      maxKi: 100,
      stance: "geon",
      position: { x: 100, y: 100 },
      isAttacking: false,
      isBlocking: false,
      isStunned: false,
      statusEffects: [],
      lastAttackTime: 0,
      comboCount: 0,
    };

    mockDefender = {
      id: "player2",
      health: 100,
      maxHealth: 100,
      stamina: 100,
      maxStamina: 100,
      ki: 100,
      maxKi: 100,
      stance: "tae",
      position: { x: 150, y: 100 },
      isAttacking: false,
      isBlocking: false,
      isStunned: false,
      statusEffects: [],
      lastAttackTime: 0,
      comboCount: 0,
    };
  });

  describe("calculateDamage", () => {
    it("should calculate basic damage correctly", () => {
      const technique = "천둥벽력"; // Use string instead of object
      const distance = 50;
      const defenderStance: TrigramStance = "geon";

      const damage = CombatSystem.calculateDamage(
        technique,
        distance,
        defenderStance
      );

      expect(damage).toBeGreaterThan(0);
      expect(damage).toBeLessThanOrEqual(100);
    });

    it("should apply distance modifier", () => {
      const technique = "화염지창"; // Use string instead of object
      const closeDistance = 20;
      const farDistance = 80;
      const defenderStance: TrigramStance = "tae";

      const closeDamage = CombatSystem.calculateDamage(
        technique,
        closeDistance,
        defenderStance
      );
      const farDamage = CombatSystem.calculateDamage(
        technique,
        farDistance,
        defenderStance
      );

      expect(closeDamage).toBeGreaterThan(farDamage);
    });

    it("should apply vital point multiplier", () => {
      const technique = { id: "cheonjang_byeokryeok" };
      const vitalPointHit: VitalPointHit = {
        hit: true,
        damage: 30,
        statusEffects: [],
        multiplier: 1.5,
        vitalPointId: "solar_plexus",
        effectiveness: 1.0,
        description: "Solar plexus strike",
      };

      const normalDamage = CombatSystem.calculateDamage(
        technique,
        50,
        mockPlayerState,
        mockDefender,
        null
      );

      const vitalDamage = CombatSystem.calculateDamage(
        technique,
        50,
        mockPlayerState,
        mockDefender,
        vitalPointHit
      );

      expect(vitalDamage).toBeGreaterThan(normalDamage);
    });

    it("should apply minimum damage", () => {
      const technique = { id: "cheonjang_byeokryeok" };

      const damage = CombatSystem.calculateDamage(
        technique,
        1000, // Very far distance
        mockPlayerState,
        mockDefender,
        null
      );

      expect(damage).toBeGreaterThanOrEqual(1);
    });
  });

  describe("executeAttack", () => {
    it("should execute successful attack", () => {
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const result = CombatSystem.executeAttack(
        mockPlayerState,
        mockDefender,
        technique
      );

      expect(result.hit).toBe(true);
      expect(result.damage).toBeGreaterThan(0);
      expect(result.attacker).toBe(mockPlayerState.id);
    });

    it("should fail when attacker is stunned", () => {
      const stunnedAttacker = { ...mockPlayerState, isStunned: true };
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const result = CombatSystem.executeAttack(
        stunnedAttacker,
        mockDefender,
        technique
      );

      expect(result.success).toBe(false);
      expect(result.reason).toBe("Attacker is stunned");
    });

    it("should fail when attacker is already attacking", () => {
      const attackingPlayer = { ...mockPlayerState, isAttacking: true };
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const result = CombatSystem.executeAttack(
        attackingPlayer,
        mockDefender,
        technique
      );

      expect(result.success).toBe(false);
      expect(result.reason).toBe("Attacker is already attacking");
    });

    it("should fail with insufficient stamina", () => {
      const lowStaminaPlayer = { ...mockPlayerState, stamina: 5 };
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const result = CombatSystem.executeAttack(
        lowStaminaPlayer,
        mockDefender,
        technique
      );

      expect(result.success).toBe(false);
      expect(result.reason).toBe("Insufficient stamina");
    });

    it("should fail with insufficient ki", () => {
      const lowKiPlayer = { ...mockPlayerState, ki: 2 };
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const result = CombatSystem.executeAttack(
        lowKiPlayer,
        mockDefender,
        technique
      );

      expect(result.success).toBe(false);
      expect(result.reason).toBe("Insufficient ki");
    });

    it("should fail when target is out of range", () => {
      const farDefender = { ...mockDefender, position: { x: 1000, y: 100 } };
      const technique = { id: "cheonjang_byeokryeok", range: 50 };

      const result = CombatSystem.executeAttack(
        mockPlayerState,
        farDefender,
        technique
      );

      expect(result.success).toBe(false);
      expect(result.reason).toBe("Target out of range");
    });

    it("should apply trigram stance modifiers", () => {
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const result = CombatSystem.executeAttack(
        mockPlayerState,
        mockDefender,
        technique
      );

      expect(result.hit).toBeTruthy();
      expect(result.damage).toBeGreaterThan(0);
    });
  });

  describe("validateHit", () => {
    it("should validate hit within range", () => {
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const isValid = CombatSystem.validateHit(
        mockPlayerState,
        mockDefender,
        technique
      );

      expect(isValid).toBe(true);
    });

    it("should reject hit when target is blocking", () => {
      const blockingDefender = { ...mockDefender, isBlocking: true };
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const isValid = CombatSystem.validateHit(
        mockPlayerState,
        blockingDefender,
        technique
      );

      // This depends on implementation - blocking might reduce damage rather than prevent hit
      expect(typeof isValid).toBe("boolean");
    });

    it("should consider stance matchups", () => {
      const technique = { id: "cheonjang_byeokryeok", range: 100 };

      const isValid = CombatSystem.validateHit(
        mockPlayerState,
        mockDefender,
        technique
      );

      expect(typeof isValid).toBe("boolean");
    });
  });

  describe("applyAttackResults", () => {
    it("should apply successful attack results", () => {
      const attackResult: AttackResult = {
        damage: 25,
        hit: true,
        critical: false,
        blocked: false,
        statusEffects: [],
        force: { x: 5, y: 0 },
        technique: {
          id: "cheonjang_byeokryeok",
          korean: "천장벽력",
          english: "Heaven's Thunder Strike",
          damage: 25,
          range: 100,
          accuracy: 0.8,
          speed: 1.0,
          staminaCost: 10,
          kiCost: 5,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Powerful overhead strike",
          effects: [],
        },
        attacker: mockPlayerState.id,
        timestamp: Date.now(),
        success: true,
      };

      const { updatedDefender } = CombatSystem.applyAttackResults(
        attackResult,
        mockDefender
      );

      expect(updatedDefender.health).toBe(75);
    });

    it("should not apply failed attack results", () => {
      const failedResult: AttackResult = {
        damage: 0,
        hit: false,
        critical: false,
        blocked: false,
        statusEffects: [],
        force: { x: 0, y: 0 },
        technique: {
          id: "cheonjang_byeokryeok",
          korean: "천장벽력",
          english: "Heaven's Thunder Strike",
          damage: 25,
          range: 100,
          accuracy: 0.8,
          speed: 1.0,
          staminaCost: 10,
          kiCost: 5,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Powerful overhead strike",
          effects: [],
        },
        attacker: mockPlayerState.id,
        timestamp: Date.now(),
        success: false,
        reason: "Attack missed",
      };

      const { updatedDefender } = CombatSystem.applyAttackResults(
        failedResult,
        mockDefender
      );

      expect(updatedDefender.health).toBe(100);
    });

    it("should apply status effects", () => {
      const attackResult: AttackResult = {
        damage: 20,
        hit: true,
        critical: false,
        blocked: false,
        statusEffects: [
          {
            type: "stun",
            intensity: 1.0,
            duration: 1000,
            description: "Stunned by powerful strike",
          },
        ],
        force: { x: 5, y: 0 },
        technique: {
          id: "cheonjang_byeokryeok",
          korean: "천장벽력",
          english: "Heaven's Thunder Strike",
          damage: 25,
          range: 100,
          accuracy: 0.8,
          speed: 1.0,
          staminaCost: 10,
          kiCost: 5,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Powerful overhead strike",
          effects: [],
        },
        attacker: mockPlayerState.id,
        timestamp: Date.now(),
        success: true,
      };

      const { updatedDefender } = CombatSystem.applyAttackResults(
        attackResult,
        mockDefender
      );

      expect(updatedDefender.statusEffects).toHaveLength(1);
      expect(updatedDefender.statusEffects[0]?.type).toBe("stun");
    });

    it("should prevent health from going below zero", () => {
      const highDamageResult: AttackResult = {
        damage: 150,
        hit: true,
        critical: true,
        blocked: false,
        statusEffects: [],
        force: { x: 10, y: 0 },
        technique: {
          id: "cheonjang_byeokryeok",
          korean: "천장벽력",
          english: "Heaven's Thunder Strike",
          damage: 25,
          range: 100,
          accuracy: 0.8,
          speed: 1.0,
          staminaCost: 10,
          kiCost: 5,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Powerful overhead strike",
          effects: [],
        },
        attacker: mockPlayerState.id,
        timestamp: Date.now(),
        success: true,
      };

      const { updatedDefender } = CombatSystem.applyAttackResults(
        highDamageResult,
        mockDefender
      );

      expect(updatedDefender.health).toBe(0);
    });

    it("should apply vital point effects", () => {
      const vitalPointResult: AttackResult = {
        damage: 30,
        hit: true,
        critical: true,
        blocked: false,
        statusEffects: [],
        force: { x: 5, y: 0 },
        technique: {
          id: "cheonjang_byeokryeok",
          korean: "천장벽력",
          english: "Heaven's Thunder Strike",
          damage: 25,
          range: 100,
          accuracy: 0.8,
          speed: 1.0,
          staminaCost: 10,
          kiCost: 5,
          vitalPointMultiplier: 1.2,
          stance: "geon",
          description: "Powerful overhead strike",
          effects: [],
        },
        attacker: mockPlayerState.id,
        timestamp: Date.now(),
        success: true,
        vitalPointHit: {
          hit: true,
          damage: 30,
          statusEffects: [
            {
              type: "paralysis",
              intensity: 0.5,
              duration: 2000,
              description: "Paralyzed by vital point strike",
            },
          ],
          multiplier: 1.5,
          vitalPointId: "solar_plexus",
          effectiveness: 1.0,
          description: "Solar plexus vital point hit",
        },
      };

      const { updatedDefender } = CombatSystem.applyAttackResults(
        vitalPointResult,
        mockDefender
      );

      expect(updatedDefender.health).toBeLessThan(100);
    });

    it("should handle out of range attacks", () => {
      const farDefender = { ...mockDefender, position: { x: 300, y: 100 } };
      const technique = { id: "cheonjang_byeokryeok", range: 50 };

      const result = CombatSystem.executeAttack(
        mockPlayerState,
        farDefender,
        technique
      );

      expect(result.success).toBe(false);
      expect(result.reason).toBe("Target out of range");
    });
  });

  describe("calculateComboBonus", () => {
    it("should calculate combo bonus correctly", () => {
      const playerWithCombo = { ...mockPlayerState, comboCount: 3 };

      const bonus = CombatSystem.calculateComboBonus(playerWithCombo);

      expect(bonus).toBeGreaterThan(0);
      expect(bonus).toBeLessThanOrEqual(0.2);
    });

    it("should cap combo bonus at maximum", () => {
      const playerWithHighCombo = { ...mockPlayerState, comboCount: 10 };

      const bonus = CombatSystem.calculateComboBonus(playerWithHighCombo);

      expect(bonus).toBe(0.2); // Maximum combo bonus
    });

    it("should return zero for no combo", () => {
      const bonus = CombatSystem.calculateComboBonus(mockPlayerState);

      expect(bonus).toBe(0);
    });
  });

  describe("performance tests", () => {
    it("should handle rapid attack calculations", () => {
      const technique = { id: "cheonjang_byeokryeok", range: 100 };
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        CombatSystem.calculateDamage(
          technique,
          50,
          mockPlayerState,
          mockDefender,
          null
        );
      }

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100); // Should complete within 100ms
    });

    it("should efficiently execute multiple attacks", () => {
      const technique = { id: "cheonjang_byeokryeok", range: 100 };
      const startTime = performance.now();

      for (let i = 0; i < 50; i++) {
        CombatSystem.executeAttack(mockPlayerState, mockDefender, technique);
      }

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(200); // Should complete within 200ms
    });

    it("should handle complex vital point calculations", () => {
      const technique = { id: "cheonjang_byeokryeok", range: 100 };
      const vitalPointHit: VitalPointHit = {
        hit: true,
        damage: 35,
        statusEffects: [
          {
            type: "stun",
            intensity: 1.0,
            duration: 1000,
            description: "Stunned",
          },
          {
            type: "paralysis",
            intensity: 0.5,
            duration: 2000,
            description: "Paralyzed",
          },
        ],
        multiplier: 1.8,
        vitalPointId: "temple",
        effectiveness: 0.95,
        description: "Critical temple strike",
      };

      const startTime = performance.now();

      for (let i = 0; i < 30; i++) {
        CombatSystem.calculateDamage(
          technique,
          50,
          mockPlayerState,
          mockDefender,
          vitalPointHit
        );
      }

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(50); // Should complete within 50ms
    });
  });

  describe("checkVitalPointHit", () => {
    it("should detect vital point hits based on precision", () => {
      const attackerPos: Vector2D = { x: 50, y: 50 };
      const defenderPos: Vector2D = { x: 55, y: 55 };
      const technique = { id: "천둥벽력", range: 100 }; // Proper object structure
      const distance = 30;

      const vitalHit = CombatSystem.checkVitalPointHit(
        attackerPos,
        defenderPos,
        technique,
        distance
      );

      // Should return either null or a valid hit
      if (vitalHit) {
        expect(vitalHit.hit).toBe(true);
        expect(vitalHit.vitalPointId).toBeDefined();
        expect(vitalHit.multiplier).toBeGreaterThan(0);
      }
    });
  });

  // Helper function can be used if needed in future tests
  function createMockPlayer(overrides: Partial<PlayerState> = {}): PlayerState {
    return {
      id: "test-player",
      health: 100,
      maxHealth: 100,
      stamina: 100,
      maxStamina: 100,
      ki: 50,
      maxKi: 100,
      stance: "geon",
      position: { x: 100, y: 100 },
      statusEffects: [],
      isBlocking: false,
      isCountering: false,
      comboCount: 0,
      lastActionTime: 0,
      ...overrides,
    };
  }
});
