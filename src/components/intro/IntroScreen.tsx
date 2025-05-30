import React, { useCallback } from "react";
import { Container, Text } from "@pixi/react";
import { KOREAN_COLORS } from "../../types";

interface IntroScreenProps {
  readonly onStartGame: () => void;
  readonly onStartTraining: () => void;
}

export function IntroScreen({
  onStartGame,
  onStartTraining,
}: IntroScreenProps): React.JSX.Element {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "1":
          onStartGame();
          break;
        case "2":
          onStartTraining();
          break;
      }
    },
    [onStartGame, onStartTraining]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <Container>
      {/* Main title */}
      <Container x={400} y={150}>
        <Text
          text="흑괘 무술 도장"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 48,
            fill: KOREAN_COLORS.GOLD,
            stroke: {
              color: KOREAN_COLORS.BLACK,
              width: 4,
            },
          }}
        />
      </Container>

      {/* Subtitle */}
      <Container x={400} y={200}>
        <Text
          text="Black Trigram Dojang"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Arial",
            fontSize: 24,
            fill: KOREAN_COLORS.WHITE,
          }}
        />
      </Container>

      {/* Instructions */}
      <Container x={400} y={300}>
        <Text
          text="1번 키: 대련 시작 (Start Combat)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 20,
            fill: KOREAN_COLORS.CYAN,
          }}
        />
      </Container>

      <Container x={400} y={340}>
        <Text
          text="2번 키: 훈련 모드 (Training Mode)"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 20,
            fill: KOREAN_COLORS.CYAN,
          }}
        />
      </Container>

      {/* Korean philosophy text */}
      <Container x={400} y={450}>
        <Text
          text="팔괘의 힘으로 적을 제압하라"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Noto Sans KR",
            fontSize: 18,
            fill: KOREAN_COLORS.GRAY_LIGHT,
          }}
        />
      </Container>

      <Container x={400} y={480}>
        <Text
          text="Subdue your enemies with the power of the Eight Trigrams"
          anchor={{ x: 0.5, y: 0.5 }}
          style={{
            fontFamily: "Arial",
            fontSize: 16,
            fill: KOREAN_COLORS.GRAY_LIGHT,
          }}
        />
      </Container>
    </Container>
  );
}
