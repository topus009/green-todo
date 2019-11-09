import React from 'react';

const TextInput = ({ value, onBlur, onChange }) => {
  const handleChange = e => onChange(e.target.value);
  return <input type="text" className="text_input" value={value} onChange={handleChange} onBlur={onBlur} autoFocus />;
};

export default TextInput;
