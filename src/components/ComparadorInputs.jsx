import React, { useState, useEffect } from "react";
import { fetchSuggestions } from "../apiService/productApi";

const ComparadorInputs = ({ onInputChange }) => {
  const [inputs, setInputs] = useState([{ id: 1, value: "" }, { id: 2, value: "" }]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestionsForIndex = async (index, value) => {
      try {
        if (!value.trim()) {
          setSuggestions([]);
          return;
        }

        const normalizedValue = normalizeText(value);

        const fetchedSuggestions = await fetchSuggestions(normalizedValue);
        setSuggestions(fetchedSuggestions);
        setActiveIndex(-1);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    };

    if (currentInputIndex !== -1) {
      fetchSuggestionsForIndex(currentInputIndex, inputs[currentInputIndex].value);
    }
  }, [inputs, currentInputIndex]);

  const normalizeText = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;
    setCurrentInputIndex(index);

    const newInputs = inputs.map((input, i) => (i === index ? { ...input, value } : input));

    // Validar que todos los inputs contengan la misma palabra clave
    const firstInputKeyword = newInputs[0].value.split(' ')[0].toLowerCase();
    const allContainKeyword = newInputs.every(input => input.value.toLowerCase().includes(firstInputKeyword));

    if (!allContainKeyword) {
      setError('Todos los productos deben contener la misma palabra clave.');
    } else {
      setError(null);
    }

    // Ajustar la cantidad de inputs según la lógica original
    if (index === inputs.length - 1 && value.trim() !== "" && inputs.length < 3) {
      newInputs.push({ id: inputs.length + 1, value: "" });
    }

    if (index === inputs.length - 2 && value.trim() === "" && inputs.length > 1) {
      newInputs.pop();
    }

    setInputs(newInputs);
    onInputChange(newInputs.filter((input) => input.value.trim() !== "").map((input) => input.value));
  };

  const handleSuggestionClick = (suggestion) => {
    const newInputs = inputs.map((input, index) => {
      if (index === currentInputIndex) {
        return { ...input, value: suggestion.name };
      }
      return input;
    });

    setInputs(newInputs);
    onInputChange(newInputs.filter((input) => input.value.trim() !== "").map((input) => input.value));
    setSuggestions([]);
  };

  return (
    <div className="comparador-inputs">
      {inputs.map((input, index) => (
        <div key={input.id}>
          <input
            type="text"
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
            onFocus={() => setCurrentInputIndex(index)}
          />
          {currentInputIndex === index && suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className={idx === activeIndex ? "active" : ""}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ComparadorInputs;
