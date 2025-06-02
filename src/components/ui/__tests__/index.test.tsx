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
import { TrigramStance } from "../../../types/enums";

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
  Text: ({ text, ...props }: any) => (
    <div data-testid="pixi-text" {...props}>
      {text}
    </div>
  ),
}));

describe("Korean Text Components", () => {
  describe("KoreanTitle", () => {
    it("renders with korean and english text", () => {
      render(
        <KoreanTitle
          korean="흑괘 무술"
          english="Black Trigram"
          subtitle="Traditional Korean Martial Arts"
          level={1}
        />
      );
    });

    it("renders with different header levels", () => {
      render(<KoreanTitle korean="제목" level={2} />);
    });

    it("renders without english text", () => {
      render(<KoreanTitle korean="한국어만" />);
    });

    it("renders with subtitle", () => {
      render(
        <KoreanTitle
          korean="메인 제목"
          english="Main Title"
          subtitle="부제목"
        />
      );
    });

    it("renders with custom styling", () => {
      render(<KoreanTitle korean="스타일 제목" style={{ fontSize: "2rem" }} />);
    });

    it("renders with level 3", () => {
      render(<KoreanTitle korean="레벨 3" level={3} />);
    });

    it("renders with custom color", () => {
      render(<KoreanTitle korean="색상 제목" color={KOREAN_COLORS.CYAN} />);
    });

    it("renders complex title with all props", () => {
      render(
        <KoreanTitle
          korean="복잡한 제목"
          english="Complex Title"
          subtitle="모든 속성 포함"
        />
      );
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
      render(
        <ProgressTracker
          label="Health"
          value={80}
          maxValue={100}
          showText={true}
        />
      );
    });

    it("renders with custom dimensions", () => {
      render(
        <ProgressTracker
          label="Ki Energy"
          value={45}
          maxValue={100}
          width={150}
          height={25}
          showText={true}
        />
      );
    });
  });

  describe("TrigramWheel", () => {
    it("renders trigram wheel", () => {
      render(
        <TrigramWheel
          selectedStance={TrigramStance.GEON}
          onStanceChange={vi.fn()}
        />
      );
    });
  });

  describe("KoreanTechniqueText", () => {
    it("renders technique with Korean and English names", () => {
      render(
        <KoreanTechniqueText
          korean="천둥벽력"
          english="Thunder Strike"
          trigram={TrigramStance.GEON}
        />
      );
    });
  });

  describe("KoreanStatusText", () => {
    it("renders status text", () => {
      render(<KoreanStatusText statusKey="health" value={80} maxValue={100} />);
    });
  });

  describe("KoreanMartialText", () => {
    it("renders martial arts text", () => {
      render(
        <KoreanMartialText
          korean="무사"
          english="Warrior"
          martialVariant="practitioner"
        />
      );
    });
  });
});
