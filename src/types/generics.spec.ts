import {
  getLengthOf,
  safelyGetPropertyOf,
  factoryOf,
  singletonFactoryOf,
} from "./generics";

describe("Generics", () => {
  class Engine {
    private running: boolean = false;

    public getRunning() {
      return this.running;
    }
  }

  enum Names {
    WILLIAM = "WILLIAM",
  }

  interface Person {
    age: number;
  }

  const VALUES: Record<Names, Person> = {
    WILLIAM: { age: 20 },
  };

  describe("getLengthOf", () => {
    it("should be able to return 7 as length of william", () => {
      expect(getLengthOf("william")).toBe(7);
    });

    it(`should be able to return 2 as length of ['william', 'everlinha']`, () => {
      expect(getLengthOf(["william", "everlinha"])).toBe(2);
    });

    it(`should be able to return 5 as length of {length: 5}`, () => {
      expect(getLengthOf({ length: 5 })).toBe(5);
    });
  });

  describe("safelyGetPropertyOf", () => {
    it(`should be able to return PERSONS from VALUES`, () => {
      expect(safelyGetPropertyOf(VALUES, Names.WILLIAM)).toMatchObject(
        VALUES.WILLIAM
      );
    });
  });

  describe("factoryOf", () => {
    it("should be able to create an instance of Engine", () => {
      expect(factoryOf(Engine)).toMatchObject(new Engine());
    });
  });

  describe("singletonFactoryOf", () => {
    it("should be able to produce a factory", async () => {
      const engineSingleton = singletonFactoryOf(Engine);
      const spy = jest.spyOn(engineSingleton, "getInstance");

      await Promise.all(
        Array.from({ length: 12 }).map(() => {
          return new Promise((resolve) => {
            resolve(engineSingleton.getInstance());
          });
        })
      );

      expect(engineSingleton.getInstancesCount()).toBe(1);
      expect(spy).toHaveBeenCalledTimes(12);
      expect(engineSingleton.getInstance()).toMatchObject(new Engine());
      expect(engineSingleton.getInstance().getRunning()).toBeFalsy();
    });
  });
});
