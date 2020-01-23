import { RequestType } from "src/types/RequestType";

export interface HandlerOptions {
  requestType: RequestType;
  route: string;
  [key: string]: any;
}
