# 🌐 DecentralizedFreelance Platform

<div align="center">

![DecentralizedFreelance](https://img.shields.io/badge/DecentralizedFreelance-v2.0.0-orange?style=for-the-badge&logo=blockchain&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Stacks](https://img.shields.io/badge/Stacks-Blockchain-5546ff?style=for-the-badge&logo=bitcoin&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-ff0055?style=for-the-badge&logo=framer&logoColor=white)

**A modern, animated, trustless freelance marketplace with glassmorphism UI and secure escrow payments**

[🚀 Live Demo](#-demo) • [📋 Features](#-features) • [🛠️ Installation](#️-installation) • [📖 Usage](#-usage) • [🤝 Contributing](#-contributing)

</div>

---

## 📋 Features

### 🔐 **Blockchain-Powered Security**
- **Smart Contract Escrow**: Payments held securely until work completion
- **Trustless Transactions**: No intermediaries required
- **Leather Wallet Integration**: Seamless Stacks blockchain connectivity
- **Transparent Payments**: All transactions recorded on-chain

### 💼 **Professional Marketplace**
- **Verified Freelancers**: 4 curated professionals across multiple tech stacks
- **Project Management**: Complete project lifecycle management
- **Real-time Updates**: Live project status tracking
- **Quality Assurance**: Built-in dispute resolution system

### 🎨 **Modern User Experience**
- **Dark Theme Interface**: Professional glassmorphism design
- **Buttery Smooth Animations**: Powered by Framer Motion
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Intuitive Navigation**: User-friendly interface design

### 💰 **Advanced Payment System**
- **Secure Escrow**: Money held safely until project completion
- **Two-Step Confirmation**: Client approval process for payments
- **Dispute Resolution**: Fair conflict resolution mechanism
- **Automatic Releases**: Smart contract-based payment automation

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

### **Frontend**
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first styling framework
- **Lucide React** - Beautiful icon library
- **Vite** - Lightning-fast build tool

### **Blockchain**
- **Stacks Blockchain** - Bitcoin-secured smart contracts
- **Clarity** - Smart contract programming language
- **Leather Wallet** - Stacks ecosystem wallet integration
- **@stacks/connect** - Wallet connection library
- **@stacks/transactions** - Transaction handling

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

---

## 👥 Verified Freelancers

Our platform features carefully vetted professionals across multiple disciplines:

### **👨‍💻 Full Stack Development**
- **Alex Chen** - React, TypeScript, Node.js specialist
- Modern web applications, Web3 integration, DeFi protocols
- **4.9/5 rating** • **127 completed projects**

### **👩‍🎨 UI/UX Design**
- **Sarah Miller** - Figma, Prototyping, Design Systems expert
- Mobile design, user research, design system creation
- **4.8/5 rating** • **89 completed projects**

### **👨‍💼 Blockchain Development**
- **Marcus Johnson** - Solidity, Clarity, Smart Contract auditing
- DeFi protocols, security audits, blockchain architecture
- **4.7/5 rating** • **45 completed projects**

### **👩‍💻 Mobile Development**
- **Emma Davis** - React Native, iOS, Android specialist
- Cross-platform apps, app store optimization, native development
- **4.9/5 rating** • **73 completed projects**

---

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
