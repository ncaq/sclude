import { Optional } from "typescript-optional";

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

  test("unionWith", () => {
    expect(
      new Map([[5, "a"], [3, "b"]]).unionWith(
        new Map([[5, "A"], [7, "C"]]),
        (a, b) => a + b
      )
    ).toEqual(new Map([[3, "b"], [5, "aA"], [7, "C"]]));
  });

  test("unionWithKey", () => {
    expect(
      new Map([[1, 2]]).unionWithKey(
        new Map([[1, 2], [3, 4]]),
        (k, a, b) => k + a + b
      )
    ).toEqual(new Map([[1, 5], [3, 4]]));
  });

  test("difference", () => {
    expect(
      new Map([[1, 10], [10, 10]]).difference(new Map([[1, 7], [7, 9]]))
    ).toEqual(new Map([[10, 10]]));
    expect(
      new Map([[4, 1]]).difference(new Map([[1, 7], [5, 2], [9, 6]]))
    ).toEqual(new Map([[4, 1]]));
    expect(
      new Map([[10, 2]]).difference(new Map([[3, 4], [6, 9], [9, 3]]))
    ).toEqual(new Map([[10, 2]]));
    expect(
      new Map([[10, 8]]).difference(new Map([[1, 2], [4, 2], [6, 1], [9, 10]]))
    ).toEqual(new Map([[10, 8]]));
    expect(
      new Map([[2, 1], [6, 7], [9, 10]]).difference(new Map([[2, 1], [5, 2]]))
    ).toEqual(new Map([[6, 7], [9, 10]]));
    expect(
      new Map([[2, 5]]).difference(new Map([[0, 0], [1, 10], [9, 9]]))
    ).toEqual(new Map([[2, 5]]));
    expect(
      new Map([[5, 7], [7, 3]]).difference(new Map([[4, 2], [6, 10]]))
    ).toEqual(new Map([[5, 7], [7, 3]]));
    expect(
      new Map([[3, 5], [4, 10], [5, 5], [8, 7]]).difference(
        new Map([[0, 8], [3, 8], [5, 9], [10, 7]])
      )
    ).toEqual(new Map([[4, 10], [8, 7]]));
    expect(
      new Map([[4, 0], [5, 1], [9, 4], [10, 0]]).difference(
        new Map([[0, 4], [2, 1], [8, 9]])
      )
    ).toEqual(new Map([[4, 0], [5, 1], [9, 4], [10, 0]]));
    expect(
      new Map([[6, 9]]).difference(new Map([[0, 6], [1, 6], [8, 5], [10, 9]]))
    ).toEqual(new Map([[6, 9]]));
    expect(
      new Map([[1, 0], [4, 10]]).difference(new Map([[5, 4], [10, 6]]))
    ).toEqual(new Map([[1, 0], [4, 10]]));
  });
});
