import React from 'react';

const TextInput = ({ fieldName, onChange, label, value, placeholder }) => {
  const handleChange = e => onChange({ key: fieldName, value: e.target.value });
  return (
    <div className="text_input">
      <div className="label">{label}</div>
      <div className="input_block">
        <input type="text" className="input" placeholder={placeholder} value={value} onChange={handleChange} />
      </div>
    </div>
  );
};

export default TextInput;
