import React from 'react';
import { string, bool, func } from 'prop-types';

const propTypes = {
  value: string.isRequired,
  onBlur: func,
  onChange: func.isRequired,
  autoFocus: bool,
  placeholder: string,
  type: string,
};

const defaultProps = {
  autoFocus: false,
  placeholder: '',
  type: 'text',
  onBlur: () => false,
};

const TextInput = ({ value, onBlur, onChange, autoFocus, placeholder, type }) => {
  const handleChange = e => onChange(e.target.value);
  return (
    <input
      type={type}
      className="text_input"
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      placeholder={placeholder}
    />
  );
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
