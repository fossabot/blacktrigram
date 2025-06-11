// Test setup for Black Trigram Korean martial arts game

import { beforeAll, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Mock PixiJS
beforeAll(() => {
  // Enhanced Audio mock with proper HTMLAudioElement that matches test expectations
  global.HTMLAudioElement = vi.fn().mockImplementation(() => ({
    canPlayType: vi.fn((type: string) => {
      // Return "probably" for mp3 to match test expectations
      if (type === "audio/mp3" || type === "audio/mpeg") return "probably";
      if (type === "audio/wav") return "maybe";
      if (type === "audio/ogg") return "maybe";
      return ""; // Empty string means not supported (webm)
    }),
    play: vi.fn(() => Promise.resolve()),
    pause: vi.fn(),
    load: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    volume: 1,
    currentTime: 0,
    duration: 100,
    paused: false,
    ended: false,
    src: "",
    crossOrigin: null,
    preload: "auto",
  })) as any;

  // Mock PixiJS Application constructor issues
  global.HTMLCanvasElement = vi.fn().mockImplementation(() => ({
    getContext: vi.fn(() => ({
      fillRect: vi.fn(),
      clearRect: vi.fn(),
      canvas: { width: 800, height: 600 },
    })),
    width: 800,
    height: 600,
    style: {},
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as any;

  // Mock CanvasRenderer
  vi.mock("pixi.js", async () => {
    const actual = await vi.importActual("pixi.js");
    return {
      ...actual,
      autoDetectRenderer: vi.fn(() => ({
        render: vi.fn(),
        destroy: vi.fn(),
        plugins: {},
      })),
      Application: vi
        .fn()
        .mockImplementation(function (this: any, options: any) {
          this.stage = {
            children: [],
            addChild: vi.fn(),
            removeChild: vi.fn(),
          };
          this.renderer = { render: vi.fn(), destroy: vi.fn() };
          this.ticker = {
            add: vi.fn(),
            remove: vi.fn(),
            start: vi.fn(),
            stop: vi.fn(),
          };
          this.init = vi.fn(() => Promise.resolve());
          this.destroy = vi.fn();
          return this;
        }),
    };
  });

  // Mock window.matchMedia for responsive tests
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
