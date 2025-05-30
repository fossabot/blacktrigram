import React, { useCallback } from "react";
import { Container, Text, Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import {
  KOREAN_COLORS,
  KOREAN_FONT_FAMILY,
  TRIGRAM_DATA,
} from "../../../types";

export interface PhilosophySectionProps {
  readonly onNext: () => void;
  readonly onPrev: () => void;
}

export function PhilosophySection({
  onNext,
  onPrev,
}: PhilosophySectionProps): React.ReactElement {
  const drawPhilosophyBackground = useCallback((g: PixiGraphics) => {
    g.clear();

    // Traditional scroll background
    g.setFillStyle({ color: KOREAN_COLORS.DARK_BLUE, alpha: 0.95 });
    g.rect(0, 0, 1000, 400);
    g.fill();

    // Traditional Korean border pattern
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 3, alpha: 0.8 });
    g.rect(0, 0, 1000, 400);
    g.stroke();

    // Inner decorative border
    g.setStrokeStyle({
      color: KOREAN_COLORS.TRADITIONAL_RED,
      width: 1,
      alpha: 0.6,
    });
    g.rect(20, 20, 960, 360);
    g.stroke();
  }, []);

  const drawTrigramSymbol = useCallback((g: PixiGraphics) => {
    g.clear();

    // Symbol background circle
    g.setFillStyle({ color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.7 });
    g.circle(30, 30, 25);
    g.fill();

    // Border
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.8 });
    g.circle(30, 30, 25);
    g.stroke();
  }, []);

  const drawNavigationButton = useCallback((g: PixiGraphics) => {
    g.clear();

    // Button background
    g.setFillStyle({ color: KOREAN_COLORS.TRADITIONAL_RED, alpha: 0.8 });
    g.rect(0, 0, 120, 40);
    g.fill();

    // Button border
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.9 });
    g.rect(0, 0, 120, 40);
    g.stroke();
  }, []);

  return (
    <Container data-testid="philosophy-section">
      {/* Main philosophy container */}
      <Container x={100} y={0}>
        <Graphics draw={drawPhilosophyBackground} />

        {/* Title */}
        <Text
          text="팔괘 무술 철학 (Trigram Martial Philosophy)"
          anchor={{ x: 0.5, y: 0.5 }}
          x={500}
          y={50}
          style={
            {
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 28,
              fill: KOREAN_COLORS.GOLD,
              fontWeight: "bold",
            } as any
          }
        />

        {/* Philosophy text */}
        <Text
          text="한국 전통 무술은 몸과 마음, 그리고 정신의 조화를 추구합니다."
          anchor={{ x: 0.5, y: 0.5 }}
          x={500}
          y={90}
          style={
            {
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 16,
              fill: KOREAN_COLORS.WHITE,
            } as any
          }
        />

        <Text
          text="Korean traditional martial arts pursue harmony of body, mind, and spirit."
          anchor={{ x: 0.5, y: 0.5 }}
          x={500}
          y={110}
          style={
            {
              fontFamily: "Arial, sans-serif",
              fontSize: 14,
              fill: KOREAN_COLORS.CYAN,
              fontStyle: "italic",
            } as any
          }
        />

        {/* Trigram philosophy */}
        <Text
          text="팔괘(八卦)는 우주의 8가지 기본 원리를 나타냅니다:"
          anchor={{ x: 0.5, y: 0.5 }}
          x={500}
          y={150}
          style={
            {
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 18,
              fill: KOREAN_COLORS.YELLOW,
              fontWeight: "bold",
            } as any
          }
        />

        {/* Trigram display */}
        <Container x={50} y={180}>
          {Object.entries(TRIGRAM_DATA)
            .slice(0, 4)
            .map(([stance, data], index) => (
              <Container key={stance} x={index * 220} y={0}>
                <Graphics draw={drawTrigramSymbol} />

                <Text
                  text={data.symbol}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={30}
                  y={30}
                  style={
                    {
                      fontFamily: "serif",
                      fontSize: 24,
                      fill: KOREAN_COLORS.WHITE,
                      fontWeight: "bold",
                    } as any
                  }
                />

                <Text
                  text={data.korean}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={30}
                  y={70}
                  style={
                    {
                      fontFamily: KOREAN_FONT_FAMILY,
                      fontSize: 14,
                      fill: KOREAN_COLORS.GOLD,
                      fontWeight: "bold",
                    } as any
                  }
                />

                <Text
                  text={data.english}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={30}
                  y={90}
                  style={
                    {
                      fontFamily: "Arial, sans-serif",
                      fontSize: 12,
                      fill: KOREAN_COLORS.CYAN,
                    } as any
                  }
                />
              </Container>
            ))}
        </Container>

        <Container x={50} y={280}>
          {Object.entries(TRIGRAM_DATA)
            .slice(4, 8)
            .map(([stance, data], index) => (
              <Container key={stance} x={index * 220} y={0}>
                <Graphics draw={drawTrigramSymbol} />

                <Text
                  text={data.symbol}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={30}
                  y={30}
                  style={
                    {
                      fontFamily: "serif",
                      fontSize: 24,
                      fill: KOREAN_COLORS.WHITE,
                      fontWeight: "bold",
                    } as any
                  }
                />

                <Text
                  text={data.korean}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={30}
                  y={70}
                  style={
                    {
                      fontFamily: KOREAN_FONT_FAMILY,
                      fontSize: 14,
                      fill: KOREAN_COLORS.GOLD,
                      fontWeight: "bold",
                    } as any
                  }
                />

                <Text
                  text={data.english}
                  anchor={{ x: 0.5, y: 0.5 }}
                  x={30}
                  y={90}
                  style={
                    {
                      fontFamily: "Arial, sans-serif",
                      fontSize: 12,
                      fill: KOREAN_COLORS.CYAN,
                    } as any
                  }
                />
              </Container>
            ))}
        </Container>
      </Container>

      {/* Navigation buttons */}
      <Container x={200} y={420}>
        {/* Previous button */}
        <Container
          x={200}
          y={0}
          interactive={true}
          onPointerDown={onPrev}
          cursor="pointer"
        >
          <Graphics draw={drawNavigationButton} />
          <Text
            text="← 이전"
            anchor={{ x: 0.5, y: 0.5 }}
            x={60}
            y={20}
            style={
              {
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 14,
                fill: KOREAN_COLORS.WHITE,
                fontWeight: "bold",
              } as any
            }
          />
        </Container>

        {/* Start game button */}
        <Container
          x={400}
          y={0}
          interactive={true}
          onPointerDown={onNext}
          cursor="pointer"
        >
          <Graphics draw={drawNavigationButton} />
          <Text
            text="시작!"
            anchor={{ x: 0.5, y: 0.5 }}
            x={60}
            y={10}
            style={
              {
                fontFamily: KOREAN_FONT_FAMILY,
                fontSize: 16,
                fill: KOREAN_COLORS.WHITE,
                fontWeight: "bold",
              } as any
            }
          />
          <Text
            text="Start!"
            anchor={{ x: 0.5, y: 0.5 }}
            x={60}
            y={30}
            style={
              {
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fill: KOREAN_COLORS.CYAN,
              } as any
            }
          />
        </Container>
      </Container>

      {/* Final message */}
      <Text
        text="마음을 차분히 하고 시작하세요 - Calm your mind and begin"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={500}
        style={
          {
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 18,
            fill: KOREAN_COLORS.TRADITIONAL_RED,
            fontWeight: "bold",
          } as any
        }
      />
    </Container>
  );
}
