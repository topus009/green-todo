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
  children,
  ...rest
}) => {
  const isSorting = sortName === sortBy;
  const classes = cn('table-cell sorting', {
    [className]: className,
  });

  const iconClasses = cn('sort_icon', {
    sortByCurrent: isSorting,
    asc: sortOrder === 'asc',
    desc: sortOrder === 'desc',
  });

  const onSort = () => {
    let by;
    if (isSorting) {
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
      <span className={iconClasses}>{sortOrder === 'desc' ? '\\/' : '/\\'}</span>
      {children}
    </th>
  );
};

export default THeadCellWithSoring;
