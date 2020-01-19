import Koa, { Context, Next } from "koa";
import Router from "koa-tree-router";
import compose from "koa-compose";

import { ControllerMetadataBuilder } from "./metadata/builder/ControllerMetadataBuilder";
import { KoaControllerOptions } from "./options/KoaControllerOptions";
import { HandlerMetadata } from "./metadata/HandlerMetadata";
import { ParamMetadata } from "./metadata/ParamMetadata";
import { getFromContainer } from "./container";

export * from "./decorators";
export * from "./metadata";
export * from "./options";
export * from "./types";
export * from "./container";

type ControllerMetadataBuilderMap = {
  [controllerName: string]: ControllerMetadataBuilder;
};

const metadataBuilders: ControllerMetadataBuilderMap = {};

export function getMetadataBuilder(target: Function) {
  return metadataBuilders[target.name] ??
    (metadataBuilders[target.name] = new ControllerMetadataBuilder());
}

export function getControllerMetadata(target: Function) {
  return getMetadataBuilder(target).build();
}

export function useKoaServer(koa: Koa, options: KoaControllerOptions) {
  for (let controller of options.controllers) {
    let router = new Router();

    let controllerMetadata = getControllerMetadata(controller);
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

export function createKoaServer(options: KoaControllerOptions) {
  return useKoaServer(new Koa(), options);
}

function buildHandlerMiddleware(handlerMethod: Function, handlerMetadata: HandlerMetadata) {
  return async (context: Context, next: Next) => {
    let handlerResponse = handlerMethod(
      ...getHandlerInjectParams(context, handlerMethod, handlerMetadata)
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

function getHandlerInjectParams(context: Context, handlerMethod: Function, handlerMetadata: HandlerMetadata) {
  return new Array(handlerMethod.length).fill(null).map((_, index) =>
    getHandlerInjectParam(context, handlerMetadata.handlerParams[index])
  );
}

function getHandlerInjectParam(context: Context, paramMetadata: ParamMetadata) {
  switch (paramMetadata.options.parameterType) {
    case "context":
      return context;

    case "request-param":
      let paramName = paramMetadata.options.paramName;
      let reqParam = context.params[paramName];

      if (reqParam || !paramMetadata.options.required) {
        return reqParam;
      }

      return context.throw(400,
        `Parameter ${paramName} is required`
      );

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
