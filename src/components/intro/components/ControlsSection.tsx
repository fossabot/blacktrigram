import React, { useCallback } from "react";
import { Container, Text, Graphics } from "@pixi/react";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS, KOREAN_FONT_FAMILY } from "../../../types";

export interface ControlsSectionProps {
  readonly onNext: () => void;
  readonly onPrev: () => void;
}

interface ControlInfo {
  readonly key: string;
  readonly korean: string;
  readonly english: string;
  readonly description: string;
}

const CONTROL_MAPPINGS: readonly ControlInfo[] = [
  {
    key: "1-8",
    korean: "팔괘 변환",
    english: "Trigram Stance",
    description:
      "1=건(天) 2=태(澤) 3=리(火) 4=진(雷) 5=손(風) 6=감(水) 7=간(山) 8=곤(地)",
  },
  {
    key: "WASD",
    korean: "이동",
    english: "Movement",
    description: "W=위로 A=왼쪽 S=아래로 D=오른쪽",
  },
  {
    key: "Space",
    korean: "공격",
    english: "Attack",
    description: "현재 자세의 기본 공격 실행",
  },
  {
    key: "Shift",
    korean: "방어",
    english: "Block",
    description: "들어오는 공격을 방어",
  },
  {
    key: "Enter",
    korean: "급소 공격",
    english: "Vital Strike",
    description: "정확한 급소 타격 시도",
  },
  {
    key: "ESC",
    korean: "일시정지",
    english: "Pause",
    description: "게임 일시정지 및 메뉴",
  },
];

export function ControlsSection({
  onNext,
  onPrev,
}: ControlsSectionProps): React.ReactElement {
  const drawControlBox = useCallback((g: PixiGraphics) => {
    g.clear();

    // Background
    g.setFillStyle({ color: KOREAN_COLORS.DARK_BLUE, alpha: 0.9 });
    g.rect(0, 0, 800, 350);
    g.fill();

    // Border with Korean traditional styling
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.8 });
    g.rect(0, 0, 800, 350);
    g.stroke();

    // Inner accent border
    g.setStrokeStyle({ color: KOREAN_COLORS.CYAN, width: 1, alpha: 0.5 });
    g.rect(10, 10, 780, 330);
    g.stroke();
  }, []);

  const drawNavigationButton = useCallback((g: PixiGraphics) => {
    g.clear();

    // Button background
    g.setFillStyle({ color: KOREAN_COLORS.ACCENT_BLUE, alpha: 0.8 });
    g.rect(0, 0, 120, 40);
    g.fill();

    // Button border
    g.setStrokeStyle({ color: KOREAN_COLORS.GOLD, width: 2, alpha: 0.9 });
    g.rect(0, 0, 120, 40);
    g.stroke();
  }, []);

  return (
    <Container data-testid="controls-section">
      {/* Main controls container */}
      <Container x={200} y={0}>
        <Graphics draw={drawControlBox} />

        {/* Title */}
        <Text
          text="조작법 안내 (Control Guide)"
          anchor={{ x: 0.5, y: 0.5 }}
          x={400}
          y={40}
          style={
            {
              fontFamily: KOREAN_FONT_FAMILY,
              fontSize: 24,
              fill: KOREAN_COLORS.GOLD,
              fontWeight: "bold",
            } as any
          }
        />

        {/* Control mappings */}
        {CONTROL_MAPPINGS.map((control, index) => {
          const yPos = 80 + index * 45;

          return (
            <Container key={control.key} x={30} y={yPos}>
              {/* Key binding */}
              <Text
                text={control.key}
                anchor={{ x: 0, y: 0.5 }}
                x={0}
                y={0}
                style={
                  {
                    fontFamily: "Courier New, monospace",
                    fontSize: 16,
                    fill: KOREAN_COLORS.YELLOW,
                    fontWeight: "bold",
                  } as any
                }
              />

              {/* Korean function */}
              <Text
                text={control.korean}
                anchor={{ x: 0, y: 0.5 }}
                x={120}
                y={0}
                style={
                  {
                    fontFamily: KOREAN_FONT_FAMILY,
                    fontSize: 16,
                    fill: KOREAN_COLORS.WHITE,
                    fontWeight: "bold",
                  } as any
                }
              />

              {/* English function */}
              <Text
                text={control.english}
                anchor={{ x: 0, y: 0.5 }}
                x={250}
                y={0}
                style={
                  {
                    fontFamily: "Arial, sans-serif",
                    fontSize: 14,
                    fill: KOREAN_COLORS.CYAN,
                  } as any
                }
              />

              {/* Description */}
              <Text
                text={control.description}
                anchor={{ x: 0, y: 0.5 }}
                x={120}
                y={20}
                style={
                  {
                    fontFamily: KOREAN_FONT_FAMILY,
                    fontSize: 12,
                    fill: KOREAN_COLORS.GRAY_LIGHT,
                  } as any
                }
              />
            </Container>
          );
        })}
      </Container>

      {/* Navigation buttons */}
      <Container x={100} y={370}>
        {/* Previous button */}
        <Container
          x={0}
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

        {/* Next button */}
        <Container
          x={680}
          y={0}
          interactive={true}
          onPointerDown={onNext}
          cursor="pointer"
        >
          <Graphics draw={drawNavigationButton} />
          <Text
            text="다음 →"
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
      </Container>

      {/* Navigation hint */}
      <Text
        text="조작법을 숙지한 후 다음으로 진행해주세요"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={450}
        style={
          {
            fontFamily: KOREAN_FONT_FAMILY,
            fontSize: 16,
            fill: KOREAN_COLORS.YELLOW,
          } as any
        }
      />

      <Text
        text="Familiarize yourself with the controls, then proceed"
        anchor={{ x: 0.5, y: 0.5 }}
        x={600}
        y={470}
        style={
          {
            fontFamily: "Arial, sans-serif",
            fontSize: 14,
            fill: KOREAN_COLORS.GRAY_LIGHT,
            fontStyle: "italic",
          } as any
        }
      />
    </Container>
  );
}
