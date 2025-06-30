import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import IdentityVerificationContract from "./contracts/IdentityVerification.json";
import { isValidIPFSHash, validateName, sanitizeInput } from "./utils/validation";
import { 
  isMetaMaskInstalled, 
  formatAddress, 
  getNetworkInfo, 
  estimateGasWithBuffer,
  handleWeb3Error 
} from "./utils/web3";
import "./App.css";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || "0xd9145CCE52D386f254917e481eB44e9943F39138";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [name, setName] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [identityData, setIdentityData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [networkInfo, setNetworkInfo] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      await loadWeb3();
      await loadBlockchainData();
    } catch (error) {
      console.error("Failed to initialize app:", error);
      setError("Failed to initialize application. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadWeb3 = async () => {
    try {
      if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is required. Please install MetaMask to continue.");
      }

      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return web3Instance;
    } catch (error) {
      console.error("Web3 connection error:", error);
      setError(handleWeb3Error(error));
      throw error;
    }
  };

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      setAccount("");
      setContract(null);
      setError("Please connect your MetaMask wallet.");
    } else {
      setAccount(accounts[0]);
      setError("");
    }
  }, []);

  const handleChainChanged = useCallback(() => {
    window.location.reload();
  }, []);

  const loadBlockchainData = async () => {
    try {
      if (!web3) return;
      
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        throw new Error("No accounts found. Please connect your wallet.");
      }
      
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkInfo = getNetworkInfo(networkId);
      setNetworkInfo({
        id: networkId,
        name: networkInfo.name
      });

      const contractInstance = new web3.eth.Contract(IdentityVerificationContract.abi, CONTRACT_ADDRESS);
      
      try {
        await contractInstance.methods.getIdentity(accounts[0]).call();
        setContract(contractInstance);
        setError("");
      } catch (contractError) {
        console.error("Contract interaction failed:", contractError);
        setError("Smart contract not accessible. Please ensure you're on the correct network.");
      }
      
    } catch (error) {
      console.error("Blockchain data loading error:", error);
      setError(error.message);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error;
    }
    
    if (!isValidIPFSHash(ipfsHash)) {
      errors.ipfsHash = "Invalid IPFS hash format";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const registerIdentity = async () => {
    try {
      if (!validateForm()) return;

      if (!contract || !account) {
        setError("Please connect your wallet and ensure the contract is loaded.");
        return;
      }

      setLoading(true);
      setError("");
      setSuccess("");

      const trimmedName = sanitizeInput(name);
      const trimmedHash = sanitizeInput(ipfsHash);

      const gasLimit = await estimateGasWithBuffer(
        contract.methods.registerIdentity(trimmedName, trimmedHash),
        { from: account }
      );

      const tx = await contract.methods
        .registerIdentity(trimmedName, trimmedHash)
        .send({ 
          from: account,
          gas: gasLimit
        });

      setSuccess(`Identity registered successfully! Transaction: ${tx.transactionHash}`);
      setName("");
      setIpfsHash("");
      setFormErrors({});
      
      setTimeout(() => getIdentity(), 2000);
      
    } catch (error) {
      console.error("Registration error:", error);
      setError(handleWeb3Error(error));
    } finally {
      setLoading(false);
    }
  };

  const getIdentity = async () => {
    try {
      if (!contract || !account) {
        setError("Please connect your wallet and ensure the contract is loaded.");
        return;
      }

      setLoading(true);
      setError("");

      const result = await contract.methods.getIdentity(account).call();
      
      if (!result[0] && !result[1]) {
        setIdentityData({});
        setError("No identity found for this address.");
      } else {
        setIdentityData({ 
          name: result[0], 
          ipfsHash: result[1] 
        });
        setSuccess("Identity retrieved successfully!");
      }
      
    } catch (error) {
      console.error("Get identity error:", error);
      setError(handleWeb3Error(error));
      setIdentityData({});
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError("");
      await loadWeb3();
      await loadBlockchainData();
    } catch (error) {
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  return (
    <div className="App">
      <header className="header">
        <a
          href="https://github.com/abhigarg48/Decentralized-Identity-Verification"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <i className="fab fa-github"></i> View on GitHub
        </a>
      </header>

      <div className="container">
        <h2>Decentralized Identity Verification</h2>
        
        {networkInfo.id && (
          <div className="network-info">
            <p><strong>Network:</strong> {networkInfo.name}</p>
          </div>
        )}

        {!account ? (
          <div className="connection-section">
            <p className="warning">Connect your wallet to continue</p>
            <button 
              onClick={connectWallet} 
              disabled={isConnecting}
              className="connect-button"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>
        ) : (
          <div className="account-info">
            <p><strong>Connected Account:</strong></p>
            <p className="account-address">{formatAddress(account)}</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={clearMessages} className="clear-button">×</button>
          </div>
        )}

        {success && (
          <div className="success-message">
            <p>{success}</p>
            <button onClick={clearMessages} className="clear-button">×</button>
          </div>
        )}

        {account && contract && (
          <div className="form-section">
            <h3>Register Identity</h3>
            
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (formErrors.name) {
                    setFormErrors(prev => ({ ...prev, name: "" }));
                  }
                }}
                className={formErrors.name ? "error" : ""}
                maxLength="50"
              />
              {formErrors.name && <span className="field-error">{formErrors.name}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Enter IPFS Hash (QmX...)"
                value={ipfsHash}
                onChange={(e) => {
                  setIpfsHash(e.target.value);
                  if (formErrors.ipfsHash) {
                    setFormErrors(prev => ({ ...prev, ipfsHash: "" }));
                  }
                }}
                className={formErrors.ipfsHash ? "error" : ""}
              />
              {formErrors.ipfsHash && <span className="field-error">{formErrors.ipfsHash}</span>}
            </div>

            <div className="button-group">
              <button 
                onClick={registerIdentity} 
                disabled={loading || !name.trim() || !ipfsHash.trim()}
                className="primary-button"
              >
                {loading ? "Processing..." : "Register Identity"}
              </button>
              
              <button 
                onClick={getIdentity} 
                disabled={loading}
                className="secondary-button"
              >
                {loading ? "Loading..." : "Get Identity"}
              </button>
            </div>
          </div>
        )}

        {identityData.name && (
          <div className="identity-info">
            <h3>Identity Information</h3>
            <div className="identity-card">
              <p><strong>Name:</strong> {identityData.name}</p>
              <p><strong>IPFS Hash:</strong></p>
              <div className="ipfs-link-container">
                <code className="ipfs-hash">{identityData.ipfsHash}</code>
                <a
                  href={`https://ipfs.io/ipfs/${identityData.ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ipfs-link"
                >
                  View on IPFS
                </a>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Processing...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
