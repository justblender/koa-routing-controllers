import { ParameterMetadataMap } from "./ParameterMetadata";
import { HandlerOptions } from "../options/HandlerOptions";

export interface HandlerMetadata {
  handlerName: string;
  handlerParameters?: ParameterMetadataMap;
  options?: HandlerOptions;
};
