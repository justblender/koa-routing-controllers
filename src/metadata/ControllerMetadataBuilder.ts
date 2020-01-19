import { ControllerMetadata } from "./ControllerMetadata";
import { HandlerMetadata } from "./HandlerMetadata";
import { ParameterMetadataMap, ParameterMetadata } from "./ParameterMetadata";
import { ControllerOptions } from "../options/ControllerOptions";

export class ControllerMetadataBuilder {
  private handlers: HandlerMetadata[] = [];
  private handlerParameters: Record<string, ParameterMetadataMap> = {};
  private options: ControllerOptions;

  addHandler(handlerName: string, options?: any) {
    let handlerParameters = this.handlerParameters[handlerName] || [];
    this.handlers.push({ handlerName, handlerParameters, options });
  }

  setHandlerParameter(handlerName: string, parameterIndex: number, parameterMetadata: ParameterMetadata) {
    let handlerParameters = this.handlerParameters[handlerName] || (this.handlerParameters[handlerName] = {});
    handlerParameters[parameterIndex] = parameterMetadata;
  }

  setControllerOptions(options: ControllerOptions) {
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
