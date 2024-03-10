
const contractAddress = "0xA6a6c85EA4DeeACfaDE72D66f9f9dcbB6a3aC624"; // Replace with your actual contract address

const abi = [
  {
    inputs: [
      { internalType: "string", name: "_appName", type: "string" },
      { internalType: "string", name: "_username", type: "string" },
      { internalType: "string", name: "_password", type: "string" },
      { internalType: "string", name: "_link", type: "string" }
    ],
    name: "addDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getDetails",
    outputs: [
      {
        components: [
          { internalType: "string", name: "appName", type: "string" },
          { internalType: "string", name: "username", type: "string" },
          { internalType: "string", name: "password", type: "string" },
          { internalType: "string", name: "link", type: "string" }
        ],
        internalType: "struct PasswordManager.Details[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_detailsIndex", type: "uint256" },
      { internalType: "string", name: "_newAppName", type: "string" },
      { internalType: "string", name: "_newUsername", type: "string" },
      { internalType: "string", name: "_newPassword", type: "string" },
      { internalType: "string", name: "_newLink", type: "string" }
    ],
    name: "updateDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_detailsIndex", type: "uint256" }],
    name: "deleteDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "deleteAllDetails",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  // ... any other functions from your contract ...
];

export { contractAddress, abi };
