import { getMetadataBuilder } from "../index";

export function Get(route: string): MethodDecorator {
  return (target, propertyKey, _descriptor) => {
    getMetadataBuilder(target.constructor).appendHandler(String(propertyKey), {
      requestType: "GET",
      route
    });
  };
}