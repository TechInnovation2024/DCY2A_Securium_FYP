import React, { useContext, useState, useEffect } from 'react';
import './Hero.css';
import StoreContext from "../../store/store.js";
import Sidebar from '../Sidebar';
import Guest from '../../pages/Guest.jsx';
import { ethers } from "ethers";
import { contractAddress, abi } from "../../utils/contract.js";

const Hero = () => {
    const { Walletstore, setWalletStore } = useContext(StoreContext);
    const [loader, setLoader] = useState(false);

    const connectWallet = async () => {
        try {
            setLoader(true);
            if (typeof window.ethereum !== "undefined") {
                const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                const address = accounts[0];
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const network = await provider.getNetwork();
                const contract = new ethers.Contract(contractAddress, abi, signer);
                setWalletStore({
                    Connected: true,
                    WalletAddress: address, 
                    Network: network.name,
                    NetworkID: network.chainId,
                    WalletProvider: "Metamask",
                    signer,
                    contract,
                    contractAddress,
                    contractABI: abi,
                });
                localStorage.setItem("Connected", true);
            } else {
                alert("Please Install Metamask");
            }
            setLoader(false);
        } catch (error) {
            console.error("Connection error:", error);
            setLoader(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("Connected") === "true") {
            connectWallet();
        }
    }, []);

    return (
        
        <div className='hero'>
            <div className='content'>
                <p></p>
                <p>Welcome to Securium</p>
                <p>Your Ultimate Password Guardian <br></br>Powered by Blockchain Technology</p>
                {Walletstore.Connected ? (
                    <Sidebar />
                ) : (
                    <>
                        <button onClick={connectWallet} className='button'>Connect Wallet</button>
                        {loader }
                    </>
                )}
            </div>
        </div>
    );
};

export default Hero;
