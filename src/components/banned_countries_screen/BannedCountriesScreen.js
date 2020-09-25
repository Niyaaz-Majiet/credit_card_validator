import React, { useEffect, useState } from "react";
import AutoCompleteWidget from "../auto_complete_widget/AutoCompleteWidget";
import {
  proccessRawCountriesArray,
  getCountries,
  getBannedCountries,
  setBannedCountries,
} from "./../../Utility";
import "./BannedCountriesScreen.css";

const BannedCountriesScreen = () => {
  const [countries, updateCountries] = useState([]);
  const [bannedCountries, updateBannedCountries] = useState(
    getBannedCountries()
  );
  const [suggestionState, updateSuggestionState] = useState({
    filteredSuggestions: [],
    showSuggestions: false,
    userInput: "",
  });

  const onChange = ($event) => {
    const suggestions = countries;
    const userInput = $event.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    updateSuggestionState({
      filteredSuggestions,
      showSuggestions: true,
      userInput: $event.currentTarget.value,
    });
  };

  const onClick = ($event) => {
    updateSuggestionState({
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: $event.currentTarget.innerText,
    });
  };

  useEffect(() => {
    setBannedCountries(bannedCountries);
  }, [bannedCountries]);

  useEffect(() => {
    getCountries().then((result) => {
      if (result) {
        let proccessedData = proccessRawCountriesArray(result);
        updateCountries(proccessedData);
      }
    });
  }, []);

  const removeItem = (country) => {
    let newArray = bannedCountries.filter(
      (currentCountry) => currentCountry.name !== country
    );
    updateBannedCountries(newArray);
  };

  const addToBanned = () => {
    if (suggestionState.userInput.length > 0) {
      let isValidCountry = false;
      let indexOfSelectedCountry = null;
      let currentUserInput = suggestionState.userInput.toLowerCase().trim();
      for (let i = 0; i < countries.length; i++) {
        let currentCompany = countries[i].name.toLowerCase();

        if (currentCompany === currentUserInput) {
          isValidCountry = true;
          indexOfSelectedCountry = i;
          break;
        }
      }

      if (isValidCountry) {
        if (bannedCountries.includes(countries[indexOfSelectedCountry])) {
          alert("Country Already Banned");
        } else {
          updateBannedCountries([
            ...bannedCountries,
            countries[indexOfSelectedCountry],
          ]);
        }
      } else {
        alert("Country Not Found ...");
      }

      updateSuggestionState({ userInput: "" });
    } else {
      alert("Please enter a city name ...");
    }
  };

  return (
    <div id="container">
      <h1>Banned Accounts</h1>
      <div id="banned_form" className="column">
        <AutoCompleteWidget
          suggestions={countries}
          onChange={($event) => onChange($event)}
          onClick={($event) => onClick($event)}
          suggestionState={suggestionState}
        />
        <button onClick={() => addToBanned()}>Add to banned</button>
      </div>

      {bannedCountries && bannedCountries.length > 0 ? (
        <div id="list_wrapper">
          {bannedCountries.map((country, index) => {
            return (
              <div key={index}>
                {country.name}
                <button id="alpha" onClick={() => removeItem(country.name)}>
                  X
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div id="no_banned_accounts_display">
          <h1 id="no_banned_accounts_display_message">
            No countries have been banned
          </h1>
        </div>
      )}
    </div>
  );
};

export default BannedCountriesScreen;
