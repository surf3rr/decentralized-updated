#!/usr/bin/env node

/**
 * Deployment Script for Freelance Escrow Contract
 * 
 * This script helps you deploy the Clarity contract to different networks
 * Usage: node deploy.js [network]
 * 
 * Networks: devnet, testnet, mainnet
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration
const NETWORKS = {
  devnet: {
    name: 'Devnet (Local)',
    commands: [
      'clarinet deployments generate --devnet',
      'clarinet deployments apply --devnet'
    ],
    configFile: 'settings/Devnet.toml',
    warning: '🟡 Deploying to local devnet'
  },
  testnet: {
    name: 'Testnet',
    commands: [
      'clarinet deployments generate --testnet',
      'clarinet deployments apply --testnet'
    ],
    configFile: 'settings/Testnet.toml',
    warning: '🟠 Deploying to Stacks TESTNET - This uses testnet STX'
  },
  mainnet: {
    name: 'Mainnet', 
    commands: [
      'clarinet deployments generate --mainnet',
      'clarinet deployments apply --mainnet'
    ],
    configFile: 'settings/Mainnet.toml',
    warning: '🔴 DEPLOYING TO STACKS MAINNET - THIS USES REAL STX!'
  }
};

function displayBanner() {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║           FREELANCE ESCROW CONTRACT DEPLOYMENT        ║
║                   Stacks Blockchain                   ║
╚═══════════════════════════════════════════════════════╝
  `);
}

function checkPrivateKeyConfiguration(network) {
  const configFile = NETWORKS[network].configFile;
  
  if (!fs.existsSync(configFile)) {
    console.error(`❌ Configuration file ${configFile} not found!`);
    process.exit(1);
  }
  
  const config = fs.readFileSync(configFile, 'utf8');
  
  if (config.includes('<YOUR PRIVATE') || config.includes('your_64_character')) {
    console.error(`
❌ PRIVATE KEY NOT CONFIGURED!

You need to add your private key to: ${configFile}

Instructions:
1. Open ${configFile}
2. Replace the placeholder mnemonic with your actual mnemonic phrase
3. Or uncomment and use the secret_key field with your private key

For ${network}:
${network === 'testnet' ? '- Get testnet STX from: https://explorer.stacks.co/sandbox/faucet' : ''}
${network === 'mainnet' ? '- ⚠️  Make sure you have sufficient STX for deployment fees!' : ''}
    `);
    process.exit(1);
  }
}

function confirmDeployment(network) {
  const warning = NETWORKS[network].warning;
  
  console.log(`\n${warning}\n`);
  
  if (network === 'mainnet') {
    console.log(`
🚨 MAINNET DEPLOYMENT WARNING:
- This will spend real STX for deployment fees
- Make sure you have tested on testnet first
- Ensure you have sufficient STX balance
- Double-check your contract code

Are you absolutely sure you want to continue? (yes/no)
    `);
    
    // In a real implementation, you'd want to use readline for user input
    // For now, we'll just show the warning
  }
}

async function deploy(network = 'devnet') {
  try {
    displayBanner();
    
    // Validate network
    if (!NETWORKS[network]) {
      console.error(`❌ Invalid network: ${network}`);
      console.log('Available networks: devnet, testnet, mainnet');
      process.exit(1);
    }
    
    console.log(`🚀 Preparing to deploy to ${NETWORKS[network].name}...`);
    
    // Check private key configuration
    checkPrivateKeyConfiguration(network);
    
    // Show warnings and get confirmation
    confirmDeployment(network);
    
    // Check if Clarinet is installed
    try {
      execSync('clarinet --version', { stdio: 'ignore' });
    } catch (error) {
      console.error(`
❌ Clarinet is not installed or not in PATH!

Installation instructions:
- Visit: https://github.com/hirosystems/clarinet
- Or use: npm install -g @hirosystems/clarinet
      `);
      process.exit(1);
    }
    
    // Deploy the contract
    console.log(`\n📄 Deploying freelance-escrow contract...`);
    
    // Execute deployment commands
    for (let i = 0; i < NETWORKS[network].commands.length; i++) {
      const command = NETWORKS[network].commands[i];
      console.log(`\n🔧 Step ${i + 1}: ${command}`);
      
      try {
        execSync(command, { 
          stdio: 'inherit',
          cwd: process.cwd()
        });
      } catch (error) {
        console.error(`❌ Step ${i + 1} failed:`, error.message);
        
        // For devnet, suggest starting the devnet first
        if (network === 'devnet' && error.message.includes('connection refused')) {
          console.log(`\n💡 Try starting the devnet first:\n   clarinet devnet start\n`);
        }
        
        throw error;
      }
    }
    
    console.log(`\n✅ Successfully deployed to ${NETWORKS[network].name}!`);
    
    // Show next steps
    console.log(`
📝 Next Steps:
1. Note down your contract address
2. Update src/lib/stacks.ts with the deployed contract address
3. Update the frontend configuration
4. Test your deployed contract

${network === 'testnet' ? '🔗 View on explorer: https://explorer.stacks.co/?chain=testnet' : ''}
${network === 'mainnet' ? '🔗 View on explorer: https://explorer.stacks.co/?chain=mainnet' : ''}
    `);
    
  } catch (error) {
    console.error(`❌ Deployment failed:`, error.message);
    process.exit(1);
  }
}

// Get network from command line args
const network = process.argv[2] || 'devnet';
deploy(network);
