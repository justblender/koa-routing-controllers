import Koa, { Context, Next } from "koa";
import Router from "koa-tree-router";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import compose from "koa-compose";

import { KoaControllerOptions } from "./options/KoaControllerOptions";
import { ControllerMetadataBuilder } from "./metadata/ControllerMetadataBuilder";
import { HandlerMetadata } from "./metadata/HandlerMetadata";
import { getFromContainer } from "./container";

export * from "./decorators/Controller";
export * from "./decorators/parameters/Body";
export * from "./decorators/parameters/Ctx";
export * from "./decorators/parameters/Param";
export * from "./decorators/parameters/Query";
export * from "./decorators/handlers/Connect";
export * from "./decorators/handlers/Delete";
export * from "./decorators/handlers/Get";
export * from "./decorators/handlers/Head";
export * from "./decorators/handlers/Options";
export * from "./decorators/handlers/Patch";
export * from "./decorators/handlers/Post";
export * from "./decorators/handlers/Put";
export * from "./decorators/handlers/Trace";
export * from "./metadata/ControllerMetadata";
export * from "./metadata/ControllerMetadataBuilder";
export * from "./metadata/HandlerMetadata";
export * from "./metadata/ParameterMetadata";
export * from "./options/ControllerOptions";
export * from "./options/KoaControllerOptions";
export * from "./types/ParameterType";
export * from "./types/RequestType";
export * from "./container";

const metadataBuilders: Record<string, ControllerMetadataBuilder> = {};

export function getMetadataBuilder(target: Function) {
  return metadataBuilders[target.name] || (metadataBuilders[target.name] = new ControllerMetadataBuilder());
}

export function createKoaServer(options: KoaControllerOptions) {
  return useKoaServer(new Koa(), options);
}

export function useKoaServer(koa: Koa, options: KoaControllerOptions) {
  koa.use(options.errorHandler || createErrorHandler(options.errorOnNotFound));

  koa.use(cors(options.corsOptions));
  koa.use(bodyParser(options.parserOptions));

  for (let controller of options.controllers) {
    let router = new Router();

    let controllerMetadata = getMetadataBuilder(controller).build();
    let controllerInstance = getFromContainer(controller) as any;

    for (let handlerMetadata of controllerMetadata.handlers) {
      let handlerMethod = controllerInstance[handlerMetadata.name];
      let handlerMiddleware = createHandlerMiddleware(handlerMethod, handlerMetadata);

      router.on(
        handlerMetadata.options.type,
        handlerMetadata.options.route,
        composeMiddlewares(handlerMiddleware, true)
      );
    }

    let routerMiddleware = router.mount(controllerMetadata.options.baseRoute);
    let middlewares = composeMiddlewares(routerMiddleware, false);

    koa.use(middlewares);
  }

  return koa;
}

function createErrorHandler(errorOnNotFound = true) {
  return async (context: Context, next: Next) => {
    try {
      await next();

      if (errorOnNotFound && context.status === 404) {
        context.throw(404);
      }
    } catch (error) {
      let status = error.status || 500;
      let message = error.expose ? error.message : "An internal error has occurred";

      context.status = status;
      context.body = {
        error: {
          status,
          message
        }
      };
    }
  };
}

function createHandlerMiddleware(handlerMethod: Function, handlerMetadata: HandlerMetadata) {
  return async (context: Context, next: Next) => {
    let handlerParameters = resolveParameters(handlerMethod, handlerMetadata, context);
    let handlerResponse = handlerMethod(...handlerParameters);

    if (handlerResponse instanceof Promise) {
      handlerResponse = await handlerResponse;
    }

    if (!handlerResponse) {
      context.throw(500, `No response given from "${handlerMetadata.name}" handler`);
    }

    context.body = handlerResponse;
    return next();
  };
}

function resolveParameters(handlerMethod: Function, handlerMetadata: HandlerMetadata, context: Context) {
  return new Array(handlerMethod.length).fill(undefined).map((_, index) => {
    let parameterMetadata = handlerMetadata.parameters[index];
    let options = parameterMetadata?.options;

    switch (options?.type) {
      case "context":
        return context;

      case "request-param":
        return options?.key ? context.params[options?.key] : context.params;

      case "query-param":
        return options?.key ? context.query[options?.key] : context.query;

      case "body":
        return options?.key ? context.body[options?.key] : context.body;
    }
  });
}

// TODO: implement support for scoped middlewares 
function composeMiddlewares(middleware: any, scoped: boolean) {
  // let beforeMiddlewares: any = [];
  // let afterMiddlewares: any = [];

  return compose([
    // ...beforeMiddlewares,
    middleware,
    // ...afterMiddlewares
  ]);
}
