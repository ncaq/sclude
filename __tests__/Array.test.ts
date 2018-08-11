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

  test("isEmpty", () => {
    expect([].isEmpty).toBe(true);
    expect([1, 2, 3].isEmpty).toBe(false);
  });

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

  test("intersperse", () =>
    expect([0, 1, 2].intersperse(0.5)).toEqual([0, 0.5, 1, 0.5, 2]));

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
    ).toEqual(Optional.ofNonNull("bar"));
    expect(
      Array.from("foo")
        .stripPrefix(Array.from("foo"))
        .map(t => t.join(""))
    ).toEqual(Optional.ofNonNull(""));
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
    expect([0, 1, 2, 3, 4].includesIndex(4)).toEqual(Optional.ofNonNull(4));
  });

  test("includesIndices", () => {
    expect(Array.from("Hello World").includesIndices("o")).toEqual([4, 7]);
  });

  test("findLastIndex", () => {
    expect([0].findLastIndex(e => e === 100)).toBe(-1);
    expect([0, 1].findLastIndex(e => e === 1)).toBe(1);
    expect([0, 1, 1].findLastIndex(e => e === 1)).toBe(2);
  });
});
