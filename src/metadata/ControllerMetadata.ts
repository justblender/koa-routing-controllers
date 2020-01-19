import { HandlerMetadata } from "./HandlerMetadata";
import { ControllerOptions } from "../options/ControllerOptions";

export interface ControllerMetadata {
  handlers: HandlerMetadata[];
  options?: ControllerOptions;
};
