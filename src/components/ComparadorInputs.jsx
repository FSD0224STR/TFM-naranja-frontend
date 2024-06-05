import React, { useState } from "react";

const ComparadorInputs = ({ onInputChange }) => {
  const [inputs, setInputs] = useState([{ id: 1, value: '' }]);

  const handleInputChange = (index, { target: { value } }) => {
    const newInputs = inputs.map((input, i) => 
      i === index ? { ...input, value } : input
    );

    if (index === inputs.length - 1 && value.trim() !== '') {
      newInputs.push({ id: inputs.length + 1, value: '' });
    }

    if (index === inputs.length - 2 && value.trim() === '' && inputs.length > 1) {
      newInputs.pop();
    }

    setInputs(newInputs);

    const inputValues = newInputs.map(input => input.value);
    onInputChange(inputValues);
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <div key={input.id}>
          <input
            type="text"
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
          />
        </div>
      ))}
    </div>
  );
};

export default ComparadorInputs;