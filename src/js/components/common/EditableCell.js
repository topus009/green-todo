import React from 'react';
import cn from 'classnames';
import TextInput from './TextInput';

const EditableCell = ({ onChange, value, setEditingId, isEditing, className, ID }) => {
  const onToggleInputFocus = () => {
    setEditingId(null);
    setEditingId(ID);
  };
  return (
    <>
      {!isEditing ? (
        <td onClick={onToggleInputFocus} onFocus={onToggleInputFocus} className={className}>
          {value}
        </td>
      ) : (
        <td className={cn(className, { isEditing })}>
          <TextInput value={value} onBlur={() => setEditingId(null)} onChange={onChange} />
        </td>
      )}
    </>
  );
};

export default EditableCell;
