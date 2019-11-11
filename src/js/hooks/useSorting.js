import { useState, useCallback } from 'react';

export default (defaultSortBy = null, defaultSortOrder = null) => {
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const handleSort = useCallback(
    (sortName, by) => {
      setSortBy(sortName);
      setSortOrder(by);
    },
    [setSortBy, setSortOrder]
  );

  return [sortBy, sortOrder, handleSort];
};
