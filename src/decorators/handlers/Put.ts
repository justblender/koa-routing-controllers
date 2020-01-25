import { getMetadataBuilder } from "../../index";

export function Put(route: string = "/"): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          type: "PUT",
          route
        }
      });
  };
}
