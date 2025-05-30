import React from "react";
// import { Container } from "@pixi/react"; // Assuming Container is used
import { KoreanText } from "../../ui/base/KoreanText";
import { KOREAN_COLORS } from "../../../types";
import type { TextStyle } from "pixi.js"; // For PIXI.TextStyle

interface ControlsSectionProps {
  readonly onBack: () => void; // Keep if it will be used, otherwise remove
}

// Assuming KoreanTextProps is defined elsewhere and includes a style prop
// or that KoreanText is a wrapper around Pixi's Text that accepts style.
// If KoreanTextProps is defined in its own file, it should be:
// export interface KoreanTextProps {
//   text: string;
//   x?: number;
//   y?: number;
//   anchor?: { x: number; y: number };
//   style?: Partial<TextStyle>; // Or a more specific style prop type
//   [key: string]: any; // For other PIXI.Text props
// }

export function ControlsSection({}: /* onBack, */ // Commented out if not used
ControlsSectionProps): React.JSX.Element {
  return (
    <>
      <KoreanText
        text="조작법 (Controls)"
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          // Assuming style prop is valid for KoreanText
          {
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 36,
            fill: KOREAN_COLORS.WHITE, // Corrected casing
            letterSpacing: 2,
          } as Partial<TextStyle> // Cast to Partial<TextStyle> or the expected type
        }
      />
      {/* ... other controls text ... */}
      <KoreanText
        text="뒤로가기 (Back)"
        anchor={{ x: 0.5, y: 0.5 }}
        y={250}
        style={
          {
            fontFamily: "Noto Sans KR, Arial, sans-serif",
            fontSize: 24,
            fill: KOREAN_COLORS.YELLOW, // Corrected casing, ensure YELLOW is in KOREAN_COLORS
          } as Partial<TextStyle>
        }
        // interactive={true} // Removed, handle interaction on a PIXI.Graphics or similar
        // pointertap={onBack} // Removed, if onBack is unused or handle click differently
      />
      {/* Consider wrapping text in a clickable Graphics object for pointertap */}
    </>
  );
}
