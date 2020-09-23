import React from "react";
import "./AutoCompleteWidget.css";

const AutoCompleteWidget = (props) => {
  return (
    <div id="container">
      <input
        className="cityInput"
        type="text"
        onChange={props.onChange}
        value={props.suggestionState.userInput}
      />

      {props.suggestionState.showSuggestions &&
      props.suggestionState.userInput &&
      props.suggestionState.filteredSuggestions.length > 0 ? (
        <ul id="suggestions">
          {props.suggestionState.filteredSuggestions.map(
            (suggestion, index) => {
              return (
                <li className="list_items" key={index} onClick={props.onClick}>
                  {suggestion.name}
                </li>
              );
            }
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default AutoCompleteWidget;
