import * as PIXI from "pixi.js";
import React from "react";
import { FONT_FAMILY, KOREAN_COLORS } from "../../../types/constants";
import { KoreanText } from "../../ui/base/korean-text/KoreanText";
import { ResponsivePixiContainer } from "../../ui/base/ResponsivePixiComponents";

// Shape matching ARCHETYPE_DATA entries
export interface ArchetypeDataShape {
  readonly id: string;
  readonly korean: string;
  readonly english: string;
  readonly description: string;
  readonly color: number;
  readonly textureKey: string;
}

export interface ArchetypeDisplayProps {
  readonly archetype: ArchetypeDataShape;
  readonly texture: PIXI.Texture | null;
  readonly total: number;
  readonly index: number;
  readonly onPrev: () => void;
  readonly onNext: () => void;
  readonly width: number;
  readonly isMobile: boolean;
}

export const ArchetypeDisplay: React.FC<ArchetypeDisplayProps> = React.memo(
  ({ archetype, texture, total, index, onPrev, onNext, width, isMobile }) => {
    // Calculate dimensions for optimal layout
    const containerHeight = isMobile ? 300 : 400;
    const imageWidth = isMobile ? 120 : 180;
    const imageHeight = isMobile ? 200 : 300;
    const textWidth = isMobile ? width * 0.8 : width * 0.6;
    const buttonSize = isMobile ? 36 : 40;

    return (
      <ResponsivePixiContainer
        x={0}
        y={0}
        screenWidth={width}
        screenHeight={containerHeight}
        data-testid={`archetype-display-${archetype.id}`}
      >
        {/* Main container with flexible layout */}
        <pixiContainer
          layout={{
            width,
            height: containerHeight,
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 16 : 24,
            padding: 12,
          }}
          aria-label="Archetype selection"
          data-testid="archetype-inner-container"
        >
          {/* Character image with enhanced styling */}
          {texture && (
            <pixiContainer data-testid="archetype-image-container">
              {/* Background glow in character's color */}
              <pixiGraphics
                draw={(g) => {
                  g.clear();
                  g.fill({ color: archetype.color, alpha: 0.15 });
                  g.circle(
                    imageWidth / 2,
                    imageHeight / 2,
                    (imageWidth + 20) / 2
                  );
                  g.fill();

                  // Border in character's color
                  g.stroke({ width: 2, color: archetype.color, alpha: 0.6 });
                  g.roundRect(-5, -5, imageWidth + 10, imageHeight + 10, 8);
                  g.stroke();
                }}
              />

              {/* Character sprite */}
              <pixiSprite
                texture={texture}
                width={imageWidth}
                height={imageHeight}
                anchor={isMobile ? { x: 0.5, y: 0 } : { x: 0, y: 0 }}
                x={isMobile ? width / 2 : imageWidth / 2}
                y={isMobile ? 20 : imageHeight / 2}
                data-testid="archetype-image"
              />
            </pixiContainer>
          )}

          {/* Character information with proper Korean text support */}
          <pixiContainer
            layout={{
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start",
              gap: isMobile ? 8 : 12,
              width: textWidth,
            }}
            x={isMobile ? 0 : imageWidth + 24}
            y={isMobile ? imageHeight + 30 : 0}
            data-testid="archetype-info"
          >
            {/* Character name */}
            <KoreanText
              text={{
                korean: archetype.korean,
                english: archetype.english,
              }}
              style={{
                fontSize: 18,
                fill: archetype.color,
                fontWeight: "bold",
                align: isMobile ? "center" : "left",
                fontFamily: FONT_FAMILY.KOREAN,
              }}
              x={isMobile ? textWidth / 2 : 0}
              y={0}
              anchor={isMobile ? { x: 0.5, y: 0 } : { x: 0, y: 0 }}
              data-testid="archetype-title"
            />

            {/* Character description */}
            <pixiText
              text={archetype.description}
              style={{
                fontSize: 14,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
                align: isMobile ? "center" : "left",
                wordWrap: true,
                wordWrapWidth: textWidth,
                fontFamily: FONT_FAMILY.KOREAN,
              }}
              x={isMobile ? textWidth / 2 : 0}
              y={isMobile ? 30 : 30}
              anchor={isMobile ? { x: 0.5, y: 0 } : { x: 0, y: 0 }}
              data-testid="archetype-description"
            />

            {/* Selection indicator */}
            <pixiText
              text={`${index + 1} / ${total}`}
              style={{
                fontSize: 12,
                fill: KOREAN_COLORS.TEXT_SECONDARY,
                align: isMobile ? "center" : "left",
                fontFamily: FONT_FAMILY.PRIMARY,
              }}
              x={isMobile ? textWidth / 2 : 0}
              y={isMobile ? 60 : 60}
              anchor={isMobile ? { x: 0.5, y: 0 } : { x: 0, y: 0 }}
              data-testid="archetype-counter"
            />

            {/* Navigation buttons with improved appearance */}
            <pixiContainer
              layout={{
                flexDirection: "row",
                gap: 16,
                justifyContent: isMobile ? "center" : "flex-start",
                width: isMobile ? textWidth : "auto",
              }}
              x={isMobile ? 0 : 0}
              y={isMobile ? 85 : 85}
              data-testid="archetype-navigation"
            >
              {/* Previous button */}
              <pixiContainer data-testid="prev-button-container">
                <pixiGraphics
                  draw={(g) => {
                    g.clear();
                    g.fill({
                      color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                      alpha: 0.9,
                    });
                    g.roundRect(0, 0, buttonSize, buttonSize, 8);
                    g.fill();

                    g.stroke({
                      width: 2,
                      color: KOREAN_COLORS.ACCENT_GOLD,
                      alpha: 0.7,
                    });
                    g.roundRect(0, 0, buttonSize, buttonSize, 8);
                    g.stroke();

                    // Arrow symbol
                    g.stroke({
                      width: 2,
                      color: KOREAN_COLORS.TEXT_PRIMARY,
                      alpha: 0.9,
                    });
                    g.moveTo(buttonSize * 0.7, buttonSize * 0.3);
                    g.lineTo(buttonSize * 0.3, buttonSize * 0.5);
                    g.lineTo(buttonSize * 0.7, buttonSize * 0.7);
                    g.stroke();
                  }}
                  interactive={true}
                  onPointerDown={onPrev}
                  data-testid="prev-archetype-button"
                />
                <pixiText
                  text="이전"
                  style={{
                    fontSize: 10,
                    fill: KOREAN_COLORS.TEXT_SECONDARY,
                    align: "center",
                    fontFamily: FONT_FAMILY.KOREAN,
                  }}
                  x={buttonSize / 2}
                  y={buttonSize + 5}
                  anchor={0.5}
                />
              </pixiContainer>

              {/* Next button */}
              <pixiContainer data-testid="next-button-container">
                <pixiGraphics
                  draw={(g) => {
                    g.clear();
                    g.fill({
                      color: KOREAN_COLORS.UI_BACKGROUND_MEDIUM,
                      alpha: 0.9,
                    });
                    g.roundRect(0, 0, buttonSize, buttonSize, 8);
                    g.fill();

                    g.stroke({
                      width: 2,
                      color: KOREAN_COLORS.ACCENT_GOLD,
                      alpha: 0.7,
                    });
                    g.roundRect(0, 0, buttonSize, buttonSize, 8);
                    g.stroke();

                    // Arrow symbol
                    g.stroke({
                      width: 2,
                      color: KOREAN_COLORS.TEXT_PRIMARY,
                      alpha: 0.9,
                    });
                    g.moveTo(buttonSize * 0.3, buttonSize * 0.3);
                    g.lineTo(buttonSize * 0.7, buttonSize * 0.5);
                    g.lineTo(buttonSize * 0.3, buttonSize * 0.7);
                    g.stroke();
                  }}
                  interactive={true}
                  onPointerDown={onNext}
                  data-testid="next-archetype-button"
                />
                <pixiText
                  text="다음"
                  style={{
                    fontSize: 10,
                    fill: KOREAN_COLORS.TEXT_SECONDARY,
                    align: "center",
                    fontFamily: FONT_FAMILY.KOREAN,
                  }}
                  x={buttonSize / 2}
                  y={buttonSize + 5}
                  anchor={0.5}
                />
              </pixiContainer>
            </pixiContainer>
          </pixiContainer>
        </pixiContainer>
      </ResponsivePixiContainer>
    );
  }
);

export default ArchetypeDisplay;
