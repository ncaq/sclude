import Optional from "typescript-optional";

import "../src/Array";

describe("Array", () => {
  test("head", () => {
    expect([].head).toEqual(Optional.empty());
    expect([1, 2, 3].head).toEqual(Optional.of(1));
  });

  test("last", () => {
    expect([].last).toEqual(Optional.empty());
    expect([1, 2, 3].last).toEqual(Optional.of(3));
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
    expect([1, 2, 3].uncons).toEqual(Optional.of([1, [2, 3]]));
  });

  test("isEmpty", () => {
    expect([].isEmpty).toBe(true);
    expect([1, 2, 3].isEmpty).toBe(false);
  });

  test("intersperse", () =>
    expect([0, 1, 2].intersperse(0.5)).toEqual([0, 0.5, 1, 0.5, 2]));

  test("subsequences", () => {
    expect([].subsequences).toEqual([[]]);
    expect([0, 1].subsequences).toEqual([[], [0], [1], [0, 1]]);
    expect(Array.from("abc").subsequences.map(x => x.join(""))).toEqual([
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
    expect(Array.from("abc").permutations.map(x => x.join(""))).toEqual([
      "abc",
      "bac",
      "cba",
      "bca",
      "cab",
      "acb"
    ]);
  });

  test("maximum", () => {
    expect([2, 3, 4, 1].maximum).toEqual(Optional.of(4));
  });

  test("minimum", () => {
    expect([2, 3, 4, 1].minimum).toEqual(Optional.of(1));
  });

  test("scan", () =>
    expect([1, 2, 3].scan((a, b) => a + b, 0)).toEqual([0, 1, 3, 6]));

  test("scanRight", () =>
    expect([1, 2, 3].scanRight((a, b) => a + b, 0)).toEqual([6, 5, 3, 0]));

  test("take", () =>
    expect(
      Array.from("Hello World!")
        .take(5)
        .join("")
    ).toEqual("Hello"));

  test("drop", () =>
    expect(
      Array.from("Hello World!")
        .drop(6)
        .join("")
    ).toEqual("World!"));

  test("splitAt", () => {
    expect(Array.from("Hello World!").splitAt(6)).toEqual([
      Array.from("Hello "),
      Array.from("World!")
    ]);
    expect([1, 2, 3, 4, 5].splitAt(3)).toEqual([[1, 2, 3], [4, 5]]);
    expect([1, 2, 3].splitAt(3)).toEqual([[1, 2, 3], []]);
  });

  test("takeWhile", () => {
    expect([1, 2, 3, 4, 1, 2, 3, 4].takeWhile(e => e < 3)).toEqual([1, 2]);
    expect([1, 2, 3].takeWhile(e => e < 9)).toEqual([1, 2, 3]);
    expect([1, 2, 3].takeWhile(e => e < 0)).toEqual([]);
  });

  test("dropWhile", () => {
    expect([1, 2, 3, 4, 5, 1, 2, 3].dropWhile(e => e < 3)).toEqual([
      3,
      4,
      5,
      1,
      2,
      3
    ]);
  });

  test("dropWhileEnd", () => {
    expect(
      Array.from("foo ")
        .dropWhileEnd(e => e === " ")
        .join("")
    ).toEqual("foo");
    expect(
      Array.from("foo bar")
        .dropWhileEnd(e => e === " ")
        .join("")
    ).toEqual("foo bar");
  });

  test("span", () => {
    expect([1, 2, 3, 4, 1, 2, 3, 4].span(e => e < 3)).toEqual([
      [1, 2],
      [3, 4, 1, 2, 3, 4]
    ]);
  });

  test("break", () => {
    expect([1, 2, 3, 4, 1, 2, 3, 4].break(e => 3 < e)).toEqual([
      [1, 2, 3],
      [4, 1, 2, 3, 4]
    ]);
  });

  test("stripPrefix", () => {
    expect(
      Array.from("foobar")
        .stripPrefix(Array.from("foo"))
        .map(t => t.join(""))
    ).toEqual(Optional.of("bar"));
    expect(
      Array.from("foo")
        .stripPrefix(Array.from("foo"))
        .map(t => t.join(""))
    ).toEqual(Optional.of(""));
    expect(
      Array.from("barfoo")
        .stripPrefix(Array.from("foo"))
        .map(t => t.join(""))
    ).toEqual(Optional.empty());
    expect(
      Array.from("barfoobuz")
        .stripPrefix(Array.from("foo"))
        .map(t => t.join(""))
    ).toEqual(Optional.empty());
  });

  test("group", () =>
    expect(Array.from("Mississippi").group.map(t => t.join(""))).toEqual([
      "M",
      "i",
      "ss",
      "i",
      "ss",
      "i",
      "pp",
      "i"
    ]));

  test("inits", () => {
    expect([].inits).toEqual([[]]);
    expect(Array.from("abc").inits.map(t => t.join(""))).toEqual([
      "",
      "a",
      "ab",
      "abc"
    ]);
  });

  test("tails", () => {
    expect(Array.from("abc").tails.map(t => t.join(""))).toEqual([
      "abc",
      "ab",
      "a",
      ""
    ]);
  });

  test("isPrefixOf", () => {
    expect(Array.from("Hello").isPrefixOf(Array.from("Hello World!"))).toBe(
      true
    );
    expect(Array.from("Hello").isPrefixOf(Array.from("Wello World!"))).toBe(
      false
    );
    expect([1].isPrefixOf([])).toBe(false);
    const prefix: number[] = [];
    expect(prefix.isPrefixOf([1])).toBe(true);
  });

  test("isSuffixOf", () => {
    expect(Array.from("ld!").isSuffixOf(Array.from("Hello World!"))).toBe(true);
    expect(Array.from("World").isSuffixOf(Array.from("Hello World!"))).toBe(
      false
    );
    expect([1].isSuffixOf([])).toBe(false);
    const suffix: number[] = [];
    expect(suffix.isSuffixOf([1])).toBe(true);
  });

  test("isInfixOf", () => {
    expect(
      Array.from("Haskell").isInfixOf(Array.from("I really like Haskell."))
    ).toBe(true);
    expect(
      Array.from("Ial").isInfixOf(Array.from("I really like Haskell."))
    ).toBe(false);
    expect([1].isInfixOf([])).toBe(false);
    const infix: number[] = [];
    expect(infix.isSuffixOf([1])).toBe(true);
  });

  test("isSubsequencesOf", () => {
    expect(
      Array.from("GHC").isSubsequenceOf(
        Array.from("The Glorious Haskell Compiler")
      )
    ).toBe(true);
    expect([1, 2, 3].isSubsequenceOf([3, 2, 1, 0])).toBe(false);
  });

  test("partition", () => {
    expect(
      Array.from("Hello World!")
        .partition(e => Array.from("aeiou").includes(e))
        .map(e => e.join(""))
    ).toEqual(["eoo", "Hll Wrld!"]);
  });

  test("includesIndex", () => {
    expect([0, 1, 2, 3, 4].includesIndex(4)).toEqual(Optional.of(4));
  });

  test("includesIndices", () => {
    expect(Array.from("Hello World").includesIndices("o")).toEqual([4, 7]);
  });

  test("findLastIndex", () => {
    expect([0].findLastIndex(e => e === 100)).toBe(-1);
    expect([0, 1].findLastIndex(e => e === 1)).toBe(1);
    expect([0, 1, 1].findLastIndex(e => e === 1)).toBe(2);
  });

  test("zip", () => {
    expect([0, 1, 2].zip([3, 4, 5])).toEqual([[0, 3], [1, 4], [2, 5]]);
  });

  test("zipWith", () => {
    expect([0, 1, 2].zipWith([3, 4, 5], (a, b) => a + b)).toEqual([3, 5, 7]);
    expect([0, 1, 2].zipWith([3, 4], (a, b) => a + b)).toEqual([3, 5]);
    expect([0, 1].zipWith([3, 4, 5], (a, b) => a + b)).toEqual([3, 5]);
  });

  test("nub", () => {
    expect([1, 2, 3, 4, 3, 2, 1, 2, 4, 3, 5].nub).toEqual([1, 2, 3, 4, 5]);
  });

  test("deleteEqual", () => {
    expect(Array.from("banana").deleteEqual("a")).toEqual(Array.from("bnana"));
  });

  test("diff", () => {
    expect(Array.from("Hello World!").diff(Array.from("ell W"))).toEqual(
      Array.from("Hoorld!")
    );
  });

  test("union", () => {
    expect(Array.from("dog").union(Array.from("cow"))).toEqual(
      Array.from("dogcw")
    );
  });

  test("intersect", () => {
    expect([1, 2, 3, 4].intersect([2, 4, 6, 8])).toEqual([2, 4]);
    expect([1, 2, 2, 3, 4].intersect([6, 4, 4, 2])).toEqual([2, 2, 4]);
  });

  test("insert", () => {
    expect([1, 2, 3, 5, 6, 7].insert(4)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  test("nubBy", () => {
    expect([1, 2, 4, 5, 6].nubBy((a, b) => a % 3 === b % 3)).toEqual([1, 2, 6]);
    expect([0, 1, 2].nubBy(() => true)).toEqual([0]);
    expect([0, 1, 2].nubBy(() => false)).toEqual([0, 1, 2]);
    expect([6, 3, 3, 8].nubBy((a, b) => a < b)).toEqual([6, 3, 3]);
    expect([9].nubBy((a, b) => a < b)).toEqual([9]);
    expect([7, 9].nubBy((a, b) => a < b)).toEqual([7]);
    expect([5, 9].nubBy((a, b) => a < b)).toEqual([5]);
    expect([5, 7].nubBy((a, b) => a < b)).toEqual([5]);
    expect([10, 10, 6, 3].nubBy((a, b) => a < b)).toEqual([10, 10, 6, 3]);
    expect([6, 3, 7].nubBy((a, b) => a < b)).toEqual([6, 3]);
    expect([6, 4, 5].nubBy((a, b) => a < b)).toEqual([6, 4]);
    expect([0, 2].nubBy((a, b) => a < b)).toEqual([0]);
    expect([4, 4, 2, 1].nubBy((a, b) => a < b)).toEqual([4, 4, 2, 1]);
    expect([0, 10, 6, 8].nubBy((a, b) => a < b)).toEqual([0]);
  });

  test("deleteBy", () => {
    expect(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].deleteBy((a, b) => a <= b, 4)
    ).toEqual([1, 2, 3, 5, 6, 7, 8, 9, 10]);
  });

  test("deleteFirstsBy", () => {
    expect([].deleteFirstsBy((a, b) => a === b, [])).toEqual([]);
    expect(
      [10, 6, 6, 1, 7, 8, 3, 5].deleteFirstsBy((a, b) => a === b, [
        2,
        6,
        8,
        0,
        10
      ])
    ).toEqual([6, 1, 7, 3, 5]);
    expect(
      [5, 2, 0, 1, 8, 9].deleteFirstsBy((a, b) => a === b, [
        8,
        0,
        9,
        6,
        8,
        10,
        7
      ])
    ).toEqual([5, 2, 1]);
    expect(
      [4, 2, 2, 9, 7, 5, 9, 4, 5].deleteFirstsBy((a, b) => a === b, [
        9,
        6,
        0,
        10,
        1
      ])
    ).toEqual([4, 2, 2, 7, 5, 9, 4, 5]);
    expect([5, 3, 5].deleteFirstsBy((a, b) => a === b, [])).toEqual([5, 3, 5]);
    expect(
      [5].deleteFirstsBy((a, b) => a === b, [9, 1, 8, 2, 2, 2, 6, 5, 10, 0])
    ).toEqual([]);
    expect(
      [0, 9, 9, 9, 6, 9, 6].deleteFirstsBy((a, b) => a === b, [
        8,
        2,
        5,
        2,
        9,
        1,
        2,
        7
      ])
    ).toEqual([0, 9, 9, 6, 9, 6]);
    expect(
      [3, 3, 5, 1, 4, 6].deleteFirstsBy((a, b) => a === b, [
        8,
        1,
        4,
        1,
        1,
        8,
        9,
        4
      ])
    ).toEqual([3, 3, 5, 6]);
    expect(
      [8, 2, 9, 6, 7].deleteFirstsBy((a, b) => a === b, [4, 1, 2, 8, 3, 9, 2])
    ).toEqual([6, 7]);
    expect(
      [1, 0, 5, 1, 5].deleteFirstsBy((a, b) => a === b, [
        2,
        8,
        0,
        5,
        7,
        8,
        3,
        5
      ])
    ).toEqual([1, 1]);
    expect(
      [4, 2, 2, 6, 0, 5, 5, 9, 6, 1].deleteFirstsBy((a, b) => a === b, [
        0,
        9,
        6,
        8,
        8
      ])
    ).toEqual([4, 2, 2, 5, 5, 6, 1]);

    expect([].deleteFirstsBy((a, b) => a < b, [])).toEqual([]);
    expect(
      [10, 4, 10, 5, 8, 8, 8, 3].deleteFirstsBy((a, b) => a < b, [])
    ).toEqual([10, 4, 10, 5, 8, 8, 8, 3]);
    expect(
      [6, 2, 6, 10, 4, 1, 10, 9, 10].deleteFirstsBy((a, b) => a < b, [3])
    ).toEqual([2, 6, 10, 4, 1, 10, 9, 10]);
    expect(
      [10, 0, 2, 5].deleteFirstsBy((a, b) => a < b, [2, 6, 8, 10, 8, 0])
    ).toEqual([0, 5]);
    expect([1].deleteFirstsBy((a, b) => a < b, [8])).toEqual([1]);
    expect(
      [8, 6, 3, 8, 1, 5, 3, 10, 10].deleteFirstsBy((a, b) => a < b, [9])
    ).toEqual([8, 6, 3, 8, 1, 5, 3, 10]);
    expect([6].deleteFirstsBy((a, b) => a < b, [3, 6, 2, 7, 0, 10])).toEqual(
      []
    );
    expect(
      [10, 3, 1, 2].deleteFirstsBy((a, b) => a < b, [2, 7, 8, 10, 10, 1])
    ).toEqual([1, 2]);
    expect([5, 7, 3, 9, 8, 2].deleteFirstsBy((a, b) => a < b, [])).toEqual([
      5,
      7,
      3,
      9,
      8,
      2
    ]);
    expect(
      [6, 3, 6, 6, 2].deleteFirstsBy((a, b) => a < b, [
        9,
        1,
        3,
        7,
        5,
        6,
        2,
        8,
        4
      ])
    ).toEqual([2]);
    expect([9].deleteFirstsBy((a, b) => a < b, [])).toEqual([9]);
  });

  test("unionBy", () => {
    expect([4, 10].unionBy((a, b) => a < b, [7])).toEqual([4, 10]);
    expect([9, 0].unionBy((a, b) => a < b, [2, 3, 1])).toEqual([9, 0, 1]);
    expect([5].unionBy((a, b) => a < b, [8, 0, 4, 6])).toEqual([5, 0]);
    expect([9, 8, 4, 3].unionBy((a, b) => a < b, [4, 8])).toEqual([9, 8, 4, 3]);
    expect([4, 4, 10, 3].unionBy((a, b) => a < b, [0, 6])).toEqual([
      4,
      4,
      10,
      3,
      0
    ]);
    expect([10, 4, 8].unionBy((a, b) => a < b, [2, 6, 3])).toEqual([
      10,
      4,
      8,
      2
    ]);
    expect([1].unionBy((a, b) => a < b, [3, 8, 9])).toEqual([1]);
    expect([8].unionBy((a, b) => a < b, [9, 1])).toEqual([8, 1]);
    expect([6, 8].unionBy((a, b) => a < b, [2, 1, 5])).toEqual([6, 8, 2, 1]);
    expect([8, 1, 1, 10].unionBy((a, b) => a < b, [5])).toEqual([8, 1, 1, 10]);
    expect([4, 1, 8].unionBy((a, b) => a < b, [2, 9, 9])).toEqual([4, 1, 8]);
  });
});
