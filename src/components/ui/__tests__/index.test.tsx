import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import {
  KoreanText,
  KoreanTitle,
  KoreanTechniqueText,
  KoreanStatusText,
  KoreanMartialText,
} from "../base/korean-text";
import { TrigramWheel } from "../TrigramWheel";
import { ProgressTracker } from "../ProgressTracker";
import { KOREAN_COLORS } from "../../../types";

// Mock PIXI React components
vi.mock("@pixi/react", () => ({
  Container: ({ children, ...props }: any) => (
    <div data-testid="pixi-container" {...props}>
      {children}
    </div>
  ),
  Graphics: ({ draw, ...props }: any) => {
    if (draw) {
      const mockGraphics = {
        clear: vi.fn(),
        setFillStyle: vi.fn(),
        setStrokeStyle: vi.fn(),
        circle: vi.fn(),
        rect: vi.fn(),
        fill: vi.fn(),
        stroke: vi.fn(),
      };
      draw(mockGraphics);
    }
    return <div data-testid="pixi-graphics" {...props} />;
  },
  Text: ({ text, children, ...props }: any) => (
    <div data-testid="pixi-text" {...props}>
      {text || children}
    </div>
  ),
}));

// Mock PIXI
vi.mock("pixi.js", () => ({
  TextStyle: vi.fn().mockImplementation(() => ({})),
}));

describe("Korean Text Components", () => {
  describe("KoreanTitle", () => {
    it("renders with korean and english text", () => {
      const { container } = render(
        <KoreanTitle
          korean="흑괘 무술"
          english="Black Trigram"
          subtitle="Traditional Korean Martial Arts"
          level={1}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it("renders with different header levels", () => {
      const { container } = render(<KoreanTitle korean="제목" level={2} />);
      expect(container).toBeInTheDocument();
    });

    it("renders without english text", () => {
      const { container } = render(<KoreanTitle korean="한국어만" />);
      expect(container).toBeInTheDocument();
    });

    it("renders with subtitle", () => {
      const { container } = render(
        <KoreanTitle
          korean="메인 제목"
          english="Main Title"
          subtitle="부제목"
        />
      );
      expect(container).toBeInTheDocument();
    });

    it("renders with custom styling", () => {
      const { container } = render(
        <KoreanTitle korean="스타일 제목" style={{ fontSize: "2rem" }} />
      );
      expect(container).toBeInTheDocument();
    });

    it("renders with level 3", () => {
      const { container } = render(<KoreanTitle korean="레벨 3" level={3} />);
      expect(container).toBeInTheDocument();
    });

    it("renders with custom color", () => {
      const { container } = render(
        <KoreanTitle korean="색상 제목" color={KOREAN_COLORS.CYAN} />
      );
      expect(container).toBeInTheDocument();
    });

    it("renders complex title with all props", () => {
      const { container } = render(
        <KoreanTitle
          korean="복잡한 제목"
          english="Complex Title"
          subtitle="모든 속성 포함"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe("KoreanText", () => {
    it("renders basic korean text", () => {
      const { container } = render(
        <KoreanText korean="안녕하세요" english="Hello" />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe("ProgressTracker", () => {
    it("renders progress bar", () => {
      const { container } = render(
        <ProgressTracker
          label="Health"
          value={80}
          maxValue={100}
          showText={true}
        />
      );
      expect(container).toBeInTheDocument();
    });

    it("renders with custom dimensions", () => {
      const { container } = render(
        <ProgressTracker
          label="Ki Energy"
          value={45}
          maxValue={100}
          width={150}
          height={25}
          showText={true}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe("TrigramWheel", () => {
    it("renders trigram wheel", () => {
      const { container } = render(
        <TrigramWheel
          currentStance="geon"
          onStanceSelect={vi.fn()} // Fix: Use correct prop name
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe("KoreanTechniqueText", () => {
    it("renders technique with Korean and English names", () => {
      const { container } = render(
        <KoreanTechniqueText
          korean="천둥벽력"
          english="Thunder Strike"
          trigram="geon"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe("KoreanStatusText", () => {
    it("renders status text", () => {
      const { container } = render(
        <KoreanStatusText
          korean="체력"
          statusKey="health"
          value={80}
          maxValue={100}
        />
      );
      expect(container).toBeInTheDocument();
    });
  });

  describe("KoreanMartialText", () => {
    it("renders martial arts text", () => {
      const { container } = render(
        <KoreanMartialText
          korean="무사"
          english="Warrior"
          martialVariant="practitioner"
        />
      );
      expect(container).toBeInTheDocument();
    });
  });
});
