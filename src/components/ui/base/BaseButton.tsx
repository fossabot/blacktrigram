// Base button component with Korean martial arts styling

import React, { useState, useMemo, useCallback } from "react";
import { Container, Graphics, Text, Sprite } from "@pixi/react"; // Added Sprite
import * as PIXI from "pixi.js";
import type { BaseButtonProps, KoreanText } from "../../../types";
import {
  KOREAN_COLORS,
  FONT_FAMILY,
  KOREAN_TEXT_SIZES,
  KOREAN_FONT_WEIGHTS,
  CYBERPUNK_PALETTE,
} from "../../../types/constants";
// import { ButtonColors } from './types'; // Unused type

const getButtonColors = (
  variant: BaseButtonProps["variant"],
  disabled?: boolean,
  isHover?: boolean,
  isPressed?: boolean
) => {
  // ...existing code...
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  koreanText, // Kept for compatibility
  englishText, // Added
  onClick,
  onPixiClick, // Added
  disabled = false,
  variant = "primary",
  size = "medium",
  icon, // Added
  isLoading = false, // Added
  pixiStyle: customPixiStyle, // Added
  x = 0,
  y = 0,
  width: propWidth,
  height: propHeight,
  testId, // Added
  anchor, // Added
  draw: customDraw, // Added
  texture: baseTexture,
  hoverTexture,
  pressedTexture,
  disabledTexture,
  children, // Added to allow children
  ...props
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const actualOnClick = onPixiClick || onClick;

  const { textColor, bgColor, borderColor, hoverBgColor, pressedBgColor } =
    useMemo(
      () => getButtonColors(variant, disabled || isLoading, isHover, isPressed),
      [variant, disabled, isLoading, isHover, isPressed]
    );

  const textSize = useMemo(() => {
    switch (size) {
      case "small":
        return KOREAN_TEXT_SIZES.xsmall;
      case "large":
        return KOREAN_TEXT_SIZES.large;
      case "medium":
      default:
        return KOREAN_TEXT_SIZES.medium;
    }
  }, [size]);

  const textStyle = useMemo(
    () =>
      new PIXI.TextStyle({
        fontFamily: FONT_FAMILY.PRIMARY,
        fontSize: textSize,
        fill: disabled || isLoading ? KOREAN_COLORS.UI_GRAY_LIGHT : textColor,
        fontWeight:
          KOREAN_FONT_WEIGHTS.medium.toString() as PIXI.TextStyleFontWeight,
        align: "center",
        wordWrap: true,
        wordWrapWidth: propWidth ? propWidth - 20 : undefined, // Adjust padding
        ...customPixiStyle,
      }),
    [textSize, textColor, disabled, isLoading, customPixiStyle, propWidth]
  );

  const buttonTextContent = useMemo(() => {
    if (typeof text === "string") return text;
    if (text && typeof text === "object" && "korean" in text)
      return `${text.korean} (${text.english})`;
    if (koreanText && englishText) return `${koreanText} (${englishText})`;
    if (koreanText) return koreanText;
    return englishText || "Button";
  }, [text, koreanText, englishText]);

  const textMetrics = useMemo(() => {
    return PIXI.TextMetrics.measureText(buttonTextContent, textStyle);
  }, [buttonTextContent, textStyle]);

  const buttonWidth =
    propWidth ?? Math.max(100, textMetrics.width + 40 + (icon ? 30 : 0));
  const buttonHeight = propHeight ?? Math.max(40, textMetrics.height + 20);

  const drawButton = useCallback(
    (g: PIXI.Graphics) => {
      if (customDraw) {
        customDraw(g);
        return;
      }
      if (baseTexture && !disabled && !isLoading) return; // Texture will be handled by Sprite

      g.clear();
      const currentBgColor = isPressed
        ? pressedBgColor
        : isHover
        ? hoverBgColor
        : bgColor;
      g.beginFill(
        disabled || isLoading ? KOREAN_COLORS.UI_DISABLED_FILL : currentBgColor
      );
      g.lineStyle(
        2,
        disabled || isLoading ? KOREAN_COLORS.UI_DISABLED_BORDER : borderColor
      );
      g.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 8);
      g.endFill();
    },
    [
      bgColor,
      borderColor,
      hoverBgColor,
      pressedBgColor,
      buttonWidth,
      buttonHeight,
      disabled,
      isLoading,
      isHover,
      isPressed,
      customDraw,
      baseTexture,
    ]
  );

  const currentTexture = useMemo(() => {
    if (disabled || isLoading) return disabledTexture || baseTexture;
    if (isPressed) return pressedTexture || baseTexture;
    if (isHover) return hoverTexture || baseTexture;
    return baseTexture;
  }, [
    disabled,
    isLoading,
    isPressed,
    isHover,
    baseTexture,
    hoverTexture,
    pressedTexture,
    disabledTexture,
  ]);

  return (
    <Container
      x={x}
      y={y}
      interactive={!disabled && !isLoading}
      buttonMode={!disabled && !isLoading}
      pointertap={actualOnClick}
      pointerover={() => setIsHover(true)}
      pointerout={() => {
        setIsHover(false);
        setIsPressed(false);
      }}
      pointerdown={() => setIsPressed(true)}
      pointerup={() => setIsPressed(false)}
      pointerupoutside={() => setIsPressed(false)}
      cursor={disabled || isLoading ? "not-allowed" : "pointer"}
      anchor={anchor} // Apply anchor if provided
      data-testid={testId} // For testing
      {...props} // Spread remaining props
    >
      {!currentTexture && <Graphics draw={drawButton} />}
      {currentTexture && (
        <Sprite
          texture={currentTexture}
          width={buttonWidth}
          height={buttonHeight}
          anchor={0} // Assuming texture is designed for 0,0 anchor
        />
      )}

      <Container x={buttonWidth / 2} y={buttonHeight / 2}>
        {icon && typeof icon === "string" && (
          <Sprite
            texture={PIXI.Texture.from(icon)} // Assuming icon is a path to texture
            anchor={0.5}
            x={buttonTextContent ? -textMetrics.width / 2 - 10 : 0} // Position icon left of text
            scale={Math.min(
              (textSize * 1.2) / PIXI.Texture.from(icon).height,
              (textSize * 1.2) / PIXI.Texture.from(icon).width
            )} // Scale icon based on text size
          />
        )}
        {icon &&
          typeof icon !== "string" && ( // If icon is JSX
            <Container
              anchor={0.5}
              x={buttonTextContent ? -textMetrics.width / 2 - 10 : 0}
            >
              {icon}
            </Container>
          )}

        {buttonTextContent && (
          <Text
            text={isLoading ? "Loading..." : buttonTextContent}
            anchor={0.5}
            style={textStyle}
            x={icon ? (textMetrics.width / 2) * 0.2 + 5 : 0} // Adjust text position if icon is present
          />
        )}
      </Container>
      {children}
    </Container>
  );
};
