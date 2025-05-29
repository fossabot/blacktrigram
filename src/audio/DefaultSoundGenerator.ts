/**
 * Default Sound Generator for Korean Martial Arts Game
 * Provides fallback audio generation when sound files are not available
 */

class DefaultSoundGenerator {
  private audioContext: AudioContext | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private async generateTone(
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

  public async playMenuSound(): Promise<void> {
    await this.generateTone(800, 0.1, "sine", 0.2);
  }

  public async playMatchStartSound(): Promise<void> {
    // Traditional bell-like sound
    await this.generateTone(440, 0.3, "sine", 0.4);
    setTimeout(async () => {
      await this.generateTone(880, 0.2, "triangle", 0.3);
    }, 100);
  }

  public async playVictorySound(): Promise<void> {
    // Victory fanfare
    const notes = [440, 554, 659, 880];
    for (let i = 0; i < notes.length; i++) {
      setTimeout(async () => {
        await this.generateTone(notes[i], 0.2, "square", 0.3);
      }, i * 150);
    }
  }

  public async playAttackSound(damage: number): Promise<void> {
    const baseFreq = 200 + damage * 8;
    const duration = 0.1 + damage * 0.003;
    await this.generateTone(baseFreq, duration, "square", 0.4);
  }

  public async playHitSound(
    damage: number,
    isVitalPoint: boolean = false
  ): Promise<void> {
    const freq = isVitalPoint ? 800 : 300 + damage * 5;
    const duration = isVitalPoint ? 0.3 : 0.15;
    await this.generateTone(freq, duration, "sawtooth", 0.35);
  }

  public async playStanceChangeSound(): Promise<void> {
    await this.generateTone(600, 0.2, "sine", 0.25);
    setTimeout(async () => {
      await this.generateTone(400, 0.1, "triangle", 0.15);
    }, 100);
  }

  public async playComboSound(count: number): Promise<void> {
    for (let i = 0; i < Math.min(count, 5); i++) {
      setTimeout(async () => {
        await this.generateTone(500 + i * 100, 0.08, "square", 0.2);
      }, i * 50);
    }
  }

  public cleanup(): void {
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

export const defaultSoundGenerator = new DefaultSoundGenerator();
