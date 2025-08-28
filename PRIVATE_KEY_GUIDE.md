# 🔐 Private Key Management Guide

## Overview

This guide explains **exactly where and how to add your private keys** for deploying the Clarity smart contract to different Stacks networks.

## 🎯 Quick Answer: Where to Add Private Keys

### For Development (Devnet)
✅ **Already configured** - Uses test keys in `settings/Devnet.toml`

### For Testnet Deployment
📝 **Edit this file:** `settings/Testnet.toml`
```toml
[accounts.deployer]
mnemonic = "your actual 24 word testnet mnemonic phrase goes here"
```

### For Mainnet Deployment  
📝 **Edit this file:** `settings/Mainnet.toml`
```toml
[accounts.deployer] 
mnemonic = "your actual 24 word mainnet mnemonic phrase goes here"
```

---

## 📋 Step-by-Step Instructions

### Option 1: Using Mnemonic Phrase (Recommended)

#### For Testnet:
1. Open `settings/Testnet.toml`
2. Find the line: `mnemonic = "<YOUR PRIVATE TESTNET MNEMONIC HERE>"`
3. Replace with your actual mnemonic:
   ```toml
   mnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
   ```
4. Get testnet STX from: https://explorer.stacks.co/sandbox/faucet

#### For Mainnet:
1. Open `settings/Mainnet.toml`  
2. Find the line: `mnemonic = "<YOUR PRIVATE MAINNET MNEMONIC HERE>"`
3. Replace with your actual mnemonic:
   ```toml
   mnemonic = "your real mainnet twenty four word mnemonic phrase here"
   ```
4. ⚠️ **Ensure you have sufficient STX for deployment fees!**

### Option 2: Using Private Key Directly

You can also use a raw private key instead of mnemonic:

1. Comment out the mnemonic line
2. Add your private key:
   ```toml
   # mnemonic = "..."
   secret_key = "your64characterhexprivatekeywithout0xprefix"
   ```

---

## 🛠️ How to Get Your Private Keys

### From Hiro Wallet:
1. Open Hiro Wallet
2. Go to Settings → View Secret Key
3. Copy the mnemonic phrase or private key

### From Leather Wallet:
1. Open Leather Wallet  
2. Click on Settings → Security → Export Private Key
3. Copy your credentials

### Generate New Wallet:
```bash
# Using Stacks CLI
stx make_keychain -t  # For testnet
stx make_keychain     # For mainnet
```

---

## 🚀 Deployment Commands

After adding your private keys:

```bash
# Deploy to devnet (local)
node deploy.js devnet

# Deploy to testnet
node deploy.js testnet

# Deploy to mainnet  
node deploy.js mainnet
```

Or use Clarinet directly:
```bash
clarinet deploy --devnet
clarinet deploy --testnet  
clarinet deploy --mainnet
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Use different keys for different networks
- Keep private keys in secure password managers
- Test on testnet before mainnet
- Use hardware wallets for mainnet
- Back up your mnemonic phrases safely
- Use environment variables for production

### ❌ DON'T:
- Commit private keys to git repositories
- Share private keys with anyone
- Use mainnet keys for testing
- Store keys in plain text files
- Screenshot or email private keys

---

## 💰 Required STX Balances

### Testnet:
- **Required:** FREE testnet STX from faucet
- **Get here:** https://explorer.stacks.co/sandbox/faucet

### Mainnet:
- **Required:** ~0.1-1 STX for deployment fees
- **Buy STX:** Major exchanges (Coinbase, Binance, etc.)

---

## 🔧 Environment Variables (Alternative)

Instead of editing TOML files directly, you can use environment variables:

### Create `.env` file:
```bash
# Copy the template
cp .env.example .env

# Edit .env with your keys
STACKS_PRIVATE_KEY=your64characterkey
MNEMONIC_PHRASE=your twenty four word phrase
```

### Use with deployment:
```bash
STACKS_PRIVATE_KEY=yourkey clarinet deploy --testnet
```

---

## 🆘 Troubleshooting

### "Private key not configured" error:
- Check that you replaced `<YOUR PRIVATE...>` placeholders
- Ensure no extra quotes or spaces
- Verify mnemonic is exactly 24 words

### "Insufficient funds" error:
- Get testnet STX from faucet (testnet)
- Check your STX balance (mainnet)
- Ensure you're using the correct network

### "Contract already exists" error:
- Contract is already deployed to that address
- Use a different deployer address
- Or update the existing contract

---

## 📞 Getting Help

If you encounter issues:

1. **Check the logs:** Clarinet provides detailed error messages
2. **Verify your keys:** Ensure they're valid and have sufficient funds
3. **Test on devnet first:** Always test locally before deploying
4. **Check Stacks Explorer:** View transactions and contracts

### Useful Links:
- 🔗 [Testnet Explorer](https://explorer.stacks.co/?chain=testnet)
- 🔗 [Mainnet Explorer](https://explorer.stacks.co/?chain=mainnet)  
- 🔗 [Testnet Faucet](https://explorer.stacks.co/sandbox/faucet)
- 🔗 [Clarinet Documentation](https://docs.hiro.so/clarinet)

---

## ⚡ Quick Summary

**TL;DR:** 
1. **Testnet:** Edit `settings/Testnet.toml` → replace mnemonic → run `node deploy.js testnet`
2. **Mainnet:** Edit `settings/Mainnet.toml` → replace mnemonic → run `node deploy.js mainnet`
3. **Keep keys secure and never commit them to git!**
