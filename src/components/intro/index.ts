/**
 * Intro screen components export
 */

// Main screen
export { IntroScreen } from "./IntroScreen";
export { default as IntroScreenDefault } from "./IntroScreen";

// Components - avoid duplicate exports
export { MenuSection, PhilosophySection, ControlsSection } from "./components";

// Sections (with different names to avoid conflicts)
export {
  MenuSection as MenuSectionAlt,
  PhilosophySection as PhilosophySectionAlt,
  ControlsSection as ControlsSectionAlt,
} from "./sections";

// Type exports
export type { IntroScreenProps } from "../../types/components";
