import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../actions/AppActions';
import Todo from '../components/Todo';

const Todos = ({ getTodos, todos, loading }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);

  const isSelected = id => selectedItems.includes(id);
  const todosIds = Object.keys(todos);
  const todosLength = todosIds.length;

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

  return (
    <table className="todos">
      <thead>
        <tr>
          <th>
            <input type="checkbox" onChange={handleSelectAll} checked={selectedAll} />
          </th>
          <th>№</th>
          <th>Название</th>
          <th>Время</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {!loading && todosIds.length
          ? todosIds.map(key => {
              const item = todos[key];
              return <Todo key={item.ID} item={item} onSelect={handleSelectItem} checked={isSelected(item.ID)} />;
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);
