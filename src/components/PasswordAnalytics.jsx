import React, { useState, useEffect, useContext } from "react";
import StoreContext from "../store/store.js";
import "./PasswordAnalytics.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CryptoJS from "crypto-js"; // Import CryptoJS library

function PasswordAnalytics({ userAddress }) {
  const { Walletstore } = useContext(StoreContext);
  const [details, setDetails] = useState([]);
  const [totalPasswords, setTotalPasswords] = useState(0);
  const [securePasswords, setSecurePasswords] = useState(0);
  const [unsafePasswords, setUnsafePasswords] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("#4CAF50");

  useEffect(() => {
    if (Walletstore.Connected && Walletstore.NetworkID === 80001) {
      getDetails();
    }
  }, [Walletstore, userAddress]);

  useEffect(() => {
    const strength = calculatePasswordStrength();
    setPasswordStrength(strength);
    updatePasswordStrengthColor(strength);
  }, [securePasswords, unsafePasswords]);

  const isSecurePassword = (password) => {
    // Define your criteria for a secure password here
    const minPasswordLength = 8; // Minimum password length
    const minDigitCount = 2; // Minimum number of digits
    const minSpecialCharCount = 1; // Minimum number of special characters
    const minUppercaseCharCount = 1; // Minimum number of uppercase characters
    const minLowercaseCharCount = 1; // Minimum number of lowercase characters

    // Check if the password meets the criteria
    const digitCount = (password.match(/\d/g) || []).length;
    const specialCharCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;
    const uppercaseCharCount = (password.match(/[A-Z]/g) || []).length;
    const lowercaseCharCount = (password.match(/[a-z]/g) || []).length;

    return (
      password.length >= minPasswordLength &&
      digitCount >= minDigitCount &&
      specialCharCount >= minSpecialCharCount &&
      uppercaseCharCount >= minUppercaseCharCount &&
      lowercaseCharCount >= minLowercaseCharCount
    );
  };

  const getDetails = async () => {
    if (Walletstore.Connected && Walletstore.NetworkID === 80001) {
      const contract = Walletstore.contract;
      try {
        const fetchedDetails = await contract.getDetails();
        const userDetails = fetchedDetails.filter(
          (detail) => detail.address === userAddress
        );

        // Decrypt passwords
        const decryptedUserDetails = userDetails.map(detail => ({
          ...detail,
          password: CryptoJS.AES.decrypt(detail.password, "secret key").toString(CryptoJS.enc.Utf8)
        }));

        setDetails(decryptedUserDetails);

        const total = decryptedUserDetails.length;
        const secure = decryptedUserDetails.filter((detail) => isSecurePassword(detail.password)).length;
        const unsafe = total - secure;

        setTotalPasswords(total);
        setSecurePasswords(secure);
        setUnsafePasswords(unsafe);
      } catch (error) {
        console.error("Error getting details: ", error);
      }
    } else {
      console.log("Connect to wallet and Mumbai Testnet first");
    }
  };

  const calculatePasswordStrength = () => {
    if (totalPasswords === 0) return 0;
    return (securePasswords / totalPasswords) * 100;
  };

  const updatePasswordStrengthColor = (strength) => {
    if (strength >= 70) {
      setPasswordStrengthColor("#4CAF50");
    } else if (strength >= 40) {
      setPasswordStrengthColor("#FFEB3B");
    } else {
      setPasswordStrengthColor("#F44336");
    }
  };

  return (
    <div className="password-analytics-container">
        
        <p className="password-health-score-text"><b>Password Health Score:</b></p>
       
      
      <div className="password-meter-container mt-4">
        <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar
            value={passwordStrength}
            text={`${passwordStrength.toFixed(0)}%`}
            styles={{
              root: {},
              path: {
                stroke: passwordStrengthColor,
                strokeLinecap: 'butt',
                transition: 'stroke-dashoffset 0.5s ease 0s',
              },
              trail: {
                stroke: '#d6d6d6',
              },
              text: {
                fill: passwordStrengthColor,
                fontSize: '16px',
              },
              background: {
                fill: '#3e98c7',
              },
            }}
          />
        </div>
      </div>
      <div className="analytics mb-5">
        <p>Total : {totalPasswords}</p>
        <p>Secure : {securePasswords}</p>
        <p>Weak : {unsafePasswords}</p>
      </div>

      <p><b>Note:</b> Securium is a Secure Blockchain Password Manager, where only you have access to your own data. </p>
    </div>
  );
}

export default PasswordAnalytics;
