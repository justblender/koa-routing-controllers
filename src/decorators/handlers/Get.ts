import { getMetadataBuilder } from "../../index";

export function Get(route: string = "/"): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          type: "GET",
          route
        }
      });
  };
}
