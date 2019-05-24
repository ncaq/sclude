/* tslint:disable:member-ordering */

import { Optional } from "typescript-optional";

function cons<T>(a: T, d: T[]): T[] {
  return [a].concat(d);
}

function snoc<T>(d: T[], a: T): T[] {
  return d.concat(a);
}

declare global {
  interface Array<T> {
    // original
    readonly dup: T[];
    // basic
    // ++はconcatとして存在する
    // 部分関数を避けてオリジナルとは異なりOptionalを使っています
    readonly head: Optional<T>;
    readonly last: Optional<T>;
    readonly tail: T[];
    readonly init: T[];
    readonly uncons: Optional<[T, T[]]>;
    /**
     * Haskellのexportには存在しませんが有用
     */
    readonly unsnoc: Optional<[T[], T]>;
    /**
     * HaskellではnullですがJavaScriptの予約語と被って明らかにややこしいのでisEmpty
     * emptyは空の値とややこしいので避けました
     */
    readonly isEmpty: boolean;
    // lengthはlengthとして存在する

    // transformations
    intersperse(inter: T): T[];
    // intercalateを型安全に定義する方法がわからない
    // transposeを型安全に定義する方法がわからない
    readonly subsequences: T[][];
    readonly permutations: T[][];

    // reducing
    // foldlはreduceとして存在する
    // foldrはreduceRightとして存在する
    // foldl1みたいなバリエーションは部分関数なのでこわいので作りたくない

    // special reduce
    // concatはFoldableを型安全に表現する方法がわからない
    readonly and: boolean;
    readonly or: boolean;
    // anyはsomeとして存在する
    // allはeveryとして存在する
    // sumを型安全に定義する方法がわからない
    // productを型安全に定義する方法がわからない
    readonly maximum: T;
    readonly minimum: T;

    // scans
    scan<U>(
      callback: (accumulator: U, currentValue: T) => U,
      initialValue: U
    ): U[];
    scanRight<U>(
      callback: (previousValue: U, currentValue: T) => U,
      initialValue: U
    ): U[];
    // scanl1系もこわいので作りたくない

    // accumulating
    // mapAccumLはTraversableを表現する方法がわからない

    // Infinite
    // iterate, repeat, cycleは無限配列が標準に含まれていない
    // replicateは自然にメソッドに出来ない

    // unfolding
    // unfoldrはメソッドにできない

    // extracting sublists
    take(size: number): T[];
    drop(size: number): T[];
    splitAt(point: number): [T[], T[]];
    takeWhile(pred: (x: T) => boolean): T[];
    dropWhile(pred: (x: T) => boolean): T[];
    dropWhileEnd(pred: (x: T) => boolean): T[];
    span(pred: (x: T) => boolean): [T[], T[]];
    break(pred: (x: T) => boolean): [T[], T[]];
    stripPrefix(prefix: T[]): Optional<T[]>;
    readonly group: T[][];
    readonly inits: T[][];
    readonly tails: T[][];

    // predicates
    isPrefixOf(body: T[]): boolean;
    isSuffixOf(body: T[]): boolean;
    isInfixOf(body: T[]): boolean;
    isSubsequenceOf(body: T[]): boolean;

    // searching by equality
    // elemはincludesとして存在する
    // lookupは特殊化出来ない

    // searching with a predicate
    // findはfindとして存在する
    // filterはfilterとして存在する
    partition(pred: (x: T) => boolean): [T[], T[]];

    // indexing
    // !!は[]として存在する
    /**
     * HaskellではelemIndex
     * JavaScriptではelem相当の機能はincludesなので名前を揃える
     */
    includesIndex(target: T): Optional<number>;
    includesIndices(target: T): number[];
    // findIndexはfindIndexとして存在する
    /*
     * `findLastIndex()`関数は配列内の要素が指定されたテスト関数を満たす場合
     * 配列内のインデックスを返します
     * そうでない場合は`-1`を返します
     * 配列は逆向きに検索されます
     * HaskellのPreludeに存在しない関数ですが有用なので追加
     * `findIndex`と対称性を保つために`Optional`はあえて使っていません
     * @param {function} pred 配列内の各要素に対して実行する関数です。1個の引数を取ります
     * @returns {number} 条件を満たすインデックス 見つからなかったら`-1`
     */
    findLastIndex(pred: (x: T) => boolean): number;
    findIndices(pred: (x: T) => boolean): number[];

    // zipping
    zip<U>(that: U[]): Array<[T, U]>;
    zipWith<U, V>(that: U[], callback: (a: T, b: U) => V): V[];
    // オーバーロード可能なので出来ればzip3系は関数1つで定義したい
    // unzipを型安全に実装する方法がわからない

    // strings
    // JavaScriptはStringがCharの配列では無いのでString向けのメソッドは別になります

    // set operations
    readonly nub: T[];
    // 元はdeleteですが予約語なので回避した命名になりました
    deleteEqual(left: T): T[];
    // JavaScriptに演算子オーバーロードが無いので\\はdiffになりました
    diff(that: T[]): T[];
    union(that: T[]): T[];
    intersect(that: T[]): T[];

    // ordered
    // sortはsortとして存在する
    insert(element: T): T[];

    // user-supplied equality
    nubBy(equal: (a: T, b: T) => boolean): T[];
    deleteBy(equal: (a: T, b: T) => boolean, left: T): T[];
    deleteFirstsBy(equal: (a: T, b: T) => boolean, that: T[]): T[];
    unionBy(equal: (a: T, b: T) => boolean, that: T[]): T[];
    groupBy(equal: (a: T, b: T) => boolean): T[][];

    // user-supplied comparison
    // Ordering enumを追加するか迷いましたが
    // sortがそのままになるので一貫性を保ったほうが良いと判断して
    // numberを比較関数に使うことにしました
    // orderedかどうか
    // sortByはsortがカバーしている
    insertBy(compare: (a: T, b: T) => number, left: T): T[];
    maximumBy(compare: (a: T, b: T) => number): T;
    minimumBy(compare: (a: T, b: T) => number): T;
  }
}

Object.defineProperty(Array.prototype, "dup", {
  get() {
    return [...this];
  }
});

Object.defineProperty(Array.prototype, "head", {
  get() {
    return Optional.ofNullable(this[0]);
  }
});

Object.defineProperty(Array.prototype, "last", {
  get() {
    return Optional.ofNullable(this[this.length - 1]);
  }
});

Object.defineProperty(Array.prototype, "tail", {
  get() {
    return this.slice(1);
  }
});

Object.defineProperty(Array.prototype, "init", {
  get() {
    return this.slice(0, -1);
  }
});

Object.defineProperty(Array.prototype, "uncons", {
  get<T>() {
    return this.head.map((x: T) => [x, this.tail]);
  }
});

Object.defineProperty(Array.prototype, "unsnoc", {
  get<T>() {
    return this.last.map((x: T) => [this.init, x]);
  }
});

Object.defineProperty(Array.prototype, "isEmpty", {
  get() {
    return this.length === 0;
  }
});

Array.prototype.intersperse = function<T>(inter: T) {
  const result: T[] = [];
  this.forEach((element, index) => {
    result.push(element);
    if (index !== this.length - 1) {
      result.push(inter);
    }
  });
  return result;
};

Object.defineProperty(Array.prototype, "subsequences", {
  get<T>() {
    function nonEmptySubsequences(xa: T[]): T[][] {
      return xa.uncons.matches({
        empty: () => [],
        present: ([x, xs]) => {
          const f = (ys: T[], r: T[][]) => cons(ys, cons(cons(x, ys), r));
          return cons(
            [x],
            nonEmptySubsequences(xs).reduceRight(
              (prev: T[][], curr: T[]) => f(curr, prev),
              []
            )
          );
        }
      });
    }
    return cons([], nonEmptySubsequences(this));
  }
});

Object.defineProperty(Array.prototype, "permutations", {
  get<T>() {
    function perms(ta: T[], is: T[]): T[][] {
      return ta.uncons.matches({
        empty: () => [],
        present: ([t, ts]: [T, T[]]) => {
          function interleave2(
            f: (x: T[]) => T[],
            za: T[],
            r: T[][]
          ): [T[], T[][]] {
            return za.uncons.matches({
              empty: () => {
                const result: [T[], T[][]] = [ts, r];
                return result;
              },
              present: ([z, zs]) => {
                const [ua, va] = interleave2(a => f(cons(z, a)), zs, r);
                const result: [T[], T[][]] = [
                  cons(z, ua),
                  cons(f(cons(t, cons(z, ua))), va)
                ];
                return result;
              }
            });
          }
          function interleave(ya: T[], r: T[][]): T[][] {
            return interleave2(a => a, ya, r)[1];
          }
          return is.permutations.reduceRight(
            (prev, curr) => interleave(curr, prev),
            perms(ts, cons(t, is))
          );
        }
      });
    }
    return cons(this, perms(this, []));
  }
});

Object.defineProperty(Array.prototype, "and", {
  get<T>() {
    return this.every((e: T) => Boolean(e));
  }
});

Object.defineProperty(Array.prototype, "or", {
  get<T>() {
    return this.some((e: T) => Boolean(e));
  }
});

Object.defineProperty(Array.prototype, "maximum", {
  get<T>() {
    return this.maximumBy((a: T, b: T) => {
      if (a < b) {
        return -1;
      } else if (a === b) {
        return 0;
      } else {
        return 1;
      }
    });
  }
});

Object.defineProperty(Array.prototype, "minimum", {
  get<T>() {
    return this.minimumBy((a: T, b: T) => {
      if (a < b) {
        return -1;
      } else if (a === b) {
        return 0;
      } else {
        return 1;
      }
    });
  }
});

Array.prototype.scan = function(callback, initialValue) {
  return this.uncons.matches({
    empty: () => [initialValue],
    present: ([x, xs]) =>
      cons(initialValue, xs.scan(callback, callback(x, initialValue)))
  });
};

Array.prototype.scanRight = function(callback, initialValue) {
  return this.uncons.matches({
    empty: () => [initialValue],
    present: ([x, xs]) => {
      const r = xs.scanRight(callback, initialValue);
      return cons(callback(x, r[0]), r);
    }
  });
};

Array.prototype.take = function(size) {
  return this.slice(0, size);
};

Array.prototype.drop = function(size) {
  return this.slice(size);
};

Array.prototype.splitAt = function(point) {
  return [this.take(point), this.drop(point)];
};

Array.prototype.takeWhile = function(pred) {
  const index = this.findIndex(e => !pred(e));
  if (index === -1) {
    return [...this];
  } else {
    return this.take(index);
  }
};

Array.prototype.dropWhile = function(pred) {
  const index = this.findIndex(e => !pred(e));
  if (index === -1) {
    return [...this];
  } else {
    return this.drop(index);
  }
};

Array.prototype.dropWhileEnd = function(pred) {
  return this.reduceRight(
    (previousValue, currentValue) =>
      pred(currentValue) && previousValue.isEmpty
        ? []
        : cons(currentValue, previousValue),
    []
  );
};

Array.prototype.span = function(pred) {
  return [this.takeWhile(pred), this.dropWhile(pred)];
};

Array.prototype.break = function(pred) {
  return this.span(e => !pred(e));
};

Array.prototype.stripPrefix = function(prefix) {
  return prefix.uncons.matches({
    empty: () => Optional.of([...this]),
    present: ([x, xs]) =>
      this.uncons.flatMap(([y, ys]) =>
        x === y ? ys.stripPrefix(xs) : Optional.empty()
      )
  });
};

Object.defineProperty(Array.prototype, "group", {
  get<T>() {
    return this.groupBy((a: T, b: T) => a === b);
  }
});

Object.defineProperty(Array.prototype, "inits", {
  get<T>() {
    return this.unsnoc.matches({
      empty: () => [[]],
      present: ([xs, _]: [T[], T]) => snoc(xs.inits, [this])
    });
  }
});

Object.defineProperty(Array.prototype, "tails", {
  get<T>() {
    return this.unsnoc.matches({
      empty: () => [[]],
      present: ([xs, _]: [T[], T]) => cons(this, xs.tails)
    });
  }
});

Array.prototype.isPrefixOf = function(body) {
  return this.uncons.matches({
    empty: () => true,
    present: ([x, xs]) =>
      body.uncons.matches({
        empty: () => false,
        present: ([y, ys]) => (x === y ? xs.isPrefixOf(ys) : false)
      })
  });
};

Array.prototype.isSuffixOf = function(body) {
  return this.unsnoc.matches({
    empty: () => true,
    present: ([xs, x]) =>
      body.unsnoc.matches({
        empty: () => false,
        present: ([ys, y]) => (x === y ? xs.isSuffixOf(ys) : false)
      })
  });
};

Array.prototype.isInfixOf = function(body) {
  return this.uncons.matches({
    empty: () => true,
    present: ([x, xs]) =>
      body.uncons.matches({
        empty: () => false,
        present: ([y, ys]) => (x === y ? xs.isPrefixOf(ys) : this.isInfixOf(ys))
      })
  });
};

Array.prototype.isSubsequenceOf = function(body) {
  return this.uncons.matches({
    empty: () => true,
    present: ([x, xs]) =>
      body.uncons.matches({
        empty: () => false,
        present: ([y, ys]) =>
          x === y ? xs.isSubsequenceOf(ys) : this.isSubsequenceOf(ys)
      })
  });
};

Array.prototype.partition = function(pred) {
  return [this.filter(pred), this.filter(e => !pred(e))];
};

Array.prototype.includesIndex = function(target) {
  const index = this.findIndex(e => e === target);
  if (index === -1) {
    return Optional.empty();
  } else {
    return Optional.of(index);
  }
};

Array.prototype.includesIndices = function(target) {
  return this.findIndices(e => e === target);
};

Array.prototype.findLastIndex = function(pred) {
  for (let i = this.length; 0 < i; --i) {
    if (pred(this[i])) {
      return i;
    }
  }
  return -1;
};

Array.prototype.findIndices = function(pred) {
  const indices: number[] = [];
  this.forEach((element, index) => {
    if (pred(element)) {
      indices.push(index);
    }
  });
  return indices;
};

Array.prototype.zip = function<T, U>(that: U[]) {
  const result: Array<[T, U]> = this.zipWith(that, (a: T, b: U) => {
    const forAsType: [T, U] = [a, b];
    return forAsType;
  });
  return result;
};

Array.prototype.zipWith = function(that, callback) {
  return this.uncons.matches({
    empty: () => [],
    present: ([x, xs]) =>
      that.uncons.matches({
        empty: () => [],
        present: ([y, ys]) => cons(callback(x, y), xs.zipWith(ys, callback))
      })
  });
};

Object.defineProperty(Array.prototype, "nub", {
  get() {
    // 比較が等価で良いなら標準のSetを使って実装できる
    return Array.from(new Set(this));
  }
});

Array.prototype.diff = function(that) {
  return that.reduce(
    (accumulator, currentValue) => accumulator.deleteEqual(currentValue),
    this
  );
};

Array.prototype.union = function(that) {
  return Array.from(new Set([...this, ...that]));
};

Array.prototype.intersect = function(that) {
  const thatSet = new Set(that);
  return this.filter(element => thatSet.has(element));
};

Array.prototype.insert = function(element) {
  return this.insertBy((a, b) => a - b, element);
};

Array.prototype.nubBy = function(equal) {
  // equalが===とは限らないのでSetを使う方法は使えない
  // 流石に効率が悪すぎる
  return this.uncons.matches({
    empty: () => [],
    present: ([x, xs]) => cons(x, xs.filter(y => !equal(x, y)).nubBy(equal))
  });
};

Array.prototype.deleteEqual = function(left) {
  return this.deleteBy((a, b) => a === b, left);
};

Array.prototype.deleteBy = function(equal, left) {
  const index = this.findIndex(x => equal(left, x));
  if (index === -1) {
    return [...this];
  } else {
    const shallowCopy = [...this];
    shallowCopy.splice(index, 1);
    return shallowCopy;
  }
};

Array.prototype.deleteFirstsBy = function(equal, that) {
  return that.reduce(
    (accumulator, currentValue) => accumulator.deleteBy(equal, currentValue),
    this
  );
};

Array.prototype.unionBy = function(equal, that) {
  return this.concat(
    this.reduce(
      (accumulator, currentValue) => accumulator.deleteBy(equal, currentValue),
      that.nubBy(equal)
    )
  );
};

Array.prototype.groupBy = function(equal) {
  return this.uncons.matches({
    empty: () => [],
    present: ([x, xs]) => {
      const [ys, zs] = xs.span(e => equal(e, x));
      return cons(cons(x, ys), zs.groupBy(equal));
    }
  });
};

Array.prototype.insertBy = function(compare, left) {
  const index = this.findIndex(element => compare(left, element) < 0);
  const shallowCopy = [...this];
  shallowCopy.splice(index, 0, left);
  return shallowCopy;
};

Array.prototype.maximumBy = function(compare) {
  return this.uncons.map(([x, xs]) =>
    xs.reduce(
      (accumulator, currentValue) =>
        compare(accumulator, currentValue) < 0 ? currentValue : accumulator,
      x
    )
  );
};

Array.prototype.minimumBy = function(compare) {
  return this.uncons.map(([x, xs]) =>
    xs.reduce(
      (accumulator, currentValue) =>
        0 < compare(accumulator, currentValue) ? currentValue : accumulator,
      x
    )
  );
};
