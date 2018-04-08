const getString = (input) => {
  if (typeof input === 'number') return input.toString();
  if (typeof input === 'object') return JSON.stringify(input);
  return input;
}

const simpleHash = (input) => {
  const str = getString(input);
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const memoizeDefaultKeyGen = (...args) => args.reduce((acc, arg) => `${acc}${getString(arg)}`, '');

const memoize = (fn, keyGenFn = memoizeDefaultKeyGen) => {
  const cache = {};
  return (...args) => {
    const key = keyGenFn(...args);
    if (!(key in cache)) {
      cache[key] = fn(...args);
    }
    return cache[key];
  };
};

module.exports = {
  simpleHash,
  memoize,
};
