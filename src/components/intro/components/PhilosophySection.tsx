import { useCallback } from "react";
import type { PixiGraphicsType } from "../../ui/base/PixiComponents";
import { KOREAN_TEXT_STYLE } from "../../ui/base/PixiComponents";

interface PhilosophySectionProps {
  readonly x?: number;
  readonly y?: number;
  readonly onNext?: () => void; // Add the missing prop
}

export function PhilosophySection({
  x = 0,
  y = 0,
  onNext,
}: PhilosophySectionProps): React.ReactElement {
  const drawPhilosophyBackground = useCallback((graphics: PixiGraphicsType) => {
    graphics.clear();

    // Traditional Korean background with philosophy theme
    graphics.setFillStyle({ color: 0x001122, alpha: 0.95 });
    graphics.rect(0, 0, 600, 400);
    graphics.fill();

    // Decorative border with Korean aesthetic
    graphics.setStrokeStyle({ color: 0xffd700, width: 3 });
    graphics.rect(10, 10, 580, 380);
    graphics.stroke();

    // Inner decorative elements
    graphics.setStrokeStyle({ color: 0xffd700, width: 1, alpha: 0.7 });
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const innerRadius = 80;
      const outerRadius = 120;
      const centerX = 300;
      const centerY = 200;

      graphics.moveTo(
        centerX + Math.cos(angle) * innerRadius,
        centerY + Math.sin(angle) * innerRadius
      );
      graphics.lineTo(
        centerX + Math.cos(angle) * outerRadius,
        centerY + Math.sin(angle) * outerRadius
      );
    }
    graphics.stroke();
  }, []);

  return (
    <pixiContainer x={x} y={y}>
      <pixiGraphics draw={drawPhilosophyBackground} />

      {/* Main title */}
      <pixiText
        text="무술 철학 (Martial Philosophy)"
        x={300}
        y={50}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 24,
          fill: 0xffd700,
          fontWeight: "bold",
        }}
      />

      {/* Philosophy content */}
      <pixiText
        text="팔괘의 조화 속에서 진정한 힘을 찾으라"
        x={300}
        y={120}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 18,
          fill: 0xffffff,
        }}
      />

      <pixiText
        text="Find true power in the harmony of the Eight Trigrams"
        x={300}
        y={150}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 16,
          fill: 0xcccccc,
          fontStyle: "italic",
        }}
      />

      {/* Core principles */}
      <pixiText
        text="정심 (正心) - Righteous Heart"
        x={150}
        y={220}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 16,
          fill: 0xffd700,
        }}
      />

      <pixiText
        text="균형 (均衡) - Balance"
        x={450}
        y={220}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 16,
          fill: 0xffd700,
        }}
      />

      <pixiText
        text="조화 (調和) - Harmony"
        x={150}
        y={280}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 16,
          fill: 0xffd700,
        }}
      />

      <pixiText
        text="정진 (精進) - Dedication"
        x={450}
        y={280}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 16,
          fill: 0xffd700,
        }}
      />

      {/* Bottom wisdom */}
      <pixiText
        text="수련자는 팔괘를 통해 자신의 내면과 우주의 진리를 탐구한다"
        x={300}
        y={340}
        anchor={{ x: 0.5, y: 0.5 }}
        style={{
          ...KOREAN_TEXT_STYLE,
          fontSize: 14,
          fill: 0xaaaaaa,
        }}
      />

      {/* Interactive area to proceed - only if onNext is provided */}
      {onNext && (
        <pixiContainer
          x={250}
          y={380}
          interactive={true}
          cursor="pointer"
          onPointerDown={onNext}
        >
          <pixiText
            text="계속하려면 클릭하세요 (Click to continue)"
            x={50}
            y={0}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{
              ...KOREAN_TEXT_STYLE,
              fontSize: 12,
              fill: 0x888888,
            }}
          />
        </pixiContainer>
      )}
    </pixiContainer>
  );
}
