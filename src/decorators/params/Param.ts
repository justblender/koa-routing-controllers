import { getMetadataBuilder } from "../../index";

export function Param(parameterName: string, options?: any): ParameterDecorator {
  return (target: Object, propertyKey: string, parameterIndex: number) => {
    getMetadataBuilder(target.constructor)
      .registerParameter({
        target,
        propertyKey,
        parameterIndex,
        options: {
          parameterType: "request-param",
          parameterName,
          ...options
        }
      });
  };
}
