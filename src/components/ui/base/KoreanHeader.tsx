import React from "react";
import type { KoreanTextHeaderProps } from "../../../types/korean-text";
import { KoreanTitle } from "./korean-text/components/KoreanTitle";

export function KoreanHeader({
  korean,
  subtitle,
  level = 1,
  className,
  style,
}: KoreanTextHeaderProps): React.ReactElement {
  return (
    <header className={className} style={style}>
      <KoreanTitle korean={korean} subtitle={subtitle} level={level} />
    </header>
  );
}

export default KoreanHeader;
