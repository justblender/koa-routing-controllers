import { HandlerMetadata, HandlerParamsMap } from "../HandlerMetadata";
import { ParamMetadata } from "../ParamMetadata";

export class HandlerMetadataBuilder {
  private handlerParams: HandlerParamsMap = {};

  addParameter(parameterIndex: number, paramMetadata: ParamMetadata) {
    this.handlerParams[parameterIndex] = paramMetadata;
  }

  build(handlerName: string, options: any): HandlerMetadata {
    return {
      handlerName,
      handlerParams: this.handlerParams,
      options
    };
  }
}
