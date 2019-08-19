// TODO: Implement my own
const { Heap } = require('heap-js');

class LRU {

  constructor(capacity) {
    this.capacity = capacity;
    this.data = new Map();
    this.heap = new Heap(this.heapComparator);
  }

  // Had to add this fallback to empty object because I was getting
  // both a and b "undefined" sometimes, for some reason
  heapComparator = (a = {}, b = {}) => a.time - b.time

  set = (key, data) => {
    if (!this.data.has(key)) {
      this.heap.push({ key, time: Date.now() });
    }
    if (!this.data.has(key) && this.data.size >= this.capacity) {
      const keyMarkedToDelete = this.heap.pop();
      this.data.delete(keyMarkedToDelete.key);
    }
    this.data.set(key, data);
    return this;
  }

  get = (key) => {
    const entry = this.data.get(key);
    if (typeof entry !== 'undefined') {
      console.log(this.heap.toArray());
      this.heap.remove(key);
      console.log(this.heap.toArray());
      this.heap.push({ key, time: Date.now() });
    }
    return entry;
  }

  size = () => this.data.size

  toArray = () => Array.from(this.data.values())
}

// :: Number -> (Any -> Any) -> (Any -> Any)
const memoizeWithLRU = (nbOfItems, makeKey, fn) => {
  const cache = new LRU(nbOfItems);
  return (...args) => {
    const key = makeKey(...args);
    const cached = cache.get(key);
    if (typeof cached !== 'undefined') return cached;
    const res = fn(...args);
    cache.set(key, res);
    return res;
  };
};

// :: Number -> Number -> String
const concatNumbers = (a, b) => `${a}-${b}`;

// :: Number -> Number -> Number
const sum = (a, b) => a + b;
const memoizedSum = memoizeWithLRU(5, concatNumbers, sum);

memoizedSum(1, 2);
memoizedSum(2, 3);
memoizedSum(1, 2);
memoizedSum(8, 2);
memoizedSum(9, 2);
memoizedSum(10, 2);
memoizedSum(11, 2);
memoizedSum(13, 2);
memoizedSum(13, 8);
memoizedSum(1, 5);
memoizedSum(1, 0);

module.exports = LRU;
