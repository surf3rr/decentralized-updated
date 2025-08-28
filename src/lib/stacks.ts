import {
  AnchorMode,
  standardPrincipalCV,
  uintCV,
  stringUtf8CV,
} from '@stacks/transactions';
import { StacksTestnet, StacksMainnet, StacksDevnet } from '@stacks/network';
import { openContractCall } from '@stacks/connect';
import { ProjectStatus } from './types';

// Network configuration based on environment
type NetworkType = 'devnet' | 'testnet' | 'mainnet';

const getNetwork = (networkType: NetworkType = 'devnet') => {
  switch (networkType) {
    case 'mainnet':
      return new StacksMainnet();
    case 'testnet':
      return new StacksTestnet();
    case 'devnet':
    default:
      return new StacksDevnet();
  }
};

// Get current network from environment or default to devnet
const CURRENT_NETWORK: NetworkType = (process.env.REACT_APP_NETWORK as NetworkType) || 'devnet';
const NETWORK = getNetwork(CURRENT_NETWORK);

// Contract configuration - UPDATE THESE AFTER DEPLOYMENT
const CONTRACT_CONFIGS = {
  devnet: {
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Devnet deployer address
    name: 'freelance-escrow'
  },
  testnet: {
    address: process.env.REACT_APP_TESTNET_CONTRACT_ADDRESS || 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Update after testnet deployment
    name: 'freelance-escrow'
  },
  mainnet: {
    address: process.env.REACT_APP_MAINNET_CONTRACT_ADDRESS || 'SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Update after mainnet deployment
    name: 'freelance-escrow'
  }
};

const CONTRACT_ADDRESS = CONTRACT_CONFIGS[CURRENT_NETWORK].address;
const CONTRACT_NAME = CONTRACT_CONFIGS[CURRENT_NETWORK].name;

export const createProject = async (
  title: string,
  description: string,
  budget: number,
  deadline: number,
  freelancerAddress: string,
  _userSession: any
) => {
  const functionArgs = [
    stringUtf8CV(title),
    stringUtf8CV(description),
    uintCV(budget),
    uintCV(deadline),
    standardPrincipalCV(freelancerAddress),
  ];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'create-project',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Transaction submitted:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

export const acceptProject = async (projectId: number, _userSession: any) => {
  const functionArgs = [uintCV(projectId)];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'accept-project',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Project accepted:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

export const submitWork = async (projectId: number, _userSession: any) => {
  const functionArgs = [uintCV(projectId)];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'submit-work',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Work submitted:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

export const approveWork = async (projectId: number, _userSession: any) => {
  const functionArgs = [uintCV(projectId)];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'approve-work',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Work approved:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

export const disputeProject = async (projectId: number, _userSession: any) => {
  const functionArgs = [uintCV(projectId)];

  const options = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'dispute-project',
    functionArgs,
    network: NETWORK,
    anchorMode: AnchorMode.Any,
    onFinish: (data: any) => {
      console.log('Project disputed:', data);
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  await openContractCall(options);
};

// Helper function to get project status string
export const getProjectStatusString = (status: ProjectStatus): string => {
  switch (status) {
    case ProjectStatus.OPEN:
      return 'open';
    case ProjectStatus.IN_PROGRESS:
      return 'in-progress';
    case ProjectStatus.SUBMITTED:
      return 'submitted';
    case ProjectStatus.COMPLETED:
      return 'completed';
    case ProjectStatus.DISPUTED:
      return 'disputed';
    default:
      return 'unknown';
  }
};

// Helper function to format STX amount
export const formatSTX = (amount: number): string => {
  return (amount / 1000000).toFixed(6) + ' STX';
};

// Helper function to convert STX to microSTX
export const stxToMicroStx = (stx: number): number => {
  return Math.floor(stx * 1000000);
};

export { NETWORK, CONTRACT_ADDRESS, CONTRACT_NAME };
