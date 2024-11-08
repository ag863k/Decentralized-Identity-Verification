import React, { useState, useEffect } from "react";
import Web3 from "web3";
import IdentityVerification from "./contracts/IdentityVerification.json"; // Import the ABI JSON file
import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [identityData, setIdentityData] = useState({});

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  // Connect to Web3
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable(); // Request account access if needed
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider); // Legacy dapp browsers
    } else {
      alert("Please install MetaMask to use this application.");
    }
  };

  // Load contract data
  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();
    const networkData = IdentityVerification.networks[networkId];

    if (networkData) {
      const abi = IdentityVerification.abi;
      const contractAddress = 0xd9145CCE52D386f254917e481eB44e9943F39138; // Replace with the actual contract address from Remix
      const contractInstance = new web3.eth.Contract(abi, contractAddress);
      setContract(contractInstance);
    } else {
      alert("Smart contract not deployed to detected network.");
    }
  };

  // Register identity
  const registerIdentity = async () => {
    if (contract) {
      await contract.methods
        .registerIdentity(name, ipfsHash)
        .send({ from: account });
      alert("Identity registered!");
      setName("");
      setIpfsHash("");
    }
  };

  // Get identity data
  const getIdentity = async () => {
    if (contract) {
      const result = await contract.methods.getIdentity(account).call();
      setIdentityData({ name: result[0], ipfsHash: result[1] });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Decentralized Identity Verification</h2>
        <p>Your Account: {account}</p>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter IPFS Hash"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
        />
        <button onClick={registerIdentity}>Register Identity</button>
        <button onClick={getIdentity}>Get Identity</button>

        {identityData.name && (
          <div className="identity-info">
            <p><strong>Name:</strong> {identityData.name}</p>
            <p>
              <strong>IPFS Hash:</strong>{" "}
              <a
                href={`https://ipfs.io/ipfs/${identityData.ipfsHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {identityData.ipfsHash}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
