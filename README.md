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
* **Clean Wallet Address Display**: Wallet addresses are shown in a readable, copyable format
* **Accessibility**: Keyboard navigation and ARIA attributes for notifications and spinners

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

## Usage

- Connect your MetaMask wallet and select the correct Ethereum network.
- Enter your name and IPFS hash to register your identity.
- Wallet addresses are displayed in a clean, copyable format for easy sharing.
- Click "Get Identity" to retrieve your registered identity.
- All notifications and loading spinners are accessible and keyboard-friendly.

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
- Ensure your `.env.local` is configured for production.
- See [React deployment docs](https://create-react-app.dev/docs/deployment/) for more options.

## Troubleshooting

- **MetaMask not detected**: Make sure MetaMask is installed and enabled in your browser.
- **Wrong network**: Switch MetaMask to a supported Ethereum network (Mainnet, Goerli, Sepolia, or Local).
- **Contract errors**: Verify your contract address and ABI match the deployed contract.
- **IPFS hash issues**: Ensure your IPFS hash is valid and accessible via the configured gateway.

## Accessibility

- All interactive elements are keyboard accessible.
- Notifications and spinners use ARIA attributes for screen readers.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Documentation & Support

- [React Documentation](https://react.dev/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [MetaMask Support](https://metamask.io/faqs/)
- For issues, open a ticket on [GitHub Issues](https://github.com/your-username/Decentralized-Identity-Verification/issues)

## License

MIT License - see [LICENSE](LICENSE) file for details.
