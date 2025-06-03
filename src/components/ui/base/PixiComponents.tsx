// Reusable PIXI.js components for Black Trigram Korean martial arts game

import React, { useCallback, useMemo, type ReactNode, useState } from "react";
import type * as PIXI from "pixi.js";
import type {
  FederatedPointerEvent,
  TextStyle as PixiTextStyleType,
  Graphics as PixiGraphicsType,
} from "pixi.js";

import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types";

// Add stance color mapping for trigram colors
const STANCE_COLORS = {
  geon: KOREAN_COLORS.GEON_GOLD, // Heaven - Gold
  tae: KOREAN_COLORS.TAE_CYAN, // Lake - Cyan
  li: KOREAN_COLORS.LI_ORANGE, // Fire - Orange (changed from TRADITIONAL_RED)
  jin: KOREAN_COLORS.JIN_PURPLE, // Thunder - Purple (using existing NEON_PURPLE or add JIN_PURPLE)
  son: KOREAN_COLORS.SON_GREEN, // Wind - Green
  gam: KOREAN_COLORS.GAM_BLUE, // Water - Blue
  gan: KOREAN_COLORS.GAN_BROWN, // Mountain - Brown (using WOOD_BROWN)
  gon: KOREAN_COLORS.GON_YELLOW, // Earth - Yellow/Gold
} as const;

// Base Props for Pixi Components
export interface PixiBaseProps {
  x?: number;
  y?: number;
  alpha?: number;
  visible?: boolean;
  interactive?: boolean;
  cursor?: string;
  name?: string;
  zIndex?: number;
  scale?: number | { x: number; y: number };
  rotation?: number;
  // Fix: Only allow {x, y} or PIXI.PointData for pivot/skew
  pivot?: { x: number; y: number } | PIXI.PointData;
  skew?: { x: number; y: number } | PIXI.PointData;
  onpointerdown?: (event: FederatedPointerEvent) => void;
  onpointerup?: (event: FederatedPointerEvent) => void;
  onpointerover?: (event: FederatedPointerEvent) => void;
  onpointerout?: (event: FederatedPointerEvent) => void;
  onpointertap?: (event: FederatedPointerEvent) => void; // Corrected: onpointertap
  // Add other common PIXI event handlers if needed
}

// Container Component
export interface PixiContainerComponentProps extends PixiBaseProps {
  children?: ReactNode;
  interactiveChildren?: boolean;
  sortableChildren?: boolean;
  // onClick?: (event: FederatedPointerEvent) => void; // Already in PixiBaseProps as onpointertap or similar
}
export function PixiContainerComponent({
  children,
  ...props
}: PixiContainerComponentProps): React.ReactElement {
  return <pixiContainer {...props}>{children}</pixiContainer>;
}

// Graphics Component
export interface PixiGraphicsComponentProps extends PixiBaseProps {
  draw: (g: PixiGraphicsType) => void;
  geometry?: PIXI.Geometry; // Changed from PIXI.GraphicsGeometry to PIXI.Geometry, check if this is the correct type or if it should be removed/handled differently
}
export function PixiGraphicsComponent({
  draw,
  geometry,
  ...props
}: PixiGraphicsComponentProps): React.ReactElement {
  const handleDraw = useCallback(
    (g: PixiGraphicsType) => {
      if (geometry) {
        // If a geometry is passed, Pixi might handle it differently or it's for advanced use.
        // For typical draw callbacks, g.clear() is common.
      }
      draw(g);
    },
    [draw, geometry]
  );
  return <pixiGraphics {...props} draw={handleDraw} />;
}

// Extended Text Style
export interface ExtendedPixiTextStyle
  extends Omit<Partial<PixiTextStyleType>, "dropShadow"> {
  dropShadow?: PIXI.TextDropShadow | boolean; // Allow boolean for easier toggling, convert to object or undefined internally
}

// Text Component
export interface PixiTextComponentProps extends PixiBaseProps {
  text: string;
  style?: ExtendedPixiTextStyle; // Use ExtendedPixiTextStyle
  anchor?: number | { x: number; y: number };
  resolution?: number;
}
export function PixiTextComponent({
  text,
  style,
  ...props
}: PixiTextComponentProps): React.ReactElement {
  const memoizedStyle = useMemo(() => {
    const { dropShadow: dropShadowInput, ...restOfStyle } = style || {};
    const finalStyle: Partial<PixiTextStyleType> = { ...restOfStyle };

    const defaultShadow: PIXI.TextDropShadow = {
      color: KOREAN_COLORS.BLACK,
      alpha: 0.5,
      angle: Math.PI / 4,
      blur: 2,
      distance: 2,
      // Ensure all required properties of TextDropShadow are here if PIXI.TextDropShadow has more
    };

    if (typeof dropShadowInput === "boolean") {
      if (dropShadowInput) {
        finalStyle.dropShadow = defaultShadow;
      } else {
        // If false, dropShadow remains undefined in finalStyle, which is acceptable
      }
    } else if (dropShadowInput && typeof dropShadowInput === "object") {
      // Merge user-provided partial shadow object with defaults
      finalStyle.dropShadow = {
        ...defaultShadow,
        ...(dropShadowInput as Partial<PIXI.TextDropShadow>),
      };
    }
    // If dropShadowInput is undefined, finalStyle.dropShadow will also be undefined.

    return finalStyle as PixiTextStyleType;
  }, [style]);

  return <pixiText text={text} style={memoizedStyle} {...props} />;
}

// Korean Text Component (using the base PixiTextComponent)
export interface PixiKoreanTextProps
  extends Omit<PixiTextComponentProps, "text" | "style"> {
  korean: string;
  english?: string; // Made optional to match usage
  baseStyle?: ExtendedPixiTextStyle; // Use ExtendedPixiTextStyle
  showEnglish?: boolean;
  separator?: string;
}

export function PixiKoreanText({
  korean,
  english,
  baseStyle,
  showEnglish = true,
  separator = " / ",
  ...props
}: PixiKoreanTextProps): React.ReactElement {
  const memoizedStyle = useMemo((): ExtendedPixiTextStyle => {
    const defaultStyle: ExtendedPixiTextStyle = {
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: 16,
      fill: KOREAN_COLORS.WHITE,
      // dropShadow: false, // Default to no drop shadow or configure as object
    };
    const combinedStyle = { ...defaultStyle, ...baseStyle };
    if (typeof combinedStyle.dropShadow === "boolean") {
      if (combinedStyle.dropShadow) {
        combinedStyle.dropShadow = {
          color: KOREAN_COLORS.BLACK,
          alpha: 0.7,
          angle: Math.PI / 4,
          blur: 3,
          distance: 3,
        };
      } else {
        delete combinedStyle.dropShadow;
      }
    }
    return combinedStyle;
  }, [baseStyle]);

  const displayText = useMemo(() => {
    if (english && showEnglish) {
      return `${korean}${separator}${english}`;
    }
    return korean;
  }, [korean, english, showEnglish, separator]);

  return (
    <PixiTextComponent text={displayText} style={memoizedStyle} {...props} />
  );
}

// Example Button
interface PixiButtonProps extends PixiContainerComponentProps {
  text?: string;
  width?: number;
  height?: number;
  color?: number;
  textColor?: number;
  onClick?: (event: FederatedPointerEvent) => void; // Already in PixiContainerComponentProps via PixiBaseProps
}

export function PixiButton({
  text = "Button",
  width = 100,
  height = 40,
  color = KOREAN_COLORS.DOJANG_BLUE,
  textColor = KOREAN_COLORS.WHITE,
  onClick,
  children,
  ...containerProps
}: PixiButtonProps): React.ReactElement {
  const [isHovered, setIsHovered] = useState(false);

  const drawButton = useCallback(
    (g: PixiGraphicsType) => {
      g.clear();
      g.setFillStyle({
        color: isHovered ? KOREAN_COLORS.NEON_CYAN : color, // Use NEON_CYAN instead of ACCENT_BLUE
        alpha: 1,
      });
      g.roundRect(0, 0, width, height, 8);
      g.fill();
      g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 1 });
      g.roundRect(0, 0, width, height, 8);
      g.stroke();
    },
    [width, height, color, isHovered]
  );

  const textStyle = useMemo(
    (): ExtendedPixiTextStyle => ({
      fontFamily: KOREAN_FONT_FAMILY,
      fontSize: height * 0.4,
      fill: textColor,
      align: "center",
    }),
    [height, textColor]
  );

  return (
    <PixiContainerComponent
      interactive={true}
      cursor="pointer"
      onpointertap={onClick} // This should now be compatible due to tsconfig change
      onpointerover={() => setIsHovered(true)}
      onpointerout={() => setIsHovered(false)}
      {...containerProps}
    >
      <PixiGraphicsComponent draw={drawButton} />
      {children ? (
        children
      ) : (
        <PixiTextComponent
          text={text}
          anchor={{ x: 0.5, y: 0.5 }}
          x={width / 2}
          y={height / 2}
          style={textStyle}
        />
      )}
    </PixiContainerComponent>
  );
}

// Example Usage (can be removed or kept for testing)
export function PixiComponentExamples(): React.ReactElement {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((c) => c + 1);
    console.log("Button clicked!");
  };

  const textStyleLarge: ExtendedPixiTextStyle = {
    fontSize: 24,
    fill: KOREAN_COLORS.NEON_CYAN,
    // dropShadow: { color: KOREAN_COLORS.BLACK, distance: 2, blur: 2, angle: Math.PI/4 },
  };

  return (
    <PixiContainerComponent x={50} y={50}>
      <PixiButton
        text={`Click Me: ${count}`}
        onClick={handleClick}
        width={150}
        height={50}
      />

      <PixiKoreanText
        korean="안녕하세요"
        english="Hello"
        baseStyle={textStyleLarge}
        x={0}
        y={70}
      />
      <PixiKoreanText
        korean="건 (Geon)"
        baseStyle={{ fontSize: 20, fill: STANCE_COLORS.geon }} // Use STANCE_COLORS
        x={0}
        y={110}
      />
      <PixiKoreanText
        korean="태 (Tae)"
        english="Lake"
        baseStyle={{ fontSize: 18, fill: STANCE_COLORS.tae }} // Use STANCE_COLORS
        x={0}
        y={140}
        showEnglish={true}
      />
      <PixiKoreanText
        korean="리 (Li) - Fire"
        baseStyle={{ fontSize: 16, fill: STANCE_COLORS.li }} // Use STANCE_COLORS
        x={0}
        y={170}
        showEnglish={false} // Example of hiding English part
      />
    </PixiContainerComponent>
  );
}
