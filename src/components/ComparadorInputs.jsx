import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { fetchSuggestions } from "../apiService/productApi";
import "./ComparadorInputs.css";
import { message } from "antd";

const ComparadorInputs = forwardRef(({ onInputChange }, ref) => {
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);
  const [error, setError] = useState(null);
  const [firstKeyword, setFirstKeyword] = useState("");

  useImperativeHandle(ref, () => ({
    resetInputs: () => {
      setInputs([{ id: 1, value: "" }]);
      setFirstKeyword("");
      setSuggestions([]);
      setCurrentInputIndex(-1);
      setError(null);
      onInputChange([]);
    }
  }));

  useEffect(() => {
    const fetchSuggestionsForIndex = async (index, value) => {
      try {
        if (!value.trim()) {
          setSuggestions([]);
          return;
        }

        const normalizedValue = normalizeText(value);
        const fetchedSuggestions = await fetchSuggestions(normalizedValue);

        // Filtrar sugerencias para que no incluyan los productos ya seleccionados
        let filteredSuggestions = fetchedSuggestions.filter(
          suggestion => !inputs.some(input => input.value.toLowerCase() === suggestion.name.toLowerCase())
        );

        // Si no es el primer input, filtrar sugerencias basadas en la primera palabra clave
        if (index > 0 && firstKeyword) {
          filteredSuggestions = filteredSuggestions.filter(
            suggestion => suggestion.name.toLowerCase().includes(firstKeyword)
          );
        }

        setSuggestions(filteredSuggestions);
        setActiveIndex(-1);
      } catch (error) {
        message.error("Error recuperando sugerencias");
        setSuggestions([]);
      }
    };

    if (currentInputIndex !== -1) {
      fetchSuggestionsForIndex(currentInputIndex, inputs[currentInputIndex].value);
    }
  }, [inputs, currentInputIndex, firstKeyword]);

  const normalizeText = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
  };

  const handleInputChange = (index, event) => {
    const { value } = event.target;

    // Verificar si el producto ya ha sido ingresado
    if (inputs.some((input, i) => i !== index && input.value.trim().toLowerCase() === value.trim().toLowerCase())) {
      setError('No puedes ingresar el mismo producto más de una vez.');
      return;
    } else {
      setError(null);
    }

    setCurrentInputIndex(index);

    const newInputs = inputs.map((input, i) => (i === index ? { ...input, value } : input));

    // Ajustar la cantidad de inputs según la lógica
    if (index === inputs.length - 1 && value.trim() !== "" && inputs.length < 3) {
      newInputs.push({ id: inputs.length + 1, value: "" });
    }

    if (index === inputs.length - 2 && value.trim() === "" && inputs.length > 1) {
      newInputs.pop();
    }

    setInputs(newInputs);
    onInputChange(newInputs.filter((input) => input.value.trim() !== "").map((input) => input.value));

    // Establecer la primera palabra clave seleccionada
    if (index === 0) {
      setFirstKeyword(value.split(' ')[0].toLowerCase());
    }
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

    // Establecer la primera palabra clave seleccionada al hacer clic en la sugerencia
    if (currentInputIndex === 0) {
      setFirstKeyword(suggestion.name.split(' ')[0].toLowerCase());
    }
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
});

export default ComparadorInputs;
