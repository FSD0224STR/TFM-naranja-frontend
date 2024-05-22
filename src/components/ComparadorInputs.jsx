import React, { useState } from "react";

const ComparadorInputs = () => {
  const [inputs, setInputs] = useState([{ id: 1, value: '' }]);

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index].value = event.target.value;
    setInputs(newInputs);

    if (event.target.value !== '' && index === inputs.length - 1) {
      setInputs([...inputs, { id: inputs.length + 1, value: '' }]);
    }

    if (event.target.value === '' && inputs.length > 1) {
      setInputs(inputs.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      {inputs.map((input, index) => (
        <input
          key={input.id}
          type="text"
          value={input.value}
          onChange={(event) => handleInputChange(index, event)}
        />
      ))}
    </div>
  );
};

export default ComparadorInputs;
