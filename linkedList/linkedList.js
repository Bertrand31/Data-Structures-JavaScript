const { simpleHash } = require('../utils');

// We are using a JS array to simulate a range of memory available.
// The getIndex function is used to simulate requesting the system for an available memory address
// Issue not addressed: collisions of the getIndex function

const MEMORY_SIZE = 1000;

const genBaseArr = () => [{ value: null, next: null }, ...new Array(MEMORY_SIZE - 1)];

const create = (...arr) => arr.reduce(insert, genBaseArr());

const insert = (lList, value) => {
  const index = getIndex(lList, value);
  lList[index] = { value, next: lList[0].next };
  lList[0].next = index;
  return lList;
};

const getIndex = (lList, value) => simpleHash(value) % lList.length;

const checkIfExists = (lList, value, index = 0) => (
  lList[index].value === value || (lList[index].next !== null && checkIfExists(lList, value, lList[index].next))
);

const remove = (lList, value, index = 0, prevIndex = null) => {
  if (lList[index].value !== value && lList[index].next === null) return lList;
  if (lList[index].value !== value) return remove(lList, value, lList[index].next, index);
  // the node we want to delete happens to be the last one. We have to go back to the previous one to remove its reference
  if (lList[index].next === null) {
    // the linked list only has one node
    if (prevIndex === null) return [{ value: null, next: null }];
    lList[prevIndex].next = null;
    return lList;
  }
  // the matching node is somewhere in the list, not at the end: we simply make the previous node point to the next one,
  // effectively making the matching node an orphan
  lList[prevIndex].next = lList[index].next;
  return lList;
};

const toArray = (lList, index = 0) => {
  if (index === 0) {
    if (lList[0].next === null) return [];
    return toArray(lList, lList[0].next);
  }
  if (lList[index].next === null) return [lList[index].value];
  return [lList[index].value, ...toArray(lList, lList[index].next)];
};

module.exports = {
  create,
  insert,
  checkIfExists,
  remove,
  toArray,
};
