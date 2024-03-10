require("@nomiclabs/hardhat-waffle");
require('dotenv').config(); // Make sure to require dotenv

const { ALCHEMY_API_KEY, PRIVATE_KEY } = process.env; // Use environment variables

module.exports = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${PRIVATE_KEY}`] // Correctly formatted as an array
    }
  }
};
