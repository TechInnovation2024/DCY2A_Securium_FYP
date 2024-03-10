import React, { useState, useEffect } from 'react';
import './PasswordGenerator.css';
import { FaRedo } from 'react-icons/fa';
import { MdContentCopy } from 'react-icons/md';

const PasswordGenerator = () => {
  const [passwords, setPasswords] = useState([]);
  const [tooltipText, setTooltipText] = useState('Copy to Clipboard');

  const generateSecurePassword = () => {
    const passwordLength = 12;
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+{}|:<>?-=[];,./';
    let newPassword = '';

    newPassword += getRandomChar(lowercaseChars);
    newPassword += getRandomChar(uppercaseChars);
    newPassword += getRandomChar(digitChars);
    newPassword += getRandomChar(specialChars);

    while (newPassword.length < passwordLength) {
      const randomGroup = Math.floor(Math.random() * 4);
      switch (randomGroup) {
        case 0:
          newPassword += getRandomChar(lowercaseChars);
          break;
        case 1:
          newPassword += getRandomChar(uppercaseChars);
          break;
        case 2:
          newPassword += getRandomChar(digitChars);
          break;
        case 3:
          newPassword += getRandomChar(specialChars);
          break;
      }
    }

    newPassword = shuffleString(newPassword);

    return newPassword;
  };

  const getRandomChar = (charset) => {
    const randomIndex = Math.floor(Math.random() * charset.length);
    return charset.charAt(randomIndex);
  };

  const shuffleString = (str) => {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  };

  const generatePasswords = () => {
    const numPasswords = 6;
    const newPasswords = [];
    for (let i = 0; i < numPasswords; i++) {
      const newPassword = generateSecurePassword();
      newPasswords.push(newPassword);
    }
    setPasswords(newPasswords);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setTooltipText('Copied!');
    setTimeout(() => {
      setTooltipText('Copy to Clipboard');
    }, 2000);
  };

  useEffect(() => {
    generatePasswords();
  }, []);

  return (
    <div>
      <div className="generate-password-text">
        <span>
          <b>Secure Password Generator</b>
        </span>
        <span className="reload-button" onClick={generatePasswords}>
          <FaRedo />
        </span>
      </div>
      <div className="passwords-container">
        {passwords.map((password, index) => (
          <div key={index} className="password-box">
            <span className="password-text">{password}</span>
            <span
              className="copy-icon"
              onClick={() => copyToClipboard(password)}
              title={tooltipText}
            >
              <MdContentCopy />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordGenerator;
