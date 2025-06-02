import React, { useState, useCallback, useMemo } from "react";
import { Container, Graphics, Text } from "@pixi/react";
import type {
  Graphics as PixiGraphics,
  TextStyle as PixiTextStyle,
} from "pixi.js";
import {
  KOREAN_COLORS,
  TRIGRAM_STANCES_ORDER,
  KOREAN_FONT_FAMILY,
  TRIGRAM_DATA, // Import TRIGRAM_DATA from types/index.ts (which re-exports from types/trigram.ts)
} from "../../../types";
import type { TrigramStance, TrigramWheelProps } from "../../types";

const WHEEL_RADIUS = 150;
const ITEM_RADIUS = 30;
const LABEL_OFFSET = 45;

export function TrigramWheel({
  selectedStance,
  onStanceChange,
  onStanceSelect,
  x = 0,
  y = 0,
  radius = WHEEL_RADIUS,
  isEnabled = true,
  showLabels = true,
  isInteractive = true,
}: TrigramWheelProps): React.ReactElement {
  const [hoveredStance, setHoveredStance] = useState<TrigramStance | null>(
    null
  );

  const handleStanceClick = useCallback(
    (stance: TrigramStance) => {
      if (isEnabled && isInteractive) {
        onStanceChange(stance);
        if (onStanceSelect) {
          onStanceSelect(stance); // Call onStanceSelect if it's for selection confirmation/action
        }
      }
    },
    [onStanceChange, onStanceSelect, isEnabled, isInteractive]
  );

  const handlePointerOver = useCallback(
    (stance: TrigramStance) => {
      if (isEnabled && isInteractive) {
        setHoveredStance(stance);
        // if (onStanceSelect) onStanceSelect(stance);
      }
    },
    [isEnabled, isInteractive]
  );

  const handlePointerOut = useCallback(() => {
    if (isEnabled && isInteractive) {
      setHoveredStance(null);
    }
  }, [isEnabled, isInteractive]);

  const drawWheelBackground = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(KOREAN_COLORS.BLACK, 0.8);
      g.drawCircle(0, 0, radius);
      g.endFill();
    },
    [radius]
  );

  const items = useMemo(() => {
    return TRIGRAM_STANCES_ORDER.map((stance, index) => {
      const angle =
        (index / TRIGRAM_STANCES_ORDER.length) * 2 * Math.PI - Math.PI / 2;
      const itemX = radius * Math.cos(angle);
      const itemY = radius * Math.sin(angle);
      const data = TRIGRAM_DATA[stance];
      const color = data.color || KOREAN_COLORS.GRAY_LIGHT;
      const isSelected = stance === selectedStance;
      const isHovered = stance === hoveredStance;

      return {
        stance,
        x: itemX,
        y: itemY,
        data,
        color,
        isSelected,
        isHovered,
      };
    });
  }, [radius, selectedStance, hoveredStance]);

  const drawItem = useCallback(
    (g: PixiGraphics, item: (typeof items)[0]) => {
      g.clear();
      const alpha = !isEnabled ? 0.5 : 1;
      g.beginFill(
        item.color,
        item.isSelected ? alpha : item.isHovered ? alpha * 0.7 : alpha * 0.4
      );
      g.drawCircle(0, 0, ITEM_RADIUS);
      g.endFill();

      if (item.isSelected || item.isHovered) {
        g.lineStyle(item.isSelected ? 3 : 1, KOREAN_COLORS.WHITE, alpha);
        g.drawCircle(0, 0, ITEM_RADIUS);
        g.closePath();
      }
    },
    [isEnabled]
  );

  const baseTextStyle: Partial<PixiTextStyle> = {
    fontFamily: KOREAN_FONT_FAMILY,
    fontSize: 14,
    fill: KOREAN_COLORS.WHITE,
    align: "center",
  };

  const selectedTextStyle: Partial<PixiTextStyle> = {
    ...baseTextStyle,
    fontWeight: "bold",
    fill: KOREAN_COLORS.GOLD,
    dropShadow: {
      color: KOREAN_COLORS.BLACK,
      alpha: 0.5,
      angle: Math.PI / 4,
      blur: 2,
      distance: 2,
    },
  };

  return (
    <Container x={x} y={y}>
      <Graphics draw={drawWheelBackground} />
      {items.map((item) => (
        <Container
          key={item.stance}
          x={item.x}
          y={item.y}
          interactive={isEnabled && isInteractive}
          eventMode={isEnabled && isInteractive ? "static" : "passive"}
          cursor={isEnabled && isInteractive ? "pointer" : "default"}
          onpointertap={() => handleStanceClick(item.stance)}
          onpointerover={() => handlePointerOver(item.stance)}
          onpointerout={handlePointerOut}
        >
          <Graphics draw={(g) => drawItem(g, item)} />
          {showLabels && (
            <>
              <Text
                text={item.data.symbol}
                x={0}
                y={-LABEL_OFFSET / 2}
                anchor={{ x: 0.5, y: 0.5 }}
                style={
                  item.isSelected || item.isHovered
                    ? selectedTextStyle
                    : baseTextStyle
                }
              />
              <Text
                text={item.data.name.korean}
                x={0}
                y={LABEL_OFFSET / 2}
                anchor={{ x: 0.5, y: 0.5 }}
                style={{
                  ...baseTextStyle,
                  fontSize: 10,
                  fill:
                    item.isSelected || item.isHovered
                      ? KOREAN_COLORS.GOLD
                      : KOREAN_COLORS.GRAY_LIGHT,
                }}
              />
            </>
          )}
        </Container>
      ))}
      {selectedStance && TRIGRAM_DATA[selectedStance] && (
        <Text
          text={TRIGRAM_DATA[selectedStance].name.english.toUpperCase()}
          x={0}
          y={0}
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            ...baseTextStyle,
            fontSize: 18,
            fill: KOREAN_COLORS.WHITE,
            fontWeight: "bold",
          }}
        />
      )}
    </Container>
  );
}
