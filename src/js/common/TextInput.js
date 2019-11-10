import React from 'react';

const TextInput = ({ value, onBlur = () => false, onChange, autoFocus = false, placeholder = '', type = 'text' }) => {
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

export default TextInput;
