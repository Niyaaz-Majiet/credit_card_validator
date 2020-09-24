var valid = require("card-validator");

export const proccessRawCountriesArray = (rawCountriesArray) => {
  let proccesedArray = [];

  [...rawCountriesArray].forEach((country) => {
    proccesedArray.push({
      name: country.name,
      alpha2Code: country.alpha2Code,
    });
  });

  return proccesedArray;
};

export const validateAccountAndReturnData = (creditCardNumber) => {
  let checkCardDetails = valid.number(creditCardNumber);
  return {
    isValid: checkCardDetails.isValid,
  };
};

export const checkIfAccountExists = (accountNumber) => {
  let isDuplicate = false;

  let saved_cards = JSON.parse(sessionStorage.getItem("saved_accounts")) || [];

  saved_cards.forEach((card) => {
    if (card.number === accountNumber) {
      isDuplicate = true;
    }
  });

  return isDuplicate;
};

export const retrieveAccountAndCardInfo = (creditCardNumber) => {
  return new Promise((resolve) => {
    fetch(
      `http://localhost:3002/api/binlist-details/${creditCardNumber.substring(
        0,
        8
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        resolve(null);
      });
  });
};

export const getCountries = () => {
  return new Promise((resolve) => {
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
        resolve(data);
      })
      .catch((error) => {
        resolve(null);
      });
  });
};
