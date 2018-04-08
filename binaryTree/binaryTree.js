const create = (...arr) => arr.reduce(insert, undefined);

const insert = (tree, value) => {
  if (tree === undefined) return { value };
  if (value > tree.value) {
    return { ...tree, right: insert(tree.right, value) };
  }
  if (value < tree.value) {
    return { ...tree, left: insert(tree.left, value) };
  }
  return tree;
};

const remove = (tree, value) => {
  if (tree === undefined) return tree;
  if (value < tree.value) return { ...tree, left: remove(tree.left, value) };
  if (value > tree.value) return { ...tree, right: remove(tree.right, value) };
  // we have reached a matching value: we choose whatever side is available and bubble it up to override the value we are removing
  return overrideRoot(tree);
};

const PREFERRED_SIDE = 'left';
const SECONDARY_SIDE = 'right';
const overrideRoot = (tree) => {
  if (tree[PREFERRED_SIDE] === undefined && tree[SECONDARY_SIDE] === undefined) return undefined;
  const side = tree[PREFERRED_SIDE] !== undefined ? PREFERRED_SIDE : SECONDARY_SIDE;
  return {
    ...tree,
    value: tree[side].value,
    [side]: overrideRoot(tree[side]),
  };
};

module.exports = {
  create,
  insert,
  remove,
};
