/**
 * DefaultSoundGenerator - Fallback sound generation for Korean martial arts game
 * Uses Web Audio API to create procedural sounds when asset files are unavailable
 */

export class DefaultSoundGenerator {
  private static audioContext: AudioContext | null = null;

  private static getAudioContext(): AudioContext | null {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      } catch (error) {
        console.warn("AudioContext not available:", error);
        return null;
      }
    }
    return this.audioContext;
  }

  /**
   * Generate a simple tone for Korean martial arts sound effects
   */
  private static async generateTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    volume: number = 0.3
  ): Promise<void> {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    return new Promise((resolve) => {
      try {
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

        oscillator.onended = () => resolve();
      } catch (error) {
        console.warn("Failed to generate tone:", error);
        resolve();
      }
    });
  }

  /**
   * Generate Korean martial arts menu sounds
   */
  public static async playMenuSound(): Promise<void> {
    await this.generateTone(800, 0.1, "sine", 0.2);
  }

  /**
   * Generate match start sound with traditional Korean feel
   */
  public static async playMatchStartSound(): Promise<void> {
    // Simulate a temple bell strike
    await this.generateTone(400, 0.8, "sine", 0.4);
    setTimeout(async () => {
      await this.generateTone(200, 0.5, "triangle", 0.2);
    }, 200);
  }

  /**
   * Generate victory sound for Korean martial arts
   */
  public static async playVictorySound(): Promise<void> {
    // Rising triumphant tones
    const notes = [440, 550, 660, 880]; // A major chord progression
    for (let i = 0; i < notes.length; i++) {
      setTimeout(async () => {
        await this.generateTone(notes[i], 0.3, "triangle", 0.3);
      }, i * 150);
    }
  }

  /**
   * Generate stance change sound for trigram transitions
   */
  public static async playStanceChangeSound(): Promise<void> {
    await this.generateTone(600, 0.2, "sine", 0.25);
    setTimeout(async () => {
      await this.generateTone(400, 0.15, "triangle", 0.15);
    }, 100);
  }

  /**
   * Generate attack sound based on Korean martial arts damage
   */
  public static async playAttackSound(damage: number): Promise<void> {
    const baseFreq = 200 + damage * 8;
    const duration = 0.1 + damage * 0.004;
    const volume = Math.min(0.4, 0.2 + damage * 0.005);

    await this.generateTone(baseFreq, duration, "square", volume);
  }

  /**
   * Generate hit sound for Korean martial arts impacts
   */
  public static async playHitSound(
    damage: number,
    isVitalPoint: boolean = false
  ): Promise<void> {
    const freq = isVitalPoint ? 800 : 150 + damage * 5;
    const duration = isVitalPoint ? 0.25 : 0.15;
    const volume = Math.min(0.5, 0.2 + damage * 0.006);

    await this.generateTone(freq, duration, "sawtooth", volume);

    if (isVitalPoint) {
      // Add a higher pitch resonance for vital point hits
      setTimeout(async () => {
        await this.generateTone(1200, 0.1, "sine", 0.2);
      }, 50);
    }
  }

  /**
   * Generate combo sound for Korean martial arts combinations
   */
  public static async playComboSound(comboCount: number): Promise<void> {
    const maxSounds = Math.min(comboCount, 5);

    for (let i = 0; i < maxSounds; i++) {
      setTimeout(async () => {
        const freq = 500 + i * 100;
        const volume = 0.15 + i * 0.05;
        await this.generateTone(freq, 0.08, "square", volume);
      }, i * 60);
    }

    // Final flourish for high combos
    if (comboCount >= 5) {
      setTimeout(async () => {
        await this.generateTone(1000, 0.2, "triangle", 0.3);
      }, maxSounds * 60 + 100);
    }
  }
}

// Export singleton instance
export const defaultSoundGenerator = new DefaultSoundGenerator();
