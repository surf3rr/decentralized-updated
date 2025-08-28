# 🌐 Decentralized Freelance Platform

A trustless freelance marketplace built on the Stacks blockchain, enabling secure project creation, management, and payments without intermediaries.

![Decentralized Freelance](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Stacks](https://img.shields.io/badge/Blockchain-Stacks-purple?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **🔐 Trustless Transactions**: All payments and project management handled by smart contracts
- **💳 Leather Wallet Integration**: Seamless connection with Stacks ecosystem
- **📊 Project Management**: Create, track, and manage freelance projects
- **💰 Escrow System**: Secure payment holding until project completion
- **🔍 Project Discovery**: Browse and filter available projects
- **⚡ Real-time Updates**: Live project status tracking
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Live Demo

🌟 **[View Live Demo](https://surf3rr.github.io/decentralized-freelance/)**

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Stacks         │    │   Smart         │
│   (React/TS)    │◄──►│   Blockchain     │◄──►│   Contracts     │
│                 │    │                  │    │   (Clarity)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Stacks Blockchain
- **Wallet**: Leather Wallet Integration
- **Smart Contracts**: Clarity Language
- **Build Tool**: Vite
- **Deployment**: GitHub Pages
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Leather Wallet browser extension
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/surf3rr/decentralized-freelance.git
   cd decentralized-freelance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_NETWORK=testnet
VITE_CONTRACT_ADDRESS=your_contract_address
VITE_CONTRACT_NAME=freelance-escrow
```

### Smart Contract Deployment

The platform requires a Clarity smart contract to be deployed on Stacks. Update the contract address in `src/lib/stacks.ts`:

```typescript
const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
const CONTRACT_NAME = 'freelance-escrow';
```

## 🎯 Usage Guide

### For Clients

1. **Connect Wallet**: Click "Connect Leather Wallet" to authenticate
2. **Create Project**: Fill out project details including:
   - Project title and description
   - Budget in STX
   - Deadline
   - Freelancer address
3. **Monitor Progress**: Track project status and milestones
4. **Review & Pay**: Approve completed work to release funds

### For Freelancers

1. **Connect Wallet**: Authenticate with your Leather wallet
2. **Browse Projects**: Find projects matching your skills
3. **Accept Projects**: Commit to projects you want to work on
4. **Submit Work**: Mark projects as completed when finished
5. **Get Paid**: Receive STX payments automatically upon approval

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Smart Contract Functions

- `create-project` - Create a new freelance project
- `accept-project` - Accept a project as a freelancer
- `submit-work` - Submit completed work
- `approve-work` - Approve work and release payment
- `dispute-project` - Initiate dispute resolution

## 🎨 UI Components

- **WalletConnection**: Handles Leather wallet integration
- **ProjectCreator**: Form for creating new projects
- **ProjectList**: Displays and filters projects
- **ProjectCard**: Individual project display with actions

## 🚀 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Build the project
   - Deploy to GitHub Pages
   - Make it available at `https://surf3rr.github.io/decentralized-freelance/`

### Manual Deployment

```bash
npm run build
npm run preview
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 🐛 Known Issues

- Smart contract deployment required for full functionality
- Testnet STX required for transactions
- Leather wallet must be installed and configured

## 📚 Resources

- [Stacks Documentation](https://docs.stacks.co/)
- [Clarity Language](https://clarity-lang.org/)
- [Leather Wallet](https://leather.io/)
- [React Documentation](https://reactjs.org/)

## 🔮 Roadmap

- [ ] Multi-signature escrow contracts
- [ ] Reputation system for freelancers
- [ ] Dispute resolution mechanism
- [ ] Mobile app development
- [ ] Integration with other wallets
- [ ] Advanced project filtering and search
- [ ] Real-time messaging system

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stacks Foundation for blockchain infrastructure
- React team for the amazing framework
- Tailwind CSS for styling system
- Leather Wallet for seamless integration

## 📞 Support

- 📧 Email: support@decentralizedfreelance.com
- 💬 Discord: [Join our community](https://discord.gg/decentralized-freelance)
- 🐦 Twitter: [@DecFreelance](https://twitter.com/DecFreelance)

---

**Built with ❤️ by the Decentralized Freelance Team**

*Making freelancing trustless, one project at a time.*
