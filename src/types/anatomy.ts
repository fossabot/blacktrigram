// Types related to anatomy, vital points, and meridians

import type { Position, TrilingualName } from "./common";
import type { VitalPointCategory } from "./enums";
import type { StatusEffect } from "./effects";

export interface VitalPointSystemConfig {
  readonly baseAccuracy: number;
  readonly distanceModifier: number;
  readonly targetingDifficulty?: number;
  readonly damageMultiplier?: number;
  readonly effectChance?: number;
  readonly angleModifier?: number;
}

export interface VitalPoint {
  id: string;
  name: TrilingualName;
  koreanName: string; // Often a more specific Korean name for display
  position: Position;
  region: string; // Corresponds to AnatomicalRegion id or a sub-region
  difficulty?: number;
  damageMultiplier: number;
  effects?: StatusEffect[];
  category?: VitalPointCategory;
  description?: { korean: string; english: string };
  meridian?: string; // ID of the EnergyMeridian it belongs to
}

export interface AnatomicalRegion {
  id: string; // e.g., "head", "torso_upper", "left_arm_upper"
  name: { english: string; korean: string };
  bounds: {
    top: number;
    bottom: number;
    left: number;
    right: number;
    x?: number; // Optional, if using x/y/width/height
    y?: number;
    width?: number;
    height?: number;
  };
  vitalPoints: VitalPoint[]; // Embedded vital points for this region
  vulnerability?: number; // General vulnerability multiplier for the region
  traditionalName?: string; // Traditional Korean name for the region
}

export interface EnergyMeridian {
  id: string; // e.g., "lung_meridian"
  korean: string;
  english: string;
  element: string; // e.g., "Metal", "Wood"
  points: string[]; // IDs of VitalPoints along this meridian
  startPoint?: Position; // Visual representation start
  endPoint?: Position; // Visual representation end
}

export interface ElementalRelations {
  strengthens: string; // Element it strengthens
  weakens: string | string[]; // Element(s) it weakens
  strengthenedBy: string; // Element that strengthens it
  weakenedBy: string; // Element that weakens it
  element?: string; // The element itself
}

export interface KoreanAnatomicalZone {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly boundaries: {
    readonly top: number;
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
  };
  readonly vulnerability: number;
  readonly meridians: readonly string[]; // IDs of meridians passing through
  readonly vitalPoints: readonly string[]; // IDs of vital points in this zone
  readonly traditionalImportance: number; // Cultural/martial significance
  readonly description: string;
}
