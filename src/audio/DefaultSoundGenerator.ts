/**
 * DefaultSoundGenerator - Procedural audio generation for Korean martial arts game
 * Provides fallback sounds when audio assets are not available
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

  private async playTone(
    frequency: number,
    duration: number,
    type: OscillatorType = "sine",
    volume: number = 0.3
  ): Promise<void> {
    try {
      const ctx = this.getAudioContext();
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

      return new Promise<void>((resolve) => {
        oscillator.onended = () => resolve();
      });
    } catch (error) {
      console.warn("Failed to generate tone:", error);
    }
  }

  public async playMenuSound(): Promise<void> {
    await this.playTone(800, 0.1, "sine", 0.2);
  }

  public async playMatchStartSound(): Promise<void> {
    await this.playTone(600, 0.3, "triangle", 0.4);
  }

  public async playVictorySound(): Promise<void> {
    // Victory fanfare sequence
    await this.playTone(523, 0.2, "sine", 0.3); // C
    await new Promise((resolve) => setTimeout(resolve, 100));
    await this.playTone(659, 0.2, "sine", 0.3); // E
    await new Promise((resolve) => setTimeout(resolve, 100));
    await this.playTone(784, 0.4, "sine", 0.4); // G
  }

  public async playAttackSound(damage: number): Promise<void> {
    const baseFreq = 200 + damage * 10;
    const duration = 0.1 + damage * 0.005;
    await this.playTone(baseFreq, duration, "square", 0.4);
  }

  public async playHitSound(
    damage: number,
    isVitalPoint: boolean = false
  ): Promise<void> {
    const freq = isVitalPoint ? 150 + damage * 8 : 150 + damage * 5;
    const duration = isVitalPoint ? 0.25 : 0.15;
    await this.playTone(freq, duration, "sawtooth", 0.3);
  }

  public async playStanceChangeSound(): Promise<void> {
    await this.playTone(600, 0.2, "sine", 0.25);
    setTimeout(async () => {
      await this.playTone(400, 0.1, "triangle", 0.15);
    }, 100);
  }

  public async playComboSound(count: number): Promise<void> {
    for (let i = 0; i < Math.min(count, 5); i++) {
      setTimeout(async () => {
        await this.playTone(500 + i * 100, 0.08, "square", 0.2);
      }, i * 50);
    }
  }
}

export const defaultSoundGenerator = new DefaultSoundGenerator();
