import { getMetadataBuilder } from "../index";

export function Controller(baseRoute: string = "/"): ClassDecorator {
  return (target) => {
    getMetadataBuilder(target).setOptions({
      baseRoute
    });
  };
}