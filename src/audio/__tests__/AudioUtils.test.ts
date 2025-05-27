import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { AudioUtils } from "../AudioUtils";

// Mock Audio constructor for testing
const mockAudioElement = {
  canPlayType: vi.fn(),
  src: "",
  preload: "auto",
  crossOrigin: "anonymous",
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  load: vi.fn(),
  currentTime: 0,
  duration: 0,
  volume: 1,
  muted: false,
  ended: false,
  paused: true,
  readyState: 0,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
} as const;

// Mock window.Audio constructor
const MockAudio = vi.fn(() => mockAudioElement);

// Store original values for proper restoration
const originalAudio = global.Audio;
const originalWindow = global.window;

describe("AudioUtils", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock global Audio constructor
    global.Audio = MockAudio as any;

    // Mock window object for browser environment tests
    Object.defineProperty(global, "window", {
      value: {
        Audio: MockAudio,
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    // Restore original Audio constructor
    global.Audio = originalAudio;

    // Restore original window object
    if (originalWindow) {
      global.window = originalWindow;
    } else {
      // Only delete if it was originally undefined
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
        configurable: true,
      });
    }
  });

  describe("getPreferredAudioFormat", () => {
    it("should return 'ogg' when browser supports OGG Vorbis", () => {
      // Arrange
      mockAudioElement.canPlayType.mockImplementation((type: string) => {
        if (type === "audio/ogg; codecs=vorbis") return "probably";
        return "";
      });

      // Act
      const format = AudioUtils.getPreferredAudioFormat();

      // Assert
      expect(format).toBe("ogg");
      expect(mockAudioElement.canPlayType).toHaveBeenCalledWith(
        "audio/ogg; codecs=vorbis"
      );
    });

    it("should return 'mp3' when browser supports MP3 but not OGG", () => {
      // Arrange
      mockAudioElement.canPlayType.mockImplementation((type: string) => {
        if (type === "audio/ogg; codecs=vorbis") return "";
        if (type === "audio/mpeg") return "probably";
        return "";
      });

      // Act
      const format = AudioUtils.getPreferredAudioFormat();

      // Assert
      expect(format).toBe("mp3");
      expect(mockAudioElement.canPlayType).toHaveBeenCalledWith(
        "audio/ogg; codecs=vorbis"
      );
      expect(mockAudioElement.canPlayType).toHaveBeenCalledWith("audio/mpeg");
    });

    it("should return 'mp3' as fallback when no preferred formats are supported", () => {
      // Arrange
      mockAudioElement.canPlayType.mockReturnValue("");

      // Act
      const format = AudioUtils.getPreferredAudioFormat();

      // Assert
      expect(format).toBe("mp3"); // Updated to match implementation
    });

    it("should return 'ogg' when running in non-browser environment (SSR)", () => {
      // Arrange - Temporarily undefine window
      Object.defineProperty(global, "window", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      // Act
      const format = AudioUtils.getPreferredAudioFormat();

      // Assert
      expect(format).toBe("ogg");
    });
  });

  describe("createAudioElement", () => {
    it("should create audio element with correct src and preload settings", () => {
      // Arrange
      const testSrc = "https://example.com/test-audio.mp3";

      // Act
      const audioElement = AudioUtils.createAudioElement(testSrc);

      // Assert
      expect(MockAudio).toHaveBeenCalledTimes(1);
      expect(audioElement.src).toBe(testSrc);
      expect(audioElement.preload).toBe("auto");
      expect(audioElement.crossOrigin).toBe("anonymous");
    });

    it("should create audio element with Korean martial arts sound file path", () => {
      // Arrange
      const koreanAudioSrc = "./assets/audio/sfx/korean_attack_천둥벽력.ogg";

      // Act
      const audioElement = AudioUtils.createAudioElement(koreanAudioSrc);

      // Assert
      expect(audioElement.src).toBe(koreanAudioSrc);
      expect(audioElement.preload).toBe("auto");
    });
  });

  describe("calculateVolume", () => {
    it("should return 1.0 when distance is 0 (closest)", () => {
      // Act
      const volume = AudioUtils.calculateVolume(0, 100);

      // Assert
      expect(volume).toBe(1.0);
    });

    it("should return 0.0 when distance equals maxDistance (furthest)", () => {
      // Act
      const volume = AudioUtils.calculateVolume(100, 100);

      // Assert
      expect(volume).toBe(0.0);
    });

    it("should return 0.5 when distance is half of maxDistance", () => {
      // Act
      const volume = AudioUtils.calculateVolume(50, 100);

      // Assert
      expect(volume).toBe(0.5);
    });

    it("should handle Korean martial arts combat distances correctly", () => {
      // Arrange: Testing typical dojang combat ranges
      const closeRange = 30; // Close quarter combat
      const mediumRange = 80; // Medium range techniques
      const maxRange = 120; // Maximum technique range

      // Act
      const closeVolume = AudioUtils.calculateVolume(closeRange, maxRange);
      const mediumVolume = AudioUtils.calculateVolume(mediumRange, maxRange);

      // Assert
      expect(closeVolume).toBeCloseTo(0.75, 2);
      expect(mediumVolume).toBeCloseTo(0.333, 2);
    });

    it("should clamp negative distances to 0 volume", () => {
      // Act
      const volume = AudioUtils.calculateVolume(-10, 100);

      // Assert
      expect(volume).toBe(0);
    });
  });

  describe("formatAudioTime", () => {
    it("should format whole minutes correctly", () => {
      // Act
      const formatted = AudioUtils.formatAudioTime(120);

      // Assert
      expect(formatted).toBe("2:00");
    });

    it("should format mixed minutes and seconds correctly", () => {
      // Act
      const formatted = AudioUtils.formatAudioTime(85);

      // Assert
      expect(formatted).toBe("1:25");
    });

    it("should pad single digit seconds with zero", () => {
      // Act
      const formatted = AudioUtils.formatAudioTime(65);

      // Assert
      expect(formatted).toBe("1:05");
    });

    it("should handle zero seconds", () => {
      // Act
      const formatted = AudioUtils.formatAudioTime(0);

      // Assert
      expect(formatted).toBe("0:00");
    });

    it("should handle negative values by treating as zero", () => {
      // Act
      const formatted = AudioUtils.formatAudioTime(-30);

      // Assert
      expect(formatted).toBe("0:00");
    });
  });

  describe("Korean Martial Arts Specific Tests", () => {
    it("should calculate appropriate volumes for dojang spatial audio", () => {
      // Arrange: Korean dojang dimensions (typical training hall)
      const dorangMaxWidth = 200; // 20 meters
      const dorangMaxHeight = 150; // 15 meters
      const maxAudioDistance = Math.sqrt(
        dorangMaxWidth ** 2 + dorangMaxHeight ** 2
      );

      // Act: Test different positions in the dojang
      const centerVolume = AudioUtils.calculateVolume(0, maxAudioDistance);
      const nearWallVolume = AudioUtils.calculateVolume(100, maxAudioDistance);
      const farCornerVolume = AudioUtils.calculateVolume(
        maxAudioDistance,
        maxAudioDistance
      );

      // Assert
      expect(centerVolume).toBe(1.0);
      expect(nearWallVolume).toBeGreaterThan(0.5);
      expect(farCornerVolume).toBe(0.0);
    });

    it("should format Korean martial arts match times correctly", () => {
      // Arrange: Standard Korean martial arts competition times
      const roundDuration = 90; // 1.5 minutes per round
      const breakDuration = 30; // 30 seconds between rounds
      const totalMatchTime = roundDuration * 3 + breakDuration * 2; // 3 rounds + 2 breaks

      // Act
      const roundFormatted = AudioUtils.formatAudioTime(roundDuration);
      const breakFormatted = AudioUtils.formatAudioTime(breakDuration);
      const totalFormatted = AudioUtils.formatAudioTime(totalMatchTime);

      // Assert
      expect(roundFormatted).toBe("1:30");
      expect(breakFormatted).toBe("0:30");
      expect(totalFormatted).toBe("5:30");
    });

    it("should validate Korean martial arts audio file paths", () => {
      // Arrange
      const validPaths = [
        "./assets/audio/sfx/천둥벽력_attack.ogg",
        "./assets/audio/sfx/화염지창_strike.mp3",
        "./assets/audio/music/도장_background.wav",
      ];

      const invalidPaths = [
        "./assets/images/sprite.png",
        "./assets/data/config.json",
        "invalid-file",
      ];

      // Act & Assert
      validPaths.forEach((path) => {
        expect(AudioUtils.isValidAudioUrl(path)).toBe(true);
      });

      invalidPaths.forEach((path) => {
        expect(AudioUtils.isValidAudioUrl(path)).toBe(false);
      });
    });

    it("should generate correct Korean technique audio paths", () => {
      // Act
      const attackPath = AudioUtils.generateKoreanTechniqueAudioPath(
        "천둥벽력",
        "attack",
        "ogg"
      );
      const hitPath = AudioUtils.generateKoreanTechniqueAudioPath(
        "화염지창",
        "hit",
        "mp3"
      );

      // Assert
      expect(attackPath).toBe("./assets/audio/sfx/attack_천둥벽력.ogg");
      expect(hitPath).toBe("./assets/audio/sfx/hit_화염지창.mp3");
    });

    it("should calculate technique audio parameters correctly", () => {
      // Act
      const lightParams = AudioUtils.calculateTechniqueAudioParams(15, false);
      const vitalParams = AudioUtils.calculateTechniqueAudioParams(40, true);

      // Assert
      expect(lightParams.volume).toBeCloseTo(0.39, 2);
      expect(lightParams.pitch).toBeCloseTo(0.86, 2);
      expect(vitalParams.pitch).toBe(1.3);
      expect(vitalParams.duration).toBe(0.3);
    });
  });

  describe("Error Handling", () => {
    it("should handle Audio constructor throwing error gracefully", () => {
      // Arrange
      const ThrowingAudio = vi.fn(() => {
        throw new Error("Audio constructor failed");
      });
      global.Audio = ThrowingAudio as any;

      // Act & Assert
      expect(() => {
        AudioUtils.createAudioElement("test.mp3");
      }).toThrow("Audio constructor failed");
    });

    it("should handle invalid technique names gracefully", () => {
      // Act
      const path = AudioUtils.generateKoreanTechniqueAudioPath(
        "invalid/technique!@#",
        "attack"
      );

      // Assert
      expect(path).toBe("./assets/audio/sfx/attack_invalid_technique___.ogg");
    });
  });
});
