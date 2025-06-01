import React, { useCallback, useState } from "react";
import { useTick } from "@pixi/react";
import {
  PixiContainerComponent,
  PixiGraphicsComponent,
  PixiTextComponent,
} from "../ui/base/PixiComponents";
import type { Graphics as PixiGraphics } from "pixi.js";
import { KOREAN_COLORS, TRIGRAM_DATA, KOREAN_FONT_FAMILY } from "../../types";
import type { PlayerVisualsProps, BodyPartProps } from "../../types";

// PlayerVisualsProps and BodyPartProps are now imported from centralized types

const BodyPart: React.FC<BodyPartProps> = ({
  shape,
  color,
  alpha = 0.9,
  size,
  x = 0,
  y = 0,
  rotation = 0,
  anchor = { x: 0.5, y: 0.5 },
}) => {
  const draw = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.position.set(x, y);
      g.rotation = rotation;

      if (shape === "circle" && size.radius) {
        g.setFillStyle({ color, alpha });
        g.circle(0, 0, size.radius);
        g.fill();
      } else if (shape === "rectangle" && size.width && size.height) {
        g.setFillStyle({ color, alpha });
        // Adjust drawing based on anchor
        g.rect(
          -size.width * anchor.x,
          -size.height * anchor.y,
          size.width,
          size.height
        );
        g.fill();
      } else if (shape === "line" && size.length && size.thickness) {
        g.setStrokeStyle({ color, width: size.thickness, alpha });
        g.moveTo(0, 0);
        g.lineTo(size.length, 0); // Line drawn along x-axis, rotation handles orientation
        g.stroke();
      }
    },
    [shape, color, alpha, size, x, y, rotation, anchor]
  );

  return <PixiGraphicsComponent draw={draw} />;
};

export function PlayerVisuals({
  playerState,
  isPlayer1,
}: PlayerVisualsProps): React.ReactElement {
  const [animationTime, setAnimationTime] = useState(0);
  useTick(useCallback((delta) => setAnimationTime((prev) => prev + delta), []));

  const currentTrigram = TRIGRAM_DATA[playerState.stance];
  const facingDirection = playerState.facing === "left" ? -1 : 1;

  // Body part dimensions
  const headRadius = 12;
  const torsoSize = { width: 28, height: 45 };
  const limbThickness = 8;
  const upperArmLength = 25;
  const lowerArmLength = 22;
  const upperLegLength = 28;
  const lowerLegLength = 25;
  const beltSize = { width: torsoSize.width + 4, height: 10 };

  // Relative positions (origin is center of torso)
  const headPos = { x: 0, y: -torsoSize.height / 2 - headRadius + 2 };
  const torsoPos = { x: 0, y: 0 };
  const beltPos = { x: 0, y: torsoPos.y + torsoSize.height * 0.1 };

  // Limb initial positions and rotations (example for "right" side of the body, will be mirrored by facingDirection)
  const shoulderOffsetY = -torsoSize.height / 2 + 5;
  const hipOffsetY = torsoSize.height / 2 - 5;

  // Default pose
  let armUpperRot = Math.PI / 5; // Slightly angled down
  let armLowerRot = Math.PI / 4;
  let legUpperRot = Math.PI / 10; // Slightly forward
  let legLowerRot = -Math.PI / 8;

  // Attack pose adjustments
  let attackLimbHighlight: "arm" | "leg" | null = null;

  if (playerState.isAttacking) {
    const attackType = currentTrigram.technique.type;
    if (
      attackType === "punch" ||
      attackType === "strike" ||
      attackType === "elbow" ||
      attackType === "pressure_point"
    ) {
      armUpperRot = -Math.PI / 2.5; // Arm forward
      armLowerRot = Math.PI / 6; // Forearm slightly bent
      attackLimbHighlight = "arm";
    } else if (attackType === "kick" || attackType === "knee") {
      legUpperRot = -Math.PI / 2.5; // Leg forward/up
      legLowerRot = Math.PI / 8; // Lower leg extended
      attackLimbHighlight = "leg";
    }
  }

  const dobokColor = KOREAN_COLORS.WHITE;
  const skinColor = KOREAN_COLORS.SKIN_TONE_LIGHT;
  const beltColor = isPlayer1
    ? KOREAN_COLORS.PLAYER_1_BLUE
    : KOREAN_COLORS.PLAYER_2_RED;
  const attackHighlightColor = KOREAN_COLORS.GOLD;

  // Stance Aura
  const drawStanceAura = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      if (playerState.isAttacking) {
        const auraAlpha = Math.sin(animationTime * 0.3) * 0.3 + 0.5;
        g.setStrokeStyle({
          color: currentTrigram.color,
          width: 3 + Math.sin(animationTime * 0.5) * 2,
          alpha: auraAlpha,
        });
        g.circle(
          torsoPos.x,
          torsoPos.y,
          torsoSize.height * 0.8 + Math.sin(animationTime * 0.4) * 5
        );
        g.stroke();
      }
    },
    [
      playerState.isAttacking,
      currentTrigram.color,
      animationTime,
      torsoPos,
      torsoSize,
    ]
  );

  return (
    <PixiContainerComponent
      scale={{ x: facingDirection, y: 1 }}
      alpha={playerState.visible !== false ? 1 : 0.5}
    >
      {/* Torso */}
      <BodyPart
        shape="rectangle"
        color={dobokColor}
        size={torsoSize}
        x={torsoPos.x}
        y={torsoPos.y}
      />

      {/* Head */}
      <BodyPart
        shape="circle"
        color={skinColor}
        size={{ radius: headRadius }}
        x={headPos.x}
        y={headPos.y}
      />

      {/* "Front" Arm (dynamic for attacks) - relative to facing direction */}
      <PixiContainerComponent
        x={torsoPos.x + torsoSize.width / 2 - 2}
        y={torsoPos.y + shoulderOffsetY}
      >
        <BodyPart
          shape="line"
          color={
            attackLimbHighlight === "arm" ? attackHighlightColor : dobokColor
          }
          size={{ length: upperArmLength, thickness: limbThickness }}
          rotation={armUpperRot}
          anchor={{ x: 0, y: 0.5 }}
        />
        <BodyPart
          shape="line"
          color={
            attackLimbHighlight === "arm" ? attackHighlightColor : dobokColor
          }
          size={{ length: lowerArmLength, thickness: limbThickness }}
          x={upperArmLength * Math.cos(armUpperRot)}
          y={upperArmLength * Math.sin(armUpperRot)}
          rotation={armUpperRot + armLowerRot}
          anchor={{ x: 0, y: 0.5 }}
        />
      </PixiContainerComponent>

      {/* "Back" Arm (static for simplicity) */}
      <PixiContainerComponent
        x={torsoPos.x - torsoSize.width / 2 + 2}
        y={torsoPos.y + shoulderOffsetY}
      >
        <BodyPart
          shape="line"
          color={dobokColor}
          size={{ length: upperArmLength, thickness: limbThickness }}
          rotation={Math.PI * 0.7}
          anchor={{ x: 0, y: 0.5 }}
        />
        <BodyPart
          shape="line"
          color={dobokColor}
          size={{ length: lowerArmLength, thickness: limbThickness }}
          x={upperArmLength * Math.cos(Math.PI * 0.7)}
          y={upperArmLength * Math.sin(Math.PI * 0.7)}
          rotation={Math.PI * 0.7 + Math.PI * 0.1}
          anchor={{ x: 0, y: 0.5 }}
        />
      </PixiContainerComponent>

      {/* "Front" Leg (dynamic for attacks) */}
      <PixiContainerComponent
        x={torsoPos.x + torsoSize.width / 4}
        y={torsoPos.y + hipOffsetY}
      >
        <BodyPart
          shape="line"
          color={
            attackLimbHighlight === "leg" ? attackHighlightColor : dobokColor
          }
          size={{ length: upperLegLength, thickness: limbThickness }}
          rotation={legUpperRot}
          anchor={{ x: 0, y: 0.5 }}
        />
        <BodyPart
          shape="line"
          color={
            attackLimbHighlight === "leg" ? attackHighlightColor : dobokColor
          }
          size={{ length: lowerLegLength, thickness: limbThickness }}
          x={upperLegLength * Math.cos(legUpperRot)}
          y={upperLegLength * Math.sin(legUpperRot)}
          rotation={legUpperRot + legLowerRot}
          anchor={{ x: 0, y: 0.5 }}
        />
      </PixiContainerComponent>

      {/* "Back" Leg (static for simplicity) */}
      <PixiContainerComponent
        x={torsoPos.x - torsoSize.width / 4}
        y={torsoPos.y + hipOffsetY}
      >
        <BodyPart
          shape="line"
          color={dobokColor}
          size={{ length: upperLegLength, thickness: limbThickness }}
          rotation={Math.PI * 0.55}
          anchor={{ x: 0, y: 0.5 }}
        />
        <BodyPart
          shape="line"
          color={dobokColor}
          size={{ length: lowerLegLength, thickness: limbThickness }}
          x={upperLegLength * Math.cos(Math.PI * 0.55)}
          y={upperLegLength * Math.sin(Math.PI * 0.55)}
          rotation={Math.PI * 0.55 - Math.PI * 0.05}
          anchor={{ x: 0, y: 0.5 }}
        />
      </PixiContainerComponent>

      {/* Belt */}
      <BodyPart
        shape="rectangle"
        color={beltColor}
        size={beltSize}
        x={beltPos.x}
        y={beltPos.y}
      />

      {/* Stance Aura */}
      <PixiGraphicsComponent draw={drawStanceAura} />

      {/* Player ID Text */}
      <PixiTextComponent
        text={isPlayer1 ? "플레이어 1" : "플레이어 2"}
        x={torsoPos.x}
        y={headPos.y - headRadius - 10} // Above head
        anchor={{ x: 0.5, y: 1 }}
        style={{
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 12,
          fill: beltColor,
          fontWeight: "bold",
        }}
      />

      {/* Stance Text */}
      <PixiTextComponent
        text={`${currentTrigram.korean} ${currentTrigram.symbol}`}
        x={torsoPos.x}
        y={torsoPos.y + torsoSize.height / 2 + 18} // Below torso
        anchor={{ x: 0.5, y: 0 }}
        style={{
          fontFamily: KOREAN_FONT_FAMILY,
          fontSize: 14,
          fill: currentTrigram.color,
          fontWeight: "bold",
        }}
      />
    </PixiContainerComponent>
  );
}
