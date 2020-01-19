import { createParameterDecorator } from ".";

export function Param(paramName: string, options?: any): ParameterDecorator {
  return createParameterDecorator({
    ...options,
    parameterType: "request-param",
    paramName
  });
}
