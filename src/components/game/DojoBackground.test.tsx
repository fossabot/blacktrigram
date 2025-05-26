import { render } from "@testing-library/react";
import { DojoBackground } from "./DojoBackground";
import { describe, it, expect } from "vitest";

describe("DojoBackground", () => {
  it("renders without crashing", () => {
    const { container } = render(<DojoBackground gameTime={0} />);
    expect(container).toBeTruthy();
  });

  it("accepts gameTime prop", () => {
    const { rerender } = render(<DojoBackground gameTime={0} />);
    rerender(<DojoBackground gameTime={100} />);
    // No error means prop is accepted
    expect(true).toBe(true);
  });
});
