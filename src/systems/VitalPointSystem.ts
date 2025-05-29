import type {
  VitalPoint,
  VitalPointHit,
  AnatomicalRegion,
  VitalPointCategory,
} from "../types";

interface VitalPointSystemConfig {
  readonly detectionRadius: number;
  readonly vitalPointMultiplier: number;
  readonly accuracyThreshold: number;
}

interface VitalPointSystemState {
  readonly vitalPointsHit: number;
  readonly totalHits: number;
  readonly sessionStartTime: number;
}

export class VitalPointSystem {
  private readonly config: VitalPointSystemConfig;
  private readonly state: VitalPointSystemState;
  private readonly vitalPoints: VitalPoint[];

  constructor(config?: Partial<VitalPointSystemConfig>) {
    this.config = {
      detectionRadius: 30,
      vitalPointMultiplier: 1.5,
      accuracyThreshold: 0.8,
      ...config,
    };

    this.state = {
      vitalPointsHit: 0,
      totalHits: 0,
      sessionStartTime: Date.now(),
    };

    this.vitalPoints = this.initializeKoreanVitalPoints();
  }

  private initializeKoreanVitalPoints(): VitalPoint[] {
    // Traditional Korean martial arts vital points (급소)
    return [
      {
        id: "head_crown",
        korean: "백회혈",
        english: "Crown Point",
        region: "head",
        position: { x: 0, y: -100 },
        coordinates: { x: 0, y: -100 },
        category: "primary",
        difficulty: 0.9,
        bounds: { x: -10, y: -110, width: 20, height: 20 },
        vulnerability: {
          damage: 150,
          stunning: 80,
          criticalChance: 0.9,
        },
        description: {
          korean: "정수리 급소점 - 매우 위험한 부위",
          english: "Crown vital point - extremely dangerous area",
        },
      },
      {
        id: "neck_side",
        korean: "경동맥",
        english: "Carotid Artery",
        region: "neck",
        position: { x: 15, y: -80 },
        coordinates: { x: 15, y: -80 },
        category: "primary",
        difficulty: 0.8,
        bounds: { x: 10, y: -90, width: 10, height: 20 },
        vulnerability: {
          damage: 130,
          stunning: 70,
          criticalChance: 0.8,
        },
        description: {
          korean: "목 옆 급소 - 의식 잃을 수 있음",
          english: "Neck side vital point - can cause unconsciousness",
        },
      },
      {
        id: "solar_plexus",
        korean: "명치",
        english: "Solar Plexus",
        region: "chest",
        position: { x: 0, y: -40 },
        coordinates: { x: 0, y: -40 },
        category: "secondary",
        difficulty: 0.6,
        bounds: { x: -15, y: -50, width: 30, height: 20 },
        vulnerability: {
          damage: 120,
          stunning: 60,
          criticalChance: 0.7,
        },
        description: {
          korean: "명치 급소 - 호흡곤란 유발",
          english: "Solar plexus - causes breathing difficulty",
        },
      },
      {
        id: "liver_point",
        korean: "간장혈",
        english: "Liver Point",
        region: "abdomen",
        position: { x: 20, y: -20 },
        coordinates: { x: 20, y: -20 },
        category: "secondary",
        difficulty: 0.7,
        bounds: { x: 15, y: -30, width: 15, height: 20 },
        vulnerability: {
          damage: 110,
          stunning: 50,
          criticalChance: 0.6,
        },
        description: {
          korean: "간장 급소 - 내장 손상 위험",
          english: "Liver vital point - risk of internal damage",
        },
      },
      {
        id: "knee_joint",
        korean: "슬관절",
        english: "Knee Joint",
        region: "legs",
        position: { x: 0, y: 60 },
        coordinates: { x: 0, y: 60 },
        category: "tertiary",
        difficulty: 0.5,
        bounds: { x: -10, y: 50, width: 20, height: 20 },
        vulnerability: {
          damage: 90,
          stunning: 30,
          criticalChance: 0.4,
        },
        description: {
          korean: "무릎 관절 - 이동 능력 제한",
          english: "Knee joint - limits mobility",
        },
      },
    ];
  }

  public detectVitalPointHit(
    x: number,
    y: number,
    damage: number
  ): VitalPointHit {
    const hitPoint = { x, y };

    // Find the closest vital point within detection radius
    let closestVitalPoint: VitalPoint | null = null;
    let minDistance = Infinity;

    for (const vitalPoint of this.vitalPoints) {
      const distance = this.calculateDistance(hitPoint, vitalPoint.position);

      if (distance <= this.config.detectionRadius && distance < minDistance) {
        minDistance = distance;
        closestVitalPoint = vitalPoint;
      }
    }

    if (!closestVitalPoint) {
      return {
        hit: false,
        damage,
        stunning: 0,
        critical: false,
        description: "Normal hit - no vital point struck",
      };
    }

    // Calculate enhanced damage based on vital point
    const enhancedDamage = Math.round(
      damage *
        (closestVitalPoint.vulnerability.damage / 100) *
        this.config.vitalPointMultiplier
    );

    const region = this.detectAnatomicalRegion(x, y);
    const critical =
      Math.random() < closestVitalPoint.vulnerability.criticalChance;

    return {
      hit: true,
      region,
      damage: enhancedDamage,
      stunning: closestVitalPoint.vulnerability.stunning,
      critical,
      description: `${closestVitalPoint.korean} - ${closestVitalPoint.description.korean}`,
      vitalPoint: closestVitalPoint,
      effectiveness: closestVitalPoint.vulnerability.damage,
    };
  }

  private calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
  ): number {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private detectAnatomicalRegion(
    x: number,
    y: number
  ): AnatomicalRegion | undefined {
    // Simple anatomical region detection based on coordinates
    if (y < -70) return "head";
    if (y < -50) return "neck";
    if (y < -10) return "chest";
    if (y < 30) return "abdomen";
    if (Math.abs(x) > 30) return "arms";
    return "legs";
  }

  private getVitalPointByRegion(region: AnatomicalRegion): VitalPoint | null {
    return this.vitalPoints.find((vp) => vp.region === region) || null;
  }

  public getVitalPointsStats(): Record<string, unknown> {
    return {
      totalVitalPoints: this.vitalPoints.length,
      vitalPointsHit: this.state.vitalPointsHit,
      totalHits: this.state.totalHits,
      accuracy:
        this.state.totalHits > 0
          ? this.state.vitalPointsHit / this.state.totalHits
          : 0,
      config: this.config,
    };
  }

  public getVitalPointsByCategory(category: VitalPointCategory): VitalPoint[] {
    return this.vitalPoints.filter((vp) => vp.category === category);
  }

  public getAllVitalPoints(): readonly VitalPoint[] {
    return [...this.vitalPoints];
  }
}
