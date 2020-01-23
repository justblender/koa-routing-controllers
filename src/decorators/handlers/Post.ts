import { getMetadataBuilder } from "../../index";

export function Post(route: string): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          requestType: "POST",
          route
        }
      });
  };
}
