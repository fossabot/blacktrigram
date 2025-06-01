/**
 * VariantSelector - Smart audio variant selection for Korean martial arts game
 * Manages multiple audio file variants to prevent repetitive sound effects
 */

export type VariantSelectionStrategy = "random" | "sequential" | "adaptive";

export interface VariantPlayHistory {
  lastPlayed: number;
  playCount: number;
  recentVariants: string[];
}

export class SmartVariantSelector {
  private strategy: VariantSelectionStrategy;
  private playHistory = new Map<string, VariantPlayHistory>();
  private sequentialIndex = new Map<string, number>();

  constructor(strategy: VariantSelectionStrategy = "adaptive") {
    this.strategy = strategy;
  }

  selectVariant(
    soundId: string,
    availableVariants: readonly string[]
  ): string | null {
    if (!availableVariants || availableVariants.length === 0) {
      return null;
    }

    if (availableVariants.length === 1) {
      return availableVariants[0] || null;
    }

    switch (this.strategy) {
      case "random":
        return this.selectRandomVariant([...availableVariants]);
      case "sequential":
        return this.selectSequentialVariant(soundId, [...availableVariants]);
      case "adaptive":
        return this.selectAdaptiveVariant(soundId, [...availableVariants]);
      default:
        return this.selectRandomVariant([...availableVariants]);
    }
  }

  private selectRandomVariant(variants: string[]): string {
    const randomIndex = Math.floor(Math.random() * variants.length);
    const selected = variants[randomIndex];
    return selected ?? variants[0] ?? "";
  }

  private selectSequentialVariant(soundId: string, variants: string[]): string {
    const currentIndex = this.sequentialIndex.get(soundId) || 0;
    const nextIndex = (currentIndex + 1) % variants.length;
    this.sequentialIndex.set(soundId, nextIndex);
    const selected = variants[currentIndex];
    return selected ?? variants[0] ?? "";
  }

  private selectAdaptiveVariant(soundId: string, variants: string[]): string {
    const history = this.playHistory.get(soundId) || {
      lastPlayed: 0,
      playCount: 0,
      recentVariants: [],
    };

    // Filter out recently played variants to avoid immediate repetition
    const maxRecent = Math.min(2, variants.length - 1);
    const availableVariants = variants.filter(
      (variant) => !history.recentVariants.includes(variant)
    );

    let selectedVariant: string;

    if (availableVariants.length > 0) {
      // Select from non-recent variants
      selectedVariant = this.selectRandomVariant(availableVariants);
    } else {
      // All variants were recent, reset and select any
      selectedVariant = this.selectRandomVariant(variants);
      history.recentVariants = [];
    }

    // Update history
    history.recentVariants.push(selectedVariant);
    if (history.recentVariants.length > maxRecent) {
      history.recentVariants.shift();
    }
    history.lastPlayed = Date.now();
    history.playCount++;

    this.playHistory.set(soundId, history);
    return selectedVariant;
  }

  setStrategy(strategy: VariantSelectionStrategy): void {
    this.strategy = strategy;
  }

  clearHistory(soundId?: string): void {
    if (soundId) {
      this.playHistory.delete(soundId);
      this.sequentialIndex.delete(soundId);
    } else {
      this.playHistory.clear();
      this.sequentialIndex.clear();
    }
  }
}
