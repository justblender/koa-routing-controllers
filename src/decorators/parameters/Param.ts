import { getMetadataBuilder } from "../../index";

export function Param(key?: string, options?: any): ParameterDecorator {
  return (target: Object, propertyKey: string, parameterIndex: number) => {
    getMetadataBuilder(target.constructor)
      .registerHandlerParameter({
        target,
        propertyKey,
        parameterIndex,
        options: {
          ...options,
          type: "request-param",
          key
        }
      });
  };
}
