import { render } from "@testing-library/react"; // Removed unused screen import
import "@testing-library/jest-dom";
import { Application } from "@pixi/react"; // Fixed: import Application from @pixi/react
import { EndScreen } from "../EndScreen";
import { ProgressTracker } from "../ProgressTracker";
import { TrigramWheel } from "../TrigramWheel";
// Remove unused import
import type { KoreanText } from "../../../types/korean-text"; // Fixed: use proper type name
import { KOREAN_COLORS } from "@/types";

const createKoreanText = (korean: string, english: string): KoreanText => ({
  korean,
  english,
});

describe("UI Components", () => {
  it("renders EndScreen", () => {
    const { container } = render(
      <Application>
        <EndScreen
          winnerId="player1"
          onRestart={vi.fn()}
          onReturnToMenu={vi.fn()}
        />
      </Application>
    );
    expect(container).toBeInTheDocument();
  });

  it("renders ProgressTracker", () => {
    const { container } = render(
      <Application>
        <ProgressTracker current={5} max={10} />
      </Application>
    );
    expect(container).toBeInTheDocument();
  });

  it("renders TrigramWheel", () => {
    const { container } = render(
      <Application>
        <TrigramWheel
          selectedStance="geon"
          onStanceSelect={vi.fn()}
          radius={100}
        />
      </Application>
    );
    expect(container).toBeInTheDocument();
  });

  it("renders ProgressTracker with korean text", () => {
    const koreanText = createKoreanText("진행상황", "Progress");
    const { container } = render(
      <Application>
        <ProgressTracker current={3} max={5} label={koreanText} />
      </Application>
    );
    expect(container).toBeInTheDocument();
  });

  it("renders TrigramWheel with stance selection", () => {
    const { container } = render(
      <Application>
        <TrigramWheel
          selectedStance="li"
          onStanceSelect={vi.fn()}
          showLabels={true}
          interactive={true}
        />
      </Application>
    );
    expect(container).toBeInTheDocument();
  });

  it("renders ProgressTracker with colored bar", () => {
    const { container } = render(
      <Application>
        <ProgressTracker
          current={8}
          max={10}
          barColor={KOREAN_COLORS.POSITIVE_GREEN} // Fixed: use existing color
          backgroundColor={KOREAN_COLORS.UI_BACKGROUND_DARK}
        />
      </Application>
    );
    expect(container).toBeInTheDocument();
  });
});
