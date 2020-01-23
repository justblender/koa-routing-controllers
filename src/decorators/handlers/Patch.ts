import { getMetadataBuilder } from "../../index";

export function Patch(route: string): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          requestType: "PATCH",
          route
        }
      });
  };
}
