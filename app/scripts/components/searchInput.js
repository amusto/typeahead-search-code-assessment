/**
 * functional component returning searchInput
 * Notes: Rather then pull in a library like React-bootstrap or a react-typeahead lib I expanded on how I might handle a custom functional component
 * and event handling.
 */
import React, { useState, useEffect, useRef } from 'react';

export default function SearchInput({onSearchFunction, suggestionText, placeholderText}) {
  const [searchText, setSearchText] = useState('');
  const [suggestionSuffix, setSuggestionSuffix] = useState();

  const inputRef = useRef(null);

  useEffect(() => {
    const element = inputRef.current;
    if (!element) return;
    const handleKeyboardEvents = (e) => {
      switch (e.code) {
        case 'ArrowRight':
          setSearchText(suggestionText);
          element.value = suggestionText;
          break;
        case 'Enter':
          setSearchText(suggestionText);
          element.value = suggestionText;
          break;
        default:
      }
    };

    element.addEventListener("keydown", handleKeyboardEvents);
    return () => {
      element.removeEventListener("keydown", handleKeyboardEvents);
    };
  }, [suggestionText]);

  useEffect(() => {
    const trimmedSuggestionSuffix = searchText.length > 2 && suggestionText ? suggestionText.substr(searchText.length) : undefined;
    setSuggestionSuffix(trimmedSuggestionSuffix)
  }, [searchText, suggestionText])

  const onChangeHandler = async (e) => {
    const searchTextString = e.target.value;
    setSearchText(searchTextString);

    // Calling search function after 3 or more characters
    if (searchTextString.length > 2) {
      await onSearchFunction(e.target.value);
    }
  }

  const TypeAheadInputRendered = () => <div className={"search-input-text-string"}>
    <span className={"typed-string"}>{searchText}</span>
    <span className={"suggestion-string"}>{suggestionSuffix}</span>
  </div>;

  return (
    <div className={"search-input-container"}>
      <input
        className={"search-input"}
        type="text"
        onChange={(e) => onChangeHandler(e)}
        placeholder={placeholderText}
        ref={inputRef}
      />
      <TypeAheadInputRendered />
      <i className="material-icons search">search</i>
    </div>
  );
}
