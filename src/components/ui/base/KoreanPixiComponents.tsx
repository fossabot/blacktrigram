import React from "react";
import { extend } from "@pixi/react";
import { Container, Graphics, Text } from "pixi.js";
import {
  KOREAN_COLORS,
  KOREAN_FONTS,
  FONT_SIZES,
  TRIGRAM_STANCES_ORDER,
  TRIGRAM_DATA,
} from "../../../types/constants";
import type {
  TrigramStance,
  PlayerState,
  ColorValue,
  Position,
} from "../../../types";

// Extend @pixi/react with PIXI components
extend({ Container, Graphics, Text });

// Declare extended components for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: any;
      pixiGraphics: any;
      pixiText: any;
    }
  }
}

// Korean PIXI text utility function
export function createKoreanPixiText(
  korean: string,
  english: string,
  style: any = {},
  position: Position = { x: 0, y: 0 }
): React.JSX.Element {
  const displayText = korean || english || "";

  return (
    <pixiText
      text={displayText}
      style={{
        fontFamily: KOREAN_FONTS.PRIMARY,
        fontSize: FONT_SIZES.MEDIUM,
        fill: KOREAN_COLORS.WHITE,
        ...style,
      }}
      x={position.x}
      y={position.y}
    />
  );
}

// Progress tracker props interface
export interface PixiProgressTrackerProps {
  readonly label: string;
  readonly value: number;
  readonly maxValue: number;
  readonly barColor?: ColorValue;
  readonly backgroundColor?: ColorValue;
  readonly borderColor?: ColorValue;
  readonly position?: Position; // Fixed: Use Position type instead of number[]
  readonly width?: number;
  readonly height?: number;
  readonly showText?: boolean;
  readonly textColor?: ColorValue;
  readonly borderWidth?: number;
}

// Trigram wheel props interface
export interface PixiTrigramWheelProps {
  readonly currentStance: TrigramStance;
  readonly onStanceSelect: (stance: TrigramStance) => void;
  readonly size?: number;
  readonly position?: Position; // Fixed: Use Position type
  readonly interactive?: boolean;
}

// Combat HUD props interface
export interface PixiCombatHUDProps {
  readonly players: readonly PlayerState[];
  readonly timeRemaining: number;
  readonly currentRound: number;
  readonly isPaused: boolean;
  readonly position?: Position; // Fixed: Use Position type
}

// Combat controls props interface
export interface PixiCombatControlsProps {
  readonly players: readonly PlayerState[];
  readonly onStanceChange?: (
    playerIndex: number,
    stance: TrigramStance
  ) => void;
  readonly position?: Position; // Fixed: Use Position type
}

// Combat arena props interface
export interface PixiCombatArenaProps {
  readonly players: readonly PlayerState[];
  readonly width: number;
  readonly height: number;
  readonly position?: Position; // Fixed: Use Position type
}

// Progress Tracker Component
export function PixiProgressTracker({
  label,
  value,
  maxValue,
  barColor = KOREAN_COLORS.CYAN,
  backgroundColor = KOREAN_COLORS.BLACK,
  width = 200,
  height = 20,
  showText = true,
  textColor = KOREAN_COLORS.WHITE,
  position = { x: 0, y: 0 }, // Use proper Position object
}: PixiProgressTrackerProps): React.JSX.Element {
  const percentage = Math.max(0, Math.min(1, value / maxValue));

  return React.createElement("pixiContainer", {
    x: position.x,
    y: position.y,
    children: [
      // Background bar
      React.createElement("pixiGraphics", {
        key: "background",
        draw: (g: any) => {
          g.clear();
          g.beginFill(backgroundColor);
          g.drawRect(0, 0, width, height);
          g.endFill();
        },
      }),
      // Progress bar
      React.createElement("pixiGraphics", {
        key: "progress",
        draw: (g: any) => {
          g.clear();
          g.beginFill(barColor);
          g.drawRect(0, 0, width * percentage, height);
          g.endFill();
        },
      }),
      // Text label
      showText &&
        React.createElement("pixiText", {
          key: "label",
          text: `${label}: ${value}/${maxValue}`,
          style: {
            fontFamily: KOREAN_FONTS.PRIMARY,
            fontSize: FONT_SIZES.SMALL,
            fill: textColor,
          },
          x: width / 2,
          y: height / 2,
          anchor: 0.5,
        }),
    ].filter(Boolean),
  });
}

// Trigram Wheel Component
export function PixiTrigramWheel({
  currentStance,
  onStanceSelect,
  size = 200,
  position = { x: 0, y: 0 },
  interactive = true,
}: PixiTrigramWheelProps): React.JSX.Element {
  return React.createElement("pixiContainer", {
    x: position.x,
    y: position.y,
    children: [
      // Wheel background
      React.createElement("pixiGraphics", {
        draw: (g: any) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.BLACK, 0.8);
          g.lineStyle(2, KOREAN_COLORS.CYAN, 0.8);
          g.drawCircle(0, 0, size / 2);
          g.endFill();
        },
      }),

      // Trigram segments
      TRIGRAM_STANCES_ORDER.map((stance, index) => {
        const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
        const segmentX = Math.cos(angle) * ((size / 2) * 0.7);
        const segmentY = Math.sin(angle) * ((size / 2) * 0.7);
        const isSelected = stance === currentStance;

        return (
          <pixiContainer key={stance} x={segmentX} y={segmentY}>
            <pixiGraphics
              draw={(g: any) => {
                g.clear();
                const segmentRadius = 25;
                const stanceColor =
                  KOREAN_COLORS[stance] || KOREAN_COLORS.WHITE;
                g.beginFill(
                  isSelected ? stanceColor : KOREAN_COLORS.BLACK,
                  isSelected ? 0.8 : 0.3
                );
                g.lineStyle(2, stanceColor, 1.0);
                g.drawCircle(0, 0, segmentRadius);
                g.endFill();
              }}
              interactive={interactive}
              cursor={interactive ? "pointer" : undefined}
              onClick={interactive ? () => onStanceSelect(stance) : undefined}
            />

            <pixiText
              text={TRIGRAM_DATA[stance]?.symbol || ""}
              style={{
                fontFamily: KOREAN_FONTS.PRIMARY,
                fontSize: FONT_SIZES.LARGE,
                fill: isSelected ? KOREAN_COLORS.BLACK : KOREAN_COLORS.WHITE,
                align: "center",
              }}
              anchor={0.5}
              x={0}
              y={0}
            />
          </pixiContainer>
        );
      }),

      // Center current stance display
      <pixiContainer x={0} y={0}>
        <pixiGraphics
          draw={(g: any) => {
            g.clear();
            const centerColor =
              KOREAN_COLORS[currentStance] || KOREAN_COLORS.WHITE;
            g.beginFill(centerColor, 0.9);
            g.lineStyle(3, KOREAN_COLORS.WHITE);
            g.drawCircle(0, 0, 40);
            g.endFill();
          }}
        />

        <pixiText
          text={TRIGRAM_DATA[currentStance]?.symbol || ""}
          style={{
            fontFamily: KOREAN_FONTS.PRIMARY,
            fontSize: FONT_SIZES.XLARGE,
            fill: KOREAN_COLORS.BLACK,
            align: "center",
            fontWeight: "bold",
          }}
          anchor={0.5}
          x={0}
          y={0}
        />
      </pixiContainer>,
    ],
  });
}

// Trigram Display Component
export function PixiTrigramDisplay({
  stance,
  position = { x: 0, y: 0 },
}: {
  stance: TrigramStance;
  position?: Position;
}) {
  const size = 200; // Fixed size for the display

  return React.createElement("pixiContainer", {
    x: position.x,
    y: position.y,
    children: [
      // Top part
      React.createElement("pixiContainer", {
        x: 20,
        y: 20,
        children: [
          React.createElement("pixiText", {
            text: TRIGRAM_DATA[stance]?.symbol || "",
            style: {
              fontFamily: KOREAN_FONTS.PRIMARY,
              fontSize: FONT_SIZES.XLARGE,
              fill: KOREAN_COLORS.WHITE,
              align: "center",
              fontWeight: "bold",
            },
            anchor: 0.5,
            x: size / 2,
            y: size / 2,
          }),
        ],
      }),

      // Bottom part
      React.createElement("pixiContainer", {
        x: 20,
        y: 20,
        children: [
          React.createElement("pixiGraphics", {
            draw: (g: any) => {
              g.clear();
              g.beginFill(KOREAN_COLORS.BLACK, 0.8);
              g.lineStyle(2, KOREAN_COLORS.CYAN, 0.8);
              g.drawRoundedRect(0, 0, size, size, 10);
              g.endFill();
            },
          }),

          React.createElement("pixiText", {
            text: stance,
            style: {
              fontFamily: KOREAN_FONTS.PRIMARY,
              fontSize: FONT_SIZES.MEDIUM,
              fill: KOREAN_COLORS.CYAN,
              align: "center",
            },
            anchor: 0.5,
            x: size / 2,
            y: size / 2,
          }),
        ],
      }),

      // Center symbol
      React.createElement("pixiContainer", {
        x: size / 2,
        y: 20,
        children: [
          React.createElement("pixiGraphics", {
            draw: (g: any) => {
              g.clear();
              const centerColor = KOREAN_COLORS[stance] || KOREAN_COLORS.WHITE;
              g.beginFill(centerColor, 0.9);
              g.lineStyle(3, KOREAN_COLORS.WHITE);
              g.drawCircle(0, 0, 40);
              g.endFill();
            },
          }),

          React.createElement("pixiText", {
            text: TRIGRAM_DATA[stance]?.symbol || "",
            style: {
              fontFamily: KOREAN_FONTS.PRIMARY,
              fontSize: FONT_SIZES.XLARGE,
              fill: KOREAN_COLORS.BLACK,
              align: "center",
              fontWeight: "bold",
            },
            anchor: 0.5,
            x: 0,
            y: 0,
          }),
        ],
      }),
    ],
  });
}

// Combat HUD Component
export function PixiCombatHUD({
  position = { x: 0, y: 0 },
}: PixiCombatHUDProps): React.JSX.Element {
  return (
    <pixiContainer x={position.x} y={position.y}>
      <pixiGraphics
        draw={(g: any) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.BLACK, 0.8);
          g.lineStyle(1, KOREAN_COLORS.CYAN, 0.5);
          g.drawRoundedRect(0, 0, 400, 100, 5);
          g.endFill();
        }}
      />

      {createKoreanPixiText(
        "전투 정보",
        "Combat HUD",
        {
          fontFamily: KOREAN_FONTS.PRIMARY,
          fontSize: FONT_SIZES.LARGE,
          fill: KOREAN_COLORS.CYAN,
        },
        { x: 20, y: 20 }
      )}
    </pixiContainer>
  );
}

// Combat Controls Component
export function PixiCombatControls({
  position = { x: 0, y: 0 },
}: PixiCombatControlsProps): React.JSX.Element {
  return (
    <pixiContainer x={position.x} y={position.y}>
      <pixiGraphics
        draw={(g: any) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.BLACK, 0.8);
          g.lineStyle(1, KOREAN_COLORS.CYAN, 0.5);
          g.drawRoundedRect(0, 0, 800, 100, 5);
          g.endFill();
        }}
      />

      {createKoreanPixiText(
        "전투 제어",
        "Combat Controls",
        {
          fontFamily: KOREAN_FONTS.PRIMARY,
          fontSize: FONT_SIZES.MEDIUM,
          fill: KOREAN_COLORS.CYAN,
        },
        { x: 20, y: 20 }
      )}
    </pixiContainer>
  );
}

// Combat Arena Component
export function PixiCombatArena({
  width,
  height,
  position = { x: 0, y: 0 },
}: PixiCombatArenaProps): React.JSX.Element {
  return (
    <pixiContainer x={position.x} y={position.y}>
      <pixiGraphics
        draw={(g: any) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.BLACK, 0.1);
          g.lineStyle(2, KOREAN_COLORS.CYAN, 0.8);
          g.drawRect(0, 0, width, height);
          g.endFill();

          // Center circle
          g.lineStyle(1, KOREAN_COLORS.GOLD, 0.6);
          g.drawCircle(width / 2, height / 2, 100);
        }}
      />

      {createKoreanPixiText(
        "전투 무대",
        "Combat Arena",
        {
          fontFamily: KOREAN_FONTS.PRIMARY,
          fontSize: FONT_SIZES.MEDIUM,
          fill: KOREAN_COLORS.CYAN,
        },
        { x: width / 2, y: 20 }
      )}
    </pixiContainer>
  );
}

// Export all components - single declaration each
export { PixiProgressTracker as default };
