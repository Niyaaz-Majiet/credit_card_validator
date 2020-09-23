import React, { useEffect, useState } from "react";
import AutoCompleteWidget from "../auto_complete_widget/AutoCompleteWidget";
import { proccessRawCountriesArray } from "./../../Utility";
import "./BannedCountriesScreen.css";

const BannedCountriesScreen = () => {
  const [countries, updateCountries] = useState([]);
  const [bannedCountries, updateBannedCountries] = useState(
    JSON.parse(sessionStorage.getItem("banned_countries")) || []
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
    sessionStorage.setItem("banned_countries", JSON.stringify(bannedCountries));
  }, [bannedCountries]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let proccessedData = proccessRawCountriesArray(data);
        updateCountries(proccessedData);
      })
      .catch((error) => {
        return error;
      });
  }, []);

  const removeItem = (country) => {
    let newArray = bannedCountries.filter(
      (currentCountry) => currentCountry.name !== country
    );
    updateBannedCountries(newArray);
  };

  const addToBanned = () => {
    console.log("banned hit");
    if (suggestionState.userInput.length > 0) {
      let isValidCountry = false;
      let indexOfSelectedCountry = null;

      for (let i = 0; i < countries.length; i++) {
        let currentCompany = countries[i].name.toLowerCase();
        let currentUserInput = suggestionState.userInput.toLowerCase().trim();
        if (currentCompany === currentUserInput) {
          isValidCountry = true;
          indexOfSelectedCountry = i;
          break;
        }
      }

      if (isValidCountry) {
        updateBannedCountries([
          ...bannedCountries,
          countries[indexOfSelectedCountry],
        ]);
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
              <span key={index} onClick={() => removeItem(country.name)}>
                {country.name}
              </span>
            );
          })}
        </div>
      ) : (
        <div id="no_banned_accounts_display">
          <h1>No countries have been banned</h1>
        </div>
      )}
    </div>
  );
};

export default BannedCountriesScreen;
