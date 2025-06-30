export const NETWORKS = {
  1: {
    name: "Ethereum Mainnet",
    symbol: "ETH",
    explorerUrl: "https://etherscan.io"
  },
  5: {
    name: "Goerli Testnet",
    symbol: "ETH",
    explorerUrl: "https://goerli.etherscan.io"
  },
  11155111: {
    name: "Sepolia Testnet",
    symbol: "ETH",
    explorerUrl: "https://sepolia.etherscan.io"
  },
  1337: {
    name: "Local Development",
    symbol: "ETH",
    explorerUrl: "http://localhost"
  }
};

export const isMetaMaskInstalled = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
};

export const formatAddress = (address, startLength = 6, endLength = 4) => {
  if (!address || address.length < startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const getNetworkInfo = (networkId) => {
  return NETWORKS[networkId] || {
    name: `Unknown Network (${networkId})`,
    symbol: "ETH",
    explorerUrl: ""
  };
};

export const estimateGasWithBuffer = async (contractMethod, options, buffer = 0.2) => {
  try {
    const gasEstimate = await contractMethod.estimateGas(options);
    return Math.floor(gasEstimate * (1 + buffer));
  } catch (error) {
    console.warn('Gas estimation failed, using default gas limit');
    return 200000;
  }
};

export const handleWeb3Error = (error) => {
  if (!error) return 'Unknown error occurred';
  
  const message = error.message || error.toString();
  
  if (error.code === 4001 || message.includes('User denied')) {
    return 'Transaction was rejected by user';
  }
  
  if (message.includes('insufficient funds')) {
    return 'Insufficient funds for transaction';
  }
  
  if (message.includes('gas required exceeds allowance')) {
    return 'Transaction requires more gas than allowed';
  }
  
  if (message.includes('nonce too low')) {
    return 'Transaction nonce too low. Please try again';
  }
  
  if (message.includes('replacement transaction underpriced')) {
    return 'Transaction fee too low. Please increase gas price';
  }
  
  if (message.includes('revert')) {
    return 'Transaction failed. You may have already registered or contract conditions not met';
  }
  
  if (message.includes('network')) {
    return 'Network connection error. Please check your connection';
  }
  
  return message.length > 100 ? `${message.substring(0, 100)}...` : message;
};
