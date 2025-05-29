import type {
  AnatomicalRegion,
  VitalPoint,
  VitalPointHit,
  VitalPointCategory,
} from "../types/index";

// Use explicit type assertion to resolve import conflicts
type MainAnatomicalRegion = AnatomicalRegion;

const VITAL_POINTS_DATA: Record<MainAnatomicalRegion, VitalPoint> = {
  head: {
    id: "head_vital",
    korean: "머리",
    english: "Head",
    region: "head" as MainAnatomicalRegion,
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
    region: "neck" as MainAnatomicalRegion,
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
    region: "chest" as MainAnatomicalRegion,
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
    region: "abdomen" as MainAnatomicalRegion,
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
    region: "arms" as MainAnatomicalRegion,
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
    region: "legs" as MainAnatomicalRegion,
    bounds: { x: 0, y: 150, width: 40, height: 80 },
    vulnerability: { damage: 1.4, stunning: 1.0, criticalChance: 0.5 },
    description: {
      korean: "급소 - 다리 부위",
      english: "Vital point - Legs region",
    },
  },
} as const;

export class VitalPointSystem {
  private readonly config: {
    readonly maxHitDistance: number;
    readonly precisionThreshold: number;
    readonly debugging: boolean;
  };

  constructor(config?: {
    maxHitDistance?: number;
    precisionThreshold?: number;
    debugging?: boolean;
    enabled?: boolean; // Accept but ignore for backward compatibility
  }) {
    this.config = {
      maxHitDistance: config?.maxHitDistance ?? 30,
      precisionThreshold: config?.precisionThreshold ?? 0.8,
      debugging: config?.debugging ?? false,
    };
  }

  public detectVitalPointHit(
    x: number,
    y: number,
    damage: number
  ): VitalPointHit {
    for (const vitalPoint of Object.values(VITAL_POINTS_DATA)) {
      const distance = this.calculateDistance(x, y, vitalPoint.bounds);

      if (distance <= this.config.maxHitDistance) {
        const critical = distance <= this.config.maxHitDistance * 0.5;
        const description = critical
          ? vitalPoint.description.korean
          : "일반 타격";

        return {
          hit: true,
          region: vitalPoint.region,
          damage: damage * vitalPoint.vulnerability.damage,
          stunning: vitalPoint.vulnerability.stunning,
          critical,
          description,
          vitalPoint,
          effectiveness: 1.0 - distance / this.config.maxHitDistance,
          effects: vitalPoint.effects,
        };
      }
    }

    return {
      hit: false,
      damage: 0,
      stunning: 0,
      critical: false,
      description: "빗나감",
    };
  }

  private calculateDistance(
    x: number,
    y: number,
    bounds: { x: number; y: number; width: number; height: number }
  ): number {
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  }

  public getAllVitalPoints(): VitalPoint[] {
    return Object.values(VITAL_POINTS_DATA);
  }

  public getVitalPointByRegion(region: AnatomicalRegion): VitalPoint | null {
    return VITAL_POINTS_DATA[region] || null;
  }

  public getAvailableVitalPoints(): VitalPoint[] {
    return this.getAllVitalPoints();
  }

  public getState(): { vitalPointsHit: number; config: typeof this.config } {
    return {
      vitalPointsHit: 0, // Could track this in real implementation
      config: this.config,
    };
  }

  public clearEffects(): void {
    // Implementation for clearing effects
  }

  public updateConfig(newConfig: Partial<typeof this.config>): void {
    // Update configuration
    Object.assign(this.config as any, newConfig);
  }

  public getVitalPointStats(): Record<string, unknown> {
    return this.getVitalPointsStats();
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
}
