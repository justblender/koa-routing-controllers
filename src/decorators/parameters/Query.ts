import { getMetadataBuilder } from "../../index";

export function Query(key?: string, options?: any): ParameterDecorator {
  return (target: Object, propertyKey: string, parameterIndex: number) => {
    getMetadataBuilder(target.constructor)
      .registerHandlerParameter({
        target,
        propertyKey,
        parameterIndex,
        options: {
          ...options,
          type: "query-param",
          key
        }
      });
  };
}
