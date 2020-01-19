import { ParameterType } from "../types/ParameterType";

export interface ParameterMetadataMap {
  [parameterIndex: number]: ParameterMetadata;
}

export interface ParameterMetadata {
  targetType: any;
  parameterType?: ParameterType;
  options: any;
};
