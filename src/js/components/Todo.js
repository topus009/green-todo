import React from 'react';
import moment from 'moment';

const Todo = ({ item: { Title, ID, DueDate, Completed }, onSelect, checked }) => {
  const momentDate = moment(DueDate);
  const time = momentDate.format('HH:mm');
  const date = momentDate.format('DD.MM.YYYY');
  return (
    <tr className="todo">
      <td className="todo_action">
        <input type="checkbox" onChange={() => onSelect(ID)} checked={checked} />
      </td>
      <td className="todo_id">{ID}</td>
      <td>{Title}</td>
      <td>{`${time}___${date}`}</td>
      <td className={`todo_status ${Completed ? 'completed' : ''}`}>{Completed.toString()}</td>
    </tr>
  );
};

export default Todo;
