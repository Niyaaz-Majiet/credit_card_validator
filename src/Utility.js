var valid = require("card-validator");
var lookup = require("binlookup")();

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

export const retrieveAccountAndCardInfo = (creditCardNumber) => {
  return new Promise((resolve) => {
    lookup(creditCardNumber.substring(0, 8), (err, data) => {
      if (err) {
        resolve(null);
      }

      resolve(data);
    });

    lookup(creditCardNumber);
  });
};
