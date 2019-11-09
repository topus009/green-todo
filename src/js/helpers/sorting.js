export const sortShouldReturn = order => (order === 'asc' ? 1 : -1);

export const standartSortCompare = order => (a, b) => {
  if (a <= b) {
    return -1 * sortShouldReturn(order);
  }
  return sortShouldReturn(order);
};

export const sortIds = (ids, objectWithItems, sortBy, sortOrder, sortingRules) => {
  let sorted = [...ids];
  if (sortBy) {
    sorted = sorted.sort((aKey, bKey) => {
      const valueFormatter = sortingRules[sortBy];
      const aItem = valueFormatter(objectWithItems[aKey][sortBy]);
      const bItem = valueFormatter(objectWithItems[bKey][sortBy]);
      return standartSortCompare(sortOrder)(aItem, bItem);
    });
  }
  return sorted;
};
