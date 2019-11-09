import { useState } from 'react';

export default (defaultSortBy = null, defaultSortOrder = null) => {
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder);

  const handleSort = (sortName, by) => {
    setSortBy(sortName);
    setSortOrder(by);
  };

  return [sortBy, sortOrder, handleSort];
};
