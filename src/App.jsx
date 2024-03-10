import StoreContext from "./store/store.js";
import Home from "./pages/Home/Home.jsx";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx"; // Import the Sidebar component
import Dashboard from "./pages/Dashboard.jsx";

import Watch from "./pages/Watch.jsx";
import ChatBot from "./pages/Home/ChatBot.jsx";
import DetailsList from "./components/DetailsList.jsx";

function App() {
  const [Walletstore, setWalletStore] = useState({
    Connected: false,
    WalletAddress: "",
    Balance: 0,
    Network: "",
    NetworkID: 0,
    WalletProvider: "",
    signer: null,
    contract: null,
    contractAddress: "",
    contractABI: "",
  });

  // Additional logic for wallet connection and updates can be implemented here

  return (
    <>
      <StoreContext.Provider value={{ Walletstore, setWalletStore }}>
        {Walletstore.Connected ? (
          <BrowserRouter>
            <Sidebar>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vault" element={<DetailsList />} />
                <Route path="/assistant" element={<ChatBot />} />
                <Route path="/watch" element={<Watch />} />
                
                
              </Routes>
            </Sidebar>
          </BrowserRouter>
        ) : (
          <Home />
        )}
      </StoreContext.Provider>
    </>
  );
}

export default App;
