/* tslint:disable:member-ordering */

import "./Array";

declare global {
  interface String {
    readonly lines: string[];
    readonly words: string[];
    // unlines, unwordsはstring[]のメソッドとして実装したいのですが特殊化する方法がわからない
  }
}

Object.defineProperty(String.prototype, "lines", {
  get() {
    return splitAndRemoveTrailingSpace(this, /\n/);
  }
});

Object.defineProperty(String.prototype, "words", {
  get() {
    return splitAndRemoveTrailingSpace(this, /[\n ]/);
  }
});

function splitAndRemoveTrailingSpace(self: string, separator: RegExp) {
  // 空白なら空配列
  if (self === "") {
    return [];
  }
  const splited = self.split(separator);
  // 末尾が改行の場合改行を1つだけ削除する
  if (splited.last.orElse("") === "") {
    return splited.init;
  }
  return splited;
}
