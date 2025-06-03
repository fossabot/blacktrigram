import { Fragment } from "react";
import type { KoreanHeaderProps } from "../../../types/components";
import { KoreanText } from "./korean-text/KoreanText";

export function KoreanHeader({
  title,
  subtitle,
  level = 1,
  showLogo = false,
  style = {},
  onBackButtonClick,
  className = "",
}: KoreanHeaderProps): JSX.Element {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <header className={`korean-header ${className}`} style={style}>
      {showLogo && (
        <div className="korean-header__logo">
          <span className="korean-header__trigram">☰☱☲☳☴☵☶☷</span>
        </div>
      )}

      <Tag className="korean-header__title">
        <KoreanText
          korean={typeof title === "string" ? title : title.korean}
          english={typeof title === "string" ? title : title.english}
          variant="title"
          size="xlarge"
        />
      </Tag>

      {subtitle && (
        <div className="korean-header__subtitle">
          {typeof subtitle === "string" ? (
            <span>{subtitle}</span>
          ) : (
            <KoreanText
              korean={subtitle.korean}
              english={subtitle.english}
              variant="body"
              size="medium"
            />
          )}
        </div>
      )}

      {onBackButtonClick && (
        <button
          className="korean-header__back"
          onClick={onBackButtonClick}
          aria-label="Go back"
        >
          ← 뒤로
        </button>
      )}
    </header>
  );
}

export default KoreanHeader;
