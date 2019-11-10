import React from 'react';
import cn from 'classnames';
import { string, node, func } from 'prop-types';

const propTypes = {
  label: string.isRequired,
  className: string,
  sortBy: string,
  sortOrder: string,
  sortName: string.isRequired,
  handleSort: func,
  defaultSortOrder: string,
  children: node,
};

const defaultProps = {
  className: '',
  sortBy: null,
  sortOrder: null,
  handleSort: () => false,
  defaultSortOrder: 'desc',
};

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

THeadCellWithSoring.propTypes = propTypes;
THeadCellWithSoring.defaultProps = defaultProps;

export default THeadCellWithSoring;
