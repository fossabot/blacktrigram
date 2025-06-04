import React from "react";

interface KoreanHeaderProps {
  readonly korean: string;
  readonly english?: string;
  readonly level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function KoreanHeader({
  korean,
  english,
  level = 2,
}: KoreanHeaderProps): React.JSX.Element {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  // Use regular HTML styling instead of PIXI styles
  const headerStyle: React.CSSProperties = {
    color: "#00FFC8",
    margin: 0,
    fontFamily: "Noto Sans KR, Arial, sans-serif",
    marginBottom: "16px",
  };

  return (
    <div>
      <Tag style={headerStyle}>
        {korean}
        {english && (
          <span
            style={{
              color: "#FFFFFF",
              marginLeft: "8px",
              fontWeight: "normal",
            }}
          >
            ({english})
          </span>
        )}
      </Tag>
    </div>
  );
}

export default KoreanHeader;
