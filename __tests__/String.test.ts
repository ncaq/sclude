import "../src/String";

describe("String", () => {
  test("lines", () => {
    expect("".lines).toEqual([]);
    expect("\n".lines).toEqual([""]);
    expect("one".lines).toEqual(["one"]);
    expect("one\n".lines).toEqual(["one"]);
    expect("one\ntwo".lines).toEqual(["one", "two"]);
    expect("one\ntwo\n".lines).toEqual(["one", "two"]);
    expect("\n\n".lines).toEqual(["", ""]);
    expect("\n\na".lines).toEqual(["", "", "a"]);
    expect("a\n\na".lines).toEqual(["a", "", "a"]);
    expect("a\n\n\na".lines).toEqual(["a", "", "", "a"]);
    expect("a\n\n".lines).toEqual(["a", ""]);
  });

  test("words", () => {
    expect("Lorem ipsum\ndolor".words).toEqual(["Lorem", "ipsum", "dolor"]);
  });
});
