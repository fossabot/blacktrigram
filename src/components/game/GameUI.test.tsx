import { render } from "@testing-library/react";
import { GameUI } from "./GameUI";
import { describe, it, expect } from "vitest";

const baseState = {
  player1Health: 100,
  player2Health: 100,
  roundTime: 90,
  round: 1,
  winner: null,
  isPaused: false,
  matchStarted: false,
  gamePhase: "preparation" as const,
};

function getPixiTextByText(
  container: HTMLElement,
  matcher: RegExp | string
): Element | null {
  const nodes = Array.from(container.querySelectorAll("pixitext"));
  if (typeof matcher === "string") {
    return nodes.find((el) => el.getAttribute("text") === matcher) ?? null;
  }
  // RegExp matcher
  return (
    nodes.find((el) => {
      const text = el.getAttribute("text") ?? "";
      return matcher.test(text);
    }) ?? null
  );
}

describe("GameUI", () => {
  it("renders UI elements", () => {
    const { container } = render(
      <GameUI
        gameState={baseState}
        gameTime={0}
        combatLog={["Test log"]}
        onStartMatch={() => {}}
        onResetMatch={() => {}}
      />
    );
    // Use helper to find pixitext by text content
    expect(getPixiTextByText(container, /Black Trigram/)).toBeTruthy();
    expect(getPixiTextByText(container, /선수 1/)).toBeTruthy();
    expect(getPixiTextByText(container, /선수 2/)).toBeTruthy();
    expect(getPixiTextByText(container, /Test log/)).toBeTruthy();
  });

  it("renders victory screen when winner is set", () => {
    const { container } = render(
      <GameUI
        gameState={{ ...baseState, winner: "Player 1" }}
        gameTime={0}
        combatLog={[]}
        onStartMatch={() => {}}
        onResetMatch={() => {}}
      />
    );
    // Look for the Korean/English victory message
    expect(getPixiTextByText(container, /Victory/)).toBeTruthy();
    expect(getPixiTextByText(container, /Rematch/)).toBeTruthy();
  });
});
