import Optional from "typescript-optional";

export function cons<T>(a: T, d: T[]): T[] {
  return [a].concat(d);
}

declare global {
  interface Array<T> {
    readonly head: Optional<T>;
    readonly last: Optional<T>;
    readonly tail: T[];
    readonly init: T[];
    readonly uncons: Optional<[T, T[]]>;
    readonly null: boolean;
    readonly subsequences: T[][];
    readonly permutations: T[][];
    readonly and: boolean;
    readonly or: boolean;

    fmap<R>(mapper: (x: T) => R): R[];
    intersperse(inter: T): T[];
    // intercalate
    // transpose
    takeWhile(pred: (x: T) => boolean): T[];
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
  get() {
    if (0 < this.length) {
      return Optional.ofNonNull([this[0], this.tail]);
    }
    return Optional.empty();
  }
});

Object.defineProperty(Array.prototype, "null", {
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

Array.prototype.fmap = function(mapper) {
  return this.map(e => mapper(e));
};

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

Array.prototype.takeWhile = function(pred) {
  const takeIndex = this.findIndex(e => !pred(e));
  if (takeIndex === -1) {
    return [...this];
  } else {
    return this.slice(0, takeIndex);
  }
};
