import React, { useMemo } from "react";
import { KOREAN_COLORS } from "../../../types/constants";

interface ResponsivePixiProps {
  children?: React.ReactNode;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  screenWidth: number;
  screenHeight: number;
  "data-testid"?: string;
  responsive?: boolean;
}

// Enhanced Responsive container with better scaling
export const ResponsivePixiContainer: React.FC<ResponsivePixiProps> = ({
  children,
  x = 0,
  y = 0,
  screenWidth,
  screenHeight,
  "data-testid": testId,
  responsive = true,
  ...props
}) => {
  const { adjustedX, adjustedY, screenType } = useMemo(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    let adjustedX = x;
    let adjustedY = y;
    let screenType: "mobile" | "tablet" | "desktop" = "desktop";

    if (responsive) {
      if (isMobile) {
        screenType = "mobile";
        const scaleX = screenWidth / 1200;
        const scaleY = screenHeight / 800;
        adjustedX = x * scaleX;
        adjustedY = y * scaleY;
      } else if (isTablet) {
        screenType = "tablet";
        const scaleX = screenWidth / 1200;
        const scaleY = screenHeight / 800;
        adjustedX = x * scaleX;
        adjustedY = y * scaleY;
      }
    }

    return { adjustedX, adjustedY, screenType };
  }, [x, y, screenWidth, screenHeight, responsive]);

  return (
    <pixiContainer
      {...props}
      x={adjustedX}
      y={adjustedY}
      ref={(container: any) => {
        if (container && testId) {
          container.pixiData = {
            type: "responsive-container",
            component: "ResponsivePixiContainer",
            testId,
            responsive,
            screenSize: screenType,
            position: { x: adjustedX, y: adjustedY },
            size: { width: screenWidth, height: screenHeight },
          };
        }
      }}
    >
      {children}
    </pixiContainer>
  );
};

// Enhanced Responsive button with better mobile support
export const ResponsivePixiButton: React.FC<
  ResponsivePixiProps & {
    text: string;
    onClick?: () => void;
    variant?: "primary" | "secondary";
  }
> = ({
  text,
  onClick,
  variant = "primary",
  x = 0,
  y = 0,
  width = 120,
  height = 40,
  screenWidth,
  screenHeight,
  "data-testid": testId,
  responsive = true,
}) => {
  const {
    adjustedX,
    adjustedY,
    adjustedWidth,
    adjustedHeight,
    fontSize,
    screenType,
  } = useMemo(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    let adjustedX = x;
    let adjustedY = y;
    let adjustedWidth = width;
    let adjustedHeight = height;
    let fontSize = 16;
    let screenType: "mobile" | "tablet" | "desktop" = "desktop";

    if (responsive) {
      if (isMobile) {
        screenType = "mobile";
        const scale = Math.min(screenWidth / 1200, screenHeight / 800);
        adjustedX = x * scale;
        adjustedY = y * scale;
        adjustedWidth = Math.max(width * scale, 80);
        adjustedHeight = Math.max(height * scale, 30);
        fontSize = 12;
      } else if (isTablet) {
        screenType = "tablet";
        const scale = Math.min(screenWidth / 1200, screenHeight / 800);
        adjustedX = x * scale;
        adjustedY = y * scale;
        adjustedWidth = width * scale;
        adjustedHeight = height * scale;
        fontSize = 14;
      }
    }

    return {
      adjustedX,
      adjustedY,
      adjustedWidth,
      adjustedHeight,
      fontSize,
      screenType,
    };
  }, [x, y, width, height, screenWidth, screenHeight, responsive]);

  const buttonColor =
    variant === "primary"
      ? KOREAN_COLORS.ACCENT_GOLD
      : KOREAN_COLORS.UI_BACKGROUND_MEDIUM;

  return (
    <pixiContainer
      x={adjustedX}
      y={adjustedY}
      ref={(container: any) => {
        if (container && testId) {
          container.pixiData = {
            type: "responsive-button",
            component: "ResponsivePixiButton",
            testId,
            responsive,
            screenSize: screenType,
            position: { x: adjustedX, y: adjustedY },
            size: { width: adjustedWidth, height: adjustedHeight },
            variant,
            text,
          };
        }
      }}
    >
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: buttonColor, alpha: 0.9 });
          g.roundRect(0, 0, adjustedWidth, adjustedHeight, 6);
          g.fill();
          g.stroke({ width: 2, color: KOREAN_COLORS.PRIMARY_CYAN, alpha: 0.8 });
          g.roundRect(0, 0, adjustedWidth, adjustedHeight, 6);
          g.stroke();
        }}
        interactive={true}
        onPointerDown={onClick}
      />

      <pixiText
        text={text}
        style={{
          fontSize,
          fill:
            variant === "primary"
              ? KOREAN_COLORS.BLACK_SOLID
              : KOREAN_COLORS.TEXT_PRIMARY,
          align: "center",
          fontWeight: "bold",
        }}
        x={adjustedWidth / 2}
        y={adjustedHeight / 2}
        anchor={0.5}
      />
    </pixiContainer>
  );
};

// Enhanced Responsive panel with adaptive content
export const ResponsivePixiPanel: React.FC<
  ResponsivePixiProps & {
    title?: string;
    padding?: number;
  }
> = ({
  children,
  title,
  padding = 16,
  x = 0,
  y = 0,
  width = 300,
  height = 200,
  screenWidth,
  screenHeight,
  "data-testid": testId,
  responsive = true,
}) => {
  const {
    adjustedX,
    adjustedY,
    adjustedWidth,
    adjustedHeight,
    adjustedPadding,
    titleFontSize,
    screenType,
  } = useMemo(() => {
    const isMobile = screenWidth < 768;
    const isTablet = screenWidth >= 768 && screenWidth < 1024;

    let adjustedX = x;
    let adjustedY = y;
    let adjustedWidth = width;
    let adjustedHeight = height;
    let adjustedPadding = padding;
    let titleFontSize = 18;
    let screenType: "mobile" | "tablet" | "desktop" = "desktop";

    if (responsive) {
      if (isMobile) {
        screenType = "mobile";
        const scale = Math.min(screenWidth / 1200, screenHeight / 800);
        adjustedX = x * scale;
        adjustedY = y * scale;
        adjustedWidth = Math.min(width * scale, screenWidth * 0.95);
        adjustedHeight = Math.min(height * scale, screenHeight * 0.8);
        adjustedPadding = Math.max(padding * scale, 8);
        titleFontSize = 14;
      } else if (isTablet) {
        screenType = "tablet";
        const scale = Math.min(screenWidth / 1200, screenHeight / 800);
        adjustedX = x * scale;
        adjustedY = y * scale;
        adjustedWidth = width * scale;
        adjustedHeight = height * scale;
        adjustedPadding = padding * scale;
        titleFontSize = 16;
      }
    }

    return {
      adjustedX,
      adjustedY,
      adjustedWidth,
      adjustedHeight,
      adjustedPadding,
      titleFontSize,
      screenType,
    };
  }, [x, y, width, height, padding, screenWidth, screenHeight, responsive]);

  return (
    <pixiContainer
      x={adjustedX}
      y={adjustedY}
      ref={(container: any) => {
        if (container && testId) {
          container.pixiData = {
            type: "responsive-panel",
            component: "ResponsivePixiPanel",
            testId,
            responsive,
            screenSize: screenType,
            position: { x: adjustedX, y: adjustedY },
            size: { width: adjustedWidth, height: adjustedHeight },
            title,
          };
        }
      }}
    >
      {/* Panel Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.fill({ color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM, alpha: 0.95 });
          g.roundRect(0, 0, adjustedWidth, adjustedHeight, 8);
          g.fill();
          g.stroke({ width: 2, color: KOREAN_COLORS.ACCENT_GOLD, alpha: 0.7 });
          g.roundRect(0, 0, adjustedWidth, adjustedHeight, 8);
          g.stroke();
        }}
      />

      {/* Title */}
      {title && (
        <pixiText
          text={title}
          style={{
            fontSize: titleFontSize,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontWeight: "bold",
            align: "center",
          }}
          x={adjustedWidth / 2}
          y={adjustedPadding}
          anchor={0.5}
        />
      )}

      {/* Content Area */}
      <pixiContainer
        x={adjustedPadding}
        y={title ? adjustedPadding * 2 + titleFontSize : adjustedPadding}
      >
        {children}
      </pixiContainer>
    </pixiContainer>
  );
};
