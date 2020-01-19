import { ParameterMetadataMap } from "./ParameterMetadata";

export interface HandlerMetadata {
  handlerName: string;
  handlerParameters: ParameterMetadataMap;
  options?: any;
};
