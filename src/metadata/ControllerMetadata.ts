import { HandlerMetadata } from "./HandlerMetadata";
import { ParamMetadata } from "./ParamMetadata";
import { ControllerOptions } from "src/options/ControllerOptions";

export interface ControllerMetadata {
  // target: Function;
  handlers: HandlerMetadata[];
  // handlerParams: ParamMetadata[];
  options?: ControllerOptions;
};
