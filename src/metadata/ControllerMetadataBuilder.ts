import "reflect-metadata";

import { HandlerMetadata } from "./HandlerMetadata";
import { ParameterMetadataMap } from "./ParameterMetadata";
import { ControllerOptions } from "../options/ControllerOptions";
import { HandlerMetadataArgs } from "./args/HandlerMetadataArgs";
import { ParameterMetadataArgs } from "./args/ParameterMetadataArgs";
import { ControllerMetadata } from "./ControllerMetadata";

export class ControllerMetadataBuilder {
  private handlers: HandlerMetadata[] = [];
  private handlerParameters: Record<string, ParameterMetadataMap> = {};
  private options: ControllerOptions;

  registerHandler(metadataArgs: HandlerMetadataArgs) {
    this.handlers.push({
      name: metadataArgs.propertyKey,
      parameters: this.handlerParameters[metadataArgs.propertyKey] || {},
      options: metadataArgs.options
    });
  }

  registerHandlerParameter(metadataArgs: ParameterMetadataArgs) {
    let handlerParameters = this.handlerParameters[metadataArgs.propertyKey] || (this.handlerParameters[metadataArgs.propertyKey] = {});
    let paramTypes = Reflect.getMetadata("design:paramtypes", metadataArgs.target, metadataArgs.propertyKey);

    handlerParameters[metadataArgs.parameterIndex] = {
      targetType: paramTypes?.[metadataArgs.parameterIndex],
      options: metadataArgs.options
    };
  }

  registerController(options: ControllerOptions) {
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
