import { ParameterType } from "../types/ParameterType";

export type ParamMetadata = {
  // readonly target: Function;
  // readonly handlerName: string;
  // readonly parameterIndex: number;
  readonly parameterType: ParameterType;
  readonly options?: any;
};
