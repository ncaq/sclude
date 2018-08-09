import Optional from "typescript-optional";

import "../src/";

describe("Array", () => {
  test("head", () => {
    expect([].head).toEqual(Optional.empty());
    expect([1, 2, 3].head).toEqual(Optional.ofNonNull(1));
  });

  test("last", () => {
    expect([].last).toEqual(Optional.empty());
    expect([1, 2, 3].last).toEqual(Optional.ofNonNull(3));
  });

  test("tail", () => {
    expect([].tail).toEqual([]);
    expect([1, 2, 3].tail).toEqual([2, 3]);
  });

  test("init", () => {
    expect([].init).toEqual([]);
    expect([1, 2, 3].init).toEqual([1, 2]);
  });

  test("uncons", () => {
    expect([].uncons).toEqual(Optional.empty());
    expect([1, 2, 3].uncons).toEqual(Optional.ofNonNull([1, [2, 3]]));
  });

  test("null", () => {
    expect([].null).toBe(true);
    expect([1, 2, 3].null).toBe(false);
  });

  test("subsequences", () => {
    expect([].subsequences).toEqual([[]]);
    expect([0, 1].subsequences).toEqual([[], [0], [1], [0, 1]]);
    expect(Array.from("abc").subsequences.fmap(x => x.join(""))).toEqual([
      "",
      "a",
      "b",
      "ab",
      "c",
      "ac",
      "bc",
      "abc"
    ]);
  });

  test("permutations", () => {
    expect([].permutations).toEqual([[]]);
    expect([0, 1].permutations).toEqual([[0, 1], [1, 0]]);
    expect(Array.from("abc").permutations.fmap(x => x.join(""))).toEqual([
      "abc",
      "bac",
      "cba",
      "bca",
      "cab",
      "acb"
    ]);
  });

  test("fmap", () => expect([0, 1, 2].fmap(x => x * 2)).toEqual([0, 2, 4]));

  test("intersperse", () =>
    expect([0, 1, 2].intersperse(0.5)).toEqual([0, 0.5, 1, 0.5, 2]));

  test("takeWhile", () => {
    expect([1, 2, 3, 4, 1, 2, 3, 4].takeWhile(e => e < 3)).toEqual([1, 2]);
    expect([1, 2, 3].takeWhile(e => e < 9)).toEqual([1, 2, 3]);
    expect([1, 2, 3].takeWhile(e => e < 0)).toEqual([]);
  });
});
