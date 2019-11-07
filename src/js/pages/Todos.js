import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTodos } from '../actions/AppActions';

const Todos = ({ getTodos, todos, loading }) => {
  useEffect(() => {
    getTodos();
  }, []);
  const renderTodoListItems = () => !loading && todos.map(() => <div>item</div>);

  return <div>{renderTodoListItems()}</div>;
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
