const { memoize, simpleHash } = require('../utils');
const lList = require('../linkedList');

const DEFAULT_HASH_SIZE = 1000;

const create = (values, size = DEFAULT_HASH_SIZE) => values.reduce(insert, new Array(size));

const getIndex = memoize((hashTable, value) => simpleHash(value) % hashTable.length, (hashTable, value) => `${value}${hashTable.length}`);

const insert = (hashTable, value) => addAtIndex(hashTable, getIndex(hashTable, value), value);

const addAtIndex = (hashTable, index, value) => {
  if (typeof hashTable[index] === 'undefined') {
    hashTable[index] = lList.create();
  } else if (lList.checkIfExists(hashTable[index], value)) {
    return hashTable;
  }
  hashTable[index] = lList.insert(hashTable[index], value);
  return hashTable;
};

const checkIfExists = (hashTable, value) => (
  checkAtIndex(hashTable, getIndex(hashTable, value), value)
);

const checkAtIndex = (hashTable, index, value) => (
  typeof hashTable[index] !== 'undefined' && lList.checkIfExists(hashTable[index], value)
);

const remove = (hashTable, value) => {
  const index = getIndex(hashTable, value);
  if (typeof hashTable[index] === 'undefined') return hashTable;
  hashTable[index] = lList.remove(hashTable[index], value);
  return hashTable;
};

const toArray = hashTable => (
  hashTable.reduce((acc, item) => (
    typeof item !== 'undefined'
      ? acc.concat(item)
      : acc
  ), [])
);

module.exports = {
  create,
  insert,
  checkIfExists,
  remove,
  toArray,
};
