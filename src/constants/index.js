// constants/index.js - Application constants

// Contract Configuration
export const CONTRACT_CONFIG = {
  ADDRESS: process.env.REACT_APP_CONTRACT_ADDRESS || "0xd9145CCE52D386f254917e481eB44e9943F39138",
  DEFAULT_GAS_LIMIT: 200000,
  GAS_BUFFER_PERCENTAGE: 0.2
};

// Network Configuration
export const NETWORK_CONFIG = {
  SUPPORTED_NETWORKS: [1, 5, 11155111, 1337],
  DEFAULT_NETWORK: parseInt(process.env.REACT_APP_DEFAULT_NETWORK_ID) || 11155111
};

// IPFS Configuration
export const IPFS_CONFIG = {
  GATEWAY: process.env.REACT_APP_IPFS_GATEWAY || "https://ipfs.io/ipfs/",
  HASH_REGEX: /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/
};

// Application Configuration
export const APP_CONFIG = {
  NAME: process.env.REACT_APP_APP_NAME || "Decentralized Identity Verification",
  VERSION: process.env.REACT_APP_VERSION || "1.0.0",
  ENVIRONMENT: process.env.NODE_ENV || "development"
};

// UI Constants
export const UI_CONFIG = {
  NOTIFICATION_DURATION: 5000,
  LOADING_TIMEOUT: 30000,
  MAX_NAME_LENGTH: 50,
  MIN_NAME_LENGTH: 2
};

// Error Messages
export const ERROR_MESSAGES = {
  NO_METAMASK: "Please install MetaMask to use this application.",
  NO_ACCOUNTS: "No accounts found. Please connect your wallet.",
  NETWORK_NOT_SUPPORTED: "This network is not supported. Please switch to a supported network.",
  CONTRACT_NOT_FOUND: "Smart contract not found on this network.",
  TRANSACTION_REJECTED: "Transaction was rejected by user.",
  INSUFFICIENT_FUNDS: "Insufficient funds for transaction.",
  ALREADY_REGISTERED: "Identity already registered for this address.",
  INVALID_IPFS_HASH: "Invalid IPFS hash format.",
  NETWORK_ERROR: "Network connection error. Please try again."
};

// Success Messages
export const SUCCESS_MESSAGES = {
  IDENTITY_REGISTERED: "Identity registered successfully!",
  IDENTITY_RETRIEVED: "Identity retrieved successfully!",
  WALLET_CONNECTED: "Wallet connected successfully!"
};
