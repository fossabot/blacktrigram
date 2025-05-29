import type {
  AnatomicalRegion,
  VitalPoint,
  DamageResult,
  VitalPointCategory,
  TrigramStance,
} from "../types";

// Comprehensive vital point data with all required properties
const VITAL_POINTS_DATA: Record<AnatomicalRegion, VitalPoint> = {
  head: {
    id: "head_vital",
    korean: "머리",
    english: "Head",
    region: "head" as AnatomicalRegion,
    bounds: { x: 0, y: 0, width: 40, height: 40 },
    vulnerability: { damage: 2.0, stunning: 1.5, criticalChance: 0.8 },
    description: {
      korean: "급소 - 머리 부위",
      english: "Vital point - Head region",
    },
  },
  neck: {
    id: "neck_vital",
    korean: "목",
    english: "Neck",
    region: "neck" as AnatomicalRegion,
    bounds: { x: 0, y: 40, width: 30, height: 20 },
    vulnerability: { damage: 2.5, stunning: 2.0, criticalChance: 0.9 },
    description: {
      korean: "급소 - 목 부위",
      english: "Vital point - Neck region",
    },
  },
  chest: {
    id: "chest_vital",
    korean: "가슴",
    english: "Chest",
    region: "chest" as AnatomicalRegion,
    bounds: { x: 0, y: 60, width: 60, height: 50 },
    vulnerability: { damage: 1.8, stunning: 1.2, criticalChance: 0.7 },
    description: {
      korean: "급소 - 가슴 부위",
      english: "Vital point - Chest region",
    },
  },
  abdomen: {
    id: "abdomen_vital",
    korean: "복부",
    english: "Abdomen",
    region: "abdomen" as AnatomicalRegion,
    bounds: { x: 0, y: 110, width: 50, height: 40 },
    vulnerability: { damage: 2.2, stunning: 1.8, criticalChance: 0.8 },
    description: {
      korean: "급소 - 복부 부위",
      english: "Vital point - Abdomen region",
    },
  },
  arms: {
    id: "arms_vital",
    korean: "팔",
    english: "Arms",
    region: "arms" as AnatomicalRegion,
    bounds: { x: 60, y: 60, width: 30, height: 60 },
    vulnerability: { damage: 1.3, stunning: 0.8, criticalChance: 0.4 },
    description: {
      korean: "급소 - 팔 부위",
      english: "Vital point - Arms region",
    },
  },
  legs: {
    id: "legs_vital",
    korean: "다리",
    english: "Legs",
    region: "legs" as AnatomicalRegion,
    bounds: { x: 0, y: 150, width: 40, height: 80 },
    vulnerability: { damage: 1.4, stunning: 1.0, criticalChance: 0.5 },
    description: {
      korean: "급소 - 다리 부위",
      english: "Vital point - Legs region",
    },
  },
} as const;

export class VitalPointSystem {
  private readonly vitalPoints: Map<AnatomicalRegion, VitalPoint>;

  constructor() {
    this.vitalPoints = new Map(
      Object.entries(VITAL_POINTS_DATA) as [AnatomicalRegion, VitalPoint][]
    );
  }

  public detectVitalPointHit(x: number, y: number, radius: number): boolean {
    for (const vitalPoint of this.vitalPoints.values()) {
      const distance = Math.sqrt(
        Math.pow(x - (vitalPoint.bounds.x + vitalPoint.bounds.width / 2), 2) +
          Math.pow(y - (vitalPoint.bounds.y + vitalPoint.bounds.height / 2), 2)
      );

      if (
        distance <=
        radius + Math.max(vitalPoint.bounds.width, vitalPoint.bounds.height) / 2
      ) {
        return true;
      }
    }
    return false;
  }

  public getVitalPointAt(x: number, y: number): VitalPoint | null {
    for (const vitalPoint of this.vitalPoints.values()) {
      if (
        x >= vitalPoint.bounds.x &&
        x <= vitalPoint.bounds.x + vitalPoint.bounds.width &&
        y >= vitalPoint.bounds.y &&
        y <= vitalPoint.bounds.y + vitalPoint.bounds.height
      ) {
        return vitalPoint;
      }
    }
    return null;
  }

  public getVitalPointByRegion(region: AnatomicalRegion): VitalPoint | null {
    return this.vitalPoints.get(region) || null;
  }

  public calculateVitalPointDamage(
    baseDamage: number,
    region: AnatomicalRegion
  ): DamageResult {
    const vitalPoint = this.vitalPoints.get(region);

    if (!vitalPoint) {
      return {
        damage: baseDamage,
        multiplier: 1.0,
        critical: false,
        effectType: "normal",
      };
    }

    const finalDamage = Math.round(
      baseDamage * vitalPoint.vulnerability.damage
    );
    const isCritical = Math.random() < vitalPoint.vulnerability.criticalChance;

    return {
      damage: isCritical ? Math.round(finalDamage * 1.5) : finalDamage,
      multiplier: vitalPoint.vulnerability.damage,
      critical: isCritical,
      effectType: isCritical ? "critical" : "vital_point",
      stunDuration: vitalPoint.vulnerability.stunning * 1000, // Convert to milliseconds
    };
  }

  public getVitalPointsStats(): Record<string, unknown> {
    const stats: Record<string, unknown> = {};

    for (const [region, vitalPoint] of this.vitalPoints.entries()) {
      stats[region] = {
        damageMultiplier: vitalPoint.vulnerability.damage,
        stunMultiplier: vitalPoint.vulnerability.stunning,
        criticalChance: vitalPoint.vulnerability.criticalChance,
        area: vitalPoint.bounds.width * vitalPoint.bounds.height,
        korean: vitalPoint.korean,
        english: vitalPoint.english,
      };
    }

    return stats;
  }

  public getAllVitalPoints(): VitalPoint[] {
    return Array.from(this.vitalPoints.values());
  }

  public getRegionsForCategory(
    category: VitalPointCategory
  ): AnatomicalRegion[] {
    const categoryMap: Record<VitalPointCategory, AnatomicalRegion[]> = {
      primary: ["head", "neck", "chest"],
      secondary: ["abdomen", "arms"],
      tertiary: ["legs"],
    };

    return categoryMap[category] || [];
  }

  public calculateDamageWithVitalPoint(
    baseDamage: number,
    hitX: number,
    hitY: number,
    stance: TrigramStance
  ): DamageResult {
    const vitalPoint = this.getVitalPointAt(hitX, hitY);

    if (!vitalPoint) {
      return {
        damage: baseDamage,
        multiplier: 1.0,
        critical: false,
        effectType: "normal",
      };
    }

    // Stance-specific bonuses for vital point hits
    const stanceMultipliers: Record<TrigramStance, number> = {
      geon: 1.2, // Heaven - divine precision
      tae: 1.0, // Lake - balanced
      li: 1.3, // Fire - explosive damage
      jin: 1.1, // Thunder - shocking strikes
      son: 1.0, // Wind - swift but not devastating
      gam: 1.2, // Water - flowing precision
      gan: 0.9, // Mountain - defensive stance
      gon: 1.1, // Earth - grounded power
    };

    const stanceMultiplier = stanceMultipliers[stance];
    const vitalMultiplier = vitalPoint.vulnerability.damage;
    const totalMultiplier = stanceMultiplier * vitalMultiplier;

    const finalDamage = Math.round(baseDamage * totalMultiplier);
    const isCritical = Math.random() < vitalPoint.vulnerability.criticalChance;

    return {
      damage: isCritical ? Math.round(finalDamage * 1.5) : finalDamage,
      multiplier: totalMultiplier,
      critical: isCritical,
      effectType: isCritical ? "critical" : "vital_point",
      stunDuration: vitalPoint.vulnerability.stunning * 1000,
    };
  }
}
