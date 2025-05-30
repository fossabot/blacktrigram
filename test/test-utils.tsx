import React from "react";
import { render } from "@testing-library/react";
import { Stage } from "@pixi/react";

export function renderInStage(component: React.ReactElement) {
  return render(
    <Stage width={800} height={600}>
      {component}
    </Stage>
  );
}

export * from "@testing-library/react";
