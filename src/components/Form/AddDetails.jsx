import React, { useState, useContext } from "react";
import StoreContext from "../../store/store.js";
import "./AddDetails.css"; // Import your CSS file for styling
import CryptoJS from "crypto-js"; // Import CryptoJS library

function AddDetails() {
  const [appName, setAppName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { Walletstore } = useContext(StoreContext);

  const secretKey = "secret key";

  const addDetailsHandler = async () => {
    if (!Walletstore.Connected || Walletstore.NetworkID !== 80001) {
      console.log("Connect to wallet and Mumbai Testnet first");
      return;
    }

    setIsLoading(true);
    try {
      // Encrypt all input values using CryptoJS
      const encryptedAppName = CryptoJS.AES.encrypt(appName, secretKey).toString();
      const encryptedUsername = CryptoJS.AES.encrypt(username, secretKey).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
      const encryptedLink = CryptoJS.AES.encrypt(link, secretKey).toString();

      const contract = Walletstore.contract;
      await contract.addDetails(encryptedAppName, encryptedUsername, encryptedPassword, encryptedLink);
      setIsLoading(false);
      // Reset form and optionally refresh details list
      setAppName("");
      setUsername("");
      setPassword("");
      setLink("");
    } catch (error) {
      console.error("Error adding details:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="add-details-container">
      <div className="combined-details-form-container">
      <h1><b>Keep Your Password Safe 🔐</b></h1>
        <form className="cf">
          <div className="single-input">
            <label htmlFor="input-Website">Enter website or app name:</label>
            <input
              type="text"
              id="input-Website"
              placeholder="Website/App"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />
          </div>
          <div className="single-input">
            <label htmlFor="input-username">Username:</label>
            <input
              type="email"
              id="input-username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="single-input">
            <label htmlFor="input-password">Password:</label>
            <input
              type="password" 
              id="input-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="single-input">
            <label htmlFor="input-link">Link:</label>
            <input
              type="text"
              id="input-link"
              placeholder="https://"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Submit"
            id="input-submit"
            onClick={addDetailsHandler}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default AddDetails;
