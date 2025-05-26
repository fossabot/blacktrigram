import { beforeAll, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import type { ReactNode } from "react";
import { createElement } from "react";

// Enhanced PixiJS mocking for Korean martial arts game
export const extendSpy = vi.fn();

// Define proper types for mock components
interface MockApplicationProps {
  children?: ReactNode;
  width?: number;
  height?: number;
  backgroundColor?: number;
  antialias?: boolean;
  [key: string]: unknown;
}

interface MockContainerProps {
  children?: ReactNode;
  interactive?: boolean;
  onPointerDown?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  cursor?: string;
  x?: number;
  y?: number;
  [key: string]: unknown;
}

interface MockGraphicsProps {
  draw?: (g: unknown) => void;
  [key: string]: unknown;
}

interface MockTextProps {
  text?: string;
  style?: {
    fontFamily?: string;
    fontSize?: number;
    fill?: number;
    [key: string]: unknown;
  };
  anchor?: { x: number; y: number };
  alpha?: number;
  scale?: { x?: number; y?: number };
  x?: number;
  y?: number;
  [key: string]: unknown;
}

// Mock @pixi/react with comprehensive Korean game support
vi.mock("@pixi/react", () => ({
  Application: ({
    children,
    width,
    height,
    backgroundColor,
    antialias,
    ...props
  }: MockApplicationProps) => {
    return createElement(
      "div",
      {
        "data-testid": "pixi-application",
        "data-width": String(width || 0),
        "data-height": String(height || 0),
        "data-background-color": String(backgroundColor || 0),
        "data-antialias": String(antialias || false),
        ...Object.fromEntries(
          Object.entries(props).map(([key, value]) => [
            `data-${key}`,
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
              ? String(value)
              : "",
          ])
        ),
      },
      children
    );
  },

  extend: extendSpy,

  useTick: vi.fn(
    (callback?: (ticker: { deltaTime: number; elapsedMS: number }) => void) => {
      // Simulate game loop for Korean martial arts mechanics
      if (typeof callback === "function") {
        // Don't actually call the callback in tests to avoid infinite loops
        // const mockTicker = { deltaTime: 1, elapsedMS: 16.67 };
        // callback(mockTicker);
      }
    }
  ),

  // Enhanced PixiJS component mocks for martial arts game
  pixiContainer: ({
    children,
    interactive,
    onPointerDown,
    onPointerEnter,
    onPointerLeave,
    cursor,
    x,
    y,
    ...props
  }: MockContainerProps) => {
    return createElement(
      "div",
      {
        "data-testid": "pixi-container",
        "data-interactive": String(interactive || false),
        "data-cursor": cursor || "default",
        "data-x": String(x || 0),
        "data-y": String(y || 0),
        onClick: onPointerDown,
        onMouseEnter: onPointerEnter,
        onMouseLeave: onPointerLeave,
        ...Object.fromEntries(
          Object.entries(props).map(([key, value]) => [
            `data-${key}`,
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
              ? String(value)
              : "",
          ])
        ),
      },
      children
    );
  },

  pixiGraphics: ({ draw, ...props }: MockGraphicsProps) => {
    // Mock graphics for Korean dojo backgrounds and effects
    if (typeof draw === "function") {
      const mockGraphics = {
        clear: vi.fn(),
        setFillStyle: vi.fn(),
        setStrokeStyle: vi.fn(),
        rect: vi.fn(),
        circle: vi.fn(),
        roundRect: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        fill: vi.fn(),
        stroke: vi.fn(),
      };
      draw(mockGraphics);
    }

    return createElement("div", {
      "data-testid": "pixi-graphics",
      ...Object.fromEntries(
        Object.entries(props).map(([key, value]) => [
          `data-${key}`,
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean"
            ? String(value)
            : "",
        ])
      ),
    });
  },

  pixiText: ({
    text,
    style,
    anchor,
    alpha,
    scale,
    x,
    y,
    ...props
  }: MockTextProps) => {
    return createElement(
      "div",
      {
        "data-testid": "pixi-text",
        "data-text": text || "",
        "data-font-family": style?.fontFamily || "",
        "data-font-size": String(style?.fontSize || 12),
        "data-fill": String(style?.fill || 0),
        "data-alpha": String(alpha || 1),
        "data-scale-x": String(scale?.x || 1),
        "data-scale-y": String(scale?.y || 1),
        "data-x": String(x || 0),
        "data-y": String(y || 0),
        ...Object.fromEntries(
          Object.entries(props).map(([key, value]) => [
            `data-${key}`,
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
              ? String(value)
              : "",
          ])
        ),
      },
      text || ""
    );
  },
}));

// Mock pixi.js core components for martial arts game
vi.mock("pixi.js", () => ({
  Container: class MockContainer {
    addChild = vi.fn();
    removeChild = vi.fn();
    destroy = vi.fn();
  },
  Graphics: class MockGraphics {
    clear = vi.fn();
    setFillStyle = vi.fn();
    setStrokeStyle = vi.fn();
    rect = vi.fn();
    circle = vi.fn();
    roundRect = vi.fn();
    moveTo = vi.fn();
    lineTo = vi.fn();
    fill = vi.fn();
    stroke = vi.fn();
  },
  Text: class MockText {
    text: string;
    style?: unknown;

    constructor(text: string, style?: unknown) {
      this.text = text;
      this.style = style;
    }

    destroy = vi.fn();
  },
  TextStyle: class MockTextStyle {
    style: unknown;

    constructor(style: unknown) {
      this.style = style;
    }
  },
}));

// Mock window properties for Korean game testing
Object.defineProperty(window, "innerWidth", {
  writable: true,
  configurable: true,
  value: 1920,
});

Object.defineProperty(window, "innerHeight", {
  writable: true,
  configurable: true,
  value: 1080,
});

// Mock ResizeObserver for responsive Korean game design
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock requestAnimationFrame for smooth Korean martial arts animations
global.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
  setTimeout(callback, 16); // ~60fps for martial arts combat
  return 1;
});

global.cancelAnimationFrame = vi.fn();

// Mock performance API for combat timing
Object.defineProperty(global, "performance", {
  value: {
    ...global.performance,
    now: vi.fn(() => Date.now()),
  },
});

// Mock AudioContext for Korean martial arts sound effects
const MockAudioContext = vi.fn().mockImplementation(() => ({
  createOscillator: vi.fn(),
  createGain: vi.fn(),
  destination: {},
  close: vi.fn(),
}));

Object.defineProperty(global, "AudioContext", {
  value: MockAudioContext,
});

// Mock document.fonts for Korean font loading
Object.defineProperty(document, "fonts", {
  value: {
    ready: Promise.resolve(),
    load: vi.fn(() => Promise.resolve()),
    check: vi.fn(() => true),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  },
});

// Enhanced keyboard event mocking for Korean game controls
const originalAddEventListener = document.addEventListener;
const originalRemoveEventListener = document.removeEventListener;

document.addEventListener = vi.fn(
  (
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions | boolean
  ) => {
    if (event === "keydown" || event === "keyup") {
      // Track keyboard event listeners for Korean martial arts controls
      return originalAddEventListener.call(document, event, handler, options);
    }
    return originalAddEventListener.call(document, event, handler, options);
  }
);

document.removeEventListener = vi.fn(
  (
    event: string,
    handler: EventListener,
    options?: EventListenerOptions | boolean
  ) => {
    return originalRemoveEventListener.call(document, event, handler, options);
  }
);

// Setup and cleanup for Korean martial arts testing
beforeAll(() => {
  // Initialize Korean font support
  Object.defineProperty(document.body.style, "fontFamily", {
    value: "Noto Sans KR, sans-serif",
    writable: true,
  });

  // Set up dark theme for Korean martial arts aesthetic
  Object.defineProperty(document.body.style, "backgroundColor", {
    value: "#000000",
    writable: true,
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();

  // Reset Korean game state
  extendSpy.mockClear();
});

// Export test utilities for Korean martial arts game testing
export const createMockTicker = (deltaTime = 1) => ({
  deltaTime,
  elapsedMS: deltaTime * 16.67,
});

export const createMockKeyboardEvent = (code: string, type = "keydown") =>
  new KeyboardEvent(type, { code, bubbles: true });

export const createMockPointerEvent = (clientX = 0, clientY = 0) =>
  new PointerEvent("pointerdown", { clientX, clientY, bubbles: true });

// Korean martial arts specific test helpers
export const trigrams = [
  "geon",
  "tae",
  "li",
  "jin",
  "son",
  "gam",
  "gan",
  "gon",
] as const;

export const koreanTechniques = {
  geon: "천둥벽력",
  tae: "유수연타",
  li: "화염지창",
  jin: "벽력일섬",
  son: "선풍연격",
  gam: "수류반격",
  gan: "반석방어",
  gon: "대지포옹",
} as const;

export const mockTrigramAttack = (
  technique: keyof typeof koreanTechniques
) => ({
  technique: koreanTechniques[technique],
  damage: Math.floor(Math.random() * 40) + 10,
  position: { x: Math.random() * 800, y: Math.random() * 600 },
});
