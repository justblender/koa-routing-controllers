import { ParamMetadata } from "./ParamMetadata";

export type HandlerParamsMap = {
  [parameterIndex: number]: ParamMetadata;
};

export type HandlerMetadata = {
  // readonly target: Function;
  readonly handlerName: string;
  readonly handlerParams: HandlerParamsMap;
  readonly options?: any;
};
