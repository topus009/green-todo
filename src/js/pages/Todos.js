import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { shape, string, number, bool, func, objectOf } from 'prop-types';
import { getTodos, changeTodoTitle, toggleTodoCompleted } from '../redux/actions/AppActions';
import Todo from '../components/Todo';
import THeadCellWithSoring from '../components/common/THeadCellWithSoring';
import { sortIds } from '../helpers/sorting';
import useSorting from '../hooks/useSorting';
import {
  getNumberFromString,
  getBinaryFromString,
  getNumberFromDate,
  getNumberFromStringBool,
  convertArrayToString,
} from '../helpers/common';

const sortingRules = {
  ID: getNumberFromString,
  Title: getBinaryFromString,
  DueDate: getNumberFromDate,
  Completed: getNumberFromStringBool,
};

const defaultSortOrder = 'desc';

const propTypes = {
  todos: objectOf(
    shape({
      ID: number,
      UserName: string,
      DueDate: string,
      Completed: bool,
    })
  ),
  loading: bool,
  getTodos: func.isRequired,
  changeTodoTitle: func.isRequired,
  toggleTodoCompleted: func.isRequired,
};

const defaultProps = {
  todos: {},
  loading: false,
};

const Todos = ({ todos, loading, getTodos, changeTodoTitle, toggleTodoCompleted }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [sortBy, sortOrder, handleSort] = useSorting(null, defaultSortOrder);
  const [editingId, setEditingId] = useState(null);

  const memoisedGetTodos = useCallback(() => getTodos(), [getTodos]);

  useEffect(() => {
    memoisedGetTodos();
  }, [memoisedGetTodos]);

  const todosIds = Object.keys(todos);
  const todosLength = todosIds.length;
  const sortingProps = {
    sortBy,
    sortOrder,
    handleSort,
    defaultSortOrder,
  };

  const isSelected = useCallback(id => selectedItems.includes(id), [selectedItems]);

  const handleSelectItem = useCallback(
    ID => {
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
    },
    [selectedItems, todosLength, setSelectedAll, isSelected, setSelectedItems]
  );

  const handleSelectAll = ({ target: { checked } }) => {
    setSelectedAll(checked);
    if (checked) {
      setSelectedItems(todosIds.map(key => todos[key].ID));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSetEditing = useCallback((id = null) => setEditingId(id), [setEditingId]);

  const handleToggleTodoCompleted = useCallback((ids = []) => toggleTodoCompleted(convertArrayToString(ids)), [
    toggleTodoCompleted,
  ]);

  const handleToggleSelectedTodoCompleted = e => {
    e.stopPropagation();
    toggleTodoCompleted(convertArrayToString(selectedItems));
  };

  const sortedTodos = sortIds(todosIds, todos, sortBy, sortOrder, sortingRules);

  return (
    <>
      {!loading && sortedTodos.length ? (
        <table className="todos container">
          <thead>
            <tr>
              <th>
                <input type="checkbox" onChange={handleSelectAll} checked={selectedAll} />
              </th>
              <THeadCellWithSoring label="№" sortName="ID" {...sortingProps} />
              <THeadCellWithSoring label="Название" sortName="Title" {...sortingProps} />
              <THeadCellWithSoring label="Время" sortName="DueDate" {...sortingProps} />
              <THeadCellWithSoring label="Статус" sortName="Completed" className="todo_header_status" {...sortingProps}>
                {selectedItems.length ? (
                  <button type="button" onClick={handleToggleSelectedTodoCompleted} disabled={!selectedItems.length}>
                    Изменить
                  </button>
                ) : null}
              </THeadCellWithSoring>
            </tr>
          </thead>
          <tbody>
            {sortedTodos.map(key => {
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
                  toggleCompleted={handleToggleTodoCompleted}
                />
              );
            })}
          </tbody>
        </table>
      ) : null}
    </>
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
    toggleTodoCompleted: params => dispatch(toggleTodoCompleted(params)),
  };
};

Todos.propTypes = propTypes;
Todos.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
