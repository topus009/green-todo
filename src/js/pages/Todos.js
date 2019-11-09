import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTodos, changeTodoTitle } from '../actions/AppActions';
import Todo from '../components/Todo';
import THeadCellWithSoring from '../common/THeadCellWithSoring';
import renderChildrenWithProps from '../hoc/renderChildrenWithProps';
import { sortIds } from '../helpers/sorting';
import useSorting from '../hooks/useSorting';
import {
  getNumberFromString,
  getBinaryFromString,
  getNumberFromDate,
  getNumberFromStringBool,
} from '../helpers/common';

const sortingRules = {
  ID: getNumberFromString,
  Title: getBinaryFromString,
  DueDate: getNumberFromDate,
  Completed: getNumberFromStringBool,
};

const defaultSortOrder = 'desc';

const Todos = ({ todos, loading, getTodos, changeTodoTitle }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [sortBy, sortOrder, handleSort] = useSorting(null, defaultSortOrder);
  const [editingId, setEditingId] = useState(1);

  const sortingProps = {
    sortBy,
    sortOrder,
    handleSort,
    defaultSortOrder,
  };
  const todosIds = Object.keys(todos);
  const todosLength = todosIds.length;
  const isSelected = id => selectedItems.includes(id);

  useEffect(() => {
    getTodos();
  }, []);

  const handleSelectItem = ID => {
    if (isSelected(ID)) {
      setSelectedItems(selectedItems.filter(item => item !== ID));
      setSelectedAll(false);
    } else {
      const newSelectedItems = [...selectedItems, ID];
      setSelectedItems([...selectedItems, ID]);
      if (newSelectedItems.length === todosLength) {
        setSelectedAll(true);
      }
    }
  };

  const handleSelectAll = ({ target: { checked } }) => {
    setSelectedAll(checked);
    if (checked) {
      setSelectedItems(todosIds.map(key => todos[key].ID));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSetEditing = (id = null) => setEditingId(id);

  const sortedTodos = sortIds(todosIds, todos, sortBy, sortOrder, sortingRules);

  return (
    <table className="todos">
      <thead>
        <tr>
          <th>
            <input type="checkbox" onChange={handleSelectAll} checked={selectedAll} />
          </th>
          {renderChildrenWithProps(
            [
              <THeadCellWithSoring label="№" sortName="ID" />,
              <THeadCellWithSoring label="Название" sortName="Title" />,
              <THeadCellWithSoring label="Время" sortName="DueDate" />,
              <THeadCellWithSoring label="Статус" sortName="Completed" />,
            ],
            sortingProps
          )}
        </tr>
      </thead>
      <tbody>
        {!loading && sortedTodos.length
          ? sortedTodos.map(key => {
              const item = todos[key];
              return (
                <Todo
                  key={item.ID}
                  item={item}
                  onSelect={handleSelectItem}
                  checked={isSelected(item.ID)}
                  handleChange={changeTodoTitle}
                  setEditingId={handleSetEditing}
                  isEditing={editingId === item.ID}
                />
              );
            })
          : null}
      </tbody>
    </table>
  );
};

const mapStateToProps = ({ app }) => {
  const { todos, loading } = app;
  return {
    todos,
    loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTodos: () => dispatch(getTodos()),
    changeTodoTitle: params => dispatch(changeTodoTitle(params)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
