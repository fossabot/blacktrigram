import type { JSX } from "react";

export interface KoreanHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly showLogo?: boolean;
  readonly style?: {
    readonly titleColor?: number;
    readonly subtitleColor?: number;
    readonly backgroundColor?: number;
  };
}

export function KoreanHeader({
  title,
  subtitle,
  showLogo = true,
  style = {},
}: KoreanHeaderProps): JSX.Element {
  return (
    <pixiContainer>
      <pixiText
        text={title}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          fontFamily: "Noto Sans KR",
          fontSize: 28,
          fill: style.titleColor || 0xffd700,
          fontWeight: "bold",
        }}
      />
      {subtitle && (
        <pixiText
          text={subtitle}
          anchor={{ x: 0.5, y: 0.5 }}
          y={40}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 16,
            fill: style.subtitleColor || 0xcccccc,
          }}
        />
      )}
      {showLogo && (
        <pixiText
          text="☰☱☲☳☴☵☶☷"
          anchor={{ x: 0.5, y: 0.5 }}
          y={-50}
          style={{
            fontFamily: "serif",
            fontSize: 24,
            fill: 0xffffff,
          }}
        />
      )}
    </pixiContainer>
  );
}
