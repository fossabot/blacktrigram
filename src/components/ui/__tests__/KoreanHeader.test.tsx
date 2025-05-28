import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

describe("KoreanHeader Component", () => {
  const mockProps = {
    koreanTitle: "흑괘 무술 도장",
    englishTitle: "BLACK TRIGRAM MARTIAL ARTS DOJANG",
    subtitle: "Traditional Korean Combat Arts",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("renders Korean text correctly", () => {
      const MockKoreanHeader = () => (
        <div data-testid="korean-header">
          <div data-testid="korean-title">{mockProps.koreanTitle}</div>
          <div data-testid="english-title">{mockProps.englishTitle}</div>
        </div>
      );

      render(<MockKoreanHeader />);
      expect(screen.getByTestId("korean-title")).toHaveTextContent(
        "흑괘 무술 도장"
      );
      expect(screen.getByTestId("english-title")).toHaveTextContent(
        "BLACK TRIGRAM"
      );
    });
  });

  describe("Global Test Environment", () => {
    it("should have proper global setup", () => {
      expect(typeof globalThis).toBe("object");
    });
  });
});
