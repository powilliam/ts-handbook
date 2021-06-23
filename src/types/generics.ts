export function getLengthOf<T extends { length: number }>(value: T): number {
  return value["length"];
}

export function safelyGetPropertyOf<T extends Partial<T>, K extends keyof T>(
  value: T,
  key: K
): T[K] {
  return value[key];
}

export function factoryOf<T>(c: { new (): T }): T {
  return new c();
}

export function singletonFactoryOf<T>(Target: { new (...args: any[]): T }) {
  return class {
    private static count = 0;
    private static instance: T;

    public static getInstance(...args: any[]): T {
      if (!this.instance) {
        this.count++;
        this.instance = new Target(args);
        return this.instance;
      }
      return this.instance;
    }

    public static getInstancesCount() {
      return this.count;
    }
  };
}
