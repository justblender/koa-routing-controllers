import { getMetadataBuilder } from "../../index";

export function Body(key?: string): ParameterDecorator {
  return (target: Object, propertyKey: string, parameterIndex: number) => {
    getMetadataBuilder(target.constructor)
      .registerHandlerParameter({
        target,
        propertyKey,
        parameterIndex,
        options: {
          type: "body",
          key
        }
      });
  };
}
