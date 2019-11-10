import React from 'react';
import { string, bool, number, func, shape } from 'prop-types';
import cn from 'classnames';
import moment from 'moment';
import EditableCell from './common/EditableCell';

const propTypes = {
  item: shape({
    ID: number,
    UserName: string,
    DueDate: string,
    Completed: bool,
  }),
  onSelect: func.isRequired,
  checked: bool.isRequired,
  handleChange: func.isRequired,
  setEditingId: func.isRequired,
  isEditing: bool.isRequired,
  toggleCompleted: func.isRequired,
};

const Todo = ({
  item: { Title, ID, DueDate, Completed },
  onSelect,
  checked,
  handleChange,
  setEditingId,
  isEditing,
  toggleCompleted,
}) => {
  const momentDate = moment(DueDate);
  const date = momentDate.format('YYYY.MM.DD');
  const time = momentDate.format('HH:mm');
  const onChange = value => handleChange({ ID, value });
  return (
    <tr className={cn('todo', { checked })}>
      <td className="todo_action">
        <input type="checkbox" onChange={() => onSelect(ID)} checked={checked} />
      </td>
      <td className="todo_id">{ID}</td>
      <EditableCell
        onChange={onChange}
        value={Title}
        ID={ID}
        setEditingId={setEditingId}
        isEditing={isEditing}
        className="todo_title"
      />
      <td>{`${date}__${time}`}</td>
      <td className={`todo_status ${Completed ? 'completed' : ''}`} onClick={() => toggleCompleted([ID])}>
        {Completed.toString()}
      </td>
    </tr>
  );
};

Todo.propTypes = propTypes;

export default Todo;
