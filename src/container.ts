export interface UseContainerOptions {
  fallback?: boolean;
  fallbackOnErrors?: boolean;
}

export type ContainedType<T> = { new(...args: any[]): T; } | Function;

export interface ContainerInterface {
  get<T>(someClass: ContainedType<T>): T;
}

const defaultContainer: ContainerInterface = new (class implements ContainerInterface {
  private instances: {
    type: Function, object: any;
  }[] = [];

  get<T>(someClass: ContainedType<T>): T {
    let instance = this.instances.find(i => i.type === someClass);

    if (!instance) {
      instance = { type: someClass, object: new (someClass as new () => T)() };
      this.instances.push(instance);
    }

    return instance.object;
  }
})();

let userContainer: ContainerInterface;
let userContainerOptions: UseContainerOptions | undefined;

export function useContainer(iocContainer: ContainerInterface, options?: UseContainerOptions) {
  userContainer = iocContainer;
  userContainerOptions = options;
}

export function getFromContainer<T>(someClass: ContainedType<T>): T {
  if (userContainer) {
    try {
      let instance = userContainer.get(someClass);
      if (instance || !userContainerOptions?.fallback) {
        return instance;
      }
    } catch (error) {
      if (!userContainerOptions || !userContainerOptions.fallbackOnErrors) {
        throw error;
      }
    }
  }

  return defaultContainer.get<T>(someClass);
}
