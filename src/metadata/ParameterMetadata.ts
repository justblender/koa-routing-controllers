import { ParameterOptions } from "../options/ParameterOptions";

export interface ParameterMetadataMap {
  [parameterIndex: number]: ParameterMetadata;
}

export interface ParameterMetadata {
  targetType: any;
  options: ParameterOptions;
};
