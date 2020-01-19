import { getMetadataBuilder } from "../index";

export function Param(parameterName: string, options?: any): ParameterDecorator {
  return (target: Object, handlerName: string, parameterIndex: number) => {
    let types = Reflect.getMetadata("design:paramtypes", target, handlerName);
    let targetType = types?.[parameterIndex];

    getMetadataBuilder(target.constructor)
      .setHandlerParameter(handlerName, parameterIndex, {
        targetType,
        parameterType: "request-param",
        options: {
          parameterName,
          ...options
        }
      });
  };
}
