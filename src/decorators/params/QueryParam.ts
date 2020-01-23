import { getMetadataBuilder } from "../../index";

export function QueryParam(queryParameterName: string, options?: any): ParameterDecorator {
  return (target: Object, propertyKey: string, parameterIndex: number) => {
    getMetadataBuilder(target.constructor)
      .registerParameter({
        target,
        propertyKey,
        parameterIndex,
        options: {
          parameterType: "query-param",
          queryParameterName,
          ...options
        }
      });
  };
}
