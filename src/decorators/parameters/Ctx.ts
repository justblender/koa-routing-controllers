import { getMetadataBuilder } from "../../index";

export function Ctx(): ParameterDecorator {
  return (target: Object, propertyKey: string, parameterIndex: number) => {
    getMetadataBuilder(target.constructor)
      .registerHandlerParameter({
        target,
        propertyKey,
        parameterIndex,
        options: {
          type: "context"
        }
      });
  };
}
