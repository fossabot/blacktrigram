import React from "react";

export interface TrainingScreenProps {
  readonly onBack: () => void;
}

export function TrainingScreen({
  onBack,
}: TrainingScreenProps): React.JSX.Element {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>훈련 모드 (Training Mode)</h1>
      <p>무술 기법을 연습하세요 (Practice martial techniques)</p>

      <button onClick={onBack}>돌아가기 (Back)</button>
    </div>
  );
}
