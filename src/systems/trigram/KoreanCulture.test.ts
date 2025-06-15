import { describe, it, expect } from "vitest";
import * as KC from "./KoreanCulture";

describe("KoreanCulture module", () => {
  it("should export cultural data", () => {
    expect(Object.keys(KC).length).toBeGreaterThan(0);
  });
});
