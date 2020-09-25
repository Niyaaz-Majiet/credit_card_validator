import React, { useState, useEffect } from "react";
import { getSavedAccounts, setSavedAccounts } from "../../Utility";
import "./ViewAccountsScreen.css";

const ViewAccountsScreen = () => {
  const [savedAccounts, updateSavedAccounts] = useState(getSavedAccounts());

  useEffect(() => {
    setSavedAccounts(savedAccounts);
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
          <h1>SAVED ACCOUNTS</h1>
          {savedAccounts.map((accountData, index) => {
            return (
              <div key={index} className="account_item_col">
                <div className="account_items">
                  <h5 id="account_number">
                    Account Number : {accountData.number}
                  </h5>
                  <br />
                  <button
                    id="btnRemove"
                    onClick={() => removeItem(accountData.number)}
                  >
                    X
                  </button>
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
