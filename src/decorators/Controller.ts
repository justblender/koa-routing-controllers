import { getMetadataBuilder } from "../index";

export function Controller(baseRoute = "/"): ClassDecorator {
  return (target: Function) => {
    getMetadataBuilder(target)
      .registerController({
        baseRoute
      });
  };
}
