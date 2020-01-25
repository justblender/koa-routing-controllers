import { getMetadataBuilder } from "../../index";

export function Trace(route: string = "/"): MethodDecorator {
  return (target: Object, propertyKey: string) => {
    getMetadataBuilder(target.constructor)
      .registerHandler({
        target,
        propertyKey,
        options: {
          type: "TRACE",
          route
        }
      });
  };
}
