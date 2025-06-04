/**
 * Audio Variant Selector for Korean Martial Arts Context
 * Selects appropriate audio variants based on game state and cultural context
 */

import type { SoundEffectId, MusicId } from "../types/audio";
import type { PlayerArchetype } from "../types/player";
import type { TrigramStance } from "../types/trigram";
import { getSoundAsset, getMusicAsset } from "./AudioAssetRegistry";

export interface AudioContext {
  readonly archetype?: PlayerArchetype;
  readonly stance?: TrigramStance;
  readonly combatIntensity?: "low" | "medium" | "high" | "critical";
  readonly culturalMode?: "traditional" | "cyberpunk" | "fusion";
  readonly damage?: number;
  readonly isVitalPoint?: boolean;
  readonly isCritical?: boolean;
}

export class VariantSelector {
  /**
   * Select optimal sound variant based on context
   */
  public static selectSoundVariant(
    soundId: SoundEffectId,
    context: AudioContext = {}
  ): string {
    const asset = getSoundAsset(soundId);
    if (!asset || !asset.variants || asset.variants.length === 0) {
      return "default";
    }

    const {
      archetype,
      stance,
      combatIntensity = "medium",
      culturalMode = "fusion",
      damage = 0,
      isVitalPoint = false,
      isCritical = false,
    } = context;

    // Archetype-specific variant selection
    if (archetype) {
      const archetypeVariant = this.getArchetypeVariant(
        soundId,
        archetype,
        [...asset.variants] // Convert readonly array to mutable
      );
      if (archetypeVariant) return archetypeVariant;
    }

    // Stance-specific variant selection
    if (stance && this.isStanceRelatedSound(soundId)) {
      if (asset.variants.includes(stance)) {
        return stance;
      }
    }

    // Combat intensity-based selection
    if (this.isCombatSound(soundId)) {
      return this.getCombatVariant(
        [...asset.variants], // Convert readonly array to mutable
        combatIntensity,
        damage,
        isVitalPoint,
        isCritical
      );
    }

    // Cultural mode-based selection
    if (this.isUISound(soundId)) {
      return this.getCulturalVariant([...asset.variants], culturalMode); // Convert readonly array to mutable
    }

    // Default selection
    return asset.variants.includes("default")
      ? "default"
      : asset.variants[0] || "default";
  }

  /**
   * Select optimal music variant based on context
   */
  public static selectMusicVariant(
    musicId: MusicId,
    context: AudioContext = {}
  ): string {
    const asset = getMusicAsset(musicId);
    if (!asset || !asset.variants || asset.variants.length === 0) {
      return "default";
    }

    const { archetype, culturalMode = "fusion" } = context;

    // Archetype-specific music themes
    if (archetype && this.hasArchetypeMusic(musicId)) {
      const archetypeVariant = `${archetype}_theme`;
      if (asset.variants.includes(archetypeVariant)) {
        return archetypeVariant;
      }
    }

    // Cultural mode preference
    return this.getCulturalVariant([...asset.variants], culturalMode); // Convert readonly array to mutable
  }

  private static getArchetypeVariant(
    _soundId: SoundEffectId, // Mark as unused
    archetype: PlayerArchetype,
    variants: string[]
  ): string | null {
    // Archetype-specific sound preferences
    const archetypePreferences: Record<PlayerArchetype, string[]> = {
      musa: ["military", "disciplined", "traditional", "bone_breaking"],
      amsalja: ["stealth", "precise", "silent", "nerve_shock"],
      hacker: ["digital", "tech", "electronic", "cyber"],
      jeongbo_yowon: ["strategic", "calculated", "psychological", "analytical"],
      jojik_pokryeokbae: ["brutal", "harsh", "street", "devastating"],
    };

    const preferences = archetypePreferences[archetype] || [];

    for (const preference of preferences) {
      if (variants.includes(preference)) {
        return preference;
      }
    }

    return null;
  }

  private static getCombatVariant(
    variants: string[],
    intensity: "low" | "medium" | "high" | "critical",
    damage: number,
    isVitalPoint: boolean,
    isCritical: boolean
  ): string {
    // Critical hit takes highest priority
    if (isCritical && variants.includes("critical_impact")) {
      return "critical_impact";
    }

    // Vital point targeting
    if (isVitalPoint && variants.includes("vital_point")) {
      return "vital_point";
    }

    // Damage-based selection
    if (damage > 30 && variants.includes("devastating_impact")) {
      return "devastating_impact";
    }
    if (damage > 20 && variants.includes("heavy_trauma")) {
      return "heavy_trauma";
    }
    if (damage > 10 && variants.includes("solid_hit")) {
      return "solid_hit";
    }

    // Intensity-based selection
    const intensityMap: Record<string, string[]> = {
      critical: ["devastating_impact", "bone_breaking", "critical_impact"],
      high: ["heavy_trauma", "powerful_strike", "explosive_finish"],
      medium: ["solid_hit", "effective_strike", "focused_impact"],
      low: ["light_contact", "glancing_blow", "soft_hit"],
    };

    const intensityVariants = intensityMap[intensity] || [];
    for (const variant of intensityVariants) {
      if (variants.includes(variant)) {
        return variant;
      }
    }

    return variants.includes("default") ? "default" : variants[0] || "default";
  }

  private static getCulturalVariant(
    variants: string[],
    culturalMode: "traditional" | "cyberpunk" | "fusion"
  ): string {
    const culturalMap: Record<string, string[]> = {
      traditional: [
        "traditional",
        "korean_traditional",
        "temple_gong",
        "wood_block",
      ],
      cyberpunk: ["cyberpunk", "electronic", "digital", "neon"],
      fusion: ["fusion", "traditional_cyber", "modern_traditional", "default"],
    };

    const culturalVariants = culturalMap[culturalMode] || [];
    for (const variant of culturalVariants) {
      if (variants.includes(variant)) {
        return variant;
      }
    }

    return variants.includes("default") ? "default" : variants[0] || "default";
  }

  private static isStanceRelatedSound(soundId: SoundEffectId): boolean {
    return (
      soundId === "stance_change" ||
      soundId === "technique_execute" ||
      soundId === "ki_release"
    );
  }

  private static isCombatSound(soundId: SoundEffectId): boolean {
    return (
      soundId.startsWith("attack_") ||
      soundId.startsWith("hit_") ||
      soundId.includes("strike") ||
      soundId.includes("combat")
    );
  }

  private static isUISound(soundId: SoundEffectId): boolean {
    return (
      soundId.startsWith("menu_") ||
      soundId.includes("select") ||
      soundId.includes("hover")
    );
  }

  private static hasArchetypeMusic(musicId: MusicId): boolean {
    return musicId === "combat_theme" || musicId === "training_theme";
  }

  /**
   * Get all available variants for a sound effect
   */
  public static getAvailableVariants(
    soundId: SoundEffectId
  ): readonly string[] {
    const asset = getSoundAsset(soundId);
    return asset?.variants || ["default"];
  }

  /**
   * Check if a specific variant exists for a sound
   */
  public static hasVariant(soundId: SoundEffectId, variant: string): boolean {
    const variants = this.getAvailableVariants(soundId);
    return variants.includes(variant);
  }
}
