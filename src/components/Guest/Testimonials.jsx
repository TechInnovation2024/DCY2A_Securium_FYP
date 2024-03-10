import React from 'react'

import './Testimonials.css'

const Testimonials = () => {
    return (
        <div className='testimonials' id='testimonials'>
             <div className="container" >
            <div>
            <div className='col-23' >
           <h2>How it work it 3 Step</h2>
        </div>

            
            <div className="box-container">
                <div className="box">
                    <img src="image/icon-1.png" alt="" />
                    <h3> Install MetaMask</h3>
                    <p>Go to metamask.io, add the extension to your browser, set up a new MetaMask account or import an existing one, and your MetaMask wallet is now ready for action!</p>
                    <a href="https://metamask.io/" className="btn" >Install</a>
                </div>
                <div className="box">
                    <img src="image/icon-2.png" alt="" />
                    <h3>Connect to Mumbai Network</h3>
                    <p>Visit chainlist.org, select the Mumbai Network, and connect MetaMask.Connect MetaMask: Click "Connect Wallet," choose MetaMask, and confirm the connection to the Mumbai Test Network.</p>
                    <a href="https://chainlist.org/chain/80001" className="btn">Connect</a>
                </div>
                <div className="box">
                    <img src="image/icon-3.png" alt="" />
                    <h3>Claim Free Credits</h3>
                    <p>- Visit Mumbai Faucet: Go to mumbaifaucet.com.<br></br>- Authenticate: Connect your MetaMask wallet.<br></br>- Claim Credits: Follow the instructions to claim your free credits.</p>
                    <a href="https://www.alchemy.com/faucets/polygon-mumbai" className="btn">Claim Free Credits</a>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Testimonials
