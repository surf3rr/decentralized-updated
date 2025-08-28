# Contributing to Decentralized Freelance Platform

Thank you for your interest in contributing to the Decentralized Freelance Platform! We welcome contributions from the community.

## 🤝 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/surf3rr/decentralized-freelance/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, wallet version)

### Suggesting Features

1. Check existing [Issues](https://github.com/surf3rr/decentralized-freelance/issues) for similar suggestions
2. Create a new issue with:
   - Clear feature description
   - Use cases and benefits
   - Possible implementation approach

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   npm run dev
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Maintain consistent formatting with Prettier
- Follow ESLint rules

### Component Structure

```
src/
├── components/          # Reusable UI components
├── lib/                # Utility functions and types
├── hooks/              # Custom React hooks
└── pages/              # Page components
```

### Naming Conventions

- **Components**: PascalCase (e.g., `ProjectCard.tsx`)
- **Functions**: camelCase (e.g., `createProject`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `CONTRACT_ADDRESS`)
- **Files**: kebab-case for non-components (e.g., `stacks-utils.ts`)

### Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding/modifying tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add project filtering functionality
fix: resolve wallet connection issue
docs: update installation instructions
```

## 🧪 Testing

### Running Tests

```bash
npm test                 # Run all tests
npm test -- --watch     # Run tests in watch mode
npm test -- --coverage  # Generate coverage report
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for components
- Mock external dependencies (blockchain, wallet)
- Aim for >80% code coverage

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- Git
- Leather Wallet browser extension

### Local Development

1. **Clone your fork**
   ```bash
   git clone https://github.com/surf3rr/decentralized-freelance.git
   cd decentralized-freelance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Environment Variables

Create `.env.local`:
```env
VITE_NETWORK=testnet
VITE_CONTRACT_ADDRESS=your_contract_address
```

## 🚀 Deployment

The project uses GitHub Actions for automatic deployment to GitHub Pages. When you push to the main branch, it will automatically build and deploy.

## 📚 Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language Reference](https://clarity-lang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤖 Smart Contract Development

If contributing to smart contract functionality:

1. Use Clarity language
2. Test on Stacks testnet first
3. Follow Stacks smart contract best practices
4. Document all public functions
5. Include comprehensive tests

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/decentralized-freelance)
- **GitHub Issues**: For bug reports and feature requests
- **Email**: dev@decentralizedfreelance.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to making freelancing more decentralized and trustless! 🚀
