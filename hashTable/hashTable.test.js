const hashTable = require('./hashTable');

describe('hashTable', () => {
  describe('create', () => {
    it('should create a correct empty hash table', () => {
      const hash = hashTable.create();
      expect(Array.isArray(hash)).toBe(true);
      expect(hash.filter(Boolean)).toEqual([]);
    });
    it('should create a correct populated hash table', () => {
      const hash = hashTable.create([1, 2, 3]);
      expect(hashTable.toArray(hash)).toEqual([1, 2, 3]);
    });
  });
});
