import { describe, it, expect, vi, beforeEach } from "vitest";
import { AudioUtils } from "../AudioUtils";
import type { AudioFormat } from "../../types/audio";

describe("AudioUtils", () => {
  // Mock for document.createElement('audio').canPlayType
  const mockCanPlayType = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    AudioUtils["audioTestElement"] = {
      canPlayType: mockCanPlayType,
    } as any;
  });

  describe("selectAudioFormat", () => {
    const availableFormats: readonly AudioFormat[] = ["webm", "mp3"];
    const preferredOrder: readonly AudioFormat[] = ["webm", "mp3"];

    it("should select webm if supported and preferred", () => {
      mockCanPlayType.mockImplementation(
        (type: string) => type === "audio/webm"
      );
      const format = AudioUtils.selectAudioFormat(
        availableFormats,
        preferredOrder
      );
      expect(format).toBe("webm");
    });

    it("should select mp3 if webm is not supported but mp3 is, and mp3 is preferred next", () => {
      mockCanPlayType.mockImplementation(
        (type: string) => type === "audio/mpeg"
      ); // mp3
      const format = AudioUtils.selectAudioFormat(availableFormats, [
        "webm",
        "mp3",
      ]);
      expect(format).toBe("mp3");
    });

    it("should select mp3 if only mp3 is available and supported", () => {
      mockCanPlayType.mockImplementation(
        (type: string) => type === "audio/mpeg"
      );
      const format = AudioUtils.selectAudioFormat(["mp3"], ["mp3"]);
      expect(format).toBe("mp3");
    });

    it("should return null if no preferred formats are supported", () => {
      mockCanPlayType.mockReturnValue(false); // No format supported
      const format = AudioUtils.selectAudioFormat(
        availableFormats,
        preferredOrder
      );
      expect(format).toBeNull();
    });

    it("should return null if availableFormats is empty", () => {
      mockCanPlayType.mockReturnValue(true);
      const format = AudioUtils.selectAudioFormat([], preferredOrder);
      expect(format).toBeNull();
    });

    it("should handle mpeg for mp3", () => {
      mockCanPlayType.mockImplementation(
        (type: string) => type === "audio/mpeg"
      );
      const format = AudioUtils.selectAudioFormat(["mp3"], ["mp3"]);
      expect(format).toBe("mp3");
      expect(mockCanPlayType).toHaveBeenCalledWith("audio/mpeg");
    });
  });

  describe("getPreferredFormat", () => {
    const available: readonly AudioFormat[] = ["webm", "mp3"];
    const preferred: readonly AudioFormat[] = ["webm", "mp3"];
    const basePath = "assets/audio/sfx";
    const assetId = "test_sound";

    it("should return webm URL if webm is supported", () => {
      vi.spyOn(AudioUtils, "selectAudioFormat").mockReturnValue("webm");
      const url = AudioUtils.getPreferredFormat(
        available,
        basePath,
        preferred,
        assetId
      );
      expect(url).toBe("assets/audio/sfx/test_sound.webm");
    });

    it("should return mp3 URL if webm is not supported but mp3 is", () => {
      vi.spyOn(AudioUtils, "selectAudioFormat").mockReturnValue("mp3");
      const url = AudioUtils.getPreferredFormat(
        available,
        basePath,
        preferred,
        assetId
      );
      expect(url).toBe("assets/audio/sfx/test_sound.mp3");
    });

    it("should use assetUrlOrBasePath as template if it contains {format}", () => {
      vi.spyOn(AudioUtils, "selectAudioFormat").mockReturnValue("webm");
      const templateUrl = "assets/audio/sfx/test_sound.{format}";
      const url = AudioUtils.getPreferredFormat(
        available,
        templateUrl,
        preferred
      );
      expect(url).toBe("assets/audio/sfx/test_sound.webm");
    });

    it("should fallback to first available format if selectAudioFormat returns null but formats are available", () => {
      vi.spyOn(AudioUtils, "selectAudioFormat").mockReturnValue(null);
      const url = AudioUtils.getPreferredFormat(
        available,
        basePath,
        preferred,
        assetId
      );
      expect(url).toBe("assets/audio/sfx/test_sound.webm"); // Falls back to available[0]
    });

    it("should return original path if no format can be determined and it's not a template", () => {
      vi.spyOn(AudioUtils, "selectAudioFormat").mockReturnValue(null);
      const directUrl = "assets/audio/sfx/test_sound.ogg"; // Not in available, not a template
      const url = AudioUtils.getPreferredFormat(
        [],
        directUrl,
        preferred,
        assetId
      );
      expect(url).toBe(directUrl);
    });
  });

  describe("canPlayType", () => {
    it("should call audio element canPlayType for webm", () => {
      AudioUtils.canPlayType("audio/webm");
      expect(mockCanPlayType).toHaveBeenCalledWith("audio/webm");
    });

    it("should call audio element canPlayType for mpeg (mp3)", () => {
      AudioUtils.canPlayType("audio/mpeg");
      expect(mockCanPlayType).toHaveBeenCalledWith("audio/mpeg");
    });
  });

  // ... other tests for clamp, formatAudioTime etc.
});
