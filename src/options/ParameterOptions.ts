import { ParameterType } from "../types/ParameterType";

export interface ParameterOptions {
  parameterType: ParameterType;
  [key: string]: any;
}
