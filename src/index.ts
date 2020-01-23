import Koa, { Context, Next } from "koa";
import Router from "koa-tree-router";
import compose from "koa-compose";

import { KoaControllerOptions } from "./options/KoaControllerOptions";
import { ControllerMetadataBuilder } from "./metadata/ControllerMetadataBuilder";
import { ParameterMetadata } from "./metadata/ParameterMetadata";
import { HandlerMetadata } from "./metadata/HandlerMetadata";
import { getFromContainer } from "./container";

export * from "./decorators/Controller";
export * from "./decorators/params/Ctx";
export * from "./decorators/params/Param";
export * from "./decorators/params/QueryParam";
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
  for (let controller of options.controllers) {
    let router = new Router();

    let controllerMetadata = getMetadataBuilder(controller).build();
    let controllerInstance = getFromContainer(controller) as any;

    for (let handlerMetadata of controllerMetadata.handlers) {
      let handlerMethod = controllerInstance[handlerMetadata.handlerName];
      let handlerMiddleware = buildHandlerMiddleware(handlerMethod, handlerMetadata);

      router.on(
        handlerMetadata.options.requestType,
        handlerMetadata.options.route,
        buildMiddlewares(handlerMiddleware, true)
      );
    }

    let routerMiddleware = router.mount(controllerMetadata.options.baseRoute);
    let middlewares = buildMiddlewares(routerMiddleware, false);

    koa.use(middlewares);
  }

  return koa;
}

function buildHandlerMiddleware(handlerMethod: Function, handlerMetadata: HandlerMetadata) {
  return async (context: Context, next: Next) => {
    let handlerResponse = handlerMethod(
      ...getHandlerParameters(handlerMethod, handlerMetadata, context)
    );

    if (handlerResponse instanceof Promise) {
      handlerResponse = await handlerResponse;
    }

    if (handlerResponse) {
      context.body = handlerResponse;
      return next();
    }

    return context.throw(500,
      `No response given from "${handlerMetadata.handlerName}" handler`
    );
  };
}

function getHandlerParameters(handlerMethod: Function, handlerMetadata: HandlerMetadata, context: Context) {
  return new Array(handlerMethod.length).fill(null).map((_, index) =>
    getHandlerParameter(handlerMetadata.handlerParameters[index], context)
  );
}

function getHandlerParameter(parameterMetadata: ParameterMetadata, context: Context) {
  let options = parameterMetadata?.options;

  switch (options?.parameterType) {
    case "context":
      return context;

    case "request-param":
      return context.params[options?.parameterName];

    case "query-param":
      return context.query[options?.queryParameterName];

    default:
      return null;
  }
}

// TODO: implement support for scoped middlewares 
function buildMiddlewares(middleware: any, scoped: boolean) {
  // let beforeMiddlewares: any = [];
  // let afterMiddlewares: any = [];

  return compose([
    // ...beforeMiddlewares,
    middleware,
    // ...afterMiddlewares
  ]);
}
