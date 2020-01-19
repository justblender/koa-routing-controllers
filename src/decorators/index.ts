import { getMetadataBuilder } from "../index";

export * from "./Controller";
export * from "./Get";
export * from "./Ctx";
export * from "./Param";

export function createParameterDecorator(options?: any): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    let parameterTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    let parameterType = parameterTypes?.[parameterIndex];

    getMetadataBuilder(target.constructor).appendParameter(
      String(propertyKey),
      parameterIndex,
      parameterType,
      options
    );
  };
}
