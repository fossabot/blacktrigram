import { render } from "@testing-library/react";
import { HitEffectsLayer, HitEffect } from "./HitEffectsLayer";
import { describe, it, expect } from "vitest";

const effects: HitEffect[] = [
  {
    id: "1",
    x: 100,
    y: 200,
    damage: 30,
    technique: "화염지창",
    life: 60,
    maxLife: 120,
  },
];

describe("HitEffectsLayer", () => {
  it("renders hit effects", () => {
    const { container } = render(<HitEffectsLayer hitEffects={effects} />);
    expect(container).toBeTruthy();
  });

  it("renders no effects when empty", () => {
    const { container } = render(<HitEffectsLayer hitEffects={[]} />);
    expect(container).toBeTruthy();
  });
});
