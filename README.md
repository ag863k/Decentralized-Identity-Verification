# Decentralized Identity Verification

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

Production-ready decentralized identity verification platform built with React and Ethereum blockchain technology.

## Features

* **Self-Sovereign Identity**: Users control their own identity data
* **Blockchain Security**: Immutable identity records on Ethereum
* **IPFS Storage**: Decentralized document storage
* **MetaMask Integration**: Secure wallet connectivity
* **Mobile Responsive**: Works on all devices

## Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- MetaMask browser extension

### Installation

1. **Clone and install**
   ```bash
   git clone https://github.com/your-username/Decentralized-Identity-Verification.git
   cd Decentralized-Identity-Verification
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   Update `.env.local` with your contract address:
   ```env
   REACT_APP_CONTRACT_ADDRESS=0xYourContractAddress
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## Technology Stack

- **Frontend**: React 18, Web3.js
- **Blockchain**: Ethereum, Solidity
- **Storage**: IPFS
- **Wallet**: MetaMask

## Production Deployment

```bash
npm run build
npm run deploy
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - see [LICENSE](LICENSE) file for details.
