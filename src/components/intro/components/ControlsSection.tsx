import React from "react";
import { usePixiExtensions } from "../../../utils/pixiExtensions";
import type { ControlsSectionProps } from "../../../types/components";
import { KOREAN_COLORS, COMBAT_CONTROLS } from "../../../types/constants";
import * as PIXI from "pixi.js";

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  onBack,
  x = 0,
  y = 0,
  width = 800,
  height = 600,
}) => {
  usePixiExtensions();

  return (
    <pixiContainer x={x} y={y} data-testid="controls-section">
      {/* Background */}
      <pixiGraphics
        draw={(g) => {
          g.clear();
          g.beginFill(KOREAN_COLORS.UI_BACKGROUND_DARK, 0.9);
          g.drawRoundedRect(0, 0, width, height, 10);
          g.endFill();

          g.lineStyle(2, KOREAN_COLORS.ACCENT_GOLD, 0.8);
          g.drawRoundedRect(0, 0, width, height, 10);
        }}
      />

      {/* Title */}
      <pixiText
        text="조작법 (Controls)"
        style={
          new PIXI.TextStyle({
            fontSize: 32,
            fill: KOREAN_COLORS.ACCENT_GOLD,
            fontFamily: "Arial, sans-serif",
            align: "center",
          })
        }
        x={width / 2}
        y={40}
        anchor={0.5}
      />

      {/* Stance Controls */}
      <pixiText
        text="팔괘 자세 (Trigram Stances)"
        style={
          new PIXI.TextStyle({
            fontSize: 24,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontFamily: "Arial, sans-serif",
          })
        }
        x={40}
        y={100}
      />

      {/* Control mappings */}
      {Object.entries(COMBAT_CONTROLS.stanceControls).map(
        ([key, value], index) => (
          <pixiContainer key={key} x={40} y={140 + index * 30}>
            <pixiText
              text={`${key}: ${value.korean} (${value.technique})`}
              style={
                new PIXI.TextStyle({
                  fontSize: 16,
                  fill: KOREAN_COLORS.TEXT_SECONDARY,
                  fontFamily: "Arial, sans-serif",
                })
              }
            />
          </pixiContainer>
        )
      )}

      {/* Combat Controls */}
      <pixiText
        text="전투 조작 (Combat Controls)"
        style={
          new PIXI.TextStyle({
            fontSize: 24,
            fill: KOREAN_COLORS.TEXT_PRIMARY,
            fontFamily: "Arial, sans-serif",
          })
        }
        x={40}
        y={380}
      />

      {Object.entries(COMBAT_CONTROLS.combat).map(
        ([key, description], index) => (
          <pixiContainer key={key} x={40} y={420 + index * 30}>
            <pixiText
              text={`${key}: ${description}`}
              style={
                new PIXI.TextStyle({
                  fontSize: 16,
                  fill: KOREAN_COLORS.TEXT_SECONDARY,
                  fontFamily: "Arial, sans-serif",
                })
              }
            />
          </pixiContainer>
        )
      )}

      {/* Back Button */}
      <pixiContainer x={width - 150} y={height - 80}>
        <pixiGraphics
          draw={(g) => {
            g.clear();
            g.beginFill(KOREAN_COLORS.ACCENT_RED, 0.8);
            g.drawRoundedRect(0, 0, 120, 40, 5);
            g.endFill();
          }}
          interactive={true}
          onPointerDown={onBack}
        />
        <pixiText
          text="돌아가기"
          style={
            new PIXI.TextStyle({
              fontSize: 16,
              fill: KOREAN_COLORS.TEXT_PRIMARY,
              align: "center",
            })
          }
          x={60}
          y={20}
          anchor={0.5}
        />
      </pixiContainer>
    </pixiContainer>
  );
};

export default ControlsSection;
