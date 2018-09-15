import Optional from "typescript-optional";

import "../src/Map";

describe("Map", () => {
  test("isEmpty", () => {
    expect(new Map().isEmpty).toBeTruthy();
    expect(new Map([[1, 2]]).isEmpty).toBeFalsy();
  });

  test("lookup", () => {
    expect(new Map([[1, 2]]).lookup(1)).toEqual(Optional.of(2));
    expect(new Map([[1, 2]]).lookup(2)).toEqual(Optional.empty());
  });

  test("insert", () => {
    const origin = new Map([[1, 2]]);
    expect(origin).toEqual(new Map([[1, 2]]));
    expect(origin.insert(1, 3)).toEqual(new Map([[1, 3]]));
    expect(origin).toEqual(new Map([[1, 2]]));
  });

  test("insertWith", () => {
    expect(new Map([[1, 3]]).insertWith((a, b) => a + b, 1, 4)).toEqual(
      new Map([[1, 7]])
    );
    expect(new Map([[1, 3]]).insertWith((a, b) => a + b, 2, 4)).toEqual(
      new Map([[1, 3], [2, 4]])
    );
  });

  test("adjust", () => {
    expect(new Map([[1, 3], [2, 4]]).adjust(v => v * 2, 1)).toEqual(
      new Map([[1, 6], [2, 4]])
    );
  });

  test("update", () => {
    expect(
      new Map([[1, 3], [2, 4]]).update(v => Optional.of(v * 2), 1)
    ).toEqual(new Map([[1, 6], [2, 4]]));
    expect(new Map([[1, 3], [2, 4]]).update(() => Optional.empty(), 1)).toEqual(
      new Map([[2, 4]])
    );
  });

  test("alter", () => {
    expect(new Map([[1, 3], [2, 4]]).alter(() => Optional.empty(), 1)).toEqual(
      new Map([[2, 4]])
    );
    expect(new Map([[1, 3], [2, 4]]).alter(v => v.map(j => j * 2), 1)).toEqual(
      new Map([[1, 6], [2, 4]])
    );
  });

  test("union", () => {
    expect(new Map([[0, 1]]).union(new Map([[2, 3]]))).toEqual(
      new Map([[0, 1], [2, 3]])
    );
    expect(new Map([[0, 1]]).union(new Map([[0, 3]]))).toEqual(
      new Map([[0, 1]])
    );
  });
});
