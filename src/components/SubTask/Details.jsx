import React, { useState, useContext } from "react";
import StoreContext from "../../store/store.js";
import CryptoJS from "crypto-js";
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaCopy } from 'react-icons/fa';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import "./Details.css";

const secretKey = "secret key";

function Details({ details, index }) {
  const { Walletstore } = useContext(StoreContext);
  const [editMode, setEditMode] = useState(false);
  const [appName, setAppName] = useState(details.appName);
  const [username, setUsername] = useState(details.username);
  const [password, setPassword] = useState(details.password);
  const [link, setLink] = useState(details.link);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [initialState, setInitialState] = useState(null);

  const saveDetails = async () => {
    setIsLoading(true);
    try {
      const contract = Walletstore.contract;
      const encryptedAppName = CryptoJS.AES.encrypt(appName, secretKey).toString();
      const encryptedUsername = CryptoJS.AES.encrypt(username, secretKey).toString();
      const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
      const encryptedLink = CryptoJS.AES.encrypt(link, secretKey).toString();
      
      if (editMode) {
        // Update existing details
        await contract.updateDetails(index, encryptedAppName, encryptedUsername, encryptedPassword, encryptedLink);
      } else {
        // Add new details
        await contract.addDetails(encryptedAppName, encryptedUsername, encryptedPassword, encryptedLink);
      }
      setIsLoading(false);
      setEditMode(false);
      // Optionally, refresh details list here
    } catch (error) {
      console.error("Error saving details:", error);
      setIsLoading(false);
    }
  };

  const deleteDetails = async () => {
    setIsLoading(true);
    try {
      const contract = Walletstore.contract;
      await contract.deleteDetails(index);
      setIsLoading(false);
      // Optionally, refresh details list here
    } catch (error) {
      console.error("Error deleting details:", error);
      setIsLoading(false);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(password);
    // Optionally, provide a visual indication to the user that the password is copied
  };

  const cancelChanges = () => {
    setAppName(initialState.appName);
    setUsername(initialState.username);
    setPassword(initialState.password);
    setLink(initialState.link);
    setEditMode(false);
  };

  // Save initial state when entering edit mode
  const enterEditMode = () => {
    setInitialState({ appName, username, password, link });
    setEditMode(true);
  };

  return (
    <div className="details-box border border-white rounded-md p-4 mb-1">
      {editMode ? (
       <div class="flex flex-col  ">
       <div class="flex items-center mb-1.5">
         <label for="app-name" class="font-bold text-sm text-blue-950">App Name:</label>
         <input
           id="app-name"
           type="text"
           value={appName}
           onChange={(e) => setAppName(e.target.value)}
           placeholder="App Name"
           class="border rounded-md px-3 py-2 text-sm "
         />
       </div>
       <div class="flex items-center mb-1.5">
         <label for="username" class="mr-2 font-bold text-sm text-blue-950">Username:</label>
         <input
           id="username"
           type="text"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           placeholder="Username"
           class="border rounded-md px-3 py-2 text-sm"
         />
       </div>
       <div class="flex items-center mb-1.5">
         <label for="password" class="mr-2 font-bold text-sm text-blue-950">Password:</label>
         <input
           id="password"
           type={showPassword ? "text" : "password"}
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="Password"
           class="border rounded-md px-3 py-2  text-sm"
         />
       </div>
       <div class="flex items-center mb-1.5">
         <label for="link" class="mr-10 font-bold text-sm text-blue-950">Link:</label>
         <input
           id="link"
           type="text"
           value={link}
           onChange={(e) => setLink(e.target.value)}
           placeholder="Link"
           class="border rounded-md px-3 py-2 text-sm"
         />
       </div>
       {isLoading ? (
         <button disabled class="bg-gray-500 px-2 py-2 rounded-md text-white">Saving...</button>
       ) : (
         <div class="flex ">
           <button onClick={saveDetails} class="bg-green-400 px-3 py-2 rounded-md text-white mr-40 hover:bg-green-600 text-sm" >Save</button>
           <button onClick={cancelChanges} class="bg-red-500 px-2 py-2 rounded-md text-white hover:bg-red-600 text-sm">Cancel</button>
         </div>
       )}
     </div>
     
     
     
     
      ) : (
        <div>
          {/* Display fields in view mode */}
          <div className="mb-1">
            <p className="font-bold text-base text-blue-950">App Name:</p>
            <p className="text-sm">{appName}</p>
          </div>
          <div className="mb-1">
            <p className="font-bold text-base text-blue-950">Username:</p>
            <p className="text-sm">{username}</p>
          </div>
          <div className="mb-1">
            <p className="font-bold text-base text-blue-950">Password:</p>
            <div className="password-container flex items-center">
              <p className="text-sm">{showPassword ? password : "********"}</p>
              <div className="password-actions ml-2 flex">
                <Tooltip title={showPassword ? "Hide Password" : "Show Password"} position="top" arrow={true}>
                  {showPassword ? (
                    <FaEyeSlash onClick={handlePasswordVisibility} className="text-blue-600 cursor-pointer" />
                  ) : (
                    <FaEye onClick={handlePasswordVisibility} className="text-blue-950 cursor-pointer" />
                  )}
                </Tooltip>
                <Tooltip title="Copy Password" position="top" arrow={true}>
                  <FaCopy onClick={copyPasswordToClipboard} className="text-blue-950 cursor-pointer ml-2" />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="mb-1">
            <p className="font-bold text-base text-blue-950">Link:</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm font-light text-blue-500 ">{link}</a>
          </div>
          <div className="flex mt-2 ">
            <Tooltip title="Edit" position="top" arrow={true}>
              <FaEdit onClick={enterEditMode} className="text-green-500 cursor-pointer mr-60" />
            </Tooltip>
            <Tooltip title="Delete" position="top" arrow={true}>
              <FaTrash onClick={deleteDetails} className="text-red-500 cursor-pointer text-lg" />
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
