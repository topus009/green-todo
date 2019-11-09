import React from 'react';
import cn from 'classnames';

const THeadCellWithSoring = ({
  label,
  className,
  sortBy,
  sortOrder,
  sortName,
  handleSort,
  defaultSortOrder,
  ...rest
}) => {
  const classes = cn('table-cell sorting', {
    [className]: className,
    sortByCurrent: typeof sortName === 'string' && sortName === sortBy,
    asc: sortOrder === 'asc',
    desc: sortOrder === 'desc',
  });

  const onSort = () => {
    let by;
    if (sortName === sortBy) {
      if (sortOrder === 'asc') {
        by = 'desc';
      } else {
        by = 'asc';
      }
    } else if (defaultSortOrder) {
      by = defaultSortOrder;
    } else {
      by = 'asc';
    }
    handleSort(sortName, by);
  };
  return (
    <th {...rest} className={classes} onClick={() => onSort()}>
      {label}
    </th>
  );
};

export default THeadCellWithSoring;
