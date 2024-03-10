# Getting Started with Securium Dapp
Technology Stack used: 
- Vite JS: Used for fast and efficient development of the Securium Dapp.
- Tailwind CSS: Employed for styling and UI design in the Securium Dapp.
- Solidity: Utilized to write smart contracts for the Securium Dapp's backend logic.
- Axios: Utilized for get and post API calls within the Frontend to communicate with the AI
- Ethers.js: Integrated for interaction with the Ethereum blockchain in the Securium Dapp.
- Hardhat: Deployed as the development environment for testing and deploying smart contracts in the Securium Dapp.
- Alchemy: Chosen as the blockchain infrastructure provider for seamless integration with the Securium Dapp.
- CryptoJS: Integrated for AES encryption to ensure secure storage of sensitive data in the Securium Dapp.
- Netlify: Utilized as the hosting platform for deploying the Securium Dapp and making it accessible online.


### `For Starting the project`
## Tools and App needed in order to successful start the project 

Make sure you have :
- Vs code 
- Node js: v16.20.0 (IMPORTANT!)
- Git
- Metamask plugin installed and setup (IMPORTANT!)
  
## Set up the project

Enter in command prompt and type:

```
git clone https://github.com/Tanveer-7/Securium
```

Then after cloning in the same place type:

```
cd Securium
```

You will type this to install all packages: 
```
npm i
```

Now type the below code to open the project in vs code:
```
code .
```

## For Starting the project
```
npm run dev
```
Runs the app in the development mode.\
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to view it in your browser.



## Use on Pc and Mobile
What if a user wants to use on mobile or tablet :

The user will need to make sure to install and setup metamask from playstore or appstore.

Then enter in the app where there is the browser, enter our url to start using:
```
https://securiumx.netlify.app/
```
What if a user wants to use on a laptop or pc :

The user will need to make sure to install and setup metamask plugin on there browser.

Then enter in the browser with the url to start using:
```
https://securiumx.netlify.app/
```


## Private Smart Contract Deployment

To install the packages:
```
npm install @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
```
Next, create a .env file in the root directory of your project and add your Alchemy API key and private key( MetaMask private key ):
```
ALCHEMY_API_KEY=your_alchemy_api_key
PRIVATE_KEY=your_private_key
```

Then, update your Hardhat configuration file (hardhat.config.js) to include Alchemy as a network:
```
require("@nomiclabs/hardhat-waffle");
require('dotenv').config(); // Load environment variables from .env file

const { ALCHEMY_API_KEY, PRIVATE_KEY } = process.env; // Access environment variables

module.exports = {
  solidity: "0.8.18",
  networks: {
    // Add Alchemy network configuration
    alchemy: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`]
    }
  }
};

```

To create the Cache folder and the artifacts:
```
npx hardhat compile
```

To deploy the smart contract on the mumbai network:
```
npx hardhat run scripts/deploy.js --network mumbai
```

Then copy the deployed value and paste it into contract.js:

```
const contractAddress = "your_alchemy_api_key_inside"; 
```

## Deploy the Project Live 

Create or Fork this repository on Github then use Netlify to deploy your own project or you can use your preferred one. 
