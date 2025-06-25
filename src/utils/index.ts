/**
 * Utility functions and helpers for Black Trigram
 * @module utils
 * @category Utilities
 */

// Color utilities
export {
  darkenColor,
  getArchetypeColors,
  getColorWithAlpha,
  getContrastColor,
  getHealthColor,
  hexToRgb,
  interpolateColor,
  lightenColor,
  pixiToHex,
  rgbToHex,
} from "./colorUtils";

// Effect utilities
export {
  applyEffectModifiers,
  calculateEffectIntensity,
  combineEffects,
  createEffectFromKoreanText,
  createHitEffect,
  createKoreanStatusEffect,
  createStatusEffect,
  createTrigramEffect,
  createVitalPointEffect,
  getEffectDescription,
  getEffectDisplayText,
  getEffectDurationModifier,
  getHitEffectColor,
  groupEffectsByType,
  groupEffectsByTypeEnum,
  isEffectBeneficial,
  removeExpiredEffects,
  updateEffect,
} from "./effectUtils";

// PixiJS extensions
export {
  createKoreanGraphics,
  createResponsiveTextStyle,
  createTextStyle,
  drawButton,
  drawKoreanPanel,
  drawTrigramSymbol,
  extendPixiComponents,
  usePixiExtensions,
  useTick,
} from "./pixiExtensions";

// Player utilities
export {
  applyDamage,
  applyStatusEffect,
  calculateCombatEffectiveness,
  canPlayerAct,
  createPlayerFromArchetype,
  getArchetypeBonuses,
  getStanceEffectiveness,
  getVitalPointById,
  hasEnoughResources,
  resetPlayerState,
  updatePlayerState,
  updateStatusEffects,
} from "./playerUtils";
