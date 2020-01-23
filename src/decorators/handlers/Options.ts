import { getMetadataBuilder } from "../../index";

export function Options(route: string): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          requestType: "OPTIONS",
          route
        }
      });
  };
}
