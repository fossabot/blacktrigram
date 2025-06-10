import React from "react";
import { Application } from "@pixi/react";
import { render, RenderOptions } from "@testing-library/react";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  pixiProps?: any;
}

function customRender(
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) {
  const { pixiProps = {}, ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Application width={800} height={600} {...pixiProps}>
        {children}
      </Application>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { customRender as render };
