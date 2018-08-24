/* tslint:disable:member-ordering */

import Optional from "typescript-optional";

declare global {
  interface Map<K, V> {
    // original
    readonly dup: Map<K, V>;
    // basic
    // null to isEmpty
    readonly isEmpty: boolean;
    lookup(key: K): Optional<V>;
    insert(key: K, value: V): Map<K, V>;
    insertWith(callback: (old: V, value: V) => V, key: K, value: V): Map<K, V>;
    remove(key: K): Map<K, V>;
    adjust(mapper: (x: V) => V, key: K): Map<K, V>;
    update(mapper: (x: V) => Optional<V>, key: K): Map<K, V>;
    alter(mapper: (x: Optional<V>) => Optional<V>, key: K): Map<K, V>;
  }
}

Object.defineProperty(Map.prototype, "dup", {
  get() {
    return new Map(this);
  }
});

Object.defineProperty(Map.prototype, "isEmpty", {
  get() {
    return this.size === 0;
  }
});

Map.prototype.lookup = function(key) {
  return Optional.ofNullable(this.get(key));
};

Map.prototype.insert = function(key, value) {
  const shallowCopy = this.dup;
  shallowCopy.set(key, value);
  return shallowCopy;
};

Map.prototype.insertWith = function(callback, key, value) {
  const shallowCopy = this.dup;
  const old = shallowCopy.get(key);
  if (old) {
    shallowCopy.set(key, callback(old, value));
  } else {
    shallowCopy.set(key, value);
  }
  return shallowCopy;
};

Map.prototype.remove = function(key) {
  const shallowCopy = this.dup;
  shallowCopy.delete(key);
  return shallowCopy;
};

Map.prototype.adjust = function(mapper, key) {
  return this.lookup(key).matches({
    empty: () => this.dup,
    present: value => this.insert(key, mapper(value))
  });
};

Map.prototype.update = function(mapper, key) {
  return this.lookup(key).matches({
    empty: () => this.dup,
    present: value =>
      mapper(value).matches({
        empty: () => this.remove(key),
        present: newValue => this.insert(key, newValue)
      })
  });
};

Map.prototype.alter = function(mapper, key) {
  return mapper(this.lookup(key)).matches({
    empty: () => this.remove(key),
    present: value => this.insert(key, value)
  });
};
