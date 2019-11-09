import React from 'react';
import moment from 'moment';

const Todo = ({ item: { Title, ID, DueDate, Completed }, onSelect, checked }) => {
  const momentDate = moment(DueDate);
  const date = momentDate.format('YYYY.MM.DD');
  const time = momentDate.format('HH:mm');
  return (
    <tr className="todo">
      <td className="todo_action">
        <input type="checkbox" onChange={() => onSelect(ID)} checked={checked} />
      </td>
      <td className="todo_id">{ID}</td>
      <td>{Title}</td>
      <td>{`${date}__${time}`}</td>
      <td className={`todo_status ${Completed ? 'completed' : ''}`}>{Completed.toString()}</td>
    </tr>
  );
};

export default Todo;
