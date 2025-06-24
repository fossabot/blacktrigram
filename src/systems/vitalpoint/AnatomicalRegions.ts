// Anatomical region mappings with proper boundaries
import type { Position } from "../../types/common";
import { KOREAN_VITAL_POINTS } from "../../types/constants/vital-points";
import { BodyRegion } from "../../types/enums";
import { VitalPoint } from "./types";

// Define the BodyRegionData interface since it's not exported from index
export interface BodyRegionData {
  readonly id: string;
  readonly name: {
    readonly korean: string;
    readonly english: string;
  };
  readonly boundaries: readonly Position[];
  readonly vitalPoints: readonly VitalPoint[];
}

// Anatomical region mappings with proper boundaries
export const ANATOMICAL_REGIONS: Record<BodyRegion, BodyRegionData> = {
  [BodyRegion.HEAD]: {
    id: "head",
    name: { korean: "머리", english: "Head" },
    boundaries: [
      { x: -100, y: -100 },
      { x: 100, y: -100 },
      { x: 100, y: 50 },
      { x: -100, y: 50 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter((vp) => vp.position.y < 0), // Head region vital points
  },
  [BodyRegion.NECK]: {
    id: "neck",
    name: { korean: "목", english: "Neck" },
    boundaries: [
      { x: -50, y: 50 },
      { x: 50, y: 50 },
      { x: 50, y: 100 },
      { x: -50, y: 100 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) => vp.position.y >= 50 && vp.position.y < 100
    ),
  },
  [BodyRegion.TORSO]: {
    id: "torso",
    name: { korean: "몸통", english: "Torso" },
    boundaries: [
      { x: -150, y: 100 },
      { x: 150, y: 100 },
      { x: 150, y: 400 },
      { x: -150, y: 400 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) => vp.position.y >= 100 && vp.position.y < 400
    ),
  },
  [BodyRegion.LEFT_ARM]: {
    id: "left_arm",
    name: { korean: "왼팔", english: "Left Arm" },
    boundaries: [
      { x: -250, y: 100 },
      { x: -150, y: 100 },
      { x: -150, y: 300 },
      { x: -250, y: 300 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) =>
        vp.position.x < -150 && vp.position.y >= 100 && vp.position.y < 300
    ),
  },
  [BodyRegion.RIGHT_ARM]: {
    id: "right_arm",
    name: { korean: "오른팔", english: "Right Arm" },
    boundaries: [
      { x: 150, y: 100 },
      { x: 250, y: 100 },
      { x: 250, y: 300 },
      { x: 150, y: 300 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) => vp.position.x > 150 && vp.position.y >= 100 && vp.position.y < 300
    ),
  },
  [BodyRegion.LEFT_LEG]: {
    id: "left_leg",
    name: { korean: "왼다리", english: "Left Leg" },
    boundaries: [
      { x: -100, y: 400 },
      { x: 0, y: 400 },
      { x: 0, y: 800 },
      { x: -100, y: 800 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) => vp.position.x < 0 && vp.position.y >= 400
    ),
  },
  [BodyRegion.RIGHT_LEG]: {
    id: "right_leg",
    name: { korean: "오른다리", english: "Right Leg" },
    boundaries: [
      { x: 0, y: 400 },
      { x: 100, y: 400 },
      { x: 100, y: 800 },
      { x: 0, y: 800 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) => vp.position.x >= 0 && vp.position.y >= 400
    ),
  },
  [BodyRegion.CORE]: {
    id: "core",
    name: { korean: "중심", english: "Core" },
    boundaries: [
      { x: -75, y: 150 },
      { x: 75, y: 150 },
      { x: 75, y: 350 },
      { x: -75, y: 350 },
    ],
    vitalPoints: KOREAN_VITAL_POINTS.filter(
      (vp) =>
        Math.abs(vp.position.x) < 75 &&
        vp.position.y >= 150 &&
        vp.position.y < 350
    ),
  },
};

// Helper functions for anatomical region operations
export function getVitalPointsInRegion(
  region: BodyRegion
): readonly VitalPoint[] {
  return ANATOMICAL_REGIONS[region]?.vitalPoints || [];
}

export function getRegionBoundaries(region: BodyRegion): readonly Position[] {
  return ANATOMICAL_REGIONS[region]?.boundaries || [];
}

export function isPositionInRegion(
  position: Position,
  region: BodyRegion
): boolean {
  const boundaries = getRegionBoundaries(region);
  if (boundaries.length < 4) return false;

  // Simple point-in-polygon test for rectangular regions
  const [topLeft, topRight, bottomRight, bottomLeft] = boundaries;
  return (
    position.x >= topLeft.x &&
    position.x <= topRight.x &&
    position.y >= bottomLeft.y &&
    position.y <= bottomRight.y
  );
}

export function getRegionForPosition(position: Position): BodyRegion | null {
  for (const region of Object.values(BodyRegion)) {
    if (isPositionInRegion(position, region)) {
      return region;
    }
  }
  return null;
}

// Additional utility functions for Korean martial arts vital point system
export function getRegionKoreanName(region: BodyRegion): string {
  return ANATOMICAL_REGIONS[region]?.name.korean || "";
}

export function getRegionEnglishName(region: BodyRegion): string {
  return ANATOMICAL_REGIONS[region]?.name.english || "";
}

export function getRegionData(region: BodyRegion): BodyRegionData | null {
  return ANATOMICAL_REGIONS[region] || null;
}
