import { render } from "@testing-library/react";
import { DojangBackground } from "./DojangBackground"; // Fix: Use relative path
import { Stage } from "@pixi/react";

describe("DojangBackground", () => {
  it("renders correctly with default props", () => {
    render(
      <Stage>
        <DojangBackground width={800} height={600} />
      </Stage>
    );
  });

  it("renders with cyberpunk lighting", () => {
    render(
      <Stage>
        <DojangBackground
          width={800}
          height={600}
          lighting="cyberpunk"
          animate={true}
        />
      </Stage>
    );
  });

  it("renders with traditional lighting", () => {
    render(
      <Stage>
        <DojangBackground
          width={800}
          height={600}
          lighting="traditional"
          animate={false}
        />
      </Stage>
    );
  });
});
