const bTree = require('./binaryTree');

describe('binaryTree', () => {
  describe('create', () => {
    it('should create a correct empty binary tree', () => {
      const tree = bTree.create();
      expect(bTree.create()).toEqual(undefined);
    });
    it('should create a correct binary tree populated with values', () => {
      const tree = bTree.create(2, 1, 3, 4);
      expect(tree.value).toEqual(2);
      expect(tree.left.value).toEqual(1);
      expect(tree.right.value).toEqual(3);
      expect(tree.right.right.value).toEqual(4);
      const tree2 = bTree.create(7, 9, 3, 2, 4, 10, 8);
      expect(tree2).toEqual({
        value: 7,
        left: {
          value: 3,
          left: { value: 2 },
          right: { value: 4 },
        },
        right: {
          value: 9,
          left: { value: 8 },
          right: { value: 10 },
        },
      });
    });
  });
  describe('insert', () => {
    it('should correctly insert a value into an empty tree', () => {
      const tree = bTree.create();
      expect(bTree.insert(tree, 1)).toEqual({ value: 1 });
    });
    it('should correctly insert a value into a populated tree', () => {
      const tree = bTree.create(2, 1);
      expect(bTree.insert(tree, 3)).toEqual({
        value: 2,
        left: { value: 1 },
        right: { value: 3 },
      });
    });
  });
  describe('remove', () => {
    it('should not explode when removing a value on an empty binary tree', () => {
      const tree = bTree.create();
      expect(bTree.remove(tree, 1)).toEqual(undefined);
    });
    it('should correctly remove a value from a populated tree', () => {
      const tree = bTree.create(2, 1);
      expect(bTree.remove(tree, 1)).toEqual({
        value: 2,
      });
      const tree2 = bTree.create(2, 1, 3, 4);
      expect(bTree.remove(tree2, 2)).toEqual({
        value: 1,
        right: {
          value: 3,
          right: {
            value: 4,
          },
        },
      });
      expect(bTree.remove(tree2, 4)).toEqual({
        value: 2,
        left: {
          value: 1,
        },
        right: {
          value: 3,
        },
      });
    });
  });
});
