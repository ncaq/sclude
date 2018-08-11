import Optional from "typescript-optional";

export function cons<T>(a: T, d: T[]): T[] {
  return [a].concat(d);
}

export function snoc<T>(d: T[], a: T): T[] {
  return d.concat(a);
}

declare global {
  interface Array<T> {
    // ++ is concat
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
    // length is length
    readonly subsequences: T[][];
    readonly permutations: T[][];
    readonly and: boolean;
    readonly or: boolean;
    // sumを型安全に定義する方法がわからない
    // productを型安全に定義する方法がわからない
    // maximumを型安全に定義する方法がわからない
    // minimumを型安全に定義する方法がわからない
    readonly group: T[][];
    readonly inits: T[][];
    readonly tails: T[][];

    intersperse(inter: T): T[];
    // intercalateを型安全に定義する方法がわからない
    // transposeを型安全に定義する方法がわからない
    // foldl is reduce
    // foldr is reduceRight
    // concatはFoldableを型安全に表現する方法がわからない
    // any is some
    // all is every
    scan<U>(
      callback: ((accumulator: U, currentValue: T) => U),
      initialValue: U
    ): U[];
    scanRight<U>(
      callback: (previousValue: U, currentValue: T) => U,
      initialValue: U
    ): U[];
    // mapAccumLはTraversableを表現する方法がわからない
    // iterate, repeat, cycleは無限配列が標準に含まれていない
    // replicateは自然にメソッドに出来ない
    // unfoldrはメソッドにできない
    take(size: number): T[];
    drop(size: number): T[];
    splitAt(point: number): [T[], T[]];
    takeWhile(pred: (x: T) => boolean): T[];
    dropWhile(pred: (x: T) => boolean): T[];
    dropWhileEnd(pred: (x: T) => boolean): T[];
    span(pred: (x: T) => boolean): [T[], T[]];
    break(pred: (x: T) => boolean): [T[], T[]];
    stripPrefix(prefix: T[]): Optional<T[]>;
    isPrefixOf(body: T[]): boolean;
    isSuffixOf(body: T[]): boolean;
    isInfixOf(body: T[]): boolean;
    isSubsequenceOf(body: T[]): boolean;
    // elem is includes
    // lookupは特殊化出来ない
    // find is find
    // filter is filter
    partition(pred: (x: T) => boolean): [T[], T[]];
    // !! is []
    /**
     * HaskellではelemIndex
     * JavaScriptではelem相当の機能はincludesなので名前を揃える
     */
    includesIndex(target: T): Optional<number>;
    includesIndices(target: T): number[];
    // findIndex is findIndex
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
    groupBy(pred: (a: T, b: T) => boolean): T[][];
  }
}

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
    return this.head.matches({
      empty: () => Optional.empty(),
      present: (x: T) => Optional.ofNonNull([x, this.tail])
    });
  }
});

Object.defineProperty(Array.prototype, "unsnoc", {
  get<T>() {
    return this.last.matches({
      empty: () => Optional.empty(),
      present: (x: T) => Optional.ofNonNull([this.init, x])
    });
  }
});

Object.defineProperty(Array.prototype, "isEmpty", {
  get() {
    return this.length === 0;
  }
});

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
    empty: () => Optional.ofNonNull([...this]),
    present: ([x, xs]) =>
      this.uncons.matches({
        empty: () => Optional.empty<any[]>(),
        present: ([y, ys]) => (x === y ? ys.stripPrefix(xs) : Optional.empty())
      })
  });
};

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
    return Optional.ofNonNull(index);
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

Array.prototype.groupBy = function(pred) {
  return this.uncons.matches({
    empty: () => [],
    present: ([x, xs]) => {
      const [ys, zs] = xs.span(e => pred(e, x));
      return cons(cons(x, ys), zs.groupBy(pred));
    }
  });
};
