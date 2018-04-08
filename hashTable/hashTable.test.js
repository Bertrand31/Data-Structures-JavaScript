const hashTable = require('./hashTable');

describe('hashTable', () => {
  describe('create', () => {
    it('should create a correct empty binary tree', () => {
      const hash = hashTable.create();
      expect(Array.isArray(hash)).toBe(true);
    });
    it('should create a correct populated binary tree', () => {
      const hash = hashTable.create([1, 2, 3]);
      expect(hash.filter(Boolean)).toEqual([1, 2, 3]);
    });
  });
});
