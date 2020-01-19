import { createParameterDecorator } from ".";

export function Ctx(): ParameterDecorator {
  return createParameterDecorator({
    parameterType: "context"
  });
}
