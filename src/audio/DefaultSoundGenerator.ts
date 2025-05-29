/**
 * Default Sound Generator for Korean Martial Arts Game
 * Provides fallback audio generation when sound files are not available
 */

export class DefaultSoundGenerator {
  private static audioContext: AudioContext | null = null;

  private static getAudioContext(): AudioContext {
    if (!this.audioContext) {
      // Use proper fallback for AudioContext
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    }
    return this.audioContext;
  }

  private static async generateTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    volume: number = 0.3
  ): Promise<void> {
    try {
      const ctx = this.getAudioContext();

      // Resume context if suspended
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + duration
      );

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);

      return new Promise((resolve) => {
        oscillator.onended = () => resolve();
      });
    } catch (error) {
      console.warn("Failed to generate tone:", error);
    }
  }

  public static async playAttackSound(damage: number): Promise<void> {
    const baseFreq = 200 + damage * 8;
    const duration = 0.1 + damage * 0.003;
    await this.generateTone(baseFreq, duration, "square", 0.4);
  }

  public static async playHitSound(
    damage: number,
    isVitalPoint: boolean = false
  ): Promise<void> {
    const freq = isVitalPoint ? 800 : 300 + damage * 5;
    const duration = isVitalPoint ? 0.3 : 0.15;
    await this.generateTone(freq, duration, "sawtooth", 0.35);
  }

  public static async playMenuSound(): Promise<void> {
    await this.generateTone(800, 0.1, "sine", 0.2);
  }

  public static async playMatchStartSound(): Promise<void> {
    await this.generateTone(1000, 0.5, "triangle", 0.4);
  }

  public static async playVictorySound(): Promise<void> {
    // Play ascending victory chord
    await this.generateTone(523, 0.3, "sine", 0.3); // C
    setTimeout(() => this.generateTone(659, 0.3, "sine", 0.3), 150); // E
    setTimeout(() => this.generateTone(784, 0.5, "sine", 0.4), 300); // G
  }

  public static async playStanceChangeSound(): Promise<void> {
    await this.generateTone(600, 0.2, "sine", 0.25);
    setTimeout(() => this.generateTone(400, 0.1, "triangle", 0.15), 100);
  }

  public static async playComboSound(count: number): Promise<void> {
    for (let i = 0; i < Math.min(count, 5); i++) {
      setTimeout(() => {
        this.generateTone(500 + i * 100, 0.08, "square", 0.2);
      }, i * 50);
    }
  }
}

// Export default instance
export const defaultSoundGenerator = DefaultSoundGenerator;
