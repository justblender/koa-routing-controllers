import { getMetadataBuilder } from "../../index";

export function Connect(route: string = "/"): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          type: "CONNECT",
          route
        }
      });
  };
}
