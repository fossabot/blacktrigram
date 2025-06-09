/**
 * Base UI components export
 */

// Components
export { BaseButton } from "./BaseButton";
export { KoreanHeader } from "./KoreanHeader";
export { BackgroundGrid } from "./BackgroundGrid";

// Fix: Remove exports that don't exist
// export { KoreanPixiComponents } from "./KoreanPixiComponents";

// Korean text system
export * from "./korean-text";

// PIXI utilities
export * from "./PixiComponents";

// Fix: Remove default exports that don't exist
// export { default as BackgroundGridDefault } from "./BackgroundGrid";
// export { default as KoreanPixiComponentsDefault } from "./KoreanPixiComponents";

// Type exports
export type { BaseComponentProps } from "../../../types/components";
