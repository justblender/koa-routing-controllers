import { HandlerOptions } from "../../options/HandlerOptions";

export interface HandlerMetadataArgs {
  target: Object;
  propertyKey: string;
  options: HandlerOptions;
}
