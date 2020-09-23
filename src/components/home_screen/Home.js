import React, { useState } from "react";
import AddCreditCardScreen from "../add_account_screen/AddCreditCardScreen";
import BannedCountriesScreen from "../banned_countries_screen/BannedCountriesScreen";
import ViewAccountsScreen from "../view_accounts_screen/ViewAccountsScreen";
import PopUpBase from "../pop_up_base/PopUpBase";
import "./Home.css";

const Home = () => {
  const [isAddPopUpOpen, setIsAddOpen] = useState(false);
  const [isViewPopUpOpen, setIsViewOpen] = useState(false);
  const [isBannedPopUpOpen, setIsBannedOpen] = useState(false);

  const togglePopUpOff = () => {
    if (isAddPopUpOpen) {
      setIsAddOpen(false);
    } else if (isViewPopUpOpen) {
      setIsViewOpen(false);
    } else if (isBannedPopUpOpen) {
      setIsBannedOpen(false);
    }
  };

  const togglePopUps = ($event) => {
    let popUpName = $event.target.getAttribute("name");

    if (popUpName === "add") {
      setIsAddOpen(!isAddPopUpOpen);
    } else if (popUpName === "view") {
      setIsViewOpen(!isViewPopUpOpen);
    } else if (popUpName === "banned") {
      setIsBannedOpen(!isBannedPopUpOpen);
    }
  };

  return (
    <div className="container">
      <div id="action_buttons">
        <button
          className="btn"
          name="add"
          onClick={($event) => togglePopUps($event)}
        >
          ADD
        </button>
        {isAddPopUpOpen && (
          <PopUpBase
            content={<AddCreditCardScreen />}
            handleClose={togglePopUpOff}
          />
        )}

        <button
          className="btn"
          name="view"
          onClick={($event) => togglePopUps($event)}
        >
          VIEW
        </button>
        {isViewPopUpOpen && (
          <PopUpBase
            content={<ViewAccountsScreen />}
            handleClose={togglePopUpOff}
          />
        )}

        <button
          className="btn"
          name="banned"
          onClick={($event) => togglePopUps($event)}
        >
          BANNED
        </button>
        {isBannedPopUpOpen && (
          <PopUpBase
            content={<BannedCountriesScreen />}
            handleClose={togglePopUpOff}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
