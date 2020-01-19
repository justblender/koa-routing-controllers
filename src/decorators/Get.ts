import { getMetadataBuilder } from "../index";

export function Get(route: string): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .addHandler(propertyKey, {
        requestType: "GET",
        route
      });
  };
}
