import React, { useState } from "react";
import "./AddCreditCardScreen.css";
import {
  validateAccountAndReturnData,
  retrieveAccountAndCardInfo,
} from "./../../Utility";

const AddCreditCardScreen = () => {
  const [accountNumber, updateAccontNumber] = useState("");

  const onClick = async () => {
    let isValidData = validateAccountAndReturnData(accountNumber);
    let retrivedCardInfo = await retrieveAccountAndCardInfo(accountNumber);
    if (retrivedCardInfo) {
      if (accountNumber.length < 13) {
        alert("Invalid Credit Card Number");
      } else {
        if (isValidData.isValid) {
          let isDuplicate = checkIfAccountExists(accountNumber);
          if (isDuplicate) {
            alert("Account Has Already Been Added");
          } else {
            let isSelectedBanned = checkIfSelectedBanned(
              retrivedCardInfo.country.alpha2
            );

            if (isSelectedBanned) {
              alert("Card Belongs To a Banned Country");
            } else {
              addCreditCard(retrivedCardInfo);
            }
          }
        } else {
          alert("Account Number Not Valid");
        }
      }
    } else {
      alert("Could Not Retrieve Card Info");
    }
  };

  const onChange = ($event) => updateAccontNumber($event.target.value.trim());

  const addCreditCard = (retrivedCardInfo) => {
    let cardInfo = {
      countryName: retrivedCardInfo.country.name,
      banckName: retrivedCardInfo.bank.name,
      alpha2: retrivedCardInfo.country.alpha2,
      currency: retrivedCardInfo.country.currency,
      number: accountNumber,
    };

    let savedAccounts =
      JSON.parse(sessionStorage.getItem("saved_accounts")) || [];

    savedAccounts.push(cardInfo);

    sessionStorage.setItem("saved_accounts", JSON.stringify(savedAccounts));

    alert("Account Successfully Added");
  };

  const checkIfAccountExists = (accountNumber) => {
    let isDuplicate = false;

    let saved_cards =
      JSON.parse(sessionStorage.getItem("saved_accounts")) || [];

    saved_cards.forEach((card) => {
      if (card.number === accountNumber) {
        isDuplicate = true;
      }
    });

    return isDuplicate;
  };

  const checkIfSelectedBanned = (alpha2) => {
    let isSelectedBanned = false;
    let bannedCountries =
      JSON.parse(sessionStorage.getItem("banned_countries")) || [];
    if (bannedCountries) {
      bannedCountries.forEach((country) => {
        if (country.alpha2Code === alpha2) {
          isSelectedBanned = true;
        }
      });
    }

    return isSelectedBanned;
  };

  return (
    <div id="container">
      <h1>Add Credit Card Number</h1>
      <div id="input_form" className="column">
        <input
          placeholder="Enter credit card number..."
          onChange={($event) => onChange($event)}
        />
        <button onClick={() => onClick()}>ADD</button>
      </div>
    </div>
  );
};

export default AddCreditCardScreen;
