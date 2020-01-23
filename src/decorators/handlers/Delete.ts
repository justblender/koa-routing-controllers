import { getMetadataBuilder } from "../../index";

export function Delete(route: string): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          requestType: "DELETE",
          route
        }
      });
  };
}
