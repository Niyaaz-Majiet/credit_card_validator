import React, { useState } from "react";
import "./AddCreditCardScreen.css";
import {
  validateAccountAndReturnData,
  retrieveAccountAndCardInfo,
  checkIfAccountExists,
  getBannedCountries,
  getSavedAccounts,
  setSavedAccounts,
} from "./../../Utility";

const AddCreditCardScreen = () => {
  const [accountNumber, updateAccontNumber] = useState("");

  const onClick = async () => {
    let isValidData = validateAccountAndReturnData(accountNumber);
    let retrivedCardInfo = await retrieveAccountAndCardInfo(accountNumber);
    console.log("retrived", retrivedCardInfo);
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
              updateAccontNumber("");
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

    let savedAccounts = getSavedAccounts();

    savedAccounts.push(cardInfo);

    setSavedAccounts(savedAccounts);

    alert("Account Successfully Added");
  };

  const checkIfSelectedBanned = (alpha2) => {
    let isSelectedBanned = false;
    let bannedCountries = getBannedCountries();
    if (bannedCountries.length > 0) {
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
      <h1>ADD CREDIT CARD NUMBER</h1>
      <div id="input_form" className="column">
        <input
          placeholder="Enter credit card number..."
          onChange={($event) => onChange($event)}
          value={accountNumber}
        />
        <button onClick={() => onClick()}>ADD</button>
      </div>
    </div>
  );
};

export default AddCreditCardScreen;
