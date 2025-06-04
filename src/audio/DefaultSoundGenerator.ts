import type { SoundEffectId } from "../types/audio";

/**
 * Korean Martial Arts Default Sound Generator for Black Trigram (흑괘)
 * Procedural sound generation for fallback audio when assets are missing
 */
export class DefaultSoundGenerator {
  private static audioContext: AudioContext | null = null;

  private static getAudioContext(): AudioContext | null {
    if (!DefaultSoundGenerator.audioContext) {
      try {
        DefaultSoundGenerator.audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn(
          "Failed to create AudioContext for DefaultSoundGenerator:",
          error
        );
        return null;
      }
    }
    return DefaultSoundGenerator.audioContext;
  }

  /**
   * Generate attack sound based on damage intensity
   */
  public static async playAttackSound(damage: number): Promise<void> {
    const context = DefaultSoundGenerator.getAudioContext();
    if (!context) return;

    try {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      // Frequency based on damage - higher damage = lower, more impactful sound
      const frequency = Math.max(150, 400 - damage * 5);
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.type = "square";

      // Volume and duration based on damage intensity
      const volume = Math.min(0.3, 0.1 + damage * 0.005);
      const duration = Math.min(0.3, 0.1 + damage * 0.005);

      gainNode.gain.setValueAtTime(volume, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        context.currentTime + duration
      );

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
    } catch (error) {
      console.warn("Failed to generate attack sound:", error);
    }
  }

  /**
   * Generate hit sound with vital point consideration
   */
  public static async playHitSound(
    damage: number,
    isVitalPoint: boolean = false
  ): Promise<void> {
    const context = DefaultSoundGenerator.getAudioContext();
    if (!context) return;

    try {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      if (isVitalPoint) {
        // Sharp, piercing sound for vital point hits
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
          200,
          context.currentTime + 0.1
        );
        oscillator.type = "sawtooth";
      } else {
        // Duller impact sound for regular hits
        const frequency = Math.max(100, 300 - damage * 3);
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);
        oscillator.type = "square";
      }

      const volume = isVitalPoint ? 0.2 : Math.min(0.2, 0.05 + damage * 0.003);
      const duration = isVitalPoint
        ? 0.2
        : Math.min(0.2, 0.08 + damage * 0.003);

      gainNode.gain.setValueAtTime(volume, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        context.currentTime + duration
      );

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + duration);
    } catch (error) {
      console.warn("Failed to generate hit sound:", error);
    }
  }

  /**
   * Generate stance change sound
   */
  public static async playStanceChangeSound(): Promise<void> {
    const context = DefaultSoundGenerator.getAudioContext();
    if (!context) return;

    try {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      // Rising tone for stance change
      oscillator.frequency.setValueAtTime(300, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        600,
        context.currentTime + 0.15
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        context.currentTime + 0.15
      );

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.15);
    } catch (error) {
      console.warn("Failed to generate stance change sound:", error);
    }
  }

  /**
   * Generate match start sound
   */
  public static async playMatchStartSound(): Promise<void> {
    const context = DefaultSoundGenerator.getAudioContext();
    if (!context) return;

    try {
      // Create a bell-like sound for match start
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.setValueAtTime(800, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        400,
        context.currentTime + 0.5
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.2, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        context.currentTime + 0.5
      );

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.5);
    } catch (error) {
      console.warn("Failed to generate match start sound:", error);
    }
  }

  /**
   * Generate victory sound
   */
  public static async playVictorySound(): Promise<void> {
    const context = DefaultSoundGenerator.getAudioContext();
    if (!context) return;

    try {
      // Create an ascending chord for victory
      const frequencies = [523, 659, 784]; // C-E-G chord

      frequencies.forEach((freq, index) => {
        const oscillator = context.createOscillator();
        const gainNode = context.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);

        oscillator.frequency.setValueAtTime(
          freq,
          context.currentTime + index * 0.1
        );
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0.1, context.currentTime + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          context.currentTime + 0.8 + index * 0.1
        );

        oscillator.start(context.currentTime + index * 0.1);
        oscillator.stop(context.currentTime + 0.8 + index * 0.1);
      });
    } catch (error) {
      console.warn("Failed to generate victory sound:", error);
    }
  }

  /**
   * Generate menu interaction sound
   */
  public static async playMenuSound(): Promise<void> {
    const context = DefaultSoundGenerator.getAudioContext();
    if (!context) return;

    try {
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.setValueAtTime(600, context.currentTime);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.1, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        context.currentTime + 0.1
      );

      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.1);
    } catch (error) {
      console.warn("Failed to generate menu sound:", error);
    }
  }

  /**
   * Generate placeholder sound by ID
   */
  public static async generatePlaceholderSound(
    soundId: SoundEffectId
  ): Promise<void> {
    switch (soundId) {
      case "attack_light":
      case "attack_medium":
      case "attack_heavy":
      case "attack_critical":
        const damage =
          soundId === "attack_critical"
            ? 40
            : soundId === "attack_heavy"
            ? 30
            : soundId === "attack_medium"
            ? 20
            : 10;
        await DefaultSoundGenerator.playAttackSound(damage);
        break;

      case "hit_light":
      case "hit_medium":
      case "hit_heavy":
      case "hit_critical":
        const hitDamage =
          soundId === "hit_critical"
            ? 40
            : soundId === "hit_heavy"
            ? 30
            : soundId === "hit_medium"
            ? 20
            : 10;
        await DefaultSoundGenerator.playHitSound(hitDamage);
        break;

      case "perfect_strike":
        await DefaultSoundGenerator.playHitSound(35, true);
        break;

      case "stance_change":
        await DefaultSoundGenerator.playStanceChangeSound();
        break;

      case "match_start":
        await DefaultSoundGenerator.playMatchStartSound();
        break;

      case "victory":
        await DefaultSoundGenerator.playVictorySound();
        break;

      case "menu_hover":
      case "menu_select":
        await DefaultSoundGenerator.playMenuSound();
        break;

      default:
        // Generic fallback
        await DefaultSoundGenerator.playMenuSound();
    }
  }
}
