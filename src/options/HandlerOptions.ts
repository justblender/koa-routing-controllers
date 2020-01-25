import { RequestType } from "src/types/RequestType";

export interface HandlerOptions {
  type: RequestType;
  route: string;
  [key: string]: any;
}
