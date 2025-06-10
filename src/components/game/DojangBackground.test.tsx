import { render } from "@testing-library/react";
import { DojangBackground } from "./DojangBackground"; // Fix: Use relative path

describe("DojangBackground", () => {
  it("renders correctly with default props", () => {
    render(<DojangBackground width={800} height={600} />);
  });

  it("renders with cyberpunk lighting", () => {
    render(
      <DojangBackground
        width={800}
        height={600}
        lighting="cyberpunk"
        animate={true}
      />
    );
  });

  it("renders with traditional lighting", () => {
    render(
      <DojangBackground
        width={800}
        height={600}
        lighting="traditional"
        animate={false}
      />
    );
  });
});
