// Contract Configuration
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
export const CONTRACT_CONFIG = Object.freeze({
  ADDRESS: CONTRACT_ADDRESS && /^0x[a-fA-F0-9]{40}$/.test(CONTRACT_ADDRESS)
    ? CONTRACT_ADDRESS
    : "0xd9145CCE52D386f254917e481eB44e9943F39138",
  DEFAULT_GAS_LIMIT: 200000,
  GAS_BUFFER_PERCENTAGE: 0.2
});

// Network Configuration
const DEFAULT_NETWORK_ID = process.env.REACT_APP_DEFAULT_NETWORK_ID;
export const NETWORK_CONFIG = Object.freeze({
  SUPPORTED_NETWORKS: [1, 5, 11155111, 1337],
  DEFAULT_NETWORK: DEFAULT_NETWORK_ID && !isNaN(DEFAULT_NETWORK_ID)
    ? parseInt(DEFAULT_NETWORK_ID)
    : 11155111
});

// IPFS Configuration
const IPFS_GATEWAY = process.env.REACT_APP_IPFS_GATEWAY;
export const IPFS_CONFIG = Object.freeze({
  GATEWAY: IPFS_GATEWAY && /^https?:\/\/.+/.test(IPFS_GATEWAY)
    ? IPFS_GATEWAY
    : "https://ipfs.io/ipfs/",
  HASH_REGEX: /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/i
});

// Application Configuration
export const APP_CONFIG = Object.freeze({
  NAME: process.env.REACT_APP_APP_NAME || "Decentralized Identity Verification",
  VERSION: process.env.REACT_APP_VERSION || "1.0.0",
  ENVIRONMENT: process.env.NODE_ENV || "development"
});

// UI Constants
export const UI_CONFIG = Object.freeze({
  NOTIFICATION_DURATION: 5000,
  LOADING_TIMEOUT: 30000,
  MAX_NAME_LENGTH: 50,
  MIN_NAME_LENGTH: 2
});

// Error Messages
export const ERROR_MESSAGES = Object.freeze({
  NO_METAMASK: "Please install MetaMask to use this application.",
  NO_ACCOUNTS: "No accounts found. Please connect your wallet.",
  NETWORK_NOT_SUPPORTED: "This network is not supported. Please switch to a supported network.",
  CONTRACT_NOT_FOUND: "Smart contract not found on this network.",
  TRANSACTION_REJECTED: "Transaction was rejected by user.",
  INSUFFICIENT_FUNDS: "Insufficient funds for transaction.",
  ALREADY_REGISTERED: "Identity already registered for this address.",
  INVALID_IPFS_HASH: "Invalid IPFS hash format.",
  NETWORK_ERROR: "Network connection error. Please try again."
});

// Success Messages
export const SUCCESS_MESSAGES = Object.freeze({
  IDENTITY_REGISTERED: "Identity registered successfully!",
  IDENTITY_RETRIEVED: "Identity retrieved successfully!",
  WALLET_CONNECTED: "Wallet connected successfully!"
});

// Utility functions for config access
export function getContractAddress() {
  return CONTRACT_CONFIG.ADDRESS;
}

export function getIpfsGateway() {
  return IPFS_CONFIG.GATEWAY;
}
