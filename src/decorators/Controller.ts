import { getMetadataBuilder } from "../index";

export function Controller(baseRoute: string = "/"): ClassDecorator {
  return (target: Function) => {
    getMetadataBuilder(target)
      .setControllerOptions({
        baseRoute
      });
  };
}
