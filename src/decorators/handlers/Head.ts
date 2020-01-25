import { getMetadataBuilder } from "../../index";

export function Head(route: string = "/"): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          type: "HEAD",
          route
        }
      });
  };
}
