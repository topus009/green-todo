import React from 'react';
import { string, bool, number, func } from 'prop-types';
import cn from 'classnames';
import TextInput from './TextInput';

const propTypes = {
  onChange: func.isRequired,
  value: string.isRequired,
  setEditingId: func.isRequired,
  isEditing: bool.isRequired,
  className: string,
  ID: number.isRequired,
};

const defaultProps = {
  className: '',
};

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

EditableCell.propTypes = propTypes;
EditableCell.defaultProps = defaultProps;

export default EditableCell;
