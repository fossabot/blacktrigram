import { describe, it, expect, vi, beforeEach } from "vitest";

// Audio utility functions
export const AudioUtils = {
  /**
   * Clamps a value between min and max
   */
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  },

  /**
   * Calculates volume based on damage for dynamic audio feedback
   */
  calculateDamageVolume: (damage: number, baseVolume: number = 0.7): number => {
    const normalizedDamage = Math.min(damage / 50, 1); // Normalize to 0-1
    const volumeMultiplier = 0.5 + normalizedDamage * 0.5; // Range: 0.5-1.0
    return AudioUtils.clamp(baseVolume * volumeMultiplier, 0.1, 1.0);
  },

  /**
   * Calculates pitch/rate based on damage for dynamic audio feedback
   */
  calculateDamageRate: (damage: number, baseRate: number = 1.0): number => {
    const normalizedDamage = Math.min(damage / 50, 1);
    const rateMultiplier = 0.8 + normalizedDamage * 0.6; // Range: 0.8-1.4
    return AudioUtils.clamp(baseRate * rateMultiplier, 0.5, 2.0);
  },

  /**
   * Gets appropriate combo sound based on combo count
   */
  getComboSoundName: (comboCount: number): string => {
    if (comboCount >= 5) return "combo_5";
    if (comboCount >= 3) return "combo_3";
    return "combo_2";
  },

  /**
   * Checks if browser supports Web Audio API
   */
  supportsWebAudio: (): boolean => {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
  },

  /**
   * Checks if browser supports HTML5 Audio
   */
  supportsHTML5Audio: (): boolean => {
    return !!window.Audio;
  },

  /**
   * Gets the best audio format supported by the browser
   */
  getPreferredAudioFormat: (): "mp3" | "ogg" | "wav" => {
    const audio = new Audio();

    if (audio.canPlayType('audio/ogg; codecs="vorbis"')) {
      return "ogg";
    } else if (audio.canPlayType("audio/mpeg")) {
      return "mp3";
    } else {
      return "wav";
    }
  },

  /**
   * Creates audio source array for Howler.js with fallbacks
   */
  createAudioSources: (basePath: string, filename: string): string[] => {
    return [
      `${basePath}/${filename}.mp3`,
      `${basePath}/${filename}.ogg`,
      `${basePath}/${filename}.wav`,
    ];
  },

  /**
   * Validates audio options
   */
  validateAudioOptions: (options: any): boolean => {
    if (typeof options !== "object" || options === null) return false;

    if (
      options.volume !== undefined &&
      (typeof options.volume !== "number" ||
        options.volume < 0 ||
        options.volume > 1)
    ) {
      return false;
    }

    if (
      options.rate !== undefined &&
      (typeof options.rate !== "number" ||
        options.rate < 0.1 ||
        options.rate > 4)
    ) {
      return false;
    }

    if (
      options.delay !== undefined &&
      (typeof options.delay !== "number" || options.delay < 0)
    ) {
      return false;
    }

    return true;
  },
};

// Mock Audio constructor for testing
const mockAudio = {
  canPlayType: vi.fn(),
};

Object.defineProperty(window, "Audio", {
  writable: true,
  value: vi.fn(() => mockAudio),
});

describe("AudioUtils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("clamp", () => {
    it("should clamp values within range", () => {
      expect(AudioUtils.clamp(0.5, 0, 1)).toBe(0.5);
    });

    it("should clamp values below minimum", () => {
      expect(AudioUtils.clamp(-0.5, 0, 1)).toBe(0);
    });

    it("should clamp values above maximum", () => {
      expect(AudioUtils.clamp(1.5, 0, 1)).toBe(1);
    });

    it("should handle edge cases", () => {
      expect(AudioUtils.clamp(0, 0, 1)).toBe(0);
      expect(AudioUtils.clamp(1, 0, 1)).toBe(1);
    });
  });

  describe("calculateDamageVolume", () => {
    it("should calculate volume based on damage", () => {
      // Low damage should give lower volume
      const lowDamageVolume = AudioUtils.calculateDamageVolume(10, 0.7);
      expect(lowDamageVolume).toBeGreaterThan(0.35);
      expect(lowDamageVolume).toBeLessThan(0.7);

      // High damage should give higher volume
      const highDamageVolume = AudioUtils.calculateDamageVolume(40, 0.7);
      expect(highDamageVolume).toBeGreaterThan(lowDamageVolume);
      expect(highDamageVolume).toBeLessThanOrEqual(0.7);
    });

    it("should respect base volume", () => {
      const volume1 = AudioUtils.calculateDamageVolume(25, 0.5);
      const volume2 = AudioUtils.calculateDamageVolume(25, 0.8);

      expect(volume2).toBeGreaterThan(volume1);
    });

    it("should clamp to valid range", () => {
      const volume = AudioUtils.calculateDamageVolume(0, 1.0);
      expect(volume).toBeGreaterThanOrEqual(0.1);
      expect(volume).toBeLessThanOrEqual(1.0);
    });
  });

  describe("calculateDamageRate", () => {
    it("should calculate rate based on damage", () => {
      const lowDamageRate = AudioUtils.calculateDamageRate(5, 1.0);
      const highDamageRate = AudioUtils.calculateDamageRate(45, 1.0);

      expect(highDamageRate).toBeGreaterThan(lowDamageRate);
    });

    it("should respect base rate", () => {
      const rate1 = AudioUtils.calculateDamageRate(25, 0.8);
      const rate2 = AudioUtils.calculateDamageRate(25, 1.2);

      expect(rate2).toBeGreaterThan(rate1);
    });

    it("should clamp to valid range", () => {
      const rate = AudioUtils.calculateDamageRate(100, 2.0);
      expect(rate).toBeGreaterThanOrEqual(0.5);
      expect(rate).toBeLessThanOrEqual(2.0);
    });
  });

  describe("getComboSoundName", () => {
    it("should return appropriate combo sound names", () => {
      expect(AudioUtils.getComboSoundName(1)).toBe("combo_2");
      expect(AudioUtils.getComboSoundName(2)).toBe("combo_2");
      expect(AudioUtils.getComboSoundName(3)).toBe("combo_3");
      expect(AudioUtils.getComboSoundName(4)).toBe("combo_3");
      expect(AudioUtils.getComboSoundName(5)).toBe("combo_5");
      expect(AudioUtils.getComboSoundName(10)).toBe("combo_5");
    });
  });

  describe("supportsWebAudio", () => {
    it("should detect Web Audio API support", () => {
      // Mock AudioContext
      Object.defineProperty(window, "AudioContext", {
        writable: true,
        value: vi.fn(),
      });

      expect(AudioUtils.supportsWebAudio()).toBe(true);

      // Remove AudioContext but add webkitAudioContext
      // @ts-expect-error - Testing undefined AudioContext
      window.AudioContext = undefined;
      (window as any).webkitAudioContext = vi.fn();

      expect(AudioUtils.supportsWebAudio()).toBe(true);

      // Remove both
      (window as any).webkitAudioContext = undefined;
      expect(AudioUtils.supportsWebAudio()).toBe(false);
    });
  });

  describe("supportsHTML5Audio", () => {
    it("should detect HTML5 Audio support", () => {
      expect(AudioUtils.supportsHTML5Audio()).toBe(true);

      // Mock unsupported browser
      const originalAudio = window.Audio;
      // @ts-expect-error - Testing undefined Audio
      window.Audio = undefined;

      expect(AudioUtils.supportsHTML5Audio()).toBe(false);

      // Restore
      window.Audio = originalAudio;
    });
  });

  describe("getPreferredAudioFormat", () => {
    it("should prefer OGG when supported", () => {
      mockAudio.canPlayType.mockImplementation((type: string) => {
        if (type.includes("ogg")) return "probably";
        if (type.includes("mpeg")) return "maybe";
        return "";
      });

      expect(AudioUtils.getPreferredAudioFormat()).toBe("ogg");
    });

    it("should fallback to MP3 when OGG not supported", () => {
      mockAudio.canPlayType.mockImplementation((type: string) => {
        if (type.includes("ogg")) return "";
        if (type.includes("mpeg")) return "probably";
        return "";
      });

      expect(AudioUtils.getPreferredAudioFormat()).toBe("mp3");
    });

    it("should fallback to WAV when neither supported", () => {
      mockAudio.canPlayType.mockReturnValue("");

      expect(AudioUtils.getPreferredAudioFormat()).toBe("wav");
    });
  });

  describe("createAudioSources", () => {
    it("should create audio source array with all formats", () => {
      const sources = AudioUtils.createAudioSources(
        "/audio/music",
        "combat_theme"
      );

      expect(sources).toEqual([
        "/audio/music/combat_theme.mp3",
        "/audio/music/combat_theme.ogg",
        "/audio/music/combat_theme.wav",
      ]);
    });

    it("should handle different base paths", () => {
      const sources = AudioUtils.createAudioSources(
        "/sounds/sfx",
        "menu_select"
      );

      expect(sources).toEqual([
        "/sounds/sfx/menu_select.mp3",
        "/sounds/sfx/menu_select.ogg",
        "/sounds/sfx/menu_select.wav",
      ]);
    });
  });

  describe("validateAudioOptions", () => {
    it("should validate correct options", () => {
      expect(AudioUtils.validateAudioOptions({})).toBe(true);
      expect(AudioUtils.validateAudioOptions({ volume: 0.5 })).toBe(true);
      expect(AudioUtils.validateAudioOptions({ rate: 1.2 })).toBe(true);
      expect(AudioUtils.validateAudioOptions({ delay: 100 })).toBe(true);
      expect(
        AudioUtils.validateAudioOptions({
          volume: 0.8,
          rate: 1.5,
          delay: 200,
        })
      ).toBe(true);
    });

    it("should reject invalid options", () => {
      expect(AudioUtils.validateAudioOptions(null)).toBe(false);
      expect(AudioUtils.validateAudioOptions("invalid")).toBe(false);
      expect(AudioUtils.validateAudioOptions({ volume: -0.1 })).toBe(false);
      expect(AudioUtils.validateAudioOptions({ volume: 1.1 })).toBe(false);
      expect(AudioUtils.validateAudioOptions({ rate: 0.05 })).toBe(false);
      expect(AudioUtils.validateAudioOptions({ rate: 5 })).toBe(false);
      expect(AudioUtils.validateAudioOptions({ delay: -10 })).toBe(false);
    });

    it("should handle non-number values", () => {
      expect(AudioUtils.validateAudioOptions({ volume: "loud" })).toBe(false);
      expect(AudioUtils.validateAudioOptions({ rate: "fast" })).toBe(false);
      expect(AudioUtils.validateAudioOptions({ delay: "soon" })).toBe(false);
    });
  });
});
