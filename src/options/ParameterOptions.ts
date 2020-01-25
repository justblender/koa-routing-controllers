import { ParameterType } from "../types/ParameterType";

export interface ParameterOptions {
  type: ParameterType;
  [key: string]: any;
}
