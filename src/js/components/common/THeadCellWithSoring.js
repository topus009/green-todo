import React, { useMemo, memo, useCallback } from 'react';
import cn from 'classnames';
import { string, node, func } from 'prop-types';
import { getSortBy } from '../../helpers/sorting';

const propTypes = {
  label: string.isRequired,
  className: string,
  sortOrder: string,
  sortBy: string,
  sortName: string.isRequired,
  handleSort: func,
  defaultSortOrder: string,
  children: node,
};

const defaultProps = {
  className: '',
  sortOrder: null,
  sortBy: null,
  defaultSortOrder: 'desc',
};

const THeadCellWithSoring = props => {
  const { label, className, sortOrder, sortBy, sortName, handleSort, defaultSortOrder, children, ...rest } = props;
  const isSorting = sortName === sortBy;
  const asc = sortOrder === 'asc';
  const classes = cn('table-cell sorting', {
    [className]: className,
  });

  const iconClasses = cn('sort_icon', {
    sortByCurrent: isSorting,
    [sortOrder]: sortOrder,
  });

  const by = useMemo(() => getSortBy(isSorting, asc, defaultSortOrder), [isSorting, asc, defaultSortOrder]);

  const onSort = useCallback(() => {
    handleSort(sortName, by);
  }, [handleSort, sortName, by]);
  return (
    <th {...rest} className={classes} onClick={onSort}>
      {label}
      <span className={iconClasses}>{asc ? '/\\' : '\\/'}</span>
      {children}
    </th>
  );
};

THeadCellWithSoring.propTypes = propTypes;
THeadCellWithSoring.defaultProps = defaultProps;

export default memo(THeadCellWithSoring);
