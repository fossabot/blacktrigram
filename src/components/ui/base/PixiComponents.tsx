// Reusable PIXI.js components for Black Trigram Korean martial arts game

import React, { useState, useMemo, useCallback } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import * as PIXI from "pixi.js";
import {
  KOREAN_COLORS,
  KOREAN_FONT_WEIGHTS,
  TRIGRAM_STANCES_ORDER,
  TRIGRAM_DATA,
  FONT_SIZES,
} from "../../../types/constants";
import { createKoreanTextStyle } from "./korean-text/components/KoreanPixiTextUtils";
import type { TrigramStance } from "../../../types";
import { usePixiExtensions } from "../../../utils/pixiExtensions";

// Fix: Define proper local interfaces
interface TrigramWheelProps {
  currentStance: TrigramStance;
  onStanceChange: (stance: TrigramStance) => void;
  size?: number;
  x?: number;
  y?: number;
}

interface KoreanPixiTextProps {
  text: string;
  x?: number;
  y?: number;
  style?: any;
}

interface ProgressTrackerProps {
  currentValue: number;
  maxValue: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

interface BaseButtonProps {
  label: string;
  onClick?: () => void;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

// Fix useTick import - use a local implementation
const useTick = (callback: (delta: number) => void) => {
  React.useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const tick = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      callback(delta / 16.67); // Normalize to 60fps
      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [callback]);
};

// CyberpunkGrid
interface CyberpunkGridProps {
  gridSize?: number;
  lineColor?: number;
  lineWidth?: number;
  pulse?: boolean;
  width?: number; // Added width
  height?: number; // Added height
}

export const CyberpunkGrid: React.FC<CyberpunkGridProps> = ({
  gridSize = 50,
  lineColor = KOREAN_COLORS.UI_BACKGROUND_DARK,
  lineWidth = 1,
  pulse = true,
  width = 800, // Default width
  height = 600, // Default height
}) => {
  const [time, setTime] = useState(0);
  // const app = useApp(); // Unused
  useTick((delta) => pulse && setTime((t) => t + delta));

  const draw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      const alpha = pulse ? 0.1 + (Math.sin(time * 0.05) + 1) * 0.1 : 0.2;
      g.lineStyle(lineWidth, lineColor, alpha);
      for (let i = 0; i <= width; i += gridSize) {
        g.moveTo(i, 0);
        g.lineTo(i, height);
      }
      for (let j = 0; j <= height; j += gridSize) {
        g.moveTo(0, j);
        g.lineTo(width, j);
      }
    },
    [gridSize, lineColor, lineWidth, pulse, time, width, height]
  );

  return <Graphics draw={draw} />;
};

// CyberpunkButton
interface BaseButtonProps {
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  disabled?: boolean;
}

export const CyberpunkButton: React.FC<{
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  x?: number;
  y?: number;
  position?: { x: number; y: number };
  width?: number;
  height?: number;
}> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  x = 0,
  y = 0,
  position,
  width = 200,
  height = 50,
}) => {
  const finalX = position ? position.x : x;
  const finalY = position ? position.y : y;

  const buttonStyle = useMemo(() => {
    return createKoreanTextStyle({
      fontSize: Math.min(height * 0.4, 18),
      fill: disabled
        ? KOREAN_COLORS.UI_DISABLED_TEXT
        : KOREAN_COLORS.PRIMARY_CYAN,
      fontWeight: KOREAN_FONT_WEIGHTS.medium.toString(),
      align: "center",
    });
  }, [variant, disabled, height]);

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <Container x={finalX} y={finalY}>
      <Graphics
        interactive={!disabled}
        pointerdown={handleClick}
        draw={(g: PIXI.Graphics) => {
          g.clear();
          const color = disabled
            ? KOREAN_COLORS.UI_DISABLED_FILL
            : KOREAN_COLORS.PRIMARY_CYAN;
          g.beginFill(color, 0.3);
          g.drawRoundedRect(0, 0, width, height, 8);
          g.endFill();
          g.lineStyle(2, color, 0.8);
          g.drawRoundedRect(0, 0, width, height, 8);
        }}
      />
      <Text
        text={label}
        style={buttonStyle}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
      />
    </Container>
  );
};

// CyberpunkTrigramWheel
export const CyberpunkTrigramWheel: React.FC<TrigramWheelProps> = ({
  currentStance,
  onStanceChange,
  size = 100,
  x = 0,
  y = 0,
}) => {
  const stances = TRIGRAM_STANCES_ORDER as readonly TrigramStance[];

  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      onStanceChange(stance);
    },
    [onStanceChange]
  );

  const centerTheme = TRIGRAM_DATA[currentStance as TrigramStance]?.theme; // Fix: Type assertion

  return (
    <Container x={x} y={y}>
      {stances.map((stanceId: TrigramStance, index: number) => {
        const radius = size * 0.4;
        const segmentX =
          Math.cos((index / stances.length) * Math.PI * 2) * radius;
        const segmentY =
          Math.sin((index / stances.length) * Math.PI * 2) * radius;

        const stanceData = TRIGRAM_DATA[stanceId];

        return (
          <Container key={stanceId} x={segmentX} y={segmentY}>
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                const color =
                  stanceId === currentStance
                    ? KOREAN_COLORS.PRIMARY_CYAN
                    : KOREAN_COLORS.UI_GRAY;
                g.beginFill(color, 0.6);
                g.drawCircle(0, 0, 20);
                g.endFill();
              }}
              interactive={true}
              pointerdown={() => handleStanceClick(stanceId)}
            />
            <Text
              text={
                stanceData?.symbol || stanceId.substring(0, 1).toUpperCase()
              }
              anchor={0.5}
              style={createKoreanTextStyle({
                fontSize: 16,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
              })}
            />
          </Container>
        );
      })}

      <Container>
        <Text
          text={TRIGRAM_DATA[currentStance as TrigramStance]?.symbol || ""} // Fix: Type assertion
          anchor={0.5}
          style={createKoreanTextStyle({
            fontSize: size * 0.3,
            fill: centerTheme?.primary || KOREAN_COLORS.PRIMARY_CYAN,
            align: "center",
          })}
        />
      </Container>
    </Container>
  );
};

// PixiKoreanText
export const PixiKoreanText: React.FC<KoreanPixiTextProps> = ({
  text,
  x = 0,
  y = 0,
  style,
}) => {
  const textStyle = useMemo(() => {
    return createKoreanTextStyle({
      fontSize: FONT_SIZES.medium,
      fill: KOREAN_COLORS.TEXT_PRIMARY,
      fontWeight: KOREAN_FONT_WEIGHTS.regular.toString(),
      align: "left",
      ...style,
    });
  }, [style]);

  return (
    <Container x={x} y={y}>
      <Text text={text} style={textStyle} />
    </Container>
  );
};

// PixiProgressBar
export const PixiProgressBar: React.FC<ProgressTrackerProps> = ({
  currentValue,
  maxValue,
  x = 0,
  y = 0,
  width = 200,
  height = 20,
}) => {
  const progressRatio = Math.min(Math.max(currentValue / maxValue, 0), 1);

  const backgroundDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.8);
      g.drawRoundedRect(0, 0, width, height, height / 2);
      g.endFill();
      g.lineStyle(2, KOREAN_COLORS.UI_BORDER, 0.6);
      g.drawRoundedRect(0, 0, width, height, height / 2);
    },
    [width, height]
  );

  const progressDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      const progressWidth = (width - 4) * progressRatio;
      if (progressWidth > 0) {
        g.beginFill(KOREAN_COLORS.PRIMARY_CYAN, 0.8);
        g.drawRoundedRect(2, 2, progressWidth, height - 4, (height - 4) / 2);
        g.endFill();
      }
    },
    [width, height, progressRatio]
  );

  const percentageStyle = useMemo(
    () =>
      createKoreanTextStyle({
        fontSize: FONT_SIZES.small,
        fill: KOREAN_COLORS.TEXT_BRIGHT,
        fontWeight: KOREAN_FONT_WEIGHTS.bold.toString(),
        align: "center",
      }),
    []
  );

  return (
    <Container x={x} y={y}>
      <Graphics draw={backgroundDraw} />
      <Graphics draw={progressDraw} />
      <Text
        text={`${Math.round(progressRatio * 100)}%`}
        style={percentageStyle}
        x={width / 2}
        anchor={0.5}
      />
    </Container>
  );
};

export const PixiButton: React.FC<BaseButtonProps> = ({
  label,
  onClick,
  x = 0,
  y = 0,
  width = 150,
  height = 40,
  variant = "primary",
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = useMemo(() => {
    return createKoreanTextStyle({
      fontSize: 16,
      fill: disabled
        ? KOREAN_COLORS.UI_DISABLED_TEXT
        : KOREAN_COLORS.TEXT_PRIMARY,
      fontWeight: KOREAN_FONT_WEIGHTS.medium.toString(),
      align: "center",
    });
  }, [disabled]);

  const getButtonColor = useCallback(() => {
    if (disabled) return KOREAN_COLORS.UI_DISABLED_FILL;

    let baseColor: number;
    switch (variant) {
      case "primary":
        baseColor = KOREAN_COLORS.PRIMARY_CYAN;
        break;
      case "secondary":
        baseColor = KOREAN_COLORS.SECONDARY_BLUE;
        break;
      case "danger":
        baseColor = KOREAN_COLORS.NEGATIVE_RED;
        break;
      default:
        baseColor = KOREAN_COLORS.PRIMARY_CYAN;
    }

    return baseColor;
  }, [variant, disabled, isHovered]);

  const buttonDraw = useCallback(
    (g: PIXI.Graphics) => {
      g.clear();
      const color = getButtonColor();
      const alpha = isHovered && !disabled ? 0.8 : 0.6;

      g.beginFill(color, alpha * 0.3);
      g.drawRoundedRect(0, 0, width, height, 8);
      g.endFill();

      g.lineStyle(2, color, alpha);
      g.drawRoundedRect(0, 0, width, height, 8);
    },
    [width, height, getButtonColor, isHovered, disabled]
  );

  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick();
    }
  }, [disabled, onClick]);

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={buttonDraw}
        interactive={!disabled}
        pointerover={() => setIsHovered(true)}
        pointerout={() => setIsHovered(false)}
        pointerdown={handleClick}
      />
      <Text
        text={label}
        style={buttonStyle}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
      />
    </Container>
  );
};

// PixiTrigramWheel
export const PixiTrigramWheel: React.FC<TrigramWheelProps> = ({
  currentStance,
  onStanceChange,
  size = 120,
  x = 0,
  y = 0,
}) => {
  const stances = TRIGRAM_STANCES_ORDER as readonly TrigramStance[];

  const handleStanceClick = useCallback(
    (stanceId: TrigramStance) => {
      onStanceChange(stanceId);
    },
    [onStanceChange]
  );

  return (
    <Container x={x} y={y}>
      {stances.map((stanceId: TrigramStance, index: number) => {
        const angle = (index / stances.length) * Math.PI * 2;
        const radius = size * 0.4;
        const segmentX = Math.cos(angle) * radius;
        const segmentY = Math.sin(angle) * radius;

        const isActive = stanceId === currentStance;
        const stanceData = TRIGRAM_DATA[stanceId];

        return (
          <Container key={stanceId} x={segmentX} y={segmentY}>
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                const color = isActive
                  ? KOREAN_COLORS.PRIMARY_CYAN
                  : KOREAN_COLORS.UI_GRAY;
                g.beginFill(color, 0.6);
                g.drawCircle(0, 0, 20);
                g.endFill();
              }}
              interactive={true}
              pointerdown={() => handleStanceClick(stanceId)}
            />
            <Text
              text={
                stanceData?.symbol || stanceId.substring(0, 1).toUpperCase()
              }
              anchor={0.5}
              style={createKoreanTextStyle({
                fontSize: 16,
                fill: KOREAN_COLORS.TEXT_PRIMARY,
                align: "center",
              })}
            />
          </Container>
        );
      })}

      <Container>
        <Text
          text={TRIGRAM_DATA[currentStance as TrigramStance]?.symbol || ""} // Fix: Type assertion
          anchor={0.5}
          style={createKoreanTextStyle({
            fontSize: size * 0.25,
            fill:
              TRIGRAM_DATA[currentStance as TrigramStance]?.theme?.primary ||
              KOREAN_COLORS.PRIMARY_CYAN,
            align: "center",
          })}
        />
      </Container>
    </Container>
  );
};

// Simple StanceSelector without unused parameters
export const StanceSelector: React.FC<{
  currentStance: string;
  onStanceChange: (stance: string) => void;
}> = () => {
  const stances = ["geon", "tae", "li", "jin", "son", "gam", "gan", "gon"];

  return (
    <Container>
      {stances.map((stanceId: string) => {
        return (
          <Container key={stanceId}>
            <Graphics
              draw={(g: PIXI.Graphics) => {
                g.clear();
                g.beginFill(KOREAN_COLORS.UI_GRAY);
                g.drawRect(0, 0, 50, 30);
                g.endFill();
              }}
            />
          </Container>
        );
      })}
    </Container>
  );
};

// Basic PixiJS component wrappers for Black Trigram
export interface PixiComponentProps {
  children?: React.ReactNode;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean;
}

export const PixiContainer: React.FC<PixiComponentProps> = (props) => {
  usePixiExtensions();
  return <pixiContainer {...props} />;
};

export const PixiGraphics: React.FC<{
  draw: (graphics: any) => void;
  x?: number;
  y?: number;
  interactive?: boolean;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}> = (props) => {
  usePixiExtensions();
  return <pixiGraphics {...props} />;
};

export const PixiText: React.FC<{
  text: string;
  style?: any;
  x?: number;
  y?: number;
  anchor?: number | { x: number; y: number };
}> = (props) => {
  usePixiExtensions();
  return <pixiText {...props} />;
};

export const PixiSprite: React.FC<{
  texture?: any;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  anchor?: number | { x: number; y: number };
  interactive?: boolean;
  onPointerDown?: () => void;
}> = (props) => {
  usePixiExtensions();
  return <pixiSprite {...props} />;
};

export default {
  PixiContainer,
  PixiGraphics,
  PixiText,
  PixiSprite,
};
