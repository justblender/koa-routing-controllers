import { MetadataBuilder } from "./MetadataBuilder";
import { HandlerMetadataBuilder } from "./HandlerMetadataBuilder";
import { ControllerMetadata } from "../ControllerMetadata";
import { HandlerMetadata } from "../HandlerMetadata";
import { ControllerOptions } from "../../options/ControllerOptions";

type HandlerMetadataBuilderMap = {
  [handlerName: string]: HandlerMetadataBuilder;
};

export class ControllerMetadataBuilder implements MetadataBuilder<ControllerMetadata> {
  private handlerBuilder: HandlerMetadataBuilderMap = {};
  private handlers: HandlerMetadata[] = [];
  private options: ControllerOptions;

  getHandlerBuilder(handlerName: string) {
    return this.handlerBuilder[handlerName] ??
      (this.handlerBuilder[handlerName] = new HandlerMetadataBuilder());
  }

  appendHandler(handlerName: string, options?: any) {
    this.handlers.push(this.getHandlerBuilder(handlerName).build(handlerName, options));
  }

  appendParameter(handlerName: string, parameterIndex: number, parameterType: any, options?: any) {
    this.getHandlerBuilder(handlerName).addParameter(parameterIndex, { parameterType, options });
  }

  setOptions(options: ControllerOptions) {
    this.options = options;
  }

  build(): ControllerMetadata {
    if (!this.options) {
      throw new Error("Controller class doesn't have @Controller annotation");
    }

    return {
      handlers: this.handlers,
      options: this.options
    };
  }
}
