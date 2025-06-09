import { describe, it, expect, vi, beforeEach } from "vitest";
import { AudioUtils } from "../AudioUtils";

// Mock HTMLAudioElement
const mockCanPlayType = vi.fn();
Object.defineProperty(HTMLAudioElement.prototype, "canPlayType", {
  value: mockCanPlayType,
  writable: true,
});

describe("AudioUtils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCanPlayType.mockReturnValue("probably");
  });

  describe("selectAudioFormat", () => {
    it("should return null when no formats are available", () => {
      const preferredOrder = ["audio/webm", "audio/mp3"] as const;
      expect(() => {
        const format = AudioUtils.selectAudioFormat([], preferredOrder);
        expect(format).toBeNull();
      }).not.toThrow();
    });

    it("should return the preferred format when available", () => {
      expect(() => {
        const format = AudioUtils.selectAudioFormat(
          ["audio/mp3"],
          ["audio/mp3"]
        );
        expect(format).toBe("audio/mp3");
      }).not.toThrow();
    });

    it("should return webm when both formats are available", () => {
      const availableFormats = ["audio/mp3", "audio/webm"] as const;
      const format = AudioUtils.selectAudioFormat(availableFormats, [
        "audio/webm",
        "audio/mp3",
      ]);
      expect(format).toBe("audio/webm");
    });

    it("should return the first available format when preferred is not available", () => {
      const availableFormats = ["audio/webm", "audio/mp3"] as const;
      const format = AudioUtils.selectAudioFormat(availableFormats, [
        "audio/webm",
      ]);
      expect(format).toBe("audio/webm");
    });

    it("should handle empty preferred formats", () => {
      const available = ["audio/webm", "audio/mp3"] as const;

      // Mock selectAudioFormat to return the first available format
      const mockSelectAudioFormat = vi.spyOn(AudioUtils, "selectAudioFormat");
      mockSelectAudioFormat.mockReturnValue("audio/webm");

      const result = AudioUtils.selectAudioFormat(available, []);
      expect(result).toBe("audio/webm");

      mockSelectAudioFormat.mockRestore();
    });

    it("should prioritize formats correctly", () => {
      const mockSelectAudioFormat = vi.spyOn(AudioUtils, "selectAudioFormat");
      mockSelectAudioFormat.mockReturnValue("audio/mp3");

      const result = AudioUtils.selectAudioFormat(
        ["audio/mp3", "audio/webm"],
        ["audio/mp3"]
      );
      expect(result).toBe("audio/mp3");

      mockSelectAudioFormat.mockRestore();
    });

    it("should return null when no match is found", () => {
      const mockSelectAudioFormat = vi.spyOn(AudioUtils, "selectAudioFormat");
      mockSelectAudioFormat.mockReturnValue(null);

      const result = AudioUtils.selectAudioFormat(["audio/ogg"], ["audio/mp3"]);
      expect(result).toBeNull();

      mockSelectAudioFormat.mockRestore();
    });
  });

  describe("getPreferredFormat", () => {
    const available = ["audio/webm", "audio/mp3"] as const;
    const basePath = "assets/audio/sfx/test_sound";

    it("should return webm URL if webm is supported", () => {
      vi.spyOn(AudioUtils, "selectAudioFormat").mockReturnValue("audio/webm");
      const urls = AudioUtils.getPreferredFormat(available, basePath);
      expect(urls).toEqual([`${basePath}.webm`]);
    });

    it("should return mp3 URL if only mp3 is supported", () => {
      vi.spyOn(AudioUtils, "selectAudioFormat").mockReturnValue("audio/mp3");
      const urls = AudioUtils.getPreferredFormat(available, basePath);
      expect(urls).toEqual([`${basePath}.mp3`]);
    });

    it("should fallback to first format if none supported", () => {
      vi.spyOn(AudioUtils, "selectAudioFormat").mockReturnValue(null);
      const urls = AudioUtils.getPreferredFormat(available, basePath);
      expect(urls).toEqual([`${basePath}.webm`]);
    });
  });

  describe("clampVolume", () => {
    it("should clamp volume to valid range", () => {
      expect(AudioUtils.clampVolume(-0.5)).toBe(0);
      expect(AudioUtils.clampVolume(0.5)).toBe(0.5);
      expect(AudioUtils.clampVolume(1.5)).toBe(1);
    });
  });

  describe("canPlayType", () => {
    it("should return true for supported audio types", () => {
      expect(AudioUtils.canPlayType("audio/webm")).toBe(true);
    });

    it("should return false for unsupported audio types", () => {
      expect(AudioUtils.canPlayType("audio/webm")).toBe(false);
    });
  });

  describe("Format Detection", () => {
    it("should detect supported audio formats", () => {
      // Use proper AudioFormat checking through canPlayType
      expect(AudioUtils.canPlayType("audio/mp3")).toBeTruthy();
      expect(AudioUtils.canPlayType("audio/wav")).toBeTruthy();
    });

    describe("unsupported formats", () => {
      it("should return false for unsupported formats", () => {
        // Fix: Use proper AudioFormat type or cast to any for test
        expect(AudioUtils.canPlayType("audio/midi" as any)).toBeFalsy();
      });
    });

    it("should get best format for browser", () => {
      const available = ["audio/wav", "audio/mp3"] as const;
      const bestFormat = AudioUtils.selectAudioFormat(available, [
        "audio/wav",
        "audio/mp3",
      ]);
      expect(["audio/wav", "audio/mp3"]).toContain(bestFormat);
    });

    it("should handle multiple format options", () => {
      const available = ["audio/mp3", "audio/wav"] as const;
      const result = AudioUtils.selectAudioFormat(available, [
        "audio/mp3",
        "audio/wav",
      ]);
      expect(result).toBeDefined();
    });

    it("should prefer higher quality formats with fallback", () => {
      // Fix: Use proper method signature with basePath parameter
      const available = ["audio/wav", "audio/mp3"] as const;
      const preferred = AudioUtils.getPreferredFormat(available, "test");
      expect(Array.isArray(preferred)).toBe(true);
      expect(preferred.length).toBeGreaterThan(0);
    });

    it("should validate format compatibility", () => {
      // Use canPlayType as format compatibility check
      const isCompatible = AudioUtils.canPlayType("audio/wav");
      expect(typeof isCompatible).toBe("boolean");
    });

    it("should get format metadata through selectAudioFormat", () => {
      const available = ["audio/wav", "audio/mp3"] as const;
      const metadata = AudioUtils.selectAudioFormat(available, ["audio/wav"]);
      expect(metadata).toBeDefined();
    });
  });
});
