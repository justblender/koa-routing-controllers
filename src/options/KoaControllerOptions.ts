import { Options as CorsOptions } from "@koa/cors";
import { Options as ParserOptions } from "koa-bodyparser";
import { Middleware } from "koa";

export interface KoaControllerOptions {
  controllers: Function[];
  corsOptions?: CorsOptions;
  parserOptions?: ParserOptions;
  errorOnNotFound?: boolean;
  errorHandler?: Middleware;
}
