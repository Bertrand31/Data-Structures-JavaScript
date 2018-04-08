const lList = require('./linkedList');

describe('linkedList', () => {
  describe('create', () => {
    it('should create a correct empty list', () => {
      const list = lList.create();
      expect(list[0]).toEqual({ value: null, next: null });
    });
    it('should create a simple linked list', () => {
      const list = lList.create(1, 2, 3);
      const index1 = list[0].next;
      expect(list[index1].value).toEqual(3);
      const index2 = list[index1].next;
      expect(list[index2].value).toEqual(2);
      const index3 = list[index2].next;
      expect(list[index3]).toEqual({ value: 1, next: null });
    });
  });
  describe('insert', () => {
    it('should insert successfuly into an empty list', () => {
      const list = lList.create();
      const newList = lList.insert(list, 1);
      const index = newList[0].next;
      expect(typeof index).toEqual('number');
      expect(newList[index].value).toEqual(1);
    });
    it('should insert successfuly into a normal list', () => {
      const list = lList.create(6, 4);
      const newList = lList.insert(list, 8);
      const index1 = newList[0].next;
      expect(newList[index1].value).toEqual(8);
      const index2 = newList[index1].next;
      expect(newList[index2].value).toEqual(4);
    });
  });
  describe('checkIfExists', () => {
    it('should return false if the list is empty', () => {
      const list = lList.create();
      expect(lList.checkIfExists(list, 1)).toBe(false);
      expect(lList.checkIfExists(list, 9)).toBe(false);
    });
    it('should return false if the list does not contain the element', () => {
      const list = lList.create(1, 4, 5);
      expect(lList.checkIfExists(list, 9)).toBe(false);
      expect(lList.checkIfExists(list, 2)).toBe(false);
    });
    it('should return true if the list does contain the element', () => {
      const list = lList.create(1, 4, 5);
      expect(lList.checkIfExists(list, 1)).toBe(true);
      expect(lList.checkIfExists(list, 5)).toBe(true);
    });
  });
  describe('length', () => {
    it('should get a list\'s correct length', () => {
      const list = lList.create(1, 2, 3, 4);
      expect(lList.length(list)).toEqual(4);
      const list2 = lList.create(1, 2, 3, 4, 5);
      expect(lList.length(list2)).toEqual(5);
    });
    it('should not explode when passed an empty list', () => {
      const list = lList.create();
      expect(lList.length(list)).toEqual(0);
    });
  });
  describe('toArray', () => {
    it('should successfully turn a list into an array', () => {
      const list = lList.create(1, 2, 3, 4);
      expect(lList.toArray(list)).toEqual([4, 3, 2, 1]);
    });
    it('should not explode when passed an empty list', () => {
      const list = lList.create();
      expect(lList.toArray(list)).toEqual([]);
    });
  });
  describe('remove', () => {
    it('should remove a value from a list', () => {
      const list = lList.create(1, 2);
      const newList = lList.remove(list, 1);
      const index1 = newList[0].next;
      expect(newList[index1].value).toEqual(2);
      expect(newList[index1].next).toBe(null);
      expect(lList.checkIfExists(newList, 1)).toBe(false);
      expect(lList.checkIfExists(newList, 2)).toBe(true);
      expect(lList.toArray(newList)).toEqual([2]);
    });
    it('should not explode on an empty array', () => {
      const list = lList.create();
      const newList = lList.remove(list, 1);
      expect(lList.toArray(newList).length).toEqual(0);
    });
    it('should leave a list untouched when trying to remove a value it doesn\'t contain', () => {
      const list = lList.create(1, 2, 3);
      const newList = lList.remove(list, 4);
      expect(lList.toArray(newList)).toEqual([3, 2, 1]);
    });
  });
});