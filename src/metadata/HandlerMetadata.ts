import { ParameterMetadataMap } from "./ParameterMetadata";
import { HandlerOptions } from "../options/HandlerOptions";

export interface HandlerMetadata {
  name: string;
  parameters?: ParameterMetadataMap;
  options?: HandlerOptions;
};
