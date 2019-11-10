import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTodos, changeTodoTitle, toggleTodoCompleted } from '../redux/actions/AppActions';
import Todo from '../components/Todo';
import THeadCellWithSoring from '../components/common/THeadCellWithSoring';
import renderChildrenWithProps from '../hoc/renderChildrenWithProps';
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

const Todos = ({ todos, loading, getTodos, changeTodoTitle, toggleTodoCompleted }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [sortBy, sortOrder, handleSort] = useSorting(null, defaultSortOrder);
  const [editingId, setEditingId] = useState(null);

  const todosIds = Object.keys(todos);
  const todosLength = todosIds.length;
  const sortingProps = {
    sortBy,
    sortOrder,
    handleSort,
    defaultSortOrder,
  };

  const isSelected = id => selectedItems.includes(id);

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

  const handleToggleTodoCompleted = (ids = []) => toggleTodoCompleted(convertArrayToString(ids));

  const handleToggleSelectedTodoCompleted = e => {
    e.stopPropagation();
    toggleTodoCompleted(convertArrayToString(selectedItems));
  };

  const sortedTodos = sortIds(todosIds, todos, sortBy, sortOrder, sortingRules);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <table className="todos container">
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
              <THeadCellWithSoring label="Статус" sortName="Completed" className="todo_header_status">
                {selectedItems.length ? (
                  <button type="button" onClick={handleToggleSelectedTodoCompleted} disabled={!selectedItems.length}>
                    Изменить
                  </button>
                ) : null}
              </THeadCellWithSoring>,
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
                  toggleCompleted={handleToggleTodoCompleted}
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
    toggleTodoCompleted: params => dispatch(toggleTodoCompleted(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
