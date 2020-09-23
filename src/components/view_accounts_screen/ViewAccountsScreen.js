import React, { useState, useEffect } from "react";
import "./ViewAccountsScreen.css";

const ViewAccountsScreen = () => {
  const [savedAccounts, updateSavedAccounts] = useState(
    JSON.parse(sessionStorage.getItem("saved_accounts")) || []
  );
  console.log(savedAccounts);

  useEffect(() => {
    sessionStorage.setItem("saved_accounts", JSON.stringify(savedAccounts));
  }, [savedAccounts]);

  const removeItem = (accountNumber) => {
    let newArray = savedAccounts.filter((account) => {
      return account.number !== accountNumber;
    });
    updateSavedAccounts(newArray);
  };

  return (
    <div className="account_container">
      {savedAccounts && savedAccounts.length > 0 ? (
        <div>
          <h1>Saved Accounts</h1>
          {savedAccounts.map((accountData, index) => {
            return (
              <div className="account_item_col">
                <div
                  className="account_items"
                  key={index}
                  onClick={() => removeItem(accountData.number)}
                >
                  <h5 id="account_number">
                    Account Number : {accountData.number}
                  </h5>
                  <br />
                  <h5 id="alpha">{accountData.alpha2}</h5>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No Saved Accounts</div>
      )}
    </div>
  );
};

export default ViewAccountsScreen;
