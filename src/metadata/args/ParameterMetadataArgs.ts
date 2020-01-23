import { ParameterOptions } from "../../options/ParameterOptions";

export interface ParameterMetadataArgs {
  target: Object;
  propertyKey: string;
  parameterIndex: number;
  options: ParameterOptions;
}
