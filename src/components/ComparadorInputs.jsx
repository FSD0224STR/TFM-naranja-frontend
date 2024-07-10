import React, { useState } from "react";
import { fetchSuggestions } from "../apiService/productApi";
import "./ComparadorInputs.css";

const ComparadorInputs = ({ onInputChange }) => {
  const [inputs, setInputs] = useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentInputIndex, setCurrentInputIndex] = useState(-1);

  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleInputChange = async (index, { target: { value } }) => {
    setCurrentInputIndex(index);
    const newInputs = inputs.map((input, i) =>
      i === index ? { ...input, value } : input
    );

    if (
      index === inputs.length - 1 &&
      value.trim() !== "" &&
      inputs.length < 3
    ) {
      newInputs.push({ id: inputs.length + 1, value: "" });
    }

    if (
      index === inputs.length - 2 &&
      value.trim() === "" &&
      inputs.length > 1
    ) {
      newInputs.pop();
    }

    setInputs(newInputs);
    onInputChange(
      newInputs
        .filter((input) => input.value.trim() !== "")
        .map((input) => input.value)
    );

    if (value.trim() !== "") {
      try {
        let fetchedSuggestions;
        const normalizedValue = normalizeText(value);
        if (index === 0) {
          fetchedSuggestions = await fetchSuggestions(normalizedValue, "");
          if (fetchedSuggestions.length > 0) {
            setSelectedCategory(fetchedSuggestions[0].category);
          }
        } else {
          fetchedSuggestions = await fetchSuggestions(
            normalizedValue,
            selectedCategory
          );
        }
        setSuggestions(fetchedSuggestions);
        setActiveIndex(-1);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const newInputs = inputs.map((input, index) => {
      if (index === currentInputIndex) {
        setSelectedCategory(suggestion.category);
        return { ...input, value: suggestion.name };
      }
      return input;
    });

    setInputs(newInputs);
    onInputChange(
      newInputs
        .filter((input) => input.value.trim() !== "")
        .map((input) => input.value)
    );
    setSuggestions([]);
  };

  return (
    <div className='comparador-inputs'>
      {inputs.map((input, index) => (
        <div key={input.id}>
          <input
            type='text'
            value={input.value}
            onChange={(event) => handleInputChange(index, event)}
            onFocus={() => setCurrentInputIndex(index)} // Set the current input index on focus
          />
        </div>
      ))}
      {suggestions.length > 0 && (
        <ul className='suggestions-list'>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={index === activeIndex ? "active" : ""}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComparadorInputs;
