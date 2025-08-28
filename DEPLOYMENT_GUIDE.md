# 🚀 GitHub Deployment Guide

## 📋 Prerequisites

Before deploying to GitHub, ensure you have:
- ✅ Git installed on your system
- ✅ GitHub account created
- ✅ GitHub CLI installed (optional but recommended)

## 🔧 Quick Deployment Steps

### Option 1: Using GitHub CLI (Recommended)

1. **Install GitHub CLI** (if not already installed):
   ```bash
   # macOS
   brew install gh
   
   # Windows
   winget install --id GitHub.cli
   ```

2. **Login to GitHub**:
   ```bash
   gh auth login
   ```

3. **Create and push repository**:
   ```bash
   # Create repository on GitHub
   gh repo create decentralized-freelance-platform --public --description "Modern animated trustless freelance marketplace with glassmorphism UI"
   
   # Set remote origin
   git remote set-url origin https://github.com/yourusername/decentralized-freelance-platform.git
   
   # Push to GitHub
   git push -u origin main
   ```

### Option 2: Manual GitHub Setup

1. **Create New Repository on GitHub**:
   - Go to [GitHub.com](https://github.com)
   - Click "New repository" or the "+" icon
   - Repository name: `decentralized-freelance-platform`
   - Description: `Modern animated trustless freelance marketplace with glassmorphism UI`
   - Make it **Public**
   - **DON'T** initialize with README (we already have one)
   - Click "Create repository"

2. **Connect Local Repository**:
   ```bash
   # Add remote origin (replace 'yourusername' with your GitHub username)
   git remote add origin https://github.com/yourusername/decentralized-freelance-platform.git
   
   # Push to GitHub
   git branch -M main
   git push -u origin main
   ```

## 🌐 Enable GitHub Pages

1. **Go to Repository Settings**:
   - Navigate to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section

2. **Configure GitHub Pages**:
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
   - Click "Save"

3. **Wait for Deployment**:
   - GitHub will automatically build and deploy
   - Your site will be available at: `https://yourusername.github.io/decentralized-freelance-platform/`

## ⚙️ Automated Deployment Setup

Create `.github/workflows/deploy.yml` for automatic deployments:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🔄 Update Vite Configuration

Update `vite.config.ts` for GitHub Pages:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/decentralized-freelance-platform/', // Replace with your repo name
  build: {
    outDir: 'dist',
  },
})
```

## 📝 Post-Deployment Checklist

- [ ] Repository is public and accessible
- [ ] README.md displays correctly on GitHub
- [ ] GitHub Pages is enabled and working
- [ ] Live demo link is functional
- [ ] All assets load correctly
- [ ] Responsive design works on different devices

## 🔧 Troubleshooting

### Common Issues:

1. **404 Error on GitHub Pages**:
   - Check that `base` in `vite.config.ts` matches your repository name
   - Ensure GitHub Pages is enabled in repository settings

2. **Assets Not Loading**:
   - Verify the `base` URL in Vite configuration
   - Check that build output is in the correct directory

3. **Build Failures**:
   - Check Node.js version compatibility
   - Ensure all dependencies are properly installed
   - Review build logs for specific errors

## 📞 Support

If you encounter any issues:
- Check GitHub Pages documentation
- Review repository settings
- Ensure all files are committed and pushed
- Verify Vite configuration settings

---

**🎉 Congratulations! Your decentralized freelance platform is now live on GitHub!**
