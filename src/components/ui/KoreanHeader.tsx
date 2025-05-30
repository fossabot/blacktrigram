import type { JSX } from "react";
import { KOREAN_COLORS, type TrigramStance } from "../../types";

const TRIGRAM_SYMBOLS: Record<TrigramStance, string> = {
  geon: "☰", // Heaven
  tae: "☱", // Lake
  li: "☲", // Fire
  jin: "☳", // Thunder
  son: "☴", // Wind
  gam: "☵", // Water
  gan: "☶", // Mountain
  gon: "☷", // Earth
};

export interface KoreanHeaderProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly currentStance?: TrigramStance;
  readonly showTrigramSymbol?: boolean;
  readonly className?: string;
}

export function KoreanHeader({
  title,
  subtitle,
  currentStance,
  showTrigramSymbol = true,
  className = "",
}: KoreanHeaderProps): JSX.Element {
  const headerStyle: React.CSSProperties = {
    background: `linear-gradient(135deg, ${KOREAN_COLORS.TRADITIONAL_RED}, ${KOREAN_COLORS.DARK_BLUE})`,
    color: KOREAN_COLORS.GOLD,
    padding: "1rem 2rem",
    borderBottom: `3px solid ${KOREAN_COLORS.GOLD}`,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
    letterSpacing: "0.05em",
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "1rem",
    fontWeight: "300",
    margin: "0.5rem 0 0 0",
    opacity: 0.9,
    letterSpacing: "0.1em",
  };

  const trigramStyle: React.CSSProperties = {
    position: "absolute",
    right: "2rem",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "2.5rem",
    color: KOREAN_COLORS.GOLD,
    textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
    filter: "drop-shadow(0 0 5px rgba(255, 215, 0, 0.3))",
  };

  const backgroundPatternStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    background: `
      radial-gradient(circle at 20% 50%, ${KOREAN_COLORS.GOLD} 1px, transparent 1px),
      radial-gradient(circle at 80% 50%, ${KOREAN_COLORS.GOLD} 1px, transparent 1px)
    `,
    backgroundSize: "100px 50px",
    pointerEvents: "none",
  };

  return (
    <header className={`korean-header ${className}`} style={headerStyle}>
      <div style={backgroundPatternStyle} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h1 style={titleStyle}>{title}</h1>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </div>

      {showTrigramSymbol && currentStance && (
        <div style={trigramStyle} title={`Current stance: ${currentStance}`}>
          {TRIGRAM_SYMBOLS[currentStance]}
        </div>
      )}
    </header>
  );
}

export default KoreanHeader;
