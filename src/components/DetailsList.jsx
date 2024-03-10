import React, { useState, useEffect, useContext } from "react";
import StoreContext from "../store/store.js";
import Detail from "./SubTask/Details.jsx"; // Update this component to display individual details
import CryptoJS from "crypto-js"; 


function DetailsList() {
  const { Walletstore, setWalletStore } = useContext(StoreContext);
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDetails = async () => {
    if (Walletstore.Connected && Walletstore.NetworkID === 80001) {
      const contract = Walletstore.contract;
      try {
        // Call the contract's getDetails function
        const fetchedDetails = await contract.getDetails();

        // Decrypt the fetched details
        const decryptedDetails = fetchedDetails.map(detail => ({
          appName: CryptoJS.AES.decrypt(detail.appName, "secret key").toString(CryptoJS.enc.Utf8),
          username: CryptoJS.AES.decrypt(detail.username, "secret key").toString(CryptoJS.enc.Utf8),
          password: CryptoJS.AES.decrypt(detail.password, "secret key").toString(CryptoJS.enc.Utf8),
          link: CryptoJS.AES.decrypt(detail.link, "secret key").toString(CryptoJS.enc.Utf8)
        }));

        // Update the details state with the decrypted data
        setDetails(decryptedDetails);
      } catch (error) {
        console.error("Error getting details: ", error);
      }
    } else {
      console.log("Connect to wallet and Mumbai Testnet first");
    }
  };

  const deleteAllDetails = async () => {
    if (Walletstore.Connected && Walletstore.NetworkID === 80001) {
      setIsLoading(true);
      const contract = Walletstore.contract;
      try {
        const deletionTx = await contract.deleteAllDetails();
        await deletionTx.wait();
        setIsLoading(false);

        // After deleting details, refresh the details list
        getDetails();
      } catch (error) {
        console.error("Error deleting all details: ", error);
        setIsLoading(false);
      }
    } else {
      console.log("Connect to wallet and Mumbai Testnet first");
    }
  };

  useEffect(() => {
    // Check if the user is connected to the wallet and the Testnet
    if (Walletstore.Connected && Walletstore.NetworkID === 80001) {
      getDetails();
    }
  }, [Walletstore]); // Add Walletstore as a dependency

  return (
    
    <div className="relative">
      <div className="main-top">
          <h1>Vault</h1>
        </div>
      {details.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-50">
          {details.map((detail, index) => (
            <Detail key={index} details={detail} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl">No Details Found</p>
      )}
      <div className=" flex justify-between p-4">
        {details.length > 0 && (
          isLoading ? (
            <button disabled className="py-2 px-4 border bg-blue-700 text-white">
              Deleting please wait...
            </button>
          ) : (
            <button onClick={deleteAllDetails} className="py-2 px-4 border bg-blue-600 text-white hover:bg-red-400 duration-200">
              Delete All Details
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default DetailsList;
