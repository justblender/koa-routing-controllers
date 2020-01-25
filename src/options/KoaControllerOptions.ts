import { Options as CorsOptions } from "@koa/cors";
import { Options as ParserOptions } from "koa-bodyparser";

export interface KoaControllerOptions {
  controllers: Function[];
  corsOptions?: CorsOptions;
  parserOptions?: ParserOptions;
}
